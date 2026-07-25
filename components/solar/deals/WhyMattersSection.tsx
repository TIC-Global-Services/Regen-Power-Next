import React from "react";
import FeatureSplitSection from "@/reuseables/FeatureSplitSection";
import type { ResolvedDealsWhyMatters } from "@/lib/strapi/resolvers/deals";

interface Props {
  resolved: ResolvedDealsWhyMatters;
}

export default function WhyMattersSection({ resolved }: Props) {
  const features = resolved.items.map((item) => ({
    title: item.title,
    description: item.description,
    image: item.image,
  }));

  return (
    <FeatureSplitSection
      subtitle={resolved.subtitle || ""}
      heading={resolved.heading || ""}
      introText={resolved.introText || ""}
      features={features}
    />
  );
}
