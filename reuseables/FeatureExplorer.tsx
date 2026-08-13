"use client";

import React, { useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export interface Hotspot {
    x: number; // percentage from left, 0 to 100
    y: number; // percentage from top, 0 to 100
}

export interface FeatureExplorerItem {
    id: string | number;
    number: string;      // e.g. "01"
    title: string;       // e.g. "Capture Energy From The Sun"
    description: string;
    mediaType: 'image' | 'video';
    mediaSrc?: string | StaticImageData; // e.g. "High-efficiency solar panels...// Optional per-feature image (overrides global mediaSrc)
}

export interface FeatureExplorerProps {
    titleNormal?: string;
    titleAccent?: string;
    tagIcon?: string | React.ReactNode;
    accentColor?: string;
    mediaPoster?: string;
    data: FeatureExplorerItem[];
    className?: string;
}

const FeatureExplorer: React.FC<FeatureExplorerProps> = ({
    titleNormal = "The Science Of",
    titleAccent = "Solar & Storage",
    tagIcon,
    accentColor = "#63B846",
    mediaPoster,
    data: features,
    className = "",
}) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const handlePrev = () => {
        setActiveIndex((prev) => (prev === 0 ? features.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setActiveIndex((prev) => (prev === features.length - 1 ? 0 : prev + 1));
    };

    const activeFeature = features[activeIndex] || features[0];



    return (
        <section className={`overflow-hidden ${className}`}>
            <div className="">
                <div className="grid grid-cols-1 lg:grid-cols-12 items-center">

                    {/* Left Column (Content & Navigation) */}
                    <div className="lg:col-span-6 flex flex-col justify-around px-[5%] h-full order-2 lg:order-1">

                        {/* Header */}
                        <div className="flex flex-col hidden md:block">
                            {/* {renderTagIcon()} */}
                            <div className="mb-8 leading-[0.9]">
                                <h2 className="text-3xl md:text-4xl leading-none lg:text-[2.125rem] font-medium text-black tracking-tight">
                                    {titleNormal}
                                </h2>
                                <p
                                    className="font-light text-[2.5rem] md:text-[3.5rem] lg:text-[5rem] tracking-tighter leading-none"
                                    style={{ color: accentColor }}
                                >
                                    {titleAccent}
                                </p>
                            </div>
                        </div>

                        {/* Dynamic feature display and nav controls */}
                        <div className="min-h-[220px] md:min-h-[260px] flex flex-col justify-between">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeIndex}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 10 }}
                                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                                    className="flex-grow"
                                >
                                    <div className="flex items-center gap-4 md:gap-4 mb-4">
                                        <span className="text-[4rem] md:text-[5rem] lg:text-[6rem] font-normal text-black/90 leading-none tracking-tighter select-none">
                                            0{activeIndex+1}
                                        </span>
                                        <h3 className="text-xl md:text-2xl whitespace-pre-line lg:text-[2.5rem] font-medium text-black leading-none pt-1 max-w-sm">
                                            {activeFeature.title}
                                        </h3>
                                    </div>
                                    <p className="text-sm md:text-lg leading-[1.2] max-w-sm">
                                        {activeFeature.description}
                                    </p>
                                </motion.div>
                            </AnimatePresence>

                            <div className="flex gap-2 mt-6">
                                <button
                                    onClick={handlePrev}
                                    className="w-12 h-12 rounded-full bg-black text-white flex items-center cursor-pointer justify-center transition-all duration-300 hover:scale-105 active:scale-95"
                                    aria-label="Previous feature"
                                >
                                    <ArrowLeft size={20} style={{ color: accentColor }} />
                                </button>
                                <button
                                    onClick={handleNext}
                                    className="w-12 h-12 rounded-full bg-black text-white flex items-center cursor-pointer justify-center transition-all duration-300 hover:scale-105 active:scale-95"
                                    aria-label="Next feature"
                                >
                                    <ArrowRight size={20} style={{ color: accentColor }} />
                                </button>
                            </div>
                        </div>

                    </div>

                    {/* Right Column (Media + Pins) */}
                    <div className="lg:col-span-6 order-1 lg:order-2">
                         <div className="flex flex-col md:hidden py-5 px-[5%]">
                            {/* {renderTagIcon()} */}
                            <div className="leading-[0.9]">
                                <h2 className="text-2xl md:text-4xl leading-none lg:text-[2.125rem] font-medium text-black tracking-tight">
                                    {titleNormal}
                                </h2>
                                <p
                                    className="font-light text-[3.750rem] md:text-[3.5rem] lg:text-[5rem] tracking-tighter leading-none"
                                    style={{ color: accentColor }}
                                >
                                    {titleAccent}
                                </p>
                            </div>
                        </div>
                        <div className="relative w-full aspect-square md:min-h-screen">

                            {/* Media Content */}
                            {activeFeature.mediaType === 'video' ? (
                                <video
                                    src={typeof activeFeature.mediaSrc === 'string' ? activeFeature.mediaSrc : activeFeature.mediaSrc?.src}
                                    poster={mediaPoster}
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                            ) : (
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeIndex}
                                        initial={{ opacity: 0, scale: 1.04 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.97 }}
                                        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                                        className="absolute inset-0 w-full h-full"
                                    >
                                        <Image
                                            src={activeFeature.mediaSrc || ''}
                                            alt={activeFeature.title || titleAccent || "Feature illustration"}
                                            fill
                                            className="object-cover"
                                            priority
                                        />
                                    </motion.div>
                                </AnimatePresence>
                            )}


                            {/* {features.map((feature, index) => {
                if (!feature.hotspot) return null;
                const isActive = index === activeIndex;
                
                return (
                  <button
                    key={feature.id || index}
                    onClick={() => setActiveIndex(index)}
                    className="absolute z-20 -translate-x-1/2 -translate-y-[44%] cursor-pointer group focus:outline-none"
                    style={{
                      left: `${feature.hotspot.x}%`,
                      top: `${feature.hotspot.y}%`,
                    }}
                  >
                    
                    {isActive && (
                      <>
                        <motion.div
                          className="absolute inset-0 rounded-full bg-[#FF5722] opacity-40"
                          initial={{ scale: 0.8, opacity: 0.5 }}
                          animate={{ scale: [1, 2.2], opacity: [0.5, 0] }}
                          transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
                          style={{ originX: "50%", originY: "44%" }}
                        />
                        <motion.div
                          className="absolute inset-0 rounded-full bg-[#FF5722] opacity-20"
                          initial={{ scale: 0.8, opacity: 0.3 }}
                          animate={{ scale: [1, 3], opacity: [0.3, 0] }}
                          transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut", delay: 0.6 }}
                          style={{ originX: "50%", originY: "44%" }}
                        />
                      </>
                    )}

                   
                  </button>
                );
              })} */}
                        </div>
                    </div>

                </div>
            </div>

            {/* Shared gradient linearGradient definitions */}
            <svg style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }} aria-hidden="true">
                <defs>
                    <linearGradient id="pinGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#FF6A39" />
                        <stop offset="100%" stopColor="#E03700" />
                    </linearGradient>
                </defs>
            </svg>
        </section>
    );
};

export default FeatureExplorer;