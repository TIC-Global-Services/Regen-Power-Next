"use client";
import React, { useState } from 'react';

export interface InstallBentoBlock {
  title: string;
  description: string;
}

export interface SmartInstallBentoData {
  title: string;
  description: string;
  blocks: InstallBentoBlock[]; // Expected to be 5 blocks
}

const SmartInstallBento = ({ data }: { data: SmartInstallBentoData }) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section className="py-16 md:py-24 pl-[5%] md:px-[5%] md:px-[3%] overflow-hidden">
      <div className="capitalize">
        {/* Mobile Title Block (Above Slider) */}
        <div className="block md:hidden mb-8 pr-[5%]">
          <h2 className="text-[2.5rem] md:text-5xl text-[#63B846] font-normal leading-[1.05] tracking-tight mb-4">
            {data.title}
          </h2>
          <p className="text-black text-base md:text-lg leading-[1.2] font-medium tracking-tight">
            {data.description}
          </p>
        </div>

        {/* Grid / Slider Container */}
        <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-4 overflow-x-auto md:overflow-x-visible snap-x snap-mandatory md:snap-none pb-6 md:pb-0 pr-[5%] md:pr-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {/* Desktop Title Block (Inside Grid) */}
          <div className="hidden md:flex p-6 md:p-2 flex-col justify-end">
            <h2 className="text-4xl md:text-5xl lg:text-[3.125rem] text-[#63B846] font-normal leading-[1] tracking-tight mb-4">
              {data.title}
            </h2>
            <p className="text-black text-base md:text-lg lg:text-2xl leading-[1.2] font-medium tracking-tight">
              {data.description}
            </p>
          </div>

          {/* Map through the 5 bento blocks */}
          {data.blocks.map((block, idx) => {
            const isHovered = hoveredIdx === idx;

            return (
              <div
                key={idx}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className={`snap-start shrink-0 w-[75vw] md:w-auto rounded-[14px] p-6 md:p-8 lg:p-10 flex flex-col justify-end transition-colors duration-300 cursor-default h-[260px] lg:h-[300px] ${isHovered
                  ? 'bg-[#3D3A35] text-white'
                  : 'bg-[#EBEBEB] text-black'
                  }`}
              >
                <h4 className={`text-xl md:text-2xl font-normal mb-3 md:mb-4 leading-tight tracking-tight transition-colors duration-300 ${isHovered ? 'text-white' : 'text-black'
                  }`}>
                  {block.title}
                </h4>
                <p className={`text-sm md:text-base font-normal tracking-tight leading-[1.2] transition-colors duration-300 ${isHovered ? 'text-white/70' : 'text-[#888888]'
                  }`}>
                  {block.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SmartInstallBento;
