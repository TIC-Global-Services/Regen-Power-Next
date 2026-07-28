import React from 'react';
import Image, { StaticImageData } from 'next/image';
import CtaButton from './CtaButton';

export interface CtaSectionProps {
    subtitle: string;
    title: string;
    description?: string;
    buttonText?: string;
    buttonHref?: string;
    bgImage?: StaticImageData | string;
    overlayClass?: string;
    minHeightClass?: string;
    children?: React.ReactNode;
}

const CtaSection: React.FC<CtaSectionProps> = ({
    subtitle,
    title,
    description,
    buttonText = 'Get My Free Quote',
    buttonHref = '#quote-form',
    bgImage,
    overlayClass,
    minHeightClass = 'min-h-[500px] md:min-h-[560px]',
    children,
}) => {
    return (
        <section className={`relative w-full ${minHeightClass} flex items-start overflow-hidden`}>
            {bgImage && (
                <div className="absolute inset-0 z-0">
                    <Image
                        src={bgImage}
                        alt=""
                        fill
                        className="object-cover object-bottom"
                    />
                    <div
                        className='bg-gradient-to-r h-full w-full from-black/5 via-black/15 to-transparent'
                    />
                </div>
            )}

            <div className="relative z-10 w-full px-[5%] mt-12 md:mt-16">
                <div className="max-w-3xl text-white">
                    <p className="text-2xl md:text-3xl font-light tracking-tighter leading-tight mb-1">
                        {subtitle}
                    </p>
                    <h2 className="text-5xl md:text-6xl lg:text-7xl text-[#63B846] font-normal tracking-tighter leading-none mb-5">
                        {title}
                    </h2>

                    {description && (
                        <p className="text-sm md:text-[15px] leading-snug tracking-tight text-white/90 mb-6 max-w-2xl">
                            {description}
                        </p>
                    )}

                    {buttonText && (
                        <CtaButton
                            href={buttonHref}
                            text={buttonText}
                            textColor="text-white"
                            bgClass="bg-[#63B84640] backdrop-blur-sm"
                            borderClass="border border-[#63B846]"
                            hoverClass="hover:bg-[#63B846]"
                        />
                    )}

                    {children}
                </div>
            </div>
        </section>
    );
};

export default CtaSection;
