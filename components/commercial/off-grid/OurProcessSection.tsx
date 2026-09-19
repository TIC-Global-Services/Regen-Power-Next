import React from "react";
import EvAccordion from "@/components/EvCharging/EvAccordion";
import type { ResolvedCommercialOffGridOurProcess } from "@/lib/strapi/resolvers/commercial";

interface Props {
  resolved: ResolvedCommercialOffGridOurProcess;
}

export default function OurProcessSection({ resolved }: Props) {
  return (
    <EvAccordion
      data={{
        subtitle: resolved.subtitle,
        title: resolved.title,
        steps: resolved.steps,
      }}
    />
  );
}
