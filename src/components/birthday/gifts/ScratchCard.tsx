import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { gifts } from "@/lib/site-config";

// Canvas drawing colors mirror the matte palette tokens (canvas cannot read Tailwind classes).
const COATING = "#8FA8C6";
const COATING_DARK = "#7E9CC0";
const CREAM = "#F7F3EB";

export function ScratchCard() {
  const s = gifts.scratch;
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const last = useRef<{ x: number; y: number } | null>(null);
  const moves = useRef(0);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const c = canvas.current;
    const w = wrap.current;
    if (!c || !w) return;
    const { width, height } = w.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    c.width = width * dpr;
    c.height = height * dpr;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    ctx.scale(dpr, dpr);
    ctx.fillStyle = COATING;
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = COATING_DARK;
    for (let y = 8; y < height; y += 14) {
      for (let x = (y / 14) % 2 ? 8 : 15; x < width; x += 14) {
        ctx.beginPath();
        ctx.arc(x, y, 1.6, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.fillStyle = CREAM;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "600 26px Fraunces, Georgia, serif";
    ctx.fillText(s.coatingText, width / 2, height / 2 - 8);
    ctx.font = "500 13px Figtree, sans-serif";
    ctx.fillText("drag your finger or mouse", width / 2, height / 2 + 22);
  }, [s.coatingText]);

  const scratch = (x: number, y: number) => {
    const ctx = canvas.current?.getContext("2d");
    if (!ctx) return;
    ctx.globalCompositeOperation = "destination-out";
    ctx.lineWidth = 38;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    const from = last.current ?? { x, y };
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(x + 0.1, y + 0.1);
    ctx.stroke();
    last.current = { x, y };
    moves.current += 1;
    if (moves.current % 10 === 0) checkCleared();
  };

  const checkCleared = () => {
    const c = canvas.current;
    const ctx = c?.getContext("2d");
    if (!c || !ctx) return;
    const data = ctx.getImageData(0, 0, c.width, c.height).data;
    let clear = 0;
    let total = 0;
    for (let i = 3; i < data.length; i += 4 * 40) {
      total++;
      if ((data[i] ?? 255) < 30) clear++;
    }
    if (total && clear / total > 0.5) setRevealed(true);
  };

  const pos = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, rotate: 2 }}
      animate={{ opacity: 1, y: 0, rotate: -1 }}
      className="relative mx-auto w-full max-w-md rounded-2xl bg-cream p-3 shadow-lift ring-1 ring-border paper-grain"
    >
      <div className="flex items-center justify-between px-2 pb-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-denim">
        <span>Love Voucher</span>
        <span>No. 20</span>
      </div>
      <div ref={wrap} className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border-2 border-dashed border-powder bg-paper">
        <div className="flex h-full flex-col items-center justify-center px-6 text-center">
          <span className="text-4xl">🎟️</span>
          <p className="mt-2 text-xs font-semibold uppercase tracking-[0.25em] text-denim">{s.label}</p>
          <p className="mt-2 font-display text-xl font-semibold leading-snug text-ink sm:text-2xl">{s.reveal}</p>
          <p className="mt-3 text-xs text-muted-foreground">{s.validity}</p>
        </div>
        <AnimatePresence>
          {!revealed && (
            <motion.canvas
              ref={canvas}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 h-full w-full cursor-grab touch-none rounded-xl"
              onPointerDown={(e) => {
                drawing.current = true;
                e.currentTarget.setPointerCapture(e.pointerId);
                last.current = null;
                const p = pos(e);
                scratch(p.x, p.y);
              }}
              onPointerMove={(e) => {
                if (!drawing.current) return;
                const p = pos(e);
                scratch(p.x, p.y);
              }}
              onPointerUp={() => {
                drawing.current = false;
                last.current = null;
                checkCleared();
              }}
              onPointerCancel={() => {
                drawing.current = false;
              }}
            />
          )}
        </AnimatePresence>
      </div>
      <div className="flex justify-between px-2 pt-2">
        {Array.from({ length: 14 }).map((_, i) => (
          <span key={i} className="h-1.5 w-1.5 rounded-full bg-powder" />
        ))}
      </div>
    </motion.div>
  );
}
