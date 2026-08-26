"use client";

import React from 'react';
import Image, { StaticImageData } from 'next/image';
import { SliderDots, SliderArrows, useSnapSlider } from '@/reuseables/MobileSliderControls';

export interface FourPillarsCard {
    title: string;
    description: string;
    image?: StaticImageData | string;
}

export interface FourPillarsData {
    topSubtitle: string;
    title: string;
    description?: string;
    cards: FourPillarsCard[];
}

const FourPillars = ({ data }: { data: FourPillarsData }) => {
    const { trackRef, sync, active, canPrev, canNext, goTo, next, prev } = useSnapSlider(data.cards.length);

    return (
        <section className="bg-white py-8 md:py-16 px-[5%] md:px-[3%]">
            {/* Centered Section Header */}
            <div className="text-left md:text-center mb-10 md:mb-14 capitalize">
                {data.topSubtitle && (
                    <h3 className="text-base md:text-[2.125rem] text-black font-normal tracking-tight">
                        {data.topSubtitle}
                    </h3>
                )}
                {data.title && (
                    <h2 className="text-[2.5rem] md:text-6xl lg:text-[5rem] text-[#63B846] font-light leading-[1] tracking-tighter">
                        {data.title}
                    </h2>
                )}
                {data.description && (
                    <p className="text-black text-base md:text-lg leading-[1.2] tracking-tight whitespace-pre-line mt-4 max-w-3xl mx-auto">
                        {data.description}
                    </p>
                )}
            </div>

            {/* Mobile: Horizontal Slider */}
            <div
                ref={trackRef}
                onScroll={sync}
                className="flex overflow-x-auto lg:hidden gap-4 -mx-[5%] px-[5%] md:-mx-[3%] md:px-[3%] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pb-4 "
            >
                {data.cards.map((card, idx) => (
                    <div
                        key={idx}
                        className="relative rounded-[20px] overflow-hidden h-[320px] w-[75vw] md:w-[55vw] shrink-0 snap-start"
                    >
                        {/* Background image */}
                        {card.image && (
                            <Image
                                src={card.image}
                                alt={card.title}
                                fill
                                className="object-cover"
                            />
                        )}

                        {/* Dark gradient overlay for legibility */}
                        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/30 to-black/70" />

                        {/* Title pinned to top, description pinned to bottom */}
                        <div className="absolute inset-0 flex flex-col justify-between p-5">
                            <h4 className="text-white text-xl md:text-2xl font-medium tracking-tight leading-[1.2]">
                                {card.title}
                            </h4>
                            <p className="text-white text-xs md:text-base tracking-tight leading-[1.3]">
                                {card.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="lg:hidden">
                <SliderDots count={data.cards.length} active={active} onSelect={goTo} className="mt-5" />
                <SliderArrows canPrev={canPrev} canNext={canNext} onPrev={prev} onNext={next} className="mt-4" />
            </div>

            {/* Desktop: Four Column Card Grid */}
            <div className="hidden lg:grid lg:grid-cols-4 gap-4 lg:gap-2">
                {data.cards.map((card, idx) => (
                    <div
                        key={idx}
                        className="relative rounded-[20px] overflow-hidden min-h-[320px] md:min-h-[420px] max-w-full w-[320px] justify-self-center"
                    >
                        {/* Background image */}
                        {card.image && (
                            <Image
                                src={card.image}
                                alt={card.title}
                                fill
                                className="object-cover"
                            />
                        )}

                        {/* Dark gradient overlay for legibility */}
                        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/30 to-black/70" />

                        {/* Title pinned to top, description pinned to bottom */}
                        <div className="absolute inset-0 flex flex-col justify-between p-5 md:p-6">
                            <h4 className="text-white text-xl md:text-[1.5rem] font-medium tracking-tight leading-[1.2]">
                                {card.title}
                            </h4>
                            <p className="text-white text-xs md:text-base tracking-tight leading-[1.2] mb-4 mx-auto">
                                {card.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FourPillars;
