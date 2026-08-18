'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';

export interface BlogCardData {
    title: string;
    description: string;
    image: string;
    imagePosition: 'right' | 'left';
    categoryKey?: string;
    /** every category the card belongs to (multi-category articles) */
    categoryKeys?: string[];
}

export type BlogCardVariant = 'text' | 'image';

interface BlogCardProps {
    card: BlogCardData;
    variant?: BlogCardVariant;
}

const BlogCard: React.FC<BlogCardProps> = ({ card, variant = 'text' }) => {
    if (variant === 'image') {
        return (
            <div className="relative w-full h-[400px] md:h-[466px] rounded-[20px] overflow-hidden bg-[#E5EFD5]">
                <Image
                    src={card.image || '/fallback.png'}
                    alt={card.title || 'Blog image'}
                    fill
                    className="object-cover"
                />
            </div>
        );
    }

    // Text card
    const hasText = card.title || card.description;
    if (!hasText) return null;

    return (
        <div className="relative w-full h-[304px] md:h-[466px] bg-[#E5EFD5] rounded-[20px] p-6 md:p-8 flex flex-col justify-end">
            {/* ↗ arrow top right (plain, no bg circle) */}
            <span className="absolute top-5 right-5 md:top-7 md:right-7 flex items-center justify-center text-black">
                <ArrowUpRight className="w-6 h-6 md:w-7 md:h-7" />
            </span>

            <h3 className="text-xl md:text-2xl font-normal text-black tracking-tight leading-tight mb-3">
                {card.title}
            </h3>
            <p className="text-sm md:text-base text-black/75 leading-snug tracking-tight">
                {card.description}
            </p>
        </div>
    );
};

export default BlogCard;