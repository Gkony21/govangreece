"use client";

import { useEffect, useRef } from "react";

type Bulb = { x: number; y: number; r: number; phase: number; speed: number };

// A string of lights: its height at the ends, how far it sags in the middle, and the bulb radius, in px.
type Strand = { y: number; sag: number; r: number };

// The hero's two strings.
const heroStrands: Strand[] = [
  { y: 18, sag: 70, r: 3 },
  { y: -2, sag: 120, r: 2.2 },
];

type Props = {
  strands?: Strand[];
  // About one bulb every this many px along each string.
  spacing?: number;
  // Position and size of the canvas.
  className?: string;
};

// Strings of warm fairy lights hanging across the top of their box, like the event photos on the flyers. They twinkle
// only while on screen. Decorative only: hidden from screen readers, and still (no twinkling) with
// prefers-reduced-motion.
export default function FairyLights({
  strands = heroStrands,
  spacing = 55,
  className = "absolute inset-x-0 top-0 h-48 w-full",
}: Props) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let bulbs: Bulb[] = [];
    let w = 0;
    let h = 0;
    let frame = 0;
    let visible = false;

    function layout() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas!.clientWidth;
      h = canvas!.clientHeight;
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      bulbs = strands.flatMap((s) => {
        const n = Math.max(6, Math.round(w / spacing));
        return Array.from({ length: n + 1 }, (_, i) => {
          const t = i / n;
          return {
            x: t * w,
            y: s.y + Math.sin(Math.PI * t) * s.sag,
            r: s.r,
            phase: Math.random() * Math.PI * 2,
            speed: 0.6 + Math.random() * 1.2,
          };
        });
      });
      if (still) draw(0);
    }

    function draw(time: number) {
      ctx!.clearRect(0, 0, w, h);
      for (const b of bulbs) {
        const glow = still ? 0.85 : 0.55 + 0.45 * Math.sin((time / 1000) * b.speed + b.phase);
        const g = ctx!.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r * 7);
        g.addColorStop(0, `rgba(255,214,140,${0.9 * glow})`);
        g.addColorStop(0.25, `rgba(255,195,92,${0.35 * glow})`);
        g.addColorStop(1, "rgba(255,195,92,0)");
        ctx!.fillStyle = g;
        ctx!.beginPath();
        ctx!.arc(b.x, b.y, b.r * 7, 0, Math.PI * 2);
        ctx!.fill();
        ctx!.fillStyle = `rgba(255,240,210,${0.6 + 0.4 * glow})`;
        ctx!.beginPath();
        ctx!.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx!.fill();
      }
      if (!still && visible) frame = requestAnimationFrame(draw);
    }

    // Twinkle only while on screen (and not at all while hidden, e.g. display: none on phones).
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      cancelAnimationFrame(frame);
      if (visible && !still) frame = requestAnimationFrame(draw);
    });

    layout();
    window.addEventListener("resize", layout);
    observer.observe(canvas);
    return () => {
      window.removeEventListener("resize", layout);
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [strands, spacing]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none ${className}`}
    />
  );
}
