"use client";

import React, { useState } from "react";
import Reveal from "@/reuseables/Reveal";
import SectionHeader from "@/reuseables/SectionHeader";
import { text } from "stream/consumers";

export interface StaggeredCard {
  title: string;
  subtitle?: string;
  middleTitle?: string;
  desc: string;
  isDark?: boolean;
  delay?: number;
}

export type GridItem = StaggeredCard | "spacer";

export interface ColumnConfig {
  items: GridItem[];
}

interface StaggeredCardsGridProps {
  subtitle: string;
  title: string | React.ReactNode;
  description?: string;
  columns: ColumnConfig[];
  align?: "left" | "center" | "right";
  className?: string;
  headerClass?: string;
  subtitleClass?: string;
  titleClass?: string;
  cardWidthClass?: string;
  cardHeightClass?: string;
  spacerHeightClass?: string;
  badge?: string;
}

interface StaggeredCardItemProps {
  item: StaggeredCard;
  cardWidthClass: string;
  cardHeightClass: string;
}

const StaggeredCardItem: React.FC<StaggeredCardItemProps> = ({
  item,
  cardWidthClass,
  cardHeightClass,
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Reveal
      delay={item.delay || 0.1}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`${hovered ? "bg-[#3B3B33]" : "bg-[#EBEBEB]"
        } rounded-[14px] p-6 md:p-7 flex flex-col justify-between w-full  mx-auto shadow-sm hover:shadow-md transition-all duration-300 ${cardWidthClass} min-h-[280px] ${cardHeightClass}`}
    >
      <div className="flex flex-col">
        <h3 className="text-[#63B846] text-[2.5rem] md:text-[3.125rem] leading-[1.0] tracking-tighter mb-1">
          {item.title}
        </h3>
        {item.subtitle && (
          <span
            className={`text-xs md:text-sm tracking-tight mt-1 transition-colors duration-300 ${hovered ? "text-white" : "text-black"
              }`}
          >
            {item.subtitle}
          </span>
        )}
      </div>

      <div className="mt-auto">
        {item.middleTitle && (
          <h4
            className={`text-sm md:text-xl tracking-tight mb-2 transition-colors duration-300 ${hovered ? "text-white" : "text-black"
              }`}
          >
            {item.middleTitle}
          </h4>
        )}
        <p
          className={"text-xs md:text-sm leading-tight tracking-tight transition-colors duration-300 text-[#888888]"}
        >
          {item.desc}
        </p>
      </div>
    </Reveal>
  );
};

const StaggeredCardsGrid: React.FC<StaggeredCardsGridProps> = ({
  subtitle,
  title,
  description,
  columns,
  align = "left",
  className = "",
  headerClass = "",
  subtitleClass = "text-xl md:text-[2.125rem] text-black capitalize",
  titleClass = "text-[3.125rem] md:text-[5rem]",
  cardWidthClass = "max-w-[434px]",
  cardHeightClass = "h-[280px]",
  spacerHeightClass = "h-[280px]",
  badge,
}) => {
  return (
    <section className={`py-16 md:py-24 bg-white ${className}`}>
      <div className="px-[5%] md:px-[3%] mx-auto">

        {badge && (
          <div className={`mb-6 flex ${align === "left" ? "justify-start" : align === "right" ? "justify-end" : "justify-center"}`}>
            <span className="bg-[#E1D9D4] text-[10px] uppercase tracking-tight px-4 py-1.5 rounded-full">
              {badge}
            </span>
          </div>
        )}

        {/* Section Header */}
        <SectionHeader
          subtitle={subtitle}
          title={title}
          description={description}
          align={align}
          subtitleClass={subtitleClass}
          titleClass={titleClass}
          className={headerClass || (align === "left" ? "max-w-3xl mb-12" : "mx-auto mb-12")}
        />

        {/* Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-fr mx-auto max-w-7xl">
          {columns.map((column, colIdx) => (
            <div key={colIdx} className="flex flex-col gap-4 h-full justify-between">
              {column.items.map((item, itemIdx) => {
                if (item === "spacer") {
                  return (
                    <div
                      key={itemIdx}
                      className={`hidden lg:block ${spacerHeightClass}`}
                    />
                  );
                }

                return (
                  <StaggeredCardItem
                    key={itemIdx}
                    item={item}
                    cardWidthClass={cardWidthClass}
                    cardHeightClass={cardHeightClass}
                  />
                );
              })}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default StaggeredCardsGrid;
