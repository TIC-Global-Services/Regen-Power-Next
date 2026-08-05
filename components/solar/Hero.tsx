import React from "react";
import Hero from "@/reuseables/Hero";
import fallback from "@/assets/solar/solar_system_hero.png";
import type { ResolvedSolarHero } from "@/lib/strapi/resolvers/solar";

interface SolarHeroProps {
  heroProps: ResolvedSolarHero;
}

const HeroSection: React.FC<SolarHeroProps> = ({ heroProps }) => {
  return (
     <Hero
      mediaSrc={heroProps.mediaSrc || fallback }
      mediaType="image"
      topSubtitle={heroProps.topSubtitle || ""}
      mainTitle={heroProps.mainTitle || ""}
      description={heroProps.description || ""}
      ctaText={heroProps.ctaText || "Get My Tailored Quote"}
      ctaLink={heroProps.ctaLink || "#quote-form"}
      subtitleColor="text-white"
      titleColor="text-[#63B846]"
      descriptionColor="text-white/90"
      showOverlay={true}
      heightClass="h-[600px]"
    />
  );
};

export default HeroSection;
