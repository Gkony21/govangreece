"use client";

import { useEffect, useRef } from "react";

type Point = { x: number; y: number };
type Bulb = Point & { r: number; phase: number; speed: number };

// A string of lights: its height at the start (and at the end, y1, if different), how far it sags in the middle and
// the bulb radius, in px. from and to: the part of the box's width it spans, 0 to 1; past 0 or 1 it runs off the edge.
// bulbs: how many, instead of one every `spacing` px. vary: bulbs of uneven size. wave: [cycles, height in px] of a
// slack ripple along the string.
type Strand = {
  y: number;
  y1?: number;
  sag: number;
  r: number;
  from?: number;
  to?: number;
  bulbs?: number;
  vary?: boolean;
  wave?: [number, number];
};

// The same uneven sizes on every load and resize.
const uneven = (i: number) => {
  const v = Math.sin(i * 127.1 + 11.7) * 43758.5453;
  return 0.7 + 0.8 * (v - Math.floor(v));
};

// The hero's two strings.
const heroStrands: Strand[] = [
  { y: 18, sag: 70, r: 3 },
  { y: -2, sag: 120, r: 2.2 },
];

type Props = {
  strands?: Strand[];
  // About one bulb every this many px along each string.
  spacing?: number;
  // Draw the wire between the bulbs.
  wire?: boolean;
  wireOpacity?: number;
  // The strands' heights are for a box this wide, in px, and scale with the real one. Without it they stay as they are.
  designWidth?: number;
  // Position and size of the canvas.
  className?: string;
};

// Strings of warm fairy lights hanging across the top of their box, like the event photos on the flyers. Only whole
// bulbs show: where a string runs off the edge of the box, the bulbs it would cut are left out. They twinkle only
// while on screen. Decorative only: hidden from screen readers, and still (no twinkling) with prefers-reduced-motion.
export default function FairyLights({
  strands = heroStrands,
  spacing = 55,
  wire = false,
  wireOpacity = 0.16,
  designWidth,
  className = "absolute inset-x-0 top-0 h-48 w-full",
}: Props) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let bulbs: Bulb[] = [];
    let wires: Point[][] = [];
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

      const scale = designWidth ? w / designWidth : 1;
      const along = (s: Strand, t: number): Point => {
        const from = s.from ?? 0;
        const to = s.to ?? 1;
        const [cycles, ripple] = s.wave ?? [0, 0];
        return {
          x: (from + (to - from) * t) * w,
          y: scale * (s.y + ((s.y1 ?? s.y) - s.y) * t + Math.sin(Math.PI * t) * s.sag + Math.sin(t * Math.PI * 2 * cycles) * ripple),
        };
      };

      wires = wire ? strands.map((s) => Array.from({ length: 49 }, (_, i) => along(s, i / 48))) : [];
      bulbs = strands.flatMap((s, strand) => {
        const n = s.bulbs ?? Math.max(6, Math.round((w * Math.abs((s.to ?? 1) - (s.from ?? 0))) / spacing));
        return Array.from({ length: n + 1 }, (_, i) => ({
          ...along(s, i / n),
          r: s.vary ? s.r * uneven(i + strand * 9) : s.r,
          phase: Math.random() * Math.PI * 2,
          speed: 0.6 + Math.random() * 1.2,
        })).filter((b) => b.x >= b.r * 3 && b.x <= w - b.r * 3 && b.y >= b.r * 3);
      });
      if (still) draw(0);
    }

    function draw(time: number) {
      ctx!.clearRect(0, 0, w, h);
      ctx!.strokeStyle = `rgba(241,236,255,${wireOpacity})`;
      ctx!.lineWidth = 1;
      for (const points of wires) {
        ctx!.beginPath();
        points.forEach((p, i) => (i ? ctx!.lineTo(p.x, p.y) : ctx!.moveTo(p.x, p.y)));
        ctx!.stroke();
      }
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
  }, [strands, spacing, wire, wireOpacity, designWidth]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none ${className}`}
    />
  );
}
