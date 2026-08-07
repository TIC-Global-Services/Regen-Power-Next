import React from 'react';
import Hero from '@/reuseables/Hero';
import type { ResolvedResearchDevelopmentHero } from '@/lib/strapi/resolvers/research';

interface Props {
  resolved: ResolvedResearchDevelopmentHero;
}

const RDHero = ({ resolved }: Props) => {
  return (
    <Hero
      mediaSrc={resolved.mediaSrc || '/r&d_hero_banner.png'}
      mediaType="image"
      topSubtitle={resolved.subtitle}
      mainTitle={resolved.mainTitle}
      description={resolved.description}
      ctaText={resolved.ctaText || 'Get Your Free Quote'}
      ctaLink={resolved.ctaLink || '#quote-form'}
      subtitleColor="text-white"
      descriptionColor="text-white"
      showOverlay={true}
      isFullScreen={false}
      heightClass="min-h-[640px] md:min-h-[720px]"
    />
  );
};

export default RDHero;
