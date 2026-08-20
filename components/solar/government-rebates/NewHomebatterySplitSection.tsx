import React from "react";
import FullscreenSplitSection from "@/reuseables/FullscreenSplitSection";
import type { ResolvedSharedSplitSection } from "@/lib/strapi/resolvers/shared";

interface Props {
  resolved: ResolvedSharedSplitSection;
}

export default function NewHomebatterySplitSection({ resolved }: Props) {
  return (
    <FullscreenSplitSection
      subtitle={resolved.subtitle}
      title={resolved.title}
      description={resolved.description}
      image={resolved.image?.src ?? ""}
      imageAlt=""
      textArrangement="center"
      imagePosition={resolved.imagePosition}
      badge={resolved.badge}
      titleClass="text-[2.5rem] md:text-6xl font-normal leading-[1] tracking-tight text-[#63B846]"
      subtitleClass="text-xl md:text-[2.125rem] tracking-tight capitalize"
      descriptionClass="text-xl md:text-xl leading-tight tracking-tight capitalize"
      
    />
  );
}
