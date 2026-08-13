import React from "react";
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
  return (
    <Reveal className="rounded-[24px] mt-12 mb-16 overflow-x-auto">
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
                <td
                  className={`bg-[#A0CF44] text-black font-normal p-4 text-2xl border-r border-black ${
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
  );
};

export default SpecTable;
