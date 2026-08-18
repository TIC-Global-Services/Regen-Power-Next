'use client';

import React, { useState, useCallback } from 'react';
import { ChevronDown, Search, X } from 'lucide-react';

/* ─── Types ─── */

export interface FilterDropdownOption {
  label: string;
  value: string;
}

export interface PortfolioFiltersProps {
  industries: FilterDropdownOption[];
  systemSizes: FilterDropdownOption[];
  locations: FilterDropdownOption[];
  searchPlaceholder?: string;
  onFilterChange?: (filters: {
    industry: string | null;
    size: string | null;
    location: string | null;
    search: string;
  }) => void;
}

/* ─── Dropdown sub-component ─── */

interface DropdownProps {
  label: string;
  options: FilterDropdownOption[];
  value: string | null;
  onChange: (value: string | null) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ label, options, value, onChange }) => (
  <div className="relative flex-1 min-w-[160px]">
    <select
      value={value || ''}
      onChange={(e) => onChange(e.target.value || null)}
      className="w-full appearance-none bg-transparent border border-[#A0CF44] rounded-full px-5 py-2.5 pr-10 text-sm text-black cursor-pointer focus:outline-none focus:border-[#63B846] transition-colors"
    >
      <option value="">{label}</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
    <ChevronDown
      size={16}
      strokeWidth={2.5}
      className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#63B846]"
    />
  </div>
);

/* ─── Active filter chip ─── */

interface FilterChipProps {
  label: string;
  onRemove: () => void;
}

const FilterChip: React.FC<FilterChipProps> = ({ label, onRemove }) => (
  <span className="inline-flex items-center gap-1.5 bg-[#D5E5C0] text-black text-xs md:text-sm font-medium tracking-tight px-3 py-1.5 rounded-full">
    {label}
    <button onClick={onRemove} aria-label={`Remove ${label} filter`} className="hover:opacity-70 cursor-pointer">
      <X size={14} strokeWidth={2.5} />
    </button>
  </span>
);

/* ─── Main component ─── */

const PortfolioFilters: React.FC<PortfolioFiltersProps> = ({
  industries,
  systemSizes,
  locations,
  searchPlaceholder = 'Search',
  onFilterChange,
}) => {
  const [industry, setIndustry] = useState<string | null>(null);
  const [size, setSize] = useState<string | null>(null);
  const [location, setLocation] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  /** Emit the full filter state on every change */
  const emit = useCallback(
    (next: Partial<{ industry: string | null; size: string | null; location: string | null; search: string }>) => {
      const merged = {
        industry: next.industry !== undefined ? next.industry : industry,
        size: next.size !== undefined ? next.size : size,
        location: next.location !== undefined ? next.location : location,
        search: next.search !== undefined ? next.search : search,
      };
      onFilterChange?.(merged);
    },
    [industry, size, location, search, onFilterChange],
  );

  const handleIndustry = useCallback((v: string | null) => { setIndustry(v); emit({ industry: v }); }, [emit]);
  const handleSize = useCallback((v: string | null) => { setSize(v); emit({ size: v }); }, [emit]);
  const handleLocation = useCallback((v: string | null) => { setLocation(v); emit({ location: v }); }, [emit]);
  const handleSearch = useCallback((v: string) => { setSearch(v); emit({ search: v }); }, [emit]);

  const industryLabel = industries.find((o) => o.value === industry)?.label;
  const sizeLabel = systemSizes.find((o) => o.value === size)?.label;
  const locationLabel = locations.find((o) => o.value === location)?.label;

  const hasActiveFilters = !!(industryLabel || sizeLabel || locationLabel);

  return (
    <section className="w-full px-[3%] pt-12 md:pt-16 pb-4">
      <div className="max-w-6xl mx-auto">
        {/* Filter row */}
        <div className="flex flex-wrap items-center gap-3">
          <Dropdown label="By Industry" options={industries} value={industry} onChange={handleIndustry} />
          <Dropdown label="By System Size" options={systemSizes} value={size} onChange={handleSize} />
          <Dropdown label="By Location" options={locations} value={location} onChange={handleLocation} />

          {/* Search input */}
          <div className="relative flex-1 min-w-[200px]">
            <input
              type="text"
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder={searchPlaceholder}
              className="w-full bg-transparent border border-[#A0CF44] rounded-full px-5 py-2.5 pr-10 text-sm text-black placeholder-black/60 focus:outline-none focus:border-[#63B846] transition-colors"
            />
            <Search
              size={16}
              strokeWidth={2.5}
              className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#63B846]"
            />
          </div>
        </div>

        {/* Active filter chips */}
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2 mt-4">
            {industryLabel && <FilterChip label={industryLabel} onRemove={() => handleIndustry(null)} />}
            {sizeLabel && <FilterChip label={sizeLabel} onRemove={() => handleSize(null)} />}
            {locationLabel && <FilterChip label={locationLabel} onRemove={() => handleLocation(null)} />}
          </div>
        )}
      </div>
    </section>
  );
};

export default PortfolioFilters;
