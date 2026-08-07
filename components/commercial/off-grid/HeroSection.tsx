import React from "react";
import Hero from "@/reuseables/Hero";
import { Briefcase } from "lucide-react";
import type { ResolvedCommercialOffGridHero } from "@/lib/strapi/resolvers/commercial";

interface Props {
  resolved: ResolvedCommercialOffGridHero;
}

export default function HeroSection({ resolved }: Props) {
  return (
    <Hero
      mediaSrc={resolved.mediaSrc || "/commercial_off_grid_bgimage.png"}
      mediaType="image"
      topSubtitle={resolved.topSubtitle}
      mainTitle={resolved.mainTitle}
      description={resolved.description}
      ctaText={resolved.ctaText || "Request Consultation"}
      ctaLink={resolved.ctaLink || "#quote-form"}
      subtitleColor="text-white"
      descriptionColor="text-white"
      showOverlay={true}
      isFullScreen={false}
      heightClass="min-h-[640px] md:min-h-[720px]"
      icon={Briefcase}
    />
  );
}
