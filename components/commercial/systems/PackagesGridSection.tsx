import React from "react";
import PackagesGrid from "@/reuseables/PackagesGrid";
import type { ResolvedCommercialSystemsPackagesGrid } from "@/lib/strapi/resolvers/commercial";

interface Props {
  resolved: ResolvedCommercialSystemsPackagesGrid;
}

export default function PackagesGridSection({ resolved }: Props) {
  return (
    <PackagesGrid
      subtitle={resolved.subtitle}
      title={resolved.title}
      description={resolved.description}
      packages={resolved.packages.map((pkg) => ({
        title: pkg.title,
        desc: pkg.desc,
        bgClass: pkg.bgClass,
        items: pkg.items.map((item) => ({
          label: item.label,
          value: item.value,
        })),
      }))}
    />
  );
}
