'use client';

import React, { useEffect, useId, useRef, useState } from "react";
import { motion } from "framer-motion";
import Reveal from "@/reuseables/Reveal";
import FadeSwap from "@/reuseables/FadeSwap";

interface SpecColumn {
  title: string;
}
interface SpecRow {
  label: string;
  values: { text: string }[];
}
interface SpecTableProps {
  labelColumnTitle: string;
  columns: SpecColumn[];
  rows: SpecRow[];
}

const SpecTable: React.FC<SpecTableProps> = ({
  labelColumnTitle,
  columns,
  rows,
}) => {
  // Mobile: currently selected brand/series column (hidden on desktop)
  const [activeCol, setActiveCol] = useState(0);
  const pillsRef = useRef<HTMLDivElement>(null);
  const pillRefs = useRef<Record<number, HTMLButtonElement | null>>({});
  const trackId = useId();

  const active = Math.min(activeCol, columns.length - 1);

  // Smoothly center the active pill in view — carousel feel on mobile.
  useEffect(() => {
    pillRefs.current[active]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [active]);

  if (columns.length === 0 || rows.length === 0) return null;

  return (
    <>
      {/* ── Mobile only: brand/series pill picker + stacked rows (below md) ── */}
      <div className="md:hidden mt-12 mb-16">
        {/* Craftsmanship-style segmented pill track — scrollable, snap, auto-centering */}
        <div
          ref={pillsRef}
          className="flex items-center gap-1 overflow-x-auto rounded-full bg-[#63B8461A] p-1 py-2 mb-4 snap-x [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {columns.map((col, idx) => {
            const isActive = idx === active;
            return (
              <button
                key={idx}
                ref={(el) => {
                  pillRefs.current[idx] = el;
                }}
                type="button"
                onClick={() => setActiveCol(idx)}
                className={`relative shrink-0 whitespace-nowrap snap-start px-3 lg:px-5 py-1.5 md:py-2 text-xs md:text-sm font-medium rounded-full transition-colors duration-200 cursor-pointer ${
                  isActive
                    ? "text-white"
                    : "text-gray-600 hover:text-black"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId={`${trackId}-spec-pill`}
                    className="absolute left-0 right-0 -top-1 -bottom-1 bg-[#63B846] rounded-full"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{col.title}</span>
              </button>
            );
          })}
        </div>

        <FadeSwap swapKey={active}>
          <div className="rounded-[24px] overflow-hidden border border-[#E5E7EB]">
            {rows.map((row, rIdx) => (
              <div
                key={rIdx}
                className={`flex justify-between items-center gap-4 px-4 py-3 border-b border-[#E5E7EB] last:border-b-0 ${
                  rIdx % 2 === 0 ? "bg-white" : "bg-[#F7FBF5]"
                }`}
              >
                <span className="text-sm md:text-base font-semibold text-black">
                  {row.label}
                </span>
                <span className="text-sm md:text-base text-black/70 text-right max-w-[55%]">
                  {row.values[active]?.text ?? ""}
                </span>
              </div>
            ))}
          </div>
        </FadeSwap>
      </div>

      {/* ── Full table — shows on iPad (md+) and desktop; phones get the picker above ── */}
      <Reveal className="hidden md:block rounded-[24px] mt-16 overflow-x-auto">
        <table className="w-full border-collapse text-center bg-white">
          <thead>
            <tr className="h-[70px] lg:h-[100px]">
              <th className="bg-[#A0CF44] text-black font-normal p-4 text-base lg:text-2xl tracking-tight border-r border-b border-black w-[15%]">
                {labelColumnTitle}
              </th>
              {columns.map((col, idx) => {
                const isLastCol = idx === columns.length - 1;
                return (
                  <th
                    key={idx}
                    className={`bg-[#EEF6EB]/60 p-2 text-black font-normal text-sm lg:text-xl tracking-tight border-b border-black ${
                      isLastCol ? "" : "border-r"
                    } overflow-hidden whitespace-pre-line `}
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
                <tr
                  key={rIdx}
                  className="hover:bg-[#EEF6EB]/80 transition-colors h-[60px] lg:h-[100px]"
                >
                  <td
                    className={`bg-[#A0CF44] text-black font-normal p- text-base lg:text-2xl border-r border-black ${
                      isLastRow ? "" : "border-b"
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
                        className={`bg-[#EEF6EB]/30 p-0 text-black font-normal text-xs lg:text-xl border-black ${
                          isLastRow ? "" : "border-b"
                        } ${isLastCol ? "" : "border-r"}`}
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
      </Reveal>
    </>
  );
};

export default SpecTable;