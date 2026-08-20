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
        <section className="w-full px-[5%] md:px-[3%] py-12 md:py-20 bg-white">
            <div className="">
                {/* Header */}
                <div className="text-center mb-10 md:mb-14">
                    {data.title && (
                        <h2 className="text-[2.5rem] md:text-5xl lg:text-6xl font-normal tracking-tight text-[#63B846] mb-2">
                            {data.title}
                        </h2>
                    )}
                    {data.subtitle && (
                        <p className="text-base md:text-lg lg:text-xl text-black font-normal leading-[1.2] tracking-tight max-w-3xl mx-auto">
                            {data.subtitle}
                        </p>
                    )}
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 auto-rows-fr gap-5 md:gap-6">
                    {data.cards.map((card, idx) => (
                        <div
                            key={idx}
                            className="bg-[#EEF6EB] rounded-3xl p-6 md:p-8 flex flex-col justify-center min-h-[30dvh] lg:min-h-[50dvh]"
                        >
                            <h3 className="text-xl md:text-3xl font-normal tracking-tight text-black mb-6 leading-tight">
                                {card.title}
                            </h3>
                            <ul className="">
                                {card.items.map((item, itemIdx) => (
                                    <li key={itemIdx} className="text-base text-black leading-[1.2] flex items-start">
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
