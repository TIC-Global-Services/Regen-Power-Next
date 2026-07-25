"use client";

import React, { useState } from "react";
import Image from "next/image";
import SectionHeader from "@/reuseables/SectionHeader";
import type { ResolvedRebatesRebatePrograms } from "@/lib/strapi/resolvers/rebates";

interface Props {
  resolved: ResolvedRebatesRebatePrograms;
}

export default function RebateProgramsSection({ resolved }: Props) {
  const [activeId, setActiveId] = useState(resolved.programs[0]?.label ?? "");

  return (
    <section className="bg-white py-16 md:py-24">
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

      <div className="hidden lg:flex items-end">
        {resolved.programs.map((program, index) => {
          const isActive = program.label === activeId;
          const isLast = index === resolved.programs.length - 1;
          const img = program.image;

          return (
            <button
              key={program.label}
              type="button"
              onClick={() => setActiveId(program.label)}
              className={`flex-1 text-left transition-all duration-300 ${isActive
                ? "bg-[#A6D63F] pt-8 px-8 h-[420px] border-t-4 border-black"
                : `bg-[#F3F7F1] pt-6 pb-4 px-5 h-[320px] ${!isLast ? "border-r border-[#DCE8D8]" : ""} hover:bg-[#EEF6EB]`
                }`}
            >
              {isActive ? (
                <>
                  <h3 className="text-[2.5rem] tracking-tight text-black font-medium">
                    {program.title}
                  </h3>
                  {img && (
                    <div className="relative mt-6 w-[393px] h-[215px] overflow-hidden rounded-[20px]">
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
                <p className="text-[1.1rem] leading-tight text-black">{program.title}</p>
              )}
            </button>
          );
        })}
      </div>

      <div className="space-y-4 lg:hidden px-[5%]">
        {resolved.programs.map((program) => {
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
                onClick={() => setActiveId(program.label)}
                className="flex w-full items-center justify-between px-5 py-5 text-left"
              >
                <span className="pr-4 text-2xl leading-tight tracking-tight text-black">
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
