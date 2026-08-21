import React from 'react';
import Image, { StaticImageData } from 'next/image';
import SectionHeader from '@/reuseables/SectionHeader';
import { id } from 'zod/locales';

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

/* Desktop heights (staggered, top-aligned) */
// const desktopHeightClasses = ['md:h-[20%]', 'md:h-[70%]', 'md:h-[100%]'];
/* Mobile heights: first card small, others tall */
const mobileHeightClasses = ['h-[80px]', 'h-[200px]', 'h-[300px]'];

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
            <div className="px-[5%] md:px-[3%] mx-auto">
                <SectionHeader
                    subtitle={subtitle}
                    title={title}
                    description={description}
                    align={headerAlign}
                    descClass="text-left md:text-center md:text-base lg:max-w-4xl mx-auto"
                    subtitleClass="text-lg md:text-2xl font-light text-black tracking-tight text-left md:text-center"
                    titleClass="text-4xl md:text-6xl lg:text-[5rem] text-[#63B846] font-normal tracking-tighter leading-none text-left md:text-center"
                    className='center hidden lg:block'
                />
                <SectionHeader
                    subtitle={subtitle}
                    title={title}
                    description={description}
                    align="left"
                    descClass="text-left lg:text-center md:text-base lg:max-w-4xl"
                    subtitleClass="text-lg md:text-2xl font-light text-black tracking-tight text-left lg:text-center"
                    titleClass="text-4xl md:text-6xl lg:text-[5rem] text-[#63B846] font-normal tracking-tighter leading-none text-left lg:text-center"
                    className='left lg:hidden' 
                />

                {/* ── Mobile layout: stacked vertical cards ── */}
                <div className="flex flex-col gap-5 lg:hidden max-w-sm md:max-w-full mt-4 mx-auto">
                    {stats.map((stat, idx) => {
                        // const mobileH = mobileHeightClasses[idx] ?? 'h-[300px]';
                        return (
                            <div key={idx}>
                                <div

                                    className={`relative h-75 rounded-[20px] overflow-hidden mb-2`}
                                >
                                    <Image
                                        src={cardBackground}
                                        alt=""
                                        fill
                                        className="object-cover"
                                    />
                                </div>

                                <div className="text-left">
                                    <div
                                        className={`text-[2.5rem] font-normal tracking-tighter leading-none mb-2 ${idx === 0 ? 'text-[#63B846]' : 'text-black'}`}
                                    >
                                        {stat.value}
                                    </div>
                                    <p
                                        className={`text-base tracking-tight font-light ${idx !== 2 ? 'text-[#63B846]' : 'text-black'}`}
                                    >
                                        {stat.label}
                                    </p>
                                </div>
                            </div>

                        );
                    })}
                </div>

                {/* ── Desktop layout: side-by-side staggered heights ── */}
                <div className="relative max-w-5xl mx-auto h-[50dvh] hidden lg:block mt-10">
                    {/* Card backgrounds */}
                    <div className="absolute inset-0 flex items-start gap-6">
                        {stats.map((stat, idx) => {
                            const heightClass = 'h-full';
                            return (
                                <div
                                    key={idx}
                                    className={`relative flex-1 h-full rounded-[20px] overflow-hidden`}
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

                    {/* Text overlays */}
                    <div className="absolute inset-0 flex items-start gap-6 pointer-events-none">
                        {stats.map((stat, idx) => (
                            <div
                                key={idx}
                                className="flex-1 relative h-full"
                            >
                                <div
                                    className={`absolute left-7 right-7 bottom-10`}
                                >
                                    <div className={`text-5xl mb-3 lg:text-[2.825rem] font-normal tracking-tighter leading-none`}>
                                        {stat.value}
                                    </div>
                                    <p
                                        className={`text-base tracking-tight font-light w-full `}
                                    >
                                        {stat.label}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default StatsCardGrid;

