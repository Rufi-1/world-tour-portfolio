import { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import { themes, sectionThemeMap } from '@/data/themes';
import type { CountryTheme } from '@/data/themes';

export type ActiveThemeState = { key: string; theme: CountryTheme };

export function useScrollController(enabled: boolean) {
  const [activeTheme, setActiveTheme] = useState<ActiveThemeState>({
    key: 'india',
    theme: themes.india,
  });
  const lenisRef = useRef<Lenis | null>(null);

  // Apply CSS variables to multiple targets so the WHOLE page responds
  const applyTheme = (themeKey: string) => {
    const theme = themes[themeKey];
    if (!theme) return;

    setActiveTheme({ key: themeKey, theme });

    // Apply to <html>, <body>, AND .app-shell
    const targets = [
      document.documentElement,
      document.body,
      document.querySelector('.app-shell'),
    ].filter(Boolean) as HTMLElement[];

    targets.forEach((el) => {
      el.style.setProperty('--bg', theme.bg);
      el.style.setProperty('--surface', theme.surface);
      el.style.setProperty('--ink', theme.ink);
      el.style.setProperty('--muted', theme.muted);
      el.style.setProperty('--line', theme.line);
      el.style.setProperty('--accent', theme.accent);
      el.style.setProperty('--accent-soft', theme.accentSoft);
      el.style.setProperty('--cyan', theme.cyan);
      el.style.setProperty('--section-bg', theme.sectionBg);
    });
  };

  // Lenis smooth scroll
  useEffect(() => {
    if (!enabled) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [enabled]);

  // Theme switching via IntersectionObserver (reliable)
  useEffect(() => {
    if (!enabled) return;

    // Wait for DOM
    const timer = setTimeout(() => {
      const sections = sectionThemeMap
        .map(({ sectionId }) => document.getElementById(sectionId))
        .filter(Boolean) as HTMLElement[];

      if (sections.length === 0) {
        console.warn('No sections found for theming');
        return;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          // Find the section with highest visibility
          const best = entries
            .filter((e) => e.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

          if (!best) return;

          const themeKey = sectionThemeMap.find(
            (s) => s.sectionId === best.target.id
          )?.themeKey;

          if (themeKey) {
            applyTheme(themeKey);
          }
        },
        {
          rootMargin: '-30% 0px -40% 0px',
          threshold: [0, 0.25, 0.5, 0.75, 1],
        }
      );

      sections.forEach((section) => observer.observe(section));

      // Apply initial theme
      applyTheme('india');

      return () => observer.disconnect();
    }, 100);

    return () => clearTimeout(timer);
  }, [enabled]);

  return { activeTheme, lenisRef };
}