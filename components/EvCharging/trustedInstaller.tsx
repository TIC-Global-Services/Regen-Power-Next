'use client';

import React from 'react';
import Image, { StaticImageData } from 'next/image';
import Fade from '@/reuseables/fade';
import CtaButton from '@/reuseables/CtaButton';
import { SliderDots, SliderArrows, useSnapSlider } from '@/reuseables/MobileSliderControls';

export interface InstallerBrand {
  name: string;
  logo: StaticImageData | string;
  title: string;
  description: string;
  specs: string[];
  ctaText?: string;
  ctaLink?: string;
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
  const { trackRef, sync, active, canPrev, canNext, goTo, next, prev } = useSnapSlider(data.brands.length);

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

          {/* Carousel — one brand card at a time, all breakpoints */}
          <div
            ref={trackRef}
            onScroll={sync}
            className="flex overflow-x-auto snap-x snap-mandatory gap-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            {data.brands.map((brand, index) => {
              const specs = brand.specs;
              return (
                <div
                  key={index}
                  className="relative snap-start shrink-0 w-full bg-[#EEF6EB] rounded-[24px] md:rounded-[32px] p-8 md:p-12 lg:p-16 overflow-hidden"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-16">
                    {/* Logo */}
                    <div className="relative w-full max-w-[320px]  h-70 mx-auto lg:mx-0 shrink-0">
                      <Image
                        src={brand.logo}
                        alt={`${brand.name} logo`}
                        fill
                        className="object-contain object-center lg:object-left"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex flex-col gap-4 text-left flex-1">
                      <h3 className="text-2xl md:text-4xl font-medium text-black tracking-tight leading-tight">
                        {brand.title}
                      </h3>
                      <p className="text-sm md:text-lg text-black leading-[1.3] tracking-tight max-w-3xl">
                        {brand.description}
                      </p>
                      {specs.length > 0 && (
                        <ul className="flex flex-col gap-1.5 mt-1">
                          {specs.map((spec, specIndex) => (
                            <li
                              key={specIndex}
                              className="text-sm md:text-lg font-bold text-black tracking-tight leading-[1.2] list-disc list-inside marker:text-[#63B846]"
                            >
                              {spec}
                            </li>
                          ))}
                        </ul>
                      )}
                      {brand.ctaText && (
                        <CtaButton
                          text={brand.ctaText}
                          href={brand.ctaLink}
                          bgClass="bg-[#63B846]/55 backdrop-blur-md"
                          className="capitalize mt-2 self-start"
                        />
                      )}
                    </div>
                  </div>

                  {/* Prev/next controls */}
                  {data.brands.length > 1 && (
                    <SliderArrows
                      canPrev={canPrev}
                      canNext={canNext}
                      onPrev={prev}
                      onNext={next}
                      className="mt-8 lg:mt-0 lg:absolute lg:bottom-8 lg:right-8"
                    />
                  )}
                </div>
              );
            })}
          </div>

          <SliderDots count={data.brands.length} active={active} onSelect={goTo} className="mt-6" />
        </div>
      </section>
    </Fade>
  );
};

export default TrustedInstaller;
