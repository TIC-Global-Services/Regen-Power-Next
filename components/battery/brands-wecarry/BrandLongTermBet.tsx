'use client';

import React from 'react';
import Image, { StaticImageData } from 'next/image';

import Fade from '@/reuseables/fade';
import Reveal from '@/reuseables/Reveal';
import SectionHeader from '@/reuseables/SectionHeader';

export interface BetCard {
  title: string;
  description: string;
  image: string | StaticImageData;
}

export interface BrandLongTermBetData {
  title: string;
  subtitle?: string;
  cards: BetCard[];
}

export interface BrandLongTermBetProps {
  data: BrandLongTermBetData;
}

const BrandLongTermBet: React.FC<BrandLongTermBetProps> = ({ data }) => {
  if (!data) return null;

  return (
    <section className="py-16 md:py-20 bg-white overflow-hidden">
      <Fade>
        <div className="px-[5%] md:px-[3%]">
          {/* Section Header */}
          <SectionHeader
            subtitle={data.subtitle}
            title={<span className="text-[#63B846] font-medium tracking-tighter">{data.title}</span>}
            align="left"
            subtitleClass="text-base md:text-[2.125rem] lg:leading-1.2 font-normal text-black"
            titleClass="md:text-[2.5rem] lg:text-[5rem] font-light text-black tracking-tight leading-tight"
            className="mb-12 md:mb-5 lg:-space-y-5"
          />

          {/* Slider: mobile + iPad */}
          <div className="flex overflow-x-auto lg:hidden gap-4 -mx-[5%] px-[5%] md:-mx-[3%] md:px-[3%] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pb-4">
            {data.cards.map((card, index) => (
              <div key={index} className="relative rounded-[24px] overflow-hidden min-h-[420px] w-[75vw] md:w-[45vw] shrink-0 snap-start group flex-none">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
                </div>

                {/* Content — staggered top|bottom|top */}
                <div className={`relative z-10 h-full flex flex-col p-6 ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                  <div>
                    <h3 className="text-xl font-normal text-white mb-3 leading-snug">
                      {card.title}
                    </h3>
                    <p className="text-white/80 text-sm leading-[1.2]">
                      {card.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop: >Cards Grid (lg+) */}
          <div className="hidden lg:grid lg:grid-cols-3 gap-5 md:gap-6">
            {data.cards.map((card, index) => (
              <Reveal key={index} className="relative rounded-[24px] overflow-hidden min-h-[420px] md:h-[60dvh] h-full group">

                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
                </div>

                {/* Content — staggered top|bottom|top */}
                <div className={`relative z-10 h-full flex flex-col p-6 md:p-10 ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                  <div>
                    <h3 className="text-xl md:text-2xl font-normal text-white mb-3 leading-snug">
                      {card.title}
                    </h3>
                    <p className="text-white text-sm leading-[1.2]">
                      {card.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Fade>
    </section>
  );
};

export default BrandLongTermBet;
