'use client';

import React, { useState } from 'react';
import Reveal from '@/reuseables/Reveal';
import SectionHeader from '@/reuseables/SectionHeader';

interface TableContent {
    value: string;
    description: string;
}

interface IndustryItem {
    application: string;
    description: string;
}

interface MicrogridSpecTableProps {
    subtitle?: string;
    title?: string;
    description?: string;
    headers: {
        col1: string;
        col2: string;
    };
    tableContent: TableContent[];
    industriesTitle?: string;
    industries: IndustryItem[];
}

type Tab = 'table' | 'industries';

const MicrogridSpecTable: React.FC<MicrogridSpecTableProps> = ({
    subtitle,
    title,
    description,
    headers,
    tableContent,
    industriesTitle,
    industries,
}) => {
    const hasTable = tableContent.length > 0;
    const hasIndustries = industries.length > 0;
    const [activeTab, setActiveTab] = useState<Tab>('table');

    return (
        <section id='microgrid-spec' className="scroll-mt-24 py-16 md:py-24 bg-white">
            <div className="px-[5%] md:px-[3%]">
                <SectionHeader
                    subtitle={subtitle}
                    title={title}
                    align="left"
                    subtitleClass="text-sm md:text-base font-medium text-center text-black/60 uppercase tracking-wide"
                    titleClass="text-3xl md:text-5xl text-center text-[#63B846] font-normal tracking-tight leading-tight"
                    className="items-center text-center  max-w-4xl justify-center mx-auto"
                />

                {description && (
                    <p className="text-base md:text-lg text-black/80 mx-auto text-center leading-relaxed max-w-6xl mb-10 md:mb-14">
                        {description}
                    </p>
                )}

                {/* Tab selector */}
                {hasTable && hasIndustries && (
                    <div className="flex justify-center mb-10 md:mb-14">
                        <div className="inline-flex bg-[#63B84666] border border-[#63B846] rounded-3xl p-1 gap-1">
                            <button
                                type="button"
                                onClick={() => setActiveTab('table')}
                                className={`px-4 md:px-6 py-2 rounded-3xl text-xs md:text-base font-bold tracking-tight transition-colors cursor-pointer ${activeTab === 'table' ? 'bg-[#63B846] text-black' : 'text-black/70 hover:text-black'
                                    }`}
                            >
                                Microgrid spec table
                            </button>
                            <button
                                type="button"
                                onClick={() => setActiveTab('industries')}
                                className={`px-4 md:px-6 py-2 rounded-3xl text-xs md:text-base font-bold tracking-tight transition-colors cursor-pointer ${activeTab === 'industries' ? 'bg-[#63B846] text-black' : 'text-black/70 hover:text-black'
                                    }`}
                            >
                                {industriesTitle || 'Industries & Applications'}
                            </button>
                        </div>
                    </div>
                )}

                {/* Spec table */}
                {hasTable && (!hasIndustries || activeTab === 'table') && (
                    <div className="mb-6 flex items-center justify-center flex-col">
                        {!hasIndustries && (
                            <h3 className="text-2xl md:text-3xl text-black font-normal tracking-tight mb-6">
                                Microgrid spec table
                            </h3>
                        )}
                        <div className="max-w-4xl w-full rounded-none sm:rounded-[20px] overflow-visible sm:overflow-hidden border-0 sm:border sm:border-[#A0CF44]/30">
                            <div className="hidden sm:grid sm:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] bg-[#A0CF44]">
                                <div className="p-4 md:p-5 text-black font-medium text-base md:text-lg tracking-tight border-r border-black/20">
                                    {headers.col1}
                                </div>
                                <div className="p-4 md:p-5 text-black font-medium text-base md:text-lg tracking-tight">
                                    {headers.col2}
                                </div>
                            </div>
                            <div className="flex flex-col gap-4 sm:gap-0">
                                {tableContent.map((row, idx) => (
                                    <div
                                        key={idx}
                                        className={`group rounded-2xl sm:rounded-none grid grid-cols-1 sm:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] bg-[#EEF6EB] transition-colors duration-300 hover:bg-[#A0CF44] ${idx > 0 ? 'sm:border-t' : ''} border-[#A0CF44]/30`}
                                    >
                                        <div className="p-5 sm:p-4 md:p-5 sm:pb-4 pb-1 text-black text-base md:text-lg font-semibold tracking-tight sm:border-r border-black/10 transition-colors duration-300">
                                            {row.value}
                                        </div>
                                        <div className="px-5 pb-5 sm:p-4 md:p-5 pt-0 sm:pt-4 md:pt-5 text-black/85 text-sm md:text-[15px] tracking-tight leading-snug transition-colors duration-300 group-hover:text-black/85">
                                            {row.description}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Industries & applications */}
                {hasIndustries && (!hasTable || activeTab === 'industries') && (
                    <div className="max-w-5xl mx-auto">
                        {!hasTable && (
                            <h3 className="text-2xl md:text-3xl text-black font-normal tracking-tight mb-6 text-center">
                                {industriesTitle || 'Industries & Applications'}
                            </h3>
                        )}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {industries.map((item, idx) => (
                                <Reveal
                                    key={idx}
                                    delay={idx * 0.05}
                                    className="group rounded-2xl bg-[#EEF6EB] p-5 md:p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-[#A0CF44] hover:shadow-lg cursor-default"
                                >
                                    <h4 className="text-black font-semibold text-lg md:text-xl tracking-tight mb-2 transition-colors duration-300">
                                        {item.application}
                                    </h4>
                                    <p className="text-black/75 text-sm md:text-base leading-snug tracking-tight transition-colors duration-300 group-hover:text-black/85">
                                        {item.description}
                                    </p>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default MicrogridSpecTable;
