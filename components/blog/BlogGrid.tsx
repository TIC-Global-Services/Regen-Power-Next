'use client';

import React, { useState } from 'react';
import BlogCard, { BlogCardData } from './BlogCard';
import CategoryFilter, { CategoryOption } from './CategoryFilter';

interface BlogGridProps {
    categories: CategoryOption[];
    defaultCategory?: string;
    cards: BlogCardData[];
}

const ITEMS_PER_PAGE = 20;

/** Generate page numbers with ellipsis for large page counts */
function getPageNumbers(current: number, total: number): (number | 'ellipsis')[] {
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

    const pages: (number | 'ellipsis')[] = [1];

    if (current > 3) pages.push('ellipsis');

    const start = Math.max(2, current - 1);
    const end = Math.min(total - 1, current + 1);

    for (let i = start; i <= end; i++) pages.push(i);

    if (current < total - 2) pages.push('ellipsis');

    pages.push(total);
    return pages;
}

const BlogGrid: React.FC<BlogGridProps> = ({
    categories,
    defaultCategory,
    cards,
}) => {
    const [activeCategory, setActiveCategory] = useState<string>(defaultCategory ?? categories[0]?.value ?? '');
    const [currentPage, setCurrentPage] = useState<number>(1);

    const handleCategoryChange = (cat: string) => {
        setActiveCategory(cat);
        setCurrentPage(1);
    };

    // Filter cards by the active category ('all' shows everything).
    // Match against all of a card's categories, not just the first.
    const filteredCards = activeCategory && activeCategory !== 'all'
        ? cards.filter((c) => c.categoryKeys?.includes(activeCategory) ?? c.categoryKey === activeCategory)
        : cards;

    /* Pagination math */
    const totalPages = Math.max(1, Math.ceil(filteredCards.length / ITEMS_PER_PAGE));
    const safePage = Math.min(currentPage, totalPages);
    const startIdx = (safePage - 1) * ITEMS_PER_PAGE;
    const pageCards = filteredCards.slice(startIdx, startIdx + ITEMS_PER_PAGE);
    const pageNumbers = getPageNumbers(safePage, totalPages);

    // Each row = ONE article: its text tile (title + description) + its own image tile,
    // alternating sides: text|image, image|text, text|image …
    const rows = pageCards.map((card, idx) => {
        const textLeft = idx % 2 === 0;
        return (
            <div key={idx} className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
                {/* Text tile — first on mobile; left on even rows, right on odd rows on desktop */}
                <div className={`md:col-span-1 ${textLeft ? 'md:order-1' : 'md:order-2'}`}>
                    <BlogCard card={card} variant="text" />
                </div>
                {/* Image tile — the same article's image; right on even rows, left on odd rows on desktop */}
                <div className={`md:col-span-2 ${textLeft ? 'md:order-2' : 'md:order-1'}`}>
                    <BlogCard card={card} variant="image" />
                </div>
            </div>
        );
    });

    return (
        <section className="w-full px-[5%] md:px-[3%] pb-20 md:pb-28">
            <CategoryFilter
                categories={categories}
                defaultCategory={activeCategory}
                onChange={handleCategoryChange}
            />

            {/* Results count — one article per row, so it matches the rows rendered */}
            <div className="max-w-7xl mx-auto pt-2 pb-2">
                <p className="text-sm text-black/50 tracking-tight">
                    Showing {pageCards.length} of {filteredCards.length} article{filteredCards.length !== 1 ? 's' : ''}
                </p>
            </div>

            <div className="flex flex-col gap-5 md:gap-6 max-w-7xl mx-auto">
                {rows.length === 0 ? (
                    <p className="text-center text-black/60 py-16 tracking-tight">
                        No articles match the current category.
                    </p>
                ) : (
                    rows
                )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="max-w-7xl mx-auto mt-10 md:mt-14 flex justify-center items-center gap-2">
                    {/* Previous button */}
                    <button
                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                        disabled={safePage === 1}
                        className="px-3 py-2 rounded-lg text-sm font-medium tracking-tight transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#E5EFD5] cursor-pointer"
                        aria-label="Previous page"
                    >
                        ←
                    </button>

                    {/* Page numbers */}
                    {pageNumbers.map((page, idx) =>
                        page === 'ellipsis' ? (
                            <span key={`ellipsis-${idx}`} className="px-2 text-black/40 text-sm select-none">
                                …
                            </span>
                        ) : (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`min-w-[36px] h-9 rounded-lg text-sm font-medium tracking-tight transition-all cursor-pointer ${safePage === page
                                        ? 'bg-[#A0CF44] text-white'
                                        : 'text-black/70 hover:bg-[#E5EFD5]'
                                    }`}
                            >
                                {page}
                            </button>
                        ),
                    )}

                    {/* Next button */}
                    <button
                        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                        disabled={safePage === totalPages}
                        className="px-3 py-2 rounded-lg text-sm font-medium tracking-tight transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#E5EFD5] cursor-pointer"
                        aria-label="Next page"
                    >
                        →
                    </button>
                </div>
            )}
        </section>
    );
};

export default BlogGrid;
