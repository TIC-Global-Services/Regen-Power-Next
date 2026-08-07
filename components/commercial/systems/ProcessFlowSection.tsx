import React from "react";
import CommercialProcessFlow from "@/components/commercial/CommercialProcessFlow";
import type { ResolvedCommercialSystemsProcessFlow } from "@/lib/strapi/resolvers/commercial";

interface Props {
  resolved: ResolvedCommercialSystemsProcessFlow;
}

export default function ProcessFlowSection({ resolved }: Props) {
  return (
    <CommercialProcessFlow
      subtitle={resolved.subtitle}
      title={resolved.title}
      description={resolved.description}
      steps={resolved.steps.map((s) => ({
        stepNumber: s.stepNumber,
        title: s.title,
        description: s.description,
        image: s.image?.src || '/fallback.png',
      }))}
    />
  );
}
