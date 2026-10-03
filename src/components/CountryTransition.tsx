import { useEffect, useRef, useState } from 'react';

type Band = { color: string; top?: string; left?: string; width: string; height: string };

// The colored "curtain" that sweeps across the screen, one design per country
type Veil =
  | { kind: 'x' | 'y' | 'up'; bands: Band[] }
  | { kind: 'sun' }
  | { kind: 'cross' }
  | { kind: 'ring' };

type Stamp = { index: string; name: string; veil: Veil };

// horizontal stripes that fill the screen from top to bottom
const stripes = (colors: string[]): Band[] =>
  colors.map((color, i) => ({
    color,
    top: `${(i * 100) / colors.length}%`,
    left: '0%',
    width: '100%',
    height: `${100 / colors.length + 1}%`,
  }));

// One passport stamp + curtain per country section (keys match the theme keys in themes.ts)
const STAMPS: Record<string, Stamp> = {
  india: {
    index: 'ENTRY No. 01',
    name: 'India',
    veil: { kind: 'x', bands: stripes(['#FF9933', '#FFFFFF', '#138808']) },
  },
  japan: { index: 'ENTRY No. 02', name: 'Japan', veil: { kind: 'sun' } },
  china: {
    index: 'ENTRY No. 03',
    name: 'China',
    veil: {
      kind: 'up',
      bands: [
        { color: '#FFDE00', width: '100%', height: '100%' },
        { color: '#DE2910', width: '100%', height: '100%' },
      ],
    },
  },
  germany: {
    index: 'ENTRY No. 04',
    name: 'Germany',
    veil: { kind: 'x', bands: stripes(['#111111', '#DD0000', '#FFCE00']) },
  },
  canada: {
    index: 'ENTRY No. 05',
    name: 'Canada',
    veil: {
      kind: 'y',
      bands: [
        { color: '#D52B1E', left: '0%', width: '26%', height: '100%' },
        { color: '#FFFFFF', left: '25%', width: '50%', height: '100%' },
        { color: '#D52B1E', left: '74%', width: '26%', height: '100%' },
      ],
    },
  },
  swissBeyond: { index: 'ENTRY No. 06', name: 'Switzerland', veil: { kind: 'cross' } },
  world: { index: 'FINAL STOP', name: 'World', veil: { kind: 'ring' } },
};

const SHOW_DELAY = 250; // short wait, so scrolling quickly past a section doesn't flash a stamp
const VISIBLE_MS = 2600; // how long the overlay stays on screen
const FADE_MS = 600; // fade-out time before it is removed

function VeilLayer({ veil }: { veil: Veil }) {
  if (veil.kind === 'sun') {
    return (
      <div className="veil" aria-hidden="true">
        <span className="veil-fill" style={{ background: '#ffffff' }} />
        <span className="veil-disc" style={{ background: '#bc002d' }} />
      </div>
    );
  }
  if (veil.kind === 'cross') {
    return (
      <div className="veil" aria-hidden="true">
        <span className="veil-fill" style={{ background: '#d52b1e' }} />
        <span className="veil-bar veil-bar-h" style={{ background: '#ffffff' }} />
        <span className="veil-bar veil-bar-v" style={{ background: '#ffffff' }} />
      </div>
    );
  }
  if (veil.kind === 'ring') {
    return (
      <div className="veil" aria-hidden="true">
        <span className="veil-fill" style={{ background: '#0b1020' }} />
        <span className="veil-ring" />
        <span className="veil-ring" style={{ animationDelay: '160ms' }} />
      </div>
    );
  }
  return (
    <div className={`veil veil-${veil.kind}`} aria-hidden="true">
      {veil.bands.map((b, i) => (
        <span
          key={i}
          style={{
            background: b.color,
            top: b.top ?? '0%',
            left: b.left ?? '0%',
            width: b.width,
            height: b.height,
            animationDelay: `${i * 90}ms`,
          }}
        />
      ))}
    </div>
  );
}

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
    // the first value is just the starting section, so no transition for it
    if (previous.current === null) {
      previous.current = activeTheme;
      return;
    }
    if (previous.current === activeTheme) return;
    previous.current = activeTheme;

    clearTimers();
    const next = STAMPS[activeTheme];

    if (!next) {
      // moved to a section with no stamp: fade out anything still showing
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
      <VeilLayer veil={stamp.veil} />

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