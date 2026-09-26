'use client';

import React, { useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';

import Marquee from '@/reuseables/Marquee';

export interface AwardLogoItem {
  src: StaticImageData | string;
  alt: string;
  /** Logo box size in px; the image is fit inside it (object-contain). */
  width?: number;
  height?: number;
}

const DEFAULT_LOGO_WIDTH = 160;
const DEFAULT_LOGO_HEIGHT = 80;
/** Mobile shows logos larger than the desktop marquee — same box, scaled up. */
const MOBILE_LOGO_SCALE = 1.5;

export interface AwardAndRecognationsData {
  title: string;
  logos: AwardLogoItem[];
}

interface AwardAndRecognationsProps {
  data: AwardAndRecognationsData;
}

const AwardAndRecognations = ({ data }: AwardAndRecognationsProps) => {
  const [activeRealIndex, setActiveRealIndex] = useState(0);

  return (
    <section className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 mb-16 text-center">
        <h2 className="text-2xl md:text-3xl font-medium text-black">{data.title}</h2>
      </div>

      <div className="lg:px-[5%] md:px-[3%]">
        {/* Desktop View - Marquee */}
        <div className="hidden md:block w-full">
          <Marquee speed={25} gap={80} pauseOnHover={false}>
            {data.logos.map((logo, index) => (
              <div
                key={index}
                className="flex items-center justify-center h-44 w-60 shrink-0"
              >
                <div
                  className="relative"
                  style={{
                    width: logo.width ?? DEFAULT_LOGO_WIDTH,
                    height: logo.height ?? DEFAULT_LOGO_HEIGHT,
                  }}
                >
                  <Image src={logo.src} alt={logo.alt} fill className="object-contain" />
                </div>
              </div>
            ))}
          </Marquee>
        </div>

        {/* Mobile View - Swiper. Under 480px one logo is shown at a time (large, never cut by the
            viewport edge); from 480px the centered logo is enlarged with its neighbours fully visible. */}
        <div className="md:hidden w-full relative">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={16}
            slidesPerView={1}
            breakpoints={{
              480: { slidesPerView: 3 },
            }}
            centeredSlides={true}
            loop={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            onSlideChange={(swiper: SwiperType) => setActiveRealIndex(swiper.realIndex)}
            className="awards-swiper py-8"
          >
            {data.logos.map((logo, index) => {
              const isActive = index === activeRealIndex;
              return (
                <SwiperSlide key={index} className="flex justify-center items-center">
                  <div
                    style={{
                      width: `min(${(logo.width ?? DEFAULT_LOGO_WIDTH) * MOBILE_LOGO_SCALE}px, 100%)`,
                      height: (logo.height ?? DEFAULT_LOGO_HEIGHT) * MOBILE_LOGO_SCALE,
                    }}
                    className={`relative mx-auto transition-all duration-700 ease-in-out ${
                      isActive
                        ? 'min-[480px]:scale-[1.4] min-[480px]:z-10'
                        : 'min-[480px]:scale-90 min-[480px]:opacity-60 min-[480px]:grayscale'
                    }`}
                  >
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      fill
                      sizes="(max-width: 480px) 90vw, 33vw"
                      className="object-contain"
                    />
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>

      {/* Dashed line at the bottom as shown in the design */}
      {/* <div className="container mx-auto px-[5%] md:px-[3%] mt-16 max-w-7xl">
        <div className="border-b-[1px] border-dashed border-[#8dc63f] w-full opacity-60" />
      </div> */}
    </section>
  );
};

export default AwardAndRecognations;