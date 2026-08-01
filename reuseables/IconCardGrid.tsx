import React from 'react';
import Image, { StaticImageData } from 'next/image';
import SectionHeader from '@/reuseables/SectionHeader';
import { cachedDataVersionTag } from 'v8';

export type IconCardVariant = 'light' | 'highlighted';
export type IconCardLayout = 4 | 6 | 8;

export interface IconCard {
    title: string;
    description: string;
    specs?: string;
    icon?: string;
    iconElement?: React.ReactNode;
    variant?: IconCardVariant;
}

interface IconCardGridProps {
    subtitle?: string;
    title?: string;
    description?: string;
    cards: IconCard[];
    layout?: IconCardLayout;
    variant?: IconCardVariant;
    showHeader?: boolean;
    className?: string;
    footer?: React.ReactNode;
}

const gridCols: Record<IconCardLayout, string> = {
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
    6: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    8: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
};

const variantClass: Record<IconCardVariant, string> = {
    'light': 'bg-[#E5EFD5]',
    'highlighted': 'bg-[#A0CF44]',
};

const IconCardGrid: React.FC<IconCardGridProps> = ({
    subtitle,
    title,
    description,
    cards,
    layout = 4,
    variant = 'light',
    showHeader = true,
    className = '',
    footer,
}) => {
    return (
        <section className={`py-16 md:py-24 bg-white ${className}`}>
            <div className="px-[5%] mx-auto">
                {showHeader && (subtitle || title || description) && (
                    <div className="text-center max-w-7xl mx-auto mb-12 md:mb-16">
                        {subtitle && (
                            <p className="text-lg md:text-2xl text-black font-light tracking-tight mb-1">
                                {subtitle}
                            </p>
                        )}
                        {title && (
                            <h2 className="text-4xl md:text-6xl lg:text-[5rem] text-[#63B846] font-normal tracking-tighter leading-none">
                                {title}
                            </h2>
                        )}
                        {description && (
                            <p className="text-sm md:text-base text-black leading-[1.2] mt-4">
                                {description}
                            </p>
                        )}
                    </div>
                )}

                <div className={`grid ${gridCols[layout]} gap-4 md:gap-5 max-w-7xl mx-auto`}>
                    {cards.map((card, idx) => {
                        const cardVariant = card.variant || variant;
                        return (
                            <div
                                key={idx}
                                className={`${variantClass[cardVariant]} rounded-[20px] p-6 md:p-7 flex flex-col min-h-[240px]`}
                            >
                                {(card.icon || card.iconElement) && (
                                    <div className="relative w-14 h-14 md:w-16 md:h-16 mb-5 flex items-center justify-center">
                                        {card.iconElement ? (
                                            card.iconElement
                                        ) : (
                                            <img
                                                src={card.icon || '/fallback_icon.svg'}
                                                alt={card.title}
                                                className="object-contain"
                                                onError={(e) => {
                                                    e.currentTarget.src = "/fallback_icon.svg";
                                                }}
                                            />
                                        )}
                                    </div>
                                )}
                                <h3 className="text-xl md:text-[1.35rem] text-black font-normal tracking-tight leading-snug mb-2">
                                    {card.title}
                                </h3>
                                <p className="text-sm md:text-xl text-black leading-snug tracking-tight font-light">
                                    {card.description}
                                </p>
                                {card.specs && (
                                    <p className="text-xs md:text-sm text-black leading-snug tracking-tight font-bold mt-2">
                                        {card.specs}
                                    </p>
                                )}
                            </div>
                        );
                    })}
                </div>

                {footer && (
                    <div className="mt-10 md:mt-12 max-w-7xl mx-auto">
                        {footer}
                    </div>
                )}
            </div>
        </section>
    );
};

export default IconCardGrid;
