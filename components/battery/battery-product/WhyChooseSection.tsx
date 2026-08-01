import React from 'react';
import Image, { StaticImageData } from 'next/image';
import CtaButton from '@/reuseables/CtaButton';

export interface WhyChooseCardItem {
  title: string;
  description: string;
}

export interface WhyChooseData {
  topSubtitle: string;
  title: string;
  description?: string;
  image: StaticImageData | string;
  cards: WhyChooseCardItem[];
  ctaText?: string;
  ctaLink?: string;
}

const WhyChooseSection = ({ data }: { data: WhyChooseData }) => {
  return (
    <section className="bg-white py-16 md:py-24 px-[5%]">
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
        {/* Left - Image */}
        <div className="w-full lg:w-1/2">
          <div className="relative w-full min-h-[400px] lg:min-h-[600px] rounded-[20px] overflow-hidden bg-gray-100">
            <Image
              src={data.image}
              alt={data.title}
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Right - Content */}
        <div className="w-full lg:w-1/2 flex flex-col items-start">
          <h3 className="text-xl md:text-2xl text-black font-normal mb-1 tracking-tight">
            {data.topSubtitle}
          </h3>
          <h2 className="text-4xl md:text-[4rem] text-[#63B846] font-normal leading-[1] mb-6 tracking-tight">
            {data.title}
          </h2>
          {data.description && (
            <p className="text-base md:text-lg text-black/80 font-normal mb-8 leading-[1.2]">
              {data.description}
            </p>
          )}

          <div className="space-y-6 mb-8 w-full">
            {data.cards.map((card, idx) => (
              <div key={idx} className="bg-[#F5F5F5] rounded-[16px] p-5 md:p-6">
                <h4 className="text-lg md:text-xl font-semibold text-black mb-2 tracking-tight">
                  {card.title}
                </h4>
                <p className="text-sm md:text-base text-black/70 leading-[1.2]">
                  {card.description}
                </p>
              </div>
            ))}
          </div>

          {data.ctaText && (
            <CtaButton
              href={data.ctaLink || '#'}
              text={data.ctaText}
              textColor="text-black"
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
