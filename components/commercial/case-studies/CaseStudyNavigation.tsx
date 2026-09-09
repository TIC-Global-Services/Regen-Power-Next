"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { CASE_STUDIES_DATA } from "@/utils/case-studies-data";

interface Props {
  currentSlug: string;
}

export default function CaseStudyNavigation({ currentSlug }: Props) {
  const currentIdx = CASE_STUDIES_DATA.findIndex(
    (c) =>
      c.slug.toLowerCase() === currentSlug.toLowerCase() ||
      c.aliases.some((a) => a.toLowerCase() === currentSlug.toLowerCase())
  );

  const prev =
    currentIdx > 0
      ? CASE_STUDIES_DATA[currentIdx - 1]
      : CASE_STUDIES_DATA[CASE_STUDIES_DATA.length - 1];

  const next =
    currentIdx >= 0 && currentIdx < CASE_STUDIES_DATA.length - 1
      ? CASE_STUDIES_DATA[currentIdx + 1]
      : CASE_STUDIES_DATA[0];

  return (
    <nav
      aria-label="Case study navigation"
      className="px-[5%] md:px-[3%]  pb-20 md:pb-28 bg-white border-t border-[#E5EFD5] pt-12"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
        {prev && (
          <Link
            href={`/commercial/case-studies/${prev.slug}`}
            className="group flex flex-col p-6 sm:p-6 rounded-[24px] bg-[#FAFDF8] border border-[#DCE8D8] hover:bg-[#EEF6EB] hover:border-[#63B846]/40 transition-all duration-300"
          >
            <span className="inline-flex items-center gap-1 text-base uppercase tracking-tight text-black group-hover:text-[#4d7a17] transition-colors">
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              Previous Project
            </span>
            <span className="text-lg sm:text-2xl font-normal text-black group-hover:text-black line-clamp-1">
              {prev.title}
            </span>
            <span className="text-base text-black mt-1 line-clamp-1">
              {prev.kicker}
            </span>
          </Link>
        )}

        {next && (
          <Link
            href={`/commercial/case-studies/${next.slug}`}
            className="group flex flex-col items-end text-right p-6 sm:p-8 rounded-[24px] bg-[#FAFDF8] border border-[#DCE8D8] hover:bg-[#EEF6EB] hover:border-[#63B846]/40 transition-all duration-300"
          >
            <span className="inline-flex items-center gap-2 text-base uppercase tracking-tight text-black group-hover:text-[#4d7a17] transition-colors mb-2">
              Next Project
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
            <span className="text-lg sm:text-2xl font-normal text-black group-hover:text-black line-clamp-1">
              {next.title}
            </span>
            <span className="text-base text-black mt-1 line-clamp-1">
              {next.kicker}
            </span>
          </Link>
        )}
      </div>
    </nav>
  );
}
