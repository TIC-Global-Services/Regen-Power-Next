'use client';

import React from 'react';
import SectionHeader from '@/reuseables/SectionHeader';
import Reveal from '@/reuseables/Reveal';
import { SliderDots, SliderArrows, useSnapSlider } from '@/reuseables/MobileSliderControls';
import type { ResolvedCommercialSystemsFiveThingsSection } from '@/lib/strapi/resolvers/commercial';

interface Props {
  resolved: ResolvedCommercialSystemsFiveThingsSection;
}

export default function FiveThingsSection({ resolved }: Props) {
  const { items } = resolved;
  const { trackRef, sync, active, canPrev, canNext, goTo, next, prev } = useSnapSlider(items.length);

  return (
    <section className="py-12 lg:py-8 bg-white lg:min-h-[100dvh] flex flex-col justify-center overflow-hidden">
      <div className="px-[5%] md:px-[3%] mx-auto w-full">
        <SectionHeader
          subtitle={resolved.subtitle}
          title={resolved.title}
          description={resolved.description}
          align="left"
          subtitleClass="text-lg lg:text-2xl font-light text-black tracking-tight text-left lg:text-center"
          titleClass="text-4xl lg:text-6xl lg:text-[4.5rem] text-[#63B846] font-normal tracking-tighter leading-none text-left lg:text-center"
          descClass="text-left lg:text-center"
          className="lg:items-center lg:text-center lg:mx-auto mx-auto max-w-4xl mb-12 lg:mb-20"
        />

        {/* Desktop staggered grid */}
        <div className="hidden lg:grid grid-cols-5 gap-3 lg:gap-4 items-start justify-center w-full">
          {items.map((item, idx) => {
            const isShiftedDown = idx % 2 === 0;
            const bg = item.highlight ? 'bg-[#63B846]' : 'bg-[#EEF6EB]';

            return (
              <Reveal
                key={idx}
                delay={idx * 0.1}
                className={`relative flex flex-col justify-center items-center w-full ${isShiftedDown ? 'mt-16 lg:mt-20 lg:mt-24' : ''
                  }`}
              >
                {/* Number — top for shifted down cards */}
                {isShiftedDown ? (
                  <span
                    className="text-[#1a1a1a] absolute -top-16 lg:-top-20 lg:-top-24 text-6xl lg:text-8xl lg:text-[7.5rem] font-normal leading-none tracking-tighter select-none"
                  >
                    {item.number}
                  </span>
                ) : null}

                <div
                  className={`${bg} rounded-[20px] z-10 p-5 lg:p-6 lg:p-7 flex flex-col justify-center w-full h-[280px] lg:h-[50dvh] transition-all duration-300 hover:scale-[1.02]`}
                >
                  <h3 className="text-lg lg:text-xl lg:text-3xl font-normal text-black tracking-tight leading-tight mb-3">
                    {item.title}
                  </h3>
                  <p className="text-xs lg:text-sm lg:text-base text-black/80 leading-snug tracking-tight">
                    {item.description}
                  </p>
                </div>

                {/* Number — bottom for shifted up cards */}
                {!isShiftedDown ? (
                  <span
                    className="text-[#1a1a1a] absolute -bottom-16 lg:-bottom-20 lg:-bottom-20 text-6xl lg:text-8xl lg:text-[7.5rem] font-normal leading-none tracking-tighter select-none"
                  >
                    {item.number}
                  </span>
                ) : null}
              </Reveal>
            );
          })}
        </div>

        {/* Mobile slider */}
        <div className="lg:hidden mt-8">
          <div
            ref={trackRef}
            onScroll={sync}
            className="flex gap-4 lg:gap-6 overflow-x-auto  -mx-[5%] md:-mx-[3%] px-[5%] md:px-[3%] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {items.map((item, idx) => {
              const bg = item.highlight ? 'bg-[#63B846]' : 'bg-[#EEF6EB]';
              return (
                <div
                  key={idx}
                  className="snap-start shrink-0 w-[65vw] md:w-[45vw]"
                >
                  <div
                    className={`${bg} rounded-[20px] p-6 flex flex-col min-h-[320px] justify-center`}
                  >
                    <span className="text-[#1a1a1a] text-6xl font-normal leading-none tracking-tighter select-none mb-3">
                      {item.number}
                    </span>
                    <h3 className="text-lg font-normal text-black tracking-tight leading-tight mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-black/80 leading-snug tracking-tight">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <SliderDots count={items.length} active={active} onSelect={goTo} className="mt-5" />
          <SliderArrows canPrev={canPrev} canNext={canNext} onPrev={prev} onNext={next} className="mt-4" />
        </div>
      </div>
    </section>
  );
}
