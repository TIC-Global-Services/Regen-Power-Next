import React from 'react';
import Image, { StaticImageData } from 'next/image';
import CtaButton from '@/reuseables/CtaButton';

export interface ProductOverviewData {
  topSubtitle: string;
  title: string;
  description: string;
  highlights: string[];
  ctaText?: string;
  ctaLink?: string;
  image: StaticImageData | string;
}

const ProductOverview = ({ data }: { data: ProductOverviewData }) => {
  return (
    <section className="bg-white py-16 md:py-24 px-[5%]">
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
        {/* Left Content */}
        <div className="w-full lg:w-1/2 flex flex-col items-start">
          <h3 className="text-xl md:text-2xl text-black font-normal mb-1 tracking-tight">
            {data.topSubtitle}
          </h3>
          <h2 className="text-4xl md:text-[5rem] text-[#63B846] font-normal leading-[1] mb-6 tracking-tight">
            {data.title}
          </h2>
          <p className="text-base md:text-lg text-black/80 font-normal mb-8 leading-[1.2]">
            {data.description}
          </p>

          <ul className="space-y-3 mb-8 w-full">
            {data.highlights.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-[#63B846] mt-2 shrink-0" />
                <span className="text-sm md:text-base text-black/80 leading-[1.2]">{item}</span>
              </li>
            ))}
          </ul>

          {data.ctaText && (
            <CtaButton
              href={data.ctaLink || '#'}
              text={data.ctaText}
              textColor="text-black"
            />
          )}
        </div>

        {/* Right Content - Image */}
        <div className="w-full lg:w-1/2">
          <div className="relative w-full min-h-[350px] lg:min-h-[550px] rounded-[20px] overflow-hidden bg-gray-100">
            <Image
              src={data.image}
              alt={data.title}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductOverview;
