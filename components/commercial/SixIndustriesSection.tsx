import React from 'react';
import type { StaticImageData } from 'next/image';
import SectionHeader from '@/reuseables/SectionHeader';
import Reveal from '@/reuseables/Reveal';

export interface Industry {
    title: string;
    description: string;
    caseStudy: string;
    icon: StaticImageData | string;
}

interface SixIndustriesSectionProps {
    subtitle: string;
    title: string;
    industries: Industry[];
}

const SixIndustriesSection: React.FC<SixIndustriesSectionProps> = ({
    subtitle,
    title,
    industries,
}) => {
    return (
        <section className="py-16 md:py-24 bg-white">
            <div className="px-[5%] mx-auto">
                <SectionHeader
                    subtitle={subtitle}
                    title={title}
                    align="left"
                    subtitleClass="text-lg md:text-2xl font-light text-black tracking-tight"
                    titleClass="text-4xl md:text-6xl lg:text-[4.5rem] text-[#63B846] font-normal tracking-tighter leading-none"
                    className="max-w-4xl mb-12 md:mb-16"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
                    {industries.map((industry, idx) => (
                        <Reveal
                            key={idx}
                            delay={idx * 0.08}
                            className="bg-[#E5EFD5] rounded-[20px] p-6 md:p-8 flex flex-col min-h-[320px] md:min-h-[360px] hover:bg-[#D7E5C0] transition-colors duration-300"
                        >
                            <div className="relative w-12 h-12 md:w-14 md:h-14">
                                <img
                                    src={(typeof industry.icon === 'string' ? industry.icon : (industry.icon as any)?.src) || '/fallback.png'}
                                    alt={industry.title}
                                    className="w-full h-full object-contain"
                                />
                            </div>

                            <div className="mt-auto pt-8">
                                <h3 className="text-2xl md:text-[2rem] font-normal text-black tracking-tight leading-tight mb-3">
                                    {industry.title}
                                </h3>
                                <p className="text-sm md:text-xl text-black/75 leading-[1.2] tracking-tight mb-2">
                                    {industry.description}
                                </p>
                                <p className="text-sm md:text-base text-black font-semibold leading-snug tracking-tight">
                                    {industry.caseStudy}
                                </p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SixIndustriesSection;
