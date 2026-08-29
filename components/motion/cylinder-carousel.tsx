"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

type Variant = "concave" | "convex";

interface CylinderCarouselProps {
  children: React.ReactNode[];
  variant?: Variant;
  itemSize?: number;
  height?: number;
  gapDeg?: number;
  className?: string;
  autoplayMs?: number | null;
  perspective?: number;
  radiusScale?: number;
  interactive?: boolean;
  showDots?: boolean;
}

export function CylinderCarousel({
  children,
  variant = "concave",
  itemSize = 320,
  height = 420,
  gapDeg,
  className = "",
  autoplayMs = null,
  perspective = 1600,
  radiusScale = 1.6,
  interactive = true,
  showDots = true,
}: CylinderCarouselProps) {
  const count = React.Children.count(children);
  const stepDeg = useMemo(
    () => gapDeg ?? 360 / Math.max(count, 1),
    [gapDeg, count]
  );

  const faceCount = useMemo(() => {
    if (count === 0) return 0;
    // Tile repeats to fill 360° — so 3 items at 18° becomes 20 faces, no empty gap
    const repeats = Math.max(1, Math.ceil(360 / (count * stepDeg)));
    return count * repeats;
  }, [count, stepDeg]);

  const radius = useMemo(() => {
    if (faceCount <= 1) return 600;
    // radius from tiled faceCount, not just count
    const rad = (stepDeg * Math.PI) / 180;
    return (itemSize / (2 * Math.sin(rad / 2) + 0.0001)) * radiusScale;
  }, [itemSize, stepDeg, faceCount, radiusScale]);

  const angle = useMotionValue(0);
  const spring = useSpring(angle, { stiffness: 120, damping: 22, mass: 0.6 });
  const [active, setActive] = useState(0);

  useEffect(() => {
    const unsub = spring.on("change", (v) => {
      const idx = Math.round(((-v % 360) + 360) % 360 / stepDeg) % faceCount % count;
      setActive(idx);
    });
    return () => unsub();
  }, [spring, stepDeg, count, faceCount]);

  const snapTo = useCallback(
    (index: number) => {
      const cur = angle.get();
      const norm = ((index % faceCount) + faceCount) % faceCount;
      const target = -norm * stepDeg;
      let delta = target - cur;
      delta = ((delta + 180) % 360) - 180;
      angle.set(cur + delta);
    },
    [angle, stepDeg, faceCount]
  );

  const next = useCallback(
    () => {
      // always advance forward — monotonic rotation loops round and round, never snaps back
      angle.set(angle.get() - stepDeg);
    },
    [angle, stepDeg]
  );
  const prev = useCallback(
    () => snapTo((active - 1 + count) % count),
    [active, count, snapTo]
  );

  const dragRef = useRef<HTMLDivElement | null>(null);
  const dragStart = useRef<{ x: number; angle: number } | null>(null);

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
      dragStart.current = { x: e.clientX, angle: angle.get() };
    },
    [angle]
  );
  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragStart.current) return;
      const dx = e.clientX - dragStart.current.x;
      angle.set(dragStart.current.angle + dx * 0.35);
    },
    [angle]
  );
  const onPointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (!dragStart.current) return;
      try { (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId); } catch {}
      const cur = angle.get();
      const idx = Math.round(((-cur % 360) + 360) % 360 / stepDeg) % faceCount % count;
      snapTo(idx % count);
      dragStart.current = null;
    },
    [angle, stepDeg, count, snapTo]
  );

  useEffect(() => {
    if (!interactive) return;
    const el = dragRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) < Math.abs(e.deltaY) && Math.abs(e.deltaY) < 8) return;
      const d = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      e.preventDefault();
      angle.set(angle.get() - d * 0.35);
      window.clearTimeout((onWheel as any)._t);
      (onWheel as any)._t = window.setTimeout(() => {
        const cur = angle.get();
        const idx = Math.round(((-cur % 360) + 360) % 360 / stepDeg) % faceCount % count;
        snapTo(idx % count);
      }, 120);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [angle, stepDeg, count, snapTo, interactive]);

  useEffect(() => {
    if (!interactive) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") { e.preventDefault(); next(); }
      if (e.key === "ArrowLeft") { e.preventDefault(); prev(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev, interactive]);

  useEffect(() => {
    if (autoplayMs == null) return;
    const id = window.setInterval(next, autoplayMs);
    return () => window.clearInterval(id);
  }, [autoplayMs, next]);

  if (count === 0) return null;

  return (
    <div
      ref={dragRef}
      onPointerDown={interactive ? onPointerDown : undefined}
      onPointerMove={interactive ? onPointerMove : undefined}
      onPointerUp={interactive ? onPointerUp : undefined}
      onPointerCancel={interactive ? onPointerUp : undefined}
      className={`relative select-none ${interactive ? 'touch-pan-y' : ''} ${className}`}
      style={{ height, perspective, perspectiveOrigin: "50% 50%" } as React.CSSProperties}
      role="region"
      aria-roledescription="carousel"
      aria-label="Achievements"
    >
      {/* Cylinder */}
      <div
        className="absolute left-1/2 top-1/2"
        style={
          {
            width: itemSize,
            height: height - 24,
            transformStyle: "preserve-3d",
            transform: "translate(-50%, -50%)",
          } as React.CSSProperties
        }
      >
        <div
          style={
            {
              width: "100%",
              height: "100%",
              transformStyle: "preserve-3d",
              transform: `translateZ(-${radius}px)`,
            } as React.CSSProperties
          }
        >
          {/* Rotate the whole cylinder */}
          <motion.div
            style={
              {
                width: "100%",
                height: "100%",
                transformStyle: "preserve-3d",
                rotateY: useTransform(spring, (v) => v),
              } as any
            }
          >
          {Array.from({ length: faceCount }).map((_, i) => {
            const child = React.Children.toArray(children)[i % count] as React.ReactNode;
            const theta = i * stepDeg;
            return (
              <motion.div
                key={i}
                className="absolute left-0 top-0 h-full w-full"
                style={
                  {
                    transformStyle: "preserve-3d",
                    transform:
                      variant === "concave"
                        ? `rotateY(${theta}deg) translateZ(${radius}px)`
                        : `rotateY(${theta}deg) translateZ(${-radius}px) rotateY(180deg)`,
                    backfaceVisibility: "hidden",
                  } as React.CSSProperties
                }
                aria-hidden={i !== active}
              >
                <Face active={i === active}>{child}</Face>
              </motion.div>
            );
          })}
          </motion.div>
        </div>
      </div>

      {showDots && (
      <div className="pointer-events-auto absolute bottom-0 left-1/2 flex -translate-x-1/2 gap-2">
        {Array.from({ length: count }).map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => snapTo(i)}
            className={`h-2 rounded-full transition-all ${i === active ? "w-7 bg-[#63B846]" : "w-2 bg-black/20 hover:bg-black/30"}`}
          />
        ))}
      </div>
      )}
    </div>
  );
}

function Face({ active, children }: { active: boolean; children: React.ReactNode }) {
  return (
    <div
      className={`h-full w-full overflow-hidden rounded-2xl border bg-white shadow-sm transition-all duration-300 ${active ? "border-[#63B846]/30 shadow-[0_12px_40px_rgba(0,0,0,0.12)]" : "border-black/5 opacity-90"}`}
      style={{ backfaceVisibility: "hidden" } as React.CSSProperties}
    >
      {children}
    </div>
  );
}
