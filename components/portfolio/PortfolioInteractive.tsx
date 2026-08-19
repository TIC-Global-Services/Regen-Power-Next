'use client';

import React, { useState, useMemo, useCallback } from 'react';
import type { PortfolioItem } from '@/utils/portfolio.model';
import PortfolioFilters from './PortfolioFilters';
import PortfolioHoverRow from './PortfolioHoverRow';

/* ─── Constants ─── */

const ITEMS_PER_PAGE = 12;
const ROW_SIZE = 3;

/* ─── Props ─── */

export interface PortfolioInteractiveProps {
  /** Portfolio items — from Strapi or the fallback static data */
  items: PortfolioItem[];
  /** Industry (non-size) filter options for the dropdown */
  industries: { label: string; value: string }[];
  /** System-size filter options for the dropdown */
  systemSizes: { label: string; value: string }[];
  /** Location (state) filter options for the dropdown */
  locations: { label: string; value: string }[];
}

/* ─── Filter state shape ─── */

interface FilterState {
  industry: string | null;
  size: string | null;
  location: string | null;
  search: string;
}

const INITIAL_FILTERS: FilterState = {
  industry: null,
  size: null,
  location: null,
  search: '',
};

/* ─── Helpers ─── */

/** Case-insensitive substring match */
function matchesSearch(item: PortfolioItem, query: string): boolean {
  const q = query.toLowerCase();
  return (
    item.title.toLowerCase().includes(q) ||
    (item.suburb?.toLowerCase().includes(q) ?? false) ||
    (item.postcode?.toLowerCase().includes(q) ?? false) ||
    item.categories.some((c) => c.toLowerCase().includes(q))
  );
}

/** Check whether a portfolio item passes all active filters */
function passesFilters(item: PortfolioItem, filters: FilterState): boolean {
  if (filters.industry && !item.filters.includes(filters.industry)) return false;
  if (filters.size && !item.filters.includes(filters.size)) return false;
  if (filters.location && item.state !== filters.location) return false;
  if (filters.search && !matchesSearch(item, filters.search)) return false;
  return true;
}

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

/* ─── Component ─── */

const PortfolioInteractive: React.FC<PortfolioInteractiveProps> = ({
  items,
  industries,
  systemSizes,
  locations,
}) => {
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [currentPage, setCurrentPage] = useState(1);

  /* Reset to page 1 when filters change */
  const handleFilterChange = useCallback(
    (next: { industry: string | null; size: string | null; location: string | null; search: string }) => {
      setFilters(next);
      setCurrentPage(1);
    },
    [],
  );

  /* Derived: filtered items */
  const filteredItems = useMemo(
    () => items.filter((item) => passesFilters(item, filters)),
    [items, filters],
  );

  /* Pagination math */
  const totalPages = Math.max(1, Math.ceil(filteredItems.length / ITEMS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const startIdx = (safePage - 1) * ITEMS_PER_PAGE;
  const visibleItems = filteredItems.slice(startIdx, startIdx + ITEMS_PER_PAGE);
  const pageNumbers = getPageNumbers(safePage, totalPages);

  /* Chunk the page into rows of 3 for the hover-expand card rows */
  const rows: PortfolioItem[][] = [];
  for (let i = 0; i < visibleItems.length; i += ROW_SIZE) {
    rows.push(visibleItems.slice(i, i + ROW_SIZE));
  }

  return (
    <>
      {/* Filter bar */}
      <PortfolioFilters
        industries={industries}
        systemSizes={systemSizes}
        locations={locations}
        onFilterChange={handleFilterChange}
      />

      {/* Results count */}
      <section className="w-full px-[5%] md:px-[3%]">
        <div className="max-w-7xl mx-auto pt-4 pb-2">
          <p className="text-sm text-black/50 tracking-tight">
            Showing {visibleItems.length} of {filteredItems.length} project{filteredItems.length !== 1 ? 's' : ''}
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="w-full px-[5%] md:px-[3%] py-8 md:py-12">
        <div className="max-w-7xl mx-auto">
          {visibleItems.length === 0 ? (
            <p className="text-center text-black/60 py-16 tracking-tight">
              No projects match the current filters.
            </p>
          ) : (
            <div className="flex flex-col gap-5 md:gap-6">
              {rows.map((row, idx) => (
                <PortfolioHoverRow key={idx} items={row} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Pagination */}
      {totalPages > 1 && (
        <section className="w-full px-[5%] md:px-[3%] pb-12">
          <div className="max-w-7xl mx-auto flex justify-center items-center gap-2">
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
        </section>
      )}
    </>
  );
};

export default PortfolioInteractive;
