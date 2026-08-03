import React from 'react';
import Image, { StaticImageData } from 'next/image';

export interface BrandMatterCard {
  title: string;
  description: string;
  image: StaticImageData | string;
}

export interface BatteryBrandMattersData {
  topSubtitle: string;
  title: string;
  description?: string;
  cards: BrandMatterCard[];
}

const BatteryBrandMatters = ({ data }: { data: BatteryBrandMattersData }) => {
  return (
    <section className="bg-white py-16 md:py-24 px-[5%]">
      <div className="">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16 max-w-4xl mx-auto">
          <h3 className="text-xl md:text-2xl text-black font-normal mb-2 tracking-tight">
            {data.topSubtitle}
          </h3>
          <h2 className="text-4xl md:text-6xl lg:text-[4.5rem] text-[#63B846] font-normal leading-none tracking-tight mb-4">
            {data.title}
          </h2>
          {data.description && (
            <p className="text-sm md:text-base text-black/75 font-normal max-w-2xl mx-auto leading-[1.2]">
              {data.description}
            </p>
          )}
        </div>

        {/* 4-Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {data.cards.map((card, idx) => (
            <div
              key={idx}
              className="relative rounded-[24px] overflow-hidden min-h-[460px] md:min-h-[520px] flex flex-col justify-start p-6 md:p-7 group"
            >
              {/* Background Image */}
              <Image
                src={card.image}
                alt={card.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Dark Overlay for Text Readability */}
              <div className="absolute inset-0 bg-black/45 transition-opacity duration-300 group-hover:bg-black/55" />

              {/* Text Content */}
              <div className={`relative z-10 flex flex-col h-full ${idx % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                <h4 className="text-white text-xl md:text-2xl font-normal leading-tight mb-3 tracking-tight">
                  {card.title}
                </h4>
                <p className="text-white/85 text-xs md:text-sm font-light leading-[1.2]">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BatteryBrandMatters;
