'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import Image, { StaticImageData } from 'next/image';
import SectionHeader from '@/reuseables/SectionHeader';

export type solutionCardVariant = 'light' | 'highlighted';
export type solutionCardLayout = 4 | 6 | 8;

export interface solutionCard {
    title: string;
    description: string;
    specs?: string;
    icon?: string;
    iconElement?: React.ReactNode;
    variant?: solutionCardVariant;
}

interface solutionCardGridProps {
    subtitle?: string;
    title?: string;
    description?: string;
    cards: solutionCard[];
    layout?: solutionCardLayout;
    variant?: solutionCardVariant;
    showHeader?: boolean;
    className?: string;
    footer?: React.ReactNode;
}

const gridCols: Record<solutionCardLayout, string> = {
    4: 'sm:grid-cols-2 lg:grid-cols-4',
    6: 'sm:grid-cols-2 lg:grid-cols-3',
    8: 'sm:grid-cols-2 lg:grid-cols-4',
};

const variantClass: Record<solutionCardVariant, string> = {
    'light': 'bg-[#EBEBEB]',
    'highlighted': 'bg-[#A0CF44]',
};

const SolutionCardView: React.FC<{ card: solutionCard; variant: solutionCardVariant }> = ({ card, variant }) => {
    const cardVariant = card.variant || variant;
    return (
        <div
            className={`bg-[#EEF6EB] rounded-[20px] p-6 md:p-5 flex flex-col justify-between h-full md:h-[30dvh] lg:h-[50dvh]`}
        >
            <div className="relative w-12 h-12 lg:w-25  lg:h-25 flex items-center justify-center">
                 <img
                        src={card.icon && card.icon.length > 0 ? card.icon : '/fallback-icon.svg'}
                        alt={card.title}
                        className="object-contain"
                        onError={(e) => {
                            e.currentTarget.src = "/fallback-icon.svg";
                        }}
                    />
            </div>
            <div className="pt-10">
                <h3 className="text-xl md:text-[1.75rem] text-black font-normal tracking-tight leading-[1.2] mb-2">
                    {card.title}
                </h3>
                <p className="text-base md:text-xl text-black leading-[1.2] tracking-tight font-light">
                    {card.description}
                </p>
                {card.specs && (
                    <p className="text-xs md:text-sm text-black leading-snug tracking-tight font-bold mt-2">
                        {card.specs}
                    </p>
                )}
            </div>
        </div>
    );
};

const solutionCardGrid: React.FC<solutionCardGridProps> = ({
    subtitle,
    title,
    description,
    cards,
    layout = 4,
    variant = 'light',
    showHeader = true,
    className = '',
    footer,
}) => {
    const sliderRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const handleScroll = useCallback(() => {
        const slider = sliderRef.current;
        if (!slider) return;
        const scrollLeft = slider.scrollLeft;
        const cardWidth = slider.children[0]?.clientWidth ?? 1;
        const gap = 20;
        const index = Math.round(scrollLeft / (cardWidth + gap));
        setActiveIndex(Math.min(index, cards.length - 1));
    }, [cards.length]);

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
        <section className={`py-10 md:py-24 bg-white ${className}`}>
            <div className="px-[5%] md:px-[3%]">
                {showHeader && (subtitle || title || description) && (
                    <div className="text-left md:text-center mb-12 md:mb-16">
                        {subtitle && (
                            <p className="text-lg md:text-[2.125rem] text-black font-light tracking-tight text-left lg:text-center leading-none">
                                {subtitle}
                            </p>
                        )}
                        {title && (
                            <h2 className="text-4xl md:text-6xl lg:text-[5rem] text-[#63B846] font-normal text-left  lg:text-center   tracking-tighter leading-none">
                                {title}
                            </h2>
                        )}
                        {description && (
                            <p className="text-sm text-left  md:text-base text-black leading-[1.2] mt-4 lg:max-w-4xl lg:mx-auto">
                                {description}
                            </p>
                        )}
                    </div>
                )}

                {/* Desktop grid */}
                <div className={`hidden sm:grid ${gridCols[layout]} gap-4 md:gap-5`}>
                    {cards.map((card, idx) => (
                        <SolutionCardView key={idx} card={card} variant={variant} />
                    ))}
                </div>

                {/* Mobile slider */}
                <div className="sm:hidden">
                    <div
                        ref={sliderRef}
                        className="flex gap-4 md:gap-6 overflow-x-auto -mx-[5%] px-[5%] md:px-[3%] [&::-webkit-scrollbar]:hidden"
                        style={{ WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {cards.map((card, idx) => (
                            <div
                                key={idx}
                                className="snap-start shrink-0 w-[85%]"
                            >
                                <SolutionCardView card={card} variant={variant} />
                            </div>
                        ))}
                    </div>

                    {/* Dot indicators */}
                    <div className="flex justify-center gap-2 mt-5">
                        {cards.map((_, index) => (
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

                {footer && (
                    <div className="mt-10 md:mt-12 max-w-7xl mx-auto">
                        {footer}
                    </div>
                )}
            </div>
        </section>
    );
};

export default solutionCardGrid;

