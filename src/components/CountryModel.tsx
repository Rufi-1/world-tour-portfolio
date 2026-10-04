import {
  Component,
  useRef,
  useState,
  Suspense,
  useMemo,
  useEffect,
  type ReactNode,
} from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, useCursor, Html } from '@react-three/drei';
import { Box3, Vector3, type Group } from 'three';

useGLTF.setDecoderPath('/draco/');

class ModelErrorBoundary extends Component<
  { children: ReactNode; label?: string },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode; label?: string }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error: Error) {
    console.warn('3D model failed:', error.message);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            height: 650,
            width: '100%',
            display: 'grid',
            placeItems: 'center',
            opacity: 0.4,
            fontSize: '0.9rem',
            color: 'var(--muted)',
          }}
        >
          {this.props.label || 'Model unavailable'}
        </div>
      );
    }
    return this.props.children;
  }
}

type InnerProps = {
  url: string;
  size: number;
  vertical: boolean;
  rotationY: number;
  animate: boolean;
  fit: boolean;
};

function ModelInner({ url, size, vertical, rotationY, animate, fit }: InnerProps) {
  const { scene: original } = useGLTF(url);
  // Every canvas works on its own copy of the model (geometry and textures are shared, so this is cheap).
  // That way, re-mounting the canvas never inherits an old scale, rotation or position.
  const scene = useMemo(() => original.clone(true), [original]);
  const viewportWidth = useThree((state) => state.viewport.width);
  const canvasWidth = useThree((state) => state.size.width);
  // On narrow screens (phones) shrink the model so it fits inside the canvas instead of being cropped
  const fitSize =
    fit && canvasWidth > 0 && canvasWidth < 600 ? Math.min(size, viewportWidth * 0.46) : size;
  const ref = useRef<Group>(null);
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);

  const { normalizedScale, offset } = useMemo(() => {
    scene.rotation.y = rotationY;
    scene.updateMatrixWorld(true);
    const box = new Box3().setFromObject(scene);
    const center = box.getCenter(new Vector3());
    const sizeVec = box.getSize(new Vector3());
    const maxDim = Math.max(sizeVec.x, sizeVec.y, sizeVec.z) || 1;
    const ns = (2 / maxDim) * fitSize;
    return {
      normalizedScale: ns,
      offset: [-center.x * ns, -center.y * ns, -center.z * ns] as [
        number,
        number,
        number
      ],
    };
  }, [scene, fitSize, rotationY]);

  useFrame((state, delta) => {
    if (!ref.current) return;
    if (!animate) {
      // reduced-motion: show the model still, with no spinning or floating
      ref.current.scale.setScalar(normalizedScale);
      return;
    }
    const d = Math.min(delta, 0.05);
    if (vertical) {
      ref.current.rotation.x += d * 0.15;
    } else {
      ref.current.rotation.y += d * (hovered ? 0.45 : 0.12);
    }
    ref.current.position.y = offset[1] + Math.sin(state.clock.elapsedTime) * 0.08;
    const target = hovered ? normalizedScale * 1.05 : normalizedScale;
    ref.current.scale.lerp({ x: target, y: target, z: target }, 0.15);
  });

  return (
    <primitive
      ref={ref}
      object={scene}
      position={offset}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    />
  );
}

type Props = {
  url: string;
  label?: string;
  size?: number;
  height?: number;
  vertical?: boolean;
  background?: boolean;
  side?: boolean;
  rotationY?: number;
};

export function CountryModel({
  url,
  label,
  size = 1,
  height = 650,
  vertical = false,
  background = false,
  side = false,
  rotationY = 0,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: '300px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const renderCanvas = () => (
    <Canvas
      frameloop={prefersReducedMotion ? 'demand' : 'always'}
      camera={{ position: [0, 0, 4], fov: 50 }}
      dpr={[1, 1.5]}
      gl={{
        antialias: false,
        alpha: true,
        preserveDrawingBuffer: false,
        powerPreference: 'default',
      }}
      style={{ width: '100%', height: '100%', display: 'block' }}
    >
      <ambientLight intensity={2} />
      <directionalLight position={[5, 5, 5]} intensity={2.5} />
      <directionalLight position={[-5, -5, -5]} intensity={1.2} />
      <Suspense
        fallback={
          <Html center>
            <div className="model-loading" />
          </Html>
        }
      >
        <ModelInner
          url={url}
          size={size}
          vertical={vertical}
          rotationY={rotationY}
          animate={!prefersReducedMotion}
          fit={!background}
        />
      </Suspense>
    </Canvas>
  );

  // SIDE — absolutely positioned on the right
  if (side) {
    return (
      <ModelErrorBoundary label={label}>
        <div
          ref={containerRef}
          className="country-model country-model--side"
          style={{
            position: 'absolute',
            right: '2%',
            top: '50%',
            transform: 'translateY(-50%)',
            width: 'min(42vw, 520px)',
            height: 'min(42vw, 520px)',
            pointerEvents: 'none',
            zIndex: 3,
          }}
        >
          {visible && renderCanvas()}
        </div>
      </ModelErrorBoundary>
    );
  }

  // BACKGROUND — full section, behind content
  if (background) {
    return (
      <ModelErrorBoundary label={label}>
        <div
          ref={containerRef}
          className="country-model country-model--bg"
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            zIndex: 0,
          }}
        >
          {visible && renderCanvas()}
        </div>
      </ModelErrorBoundary>
    );
  }

  // INLINE — centered, fixed pixel height
  return (
    <ModelErrorBoundary label={label}>
      <div
        ref={containerRef}
        className="country-model country-model--inline"
        style={{
          width: '100%',
          maxWidth: '750px',
          margin: '0 auto',
          height: `${height}px`,
          position: 'relative',
          zIndex: 3,
        }}
      >
        {visible && renderCanvas()}
        {label && (
          <p style={{ textAlign: 'center', fontSize: '0.85rem', opacity: 0.7, marginTop: '8px' }}>
            {label}
          </p>
        )}
      </div>
    </ModelErrorBoundary>
  );
}