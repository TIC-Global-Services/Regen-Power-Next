import Hero from '@/reuseables/Hero';
import React from 'react';
import { StaticImageData } from 'next/image';

export interface HeroData {
  mediaSrc: string | StaticImageData;
  mediaType: "image" | "video";
  imageClass?: string;
  topSubtitle: string;
  mainTitle: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  subtitleColor?: string;
  descriptionColor?: string;
  showOverlay?: boolean;
}

const HeroSection = ({data}: {data:HeroData[]}) => {
  if (!data || data.length === 0) return null;
  const hero = data[0];

  return (
    <Hero 
      mediaSrc={hero.mediaSrc}
      mediaType={hero.mediaType}
      imageClass={hero.imageClass}
      topSubtitle={hero.topSubtitle}
      mainTitle={hero.mainTitle}
      description={hero.description}
      ctaText={hero.ctaText}
      ctaLink={hero.ctaLink}
      subtitleColor={hero.subtitleColor}
      descriptionColor={hero.descriptionColor}
      showOverlay={hero.showOverlay}
    />
  )
}

export default HeroSection;