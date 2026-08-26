"use client";

import React from 'react';
import CtaButton from '@/reuseables/CtaButton';
import Fade from '@/reuseables/fade';
import { SliderDots, SliderArrows, useSnapSlider } from '@/reuseables/MobileSliderControls';

export interface CapacityCard {
  title: string;
  description: string;
  isPrimary?: boolean;
}

export interface BatteryCapacityData {
  topSubtitle: string;
  title: string;
  description: string;
  cards: CapacityCard[];
  footerText: string;
  ctaText: string;
  ctaLink: string;
}

const BatteryCapacityBlocks = ({ data }: { data: BatteryCapacityData }) => {
  const { trackRef, sync, active, canPrev, canNext, goTo, next, prev } = useSnapSlider(data.cards.length);
  return (
    <Fade>
      <section className="bg-white py-16 md:py-24 px-[5%] md:px-[3%]">
        <div className="">
          {/* Section Header */}
          <div className="text-left md:text-center mb-10 md:mb-14 capitalize ">
            <h3 className="text-base md:text-[2rem] text-black font-normal tracking-tight leading-[1]">
              {data.topSubtitle}
            </h3>
            <h2 className="text-[2.5rem] md:text-5xl lg:text-[5rem] text-[#63B846] font-light leading-tight tracking-tighter">
              {data.title}
            </h2>
            <p className="text-base md:text-xl text-black max-w-3xl mx-auto leading-[1.2] tracking-tight font-medium whitespace-pre-line">
              {data.description}
            </p>
          </div>

          {/* Mobile: Horizontal Slider */}
          <div ref={trackRef} onScroll={sync} className="flex overflow-x-auto md:hidden gap-4  -mx-[5%] px-[5%] md:px-[3%] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pb-4 mb-10">
            {data.cards.map((card, idx) => (
              <div
                key={idx}
                className={`rounded-[16px] p-7 flex flex-col justify-center items-center min-h-[280px] w-[75vw] shrink-0 snap-start transition-shadow duration-300 hover:shadow-md ${card.isPrimary
                  ? 'bg-[#63B846] text-black'
                  : 'bg-[#EEF6EB] border border-[#63B846]/20 text-black'
                  }`}
              >
                <h4
                  className={`text-xl text-center font-normal whitespace-pre-line leading-[1.1] tracking-tight mb-3 ${card.isPrimary ? 'text-black' : 'text-black'
                    }`}
                >
                  {card.title}
                </h4>
                <p
                  className={`text-sm text-center leading-[1.2] ${card.isPrimary ? 'text-black' : 'text-black'
                    }`}
                >
                  {card.description}
                </p>
              </div>
            ))}
          </div>

          <SliderDots count={data.cards.length} active={active} onSelect={goTo} className="mt-5 md:hidden" />
          <SliderArrows canPrev={canPrev} canNext={canNext} onPrev={prev} onNext={next} className="mt-4 md:hidden" />

          {/* Desktop: Cards Grid */}
          <div className="hidden md:grid md:grid-cols-3 gap-5 md:gap-2 mb-10 justify-center max-w-6xl mx-auto">
            {data.cards.map((card, idx) => (
              <div
                key={idx}
                className={`rounded-[16px] p-7 md:p-8 flex flex-col justify-center items-center max-w-full md:w-[360px] min-h-[280px] transition-shadow duration-300 hover:shadow-md ${card.isPrimary
                  ? 'bg-[#63B846] text-black'
                  : 'bg-[#EEF6EB] text-black'
                  }`}
              >
                <h4
                  className={`text-2xl lg:text-[2rem] text-center font-normal whitespace-pre-line leading-[1.1] tracking-tight mb-3 ${card.isPrimary ? 'text-black' : 'text-black'
                    }`}
                >
                  {card.title}
                </h4>
                <p
                  className={`text-base lg:text-xl text-center leading-[1.2] ${card.isPrimary ? 'text-black' : 'text-black'
                    }`}
                >
                  {card.description}
                </p>
              </div>
            ))}
          </div>

          {/* Footer Text + CTA */}
          <div className="text-left md:text-center">
            <p className="text-base md:text-xl text-black font-medium mb-6 max-w-4xl mx-auto capitalize tracking-tight leading-[1.2] whitespace-pre-line">
              {data.footerText}
            </p>
            <CtaButton href={data.ctaLink} text={data.ctaText} textColor="text-black" />
          </div>
        </div>
      </section>
    </Fade>
  );
};

export default BatteryCapacityBlocks;
