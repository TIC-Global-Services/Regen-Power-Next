"use client";
import React, { useState } from 'react';

export interface ComparisonColumn {
  heading: string;
  isHighlighted?: boolean;
}

export interface ComparisonRow {
  label: string;
  values: string[];
}

export interface ComparisonTableData {
  topSubtitle: string;
  title: string;
  description?: string;
  columns: ComparisonColumn[];
  rows: ComparisonRow[];
  labelColumnBg?: string;
}

const ComparisonTable = ({ data }: { data: ComparisonTableData }) => {
  const [activeCol, setActiveCol] = useState(0);
  const labelBg = data.labelColumnBg || 'transparent';
  const labelText = data.labelColumnBg ? 'white' : 'black';

  return (
    <section className="bg-white py-16 md:py-24 px-[5%]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h3 className="text-xl md:text-[2rem] text-black font-normal mb-1 tracking-tight">
            {data.topSubtitle}
          </h3>
          <h2 className="text-4xl md:text-5xl lg:text-[5rem] text-[#63B846] font-normal tracking-tight leading-[1.1] mb-4">
            {data.title}
          </h2>
          {data.description && (
            <p className="text-sm md:text-base text-black/70 max-w-2xl mx-auto leading-relaxed">
              {data.description}
            </p>
          )}
        </div>

        {/* Mobile Column Selector */}
        <div className="flex md:hidden gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
          {data.columns.map((col, idx) => (
            <button
              key={idx}
              onClick={() => setActiveCol(idx)}
              className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                idx === activeCol
                  ? 'bg-[#63B846] text-white'
                  : 'bg-gray-100 text-black/60'
              }`}
            >
              {col.heading}
            </button>
          ))}
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block rounded-[20px] overflow-hidden border border-[#E5E7EB]">
          {/* Table Header */}
          <div
            className="grid bg-[#EEF6EB]"
            style={{ gridTemplateColumns: `1.2fr repeat(${data.columns.length}, 1fr)` }}
          >
            {/* <div className="p-4 lg:p-5 flex items-center" style={{ backgroundColor: labelBg }}>
              <span className="text-sm lg:text-base font-semibold" style={{ color: labelText }}>Brand &amp; Model</span>
            </div> */}
            {data.columns.map((col, idx) => (
              <div
                key={idx}
                className={`p-4 lg:p-5 text-center text-sm lg:text-base font-semibold border-l border-[#D4E8CB] text-black ${idx==0 ?'bg-[#63B846] text-white':''}`}
              >
                {col.heading}
              </div>
            ))}
          </div>

          {/* Table Rows */}
          {data.rows.map((row, rIdx) => (
            <div
              key={rIdx}
              className={`grid ${rIdx == 0 ? 'bg-[#63B846] text-white':''} ${rIdx % 2 === 0 ? 'bg-white' : 'bg-[#F7FBF5]'}`}
              style={{ gridTemplateColumns: `1.2fr repeat(${data.columns.length}, 1fr)` }}
            >
              <div className="p-4 lg:p-5 text-sm lg:text-base font-semibold border-t border-[#E5E7EB]" style={{ backgroundColor: labelBg, color: labelText }}>
                {row.label}
              </div>
              {row.values.map((val, vIdx) => (
                <div
                  key={vIdx}
                  className="p-4 lg:p-5 text-sm lg:text-base text-center text-black/80 border-t border-l border-[#E5E7EB]"
                >
                  {val}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Mobile Table */}
        <div className="md:hidden rounded-[20px] overflow-hidden border border-[#E5E7EB]">
          {/* Mobile Header */}
          <div className="bg-[#EEF6EB] p-4 text-center font-semibold text-base text-black border-b border-[#D4E8CB]">
            {data.columns[activeCol]?.heading}
          </div>
          {data.rows.map((row, rIdx) => (
            <div
              key={rIdx}
              className={`flex justify-between items-center p-4 border-b border-[#E5E7EB] last:border-b-0 ${
                rIdx % 2 === 0 ? 'bg-white' : 'bg-[#F7FBF5]'
              }`}
            >
              <span className="text-sm font-semibold" style={{ color: labelText }}>{row.label}</span>
              <span className="text-sm text-black/70 text-right max-w-[50%]">{row.values[activeCol]}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ComparisonTable;
