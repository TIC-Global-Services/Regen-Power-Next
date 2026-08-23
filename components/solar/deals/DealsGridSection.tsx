"use client";

import React from "react";
import SectionHeader from "@/reuseables/SectionHeader";
import Reveal from "@/reuseables/Reveal";
import CtaButton from "@/reuseables/CtaButton";
import type { ResolvedDealsGrid } from "@/lib/strapi/resolvers/deals";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Icon } from "lucide-react";

interface Props {
  resolved: ResolvedDealsGrid;
}

// TODO: temporary fallback for testing — remove once real promotion images are uploaded in Strapi
const FALLBACK_IMAGE = "/solar_house_render.png";

export default function DealsGridSection({ resolved }: Props) {
  return (
    <section className="py-16 md:py-24 bg-white border-t border-gray-50">
      <div className="md:px-[3%] mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between md:gap-8 mb-12 px-[5%]">
          <div className="">
            <SectionHeader
              subtitle={resolved.subtitle || ""}
              title={resolved.title || ""}
              align="left"
              className="mb-0"
              subtitleClass="text-lg md:text-[2.125rem] text-black font-normal"
              titleClass="text-4xl md:text-[5rem] text-[#63B846] leading-none font-normal tracking-tight "
            />
          </div>
          <div className="lg:w-[35%] md:mb-5">
            <p className="leading-tight tracking-tight font-light text-base md:text-lg">
              {resolved.description}
            </p>
          </div>
        </div>

        {/* Desktop: Grid */}
        <div className="hidden md:grid md:grid-cols-1 lg:grid-cols-3 gap-5 mb-16">
          {resolved.promotions.map((promo, idx) => (
            <Reveal
              key={idx}
              delay={idx * 0.1}
              className="rounded-[20px] p-8 md:p-10 flex flex-col justify-between shadow-sm transition-all duration-300 min-h-[459px] bg-[#EEF6EB]/50 border border-gray-100 mx-auto"
            >
              <div>
                <h3 className="text-2xl md:text-3xl mb-4 tracking-tight text-[#63B846] leading-tight">
                  {promo.title}
                </h3>
                <p className="text-sm md:text-xl text-[#888888] tracking-tight leading-tight font-light">
                  {promo.description}
                </p>
              </div>
              <div className="relative w-full aspect-[3/2] rounded-[14px] overflow-hidden mt-6">
                <Image
                  src={promo.image?.src || FALLBACK_IMAGE}
                  alt={promo.image?.alt || promo.title}
                  fill
                  sizes="(max-width: 768px) 80vw, 33vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          ))}
        </div>

        {/* Mobile: Native scroll slider (same pattern as FeatureCardGrid) */}
        <div className="relative z-10 mb-12 flex md:hidden items-stretch gap-4 overflow-x-auto pb-4 px-[5vw] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {resolved.promotions.map((promo, idx) => (
            <div
              key={idx}
              className="flex-none w-[85vw] min-[480px]:w-[76vw] sm:w-[55vw] shrink-0 snap-start rounded-[20px] p-8 flex flex-col justify-between shadow-sm bg-[#EEF6EB] border border-gray-100 min-h-[320px]"
            >
              <div>
                <h3 className="text-2xl mb-4 tracking-tight text-[#63B846] leading-tight font-normal">
                  {promo.title}
                </h3>
                <p className="text-sm text-[#888888] leading-tight font-light">
                  {promo.description}
                </p>
              </div>
              <div className="relative w-full aspect-[3/2] rounded-[14px] overflow-hidden mt-6">
                <Image
                  src={promo.image?.src || FALLBACK_IMAGE}
                  alt={promo.image?.alt || promo.title}
                  fill
                  sizes="(max-width: 768px) 80vw"
                  className="object-cover"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          {/* <CtaButton text={resolved.ctaText || "Get This Bundle Quoted"} href={resolved.ctaLink} /> */}
          <Link href={resolved.ctaLink}>
            <button className="inline-flex items-center gap-3 bg-[#63B84666] backdrop-blur-md text-black border border-[#63B846] text-white px-1.5 py-1 md:py-1.5 rounded-full hover:bg-[#529a37] transition-all duration-300 group">
              <span className={`pl-4 tracking-tight text-black whitespace-nowrap min-w-0 flex-1`}>
                {resolved.ctaText}
              </span>
              <div className={` bg-[#63B846] text-black p-2 rounded-full shrink-0 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center`}>
                <ArrowUpRight size={16} strokeWidth={2.5} />
              </div>
            </button></Link>
        </div>
      </div>
    </section>
  );
}
