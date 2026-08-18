'use client';

import React, { useState } from 'react';
import Image, { StaticImageData } from 'next/image';

export interface PressCard {
    title: string;
    description: string;
    image: StaticImageData | string;
    categoryKey?: string;
    categoryKeys?: string[];
}

interface NewsGridProps {
    cards?: PressCard[];
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

const NewsGrid: React.FC<NewsGridProps> = ({ cards = [] }) => {
    const [currentPage, setCurrentPage] = useState<number>(1);

    /* Pagination math */
    const totalPages = Math.max(1, Math.ceil(cards.length / ITEMS_PER_PAGE));
    const safePage = Math.min(currentPage, totalPages);
    const startIdx = (safePage - 1) * ITEMS_PER_PAGE;
    const pageCards = cards.slice(startIdx, startIdx + ITEMS_PER_PAGE);
    const pageNumbers = getPageNumbers(safePage, totalPages);

    return (
        <section className="w-full pb-20 md:pb-28">
            <div className="px-[3%]">
                {/* Results count */}
                <div className="max-w-7xl mx-auto pt-2 pb-2">
                    <p className="text-sm text-black/50 tracking-tight">
                        Showing {pageCards.length} of {cards.length} article{cards.length !== 1 ? 's' : ''}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 max-w-7xl mx-auto">
                    {pageCards.map((card, idx) => (
                        <div
                            key={idx}
                            className="group relative block rounded-2xl overflow-hidden h-[320px] md:aspect-[3/4] md:h-auto"
                        >
                            <Image
                                src={card.image || '/fallback.png'}
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
                {pageCards.length === 0 && (
                    <p className="text-center text-black/60 py-12">No news found.</p>
                )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="max-w-7xl mx-auto mt-10 md:mt-14 flex justify-center items-center gap-2 px-[3%]">
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
                                className={`min-w-[36px] h-9 rounded-lg text-sm font-medium tracking-tight transition-all cursor-pointer ${
                                    safePage === page
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

export default NewsGrid;