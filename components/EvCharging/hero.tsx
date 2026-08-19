import React from 'react';
import Hero from '@/reuseables/Hero';
import { StaticImageData } from 'next/image';

export interface EvHeroData {
  mediaSrc: StaticImageData | string;
  mediaType: "image" | "video";
  isFullScreen?: boolean;
  descriptionColor?: string;
  imageClass?: string;
  topSubtitle: string;
  mainTitle: string;
  description: string;
  ctaText: string;
  ctaLink: string;
}

interface EvHeroProps {
  data: EvHeroData;
}

const EvHero = ({ data }: EvHeroProps) => {
  return (
    <Hero
      mediaSrc={data.mediaSrc}
      mediaType={data.mediaType}
      isFullScreen={data.isFullScreen}
      descriptionColor={data.descriptionColor ?? 'text-white'}
      imageClass={data.imageClass ?? 'object-cover object-bottom'}
      topSubtitle={data.topSubtitle}
      mainTitle={data.mainTitle}
      description={data.description}
      ctaText={data.ctaText}
      ctaLink={data.ctaLink}
      heightClass='h-[600px]'
    />
  );
};

export default EvHero;