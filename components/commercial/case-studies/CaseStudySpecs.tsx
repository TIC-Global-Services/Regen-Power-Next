"use client";

import React from "react";
import type { CaseStudyTable } from "@/utils/case-studies-data";
import CaseTable from "@/reuseables/case-study-table";

interface Props {
  tables: CaseStudyTable[];
}

export default function CaseStudySpecs({ tables }: Props) {
  if (!tables || tables.length === 0) return null;

  const hasWideTable = tables.some(
    (table) => (table.headers?.length ?? table.rows?.[0]?.length ?? 0) > 6
  );

  return (
    <section className="px-[5%] md:px-[3%] pb-20 md:pb-28 bg-white">
      <div
        className={`space-y-12 ${
          hasWideTable ? "w-full" : "max-w-6xl w-full"
        }`}
      >
        <div className={hasWideTable ? "max-w-6xl  w-full" : ""}>
          <span className="text-xs uppercase tracking-widest text-[#4d7a17] font-semibold">
            System Data & Financials
          </span>
          <h2 className="text-3xl sm:text-4xl font-normal tracking-tight text-black mt-2">
            Technical Specifications & Performance
          </h2>
        </div>

        <div className="space-y-12 w-full">
          {tables.map((table, tIdx) => {
            const columnCount =
              table.headers?.length ?? table.rows?.[0]?.length ?? 0;
            const isTableFullWidth = columnCount > 6;

            const labelColumnTitle =
              table.headers && table.headers.length > 0
                ? table.headers[0]
                : "Specification";

            const columns =
              table.headers && table.headers.length > 1
                ? table.headers.slice(1).map((h) => ({ title: String(h) }))
                : table.rows[0]?.length > 1
                ? Array.from(
                    { length: table.rows[0].length - 1 },
                    (_, i) => ({ title: `Value ${i + 1}` })
                  )
                : [{ title: "Details" }];

            const rows = table.rows.map((row) => ({
              label: String(row[0] ?? ""),
              values: columns.map((_, idx) => ({
                text: String(row[idx + 1] ?? "—"),
              })),
            }));

            return (
              <div
                key={table.id || tIdx}
                className={
                  isTableFullWidth ? "w-full" : "max-w-5xl  w-full"
                }
              >
                {table.title && (
                  <h3 className="text-xl sm:text-2xl font-medium tracking-tight text-black flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#63B846]" />
                    <span>{table.title}</span>
                  </h3>
                )}

                <CaseTable
                  labelColumnTitle={labelColumnTitle}
                  columns={columns}
                  rows={rows}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

