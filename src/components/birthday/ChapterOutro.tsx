import { motion } from "framer-motion";
import { outro } from "@/lib/site-config";
import { Boy, Girl } from "./Characters";
import { Photo } from "./Photo";

// 12 collage spots around the edges (top row, sides, bottom row)
const SPOTS = [
  { c: "left-[2%] top-[3%]", r: -7 },
  { c: "left-[17%] top-[1%]", r: 4 },
  { c: "right-[17%] top-[2%]", r: -3 },
  { c: "right-[2%] top-[4%]", r: 6 },
  { c: "left-[1%] top-[29%]", r: 5 },
  { c: "right-[1%] top-[28%]", r: -6 },
  { c: "left-[3%] top-[53%]", r: -4 },
  { c: "right-[3%] top-[52%]", r: 4 },
  { c: "left-[4%] bottom-[2%]", r: 6 },
  { c: "left-[17%] bottom-[1%]", r: -5 },
  { c: "right-[17%] bottom-[2%]", r: 3 },
  { c: "right-[4%] bottom-[3%]", r: -6 },
];

export function ChapterOutro({ onReplay, replayLabel }: { onReplay: () => void; replayLabel: string }) {
  return (
    <section className="relative flex min-h-full items-center justify-center overflow-hidden px-4 py-10">
      {outro.collagePhotos.slice(0, 12).map((n, i) => {
        const s = SPOTS[i];
        if (!s) return null;
        return (
          <motion.div
            key={i}
            className={`absolute z-0 w-16 sm:w-20 lg:w-28 ${s.c} ${i % 2 ? "hidden sm:block" : ""}`}
            initial={{ opacity: 0, scale: 0.6, rotate: 0 }}
            animate={{ opacity: 1, scale: 1, rotate: s.r, y: [0, i % 2 ? -8 : 8, 0] }}
            transition={{
              opacity: { delay: 0.1 * i },
              scale: { delay: 0.1 * i, type: "spring", stiffness: 140 },
              rotate: { delay: 0.1 * i },
              y: { duration: 5 + (i % 4), repeat: Infinity, ease: "easeInOut" },
            }}
          >
            <div className="bg-paper p-1.5 pb-4 shadow-paper ring-1 ring-border/60">
              <Photo n={n} className="aspect-square w-full" />
            </div>
          </motion.div>
        );
      })}

      <div className="relative z-10 flex max-w-xl flex-col items-center text-center">
        <div className="flex items-end">
          <Girl pose="holdHand" expression="blush" className="-mr-[42px] w-32 sm:-mr-[53px] sm:w-40" />
          <Boy pose="holdHand" expression="happy" className="w-32 sm:w-40" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-2 rounded-2xl bg-paper/95 px-6 py-6 shadow-lift ring-1 ring-border paper-grain sm:px-10"
        >
          <p className="font-display text-2xl font-semibold leading-snug text-ink sm:text-3xl">{outro.message}</p>
          <p className="mt-3 font-hand text-2xl text-denim">{outro.signature}</p>
        </motion.div>
        <motion.button
          type="button"
          onClick={onReplay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          whileTap={{ scale: 0.97 }}
          className="mt-6 rounded-full border border-slate/30 bg-paper px-6 py-3 font-semibold text-slate shadow-paper hover:bg-mist"
        >
          {replayLabel}
        </motion.button>
      </div>
    </section>
  );
}
