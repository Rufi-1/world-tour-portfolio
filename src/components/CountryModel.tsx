import { Component, useRef, useState, Suspense, useMemo, type ReactNode } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, useCursor } from '@react-three/drei';
import { Box3, Vector3, type Group } from 'three';

useGLTF.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.7/');

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
        <div style={{ height: 500, display: 'grid', placeItems: 'center', opacity: 0.35 }}>
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
};

function ModelInner({ url, size, vertical }: InnerProps) {
  const { scene } = useGLTF(url);
  const ref = useRef<Group>(null);
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);

  const { normalizedScale, offset } = useMemo(() => {
    const box = new Box3().setFromObject(scene);
    const center = box.getCenter(new Vector3());
    const sizeVec = box.getSize(new Vector3());
    const maxDim = Math.max(sizeVec.x, sizeVec.y, sizeVec.z) || 1;
    const ns = (2 / maxDim) * size;
    return {
      normalizedScale: ns,
      offset: [-center.x * ns, -center.y * ns, -center.z * ns] as [number, number, number],
    };
  }, [scene, size]);

  useFrame((state, delta) => {
    if (!ref.current) return;
    const d = Math.min(delta, 0.05);
    if (vertical) {
      // Vertical rotation: spin around X axis (top-to-bottom)
      ref.current.rotation.x += d * 0.15;
    } else {
      // Horizontal rotation: spin around Y axis (side-to-side)
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
};

export function CountryModel({
  url,
  label,
  size = 1,
  height = 550,
  vertical = false,
  background = false,
  side = false,
}: Props) {
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    return (
      <div style={{ height, display: 'grid', placeItems: 'center', opacity: 0.5 }}>
        {label}
      </div>
    );
  }

  // Background variant: absolute full-section, sits behind content
  if (background) {
    return (
      <ModelErrorBoundary label={label}>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            zIndex: 0,
          }}
        >
          <Canvas
            camera={{ position: [0, 0, 4], fov: 50 }}
            dpr={[1, 1.5]}
            gl={{ antialias: false, alpha: true, preserveDrawingBuffer: false }}
          >
            <ambientLight intensity={2} />
            <directionalLight position={[5, 5, 5]} intensity={2.5} />
            <directionalLight position={[-5, -5, -5]} intensity={1.2} />
            <Suspense fallback={null}>
              <ModelInner url={url} size={size} vertical={vertical} />
            </Suspense>
          </Canvas>
        </div>
      </ModelErrorBoundary>
    );
  }

  // Default: inline block, sits in the normal flow
    // Side variant: absolutely positioned on the right
  if (side) {
    return (
      <ModelErrorBoundary label={label}>
        <div
          style={{
            position: 'absolute',
            right: '2%',
            top: '50%',
            transform: 'translateY(-50%)',
            width: 'min(50vw, 620px)',
            height: 'min(50vw, 620px)',
            pointerEvents: 'none',
            zIndex: 3,
          }}
        >
          <Canvas
            camera={{ position: [0, 0, 4], fov: 50 }}
            dpr={[1, 1.5]}
            gl={{ antialias: false, alpha: true, preserveDrawingBuffer: false }}
          >
            <ambientLight intensity={2} />
            <directionalLight position={[5, 5, 5]} intensity={2.5} />
            <directionalLight position={[-5, -5, -5]} intensity={1.2} />
            <Suspense fallback={null}>
              <ModelInner url={url} size={size} vertical={vertical} />
            </Suspense>
          </Canvas>
        </div>
      </ModelErrorBoundary>
    );
  }
  return (
    <ModelErrorBoundary label={label}>
      <div
        style={{
          width: '100%',
          height,
          position: 'relative',
          zIndex: 3,
        }}
      >
        <Canvas
          camera={{ position: [0, 0, 4], fov: 50 }}
          dpr={[1, 1.5]}
          gl={{ antialias: false, alpha: true, preserveDrawingBuffer: false }}
        >
          <ambientLight intensity={2} />
          <directionalLight position={[5, 5, 5]} intensity={2.5} />
          <directionalLight position={[-5, -5, -5]} intensity={1.2} />
          <Suspense fallback={null}>
            <ModelInner url={url} size={size} vertical={vertical} />
          </Suspense>
        </Canvas>
        {label && (
          <p style={{ textAlign: 'center', fontSize: '0.85rem', opacity: 0.7 }}>
            {label}
          </p>
        )}
      </div>
    </ModelErrorBoundary>
  );
}