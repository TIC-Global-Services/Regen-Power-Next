'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
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
    const sliderRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const handleScroll = useCallback(() => {
        const slider = sliderRef.current;
        if (!slider) return;
        const scrollLeft = slider.scrollLeft;
        const cardWidth = slider.children[0]?.clientWidth ?? 1;
        const gap = 16; // gap-4 = 1rem = 16px
        const index = Math.round(scrollLeft / (cardWidth + gap));
        setActiveIndex(Math.min(index, solutions.length - 1));
    }, [solutions.length]);

    useEffect(() => {
        const slider = sliderRef.current;
        if (!slider) return;
        slider.addEventListener('scroll', handleScroll, { passive: true });
        return () => slider.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    const scrollToIndex = (index: number) => {
        const slider = sliderRef.current;
        if (!slider || !slider.children[index]) return;
        const child = slider.children[index] as HTMLElement;
        slider.scrollTo({ left: child.offsetLeft - slider.offsetLeft, behavior: 'smooth' });
    };

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
                <div className="hidden lg:grid lg:grid-cols-1 lg:grid-cols-3 gap-5 px-[3%]">
                    {solutions.map((sol, idx) => (
                        <SolutionCard key={idx} sol={sol} />
                    ))}
                </div>

                {/* Mobile slider */}
                <div className="lg:hidden">
                    <div
                        ref={sliderRef}
                        className="flex gap-4 overflow-x-auto pl-[5%] pr-[5%] [&::-webkit-scrollbar]:hidden"
                        style={{ WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {solutions.map((sol, idx) => (
                            <div
                                key={idx}
                                className="snap-start shrink-0 w-[85%]"
                            >
                                <SolutionCard sol={sol} />
                            </div>
                        ))}
                    </div>

                    {/* Dot indicators */}
                    <div className="flex justify-center gap-2 mt-5">
                        {solutions.map((_, index) => (
                            <button
                                key={index}
                                aria-label={`Go to slide ${index + 1}`}
                                onClick={() => scrollToIndex(index)}
                                className={`rounded-full transition-all duration-300 ${index === activeIndex
                                    ? 'w-7 h-2.5 bg-[#63B846]'
                                    : 'w-2.5 h-2.5 bg-black/20'
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ThreeSolutionsSection;

