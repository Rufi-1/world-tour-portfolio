import { useEffect, useRef, useState } from 'react';

type Stamp = { index: string; name: string };

// One passport stamp per country section (keys match the theme keys in themes.ts)
const STAMPS: Record<string, Stamp> = {
  india: { index: 'ENTRY No. 01', name: 'India' },
  japan: { index: 'ENTRY No. 02', name: 'Japan' },
  china: { index: 'ENTRY No. 03', name: 'China' },
  germany: { index: 'ENTRY No. 04', name: 'Germany' },
  canada: { index: 'ENTRY No. 05', name: 'Canada' },
  swissBeyond: { index: 'ENTRY No. 06', name: 'Switzerland' },
  world: { index: 'FINAL STOP', name: 'World' },
};

const SHOW_DELAY = 250; // short wait, so scrolling quickly past a section doesn't flash a stamp
const VISIBLE_MS = 2200; // how long the stamp stays on screen
const FADE_MS = 600; // fade-out time before it is removed

export default function CountryTransition({ activeTheme }: { activeTheme: string }) {
  const [stamp, setStamp] = useState<Stamp | null>(null);
  const [hidden, setHidden] = useState(false);
  const previous = useRef<string | null>(null);
  const timers = useRef<number[]>([]);

  const clearTimers = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  };

  useEffect(() => {
    // TEMPORARY: shows in the browser console each time the section theme changes
    console.log('[CountryTransition] theme ->', activeTheme);

    // the first value is just the starting section, so no stamp for it
    if (previous.current === null) {
      previous.current = activeTheme;
      return;
    }
    if (previous.current === activeTheme) return;
    previous.current = activeTheme;

    clearTimers();
    const next = STAMPS[activeTheme];

    if (!next) {
      // moved to a section with no stamp: fade out any stamp still showing
      setHidden(true);
      timers.current.push(window.setTimeout(() => setStamp(null), FADE_MS));
      return;
    }

    timers.current.push(
      window.setTimeout(() => {
        setHidden(false);
        setStamp(next);
      }, SHOW_DELAY),
      window.setTimeout(() => setHidden(true), SHOW_DELAY + VISIBLE_MS),
      window.setTimeout(() => setStamp(null), SHOW_DELAY + VISIBLE_MS + FADE_MS)
    );
  }, [activeTheme]);

  // clean up timers if the component is ever removed
  useEffect(() => clearTimers, []);

  if (!stamp) return null;

  return (
    <div
      key={stamp.name}
      className={`country-transition ${hidden ? 'hidden' : 'visible'}`}
      aria-hidden="true"
    >
      <div className="transition-plane">
        <span
          className="plane-trail"
          style={{ background: 'linear-gradient(to left, var(--accent), transparent)' }}
        />
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ transform: 'rotate(45deg)' }}
        >
          <line x1="22" y1="2" x2="11" y2="13" />
          <polygon points="22 2 15 22 11 13 2 9 22 2" />
        </svg>
      </div>

      <div className="transition-stamp">
        <div className="stamp-border">
          <span className="stamp-index">{stamp.index}</span>
          <strong style={stamp.name.length > 7 ? { fontSize: '15px' } : undefined}>{stamp.name}</strong>
          <small>APPROVED</small>
        </div>
      </div>
    </div>
  );
}