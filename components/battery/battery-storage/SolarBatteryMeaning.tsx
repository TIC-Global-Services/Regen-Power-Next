'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SliderDots, SliderArrows, useSnapSlider } from '@/reuseables/MobileSliderControls';

export interface MeaningCard {
  title: string;
  description: string;
}

export interface SolarBatteryMeaningData {
  topSubtitle: string;
  title: string;
  description: string;
  cards: MeaningCard[];
}

const SolarBatteryMeaning = ({ data }: { data: SolarBatteryMeaningData }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { trackRef, sync, active, canPrev, canNext, goTo, next, prev } = useSnapSlider(data.cards.length);

  return (
    <section className="bg-white py-16 md:py-24 px-[5%] md:px-[3%]">
      <div className="text-left md:text-center capitalize mb-12 leading-[1.1]">
        <h3 className="text-base md:text-[2.125rem] text-black font-normal leading-[1] tracking-tight ">
          {data.topSubtitle}
        </h3>
        <h2 className="text-[2.5rem] md:text-[5rem] text-[#63B846] font-medium leading-[1] tracking-tight mb-2">
          {data.title}
        </h2>
        <p className="text-base md:text-xl text-black max-w-4xl mx-auto leading-[1] tracking-tight font-medium">
          {data.description}
        </p>
      </div>

      {/* Mobile: Horizontal Slider */}
      <div ref={trackRef} onScroll={sync} className="flex overflow-x-auto md:hidden gap-4  -mx-[5%] px-[5%] md:px-[3%] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pb-4 max-w-7xl">
        {data.cards.map((card, idx) => {
          return (
            <div
              key={idx}
              className={`rounded-[24px] p-8 flex flex-col justify-center w-[240px] min-h-[280px] max-w-full shrink-0 snap-start transition-colors duration-300 cursor-default overflow-hidden ${idx === 0 ? 'bg-[#63B846]' : 'bg-[#EEF6EB]'
                }`}
            >
              <div className="h-full flex flex-col justify-center capitalize">
                <h4 className="text-xl md:text-2xl font-normal text-black text-center">
                  {card.title}
                </h4>
                <p className="text-sm text-black leading-tight text-center mt-3">
                  {card.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <SliderDots count={data.cards.length} active={active} onSelect={goTo} className="mt-5 md:hidden" />
      <SliderArrows canPrev={canPrev} canNext={canNext} onPrev={prev} onNext={next} className="mt-4 md:hidden" />

      {/* Desktop: Grid */}
      <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-4">
        {data.cards.map((card, idx) => {
          const isActive = activeIndex === idx;

          return (
            <div
              key={idx}
              onMouseEnter={() => setActiveIndex(idx)}
              className={`rounded-[24px] p-8 flex flex-col justify-center w-[240px] md:w-full max-w-full min-h-[280px] md:min-h-[385px] h-full justify-self-center transition-colors duration-300 cursor-default overflow-hidden ${isActive ? 'bg-[#63B846]' : 'bg-[#EEF6EB]'
                }`}
            >
              <div className="h-full flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  {!isActive ? (
                    <motion.h4
                      key="title"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-xl md:text-[1.75rem] font-normal text-black tracking-tight capitalize text-center"
                    >
                      {card.title}
                    </motion.h4>
                  ) : (
                    <motion.div
                      key="description"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="text-base md:text-lg text-black text-center capitalize tracking-tight leading-[1.2]">
                        {card.description}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default SolarBatteryMeaning;
