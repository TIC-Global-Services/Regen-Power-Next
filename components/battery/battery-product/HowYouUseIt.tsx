import React from 'react';

// ─── Types ──────────────────────────────────────────────────────────────

export interface HowYouUseItCard {
    id?: string | number;
    title: string;
    description: string;
    isFeatured?: boolean;
}

export interface HowYouUseItData {
    topSubtitle?: string;
    title?: string;
    description?: string;
    defaultFeaturedIndex?: number;
    cards: HowYouUseItCard[];
}

// ─── Component (Server Component with pure CSS group hover) ─────────────

const HowYouUseIt: React.FC<{ data?: HowYouUseItData }> = ({ data }) => {
    if (!data || !data.cards || data.cards.length === 0) return null;

    // Default featured index is 2 (3rd card: "How Important Is Blackout Backup?")
    const featuredIndex = data.defaultFeaturedIndex ?? 2;

    return (
        <section className="w-full px-[5%] py-12 md:py-20 bg-white">
            <div className="">
                {/* Grid matching design: Header spans 2 cols, cards take 1 col each */}
                <div className="group grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
                    {/* Header Item */}
                    {(data.topSubtitle || data.title || data.description) && (
                        <div className="md:col-span-2 flex flex-col justify-center md:pr-12 mb-6 md:mb-0">
                            {data.topSubtitle && (
                                <p className="text-2xl md:text-3xl font-light tracking-tight text-black mb-1">
                                    {data.topSubtitle}
                                </p>
                            )}
                            {data.title && (
                                <h2 className="text-4xl md:text-5xl lg:text-[3.125rem] font-normal tracking-tight text-[#63B846] mb-4 leading-tight">
                                    {data.title}
                                </h2>
                            )}
                            {data.description && (
                                <p className="text-base md:text-lg lg:text-2xl text-black font-normal leading-snug tracking-tight">
                                    {data.description}
                                </p>
                            )}
                        </div>
                    )}

                    {/* Cards */}
                    {data.cards.map((card, idx) => {
                        const isInitiallyFeatured = card.isFeatured ?? (idx === featuredIndex);

                        return (
                            <div
                                key={card.id || idx}
                                className={`rounded-3xl p-6 md:p-8 flex flex-col justify-end min-h-[260px] md:min-h-[300px] transition-all duration-300 ${
                                    isInitiallyFeatured
                                        ? 'bg-[#353731] text-white group-hover:bg-[#EAEAEA] group-hover:text-black hover:!bg-[#353731] hover:!text-white'
                                        : 'bg-[#EAEAEA] text-black hover:!bg-[#353731] hover:!text-white'
                                }`}
                            >
                                <div>
                                    <h3 className="text-xl md:text-2xl font-normal tracking-tight mb-3 leading-snug">
                                        {card.title}
                                    </h3>
                                    <p className="text-xs md:text-[0.9rem] leading-[1.2] tracking-tight text-[#888888]">
                                        {card.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default HowYouUseIt;