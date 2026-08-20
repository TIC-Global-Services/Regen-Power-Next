import React from 'react';
import { StaticImageData } from 'next/image';
import { BatteryBillImpactCarousel } from './BatteryBillImpactCarousel';

export interface JargonCard {
  title: string;
  description: string;
  image: StaticImageData | string;
}

export interface BatteryJargonData {
  topSubtitle: string;
  title: string;
  description: string;
  cards: JargonCard[];
}

const BatteryJargon = ({ data }: { data: BatteryJargonData }) => {
  return (
    <section className="bg-white py-16 md:py-20 px-[5%] md:px-[3%] overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-10 items-center">
        {/* Left Content */}
        <div className="w-full flex flex-col items-start pr-0 lg:pr-8 shrink-0">
          <h3 className="text-base md:text-[2.125rem] text-black font-normal mb-1 leading-tight tracking-tight">
            {data.topSubtitle}
          </h3>
          <h2 className="text-[2.5rem] md:text-[5rem] text-[#63B846] font-normal leading-[1.1] mb-6 tracking-tight">
            {data.title}
          </h2>
          <p className="text-base md:text-xl text-black leading-[1] tracking-tight capitalize font-medium">
            {data.description}
          </p>
        </div>

        {/* Right Content - Carousel */}
        <BatteryBillImpactCarousel cards={data.cards} />
      </div>
    </section>
  );
};

export default BatteryJargon;
