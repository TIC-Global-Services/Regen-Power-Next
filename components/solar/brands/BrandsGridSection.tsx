import React from "react";
import StaggeredCardsGrid, {
  type ColumnConfig,
} from "@/reuseables/StaggeredCardsGrid";
import type { ResolvedBrandsGrid } from "@/lib/strapi/resolvers/brands";

interface BrandsGridSectionProps {
  resolved: ResolvedBrandsGrid;
}

const BrandsGridSection: React.FC<BrandsGridSectionProps> = ({ resolved }) => {
  const cards = resolved.cards ?? [];

  if (cards.length === 0) return null;

  const columns: ColumnConfig[] = [0, 1, 2].map((colIdx) => {
    const first = cards[colIdx];
    const second = cards[colIdx + 3];
    const items: ColumnConfig["items"] = [];

    if (colIdx === 2) items.push("spacer");

    if (first) {
      items.push({
        title: first.title,
        subtitle: first.subtitle ?? undefined,
        middleTitle: first.middleTitle ?? undefined,
        desc: first.description ?? "",
        isDark: first.isDark ?? undefined,
        delay: 0.1,
      });
    }

    if (colIdx === 0) items.push("spacer");

    if (second) {
      items.push({
        title: second.title,
        subtitle: second.subtitle ?? undefined,
        middleTitle: second.middleTitle ?? undefined,
        desc: second.description ?? "",
        isDark: second.isDark ?? undefined,
        delay: 0.15,
      });
    }

    return { items };
  });

  return (
    <StaggeredCardsGrid
      subtitle={resolved.subtitle ?? ""}
      title={resolved.title ?? ""}
      badge={resolved.badge ?? undefined}
      columns={columns}
      align="center"
      className="border-t border-gray-50"
      spacerHeightClass="h-[310px]"
      cardHeightClass="h-[310px] md:h-[320px]"
      enableMobileSlider={true}
    />
  );
};

export default BrandsGridSection;
