import React from "react";
import FeatureSplitSection from "@/reuseables/FeatureSplitSection";
import type { ResolvedBrandsCriteriaList } from "@/lib/strapi/resolvers/brands";
import fallbackImg from "@/assets/solar/brands-tech/howitgoaway.png";

interface CriteriaListSectionProps {
  resolved: ResolvedBrandsCriteriaList;
}

const CriteriaListSection: React.FC<CriteriaListSectionProps> = ({ resolved }) => {
  const features = (resolved.items ?? []).map((item) => ({
    title: item.title,
    description: item.description,
    image: fallbackImg,
  }));

  if (features.length === 0) return null;

  return (
    <FeatureSplitSection
      subtitle={resolved.subtitle ?? ""}
      heading={resolved.title ?? ""}
      introText={resolved.introText ?? ""}
      features={features}
    />
  );
};

export default CriteriaListSection;
