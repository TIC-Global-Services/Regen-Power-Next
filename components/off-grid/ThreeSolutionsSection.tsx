'use client';

import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import CtaButton from '@/reuseables/CtaButton';

interface Solution {
    title: string;
    description: string;
    image: string;
    ctaText?: string;
    ctaHref?: string;
}

interface ThreeSolutionsSectionProps {
    subtitle: string;
    title: string;
    description: string;
    solutions: Solution[];
}

const ThreeSolutionsSection: React.FC<ThreeSolutionsSectionProps> = ({
    subtitle,
    title,
    description,
    solutions,
}) => {

    return (
        <section className="py-16 md:py-24 bg-white">
            <div className="px-[5%] mx-auto">
                <div className="text-center max-w-7xl mx-auto mb-12 md:mb-16">
                    <p className="text-lg md:text-[2rem] text-black font-light tracking-tight ">
                        {subtitle}
                    </p>
                    <h2 className="text-4xl md:text-6xl lg:text-[5rem] text-[#63B846] font-normal tracking-tighter leading-none">
                        {title}
                    </h2>
                    <p className="text-sm md:text-lg text-black leading-[1.2] mt-4 ">
                        {description}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 max-w-7xl mx-auto">
                    {solutions.map((sol, idx) => (
                        <div
                            key={idx}
                            className="relative h-[460px] md:h-[540px] rounded-[24px] overflow-hidden group"
                        >
                            <img
                                src={sol.image || '/fallback.png'}
                                alt={sol.title}
                                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                onError={(e) => {
                                    e.currentTarget.src = "/fallback.png";
                                }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
                            <div className="absolute inset-0 p-6 md:p-8 flex flex-col">
                                <h3 className="text-2xl md:text-[1.75rem] text-white font-normal tracking-tight leading-tight mb-3">
                                    {sol.title}
                                </h3>
                                <p className="text-sm md:text-[15px] text-white/90 leading-snug tracking-tight font-light max-w-[90%]">
                                    {sol.description}
                                </p>
                                <div className="mt-auto">
                                    {sol.ctaText && (
                                        <CtaButton
                                            href={sol.ctaHref}
                                            text={sol.ctaText}
                                            textColor="text-white"
                                            bgClass="bg-[#63B84666] backdrop-blur-md"
                                            borderClass="border border-[#63B846]"
                                            hoverClass="hover:bg-[#8dc63f] hover:text-white"
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ThreeSolutionsSection;
