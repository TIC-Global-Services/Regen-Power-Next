import React from 'react';
import type { StaticImageData } from 'next/image';
import CtaButton from '@/reuseables/CtaButton';
import Reveal from '@/reuseables/Reveal';

interface WatchSystemSectionProps {
    subtitle: string;
    title: string;
    paragraphs: string[];
    ctaText: string;
    ctaHref: string;
    image: StaticImageData | string;
    imageAlt?: string;
}

const WatchSystemSection: React.FC<WatchSystemSectionProps> = ({
    subtitle,
    title,
    paragraphs,
    ctaText,
    ctaHref,
    image,
    imageAlt = 'Solar monitoring',
}) => {
    return (
        <section className="py-16 md:py-24 bg-white">
            <div className="px-[5%] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

                    <Reveal className="relative w-full aspect-[3/4] rounded-[20px] overflow-hidden md:hidden">
                        <img
                            src={(typeof image === 'string' ? image : (image as any)?.src) || '/fallback.png'}
                            alt={imageAlt}
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    </Reveal>
                    <div className="flex flex-col justify-center">
                        <p className="text-lg md:text-[1.75rem] font-light text-black tracking-tight leading-none">
                            {subtitle}
                        </p>
                        <h2 className="text-4xl md:text-6xl lg:text-[3.750rem] text-[#63B846] font-normal tracking-tighter leading-none mb-6">
                            {title}
                        </h2>
                        <div className="space-y-4 mt-5">
                            {paragraphs.map((p, idx) => (
                                <p
                                    key={idx}
                                    className="text-sm md:text-xl text-black/80 leading-[1.2] tracking-tight"
                                >
                                    {p}
                                </p>
                            ))}
                        </div>
                        <div className="mt-8">
                            <CtaButton
                                href={ctaHref}
                                text={ctaText}
                                textColor="text-black"
                            />
                        </div>
                    </div>

                    <Reveal className="relative w-full aspect-[4/4] rounded-[20px] overflow-hidden hidden md:flex">
                        <img
                            src={(typeof image === 'string' ? image : (image as any)?.src) || '/fallback.png'}
                            alt={imageAlt}
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    </Reveal>
                </div>
            </div>
        </section>
    );
};

export default WatchSystemSection;
