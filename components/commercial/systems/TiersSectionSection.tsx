import React from "react";
import ThreeTiersSection from "@/components/commercial/ThreeTiersSection";
import type { ResolvedCommercialSystemsTiersSection } from "@/lib/strapi/resolvers/commercial";

interface Props {
  resolved: ResolvedCommercialSystemsTiersSection;
}

export default function TiersSection({ resolved }: Props) {
  return (
    <ThreeTiersSection
      subtitle={resolved.subtitle}
      title={resolved.title}
      description={resolved.description}
      tiers={resolved.tiers.map((t) => ({
        title: t.title,
        subtitle: t.subtitle,
        description: t.description,
        image: t.image?.src ?? '/fallback.png',
        details: t.details.map((d) => ({ label: d.label, value: d.value })),
        ctaText: t.ctaText,
        ctaHref: t.ctaHref,
      }))}
    />
  );
}
