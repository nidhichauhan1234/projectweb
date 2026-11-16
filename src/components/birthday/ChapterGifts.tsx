import { AnimatePresence, motion } from "framer-motion";
import { Check, Lock } from "lucide-react";
import { gifts } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { Boy, Girl } from "./Characters";
import { SpeechBubble } from "./SpeechBubble";
import { CraftCard } from "./gifts/CraftCard";
import { DoubleCard } from "./gifts/DoubleCard";
import { LoveLetter } from "./gifts/LoveLetter";
import { MysteryBox } from "./gifts/MysteryBox";
import { ScratchCard } from "./gifts/ScratchCard";

export const GIFT_COUNT = 5;

function MiniBox({ className }: { className?: string }) {
  return (
    <span className={cn("relative block h-7 w-8", className)}>
      <span className="absolute inset-x-0.5 bottom-0 top-2 rounded-[3px] bg-current" />
      <span className="absolute inset-x-0 top-0.5 h-2.5 rounded-[3px] bg-current brightness-90" />
      <span className="absolute inset-y-0 left-1/2 w-1.5 -translate-x-1/2 bg-paper/90" />
    </span>
  );
}

function ClosedGift({
  index,
  locked,
  onOpen,
}: {
  index: number;
  locked: boolean;
  onOpen: () => void;
}) {
  return (
    <div className="flex flex-col items-center">
      <motion.button
        type="button"
        disabled={locked}
        onClick={() => !locked && onOpen()}
        aria-label={locked ? `Gift ${index + 1} is locked` : `Open gift ${index + 1}`}
        whileHover={locked ? undefined : { y: -6, rotate: -2 }}
        whileTap={locked ? undefined : { scale: 0.95 }}
        animate={locked ? undefined : { y: [0, -5, 0] }}
        transition={{ y: { duration: 2.4, repeat: Infinity, ease: "easeInOut" } }}
        className={cn(
          "relative h-52 w-56 sm:h-60 sm:w-64 transition-opacity",
          locked && "cursor-not-allowed opacity-50 grayscale-[35%]"
        )}
      >
        <div
          className={cn(
            "absolute inset-x-4 bottom-0 top-14 rounded-xl shadow-lift paper-grain",
            index % 2 ? "bg-powder" : "bg-denim"
          )}
        >
          <div className="absolute inset-y-0 left-1/2 w-8 -translate-x-1/2 bg-cream" />
        </div>
        <div
          className={cn(
            "absolute inset-x-0 top-8 h-12 rounded-lg shadow-paper",
            index % 2 ? "bg-denim" : "bg-slate"
          )}
        >
          <div className="absolute inset-y-0 left-1/2 w-8 -translate-x-1/2 bg-cream" />
          <div className="absolute -top-7 left-1/2 flex -translate-x-1/2 gap-0.5">
            <span className="h-8 w-10 -rotate-12 rounded-full border-[7px] border-kraft" />
            <span className="h-8 w-10 rotate-12 rounded-full border-[7px] border-kraft" />
          </div>
        </div>
        <span className="absolute inset-x-0 bottom-6 flex items-center justify-center gap-1.5 font-display text-4xl font-semibold text-paper">
          {locked ? <Lock className="h-7 w-7" /> : `#${index + 1}`}
        </span>
      </motion.button>
      <p className="mt-4 font-hand text-2xl text-slate">
        {locked ? `Open Gift #${index} first 🔒` : gifts.openHint}
      </p>
    </div>
  );
}

