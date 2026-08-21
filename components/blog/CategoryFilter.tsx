'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronRight } from 'lucide-react';

export interface CategoryOption {
    label: string;
    value: string;
}

interface CategoryFilterProps {
    categories: CategoryOption[];
    defaultCategory?: string;
    onChange?: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
    categories,
    defaultCategory,
    onChange,
}) => {
    const [active, setActive] = useState<string>(defaultCategory ?? categories[0]?.value ?? '');
    const scrollRef = useRef<HTMLDivElement>(null);
    const [canScrollRight, setCanScrollRight] = useState(false);

    /** True while there is still hidden content beyond the right edge of the slider. */
    const updateCanScrollRight = useCallback(() => {
        const el = scrollRef.current;
        if (!el) return;
        setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
    }, []);

    useEffect(() => {
        updateCanScrollRight();
        window.addEventListener('resize', updateCanScrollRight);
        return () => window.removeEventListener('resize', updateCanScrollRight);
    }, [updateCanScrollRight, categories]);

    const handleSelect = (cat: string) => {
        setActive(cat);
        onChange?.(cat);
    };

    /** Slide the row left by ~70% of its visible width. */
    const handleHintClick = () => {
        const el = scrollRef.current;
        if (!el) return;
        el.scrollBy({ left: el.clientWidth * 0.7, behavior: 'smooth' });
    };

    return (
        <div className="relative w-full flex justify-center py-10 md:py-14 px-[5%] md:px-[3%]">
            <div
                ref={scrollRef}
                onScroll={updateCanScrollRight}
                className="flex flex-nowrap lg:flex-wrap overflow-x-auto lg:overflow-visible lg:justify-center gap-2 md:gap-3 max-w-4xl whitespace-nowrap -mx-[5%] lg:snap-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            >
                {categories.map((cat) => {
                    const isActive = active === cat.value;
                    return (
                        <button
                            key={cat.value}
                            onClick={() => handleSelect(cat.value)}
                            className={`shrink-0 snap-start px-5 md:px-6 py-2.5 md:py-3 rounded-full text-sm md:text-base font-medium tracking-tight transition-all duration-300 border ${isActive
                                ? 'bg-[#D5E5C0] border-[#D5E5C0] text-black'
                                : 'bg-transparent border-transparent text-black hover:bg-black/5'
                                }`}
                        >
                            {cat.label}
                        </button>
                    );
                })}
            </div>

            {/* ›› scroll hint — mobile/tablet only, clickable, hides once you reach the end */}
            {canScrollRight && (
                <button
                    type="button"
                    onClick={handleHintClick}
                    aria-label="Scroll to see more categories"
                    className="lg:hidden absolute inset-y-0 -right-[5%] md:-right-[3%] flex items-center justify-end w-16 pr-1 bg-gradient-to-l from-white via-white/80 to-transparent cursor-pointer"
                >
                    <span className="flex items-center text-black/60">
                        <ChevronRight className="w-4 h-4" strokeWidth={2.5} />
                        <ChevronRight className="w-4 h-4 -ml-2.5" strokeWidth={2.5} />
                    </span>
                </button>
            )}
        </div>
    );
};

export default CategoryFilter;
