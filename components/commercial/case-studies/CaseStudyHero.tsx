"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ArrowLeft } from "lucide-react";
import type { CaseStudyItem } from "@/utils/case-studies-data";

interface Props {
  caseStudy: CaseStudyItem;
}

export default function CaseStudyHero({ caseStudy }: Props) {
  const { kicker, title, heroDescription, pdfUrl, showcaseImage } = caseStudy;

  return (
    <section className="relative w-full min-h-[85vh] lg:min-h-screen bg-[#1c221e] text-white overflow-hidden flex flex-col justify-between">
      {/* Background Image with Dark Atmospheric Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={showcaseImage || "/portfolio_hero.png"}
          alt={title}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center filter brightness-[0.45] contrast-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/30" />
      </div>

      {/* Top Navigation / Breadcrumb */}
      <div className="relative z-10 w-full px-[3%] md:px-[3%] pt-28 md:pt-32">
        <div className="flex items-center justify-between">
          <Link
            href="/commercial/case-studies"
            className="inline-flex items-center gap-2 text-xs md:text-sm font-medium tracking-wide uppercase text-white/70 hover:text-white transition-colors group"
          >
            <span className="p-1 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" />
            </span>
            <span>All Case Studies</span>
          </Link>
          <span className="text-xs uppercase tracking-widest text-white/50 hidden sm:inline-block">
            Commercial Solar Solutions
          </span>
        </div>
      </div>

      {/* Hero Bottom Content (matching reference screenshot) */}
      <div className="relative z-10 w-full px-[5%] md:px-[3%] pb-14 md:pb-20 ">
        {/* Uppercase Kicker */}
        {kicker && (
          <p className="text-xs sm:text-sm md:text-[2.125rem] uppercase tracking-tight text-white/90 font-medium mb-1">
            {kicker}
          </p>
        )}

        {/* High-Impact Brand Green Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[5rem] font-normal uppercase tracking-tight text-[#63B846] leading-[1.04] mb-6">
          {title}
        </h1>

        {/* Description */}
        {heroDescription && (
          <p className="text-sm sm:text-base md:text-2xl text-white/85 leading-[1.2] max-w-5xl  mb-8 font-light">
            {heroDescription}
          </p>
        )}

        {/* Action Button: Download Report / Inquire */}
        <div className="flex flex-wrap items-center gap-4">
          {pdfUrl ? (
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#63B846]/40 hover:bg-[#63B846] text-white text-xs sm:text-sm font-medium pl-5 pr-0.5 py-[2px] rounded-full backdrop-blur-md border border-[#63B846]/60 transition-all duration-300 group shadow-lg hover:shadow-[#63B846]/20"
            >
              <span>Download Report</span>
              <span className="w-8 h-8 rounded-full bg-[#63B846] text-white flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
                <ArrowUpRight className="w-5 h-5" />
              </span>
            </a>
          ) : (
            <a
              href="#quote-form"
              className="inline-flex items-center gap-3 bg-[#63B846]/40 hover:bg-[#63B846] text-white text-xs sm:text-sm font-medium pl-5 pr-2 py-2 rounded-full backdrop-blur-md border border-[#63B846]/60 transition-all duration-300 group shadow-lg"
            >
              <span>Request Project Details</span>
              <span className="w-7 h-7 rounded-full bg-[#63B846] text-white flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </a>
          )}

          {/* <a
            href="#quote-form"
            className="inline-flex items-center gap-2 text-xs sm:text-sm text-white/80 hover:text-white px-5 py-2.5 rounded-full border border-white/20 hover:border-white/40 backdrop-blur-sm transition-colors"
          >
            Get Commercial Quote
          </a> */}
        </div>
      </div>
    </section>
  );
}
