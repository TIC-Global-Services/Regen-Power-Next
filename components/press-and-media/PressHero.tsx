import React from 'react';
import Image, { StaticImageData } from 'next/image';
import Hero from '@/reuseables/Hero';

export interface PressHeroProps {
    subtitle: string;
    mainTitle: string;
    description: string;
    ctaText?: string;
    ctaLink?: string;
    backgroundImage: StaticImageData | string;
}

const PressHero: React.FC<PressHeroProps> = ({
    subtitle,
    mainTitle,
    description,
    ctaText,
    ctaLink,
    backgroundImage,
}) => {
    return (
        <Hero
            mediaSrc={backgroundImage}
            mediaType="image"
            topSubtitle={subtitle}
            mainTitle={mainTitle}
            description={description}
            ctaText={ctaText}
            ctaLink={ctaLink}
            subtitleColor="text-white"
            descriptionColor="text-white"
            showOverlay={true}
            isFullScreen={false}
            heightClass="min-h-[640px] md:min-h-[720px]"
        />
    );
};

export default PressHero;
