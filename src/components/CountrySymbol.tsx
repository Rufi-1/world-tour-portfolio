import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import type { Group, Mesh } from 'three';
import { Box, Cone, Cylinder, Sphere, Torus, Icosahedron, Ring } from '@react-three/drei';
import * as THREE from 'three';

export type SymbolKind = 'india' | 'japan' | 'china' | 'germany' | 'switzerland' | 'canada' | 'swissBeyond' | 'world';

type CountrySymbolProps = { kind: SymbolKind; label: string; palette: string; compact?: boolean; large?: boolean };

type SymbolSceneProps = { kind: SymbolKind; color: string; onPulse: () => void };

function SymbolScene({ kind, color, onPulse }: SymbolSceneProps) {
  const groupRef = useRef<Group>(null);
  const [hovered, setHovered] = useState(false);
  const pulse = useRef(0);

  useFrame(({ clock, pointer }) => {
    if (!groupRef.current) return;
    pulse.current = Math.max(0, pulse.current - 0.035);
    const targetScale = 1 + pulse.current * 0.15;
    groupRef.current.scale.setScalar(targetScale);
    const baseRot = kind === 'world' ? clock.getElapsedTime() * 0.12 : 0.006;
    groupRef.current.rotation.y += hovered ? 0.028 : baseRot;
    groupRef.current.rotation.x = pointer.y * 0.15;
    groupRef.current.rotation.z = pointer.x * -0.10;
  });

  const handleClick = () => { pulse.current = 1; onPulse(); };

  return (
    <group ref={groupRef} onClick={handleClick} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
      {kind === 'india' && <TajMahal color={color} />}
      {kind === 'japan' && <ToriiGate color={color} />}
      {kind === 'china' && <ChineseLantern color={color} />}
      {kind === 'germany' && <PrecisionGear color={color} />}
      {kind === 'switzerland' && <SwissWatch color={color} />}
      {kind === 'canada' && <MapleLeaf color={color} />}
      {kind === 'swissBeyond' && <Matterhorn color={color} />}
      {kind === 'world' && <WorldGlobe color={color} />}
    </group>
  );
}

function TajMahal({ color }: { color: string }) {
  const domeRef = useRef<Mesh>(null);
  useFrame(({ clock }) => {
    if (domeRef.current) domeRef.current.rotation.y = clock.getElapsedTime() * 0.1;
  });
  return (
    <group scale={0.55}>
      {/* Main dome */}
      <Sphere ref={domeRef} args={[0.7, 32, 16]} position={[0, 1.1, 0]}>
        <meshStandardMaterial color="#f5f0e8" metalness={0.2} roughness={0.3} />
      </Sphere>
      {/* Drum under dome */}
      <Cylinder args={[0.5, 0.5, 0.35, 32]} position={[0, 0.75, 0]}>
        <meshStandardMaterial color="#ede8e0" metalness={0.15} roughness={0.35} />
      </Cylinder>
      {/* Finial spire */}
      <Cone args={[0.04, 0.35, 8]} position={[0, 2.05, 0]}>
        <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
      </Cone>
      {/* Main building body */}
      <Box args={[1.4, 0.9, 1.4]} position={[0, 0.15, 0]}>
        <meshStandardMaterial color="#e8e2d8" metalness={0.1} roughness={0.4} />
      </Box>
      {/* Arched entrance (recessed dark) */}
      <Box args={[0.4, 0.6, 0.05]} position={[0, 0.0, 0.71]}>
        <meshStandardMaterial color="#2a2018" />
      </Box>
      {/* Four minarets */}
      {[[-1.0, 0, -1.0], [1.0, 0, -1.0], [-1.0, 0, 1.0], [1.0, 0, 1.0]].map(([x, , z], i) => (
        <group key={i} position={[x, 0, z]}>
          <Cylinder args={[0.08, 0.1, 2.0, 16]} position={[0, 0.6, 0]}>
            <meshStandardMaterial color="#ede8e0" metalness={0.15} roughness={0.35} />
          </Cylinder>
          <Sphere args={[0.1, 16, 8]} position={[0, 1.7, 0]}>
            <meshStandardMaterial color={color} metalness={0.7} roughness={0.25} />
          </Sphere>
          <Cone args={[0.09, 0.2, 8]} position={[0, 1.9, 0]}>
            <meshStandardMaterial color={color} metalness={0.7} />
          </Cone>
        </group>
      ))}
      {/* Base platform */}
      <Box args={[2.8, 0.12, 2.8]} position={[0, -0.36, 0]}>
        <meshStandardMaterial color="#d8d2c8" metalness={0.1} roughness={0.5} />
      </Box>
      {/* Reflecting pool hint */}
      <Box args={[2.0, 0.02, 1.2]} position={[0, -0.42, 0]}>
        <meshStandardMaterial color={color} metalness={0.9} roughness={0.1} transparent opacity={0.3} />
      </Box>
    </group>
  );
}

