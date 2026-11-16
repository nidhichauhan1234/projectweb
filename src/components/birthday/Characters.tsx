import { AnimatePresence, motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type Pose = "idle" | "wave" | "clap" | "point" | "holdHand" | "knife" | "feed" | "cheer";
export type Expression = "happy" | "joy" | "blush" | "wow" | "chew";

type ArmSpec = { deg: number; anim?: string };

const GIRL_ARMS: Record<Pose, [ArmSpec, ArmSpec]> = {
  idle: [{ deg: 8 }, { deg: -8 }],
  wave: [{ deg: 8 }, { deg: -160, anim: "anim-wave-right" }],
  clap: [
    { deg: -50, anim: "anim-clap-l" },
    { deg: 50, anim: "anim-clap-r" },
  ],
  point: [{ deg: 10 }, { deg: -105 }],
  holdHand: [{ deg: 8 }, { deg: -40 }],
  knife: [{ deg: -62 }, { deg: -74 }],
  feed: [{ deg: 10 }, { deg: -118 }],
  cheer: [{ deg: 155 }, { deg: -155 }],
};

const BOY_ARMS: Record<Pose, [ArmSpec, ArmSpec]> = {
  idle: [{ deg: 8 }, { deg: -8 }],
  wave: [{ deg: 160, anim: "anim-wave-left" }, { deg: -8 }],
  clap: [
    { deg: -50, anim: "anim-clap-l" },
    { deg: 50, anim: "anim-clap-r" },
  ],
  point: [{ deg: 105 }, { deg: -10 }],
  holdHand: [{ deg: 40 }, { deg: -8 }],
  knife: [{ deg: 74 }, { deg: 62 }],
  feed: [{ deg: 118 }, { deg: -10 }],
  cheer: [{ deg: 155 }, { deg: -155 }],
};

function Limb({
  ox,
  oy,
  spec,
  children,
}: {
  ox: number;
  oy: number;
  spec: ArmSpec;
  children: ReactNode;
}) {
  return (
    <g
      className={cn("limb", spec.anim)}
      style={{ transformOrigin: `${ox}px ${oy}px`, transform: `rotate(${spec.deg}deg)` }}
    >
      {children}
    </g>
  );
}

/** Small cake slice held upright in a hand. */
function Slice({ x, y, counter }: { x: number; y: number; counter: number }) {
  return (
    <g transform={`rotate(${counter} ${x} ${y}) translate(${x - 11} ${y - 20})`}>
      <path d="M0 14 L22 14 L22 2 L0 8 Z" className="fill-kraft" />
      <path d="M0 8 L22 2 L22 5 L0 11 Z" className="fill-paper" />
      <path d="M0 14 L22 14 L22 18 L0 18 Z" className="fill-denim" />
      <circle cx="17" cy="1" r="2.4" className="fill-powder" />
    </g>
  );
}

function Eyes({
  expression,
  y,
  lx,
  rx,
}: {
  expression: Expression;
  y: number;
  lx: number;
  rx: number;
}) {
  if (expression === "joy" || expression === "chew" || expression === "blush") {
    const d = (x: number) =>
      expression === "blush"
        ? `M${x - 5} ${y} Q${x} ${y + 4} ${x + 5} ${y}`
        : `M${x - 5} ${y + 1} Q${x} ${y - 6} ${x + 5} ${y + 1}`;
    return (
      <g className="fill-none stroke-ink" strokeWidth={2.4} strokeLinecap="round">
        <path d={d(lx)} />
        <path d={d(rx)} />
      </g>
    );
  }
  const big = expression === "wow";
  return (
    <g>
      {[lx, rx].map((x) => (
        <g key={x} className="blink">
          <ellipse cx={x} cy={y} rx={big ? 5 : 4.3} ry={big ? 6.5 : 5.6} className="fill-ink" />
          <circle cx={x + 1.6} cy={y - 2.2} r={1.7} className="fill-paper" />
          <circle cx={x - 1.4} cy={y + 2} r={0.8} className="fill-paper" />
        </g>
      ))}
    </g>
  );
}

function Mouth({ expression, cx, y }: { expression: Expression; cx: number; y: number }) {
  switch (expression) {
    case "joy":
      return (
        <g>
          <path
            d={`M${cx - 9} ${y - 1} Q${cx} ${y + 13} ${cx + 9} ${y - 1} Z`}
            className="fill-slate"
          />
          <path
            d={`M${cx - 5} ${y + 5} Q${cx} ${y + 2} ${cx + 5} ${y + 5} Q${cx} ${y + 10} ${cx - 5} ${y + 5} Z`}
            className="fill-cheek"
          />
        </g>
      );
    case "wow":
      return <ellipse cx={cx} cy={y + 3} rx={4} ry={5} className="fill-slate" />;
    case "chew":
      return (
        <path
          d={`M${cx - 7} ${y + 2} q3.5 4 7 0 q3.5 4 7 0`}
          className="fill-none stroke-ink"
          strokeWidth={2.2}
          strokeLinecap="round"
        />
      );
    case "blush":
      return (
        <path
          d={`M${cx - 5} ${y + 1} Q${cx} ${y + 6} ${cx + 5} ${y + 1}`}
          className="fill-none stroke-ink"
          strokeWidth={2.2}
          strokeLinecap="round"
        />
      );
    default:
      return (
        <path
          d={`M${cx - 8} ${y} Q${cx} ${y + 9} ${cx + 8} ${y}`}
          className="fill-none stroke-ink"
          strokeWidth={2.4}
          strokeLinecap="round"
        />
      );
  }
}

function FloatingHearts({ show }: { show: boolean }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="pointer-events-none absolute -top-2 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="absolute text-denim"
              style={{ left: (i - 1) * 18, fontSize: 14 + i * 3 }}
              animate={{ y: [0, -34], opacity: [0, 1, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.6, ease: "easeOut" }}
            >
              ♥
            </motion.span>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

type CharacterProps = {
  pose?: Pose;
  expression?: Expression;
  holding?: boolean;
  className?: string;
  bob?: boolean;
};

export function Girl({
  pose = "idle",
  expression = "happy",
  holding = false,
  className,
  bob = true,
}: CharacterProps) {
  const [L, R] = GIRL_ARMS[pose];
  const blushOpacity = expression === "blush" || expression === "chew" ? 0.95 : 0.6;
  return (
    <motion.div
      className={cn("relative select-none", className)}
      animate={bob ? { y: [0, -4, 0] } : { y: 0 }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      aria-label="Illustrated girl"
      role="img"
    >
      <FloatingHearts show={expression === "blush"} />
      <svg viewBox="0 0 200 360" className="h-auto w-full overflow-visible">
        {/* soft ground shadow */}
        <ellipse cx="100" cy="346" rx="48" ry="7" className="fill-slate" opacity={0.12} />
        {/* long hair, back */}
        <path
          d="M58 90 C50 150 48 205 62 246 Q100 258 138 246 C152 205 150 150 142 90 Z"
          className="fill-hair"
        />
        {/* legs + shoes */}
        <rect x="85" y="288" width="11" height="50" rx="5.5" className="fill-skin" />
        <rect x="104" y="288" width="11" height="50" rx="5.5" className="fill-skin" />
        <ellipse cx="89" cy="340" rx="11" ry="6" className="fill-slate" />
        <ellipse cx="111" cy="340" rx="11" ry="6" className="fill-slate" />
        {/* beige skirt */}
        <path d="M74 198 L126 198 L144 294 Q100 306 56 294 Z" className="fill-sand" />
        <path d="M60 282 Q100 293 140 282 L144 294 Q100 306 56 294 Z" className="fill-powder" />
        <path
          d="M86 204 L80 292 M100 204 L100 298 M114 204 L120 292"
          className="fill-none stroke-kraft"
          strokeWidth={1.5}
          opacity={0.7}
        />
        {/* powder blue top */}
        <path
          d="M72 152 Q72 137 87 135 L113 135 Q128 137 128 152 L128 206 L72 206 Z"
          className="fill-powder"
        />
        <rect x="72" y="198" width="56" height="9" rx="3" className="fill-denim" />
        <path d="M88 135 L100 152 L112 135 Z" className="fill-paper" />
        <circle cx="100" cy="166" r="2.2" className="fill-paper" />
        <circle cx="100" cy="180" r="2.2" className="fill-paper" />
        {/* neck */}
        <rect x="93" y="120" width="14" height="20" rx="5" className="fill-skin-shade" />
        {/* head */}
        <circle cx="60" cy="94" r="7" className="fill-skin" />
        <circle cx="140" cy="94" r="7" className="fill-skin" />
        <circle cx="100" cy="88" r="40" className="fill-skin" />
        {/* hair front */}
        <path
          d="M58 94 C54 50 80 40 100 40 C126 40 148 52 142 96 C134 76 120 64 102 60 C94 74 78 84 58 94 Z"
          className="fill-hair"
        />
        <path d="M60 86 C55 122 57 146 66 168 L74 156 C66 132 66 110 68 92 Z" className="fill-hair" />
        <path
          d="M140 86 C145 122 143 146 134 168 L126 156 C134 132 134 110 132 92 Z"
          className="fill-hair"
        />
        <path
          d="M84 50 C96 44 116 46 128 56"
          className="fill-none stroke-hair-soft"
          strokeWidth={3}
          strokeLinecap="round"
        />
        {/* little blue bow */}
        <g transform="translate(128 58) rotate(20)">
          <path d="M0 0 L-11 -7 L-11 7 Z" className="fill-denim" />
          <path d="M0 0 L11 -7 L11 7 Z" className="fill-denim" />
          <circle r="3.2" className="fill-powder" />
        </g>
        {/* brows */}
        <path
          d="M79 78 Q86 74 93 77 M107 77 Q114 74 121 78"
          className="fill-none stroke-hair"
          strokeWidth={2.2}
          strokeLinecap="round"
        />
        <Eyes expression={expression} y={94} lx={86} rx={114} />
        {/* round glasses */}
        <g className="fill-none stroke-slate" strokeWidth={2}>
          <circle cx="86" cy="94" r="11.5" />
          <circle cx="114" cy="94" r="11.5" />
          <path d="M97.5 92 Q100 89 102.5 92" />
        </g>
        {/* cheeks */}
        <ellipse cx="76" cy="109" rx="6.5" ry="3.8" className="fill-cheek" opacity={blushOpacity} />
        <ellipse cx="124" cy="109" rx="6.5" ry="3.8" className="fill-cheek" opacity={blushOpacity} />
        <Mouth expression={expression} cx={100} y={110} />
        {/* arms (in front) */}
        <Limb ox={74} oy={146} spec={L}>
          <rect x="66" y="141" width="16" height="40" rx="8" className="fill-powder" />
          <rect x="68" y="176" width="12" height="26" rx="6" className="fill-skin" />
          <circle cx="74" cy="203" r="7" className="fill-skin" />
        </Limb>
        <Limb ox={126} oy={146} spec={R}>
          <rect x="118" y="141" width="16" height="40" rx="8" className="fill-powder" />
          <rect x="120" y="176" width="12" height="26" rx="6" className="fill-skin" />
          <circle cx="126" cy="203" r="7" className="fill-skin" />
          {holding && <Slice x={126} y={206} counter={-R.deg} />}
        </Limb>
      </svg>
    </motion.div>
  );
}

export function Boy({
  pose = "idle",
  expression = "happy",
  holding = false,
  className,
  bob = true,
}: CharacterProps) {
  const [L, R] = BOY_ARMS[pose];
  const blushOpacity = expression === "blush" || expression === "chew" ? 0.9 : 0.35;
  return (
    <motion.div
      className={cn("relative select-none", className)}
      animate={bob ? { y: [0, -3, 0] } : { y: 0 }}
      transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
      aria-label="Illustrated Aryan"
      role="img"
    >
      <FloatingHearts show={expression === "blush"} />
      <svg viewBox="0 0 200 360" className="h-auto w-full overflow-visible">
        <ellipse cx="100" cy="346" rx="52" ry="7" className="fill-slate" opacity={0.12} />
        {/* trousers + shoes */}
        <rect x="78" y="222" width="21" height="112" rx="9" className="fill-slate" />
        <rect x="101" y="222" width="21" height="112" rx="9" className="fill-slate" />
        <ellipse cx="87" cy="337" rx="14" ry="7" className="fill-paper stroke-denim" strokeWidth={1.5} />
        <ellipse cx="113" cy="337" rx="14" ry="7" className="fill-paper stroke-denim" strokeWidth={1.5} />
        {/* overshirt */}
        <path
          d="M66 146 Q66 130 84 128 L116 128 Q134 130 134 146 L134 234 L66 234 Z"
          className="fill-denim"
        />
        {/* white tee */}
        <path d="M88 128 L112 128 L110 234 L90 234 Z" className="fill-paper" />
        <path d="M88 128 L80 152 L94 140 Z M112 128 L120 152 L106 140 Z" className="fill-slate" opacity={0.55} />
        <rect x="114" y="160" width="12" height="9" rx="2" className="fill-slate" opacity={0.35} />
        {/* neck */}
        <rect x="92" y="110" width="16" height="22" rx="6" className="fill-skin-shade" />
        {/* head */}
        <circle cx="60" cy="84" r="7" className="fill-skin" />
        <circle cx="140" cy="84" r="7" className="fill-skin" />
        <circle cx="100" cy="78" r="40" className="fill-skin" />
        {/* styled hair */}
        <path
          d="M59 84 C54 46 78 30 104 31 C130 30 148 46 141 82 C137 68 131 60 123 57 C112 64 92 62 80 55 C72 62 63 70 59 84 Z"
          className="fill-hair"
        />
        <path d="M80 40 C92 18 124 18 136 38 C122 32 102 33 80 40 Z" className="fill-hair" />
        <path
          d="M92 34 C104 26 118 27 128 34"
          className="fill-none stroke-hair-soft"
          strokeWidth={3}
          strokeLinecap="round"
        />
        {/* brows */}
        <path
          d="M77 68 Q86 63 95 67 M105 67 Q114 63 123 68"
          className="fill-none stroke-hair"
          strokeWidth={3.2}
          strokeLinecap="round"
        />
        <Eyes expression={expression} y={84} lx={86} rx={114} />
        {/* square glasses */}
        <g className="fill-none stroke-ink" strokeWidth={2.6}>
          <rect x="73" y="74" width="26" height="20" rx="6" />
          <rect x="101" y="74" width="26" height="20" rx="6" />
          <path d="M99 82 L101 82" />
        </g>
        <ellipse cx="74" cy="100" rx="6" ry="3.4" className="fill-cheek" opacity={blushOpacity} />
        <ellipse cx="126" cy="100" rx="6" ry="3.4" className="fill-cheek" opacity={blushOpacity} />
        {expression === "happy" ? (
          <g>
            <path d={`M89 101 Q101 112 112 99`} className="fill-paper stroke-ink" strokeWidth={2.2} strokeLinejoin="round" />
          </g>
        ) : (
          <Mouth expression={expression} cx={100} y={101} />
        )}
        {/* arms */}
        <Limb ox={70} oy={140} spec={L}>
          <rect x="61" y="135" width="18" height="46" rx="9" className="fill-denim" />
          <rect x="64" y="178" width="12" height="27" rx="6" className="fill-skin" />
          <circle cx="70" cy="206" r="7.5" className="fill-skin" />
          {holding && <Slice x={70} y={209} counter={-L.deg} />}
        </Limb>
        <Limb ox={130} oy={140} spec={R}>
          <rect x="121" y="135" width="18" height="46" rx="9" className="fill-denim" />
          <rect x="124" y="178" width="12" height="27" rx="6" className="fill-skin" />
          <circle cx="130" cy="206" r="7.5" className="fill-skin" />
        </Limb>
      </svg>
    </motion.div>
  );
}
