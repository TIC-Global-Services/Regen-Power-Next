import React from "react";
import Hero from "@/reuseables/Hero";
import type { ResolvedCommercialSystemsHero } from "@/lib/strapi/resolvers/commercial";

interface Props {
  resolved: ResolvedCommercialSystemsHero;
}

export default function HeroSection({ resolved }: Props) {
  return (
    <Hero
      mediaSrc={resolved.mediaSrc}
      mediaType="image"
      topSubtitle={resolved.topSubtitle}
      mainTitle={resolved.mainTitle}
      description={resolved.description}
      ctaText={resolved.ctaText || "Book Energy Assessment"}
      ctaLink={resolved.ctaLink || "#quote-form"}
      subtitleColor="text-white"
      descriptionColor="text-white"
      showOverlay={true}
      isFullScreen={false}
      heightClass="min-h-[640px] md:min-h-[720px]"
    />
  );
}
