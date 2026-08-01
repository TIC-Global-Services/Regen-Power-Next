'use client';

import React, { useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import SectionHeader from '@/reuseables/SectionHeader';
import CtaButton from '@/reuseables/CtaButton';

export interface TierDetail {
    label: string;
    value: string;
}

export interface Tier {
    title: string;
    subtitle: string;
    description: string;
    image: StaticImageData | string;
    details: TierDetail[];
    ctaText: string;
    ctaHref: string;
}

interface ThreeTiersSectionProps {
    subtitle?: string;
    title: string;
    description: string;
    tiers: Tier[];
}

const ThreeTiersSection: React.FC<ThreeTiersSectionProps> = ({
    subtitle = 'Three Tiers',
    title,
    description,
    tiers,
}) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const handlePrev = () => {
        setActiveIndex((prev) => (prev === 0 ? tiers.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setActiveIndex((prev) => (prev === tiers.length - 1 ? 0 : prev + 1));
    };

    return (
        <section className="py-16 md:py-24 bg-white">
            <div className="px-[5%] mx-auto">
                <SectionHeader
                    subtitle={subtitle}
                    title={title}
                    description={description}
                    align="left"
                    subtitleClass="text-lg md:text-2xl font-light text-black tracking-tight"
                    titleClass="text-4xl md:text-6xl lg:text-[4.5rem] text-[#63B846] font-normal tracking-tighter leading-none"
                    className="max-w-4xl mb-12 md:mb-16"
                />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
                    {/* Image Side */}
                    <div className="relative w-full aspect-[4/3] lg:aspect-auto lg:h-full rounded-[20px] overflow-hidden min-h-[320px] lg:min-h-[560px]">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeIndex}
                                initial={{ opacity: 0, scale: 1.03 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1 }}
                                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                className="absolute inset-0"
                            >
                                <Image
                                    src={tiers[activeIndex].image}
                                    alt={tiers[activeIndex].title}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Content Side */}
                    <div className="flex flex-col justify-between">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeIndex}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                className="flex flex-col"
                            >
                                <h3 className="text-3xl md:text-[2.5rem] font-normal text-black tracking-tight leading-tight mb-2">
                                    {tiers[activeIndex].title}
                                </h3>
                                <p className="text-xl md:text-2xl text-black/70 font-light tracking-tight mb-6">
                                    {tiers[activeIndex].subtitle}
                                </p>
                                <p className="text-sm md:text-base text-black/80 leading-[1.2] tracking-tight mb-6 max-w-xl">
                                    {tiers[activeIndex].description}
                                </p>

                                <div className="space-y-3 mb-8">
                                    {tiers[activeIndex].details.map((detail, idx) => (
                                        <p key={idx} className="text-sm md:text-base text-black/85 leading-[1.2] tracking-tight">
                                            <span className="font-semibold text-black">{detail.label}:</span> {detail.value}
                                        </p>
                                    ))}
                                </div>

                                <div>
                                    <CtaButton
                                        href={tiers[activeIndex].ctaHref}
                                        text={tiers[activeIndex].ctaText}
                                        textColor="text-black"
                                    />
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Prev / Next */}
                        <div className="flex gap-3 mt-10">
                            <button
                                onClick={handlePrev}
                                aria-label="Previous tier"
                                className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95"
                            >
                                <ArrowLeft size={20} style={{ color: '#63B846' }} />
                            </button>
                            <button
                                onClick={handleNext}
                                aria-label="Next tier"
                                className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95"
                            >
                                <ArrowRight size={20} style={{ color: '#63B846' }} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ThreeTiersSection;
