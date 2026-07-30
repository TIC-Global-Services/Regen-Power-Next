import React from 'react';
import Hero, { HeroProps } from '@/reuseables/Hero';

interface EvHeroProps {
  data: HeroProps;
}

const EvHero = ({ data }: EvHeroProps) => {
  return (
    <Hero
      mediaSrc={data.mediaSrc}
      mediaType={data.mediaType}
      isFullScreen={false}
      descriptionColor="text-white"
      topSubtitle={data.topSubtitle}
      mainTitle={data.mainTitle}
      description={data.description}
      ctaText={data.ctaText}
      ctaLink={data.ctaLink}
      showOverlay={data.showOverlay}
    />
  );
};

export default EvHero;
