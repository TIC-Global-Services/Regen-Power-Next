
import React from 'react';
import type { StaticImageData } from 'next/image';
import { LucideIcon } from 'lucide-react';
import CtaButton from './CtaButton';
import SimpleParallax from 'simple-parallax-js'

export interface HeroProps {
    mediaSrc: string | StaticImageData;
    videoFile?: string;
    mediaType?: 'image' | 'video';
    topSubtitle: React.ReactNode;
    mainTitle: React.ReactNode;
    description: React.ReactNode;
    ctaText: string;
    ctaLink: string;
    isFullScreen?: boolean;
    subtitleColor?: string;
    descriptionColor?: string;
    imageClass?: string;
    CtatextColor?: string;
    showOverlay?: boolean;
    titleColor?: string;
    heightClass?: string;
    icon?: LucideIcon;
}
const Hero: React.FC<HeroProps> = ({
    mediaSrc,
    videoFile,
    mediaType = 'image',
    topSubtitle,
    mainTitle,
    description,
    ctaText,
    ctaLink,
    CtatextColor = 'text-white',
    imageClass = 'object-cover',
    isFullScreen = true,
    subtitleColor = 'text-black',
    descriptionColor = 'text-black',
    showOverlay = false,
    titleColor,
    heightClass,
    icon,
}) => {
    const height = heightClass || (isFullScreen ? 'h-screen min-h-[600px]' : 'md:h-[600px]');
    return (
        <section className={`relative w-full flex flex-col justify-end pb-12 md:pb-10 ${height}`}>
            {mediaSrc && (
                <div className="absolute inset-0 z-0">
                    {mediaType === 'video' ? (
                        <video
                            src={videoFile}
                            className="w-full h-full object-cover"
                            autoPlay
                            loop
                            muted
                            playsInline
                        />
                    ) : (
                        <img
                            src={typeof mediaSrc === 'string' ? mediaSrc : mediaSrc.src}
                            alt="Hero Background"
                            className={`absolute inset-0 w-full h-full ${imageClass}`}
                        />
                    )}
                    {showOverlay && (
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    )}
                </div>
            )}

            {/* Content Area */}
            <div className="relative z-10 w-full px-[5%] flex flex-col md:flex-row md:items-end justify-between gap-8 pt-32">
                <div className="max-w-3xl">
                    <p className={`text-2xl md:text-3xl font-light tracking-tighter drop-shadow-md ${subtitleColor}`}>
                        {topSubtitle}
                    </p>
                    <h1 className={`text-5xl md:text-7xl lg:text-[3.750rem] font-medium mb-2 leading-none tracking-tight drop-shadow-md ${titleColor || 'text-[#8dc63f]'}`}>
                        {mainTitle}
                    </h1>
                    <div className={`text-base md:text-xl leading-[1.2] max-w-xl font-light tracking-tight drop-shadow-sm ${descriptionColor}`}>
                        {description}
                    </div>
                </div>

                {/* CTA Button */}
                <div className="flex-shrink-0 pb-2">
                    <CtaButton
                        href={ctaLink}
                        text={ctaText}
                        textColor={CtatextColor}
                        icon={icon}
                    />
                </div>
            </div>
        </section>
    );
};

export default Hero;