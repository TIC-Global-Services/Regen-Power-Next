import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import IconCardGrid, { IconCard } from '@/reuseables/IconCardGrid';

export type StoryCardVariant = 'default' | 'highlighted' | 'light';

export interface StoryCard {
    title: string;
    description: string;
    variant?: StoryCardVariant;
}

export interface OffGridStoryProps {
    subtitle: string;
    title: string;
    description: string;
    cards: StoryCard[];
    featuredImage: string;
    featuredImageAlt?: string;
    featuredTitle: string;
    featuredDescription: string;
    featuredHref?: string;
    showReadMore?: boolean;
}

const OffGridStory: React.FC<OffGridStoryProps> = ({
    subtitle,
    title,
    description,
    cards,
    featuredImage,
    featuredImageAlt,
    featuredTitle,
    featuredDescription,
    featuredHref,
    showReadMore = false,
}) => {
    const featuredContent = (
        <>
            <img
                src={featuredImage || '/fallback.png'}
                alt={featuredImageAlt || featuredTitle}
                className={`absolute inset-0 w-full h-full object-cover ${featuredHref ? 'transition-transform duration-700 group-hover:scale-105' : ''}`}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 lg:p-16 max-w-3xl text-white">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium tracking-tight leading-tight mb-3 md:mb-4">
                    {featuredTitle}
                </h2>
                <p className="text-sm md:text-base leading-snug tracking-tight text-white/90 mb-4 md:mb-6 max-w-2xl">
                    {featuredDescription}
                </p>
                {showReadMore && featuredHref && (
                    <span className="inline-flex items-center gap-2 text-sm md:text-base tracking-tight group-hover:gap-3 transition-all duration-300">
                        Read More
                        <ArrowRight size={18} strokeWidth={2.5} />
                    </span>
                )}
            </div>
        </>
    );

    return (
        <section className="py-16 md:py-24 bg-white">
            <div className="px-[5%] mx-auto">
                <div className="text-center max-w-4xl mx-auto mb-12 md:mb-16 -space-y-2">
                    <p className="text-lg md:text-2xl text-black font-light tracking-tight leading-none">
                        {subtitle}
                    </p>
                    <h2 className="text-4xl md:text-6xl lg:text-[5rem] text-[#63B846] font-normal tracking-tighter leading-none">
                        {title}
                    </h2>
                    <p className="text-sm md:text-base text-black leading-[1.2] mt-4 max-w-3xl mx-auto">
                        {description}
                    </p>
                </div>

                <IconCardGrid
                    cards={cards as IconCard[]}
                    layout={4}
                    showHeader={false}
                />

                <div className="mt-12 md:mt-16">
                    {featuredHref ? (
                        <Link
                            href={featuredHref}
                            className="group relative block w-full rounded-2xl overflow-hidden aspect-[16/9] md:aspect-[2.4/1]"
                        >
                            {featuredContent}
                        </Link>
                    ) : (
                        <div className="relative w-full rounded-2xl overflow-hidden aspect-[16/9] md:aspect-[2.4/1]">
                            {featuredContent}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default OffGridStory;
