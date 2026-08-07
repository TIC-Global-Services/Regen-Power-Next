import React from "react";
import CommercialForm from "@/components/commercial/CommercialForm";
import type { ResolvedCommercialSystemsCommercialForm } from "@/lib/strapi/resolvers/commercial";

interface Props {
  resolved: ResolvedCommercialSystemsCommercialForm;
}

export default function CommercialFormSection({ resolved }: Props) {
  return (
    <CommercialForm
      subtitle={resolved.subtitle}
      title={resolved.title}
      description={resolved.description}
      image={resolved.image?.src || '/fallback.png'}
    />
  );
}
