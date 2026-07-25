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
    const [activeCategory, setActiveCategory] = useState<string>(
        defaultCategory ?? categories[0]?.value ?? ''
    );

    const pairs: [BlogCardData, BlogCardData][] = [];
    for (let i = 0; i < cards.length; i += 2) {
        const first = cards[i];
        const second = cards[i + 1];
        if (first && second) {
            pairs.push([first, second]);
        }
    }

    return (
        <section className="w-full px-[5%] pb-20 md:pb-28">
            <CategoryFilter
                categories={categories}
                defaultCategory={defaultCategory}
                onChange={setActiveCategory}
            />

            <div className="grid grid-cols-3 gap-5 md:gap-6 max-w-7xl mx-auto">
                {pairs.map(([textCard, imageCard], idx) =>
                    idx % 2 === 0 ? (
                        <React.Fragment key={idx}>
                            <div className="col-span-1">
                                <BlogCard card={textCard} />
                            </div>
                            <div className="col-span-2">
                                <BlogCard card={imageCard} />
                            </div>
                        </React.Fragment>
                    ) : (
                        <React.Fragment key={idx}>
                            <div className="col-span-2">
                                <BlogCard card={imageCard} />
                            </div>
                            <div className="col-span-1">
                                <BlogCard card={textCard} />
                            </div>
                        </React.Fragment>
                    )
                )}
            </div>
        </section>
    );
};

export default BlogGrid;
