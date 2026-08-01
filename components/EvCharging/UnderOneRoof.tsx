'use client';

import React from 'react';
import Image, { StaticImageData } from 'next/image';
import Fade from '@/reuseables/fade';
import Reveal from '@/reuseables/Reveal';

export interface UnderOneRoofCard {
  title: string;
  description: string;
  image: StaticImageData | string;
  imageAlt: string;
}

export interface UnderOneRoofData {
  subtitle: string;
  title: React.ReactNode;
  description: string;
  cards: UnderOneRoofCard[];
}

interface UnderOneRoofProps {
  data: UnderOneRoofData;
}

const UnderOneRoof = ({ data }: UnderOneRoofProps) => {
  return (
    <section className="py-16 md:py-20 bg-[#EEF6EB] overflow-hidden">
      <div className="px-[5%]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column — Heading and Intro */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <Reveal>
              <div className="flex flex-col gap-2">
                <span className="text-sm md:text-[2.125rem] font-normal text-black tracking-tight">
                  {data.subtitle}
                </span>
                <h2 className="text-[#63B846] font-light text-[3rem] md:text-[4rem] lg:text-[5rem] tracking-tighter leading-[1]">
                  {data.title}
                </h2>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="text-base leading-snug max-w-xl font-normal">
                {data.description}
              </p>
            </Reveal>
          </div>

          {/* Right Column — Cards Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 1: Solar Surplus Diversion */}
            {data.cards[0] && (
              <Reveal delay={0.1} className="md:col-span-2">
                <div className="bg-white rounded-[20px] p-8 md:p-10 relative overflow-hidden flex flex-col  justify-between items-stretch min-h-[40dvh]   group hover:shadow-md transition-all duration-300 gap-6">
                  {/* Left: Content */}
                  <div className="flex flex-col gap-3 justify-center md:w-[85%] relative z-10">
                    <h3 className="text-xl md:text-2xl font-medium text-black tracking-tight leading-snug">
                      {data.cards[0].title}
                    </h3>
                    <p className="text-lg text-black leading-[1.2] tracking-tight">
                      {data.cards[0].description}
                    </p>
                  </div>
                  
                  {/* Right: Image */}
                  <div className="relative w-full md:w-[40%] h-40 md:h-auto rounded-[16px] overflow-hidden pointer-events-none self-stretch">
                    <Image
                      src={data.cards[0].image}
                      alt={data.cards[0].imageAlt}
                      fill
                      className="object-cover group-hover:scale-102 transition-transform duration-700"
                    />
                  </div>
                </div>
              </Reveal>
            )}

            {/* Card 2: Battery Boost */}
            {data.cards[1] && (
              <Reveal delay={0.2}>
                <div className="bg-white rounded-[20px] p-8 md:p-10 relative overflow-hidden flex flex-col justify-between min-h-[380px]  hover:shadow-md transition-shadow duration-300">
                  <div className="flex flex-col gap-3">
                    <h3 className="text-xl md:text-2xl font-medium text-black tracking-tight leading-snug">
                      {data.cards[1].title}
                    </h3>
                    <p className="text-sm text-black/60 leading-[1.2]">
                      {data.cards[1].description}
                    </p>
                  </div>

                  {/* Battery Render Image */}
                  <Image
                    src={data.cards[1].image}
                    alt={data.cards[1].imageAlt}
                    fill
                    className="object-contain absolute -bottom-30 translate-y-30 pointer-events-none"
                  />
                </div>
              </Reveal>
            )}

            {/* Card 3: One App */}
            {data.cards[2] && (
              <Reveal delay={0.3}>
                <div className="bg-white rounded-[20px] p-8 md:px-10 relative overflow-hidden flex flex-col justify-between min-h-[380px]  hover:shadow-md transition-shadow duration-300">
                  <div className="flex flex-col gap-3">
                    <h3 className="text-xl md:text-2xl font-medium text-black tracking-tight leading-snug">
                      {data.cards[2].title}
                    </h3>
                    <p className="text-sm text-black/60 leading-[1.2]">
                      {data.cards[2].description}
                    </p>
                  </div>

                  {/* Phone App Mockup Image with centered logo */}
                  <div className="relative w-full h-[15dvh] mt-6 overflow-hidden pointer-events-none">
                    <div className="absolute inset-x-0 bottom-0 flex justify-center">
                      <div className="relative w-36 h-90 translate-y-50">
                        <Image
                          src={data.cards[2].image}
                          alt={data.cards[2].imageAlt}
                          fill
                          className="object-cover"
                        />
                        {/* Logo centered on the phone screen */}
                        <div className="absolute inset-0 flex items-center justify-center -translate-y-6">
                          <div className="relative w-20 h-8">
                            <Image
                              src="/regen_logo_nav.png"
                              alt="Regen Logo"
                              fill
                              className="object-contain"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default UnderOneRoof;
