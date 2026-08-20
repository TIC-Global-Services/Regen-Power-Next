import React from 'react';
import Image, { StaticImageData } from 'next/image';
import CtaButton from '@/reuseables/CtaButton';
import businessBg from '@/assets/home/zerointrest/businessBg.jpg';
import productReviewBg from '@/assets/home/zerointrest/productReviewBg.png';

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
    topImage: StaticImageData | string | null;
    bottomImage: StaticImageData | string | null;
    ctaText: string;
    ctaLink: string;
}

// ─── Component ──────────────────────────────────────────────────────────

const ZeroInterest: React.FC<{ data: ZeroInterestData }> = ({ data }) => {
    return (
        <section className="w-full px-[5%] md:px-[3%] py-12 md:py-20 bg-white">
            <div className="">
                {/* Header */}
                <div className="text-left md:text-center mb-10 md:mb-14">
                    <p className="text-base md:text-3xl font-light tracking-tight text-black ">
                        {data.topSubtitle}
                    </p>
                    <h2 className="text-[2.5rem] md:text-6xl font-normal tracking-tight text-[#63B846] mb-2">
                        {data.title}
                    </h2>
                    <p className="text-base md:text-xl text-black leading-[1.2] max-w-4xl mx-auto">
                        {data.description}
                    </p>
                </div>

                {/* Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
                    {/* Row 1 — Key Terms (5 cols) + Top Image (7 cols) */}
                    <div className="bg-[#EAF2E2] rounded-3xl md:col-span-5 p-6 flex flex-col justify-center max-md:order-1">
                        <h3 className="text-xl md:text-3xl font-normal tracking-tight text-black mb-6">
                            {data.keyTerms.title}
                        </h3>
                        <ul className="space-y-1">
                            {data.keyTerms.items.map((item, idx) => (
                                <li key={idx} className="text-lg text-black tracking-tight leading-tight">
                                    • {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="md:col-span-7 rounded-3xl overflow-hidden relative min-h-[220px] md:min-h-[320px] max-md:order-2">
                        <Image
                            src={data.topImage ?? productReviewBg}
                            alt="Grid asset"
                            fill
                            className="object-cover"
                        />
                    </div>

                    {/* Row 2 — Bottom Image (3 cols) + Eligibility (5 cols) + Summary (4 cols) */}
                    <div className="md:col-span-7 lg:col-span-3 rounded-3xl overflow-hidden relative min-h-[220px] md:min-h-[320px] max-md:order-4">
                        <Image
                            src={data.bottomImage ?? businessBg}
                            alt="Grid asset"
                            fill
                            className="object-cover"
                        />
                    </div>

                    <div className="bg-[#EAF2E2] md:col-span-5 rounded-3xl p-6 flex flex-col justify-center max-md:order-3">
                        <h3 className="text-xl md:text-3xl font-normal tracking-tight text-black mb-6">
                            {data.eligibility.title}
                        </h3>
                        <ul className="space-y-1">
                            {data.eligibility.items.map((item, idx) => (
                                <li key={idx} className="text-lg text-black tracking-tight leading-tight">
                                    • {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-[#EAF2E2] md:col-span-12 lg:col-span-4 rounded-3xl p-8 flex flex-col justify-center max-md:order-5">
                        <p className="text-lg md:text-[1.375rem] font-normal tracking-tight text-black leading-[1.2]">
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
