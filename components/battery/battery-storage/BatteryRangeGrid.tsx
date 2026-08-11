import React from 'react';
import Image, { StaticImageData } from 'next/image';
import CtaButton from '@/reuseables/CtaButton';

export interface BatteryRangeCard {
  title: string;
  description?: string;
  image?: StaticImageData | string;
  ctaText?: string;
  ctaLink?: string;
  isTextOnly?: boolean;
}

export interface BatteryRangeGridData {
  topSubtitle: string;
  title: string;
  description?: string;
  batteries: BatteryRangeCard[];
}

/**
 * Bento-style grid for the Battery Range section.
 * 
 * Expects exactly 5 cards in `batteries`:
 *   [0] top-left   [1] top-center (text-only)   [2] top-right
 *   [3] bottom-left                              [4] bottom-right
 *
 * The center card (index 1) renders as a text-only tile.
 * All others render with an image background + dark gradient overlay.
 */
const BatteryRangeGrid = ({ data }: { data: BatteryRangeGridData }) => {
  return (
    <section className="bg-white py-16 md:py-24 px-[5%]">
      {/* Section Header */}
      <div className="text-left md:text-center mb-10 md:mb-14">
        <h3 className="text-2xl md:text-[2.125rem] text-black font-normal tracking-tight leading-[1] ">
          {data.topSubtitle}
        </h3>
        <h2 className="text-[2.5rem] md:text-6xl lg:text-[5rem] text-[#63B846] font-light leading-[1] tracking-tighter ">
          {data.title}
        </h2>
        
      </div>

      {/* Mobile: Horizontal Slider */}
      <div className="flex overflow-x-auto md:hidden gap-4 -mx-[5%] px-[5%] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pb-4">
        {data.batteries.map((card, idx) => {
          return (
            <div
              key={idx}
              className="w-[75vw] shrink-0 snap-start h-[400px]"
            >
              <ImageCard card={card} />
            </div>
          );
        })}
      </div>

      {/* Desktop: Bento Grid converted to Flex to center bottom row */}
      <div className="hidden md:flex flex-wrap justify-center gap-4 md:gap-5">
        {data.batteries.map((card, idx) => {
          return (
            <div
              key={idx}
              className="w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.85rem)] h-[280px] md:h-[500px]"
            >
              <ImageCard card={card} />
            </div>
          );
        })}
      </div>
    </section>
  );
};

/* ── Sub-components ─────────────────────────────────────── */

const ImageCard = ({ card }: { card: BatteryRangeCard }) => (
  <div className="relative rounded-[20px] overflow-hidden group cursor-pointer h-full w-full">
    {/* Background image */}
    {card.image && (
      <Image
        src={card.image}
        alt={card.title}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105 x"
      // sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />
    )}

    {/* Dark gradient overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-opacity duration-500" />

    {/* Text content pinned to the bottom */}
    <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-7">
      <h4 className="text-white text-xl md:text-[1.875rem] font-medium tracking-tight leading-[1.2] mb-2">
        {card.title}
      </h4>
      <p className="text-white text-base md:text-lg tracking-tight leading-[1.2] line-clamp-3 capitalize mb-4">
        {card.description}
      </p>
      {card.ctaText && card.ctaLink && (
        <div>
          <CtaButton
            href={card.ctaLink}
            text={card.ctaText}
            textColor="text-white"
          />
        </div>
      )}
    </div>
  </div>
);

// const TextOnlyCard = ({ card }: { card: BatteryRangeCard }) => (
//   <div className="rounded-[20px] bg-[#f4f4f4] p-7 md:p-8 flex flex-col justify-center">
//     <h4 className="text-2xl md:text-3xl text-black font-medium tracking-tight leading-snug mb-3">
//       {card.title}
//     </h4>
//     <p className="text-black/65 text-sm md:text-[15px] leading-[1.2]">
//       {card.description}
//     </p>
//     {card.ctaText && card.ctaLink && (
//       <div className="mt-5">
//         <CtaButton
//           href={card.ctaLink}
//           text={card.ctaText}
//           textColor="text-black"
//           bgClass="bg-white"
//         />
//       </div>
//     )}
//   </div>
// );

export default BatteryRangeGrid;
