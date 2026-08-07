'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import SectionHeader from '@/reuseables/SectionHeader';
import Reveal from '@/reuseables/Reveal';

export interface FiveThingItem {
    number: number;
    title: string;
    description: string;
    highlight?: boolean;
}

interface FiveThingsSectionProps {
    subtitle: string;
    title: string;
    description: string;
    items: FiveThingItem[];
}

const FiveThingsSection: React.FC<FiveThingsSectionProps> = ({
    subtitle,
    title,
    description,
    items,
}) => {
    const sliderRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const handleScroll = useCallback(() => {
        const slider = sliderRef.current;
        if (!slider) return;
        const scrollLeft = slider.scrollLeft;
        const cardWidth = slider.children[0]?.clientWidth ?? 1;
        const gap = 16; // matches gap-4 (1rem = 16px)
        const index = Math.round(scrollLeft / (cardWidth + gap));
        setActiveIndex(Math.min(index, items.length - 1));
    }, [items.length]);

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
        <section className="py-12 md:py-24 bg-white">
            <div className="px-[5%] mx-auto">
                <SectionHeader
                    subtitle={subtitle}
                    title={title}
                    description={description}
                    align="left"
                    subtitleClass="text-lg md:text-2xl font-light text-black tracking-tight text-left md:text-center"
                    titleClass="text-4xl md:text-6xl lg:text-[4.5rem] text-[#63B846] font-normal tracking-tighter leading-none text-left md:text-center"
                    descClass="text-left md:text-center"
                    className="md:items-center md:text-center md:mx-auto mx-auto max-w-4xl mb-12 md:mb-24"
                />

                {/* Desktop staggered grid */}
                <div className="hidden md:grid grid-cols-5 gap-3 md:gap-4 max-w-6xl mx-auto items-start">
                    {items.map((item, idx) => {
                        const isOffset = idx % 2 === 1;
                        const bg = item.highlight ? 'bg-[#A0CF44]' : 'bg-[#E5EFD5]';

                        return (
                            <Reveal
                                key={idx}
                                delay={idx * 0.1}
                                className={`relative flex flex-col ${
                                    isOffset ? 'mt-16 md:mt-24' : ''
                                }`}
                            >
                                {/* Number — top for even cards, bottom for odd-offset cards */}
                                {!isOffset ? (
                                    <span
                                        className={`text-[#1a1a1a] text-6xl md:text-8xl lg:text-[7rem] font-normal leading-none tracking-tighter select-none mb-2 ${
                                            item.highlight ? 'order-2' : 'order-1'
                                        }`}
                                    >
                                        {item.number}
                                    </span>
                                ) : null}

                                <div
                                    className={`${bg} rounded-[20px] p-5 md:p-6 flex flex-col min-h-[280px] md:min-h-[340px] transition-all duration-300 hover:scale-[1.02] ${
                                        isOffset ? 'order-1' : 'order-2'
                                    }`}
                                >
                                    <h3 className="text-lg md:text-xl lg:text-2xl font-normal text-black tracking-tight leading-tight mb-3">
                                        {item.title}
                                    </h3>
                                    <p className="text-xs md:text-sm text-black/80 leading-snug tracking-tight">
                                        {item.description}
                                    </p>
                                </div>

                                {isOffset ? (
                                    <span
                                        className={`text-[#1a1a1a] text-6xl md:text-8xl lg:text-[7rem] font-normal leading-none tracking-tighter select-none mt-2 ${
                                            item.highlight ? 'order-1' : 'order-3'
                                        }`}
                                    >
                                        {item.number}
                                    </span>
                                ) : null}
                            </Reveal>
                        );
                    })}
                </div>

                {/* Mobile slider */}
                <div className="md:hidden">
                    <div
                        ref={sliderRef}
                        className="flex  gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2 -mx-[2%]"
                        style={{ WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {items.map((item, idx) => {
                            const bg = item.highlight ? 'bg-[#A0CF44]' : 'bg-[#E5EFD5]';
                            return (
                                <div
                                    key={idx}
                                    className="snap-start shrink-0 w-[62%]"
                                >
                                    <div
                                        className={`${bg} rounded-[20px] p-6 flex flex-col min-h-[320px]`}
                                    >
                                        <span className="text-[#1a1a1a] text-6xl font-normal leading-none tracking-tighter select-none mb-3">
                                            {item.number}
                                        </span>
                                        <h3 className="text-lg font-normal text-black tracking-tight leading-tight mb-2">
                                            {item.title}
                                        </h3>
                                        <p className="text-xs text-black/80 leading-snug tracking-tight">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Dot indicators */}
                    <div className="flex justify-center gap-2 mt-5">
                        {items.map((_, index) => (
                            <button
                                key={index}
                                aria-label={`Go to slide ${index + 1}`}
                                onClick={() => scrollToIndex(index)}
                                className={`rounded-full transition-all duration-300 ${
                                    index === activeIndex
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

export default FiveThingsSection;
