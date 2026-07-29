'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface MeaningCard {
  title: string;
  description: string;
  isPrimary?: boolean;
}

export interface SolarBatteryMeaningData {
  topSubtitle: string;
  title: string;
  description: string;
  cards: MeaningCard[];
}

const SolarBatteryMeaning = ({ data }: { data: SolarBatteryMeaningData }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="bg-white py-16 md:py-24 px-[5%]">
      <div className="max-w-7xl mx-auto text-center mb-12 leading-[1.1]">
        <h3 className="text-xl md:text-[2.125rem] text-black font-normal leading-none">
          {data.topSubtitle}
        </h3>
        <h2 className="text-4xl md:text-[5rem] text-[#63B846] font-medium leading-none tracking-tight mb-2">
          {data.title}
        </h2>
        <p className="text-base md:text-xl text-black max-w-4xl mx-auto leading-[1.1] font-medium">
          {data.description}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-7xl mx-auto">
        {data.cards.map((card, idx) => {
          const isActive = activeIndex === idx;

          return (
            <div
              key={idx}
              onMouseEnter={() => setActiveIndex(idx)}
              className={`rounded-[24px] p-8 flex flex-col justify-center min-h-[50dvh] transition-colors duration-300 cursor-default overflow-hidden ${
                isActive ? 'bg-[#63B846]' : 'bg-[#EEF6EB]'
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
                      className="text-xl md:text-2xl font-semibold text-black/80 text-center"
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
                      <p className="text-sm md:text-xl text-black/90 text-center">
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
