'use client';

import React, { useState } from 'react';
import BlogCard, { BlogCardData } from './BlogCard';
import CategoryFilter, { CategoryOption } from './CategoryFilter';

interface BlogGridProps {
    categories: CategoryOption[];
    defaultCategory?: string;
    cards: BlogCardData[];
}

const BlogGrid: React.FC<BlogGridProps> = ({
    categories,
    defaultCategory,
    cards,
}) => {
    const [activeCategory, setActiveCategory] = useState<string>(defaultCategory ?? categories[0]?.value ?? '');

    // Filter cards by the active category
    const filteredCards = activeCategory
        ? cards.filter((c) => c.categoryKey === activeCategory)
        : cards;

    const pairs: [BlogCardData, BlogCardData][] = [];
    for (let i = 0; i < filteredCards.length; i += 2) {
        const first = filteredCards[i];
        const second = filteredCards[i + 1];
        if (first && second) {
            pairs.push([first, second]);
        }
    }

    return (
        <section className="w-full px-[3%] pb-20 md:pb-28">
            <CategoryFilter
                categories={categories}
                defaultCategory={activeCategory}
                onChange={setActiveCategory}
            />

            <div className="flex flex-col gap-5 md:gap-6 max-w-7xl mx-auto">
                {pairs.map(([textCard, imageCard], idx) => {
                    const textLeft = idx % 2 === 0;
                    return (
                        <div key={idx} className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
                            {/* Text card — first on mobile; left for even rows, right for odd rows on desktop */}
                            <div className={`md:col-span-1 ${textLeft ? 'md:order-1' : 'md:order-2'}`}>
                                <BlogCard card={textCard} variant="text" />
                            </div>
                            {/* Image card — second on mobile; right for even rows, left for odd rows on desktop */}
                            <div className={`md:col-span-2 ${textLeft ? 'md:order-2' : 'md:order-1'}`}>
                                <BlogCard card={imageCard} variant="image" />
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default BlogGrid;