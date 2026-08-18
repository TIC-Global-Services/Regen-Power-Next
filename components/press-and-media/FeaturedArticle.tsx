import React from 'react';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface FeaturedArticleProps {
    image: StaticImageData | string;
    imageAlt?: string;
    title: string;
    description: string;
    href?: string;
    showReadMore?: boolean;
    className?: string;
}

const FeaturedArticle: React.FC<FeaturedArticleProps> = ({
    image,
    imageAlt,
    title,
    description,
    href,
    showReadMore = true,
    className = '',
}) => {
    const content = (
        <>
            <Image
                src={image}
                alt={imageAlt || title}
                fill
                className={`object-cover ${href ? 'transition-transform duration-700 group-hover:scale-105' : ''}`}
                sizes="100vw"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 lg:p-16 max-w-3xl text-white capitalize">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium tracking-tight leading-tight mb-3 md:mb-4">
                    {title}
                </h2>
                <p className="text-base leading-snug tracking-tight text-white/90 mb-4 md:mb-6 max-w-2xl">
                    {description}
                </p>
                {showReadMore && href && (
                    <span className="inline-flex items-center gap-2 text-sm md:text-base tracking-tight group-hover:gap-3 transition-all duration-300">
                        Read More
                        <ArrowRight size={18} strokeWidth={2.5} />
                    </span>
                )}
            </div>
        </>
    );

    return (
        <section className={`w-full px-[3%] py-12 md:py-20 ${className}`}>
            {href ? (
                <Link
                    href={href}
                    className="group relative block w-full h-[400px] rounded-2xl overflow-hidden md:h-auto md:aspect-[2.4/1]"
                >
                    {content}
                </Link>
            ) : (
                <div className="relative w-full h-[400px] rounded-2xl overflow-hidden md:h-auto md:aspect-[2.4/1]">
                    {content}
                </div>
            )}
        </section>
    );
};

export default FeaturedArticle;
