'use client';

import React, { useState } from 'react';
import Image, { StaticImageData } from 'next/image';

export interface FilterOption {
    label: string;
    value: string;
}

export interface PortfolioCard {
    title: string;
    description: string;
    image: StaticImageData | string;
    categoryKey?: string;
}

interface PortfolioInteractiveProps {
    filters: FilterOption[];
    cards: PortfolioCard[];
}

const PortfolioInteractive: React.FC<PortfolioInteractiveProps> = ({
    filters,
    cards,
}) => {
    const [activeFilter, setActiveFilter] = useState('all');

    const filtered = activeFilter === 'all'
        ? cards
        : cards.filter((c) => c.categoryKey === activeFilter);

    return (
        <section className="w-full px-[5%] py-12 md:py-20">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-wrap gap-2 mb-10 md:mb-14">
                    <button
                        onClick={() => setActiveFilter('all')}
                        className={`px-4 py-2 rounded-full text-sm md:text-base font-medium tracking-tight transition-all ${
                            activeFilter === 'all'
                                ? 'bg-[#A0CF44] text-black'
                                : 'bg-[#E5EFD5] text-black/70 hover:text-black'
                        }`}
                    >
                        All
                    </button>
                    {filters.map((f) => (
                        <button
                            key={f.value}
                            onClick={() => setActiveFilter(f.value)}
                            className={`px-4 py-2 rounded-full text-sm md:text-base font-medium tracking-tight transition-all ${
                                activeFilter === f.value
                                    ? 'bg-[#A0CF44] text-black'
                                    : 'bg-[#E5EFD5] text-black/70 hover:text-black'
                            }`}
                        >
                            {f.label}
                        </button>
                    ))}
                </div>

                {filtered.length === 0 ? (
                    <p className="text-center text-black/60 py-16 tracking-tight">
                        No projects match this filter.
                    </p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
                        {filtered.map((card, idx) => (
                            <div
                                key={idx}
                                className="bg-[#E5EFD5] rounded-[20px] overflow-hidden flex flex-col"
                            >
                                {card.image && (
                                    <div className="relative w-full aspect-[4/3]">
                                        <Image
                                            src={card.image}
                                            alt={card.title}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                )}
                                <div className="p-5 md:p-6 flex flex-col gap-2">
                                    <h3 className="text-xl md:text-2xl font-normal text-black tracking-tight leading-tight">
                                        {card.title}
                                    </h3>
                                    <p className="text-sm md:text-base text-black/75 leading-snug tracking-tight">
                                        {card.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default PortfolioInteractive;
