"use client";

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

/**
 * Shared controls for native scroll-snap mobile sliders.
 *
 * A "native slider" is a plain flex row with overflow-x-auto +
 * snap-x/snap-* children — no slider library. This module supplies:
 *
 *   const { trackRef, sync, active, canPrev, canNext, goTo, next, prev } =
 *     useSnapSlider(items.length);
 *
 *   <div ref={trackRef} onScroll={sync} className="flex overflow-x-auto snap-x ...">
 *     {items.map(... <div className="snap-start shrink-0 w-[75vw]" />)}
 *   </div>
 *   <SliderDots count={items.length} active={active} onSelect={goTo} className="mt-5" />
 *   <SliderArrows canPrev={canPrev} canNext={canNext} onPrev={prev} onNext={next} className="mt-4" />
 *
 * The hook keeps arrow/dot state in sync through momentum scrolling and
 * viewport changes on its own — call sites only need to forward `onScroll`.
 */

/** Gap between slides — keep in sync with the `gap-4` used on tracks. */
const SLIDE_GAP_PX = 16;
/** Tolerance (px) for treating the track as scrolled to an edge. */
const EDGE_EPSILON = 1;

export interface SnapSliderState {
  /** Attach to the horizontally-scrollable track element. */
  trackRef: React.RefObject<HTMLDivElement | null>;
  /** Forward to the track's onScroll (the hook also listens to resize itself). */
  sync: () => void;
  /** Index of the slide currently nearest the snap point. */
  active: number;
  /** True while the track is not scrolled fully to the left. */
  canPrev: boolean;
  /** True while the track is not scrolled fully to the right. */
  canNext: boolean;
  /** Smoothly scroll so slide `index` sits at its snap point. */
  goTo: (index: number) => void;
  /** Smoothly advance one slide. */
  next: () => void;
  /** Smoothly go back one slide. */
  prev: () => void;
}

export function useSnapSlider(count: number): SnapSliderState {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(count > 1);
  const [active, setActive] = useState(0);

  /** Distance between two adjacent snap points (slide width + gap). */
  const step = useCallback(() => {
    const track = trackRef.current;
    if (!track) return 0;
    const children = track.children;
    if (children.length >= 2) {
      const a = children[0] as HTMLElement;
      const b = children[1] as HTMLElement;
      return b.offsetLeft - a.offsetLeft;
    }
    const first = children[0] as HTMLElement | undefined;
    return first ? first.offsetWidth + SLIDE_GAP_PX : 0;
  }, []);

  const sync = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const maxScroll = track.scrollWidth - track.clientWidth;
    const atEnd = track.scrollLeft >= maxScroll - EDGE_EPSILON;
    setCanPrev(track.scrollLeft > EDGE_EPSILON);
    setCanNext(!atEnd && count > 1);

    // When several slides fit per view (e.g. iPad at 45vw cards), max
    // scrollLeft can't reach (count-1)*step — so pin `active` to the last
    // slide once the track is scrolled fully to the end, otherwise the final
    // dot is unreachable.
    if (atEnd && count > 1) {
      setActive((prevIdx) => (prevIdx === count - 1 ? prevIdx : count - 1));
      return;
    }

    const s = step();
    if (s > 0) {
      const idx = Math.min(count - 1, Math.max(0, Math.round(track.scrollLeft / s)));
      setActive((prevIdx) => (prevIdx === idx ? prevIdx : idx));
    }
  }, [count, step]);

  useEffect(() => {
    sync();
    const track = trackRef.current;
    if (!track) return;
    // Re-measure when the layout settles or the viewport changes.
    const ro = new ResizeObserver(sync);
    ro.observe(track);
    window.addEventListener('resize', sync);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', sync);
    };
  }, [sync]);

  const goTo = useCallback(
    (index: number) => {
      const s = step();
      if (s <= 0) return;
      trackRef.current?.scrollTo({ left: index * s, behavior: 'smooth' });
    },
    [step],
  );

  const next = useCallback(() => {
    const s = step();
    if (s <= 0) return;
    trackRef.current?.scrollBy({ left: s, behavior: 'smooth' });
  }, [step]);

  const prev = useCallback(() => {
    const s = step();
    if (s <= 0) return;
    trackRef.current?.scrollBy({ left: -s, behavior: 'smooth' });
  }, [step]);

  return { trackRef, sync, active, canPrev, canNext, goTo, next, prev };
}

/** Pagination dots — active dot stretches into a green pill. */
export function SliderDots({
  count,
  active,
  onSelect,
  className = '',
  dark = false,
}: {
  count: number;
  active: number;
  onSelect: (index: number) => void;
  className?: string;
  /** Use on dark backgrounds so inactive dots stay visible. */
  dark?: boolean;
}) {
  if (count <= 1) return null;
  return (
    <div className={`flex justify-center gap-2 ${className}`}>
      {Array.from({ length: count }, (_, idx) => (
        <button
          key={idx}
          onClick={() => onSelect(idx)}
          aria-label={`Go to slide ${idx + 1}`}
          className={`h-2 rounded-full transition-all duration-300 ${
            idx === active
              ? 'w-7 bg-[#63B846]'
              : dark
                ? 'w-2 bg-white/30 hover:bg-white/50'
                : 'w-2 bg-black/20 hover:bg-black/40'
          }`}
        />
      ))}
    </div>
  );
}

/** Round prev/next arrows matching the desktop deck controls. */
export function SliderArrows({
  canPrev,
  canNext,
  onPrev,
  onNext,
  className = '',
}: {
  canPrev: boolean;
  canNext: boolean;
  onPrev: () => void;
  onNext: () => void;
  className?: string;
}) {
  return (
    <div className={`flex justify-end gap-3 ${className}`}>
      <button
        onClick={onPrev}
        disabled={!canPrev}
        className="w-12 h-12 rounded-full bg-black flex items-center justify-center cursor-pointer text-white hover:bg-black/80 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        aria-label="Previous slide"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>
      <button
        onClick={onNext}
        disabled={!canNext}
        className="w-12 h-12 rounded-full bg-black flex items-center justify-center cursor-pointer text-white hover:bg-black/80 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        aria-label="Next slide"
      >
        <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );
}
