import React from 'react';

// ─── Types ──────────────────────────────────────────────────────────────

export interface TextCard {
    title: string;
    description: string;
}

export interface TextCardsGridData {
    topSubtitle?: string;
    title?: string;
    description?: string;
    gridCols?: 2 | 3 | 4;
    cards: TextCard[];
    bgColor?: string;
    cardBgColor?: string;
}

// ─── Component ──────────────────────────────────────────────────────────

const TextCardsGrid: React.FC<{ data?: TextCardsGridData }> = ({ data }) => {
    if (!data || !data.cards || data.cards.length === 0) return null;

    const cols = data.gridCols ?? 3;
    const bg = data.bgColor || 'bg-white';
    const cardBg = data.cardBgColor || 'bg-[#EAF2E2]';

    // Map cols to Tailwind grid classes
    const gridColsClass =
        cols === 2
            ? 'md:grid-cols-2'
            : cols === 4
              ? 'md:grid-cols-4'
              : 'md:grid-cols-3';

    return (
        <section className={`w-full px-[5%] py-12 md:py-20 ${bg}`}>
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                {(data.topSubtitle || data.title || data.description) && (
                    <div className="text-center mb-10 md:mb-14">
                        {data.topSubtitle && (
                            <p className="text-2xl md:text-3xl font-light tracking-tight text-black mb-1">
                                {data.topSubtitle}
                            </p>
                        )}
                        {data.title && (
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-[#63B846] mb-4">
                                {data.title}
                            </h2>
                        )}
                        {data.description && (
                            <p className="text-base md:text-lg text-black/80 leading-relaxed max-w-3xl mx-auto">
                                {data.description}
                            </p>
                        )}
                    </div>
                )}

                {/* Cards Grid */}
                <div className={`grid grid-cols-1 ${gridColsClass} gap-5 md:gap-6`}>
                    {data.cards.map((card, idx) => (
                        <div
                            key={idx}
                            className={`${cardBg} rounded-3xl p-6 md:p-8 flex flex-col justify-start min-h-[240px]`}
                        >
                            <h3 className="text-xl md:text-2xl font-normal tracking-tight text-black mb-4 leading-tight">
                                {card.title}
                            </h3>
                            <p className="text-sm md:text-base text-black/80 leading-relaxed">
                                {card.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TextCardsGrid;
