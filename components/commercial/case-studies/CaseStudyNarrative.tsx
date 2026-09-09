"use client";

import React from "react";
import type { CaseStudyDetail, CaseStudyNarrativeSection } from "@/utils/case-studies-data";

interface Props {
  details?: CaseStudyDetail[];
  // Backward compatibility props
  findYourWay?: CaseStudyNarrativeSection;
  systemArchitecture?: CaseStudyNarrativeSection;
}

export default function CaseStudyNarrative({
  details,
  findYourWay,
  systemArchitecture,
}: Props) {
  // Normalize items from either the new casestudydetails array or legacy narrative props
  const items: CaseStudyDetail[] = React.useMemo(() => {
    if (details && details.length > 0) {
      return details;
    }
    const legacy: CaseStudyDetail[] = [];
    if (findYourWay?.paragraphs && findYourWay.paragraphs.length > 0) {
      legacy.push({
        title: findYourWay.title || "Find Your Way",
        details: findYourWay.paragraphs.join("\n\n"),
      });
    }
    if (systemArchitecture?.paragraphs && systemArchitecture.paragraphs.length > 0) {
      legacy.push({
        title: systemArchitecture.title || "System Architecture",
        details: systemArchitecture.paragraphs.join("\n\n"),
      });
    }
    return legacy;
  }, [details, findYourWay, systemArchitecture]);

  if (!items || items.length === 0) return null;

  return (
    <section className="px-[5%] md:px-[3%]  pb-20 md:pb-28 lg:pb-32 bg-white">
      {/* 2-column Grid displaying n titles and descriptions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 lg:gap-16 items-start">
        {items.map((item, index) => {
          // Parse multi-paragraph details cleanly
          const paragraphs = Array.isArray(item.details)
            ? item.details
            : typeof item.details === "string"
            ? item.details
                .split(/\n\n+|\n/)
                .map((p) => p.trim())
                .filter(Boolean)
            : [String(item.details)];

          if (!item.title && paragraphs.length === 0) return null;

          return (
            <article
              key={`${item.title}-${index}`}
              className="flex flex-col space-y-4 group"
            >
              {/* Section Header */}
              {item.title && (
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#63B846] shrink-0" />
                  <h2 className="text-2xl sm:text-3xl font-normal tracking-tight text-neutral-900 leading-snug capitalize">
                    {item.title.toLowerCase() === item.title.toUpperCase()
                      ? item.title
                      : item.title}
                  </h2>
                </div>
              )}

              {/* Section Paragraphs */}
              <div className="space-y-4 text-sm sm:text-base text-neutral-700 leading-[1.2] font-normal">
                {paragraphs.map((para, pIdx) => (
                  <p key={pIdx}>{para}</p>
                ))}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
