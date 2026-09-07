"use client";

import React from 'react';
import Image, { StaticImageData } from 'next/image';
import { ArrowUpRight, Car, CardSim } from 'lucide-react';
import Fade from '@/reuseables/fade';
import Reveal from '@/reuseables/Reveal';
import SectionHeader from '@/reuseables/SectionHeader';
import CtaButton from '@/reuseables/CtaButton';
import { SliderDots, SliderArrows, useSnapSlider } from '@/reuseables/MobileSliderControls';

export interface FinancingCard {
  title: string;
  description: string;
  image: StaticImageData | string;
  ctaText?: string;
  ctaLink?: string;
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
  const { trackRef, sync, active, canPrev, canNext, goTo, next, prev } = useSnapSlider(data.cards.length);
  const cta = data.cards.find((card: any) => card.ctaText);

  return (
    <section className="py-10 md:py-20 bg-white overflow-hidden">
      <Fade>
        <div className="px-[5%] md:px-[3%]">
          {/* Section Header */}
          <SectionHeader
            subtitle={data.subtitle}
            title={data.title}
            align="center"
            subtitleClass="text-xl md:text-[2.125rem] lg:leading-[0.2] font-normal text-black"
            titleClass="text-[3.125rem] md:text-4xl lg:text-[5rem] font-light text-[#63B846] tracking-tight leading-none md:leading-tight"
            className="mb-12 md:mb-16 "
          />

          {/* Cards Grid — swipe slider below lg (phone + iPad), 3-col grid at lg+ */}
          <div
          ref={trackRef}
          onScroll={sync}
          className="flex overflow-x-auto lg:snap-none lg:grid lg:grid-cols-3 gap-4 md:gap-6 -mx-[5%] px-[5%] lg:mx-0 lg:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pb-4 "
        >
            {data.cards.map((card, index) => (
              <Reveal key={index} className="group w-[80vw] md:w-[45vw] lg:w-auto shrink-0 snap-start flex flex-col lg:block">
                <div className="relative rounded-[24px] overflow-hidden min-h-[420px] lg:min-h-[500px]">
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
                  <div className="relative z-10 h-full flex flex-col justify-between p-6 md:p-8 min-h-[420px] lg:min-h-[500px]">
                    <div className={`flex flex-col ${index % 2 === 0 ? 'justify-start' : 'justify-end'} flex-1`}>
                      <div>
                        <h3 className="text-xl md:text-2xl font-normal text-white mb-3 leading-[1.2] tracking-tight">
                          {card.title}
                        </h3>
                        <p className="text-white text-sm md:text-lg leading-[1.2]">
                          {card.description}
                        </p>
                      </div>
                    </div>

                    {/* CTA Button — pinned to bottom (desktop cards only; phone/iPad share the single CTA below) */}
                    {card.ctaText && (
                      <div className="mt-6 hidden lg:flex justify-end">
                        <CtaButton href={card.ctaLink} text={card.ctaText} textColor='text-white' />
                      </div>
                    )}
                  </div>
                </div>

              </Reveal>
            ))}
          </div>

          <div className="lg:hidden">
            <SliderDots count={data.cards.length} active={active} onSelect={goTo} className="mt-5" />
            <SliderArrows canPrev={canPrev} canNext={canNext} onPrev={prev} onNext={next} className="mt-4" />
          </div>

          {/* Fixed CTA under the slider (doesn't scroll with cards) — centered on phone + iPad */}
          {cta?.ctaText && (
            <div className="mt-4 flex justify-center lg:hidden">
              <CtaButton href={cta?.ctaLink} text={cta?.ctaText ?? 'Check Your Eligibility'} textColor='text-white' />
            </div>
          )}
        </div>
      </Fade>
    </section>
  );
};

export default ZeroInterestFinancing;
