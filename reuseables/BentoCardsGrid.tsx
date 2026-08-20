"use client";
import React, { useState } from "react";

// ─── Types ──────────────────────────────────────────────────────────────

export interface BentoCard {
  id?: string | number;
  title: string;
  description: string;
}

export interface BentoCardsData {
  topSubtitle?: string;
  title?: string;
  description?: string;
  cards: BentoCard[];
}

export interface BentoCardsGridProps {
  data: BentoCardsData;
  /**
   * Grid columns the header tile should span (lg grid has 3 columns).
   * 1 = SmartInstallBento style (header is a single cell).
   * 2 = HowYouUseIt / CECApproved style (header takes 2 of 3 columns).
   */
  headerColSpan?: 1 | 2;
}

// ─── Component ─────────────────────────────────────────────────────────
// Merged reusable "bento" section.
// Layout: horizontal snap slider below lg (phones + iPad portrait), grid at
// lg+ (desktop). The header tile is the first grid cell and spans 1 column
// by default (SmartInstallBento style). With headerColSpan={2} it spans 2
// columns on desktop (HowYouUseIt / CECApproved style). On iPad the full-width
// header sits above the slider instead. The header content is vertically centered.
// Hover toggles each card between light gray and dark (JS state).

const BentoCardsGrid = ({ data, headerColSpan = 1 }: BentoCardsGridProps) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  if (!data || data.cards.length === 0) return null;

  const hasHeader = Boolean(data.topSubtitle || data.title || data.description);

  return (
    <section className="w-full px-[5%] md:px-[3%] py-16 md:py-24 bg-white overflow-hidden">
      {/* Mobile Header (Above Slider) */}
      {hasHeader && (
        <div className="lg:hidden mb-8">
          {data.topSubtitle && (
            <p className="text-xl md:text-2xl text-black font-normal mb-1">
              {data.topSubtitle}
            </p>
          )}
          {data.title && (
            <h2 className="text-[2.5rem] md:text-5xl text-[#63B846] font-normal leading-[1.05] tracking-tight mb-4">
              {data.title}
            </h2>
          )}
          {data.description && (
            <p className="text-black text-base md:text-lg leading-[1.2] font-medium tracking-tight">
              {data.description}
            </p>
          )}
        </div>
      )}

      {/* Slider (phones + iPad) / Grid (desktop) */}
      <div className="flex lg:grid lg:grid-cols-3 gap-4 overflow-x-auto lg:overflow-x-visible -mx-[5%] px-[5%] md:-mx-[3%] md:px-[3%] pb-6 lg:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {/* Title Block as First Grid Cell (iPad + Desktop) */}
        {hasHeader && (
          <div className={`hidden lg:flex p-6 lg:p-2 flex-col justify-center ${headerColSpan === 2 ? "lg:col-span-2" : ""}`}>
            {data.topSubtitle && (
              <p className="text-xl md:text-2xl text-black font-normal mb-1">
                {data.topSubtitle}
              </p>
            )}
            {data.title && (
              <h2 className="text-4xl md:text-5xl lg:text-[3.125rem] text-[#63B846] font-normal leading-[1] tracking-tight mb-4">
                {data.title}
              </h2>
            )}
            {data.description && (
              <p className="text-black text-base md:text-lg lg:text-2xl leading-[1.2] font-medium tracking-tight">
                {data.description}
              </p>
            )}
          </div>
        )}

        {/* Cards */}
        {data.cards.map((card, idx) => {
          const isHovered = hoveredIdx === idx;

          return (
            <div
              key={card.id ?? idx}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              className={`snap-start shrink-0 w-[75vw] md:w-[45vw] lg:w-auto rounded-[14px] p-6 md:p-8 lg:p-10 flex flex-col justify-end transition-colors duration-300 cursor-default h-[260px] lg:h-[300px] ${
                isHovered ? "bg-[#3D3A35] text-white" : "bg-[#EBEBEB] text-black"
              }`}
            >
              <h4 className={`text-xl md:text-2xl font-normal mb-3 md:mb-4 leading-tight tracking-tight transition-colors duration-300 ${
                isHovered ? "text-white" : "text-black"
              }`}>
                {card.title}
              </h4>
              <p className={`text-sm md:text-base font-normal tracking-tight leading-[1.2] transition-colors duration-300 ${
                isHovered ? "text-white/70" : "text-[#888888]"
              }`}>
                {card.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default BentoCardsGrid;