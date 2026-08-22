'use client';
import React, { useRef, useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export type StoryCardVariant = 'default' | 'highlighted' | 'light';

export interface StoryCard {
    title: string;
    description: string;
    variant?: StoryCardVariant;
}

export interface OffGridStoryProps {
    subtitle: string;
    title: string;
    description: string;
    cards: StoryCard[];
    featuredImage: string;
    featuredImageAlt?: string;
    featuredTitle: string;
    featuredDescription: string;
    featuredHref?: string;
    showReadMore?: boolean;
}

const OffGridStory: React.FC<OffGridStoryProps> = ({
    subtitle,
    title,
    description,
    cards,
    featuredImage,
    featuredImageAlt,
    featuredTitle,
    featuredDescription,
    featuredHref,
    showReadMore = false,
}) => {
    const sliderRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const handleScroll = useCallback(() => {
        const slider = sliderRef.current;
        if (!slider) return;
        const scrollLeft = slider.scrollLeft;
        const cardWidth = slider.children[0]?.clientWidth ?? 1;
        const gap = 16;
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

    const featuredContent = (
        <>
            <img
                src={featuredImage || '/chem_nayar.jpg'}
                alt={featuredImageAlt || featuredTitle}
                className={`absolute inset-0 w-full h-full object-cover ${featuredHref ? 'transition-transform duration-700 group-hover:scale-105' : ''}`}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 lg:p-16 max-w-3xl text-white">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium tracking-tight leading-tight mb-3 md:mb-4">
                    {featuredTitle}
                </h2>
                <p className="text-sm md:text-base leading-snug tracking-tight text-white/90 mb-4 md:mb-6 max-w-2xl">
                    {featuredDescription}
                </p>
                {showReadMore && featuredHref && (
                    <span className="inline-flex items-center gap-2 text-sm md:text-base tracking-tight group-hover:gap-3 transition-all duration-300">
                        Read More
                        <ArrowRight size={18} strokeWidth={2.5} />
                    </span>
                )}
            </div>
        </>
    );

    return (
        <section className="py-10 md:py-20 bg-white">
            <div className="px-[0%] md:px-[3%]">
                <div className="text-left lg:text-center max-w-4xl mx-auto mb-12 md:mb-0 -space-y-2 px-[5%]">
                    <p className="text-base md:text-2xl text-black font-light tracking-tight leading-none mb-2">
                        {subtitle}
                    </p>
                    <h2 className="text-[2.5rem] md:text-6xl lg:text-[5rem] text-[#63B846] font-normal tracking-tighter leading-none">
                        {title}
                    </h2>
                    <p className="text-base md:text-base text-black leading-[1.2] mt-4 max-w-3xl mx-auto">
                        {description}
                    </p>
                </div>

                {/* Desktop grid */}
                <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mt-8 md:mt-10 px-[5%] md:px-0 min-h-[50dvh] mb-10">
                    {cards.map((card, idx) => {
                        const isGreen = idx % 2 === 0;
                        return (
                            <div
                                key={idx}
                                className={`${isGreen ? 'bg-[#63B846]' : 'bg-[#EEF6EB]'} rounded-[20px] overflow-hidden flex flex-col h-full p-8`}
                            >
                                <h3 className={`text-lg md:text-2xl tracking-tight leading-[1.2] mb-auto ${isGreen ? 'text-white' : 'text-black'}`}>
                                    {card.title}
                                </h3>
                                <p className={`text-xs md:text-base leading-[1.2] tracking-tight font-light mt-6 ${isGreen ? 'text-white/90' : 'text-black/80'}`}>
                                    {card.description}
                                </p>
                            </div>
                        );
                    })}
                </div>

                {/* Mobile slider */}
                <div className="sm:hidden mt-8 mb-10">
                    <div
                        ref={sliderRef}
                        className="flex gap-4 overflow-x-auto -mx-[0%] px-[5%] [&::-webkit-scrollbar]:hidden"
                        style={{ WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {cards.map((card, idx) => {
                            const isGreen = idx % 2 === 0;
                            return (
                                <div
                                    key={idx}
                                    className="snap-start shrink-0 w-[85%]"
                                >
                                    <div
                                        className={`${isGreen ? 'bg-[#63B846]' : 'bg-[#EEF6EB]'} rounded-[20px] overflow-hidden flex flex-col h-full p-8 min-h-[250px]`}
                                    >
                                        <h3 className={`text-lg tracking-tight leading-[1.2] mb-auto ${isGreen ? 'text-white' : 'text-black'}`}>
                                            {card.title}
                                        </h3>
                                        <p className={`text-xs leading-[1.2] tracking-tight font-light mt-6 ${isGreen ? 'text-white/90' : 'text-black/80'}`}>
                                            {card.description}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
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

                <div className="mt-0 md:mt-20 px-[5%] md:px-[0%]">
                    {featuredHref ? (
                        <Link
                            href={featuredHref}
                            className="group relative block w-full rounded-2xl overflow-hidden aspect-[16/9] md:aspect-[2.4/2] px-5"
                        >
                            {featuredContent}
                        </Link>
                    ) : (
                        <div className="relative w-full rounded-2xl overflow-hidden aspect-[3/4] md:h-[80dvh] w-full">
                            {featuredContent}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default OffGridStory;
