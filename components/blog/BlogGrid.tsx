'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Search, X, SlidersHorizontal, Check } from 'lucide-react';
import BlogCard, { BlogCardData } from './BlogCard';
import CategoryFilter, { CategoryOption } from './CategoryFilter';
import FadeSwap from '@/reuseables/FadeSwap';

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

const ALL_SORT = 'newest';
/** Years are grouped into fixed 3-year windows anchored to the newest year present, e.g. 2026-2024, 2023-2021. Selecting a whole window is the filter — there's no per-year drill-down. */
const YEAR_GROUP_SIZE = 3;

interface YearGroup {
    label: string;
    start: number;
    end: number;
}

/** Build calendar windows of YEAR_GROUP_SIZE years, anchored to `anchor`, covering every year down to the oldest present. */
function groupYears(years: number[], anchor: number): YearGroup[] {
    const oldest = Math.min(...years);
    const groups: YearGroup[] = [];
    for (let start = anchor; start >= oldest; start -= YEAR_GROUP_SIZE) {
        const end = start - (YEAR_GROUP_SIZE - 1);
        groups.push({ label: `${start}-${end}`, start, end });
    }
    return groups;
}

const BlogGrid: React.FC<BlogGridProps> = ({
    categories,
    defaultCategory,
    cards,
}) => {
    const [activeCategory, setActiveCategory] = useState<string>(defaultCategory ?? categories[0]?.value ?? '');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [query, setQuery] = useState<string>('');
    const [activeYearGroup, setActiveYearGroup] = useState<YearGroup | null>(null);
    const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>(ALL_SORT);
    const [filterOpen, setFilterOpen] = useState(false);
    const filterRef = useRef<HTMLDivElement>(null);

    // Years present in the data, newest first — drives the year filter options.
    const years = Array.from(
        new Set(
            cards
                .map((c) => (c.publishedAt ? new Date(c.publishedAt).getFullYear() : null))
                .filter((y): y is number => y !== null)
        )
    ).sort((a, b) => b - a);
    const yearGroups = years.length > 0 ? groupYears(years, years[0]) : [];

    useEffect(() => {
        if (!filterOpen) return;
        const onClick = (e: MouseEvent) => {
            if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
                setFilterOpen(false);
            }
        };
        document.addEventListener('mousedown', onClick);
        return () => document.removeEventListener('mousedown', onClick);
    }, [filterOpen]);

    const handleCategoryChange = (cat: string) => {
        setActiveCategory(cat);
        setCurrentPage(1);
    };

    const handleSearchChange = (value: string) => {
        setQuery(value);
        setCurrentPage(1);
    };

    const handleYearGroupChange = (group: YearGroup | null) => {
        setActiveYearGroup(group);
        setCurrentPage(1);
        setFilterOpen(false);
    };

    const handleSortChange = (order: 'newest' | 'oldest') => {
        setSortOrder(order);
        setCurrentPage(1);
    };

    const activeFilterCount = (activeYearGroup ? 1 : 0) + (sortOrder !== ALL_SORT ? 1 : 0);

    const clearFilters = () => {
        setActiveYearGroup(null);
        setSortOrder(ALL_SORT);
        setCurrentPage(1);
    };

    // Filter cards by category ('all' shows everything), the year filter, and
    // the search query (matched against title + description, case-insensitive).
    // Category matching uses all of a card's categories, not just the first.
    const q = query.trim().toLowerCase();
    const filteredCards = (activeCategory && activeCategory !== 'all'
        ? cards.filter((c) => c.categoryKeys?.includes(activeCategory) ?? c.categoryKey === activeCategory)
        : cards
    ).filter((c) =>
        (!q ||
            c.title.toLowerCase().includes(q) ||
            c.description.toLowerCase().includes(q)) &&
        (!activeYearGroup ||
            (c.publishedAt &&
                (() => {
                    const y = new Date(c.publishedAt).getFullYear();
                    return y >= activeYearGroup.end && y <= activeYearGroup.start;
                })()))
    ).sort((a, b) => {
        if (!a.publishedAt || !b.publishedAt) return 0;
        const diff = new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime();
        return sortOrder === 'newest' ? -diff : diff;
    });

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

            {/* Search + filter */}
            <div className="max-w-7xl mx-auto flex justify-center items-start gap-3 pb-6">
                <div className="relative w-full max-w-md">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-black/40 pointer-events-none" />
                    <input
                        type="search"
                        value={query}
                        onChange={(e) => handleSearchChange(e.target.value)}
                        placeholder="Search articles…"
                        aria-label="Search articles"
                        className="w-full rounded-full border border-black/10 bg-white py-2.5 pl-11 pr-10 text-sm md:text-base tracking-tight placeholder:text-black/35 focus:outline-none focus:border-[#A0CF44] focus:ring-2 focus:ring-[#A0CF44]/30 transition"
                    />
                    {query && (
                        <button
                            type="button"
                            onClick={() => handleSearchChange('')}
                            aria-label="Clear search"
                            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-black/40 hover:text-black transition-colors cursor-pointer"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    )}
                </div>

                {/* Filter — year + sort */}
                <div className="relative shrink-0" ref={filterRef}>
                    <button
                        type="button"
                        onClick={() => setFilterOpen((v) => !v)}
                        aria-expanded={filterOpen}
                        aria-label="Filter articles"
                        className={`relative flex items-center gap-2 rounded-full border py-2.5 px-4 text-sm md:text-base tracking-tight transition cursor-pointer ${filterOpen || activeFilterCount > 0
                                ? 'border-[#A0CF44] bg-[#F3F8EA] text-black'
                                : 'border-black/10 bg-white text-black/70 hover:border-black/20'
                            }`}
                    >
                        <SlidersHorizontal className="w-4 h-4" />
                        <span className="hidden sm:inline">Filter</span>
                        {activeFilterCount > 0 && (
                            <span className="flex items-center justify-center w-4 h-4 rounded-full bg-[#A0CF44] text-white text-[10px] font-semibold">
                                {activeFilterCount}
                            </span>
                        )}
                    </button>

                    {filterOpen && (
                        <div className="absolute right-0 z-20 mt-2 w-64 rounded-2xl border border-black/10 bg-white p-4 shadow-lg">
                            <div className="flex items-center justify-between mb-3">
                                <p className="text-sm font-medium tracking-tight">Filters</p>
                                {activeFilterCount > 0 && (
                                    <button
                                        type="button"
                                        onClick={clearFilters}
                                        className="text-xs font-medium text-[#4d7a17] hover:underline cursor-pointer"
                                    >
                                        Clear
                                    </button>
                                )}
                            </div>

                            {yearGroups.length > 0 && (
                                <div className="mb-4">
                                    <p className="text-xs font-medium text-black/50 uppercase tracking-wide mb-2">Year</p>
                                    <div className="flex flex-col gap-1">
                                        <button
                                            type="button"
                                            onClick={() => handleYearGroupChange(null)}
                                            className="flex items-center justify-between px-2 py-1.5 rounded-lg text-sm text-left hover:bg-[#F3F8EA] transition-colors cursor-pointer"
                                        >
                                            All years
                                            {!activeYearGroup && <Check className="w-4 h-4 text-[#4d7a17]" />}
                                        </button>
                                        {yearGroups.map((group) => (
                                            <button
                                                key={group.label}
                                                type="button"
                                                onClick={() => handleYearGroupChange(group)}
                                                className="flex items-center justify-between px-2 py-1.5 rounded-lg text-sm text-left hover:bg-[#F3F8EA] transition-colors cursor-pointer"
                                            >
                                                {group.label}
                                                {activeYearGroup?.label === group.label && <Check className="w-4 h-4 text-[#4d7a17]" />}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div>
                                <p className="text-xs font-medium text-black/50 uppercase tracking-wide mb-2">Sort by</p>
                                <div className="flex flex-col gap-1">
                                    {(['newest', 'oldest'] as const).map((order) => (
                                        <button
                                            key={order}
                                            type="button"
                                            onClick={() => handleSortChange(order)}
                                            className="flex items-center justify-between px-2 py-1.5 rounded-lg text-sm text-left capitalize hover:bg-[#F3F8EA] transition-colors cursor-pointer"
                                        >
                                            {order}
                                            {sortOrder === order && <Check className="w-4 h-4 text-[#4d7a17]" />}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Results count — one article per row, so it matches the rows rendered */}
            <div className="max-w-7xl mx-auto pt-2 pb-2">
                <p className="text-base md:text-lg text-black/50 tracking-tight">
                    Showing {pageCards.length} of {filteredCards.length} article{filteredCards.length !== 1 ? 's' : ''}
                    {q && (
                        <> for &ldquo;{query.trim()}&rdquo;</>
                    )}
                    {activeYearGroup && <> from {activeYearGroup.label}</>}
                </p>
            </div>

            <FadeSwap swapKey={`${activeCategory}|${activeYearGroup?.label ?? 'all'}|${sortOrder}|${safePage}`}>
              <div className="flex flex-col gap-5 md:gap-6 max-w-7xl mx-auto">
                {rows.length === 0 ? (
                    <div className="text-center py-16 tracking-tight">
                        <p className="text-black/60">
                            No articles match {q ? <>your search for &ldquo;{query.trim()}&rdquo;</> : 'the current filters'}.
                        </p>
                        {(q || activeYearGroup) && (
                            <button
                                type="button"
                                onClick={() => {
                                    handleSearchChange('');
                                    clearFilters();
                                }}
                                className="mt-3 text-sm font-medium text-[#4d7a17] hover:underline cursor-pointer"
                            >
                                Clear search &amp; filters
                            </button>
                        )}
                    </div>
                ) : (
                    rows
                )}
              </div>
            </FadeSwap>

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
