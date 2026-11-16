import { motion } from "framer-motion";
import { hero } from "@/lib/site-config";
import { Girl } from "./Characters";
import { Photo } from "./Photo";
import { SpeechBubble } from "./SpeechBubble";

const FLOAT_SPOTS = [
  "left-[3%] top-[6%] w-24 sm:w-36 md:w-44 -rotate-6",
  "right-[4%] top-[4%] w-24 sm:w-32 md:w-40 rotate-6",
  "hidden sm:block right-[8%] bottom-[6%] w-24 sm:w-36 md:w-44 -rotate-3",
];

export function ChapterHero({ onStart }: { onStart: () => void }) {
  return (
    <section className="relative flex min-h-full items-center justify-center overflow-hidden px-5 py-10">
      {hero.floatingPhotos.slice(0, 3).map((n, i) => (
        <motion.div
          key={i}
          className={`absolute z-0 opacity-70 sm:opacity-100 ${FLOAT_SPOTS[i] ?? ""}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: [0, -10, 0] }}
          transition={{
            opacity: { duration: 0.8, delay: 0.2 + i * 0.2 },
            y: { duration: 6 + i, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <div className="rounded-sm bg-paper p-2 pb-6 shadow-lift ring-1 ring-border/60">
            <Photo n={n} eager className="aspect-[4/5] w-full rounded-[2px]" />
          </div>
        </motion.div>
      ))}

      <div className="relative z-10 grid w-full max-w-5xl items-center gap-6 md:grid-cols-[minmax(0,300px)_1fr] md:gap-12">
        <div className="mx-auto flex w-full max-w-[260px] flex-col items-center md:max-w-none">
          <SpeechBubble text={hero.bubble} tail="bottom-center" className="mb-2 w-full max-w-[260px] text-center" />
          <Girl pose="wave" expression="joy" className="w-40 sm:w-48 md:w-60" />
        </div>

        <div className="text-center md:text-left">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xs font-semibold uppercase tracking-[0.3em] text-denim"
          >
            {hero.eyebrow}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.7 }}
            className="mt-3 text-5xl font-semibold leading-[0.95] tracking-tight text-ink sm:text-7xl md:text-8xl"
          >
            {hero.headline} <span className="italic text-denim">{hero.headlineAccent}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.7 }}
            className="mt-4 font-display text-2xl italic text-slate sm:text-3xl"
          >
            {hero.subheadline}
          </motion.p>
          <motion.button
            type="button"
            onClick={onStart}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85 }}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-slate px-7 py-3.5 text-base font-semibold text-paper shadow-lift transition-colors hover:bg-ink"
          >
            {hero.button}
          </motion.button>
        </div>
      </div>
    </section>
  );
}
