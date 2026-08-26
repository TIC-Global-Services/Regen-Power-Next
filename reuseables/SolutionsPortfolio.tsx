'use client';
import React, { useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import gridDots from '@/assets/commercial-off-grid/gridDots.png';
import { SliderArrows, SliderDots, useSnapSlider } from './MobileSliderControls';

export type CardVariant = 'light-gray' | 'light-green' | 'dark';
export type CardLayout = 3 | 4 | 6;

interface BaseCard {
    variant: CardVariant;
}

export interface TextCard extends BaseCard {
    type: 'text';
    title: string;
    description: string;
    specs?: string;
}

export interface ImageCard extends BaseCard {
    type: 'image';
    image?: StaticImageData | string;
    imageAlt?: string;
}

export type PortfolioCard = TextCard | ImageCard;

const variantClass: Record<CardVariant, string> = {
    'light-gray': 'bg-[#EBEBEB]',
    'light-green': 'bg-[#EEF6EB]',
    'dark': 'bg-[#3B3B33] text-white',
};

const TextCardView: React.FC<{ card: TextCard; mobileScroll?: boolean; isHovered?: boolean; onMouseEnter?: () => void; onMouseLeave?: () => void; tabletOrder?: string }> = ({ card, mobileScroll, isHovered, onMouseEnter, onMouseLeave, tabletOrder }) => {
    const isDark = card.variant === 'dark' || isHovered;
    const titleLines = card.title.split('\n');
    return (
        <div
            className={`${isHovered ? 'bg-[#3B3B33] text-white' : variantClass[card.variant]} rounded-2xl p-6 flex flex-col justify-between gap-5 aspect-[4/3] overflow-hidden transition-colors duration-300 ${mobileScroll ? 'shrink-0 w-[60vw] snap-start md:w-auto' : ''} ${tabletOrder ?? ''}`}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <h3 className="text-2xl md:text-[2.5rem] lg:text-[3.125rem] font-normal tracking-tight leading-[1] text-[#63B846]">
                {titleLines.map((line, i) => (
                    <span key={i} className="block">{line}</span>
                ))}
            </h3>
            <div>
                <p className={`text-sm lg:text-base leading-[1.2] tracking-tight max-w-md ${isDark ? 'text-white/80' : 'text-black/80'}`}>
                    {card.description}
                </p>
                {card.specs && (
                    <p className={`text-sm lg:text-base leading-[1.2] tracking-tight max-w-md ${isDark ? 'text-white/80' : 'text-black/80'}`}>
                        {card.specs}
                    </p>
                )}
            </div>
        </div>
    );
};

const ImageCardView: React.FC<{ card: ImageCard; mobileScroll?: boolean; isHovered?: boolean; onMouseEnter?: () => void; onMouseLeave?: () => void; tabletOrder?: string }> = ({ card, mobileScroll, isHovered, onMouseEnter, onMouseLeave, tabletOrder }) => (
    <div
        className={`${isHovered ? 'bg-[#3B3B33] text-white' : variantClass[card.variant]} rounded-2xl p-6 md:p-8 flex items-center justify-center aspect-[4/3] overflow-hidden transition-colors duration-300 ${mobileScroll ? 'shrink-0 w-[60vw] snap-start md:w-auto' : ''} ${tabletOrder ?? ''}`}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
    >
        <div className="relative w-32 h-32 md:w-40 md:h-40">
            <Image
                src={card.image || gridDots}
                alt={card.imageAlt || ''}
                fill
                className="object-contain"
                sizes="160px"
            />
        </div>
    </div>
);

export interface SolutionsPortfolioProps {
    subtitle?: string;
    title?: string;
    description?: string;
    cards?: PortfolioCard[];
    layout?: CardLayout;
    showHeader?: boolean;
    className?: string;
    /** When true, render cards as a horizontal swipe scroll on mobile instead of a stacked grid. */
    mobileScroll?: boolean;
    /** Index of the card that should appear hovered by default. Defaults to 4 (second row, second card in a 3-col grid). */
    defaultHoveredIndex?: number;
}

const gridCols: Record<CardLayout, string> = {
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    6: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
};

/** Desktop-only grid classes (lg:) — used when mobileScroll renders the swipe row below lg. */
const desktopGridCols = (layout: CardLayout) =>
    gridCols[layout]
        .split(' ')
        .filter((c) => c.startsWith('lg:'))
        .join(' ');

const SolutionsPortfolio: React.FC<SolutionsPortfolioProps> = ({
    subtitle,
    title,
    description,
    cards,
    layout = 6,
    showHeader = true,
    className = '',
    mobileScroll = false,
    defaultHoveredIndex = 4,
}) => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const activeIndex = hoveredIndex !== null ? hoveredIndex : defaultHoveredIndex;

    // Native snap slider drives the swipe row on phones (< md); iPad and up
    // render grids where these controls are hidden.
    const {
        trackRef, sync, active,
        canPrev, canNext, goTo, next, prev,
    } = useSnapSlider(cards?.length ?? 0);

    if (!cards || cards.length === 0) return null;

    return (
        <section className={`w-full px-[5%] md:px-[3%] py-12 md:py-20 ${className}`}>
            <div>
                {showHeader && (subtitle || title) && (
                    <div className="text-left lg:text-center mb-10 md:mb-14">
                        {subtitle && (
                            <p className="text-2xl md:text-3xl font-light tracking-tight text-black leading-none">
                                {subtitle}
                            </p>
                        )}
                        {title && (
                            <h2 className="text-5xl md:text-6xl lg:text-7xl font-normal leading-none tracking-tight text-[#63B846]">
                                {title}
                            </h2>
                        )}
                        {description && (
                            <p className="text-sm md:text-xl text-black leading-[1.2] tracking-tight mt-4 max-w-7xl mx-auto">
                                {description}
                            </p>
                        )}
                    </div>
                )}

                <div ref={trackRef} onScroll={sync} className={`${mobileScroll
                    ? `flex items-stretch overflow-x-auto md:overflow-visible md:grid md:grid-cols-2 lg:grid ${desktopGridCols(layout)} md:snap-none -mx-[5%] px-[5%] md:mx-0 md:px-0 gap-4 min-h-[280px] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pb-4 md:pb-0`
                    : `grid ${gridCols[layout]} gap-5 md:gap-6`
                    }`}>
                    {cards.map((card, index) => {
                        const isActive = index === activeIndex;
                        // iPad (md–lg): show the final two cards swapped, so the
                        // image card sits in column 1 of the last row. Data order,
                        // phone slider and desktop grid stay untouched.
                        const tabletOrder =
                            mobileScroll && index === cards.length - 2 ? 'md:order-[2] lg:order-[0]'
                            : mobileScroll && index === cards.length - 1 ? 'md:order-[1] lg:order-[0]'
                            : '';
                        const hoverProps = {
                            isHovered: isActive,
                            onMouseEnter: () => setHoveredIndex(index),
                            onMouseLeave: () => setHoveredIndex(null),
                        };
                        if (card.type === 'image') {
                            return <ImageCardView key={index} card={card} mobileScroll={mobileScroll} tabletOrder={tabletOrder} {...hoverProps} />;
                        }
                        return <TextCardView key={index} card={card} mobileScroll={mobileScroll} tabletOrder={tabletOrder} {...hoverProps} />;
                    })}
                </div>

                {/* Slider controls — phones only; iPad renders the 2-col grid */}
                {mobileScroll && cards.length > 1 && (
                    <>
                        <SliderDots count={cards.length} active={active} onSelect={goTo} className="mt-6 md:hidden" />
                        <SliderArrows canPrev={canPrev} canNext={canNext} onPrev={prev} onNext={next} className="mt-2 md:hidden" />
                    </>
                )}
            </div>
        </section>
    );
};

export default SolutionsPortfolio;