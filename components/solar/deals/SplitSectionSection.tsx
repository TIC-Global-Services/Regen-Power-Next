import React from "react";
import FullscreenSplitSection from "@/reuseables/FullscreenSplitSection";
import type { ResolvedSharedSplitSection } from "@/lib/strapi/resolvers/shared";

interface Props {
  resolved: ResolvedSharedSplitSection;
}

export default function SplitSectionSection({ resolved }: Props) {
  return (
    <FullscreenSplitSection
      subtitle={resolved.subtitle || 'fallback.png'}
      title={resolved.title}
      description={resolved.description}
      image={resolved.image?.src ?? ""}
      imageAlt=""
      textArrangement="center"
      imagePosition={resolved.imagePosition}
      badge={resolved.badge}
    />
  );
}
