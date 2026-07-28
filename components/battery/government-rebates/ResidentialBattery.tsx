import React from 'react';
import Image, { StaticImageData } from 'next/image';

// Assuming you have an image at this path, update if necessary
import fallbackImg from '@/assets/for_your_home.png';

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
        <div key={index} className="grid grid-cols-1 md:grid-cols-2 w-full gap-20">
          {/* Left Side: Image */}
          <div className="w-full relative min-h-screen">
            <Image
              src={item.image}
              alt="WA Residential Battery Scheme"
              fill
              className="object-cover"
            />
          </div>

          {/* Right Side: Content */}
          <div className="w-full  flex flex-col justify-center py-12">
            <h3 className="text-xl md:text-2xl font-normal text-black tracking-tight mb-2">
              {item.subtitle}
            </h3>
            
            <h2 className="text-3xl md:text-4xl lg:text-[3.125rem] font-light text-[#63B846] leading-[1.1] tracking-tight mb-6">
              {item.title}
            </h2>
            
            <p className="text-base md:text-xl text-black font-medium leading-[1.2] mb-6">
              {item.description}
            </p>
            
            <ul className="flex flex-col gap-1 mb-8">
              {item.listItems.map((listItem, i) => (
                <li key={i} className="flex items-start text-sm md:text-base text-black font-normal leading-[1.2]">
                  <span className="mr-2 font-bold text-black">•</span>
                  <span>{listItem}</span>
                </li>
              ))}
            </ul>
            
            <p className="text-base md:text-lg text-[#63B846] font-medium leading-[1.2] mb-4">
              {item.timingText}
            </p>
            
            <p className="text-base md:text-lg text-[#63B846] font-medium leading-[1.2]">
              {item.taxText}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
};

export default ResidentialBattery;