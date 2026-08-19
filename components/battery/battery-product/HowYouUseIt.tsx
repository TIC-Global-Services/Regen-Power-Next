import React from 'react';

// ─── Types ──────────────────────────────────────────────────────────────

export interface HowYouUseItCard {
    id?: string | number;
    title: string;
    description: string;
}

export interface HowYouUseItData {
    topSubtitle?: string;
    title?: string;
    description?: string;
    cards: HowYouUseItCard[];
}

// ─── Component (Server Component with pure CSS group hover) ─────────────

const HowYouUseIt: React.FC<{ data?: HowYouUseItData }> = ({ data }) => {
    if (!data || !data.cards || data.cards.length === 0) return null;

    return (
        <section className="w-full px-[5%] md:px-[3%] py-12 md:py-20 bg-white">
            <div className="">
                {/* Grid matching design: Header spans 2 cols, cards take 1 col each */}
                {/* Desktop: Grid matching design: Header spans 2 cols, cards take 1 col each */}
                <div className="hidden md:grid md:grid-cols-3 gap-5 md:gap-6">
                    {/* Header Item */}
                    {(data.topSubtitle || data.title || data.description) && (
                        <div className="md:col-span-2 flex flex-col justify-center md:pr-12 mb-6 md:mb-0 capitalize">
                            {data.topSubtitle && (
                                <p className="text-2xl md:text-3xl font-light tracking-tight text-black mb-1">
                                    {data.topSubtitle}
                                </p>
                            )}
                            {data.title && (
                                <h2 className="text-[2.5rem] md:text-5xl lg:text-[3.125rem] font-normal tracking-tight text-[#63B846] mb-4 leading-tight">
                                    {data.title}
                                </h2>
                            )}
                            {data.description && (
                                <p className="text-base md:text-lg lg:text-2xl text-black font-normal leading-tight tracking-tight">
                                    {data.description}
                                </p>
                            )}
                        </div>
                    )}

                    {/* Cards */}
                    {data.cards.map((card, idx) => (
                        <div
                            key={card.id || idx}
                            className="group rounded-[14px] p-6 md:p-8 flex flex-col justify-end min-h-[260px] md:min-h-[300px] transition-colors duration-300 bg-[#EAEAEA] text-black hover:bg-[#353731] hover:text-white"
                        >
                            <div className="capitalize">
                                <h3 className="text-xl md:text-2xl font-normal tracking-tight mb-3 leading-snug">
                                    {card.title}
                                </h3>
                                <p className="text-xs md:text-[0.9rem] leading-[1.2] tracking-tight text-[#888888] transition-colors duration-300 group-hover:text-white/70">
                                    {card.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Mobile: Header */}
                {(data.topSubtitle || data.title || data.description) && (
                    <div className="md:hidden flex flex-col justify-center md:pr-12 mb-8">
                        {data.topSubtitle && (
                            <p className="text-2xl md:text-3xl font-light tracking-tight text-black mb-1">
                                {data.topSubtitle}
                            </p>
                        )}
                        {data.title && (
                            <h2 className="text-[2.5rem] md:text-5xl lg:text-[3.125rem] font-normal tracking-tight text-[#63B846] mb-4 leading-tight">
                                {data.title}
                            </h2>
                        )}
                        {data.description && (
                            <p className="text-base md:text-lg lg:text-2xl text-black font-normal leading-tight tracking-tight">
                                {data.description}
                            </p>
                        )}
                    </div>
                )}

                {/* Mobile: Horizontal Scroll */}
                <div className="flex overflow-x-auto md:hidden gap-4 -mx-[5%] px-[5%] md:px-[3%] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pb-4 mt-6">
                    {data.cards.map((card, idx) => (
                        <div
                            key={card.id || idx}
                            className="group rounded-3xl p-6 flex flex-col justify-end min-h-[260px] w-[75vw] shrink-0 snap-start transition-colors duration-300 bg-[#EAEAEA] text-black hover:bg-[#353731] hover:text-white"
                        >
                            <div>
                                <h3 className="text-xl font-normal tracking-tight mb-3 leading-snug">
                                    {card.title}
                                </h3>
                                <p className="text-xs leading-[1.2] tracking-tight text-[#888888] transition-colors duration-300 group-hover:text-white/70">
                                    {card.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowYouUseIt;