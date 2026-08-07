import React from "react";
import FeatureCardGrid from "@/reuseables/FeatureCardGrid";
import type { ResolvedCommercialSystemsFeatureCardGrid } from "@/lib/strapi/resolvers/commercial";

interface Props {
  resolved: ResolvedCommercialSystemsFeatureCardGrid;
}

export default function FeatureCardGridSection({ resolved }: Props) {
  return (
    <FeatureCardGrid
      topSubtitle={resolved.topSubtitle}
      title={resolved.title}
      bottomSubtitle={resolved.bottomSubtitle}
      showReadMore={true}
      cards={resolved.cards.map((c) => ({
        title: c.title,
        description: c.description,
        image: c.image?.src ?? '/fallback.png',
        textPosition: (c.textPosition as "top" | "bottom") || "top",
        footerTitle: c.footerTitle || undefined,
        footerDescription: c.footerDescription || undefined,
      }))}
    />
  );
}
