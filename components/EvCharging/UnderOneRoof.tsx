'use client';

import React from 'react';
import Image from 'next/image';
import Fade from '@/reuseables/fade';
import Reveal from '@/reuseables/Reveal';

interface FeatureCard {
  title: string;
  description: string;
  image: string;
}

interface UnderOneRoofData {
  subtitle: string;
  title: string;
  description: string;
  cards: FeatureCard[];
}

interface UnderOneRoofProps {
  data: UnderOneRoofData;
}

const UnderOneRoof = ({ data }: UnderOneRoofProps) => {
  return (
    <section className="py-16 md:py-20 bg-[#EEF6EB] overflow-hidden">
      <div className="px-[5%]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
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

          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.cards.map((card, index) => (
              <Reveal key={index} delay={0.1 * (index + 1)} className={index === 0 ? "md:col-span-2" : ""}>
                <div className="bg-white rounded-[20px] p-8 md:p-10 relative overflow-hidden flex flex-col justify-between min-h-[40dvh] group hover:shadow-md transition-all duration-300">
                  <div className="flex flex-col gap-3 relative z-10">
                    <h3 className="text-xl md:text-2xl font-medium text-black tracking-tight leading-snug">
                      {card.title}
                    </h3>
                    <p className="text-sm md:text-base text-black/70 leading-[1.2]">
                      {card.description}
                    </p>
                  </div>
                  {card.image && (
                    <div className="relative w-full h-40 mt-auto overflow-hidden pointer-events-none">
                      <Image
                        src={card.image}
                        alt={card.title}
                        fill
                        className="object-contain"
                      />
                    </div>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default UnderOneRoof;
