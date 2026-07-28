import React from 'react';
import Image, { StaticImageData } from 'next/image';

export interface RecommendationItem {
  condition: string;
  recommendation: string;
}

export interface QuickWayData {
  title: string;
  subtitle: string;
  sectionHeader: string;
  recommendations: RecommendationItem[];
  image: StaticImageData | string;
  imageAlt?: string;
}

const QuickWay: React.FC<{ data: QuickWayData }> = ({ data }) => {
  if (!data) return null;

  return (
    <section className="bg-white w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch w-full">

        {/* Image Column */}
        <div className="relative w-full min-h-[350px] lg:min-h-[600px] overflow-hidden">
          <Image
            src={data.image}
            alt={data.imageAlt || data.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Text Column */}
        <div className="flex flex-col justify-center py-16 lg:py-24 px-8 md:px-16 lg:pl-12 lg:pr-[8%] text-left">
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-5xl lg:text-[3.125rem] font-normal leading-tight tracking-tight mb-4 text-[#63B846]">
              {data.title}
            </h2>

            <p className="text-sm md:text-base leading-relaxed text-gray-700 font-light mb-10">
              {data.subtitle}
            </p>

            <h3 className="text-lg md:text-xl font-normal text-[#63B846] mb-6 tracking-tight">
              {data.sectionHeader}
            </h3>

            <ul className="space-y-2 list-none">
              {data.recommendations.map((item, idx) => (
                <li key={idx} className="text-sm md:text-[0.9rem] leading-relaxed flex items-start">
                  <span className="mr-2 text-black font-normal">•</span>
                  <span>
                    <span className="text-black font-normal">{item.condition}</span>
                    <span className="text-black font-normal"> → </span>
                    <span className="text-[#63B846] font-medium">{item.recommendation}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </section>
  );
};

export default QuickWay;