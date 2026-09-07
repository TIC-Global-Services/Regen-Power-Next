"use client";

import React, { useState, useCallback, useRef } from 'react';
import Fade from '@/reuseables/fade';
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

const RebateRows = ({ rows, }: { rows: RebateRow[] }) => (
  <>
    {rows.map((row, idx) => {
      // The last row grows to fill any height left over by the taller slide,
      // so the shorter slide doesn't show an empty gap at the bottom.
      const isLast = idx === rows.length - 1;
      return (
      <div
        key={idx}
        className={`grid grid-cols-12 items-center p-4 md:p-8 transition-colors duration-200 ${
          isLast ? 'grow' : ''
        } ${
          idx === 0
            ? "bg-white  border border-[#EBEBEB] "
            : "hover:bg-white/5 border-b border-[#FFFFFF33]"
        }`}
      >
        {/* Title (right-aligned) */}
        <div
          className={`col-span-4 text-right pr-6 md:pr-4 leading-none border-r flex flex-col justify-center h-full ${
            idx === 0 ? "border-[#EBEBEB]" : "border-[#EBEBEB]"
          }`}
        >
          <span
            className={`text-sm md:text-base lg:text-[1.875rem] leading-none whitespace-pre-line font-bold tracking-tight ${
              idx === 0 ? "text-[#63B846]" : "text-white/90"
            }`}
          >
            {row.title}
          </span>
        </div>

        {/* Description */}
        <div className="col-span-8 pl-6 md:pl-4 flex items-center">
          <p
            className={`text-xs md:text-sm lg:text-[1.375rem] leading-[1.2] ${
              idx === 0 ? "text-gray-800 font-medium" : "text-black"
            }`}
          >
            {row.description}
          </p>
        </div>
      </div>
      );
    })}
  </>
);

const BatteryRebates = ({ data }: { data: BatteryRebatesProps }) => {
  const { title, subtitle, bgImage, data: slides } = data;

  const [slideIndex, setSlideIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const transitionRef = useRef<NodeJS.Timeout | null>(null);

  const changeSlide = useCallback(
    (getNext: (prev: number) => number) => {
      if (isTransitioning) return;

      // Clear any lingering timeout
      if (transitionRef.current) clearTimeout(transitionRef.current);

      // Phase 1 — fade out
      setIsTransitioning(true);

      transitionRef.current = setTimeout(() => {
        // Phase 2 — swap data while invisible
        setSlideIndex((prev) => getNext(prev));

        // Phase 3 — small delay then fade in
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setIsTransitioning(false);
            transitionRef.current = null;
          });
        });
      }, 300); // matches the CSS transition duration
    },
    [isTransitioning]
  );

  const handlePrev = () => {
    changeSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    changeSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="relative w-full py-20 md:py-20 px-[5%] md:px-[3%] overflow-hidden min-h-screen flex items-start bg-black">
      {/* Background Image */}
      <img
        src={bgImage || "/promotion-page/battery_rebates_fallback.png"}
        alt="Battery Rebates Background"
        className="absolute inset-0 z-0 h-full w-full object-cover object-center"
      />

      <Fade>
        <div className="relative z-10  w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0 items-start">

            {/* Left: Subtitle, Title, Nav */}
            <div className="lg:col-span-6 flex flex-col justify-center mt-10">
              <div className="">
                <span className="inline-block text-black text-xl md:text-[3.125rem] font-bold  tracking-tight">
                  {subtitle}
                </span>
                <h2 className="text-4xl md:text-5xl lg:text-[3.125rem] font-bold text-white tracking-tight leading-none whitespace-pre-line">
                  {title}
                </h2>
              </div>

              {/* Arrow buttons + slide indicator */}
              <div className="flex items-center gap-2 mt-5">
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

            {/* Right: Table (all slides stacked in one grid cell so the height stays fixed) */}
            <div className="lg:col-span-6 w-full">
              {/* Pagination indicator */}
              <div className="flex items-center justify-center gap-2 mb-6">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => changeSlide(() => idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                    aria-current={idx === slideIndex}
                    className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                      idx === slideIndex
                        ? 'w-8 bg-white'
                        : 'w-2.5 bg-white/40 hover:bg-white/70'
                    }`}
                  />
                ))}
              </div>

              <div className="border border-white/15  overflow-hidden bg-white/10 backdrop-blur-md ">
                <div className="grid">
                  {slides.map((rows, slideIdx) => (
                    <div
                      key={slideIdx}
                      aria-hidden={slideIdx !== slideIndex}
                      className={`col-start-1 row-start-1 flex flex-col space-y-1 transition-opacity duration-300 ease-in-out ${
                        slideIdx === slideIndex
                          ? isTransitioning
                            ? 'opacity-0'
                            : 'opacity-100'
                          : 'opacity-0 pointer-events-none'
                      }`}
                    >
                      <RebateRows rows={rows} />
                    </div>
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

export default BatteryRebates;
