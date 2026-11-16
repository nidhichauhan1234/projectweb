import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { gallery } from "@/lib/site-config";
import { Girl } from "./Characters";
import { Photo, Polaroid } from "./Photo";
import { SpeechBubble } from "./SpeechBubble";

const TILTS = [-4, 3, -2, 5, 2, -5, 4, -3];

export function ChapterGallery() {
  const [open, setOpen] = useState<number | null>(null);
  const active = open === null ? null : gallery.items[open];

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <section className="relative mx-auto flex min-h-full max-w-6xl flex-col items-center px-4 py-8 sm:px-6">
      <div className="flex items-end gap-2">
        <Girl pose="point" expression="blush" className="w-20 sm:w-24" />
        <SpeechBubble text={gallery.bubble} tail="left" className="mb-12 max-w-[240px] sm:max-w-xs" />
      </div>
      <h2 className="mt-1 text-center text-3xl font-semibold text-ink sm:text-5xl">{gallery.title}</h2>
      <p className="mt-2 text-sm text-muted-foreground">{gallery.hint}</p>

      <div className="mt-8 grid w-full grid-cols-2 gap-5 sm:grid-cols-3 sm:gap-7 lg:grid-cols-4">
        {gallery.items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * i }}
          >
            <Polaroid
              n={item.photo}
              caption={item.caption}
              rotate={TILTS[i % TILTS.length] ?? 0}
              layoutId={`polaroid-${i}`}
              onClick={() => setOpen(i)}
              className={i % 2 ? "bg-paper" : "bg-cream"}
            />
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {active && open !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink/35 p-4 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
          >
            <motion.div
              layoutId={`polaroid-${open}`}
              className="relative w-full max-w-md bg-paper p-4 pb-5 shadow-lift paper-grain"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setOpen(null)}
                aria-label="Close"
                className="absolute -right-3 -top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-slate text-paper shadow-paper"
              >
                <X className="h-4 w-4" />
              </button>
              <Photo n={active.photo} eager className="aspect-[4/5] max-h-[65vh] w-full rounded-[2px]" />
              {active.caption && (
                <p className="mt-3 font-hand text-2xl leading-snug text-slate">{active.caption}</p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
