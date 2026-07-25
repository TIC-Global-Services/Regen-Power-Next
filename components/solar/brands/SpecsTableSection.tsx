import React from "react";
import SectionHeader from "@/reuseables/SectionHeader";
import Reveal from "@/reuseables/Reveal";
import type { ResolvedBrandsSpecsTable } from "@/lib/strapi/resolvers/brands";

interface SpecsTableSectionProps {
  resolved: ResolvedBrandsSpecsTable;
}

const SpecsTableSection: React.FC<SpecsTableSectionProps> = ({ resolved }) => {
  const columns = resolved.columns ?? [];

  if (columns.length === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-white border-t border-gray-50">
      <div className="px-[5%] mx-auto">
        <SectionHeader
          subtitle={resolved.subtitle ?? ""}
          title={resolved.title ?? ""}
          description={resolved.description ?? ""}
          align="left"
          className="mb-8"
          subtitleClass="text-base md:text-xl lg:text-2xl normal-case block text-black"
          titleClass="text-4xl md:text-[5.5rem] font-normal leading-none tracking-tight text-[#63B846]"
          descClass="text-xl leading-tight"
        />

        <Reveal className="rounded-[24px] mt-12 mb-16 max-w-7xl mx-auto overflow-hidden">
          <table className="w-full h-[500px] border-collapse text-center bg-white table-fixed">
            <thead>
              <tr className="h-[100px]">
                <th className="bg-[#A0CF44] text-black font-normal p-4 text-xl tracking-tight border-r border-b border-black w-[15%]">
                  Brand & Series
                </th>
                {columns.map((col, idx) => {
                  const isLastCol = idx === columns.length - 1;
                  return (
                    <th
                      key={idx}
                      className={`bg-[#EEF6EB]/60 p-4 text-black font-normal text-xl border-b border-black ${
                        isLastCol ? "" : "border-r"
                      } overflow-hidden truncate`}
                    >
                      {col.brand}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-[#EEF6EB]/80 transition-colors h-[100px]">
                <td className="bg-[#A0CF44] text-black font-normal p-4 text-xl border-r border-b border-black">
                  Efficiency
                </td>
                {columns.map((col, idx) => {
                  const isLastCol = idx === columns.length - 1;
                  return (
                    <td
                      key={`e-${idx}`}
                      className={`bg-[#EEF6EB]/30 p-4 text-black font-normal text-xl border-b border-black ${
                        isLastCol ? "" : "border-r"
                      }`}
                    >
                      {col.efficiency ?? ""}
                    </td>
                  );
                })}
              </tr>

              <tr className="hover:bg-[#EEF6EB]/80 transition-colors h-[100px]">
                <td className="bg-[#A0CF44] text-black font-normal p-4 text-xl border-r border-b border-black">
                  Temp Coeff
                </td>
                {columns.map((col, idx) => {
                  const isLastCol = idx === columns.length - 1;
                  return (
                    <td
                      key={idx}
                      className={`bg-[#EEF6EB]/30 p-4 text-black font-normal text-xl border-b border-black ${
                        isLastCol ? "" : "border-r"
                      }`}
                    >
                      {col.tempCoeff ?? ""}
                    </td>
                  );
                })}
              </tr>

              <tr className="hover:bg-[#EEF6EB]/80 transition-colors h-[100px]">
                <td className="bg-[#A0CF44] text-black font-normal p-4 text-xl border-r border-b border-black">
                  Degradation
                </td>
                {columns.map((col, idx) => {
                  const isLastCol = idx === columns.length - 1;
                  return (
                    <td
                      key={idx}
                      className={`bg-[#EEF6EB]/30 p-4 text-black font-normal text-xl border-b border-black ${
                        isLastCol ? "" : "border-r"
                      }`}
                    >
                      {col.degradation ?? ""}
                    </td>
                  );
                })}
              </tr>

              <tr className="hover:bg-[#EEF6EB]/80 transition-colors h-[100px]">
                <td className="bg-[#A0CF44] text-black font-normal p-4 text-xl border-r border-black">
                  Warranty
                </td>
                {columns.map((col, idx) => {
                  const isLastCol = idx === columns.length - 1;
                  return (
                    <td
                      key={idx}
                      className={`bg-[#EEF6EB]/30 p-4 text-black font-normal text-xl border-black ${
                        isLastCol ? "" : "border-r"
                      }`}
                    >
                      {col.warranty ?? ""}
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>
        </Reveal>
      </div>
    </section>
  );
};

export default SpecsTableSection;
