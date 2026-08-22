'use client';

import React, { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AcquaSmartCard {
    title: string;
    description: string;
}

interface AcquaSmartSectionProps {
    subtitle: string;
    title: string;
    description: string;
    image: string;
    imageAlt?: string;
    cards: AcquaSmartCard[];
}
const getPerPage = () => {
    if (typeof window === 'undefined') return 3;
    if (window.innerWidth < 640) return 1;   // mobile: one card = one slide
    if (window.innerWidth < 1024) return 2;  // tablet
    return 3;                                // desktop
};
const   AcquaSmartSection: React.FC<AcquaSmartSectionProps> = ({
    subtitle,
    title,
    description,
    image,
    imageAlt = 'AcquaSmart water treatment trailer',
    cards,
}) => {
    const [page, setPage] = useState(0);
    const [perPage, setPerPage] = useState(3);

    useEffect(() => {
        setPerPage(getPerPage());

        const handleResize = () => {
            setPerPage(getPerPage());
            setPage(0);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    const totalPages = Math.ceil(cards.length / perPage);

    const handlePrev = () => {
        setPage((p) => (p === 0 ? totalPages - 1 : p - 1));
    };
    const handleNext = () => {
        setPage((p) => (p === totalPages - 1 ? 0 : p + 1));
    };

    const visibleCards = cards.slice(page * perPage, page * perPage + perPage);

    return (
        <section className="py-16 md:py-24 bg-white">
            <div className="px-[5%] md:px-[3%] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center mb-12 md:mb-10">
                    <div className="relative w-full aspect-square lg:aspect-[6/5] rounded-[24px] overflow-hidden">
                        <img
                            src={image || '/fallback.png'}
                            alt={imageAlt}
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    </div>
                    <div>
                        <p className="text-lg md:text-2xl text-black font-light leading-none tracking-tight mb-1">
                            {subtitle}
                        </p>
                        <h2 className="text-4xl md:text-6xl lg:text-[4.5rem] text-[#63B846] font-normal tracking-tighter leading-none mb-6">
                            {title}
                        </h2>
                        <p className="text-sm md:text-base text-black leading-[1.2] tracking-tight">
                            {description}
                        </p>
                    </div>
                </div>

                <div className="">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-3 lg:gap-3">
                        <AnimatePresence mode="wait">
                            {visibleCards.map((card, idx) => (
                                <motion.div
                                    key={`${page}-${idx}`}
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -8 }}
                                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                                    className="bg-[#E5EFD5] rounded-[20px] p-6 md:p-7 min-h-[200px] flex flex-col"
                                >
                                    <h3 className="text-xl md:text-[1.35rem] text-black font-bold tracking-tight leading-snug mb-3">
                                        {card.title}
                                    </h3>
                                    <p className="text-sm md:text-[15px] text-black/80 leading-snug tracking-tight font-light">
                                        {card.description}
                                    </p>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {totalPages > 1 && (
                        <div className="flex justify-end items-center gap-2 mt-8">
                            <button
                                onClick={handlePrev}
                                aria-label="Previous"
                                className="w-10 h-10 rounded-full bg-[#A0CF44] text-black flex items-center justify-center hover:scale-105 transition-transform"
                            >
                                <ArrowLeft size={18} />
                            </button>
                            <button
                                onClick={handleNext}
                                aria-label="Next"
                                className="w-10 h-10 rounded-full bg-[#A0CF44] text-black flex items-center justify-center hover:scale-105 transition-transform"
                            >
                                <ArrowRight size={18} />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default AcquaSmartSection;
