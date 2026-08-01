import React from 'react';
import Image, { StaticImageData } from 'next/image';

// Fallback images
import fallbackTopImg from '@/assets/home/zerointrest/productReviewBg.png';
import fallbackBottomImg from '@/assets/home/zerointrest/businessBg.jpg';
import CtaButton from '@/reuseables/CtaButton';

// ─── Types ──────────────────────────────────────────────────────────────

export interface KeyTermsBlock {
    title: string;
    items: string[];
}

export interface KeyTermsData {
    topSubtitle?: string;
    title?: string;
    description?: string;
    keyTerms?: KeyTermsBlock;
    eligibility?: KeyTermsBlock;
    summaryText?: string;
    topImage?: StaticImageData | string;
    bottomImage?: StaticImageData | string;
    ctaText?: string;
    ctaLink?: string;
}

// ─── Component ──────────────────────────────────────────────────────────

const KeyTerms: React.FC<{ data?: KeyTermsData }> = ({ data }) => {
    if (!data) return null;

    // Fallbacks
    const topImg = data.topImage || fallbackTopImg;
    const bottomImg = data.bottomImage || fallbackBottomImg;

    const keyTermsBlock = data.keyTerms || {
        title: 'Key Terms:',
        items: [
            'Loan Amount: $2,001 To $10,000',
            'Term: 3 To 10 Years',
            'Interest Rate: 0%',
            'Early Repayment Fees: None',
            'Missed Payment Fees: Capped, Small'
        ]
    };

    const eligibilityBlock = data.eligibility || {
        title: 'Eligibility:',
        items: [
            'Combined Household Income Under $210,000',
            'Standard Credit Check Applies',
            'WA Property, Synergy Or Horizon Power Customer',
            'Battery Must Be From An Approved Scheme Vendor (We\'re One)'
        ]
    };

    const summaryText = data.summaryText || 'The Rebate Is Applied As An Upfront Discount; The Loan Covers The Balance. For Most Perth Households, This Means $0 Upfront And Modest Monthly Repayments — Replaced By The Savings The Battery Immediately Generates.';

    return (
        <section className="w-full px-[5%] py-12 md:py-20 bg-white">
            <div className="">
                {/* Header */}
                {(data.topSubtitle || data.title || data.description) && (
                    <div className="text-center mb-10 md:mb-14">
                        {data.topSubtitle && (
                            <p className="text-2xl md:text-3xl font-light tracking-tight text-black mb-1">
                                {data.topSubtitle}
                            </p>
                        )}
                        {data.title && (
                            <h2 className="text-5xl md:text-6xl lg:text-7xl font-normal tracking-tight text-[#63B846]">
                                {data.title}
                            </h2>
                        )}
                        {data.description && (
                            <p className="text-sm md:text-base text-black/80 leading-[1.2] mt-4 max-w-3xl mx-auto">
                                {data.description}
                            </p>
                        )}
                    </div>
                )}

                {/* Grid Layout matching screenshot */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
                    {/* Row 1 — Key Terms (5 cols) + Top Image (7 cols) */}
                    <div className="bg-[#EAF2E2] rounded-3xl md:col-span-5 p-8 flex flex-col justify-center min-h-[300px]">
                        <h3 className="text-3xl md:text-4xl font-normal tracking-tight text-black mb-6">
                            {keyTermsBlock.title}
                        </h3>
                        <ul className="space-y-2">
                            {keyTermsBlock.items.map((item, idx) => (
                                <li key={idx} className="text-sm md:text-base text-black/90 leading-snug">
                                    • {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="md:col-span-7 rounded-3xl overflow-hidden min-h-[300px] relative">
                        <Image
                            src={topImg}
                            alt="Grid asset"
                            fill
                            className="object-cover"
                        />
                    </div>

                    {/* Row 2 — Bottom Image (3 cols) + Eligibility (5 cols) + Summary (4 cols) */}
                    <div className="md:col-span-3 rounded-3xl overflow-hidden min-h-[300px] relative">
                        <Image
                            src={bottomImg}
                            alt="Grid asset"
                            fill
                            className="object-cover"
                        />
                    </div>

                    <div className="bg-[#EAF2E2] md:col-span-5 rounded-3xl p-8 flex flex-col justify-center min-h-[300px]">
                        <h3 className="text-3xl md:text-4xl font-normal tracking-tight text-black mb-6">
                            {eligibilityBlock.title}
                        </h3>
                        <ul className="space-y-2">
                            {eligibilityBlock.items.map((item, idx) => (
                                <li key={idx} className="text-sm md:text-base text-black/90 leading-snug">
                                    • {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-[#EAF2E2] md:col-span-4 rounded-3xl p-8 flex flex-col justify-between min-h-[300px]">
                        <p className="text-lg md:text-xl lg:text-[1.25rem] font-normal tracking-tight text-black leading-[1.2]">
                            {summaryText}
                        </p>
                    </div>
                </div>
                <div className='flex justify-end mt-10'>
                    <CtaButton text='See if I qualify for the interest-free loan' />
                </div>
            </div>
        </section>
    );
};

export default KeyTerms;