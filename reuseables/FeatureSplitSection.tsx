'use client';

import React, { useRef, useEffect, useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

import SectionHeader from '@/reuseables/SectionHeader';

export interface FeatureItem {
    title: string;
    description: string;
    image: StaticImageData | { src: string; alt?: string } | string | null;
}

export interface FeatureSplitSectionProps {
    title?:string
    leftTitle?:string
    rightTitle?:string
    leftItems?:string[]
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
    subtitle = "Our Ten-Brand Shortlist,",
    heading = "And How It Got Away.",
    introText = "Every Brand On This Page Has To Meet Five Criteria Before We Put It On A Perth Roof. We'd Rather Turn Down A Volume Deal Than Install Something We Wouldn't Want Supporting For The Next 25 Years.",
    features = [],
    accentColor = '#63B846',
    bgColor = '#ffffff',
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

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
                <div className="col-span-6 flex flex-col justify-center pl-[10%] lg:pl-[8%] pr-[5%] h-screen">
                    <div className="mb-8">
                        <SectionHeader
                            subtitle={subtitle}
                            title={
                                <span style={{ color: accentColor }}>{heading}</span>
                            }
                            description={introText}
                            align="left"
                            subtitleClass="text-base md:text-xl lg:text-2xl normal-case block text-black"
                            titleClass="text-3xl md:text-4xl lg:text-[2.75rem] xl:text-[3.25rem] font-normal leading-[1.1] tracking-tight"
                            descClass="text-gray-600 leading-relaxed font-light"
                        />
                    </div>

                    <div className="flex flex-col gap-8 lg:gap-10">
                        {features.map((feature, index) => (
                            <div key={index} className="feature-text-item transition-all duration-300">
                                <h3 className="text-xl md:text-[2rem] tracking-tight text-black">
                                    {feature.title}
                                </h3>
                                <p className="text-sm md:text-xl leading-tight">
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
                            <Image
                                src={feature.image && typeof feature.image === 'object' && 'src' in feature.image ? feature.image.src : typeof feature.image === 'string' ? feature.image : ''}
                                alt={feature.image && typeof feature.image === 'object' && 'alt' in feature.image ? (feature.image.alt || feature.title) : feature.title}
                                fill
                                className="object-cover"
                                sizes="50vw"
                                priority={index === 0}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Mobile & Tablet */}
            <div className="lg:hidden flex flex-col px-[5%] py-16 md:py-24 gap-8">
                <SectionHeader
                    subtitle={subtitle}
                    title={<span style={{ color: accentColor }}>{heading}</span>}
                    description={introText}
                    align="left"
                    subtitleClass="text-base md:text-xl lg:text-2xl normal-case mb-4 block text-black"
                    titleClass="text-3xl md:text-4xl lg:text-[2.75rem] xl:text-[3.25rem] font-normal leading-[1.1] tracking-tight mb-6"
                    descClass="mb-6 text-gray-600 leading-relaxed font-light"
                />

                <div
                    className="w-full relative"
                    style={{
                        '--swiper-pagination-color': accentColor,
                        '--swiper-pagination-bullet-inactive-color': '#d1d5db',
                        '--swiper-pagination-bullet-inactive-opacity': '1',
                    } as React.CSSProperties}
                >
                    <Swiper
                        modules={[Pagination]}
                        spaceBetween={24}
                        slidesPerView={1}
                        pagination={{ clickable: true }}
                        className="w-full pb-12"
                    >
                        {features.map((feature, index) => (
                            <SwiperSlide key={index} className="flex flex-col gap-4 border-l-2 pl-4 border-[#63B846] bg-white">
                                <h3 className="text-xl font-normal text-gray-900 tracking-tight">
                                    {feature.title}
                                </h3>
                                <p className="text-sm md:text-base leading-relaxed text-gray-600">
                                    {feature.description}
                                </p>
                                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-lg mt-2 bg-gray-50">
                                    <Image
                                        src={feature.image && typeof feature.image === 'object' && 'src' in feature.image ? feature.image.src : typeof feature.image === 'string' ? feature.image : ''}
                                        alt={feature.image && typeof feature.image === 'object' && 'alt' in feature.image ? (feature.image.alt || feature.title) : feature.title}
                                        fill
                                        className="object-cover"
                                        sizes="100vw"
                                    />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>
    );
};

export default FeatureSplitSection;
