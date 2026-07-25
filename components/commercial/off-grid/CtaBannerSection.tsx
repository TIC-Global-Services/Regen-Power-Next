import React from "react";
import CtaSection from "@/reuseables/CtaSection";
import type { ResolvedSharedCtaBanner } from "@/lib/strapi/resolvers/shared";

interface Props {
  resolved: ResolvedSharedCtaBanner;
}

export default function CtaBannerSection({ resolved }: Props) {
  return (
    <CtaSection
      subtitle={resolved.subtitle}
      title={resolved.mainTitle}
      description={resolved.description}
      buttonText={resolved.buttonText}
      buttonHref={resolved.buttonHref}
      bgImage={resolved.bgImage || undefined}
    />
  );
}
