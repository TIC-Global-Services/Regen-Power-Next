const ROWS = 4;
const COLS = 8;
const PANEL_W = 32;
const PANEL_H = 22;
const GAP_X = 6;
const GAP_Y = 8;
const MARGIN = 10;

const GRID_W = COLS * PANEL_W + (COLS - 1) * GAP_X + MARGIN * 2;
const GRID_H = ROWS * PANEL_H + (ROWS - 1) * GAP_Y + MARGIN * 2;

const PANELS = Array.from({ length: ROWS * COLS }, (_, i) => {
  const row = Math.floor(i / COLS);
  const col = i % COLS;
  const x = MARGIN + col * (PANEL_W + GAP_X);
  const y = MARGIN + row * (PANEL_H + GAP_Y);
  return { x, y };
});

function Schematic({ color, opacity }: { color: string; opacity: number }) {
  return (
    <g stroke={color} strokeWidth={1} fill="none" opacity={opacity}>
      {PANELS.map((p, i) => (
        <g key={i}>
          <rect x={p.x} y={p.y} width={PANEL_W} height={PANEL_H} rx={1.5} />
          <line
            x1={p.x + 4}
            y1={p.y + PANEL_H - 4}
            x2={p.x + PANEL_W - 4}
            y2={p.y + 4}
          />
        </g>
      ))}
    </g>
  );
}

export function LoadingScreen({
  progress,
  fadeOut,
}: {
  progress: number;
  fadeOut: boolean;
}) {
  const clamped = Math.min(1, Math.max(0, progress));
  const pct = Math.round(clamped * 100);
  const scanX = clamped * GRID_W;

  return (
    <div
      className={`absolute inset-0 z-40 flex flex-col items-center justify-center overflow-hidden bg-black transition-opacity duration-700 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
      style={{ animation: "guide-in 0.6s cubic-bezier(0.16,1,0.3,1)" }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative" style={{ animation: "corner-fade-in 0.8s ease-out" }}>
        {[
          { top: -14, left: -14, borderTop: true, borderLeft: true },
          { top: -14, right: -14, borderTop: true, borderRight: true },
          { bottom: -14, left: -14, borderBottom: true, borderLeft: true },
          { bottom: -14, right: -14, borderBottom: true, borderRight: true },
        ].map((c, i) => (
          <span
            key={i}
            className="absolute h-3.5 w-3.5"
            style={{
              top: c.top as unknown as string,
              left: c.left as unknown as string,
              right: c.right as unknown as string,
              bottom: c.bottom as unknown as string,
              borderTop: c.borderTop ? "1px solid rgba(63,174,118,0.6)" : undefined,
              borderLeft: c.borderLeft ? "1px solid rgba(63,174,118,0.6)" : undefined,
              borderBottom: c.borderBottom ? "1px solid rgba(63,174,118,0.6)" : undefined,
              borderRight: c.borderRight ? "1px solid rgba(63,174,118,0.6)" : undefined,
            }}
          />
        ))}

        <svg
          width={GRID_W}
          height={GRID_H}
          viewBox={`0 0 ${GRID_W} ${GRID_H}`}
          className="block"
        >
          <defs>
            <clipPath id="scan-clip">
              <rect x={0} y={0} width={scanX} height={GRID_H} />
            </clipPath>
          </defs>

          <Schematic color="rgba(255,255,255,0.28)" opacity={1} />

          <g clipPath="url(#scan-clip)">
            <Schematic color="#3fae76" opacity={0.9} />
          </g>

          <line
            x1={scanX}
            y1={0}
            x2={scanX}
            y2={GRID_H}
            stroke="#a7f3d0"
            strokeWidth={1}
            style={{
              filter: "drop-shadow(0 0 4px rgba(52,211,153,0.8))",
              animation: "scan-pulse 1.6s ease-in-out infinite",
            }}
          />
        </svg>
      </div>

      <div className="relative mt-9 flex flex-col items-center">
        <div className="flex items-start font-mono">
          <span className="text-4xl leading-none font-light tracking-tight tabular-nums text-white sm:text-5xl">
            {pct}
          </span>
          <span className="mt-1 text-base font-light text-white/35 sm:text-lg">%</span>
        </div>

        <span className="mt-4 text-[10px] font-medium tracking-[0.4em] text-white/35 uppercase">
          Mapping array
        </span>
      </div>
    </div>
  );
}
