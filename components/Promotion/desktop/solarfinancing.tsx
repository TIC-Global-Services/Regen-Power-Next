'use client';

import React, { useState } from 'react';
import Fade from '@/reuseables/fade';

export interface FinancingGridItem {
  title: string;
  description: string;
  icon: string;
}

export interface SolarFinancingProps {
  title: string;
  subtitle: string;
  leftBoxText: string;
  leftBoxTitle?: string;
  leftBoxIcon?: string;
  gridItems: FinancingGridItem[];
  bgImage?: string;
}

const SolarFinancing = ({ data }: { data: SolarFinancingProps }) => {
  const {
    title = 'Solar Financing Solution',
    subtitle = '',
    gridItems = [],
    bgImage,
  } = data || {};

  // Only the first item is hovered by index, with no separate default state logic.
  const [hoveredIndex, setHoveredIndex] = useState<number>(0);
  const cards = gridItems;

  return (
    <section className="relative w-full py-20 md:py-28 px-[5%] overflow-hidden min-h-screen flex justify-center items-center bg-black">
      {/* Background Image with dark overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={bgImage || "/solar_finance_bg_fallback.png"}
          alt="Solar Financing Background"
          className="w-full h-full object-cover object-center brightness-50"
        />
        <div className="absolute inset-0 bg-[#071E07]/45 backdrop-blur-[1px]" />
      </div>

      <Fade>
        <div className="relative z-10  w-full">
          {/* Centered Header */}
          <div className="text-center max-w-6xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-[4.375rem] font-bold text-[#63B846] tracking-tight leading-none mb-4">
              <span className="text-[#63B846]">{title}</span>
            </h2>
            <p className="text-lg md:text-4xl text-white/95 font-semibold tracking-tight leading-[1.2] whitespace-pre-line max-w-5xl mx-auto">
              {subtitle}
            </p>
          </div>

          {/* Grid Layout (3 Columns, 2 Rows) */}
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch"
            onMouseLeave={() => setHoveredIndex(0)}
          >
            {cards.map((item, idx) => {
              const isHovered = hoveredIndex === idx;

              return (
                <div
                  key={idx}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  className={`rounded-[12px] p-8 flex flex-col items-center justify-center text-center transition-all duration-300 min-h-[220px] cursor-pointer shadow-xl ${
                    isHovered
                      ? "bg-white border border-white/20 text-black transform scale-[1.02]"
                      : "bg-[#FFFFFF4D] hover:bg-white/15 border border-white/10 text-white backdrop-blur-md"
                  }`}
                >
                  {isHovered ? (
                    /* Hovered State: Title and Description */
                    <div className="space-y-3 animate-[fadeIn_0.3s_ease-out]">
                      
                      <p className="text-xs md:text-[1.625rem]  leading-none tracking-tight font-medium">
                        {item.description}
                      </p>
                    </div>
                  ) : (
                    /* Default State: Centered Icon only */
                    <div className="flex items-center justify-center h-full">
                      <img src={item.icon}  className="object-contain h-full w-full" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </Fade>

      {/* Inline styles for simple animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </section>
  );
};

export default SolarFinancing;
