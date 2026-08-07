'use client';

import React from 'react';

export interface BlogCardData {
    title: string;
    description: string;
    image: string;
    imagePosition: 'right' | 'left';
}

interface BlogCardProps {
    card: BlogCardData;
}

const BlogCard: React.FC<BlogCardProps> = ({ card }) => {
    const hasImage = card.image && card.image !== '';
    const hasText = card.title || card.description;
    const imgSrc = card.image || '/fallback.png';

    if (hasImage && hasText) {
        const isImageRight = card.imagePosition === 'right';
        return (
            <div
                className={`flex flex-col md:flex-row bg-[#E5EFD5] rounded-[20px] overflow-hidden ${
                    isImageRight ? '' : 'md:flex-row-reverse'
                }`}
            >
                <div className="relative w-full md:w-2/5 aspect-[4/3] md:aspect-auto md:min-h-[280px]">
                    <img
                        src={imgSrc}
                        alt={card.title}
                        className="absolute inset-0 w-full h-full object-cover"
                        onError={(e) => { e.currentTarget.src = '/fallback.png'; }}
                    />
                </div>
                <div className="flex-1 p-6 md:p-8 flex flex-col justify-center">
                    <h3 className="text-xl md:text-2xl font-normal text-black tracking-tight leading-tight mb-3">
                        {card.title}
                    </h3>
                    <p className="text-sm md:text-base text-black/75 leading-snug tracking-tight">
                        {card.description}
                    </p>
                </div>
            </div>
        );
    }

    if (hasImage) {
        return (
            <div className="relative w-full h-full min-h-[280px] bg-[#E5EFD5] rounded-[20px] overflow-hidden">
                <img
                    src={imgSrc}
                    alt={card.title || 'Blog image'}
                    className="absolute inset-0 w-full h-full object-cover"
                    onError={(e) => { e.currentTarget.src = '/fallback.png'; }}
                />
            </div>
        );
    }

    if (hasText) {
        return (
            <div className="bg-[#E5EFD5] rounded-[20px] overflow-hidden p-6 md:p-8 flex flex-col justify-center h-full">
                <h3 className="text-xl md:text-2xl font-normal text-black tracking-tight leading-tight mb-3">
                    {card.title}
                </h3>
                <p className="text-sm md:text-base text-black/75 leading-snug tracking-tight">
                    {card.description}
                </p>
            </div>
        );
    }

    return null;
};

export default BlogCard;

