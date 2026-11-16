import { motion } from "framer-motion";
import { gifts } from "@/lib/site-config";
import { Photo } from "../Photo";

export function LoveLetter() {
  const l = gifts.letter;
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotate: -2 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 16 }}
      className="relative mx-auto w-full max-w-lg rounded-xl bg-paper shadow-lift ring-1 ring-border paper-grain"
    >
      <div className="soft-scroll max-h-[58vh] overflow-y-auto px-6 pb-8 pt-10 sm:px-10">
        <div className="relative mx-auto w-40 rotate-[-3deg] bg-cream p-2 pb-5 shadow-paper sm:w-48">
          <span className="absolute -top-3 left-1/2 h-6 w-16 -translate-x-1/2 rotate-2 bg-powder/70" />
          <Photo n={l.photo} eager className="aspect-square w-full rounded-[2px]" />
        </div>
        <h3 className="mt-6 text-center text-2xl font-semibold text-ink sm:text-3xl">{l.title}</h3>
        <div className="mx-auto mt-2 h-px w-24 bg-powder" />
        <div className="mt-5 space-y-4 bg-[repeating-linear-gradient(transparent_0_31px,color-mix(in_oklab,var(--powder)_45%,transparent)_31px_32px)] font-hand text-[22px] leading-8 text-slate">
          {l.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <p className="mt-8 text-right font-display italic text-muted-foreground">{l.signoff}</p>
        <p className="text-right font-hand text-3xl text-denim">{l.signature}</p>
      </div>
    </motion.div>
  );
}
