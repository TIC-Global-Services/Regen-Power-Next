import React from 'react';
import Image, { StaticImageData } from 'next/image';

export interface FourPillarsCard {
    title: string;
    description: string;
    image?: StaticImageData | string;
}

export interface FourPillarsData {
    topSubtitle: string;
    title: string;
    description?: string;
    cards: FourPillarsCard[];
}

const FourPillars = ({ data }: { data: FourPillarsData }) => {
    return (
        <section className="bg-white py-16 md:py-24 px-[5%]">
            {/* Centered Section Header */}
            <div className="text-center mb-10 md:mb-14">
                {data.topSubtitle && (
                    <h3 className="text-2xl md:text-[2.125rem] text-black font-normal tracking-tight">
                        {data.topSubtitle}
                    </h3>
                )}
                {data.title && (
                    <h2 className="text-4xl md:text-6xl lg:text-[5rem] text-[#63B846] font-light leading-none tracking-tighter">
                        {data.title}
                    </h2>
                )}
                {data.description && (
                    <p className="text-black text-sm md:text-lg leading-[1.2] whitespace-pre-line mt-4 max-w-3xl mx-auto">
                        {data.description}
                    </p>
                )}
            </div>

            {/* Four Column Card Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
                {data.cards.map((card, idx) => (
                    <div
                        key={idx}
                        className="relative rounded-[20px] overflow-hidden h-[320px] md:h-[420px]"
                    >
                        {/* Background image */}
                        {card.image && (
                            <Image
                                src={card.image}
                                alt={card.title}
                                fill
                                className="object-cover"
                            />
                        )}

                        {/* Dark gradient overlay for legibility */}
                        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/30 to-black/70" />

                        {/* Title pinned to top, description pinned to bottom */}
                        <div className="absolute inset-0 flex flex-col justify-between p-5 md:p-6">
                            <h4 className="text-white text-xl md:text-[1.5rem] font-medium tracking-tight leading-[1.2]">
                                {card.title}
                            </h4>
                            <p className="text-white/85 text-xs md:text-base tracking-tight leading-[1.3]">
                                {card.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FourPillars;
