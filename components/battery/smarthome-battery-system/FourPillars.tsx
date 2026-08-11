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
            <div className="text-left md:text-center mb-10 md:mb-14 capitalize">
                {data.topSubtitle && (
                    <h3 className="text-base md:text-[2.125rem] text-black font-normal tracking-tight">
                        {data.topSubtitle}
                    </h3>
                )}
                {data.title && (
                    <h2 className="text-[2.5rem] md:text-6xl lg:text-[5rem] text-[#63B846] font-light leading-[1] tracking-tighter">
                        {data.title}
                    </h2>
                )}
                {data.description && (
                    <p className="text-black text-base md:text-lg leading-[1.2] tracking-tight whitespace-pre-line mt-4 max-w-3xl mx-auto">
                        {data.description}
                    </p>
                )}
            </div>

            {/* Mobile: Horizontal Slider */}
            <div className="flex overflow-x-auto md:hidden gap-4 -mx-[5%] px-[5%] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pb-4">
                {data.cards.map((card, idx) => (
                    <div
                        key={idx}
                        className="relative rounded-[20px] overflow-hidden h-[320px] w-[75vw] shrink-0 snap-start"
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
                        <div className="absolute inset-0 flex flex-col justify-between p-5">
                            <h4 className="text-white text-xl font-medium tracking-tight leading-[1.2]">
                                {card.title}
                            </h4>
                            <p className="text-white/85 text-xs tracking-tight leading-[1.3]">
                                {card.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Desktop: Four Column Card Grid */}
            <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-2">
                {data.cards.map((card, idx) => (
                    <div
                        key={idx}
                        className="relative rounded-[20px] overflow-hidden min-h-[320px] md:min-h-[420px] max-w-full w-[320px] justify-self-center"
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
                            <p className="text-white text-xs md:text-base tracking-tight leading-[1.2] mb-4 mx-auto">
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
