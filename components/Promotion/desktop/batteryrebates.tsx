"use client";

import React, { useState } from 'react';
import Fade from '@/reuseables/fade';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface RebateRow {
  title: string;
  description: string;
}

export interface BatteryRebatesProps {
  title: string;
  subtitle: string;
  bgImage?: string;
  data: RebateRow[][];  // array of slides — each slide is a full table
}

const BatteryRebates = ({ data }: { data: BatteryRebatesProps }) => {
  const { title, subtitle, bgImage, data: slides } = data;

  const [slideIndex, setSlideIndex] = useState(0);

  const handlePrev = () => {
    setSlideIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSlideIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const currentRows = slides[slideIndex] ?? [];

  return (
    <section className="relative w-full py-20 md:py-10 px-[5%] overflow-hidden min-h-screen flex items-start bg-black">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={bgImage || "/fallback"}
          alt="Battery Rebates Background"
          fill
          className="object-cover object-center brightness-75"
          priority
        />
        <div className="absolute inset-0 bg-[#071E07]/45 backdrop-blur-[1px]" />
      </div>

      <Fade>
        <div className="relative z-10  w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

            {/* Left: Subtitle, Title, Nav */}
            <div className="lg:col-span-6 flex flex-col justify-center ">
              <div className="">
                <span className="inline-block text-black text-xl md:text-[3.125rem] font-bold  tracking-tight">
                  {subtitle}
                </span>
                <h2 className="text-4xl md:text-5xl lg:text-[3.125rem] font-bold text-white tracking-tight leading-none max-w-xl">
                  {title}
                </h2>
              </div>

              {/* Arrow buttons + slide indicator */}
              <div className="flex items-center gap-4 mt-5">
                <button
                  onClick={handlePrev}
                  className="w-12 h-12 rounded-full bg-[#FFFFFF66] hover:bg-white text-gray-800 flex items-center justify-center transition-all duration-300 shadow-md cursor-pointer"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNext}
                  className="w-12 h-12 rounded-full bg-[#FFFFFF66] hover:bg-white text-gray-800 flex items-center justify-center transition-all duration-300 shadow-md cursor-pointer"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Right: Table (entire content swaps per slide) */}
            <div className="lg:col-span-6 w-full">
              <div className="border border-white/15  overflow-hidden bg-white/10 backdrop-blur-md">
                <div
                  key={slideIndex}
                  className="flex flex-col space-y-1 animate-[fadeSlide_0.35s_ease-out]"
                >
                  {currentRows.map((row, idx) => (
                    <div
                      key={idx}
                      className={`grid grid-cols-12 items-center p-4 md:p-5  transition-colors duration-200 ${
                        idx === 0
                          ? "bg-white shadow-md border border-[#EBEBEB] "
                          : "hover:bg-white/5 border-b-[#EBEBEB]"
                      }`}
                    >
                      {/* Title (right-aligned) */}
                      <div className={`col-span-4 text-right pr-6 md:pr-10 leading-none  border-r flex flex-col justify-center h-full ${
                        idx === 0 ? "border-[#EBEBEB]" : "border-[#EBEBEB]"
                      }`}>
                        <span className={`text-sm md:text-base lg:text-[1.875rem] leading-none font-bold tracking-tight ${
                          idx === 0 ? "text-[#63B846]" : "text-white/90"
                        }`}>
                          {row.title}
                        </span>
                      </div>

                      {/* Description */}
                      <div className="col-span-8 pl-6 md:pl-8 flex items-center">
                        <p className={`text-xs md:text-sm lg:text-[1.375rem] leading-none ${
                          idx === 0 ? "text-gray-800 font-medium" : "text-white/80"
                        }`}>
                          {row.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </Fade>

      {/* Inline keyframe for the slide-in animation */}
      <style jsx>{`
        @keyframes fadeSlide {
          0%   { opacity: 0; transform: translateX(30px); }
          100% { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </section>
  );
};

export default BatteryRebates;
