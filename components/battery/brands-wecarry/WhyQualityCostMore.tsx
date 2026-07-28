import React from 'react';
import Image, { StaticImageData } from 'next/image';

export interface QualityFactor {
  title: string;
  description: string;
}

export interface WhyQualityCostMoreData {
  title: string;
  subtitle?: string;
  factors: QualityFactor[];
  image: string | StaticImageData;
}

export interface WhyQualityCostMoreProps {
  data: WhyQualityCostMoreData;
}

const WhyQualityCostMore: React.FC<WhyQualityCostMoreProps> = ({ data }) => {
  if (!data) return null;

  return (
    <section className="w-full bg-[#F7FBF5] px-[5%] py-16 md:py-24 font-sans border-t border-b border-[#E5E7EB]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          
          {/* Left Column: Text Factors */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            {data.subtitle && (
              <p className="text-lg md:text-xl font-normal tracking-tight text-black mb-2">
                {data.subtitle}
              </p>
            )}
            <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-light text-[#63B846] mb-8 leading-tight tracking-tight">
              {data.title}
            </h2>

            {/* Factors list */}
            <div className="space-y-8">
              {data.factors.map((factor, index) => (
                <div key={index} className="flex flex-col">
                  <h3 className="text-lg md:text-xl font-bold text-black mb-2 flex items-center">
                    <span className="text-[#63B846] mr-2 font-extrabold">{index + 1}.</span>
                    {factor.title}
                  </h3>
                  <p className="text-sm md:text-base text-black/75 font-normal leading-relaxed pl-6">
                    {factor.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Image */}
          <div className="lg:col-span-6 relative w-full h-[320px] md:h-[480px] lg:h-[580px] rounded-[30px] overflow-hidden shadow-sm">
            <Image
              src={data.image}
              alt={data.title}
              fill
              className="object-cover"
              sizes="(max-w-1024px) 100vw, 50vw"
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyQualityCostMore;
