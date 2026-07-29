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
        <div className="px-[5%]">
          {/* Section Header */}
          <SectionHeader
            subtitle={data.subtitle}
            title={<span className="text-[#63B846] font-medium tracking-tighter">{data.title}</span>}
            align="left"
            subtitleClass="md:text-[2.125rem] lg:leading-1.2 font-normal text-black"
            titleClass="lg:text-[5rem] font-light text-black tracking-tight leading-tight"
            className="mb-12 md:mb-16 lg:-space-y-5"
          />

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            {data.cards.map((card, index) => (
              <Reveal key={index} className="relative rounded-[24px] overflow-hidden min-h-[420px] md:min-h-[500px] group">

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

                  {/* Content */}
                  <div className="relative z-10 h-full flex flex-col justify-between p-6 md:p-8">
                    <div>
                      <h3 className="text-xl md:text-2xl font-normal text-white mb-3 leading-snug">
                        {card.title}
                      </h3>
                      <p className="text-white/80 text-sm leading-[1.2]">
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
