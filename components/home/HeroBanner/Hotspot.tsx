"use client";

import { useRef, useState } from "react";

export function Hotspot({
  x,
  y,
  label,
  icon,
  floatDelay = 0,
  onClick,
}: {
  x: number;
  y: number;
  label: string;
  icon: React.ReactNode;
  floatDelay?: number;
  onClick: () => void;
}) {
  const [ripples, setRipples] = useState<number[]>([]);
  const rippleId = useRef(0);

  const handleClick = () => {
    const id = ++rippleId.current;
    setRipples((r) => [...r, id]);
    window.setTimeout(() => setRipples((r) => r.filter((rid) => rid !== id)), 600);
    onClick();
  };

  return (
    <button
      onClick={handleClick}
      style={{
        left: `${x}%`,
        top: `${y}%`,
        animation: "hotspot-in 0.4s ease-out",
      }}
      className="group absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer focus:outline-none"
    >
      <span
        style={{
          animation: "hotspot-float 2.8s ease-in-out infinite",
          animationDelay: `${floatDelay}s`,
        }}
        className="flex flex-col items-center gap-2"
      >
        <span
          style={{
            animation: "hotspot-breathe 2.4s ease-in-out infinite",
            animationDelay: `${floatDelay}s`,
          }}
          className="relative flex h-9 w-9 items-center justify-center rounded-full border border-white/80 bg-white/20 text-white backdrop-blur-md transition-transform duration-200 group-hover:scale-110 group-active:scale-90"
        >
          <span className="absolute inset-0 animate-ping rounded-full bg-white/40" />
          {ripples.map((id) => (
            <span
              key={id}
              style={{ animation: "hotspot-ripple 0.6s ease-out forwards" }}
              className="pointer-events-none absolute inset-0 rounded-full bg-white/70"
            />
          ))}
          <span className="relative">{icon}</span>
        </span>
        <span className="translate-y-0.5 rounded-full bg-black/70 px-2.5 py-1 text-xs font-medium whitespace-nowrap text-white opacity-95 shadow-sm ring-1 ring-white/10 transition-all duration-200 group-hover:translate-y-0 group-hover:bg-black/85 group-hover:opacity-100">
          {label}
        </span>
      </span>
    </button>
  );
}
