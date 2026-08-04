import React from "react";
import ComparisonTable, {
  type ComparisonTableData,
} from "@/components/battery/battery-product/ComparisonTable";
import type { ResolvedBrandsSpecsTable } from "@/lib/strapi/resolvers/brands";

interface SpecsTableSectionProps {
  resolved: ResolvedBrandsSpecsTable;
}

const SpecsTableSection: React.FC<SpecsTableSectionProps> = ({ resolved }) => {
  const columns = resolved.columns ?? [];

  if (columns.length === 0) return null;

  const comparisonData: ComparisonTableData = {
    topSubtitle: resolved.subtitle ?? "",
    title: resolved.title ?? "",
    description: resolved.description ?? "",
    labelColumnBg: "#A0CF44",
    columns: [
      { heading: "Brand & Series" },
      ...columns.map((col) => ({ heading: col.brand })),
    ],
    rows: [
      {
        label: "Efficiency",
        values: columns.map((col) => col.efficiency),
      },
      {
        label: "Temp Coeff",
        values: columns.map((col) => col.tempCoeff),
      },
      {
        label: "Degradation",
        values: columns.map((col) => col.degradation),
      },
      {
        label: "Warranty",
        values: columns.map((col) => col.warranty),
      },
    ],
  };

  return <ComparisonTable data={comparisonData} />;
};

export default SpecsTableSection;
