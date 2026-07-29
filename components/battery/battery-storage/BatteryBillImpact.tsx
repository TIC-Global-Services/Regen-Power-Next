import React from 'react';
import Image, { StaticImageData } from 'next/image';
import { BatteryBillImpactCarousel } from './BatteryBillImpactCarousel';

export interface BillImpactCard {
  title: string;
  description: string;
  image: StaticImageData | string;
}

export interface BatteryBillImpactData {
  topSubtitle: string;
  title: string;
  description: string;
  cards: BillImpactCard[];
}

const BatteryBillImpact = ({ data }: { data: BatteryBillImpactData }) => {
  return (
    <section className="bg-white py-16 md:py-20  overflow-hidden">
      <div className="grid grid-cols-2 justify-between gap-12 lg:gap-10 items-center">
        {/* Left Content */}
        <div className="w-full px-[5%] flex flex-col items-start pr-0 lg:pr-8 shrink-0">
          <h3 className="text-2xl md:text-[2.125rem] text-black font-normal mb-1 leading-tight tracking-tight">
            {data.topSubtitle}
          </h3>
          <h2 className="text-4xl md:text-[5rem] text-[#63B846] font-normal leading-[1.1] mb-6 tracking-tight">
            {data.title}
          </h2>
          <p className="text-base md:text-xl text-black/90 font-medium">
            {data.description}
          </p>
        </div>

        {/* Right Content - Carousel */}
        <BatteryBillImpactCarousel cards={data.cards} />
      </div>
    </section>
  );
};

export default BatteryBillImpact;
