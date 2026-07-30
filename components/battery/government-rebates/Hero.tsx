import React from 'react';
import HeroComponent from '@/reuseables/Hero';
import type { StaticImageData } from 'next/image';

interface GovernmentRebatesHeroProps {
  data: {
    mediaSrc: string | StaticImageData;
    topSubtitle: React.ReactNode;
    mainTitle: React.ReactNode;
    description: React.ReactNode;
    ctaText: string;
    ctaLink: string;
  };
}

const HeroSection = ({ data }: GovernmentRebatesHeroProps) => {
  return (
    <HeroComponent
      mediaSrc={data.mediaSrc}
      mediaType="image"
      imageClass="object-cover"
      topSubtitle={data.topSubtitle}
      mainTitle={data.mainTitle}
      description={data.description}
      ctaText={data.ctaText}
      ctaLink={data.ctaLink}
      subtitleColor="text-white"
      descriptionColor="text-white"
      showOverlay={true}
    />
  );
};

export default HeroSection;
