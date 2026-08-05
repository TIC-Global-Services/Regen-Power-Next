import React from 'react';
import Image, { StaticImageData } from 'next/image';
import { ArrowUpRight, Car, CardSim } from 'lucide-react';
import Fade from '@/reuseables/fade';
import Reveal from '@/reuseables/Reveal';
import SectionHeader from '@/reuseables/SectionHeader';
import CtaButton from '@/reuseables/CtaButton';

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
  const cta = data.cards.find((card: any) => card.ctaText);
  console.log("ctatext ctatext", cta)

  return (
    <section className="py-10 md:py-20 bg-white overflow-hidden">
      <Fade>
        <div className="md:px-[3%]">
          {/* Section Header */}
          <SectionHeader
            subtitle={data.subtitle}
            title={data.title}
            align="center"
            subtitleClass="text-xl md:text-[2.125rem] lg:leading-[0.2] font-normal text-black"
            titleClass="text-[3.125rem] md:text-4xl lg:text-[5rem] font-light text-black tracking-tight leading-none md:leading-tight"
            className="mb-12 md:mb-16 "
          />

          {/* Cards Grid */}
          <div className="flex overflow-x-auto md:grid md:grid-cols-3 gap-4 ml-5 md:gap-6 snap-x snap-mandatory -mx-[1%] px-[0%] md:mx-0 md:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pb-4">
            {data.cards.map((card, index) => (
              <Reveal key={index} className="group w-[80vw] md:w-auto shrink-0 snap-start flex flex-col md:block">
                <div className="relative rounded-[24px] overflow-hidden min-h-[420px] md:min-h-[500px]">
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
                  <div className="relative z-10 h-full flex flex-col justify-between p-6 md:p-8 min-h-[420px] md:min-h-[500px]">
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
                      <div className="mt-6 md:flex justify-end hidden ">
                        <CtaButton text={card.ctaText} textColor='text-white' />
                      </div>
                    )}
                  </div>
                </div>
                
              </Reveal>
            ))}
          </div>

          {/* Fixed position mobile CTA (doesn't scroll with cards) */}
          {cta?.ctaText && (
            <div className="mt-4 flex justify-end md:hidden px-[3%] md:px-0">
              <CtaButton text={cta?.ctaText ?? 'Check Your Eligibility'} textColor='text-white' />
            </div>
          )}
        </div>
      </Fade>
    </section>
  );
};

export default ZeroInterestFinancing;
