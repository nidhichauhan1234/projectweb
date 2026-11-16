import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import { useState } from "react";
import { gifts } from "@/lib/site-config";
import { Photo } from "../Photo";

function TinyHearts() {
  const spots = [
    "left-3 top-3 rotate-[-12deg]",
    "right-4 top-6 rotate-12",
    "left-5 bottom-4 rotate-6",
    "right-3 bottom-8 rotate-[-8deg]",
  ];
  return (
    <>
      {spots.map((c, i) => (
        <span key={i} className={`pointer-events-none absolute text-sm ${i % 2 ? "text-denim" : "text-blush"} ${c}`}>
          ♥
        </span>
      ))}
    </>
  );
}

function Waterfall() {
  const c = gifts.craft;
  const list = c.waterfallPhotos;
  const max = Math.max(list.length - 1, 0);
  const [flipped, setFlipped] = useState(0);
  const [base, setBase] = useState(0);

  const pull = (steps = 1) => {
    setBase(flipped);
    setFlipped(Math.min(max, flipped + steps));
  };
  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.y > 14) pull(Math.max(1, Math.round(info.offset.y / 22)));
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative aspect-[4/5] w-full max-w-[210px] [perspective:900px]">
        {list.map((n, i) => {
          const isFlipped = i < flipped;
          return (
            <motion.div
              key={i}
              className="absolute inset-0 bg-paper p-1.5 shadow-paper [backface-visibility:hidden]"
              style={{ zIndex: list.length - i, transformOrigin: "50% 100%" }}
              animate={
                isFlipped
                  ? { rotateX: -100, y: 30, opacity: 0 }
                  : { rotateX: 0, y: 0, opacity: 1, rotate: i === flipped ? 0 : (i % 2 ? 2 : -2) }
              }
              transition={{ duration: 0.7, delay: isFlipped ? Math.max(0, i - base) * 0.18 : 0, ease: "easeIn" }}
            >
              <Photo n={n} className="h-full w-full" />
            </motion.div>
          );
        })}
      </div>
      {/* cascade edges of flipped photos */}
      <div className="relative z-10 flex w-full max-w-[210px] flex-col items-center">
        {Array.from({ length: flipped }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className={`h-2.5 rounded-b-sm shadow-paper ring-1 ring-border ${i % 2 ? "bg-mist" : "bg-paper"}`}
            style={{ width: `${96 - i * 6}%` }}
          />
        ))}
      </div>
      <motion.button
        type="button"
        drag="y"
        dragConstraints={{ top: 0, bottom: 60 }}
        dragElastic={0.2}
        dragSnapToOrigin
        onDragEnd={onDragEnd}
        onClick={() => {
          if (flipped >= max) {
            setBase(0);
            setFlipped(0);
          } else pull();
        }}
        whileTap={{ scale: 0.97 }}
        className="relative mt-2 cursor-grab touch-none rounded-b-lg bg-denim px-4 pb-2 pt-3 text-xs font-semibold uppercase tracking-widest text-paper shadow-paper [clip-path:polygon(0_0,100%_0,100%_100%,50%_86%,0_100%)]"
      >
        {flipped >= max ? c.pushBack : c.pullTab}
      </motion.button>
      <p className="mt-1 text-[11px] text-muted-foreground">
        {flipped + 1} / {list.length}
      </p>
    </div>
  );
}

function Envelope() {
  const c = gifts.craft;
  const [open, setOpen] = useState(false);
  return (
    <div className="flex w-full flex-col items-center">
      <AnimatePresence mode="wait">
        {!open ? (
          <motion.button
            key="env"
            type="button"
            onClick={() => setOpen(true)}
            exit={{ opacity: 0, y: -10 }}
            whileHover={{ y: -3 }}
            className="relative aspect-[4/3] w-full max-w-[240px] [perspective:800px]"
            aria-label="Open the envelope"
          >
            <div className="absolute inset-0 rounded-md bg-powder shadow-paper" />
            <div className="absolute inset-x-0 bottom-0 h-3/5 rounded-b-md bg-mist [clip-path:polygon(0_0,50%_45%,100%_0,100%_100%,0_100%)]" />
            <motion.div
              className="absolute inset-x-0 top-0 h-3/5 origin-top bg-denim [clip-path:polygon(0_0,100%_0,50%_100%)]"
              whileHover={{ rotateX: 25 }}
            />
            <span className="absolute left-1/2 top-[52%] grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-slate text-lg text-paper shadow-paper ring-4 ring-slate/30">
              ♥
            </span>
            <span className="absolute inset-x-0 bottom-2 text-center font-hand text-lg text-slate">
              {c.envelopeLabel}
            </span>
          </motion.button>
        ) : (
          <motion.div
            key="note"
            initial={{ opacity: 0, rotateX: 80, y: 20 }}
            animate={{ opacity: 1, rotateX: 0, y: 0 }}
            transition={{ type: "spring", stiffness: 90, damping: 14 }}
            style={{ transformOrigin: "50% 0%" }}
            className="relative w-full rounded-md bg-paper shadow-paper ring-1 ring-border"
          >
            <div className="soft-scroll max-h-[46vh] overflow-y-auto px-5 py-5">
              <p className="text-center font-display text-lg italic text-denim">{c.shayariTitle}</p>
              <div className="mt-2 font-hand text-[19px] leading-7 text-slate">
                {c.shayari.map((line, i) => (line ? <p key={i}>{line}</p> : <div key={i} className="h-4" />))}
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="w-full border-t border-border py-2 text-xs font-semibold uppercase tracking-widest text-denim hover:text-slate"
            >
              fold it back
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function CraftCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className="relative mx-auto w-full max-w-2xl rounded-2xl bg-sand p-3 shadow-lift paper-grain"
    >
      <div className="relative grid gap-5 rounded-xl bg-cream p-5 stitched sm:grid-cols-2 sm:p-7">
        <TinyHearts />
        <div className="relative">
          <Waterfall />
        </div>
        <div className="relative flex flex-col items-center justify-center gap-3 rounded-lg bg-mist/60 p-4">
          <p className="font-hand text-xl text-slate">{gifts.craft.cover}</p>
          <Envelope />
        </div>
      </div>
    </motion.div>
  );
}
