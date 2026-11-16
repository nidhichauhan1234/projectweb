import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { cake } from "@/lib/site-config";
import { Cake } from "./Cake";
import { Boy, Girl } from "./Characters";
import { ConfettiBurst } from "./Confetti";
import { Polaroid } from "./Photo";
import { SpeechBubble } from "./SpeechBubble";

type Phase = "start" | "wished" | "cutting" | "cut" | "feeding";

const CORNERS = [
  "left-2 top-2 -rotate-6 md:left-6 md:top-4",
  "right-2 top-2 rotate-6 md:right-6 md:top-4",
  "left-2 bottom-2 rotate-3 md:left-8 md:bottom-6",
  "right-2 bottom-2 -rotate-3 md:right-8 md:bottom-6",
];

function Popper({ side, show }: { side: "left" | "right"; show: boolean }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.svg
          viewBox="0 0 60 60"
          className={`absolute bottom-[16%] z-30 w-12 sm:w-16 ${side === "left" ? "left-[16%]" : "right-[16%] -scale-x-100"}`}
          initial={{ opacity: 0, scale: 0.4, rotate: -20 }}
          animate={{ opacity: 1, scale: [0.4, 1.15, 1], rotate: 0 }}
          exit={{ opacity: 0 }}
        >
          <path d="M6 56 L22 14 L46 38 Z" className="fill-denim" />
          <path d="M14 35 L34 46 M18 25 L40 40" className="stroke-paper" strokeWidth={3} />
          <ellipse cx="34" cy="26" rx="17" ry="6" transform="rotate(45 34 26)" className="fill-sand" />
        </motion.svg>
      )}
    </AnimatePresence>
  );
}

export function ChapterCake() {
  const [phase, setPhase] = useState<Phase>("start");
  const [fire, setFire] = useState(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const cutTogether = () => {
    setPhase("cutting");
    timers.current.push(
      setTimeout(() => {
        setPhase("cut");
        setFire((f) => f + 1);
      }, 1500),
      setTimeout(() => setPhase("feeding"), 3600),
    );
  };

  const lit = phase === "start";
  const cut = phase === "cut" || phase === "feeding";
  const feeding = phase === "feeding";

  const girlPose =
    phase === "wished" ? "clap" : phase === "cutting" ? "knife" : phase === "cut" ? "cheer" : feeding ? "feed" : "idle";
  const boyPose = phase === "cutting" ? "knife" : phase === "cut" ? "cheer" : feeding ? "feed" : "idle";
  const girlExpr = phase === "start" ? "happy" : feeding ? "blush" : "joy";
  const boyExpr = phase === "start" ? "happy" : feeding ? "chew" : phase === "cutting" ? "happy" : "joy";

  const bubble =
    phase === "start"
      ? cake.bubbleStart
      : phase === "wished"
        ? cake.bubbleWished
        : phase === "cutting"
          ? cake.bubbleCutting
          : cake.bubbleFeeding;

  const shift = phase === "cutting" ? "28%" : feeding ? "92%" : "0%";

  return (
    <section className="relative flex min-h-full flex-col items-center justify-center overflow-hidden px-4 py-8">
      {cake.cornerPhotos.slice(0, 4).map((n, i) => (
        <div key={i} className={`absolute z-0 hidden w-24 opacity-90 sm:block md:w-32 ${CORNERS[i] ?? ""}`}>
          <Polaroid n={n} />
        </div>
      ))}

      <h2 className="relative z-10 text-center text-3xl font-semibold text-ink sm:text-5xl">{cake.title}</h2>
      <SpeechBubble text={bubble} tail="bottom-left" className="relative z-10 mt-4 max-w-xs text-center" />

      <div className="relative z-10 mt-4 flex w-full max-w-3xl items-end justify-center">
        <motion.div
          className="relative z-20"
          animate={{ x: shift }}
          transition={{ type: "spring", stiffness: 70, damping: 14 }}
        >
          <Girl pose={girlPose} expression={girlExpr} holding={feeding} className="w-[92px] sm:w-[150px] md:w-[180px]" />
        </motion.div>

        <motion.div
          className="relative z-10 -mx-2"
          animate={feeding ? { scale: 0.72, y: 30, opacity: 0.28 } : { scale: 1, y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Cake lit={lit} knife={phase === "cutting"} cut={cut} className="w-[150px] sm:w-[240px] md:w-[290px]" />
        </motion.div>

        <motion.div
          className="relative z-20"
          animate={{ x: shift === "0%" ? "0%" : `-${shift}` }}
          transition={{ type: "spring", stiffness: 70, damping: 14 }}
        >
          <Boy pose={boyPose} expression={boyExpr} holding={feeding} className="w-[92px] sm:w-[150px] md:w-[180px]" />
        </motion.div>
      </div>

      <div className="relative z-10 mt-6 flex min-h-[56px] flex-wrap items-center justify-center gap-3">
        <AnimatePresence mode="wait">
          {phase === "start" && (
            <motion.button
              key="blow"
              type="button"
              onClick={() => setPhase("wished")}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              whileTap={{ scale: 0.97 }}
              className="rounded-full bg-slate px-6 py-3 font-semibold text-paper shadow-lift hover:bg-ink"
            >
              🌬️ {cake.blowButton}
            </motion.button>
          )}
          {phase === "wished" && (
            <motion.button
              key="cut"
              type="button"
              onClick={cutTogether}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              whileTap={{ scale: 0.97 }}
              className="rounded-full bg-denim px-6 py-3 font-semibold text-paper shadow-lift hover:bg-slate"
            >
              🔪 {cake.cutButton}
            </motion.button>
          )}
          {feeding && (
            <motion.p
              key="done"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-md text-center font-hand text-2xl text-slate"
            >
              {cake.doneText}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <Popper side="left" show={cut} />
      <Popper side="right" show={cut} />
      <ConfettiBurst
        fire={fire}
        origins={[
          { x: "19%", y: "80%", angle: -62 },
          { x: "81%", y: "80%", angle: -118 },
          { x: "50%", y: "55%", angle: -90 },
        ]}
      />
    </section>
  );
}
