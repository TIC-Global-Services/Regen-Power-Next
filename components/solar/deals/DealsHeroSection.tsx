import React from "react";
import Hero from "@/reuseables/Hero";
import type { ResolvedDealsHero } from "@/lib/strapi/resolvers/deals";

interface Props {
  resolved: ResolvedDealsHero;
}

export default function DealsHeroSection({ resolved }: Props) {
  return (
    <Hero
      mediaSrc={resolved.mediaSrc}
      mediaType="image"
      topSubtitle={resolved.subtitle || ""}
      mainTitle={resolved.title || ""}
      description={resolved.description || ""}
      ctaText={resolved.ctaText || "Get My Tailored Quote"}
      ctaLink={resolved.ctaLink || "#quote-form"}
      subtitleColor="text-white"
      titleColor="text-[#63B846]"
      descriptionColor="text-white/90"
      showOverlay={true}
      heightClass="h-[600px]"
    />
  );
}
