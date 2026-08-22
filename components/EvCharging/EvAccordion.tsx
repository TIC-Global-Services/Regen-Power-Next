'use client';

import React, { useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import Fade from '@/reuseables/fade';
import Reveal from '@/reuseables/Reveal';

export interface AccordionStep {
  number: string;
  title: string;
  description: string;
  image: StaticImageData | string;
}

export interface EvAccordionData {
  subtitle: string;
  title: string;
  steps: AccordionStep[];
}

interface EvAccordionProps {
  data: EvAccordionData;
}

const EvAccordion = ({ data }: EvAccordionProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <Fade>
      <section className="py-16 md:py-24 bg-white overflow-hidden">
        <div className="px-[5%] md:px-[3%]">
          {/* Header */}
          <div className="text-center mb-12 md:mb-10">
            <h2 className="text-xl md:text-[2rem] font-medium text-black tracking-tight ">
              {data.subtitle}
            </h2>
            <p className="text-[#63B846] font-light text-[2.5rem] md:text-[3.5rem] lg:text-[5rem] tracking-tighter leading-none">
              {data.title}
            </p>
          </div>

          {/* Mobile & Tablet Static View */}
          <div className="flex flex-col gap-8 md:gap-12 lg:hidden w-full">
            {data.steps.map((step, index) => (
              <Reveal key={index} delay={index * 0.1} className="flex flex-col w-full">
                {/* Step Number */}
                <span className="text-sm md:text-xl font-semibold mb-2 block">
                  [{step.number}]
                </span>

                {/* Card Container */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 items-center">
                  {/* Image */}
                  <div className="relative w-full aspect-[4/3] rounded-[20px] md:rounded-[24px] overflow-hidden bg-gray-50 min-h-[220px]">
                    <Image
                      src={step.image}
                      alt={step.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>

                  {/* Text */}
                  <div className="flex flex-col justify-center items-start gap-2 pt-1 md:pt-0">
                    <h3 className="text-xl md:text-2xl font-bold text-black tracking-tight leading-snug">
                      {step.title}
                    </h3>
                    <p
                      className="text-sm md:text-base text-left leading-[1.3] text-black/80"
                      dangerouslySetInnerHTML={{ __html: step.description }}
                    />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Desktop Interactive Accordion */}
          <div className="hidden lg:flex flex-row gap-6 lg:gap-8 w-full items-stretch">
            {data.steps.map((step, index) => {
              const isActive = activeIndex === index;
              const img = step.image;

              return (
                <div
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`flex flex-col transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer ${isActive ? 'lg:flex-[3]' : 'lg:flex-[1]'
                    }`}
                >
                  {/* Step Number */}
                  <span className="text-sm md:text-2xl font-semibold mb-3 block">
                    [{step.number}]
                  </span>

                  {/* Step Content */}
                  <div className="flex-grow h-full">
                    {isActive ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center h-full">
                        {/* Image inside active layout */}
                        <div className="relative w-full aspect-[4/3] rounded-[24px] overflow-hidden bg-gray-50 min-h-[220px]">
                          <Image
                            src={img}
                            alt={step.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 100vw, 30vw"
                            preload
                          />
                        </div>
                        {/* Text inside active layout */}
                        <div className="flex flex-col justify-center md:items-start items-center gap-2 pr-4">
                          <h3 className="text-xl md:text-2xl font-bold text-black tracking-tight leading-snug">
                            {step.title}
                          </h3>
                          <p
                            className="text-sm md:text-base text-center md:text-left leading-[1.2]"
                            dangerouslySetInnerHTML={{ __html: step.description }}
                          />
                        </div>
                      </div>
                    ) : (
                      /* Collapsed state layout (just image) */
                      <div className="relative w-full h-full min-h-[220px] lg:min-h-[220px] rounded-[24px] overflow-hidden bg-gray-50 transition-all duration-300 hover:opacity-90">
                        <Image
                          src={img}
                          alt={step.title}
                          fill
                          className="object-cover grayscale-[30%] contrast-[95%]"
                          sizes="(max-width: 1024px) 100vw, 15vw"
                        />
                        {/* Subtle overlay for inactive hover states */}
                        <div className="absolute inset-0 bg-black/5 hover:bg-transparent transition-colors duration-300" />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </Fade>
  );
};

export default EvAccordion;
