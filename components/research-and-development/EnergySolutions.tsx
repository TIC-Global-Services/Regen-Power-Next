'use client';

import React from 'react';
import Link from 'next/link';
import { SliderDots, SliderArrows, useSnapSlider } from '@/reuseables/MobileSliderControls';
import type { ResolvedEnergySolutionsSection } from '@/lib/strapi/resolvers/research';

interface Props {
  resolved: ResolvedEnergySolutionsSection;
}

const EnergySolutions = ({ resolved }: Props) => {
  const items = resolved.items || [];
  const { trackRef, sync, active, canPrev, canNext, goTo, next, prev } = useSnapSlider(items.length);

  return (
    <section className="w-full px-[5%] md:px-[3%] py-10 md:py-20">
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
        <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-6">
          {items.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="group relative block rounded-2xl overflow-hidden md:h-[30dvh] lg:h-[60dvh] w-full"
            >
              <img
                src={item.image?.src || '/fallback.png'}
                alt={item.image?.alt ?? item.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 md:p-10 text-white">
                <h3 className="text-lg md:text-2xl font-medium tracking-tight leading-tight mb-2">
                  {item.title}
                </h3>
                <p className="text-xs md:text-base leading-[1.2] tracking-tight text-white/85 max-w-full">
                  {item.description}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile slider */}
        <div className="md:hidden">
          <div
            ref={trackRef}
            onScroll={sync}
            className="flex gap-4 overflow-x-auto  scrollbar-hide pb-2 -mx-[5%] px-[5%] md:px-[3%] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            style={{ WebkitOverflowScrolling: 'touch' }}
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

          <SliderDots count={items.length} active={active} onSelect={goTo} className="mt-5" />
          <SliderArrows canPrev={canPrev} canNext={canNext} onPrev={prev} onNext={next} className="mt-4" />
        </div>
      </div>
    </section>
  );
};

export default EnergySolutions;
