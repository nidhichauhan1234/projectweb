import { motion } from "framer-motion";
import { useState } from "react";
import { gifts } from "@/lib/site-config";
import { Photo } from "../Photo";

export function DoubleCard() {
  const d = gifts.double;
  const [open, setOpen] = useState(false);
  return (
    <div className="relative mx-auto w-full max-w-md [perspective:1200px]">
      {/* inside */}
      <div className="relative rounded-2xl bg-paper p-6 text-center shadow-lift ring-1 ring-border paper-grain">
        <motion.div
          initial={false}
          animate={open ? { scale: 1, rotate: -4, y: 0, opacity: 1 } : { scale: 0.4, y: 30, opacity: 0 }}
          transition={{ type: "spring", stiffness: 180, damping: 12, delay: open ? 0.45 : 0 }}
          className="mx-auto w-36 bg-cream p-2 pb-4 shadow-paper ring-2 ring-powder"
        >
          <Photo n={d.photo} className="aspect-square w-full" />
          <p className="mt-1 font-hand text-lg text-denim">×2</p>
        </motion.div>
        <motion.p
          initial={false}
          animate={open ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ delay: open ? 0.7 : 0 }}
          className="mt-5 font-display text-xl font-semibold leading-snug text-ink"
        >
          {d.message}
        </motion.p>
        <motion.div
          initial={false}
          animate={open ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ delay: open ? 0.9 : 0 }}
          className="mt-5 rounded-xl border-2 border-dashed border-powder bg-mist/50 p-4"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-denim">{d.wishTitle}</p>
          <p className="mt-1 font-hand text-xl text-slate">{d.wish}</p>
        </motion.div>
      </div>

      {/* cover */}
      <motion.button
        type="button"
        onClick={() => setOpen(true)}
        initial={false}
        animate={open ? { rotateY: -165, opacity: 0 } : { rotateY: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: "easeInOut", opacity: { delay: open ? 0.6 : 0, duration: 0.3 } }}
        style={{ transformOrigin: "0% 50%", pointerEvents: open ? "none" : "auto" }}
        className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl bg-denim text-paper shadow-lift paper-grain [backface-visibility:hidden]"
      >
        <span className="font-display text-8xl font-semibold italic leading-none">2×</span>
        <span className="mt-4 rounded-full bg-paper/15 px-4 py-1.5 text-sm font-semibold">{d.cover}</span>
        <span className="mt-6 text-2xl">🎉 🎂</span>
      </motion.button>
    </div>
  );
}
