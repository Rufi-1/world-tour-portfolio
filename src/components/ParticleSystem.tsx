import { useEffect, useRef, useState } from 'react';
import type { CountryTheme } from '@/data/themes';

type ParticleProps = { theme: CountryTheme; active: boolean };

export default function ParticleSystem({ theme, active }: ParticleProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(query.matches);
    const onChange = () => setReducedMotion(query.matches);
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (theme.particle === 'none' || !active || reducedMotion) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const count = theme.particle === 'grid' ? 0 : theme.particle === 'starfield' ? Math.min(120, Math.floor(width / 8)) : Math.min(40, Math.floor(width / 22));
    const colors = getParticleColors(theme.particle, theme.accent, theme.accentSoft, theme.cyan);
    particlesRef.current = Array.from({ length: count }, () => createParticle(theme.particle, width, height, colors));

    const onResize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', onResize);

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      for (const p of particlesRef.current) {
        updateParticle(p, theme.particle, width, height);
        drawParticle(ctx, p, theme.particle);
      }
      rafRef.current = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', onResize);
    };
  }, [theme, active, reducedMotion]);

  if (theme.particle === 'none' || !active || reducedMotion) return null;

  return <canvas ref={canvasRef} className="particle-canvas" aria-hidden="true" style={{ width: '100%', height: '100%' }} />;
}

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  rotation: number;
  vr: number;
  opacity: number;
  wobble: number;
  wobbleSpeed: number;
};

function createParticle(kind: string, w: number, h: number, colors: string[]): Particle {
  const base: Particle = {
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.5,
    vy: Math.random() * 0.4 + 0.15,
    size: Math.random() * 6 + 3,
    color: colors[Math.floor(Math.random() * colors.length)],
    rotation: Math.random() * Math.PI * 2,
    vr: (Math.random() - 0.5) * 0.03,
    opacity: Math.random() * 0.5 + 0.25,
    wobble: Math.random() * Math.PI * 2,
    wobbleSpeed: Math.random() * 0.03 + 0.01,
  };
  if (kind === 'snow') { base.vy = Math.random() * 0.6 + 0.2; base.vx = (Math.random() - 0.5) * 0.3; }
  if (kind === 'sakura') { base.vy = Math.random() * 0.5 + 0.2; base.size = Math.random() * 5 + 4; }
  if (kind === 'maple') { base.size = Math.random() * 7 + 5; base.vr = (Math.random() - 0.5) * 0.04; }
  if (kind === 'confetti') { base.vy = Math.random() * 0.6 + 0.3; base.vx = (Math.random() - 0.5) * 0.8; base.size = Math.random() * 5 + 3; }
  if (kind === 'gold') { base.vy = Math.random() * 0.15 + 0.05; base.vx = (Math.random() - 0.5) * 0.15; base.size = Math.random() * 3 + 1; }
  if (kind === 'lantern') { base.vy = -(Math.random() * 0.3 + 0.1); base.size = Math.random() * 8 + 6; base.opacity = Math.random() * 0.3 + 0.15; }
  if (kind === 'starfield') { base.vy = Math.random() * 0.08 + 0.02; base.vx = (Math.random() - 0.5) * 0.04; base.size = Math.random() * 2 + 0.5; base.opacity = Math.random() * 0.7 + 0.2; }
  return base;
}

function updateParticle(p: Particle, kind: string, w: number, h: number) {
  p.wobble += p.wobbleSpeed;
  if (kind === 'sakura' || kind === 'maple' || kind === 'snow') {
    p.x += p.vx + Math.sin(p.wobble) * 0.5;
  } else if (kind === 'confetti') {
    p.x += p.vx + Math.sin(p.wobble) * 0.8;
  } else {
    p.x += p.vx;
  }
  p.y += p.vy;
  p.rotation += p.vr;
  if (p.y > h + 20) { p.y = -20; p.x = Math.random() * w; }
  if (p.y < -40 && p.vy < 0) { p.y = h + 20; p.x = Math.random() * w; }
  if (p.x > w + 20) p.x = -20;
  if (p.x < -20) p.x = w + 20;
}

function drawParticle(ctx: CanvasRenderingContext2D, p: Particle, kind: string) {
  ctx.save();
  ctx.translate(p.x, p.y);
  ctx.rotate(p.rotation);
  ctx.globalAlpha = p.opacity;
  ctx.fillStyle = p.color;
  if (kind === 'sakura') {
    drawPetal(ctx, p.size);
  } else if (kind === 'maple') {
    drawLeaf(ctx, p.size);
  } else if (kind === 'snow') {
    ctx.beginPath();
    ctx.arc(0, 0, p.size * 0.4, 0, Math.PI * 2);
    ctx.fill();
  } else if (kind === 'lantern') {
    ctx.shadowBlur = 20;
    ctx.shadowColor = p.color;
    ctx.beginPath();
    ctx.ellipse(0, 0, p.size * 0.45, p.size * 0.7, 0, 0, Math.PI * 2);
    ctx.fill();
  } else if (kind === 'starfield') {
    ctx.shadowBlur = 4;
    ctx.shadowColor = p.color;
    ctx.beginPath();
    ctx.arc(0, 0, p.size, 0, Math.PI * 2);
    ctx.fill();
  } else if (kind === 'gold') {
    ctx.shadowBlur = 8;
    ctx.shadowColor = p.color;
    ctx.beginPath();
    ctx.arc(0, 0, p.size * 0.35, 0, Math.PI * 2);
    ctx.fill();
  } else if (kind === 'confetti') {
    ctx.fillRect(-p.size * 0.4, -p.size * 0.15, p.size * 0.8, p.size * 0.3);
  }
  ctx.restore();
}

function drawPetal(ctx: CanvasRenderingContext2D, size: number) {
  ctx.beginPath();
  ctx.ellipse(0, 0, size * 0.4, size * 0.6, 0, 0, Math.PI * 2);
  ctx.fill();
}

function drawLeaf(ctx: CanvasRenderingContext2D, size: number) {
  ctx.beginPath();
  ctx.moveTo(0, -size * 0.5);
  ctx.lineTo(size * 0.4, 0);
  ctx.lineTo(0, size * 0.5);
  ctx.lineTo(-size * 0.4, 0);
  ctx.closePath();
  ctx.fill();
}

function getParticleColors(kind: string, accent: string, accentSoft: string, cyan: string): string[] {
  switch (kind) {
    case 'gold': return [accentSoft, '#FFD700', '#e8c068', accent];
    case 'sakura': return ['#FFB7C5', '#FFCCD5', '#FF8FA8', accent];
    case 'lantern': return [accent, '#FF6600', accentSoft, '#ff4400'];
    case 'snow': return ['#ffffff', '#e0e8f0', cyan, '#c0d0e0'];
    case 'maple': return [accent, '#FF4000', '#FF8000', '#FFA000'];
    case 'confetti': return ['#009C3B', '#FFDF00', '#FF8800', accentSoft, '#FF4400', accent];
    default: return [accent, accentSoft, cyan];
  }
}
