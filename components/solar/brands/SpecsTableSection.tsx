import React from "react";
import SectionHeader from "@/reuseables/SectionHeader";
import SpecTable from "@/reuseables/SpecTable";
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
      <div className="px-[5%] md:px-[3%] mx-auto">
        <SectionHeader
          subtitle={resolved.subtitle ?? ""}
          title={resolved.title ?? ""}
          description={resolved.description ?? ""}
          align="center"
          className="mb-8 hidden md:block"
          subtitleClass="text-base md:text-2xl tracking-tight text-black capitalize"
          titleClass="text-[2.5rem] md:text-[5rem] font-normal tracking-tight text-[#63B846]"
          descClass="text-sm md:text-xl leading-tight tracking-tight max-w-5xl whitespace-pre-line"
        />
        <SectionHeader
          subtitle={resolved.subtitle ?? ""}
          title={resolved.title ?? ""}
          description={resolved.description ?? ""}
          align="left"
          className="mb-8 md:hidden"
          subtitleClass="text-base md:text-2xl tracking-tight text-black capitalize"
          titleClass="text-[2.5rem] md:text-[5rem] font-normal tracking-tight text-[#63B846]"
          descClass="text-sm md:text-xl  leading-tight tracking-tight max-w-5xl whitespace-pre-line"
        />

        <SpecTable
          labelColumnTitle={resolved.labelColumnTitle || "Brand & Series"}
          columns={columns}
          rows={rows}
        />
      </div>
    </section>
  );
};

export default SpecsTableSection;
