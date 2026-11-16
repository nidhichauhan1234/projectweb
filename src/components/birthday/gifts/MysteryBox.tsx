import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { gifts } from "@/lib/site-config";

export function MysteryBox({ onOpened }: { onOpened?: () => void }) {
  const s = gifts.surprise;
  const [phase, setPhase] = useState<"closed" | "shaking" | "open">("closed");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const tap = () => {
    if (phase !== "closed") return;
    setPhase("shaking");
    timer.current = setTimeout(() => {
      setPhase("open");
      onOpened?.();
    }, 1100);
  };

  return (
    <div className="flex flex-col items-center">
      <AnimatePresence>
        {phase === "open" && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.6 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 160, damping: 12 }}
            className="mb-4 rounded-2xl bg-paper px-6 py-5 text-center shadow-lift ring-1 ring-border paper-grain"
          >
            <p className="font-display text-3xl font-semibold text-ink sm:text-4xl">{s.reveal}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={tap}
        aria-label="Mystery gift box"
        animate={
          phase === "shaking"
            ? { rotate: [0, -9, 9, -7, 7, -4, 4, 0], x: [0, -4, 4, -3, 3, 0] }
            : phase === "closed"
              ? { y: [0, -6, 0] }
              : { y: 0 }
        }
        transition={
          phase === "shaking"
            ? { duration: 1, ease: "easeInOut" }
            : { duration: 2, repeat: phase === "closed" ? Infinity : 0, ease: "easeInOut" }
        }
        className="relative h-44 w-48 cursor-pointer sm:h-52 sm:w-56"
      >
        {/* box body */}
        <div className="absolute inset-x-3 bottom-0 top-12 rounded-lg bg-denim shadow-lift paper-grain">
          <div className="absolute inset-y-0 left-1/2 w-7 -translate-x-1/2 bg-paper/90" />
        </div>
        {/* lid */}
        <motion.div
          className="absolute inset-x-0 top-6 h-10 rounded-md bg-slate shadow-paper"
          animate={phase === "open" ? { y: -70, rotate: -18, opacity: 0 } : { y: 0, rotate: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="absolute inset-y-0 left-1/2 w-7 -translate-x-1/2 bg-paper/90" />
          <div className="absolute -top-6 left-1/2 flex -translate-x-1/2 gap-0.5">
            <span className="h-7 w-9 -rotate-12 rounded-full border-[6px] border-kraft" />
            <span className="h-7 w-9 rotate-12 rounded-full border-[6px] border-kraft" />
          </div>
        </motion.div>
        <span className="absolute inset-x-0 top-24 text-center font-display text-5xl font-bold text-paper/90">
          {phase === "open" ? "♥" : "?"}
        </span>
      </motion.button>
      {phase === "closed" && <p className="mt-3 font-hand text-xl text-slate">{s.shakeHint}</p>}
    </div>
  );
}
