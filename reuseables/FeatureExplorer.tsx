"use client";

import React, { useState, useRef, useCallback, useEffect } from 'react';
import Image, { StaticImageData } from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { SliderArrows } from './MobileSliderControls';

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

    // Desktop only: scroll progress drives the active index via a pinned ScrollTrigger.
    // Below lg the section is normal flow and the arrow controls change the card.
    useGSAP(() => {
        const mm = gsap.matchMedia();
        mm.add("(min-width: 1024px)", () => {
            ScrollTrigger.create({
                trigger: sectionRef.current,
                start: "top top",
                end: `+=${features.length * 100}%`,
                pin: true,
                anticipatePin: 1,
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
        });
        return () => mm.revert();
    }, { scope: sectionRef, dependencies: [features.length] });

    const goToIndex = useCallback((idx: number) => {
        setScrollDirection(idx > prevIndexRef.current ? 'right' : 'left');
        prevIndexRef.current = idx;
        setActiveIndex(idx);
    }, []);

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
            className={`py-8 lg:py-0 lg:h-screen lg:overflow-hidden ${className}`}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            <div className="lg:h-full">
                <div className="grid grid-cols-1 lg:grid-cols-12 items-center lg:h-full pt-[14%] md:pt-0">

                    {/* Left Column (Content & Navigation) */}
                    <div className="lg:col-span-6 flex flex-col justify-around px-[5%] lg:px-[3%] pt-5 lg:pt-0 lg:h-full order-2 lg:order-1">

                        {/* Header */}
                        <div className="flex flex-col hidden lg:block">
                            {/* {renderTagIcon()} */}
                            <div className="mb-8 leading-[0.9]">
                                <h2 className="text-xl leading-none lg:text-[2.125rem] font-medium text-black tracking-tight">
                                    {titleNormal}
                                </h2>
                                <p
                                    className="font-light text-[2.5rem] lg:text-[5rem] tracking-tighter leading-none"
                                    style={{ color: accentColor }}
                                >
                                    {titleAccent}
                                </p>
                            </div>
                        </div>

                        {/* Dynamic feature display and nav controls */}
                        <div className=" md:min-h-[260px] flex flex-col justify-between max-lg:justify-start max-lg:gap-5">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeIndex}
                                    initial={{ opacity: 0, x: scrollDirection === 'right' ? 30 : -30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: scrollDirection === 'right' ? -30 : 30 }}
                                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                                    className="flex-grow max-lg:grow-0  lg:h-auto"
                                >
                                    <div className="flex items-center gap-4 mb-4">
                                        <span className="text-[3.25rem] md:text-[4.5rem] lg:text-[6rem] font-normal text-black/90 leading-none tracking-tighter select-none">
                                            0{activeIndex + 1}
                                        </span>
                                        <h3 className="text-lg md:text-2xl whitespace-pre-line lg:text-[2.5rem] font-medium text-black leading-none pt-1 max-w-sm">
                                            {activeFeature.title}
                                        </h3>
                                    </div>
                                    <p className="text-base md:text-lg leading-[1.2] tracking-tight max-w-sm">
                                        {activeFeature.description}
                                    </p>
                                </motion.div>
                            </AnimatePresence>

                            {/* Dot indicators (+ arrow controls on mobile) */}
                            <div className="flex items-center justify-between gap-3 lg:justify-start">
                                <div className="flex items-center gap-3">
                                    {features.map((_, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => goToIndex(idx)}
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
                                    <span className="ml-3 text-xs text-black/40 select-none hidden lg:inline">
                                        Scroll to explore
                                    </span>
                                </div>
                                <SliderArrows
                                    canPrev={activeIndex > 0}
                                    canNext={activeIndex < features.length - 1}
                                    onPrev={() => goToIndex(activeIndex - 1)}
                                    onNext={() => goToIndex(activeIndex + 1)}
                                    className="lg:hidden"
                                />
                            </div>
                        </div>

                    </div>

                    {/* Right Column (Media + Pins) */}
                    <div className="lg:col-span-6 order-1 lg:order-2">
                        <div className="flex flex-col lg:hidden pb-4 px-[5%]">
                            {/* {renderTagIcon()} */}
                            <div className="leading-[0.9]">
                                <h2 className="text-xl leading-none lg:text-[2.125rem] font-medium text-black tracking-tight">
                                    {titleNormal}
                                </h2>
                                <p
                                    className="font-light text-[2.25rem] min-[360px]:text-[2.5rem] min-[400px]:text-[2.75rem] tracking-tighter leading-none mt-1"
                                    style={{ color: accentColor }}
                                >
                                    {titleAccent}
                                </p>
                            </div>
                        </div>
                        <div className="relative w-[90%] aspect-square mx-auto rounded-2xl overflow-hidden lg:w-full lg:min-h-screen lg:mx-0 lg:mt-0 lg:rounded-none">

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
                                            preload
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