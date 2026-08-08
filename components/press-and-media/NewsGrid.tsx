'use client';

import React, { useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import NewsFilter, { CategoryOption } from './NewsFilter';

export interface PressCard {
    title: string;
    description: string;
    image: StaticImageData | string;
    categoryKey?: string;
}

interface NewsGridProps {
    subtitle?: string;
    title?: string;
    categories: CategoryOption[];
    defaultCategory?: string;
    cards?: PressCard[];
}

const NewsGrid: React.FC<NewsGridProps> = ({
    subtitle = 'Browse',
    title = 'All News',
    categories,
    defaultCategory,
    cards = [],
}) => {
    const [activeCategory, setActiveCategory] = useState<string>(
        defaultCategory ?? categories[0]?.value ?? ''
    );
    // Multi-select categories from the filter button (empty = not active)
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    // Filter cards: multi-select wins if any selected, else single-category logic
    const filteredCards =
        selectedCategories.length > 0
            ? cards.filter((c) => selectedCategories.includes(c.categoryKey || ''))
            : !activeCategory || activeCategory === 'All'
              ? cards
              : cards.filter((c) => c.categoryKey === activeCategory);

    return (
        <section className="w-full pb-20 md:pb-28">
            {/* {(subtitle || title) && (
                <div className="text-center mb-8 md:mb-10 px-[5%]">
                    {subtitle && (
                        <p className="text-2xl md:text-3xl font-light tracking-tight text-black mb-1">
                            {subtitle}
                        </p>
                    )}
                    {title && (
                        <h2 className="text-5xl md:text-6xl lg:text-7xl font-normal tracking-tight text-[#63B846]">
                            {title}
                        </h2>
                    )}
                </div>
            )} */}

            <NewsFilter
                categories={categories}
                defaultCategory={defaultCategory}
                active={activeCategory}
                onChange={setActiveCategory}
                selected={selectedCategories}
                onSelectedChange={setSelectedCategories}
            />

            <div className="px-[5%]">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 max-w-7xl mx-auto">
                    {filteredCards.map((card, idx) => (
                        <div
                            key={idx}
                            className="group relative block rounded-2xl overflow-hidden h-[320px] md:aspect-[3/4] md:h-auto"
                        >
                            <Image
                                src={card.image}
                                alt={card.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                sizes="(min-width: 768px) 33vw, 100vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5 text-white">
                                <h3 className="text-xl md:text-2xl font-medium tracking-tight leading-tight mb-1.5">
                                    {card.title}
                                </h3>
                                <p className="text-base leading-tight tracking-tight text-white/85">
                                    {card.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
                {filteredCards.length === 0 && (
                    <p className="text-center text-black/60 py-12">No news in this category yet.</p>
                )}
            </div>
        </section>
    );
};

export default NewsGrid;
