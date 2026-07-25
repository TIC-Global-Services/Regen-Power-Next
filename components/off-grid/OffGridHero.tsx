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
    subtitle = 'Off-Grid Power, Engineered For',
    mainTitle = 'Remote Western Australia',
    description = 'With Over 20 Years Of Experience, We Design And Install Off-Grid Power Systems For Remote Homes, Farms, Mining Sites, And More Across Australia And Globally. Our HybridGEN Technology Powers Sites Across Asia. If Grid Access Is Limited Or Unreliable, Our Engineering Team Can Help You Find The Right Solution.',
    ctaText = 'Talk To Our Team',
    ctaLink = '#quote-form',
    backgroundImage,
}) => {
    return (
        <Hero
            mediaSrc={backgroundImage || ''}
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

export default OffGridHero;
