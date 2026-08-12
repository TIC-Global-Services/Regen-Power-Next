'use client';

import React from 'react';
import Fade from '@/reuseables/fade';
import Marquee from '@/reuseables/Marquee';

export interface BrandLogo {
  name: string;
  logo: string;
}

export interface BatteryItem {
  name: string;
  image: string;
  logo: string;
}

export interface BrandsProps {
  title?: string;
  titleGreen?: string;
  description?: string;
  brands?: BrandLogo[];
  batteries?: BatteryItem[];
}

const Brands = ({
  title = "The Brands",
  titleGreen = "We Trust & Install",
  description = "We carry a wide range of brands from entry-level to premium, ensuring you can customize the solar panel system to your budget.",
  brands = [
    { name: "AlphaESS", logo: "/logo/alpha_ess_logo.png" },
    { name: "BYD", logo: "/logo/byd_logo.png" },
    { name: "GoodWe", logo: "/logo/goodwe_logo.png" },
    { name: "iStore", logo: "/logo/istore_logo.png" },
    { name: "Sigenergy", logo: "/logo/sigenergy.png" },
    { name: "Tesla", logo: "/logo/tesla_logo.png" }
  ],
  batteries = [
    { name: "iStore", image: "/istore_brand.png", logo: "/logo/istore_logo.png" },
    { name: "Tesla Powerwall", image: "/tesla.png", logo: "/logo/tesla_logo.png" },
    { name: "Sigenergy", image: "/sig_energy.png", logo: "/logo/sigenergy.png" },
    { name: "GoodWe", image: "/goodwe.png", logo: "/logo/goodwe_logo.png" },
    { name: "AlphaESS", image: "/alpha_ess.png", logo: "/logo/alpha_ess_logo.png" },
    { name: "BYD", image: "/byd.png", logo: "/logo/byd_logo.png" }
  ]
}: BrandsProps) => {

  return (
    <section className="bg-white py-16 md:py-24 px-4 md:px-[5%] w-full border-t border-gray-100">
      <Fade>
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-black tracking-tight leading-tight">
              {title} <span className="text-[#63B846]">{titleGreen}</span>
            </h2>
            {description && (
              <p className="mt-4 text-sm md:text-base text-gray-500 leading-relaxed">
                {description}
              </p>
            )}
          </div>

          {/* Brands Logo Marquee Row */}
          {brands.length > 0 && (
            <div className="py-6 border-y border-gray-100 bg-gray-50/30 mb-16 overflow-hidden">
              <Marquee speed={25} gap={40} repeat={3} pauseOnHover={true}>
                {brands.map((brand, idx) => (
                  <div key={idx} className="flex items-center justify-center h-12 w-40 shrink-0 px-4">
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      className="max-h-8 max-w-full object-contain filter grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/fallback.png';
                      }}
                    />
                  </div>
                ))}
              </Marquee>
            </div>
          )}

          {/* Batteries & Inverters Grid - 2 cols on mobile, 3 cols on tab, 6 cols on desktop */}
          {batteries.length > 0 && (
            <div className="border border-gray-200/80 rounded-[28px] overflow-hidden bg-white shadow-sm">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 divide-x divide-y lg:divide-y-0 divide-gray-200/80">
                {batteries.map((battery, idx) => (
                  <div 
                    key={idx} 
                    className="flex flex-col items-center justify-between p-6 hover:bg-gray-50/50 transition-colors duration-300 min-h-[260px] md:min-h-[300px]"
                  >
                    {/* Battery Product Image */}
                    <div className="w-full flex-1 flex items-center justify-center mb-6">
                      <img
                        src={battery.image}
                        alt={battery.name}
                        className="max-h-[140px] md:max-h-[180px] w-auto object-contain hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/fallback.png';
                        }}
                      />
                    </div>

                    {/* Brand Logo Below Image */}
                    <div className="h-8 w-full flex items-center justify-center mt-auto border-t border-gray-100 pt-3">
                      <img
                        src={battery.logo}
                        alt={`${battery.name} Logo`}
                        className="max-h-5 max-w-[80%] object-contain filter grayscale group-hover:grayscale-0"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/fallback.png';
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </Fade>
    </section>
  );
};

export default Brands;
