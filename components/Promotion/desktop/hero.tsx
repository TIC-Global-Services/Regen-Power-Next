import React from 'react';
import Fade from '@/reuseables/fade';
import Image from 'next/image';
import { MinusCircle } from 'lucide-react';

export interface HeroPackage {
  capacity: string;
  originalPrice: number;
  finalPrice: number;
  stateRebate: number;
  federalRebate: number;
  isFullyInstalled: boolean;
  priceNote: string;
}

export interface HeroSidebar {
  title: string;
  subtitle: string;
  paragraphs: string[];
  ctaText: string;
}

export interface HeroProps {
  title: string;
  subtitle: string;
  packages: HeroPackage[];
  sidebar: HeroSidebar;
}

const Hero = ({ data }: { data: HeroProps }) => {
  return (
    <section
      className="relative pt-36 pb-20 md:pt-40 md:pb-28 px-[5%] min-h-screen overflow-hidden bg-cover bg-bottom bg-no-repeat"
      
    >
      <Fade>
        <div className="relative z-10">
          {/* Header */}
          <div className="text-center max-w-5xl mx-auto mb-16">
            <h1 className="text-3xl md:text-5xl lg:text-[2.75rem] text-white font-bold leading-[0.9] drop-shadow-md">
              {data.title.split(':').map((part, index) => (
                <span key={index} className={index === 1 ? 'block mt-2' : ''}>
                  {part}{index === 0 && ':'}
                </span>
              ))}
            </h1>
            <p className="text-xl lg:text-[2.75rem] text-black font-extrabold tracking-tight mt-2 drop-shadow-sm">
              {data.subtitle}
            </p>
          </div>

          {/* 4-Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6 items-stretch">
            
            {/* Package Cards */}
            {data.packages.map((pkg, idx) => (
              <div
                key={idx}
                className="bg-white rounded-[20px] p-6 flex flex-col justify-between border border-gray-100 hover:shadow-xl transition-all duration-300"
              >
                <div>
                  <h3 className="text-[1.8rem] md:text-[2.2rem] font-bold text-black text-center pb-3 border-b border-gray-200">
                    {pkg.capacity}
                  </h3>
                  
                  <div className="my-2 text-center">
                    <span className="text-4xl md:text-[3.125rem] font-extrabold text-black">
                      ${pkg.originalPrice.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex flex-col gap-2 mt-10">
                    <div className="flex items-center justify-center gap-2 text-xl text-gray-700">
                      <MinusCircle className="text-red-500 shrink-0" size={16} />
                      <span>State Rebate: <span className="font-bold">${pkg.stateRebate.toLocaleString()}</span></span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-xl text-gray-700">
                      <MinusCircle className="text-red-500 shrink-0" size={16} />
                      <span>Federal Rebate: <span className="font-bold">${pkg.federalRebate.toLocaleString()}</span></span>
                    </div>
                  </div>
                </div>

                <div className="text-center pt-4 border-t border-gray-100">
                  <span className="text-xl font-bold  block mb-1">Final Pricing</span>
                  <span className="text-3xl md:text-[3.5rem] font-extrabold text-[#63B846] block mb-1">
                    ${pkg.finalPrice.toLocaleString()}
                  </span>
                  <span className="text-lg  font-normal">{pkg.isFullyInstalled ? "Fully Installed" : ""}</span>
                  <p className="text-lg  font-bold">{pkg.priceNote}</p>
                </div>
              </div>
            ))}

            {/* Column 3: Battery Image Container */}
            <div className="bg-white/10 backdrop-blur-md rounded-[20px] p-6 flex items-center justify-center border border-white/20 shadow-lg relative overflow-hidden group">
              <div className="absolute inset-0 bg-[#EEF6EB]/10 mix-blend-overlay" />
              <div className="w-full h-full min-h-[50dvh] relative">
                <Image
                  src="/assets/home/batteryquote/battery_quote_temp.png"
                  alt="Battery Stack Render"
                  fill
                  className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Column 4: Sidebar Info Card */}
            <div className="bg-white rounded-[20px] p-6 flex flex-col  justify-between shadow-lg border border-gray-100">
              <div>
                <h3 className="text-[2.25rem] font-bold text-[#63B846] mb-4 ">
                  {data.sidebar.title}
                </h3>
                <h4 className="text-xl font-bold text-black mb-4 leading-snug">
                  {data.sidebar.subtitle}
                </h4>
                <div className="mt-15 space-y-4">
                  {data.sidebar.paragraphs.map((p, idx) => (
                    <p key={idx} className="text-lg text-gray-600 leading-[1.2]">
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </Fade>
    </section>
  );
};

export default Hero;
