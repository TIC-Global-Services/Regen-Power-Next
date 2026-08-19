import React from 'react';
import Image, { StaticImageData } from 'next/image';
import CtaButton from '@/reuseables/CtaButton';

export interface BrandSpecification {
  title: string;
  description: string;
}

export interface BatteryBrandCard {
  title: string;
  logo?: StaticImageData | string;
  specification: BrandSpecification[];
  showbutton: boolean;
  buttonText: string;
  buttonLink: string;
}

export interface BatteryBrandsGridData {
  topSubtitle: string;
  title: string;
  subtitle: string;
  brands: BatteryBrandCard[];
}

const BatteryBrandsGrid = ({ data }: { data: BatteryBrandsGridData }) => {
  return (
    <section className="bg-white py-16 md:py-24 px-[5%] md:px-[3%] min-h-screen">
      <div className="">
        <div className="text-left md:text-center mb-10 capitalize">
          <h3 className="text-xl md:text-[2rem] text-black font-normal tracking-tight ">
            {data.topSubtitle}
          </h3>
          <h2 className="text-[2.5rem] md:text-5xl lg:text-[5rem] text-[#63B846] font-normal tracking-tight">
            {data.title}
          </h2>
          <p className="text-base md:text-xl text-black tracking-tight leading-[1] max-w-4xl mx-auto font-medium">
            {data.subtitle}
          </p>
        </div>

        {/* Mobile: Horizontal Slider */}
        <div className="flex overflow-x-auto md:hidden gap-4 -mx-[5%] px-[5%] md:px-[3%] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pb-4">
          {data.brands.map((brand, idx) => {
            return (
              <div
                key={idx}
                className={`bg-[#EEF6EB] rounded-[20px] p-8 flex-col items-start w-[80vw] shrink-0 snap-start flex`}
              >
                {brand.logo && (
                  <div className="relative h-14 w-40 mb-6">
                    <Image
                      src={brand.logo}
                      alt={brand.title}
                      fill
                      className="object-contain object-left"
                    />
                  </div>
                )}

                <h4 className="text-2xl text-black font-normal mb-8 leading-tight tracking-tight">
                  {brand.title}
                </h4>

                <div className="flex flex-col gap-6 mb-8 flex-1">
                  {brand.specification.map((spec, sIdx) => (
                    <div key={sIdx}>
                      <p className="text-black text-sm leading-[1.2]">
                        <span className="font-bold">{spec.title} </span>
                        {spec.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Desktop: Grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-6 md:gap-8">
          {data.brands.map((brand, idx) => {
            return (
              <div
                key={idx}
                className="bg-[#EEF6EB] rounded-[20px] p-8 md:p-10 flex-col items-start flex"
              >
                {brand.logo && (
                  <div className="relative h-14 w-40 mb-6">
                    <Image
                      src={brand.logo}
                      alt={brand.title}
                      fill
                      className="object-contain object-left"
                    />
                  </div>
                )}

                <h4 className="text-2xl md:text-[1.75rem] text-black font-normal mb-8 leading-tight tracking-tight">
                  {brand.title}
                </h4>

                <div className="flex flex-col gap-6 mb-8 flex-1">
                  {brand.specification.map((spec, sIdx) => (
                    <div key={sIdx}>
                      <p className="text-black text-sm md:text-base leading-tight tracking-tight ">
                        <span className="font-bold">{spec.title} </span>
                        {spec.description}
                      </p>
                    </div>
                  ))}
                </div>

                {brand.showbutton && (
                  <div className="mt-auto">
                    <CtaButton
                      href={brand.buttonLink}
                      text={brand.buttonText}
                      textColor="text-black"
                      bgClass="bg-[#63B846]/40 hover:bg-[#63B846]/60 transition-colors"
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BatteryBrandsGrid;
