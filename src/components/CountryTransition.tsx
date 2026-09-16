import { useEffect, useRef, useState } from 'react';
import { Plane } from 'lucide-react';

type TransitionState = {
  visible: boolean;
  countryName: string;
  countryIndex: string;
  flag: string;
};

const countryInfo: Record<string, { name: string; index: string; flag: string }> = {
  india: { name: 'India', index: '01', flag: 'IN' },
  japan: { name: 'Japan', index: '02', flag: 'JP' },
  china: { name: 'China', index: '03', flag: 'CN' },
  germany: { name: 'Germany', index: '04', flag: 'DE' },
  switzerland: { name: 'Switzerland', index: '05', flag: 'CH' },
  canada: { name: 'Canada', index: '06', flag: 'CA' },
  swissBeyond: { name: 'Switzerland', index: '07', flag: 'CH' },
  world: { name: 'World', index: '08', flag: 'WO' },
};

export default function CountryTransition({ activeTheme }: { activeTheme: string }) {
  const [transition, setTransition] = useState<TransitionState>({ visible: false, countryName: '', countryIndex: '', flag: '' });
  const lastThemeRef = useRef<string>('');
  const timeoutRef = useRef<number>(0);

  useEffect(() => {
    if (activeTheme === lastThemeRef.current) return;
    lastThemeRef.current = activeTheme;
    const info = countryInfo[activeTheme];
    if (!info) return;
    window.clearTimeout(timeoutRef.current);
    setTransition({ visible: true, countryName: info.name, countryIndex: info.index, flag: info.flag });
    timeoutRef.current = window.setTimeout(() => {
      setTransition((prev) => ({ ...prev, visible: false }));
    }, 2200);
    return () => window.clearTimeout(timeoutRef.current);
  }, [activeTheme]);

  if (!transition.flag) return null;

  return (
    <div className={`country-transition ${transition.visible ? 'visible' : 'hidden'}`} aria-hidden="true">
      <div className="transition-plane"><Plane size={22} /><span className="plane-trail" /></div>
      <div className="transition-stamp">
        <div className="stamp-border">
          <span className="stamp-index">{transition.countryIndex}</span>
          <strong>{transition.flag}</strong>
          <small>{transition.countryName}</small>
        </div>
      </div>
    </div>
  );
}
