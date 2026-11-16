import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Heart } from "lucide-react";
import { photoSrc } from "@/lib/site-config";
import { cn } from "@/lib/utils";

/** A photo by its number in config.js, with a soft fallback frame if the file is missing. */
export function Photo({
  n,
  className,
  alt,
  eager = false,
}: {
  n: number;
  className?: string;
  alt?: string;
  eager?: boolean | undefined;
}) {
  const src = photoSrc(n);
  const [failed, setFailed] = useState(!src);
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    setFailed(!src);
    const img = ref.current;
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, [src]);

  return (
    <div className={cn("relative overflow-hidden bg-mist", className)}>
      {failed || !src ? (
        <div className="flex h-full w-full flex-col items-center justify-center gap-1 bg-[repeating-linear-gradient(135deg,var(--mist)_0_10px,var(--paper)_10px_20px)] text-denim">
          <Heart className="h-5 w-5" strokeWidth={1.6} />
          <span className="font-hand text-sm leading-none">photo {n}</span>
        </div>
      ) : (
        <img
          ref={ref}
          src={src}
          alt={alt ?? `Memory ${n}`}
          loading={eager ? "eager" : "lazy"}
          draggable={false}
          onError={() => setFailed(true)}
          className="h-full w-full object-cover"
        />
      )}
    </div>
  );
}

export function Polaroid({
  n,
  caption,
  rotate = 0,
  className,
  photoClassName,
  onClick,
  layoutId,
  eager,
}: {
  n: number;
  caption?: string;
  rotate?: number;
  className?: string;
  photoClassName?: string;
  onClick?: () => void;
  layoutId?: string;
  eager?: boolean;
}) {
  const inner = (
    <>
      <Photo n={n} eager={eager} className={cn("aspect-[4/5] w-full rounded-[2px]", photoClassName)} />
      {caption !== undefined && (
        <p className="mt-2 line-clamp-3 min-h-[1.25rem] font-hand text-[15px] leading-tight text-slate sm:text-base">
          {caption}
        </p>
      )}
    </>
  );
  const base = cn(
    "block bg-paper p-2.5 pb-3 text-left shadow-paper ring-1 ring-border/70 paper-grain",
    className,
  );
  if (onClick) {
    return (
      <motion.button
        type="button"
        {...(layoutId ? { layoutId } : {})}
        onClick={onClick}
        style={{ rotate }}
        whileHover={{ rotate: 0, y: -6, scale: 1.03 }}
        className={cn(base, "cursor-zoom-in")}
      >
        {inner}
      </motion.button>
    );
  }
  return (
    <motion.div {...(layoutId ? { layoutId } : {})} style={{ rotate }} className={base}>
      {inner}
    </motion.div>
  );
}
