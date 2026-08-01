import React from 'react';
import Image, { StaticImageData } from 'next/image';
import SectionHeader from '@/reuseables/SectionHeader';

export interface StatItem {
    value: string;
    label: string;
}

export interface StatsCardGridProps {
    subtitle: string;
    title: string;
    description?: string;
    stats: StatItem[];
    cardBackground: StaticImageData | string;
    className?: string;
    headerAlign?: 'left' | 'center';
}

const cardHeightClasses = ['h-[20%]', 'h-[70%]', 'h-[100%]'];

const StatsCardGrid: React.FC<StatsCardGridProps> = ({
    subtitle,
    title,
    description,
    stats,
    cardBackground,
    className = '',
    headerAlign = 'center',
}) => {
    return (
        <section className={`py-16 md:py-24 bg-white ${className}`}>
            <div className="px-[5%] mx-auto">
                <SectionHeader
                    subtitle={subtitle}
                    title={title}
                    description={description}
                    align={headerAlign}
                    subtitleClass="text-lg md:text-2xl font-light text-black tracking-tight"
                    titleClass="text-4xl md:text-6xl lg:text-[5rem] text-[#63B846] font-normal tracking-tighter leading-none"
                    className={headerAlign === 'center' ? 'mx-auto mb-16 max-w-4xl' : 'max-w-4xl mb-16'}
                />

                <div className="relative max-w-5xl mx-auto h-[400px] md:h-[440px]">
                    {/* Cards - top-aligned, different heights */}
                    <div className="absolute inset-0 flex items-start gap-5 md:gap-6">
                        {stats.map((stat, idx) => {
                            const heightClass = cardHeightClasses[idx] ?? 'h-full';
                            return (
                                <div
                                    key={idx}
                                    className={`relative flex-1 ${heightClass} ${idx != 2 ? 'rounded-t-[20px]' : 'rounded-[20px]'}  overflow-hidden`}
                                >
                                    <Image
                                        src={cardBackground}
                                        alt=""
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            );
                        })}
                    </div>

                    {/* Values - pinned 80px from bottom of section (above the label) */}
                    <div className="absolute inset-0 flex items-start gap-5 md:gap-6 pointer-events-none">
                        {stats.map((stat, idx) => (
                            <div
                                key={idx}
                                className="flex-1 relative h-full"
                            >
                                <div
                                    className={`absolute left-5 md:left-7 right-5 md:right-7 ${idx == 0 ? 'bottom-45' : idx == 1 ? 'bottom-27' : 'bottom-10'}`}

                                >
                                    <div className={`text-3xl md:text-5xl mb-3 lg:text-[2.825rem] font-normal tracking-tighter leading-none ${idx == 0 ? 'text-[#63B846]' : 'text-black'}`}>
                                        {stat.value}

                                    </div>
                                    <p
                                        className={`text-sm md:text-base tracking-tight font-light w-full ${idx != 2 ? 'text-[#63B846]' : ''}`}
                                    >
                                        {stat.label}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Labels - pinned 30px from bottom of section (below the value) */}
                    <div className="absolute inset-0 flex items-start gap-5 md:gap-6 pointer-events-none">
                        {stats.map((stat, idx) => (
                            <div
                                key={idx}
                                className="flex-1 relative h-full"
                            >

                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default StatsCardGrid;
