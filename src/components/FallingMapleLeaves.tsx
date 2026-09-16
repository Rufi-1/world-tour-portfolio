import { motion } from 'framer-motion';
import { useMemo } from 'react';

type Props = {
  active: boolean;
};

export function FallingMapleLeaves({ active }: Props) {
  const leaves = useMemo(() => {
    return Array.from({ length: 60 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 8,
      duration: 8 + Math.random() * 8,
      size: 8 + Math.random() * 10, // 8-18px, small
      rotateStart: Math.random() * 360,
      rotateEnd: Math.random() * 720 + 360,
      drift: (Math.random() - 0.5) * 260,
    }));
  }, []);

  if (!active) return null;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 1,
      }}
      aria-hidden="true"
    >
      {leaves.map((leaf) => (
        <motion.div
          key={leaf.id}
          initial={{ y: '-10%', x: 0, rotate: leaf.rotateStart, opacity: 0 }}
          animate={{
            y: '110%',
            x: leaf.drift,
            rotate: leaf.rotateEnd,
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: leaf.duration,
            delay: leaf.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            position: 'absolute',
            left: `${leaf.left}%`,
            top: 0,
            width: leaf.size,
            height: leaf.size,
          }}
        >
          <svg viewBox="0 0 100 100" width="100%" height="100%">
            <path
              d="M50 5 L55 25 L70 20 L62 35 L80 38 L65 48 L78 60 L60 60 L62 78 L50 68 L38 78 L40 60 L22 60 L35 48 L20 38 L38 35 L30 20 L45 25 Z"
              fill="#FF3B30"
              stroke="#8B0000"
              strokeWidth="1.5"
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}