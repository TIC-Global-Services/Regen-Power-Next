'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import SectionHeader from '@/reuseables/SectionHeader';
import Reveal from '@/reuseables/Reveal';
import type { ResolvedCommercialSystemsFiveThingsSection } from '@/lib/strapi/resolvers/commercial';

interface Props {
  resolved: ResolvedCommercialSystemsFiveThingsSection;
}

export default function FiveThingsSection({ resolved }: Props) {
  const { items } = resolved;
  const sliderRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = useCallback(() => {
    const slider = sliderRef.current;
    if (!slider) return;
    const scrollLeft = slider.scrollLeft;
    const cardWidth = slider.children[0]?.clientWidth ?? 1;
    const gap = 16;
    const index = Math.round(scrollLeft / (cardWidth + gap));
    setActiveIndex(Math.min(index, items.length - 1));
  }, [items.length]);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;
    slider.addEventListener('scroll', handleScroll, { passive: true });
    return () => slider.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const scrollToIndex = (index: number) => {
    const slider = sliderRef.current;
    if (!slider || !slider.children[index]) return;
    const child = slider.children[index] as HTMLElement;
    slider.scrollTo({ left: child.offsetLeft - slider.offsetLeft, behavior: 'smooth' });
  };

  return (
    <section className="py-12 lg:py-8 bg-white min-h-[100dvh] flex flex-col justify-center overflow-hidden">
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
            ref={sliderRef}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2 -mx-[2%]"
            style={{ WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {items.map((item, idx) => {
              const bg = item.highlight ? 'bg-[#63B846]' : 'bg-[#EEF6EB]';
              return (
                <div
                  key={idx}
                  className="snap-start shrink-0 w-[62%]"
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
                    <p className="text-xs text-black/80 leading-snug tracking-tight">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center gap-2 mt-5">
            {items.map((_, index) => (
              <button
                key={index}
                aria-label={`Go to slide ${index + 1}`}
                onClick={() => scrollToIndex(index)}
                className={`rounded-full transition-all duration-300 ${index === activeIndex
                  ? 'w-7 h-2.5 bg-[#63B846]'
                  : 'w-2.5 h-2.5 bg-black/20'
                  }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
