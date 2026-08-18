'use client';

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import SectionHeader from '@/reuseables/SectionHeader';
import type { ResolvedCommercialSystemsProcessFlow } from '@/lib/strapi/resolvers/commercial';

interface Props {
  resolved: ResolvedCommercialSystemsProcessFlow;
}

const ACTIVE_W = 320;
const ACTIVE_H = 400;
const INACTIVE_W = 180;
const INACTIVE_H = 180;
const GAP = 16;

// X offset of the active card's center from the left of the row
const ACTIVE_CENTER = 3 * (INACTIVE_W + GAP) + ACTIVE_W / 2;

export default function ProcessFlowSection({ resolved }: Props) {
  const { steps } = resolved;
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? steps.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === steps.length - 1 ? 0 : prev + 1));
  };

  const totalWidth = 3 * INACTIVE_W + ACTIVE_W + 3 * INACTIVE_W + 6 * GAP;

  return (
    <section className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="px-[5%] mx-auto">
        <SectionHeader
          subtitle={resolved.subtitle}
          title={resolved.title}
          description={resolved.description}
          align="left"
          subtitleClass="text-lg md:text-2xl font-light text-black tracking-tight"
          titleClass="text-4xl md:text-6xl lg:text-[4.5rem] text-[#63B846] font-normal tracking-tighter leading-none"
          className="max-w-4xl mb-4 md:mb-16"
        />

        <div className="relative w-full max-w-full">
          {/* Marquee viewport — clips overflow */}
          <div
            className="relative w-full overflow-hidden"
            style={{ height: ACTIVE_H + 40 }}
          >
            {/* Row — positioned so the active card's center is at the viewport's center */}
            <div
              className="absolute top-0 left-1/2"
              style={{
                width: totalWidth,
                height: '100%',
                transform: `translateX(-${ACTIVE_CENTER}px)`,
              }}
            >
              {steps.map((step, idx) => {
                const order = (idx - activeIndex + 3 + steps.length) % steps.length;
                const isActive = order === 3;

                let x = 0;
                if (order < 3) {
                  x = order * (INACTIVE_W + GAP);
                } else if (order === 3) {
                  x = 3 * (INACTIVE_W + GAP);
                } else {
                  x = 3 * (INACTIVE_W + GAP) + ACTIVE_W + GAP + (order - 4) * (INACTIVE_W + GAP);
                }

                return (
                  <motion.button
                    key={idx}
                    onClick={() => setActiveIndex(idx)}
                    animate={{
                      x,
                      width: isActive ? ACTIVE_W : INACTIVE_W,
                      height: isActive ? ACTIVE_H : INACTIVE_H,
                      y: isActive ? 0 : (ACTIVE_H - INACTIVE_H) / 2,
                    }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className={`absolute top-0 left-0 rounded-[20px] overflow-hidden ${
                      isActive
                        ? 'border-2 border-dashed border-[#63B846]/40'
                        : ''
                    }`}
                    style={{ zIndex: isActive ? 10 : 1 }}
                  >
                    <img
                      src={step.image?.src || '/fallback.png'}
                      alt={step.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    {isActive && (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Active card title + description */}
          <div className="mt-0 max-w-md mx-auto text-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-xl md:text-2xl text-black font-normal tracking-tight leading-tight mb-2">
                  {steps[activeIndex].title}
                </h3>
                <p className="text-sm md:text-base text-black/70 leading-snug tracking-tight">
                  {steps[activeIndex].description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Step number + nav */}
          <div className="flex items-center justify-center gap-4 mt-5">
            <button
              onClick={handlePrev}
              aria-label="Previous step"
              className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <ArrowLeft size={12} style={{ color: '#63B846' }} />
            </button>
            <p className="text-base md:text-lg font-semibold text-black tracking-tight text-center">
              Step {steps[activeIndex].stepNumber}
            </p>
            <button
              onClick={handleNext}
              aria-label="Next step"
              className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <ArrowRight size={12} style={{ color: '#63B846' }} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
