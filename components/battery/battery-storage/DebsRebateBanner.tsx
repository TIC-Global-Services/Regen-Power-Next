import React from 'react';
import Image, { StaticImageData } from 'next/image';
import CtaButton from '@/reuseables/CtaButton';

export interface DebsRebateData {
  subtitle: string;
  title: string;
  description: string;
  image: StaticImageData | string;
  ctaText: string;
  ctaLink: string;
}

const DebsRebateBanner = ({ data }: { data: DebsRebateData }) => {
  return (
    <section className="bg-white py-12 md:py-20 px-[5%] md:px-[3%]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        {/* Right — Image (on top on mobile, right column on desktop) */}
        <div className="relative  aspect-[4/5] h-full w-full rounded-[20px] overflow-hidden order-1 lg:order-2 justify-self-center">
          <Image
            src={data.image}
            alt={data.title}
            fill
            className="object-cover"

          />
        </div>

        {/* Left — Text Content */}
        <div className="flex flex-col justify-center order-2 lg:order-1 ">
          <h3 className="text-xl md:text-[2.125rem] text-black font-normal tracking-tight leading-[1.1] mb-1">
            {data.subtitle}
          </h3>
          <h2 className="text-5xl md:text-6xl lg:text-[5rem] text-[#63B846] font-medium leading-[1.05] tracking-tight mb-6">
            {data.title}
          </h2>
          <p className="text-base md:text-xl text-black leading-[1.2] tracking-tight mb-10 max-w-2xl capitalize ">
            {data.description}
          </p>
          <div>
            <CtaButton href={data.ctaLink} text={data.ctaText} textColor="text-black" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DebsRebateBanner;
