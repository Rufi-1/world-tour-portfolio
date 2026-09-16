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

  // Theme switching
  useEffect(() => {
    if (!enabled) return;

    const applyTheme = (themeKey: string) => {
      if (themeKey === currentThemeRef.current) return;

      const theme = themes[themeKey as keyof typeof themes];
      if (!theme) {
        console.warn('❌ Theme not found:', themeKey);
        return;
      }

      console.log('🎨 THEME SWITCH:', themeKey, '→ bg:', theme.bg);

      currentThemeRef.current = themeKey;
      setActiveTheme({ key: themeKey, theme });

      // Apply to <html>, <body>, and .app-shell
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

    // Wait for DOM then observe sections
    const timer = setTimeout(() => {
      const sections = sectionThemeMap
        .map(({ sectionId }) => document.getElementById(sectionId))
        .filter(Boolean) as HTMLElement[];

      console.log(
        '🎨 Theming observer — sections found:',
        sections.map((s) => s.id)
      );

      if (sections.length === 0) {
        console.warn('❌ NO sections found. Section IDs:', sectionThemeMap.map((s) => s.sectionId));
        return;
      }

      const observer = new IntersectionObserver(
  (entries) => {
    // Pick the section whose top is closest to the viewport top but still visible
    const visible = entries
      .filter((e) => e.isIntersecting)
      .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
    if (!visible) return;
    const themeKey = sectionThemeMap.find((s) => s.sectionId === visible.target.id)?.themeKey;
    if (themeKey) applyTheme(themeKey);
  },
  {
    rootMargin: '-10% 0px -60% 0px',
    threshold: [0, 0.1, 0.5],
  }
);

      sections.forEach((section) => observer.observe(section));

      // Initial theme
      applyTheme('india');

      return () => observer.disconnect();
    }, 200);

    return () => clearTimeout(timer);
  }, [enabled]);

  return { activeTheme, lenisRef };
}