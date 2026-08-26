'use client';

import React, { useCallback, useRef, useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import heroBanner from '@/assets/evcharging/hero_banner.png';

export interface BrandSpecification {
    label: string;
    value: string;
}

export interface BatteryBrandItem {
    title: string;
    logo: StaticImageData | string | null;
    image: StaticImageData | string | null;
    specifications: BrandSpecification[];
    link?: string;
}

export interface OurBatteryBrandsData {
    brands: BatteryBrandItem[];
}

/* ─── Card pieces (shared by the mobile slider and the desktop rows) ─── */

function BrandImageCard({ brand }: { brand: BatteryBrandItem }) {
    return (
        <div className="rounded-[1.25rem] overflow-hidden relative min-h-[280px] md:min-h-[380px]">
            <Image
                src={brand.image ?? heroBanner}
                alt={brand.title}
                fill
                className="object-cover"
            />
        </div>
    );
}

function BrandTextCard({ brand, className = '' }: { brand: BatteryBrandItem; className?: string }) {
    return (
        <div className={`bg-[#EAF2E2] rounded-[1.25rem] p-6 md:p-8 flex flex-col justify-between relative overflow-hidden ${className}`}>
            <div>
                {/* Logo */}
                {brand.logo && (
                    <div className="mb-2 h-32 md:h-32 relative w-1/2">
                        <Image
                            src={brand.logo}
                            alt={brand.title}
                            fill
                            className="object-contain object-left"
                        />
                    </div>
                )}

                {/* Title */}
                <h3 className="text-2xl md:text-3xl font-normal tracking-tight text-black mb-4">
                    {brand.title}
                </h3>

                {/* Specifications List */}
                <div className="space-y-1.5">
                    {brand.specifications.map((spec, specIdx) => (
                        <p
                            key={specIdx}
                            className="text-base md:text-lg text-black/90 leading-[1.1] tracking-tight"
                        >
                            <span className="font-semibold text-black">
                                {spec.label}:
                            </span>{' '}
                            <span className="text-black/80">{spec.value}</span>
                        </p>
                    ))}
                </div>
            </div>
        </div>
    );
}

const OurBatterybrands: React.FC<{ data?: OurBatteryBrandsData }> = ({ data }) => {
    const trackRef = useRef<HTMLDivElement | null>(null);
    const [active, setActive] = useState(0);

    const brands = data?.brands;
    const count = brands?.length ?? 0;

    /** Active slide = whichever slide's center sits closest to the viewport center. */
    const handleScroll = useCallback(() => {
        const el = trackRef.current;
        if (!el || el.children.length === 0) return;
        const kids = Array.from(el.children) as HTMLElement[];
        const base = kids[0].offsetLeft;
        const center = el.scrollLeft + el.clientWidth / 2;
        let best = 0;
        let dist = Infinity;
        kids.forEach((s, i) => {
            const c = s.offsetLeft - base + s.offsetWidth / 2;
            const d = Math.abs(c - center);
            if (d < dist) {
                dist = d;
                best = i;
            }
        });
        setActive(best);
    }, []);

    const goTo = useCallback((i: number) => {
        const el = trackRef.current;
        const kid = el?.children[i] as HTMLElement | undefined;
        if (!el || !kid || el.children.length === 0) return;
        const base = (el.children[0] as HTMLElement).offsetLeft;
        el.scrollTo({ left: kid.offsetLeft - base, behavior: 'smooth' });
    }, []);

    if (!brands || count === 0) return null;

    return (
        <section className="w-full px-[5%] md:px-[3%] py-12 md:py-20 bg-white">
            {/* ── Mobile + Tablet: slider (image card on top, text card below) ── */}
            <div className="lg:hidden">
                <div
                    ref={trackRef}
                    onScroll={handleScroll}
                    className="flex overflow-x-auto  gap-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                >
                    {brands.map((brand, idx) => (
                        <div
                            key={idx}
                            className="w-full shrink-0 snap-start flex flex-col gap-5"
                        >
                            <BrandImageCard brand={brand} />
                            <BrandTextCard brand={brand} className="flex-1" />
                        </div>
                    ))}
                </div>

                {/* Pagination dashes */}
                {count > 1 && (
                    <div className="flex justify-center items-center gap-2 mt-6">
                        {brands.map((_, i) => (
                            <button
                                key={i}
                                type="button"
                                onClick={() => goTo(i)}
                                aria-label={`Go to brand ${i + 1} of ${count}`}
                                className={`h-1 rounded-full transition-all duration-300 cursor-pointer ${
                                    i === active
                                        ? 'w-8 bg-[#63B846]'
                                        : 'w-4 bg-black/15 hover:bg-black/30'
                                }`}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* ── Desktop: alternating rows (unchanged) ── */}
            <div className="hidden lg:flex flex-col gap-8">
                {brands.map((brand, idx) => {
                    const isEven = idx % 2 === 0;
                    return (
                        <div
                            key={idx}
                            className="grid grid-cols-12 gap-4 items-stretch"
                        >
                            <div className={`col-span-8 ${isEven ? 'order-1' : 'order-2'}`}>
                                <BrandTextCard brand={brand} className="h-full" />
                            </div>
                            <div className={`col-span-4 ${isEven ? 'order-2' : 'order-1'}`}>
                                <BrandImageCard brand={brand} />
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default OurBatterybrands;
