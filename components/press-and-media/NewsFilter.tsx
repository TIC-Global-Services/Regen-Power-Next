'use client';

import React, { useState, useRef, useEffect } from 'react';
import { SlidersHorizontal, X } from 'lucide-react';

export interface CategoryOption {
    label: string;
    value: string;
}

interface NewsFilterProps {
    categories: CategoryOption[];
    defaultCategory?: string;
    active?: string;
    onChange?: (category: string) => void;
    /** Multi-select categories (from the filter button). Empty = not using multi-select. */
    selected?: string[];
    onSelectedChange?: (values: string[]) => void;
}

const NewsFilter: React.FC<NewsFilterProps> = ({
    categories,
    defaultCategory,
    active: controlledActive,
    onChange,
    selected = [],
    onSelectedChange,
}) => {
    const initial = defaultCategory ?? categories[0]?.value ?? '';
    const [internalActive, setInternalActive] = useState<string>(initial);
    const active = controlledActive ?? internalActive;

    // Filter button panel state
    const [panelOpen, setPanelOpen] = useState(false);
    const [internalSelected, setInternalSelected] = useState<string[]>([]);
    const selectedMultiSelected = onSelectedChange ? selected : internalSelected;
    const panelRef = useRef<HTMLDivElement>(null);

    const handleSelect = (cat: string) => {
        if (controlledActive === undefined) setInternalActive(cat);
        onChange?.(cat);
    };

    const toggleCategory = (value: string) => {
        const next = selectedMultiSelected.includes(value)
            ? selectedMultiSelected.filter((v) => v !== value)
            : [...selectedMultiSelected, value];
        if (onSelectedChange) onSelectedChange(next);
        else setInternalSelected(next);
    };

    const clearAll = () => {
        if (onSelectedChange) onSelectedChange([]);
        else setInternalSelected([]);
    };

    // Close panel on outside click
    useEffect(() => {
        if (!panelOpen) return;
        const handler = (e: MouseEvent) => {
            if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
                setPanelOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, [panelOpen]);

    const nonAllCategories = categories.filter((c) => c.value !== 'All');

    return (
        <div className="w-full px-[5%] py-8 md:py-10 relative">
            <div className="flex items-center justify-between gap-4 max-w-7xl mx-auto">
                <div className="flex flex-nowrap md:flex-wrap items-center gap-2 md:gap-3 overflow-x-auto md:overflow-visible whitespace-nowrap snap-x snap-mandatory md:snap-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    {categories.map((cat) => {
                        const isActive = active === cat.value;
                        return (
                            <button
                                key={cat.value}
                                onClick={() => handleSelect(cat.value)}
                                className={`shrink-0 snap-start px-4 md:px-5 py-2 md:py-2.5 rounded-full text-sm md:text-base font-medium tracking-tight transition-all duration-300 border whitespace-nowrap ${
                                    isActive
                                        ? 'bg-[#D5E5C0] border-[#D5E5C0] text-black'
                                        : 'bg-transparent border-transparent text-black hover:bg-black/5'
                                }`}
                            >
                                {cat.label}
                            </button>
                        );
                    })}
                </div>
                <button
                    aria-label="More filters"
                    onClick={() => setPanelOpen((open) => !open)}
                    className={`flex-shrink-0 w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center transition-colors ${
                        selectedMultiSelected.length > 0
                            ? 'bg-[#63B846] text-white'
                            : 'bg-[#D5E5C0] hover:bg-[#c5d8a8] text-black'
                    }`}
                >
                    <SlidersHorizontal size={16} strokeWidth={2.2} />
                </button>
            </div>

            {/* Multi-select panel */}
            {panelOpen && (
                <div
                    ref={panelRef}
                    className="absolute right-[5%] top-full mt-2 z-20 w-[280px] md:w-[320px] bg-white border border-gray-100 rounded-2xl shadow-xl p-5"
                >
                    <div className="flex items-center justify-between mb-4">
                        <h4 className="text-base font-medium text-black tracking-tight">
                            Filter by category
                        </h4>
                        <button
                            onClick={() => setPanelOpen(false)}
                            aria-label="Close filters"
                            className="w-8 h-8 flex items-center justify-center rounded-full bg-black/5 text-black hover:bg-black/10"
                        >
                            <X size={16} />
                        </button>
                    </div>

                    <div className="flex flex-col gap-1.5 max-h-64 overflow-y-auto">
                        {nonAllCategories.map((cat) => {
                            const isChecked = selectedMultiSelected.includes(cat.value);
                            return (
                                <label
                                    key={cat.value}
                                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-colors ${
                                        isChecked ? 'bg-[#D5E5C0]/60' : 'hover:bg-black/5'
                                    }`}
                                >
                                    <input
                                        type="checkbox"
                                        checked={isChecked}
                                        onChange={() => toggleCategory(cat.value)}
                                        className="w-4 h-4 accent-[#63B846]"
                                    />
                                    <span className="text-sm text-black tracking-tight">
                                        {cat.label}
                                    </span>
                                </label>
                            );
                        })}
                    </div>

                    {selectedMultiSelected.length > 0 && (
                        <button
                            onClick={clearAll}
                            className="mt-4 w-full py-2.5 rounded-full border border-[#63B846] text-[#63B846] text-sm font-medium hover:bg-[#63B846]/10 transition-colors"
                        >
                            Clear filters
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default NewsFilter;