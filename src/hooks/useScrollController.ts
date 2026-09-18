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
  const currentThemeRef = useRef<string>('india');

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

  const applyTheme = (themeKey: string, force = false) => {
    if (!force && themeKey === currentThemeRef.current) return;

    const theme = themes[themeKey as keyof typeof themes];
    if (!theme) return;

    currentThemeRef.current = themeKey;
    setActiveTheme({ key: themeKey, theme });

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

  useEffect(() => {
    if (!enabled) return;
    applyTheme('india', true);
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;

    const timer = setTimeout(() => {
      const sections = sectionThemeMap
        .map(({ sectionId }) => document.getElementById(sectionId))
        .filter(Boolean) as HTMLElement[];

      if (sections.length === 0) return;

      const observer = new IntersectionObserver(
        (entries) => {
          const visible = entries
            .filter((e) => e.isIntersecting)
            .sort(
              (a, b) =>
                Math.abs(a.boundingClientRect.top) -
                Math.abs(b.boundingClientRect.top)
            )[0];

          if (!visible) return;

          const themeKey = sectionThemeMap.find(
            (s) => s.sectionId === visible.target.id
          )?.themeKey;

          if (themeKey) applyTheme(themeKey);
        },
        {
          // Only trigger when a section is well into the viewport
          rootMargin: '-30% 0px -50% 0px',
          threshold: [0, 0.2, 0.5, 0.8],
        }
      );

      sections.forEach((section) => observer.observe(section));

      return () => observer.disconnect();
    }, 200);

    return () => clearTimeout(timer);
  }, [enabled]);

  return { activeTheme, lenisRef };
}