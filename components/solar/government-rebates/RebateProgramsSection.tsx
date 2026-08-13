"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import SectionHeader from "@/reuseables/SectionHeader";
import MissingImage from "@/reuseables/MissingImage";
import type { ResolvedRebatesRebatePrograms } from "@/lib/strapi/resolvers/rebates";

const CYCLE_DURATION = 5000; // ms per card

interface Props {
  resolved: ResolvedRebatesRebatePrograms;
}

export default function   RebateProgramsSection({ resolved }: Props) {
  const programs = resolved.programs;
  const [activeIndex, setActiveIndex] = useState(0);
  const [progressKey, setProgressKey] = useState(0); // forces animation restart
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const activeId = programs[activeIndex]?.label ?? "";

  const advanceToNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % programs.length);
    setProgressKey((k) => k + 1);
  }, [programs.length]);

  // Auto-cycle timer
  useEffect(() => {
    if (programs.length <= 1) return;

    timerRef.current = setTimeout(advanceToNext, CYCLE_DURATION);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [activeIndex, advanceToNext, programs.length, progressKey]);

  const handleManualClick = (index: number) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setActiveIndex(index);
    setProgressKey((k) => k + 1);
  };

  return (
    <section className="bg-white py-0 md:py-24">
      <div className="mx-auto max-w-7xl px-[5%]">
        <SectionHeader
          subtitle={resolved.subtitle}
          title={resolved.title}
          description={resolved.description}
          align="center"
          className="mb-16"
          subtitleClass="text-xl md:text-[1.75rem] text-black"
          titleClass="text-5xl md:text-6xl font-light leading-none"
          descClass="mx-auto max-w-xl text-base md:text-xl text-black"
        />
      </div>

      {/* Container height is locked to the active card's square size
          (activeGrow / totalGrow of the width), so switching cards never
          changes the row height → no jump. */}
      <div
        className="hidden lg:flex items-end"
        style={{ aspectRatio: `${(1.5 + 1 * (programs.length - 1)) / 1.5} / 1` }}
      >
        {programs.map((program, index) => {
          const isActive = program.label === activeId;
          const isLast = index === programs.length - 1;
          const img = program.image;

          return (
            <button
              key={program.label}
              type="button"
              onClick={() => handleManualClick(index)}
              onMouseEnter={() => handleManualClick(index)}
              className={`relative overflow-hidden text-left transition-all duration-500 ease-in-out ${isActive
                ? "bg-[#A6D63F] flex-[1.5_1_0%] pt-8 px-6 pb-10 aspect-square"
                : `bg-[#F3F7F1] flex-1 pt-6 pb-4 px-5 aspect-square ${!isLast ? "border-r border-[#DCE8D8]" : ""} hover:bg-[#EEF6EB]`
                }`}
            >
              {/* Progress bar on active card */}
              {isActive && (
                <div
                  className="absolute top-0 left-0 right-0 h-[4px] overflow-hidden"
                >
                  <div
                    key={progressKey}
                    className="absolute left-0 h-[4px] bg-black"
                    style={{
                      animation: `progressFill ${CYCLE_DURATION}ms linear forwards`,
                    }}
                  />
                </div>
              )}

              {/* Thin top line on inactive cards */}
              {!isActive && (
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-black/5" />
              )}

              <h3
                className={`${isActive
                  ? "text-[1.6rem] lg:text-[2.5rem] leading-tight tracking-tight text-black"
                  : "text-[1.75rem] leading-tight tracking-tight text-black"
                }`}
              >
                {program.title}
              </h3>

              {/* Collapsible expanded content — animates open/closed instead of mounting/unmounting */}
              <div
                className={`grid transition-[grid-template-rows] duration-500 ease-in-out ${isActive ? "grid-rows-[1fr] mt-6" : "grid-rows-[0fr] mt-0"}`}
              >
                <div className="overflow-hidden">
                  {img ? (
                    <div className="relative h-[110px] lg:h-[120px] xl:h-[150px] overflow-hidden rounded-[20px] max-w-[393px]">
                      <Image src={img.src} alt={img.alt} fill className="object-cover" />
                    </div>
                  ) : (
                    <div className="max-w-[393px] h-[110px] md:h-[215px] overflow-hidden rounded-[20px]">
                      <MissingImage
                        label={`${program.title} image`}
                        type="bgimage"
                      />
                    </div>
                  )}
                  <p className="mt-5 text-base leading-tight text-black">
                    {program.summary}
                  </p>
                  
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="space-y-4 lg:hidden px-[5%]">
        {programs.map((program) => {
          const isActive = program.label === activeId;
          const img = program.image;

          return (
            <div
              key={program.label}
              className={`overflow-hidden rounded-[28px] border transition-colors ${isActive ? "border-[#63B846] bg-[#A6D63F]" : "border-[#DCE8D8] bg-[#F3F7F1]"
                }`}
            >
              <button
                type="button"
                onClick={() => handleManualClick(programs.indexOf(program))}
                className="flex w-full items-center justify-between px-5 py-5 text-left"
              >
                <span className="pr-4 text-[2.5rem] leading-tight tracking-tight text-black">
                  {program.title}
                </span>
                <span className="text-sm uppercase tracking-wide text-black/55">
                  {isActive ? "Open" : "View"}
                </span>
              </button>

              {isActive && (
                <div className="px-5 pb-5">
                  {img && (
                    <div className="relative aspect-[4/3] overflow-hidden rounded-[24px]">
                      <Image src={img.src} alt={img.alt} fill className="object-cover" />
                    </div>
                  )}
                  <p className="mt-4 text-base leading-tight text-black/90">{program.summary}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

    </section>
  );
}
