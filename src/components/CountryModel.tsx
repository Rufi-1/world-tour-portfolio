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
  zoom: number;
  vertical?: boolean;
};

function ModelInner({ url, zoom, vertical = false }: InnerProps) {
  const { scene } = useGLTF(url);
  const ref = useRef<Group>(null);
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);

  const { normalizedScale, offset } = useMemo(() => {
    const box = new Box3().setFromObject(scene);
    const center = box.getCenter(new Vector3());
    const size = box.getSize(new Vector3());
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    // Normalize so model fits a 2-unit box, then apply user zoom
    const ns = (2 / maxDim) * zoom;
    return {
      normalizedScale: ns,
      offset: [-center.x * ns, -center.y * ns, -center.z * ns] as [number, number, number],
    };
  }, [scene, zoom]);

  useFrame((state, delta) => {
    if (!ref.current) return;
    const d = Math.min(delta, 0.05);
    if (vertical) {
      ref.current.rotation.x += d * 0.15;
    } else {
      ref.current.rotation.y += d * (hovered ? 0.45 : 0.12);
    }
    ref.current.position.y = offset[1] + Math.sin(state.clock.elapsedTime) * 0.08;
    const target = hovered ? normalizedScale * 1.05 : normalizedScale;
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
  zoom?: number;
  variant?: 'default' | 'background';
};

export function CountryModel({ url, label, zoom = 1, variant = 'default' }: Props) {
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    return (
      <div style={{ height: 500, display: 'grid', placeItems: 'center', opacity: 0.5 }}>
        {label}
      </div>
    );
  }

  // Background variant: full-section, no label, vertical rotation
  if (variant === 'background') {
    return (
      <ModelErrorBoundary label={label}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
          <Canvas
            camera={{ position: [0, 0, 3], fov: 50 }}
            dpr={[1, 1.5]}
            gl={{ antialias: false, alpha: true, preserveDrawingBuffer: false }}
          >
            <ambientLight intensity={2} />
            <directionalLight position={[5, 5, 5]} intensity={2.5} />
            <directionalLight position={[-5, -5, -5]} intensity={1.2} />
            <Suspense fallback={null}>
              <ModelInner url={url} zoom={zoom} vertical />
            </Suspense>
          </Canvas>
        </div>
      </ModelErrorBoundary>
    );
  }

  // Default: inline, with label
  return (
    <ModelErrorBoundary label={label}>
      <div style={{ width: '100%', height: 500 }}>
        <Canvas
          camera={{ position: [0, 0, 3], fov: 50 }}
          dpr={[1, 1.5]}
          gl={{ antialias: false, alpha: true, preserveDrawingBuffer: false }}
        >
          <ambientLight intensity={2} />
          <directionalLight position={[5, 5, 5]} intensity={2.5} />
          <directionalLight position={[-5, -5, -5]} intensity={1.2} />
          <Suspense fallback={null}>
            <ModelInner url={url} zoom={zoom} />
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