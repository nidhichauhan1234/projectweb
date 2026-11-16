import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { chapterNames, names, nav } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { ChapterCake } from "@/components/birthday/ChapterCake";
import { ChapterGallery } from "@/components/birthday/ChapterGallery";
import { ChapterGifts, GIFT_COUNT } from "@/components/birthday/ChapterGifts";
import { ChapterHero } from "@/components/birthday/ChapterHero";
import { ChapterOutro } from "@/components/birthday/ChapterOutro";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `Happy 20th Birthday, ${names.him} 💙` },
      {
        name: "description",
        content: `A little interactive birthday surprise for ${names.him} — cake, memories and five gifts.`,
      },
      { property: "og:title", content: `Happy 20th Birthday, ${names.him} 💙` },
      {
        property: "og:description",
        content: "Cake, polaroid memories and five little gifts — made with love.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

// Steps: hero, cake, gallery, 5 gifts, outro
const GIFT_START = 3;
const TOTAL_STEPS = GIFT_START + GIFT_COUNT + 1;
const OUTRO = TOTAL_STEPS - 1;

function chapterOf(step: number) {
  if (step < GIFT_START) return step;
  if (step < OUTRO) return 3;
  return 4;
}

function Index() {
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [opened, setOpened] = useState<boolean[]>(() => Array(GIFT_COUNT).fill(false));
  const scroller = useRef<HTMLElement>(null);

  const go = useCallback((to: number) => {
    const next = Math.max(0, Math.min(OUTRO, to));
    setStep((cur) => {
      setDir(next >= cur ? 1 : -1);
      return next;
    });
  }, []);

  useEffect(() => {
    scroller.current?.scrollTo({ top: 0 });
  }, [step]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLElement && ["INPUT", "TEXTAREA"].includes(e.target.tagName)) return;
      if (e.key === "ArrowRight") go(step + 1);
      if (e.key === "ArrowLeft") go(step - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, step]);

  const chapter = chapterOf(step);
  const giftIndex = step - GIFT_START;

  const openGift = (i: number) =>
    setOpened((o) => {
      const n = [...o];
      n[i] = true;
      return n;
    });

  const restart = () => {
    setOpened(Array(GIFT_COUNT).fill(false));
    go(0);
  };

  let body;
  if (step === 0) body = <ChapterHero onStart={() => go(1)} />;
  else if (step === 1) body = <ChapterCake />;
  else if (step === 2) body = <ChapterGallery />;
  else if (step < OUTRO)
    body = (
      <ChapterGifts
        index={giftIndex}
        opened={opened}
        onOpen={openGift}
        onJump={(i) => go(GIFT_START + i)}
      />
    );
  else body = <ChapterOutro onReplay={restart} replayLabel={nav.replay} />;

  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-matte-sky text-ink">
      {/* progress */}
      <header className="z-20 px-4 pt-3 sm:px-8 sm:pt-4">
        <div className="mx-auto flex max-w-4xl gap-1.5 sm:gap-2">
          {chapterNames.map((name, i) => {
            const fill =
              i < chapter ? 1 : i > chapter ? 0 : i === 3 ? (giftIndex + 1) / GIFT_COUNT : 1;
            return (
              <button
                key={name}
                type="button"
                onClick={() => go(i < 3 ? i : i === 3 ? GIFT_START : OUTRO)}
                className="group flex-1 text-left"
                aria-label={`Go to ${name}`}
              >
                <div className="h-1.5 overflow-hidden rounded-full bg-powder/45">
                  <motion.div
                    className="h-full rounded-full bg-slate"
                    initial={false}
                    animate={{ width: `${fill * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <span
                  className={cn(
                    "mt-1 hidden text-[11px] font-medium uppercase tracking-[0.18em] sm:block",
                    i === chapter ? "text-slate" : "text-muted-foreground/70 group-hover:text-slate",
                  )}
                >
                  {name}
                </span>
              </button>
            );
          })}
        </div>
      </header>

      <main ref={scroller} className="no-scrollbar relative flex-1 overflow-y-auto overflow-x-hidden">
        <AnimatePresence mode="wait" custom={dir} initial={false}>
          <motion.div
            key={step}
            custom={dir}
            className="grid min-h-full"
            initial={{ opacity: 0, x: dir * 48 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: dir * -48 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {body}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* back / next */}
      <footer className="z-20 border-t border-border/60 bg-paper/80 px-4 py-3 backdrop-blur-sm sm:px-8">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => go(step - 1)}
            disabled={step === 0}
            className="rounded-full border border-slate/25 bg-paper px-5 py-2.5 text-sm font-semibold text-slate shadow-paper transition hover:bg-mist disabled:pointer-events-none disabled:opacity-35"
          >
            {nav.back}
          </button>
          <p className="text-center text-xs text-muted-foreground">
            <span className="font-semibold text-slate">{chapterNames[chapter]}</span>
            {chapter === 3 && <span> · gift {giftIndex + 1} of {GIFT_COUNT}</span>}
          </p>
          <button
            type="button"
            onClick={() => go(step + 1)}
            disabled={step === OUTRO}
            className="rounded-full bg-slate px-5 py-2.5 text-sm font-semibold text-paper shadow-paper transition hover:bg-ink disabled:pointer-events-none disabled:opacity-35"
          >
            {nav.next}
          </button>
        </div>
      </footer>
    </div>
  );
}
