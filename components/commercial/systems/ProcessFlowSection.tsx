'use client';

import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import SectionHeader from '@/reuseables/SectionHeader';
import type { ResolvedCommercialSystemsProcessFlow } from '@/lib/strapi/resolvers/commercial';

interface Props {
  resolved: ResolvedCommercialSystemsProcessFlow;
}

const ACTIVE_W = 380;
const ACTIVE_H = 500;
const INACTIVE_W = 200;
const INACTIVE_H = 200;
const GAP = 20;

export default function ProcessFlowSection({ resolved }: Props) {
  const { steps } = resolved;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const touchStartXRef = useRef<number | null>(null);

  // Auto-rotation effect
  useEffect(() => {
    if (isHovered || steps.length === 0) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev === steps.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(timer);
  }, [steps.length, isHovered]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsHovered(true);
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    setIsHovered(false);
    if (touchStartXRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartXRef.current - touchEndX;
    const threshold = 35;

    if (diff > threshold) {
      // Swiped left -> next step
      setActiveIndex((prev) => (prev === steps.length - 1 ? 0 : prev + 1));
    } else if (diff < -threshold) {
      // Swiped right -> prev step
      setActiveIndex((prev) => (prev === 0 ? steps.length - 1 : prev - 1));
    }
    touchStartXRef.current = null;
  };

  // Calculate dynamic positioning values to ensure infinite seamless loop
  const numLeft = Math.floor(steps.length / 2);
  const ACTIVE_CENTER = numLeft * (INACTIVE_W + GAP) + ACTIVE_W / 2;
  const totalWidth = (steps.length - 1) * (INACTIVE_W + GAP) + ACTIVE_W + GAP;

  if (steps.length === 0) return null;

  return (
    <section className="py-16 lg:py-24 bg-white overflow-hidden">
      <div className=" mx-auto">
        <div className="px-[5%] md:px-[3%]">
          <SectionHeader
            subtitle={resolved.subtitle}
            title={resolved.title}
            description={resolved.description}
            align="left"
            descClass="md:text-base"
            subtitleClass="text-lg md:text-2xl font-light text-black tracking-tight"
            titleClass="text-4xl md:text-6xl lg:text-[4.5rem] text-[#63B846] font-normal tracking-tighter leading-none"
            className="max-w-4xl mb-8 md:mb-16"
          />
        </div>

        <div
          className="relative w-full max-w-full touch-pan-y"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Marquee viewport — clips overflow */}
          <motion.div
            className="relative w-full overflow-hidden"
            style={{ height: ACTIVE_H + 40 }}
            onPanEnd={(_e, info) => {
              if (info.offset.x < -30) {
                setActiveIndex((prev) => (prev === steps.length - 1 ? 0 : prev + 1));
              } else if (info.offset.x > 30) {
                setActiveIndex((prev) => (prev === 0 ? steps.length - 1 : prev - 1));
              }
            }}
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
                const order = (idx - activeIndex + numLeft + steps.length) % steps.length;
                const isActive = order === numLeft;

                let x = 0;
                if (order < numLeft) {
                  x = order * (INACTIVE_W + GAP);
                } else if (order === numLeft) {
                  x = numLeft * (INACTIVE_W + GAP);
                } else {
                  x = numLeft * (INACTIVE_W + GAP) + ACTIVE_W + GAP + (order - numLeft - 1) * (INACTIVE_W + GAP);
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
                    className={`absolute top-0 left-0 bg-white ${isActive
                      ? 'p-3 border border-dashed border-gray-400 cursor-default'
                      : 'cursor-pointer'
                      }`}
                    style={{ zIndex: isActive ? 10 : 1 }}
                  >
                    <div className="relative w-full h-full overflow-hidden bg-gray-100">
                      <img
                        src={step.image?.src || '/fallback.png'}
                        alt={step.title}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      {isActive && (
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-6 md:p-8 flex flex-col justify-end text-left">
                          <AnimatePresence>
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.2 }}
                            >
                              <h3 className="text-white text-2xl md:text-[2rem] font-normal mb-2 leading-tight">
                                {step.title}
                              </h3>
                              <p className="text-white text-sm md:text-base leading-[1.2] font-light">
                                {step.description}
                              </p>
                            </motion.div>
                          </AnimatePresence>
                        </div>
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
          </div>

          {/* Step number */}
          <div className="flex items-start justify-center mt-2">
            <AnimatePresence mode="wait">
              <motion.p
                key={activeIndex}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.3 }}
                className="text-xl md:text-2xl font-bold text-black tracking-tight text-center"
              >
                Step {steps[activeIndex].stepNumber}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
    </section>
  );
}
