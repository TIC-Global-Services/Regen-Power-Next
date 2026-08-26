'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import Image, { StaticImageData } from 'next/image';
import SectionHeader from '@/reuseables/SectionHeader';

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
    4: 'sm:grid-cols-2 lg:grid-cols-4',
    6: 'sm:grid-cols-2 lg:grid-cols-3',
    8: 'sm:grid-cols-2 lg:grid-cols-4',
};

const variantClass: Record<IconCardVariant, string> = {
    'light': 'bg-[#EBEBEB]',
    'highlighted': 'bg-[#A0CF44]',
};

const IconCardView: React.FC<{ card: IconCard; variant: IconCardVariant }> = ({ card, variant }) => {
    const cardVariant = card.variant || variant;
    return (
        <div
            className={`bg-[#EEF6EB] hover:bg-[#EBEBEB] transition-colors duration-300 rounded-[20px] p-6 md:p-5 flex flex-col justify-between h-full`}
        >
            <div className="relative w-12 h-12 md:w-15 p-3  md:h-15 mb-5 flex items-center justify-center bg-white rounded-full">
                 <img
                        src={card.icon && card.icon.length > 0 ? card.icon : '/fallback-icon.svg'}
                        alt={card.title}
                        className="object-contain"
                        onError={(e) => {
                            e.currentTarget.src = "/fallback-icon.svg";
                        }}
                    />
            </div>
            <div className="pt-10">
                <h3 className="text-xl md:text-[1.75rem] text-black font-normal tracking-tight leading-[1.2] mb-2">
                    {card.title}
                </h3>
                <p className="text-base md:text-xl text-black leading-[1.2] tracking-tight font-light">
                    {card.description}
                </p>
                {card.specs && (
                    <p className="text-xs md:text-sm text-black leading-snug tracking-tight font-bold mt-2">
                        {card.specs}
                    </p>
                )}
            </div>
        </div>
    );
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
        <section className={`py-10 md:py-24 bg-white ${className}`}>
            <div className="px-[5%] md:px-[3%]">
                {showHeader && (subtitle || title || description) && (
                    <div className="text-center mb-12 md:mb-16">
                        {subtitle && (
                            <p className="text-lg md:text-[2.125rem] text-black font-light tracking-tight leading-none">
                                {subtitle}
                            </p>
                        )}
                        {title && (
                            <h2 className="text-4xl md:text-6xl lg:text-[5rem] text-[#63B846] font-normal tracking-tighter leading-none">
                                {title}
                            </h2>
                        )}
                        {description && (
                            <p className="text-sm md:text-base text-black leading-[1.2] mt-4 md:max-w-4xl mx-auto">
                                {description}
                            </p>
                        )}
                    </div>
                )}

                {/* Grid layout for all screen sizes */}
                <div className={`grid grid-cols-1 ${gridCols[layout]} gap-4 md:gap-5`}>
                    {cards.map((card, idx) => (
                        <IconCardView key={idx} card={card} variant={variant} />
                    ))}
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

