import { useScroll, useTransform, motion } from 'framer-motion';

export function MorphingBackground() {
  const { scrollYProgress } = useScroll();

  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.15, 0.3, 0.45, 0.6, 0.8, 1],
    [
      '#FFF4E6',
      '#FFF5F7',
      '#1A0000',
      '#F5F5F5',
      '#F0F6FA',
      '#0A1A3A',
      '#000010',
    ]
  );

  return (
    <motion.div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -1,
        backgroundColor,
      }}
    />
  );
}