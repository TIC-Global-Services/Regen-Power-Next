"use client";

import React from "react";
import Image, { StaticImageData } from "next/image";

import Marquee from "@/reuseables/Marquee";
import SectionHeader from "@/reuseables/SectionHeader";

export interface ReviewItem {
    id: string;
    systemTitle: string;
    quote: string;
    author: string;
    location: string;
    rating: number;
    source: "google";
}

export interface BadgeItem {
    id: string;
    src: StaticImageData | string;
    alt: string;
}

export interface RealStoriesData {
    subtitle: string;
    title: React.ReactNode;
    badges: BadgeItem[];
    reviews: ReviewItem[];
    googleLogo: StaticImageData | string;
}

interface RealStoriesProps {
    data: RealStoriesData;
}


const StarRating: React.FC<{ count: number }> = ({ count }) => (
    <div className="flex gap-0.5">
        {Array.from({ length: count }).map((_, i) => (
            <svg
                key={i}
                className="w-4 h-4 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 20 20"
            >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
        ))}
    </div>
);


const ReviewCard: React.FC<{ review: ReviewItem; googleLogo: StaticImageData | string }> = ({ review, googleLogo }) => (
    <div className="flex-shrink-0 w-[340px] md:w-[380px] bg-[#F0F6EC] rounded-2xl p-6 md:p-8 flex flex-col justify-between">
        {/* Header */}
        <div>
            <h4 className="text-lg md:text-xl font-semibold text-black mb-3 leading-snug">
                {review.systemTitle}
            </h4>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-4">
                &ldquo;{review.quote}&rdquo;
            </p>
            <p className="text-sm font-medium text-black">
                {review.author} · {review.location}
            </p>
        </div>


        <div className="flex items-center gap-3 mt-6 pt-4 border-t border-gray-200/60">
            {review.source === "google" && (
                <Image
                    src={googleLogo}
                    alt="Google"
                    className="h-6 w-auto"
                    height={24}
                    width={72}
                />
            )}
            <StarRating count={review.rating} />
        </div>
    </div>
);



const RealStories = ({ data }: RealStoriesProps) => {
    return (
        <section className="py-16 md:py-20 bg-white overflow-hidden">
            {/* 
            <SectionHeader
                subtitle={data.subtitle}
                title={data.title}
                align="center"
                subtitleClass="text-xl md:text-2xl text-gray-500 font-normal italic tracking-tight mb-1 block normal-case"
                titleClass="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mt-1"
                className="mb-10 md:mb-14 mx-auto"
            /> */}
            <div className="flex flex-col justify-center items-center mb-20">
                <h1>
                    <span className="text-xl md:text-[2rem] leading-[0.5] font-normal text-center  tracking-tight mb-1 block normal-case">{data.subtitle}</span>
                    <span className="text-4xl md:text-5xl lg:text-[5rem] leading-none tracking-tight mt-1">{data.title}</span>
                </h1>
            </div>


            <div className="px-[5%] mb-12 md:mb-20">
                <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
                    {data.badges.map((badge) => (
                        <div
                            key={badge.id}
                            className="relative h-16 md:h-30 w-auto flex items-center"
                        >
                            <Image
                                src={badge.src}
                                alt={badge.alt}
                                className="h-full w-auto object-cover"
                                height={200}
                                width={200}
                            />
                        </div>
                    ))}
                </div>
            </div>

            <Marquee direction="left" speed={40} gap={20} pauseOnHover>
                {data.reviews.map((review) => (
                    <ReviewCard key={review.id} review={review} googleLogo={data.googleLogo} />
                ))}
            </Marquee>
        </section>
    );
};

export default RealStories;