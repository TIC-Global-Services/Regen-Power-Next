'use client';

import React from 'react';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';

interface BaseProps {
    image: StaticImageData | string;
    imageAlt?: string;
    href: string;
    title: string;
}

interface PortfolioCardProps extends BaseProps {
    description?: never;
}

interface FeaturedPortfolioCardProps extends BaseProps {
    description: string;
}

export const FeaturedPortfolioCard: React.FC<FeaturedPortfolioCardProps> = ({
    image,
    imageAlt,
    title,
    description,
    href,
}) => (
    <Link
        href={href}
        className="group relative block rounded-2xl overflow-hidden aspect-[16/11] md:aspect-[2/1] col-span-1 md:col-span-2"
    >
        <Image
            src={image}
            alt={imageAlt || title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(min-width: 1024px) 66vw, 100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7 text-white">
            <h3 className="text-xl md:text-2xl lg:text-3xl font-medium tracking-tight leading-tight mb-2">
                {title}
            </h3>
            <p className="text-xs md:text-sm leading-snug tracking-tight text-white/85 max-w-md">
                {description}
            </p>
        </div>
    </Link>
);

export const PortfolioCard: React.FC<PortfolioCardProps> = ({
    image,
    imageAlt,
    title,
    href,
}) => (
    <Link
        href={href}
        className="group relative block rounded-2xl overflow-hidden aspect-[3/2]"
    >
        <Image
            src={image}
            alt={imageAlt || title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5 text-white">
            <h3 className="text-sm md:text-base lg:text-lg font-medium tracking-tight leading-tight">
                {title}
            </h3>
        </div>
    </Link>
);
