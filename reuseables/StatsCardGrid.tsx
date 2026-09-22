import React from 'react';
import Image, { StaticImageData } from 'next/image';
import SectionHeader from '@/reuseables/SectionHeader';

export interface StatItem {
    value: string;
    label: string;
    /** Optional detail paragraph — flips into view on hover (desktop), shown plainly under the label on mobile/tablet. */
    body?: string;
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
        <section className={`pt-16 md:pt-24 pb-8 md:pb-12 bg-white ${className}`}>
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

                {/* ── Mobile / iPad layout: 1 col on phones, 3 cols on iPad (< lg) ── */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:hidden max-w-sm md:max-w-full mt-12 mx-auto">
                    {stats.map((stat, idx) => {
                        return (
                            <div
                                key={idx}
                                className="relative min-h-75 h-auto rounded-[20px] overflow-hidden"
                            >
                                <Image
                                    src={cardBackground}
                                    alt=""
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-x-5 bottom-6">
                                    <div className="text-[2.5rem] font-normal tracking-tighter leading-none mb-2 text-black">
                                        {stat.value}
                                    </div>
                                    <p className="text-base tracking-tight font-light text-black">
                                        {stat.label}
                                    </p>
                                    {stat.body && (
                                        <p className="text-sm tracking-tight font-light text-black/80 leading-snug mt-2">
                                            {stat.body}
                                        </p>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* ── Desktop layout: side-by-side cards; ones with body content
                     flip on hover to reveal it, others behave as before ── */}
                <div className="items-stretch gap-6 max-w-5xl mx-auto h-[50dvh] hidden lg:flex mt-14">
                    {stats.map((stat, idx) => (
                        <div key={idx} className="group flex-1 h-full [perspective:1200px]">
                            <div
                                className={`relative w-full h-full rounded-[20px] transition-transform duration-700 [transform-style:preserve-3d] ${stat.body ? 'group-hover:[transform:rotateY(180deg)]' : ''}`}
                            >
                                {/* Front */}
                                <div className="absolute inset-0 rounded-[20px] overflow-hidden [backface-visibility:hidden]">
                                    <Image src={cardBackground} alt="" fill className="object-cover" />
                                    <div className="absolute left-7 right-7 bottom-10">
                                        <div className="text-5xl mb-3 lg:text-[2.825rem] font-normal tracking-tighter leading-none">
                                            {stat.value}
                                        </div>
                                        <p className="text-base tracking-tight font-light w-full">
                                            {stat.label}
                                        </p>
                                    </div>
                                </div>

                                {/* Back — only exists (and only flips into view) when body content is set */}
                                {stat.body && (
                                    <div className="absolute inset-0 rounded-[20px] overflow-hidden bg-[#1c1c1a] p-7 flex flex-col justify-center [backface-visibility:hidden] [transform:rotateY(180deg)]">
                                        <p className="text-white/60 text-sm uppercase tracking-wide mb-2">
                                            {stat.label}
                                        </p>
                                        <p className="text-white text-lg leading-snug tracking-tight font-light">
                                            {stat.body}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StatsCardGrid;

