"use client";

import React, { useState, useRef, useCallback, useEffect } from 'react';
import Image, { StaticImageData } from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

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
    const [scrollDirection, setScrollDirection] = useState<'left' | 'right'>('right');
    const prevIndexRef = useRef(0);
    const sectionRef = useRef<HTMLDivElement>(null);
    const touchStartX = useRef(0);
    const touchStartY = useRef(0);

    // Scroll progress drives the active index via GSAP ScrollTrigger
    useGSAP(() => {
        ScrollTrigger.create({
            trigger: sectionRef.current,
            start: "top top",
            end: `+=${features.length * 100}%`,
            pin: true,
            scrub: true,
            onUpdate: (self) => {
                const progress = self.progress;
                const newIndex = Math.min(
                    features.length - 1,
                    Math.floor(progress * features.length)
                );
                setActiveIndex((prev) => {
                    if (prev !== newIndex) {
                        setScrollDirection(newIndex > prev ? 'right' : 'left');
                        prevIndexRef.current = prev;
                        return newIndex;
                    }
                    return prev;
                });
            }
        });
    }, { scope: sectionRef, dependencies: [features.length] });

    // Touch handlers for mobile swipe fallback
    const handleTouchStart = useCallback((e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
        touchStartY.current = e.touches[0].clientY;
    }, []);

    const handleTouchEnd = useCallback((e: React.TouchEvent) => {
        const deltaX = touchStartX.current - e.changedTouches[0].clientX;
        const deltaY = touchStartY.current - e.changedTouches[0].clientY;
        const minSwipe = 50;

        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipe) {
            const direction = deltaX > 0 ? 'next' : 'prev';
            setScrollDirection(direction === 'next' ? 'right' : 'left');
            setActiveIndex((prev) =>
                direction === 'next'
                    ? prev === features.length - 1 ? 0 : prev + 1
                    : prev === 0 ? features.length - 1 : prev - 1
            );
        }
    }, [features.length]);

    const activeFeature = features[activeIndex] || features[0];



    return (
        <section
            ref={sectionRef}
            className={`h-screen overflow-hidden ${className}`}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            <div className="h-full">
                <div className="grid grid-cols-1 lg:grid-cols-12 items-center h-full">

                    {/* Left Column (Content & Navigation) */}
                    <div className="lg:col-span-6 flex flex-col justify-around px-[3%] h-full order-2 lg:order-1">

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
                                    initial={{ opacity: 0, x: scrollDirection === 'right' ? 30 : -30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: scrollDirection === 'right' ? -30 : 30 }}
                                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                                    className="flex-grow"
                                >
                                    <div className="flex items-center gap-4 md:gap-4 mb-4">
                                        <span className="text-[4rem] md:text-[5rem] lg:text-[6rem] font-normal text-black/90 leading-none tracking-tighter select-none">
                                            0{activeIndex + 1}
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

                            {/* Dot indicators */}
                            <div className="flex items-center gap-3 mt-6">
                                {features.map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => {
                                            setScrollDirection(idx > activeIndex ? 'right' : 'left');
                                            setActiveIndex(idx);
                                        }}
                                        className="relative cursor-pointer focus:outline-none"
                                        aria-label={`Go to feature ${idx + 1}`}
                                    >
                                        <span
                                            className={`block rounded-full transition-all duration-300 ${idx === activeIndex
                                                    ? 'w-8 h-2'
                                                    : 'w-2 h-2 bg-black/20 hover:bg-black/40'
                                                }`}
                                            style={idx === activeIndex ? { backgroundColor: accentColor } : undefined}
                                        />
                                    </button>
                                ))}
                                <span className="ml-3 text-xs text-black/40 select-none hidden md:inline">
                                    Scroll to explore
                                </span>
                            </div>
                        </div>

                    </div>

                    {/* Right Column (Media + Pins) */}
                    <div className="lg:col-span-6 order-1 lg:order-2">
                        <div className="flex flex-col md:hidden py-5 px-[3%]">
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
                            {activeFeature.mediaType === 'video' && activeFeature.mediaSrc ? (
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
                                            src={activeFeature.mediaSrc || '/fallback.png'}
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