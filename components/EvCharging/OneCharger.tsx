'use client';

import React, { useRef, useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import Fade from '@/reuseables/fade';

import 'swiper/css';

export interface ChargerProduct {
  name: string;
  image: StaticImageData | string;
  description: string;
}

export interface OneChargerData {
  subtitle: string;
  title: string;
  products: ChargerProduct[];
}

interface OneChargerProps {
  data: OneChargerData;
}

const OneCharger = ({ data }: OneChargerProps) => {
  const swiperRef = useRef<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  return (
    <Fade>
      <section className="py-16 md:py-24 bg-white overflow-hidden">
        <div className="pl-[5%] pr-[5%] lg:pr-0">
          {/* Header */}
          <div className="text-center mb-12 md:mb-16 pr-[5%]">
            <h2 className="text-xl md:text-[2rem] font-medium text-black tracking-tight mb-1">
              {data.subtitle}
            </h2>
            <p className="text-[#63B846] font-light text-[2.5rem] md:text-[3.5rem] lg:text-[5rem] tracking-tighter leading-none">
              {data.title}
            </p>
          </div>

          {/* Carousel Slider */}
          <div className="relative w-full mb-16">
            <Swiper
              onBeforeInit={(swiper) => {
                swiperRef.current = swiper;
              }}
              onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
              spaceBetween={24}
              slidesPerView={1.05}
              breakpoints={{
                1024: {
                  slidesPerView: 1.25,
                  spaceBetween: 56,
                },
              }}
              className="w-full !overflow-visible"
            >
              {data.products.map((product, index) => (
                <SwiperSlide key={index} className="transition-opacity duration-300">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                     {/* Left: Image */}
                    <div className="relative w-full aspect-[14/10] rounded-[20px] overflow-hidden bg-[#F7F7F5]">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        priority={index === 0}
                      />
                    </div>

                    {/* Right: Content */}
                    <div className="flex flex-col gap-4 pr-[5%] lg:pr-[15%]">
                      <h3 className="text-3xl md:text-[2rem] font-medium text-black tracking-tight leading-tight">
                        {product.name}
                      </h3>
                      <p className="text-sm tracking-tight text-black leading-[1.2] font-normal">
                        {product.description}
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Navigation Buttons (Desktop & Tablet) */}
            <div className="flex items-center gap-3 mt-8">
              <button
                onClick={handlePrev}
                disabled={activeIndex === 0}
                className={`w-12 h-12 rounded-full bg-black text-white flex items-center justify-center transition-all duration-300 ${
                  activeIndex === 0
                    ? 'opacity-30 cursor-not-allowed'
                    : 'hover:bg-black/80 hover:scale-105 active:scale-95'
                }`}
                aria-label="Previous slide"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="19" y1="12" x2="5" y2="12"></line>
                  <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
              </button>
              <button
                onClick={handleNext}
                disabled={activeIndex === data.products.length - 1}
                className={`w-12 h-12 rounded-full bg-black text-white flex items-center justify-center transition-all duration-300 ${
                  activeIndex === data.products.length - 1
                    ? 'opacity-30 cursor-not-allowed'
                    : 'hover:bg-black/80 hover:scale-105 active:scale-95'
                }`}
                aria-label="Next slide"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>
    </Fade>
  );
};

export default OneCharger;
