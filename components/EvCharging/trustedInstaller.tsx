'use client';

import React from 'react';
import Image, { StaticImageData } from 'next/image';
import Fade from '@/reuseables/fade';
import Reveal from '@/reuseables/Reveal';

export interface InstallerBrand {
  name: string;
  logo: StaticImageData | string;
  title: string;
  description: string;
  specs?: string;
}

export interface TrustedInstallerData {
  subtitle: string;
  title: string;
  description: string;
  brands: InstallerBrand[];
}

interface TrustedInstallerProps {
  data: TrustedInstallerData;
}

const TrustedInstaller = ({ data }: TrustedInstallerProps) => {
  return (
    <Fade>
      <section className="py-16 md:py-24 bg-white">
        <div className="px-[5%] md:px-[3%]">
          {/* Header */}
          <div className="lg:text-center mb-12 md:mb-16 max-w-3xl mx-auto flex flex-col gap-2">
            <div className="leading-[1.1]">
              <h2 className="text-sm md:text-2xl font-normal text-black  tracking-tighter">
                {data.subtitle}
              </h2>
              <p className="text-[#63B846] font-light text-[2.5rem] md:text-[3.5rem] lg:text-[4.375rem] tracking-tighter">
                {data.title}
              </p>
            </div>
            <p className="text-xs md:text-sm leading-[1.2] font-normal">
              {data.description}
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
            {data.brands.map((brand, index) => {
              const colSpan = index % 4 === 0 || index % 4 === 3 ? 'lg:col-span-8' : 'lg:col-span-4';
              return (
                <Reveal key={index} delay={index * 0.1} className={colSpan}>
                  <div className="bg-[#EEF6EB] rounded-[24px] p-8 md:p-10 flex flex-col justify-between min-h-[340px] md:min-h-[380px] h-full hover:shadow-md transition-shadow duration-300">
                    {/* Top: Logo */}
                    <div className="relative w-[60%] h-[30%] mb-8">
                      <Image
                        src={brand.logo}
                        alt={`${brand.name} logo`}
                        fill
                        className="object-contain object-left"
                      />
                    </div>

                    {/* Bottom: Text Content */}
                    <div className="flex flex-col gap-2 mt-auto">
                      <h3 className="text-xl md:text-[1.90rem] font-medium text-black tracking-tight leading-snug">
                        {brand.title}
                      </h3>
                      <p className="text-sm md:text-lg text-black/70 max-w-2xl leading-[1.2]">
                        {brand.description}
                      </p>
                      {/* {brand.specs && (
                        <p className="text-xs md:text-sm font-semibold text-black/80 mt-2 tracking-wide">
                          {brand.specs}
                        </p>
                      )} */}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    </Fade>
  );
};

export default TrustedInstaller;