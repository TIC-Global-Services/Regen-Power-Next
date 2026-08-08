import React from 'react';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';

export interface LatestNewsItem {
    title: string;
    description: string;
    image: StaticImageData | string;
    href: string;
    imageAlt?: string;
}

interface LatestNewsProps {
    items: LatestNewsItem[];
    subtitle?: string;
    title?: string;
}

const LatestNews: React.FC<LatestNewsProps> = ({
    items,
    subtitle = 'Latest',
    title = 'News',
}) => {
    return (
        <section className="w-full px-[5%] py-12 md:py-20">
            <div className="text-left md:text-center mb-10 md:mb-14 capitalize">
                <p className="text-2xl md:text-3xl font-light tracking-tight text-black mb-1">
                    {subtitle}
                </p>
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-normal tracking-tight text-[#63B846]">
                    {title}
                </h2>
            </div>

            {/* Mobile: Horizontal Slider */}
            <div className="flex overflow-x-auto md:hidden gap-4 -mx-[5%] px-[5%] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pb-4">
                {items.map((item, index) => (
                    <Link
                        key={index}
                        href={item.href}
                        className="group relative block w-[75vw] shrink-0 snap-start rounded-2xl overflow-hidden aspect-[3/4]"
                    >
                        <Image
                            src={item.image}
                            alt={item.imageAlt || item.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            sizes="100vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-5 text-white capitalize">
                            <h3 className="text-xl font-medium tracking-tight leading-tight mb-2">
                                {item.title}
                            </h3>
                            <p className="text-base leading-tight tracking-tight text-white/85 max-w-full">
                                {item.description}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Desktop: Grid */}
            <div className="hidden md:grid md:grid-cols-3 gap-5 md:gap-6 max-w-7xl mx-auto">
                {items.map((item, index) => (
                    <Link
                        key={index}
                        href={item.href}
                        className="group relative block rounded-2xl overflow-hidden aspect-[4/5]"
                    >
                        <Image
                            src={item.image}
                            alt={item.imageAlt || item.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            sizes="(min-width: 768px) 33vw, 100vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-6 text-white capitalize">
                            <h3 className="text-xl font-medium tracking-tight leading-tight mb-2">
                                {item.title}
                            </h3>
                            <p className="text-base leading-tight tracking-tight text-white/85 max-w-full">
                                {item.description}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default LatestNews;
