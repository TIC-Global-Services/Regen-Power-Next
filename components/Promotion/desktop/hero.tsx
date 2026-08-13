import React from 'react';
import Fade from '@/reuseables/fade';
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
  backgroundImage?: string;
  batteryImage?: string;
  title: string;
  subtitle: string;
  packages: HeroPackage[];
  sidebar: HeroSidebar;
}

const Hero = ({ data }: { data: HeroProps }) => {
  return (
    <section className="relative pt-36 pb-20 md:pt-30 md:pb-28 px-[5%] min-h-screen overflow-hidden bg-cover bg-bottom bg-no-repeat">
      {data.backgroundImage && (
        <img
          src={data.backgroundImage}
          alt=""
          className="absolute inset-0 z-0 h-full w-full object-cover object-center"
        />
      )}
      <Fade>
        <div className="relative z-10">
          {/* Header */}
          <div className="text-center  mb-10">
            <h1 className="text-3xl md:text-5xl lg:text-[2.75rem] text-white font-bold leading-[0.9] drop-shadow-md">
              {data.title.split(':').map((part, index) => (
                <span key={index} className={index === 1 ? 'block mt-2' : ''}>
                  {part}{index === 0 && ':'}
                </span>
              ))}
            </h1>
            <p className="text-xl lg:text-[2.75rem] text-black font-bold tracking-tight mt-2">
              {data.subtitle}
            </p>
          </div>

          {/* 4-Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-2 items-stretch">
            
            {/* Package Cards */}
            {data.packages.map((pkg, idx) => (
              <div
                key={idx}
                className="bg-white rounded-[10px] px-6 py-10 flex flex-col justify-between border border-gray-100  transition-all duration-300"
              >
                <div>
                  <h3 className="text-[1.8rem] md:text-[2.5rem] font-bold text-black tracking-tight leading-none text-center pb-3 border-b-[2] ">
                    {pkg.capacity}
                  </h3>
                  
                  <div className="mt-4 text-center">
                    <span className="text-4xl md:text-[3.125rem] font-bold text-black">
                      ${pkg.originalPrice.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex flex-col  mt-10">
                    <div className="flex items-center justify-center text-[1.375rem]">
                      <MinusCircle className="text-red-500 shrink-0 mr-1" size={18} />
                      <span>State Rebate: <span className="font-normal">${pkg.stateRebate.toLocaleString()}</span></span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-[1.375rem]">
                      <MinusCircle className="text-red-500 shrink-0 mr-1" size={18} />
                      <span>Federal Rebate: <span className="font-normal">${pkg.federalRebate.toLocaleString()}</span></span>
                    </div>
                  </div>
                </div>

                <div className="text-center  border-t border-gray-100">
                  <span className="text-xl font-bold  block">Final Pricing</span>
                  <span className="text-3xl md:text-[3.750rem] font-bold text-[#63B846] block mb-1">
                    ${pkg.finalPrice.toLocaleString()}
                  </span>
                  <span className="text-lg  font-normal">{pkg.isFullyInstalled ? "Fully Installed" : ""}</span>
                  <p className="text-lg  font-bold">{pkg.priceNote}</p>
                </div>
              </div>
            ))}

            {/* Column 3: Battery Image Container */}
            {data.batteryImage && (
              <div className="bg-white/10 backdrop-blur-md rounded-[10px] p-4 flex items-center justify-center border border-white/20  relative overflow-hidden group">
                <div className="absolute inset-0 bg-[#EEF6EB]/10 mix-blend-overlay" />
                <div className="w-full h-full min-h-[20dvh] relative">
                  <img
                    src={data.batteryImage}
                    alt="Battery Stack Render"
                    className="h-full w-full object-contain p-8 transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </div>
            )}

            {/* Column 4: Sidebar Info Card */}
            <div className="bg-white rounded-[10px] px-6 py-8 flex flex-col  justify-between  border border-gray-100">
              <div>
                <h3 className="text-[2.875rem] font-bold text-[#63B846] mb-4 whitespace-pre-line leading-[1.1]">
                  {data.sidebar.title}
                </h3>
                <h4 className="text-xl font-bold text-black  mt-8 tracking-tight leading-snug whitespace-pre-line">
                  {data.sidebar.subtitle}
                </h4>
                <div className="mt-15 space-y-4 max-w-md">
                  {data.sidebar.paragraphs.map((p, idx) => (
                    <p key={idx} className="text-lg text-gray-600 leading-snug">
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
