import Hero, { HeroProps } from '@/reuseables/Hero';
import React from 'react';
import VideoHotspotExperience from './HeroBanner/VideoHotspotExperience';

// Re-export HeroProps as the data interface for this component
export type HeroSectionData = HeroProps;

interface HeroSectionProps {
    data: HeroSectionData;
}

const HeroSection = ({ data }: HeroSectionProps) => {
    return (
        <div>
            <VideoHotspotExperience
                topSubtitle={data.topSubtitle}
                mainTitle={data.mainTitle}
                description={data.description}
                ctaText={data.ctaText}
                ctaLink={data.ctaLink}
                ctaTextColor={data.CtatextColor}
            />
        </div>
    );
};

export default HeroSection;