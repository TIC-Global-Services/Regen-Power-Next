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
    /** Scale cards up on mobile (< md). Use for dense grids that feel small on phones. */
    mobileLarge?: boolean;
    /** Remove the white circular background behind the icon — icon renders plain. */
    plainIcon?: boolean;
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

const IconCardView: React.FC<{ card: IconCard; variant: IconCardVariant; largeOnMobile?: boolean; plainIcon?: boolean }> = ({ card, variant, largeOnMobile, plainIcon }) => {
    const cardVariant = card.variant || variant;
    return (
        <div
            className={`bg-[#EEF6EB] hover:bg-[#EBEBEB] transition-colors duration-300 rounded-[20px] flex flex-col h-full ${largeOnMobile ? 'p-8 md:p-5 min-h-[280px] md:min-h-0' : 'p-6 md:p-5'}`}
        >
            {plainIcon ? (
                <div className={`relative shrink-0 flex items-center mb-5 ${largeOnMobile ? 'w-16 h-16 md:w-15 md:h-15' : 'w-12 h-12 md:w-15 md:h-15'}`}>
                    <img
                        src={card.icon && card.icon.length > 0 ? card.icon : '/fallback-icon.svg'}
                        alt={card.title}
                        className="object-contain w-full h-full"
                        onError={(e) => {
                            e.currentTarget.src = "/fallback-icon.svg";
                        }}
                    />
                </div>
            ) : (
                <div className={`relative flex items-center justify-center bg-white rounded-full mb-5 ${largeOnMobile ? 'w-16 h-16 md:w-15 md:h-15 p-4 md:p-3' : 'w-12 h-12 md:w-15 md:h-15 p-3'}`}>
                    <img
                        src={card.icon && card.icon.length > 0 ? card.icon : '/fallback-icon.svg'}
                        alt={card.title}
                        className="object-contain"
                        onError={(e) => {
                            e.currentTarget.src = "/fallback-icon.svg";
                        }}
                    />
                </div>
            )}
            <div className={`flex-1 flex flex-col ${largeOnMobile ? 'pt-6 md:pt-10' : 'pt-10'}`}>
                <h3 className={`text-black font-normal tracking-tight leading-[1.2] mb-2 ${largeOnMobile ? 'text-2xl md:text-[1.75rem]' : 'text-xl md:text-[1.75rem]'}`}>
                    {card.title}
                </h3>
                <p className={`text-black leading-[1.2] tracking-tight font-light ${largeOnMobile ? 'text-lg md:text-xl' : 'text-base md:text-xl'}`}>
                    {card.description}
                </p>
                {card.specs && (
                    <p className={`text-black leading-snug tracking-tight font-bold mt-2 ${largeOnMobile ? 'text-sm md:text-sm' : 'text-xs md:text-sm'}`}>
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
    mobileLarge = false,
    plainIcon = false,
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
                <div className={`grid grid-cols-1 ${gridCols[layout]} ${mobileLarge ? 'gap-5 md:gap-5' : 'gap-4 md:gap-5'}`}>
                    {cards.map((card, idx) => (
                        <IconCardView key={idx} card={card} variant={variant} largeOnMobile={mobileLarge} plainIcon={plainIcon} />
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

