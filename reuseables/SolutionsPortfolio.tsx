import React from 'react';
import Image, { StaticImageData } from 'next/image';
import gridDots from '@/assets/commercial-off-grid/gridDots.png';

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

const TextCardView: React.FC<{ card: TextCard; mobileScroll?: boolean }> = ({ card, mobileScroll }) => {
    const isDark = card.variant === 'dark';
    const titleLines = card.title.split('\n');
    return (
        <div className={`${variantClass[card.variant]} rounded-2xl p-6 flex flex-col justify-center gap-5 aspect-[4/3] overflow-hidden ${mobileScroll ? 'shrink-0 w-[75vw] md:w-[40vw] lg:w-auto' : ''}`}>
            <h3 className="text-2xl lg:text-[2.5rem] font-normal tracking-tight leading-[1] text-[#63B846] mb-2">
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

const ImageCardView: React.FC<{ card: ImageCard; mobileScroll?: boolean }> = ({ card, mobileScroll }) => (
    <div className={`${variantClass[card.variant]} rounded-2xl p-6 md:p-8 flex items-center justify-center aspect-[4/3] overflow-hidden ${mobileScroll ? 'shrink-0 w-[75vw] md:w-[40vw] lg:w-auto' : ''}`}>
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
}) => {
    if (!cards || cards.length === 0) return null;

    return (
        <section className={`w-full px-[5%] md:px-[3%] py-12 md:py-20 ${className}`}>
            <div>
                {showHeader && (subtitle || title) && (
                    <div className="text-center mb-10 md:mb-14">
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

                <div className={`${mobileScroll
                    ? `flex items-stretch overflow-x-auto lg:grid ${desktopGridCols(layout)} lg:snap-none -mx-[5%] px-[5%] md:px-[3%] lg:mx-0 lg:px-0 gap-4 min-h-[280px] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pb-4 lg:pb-0`
                    : `grid ${gridCols[layout]} gap-5 md:gap-6`
                    }`}>
                    {cards.map((card, index) => {
                        if (card.type === 'image') {
                            return <ImageCardView key={index} card={card} mobileScroll={mobileScroll} />;
                        }
                        return <TextCardView key={index} card={card} mobileScroll={mobileScroll} />;
                    })}
                </div>
            </div>
        </section>
    );
};

export default SolutionsPortfolio;