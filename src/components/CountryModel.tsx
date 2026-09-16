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
    console.warn('3D model failed to load:', error.message);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            height: 400,
            display: 'grid',
            placeItems: 'center',
            opacity: 0.35,
            fontSize: '0.85rem',
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

type ModelInnerProps = {
  url: string;
  scale: number;
};

function ModelInner({ url, scale }: ModelInnerProps) {
  const { scene } = useGLTF(url);
  const ref = useRef<Group>(null);
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);

  const { normalizedScale, offset } = useMemo(() => {
    const box = new Box3().setFromObject(scene);
    const center = box.getCenter(new Vector3());
    const size = box.getSize(new Vector3());
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const ns = (3.5 / maxDim) * scale;
    return {
      normalizedScale: ns,
      offset: [-center.x * ns, -center.y * ns, -center.z * ns] as [number, number, number],
    };
  }, [scene, scale]);

  useFrame((state, delta) => {
    if (!ref.current) return;
    const d = Math.min(delta, 0.05);
    ref.current.rotation.y += d * (hovered ? 0.8 : 0.15);
    ref.current.position.y = offset[1] + Math.sin(state.clock.elapsedTime) * 0.1;
    const target = hovered ? normalizedScale * 1.1 : normalizedScale;
    ref.current.scale.lerp({ x: target, y: target, z: target }, 0.1);
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
  scale?: number;
};

export function CountryModel({ url, label, scale = 1 }: Props) {
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    return (
      <div
        style={{
          height: 400,
          display: 'grid',
          placeItems: 'center',
          opacity: 0.5,
        }}
      >
        {label}
      </div>
    );
  }

  return (
    <ModelErrorBoundary label={label}>
      <div style={{ width: '100%', height: 550 }}>
        <Canvas
          camera={{ position: [0, 0, 3], fov: 45 }}
          dpr={[1, 1.5]}
          gl={{
            powerPreference: 'default',
            antialias: false,
            alpha: true,
            preserveDrawingBuffer: false,
          }}
        >
          <ambientLight intensity={1.5} />
          <directionalLight position={[5, 5, 5]} intensity={2} />
          <directionalLight position={[-5, -5, -5]} intensity={0.8} />
          <Suspense fallback={null}>
            <ModelInner url={url} scale={scale} />
          </Suspense>
        </Canvas>
        {label && (
          <p style={{ textAlign: 'center', fontSize: '0.85rem', opacity: 0.6 }}>
            {label}
          </p>
        )}
      </div>
    </ModelErrorBoundary>
  );
}