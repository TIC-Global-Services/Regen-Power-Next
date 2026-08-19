'use client';

import React, { useState } from "react";
import Reveal from "@/reuseables/Reveal";

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

  if (columns.length === 0 || rows.length === 0) return null;

  const active = Math.min(activeCol, columns.length - 1);

  return (
    <>
      {/* ── Mobile: brand/series pill picker + stacked rows ── */}
      <div className="md:hidden mt-12 mb-16">
        <div
          className="flex gap-2 mb-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
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

      {/* ── Desktop: full table (unchanged) ── */}
      <Reveal className="hidden md:block rounded-[24px] mt-12 mb-16 overflow-x-auto">
        <table className="w-full border-collapse text-center bg-white">
          <thead>
            <tr className="h-[100px]">
              <th className="bg-[#A0CF44] text-black font-normal p-4 text-2xl tracking-tight border-r border-b border-black w-[15%]">
                {labelColumnTitle}
              </th>
              {columns.map((col, idx) => {
                const isLastCol = idx === columns.length - 1;
                return (
                  <th
                    key={idx}
                    className={`bg-[#EEF6EB]/60 p-2 text-black font-normal text-xl tracking-tight border-b border-black ${
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
                  className="hover:bg-[#EEF6EB]/80 transition-colors h-[100px]"
                >
                  <td
                    className={`bg-[#A0CF44] text-black font-normal p- text-2xl border-r border-black ${
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
                        className={`bg-[#EEF6EB]/30 p-0 text-black font-normal text-xl border-black ${
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