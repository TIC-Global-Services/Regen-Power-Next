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

const defaultCards: PortfolioCard[] = [
    {
        type: 'text',
        variant: 'light-gray',
        title: 'Summer Heat\nDerating',
        description: 'Inverters Are Specified With Headroom For Sustained 40°C+ Rooftop Temperatures, We Don’t Install On Capacity Limits.',
    },
    {
        type: 'image',
        variant: 'light-green',
    },
    {
        type: 'text',
        variant: 'light-gray',
        title: 'Coastal\nCorrosion',
        description: 'Stainless Steel Mounting Hardware And Marine-Grade Fastenings On Coastal Installs From Fremantle To Yanchep.',
    },
    {
        type: 'text',
        variant: 'light-gray',
        title: 'Debs Feed-In\nOptimisation',
        description: 'System Orientation And Battery Logic Tuned For The WA DEBS Tariff Structure, Maximising Peak-Period Self-Consumption.',
    },
    {
        type: 'text',
        variant: 'dark',
        title: 'Paperwork And\nConnection',
        description: 'Synergy, Western Power, DEBS, And STC Paperwork Is Managed End-To-End By Our Perth Office. You Never See A Form.',
    },
    {
        type: 'image',
        variant: 'light-green',
    },
];

const variantClass: Record<CardVariant, string> = {
    'light-gray': 'bg-[#E8E8E6]',
    'light-green': 'bg-[#E5EFD5]',
    'dark': 'bg-[#0a0a0a] text-white',
};

const TextCardView: React.FC<{ card: TextCard }> = ({ card }) => {
    const isDark = card.variant === 'dark';
    const titleLines = card.title.split('\n');
    return (
        <div className={`${variantClass[card.variant]} rounded-2xl p-6 md:p-8 flex flex-col justify-between min-h-[280px] md:min-h-[340px]`}>
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-normal tracking-tight leading-tight text-[#63B846]">
                {titleLines.map((line, i) => (
                    <span key={i} className="block">{line}</span>
                ))}
            </h3>
            <div>
                <p className={`text-sm md:text-base leading-snug tracking-tight max-w-md ${isDark ? 'text-white/80' : 'text-black/80'}`}>
                    {card.description}
                </p>
                {card.specs && (
                    <p className={`text-sm md:text-base leading-snug tracking-tight max-w-md mt-2 ${isDark ? 'text-white/80' : 'text-black/80'}`}>
                        {card.specs}
                    </p>
                )}
            </div>
        </div>
    );
};

const ImageCardView: React.FC<{ card: ImageCard }> = ({ card }) => (
    <div className={`${variantClass[card.variant]} rounded-2xl p-6 md:p-8 flex items-center justify-center min-h-[280px] md:min-h-[300px]`}>
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
}

const gridCols: Record<CardLayout, string> = {
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    6: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
};

const SolutionsPortfolio: React.FC<SolutionsPortfolioProps> = ({
    subtitle,
    title,
    description,
    cards = defaultCards,
    layout = 6,
    showHeader = true,
    className = '',
}) => {
    return (
        <section className={`w-full px-[5%] py-12 md:py-20 ${className}`}>
            <div className="">
                {showHeader && (subtitle || title) && (
                    <div className="text-center mb-10 md:mb-14">
                        {subtitle && (
                            <p className="text-2xl md:text-3xl font-light tracking-tight text-black mb-1">
                                {subtitle}
                            </p>
                        )}
                        {title && (
                            <h2 className="text-5xl md:text-6xl lg:text-7xl font-normal tracking-tight text-[#63B846]">
                                {title}
                            </h2>
                        )}
                        {description && (
                            <p className="text-sm md:text-base text-black/80 leading-relaxed mt-4 max-w-3xl mx-auto">
                                {description}
                            </p>
                        )}
                    </div>
                )}

                <div className={`grid ${gridCols[layout]} gap-5 md:gap-6`}>
                    {cards.map((card, index) => {
                        if (card.type === 'image') {
                            return <ImageCardView key={index} card={card} />;
                        }
                        return <TextCardView key={index} card={card} />;
                    })}
                </div>
            </div>
        </section>
    );
};

export default SolutionsPortfolio;
