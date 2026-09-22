import React from 'react';
import SectionHeader from '@/reuseables/SectionHeader';

interface CompetitorRow {
    competitor: string;
    positioning: string;
    doWell: string;
    misses: string;
}

interface CompetitorAnalysisTableProps {
    subtitle?: string;
    title?: string;
    description?: string;
    rows: CompetitorRow[];
}

const CompetitorAnalysisTable: React.FC<CompetitorAnalysisTableProps> = ({
    subtitle,
    title,
    description,
    rows,
}) => {
    if (rows.length === 0) return null;

    return (
        <section className="py-16 md:py-24 bg-white">
            <div className="px-[5%] md:px-[3%]">
                <SectionHeader
                    subtitle={subtitle}
                    title={title}
                    align="left"
                    subtitleClass="text-sm md:text-base font-medium text-center text-black/60 uppercase tracking-wide"
                    titleClass="text-3xl md:text-5xl text-center text-[#63B846] font-normal tracking-tight leading-tight"
                    className="items-center text-center max-w-4xl justify-center mx-auto"
                />

                {description && (
                    <p className="text-base md:text-lg text-black/80 mx-auto text-center leading-relaxed max-w-4xl mb-10 md:mb-14">
                        {description}
                    </p>
                )}

                {/* ── Desktop: 4-column table ── */}
                <div className="hidden md:block max-w-6xl mx-auto rounded-[20px] overflow-hidden border border-[#A0CF44]/30">
                    <div className="grid grid-cols-[1fr_1.1fr_1.6fr_1.6fr] bg-[#8DC63F]">
                        {['Competitor', 'Positioning', 'What they do well', 'What they miss'].map((h) => (
                            <div
                                key={h}
                                className="p-5 text-black font-bold text-base tracking-tight border-r last:border-r-0 border-black/10"
                            >
                                {h}
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-col">
                        {rows.map((row, idx) => (
                            <div
                                key={idx}
                                className={`grid grid-cols-[1fr_1.1fr_1.6fr_1.6fr] bg-[#EEF6EB] transition-colors duration-300 hover:bg-[#DCEFC9] ${idx > 0 ? 'border-t border-[#A0CF44]/30' : ''}`}
                            >
                                <div className="p-5 flex items-center bg-[#A0CF44]/25 text-black font-semibold text-base tracking-tight border-r border-black/10">
                                    {row.competitor}
                                </div>
                                <div className="p-5 flex items-center text-black/85 text-sm tracking-tight leading-snug border-r border-black/10">
                                    {row.positioning}
                                </div>
                                <div className="p-5 flex items-center text-black/85 text-sm tracking-tight leading-snug border-r border-black/10">
                                    {row.doWell}
                                </div>
                                <div className="p-5 flex items-center text-black/85 text-sm tracking-tight leading-snug">
                                    {row.misses}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── Mobile / tablet: stacked cards ── */}
                <div className="md:hidden flex flex-col gap-4 max-w-lg mx-auto">
                    {rows.map((row, idx) => (
                        <div
                            key={idx}
                            className="rounded-2xl overflow-hidden border border-[#A0CF44]/30"
                        >
                            <div className="bg-[#8DC63F] p-4">
                                <h3 className="text-black font-bold text-lg tracking-tight">
                                    {row.competitor}
                                </h3>
                            </div>
                            <div className="bg-[#EEF6EB] p-4 flex flex-col gap-3">
                                <div>
                                    <p className="text-black/60 text-xs font-semibold uppercase tracking-wide mb-1">
                                        Positioning
                                    </p>
                                    <p className="text-black/85 text-sm leading-snug tracking-tight">
                                        {row.positioning}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-black/60 text-xs font-semibold uppercase tracking-wide mb-1">
                                        What they do well
                                    </p>
                                    <p className="text-black/85 text-sm leading-snug tracking-tight">
                                        {row.doWell}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-black/60 text-xs font-semibold uppercase tracking-wide mb-1">
                                        What they miss
                                    </p>
                                    <p className="text-black/85 text-sm leading-snug tracking-tight">
                                        {row.misses}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CompetitorAnalysisTable;
