'use client';

import React, { useRef, useEffect, useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/pagination';

import SectionHeader from '@/reuseables/SectionHeader';

export interface FeatureItem {
    title: string;
    description: string;
    image: StaticImageData | { src: string; alt?: string } | string | null;
}

export interface FeatureSplitSectionProps {
    title?: string
    leftTitle?: string
    rightTitle?: string
    leftItems?: string[]
    subtitle?: string;
    heading?: string;
    introText?: string;
    features?: FeatureItem[];
    accentColor?: string;
    bgColor?: string;
}

const FeatureSplitSection: React.FC<FeatureSplitSectionProps> = ({
    title,
    leftTitle,
    rightTitle,
    leftItems,
    subtitle = "",
    heading = "",
    introText = "",
    features = [],
    accentColor = '#63B846',
    bgColor = '#ffffff',
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [mobileActiveIndex, setMobileActiveIndex] = useState(0);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const sectionEl = containerRef.current;
        if (!sectionEl || features.length === 0) return;

        const mm = gsap.matchMedia();

        mm.add("(min-width: 1024px)", () => {
            const textElements = sectionEl.querySelectorAll('.feature-text-item');
            const imageElements = sectionEl.querySelectorAll('.feature-image-desktop');

            gsap.set(textElements, { opacity: 0.25 });
            gsap.set(textElements[0], { opacity: 1 });
            gsap.set(imageElements, { opacity: 0, scale: 1.03 });
            gsap.set(imageElements[0], { opacity: 1, scale: 1 });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionEl,
                    start: "top top",
                    end: `+=${features.length * 80}%`,
                    pin: true,
                    scrub: 0.5,
                    anticipatePin: 1,
                    onUpdate: (self) => {
                        const rawIndex = Math.floor(self.progress * features.length);
                        const index = Math.max(0, Math.min(rawIndex, features.length - 1));
                        setActiveIndex(index);
                    }
                }
            });

            for (let i = 1; i < features.length; i++) {
                tl.to(textElements[i - 1], { opacity: 0.25, duration: 1 }, `step-${i}`)
                    .to(imageElements[i - 1], { opacity: 0, scale: 1.03, duration: 1 }, `step-${i}`)
                    .to(textElements[i], { opacity: 1, duration: 1 }, `step-${i}`)
                    .to(imageElements[i], { opacity: 1, scale: 1, duration: 1 }, `step-${i}`)
                    .to({}, { duration: 0.5 });
            }

            return () => {
                tl.kill();
            };
        });

        return () => {
            mm.revert();
            ScrollTrigger.getAll().forEach(st => st.kill());
        };
    }, [features.length]);

    if (features.length === 0) return null;

    return (
        <section
            ref={containerRef}
            className="relative overflow-hidden"
            style={{ backgroundColor: bgColor }}
        >
            {/* Desktop */}
            <div className="hidden lg:grid grid-cols-12 min-h-screen">
                <div className="col-span-6 flex flex-col justify-center pl-[5%] pr-[18%] h-screen">
                    <div className="mb-12">
                        <SectionHeader
                            subtitle={subtitle}
                            title={
                                <span style={{ color: accentColor }}>{heading}</span>
                            }
                            description={introText}
                            align="left"
                            subtitleClass="text-base md:text-2xl text-black"
                            titleClass="text-[2.5rem] md:text-[3.125rem] font-normal tracking-tight"
                            descClass="text-base md:text-xl leading-[1.2]"
                        />
                    </div>

                    <div className="flex flex-col gap-8 lg:gap-4">
                        {features.map((feature, index) => (
                            <div key={index} className="feature-text-item transition-all duration-300">
                                <h3 className="text-xl md:text-[2rem] tracking-tight text-black mb-2">
                                    {feature.title}
                                </h3>
                                <p className="text-sm md:text-xl tracking-tight leading-tight">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="col-span-6 relative h-screen overflow-hidden bg-gray-50">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="feature-image-desktop absolute inset-0 transition-all duration-300"
                            style={{ zIndex: activeIndex === index ? 2 : 1 }}
                        >
                            <img
                                src={feature.image && typeof feature.image === 'object' && 'src' in feature.image ? feature.image.src : typeof feature.image === 'string' ? feature.image : ''}
                                alt={feature.image && typeof feature.image === 'object' && 'alt' in feature.image ? (feature.image.alt || feature.title) : feature.title}
                                className="object-cover w-full h-full"
                                sizes="50vw"

                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Mobile & Tablet */}
            <div className="lg:hidden flex flex-col px-[5%] md:px-[3%] py-16 md:py-24 gap-4">
                <SectionHeader
                    subtitle={subtitle}
                    title={<span style={{ color: accentColor }}>{heading}</span>}
                    description={introText}
                    align="left"
                    subtitleClass="text-base md:text-xl lg:text-2xl normal-case block text-black"
                    titleClass="text-3xl md:text-4xl lg:text-[2.75rem] xl:text-[3.25rem] font-normal leading-none tracking-tight mb-6"
                    descClass="mb-6 text-gray-600 leading-[1.2] font-light"
                />
                {features[mobileActiveIndex]?.image && (
                    <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-lg bg-gray-50">
                        <img
                            src={
                                typeof features[mobileActiveIndex].image === 'object' && features[mobileActiveIndex].image !== null && 'src' in features[mobileActiveIndex].image
                                    ? features[mobileActiveIndex].image.src
                                    : typeof features[mobileActiveIndex].image === 'string'
                                        ? features[mobileActiveIndex].image
                                        : ''
                            }
                            alt={
                                typeof features[mobileActiveIndex].image === 'object' && features[mobileActiveIndex].image !== null && 'alt' in features[mobileActiveIndex].image
                                    ? (features[mobileActiveIndex].image.alt || features[mobileActiveIndex].title)
                                    : features[mobileActiveIndex].title
                            }
                            className="object-cover w-full h-full transition-all duration-300"
                        />
                    </div>
                )}

                <div className="flex flex-col gap-4 mt-4">
                    <div className="flex flex-col gap-1 min-h-[100px]">
                        <h3 className="text-lg md:text-xl font-semibold text-black tracking-tight">
                            {features[mobileActiveIndex]?.title}
                        </h3>
                        <p className="text-sm md:text-base leading-[1.3] text-gray-600">
                            {features[mobileActiveIndex]?.description}
                        </p>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex items-center justify-center gap-4 mt-2">
                        <button
                            type="button"
                            onClick={() => setMobileActiveIndex(prev => Math.max(0, prev - 1))}
                            disabled={mobileActiveIndex === 0}
                            style={mobileActiveIndex !== 0 ? { borderColor: accentColor, color: accentColor } : {}}
                            className={`p-3 rounded-full border transition-all duration-300 flex items-center justify-center ${
                                mobileActiveIndex === 0
                                    ? 'border-gray-200 bg-black text-[#63B846] cursor-not-allowed'
                                    : 'hover:bg-opacity-10 active:scale-95 bg-black text-[#63B846]'
                            }`}
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <span className="text-sm font-semibold text-black tracking-tight">
                            {mobileActiveIndex + 1} <span className="text-gray-400">/</span> {features.length}
                        </span>
                        <button
                            type="button"
                            onClick={() => setMobileActiveIndex(prev => Math.min(features.length - 1, prev + 1))}
                            disabled={mobileActiveIndex === features.length - 1}
                            style={mobileActiveIndex !== features.length - 1 ? { borderColor: accentColor, color: accentColor } : {}}
                            className={`p-3 rounded-full border transition-all duration-300 flex items-center justify-center ${
                                mobileActiveIndex === features.length - 1
                                    ? 'border-gray-200 bg-black text-[#63B846] cursor-not-allowed'
                                    : 'hover:bg-opacity-10 active:scale-95 bg-black text-[#63B846]'
                            }`}
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeatureSplitSection;
