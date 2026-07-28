'use client';

import React from 'react';
import Image, { StaticImageData } from 'next/image';

import Fade from '@/reuseables/fade';
import Reveal from '@/reuseables/Reveal';
import SectionHeader from '@/reuseables/SectionHeader';

export interface BrandLongTermCard {
  title: string;
  description: string;
  image: string | StaticImageData;
}

export interface BrandIsLongTermData {
  subtitle: string;
  title: string;
  cards: BrandLongTermCard[];
}

interface BrandIsLongTermProps {
  data: BrandIsLongTermData;
}

const BrandIsLongTerm: React.FC<BrandIsLongTermProps> = ({ data }) => {
  if (!data) return null;

  return (
    <section className="py-16 md:py-24 bg-white overflow-hidden">
      <Fade>
        <div className="px-[5%]">
          {/* Section Header */}
          <SectionHeader
            subtitle={data.subtitle}
            title={<span className="text-black font-medium tracking-tighter">{data.title}</span>}
            align="left"
            subtitleClass="md:text-[1.25rem] lg:leading-1.2 font-normal text-black/70"
            titleClass="lg:text-[3.75rem] font-light text-black tracking-tight leading-tight"
            className="mb-12 md:mb-16 lg:-space-y-1"
          />

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            {data.cards.map((card, index) => (
              <Reveal
                key={index}
                className="relative rounded-[24px] overflow-hidden min-h-[420px] md:min-h-[500px] group"
              >
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
                <div className="relative z-10 h-full flex flex-col justify-end p-6 md:p-8">
                  <h3 className="text-xl md:text-2xl font-normal text-white mb-3 leading-snug">
                    {card.title}
                  </h3>
                  <p className="text-white/80 text-sm leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Fade>
    </section>
  );
};

export default BrandIsLongTerm;