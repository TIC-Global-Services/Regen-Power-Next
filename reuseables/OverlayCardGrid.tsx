import React from 'react';
import Image, { StaticImageData } from 'next/image';
import CtaButton from '@/reuseables/CtaButton';

export interface OverlayCard {
    title: string;
    description: string;
}

export interface OverlayCardGridProps {
    backgroundImage: string;
    badge?: string;
    subtitle?: string;
    title: React.ReactNode;
    description?: string;
    cards: OverlayCard[];
    ctaText?: string;
    ctaHref?: string;
    cardLayout?: 'wrap' | 'grid';
    cardColumns?: 3 | 6;
    overlayOpacity?: number;
    className?: string;
}

const OverlayCardGrid: React.FC<OverlayCardGridProps> = ({
    backgroundImage,
    badge,
    subtitle,
    title,
    description,
    cards,
    ctaText,
    ctaHref,
    cardLayout = 'wrap',
    cardColumns = 3,
    overlayOpacity = 60,
    className = '',
}) => {
    return (
        <section className={`relative w-full min-h-screen flex items-center justify-center overflow-hidden ${className}`}>
            <div className="absolute inset-0 z-0">
                <img
                    src={backgroundImage
                        || '/fallback.png'
                    }
                    alt=""
                    height={1920}
                    width={1080}
                    className="object-cover object-bottom w-full h-full"
                />
                <div
                    className="absolute inset-0 bg-black"
                    style={{ opacity: overlayOpacity / 100 }}
                />
            </div>

            <div className="relative z-10 w-full px-[5%] md:px-[3%] py-16 md:py-24">
                <div className="mx-auto text-center flex flex-col items-center">
                    {badge && (
                        <span className="mb-4 inline-flex rounded-full bg-[#E5DDD8] px-5 py-2 text-xs font-medium uppercase tracking-wide text-black">
                            {badge}
                        </span>
                    )}

                    {subtitle && (
                        <p className="text-lg md:text-2xl text-white font-light tracking-tight mb-1">
                            {subtitle}
                        </p>
                    )}

                    <h2 className="text-4xl md:text-6xl lg:text-[4.5rem] text-[#63B846] font-normal tracking-tighter leading-none">
                        {title}
                    </h2>

                    {description && (
                        <p className="text-sm md:text-base leading-snug tracking-tight mt-3 mb-5 text-white/90 max-w-3xl">
                            {description}
                        </p>
                    )}

                    {ctaText && ctaHref && (
                        <CtaButton
                            href={ctaHref}
                            text={ctaText}
                            textColor="text-white"
                            bgClass="bg-[#63B84640] backdrop-blur-sm"
                            borderClass="border border-[#63B846]"
                            hoverClass="hover:bg-[#63B846]"
                        />
                    )}

                    {/* Desktop cards */}
                    <div
                        className={`mt-12 max-w-6xl mx-auto hidden md:${cardLayout === 'grid' ? 'grid' : 'flex'} ${cardLayout === 'grid'
                            ? `grid-cols-2 lg:grid-cols-${cardColumns} gap-4 md:gap-5`
                            : 'flex-wrap justify-center gap-4'
                            }`}
                    >
                        {cards.map((card, idx) => (
                            <article
                                key={idx}
                                className={`${cardLayout === 'wrap'
                                    ? 'w-[240px] h-[140px]'
                                    : 'min-h-[200px]'
                                    } rounded-[8px] border border-white/20 bg-white/12 p-4 md:p-6 backdrop-blur-md flex flex-col text-left`}
                            >
                                <h3 className="text-base md:text-[1.375rem] tracking-tight text-white mb-1">
                                    {card.title}
                                </h3>
                                <p className="text-sm leading-tight text-white/85">
                                    {card.description}
                                </p>
                            </article>
                        ))}
                    </div>

                    {/* Mobile slider (no indicators) */}
                    <div className="mt-8 md:hidden w-full">
                        <div
                            className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2 -mx-[5%] px-[5%] md:px-[3%]"
                            style={{ WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', msOverflowStyle: 'none' } as React.CSSProperties}
                        >
                            {cards.map((card, idx) => (
                                <article
                                    key={idx}
                                    className="snap-start shrink-0 w-[75%] rounded-[8px] border border-white/20 bg-white/12 p-4 backdrop-blur-md flex flex-col text-left"
                                >
                                    <h3 className="text-base tracking-tight text-white mb-1">
                                        {card.title}
                                    </h3>
                                    <p className="text-sm leading-tight text-white/85">
                                        {card.description}
                                    </p>
                                </article>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OverlayCardGrid;
