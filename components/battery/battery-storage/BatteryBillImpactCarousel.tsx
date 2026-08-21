"use client";

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { JargonCard } from './BatteryJargon';

/** Shared motion tuning */
const DURATION_MS = 400;

/**
 * Stack-style deck with GPU-only motion:
 * - Cards are absolutely positioned at computed slots and ONLY ever animate
 *   transform/opacity (no width/layout animation → zero reflow, perfectly smooth).
 * - "Next": the front card fades/slides away WHILE the rest glide one slot forward.
 * - "Prev": the previous card fades/scales back in at the front.
 * - The deck does NOT loop: once the last card is at the front, Next disables.
 */
export const BatteryBillImpactCarousel = ({ cards }: { cards: JargonCard[] }) => {
  /** Index of the card currently at the front of the stack. */
  const [start, setStart] = useState(0);
  /** Card index animating out (next) / animating in (prev). */
  const [exiting, setExiting] = useState<number | null>(null);
  const [entering, setEntering] = useState<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const busy = exiting !== null || entering !== null;
  /** Stop advancing while two cards are still on screen — never down to a single card. */
  const canNext = start < cards.length - 2 && !busy;
  const canPrev = start > 0 && !busy;

  const handleNext = () => {
    if (!canNext) return;
    setExiting(start);
    timerRef.current = setTimeout(() => {
      setStart((s) => Math.min(cards.length - 2, s + 1));
      setExiting(null);
    }, DURATION_MS);
  };

  const handlePrev = () => {
    if (!canPrev) return;
    const target = start - 1;
    setEntering(target);
    setStart(target);
    // Hold the entering card un-transitioned for one painted frame, then release
    // it so it fades/scales IN instead of popping.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setEntering(null));
    });
  };

  /** Cards currently on screen: everything from the front to the end of the list. */
  const visible: number[] = [];
  for (let i = start; i < cards.length; i++) visible.push(i);

  /** Slot per visible card — the exiting card takes no slot (others compact forward). */
  let slotCounter = 0;
  const slots = new Map<number, number>();
  for (const idx of visible) {
    if (idx === exiting) continue;
    slots.set(idx, slotCounter++);
  }

  return (
    <div className="w-full relative mt-8 lg:mt-0">
      {/* Slot geometry lives in CSS vars so breakpoints stay in stylesheet-land */}
      <div className="relative h-[400px] md:h-[440px] [--card-w:65vw] md:[--card-w:45vw] lg:[--card-w:20vw] [--gap:1rem]">
        {visible.map((cardIdx) => {
          const card = cards[cardIdx];
          const isExiting = exiting === cardIdx;
          const isEntering = entering === cardIdx;

          const slotTransform = `translateX(calc(${slots.get(cardIdx) ?? 0} * (var(--card-w) + var(--gap))))`;

          let transform = slotTransform;
          let opacity = 1;
          if (isExiting) {
            transform = 'translateX(-3rem) scale(0.92)';
            opacity = 0;
          } else if (isEntering) {
            // First frame: parked at the front slot but hidden; releasing
            // `entering` flips it back to slotTransform with a transition.
            transform = `${slotTransform} scale(0.92)`;
            opacity = 0;
          }

          return (
            <div
              key={cardIdx}
              style={{ width: 'var(--card-w)', transform, opacity }}
              className={`absolute top-0 bottom-0 left-0 rounded-[24px] overflow-hidden group bg-black/5 ${
                isEntering
                  ? '' // no transition on the parking frame
                  : 'transition-[transform,opacity] duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)]'
              } ${isExiting ? 'pointer-events-none' : ''}`}
            >
              <Image
                src={card.image}
                alt={card.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(min-width: 1024px) 20vw, (min-width: 768px) 45vw, 65vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30" />

              {/* Large Number — tied to the card itself */}
              <div className="absolute top-6 left-6 text-white/50 text-7xl md:text-8xl font-light leading-none">
                {cardIdx + 1}
              </div>

              <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full">
                <h4 className="text-xl md:text-2xl text-white font-medium tracking-tight leading-tight capitalize mb-3 ">
                  {card.title}
                </h4>
                <p className="text-white text-base capitalize leading-[1.2]">
                  {card.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-end gap-3 mt-4">
        <button
          onClick={handlePrev}
          disabled={!canPrev}
          className="w-12 h-12 rounded-full bg-black flex items-center justify-center cursor-pointer text-white hover:bg-black/80 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Previous card"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <button
          onClick={handleNext}
          disabled={!canNext}
          className="w-12 h-12 rounded-full bg-black flex items-center justify-center cursor-pointer text-white hover:bg-black/80 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Next card"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
