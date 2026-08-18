'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import type { ResolvedEnergySolutionsSection } from '@/lib/strapi/resolvers/research';

interface Props {
  resolved: ResolvedEnergySolutionsSection;
}

const EnergySolutions = ({ resolved }: Props) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const items = resolved.items || [];

  const handleScroll = useCallback(() => {
    const slider = sliderRef.current;
    if (!slider) return;
    const scrollLeft = slider.scrollLeft;
    const cardWidth = slider.children[0]?.clientWidth ?? 1;
    const gap = 20; // gap-5 is 1.25rem = 20px
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
    <section className="w-full px-[3%] py-10 md:py-20">
      <div >
        <div className="mb-8 md:mb-12 capitalize">
          <p className="text-base md:text-3xl leading-none font-light tracking-tight text-black ">
            {resolved.subtitle}
          </p>
          <h2 className="text-[2.5rem] md:text-6xl lg:text-7xl font-normal tracking-tight text-[#63B846] leading-none">
            {resolved.title}
          </h2>
        </div>

        {/* Desktop grid */}
        <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-2">
          {items.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="group relative block rounded-2xl overflow-hidden aspect-[3/4] md:h-[440px] w-[320px]"
            >
              <img
                src={item.image?.src || '/fallback.png'}
                alt={item.image?.alt ?? item.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 text-white">
                <h3 className="text-lg md:text-xl font-medium tracking-tight leading-tight mb-2">
                  {item.title}
                </h3>
                <p className="text-xs md:text-sm leading-snug tracking-tight text-white/85 max-w-full">
                  {item.description}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile slider */}
        <div className="md:hidden">
          <div
            ref={sliderRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 -mx-[5%] px-[3%]"
            style={{ WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {items.map((item, index) => (
              <div
                key={index}
                className="snap-start shrink-0 w-[85%]"
              >
                <Link
                  href={item.href}
                  className="group relative block rounded-2xl overflow-hidden aspect-[3/4]"
                >
                  <img
                    src={item.image?.src || '/fallback.png'}
                    alt={item.image?.alt ?? item.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                    <h3 className="text-lg font-medium tracking-tight leading-tight mb-2">
                      {item.title}
                    </h3>
                    <p className="text-xs leading-snug tracking-tight text-white/85 max-w-full">
                      {item.description}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
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
};

export default EnergySolutions;
