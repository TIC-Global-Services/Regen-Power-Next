import React from "react";
import SixIndustriesSection from "@/components/commercial/SixIndustriesSection";
import type { ResolvedCommercialSystemsIndustriesSection } from "@/lib/strapi/resolvers/commercial";

interface Props {
  resolved: ResolvedCommercialSystemsIndustriesSection;
}

export default function IndustriesSection({ resolved }: Props) {
  return (
    <SixIndustriesSection
      subtitle={resolved.subtitle}
      title={resolved.title}
      industries={resolved.industries.map((ind) => ({
        title: ind.title,
        description: ind.description,
        caseStudy: ind.caseStudy,
        icon: ind.icon?.src ?? '',
      }))}
    />
  );
}
