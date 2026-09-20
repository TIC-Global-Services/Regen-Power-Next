import React from "react";
import Image from "next/image";
import Reveal from "@/reuseables/Reveal";
import SectionHeader from "@/reuseables/SectionHeader";
import gridDots from "@/assets/commercial-off-grid/gridDots.png";
import type { ResolvedCommercialOffGridWhyRegen } from "@/lib/strapi/resolvers/commercial";

interface Props {
  resolved: ResolvedCommercialOffGridWhyRegen;
}

export default function WhyRegenSection({ resolved }: Props) {
  if (resolved.cards.length === 0) return null;

  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="px-[5%] md:px-[3%] mx-auto">
        <SectionHeader
          subtitle={resolved.subtitle}
          title={resolved.title}
          description={resolved.description}
          align="center"
          descClass="mx-auto md:text-base"
          subtitleClass="text-base md:text-[1.75rem] font-light text-black tracking-tight"
          titleClass="text-[2.5rem] md:text-6xl text-[#63B846] font-normal leading-none"
          className="mb-10 md:mb-16"
        />

        <div className="rounded-[28px] bg-[#3B3B33] p-3 md:p-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {resolved.cards.map((card, idx) =>
              card.type === "dots" ? (
                <Reveal
                  key={idx}
                  delay={idx * 0.05}
                  className="hidden md:flex items-center justify-center rounded-[14px] bg-white/25 min-h-[220px] lg:min-h-[260px]"
                >
                  <div className="relative w-32 h-32 md:w-40 md:h-40">
                    <Image src={gridDots} alt="" fill className="object-contain" sizes="160px" />
                  </div>
                </Reveal>
              ) : (
                <Reveal
                  key={idx}
                  delay={idx * 0.05}
                  className="rounded-[14px] bg-white/25 p-5 md:p-6 flex flex-col gap-2 min-h-[220px] lg:min-h-[260px]"
                >
                  <h3 className="text-xl md:text-2xl font-light tracking-tight leading-tight text-[#63B846]">
                    {card.title}
                  </h3>
                  <p className="text-sm md:text-base leading-[1.25] tracking-tight text-white">
                    {card.description}
                  </p>
                </Reveal>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
