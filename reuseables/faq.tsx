'use client';

import React, { useMemo, useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import { Plus, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import defaultImage from '@/assets/for_your_home.png'; // Fallback image
import Fade from './fade';

export interface FAQItem {
    question: string;
    answer: string;
}

interface FAQProps {
    topTitle?: string;
    title?: string;
    listTitle?: string;
    image?: string | StaticImageData;
    items?: FAQItem[];
    defaultOpenIndex?: number | null;
    enableSchema?: boolean;
}

const defaultItems: FAQItem[] = [
    {
        question: "Q1. How Much Will A Solar System Save Me In Perth?",
        answer: "Savings depend on your usage and system size, but the average Perth home with a 6.6 kW system saves $1,800–$2,400 per year on electricity — enough to pay back the system in around 4–5 years. A tailored estimate based on your Synergy bill takes about 10 minutes on a call."
    },
    {
        question: "Q2. What Size Solar System Do I Need?",
        answer: "The ideal size depends on your electricity usage profile and future plans (e.g., adding a battery or EV). Our experts can help size a system tailored to your specific needs."
    },
    {
        question: "Q3. What's The Difference Between A Hybrid And A String Inverter?",
        answer: "A string inverter converts solar power for immediate use or grid export. A hybrid inverter can additionally manage a battery system, allowing you to store power for later."
    },
    {
        question: "Q4. Do I Need A Battery?",
        answer: "Not necessarily. If you use most of your electricity during the day, solar panels alone will save you a lot. A battery helps if you use more power at night."
    },
    {
        question: "Q5. What Warranty Do I Get?",
        answer: "We offer industry-leading warranties on all panels, inverters, and workmanship to ensure your system performs flawlessly for years to come."
    }
];

const FAQ = ({
    topTitle = "FAQ",
    title = "Entries",
    listTitle = "Frequently Asked Questions",
    image = defaultImage,
    items = defaultItems,
    defaultOpenIndex = 0,
    enableSchema = false,
}: FAQProps) => {
    const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex);

    const faqSchema = useMemo(() => {
        if (!enableSchema) {
            return null;
        }

        return {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: items.map((item) => ({
                "@type": "Question",
                name: item.question,
                acceptedAnswer: {
                    "@type": "Answer",
                    text: item.answer,
                },
            })),
        };
    }, [enableSchema, items]);

    const toggleItem = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <Fade>
            <section className="py-16 md:py-20 bg-white px-[5%]">
                {faqSchema ? (
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
                    />
                ) : null}
                {/* Top Titles */}
                <div className="mb-8 lg:mb-10 -space-y-3">
                    <h3 className="text-xl md:text-2xl text-black font-normal tracking-tighter">
                        {topTitle}
                    </h3>
                    <h2 className="text-5xl md:text-[5.5rem] text-[#63B846] font-light leading-none tracking-tighter">
                        {title}
                    </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-start">
                    {/* Left Column - Image */}
                    <div className="w-full">
                        <div className="relative w-full aspect-3/3 max-h-[540px] rounded-[24px] overflow-hidden shadow-sm">
                            <Image
                                src={image}
                                alt="FAQ Context"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>

                    {/* Right Column - Accordion */}
                    <div className="flex flex-col w-full">
                        <h3 className="text-2xl md:text-[1.75rem] text-left text-black font-medium mb-6 md:mb-4 tracking-tight">
                            {listTitle}
                        </h3>

                        <div className="flex flex-col">
                            {items.map((item, index) => {
                                const isOpen = openIndex === index;
                                return (
                                    <div key={index} className="border-b-2 border-[#EEF6EB] last:border-b-0">
                                        <button
                                            onClick={() => toggleItem(index)}
                                            className="w-full py-5 flex justify-between items-center text-left focus:outline-none group"
                                        >
                                            <span className="text-[15px] md:text-xl text-black font-medium pr-8">
                                                {item.question}
                                            </span>
                                            <span className="text-[#63B846] flex-shrink-0 transition-transform duration-300">
                                                {isOpen ? (
                                                    <X size={20} strokeWidth={2} />
                                                ) : (
                                                    <Plus size={20} strokeWidth={2} />
                                                )}
                                            </span>
                                        </button>

                                        <AnimatePresence initial={false}>
                                            {isOpen && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                                    className="overflow-hidden"
                                                >
                                                    <p className="pb-6 text-xs md:text-sm text-black/70 leading-relaxed pr-8">
                                                        {item.answer}
                                                    </p>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>
        </Fade>
    );
};

export default FAQ;
