import React from 'react';
import Image, { StaticImageData } from 'next/image';
import CtaButton from '@/reuseables/CtaButton';

// ─── Types ──────────────────────────────────────────────────────────────

export interface ZeroInterestProps {
    title: string;
    items: string[];
}

export interface ZeroInterestData {
    topSubtitle: string;
    title: string;
    description: string;
    keyTerms: ZeroInterestProps;
    eligibility: ZeroInterestProps;
    summaryText: string;
    topImage: StaticImageData | string;
    bottomImage: StaticImageData | string;
    ctaText: string;
    ctaLink: string;
}

// ─── Component ──────────────────────────────────────────────────────────

const ZeroInterest: React.FC<{ data: ZeroInterestData }> = ({ data }) => {
    return (
        <section className="w-full px-[5%] py-12 md:py-20 bg-white">
            <div className="">
                {/* Header */}
                <div className="text-center mb-10 md:mb-14">
                    <p className="text-2xl md:text-3xl font-light tracking-tight text-black mb-1">
                        {data.topSubtitle}
                    </p>
                    <h2 className="text-5xl md:text-6xl lg:text-7xl font-normal tracking-tight text-[#63B846]">
                        {data.title}
                    </h2>
                    <p className="text-sm md:text-base text-black/80 leading-[1.2] mt-4 max-w-3xl mx-auto">
                        {data.description}
                    </p>
                </div>

                {/* Grid Layout matching screenshot */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
                    {/* Row 1 — Key Terms (5 cols) + Top Image (7 cols) */}
                    <div className="bg-[#EAF2E2] rounded-3xl md:col-span-5 p-8 flex flex-col justify-center min-h-[300px]">
                        <h3 className="text-3xl md:text-4xl font-normal tracking-tight text-black mb-6">
                            {data.keyTerms.title}
                        </h3>
                        <ul className="space-y-2">
                            {data.keyTerms.items.map((item, idx) => (
                                <li key={idx} className="text-sm md:text-base text-black/90 leading-snug">
                                    • {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="md:col-span-7 rounded-3xl overflow-hidden min-h-[300px] relative">
                        <Image
                            src={data.topImage}
                            alt="Grid asset"
                            fill
                            className="object-cover"
                        />
                    </div>

                    {/* Row 2 — Bottom Image (3 cols) + Eligibility (5 cols) + Summary (4 cols) */}
                    <div className="md:col-span-3 rounded-3xl overflow-hidden min-h-[300px] relative">
                        <Image
                            src={data.bottomImage}
                            alt="Grid asset"
                            fill
                            className="object-cover"
                        />
                    </div>

                    <div className="bg-[#EAF2E2] md:col-span-5 rounded-3xl p-8 flex flex-col justify-center min-h-[300px]">
                        <h3 className="text-3xl md:text-4xl font-normal tracking-tight text-black mb-6">
                            {data.eligibility.title}
                        </h3>
                        <ul className="space-y-2">
                            {data.eligibility.items.map((item, idx) => (
                                <li key={idx} className="text-sm md:text-base text-black/90 leading-snug">
                                    • {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-[#EAF2E2] md:col-span-4 rounded-3xl p-8 flex flex-col justify-between min-h-[300px]">
                        <p className="text-lg md:text-xl lg:text-[1.25rem] font-normal tracking-tight text-black leading-[1.2]">
                            {data.summaryText}
                        </p>
                    </div>
                </div>
                <div className='flex justify-end mt-10'>
                    <CtaButton href={data.ctaLink} text={data.ctaText} />
                </div>
            </div>
        </section>
    );
};

export default ZeroInterest;
