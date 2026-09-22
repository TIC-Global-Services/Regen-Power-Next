import React from "react";
import SectionHeader from "@/reuseables/SectionHeader";
import type { ResolvedSmartHomeCompatibilityMatrix } from "@/lib/strapi/resolvers/smart-home-battery";

interface Props {
  data: ResolvedSmartHomeCompatibilityMatrix;
}

const LEVEL_ICON: Record<string, string> = {
  full: "●", // ●
  partial: "◐", // ◐
  limited: "○", // ○
  none: "",
};

const CompatibilityMatrix: React.FC<Props> = ({ data }) => {
  if (data.rows.length === 0) return null;

  return (
    <section className="py-12 md:py-20 bg-white overflow-hidden">
      <div className="px-[5%] md:px-[3%]">
        <SectionHeader
          subtitle={data.subtitle}
          title={data.title}
          description={data.description}
          align="center"
          descClass="mx-auto md:text-lg"
          subtitleClass="text-xl md:text-3xl font-light text-black tracking-tight"
          titleClass="text-[2.5rem] md:text-6xl text-[#63B846] font-normal leading-none"
          className="mb-10 md:mb-14"
        />

        <div className="overflow-x-auto rounded-2xl min-w-[520px] mx-auto max-w-5xl">
          <table className=" w-full mx-auto border-separate border-spacing-0 text-sm md:text-base">
            <thead>
              <tr>
                <th className="text-left font-normal border-r border-black/60 text-black py-4 px-5 bg-[#8BC63F] whitespace-nowrap">
                  Battery
                </th>
                {data.columns.map((col, idx) => (
                  <th
                    key={idx}
                    className={`text-center font-normal ${idx < data.columns.length - 1 ? "border-r" : ""} border-black/60 text-black py-4 px-5 bg-[#EEF6EB] whitespace-nowrap`}
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.rows.map((row, rowIdx) => (
                <tr key={rowIdx}>
                  <td className="text-left font-normal text-black border-t border-r border-black/60 py-4 px-5 bg-[#8BC63F] whitespace-nowrap">
                    {row.battery}
                  </td>
                  {row.cells.map((cell, cellIdx) => (
                    <td
                      key={cellIdx}
                      className={`text-center text-black py-4 px-5 bg-[#EEF6EB] border-t ${cellIdx < row.cells.length - 1 ? "border-r" : ""} border-black/60 whitespace-nowrap`}
                    >
                      {cell.level === "none" ? (
                        <span className="text-black/50">&mdash;</span>
                      ) : (
                        <>
                          <span className="mr-1.5">{LEVEL_ICON[cell.level]}</span>
                          {cell.label}
                        </>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {data.footerText && (
          <p className="text-center text-black text-sm md:text-base leading-relaxed max-w-3xl mx-auto mt-8">
            {data.footerText}
          </p>
        )}
      </div>
    </section>
  );
};

export default CompatibilityMatrix;
