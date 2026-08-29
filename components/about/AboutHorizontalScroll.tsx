"use client";

import { forwardRef } from "react";
import Image, { StaticImageData } from "next/image";
import awardsBadge from "@/assets/awards.png";
import finalistBadge from "@/assets/finalist.png";

// Extra vertical scroll distance (vh) per card beyond the first — controls
// how much vertical scrolling it takes to traverse the horizontal track.
export const VH_PER_CARD = 110;

export type HorizontalCardItem = {
  id: string;
  title: string;
  description: string;
  badgeSrc?: string | StaticImageData | null;
};

export const FALLBACK_ITEMS: HorizontalCardItem[] = [
  {
    id: "01",
    title: "Finalist - Smart Installer, Smart Energy Excellence Awards 2026",
    description: "Regen Power is proud to be recognised nationally. Finalist – Smart Installer, Smart Energy Excellence Awards 2026.",
    badgeSrc: finalistBadge,
  },
  {
    id: "02",
    title: "#1 Most Popular Solar Installer in Western Australia and\n#2 Most Popular in Australia by SunWiz Awards 2026",
    description: "Regen Power is proud to be recognised nationally. Finalist – Smart Installer, Smart Energy Excellence Awards 2026.",
    badgeSrc: awardsBadge,
  },
  {
    id: "03",
    title: "Finalist - Smart Installer, Smart Energy Excellence Awards 2026",
    description: "Regen Power is proud to be recognised nationally. Finalist – Smart Installer, Smart Energy Excellence Awards 2026.",
  },
  {
    id: "04",
    title: "ProductReview.com.au Awards Winner 2026",
    description: "Regen Power has won the ProductReview.com.au Award in the Solar Installer Category for the sixth year in a row year (2021, 2022, 2023, 2024, 2025 & 2026). The award is given to the solar company that earned the highest 5-star rating in the calendar year 2025.",
  },
];

// Back-compat alias — AboutBackground previously imported ITEMS directly.
// Prefer FALLBACK_ITEMS for fallback cases; ITEMS kept so existing imports don't break.
export const ITEMS = FALLBACK_ITEMS;

// Pure track markup — the scroll listener and translateX math live in
// AboutBackground so the track can be composited on top of the looping
// video inside its single pinned viewport instead of owning a second one.
//
// Cards alternate top → bottom → top → bottom along the horizontal scroll —
// NOT a 2-row grid. Each card's translateY lifts tops away from bottoms so
// they read as a zig-zag chain across the video, not a block grid.
// Title 2.5rem #63B846, description xl black. Badge is a plain image container.

const HorizontalCards = forwardRef<
  HTMLDivElement,
  { style?: React.CSSProperties; items?: HorizontalCardItem[] }
>(function HorizontalCards({ style, items }, ref) {
  const displayItems = items && items.length > 0 ? items : FALLBACK_ITEMS;
  return (
    <div
      ref={ref}
      style={style}
      className="flex h-full w-max items-center gap-32 pr-[15vw] will-change-transform md:items-start md:gap-0 md:pr-[10vw]"
    >
      {displayItems.map((item, i) => {
        const isTop = i % 2 === 0;
        const textAlign = isTop ? "text-left" : "text-right";
        return (
          <div
            key={item.id}
            className={`flex w-[92vw] shrink-0 flex-col gap-3 md:w-[58vw] ${isTop ? "md:self-start md:mt-[15vh]" : "md:self-end md:mb-[15vh]"}`}
          >
            {/* mobile: image on top, text below, both pinned to the card's start/end side — desktop: text left, image pinned right */}
            <div className={`flex flex-col gap-3 md:flex-row md:items-center md:gap-6 ${isTop ? "items-start" : "items-end"}`}>
              <div className={`order-1 flex h-24 w-56 shrink-0 items-center md:order-2 md:h-40 md:w-96 md:justify-center ${isTop ? "justify-start" : "justify-end"}`}>
                {item.badgeSrc && (
                  <Image
                    src={item.badgeSrc}
                    alt={item.title}
                    height={160}
                    width={160}
                    className="h-full w-full object-contain"
                    unoptimized
                  />
                )}
              </div>

              <div className={`order-2 flex min-w-0 flex-1 flex-col gap-2 md:order-1 ${textAlign}`}>
                <h3 className={`whitespace-pre-line text-2xl font-normal leading-[1.1] tracking-tight text-[#63B846] md:text-[2.5rem] md:leading-none ${textAlign}`}>
                  {item.title}
                </h3>
                <p className={`text-sm font-normal leading-tight tracking-tight text-black md:text-xl ${textAlign}`}>
                  {item.description}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
});

export default HorizontalCards;
