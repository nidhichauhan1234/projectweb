import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type Origin = { x: string; y: string; angle: number };
type Piece = {
  id: string;
  ox: string;
  oy: string;
  dx: number;
  dy: number;
  rot: number;
  color: string;
  w: number;
  h: number;
  round: boolean;
  delay: number;
};

const COLORS = ["denim", "powder", "sand", "paper", "slate", "mist", "kraft"];

/** Matte paper confetti. Increments of `fire` trigger a new burst from each origin. */
export function ConfettiBurst({ fire, origins, count = 42 }: { fire: number; origins: Origin[]; count?: number }) {
  const [pieces, setPieces] = useState<Piece[]>([]);

  useEffect(() => {
    if (!fire) return;
    const next: Piece[] = [];
    origins.forEach((o, oi) => {
      for (let i = 0; i < count; i++) {
        const a = ((o.angle + (Math.random() - 0.5) * 55) * Math.PI) / 180;
        const v = 160 + Math.random() * 300;
        next.push({
          id: `${fire}-${oi}-${i}`,
          ox: o.x,
          oy: o.y,
          dx: Math.cos(a) * v,
          dy: Math.sin(a) * v,
          rot: (Math.random() - 0.5) * 720,
          color: COLORS[Math.floor(Math.random() * COLORS.length)] ?? "denim",
          w: 6 + Math.random() * 6,
          h: 8 + Math.random() * 8,
          round: Math.random() < 0.3,
          delay: Math.random() * 0.15,
        });
      }
    });
    setPieces(next);
    const t = setTimeout(() => setPieces([]), 3400);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fire]);

  return (
    <div className="pointer-events-none absolute inset-0 z-40 overflow-hidden">
      {pieces.map((p) => (
        <motion.span
          key={p.id}
          className="absolute shadow-[0_1px_1px_color-mix(in_oklab,var(--slate)_20%,transparent)]"
          style={{
            left: p.ox,
            top: p.oy,
            width: p.round ? p.w : p.w,
            height: p.round ? p.w : p.h,
            borderRadius: p.round ? 999 : 2,
            background: `var(--${p.color})`,
          }}
          initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
          animate={{
            x: [0, p.dx, p.dx * 1.2],
            y: [0, p.dy, p.dy + 320],
            rotate: p.rot,
            opacity: [1, 1, 0],
          }}
          transition={{ duration: 2.8, times: [0, 0.32, 1], ease: "easeOut", delay: p.delay }}
        />
      ))}
    </div>
  );
}