export function ChapterGifts({
  index,
  opened,
  onOpen,
  onJump,
}: {
  index: number;
  opened: boolean[];
  onOpen: (i: number) => void;
  onJump: (i: number) => void;
}) {
  const isUnlocked = (i: number) => i === 0 || Boolean(opened[i - 1]);
  const currentUnlocked = isUnlocked(index);
  const isOpen = opened[index] ?? false;
  const isLast = index === GIFT_COUNT - 1;
  const bubble =
    !currentUnlocked
      ? `Pehle Gift #${index} kholo na! 🙈`
      : isLast && isOpen
        ? gifts.surprise.afterOpenBubble
        : (gifts.bubbles[index] ?? "");

  const content = [
    <LoveLetter key="l" />,
    <ScratchCard key="s" />,
    <CraftCard key="c" />,
    <DoubleCard key="d" />,
  ][index];

  return (
    <section className="relative mx-auto flex min-h-full max-w-6xl flex-col px-4 py-6 sm:px-6">
      <h2 className="text-center text-3xl font-semibold text-ink sm:text-5xl">{gifts.title}</h2>

      {/* gift tray */}
      <div className="mx-auto mt-4 flex flex-wrap items-end justify-center gap-2 sm:gap-3">
        {Array.from({ length: GIFT_COUNT }).map((_, i) => {
          const unlocked = isUnlocked(i);
          return (
            <button
              key={i}
              type="button"
              disabled={!unlocked}
              onClick={() => unlocked && onJump(i)}
              title={!unlocked ? `Open Gift #${i} first` : gifts.labels[i]}
              className={cn(
                "group relative flex flex-col items-center rounded-xl px-2 py-1.5 transition-all",
                !unlocked
                  ? "cursor-not-allowed opacity-45"
                  : i === index
                    ? "bg-paper shadow-paper"
                    : "hover:bg-paper/60"
              )}
            >
              <MiniBox
                className={
                  !unlocked
                    ? "text-muted-foreground/50"
                    : i === index
                      ? "text-slate"
                      : opened[i]
                        ? "text-powder"
                        : "text-denim/70"
                }
              />
              <span className="mt-1 hidden text-[11px] font-medium text-muted-foreground sm:block">
                {gifts.labels[i]}
              </span>
              {opened[i] ? (
                <span className="absolute -right-1 -top-1 grid h-4 w-4 place-items-center rounded-full bg-slate text-paper">
                  <Check className="h-2.5 w-2.5" strokeWidth={3} />
                </span>
              ) : (
                !unlocked && (
                  <span className="absolute -right-1 -top-1 grid h-4 w-4 place-items-center rounded-full bg-muted text-muted-foreground">
                    <Lock className="h-2.5 w-2.5" strokeWidth={2.5} />
                  </span>
                )
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-6 grid flex-1 items-center gap-6 md:grid-cols-[260px_1fr] md:gap-10">
        {/* guide */}
        <div className="flex flex-col items-center">
          <SpeechBubble text={bubble} tail="bottom-left" className="mb-1 w-full max-w-[250px] text-center" />
          <div className="flex items-end">
            <Girl
              pose={isLast ? "point" : "holdHand"}
              expression={isLast ? "joy" : "happy"}
              className={cn("w-24 sm:w-32 md:w-36", !isLast && "-mr-8 sm:-mr-[42px] md:-mr-12")}
            />
            <Boy
              pose={isLast ? "idle" : "holdHand"}
              expression={isLast && !isOpen ? "wow" : isOpen ? "joy" : "happy"}
              className="w-24 sm:w-32 md:w-36"
            />
          </div>
        </div>

        {/* gift stage */}
        <div className="flex min-h-[340px] items-center justify-center">
          <AnimatePresence mode="wait">
            {isLast && currentUnlocked ? (
              <motion.div key="mystery" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <MysteryBox onOpened={() => onOpen(index)} />
              </motion.div>
            ) : isOpen && currentUnlocked ? (
              <motion.div
                key={`open-${index}`}
                className="w-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {content}
              </motion.div>
            ) : (
              <motion.div
                key={`closed-${index}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1, y: -20 }}
              >
                <ClosedGift
                  index={index}
                  locked={!currentUnlocked}
                  onOpen={() => currentUnlocked && onOpen(index)}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}