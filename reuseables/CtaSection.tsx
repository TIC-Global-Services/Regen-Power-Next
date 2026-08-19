import React from 'react';
import type { StaticImageData } from 'next/image';
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
            <div className="absolute inset-0 z-0">
                <img
                    src={(typeof bgImage === 'string' ? bgImage : bgImage?.src) || '/fallback.png'}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover object-bottom"
                />
                <div
                    className='bg-gradient-to-r h-full w-full from-black/5 via-black/10 to-transparent'
                />
            </div>

            <div className="relative z-10 w-full px-[5%] md:px-[3%] mt-12 md:mt-16">
                <div className="max-w-4xl text-white capitalize">
                    <p className="text-base md:text-3xl font-light tracking-tighter leading-none">
                        {subtitle}
                    </p>
                    <h2 className="text-[2.5rem] md:text-6xl lg:text-[3.75rem] text-[#63B846] font-normal tracking-tighter leading-none mb-4">
                        {title}
                    </h2>

                    {description && (
                        <p className="text-sm md:text-lg leading-[1.2] tracking-tight text-white/90 mb-6 max-w-2xl">
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
