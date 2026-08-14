import React from "react";
import FeatureCardGrid from "@/reuseables/FeatureCardGrid";
import type { ResolvedDealsWaysToPay } from "@/lib/strapi/resolvers/deals";

interface Props {
  resolved: ResolvedDealsWaysToPay;
}

export default function WaysToPaySection({ resolved }: Props) {
  const cards = resolved.cards.map((card) => ({
    title: card.title,
    description: card.description,
    image: card.image,
    footerTitle: card.footerTitle || "",
    footerDescription: card.footerDescription || "",
  }));

  return (
    <FeatureCardGrid
      topSubtitle={resolved.topSubtitle || ""}
      title={resolved.title || ""}
      bottomSubtitle={resolved.bottomSubtitle || ""}
      cards={cards}
      showReadMore={false}
      showDescriptionInactive
    />
  );
}
