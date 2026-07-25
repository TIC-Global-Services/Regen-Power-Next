import React from "react";
import SixComponentsSection from "@/components/commercial/SixComponentsSection";
import type { ResolvedCommercialSystemsComponentsSection } from "@/lib/strapi/resolvers/commercial";

interface Props {
  resolved: ResolvedCommercialSystemsComponentsSection;
}

export default function ComponentsSectionSection({ resolved }: Props) {
  return (
    <SixComponentsSection
      subtitle={resolved.subtitle || "Six Components"}
      title={resolved.title}
      description={resolved.description}
      backgroundImage={resolved.backgroundImage?.src ?? ''}
      items={resolved.items.map((item) => ({
        letter: item.letter,
        title: item.title,
      }))}
    />
  );
}
