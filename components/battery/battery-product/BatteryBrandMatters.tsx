"use client";

import React from 'react';
import Image, { StaticImageData } from 'next/image';
import businessBg from '@/assets/home/zerointrest/businessBg.jpg';
import { SliderDots, SliderArrows, useSnapSlider } from '@/reuseables/MobileSliderControls';

export interface BrandMatterCard {
  title: string;
  description: string;
  image: StaticImageData | string | null;
}

export interface BatteryBrandMattersData {
  topSubtitle: string;
  title: string;
  description?: string;
  cards: BrandMatterCard[];
}

const BatteryBrandMatters = ({ data }: { data: BatteryBrandMattersData }) => {
  const { trackRef, sync, active, canPrev, canNext, goTo, next, prev } = useSnapSlider(data.cards.length);
  return (
    <section className="bg-white py-16 md:py-24 px-[5%] md:px-[3%]">
      <div className="">
        {/* Header */}
        <div className="text-left md:text-center mb-10 md:mb-16 max-w-4xl mx-auto">
          <h3 className="text-base md:text-2xl text-black font-normal  tracking-tight">
            {data.topSubtitle}
          </h3>
          <h2 className="text-[2.5rem] md:text-6xl lg:text-[4.5rem] text-[#63B846] font-normal leading-none tracking-tight mb-6">
            {data.title}
          </h2>
          {data.description && (
            <p className="text-base text-black font-normal max-w-2xl mx-auto leading-none">
              {data.description}
            </p>
          )}
        </div>

        {/* Mobile + iPad: Horizontal Scroll */}
        <div ref={trackRef} onScroll={sync} className="flex overflow-x-auto lg:hidden gap-4  -mx-[5%] px-[5%] md:-mx-[3%] md:px-[3%] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] ">
          {data.cards.map((card, idx) => (
            <div
              key={idx}
              className="relative rounded-[24px] overflow-hidden min-h-[350px] w-[65vw] md:w-[45vw] shrink-0 snap-start flex flex-col justify-start p-6 group"
            >
              {/* Background Image */}
              <Image
                src={card.image ?? businessBg}
                alt={card.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Dark Overlay for Text Readability */}
              <div className="absolute inset-0 bg-black/45 transition-opacity duration-300 group-hover:bg-black/55" />

              {/* Text Content */}
              <div className={`relative z-10 flex flex-col h-full ${idx % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                <h4 className="text-white text-xl md:text-2xl font-normal leading-tight mb-3 tracking-tight">
                  {card.title}
                </h4>
                <p className="text-white/85 text-xs md:text-sm font-light leading-[1.2]">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <SliderDots count={data.cards.length} active={active} onSelect={goTo} className="mt-5 lg:hidden" />
        <SliderArrows canPrev={canPrev} canNext={canNext} onPrev={prev} onNext={next} className="mt-4 lg:hidden" />

        {/* Desktop (lg+): Grid */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-2 md:gap-4">
          {data.cards.map((card, idx) => (
            <div
              key={idx}
              className="relative rounded-[24px] overflow-hidden min-h-[460px] md:min-h-[520px] flex flex-col justify-start p-6 md:p-7 group"
            >
              {/* Background Image */}
              <Image
                src={card.image ?? businessBg}
                alt={card.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Dark Overlay for Text Readability */}
              <div className="absolute inset-0 bg-black/45 transition-opacity duration-300 group-hover:bg-black/55" />

              {/* Text Content */}
              <div className={`relative z-10 flex flex-col h-full ${idx % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                <h4 className="text-white text-xl md:text-2xl font-normal leading-tight mb-3 tracking-tight">
                  {card.title}
                </h4>
                <p className="text-white/85 text-xs md:text-sm font-light leading-[1.2]">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BatteryBrandMatters;
