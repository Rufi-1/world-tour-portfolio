import { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { themes, sectionThemeMap } from '@/data/themes';
import type { CountryTheme } from '@/data/themes';

gsap.registerPlugin(ScrollTrigger);

export type ActiveThemeState = { key: string; theme: CountryTheme };

export function useScrollController(enabled: boolean) {
  const [activeTheme, setActiveTheme] = useState<ActiveThemeState>({
    key: 'india',
    theme: themes.india,
  });
  const lenisRef = useRef<Lenis | null>(null);
  const reducedMotionRef = useRef(false);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    reducedMotionRef.current = query.matches;
    const onChange = () => {
      reducedMotionRef.current = query.matches;
    };
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    if (reducedMotionRef.current) return;

    // Wait for DOM to be ready and layout to settle
    const init = () => {
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
        infinite: false,
        autoRaf: true,
      });

      lenisRef.current = lenis;

      lenis.on('scroll', ScrollTrigger.update);

      // Force ScrollTrigger to use Lenis scroll position
      ScrollTrigger.scrollerProxy(document.documentElement, {
        scrollTop(value) {
          if (typeof value === 'number') {
            lenis.scrollTo(value, { immediate: true });
          }
          return lenis.scroll;
        },
        getBoundingClientRect() {
          return {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight,
          };
        },
      });

      ScrollTrigger.refresh();
    };

    // Delay init by one frame so CSS layout is finished
    const rafId = requestAnimationFrame(init);

    return () => {
      cancelAnimationFrame(rafId);
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;

    const sections = sectionThemeMap
      .map(({ sectionId }) => document.getElementById(sectionId))
      .filter(Boolean) as HTMLElement[];

    const applyTheme = (themeKey: string) => {
      const theme = themes[themeKey];
      if (!theme) return;
      setActiveTheme({ key: themeKey, theme });

      const root = document.querySelector('.app-shell') as HTMLElement | null;
      if (!root) return;

      if (reducedMotionRef.current) {
        root.style.setProperty('--bg', theme.bg);
        root.style.setProperty('--surface', theme.surface);
        root.style.setProperty('--ink', theme.ink);
        root.style.setProperty('--muted', theme.muted);
        root.style.setProperty('--line', theme.line);
        root.style.setProperty('--accent', theme.accent);
        root.style.setProperty('--accent-soft', theme.accentSoft);
        root.style.setProperty('--cyan', theme.cyan);
        return;
      }

      gsap.to(root, {
        duration: 0.6,
        ease: 'power2.out',
        '--bg': theme.bg,
        '--surface': theme.surface,
        '--ink': theme.ink,
        '--muted': theme.muted,
        '--line': theme.line,
        '--accent': theme.accent,
        '--accent-soft': theme.accentSoft,
        '--cyan': theme.cyan,
        onComplete: () => {
          root.style.setProperty('--bg', theme.bg);
          root.style.setProperty('--surface', theme.surface);
          root.style.setProperty('--ink', theme.ink);
          root.style.setProperty('--muted', theme.muted);
          root.style.setProperty('--line', theme.line);
          root.style.setProperty('--accent', theme.accent);
          root.style.setProperty('--accent-soft', theme.accentSoft);
          root.style.setProperty('--cyan', theme.cyan);
        },
      });
    };

    const triggers: ScrollTrigger[] = [];

    for (const section of sections) {
      const themeKey = sectionThemeMap.find((s) => s.sectionId === section.id)?.themeKey;
      if (!themeKey) continue;

      const trigger = ScrollTrigger.create({
        trigger: section,
        start: 'top 55%',
        end: 'bottom 45%',
        onEnter: () => applyTheme(themeKey),
        onEnterBack: () => applyTheme(themeKey),
      });

      triggers.push(trigger);
    }

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, [enabled]);

  return { activeTheme, lenisRef };
}