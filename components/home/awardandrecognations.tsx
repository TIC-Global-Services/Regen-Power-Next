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
}

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

      <div className="lg:px-[3%]">
        {/* Desktop View - Marquee */}
        <div className="hidden md:block w-full">
          <Marquee speed={25} gap={80} pauseOnHover={false}>
            {data.logos.map((logo, index) => (
              <div
                key={index}
                className="flex items-center justify-center h-44 w-60 shrink-0"
              >
                <div
                  className={`relative ${index === 2 ? 'h-44 w-40' : index === 3 ? 'h-20 w-48' : 'h-20 w-40'
                    }`}
                >
                  <Image src={logo.src} alt={logo.alt} fill className="object-contain" />
                </div>
              </div>
            ))}
          </Marquee>
        </div>

        {/* Mobile View - Swiper Marquee */}
        <div className="md:hidden w-full relative">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={30}
            slidesPerView={2}
            breakpoints={{
              480: { slidesPerView: 3 },
            }}
            centeredSlides={true}
            loop={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            onSlideChange={(swiper: SwiperType) => {
              setActiveRealIndex(swiper.realIndex);
            }}
            className="awards-swiper py-8"
          >
            {data.logos.map((logo, index) => {
              const isActive = index === activeRealIndex;
              return (
                <SwiperSlide key={index} className="flex justify-center items-center">
                  <div
                    className={`relative w-full h-24 transition-all duration-700 ease-in-out flex justify-center items-center ${isActive ? 'scale-125 opacity-100 z-10' : 'scale-90 opacity-60 grayscale'
                      }`}
                  >
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      fill
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
      {/* <div className="container mx-auto px-[3%] mt-16 max-w-7xl">
        <div className="border-b-[1px] border-dashed border-[#8dc63f] w-full opacity-60" />
      </div> */}
    </section>
  );
};

export default AwardAndRecognations;