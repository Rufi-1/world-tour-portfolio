import { useEffect, useRef, type ReactNode } from 'react';
import { themes, type ThemeName } from '../themes';

type Props = {
  themeName: ThemeName;
  children: ReactNode;
};

export function ThemedSection({ themeName, children }: Props) {
  const ref = useRef<HTMLElement>(null);
  const theme = themes[themeName];

  useEffect(() => {
    const el = ref.current;
    if (!el || !theme) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.4) {
          const root = document.documentElement.style;
          root.setProperty('--bg', theme.bg);
          root.setProperty('--bg-alt', theme.bgAlt);
          root.setProperty('--text', theme.text);
          root.setProperty('--accent', theme.accent);
          root.setProperty('--accent-2', theme.accent2);
        }
      },
      { threshold: [0.4, 0.6] }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [theme]);

  return (
    <section
      ref={ref}
      className={`themed-section pattern-${theme.pattern}`}
      style={
        {
          '--local-bg': theme.bg,
          '--local-bg-alt': theme.bgAlt,
          '--local-text': theme.text,
          '--local-accent': theme.accent,
        } as React.CSSProperties
      }
    >
      {children}
    </section>
  );
}