function ToriiGate({ color }: { color: string }) {
  return (
    <group scale={0.7}>
      {/* Top lintel (kasagi) — curved */}
      <Box args={[3.2, 0.2, 0.3]} position={[0, 1.8, 0]} rotation={[0, 0, 0]}>
        <meshStandardMaterial color="#1a0a0a" roughness={0.6} />
      </Box>
      {/* Curved ends of kasagi */}
      <Box args={[0.35, 0.22, 0.3]} position={[-1.7, 1.72, 0]} rotation={[0, 0, 0.15]}>
        <meshStandardMaterial color="#1a0a0a" roughness={0.6} />
      </Box>
      <Box args={[0.35, 0.22, 0.3]} position={[1.7, 1.72, 0]} rotation={[0, 0, -0.15]}>
        <meshStandardMaterial color="#1a0a0a" roughness={0.6} />
      </Box>
      {/* Second lintel (nuki) */}
      <Box args={[2.6, 0.15, 0.25]} position={[0, 1.5, 0]}>
        <meshStandardMaterial color={color} roughness={0.4} />
      </Box>
      {/* Center tablet (gakuzuka) */}
      <Box args={[0.35, 0.28, 0.12]} position={[0, 1.35, 0]}>
        <meshStandardMaterial color="#1a0a0a" roughness={0.5} />
      </Box>
      {/* Two pillars (hashira) — slight taper */}
      <Cylinder args={[0.13, 0.16, 2.8, 16]} position={[-1.1, 0, 0]} rotation={[0, 0, 0.03]}>
        <meshStandardMaterial color={color} roughness={0.4} metalness={0.1} />
      </Cylinder>
      <Cylinder args={[0.13, 0.16, 2.8, 16]} position={[1.1, 0, 0]} rotation={[0, 0, -0.03]}>
        <meshStandardMaterial color={color} roughness={0.4} metalness={0.1} />
      </Cylinder>
      {/* Crossbeam support */}
      <Box args={[2.2, 0.1, 0.18]} position={[0, 1.0, 0]}>
        <meshStandardMaterial color={color} roughness={0.4} />
      </Box>
      {/* Ground stones */}
      <Box args={[0.35, 0.15, 0.35]} position={[-1.1, -1.45, 0]}>
        <meshStandardMaterial color="#444" roughness={0.8} />
      </Box>
      <Box args={[0.35, 0.15, 0.35]} position={[1.1, -1.45, 0]}>
        <meshStandardMaterial color="#444" roughness={0.8} />
      </Box>
    </group>
  );
}

