'use client';

import React from 'react';
import Image, { StaticImageData } from 'next/image';
import { MapPin, Star } from 'lucide-react';

interface TestimonialCardProps {
    location: string;
    name: string;
    quote: string;
    /** Display label for third-party attribution, e.g. "Google" — omitted for first-party */
    source?: string | null;
    /** 1–5; stars render only when present */
    rating?: number | null;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({ location, name, quote, source, rating }) => (
    <article className="bg-[#D5E5C0] rounded-2xl p-5 md:p-6 flex flex-col h-full min-h-[340px] md:min-h-[440px]">
        <div className="flex items-start justify-between gap-3 mb-auto">
            {location ? (
                <span className="flex items-center gap-2">
                    <MapPin size={18} strokeWidth={2.2} className="text-black shrink-0" />
                    <span className="text-sm md:text-base font-medium tracking-tight text-black">
                        {location}
                    </span>
                </span>
            ) : (
                <span aria-hidden className="flex-1" />
            )}
            {typeof rating === 'number' && rating > 0 && (
                <span className="flex gap-0.5 shrink-0" aria-label={`${rating} out of 5 stars`}>
                    {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                            key={i}
                            size={14}
                            strokeWidth={1.5}
                            className={i < rating ? 'fill-[#4d7a17] text-[#4d7a17]' : 'text-black/25'}
                        />
                    ))}
                </span>
            )}
        </div>
        <div>
            <h3 className="text-xl md:text-2xl font-medium tracking-tight text-black mb-2">
                {name}
                {source && (
                    <span className="block text-xs font-normal tracking-tight text-black/50 mt-1">
                        via {source}
                    </span>
                )}
            </h3>
            <p className="text-xs md:text-sm leading-snug tracking-tight text-black/80">
                &ldquo;{quote}&rdquo;
            </p>
        </div>
    </article>
);

interface TestimonialImageCardProps {
    image: StaticImageData | string;
    imageAlt?: string;
}

export const TestimonialImageCard: React.FC<TestimonialImageCardProps> = ({
    image,
    imageAlt = 'Regen Power installation',
}) => (
    <div className="relative rounded-2xl overflow-hidden h-full min-h-[340px] md:min-h-[440px]">
        <Image
            src={image}
            alt={imageAlt}
            fill
            className="object-cover"
            sizes="(min-width: 768px) 66vw, 100vw"
        />
    </div>
);
