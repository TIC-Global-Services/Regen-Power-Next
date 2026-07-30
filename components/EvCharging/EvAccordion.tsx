'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Fade from '@/reuseables/fade';
import Reveal from '@/reuseables/Reveal';

interface InstallationStep {
  number: string;
  title: string;
  description: string;
  image: string;
}

interface EvAccordionData {
  subtitle: string;
  title: string;
  steps: InstallationStep[];
}

interface EvAccordionProps {
  data: EvAccordionData;
}

const EvAccordion = ({ data }: EvAccordionProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <Fade>
      <section className="py-16 md:py-24 bg-white overflow-hidden">
        <div className="px-[5%]">
          <div className="text-center mb-12 md:mb-10">
            <h2 className="text-xl md:text-[2rem] font-medium text-black tracking-tight">
              {data.subtitle}
            </h2>
            <p className="text-[#63B846] font-light text-[2.5rem] md:text-[3.5rem] lg:text-[5rem] tracking-tighter leading-none">
              {data.title}
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 w-full items-stretch">
            {data.steps.map((step, index) => {
              const isActive = activeIndex === index;
              return (
                <div
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`flex flex-col transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer ${
                    isActive ? 'lg:flex-[3]' : 'lg:flex-[1]'
                  }`}
                >
                  <span className="text-sm md:text-2xl font-semibold mb-3 block">
                    [{step.number}]
                  </span>

                  <div className="flex-grow h-full">
                    {isActive ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center h-full">
                        <div className="relative w-full aspect-[4/3] rounded-[24px] overflow-hidden bg-gray-50 min-h-[220px]">
                          <Image
                            src={step.image}
                            alt={step.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 100vw, 30vw"
                            priority
                          />
                        </div>
                        <div className="flex flex-col justify-center gap-2 pr-4">
                          <h3 className="text-xl md:text-2xl font-bold text-black tracking-tight leading-snug">
                            {step.title}
                          </h3>
                          <p className="text-sm md:text-base leading-[1.2]">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="relative w-full h-full min-h-[220px] lg:min-h-[220px] rounded-[24px] overflow-hidden bg-gray-50 transition-all duration-300 hover:opacity-90">
                        {step.image && (
                          <Image
                            src={step.image}
                            alt={step.title}
                            fill
                            className="object-cover grayscale-[30%] contrast-[95%]"
                            sizes="(max-width: 1024px) 100vw, 15vw"
                          />
                        )}
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