function ChineseLantern({ color }: { color: string }) {
  const flameRef = useRef<Mesh>(null);
  useFrame(({ clock }) => {
    if (flameRef.current) {
      const t = clock.getElapsedTime();
      flameRef.current.scale.setScalar(1 + Math.sin(t * 4) * 0.08);
    }
  });
  return (
    <group scale={0.7}>
      {/* Main lantern body — elongated sphere */}
      <Sphere args={[0.75, 24, 16]} scale={[0.85, 1.1, 0.85]}>
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.45} roughness={0.35} />
      </Sphere>
      {/* Top cap (gold ring) */}
      <Cylinder args={[0.35, 0.5, 0.12, 24]} position={[0, 0.85, 0]}>
        <meshStandardMaterial color="#FFDE00" metalness={0.8} roughness={0.2} />
      </Cylinder>
      {/* Bottom cap */}
      <Cylinder args={[0.35, 0.5, 0.12, 24]} position={[0, -0.85, 0]}>
        <meshStandardMaterial color="#FFDE00" metalness={0.8} roughness={0.2} />
      </Cylinder>
      {/* Top hanging string */}
      <Cylinder args={[0.015, 0.015, 0.4, 8]} position={[0, 1.15, 0]}>
        <meshStandardMaterial color="#FFDE00" />
      </Cylinder>
      {/* Top ring */}
      <Torus args={[0.04, 0.02, 8, 16]} position={[0, 1.38, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#FFDE00" metalness={0.9} />
      </Torus>
      {/* Bottom tassel strings */}
      {[[-0.08, -1.2], [0, -1.2], [0.08, -1.2]].map(([x, y], i) => (
        <Cylinder key={i} args={[0.01, 0.01, 0.35, 6]} position={[x, y, 0]}>
          <meshStandardMaterial color="#FFDE00" metalness={0.6} />
        </Cylinder>
      ))}
      {/* Bottom tassel ball */}
      <Sphere args={[0.06, 12, 8]} position={[0, -1.42, 0]}>
        <meshStandardMaterial color="#FF6600" emissive="#FF6600" emissiveIntensity={0.3} />
      </Sphere>
      {/* Vertical ribs on lantern */}
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const angle = (i * Math.PI) / 3;
        return (
          <Torus key={i} args={[0.64, 0.015, 6, 12, Math.PI]} rotation={[0, angle, 0]} position={[0, 0, 0]}>
            <meshStandardMaterial color="#FFDE00" metalness={0.5} opacity={0.6} transparent />
          </Torus>
        );
      })}
      {/* Inner glow */}
      <Sphere ref={flameRef} args={[0.3, 12, 8]}>
        <meshStandardMaterial color="#FFEE88" emissive="#FFEE88" emissiveIntensity={2} transparent opacity={0.5} />
      </Sphere>
    </group>
  );
}

