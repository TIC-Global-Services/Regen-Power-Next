import React from 'react';
import Image, { StaticImageData } from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import Fade from '@/reuseables/fade';
import Reveal from '@/reuseables/Reveal';
import SectionHeader from '@/reuseables/SectionHeader';

export interface FinancingCard {
  title: string;
  description: string;
  image: StaticImageData | string;
  ctaText?: string;
}

export interface ZeroInterestFinancingData {
  subtitle: string;
  title: React.ReactNode;
  cards: FinancingCard[];
}

interface ZeroInterestFinancingProps {
  data: ZeroInterestFinancingData;
}

const ZeroInterestFinancing = ({ data }: ZeroInterestFinancingProps) => {
  return (
    <section className="py-16 md:py-20 bg-white overflow-hidden">
      <Fade>
        <div className="px-[3%]">
          {/* Section Header */}
          <SectionHeader
            subtitle={data.subtitle}
            title={data.title}
            align="center"
            subtitleClass="md:text-[2.125rem] lg:leading-[0.2] font-normal text-black"
            titleClass="lg:text-[5rem] font-light text-black tracking-tight leading-tight"
            className="mb-12 md:mb-16 "
          />

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 ">
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
                    <h3 className="text-xl md:text-2xl font-normal text-white mb-3 leading-[1.2] tracking-tight">
                      {card.title}
                    </h3>
                    <p className="text-white/80 text-sm md:text-lg leading-[1.2]">
                      {card.description}
                    </p>
                  </div>

                  {/* CTA Button */}
                  {card.ctaText && (
                    <div className="mt-6 flex justify-end">
                      <button className="flex items-center gap-2 border border-[#63B846] bg-[#63B84666] text-white text-sm font-medium px-2 py-2 rounded-full hover:bg-[#52a039] transition-colors group/btn">
                        <span>{card.ctaText}</span>
                        <ArrowUpRight size={25} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform bg-[#A0CF44] rounded-2xl" />
                      </button>
                    </div>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Fade>
    </section>
  );
};

export default ZeroInterestFinancing;
