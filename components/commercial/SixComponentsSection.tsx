import React from 'react';
import Image, { StaticImageData } from 'next/image';
import Reveal from '@/reuseables/Reveal';
import Fade from '@/reuseables/fade';

export interface ComponentItem {
    letter: string;
    title: string;
}

interface SixComponentsSectionProps {
    subtitle?: string;
    title: string;
    description: string;
    backgroundImage: StaticImageData | string;
    items: ComponentItem[];
}

const SixComponentsSection: React.FC<SixComponentsSectionProps> = ({
    subtitle = 'Six Components',
    title,
    description,
    backgroundImage,
    items,
}) => {
    return (
        <section className="px-[5%] py-12 md:py-20 bg-white">
            <div className="relative max-w-7xl mx-auto rounded-[24px] overflow-hidden min-h-[640px] md:min-h-[720px] flex flex-col">
                {/* Background image */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src={backgroundImage}
                        alt=""
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/55" />
                </div>

                {/* Text Block */}
                <div className="relative z-10 px-6 md:px-12 lg:px-16 pt-12 md:pt-16 max-w-3xl">
                    <Fade>
                        <p className="text-lg md:text-2xl font-light text-white tracking-tight mb-1">
                            {subtitle}
                        </p>
                        <h2 className="text-4xl md:text-6xl lg:text-[4.5rem] text-[#63B846] font-normal tracking-tighter leading-none mb-5">
                            {title}
                        </h2>
                        <p className="text-sm md:text-base text-white/85 leading-[1.2] tracking-tight max-w-2xl font-light">
                            {description}
                        </p>
                    </Fade>
                </div>

                {/* Tiles Grid */}
                <div className="relative z-10 mt-auto p-6 md:p-12 lg:p-16">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 max-w-3xl">
                        {items.map((item, idx) => (
                            <Reveal
                                key={idx}
                                delay={idx * 0.08}
                                className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-5 md:p-6 hover:bg-white/20 transition-colors duration-300 min-h-[110px] md:min-h-[130px] flex flex-col justify-between"
                            >
                                <span className="text-white text-2xl md:text-3xl font-normal leading-none tracking-tight">
                                    {item.letter}
                                </span>
                                <h3 className="text-white text-sm md:text-base font-light leading-snug tracking-tight">
                                    {item.title}
                                </h3>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SixComponentsSection;
