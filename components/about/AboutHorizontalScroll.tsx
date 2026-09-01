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
``

const HorizontalCards = forwardRef<
  HTMLDivElement,
  { style?: React.CSSProperties; items?: HorizontalCardItem[] }
>(function HorizontalCards({ style, items }, ref) {
  const displayItems = items && items.length > 0 ? items : FALLBACK_ITEMS;
  return (
    <div
      ref={ref}
      style={style}
      className="flex h-full w-max items-start gap-32 pr-[15vw] will-change-transform md:gap-36 md:pr-[12vw] lg:gap-40 lg:pr-[10vw]"
    >
      {displayItems.map((item, i) => {
        const isTop = i % 2 === 0;
        return (
          <div
            key={item.id}
            className={`flex w-[70vw] shrink-0 flex-col gap-3 md:w-[50vw] md:gap-4 lg:w-[38vw] lg:gap-6 ${isTop ? "self-start mt-[15vh]" : "self-end mb-[15vh]"}`}
          >
            {/* image on top, title + desc below — everything left-aligned */}
            <div className="flex flex-col items-start gap-3 md:gap-4 lg:gap-6">
              <div className="flex h-24 w-56 shrink-0 justify-start md:h-36 md:w-80 lg:h-40 lg:w-96">
                {item.badgeSrc && (
                  <Image
                    src={item.badgeSrc}
                    alt={item.title}
                    height={160}
                    width={160}
                    className="h-full w-full object-contain object-left"
                    unoptimized
                  />
                )}
              </div>

              <div className="flex min-w-0 flex-col gap-2 text-left">
                <h3 className="whitespace-pre-line text-left text-2xl font-normal leading-[1.1] tracking-tight text-[#63B846] md:text-4xl lg:text-[2.5rem] lg:leading-none">
                  {item.title}
                </h3>
                <p className="text-left text-sm font-normal leading-tight tracking-tight text-black md:text-lg lg:text-xl">
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
