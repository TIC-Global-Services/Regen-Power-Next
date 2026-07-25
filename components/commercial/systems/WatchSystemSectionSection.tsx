import React from "react";
import WatchSystemSection from "@/components/commercial/WatchSystemSection";
import type { ResolvedCommercialSystemsWatchSystemSection } from "@/lib/strapi/resolvers/commercial";

interface Props {
  resolved: ResolvedCommercialSystemsWatchSystemSection;
}

export default function WatchSystemSectionSection({ resolved }: Props) {
  return (
    <WatchSystemSection
      subtitle={resolved.subtitle}
      title={resolved.title}
      paragraphs={resolved.paragraphs}
      ctaText={resolved.ctaText || ""}
      ctaHref={resolved.ctaHref || "#"}
      image={resolved.image?.src ?? ''}
    />
  );
}
