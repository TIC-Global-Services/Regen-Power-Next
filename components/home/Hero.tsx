import Hero, { HeroProps } from '@/reuseables/Hero';
import React from 'react';

// Re-export HeroProps as the data interface for this component
export type HeroSectionData = HeroProps;

interface HeroSectionProps {
    data: HeroSectionData;
}

const HeroSection = ({ data }: HeroSectionProps) => {
    return (
        <div>
            <Hero {...data} />
        </div>
    );
};

export default HeroSection;