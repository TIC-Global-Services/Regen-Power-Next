import React from 'react';
import { StaticImageData } from 'next/image';
import { LucideIcon } from 'lucide-react';
import Hero from './Hero';

/**
 * Data-driven wrapper around the presentational `Hero`.
 * Data objects live in page.tsx (or are resolved from Strapi); this
 * component stays dumb and just forwards the data to `Hero`.
 */
export interface HeroSectionData {
    mediaSrc: string | StaticImageData;
    mediaType?: 'image' | 'video';
    imageClass?: string;
    topSubtitle: React.ReactNode;
    mainTitle: React.ReactNode;
    description: React.ReactNode;
    ctaText?: string;
    ctaLink?: string;
    subtitleColor?: string;
    descriptionColor?: string;
    showOverlay?: boolean;
    titleColor?: string;
    heightClass?: string;
    icon?: LucideIcon;
}

const HeroSection: React.FC<{ data: HeroSectionData }> = ({ data }) => {
    if (!data) return null;

    return (
        <Hero
            mediaSrc={data.mediaSrc}
            mediaType={data.mediaType}
            imageClass={data.imageClass}
            topSubtitle={data.topSubtitle}
            mainTitle={data.mainTitle}
            description={data.description}
            ctaText={data.ctaText}
            ctaLink={data.ctaLink}
            subtitleColor={data.subtitleColor}
            descriptionColor={data.descriptionColor}
            showOverlay={data.showOverlay}
            titleColor={data.titleColor}
            heightClass={data.heightClass}
            icon={data.icon}
        />
    );
};

export default HeroSection;
