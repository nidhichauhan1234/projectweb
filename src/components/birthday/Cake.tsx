import { AnimatePresence, motion } from "framer-motion";

/** Matte 2-tier birthday cake with "20" candles, smoke, knife and a removable slice. */
export function Cake({
  lit,
  knife,
  cut,
  className,
}: {
  lit: boolean;
  knife: boolean;
  cut: boolean;
  className?: string;
}) {
  const drips = Array.from({ length: 10 }, (_, i) => 40 + i * 20);
  const candles = [
    { x: 116, label: "2" },
    { x: 148, label: "0" },
  ];
  return (
    <div className={className}>
      <svg viewBox="0 0 260 260" className="h-auto w-full overflow-visible" role="img" aria-label="Birthday cake">
        <defs>
          <radialGradient id="cake-glow">
            <stop offset="0%" style={{ stopColor: "var(--flame)", stopOpacity: 0.55 }} />
            <stop offset="100%" style={{ stopColor: "var(--flame)", stopOpacity: 0 }} />
          </radialGradient>
        </defs>

        {/* plate */}
        <ellipse cx="130" cy="240" rx="124" ry="15" className="fill-paper stroke-sand" strokeWidth={2} />
        <ellipse cx="130" cy="246" rx="110" ry="6" className="fill-slate" opacity={0.08} />

        {/* bottom tier */}
        <rect x="28" y="148" width="204" height="90" rx="16" className="fill-denim" />
        <rect x="28" y="148" width="204" height="14" rx="7" className="fill-cream" />
        {drips.map((x, i) => (
          <ellipse key={x} cx={x} cy={160} rx={8} ry={6 + (i % 3) * 3} className="fill-cream" />
        ))}
        {[52, 86, 120, 154, 188, 214].map((x, i) => (
          <circle key={x} cx={x} cy={i % 2 ? 214 : 200} r="3.4" className="fill-paper" opacity={0.85} />
        ))}
        <rect x="28" y="224" width="204" height="10" className="fill-slate" opacity={0.18} />

        {/* cut gap */}
        {cut && (
          <g>
            <rect x="150" y="150" width="38" height="88" className="fill-kraft" />
            <rect x="150" y="178" width="38" height="6" className="fill-cream" />
            <rect x="150" y="206" width="38" height="6" className="fill-cream" />
          </g>
        )}

        {/* top tier */}
        <rect x="64" y="92" width="132" height="60" rx="12" className="fill-paper" />
        <rect x="64" y="92" width="132" height="10" rx="5" className="fill-mist" />
        <rect x="64" y="134" width="132" height="10" className="fill-powder" />
        {[86, 112, 138, 164].map((x) => (
          <path
            key={x}
            d={`M${x} 118 c-3 -4 -9 -2 -7 3 c1 3 7 7 7 7 s6 -4 7 -7 c2 -5 -4 -7 -7 -3z`}
            className="fill-denim"
            opacity={0.8}
          />
        ))}

        {/* candles */}
        {candles.map((c) => (
          <g key={c.label}>
            <text
              x={c.x}
              y={94}
              textAnchor="middle"
              className="fill-powder stroke-slate"
              strokeWidth={1.6}
              style={{ font: "800 46px var(--font-display)", paintOrder: "stroke" }}
            >
              {c.label}
            </text>
            <line x1={c.x} y1={54} x2={c.x} y2={62} className="stroke-ink" strokeWidth={1.6} />
            <AnimatePresence>
              {lit && (
                <motion.g
                  initial={{ opacity: 0, scale: 0.3 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.2 }}
                  style={{ transformOrigin: `${c.x}px 54px` }}
                >
                  <circle cx={c.x} cy={44} r={18} fill="url(#cake-glow)" />
                  <path
                    className="flame fill-flame"
                    d={`M${c.x} 32 C${c.x + 7} 41 ${c.x + 6} 54 ${c.x} 54 C${c.x - 6} 54 ${c.x - 7} 41 ${c.x} 32 Z`}
                  />
                  <path
                    className="flame fill-paper"
                    opacity={0.8}
                    d={`M${c.x} 42 C${c.x + 3} 46 ${c.x + 3} 52 ${c.x} 52 C${c.x - 3} 52 ${c.x - 3} 46 ${c.x} 42 Z`}
                  />
                </motion.g>
              )}
            </AnimatePresence>
            {!lit &&
              [0, 1, 2].map((i) => (
                <motion.circle
                  key={i}
                  cx={c.x}
                  cy={48}
                  r={5}
                  className="fill-mist stroke-powder"
                  strokeWidth={1}
                  initial={{ opacity: 0, y: 0, scale: 0.5 }}
                  animate={{ opacity: [0, 0.9, 0], y: -46, x: (i - 1) * 8, scale: 1.8 }}
                  transition={{ duration: 2, delay: i * 0.35, repeat: 2, ease: "easeOut" }}
                />
              ))}
          </g>
        ))}

        {/* slice coming out */}
        <AnimatePresence>
          {cut && (
            <motion.g
              initial={{ x: 0, y: 0, rotate: 0 }}
              animate={{ x: 48, y: 4, rotate: 6 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              style={{ transformOrigin: "169px 238px" }}
            >
              <rect x="150" y="148" width="38" height="90" className="fill-denim" />
              <rect x="150" y="148" width="38" height="14" className="fill-cream" />
              <ellipse cx="160" cy="161" rx="7" ry="8" className="fill-cream" />
              <ellipse cx="179" cy="160" rx="7" ry="5" className="fill-cream" />
              <circle cx="169" cy="207" r="3.4" className="fill-paper" opacity={0.85} />
              <rect x="150" y="224" width="38" height="10" className="fill-slate" opacity={0.18} />
            </motion.g>
          )}
        </AnimatePresence>

        {/* knife */}
        <AnimatePresence>
          {knife && (
            <motion.g
              initial={{ y: -110, opacity: 0 }}
              animate={{ y: [-110, -70, 0], opacity: 1 }}
              exit={{ y: -120, opacity: 0, transition: { duration: 0.5 } }}
              transition={{ duration: 1.3, times: [0, 0.4, 1], ease: "easeInOut" }}
            >
              <rect x="143" y="70" width="14" height="44" rx="5" className="fill-slate" />
              <rect x="146" y="78" width="8" height="3" rx="1.5" className="fill-powder" />
              <rect x="146" y="92" width="8" height="3" rx="1.5" className="fill-powder" />
              <path d="M144 114 L156 114 L156 214 L150 226 L144 214 Z" className="fill-paper stroke-denim" strokeWidth={1.5} />
            </motion.g>
          )}
        </AnimatePresence>
      </svg>
    </div>
  );
}
