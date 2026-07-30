import React from 'react';
import Hero from '@/reuseables/Hero';

export interface OffGridHeroProps {
    subtitle?: string;
    mainTitle?: string;
    description?: string;
    ctaText?: string;
    ctaLink?: string;
    backgroundImage?: string;
}

const OffGridHero: React.FC<OffGridHeroProps> = ({
    subtitle,
    mainTitle,
    description,
    ctaText,
    ctaLink,
    backgroundImage,
}) => {
    return (
        <Hero
            mediaSrc={backgroundImage ?? ''}
            mediaType="image"
            topSubtitle={subtitle ?? ''}
            mainTitle={mainTitle ?? ''}
            description={description ?? ''}
            ctaText={ctaText ?? ''}
            ctaLink={ctaLink ?? ''}
            subtitleColor="text-white"
            descriptionColor="text-white"
            showOverlay={true}
            isFullScreen={false}
            heightClass="min-h-[640px] md:min-h-[720px]"
        />
    );
};

export default OffGridHero;
