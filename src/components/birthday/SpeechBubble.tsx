import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function SpeechBubble({
  text,
  tail = "bottom-left",
  className,
}: {
  text: string;
  tail?: "bottom-left" | "bottom-right" | "bottom-center" | "left" | "right";
  className?: string;
}) {
  const tailClass = {
    "bottom-left": "-bottom-2 left-8",
    "bottom-right": "-bottom-2 right-8",
    "bottom-center": "-bottom-2 left-1/2 -translate-x-1/2",
    left: "top-1/2 -left-2 -translate-y-1/2",
    right: "top-1/2 -right-2 -translate-y-1/2",
  }[tail];
  return (
    <div className={cn("relative", className)}>
      <AnimatePresence mode="wait">
        <motion.div
          key={text}
          initial={{ opacity: 0, scale: 0.85, y: 6 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: -4 }}
          transition={{ type: "spring", stiffness: 320, damping: 22 }}
          className="relative rounded-2xl border border-border bg-paper px-4 py-3 text-sm font-medium leading-snug text-ink shadow-paper sm:text-base"
        >
          {text}
          <span
            className={cn(
              "absolute h-4 w-4 rotate-45 border-b border-r border-border bg-paper",
              tail === "left" && "border-b-0 border-r-0 border-l border-b",
              tailClass,
            )}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
