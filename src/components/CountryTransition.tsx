import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

type Props = {
  activeTheme: string;
};

export default function CountryTransition({ activeTheme }: Props) {
  const [showTransition, setShowTransition] = useState(false);
  const [transitionKey, setTransitionKey] = useState(0);

  useEffect(() => {
    // Trigger a brief overlay whenever the theme changes
    setShowTransition(true);
    setTransitionKey((k) => k + 1);
    const timer = setTimeout(() => setShowTransition(false), 900);
    return () => clearTimeout(timer);
  }, [activeTheme]);

  return (
    <AnimatePresence>
      {showTransition && (
        <motion.div
          key={transitionKey}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          style={{
            position: 'fixed',
            inset: 0,
            pointerEvents: 'none',
            zIndex: 40,
          }}
          aria-hidden="true"
        >
          {/* Vertical sweep line */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            exit={{ scaleY: 0 }}
            transition={{ duration: 0.6, ease: [0.83, 0, 0.17, 1] }}
            style={{
              position: 'absolute',
              inset: 0,
              background: `linear-gradient(180deg, transparent 0%, var(--accent) 50%, transparent 100%)`,
              opacity: 0.12,
              transformOrigin: 'top',
            }}
          />

          {/* Horizontal sweep line moving left-to-right */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.9, ease: [0.83, 0, 0.17, 1] }}
            style={{
              position: 'absolute',
              top: '50%',
              left: 0,
              width: '100%',
              height: '2px',
              background: `linear-gradient(90deg, transparent, var(--accent), transparent)`,
              boxShadow: `0 0 20px var(--accent), 0 0 40px var(--accent)`,
            }}
          />

          {/* Fading dots trailing */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ x: '-10%', opacity: 0 }}
              animate={{ x: '110%', opacity: [0, 1, 0] }}
              transition={{
                duration: 1.0,
                delay: i * 0.05,
                ease: 'easeOut',
              }}
              style={{
                position: 'absolute',
                top: `calc(50% + ${(i - 2) * 12}px)`,
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: 'var(--accent)',
                boxShadow: `0 0 12px var(--accent)`,
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}