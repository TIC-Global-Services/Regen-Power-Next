import React from 'react';
import HeroComponent from '@/reuseables/Hero';
import type { StaticImageData } from 'next/image';

interface BatteryStorageHeroProps {
  data: {
    mediaSrc: string | StaticImageData;
    mediaType?: "image" | "video";
    topSubtitle: React.ReactNode;
    mainTitle: React.ReactNode;
    description: React.ReactNode;
    ctaText: string;
    ctaLink: string;
    subtitleColor?: string;
    descriptionColor?: string;
    showOverlay?: boolean;
  };
}

const HeroSection = ({ data }: BatteryStorageHeroProps) => {
  return (
    <HeroComponent
      mediaSrc={data.mediaSrc}
      mediaType={data.mediaType || "image"}
      topSubtitle={data.topSubtitle}
      mainTitle={data.mainTitle}
      description={data.description}
      ctaText={data.ctaText}
      ctaLink={data.ctaLink}
      subtitleColor={data.subtitleColor || "text-white"}
      descriptionColor={data.descriptionColor || "text-white"}
      showOverlay={data.showOverlay ?? true}
    />
  );
};

export default HeroSection;