function PrecisionGear({ color }: { color: string }) {
  const gearRef = useRef<Group>(null);
  useFrame(({ clock }) => {
    if (gearRef.current) gearRef.current.rotation.z = clock.getElapsedTime() * 0.15;
  });
  return (
    <group scale={0.6}>
      {/* Main gear */}
      <group ref={gearRef}>
        <Torus args={[1.0, 0.18, 12, 48]}>
          <meshStandardMaterial color="#b0b0b8" metalness={0.85} roughness={0.2} />
        </Torus>
        {/* Teeth */}
        {Array.from({ length: 16 }, (_, i) => {
          const angle = (i * Math.PI * 2) / 16;
          return (
            <Box key={i} args={[0.14, 0.32, 0.22]} position={[Math.cos(angle) * 1.12, Math.sin(angle) * 1.12, 0]} rotation={[0, 0, angle]}>
              <meshStandardMaterial color="#c0c0c8" metalness={0.8} roughness={0.25} />
            </Box>
          );
        })}
        {/* Inner hub */}
        <Cylinder args={[0.3, 0.3, 0.25, 32]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial color={color} metalness={0.9} roughness={0.15} />
        </Cylinder>
        {/* Center hole */}
        <Cylinder args={[0.12, 0.12, 0.3, 16]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial color="#1a1a1e" metalness={0.5} />
        </Cylinder>
        {/* Spokes */}
        {[0, 1, 2, 3].map((i) => {
          const angle = (i * Math.PI) / 2;
          return (
            <Box key={i} args={[0.08, 1.4, 0.08]} position={[0, 0, 0]} rotation={[0, 0, angle]}>
              <meshStandardMaterial color="#888890" metalness={0.7} roughness={0.3} />
            </Box>
          );
        })}
      </group>
      {/* Second smaller gear offset */}
      <group position={[1.8, -0.8, -0.3]} rotation={[0, 0, 0.3]}>
        <Torus args={[0.5, 0.1, 8, 32]}>
          <meshStandardMaterial color="#9999a0" metalness={0.8} roughness={0.25} />
        </Torus>
        {Array.from({ length: 10 }, (_, i) => {
          const angle = (i * Math.PI * 2) / 10;
          return (
            <Box key={i} args={[0.08, 0.18, 0.14]} position={[Math.cos(angle) * 0.58, Math.sin(angle) * 0.58, 0]} rotation={[0, 0, angle]}>
              <meshStandardMaterial color="#a8a8b0" metalness={0.75} />
            </Box>
          );
        })}
        <Cylinder args={[0.15, 0.15, 0.2, 16]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial color="#DD0000" metalness={0.7} />
        </Cylinder>
      </group>
    </group>
  );
}

function SwissWatch({ color }: { color: string }) {
  const handRef = useRef<Group>(null);
  const secondRef = useRef<Mesh>(null);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (handRef.current) handRef.current.rotation.z = -t * 0.3;
    if (secondRef.current) secondRef.current.rotation.z = -t * 1.5;
  });
  return (
    <group scale={0.6} rotation={[Math.PI / 2, 0, 0]}>
      {/* Watch case */}
      <Cylinder args={[1.0, 1.0, 0.22, 64]}>
        <meshStandardMaterial color="#e8e8ec" metalness={0.85} roughness={0.15} />
      </Cylinder>
      {/* Watch glass dome */}
      <Sphere args={[0.95, 32, 16, 0, Math.PI * 2, 0, Math.PI / 3]} position={[0, 0.12, 0]}>
        <meshStandardMaterial color="#a0d0f0" metalness={0.3} roughness={0.05} transparent opacity={0.3} />
      </Sphere>
      {/* Watch face */}
      <Cylinder args={[0.88, 0.88, 0.03, 64]} position={[0, 0.12, 0]}>
        <meshStandardMaterial color="#f8f8f8" metalness={0.05} roughness={0.3} />
      </Cylinder>
      {/* Bezel ring */}
      <Torus args={[0.92, 0.08, 12, 48]} position={[0, 0.12, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color={color} metalness={0.9} roughness={0.1} />
      </Torus>
      {/* Hour markers */}
      {Array.from({ length: 12 }, (_, i) => {
        const angle = (i * Math.PI * 2) / 12;
        const isMain = i % 3 === 0;
        return (
          <Box key={i} args={[isMain ? 0.06 : 0.03, isMain ? 0.16 : 0.08, 0.03]} position={[Math.cos(angle) * 0.7, 0.14, Math.sin(angle) * 0.7]} rotation={[0, -angle, 0]}>
            <meshStandardMaterial color="#1a1a1e" metalness={0.6} />
          </Box>
        );
      })}
      {/* Hour hand */}
      <group ref={handRef} position={[0, 0.16, 0]}>
        <Box args={[0.05, 0.5, 0.03]} position={[0, 0.25, 0]}>
          <meshStandardMaterial color="#1a1a1e" />
        </Box>
      </group>
      {/* Second hand */}
      <mesh ref={secondRef} position={[0, 0.17, 0]}>
        <boxGeometry args={[0.02, 0.7, 0.01]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} />
      </mesh>
      {/* Center cap */}
      <Cylinder args={[0.05, 0.05, 0.06, 16]} position={[0, 0.18, 0]}>
        <meshStandardMaterial color={color} metalness={0.9} roughness={0.1} />
      </Cylinder>
      {/* Crown */}
      <Cylinder args={[0.08, 0.08, 0.12, 12]} position={[1.05, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <meshStandardMaterial color={color} metalness={0.85} roughness={0.15} />
      </Cylinder>
      {/* Lugs */}
      {[[-0.7, 0.95], [0.7, 0.95], [-0.7, -0.95], [0.7, -0.95]].map(([x, z], i) => (
        <Box key={i} args={[0.2, 0.15, 0.2]} position={[x, 0, z]}>
          <meshStandardMaterial color="#d0d0d4" metalness={0.8} roughness={0.2} />
        </Box>
      ))}
    </group>
  );
}

function MapleLeaf({ color }: { color: string }) {
  return (
    <group scale={0.7} rotation={[0.2, 0, 0]}>
      {/* Main leaf body — faceted crystalline shape */}
      <group>
        {/* Central stem */}
        <Cylinder args={[0.04, 0.04, 0.8, 8]} position={[0, -0.3, 0]}>
          <meshStandardMaterial color="#5a3010" roughness={0.7} />
        </Cylinder>
        {/* Main body using multiple cones arranged as leaf lobes */}
        {[
          { angle: 0, scale: 1.0, pos: [0, 0.3, 0] },
          { angle: 0.4, scale: 0.8, pos: [0.35, 0.45, 0] },
          { angle: -0.4, scale: 0.8, pos: [-0.35, 0.45, 0] },
          { angle: 0.7, scale: 0.6, pos: [0.6, 0.2, 0] },
          { angle: -0.7, scale: 0.6, pos: [-0.6, 0.2, 0] },
          { angle: 0.9, scale: 0.45, pos: [0.7, -0.1, 0] },
          { angle: -0.9, scale: 0.45, pos: [-0.7, -0.1, 0] },
          { angle: 0.2, scale: 0.5, pos: [0.15, 0.7, 0] },
          { angle: -0.2, scale: 0.5, pos: [-0.15, 0.7, 0] },
        ].map((lobe, i) => (
          <Cone
            key={i}
            args={[0.35 * lobe.scale, 1.0 * lobe.scale, 5]}
            position={lobe.pos as [number, number, number]}
            rotation={[0, 0, lobe.angle + Math.PI / 2]}
          >
            <meshStandardMaterial color={color} metalness={0.3} roughness={0.35} flatShading />
          </Cone>
        ))}
        {/* Top spike */}
        <Cone args={[0.15, 0.5, 4]} position={[0, 0.95, 0]}>
          <meshStandardMaterial color={color} metalness={0.3} roughness={0.35} flatShading />
        </Cone>
        {/* Bottom stem */}
        <Cylinder args={[0.03, 0.03, 0.5, 6]} position={[0, -0.7, 0]}>
          <meshStandardMaterial color="#3a2008" roughness={0.8} />
        </Cylinder>
      </group>
    </group>
  );
}

function Matterhorn({ color }: { color: string }) {
  return (
    <group scale={0.6}>
      {/* Main peak — sharp pyramid */}
      <Cone args={[1.0, 2.2, 4]} position={[0, 0.3, 0]} rotation={[0, Math.PI / 4, 0.12]}>
        <meshStandardMaterial color="#d8e8f5" metalness={0.2} roughness={0.4} flatShading />
      </Cone>
      {/* Snow cap highlight */}
      <Cone args={[0.35, 0.8, 4]} position={[0, 0.95, 0.1]} rotation={[0, Math.PI / 4, 0.12]}>
        <meshStandardMaterial color="#ffffff" metalness={0.1} roughness={0.2} flatShading />
      </Cone>
      {/* Secondary peak left */}
      <Cone args={[0.65, 1.4, 4]} position={[-0.75, -0.2, -0.15]} rotation={[0, Math.PI / 4, 0.22]}>
        <meshStandardMaterial color="#c0d0e0" metalness={0.2} roughness={0.4} flatShading />
      </Cone>
      {/* Secondary peak right */}
      <Cone args={[0.7, 1.6, 4]} position={[0.75, -0.1, -0.1]} rotation={[0, Math.PI / 4, -0.15]}>
        <meshStandardMaterial color="#c8d8e8" metalness={0.2} roughness={0.4} flatShading />
      </Cone>
      {/* Back ridge */}
      <Cone args={[0.5, 1.1, 4]} position={[0, -0.35, -0.5]} rotation={[0, Math.PI / 4, 0.1]}>
        <meshStandardMaterial color="#b0c8d8" metalness={0.2} roughness={0.4} flatShading />
      </Cone>
      {/* Base rock */}
      <Cylinder args={[1.4, 1.6, 0.3, 6]} position={[0, -0.95, 0]}>
        <meshStandardMaterial color="#4a5a6a" roughness={0.8} flatShading />
      </Cylinder>
      {/* Swiss flag on summit */}
      <group position={[0, 1.5, 0.15]}>
        <Box args={[0.04, 0.35, 0.02]} position={[0, 0.15, 0]}>
          <meshStandardMaterial color="#888" metalness={0.8} />
        </Box>
        <Box args={[0.25, 0.15, 0.01]} position={[0, 0.35, 0]}>
          <meshStandardMaterial color={color} roughness={0.3} />
        </Box>
        <Box args={[0.08, 0.08, 0.012]} position={[0, 0.35, 0.005]}>
          <meshStandardMaterial color="#ffffff" />
        </Box>
      </group>
    </group>
  );
}

function WorldGlobe({ color }: { color: string }) {
  const cloudRef = useRef<Group>(null);
  useFrame(({ clock }) => {
    if (cloudRef.current) cloudRef.current.rotation.y = clock.getElapsedTime() * 0.04;
  });
  const pins: [number, number, number][] = [
    [0.65, 0.45, 0.9], [-0.55, 0.25, 0.95], [0.35, -0.55, 0.95], [-0.45, -0.35, 0.95], [0.85, 0.15, 0.6],
  ];
  return (
    <group scale={0.75}>
      {/* Ocean sphere */}
      <Sphere args={[1.0, 48, 32]}>
        <meshStandardMaterial color="#15364c" metalness={0.35} roughness={0.5} />
      </Sphere>
      {/* Continents — simplified with icosahedron displacement */}
      <group ref={cloudRef}>
        <Icosahedron args={[1.01, 2]}>
          <meshStandardMaterial color="#2a6a3a" metalness={0.15} roughness={0.6} flatShading transparent opacity={0.65} />
        </Icosahedron>
      </group>
      {/* Latitude lines */}
      {[0.4, 0, -0.4].map((y, i) => (
        <Torus key={i} args={[Math.sqrt(1.01 * 1.01 - y * y), 0.003, 4, 48]} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial color={color} transparent opacity={0.3} />
        </Torus>
      ))}
      {/* Longitude lines */}
      {[0, Math.PI / 4, Math.PI / 2, (3 * Math.PI) / 4].map((a, i) => (
        <Torus key={i} args={[1.01, 0.003, 4, 48]} rotation={[0, a, Math.PI / 2]}>
          <meshStandardMaterial color={color} transparent opacity={0.2} />
        </Torus>
      ))}
      {/* Location pins */}
      {pins.map(([x, y, z], i) => (
        <group key={i} position={[x, y, z]}>
          <Sphere args={[0.06, 12, 8]}>
            <meshStandardMaterial color={i === 0 ? '#FF9933' : color} emissive={i === 0 ? '#FF9933' : color} emissiveIntensity={2} />
          </Sphere>
          {/* Pulse ring */}
          <Ring args={[0.08, 0.11, 16]} position={[0, 0, 0.02]} rotation={[0, Math.atan2(y, x), Math.PI / 2 - Math.acos(z)]}>
            <meshStandardMaterial color={i === 0 ? '#FF9933' : color} transparent opacity={0.4} side={THREE.DoubleSide} />
          </Ring>
        </group>
      ))}
      {/* Outer atmosphere glow */}
      <Sphere args={[1.05, 32, 16]}>
        <meshStandardMaterial color={color} transparent opacity={0.06} />
      </Sphere>
    </group>
  );
}

function StaticSymbol({ kind, color }: { kind: SymbolKind; color: string }) {
  const glyphs: Record<SymbolKind, string> = {
    india: '◉', japan: '鳥', china: '灯', germany: '⚙', switzerland: '◷',
    canada: '✦', swissBeyond: '△', world: '◌',
  };
  return (
    <div className="symbol-fallback" style={{ '--symbol-color': color } as React.CSSProperties} aria-hidden="true">
      <span>{glyphs[kind]}</span>
    </div>
  );
}

export default function CountrySymbol({ kind, label, palette, compact = false, large = false }: CountrySymbolProps) {
  const [reduced, setReduced] = useState(false);
  const [webgl, setWebgl] = useState(true);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(query.matches);
    const onChange = () => setReduced(query.matches);
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    setWebgl(Boolean(gl));
  }, []);

  return (
    <div
      className={`country-symbol ${compact ? 'compact' : ''} ${large ? 'large' : ''} ${pulse ? 'symbol-pulse' : ''}`}
      style={{ '--symbol-color': palette } as React.CSSProperties}
      onAnimationEnd={() => setPulse(false)}
    >
      <div className="symbol-canvas">
        {reduced || !webgl ? (
          <StaticSymbol kind={kind} color={palette} />
        ) : (
          <Canvas camera={{ position: [0, 0, 4.8], fov: 42 }} dpr={[1, 1.5]}>
            <ambientLight intensity={1.0} />
            <directionalLight position={[3, 4, 5]} intensity={2.0} color={palette} />
            <directionalLight position={[-3, -2, 2]} intensity={0.8} color="#ffffff" />
            <pointLight position={[0, 3, 3]} intensity={1.2} color={palette} />
            <SymbolScene kind={kind} color={palette} onPulse={() => setPulse(true)} />
          </Canvas>
        )}
      </div>
      <span className="symbol-label">{label}</span>
    </div>
  );
}
