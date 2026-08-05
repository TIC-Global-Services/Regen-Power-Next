import React from "react";
import Hero from "@/reuseables/Hero";
import type { ResolvedBrandsHero } from "@/lib/strapi/resolvers/brands";
import fallback from '@/assets/solar/brands/solar_brand_hero.png'

interface BrandsHeroSectionProps {
  resolved: ResolvedBrandsHero;
}

const BrandsHeroSection: React.FC<BrandsHeroSectionProps> = ({ resolved }) => {
  return (
    <div>
      <Hero
        mediaSrc={resolved.mediaSrc || fallback}
        mediaType="image"
        topSubtitle={resolved.subtitle ?? ""}
        mainTitle={resolved.title ?? ""}
        description={resolved.description ?? ""}
        ctaText={resolved.ctaText ?? ""}
        ctaLink={resolved.ctaLink ?? "#quote-form"}
        subtitleColor="text-white"
        titleColor="text-[#63B846]"
        descriptionColor="text-white/90"
        showOverlay={true}
      />
    </div>
  );
};

export default BrandsHeroSection;
