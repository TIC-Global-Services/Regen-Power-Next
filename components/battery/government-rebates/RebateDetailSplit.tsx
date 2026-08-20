import React from 'react';
import Image, { StaticImageData } from 'next/image';


import fallbackImg from '@/assets/for_your_home.png';


export interface RebateDetailSplitData {
    topSubtitle?: string;
    title?: string;
    description?: string;
    image?: StaticImageData | string;
    imagePosition?: 'left' | 'right';

    // Top Box (Always a numbered list)
    topBoxTitle?: string;
    topBoxItems?: string[];

    // Bottom Box (Always a bullet grid)
    bottomBoxTitle?: string;
    bottomBoxItems?: string[];

    bgColor?: string;
    ctaText?: string;
    ctaLink?: string;
}

// ─── Component ──────────────────────────────────────────────────────────

const RebateDetailSplit: React.FC<{ data?: RebateDetailSplitData }> = ({ data }) => {
    if (!data) return null;

    const imgSrc = data.image || fallbackImg;
    const isImageLeft = (data.imagePosition ?? 'left') === 'left';
    const bg = data.bgColor || 'bg-white';

    return (
        <section className={`w-full px-[5%] md:px-[3%] py-12 md:py-20 max-w-7xl mx-auto ${bg}`}>
            <div className="">
                {/* Header Section */}
                {(data.topSubtitle || data.title || data.description) && (
                    <div className="mb-10 md:mb-14 text-left md:text-center capitalize ">
                        {data.topSubtitle && (
                            <p className="text-base md:text-2xl font-normal tracking-tight text-black mb-2">
                                {data.topSubtitle}
                            </p>
                        )}
                        {data.title && (
                            <h2 className="text-[2.5rem] md:text-4xl lg:text-[3.125rem] font-light leading-tight tracking-tight text-[#63B846] mb-4">
                                {data.title}
                            </h2>
                        )}
                        {data.description && (
                            <p className="text-base md:text-xl text-black leading-[1.2] font-medium max-w-5xl mx-auto whitespace-pre-line">
                                {data.description}
                            </p>
                        )}
                    </div>
                )}

                {/* Split Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                    {/* Image */}
                    <div
                        className={`rounded-[20px] overflow-hidden relative min-h-[300px] md:min-h-[420px] ${isImageLeft ? 'order-1' : 'order-1 md:order-2'
                            }`}
                    >
                        <Image
                            src={imgSrc}
                            alt={data.title || 'Section image'}
                            fill
                            className="object-cover"
                        />
                    </div>

                    {/* Content Boxes */}
                    <div
                        className={`flex flex-col gap-4 justify-center ${isImageLeft ? 'order-2' : 'order-2 md:order-1'
                            }`}
                    >
                        {/* Top Box - Numbered List */}
                        {(data.topBoxTitle || (data.topBoxItems && data.topBoxItems.length > 0)) && (
                            <div className="bg-[#F2F7EC] rounded-2xl p-6 md:p-8 flex flex-col">
                                {data.topBoxTitle && (
                                    <h3 className="text-xl md:text-3xl font-normal tracking-tight text-black mb-4">
                                        {data.topBoxTitle}
                                    </h3>
                                )}
                                {data.topBoxItems && data.topBoxItems.length > 0 && (
                                    <ol className="space-y-1">
                                        {data.topBoxItems.map((item, idx) => (
                                            <li
                                                key={idx}
                                                className="text-base md:text-lg text-black leading-[1] tracking-tight flex items-start"
                                            >
                                                <span className="mr-2 font-normal text-black min-w-[16px]">
                                                    {idx + 1}.
                                                </span>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ol>
                                )}
                            </div>
                        )}

                        {/* Bottom Box - Bullet Grid */}
                        {(data.bottomBoxTitle || (data.bottomBoxItems && data.bottomBoxItems.length > 0)) && (
                            <div className="bg-[#F2F7EC] rounded-2xl p-6 md:p-8 flex flex-col">
                                {data.bottomBoxTitle && (
                                    <h3 className="text-xl md:text-3xl font-normal tracking-tight text-black mb-4">
                                        {data.bottomBoxTitle}
                                    </h3>
                                )}
                                {data.bottomBoxItems && data.bottomBoxItems.length > 0 && (
                                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
                                        {data.bottomBoxItems.map((item, idx) => (
                                            <li
                                                key={idx}
                                                className="text-base md:text-lg text-black tracking-tight leading-[1] flex items-start"
                                            >
                                                <span className="mr-2 mt-0.5 text-black">•</span>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        )}

                        {/* Optional CTA */}
                        {data.ctaText && (
                            <div className="mt-2">
                                <a
                                    href={data.ctaLink || '#'}
                                    className="inline-flex items-center gap-2 bg-[#63B846] text-white text-sm font-medium px-6 py-3 rounded-full hover:bg-[#56a33d] transition-colors"
                                >
                                    {data.ctaText}
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="7" y1="17" x2="17" y2="7" />
                                        <polyline points="7 7 17 7 17 17" />
                                    </svg>
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RebateDetailSplit;
