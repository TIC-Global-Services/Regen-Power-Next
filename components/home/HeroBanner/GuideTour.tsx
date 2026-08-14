"use client";

import { ChargingIcon, SolarIcon, StoreIcon, TapIcon } from "./icons";
import { HOME_HOTSPOTS } from "./scenes";

export type TourStop = {
  icon: React.ReactNode;
  title: string;
  body: string;
  target: { x: number; y: number } | null;
};

export const TOUR: TourStop[] = [
  {
    icon: <TapIcon />,
    title: "Welcome",
    body: "This is an interactive scene — tap a glowing point to explore it.",
    target: null,
  },
  {
    icon: <ChargingIcon />,
    title: "Charging Station",
    body: "Tap this point to look closer.",
    target: { x: HOME_HOTSPOTS[0].x, y: HOME_HOTSPOTS[0].y },
  },
  {
    icon: <SolarIcon />,
    title: "Solar Panel",
    body: "Tap this point to look closer.",
    target: { x: HOME_HOTSPOTS[1].x, y: HOME_HOTSPOTS[1].y },
  },
  {
    icon: <StoreIcon />,
    title: "Store Room",
    body: "Tap this point to look closer.",
    target: { x: HOME_HOTSPOTS[2].x, y: HOME_HOTSPOTS[2].y },
  },
];

export function GuideTour({
  stop,
  index,
  total,
  onNext,
  onSkip,
}: {
  stop: TourStop;
  index: number;
  total: number;
  onNext: () => void;
  onSkip: () => void;
}) {
  const isLast = index === total - 1;

  return (
    <>
      <div className="pointer-events-none absolute inset-0 z-20">
        {stop.target ? (
          <div
            style={{
              left: `${stop.target.x}%`,
              top: `${stop.target.y}%`,
              width: 92,
              height: 92,
              transform: "translate(-50%,-50%)",
              boxShadow: "0 0 0 9999px rgba(0,0,0,0.72)",
              transition: "left 0.4s ease, top 0.4s ease",
            }}
            className="absolute rounded-full"
          />
        ) : (
          <div className="absolute inset-0 bg-black/70" />
        )}
      </div>

      <div className="absolute inset-x-0 bottom-0 z-30 flex justify-center p-5">
        <div
          key={index}
          style={{ animation: "guide-in 0.35s cubic-bezier(0.16,1,0.3,1)" }}
          className="w-full max-w-sm rounded-3xl border border-white/15 bg-white/10 p-5 text-white shadow-2xl backdrop-blur-2xl"
        >
          <div className="flex items-start gap-3.5">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/10">
              {stop.icon}
            </span>
            <div className="flex-1 pt-0.5">
              <p className="text-sm font-semibold">{stop.title}</p>
              <p className="mt-0.5 text-sm leading-snug text-white/60">{stop.body}</p>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="flex gap-1.5">
              {Array.from({ length: total }).map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 rounded-full transition-all ${
                    i === index ? "w-4 bg-white" : "w-1.5 bg-white/30"
                  }`}
                />
              ))}
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={onSkip}
                className="cursor-pointer text-xs font-medium text-white/50 transition-colors hover:text-white/80"
              >
                Skip
              </button>
              <button
                onClick={onNext}
                className="cursor-pointer rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-black transition-transform duration-150 hover:scale-105 active:scale-95"
              >
                {isLast ? "Got it" : "Next"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
