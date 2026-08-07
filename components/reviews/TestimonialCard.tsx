'use client';

import React from 'react';
import Image, { StaticImageData } from 'next/image';
import { MapPin } from 'lucide-react';

interface TestimonialCardProps {
    location: string;
    name: string;
    quote: string;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({ location, name, quote }) => (
    <article className="bg-[#D5E5C0] rounded-2xl p-5 md:p-6 flex flex-col h-full min-h-[340px] md:min-h-[440px]">
        <div className="flex items-center gap-2 mb-auto">
            <MapPin size={18} strokeWidth={2.2} className="text-black" />
            <span className="text-sm md:text-base font-medium tracking-tight text-black">
                {location}
            </span>
        </div>
        <div>
            <h3 className="text-xl md:text-2xl font-medium tracking-tight text-black mb-2">
                {name}
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
