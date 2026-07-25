import React from "react";
import Hero from "@/reuseables/Hero";
import type { ResolvedRebatesHero } from "@/lib/strapi/resolvers/rebates";

interface Props {
  resolved: ResolvedRebatesHero;
}

export default function RebatesHeroSection({ resolved }: Props) {
  return (
    <Hero
      mediaSrc={resolved.mediaSrc}
      mediaType="image"
      topSubtitle={resolved.subtitle}
      mainTitle={resolved.title}
      description={resolved.description}
      ctaText={resolved.ctaText}
      ctaLink={resolved.ctaLink}
      subtitleColor="text-white"
      titleColor="text-[#63B846]"
      descriptionColor="text-white/95"
      showOverlay
      heightClass="h-[600px]"
    />
  );
}
