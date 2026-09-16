export const themes = {
  // INDIA — warm, light, sunlit (marigold, saffron)
  india: {
    bg: '#FFF4E6',
    surface: '#FFE4C4',
    ink: '#3d1a00',
    muted: '#8a5a2a',
    line: 'rgba(255,140,26,0.35)',
    accent: '#FF8C1A',
    accentSoft: '#FFD000',
    cyan: '#138808',
    sectionBg: 'linear-gradient(180deg, #FFF4E6 0%, #FFE4C4 100%)',
  },
  // JAPAN — soft, light, pastel (sakura, ink)
  japan: {
    bg: '#FFF0F5',
    surface: '#FFD9E2',
    ink: '#2a0d1c',
    muted: '#a06078',
    line: 'rgba(255,45,107,0.3)',
    accent: '#FF2D6B',
    accentSoft: '#FFB7C5',
    cyan: '#7BB8E8',
    sectionBg: 'linear-gradient(180deg, #FFF0F5 0%, #FFD9E2 100%)',
  },
  // CHINA — rich imperial red, dramatic dark with gold
  china: {
    bg: '#2a0606',
    surface: '#3d0808',
    ink: '#fff0c8',
    muted: '#e0b878',
    line: 'rgba(255,50,50,0.35)',
    accent: '#FF1A1A',
    accentSoft: '#FFDE00',
    cyan: '#4ECDC4',
    sectionBg: 'linear-gradient(180deg, #3d0808 0%, #2a0606 100%)',
  },
  // GERMANY — industrial, cool grey, precise
  germany: {
    bg: '#E8E8EA',
    surface: '#D0D0D4',
    ink: '#1a1a1c',
    muted: '#606064',
    line: 'rgba(0,0,0,0.2)',
    accent: '#DD0000',
    accentSoft: '#FFCE00',
    cyan: '#3a3a3a',
    sectionBg: 'linear-gradient(180deg, #E8E8EA 0%, #D0D0D4 100%)',
  },
  // CANADA — icy blue daylight, aurora accents
  canada: {
    bg: '#EAF2FF',
    surface: '#CCE0FF',
    ink: '#0a1a2e',
    muted: '#5a78a0',
    line: 'rgba(255,51,51,0.3)',
    accent: '#FF3333',
    accentSoft: '#00D9A5',
    cyan: '#5AB8D9',
    sectionBg: 'linear-gradient(180deg, #EAF2FF 0%, #CCE0FF 100%)',
  },
  // SWITZERLAND — alpine white and glacier blue
  switzerland: {
    bg: '#F0F6FA',
    surface: '#D6E8F2',
    ink: '#1A2B3A',
    muted: '#6a8aa5',
    line: 'rgba(213,43,30,0.3)',
    accent: '#D52B1E',
    accentSoft: '#A8D8F0',
    cyan: '#5AB8D9',
    sectionBg: 'linear-gradient(180deg, #F0F6FA 0%, #D6E8F2 100%)',
  },
  // BEYOND THE CV (Switzerland alt) — same alpine palette
  swissBeyond: {
    bg: '#F0F6FA',
    surface: '#D6E8F2',
    ink: '#1A2B3A',
    muted: '#6a8aa5',
    line: 'rgba(213,43,30,0.3)',
    accent: '#D52B1E',
    accentSoft: '#A8D8F0',
    cyan: '#5AB8D9',
    sectionBg: 'linear-gradient(180deg, #F0F6FA 0%, #D6E8F2 100%)',
  },
  // WORLD — deep space, cosmic dark with violet
  world: {
    bg: '#0a0420',
    surface: '#150830',
    ink: '#e8dcff',
    muted: '#a080d8',
    line: 'rgba(160,120,255,0.3)',
    accent: '#A860FF',
    accentSoft: '#00E0FF',
    cyan: '#5A8AE0',
    sectionBg: 'linear-gradient(180deg, #150830 0%, #0a0420 100%)',
  },
} as const;

export const sectionThemeMap: { sectionId: string; themeKey: keyof typeof themes }[] = [
  { sectionId: 'origin', themeKey: 'india' },
  { sectionId: 'about', themeKey: 'japan' },
  { sectionId: 'skills', themeKey: 'china' },
  { sectionId: 'journey', themeKey: 'germany' },
  { sectionId: 'work', themeKey: 'canada' },
  { sectionId: 'beyond', themeKey: 'swissBeyond' },
  { sectionId: 'connect', themeKey: 'world' },
];

export type ThemeName = keyof typeof themes;
export type CountryTheme = (typeof themes)[ThemeName];