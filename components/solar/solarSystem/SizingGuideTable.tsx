'use client';

import React, { useState } from "react";
import Image from "next/image";
import Reveal from "@/reuseables/Reveal";
import CtaButton from "@/reuseables/CtaButton";
import SectionHeader from "@/reuseables/SectionHeader";
import MissingImage from "@/reuseables/MissingImage";
import type { ResolvedSolarSizingGuideTable } from "@/lib/strapi/resolvers/solar";

interface SizingGuideTableProps {
  resolved: ResolvedSolarSizingGuideTable;
}

const SizingGuideTable: React.FC<SizingGuideTableProps> = ({ resolved }) => {
  const columns = resolved.columns;
  const rows = resolved.rows;
  const sizingCards = resolved.sizingCards;

  // Mobile: currently selected column (hidden on desktop)
  const [activeCol, setActiveCol] = useState(0);
  const active = Math.min(activeCol, Math.max(columns.length - 1, 0));

  return (
    <section className="py-16 md:py-24 bg-white border-t border-gray-50">
      <div className="px-[5%] md:px-[3%] mx-auto">
        <SectionHeader
          subtitle={resolved.subtitle}
          title={resolved.title}
          description={resolved.description}
          align="center"
          titleClass="text-[3.125rem] md:text-[5rem]"
          subtitleClass="font-normal text-xl md:text-[2.125rem]"
          descClass="max-w-3xl"
          className="mx-auto mb-8"
        />

        <div className="text-center">
          <Reveal delay={0.3} className="inline-block">
            <CtaButton
              href="#quote-form"
              text="Get A Sizing Recommendation For My Home"
              textColor="text-black"
            />
          </Reveal>
        </div>

        {rows.length > 0 ? (
          <>
            {/* Mobile: column pill picker + stacked rows */}
            <div className="md:hidden mt-12 mb-16">
              <div className="flex gap-2 mb-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {columns.map((col, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveCol(idx)}
                    className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                      idx === active
                        ? "bg-[#63B846] text-white"
                        : "bg-gray-100 text-black/60"
                    }`}
                  >
                    {col.title}
                  </button>
                ))}
              </div>
              <div className="rounded-[24px] overflow-hidden border border-[#E5E7EB]">
                {rows.map((row, rIdx) => (
                  <div
                    key={rIdx}
                    className={`flex justify-between items-center gap-4 px-4 py-3 border-b border-[#E5E7EB] last:border-b-0 ${
                      rIdx % 2 === 0 ? "bg-white" : "bg-[#F7FBF5]"
                    }`}
                  >
                    <span className="text-sm font-semibold text-black">
                      {row.label}
                    </span>
                    <span className="text-sm text-black/70 text-right max-w-[55%]">
                      {row.values[active]?.text ?? ""}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop: full table */}
            <div className="hidden md:block overflow-x-auto rounded-[24px] mt-12 mb-16 max-w-5xl mx-auto overflow-hidden">
            <table className="w-full border-collapse text-center bg-white">
              <thead>
                <tr className="bg-[#A0CF44] text-black font-[var(--font-aeonik)] h-[120px]">
                  <th className="p-5 text-lg md:text-2xl font-normal border-r border-b border-black w-1/4 align-middle">
                    {resolved.labelColumnTitle || "Daily Use"}
                  </th>
                  {columns.map((col, idx) => {
                    const isLastCol = idx === columns.length - 1;
                    return (
                      <th
                        key={idx}
                        className={`p-5 text-lg md:text-2xl font-normal border-b border-black w-1/4 align-middle ${isLastCol ? "" : "border-r"
                          }`}
                      >
                        {col.title}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, rIdx) => {
                  const isLastRow = rIdx === rows.length - 1;
                  return (
                    <tr key={rIdx} className="bg-[#EEF6EB] h-[120px]">
                      <td
                        className={`p-5 text-xl text-black border-r border-black align-middle ${isLastRow ? "" : "border-b"
                          }`}
                      >
                        {row.label}
                      </td>
                      {columns.map((col, idx) => {
                        const isLastCol = idx === columns.length - 1;
                        const value = row.values[idx]?.text ?? "";
                        return (
                          <td
                            key={idx}
                            className={`p-5 text-xl text-black align-middle ${idx === 0 ? "" : "font-light"
                              } border-black ${isLastRow ? "" : "border-b"} ${isLastCol ? "" : "border-r"
                              }`}
                          >
                            {value}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
            </div>
          </>
        ) : (
          <MissingImage label="Sizing table rows" aspect="aspect-[3/1] my-12 max-w-4xl mx-auto" />
        )}

        {sizingCards.length > 0 ? (
          <>
            {/* Mobile: Slider */}
            <div className="flex overflow-x-auto md:hidden gap-4 snap-x snap-mandatory pl-[5%] -mr-[5%] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pb-4">
              {sizingCards.map((card, idx) => (
                <Reveal
                  key={idx}
                  delay={idx * 0.15}
                  className="relative flex flex-col justify-end rounded-[24px] overflow-hidden group min-h-[380px] w-[75vw] shrink-0 snap-start"
                >
                  <div className="absolute inset-0 z-0">
                    {card.image ? (
                      <Image
                        src={card.image.src}
                        alt={card.image.alt}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <MissingImage
                        type="bgimage"
                        label="Sizing card image"
                        aspect="aspect-auto h-full"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                  </div>

                  <div className="relative z-10 w-full bg-black/5 backdrop-blur-md p-5 mt-auto text-left">
                    <h4 className="text-white text-xl leading-tight mb-2">
                      {card.title}
                    </h4>
                    <p className="text-base text-white leading-tight font-light">
                      {card.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Desktop: Grid */}
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {sizingCards.map((card, idx) => (
                <Reveal
                  key={idx}
                  delay={idx * 0.15}
                  className="relative flex flex-col lg:justify-end rounded-[24px] overflow-hidden group min-h-[400px] max-w-full md:w-[320px]"
                >
                  <div className="absolute inset-0 z-0">
                    {card.image ? (
                      <Image
                        src={card.image.src}
                        alt={card.image.alt}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <MissingImage
                        type="bgimage"
                        label="Sizing card image"
                        aspect="aspect-auto h-full"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                  </div>

                  <div className="relative z-10 w-full bg-black/5 backdrop-blur-md p-5 mt-auto text-left">
                    <h4 className="text-white text-xl leading-tight mb-2">
                      {card.title}
                    </h4>
                    <p className="text-base text-white leading-tight font-light">
                      {card.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </>
        ) : (
          <MissingImage type="bgimage" label="Sizing cards" aspect="aspect-[3/1]" />
        )}
      </div>
    </section>
  );
};

export default SizingGuideTable;
