import React from "react";
import StatsCardGrid from "@/reuseables/StatsCardGrid";
import type { ResolvedCommercialSystemsStatsCardGrid } from "@/lib/strapi/resolvers/commercial";

interface Props {
  resolved: ResolvedCommercialSystemsStatsCardGrid;
}

export default function StatsCardGridSection({ resolved }: Props) {
  return (
    <StatsCardGrid
      subtitle={resolved.subtitle}
      title={resolved.title}
      description={resolved.description}
      stats={resolved.stats.map((s) => ({ value: s.value, label: s.label }))}
      cardBackground={resolved.cardBackground?.src ?? ''}
      headerAlign="center"
    />
  );
}
