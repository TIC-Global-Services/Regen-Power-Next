'use client';

import React from 'react';
import Image, { StaticImageData } from 'next/image';
import { MapPin, Star, Quote } from 'lucide-react';
import Reveal from '@/reuseables/Reveal';

interface TestimonialCardProps {
    location: string;
    name: string;
    quote: string;
    /** Source slug for logo attribution — omitted for first-party (website) */
    source?: 'google' | 'productreview' | null;
    /** 1–5; stars render only when present */
    rating?: number | null;
    /** Stagger delay for the entrance reveal */
    delay?: number;
}

/** Google's standard 4-color "G" mark — no plain wordmark asset exists in /public */
const GoogleLogo = () => (
    <svg viewBox="0 0 48 48" className="h-14 w-14 shrink-0 drop-shadow-sm" aria-hidden="true">
        <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.5z" />
        <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.6 15.9 18.9 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
        <path fill="#4CAF50" d="M24 44c5.5 0 10.4-1.9 14.3-5.1l-6.6-5.6C29.6 35.1 26.9 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.6 39.6 16.2 44 24 44z" />
        <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.1-4 5.4l6.6 5.6C41.9 35.5 44 30.2 44 24c0-1.3-.1-2.7-.4-3.5z" />
    </svg>
);

export const TestimonialCard: React.FC<TestimonialCardProps> = ({ location, name, quote, source, rating, delay = 0 }) => (
    <Reveal delay={delay} className="h-full">
        <article className="group relative bg-[#D5E5C0] rounded-2xl p-5 md:p-6 flex flex-col h-full min-h-[340px] md:min-h-[440px] overflow-hidden transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-xl hover:shadow-black/10 hover:bg-[#cbe3b3]">
            {/* Decorative quote mark — grows and settles on hover */}
            <Quote
                className="absolute -top-3 -right-3 w-24 h-24 text-black/5 rotate-6 pointer-events-none transition-all duration-500 ease-out group-hover:rotate-0 group-hover:scale-110 group-hover:text-black/10"
                strokeWidth={1}
                aria-hidden="true"
            />

            <div className="flex items-start justify-between gap-3 mb-auto relative z-10">
                {location ? (
                    <span className="flex items-center gap-2">
                        <MapPin
                            size={18}
                            strokeWidth={2.2}
                            className="text-black shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-0.5"
                        />
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
                                style={{ transitionDelay: `${i * 40}ms` }}
                                className={`transition-transform duration-300 ease-out group-hover:scale-125 ${i < rating ? 'fill-[#4d7a17] text-[#4d7a17]' : 'text-black/25'
                                    }`}
                            />
                        ))}
                    </span>
                )}
            </div>
            <div className="relative z-10">
                {source && (
                    <div className="mb-3 transition-transform duration-300 ease-out origin-left group-hover:scale-110">
                        {source === 'google' ? (
                            <GoogleLogo />
                        ) : (
                            <img
                                src="/awards/product_review.png"
                                alt="ProductReview.com.au"
                                className="h-24 w-auto drop-shadow-sm"
                            />
                        )}
                    </div>
                )}
                <h3 className="text-xl md:text-2xl font-medium tracking-tight text-black mb-2">
                    {name}
                </h3>
                <p className="text-xs md:text-sm leading-snug tracking-tight text-black/80">
                    &ldquo;{quote}&rdquo;
                </p>
            </div>
        </article>
    </Reveal>
);

interface TestimonialImageCardProps {
    image: StaticImageData | string;
    imageAlt?: string;
    delay?: number;
}

export const TestimonialImageCard: React.FC<TestimonialImageCardProps> = ({
    image,
    imageAlt = 'Regen Power installation',
    delay = 0,
}) => (
    <Reveal delay={delay} className="h-full">
        <div className="group relative rounded-2xl overflow-hidden h-full min-h-[340px] md:min-h-[440px] transition-shadow duration-300 hover:shadow-xl hover:shadow-black/10">
            <Image
                src={image}
                alt={imageAlt}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(min-width: 768px) 66vw, 100vw"
            />
            <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/5" />
        </div>
    </Reveal>
);
