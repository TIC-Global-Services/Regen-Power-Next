import React from 'react';
import Image, { StaticImageData } from 'next/image';

export interface SchemeDataItem {
  subtitle: string;
  title: string;
  description: string;
  listItems: string[];
  timingText: string;
  taxText: string;
  image: StaticImageData | string;
}

export interface ResidentialBatteryProps {
  data?: SchemeDataItem[];
}

const ResidentialBattery: React.FC<ResidentialBatteryProps> = ({ data = [] }) => {
  if (!data || data.length === 0) return null;
  return (
    <section className="w-full bg-white">
      {data.map((item, index) => (
        <div key={index} className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch w-full">
          {/* Left Side: Image — same inset rhythm as AreYouEligible/FullscreenSplitSection (bleeds at lg) */}
          <div className="relative h-[450px] lg:h-screen overflow-hidden rounded-[20px] lg:rounded-none px-5 md:px-16 lg:px-0">
            <Image
              src={item.image}
              alt="WA Residential Battery Scheme"
              fill
              className="object-cover"
            />
          </div>

          {/* Right Side: Content — same gutters as FullscreenSplitSection */}
          <div className="w-full flex flex-col justify-center pt-4 pb-16 lg:py-24 px-5 md:px-10 lg:pl-12 lg:pr-20">
            <h3 className="text-xl md:text-2xl font-normal text-black tracking-tight mb-2">
              {item.subtitle}
            </h3>
            
            <h2 className="text-3xl md:text-4xl lg:text-[3.125rem] font-light text-[#63B846] leading-[1.1] tracking-tight mb-6">
              {item.title}
            </h2>
            
            <p className="text-base md:text-xl text-black font-medium tracking-tight leading-[1.2] mb-6">
              {item.description}
            </p>
            
            <ul className="flex flex-col gap-1 mb-8">
              {item.listItems.map((listItem, i) => (
                <li key={i} className="flex items-start text-sm md:text-base text-black font-normal tracking-tight leading-[1.2]">
                  <span className="mr-2 font-bold text-black">•</span>
                  <span>{listItem}</span>
                </li>
              ))}
            </ul>
            
            <p className="text-base md:text-lg text-[#63B846] font-medium tracking-tight leading-[1.2] mb-4">
              {item.timingText}
            </p>
            
            <p className="text-base md:text-lg text-[#63B846] font-medium tracking-tight leading-[1.2]">
              {item.taxText}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
};

export default ResidentialBattery;