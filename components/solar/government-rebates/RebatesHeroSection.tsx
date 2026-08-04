import React from "react";
import Hero from "@/reuseables/Hero";
import type { ResolvedRebatesHero } from "@/lib/strapi/resolvers/rebates";
import fallback from '@/assets/solar/government-rebates/solar_goverment_rebates_hero.png'

interface Props {
  resolved: ResolvedRebatesHero;
}

export default function RebatesHeroSection({ resolved }: Props) {
  return (
    <Hero
      mediaSrc={resolved.mediaSrc || fallback}
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
