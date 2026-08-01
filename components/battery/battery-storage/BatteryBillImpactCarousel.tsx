"use client";

import React, { useRef } from 'react';
import Image from 'next/image';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { BillImpactCard } from './BatteryBillImpact';

export const BatteryBillImpactCarousel = ({ cards }: { cards: BillImpactCard[] }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -380, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 380, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full relative mt-8 lg:mt-0">
      <div
        ref={scrollContainerRef}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 [&::-webkit-scrollbar]:hidden"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {cards.map((card, idx) => (
          <div
            key={idx}
            className="relative rounded-[24px] overflow-hidden group min-h-[460px] md:min-h-[520px] min-w-[280px] sm:min-w-[320px] md:min-w-[340px] snap-center shrink-0"
          >
            <Image src={card.image} alt={card.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30" />

            {/* Large Number */}
            <div className="absolute top-6 left-6 text-white/50 text-7xl md:text-8xl font-light leading-none">
              {idx + 1}
            </div>

            <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full">
              <h4 className="text-xl md:text-2xl text-white font-medium mb-3">
                {card.title}
              </h4>
              <p className="text-white/80 text-sm leading-[1.2]">
                {card.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-end gap-3 mt-4 mr-[5%]">
        <button
          onClick={scrollLeft}
          className="w-12 h-12 rounded-full bg-black flex items-center justify-center text-white hover:bg-black/80 transition-colors"
          aria-label="Previous card"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <button
          onClick={scrollRight}
          className="w-12 h-12 rounded-full bg-black flex items-center justify-center text-white hover:bg-black/80 transition-colors"
          aria-label="Next card"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
