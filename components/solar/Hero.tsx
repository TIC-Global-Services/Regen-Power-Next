import React from "react";
import Hero from "@/reuseables/Hero";
import MissingImage from "@/reuseables/MissingImage";
import type { ResolvedSolarHero } from "@/lib/strapi/resolvers/solar";

interface SolarHeroProps {
  heroProps: ResolvedSolarHero;
}

const HeroSection: React.FC<SolarHeroProps> = ({ heroProps }) => {
  return (
    <div>
      {heroProps.mediaSrc ? (
        <Hero {...heroProps} />
      ) : (
        <MissingImage
          label="Hero background image"
          aspect="aspect-[16/9] md:aspect-[21/9]"
        />
      )}
    </div>
  );
};

export default HeroSection;
