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
    <section className="bg-white w-full py-16 ">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-0 items-stretch w-full px-5 lg:px-0">

        {/* Image Column — same full-bleed, full-height rhythm as other split sections */}
        <div className="relative h-[450px] lg:h-screen overflow-hidden rounded-[20px] lg:rounded-none ">
          <Image
            src={data.image}
            alt={data.imageAlt || data.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Text Column — same gutters as other split sections */}
        <div className="flex flex-col justify-between pt-4 pb-16 py-4 lg:py-20 max-w-2xl px-5 lg:px-0 text-left">
          {/* Top block: title + subtitle */}
          <div className="max-w-xl">
            <h2 className="text-[2.5rem] md:text-5xl lg:text-[3.125rem] font-normal leading-tight tracking-tight mb-4 text-[#63B846]">
              {data.title}
            </h2>

            <p className="text-base md:text-xl tracking-tight leading-[1.2] font-light mb-14">
              {data.subtitle}
            </p>
          </div>

          {/* Bottom block: section header + recommendations */}
          <div className="max-w-xl mt-12">
            <h3 className="text-2xl md:text-3xl font-normal text-[#63B846] mb-6 tracking-tight">
              {data.sectionHeader}
            </h3>

            <ul className="space-y-1 list-none">
              {data.recommendations.map((item, idx) => (
                <li key={idx} className="text-base md:text-xl leading-[1] flex items-start">
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