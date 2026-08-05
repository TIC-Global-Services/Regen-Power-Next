"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import SectionHeader from "@/reuseables/SectionHeader";
import type { ResolvedRebatesRebatePrograms } from "@/lib/strapi/resolvers/rebates";

const CYCLE_DURATION = 5000; // ms per card

interface Props {
  resolved: ResolvedRebatesRebatePrograms;
}

export default function RebateProgramsSection({ resolved }: Props) {
  const programs = resolved.programs;
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [progressKey, setProgressKey] = useState(0); // forces animation restart
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const activeId = programs[activeIndex]?.label ?? "";

  const advanceToNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % programs.length);
    setProgressKey((k) => k + 1);
  }, [programs.length]);

  // Auto-cycle timer
  useEffect(() => {
    if (paused || programs.length <= 1) return;

    timerRef.current = setTimeout(advanceToNext, CYCLE_DURATION);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [activeIndex, paused, advanceToNext, programs.length, progressKey]);

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
          titleClass="text-5xl md:text-[3.75rem] font-light leading-none"
          descClass="mx-auto max-w-xl text-base md:text-xl text-black"
        />
      </div>

      <div
        className="hidden lg:flex items-end"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
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
              className={`flex-1 relative text-left transition-all duration-300 ${isActive
                ? "bg-[#A6D63F] pt-8 px-8 py-10"
                : `bg-[#F3F7F1] pt-6  pb-4 px-5 h-[320px] ${!isLast ? "border-r border-[#DCE8D8]" : ""} hover:bg-[#EEF6EB]`
                }`}
              style={isActive ? { borderTop: '4px solid transparent' } : undefined}
            >
              {/* Progress bar on active card */}
              {isActive && (
                <div
                  className="absolute top-0 left-0 right-0"
                  style={{ height: '4px' }}
                >
                  {/* Track */}
                  <div className="absolute -top-1 inset-0 bg-black/20" />
                  {/* Fill */}
                  <div
                    key={progressKey}
                    className="absolute -top-1 left-0 h-[4px] bg-black"
                    style={{
                      animation: `progressFill ${CYCLE_DURATION}ms linear forwards`,
                      animationPlayState: paused ? 'paused' : 'running',
                    }}
                  />
                </div>
              )}

              {/* Thin top line on inactive cards */}
              {/* {!isActive && (
                <div className="absolute top-0 left-0 right-0 h-[4px] bg-black/10" />
              )} */}

              {isActive ? (
                <>
                  <h3 className="text-[2.5rem] tracking-tight text-black font-medium">
                    {program.title}
                  </h3>
                  {img && (
                    <div className="relative mt-6 w-[393px] h-[150px] overflow-hidden rounded-[20px]">
                      <Image src={img.src} alt={img.alt} fill className="object-cover" />
                    </div>
                  )}
                  <p className="mt-5 text-base leading-tight text-black/90">
                    {program.summary}
                  </p>
                  {program.badge && (
                    <span className="mt-4 inline-flex rounded-full bg-black/10 px-3 py-1 text-xs uppercase tracking-wide text-black">
                      {program.badge}
                    </span>
                  )}
                </>
              ) : (
                <p className="text-[1.750rem] leading-tight text-black">{program.title}</p>
              )}
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
                <span className="pr-4 text-4xl leading-tight tracking-tight text-black">
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
