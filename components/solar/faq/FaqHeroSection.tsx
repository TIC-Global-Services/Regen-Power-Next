import React from "react";
import Hero from "@/reuseables/Hero";
import type { ResolvedFaqHero } from "@/lib/strapi/resolvers/faq";
import fallback from '@/assets/solar/faq/solar_faq_banner.png'

interface Props {
  resolved: ResolvedFaqHero;
}

export default function FaqHeroSection({ resolved }: Props) {
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
      titleColor="text-[#63B846] leading-none"
      descriptionColor="text-white/95"
      showOverlay
      heightClass="h-[600px]"
    />
  );
}
