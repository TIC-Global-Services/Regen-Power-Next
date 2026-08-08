import React from "react";
import SectionHeader from "@/reuseables/SectionHeader";
import Reveal from "@/reuseables/Reveal";
import type { ResolvedBrandsSpecsTable } from "@/lib/strapi/resolvers/brands";

interface SpecsTableSectionProps {
  resolved: ResolvedBrandsSpecsTable;
}

const SpecsTableSection: React.FC<SpecsTableSectionProps> = ({ resolved }) => {
  const columns = resolved.columns ?? [];
  const rows = resolved.rows ?? [];

  if (columns.length === 0 || rows.length === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-white border-t border-gray-50">
      <div className="px-[5%] mx-auto">
        <SectionHeader
          subtitle={resolved.subtitle ?? ""}
          title={resolved.title ?? ""}
          description={resolved.description ?? ""}
          align="left"
          className="mb-8"
          subtitleClass="text-base md:text-xl lg:text-2xl normal-case block text-black mb-2"
          titleClass="text-4xl md:text-[5.5rem] font-normal leading-none tracking-tight text-[#63B846]"
          descClass="text-xl leading-tight"
        />

        <Reveal className="rounded-[24px] mt-12 mb-16  overflow-x-auto">
          <table className="w-full h-[500px] border-collapse text-center bg-white">
            <thead>
              <tr className="h-[100px]">
                <th className="bg-[#A0CF44] text-black font-normal p-4 text-xl tracking-tight border-r border-b border-black w-[15%]">
                  {resolved.labelColumnTitle || "Brand & Series"}
                </th>
                {columns.map((col, idx) => {
                  const isLastCol = idx === columns.length - 1;
                  return (
                    <th
                      key={idx}
                      className={`bg-[#EEF6EB]/60 p-2 text-black font-normal text-base border-b border-black ${
                        isLastCol ? "" : "border-r"
                      } overflow-hidden `}
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
                  <td className={`bg-[#A0CF44] text-black font-normal p-4 text-xl border-r border-black ${isLastRow ? "" : "border-b"}`}>
                    {row.label}
                  </td>
                  {columns.map((col, idx) => {
                    const isLastCol = idx === columns.length - 1;
                    const value = row.values[idx]?.text ?? "";
                    return (
                      <td
                        key={idx}
                        className={`bg-[#EEF6EB]/30 p-4 text-black font-normal text-xl border-black ${
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
      </div>
    </section>
  );
};

export default SpecsTableSection;
