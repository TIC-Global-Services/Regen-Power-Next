'use client';
import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SliderDots, SliderArrows, useSnapSlider } from '@/reuseables/MobileSliderControls';

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
    const { trackRef, sync, active, canPrev, canNext, goTo, next, prev } = useSnapSlider(cards.length);

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
                                className={`${isGreen ? 'bg-[#63B846]' : 'bg-[#EEF6EB]'} rounded-[20px] overflow-hidden flex flex-col h-full p-8 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl`}
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
                        ref={trackRef}
                        onScroll={sync}
                        className="flex gap-4 overflow-x-auto  -mx-[0%] px-[5%] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                        style={{ WebkitOverflowScrolling: 'touch' }}
                    >
                        {cards.map((card, idx) => {
                            const isGreen = idx % 2 === 0;
                            return (
                                <div
                                    key={idx}
                                    className="snap-start shrink-0 w-[85%]"
                                >
                                    <div
                                        className={`${isGreen ? 'bg-[#63B846]' : 'bg-[#EEF6EB]'} rounded-[20px] overflow-hidden flex flex-col h-full p-8 min-h-[250px] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl`}
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

                    <SliderDots count={cards.length} active={active} onSelect={goTo} className="mt-5" />
                    <SliderArrows canPrev={canPrev} canNext={canNext} onPrev={prev} onNext={next} className="mt-4" />
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
