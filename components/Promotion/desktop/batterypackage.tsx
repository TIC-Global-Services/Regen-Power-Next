import React from 'react';
import Fade from '@/reuseables/fade';

/* ── Rebate line item (e.g. "State Rebate $1,209") ──────────────── */

interface RebateItem {
  label: string;
  amount: number;
}

/* ── Single package ─────────────────────────────────────────────── */

export interface BatteryPkg {
  capacity: string;
  originalPrice: number;
  finalPrice: number;
  rebates: RebateItem[];
  image: string;
}

/* ── Component props ────────────────────────────────────────────── */

export interface BatteryPackageProps {
  title: string;
  packages: BatteryPkg[];
}

/* ── Minus-circle icon (inline SVG keeps bundle small) ──────────── */

const MinusCircleIcon = () => (
  <svg
    className="w-5 h-5 text-red-500 shrink-0"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    strokeWidth="3"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="8" y1="12" x2="16" y2="12" />
  </svg>
);

/* ── Pricing card (reused per package — keeps things DRY) ───────── */

const PricingCard = ({ pkg }: { pkg: BatteryPkg }) => (
  <div className="bg-[#EEF6EB] rounded-[12px] p-8 flex flex-col justify-between text-center min-h-[60dvh]">
    {/* Capacity heading */}
    <div>
      <div className="inline-block pb-2 mb-6 border-b-2 border-black/80 px-4">
        <h3 className="text-2xl md:text-3xl font-bold text-black">
          {pkg.capacity}
        </h3>
      </div>

      {/* Original price */}
      <div className="text-3xl md:text-4xl font-bold text-black mb-8">
        ${pkg.originalPrice.toLocaleString()}
      </div>

      {/* Rebate rows */}
      <div className="flex flex-col gap-3 items-center mb-8">
        {pkg.rebates.map((rebate, idx) => (
          <div
            key={idx}
            className="flex items-center gap-2 text-sm md:text-base font-normal"
          >
            <MinusCircleIcon />
            <span>
              {rebate.label} ${rebate.amount.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>

    {/* Final pricing */}
    <div className="mt-auto pt-6 border-t border-black/5">
      <span className="block text-sm md:text-base font-bold  uppercase tracking-wider mb-1">
        Final Pricing
      </span>
      <div className="text-4xl md:text-5xl lg:text-6xl font-black text-[#63B846] mb-2">
        ${pkg.finalPrice.toLocaleString()}
      </div>
      <span className="block text-sm md:text-lg font-normal text-black">
        Fully Installed
      </span>
      <p className="text-xs md:text-lg font-bold leading-none">
        Price is after the battery rebate
      </p>
    </div>
  </div>
);

/* ── Product image column ───────────────────────────────────────── */

const ProductImageCard = ({ src, alt }: { src: string; alt: string }) => (
  <div className="bg-[#EEF6EB] rounded-[24px] p-8 flex items-center justify-center border border-gray-50  h-full lg:min-h-auto">
    <img
      src={src}
      alt={alt}
      className="max-h-[40dvh] w-auto object-contain hover:scale-105 transition-transform duration-500"
    />
  </div>
);

/* ── Main component ─────────────────────────────────────────────── */

const BatteryPackage = ({ data }: { data: BatteryPackageProps }) => {
  const { title, packages } = data;

  const gridCells: React.ReactNode[] = [];

  packages.forEach((pkg, idx) => {
    gridCells.push(<PricingCard key={`pkg-${idx}`} pkg={pkg} />);

    // Insert the product image after every package except the last
    if (idx < packages.length - 1) {
      gridCells.push(
        <ProductImageCard
          key={`img-${idx}`}
          src={pkg.image}
          alt={pkg.capacity}
        />
      );
    }
  });

  // Compute grid columns dynamically based on cell count
  const colClass =
    gridCells.length === 3
      ? 'lg:grid-cols-3'
      : gridCells.length === 2
        ? 'lg:grid-cols-2'
        : `lg:grid-cols-${gridCells.length}`;

  return (
    <section className="bg-white py-16 md:py-24 px-[5%] border-t border-gray-100">
      <Fade>
        <div>
          {/* Green section title */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-[3.125rem] font-bold text-[#63B846] tracking-tight leading-tight">
              {title}
            </h2>
          </div>

          {/* Dynamic grid */}
          <div className={`grid grid-cols-1 ${colClass} gap-6 items-stretch`}>
            {gridCells}
          </div>
        </div>
      </Fade>
    </section>
  );
};

export default BatteryPackage;
