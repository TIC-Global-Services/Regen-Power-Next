'use client';

import React from 'react';
import CtaButton from '@/reuseables/CtaButton';
import { SliderDots, SliderArrows, useSnapSlider } from '@/reuseables/MobileSliderControls';

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

const SolutionCard: React.FC<{ sol: Solution }> = ({ sol }) => (
    <div className="relative h-[460px] lg:h-[540px] rounded-[20px] overflow-hidden group">
        <img
            src={sol.image || '/fallback.png'}
            alt={sol.title}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            onError={(e) => {
                e.currentTarget.src = "/fallback.png";
            }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
        <div className="absolute inset-0 p-6 lg:p-8 flex flex-col">
            <h3 className="text-2xl lg:text-[1.75rem] text-white font-normal tracking-tight leading-tight mb-3">
                {sol.title}
            </h3>
            <p className="text-sm lg:text-lg text-white/90 leading-[1.2] tracking-tight font-light max-w-[90%]">
                {sol.description}
            </p>
            {/* <div className="mt-auto">
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
            </div> */}
        </div>
    </div>
);

const ThreeSolutionsSection: React.FC<ThreeSolutionsSectionProps> = ({
    subtitle,
    title,
    description,
    solutions,
}) => {
    const { trackRef, sync, active, canPrev, canNext, goTo, next, prev } = useSnapSlider(solutions.length);

    return (
        <section className="py-16 lg:py-24 bg-white">
            <div className="lg:px-[3%] mx-auto">
                <div className="text-left lg:text-center max-w-7xl mx-auto mb-12 lg:mb-16 px-[5%]">
                    <p className="text-lg lg:text-[2rem] text-black font-light tracking-tight ">
                        {subtitle}
                    </p>
                    <h2 className="text-4xl lg:text-6xl lg:text-[5rem] text-[#63B846] font-normal tracking-tighter leading-none">
                        {title}
                    </h2>
                    <p className="text-sm lg:text-lg text-black leading-[1.2] mt-4 ">
                        {description}
                    </p>
                </div>

                {/* Desktop grid */}
                <div className="hidden lg:grid lg:grid-cols-3 gap-5 px-[3%]">
                    {solutions.map((sol, idx) => (
                        <SolutionCard key={idx} sol={sol} />
                    ))}
                </div>

                {/* Mobile slider — standard bleed pattern: padded wrapper,
                    track escapes it edge-to-edge */}
                <div className="lg:hidden px-[5%]">
                    <div
                        ref={trackRef}
                        onScroll={sync}
                        className="flex gap-4 overflow-x-auto -mx-[5%] px-[5%] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                        style={{ WebkitOverflowScrolling: 'touch' }}
                    >
                        {solutions.map((sol, idx) => (
                            <div
                                key={idx}
                                className="snap-start shrink-0 w-[75vw] md:w-[45vw]"
                            >
                                <SolutionCard sol={sol} />
                            </div>
                        ))}
                    </div>

                    <SliderDots count={solutions.length} active={active} onSelect={goTo} className="mt-5" />
                    <SliderArrows canPrev={canPrev} canNext={canNext} onPrev={prev} onNext={next} className="mt-4" />
                </div>
            </div>
        </section>
    );
};

export default ThreeSolutionsSection;

