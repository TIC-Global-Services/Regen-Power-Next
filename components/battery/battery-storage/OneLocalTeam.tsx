'use client';

import React from 'react';
import Image, { StaticImageData } from 'next/image';

import CtaButton from '@/reuseables/CtaButton';
import Fade from '@/reuseables/fade';

export interface TrustCard {
  image: StaticImageData | string;
  title: string;
  description: string;
}

export interface OneLocalTeamData {
  topSubtitle: string;
  title: string;
  cards: TrustCard[];
  ctaText: string;
  ctaLink: string;
}

const TrustCardItem = ({ card }: { card: TrustCard }) => (
  <div
    className="bg-[#EEF6EB] rounded-[20px] p-7 md:p-8 flex flex-col transition-shadow duration-300 hover:shadow-md aspect-[3/3] md:aspect-auto md:min-h-[55dvh] justify-center items-start"
  >
    <div className="relative w-full flex-1 mb-6 md:h-30 md:mb-10">
      <Image
        src={card.image}
        alt={card.title}
        fill
        className="object-contain object-center"
        sizes="(max-width: 1024px) 100vw, 33vw"
      />
    </div>
    <div className="w-full text-center md:text-left">
      <h4 className="text-lg md:text-3xl font-normal text-black tracking-tight mb-2">
        {card.title}
      </h4>
      <p className="text-lg text-black leading-[1.2] tracking-tight ">
        {card.description}
      </p>
    </div>
  </div>
);

const OneLocalTeam = ({ data }: { data: OneLocalTeamData }) => {
  return (
    <Fade>
      <section className="bg-white py-16 md:py-24 px-[5%] md:px-[3%]">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-left md:text-center capitalize mb-10 md:mb-14">
            <h3 className="text-base md:text-[2.125rem] text-black font-normal tracking-tight leading-none">
              {data.topSubtitle}
            </h3>
            <h2 className="text-[2.5rem] md:text-7xl lg:text-[5rem] text-[#63B846] font-light leading-none tracking-tighter">
              {data.title}
            </h2>
          </div>

          {/* Desktop Layout (3 Columns Masonry) */}
          <div className="hidden lg:grid grid-cols-3 gap-5 mb-10">
            {/* Column 1: Cards 0 & 1 */}
            <div className="flex flex-col gap-5">
              {data.cards[0] && <TrustCardItem card={data.cards[0]} />}
              {data.cards[1] && <TrustCardItem card={data.cards[1]} />}
            </div>

            {/* Column 2: Card 2 & CTA */}
            <div className="flex flex-col gap-5 h-full">
              <div className="flex-1 flex flex-col justify-center">
                {data.cards[2] && <TrustCardItem card={data.cards[2]} />}
              </div>
              {/* Desktop CTA at bottom of middle column */}
              <div className="flex justify-center mt-auto pb-4">
                <CtaButton href={data.ctaLink} text={data.ctaText} textColor="text-black" />
              </div>
            </div>

            {/* Column 3: Cards 3 & 4 */}
            <div className="flex flex-col gap-5">
              {data.cards[3] && <TrustCardItem card={data.cards[3]} />}
              {data.cards[4] && <TrustCardItem card={data.cards[4]} />}
            </div>
          </div>

          {/* Mobile Layout (Horizontal Slider) */}
          <div className="flex overflow-x-auto lg:hidden gap-4 -mx-[5%] px-[5%] md:px-[3%] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pb-4 mb-8">
            {data.cards.map((card, idx) => (
              <div key={idx} className="w-[75vw] shrink-0 snap-start">
                <TrustCardItem card={card} />
              </div>
            ))}
          </div>

          {/* Mobile CTA */}
          <div className="lg:hidden text-center">
            <CtaButton href={data.ctaLink} text={data.ctaText} textColor="text-black" />
          </div>
        </div>
      </section>
    </Fade>
  );
};

export default OneLocalTeam;
