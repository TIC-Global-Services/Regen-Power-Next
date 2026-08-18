'use client';

import React, { useState, useCallback } from 'react';
import Image, { StaticImageData } from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export interface TimelineStep {
  title: string;
  description: string;
  image: StaticImageData | string;
}

export interface InstallationTimelineData {
  topSubtitle: string;
  title: string;
  steps: TimelineStep[];
}

const InstallationTimeline = ({ data }: { data: InstallationTimelineData }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev === data.steps.length - 1 ? 0 : prev + 1));
  }, [data.steps.length]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev === 0 ? data.steps.length - 1 : prev - 1));
  }, [data.steps.length]);

  const activeStep = data.steps[activeIndex];

  return (
    <section className="bg-white py-16 md:py-24 px-[3%]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        {/* Right — Image (on top on mobile, right column on desktop) */}
        <div className="relative w-[375px] md:w-[660px] max-w-full min-h-[450px] md:min-h-[770px] rounded-[20px] overflow-hidden bg-gray-100 order-1 lg:order-2 justify-self-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="absolute inset-0"
            >
              <Image
                src={activeStep.image}
                alt={activeStep.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Left — Text Content */}
        <div className="flex flex-col justify-center order-2 lg:order-1 capitalize">
          <h3 className="text-xl md:text-[2.125rem] text-black font-normal tracking-tight leading-snug mb-1">
            {data.topSubtitle}
          </h3>
          <h2 className="text-[2.5rem] md:text-5xl lg:text-[5rem] text-[#63B846] font-medium leading-[1] tracking-tight mb-4">
            {data.title}
          </h2>

          {/* Active step content with animated transitions */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <h4 className="text-xl md:text-[2rem] font-normal text-black mb-2 tracking-tight">
                {activeStep.title}
              </h4>
              <p className="text-base md:text-xl text-black leading-[1.2] tracking-tight max-w-2xl">
                {activeStep.description}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center gap-6 mt-8">
            {/* <div className="flex gap-2.5">
              {data.steps.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => handleDotClick(idx)}
                  aria-label={`Go to step ${idx + 1}`}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    idx === activeIndex
                      ? 'bg-[#63B846] scale-110'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div> */}

            <div className="flex gap-3">
              <button
                onClick={handlePrev}
                aria-label="Previous step"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-black hover:bg-black transition-colors text-[#63B846]"
              >
                <ArrowLeft size={20} />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next step"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-black hover:bg-black transition-colors text-[#63B846]"
              >
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default InstallationTimeline;
