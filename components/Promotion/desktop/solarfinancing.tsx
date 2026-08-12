'use client';

import React, { useState } from 'react';
import Fade from '@/reuseables/fade';
import * as Icons from 'lucide-react';

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
    title = "Solar Financing Solution",
    subtitle = "Up To $10K Loan For 10 Years With No Interest Through WA Rebate Scheme",
    leftBoxText = "Up to $10,000 interest-free loan available, repayable over 10 years to help cover the cost of a solar battery system.",
    leftBoxTitle = "Interest-Free Loan",
    leftBoxIcon = "CircleDollarSign",
    gridItems = [],
    bgImage
  } = data || {};

  // Track the currently hovered card index in the grid.
  // Index 0 (first card/leftBoxText) is hovered by default.
  const [hoveredIndex, setHoveredIndex] = useState<number>(0);

  // Split title: "Solar Financing Solution" -> "Solar Financing" and "Solution"
  const solutionIndex = title.toLowerCase().indexOf("solution");
  let mainTitle = title;
  let subTitleText = "";
  if (solutionIndex !== -1) {
    mainTitle = title.substring(0, solutionIndex).trim();
    subTitleText = title.substring(solutionIndex).trim();
  }

  // Helper to resolve Lucide icons dynamically from string names
  const renderIcon = (iconName: string, isHovered: boolean) => {
    const IconComponent = (Icons as any)[iconName] || Icons.HelpCircle;
    return (
      <IconComponent 
        className={`w-20 h-20 transition-all duration-300 ${
          isHovered ? "text-[#63B846] scale-110" : "text-white"
        }`} 
        strokeWidth={1.5}
      />
    );
  };

  // Combine the left box card and the rest of the items into a single array for rendering
  const cards = [
    {
      title: leftBoxTitle,
      description: leftBoxText,
      icon: leftBoxIcon
    },
    ...gridItems
  ];

  return (
    <section className="relative w-full py-20 md:py-28 px-[5%] overflow-hidden min-h-screen flex justify-center items-center bg-black">
      {/* Background Image with dark overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={bgImage || "/solar_house_render.png"}
          alt="Solar Financing Background"
          className="w-full h-full object-cover object-center brightness-50"
        />
        <div className="absolute inset-0 bg-[#071E07]/45 backdrop-blur-[1px]" />
      </div>

      <Fade>
        <div className="relative z-10 max-w-7xl mx-auto w-full">
          {/* Centered Header */}
          <div className="text-center max-w-6xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-[4.375rem] font-extrabold text-[#63B846] tracking-tight leading-none mb-2">
              {mainTitle} <span className="text-[#63B846]">{subTitleText}</span>
            </h2>
            <p className="text-lg md:text-4xl text-white/95 font-semibold tracking-tight leading-none max-w-5xl mx-auto">
              {subtitle}
            </p>
          </div>

          {/* Grid Layout (3 Columns, 2 Rows) */}
          <div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6  items-stretch"
            onMouseLeave={() => setHoveredIndex(0)} // Reset to first card on mouse leave
          >
            {cards.map((item, idx) => {
              const isHovered = hoveredIndex === idx;

              return (
                <div
                  key={idx}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  className={`rounded-[12px] p-8 flex flex-col items-center justify-center text-center transition-all duration-300 min-h-[220px] cursor-pointer shadow-xl ${
                    isHovered
                      ? "bg-white/95 border border-white/20 text-black transform scale-[1.02]"
                      : "bg-white/10 hover:bg-white/15 border border-white/10 text-white backdrop-blur-md"
                  }`}
                >
                  {isHovered ? (
                    /* Hovered State: Title and Description */
                    <div className="space-y-3 animate-[fadeIn_0.3s_ease-out]">
                      
                      <p className="text-xs md:text-2xl text-gray-700 leading-none font-medium">
                        {item.description}
                      </p>
                    </div>
                  ) : (
                    /* Default State: Centered Icon only */
                    <div className="flex items-center justify-center h-full">
                      {renderIcon(item.icon, false)}
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
