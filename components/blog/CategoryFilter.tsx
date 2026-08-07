'use client';

import React, { useState } from 'react';

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

    const handleSelect = (cat: string) => {
        setActive(cat);
        onChange?.(cat);
    };

    return (
        <div className="w-full flex justify-center py-10 md:py-14 px-[5%]">
            <div className="flex flex-wrap md:flex-wrap overflow-x-auto md:overflow-visible md:justify-center gap-2 md:gap-3 max-w-4xl whitespace-nowrap [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {categories.map((cat) => {
                    const isActive = active === cat.value;
                    return (
                        <button
                            key={cat.value}
                            onClick={() => handleSelect(cat.value)}
                            className={`px-5 md:px-6 py-2.5 md:py-3 rounded-full text-sm md:text-base font-medium tracking-tight transition-all duration-300 border ${
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
        </div>
    );
};

export default CategoryFilter;
