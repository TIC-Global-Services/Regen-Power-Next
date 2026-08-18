import React from 'react';
import Fade from '@/reuseables/fade';
import Marquee from '@/reuseables/Marquee';
import Reveal from '@/reuseables/Reveal';

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
  title: string;
  subtitle: string;
  brands: BrandLogo[];
  batteries: BatteryItem[];
}

const Brands = ({ data }: { data: BrandsProps }) => {
  const { title, subtitle, brands = [], batteries = [] } = data || {};

  return (
    <section className="bg-white py-16 md:py-25 overflow-hidden border-t border-gray-100">
      <Fade>
        {/* Header */}
        <div className=" px-[3%] mb-10 text-center">
          <span className="block text-black text-sm md:text-[2.125rem] font-bold  tracking-tight leading-none">
            {subtitle}
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-[5rem] font-bold text-[#63B846] tracking-tight leading-none">
            {title}
          </h2>
        </div>

        {/* Panel Brands Marquee Row using Reusable Marquee */}
        {brands.length > 0 && (
          <div className="py-4  bg-[#EEF6EB]/10 mb-12">
            <Marquee speed={30} gap={5} repeat={4} pauseOnHover={false}>
              {brands.map((brand, idx) => (
                <div key={idx} className="flex items-center justify-center px-8 border-r border-[#00000033] h-24 w-44 shrink-0 divide-y md:divide-y-0 lg:divide-x divide-[#00000033]">
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="h-50 w-auto object-contain  transition-opacity duration-300"
                  />
                </div>
              ))}
            </Marquee>
          </div>
        )}
        <div className="h-[1px] max-w-7xl mx-auto bg-[#00000033]"></div>
        {/* Batteries & Inverters Static Grid (No Marquee, Full Height Images) */}
        {batteries.length > 0 && (
          <div className="px-[3%] py-[5%]">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 overflow-hidden divide-y md:divide-y-0 lg:divide-x divide-[#00000033] bg-white">
              {batteries.map((battery, idx) => (
                <Reveal key={idx}>
                  <div
                    className="flex flex-col items-center justify-between p-6 md:p-8 hover:bg-gray-50/50 transition-colors duration-300 min-h-[250px]"
                  >
                    {/* Battery Product Image */}
                    <div className="w-full flex-1 flex items-center justify-center mb-2">
                      <img
                        src={battery.image}
                        alt={battery.name}
                        className="max-h-[70dvh] w-auto object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    {/* Brand Logo Below Image */}
                    <div className="h-8 w-28 flex items-center justify-center mt-auto">
                      <img
                        src={battery.logo}
                        alt={`${battery.name} Logo`}
                        className="max-h-10 max-w-full object-contain"
                      />
                    </div>
                  </div>
                </Reveal>

              ))}
            </div>
          </div>
        )}
      </Fade>
    </section>
  );
};

export default Brands;
