'use client';

import React from 'react';
import Image, { StaticImageData } from 'next/image';
import Fade from '@/reuseables/fade';
import Reveal from '@/reuseables/Reveal';
import { SliderArrows, SliderDots, useSnapSlider } from '@/reuseables/MobileSliderControls';

export interface Benefit {
  title: string;
  description: string;
  image: StaticImageData | string;
}

export interface WhyChargeAtHomeData {
  title: string;
  benefits: Benefit[];
}

interface WhyChargeAtHomeProps {
  data: WhyChargeAtHomeData;
}

const WhyChargeAtHome = ({ data }: WhyChargeAtHomeProps) => {
  // Native scroll-snap slider (< lg) — same shared pattern as Expertise /
  // FeatureCardGrid: free-scroll track with snap points + dots/arrows.
  const { trackRef, sync, active, canPrev, canNext, goTo, next, prev } =
    useSnapSlider(data.benefits.length);

  return (
    <Fade>
      <section className="py-16 md:py-24 bg-white">
        <div className="px-[5%] md:px-[3%]">
          {/* Header */}
          <div className="mb-12 md:mb-10 leading-[0.8] flex justify-center items-center flex-col">
            <h2 className="text-2xl md:text-[5rem] font-medium text-[#63B846] tracking-tight">
              {data.title}
            </h2>
          </div>

          {/* Desktop Layout (Flex Grid) */}
          <div className="hidden lg:flex gap-3 items-stretch">
            {data.benefits.map((benefit, index) => (
              <Reveal key={index} delay={index * 0.1} className="flex-1 flex flex-col">
                <div className="bg-[#EEF6EB] rounded-[24px] overflow-hidden group hover:shadow-lg transition-all duration-500 flex flex-col h-full w-full">
                  {/* Image */}
                  <div className="relative w-full aspect-[16/10] overflow-hidden flex justify-center items-center">
                    <Image
                      src={benefit.image}
                      alt={benefit.title}
                      fill
                      className="object-contain group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>

                  {/* Text */}
                  <div className="p-6 md:p-8 flex flex-col gap-2 flex-grow">
                    <h3 className="text-xl md:text-2xl font-medium text-black tracking-tight leading-snug">
                      {benefit.title}
                    </h3>
                    <p className="text-sm md:text-base tracking-tight leading-snug max-w-sm">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Mobile / iPad Layout (native snap slider) */}
          <div className="lg:hidden w-full relative">
            <div
              ref={trackRef}
              onScroll={sync}
              className="flex items-stretch overflow-x-auto -mx-[5%] px-[5%] md:-mx-[3%] md:px-[3%]  gap-5 pb-2 scrollbar-hide [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            >
              {data.benefits.map((benefit, index) => (
                <Reveal
                  key={index}
                  delay={index * 0.1}
                  className="shrink-0 snap-start w-full sm:w-[calc(50%-10px)] flex flex-col"
                >
                  <div className="bg-[#EEF6EB] rounded-[24px] overflow-hidden group hover:shadow-lg transition-all duration-500 flex flex-col w-full flex-1">

                    {/* Image */}
                    <div className="relative w-full aspect-[16/10] overflow-hidden flex justify-center items-center shrink-0">
                      <Image
                        src={benefit.image}
                        alt={benefit.title}
                        fill
                        className="object-contain group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>

                    {/* Text */}
                    <div className="p-6 flex flex-col gap-2 flex-grow">
                      <h3 className="text-xl md:text-3xl font-medium text-black tracking-tight leading-snug">
                        {benefit.title}
                      </h3>

                      <p className="text-sm md:text-lg tracking-tight leading-snug max-w-sm">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Shared slider controls */}
            <SliderDots count={data.benefits.length} active={active} onSelect={goTo} className="mt-6" />
            <SliderArrows canPrev={canPrev} canNext={canNext} onPrev={prev} onNext={next} className="mt-3" />
          </div>
        </div>
      </section>
    </Fade>
  );
};

export default WhyChargeAtHome;

