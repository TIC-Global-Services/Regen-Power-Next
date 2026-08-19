"use client";

import React, { useState, useEffect, useRef } from "react";
import Image, { StaticImageData } from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Marquee from "@/reuseables/Marquee";
import SectionHeader from "@/reuseables/SectionHeader";
import MissingImage from "@/reuseables/MissingImage";
import Reveal from "@/reuseables/Reveal";

export interface BrandLogo {
  id: string;
  name: string;
  src: StaticImageData | string;
}

export interface BrandCategory {
  id: string;
  label: string;
  logos: BrandLogo[];
}

export interface CraftsmanshipData {
  subtitle: string;
  title: string;
  categories: BrandCategory[];
}

interface CraftsmanshipProps {
  data: CraftsmanshipData;
}

const Craftsmanship = ({ data }: CraftsmanshipProps) => {
  const TABS = data.categories.map(({ id, label }) => ({ id, label }));
  const [activeTabId, setActiveTabId] = useState(TABS[0]?.id);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goToNextTab = () => {
    const currentIdx = TABS.findIndex((t) => t.id === activeTabId);
    const nextIdx = (currentIdx + 1) % TABS.length;
    setActiveTabId(TABS[nextIdx].id);
  };

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(goToNextTab, 5000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [activeTabId]);

  const activeCategory =
    data.categories.find((c) => c.id === activeTabId) ?? data.categories[0];

  return (
    <section className="py-10 md:py-20 bg-white overflow-hidden">
      <div className="px-[5%] md:px-[3%]">
        {/* <SectionHeader
          subtitle={data.subtitle}
          title={data.title}
          align="center"
          subtitleClass="md:text-[2rem] font-normal tracking-tight text-black"
          titleClass="lg:text-[5rem] font-normal text-[#63B846] tracking-tight"
          className="mb-10 md:mb-14 lg:-space-y-4"
        /> */}
        <div className="flex justify-center flex-col items-center mb-10">
          <p className="text-xl md:text-[2rem] leading-none tracking-tighter font-normal text-black">{data.subtitle}</p>
          <h1 className="text-[3.125rem] md:text-5xl lg:text-[5rem] leading-none tracking-tighter font-normal text-[#63B846] tracking-tight">{data.title}</h1>
        </div>


        <div className="flex justify-center mb-10 md:mb-14">
          <div className="inline-flex items-center bg-[#63B8461A] rounded-full p-1 py-2 gap-1">
            {TABS.map((tab) => {
              const isActive = tab.id === activeTabId;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTabId(tab.id)}
                  className={`relative px-3 lg:px-8 py-1.5 md:py-2 text-xs md:text-base font-medium rounded-full transition-colors duration-200 cursor-pointer whitespace-nowrap ${isActive
                    ? "text-[#63B846]"
                    : "text-gray-600 hover:text-black"
                    }`}
                >

                  {isActive && (
                    <motion.div
                      layoutId="craftsmanship-tab-pill"
                      className="absolute inset-0 bg-black rounded-full"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-5xl mx-auto"
          >
            {(() => {
              // Tabs with more than 6 logos get 4 columns; otherwise 3.
              const totalLogos = activeCategory.logos.length;
              const cols = totalLogos > 6 ? 4 : 3;
              const totalRows = Math.ceil(totalLogos / cols);
              const lastRowCount = totalLogos % cols || cols;
              // Multi-item partial rows render as a flex row below the grid; a lone leftover
              // item stays INSIDE the grid on the middle track so its borders land exactly on
              // the track boundaries and align with the column dividers above.
              const flexPartial = lastRowCount > 1 && lastRowCount < cols;
              const gridItems =
                lastRowCount === 1
                  ? totalLogos
                  : lastRowCount < cols
                    ? totalLogos - lastRowCount
                    : totalLogos;
              const gridRowCount = Math.ceil(gridItems / cols);
              const gridColsClass =
                cols === 4 ? "md:grid-cols-4" : "md:grid-cols-3";

              const renderLogo = (logo: BrandLogo) => (
                <div className="relative w-full h-[60px] md:h-[80px]">
                  {logo.src ? (
                    <img
                      src={typeof logo.src === "string" ? logo.src : logo.src.src}
                      alt={logo.name}
                      className="absolute inset-0 w-full h-full object-contain"
                    />
                  ) : (
                    <MissingImage
                      label={logo.name || "Brand logo"}
                      type="logo"
                      aspect="aspect-[3/1]"
                      className="h-full"
                    />
                  )}
                </div>
              );

              return (
                <>
                  {/* Desktop Grid View — fixed min-height so tab switching never jumps; wrapper vertically centers a single row */}
                  <div className="hidden md:flex md:flex-col md:justify-center md:min-h-[440px]">
                    <div className={`grid ${gridColsClass}`}>
                      {activeCategory.logos.slice(0, gridItems).map((logo, idx) => {
                        const colInRow = idx % cols;
                        const rowIdx = Math.floor(idx / cols);
                        const isLoneItem =
                          lastRowCount === 1 && rowIdx === totalRows - 1;
                        // Lone item sits on the middle track (1-based) so its borders coincide
                        // with the column dividers of the rows above.
                        const style: React.CSSProperties | undefined =
                          isLoneItem
                            ? { gridColumnStart: Math.ceil(cols / 2) }
                            : undefined;

                        const isLastGridRow = rowIdx === gridRowCount - 1;
                        const showBorderRightDesktop =
                          isLoneItem || colInRow < cols - 1;
                        // Horizontal line under every row except the very last one
                        const showBorderBottomDesktop =
                          !isLastGridRow || flexPartial;

                        return (
                          <Reveal
                            key={logo.id}
                            delay={idx * 0.05}
                            style={style}
                            className={`flex items-center justify-center p-8 md:p-12 hover:bg-gray-50 transition-colors h-[180px] md:h-[220px] relative
                              ${showBorderBottomDesktop ? "md:border-b border-[#00000033]" : "md:border-b-0"}
                              ${showBorderRightDesktop ? "md:border-r border-[#00000033]" : "md:border-r-0"}
                            `}
                          >
                            {/* Lone item: left divider drawn 1px OUTSIDE the box so it overlaps the
                                divider above (a border would sit 1px inside and look misaligned) */}
                            {isLoneItem && (
                              <span
                                aria-hidden
                                className="absolute left-0 -translate-x-px top-0 bottom-0 w-px bg-[#00000033]"
                              />
                            )}
                            {renderLogo(logo)}
                          </Reveal>
                        );
                      })}
                    </div>

                    {/* Multi-item partial last row — items stretch evenly to fill the row width */}
                    {flexPartial && (
                      <div className="flex">
                        {activeCategory.logos.slice(gridItems).map((logo, i) => {
                          const idx = gridItems + i;
                          return (
                            <Reveal
                              key={logo.id}
                              delay={idx * 0.05}
                              className={`flex-1 flex items-center justify-center p-8 md:p-12 hover:bg-gray-50 transition-colors h-[180px] md:h-[220px] relative
                                ${i < lastRowCount - 1 ? "md:border-r border-[#00000033]" : ""}
                              `}
                            >
                              {renderLogo(logo)}
                            </Reveal>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Mobile Marquee View */}
                  <div className="block md:hidden py-4">
                    <Marquee speed={20} gap={32} pauseOnHover>
                      {activeCategory.logos.map((logo) => (
                        <div
                          key={logo.id}
                          className="flex items-center justify-center px-4 py-3 aspect-[5/3] w-36 bg-gray-50/50 rounded-xl"
                        >
                          <img
                            src={typeof logo.src === "string" ? logo.src : logo.src.src}
                            alt={logo.name}
                            className="object-contain max-h-10 w-auto"
                          />
                        </div>
                      ))}
                    </Marquee>
                  </div>
                </>
              );
            })()}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Craftsmanship;