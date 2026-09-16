import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useMemo, useEffect } from 'react';

type Props = {
  active: boolean;
};

export function FallingMapleLeaves({ active }: Props) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      mouseX.set(x * 100);
      mouseY.set(y * 100);
    };
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, [mouseX, mouseY]);

  const leaves = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 8 + Math.random() * 6,
      size: 18 + Math.random() * 24,
      rotateStart: Math.random() * 360,
      drift: (Math.random() - 0.5) * 200,
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
          initial={{ y: -100, x: 0, rotate: leaf.rotateStart, opacity: 0 }}
          animate={{
            y: '110vh',
            x: leaf.drift,
            rotate: leaf.rotateStart + 720,
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
            x: smoothX,
            y: smoothY,
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