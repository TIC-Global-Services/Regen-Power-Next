import React from 'react';
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



const OurBatterybrands: React.FC<{ data?: OurBatteryBrandsData }> = ({ data }) => {
    if (!data || !data.brands || data.brands.length === 0) return null;

    return (
        <section className="w-full px-[3%] py-12 md:py-20 bg-white">
            <div>
                {/* Brands Rows */}
                <div className="flex flex-col gap-6 md:gap-8">
                    {data.brands.map((brand, idx) => {
                        const isEven = idx % 2 === 0;

                        return (
                            <div
                                key={idx}
                                className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6 items-stretch"
                            >
                                {/* Text Content Card */}
                                <div
                                    className={`bg-[#EAF2E2] rounded-[1.25rem] p-6 md:p-8 flex flex-col justify-between relative md:col-span-8 ${isEven ? 'order-1 md:order-1' : 'order-1 md:order-2'
                                        }`}
                                >
                                    {/* Arrow icon if link exists */}
                                    {brand.link && (
                                        <a
                                            href={brand.link}
                                            className="absolute top-6 right-6 text-black/60 hover:text-black transition-colors"
                                            aria-label={`Learn more about ${brand.title}`}
                                        >
                                            <svg
                                                width="20"
                                                height="20"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <line x1="7" y1="17" x2="17" y2="7" />
                                                <polyline points="7 7 17 7 17 17" />
                                            </svg>
                                        </a>
                                    )}

                                    <div>
                                        {/* Logo */}
                                        {brand.logo && (
                                            <div className="mb-2 h-full relative w-full flex items-center">
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

                                {/* Image Card */}
                                <div
                                    className={`rounded-[1.25rem] overflow-hidden relative min-h-[340px] md:min-h-[360px] md:col-span-4 ${isEven ? 'order-2 md:order-2' : 'order-2 md:order-1'
                                        }`}
                                >
                                    <Image
                                        src={brand.image ?? heroBanner}
                                        alt={brand.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default OurBatterybrands;