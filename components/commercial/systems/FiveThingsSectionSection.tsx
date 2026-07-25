import React from "react";
import FiveThingsSection from "@/components/commercial/FiveThingsSection";
import type { ResolvedCommercialSystemsFiveThingsSection } from "@/lib/strapi/resolvers/commercial";

interface Props {
  resolved: ResolvedCommercialSystemsFiveThingsSection;
}

export default function FiveThingsSectionSection({ resolved }: Props) {
  return (
    <FiveThingsSection
      subtitle={resolved.subtitle}
      title={resolved.title}
      description={resolved.description}
      items={resolved.items.map((item) => ({
        number: item.number,
        title: item.title,
        description: item.description,
        highlight: item.highlight || false,
      }))}
    />
  );
}
