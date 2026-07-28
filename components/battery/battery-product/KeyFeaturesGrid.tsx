import React from 'react';
import Image, { StaticImageData } from 'next/image';

export interface KeyFeature {
  title: string;
  description: string;
  image?: StaticImageData | string;
}

export interface KeyFeaturesGridData {
  topSubtitle: string;
  title: string;
  description?: string;
  features: KeyFeature[];
}

const KeyFeaturesGrid = ({ data }: { data: KeyFeaturesGridData }) => {
  return (
    <section className="bg-white py-16 md:py-24 px-[5%]">
      <div className="">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h3 className="text-xl md:text-[2rem] text-black font-normal mb-2 tracking-tight">
            {data.topSubtitle}
          </h3>
          <h2 className="text-4xl md:text-5xl lg:text-[5rem] text-[#63B846] font-normal tracking-tight mb-4">
            {data.title}
          </h2>
          {data.description && (
            <p className="text-base md:text-lg text-black/80 max-w-3xl mx-auto">
              {data.description}
            </p>
          )}
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {data.features.map((feature, idx) => (
            <div
              key={idx}
              className="relative rounded-[20px] overflow-hidden h-[280px] md:h-[400px] group cursor-pointer"
            >
              {feature.image && (
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                <h4 className="text-white text-xl md:text-2xl font-medium tracking-tight leading-tight mb-2">
                  {feature.title}
                </h4>
                <p className="text-white/75 text-sm md:text-base leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeyFeaturesGrid;
