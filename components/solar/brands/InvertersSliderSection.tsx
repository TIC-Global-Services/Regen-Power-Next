"use client";

import React from "react";
import type { StaticImageData } from "next/image";
import Reveal from "@/reuseables/Reveal";
import SectionHeader from "@/reuseables/SectionHeader";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SliderDots, useSnapSlider } from "@/reuseables/MobileSliderControls";
import type {
  ResolvedBrandsInverter,
  ResolvedBrandsInvertersSlider,
} from "@/lib/strapi/resolvers/brands";

import froniusLogo from "@/assets/solar/brands-tech/fronius.png";
import sungrowLogo from "@/assets/solar/brands-tech/sungrow.png";
import goodweLogo from "@/assets/solar/brands-tech/goodwe.png";
import istoreLogo from "@/assets/solar/brands-tech/istore.png";

const logoMap: Record<string, StaticImageData | undefined> = {
  Fronius: froniusLogo,
  Sungrow: sungrowLogo,
  GoodWe: goodweLogo,
  iStore: istoreLogo,
};

/* --------------------------------- Card --------------------------------- */

const InverterCard: React.FC<{ item: ResolvedBrandsInverter }> = ({ item }) => {
  const logo = item.name ? logoMap[item.name] : undefined;

  return (
    <div className="bg-[#EEF6EB] rounded-[20px] p-8 flex flex-col justify-between min-h-[60dvh]">
      <div className="flex flex-col">
        {/* Brand logo */}
        <div className="relative w-[150px] h-[100px] mb-10 flex items-center">
          {logo ? (
            <img
              src={logo.src}
              alt={item.name}
              style={{ objectFit: "contain", width: "auto", height: "100%" }}
            />
          ) : (
            <span className="text-lg font-bold text-black">{item.name}</span>
          )}
        </div>

        {/* Origin */}
        <div className="pb-4">
          <h4 className="text-xl tracking-tight text-black font-bold mb-1">
            Origin
          </h4>
          <p className="text-base text-black font-medium normal-case">
            {item.origin}
          </p>
        </div>

        {/* Positioning */}
        <div>
          <h4 className="text-xl tracking-tight text-black font-bold mb-1">
            Positioning
          </h4>
          <p className="text-sm md:text-base text-black leading-[1.2] font-light">
            {item.positioning}
          </p>
        </div>
      </div>

      <div className="border-t border-gray-200/50">
        {/* Range */}
        <div>
          <h4 className="text-xl tracking-tight text-black font-bold mb-1">
            Range
          </h4>
          <p className="text-sm md:text-base tracking-tight text-black font-medium">
            {item.range}
          </p>
        </div>

        {/* Warranty */}
        <div>
          <h4 className="text-xl tracking-tight text-black font-bold mb-1">
            Warranty
          </h4>
          <p className="text-sm md:text-base tracking-tight text-black font-medium">
            {item.warranty}
          </p>
        </div>
      </div>
    </div>
  );
};

/* ------------------------------ Slider section --------------------------- */

interface InvertersSliderSectionProps {
  resolved: ResolvedBrandsInvertersSlider;
}

const InvertersSliderSection: React.FC<InvertersSliderSectionProps> = ({
  resolved,
}) => {
  const inverters = resolved.inverters ?? [];
  // Hook measures the real card pitch, so arrows/dots work on both the 80vw
  // mobile cards and the fixed-width desktop ones (the old hardcoded 404px
  // step was wrong on phones).
  const { trackRef, sync, active, canPrev, canNext, goTo, next, prev } =
    useSnapSlider(inverters.length);

  if (inverters.length === 0) return null;

  return (
    <section className="py-16 md:py-20  overflow-hidden border-t border-gray-50">
      <div className="pl-[5%] pr-0 mx-auto">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start lg:items-center">
          {/* Heading */}
          <div className="w-full lg:w-[22%] shrink-0 pr-8 lg:pr-0">
            <SectionHeader
              subtitle={resolved.subtitle ?? ""}
              title={resolved.title ?? ""}
              align="left"
              className="mb-0"
              subtitleClass="text-base md:text-2xl tracking-tight font-medium text-black"
              titleClass="text-[2.5rem] md:text-6xl lg:text-[3.125rem] font-normal leading-none tracking-tight text-[#63B846]"
            />
          </div>

          {/* Slider track */}
          <div className="w-full lg:w-[78%]">
            <div
              ref={trackRef}
              onScroll={sync}
              className="flex gap-4 md:gap-6 overflow-x-auto  -mx-[5%] px-[5%] md:px-[3%] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {inverters.map((item, idx) => (
                <Reveal
                  key={idx}
                  delay={idx * 0.1}
                  className="w-[80vw] lg:w-[380px] shrink-0 snap-start"
                >
                  <InverterCard item={item} />
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile dots — desktop keeps its arrow-only controls */}
        <SliderDots
          count={inverters.length}
          active={active}
          onSelect={goTo}
          className="mt-5 lg:hidden"
        />

        {/* Controls */}
        <div className="flex justify-end gap-2 md:gap-4 mt-8 pr-[5%]">
          <button
            onClick={prev}
            disabled={!canPrev}
            aria-label="Previous inverter"
            className="p-2 md:p-4 rounded-full border border-gray-200 transition-colors cursor-pointer text-white bg-black hover:bg-black/60 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ArrowLeft size={20} />
          </button>
          <button
            onClick={next}
            disabled={!canNext}
            aria-label="Next inverter"
            className="p-2 md:p-4 rounded-full border border-gray-200 transition-colors cursor-pointer text-white bg-black hover:bg-black/60 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default InvertersSliderSection;
