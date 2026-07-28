import React from 'react';

// ─── Types ──────────────────────────────────────────────────────────────

export interface RebatesStackCard {
    title: string;
    items: string[];
}

export interface RebatesStackGridData {
    title: string;
    subtitle?: string;
    cards: RebatesStackCard[];
}

// ─── Component ──────────────────────────────────────────────────────────

const RebatesStackGrid: React.FC<{ data?: RebatesStackGridData }> = ({ data }) => {
    if (!data || !data.cards || data.cards.length === 0) return null;

    return (
        <section className="w-full px-[5%] py-12 md:py-20 bg-white">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-10 md:mb-14">
                    {data.title && (
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-[#63B846] mb-4">
                            {data.title}
                        </h2>
                    )}
                    {data.subtitle && (
                        <p className="text-base md:text-lg lg:text-xl text-black font-normal leading-snug tracking-tight max-w-3xl mx-auto">
                            {data.subtitle}
                        </p>
                    )}
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
                    {data.cards.map((card, idx) => (
                        <div
                            key={idx}
                            className="bg-[#EAF2E2] rounded-3xl p-6 md:p-8 flex flex-col justify-start min-h-[300px]"
                        >
                            <h3 className="text-2xl md:text-3xl font-normal tracking-tight text-black mb-6 leading-tight">
                                {card.title}
                            </h3>
                            <ul className="space-y-3">
                                {card.items.map((item, itemIdx) => (
                                    <li key={itemIdx} className="text-sm md:text-base text-black/90 leading-relaxed flex items-start">
                                        <span className="mr-2 mt-0.5">•</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default RebatesStackGrid;
