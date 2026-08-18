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
                width="19"
                height="18"
                viewBox="0 0 19 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-black"
            >
                <path d="M18.462 6.62861C18.3118 6.1665 17.9134 5.83174 17.4333 5.76162L12.5716 5.05498L10.3972 0.653027C9.96807 -0.217676 8.54365 -0.217676 8.11455 0.653027L5.94014 5.05518L1.08975 5.76182C0.609867 5.83174 0.211428 6.16787 0.0624045 6.62881C-0.0877908 7.09092 0.0381869 7.59639 0.385843 7.93369L3.90205 11.3519L3.07334 16.1896C2.99189 16.6669 3.18799 17.1507 3.57998 17.4358C3.97334 17.7198 4.49405 17.7567 4.92178 17.5313L9.25537 15.2462L13.6017 17.5313C13.7876 17.6294 13.9913 17.6778 14.1937 17.6778C14.4571 17.6778 14.7206 17.5964 14.9448 17.436C15.337 17.1495 15.5329 16.6671 15.4515 16.1897L14.6228 11.352L18.139 7.93389C18.4862 7.59873 18.6122 7.08955 18.462 6.62861Z" fill="black" />
            </svg>
        ))}
    </div>
);


const ReviewCard: React.FC<{ review: ReviewItem; googleLogo: StaticImageData | string }> = ({ review, googleLogo }) => (
    <div className="flex-shrink-0 w-[340px] md:w-[450px] bg-[#F0F6EC] rounded-2xl p-6 md:p-6 flex flex-col justify-between">
        {/* Header */}
        <div>
            <h4 className="text-lg md:text-[2rem] tracking-tight text-black mb-3 leading-[1]">
                {review.systemTitle}
            </h4>
            <p className="text-sm md:text-lg text-black tracking-tight leading-[1] mb-4">
                &ldquo;{review.quote}&rdquo;
            </p>
            <p className="text-sm md:text-xl font-bold text-black">
                {review.author} · {review.location}
            </p>
        </div>


        <div className="flex items-center gap-3 mt-6 pt-4 ">
            {review.source === "google" && (
                <Image
                    src={googleLogo}
                    alt="Google"
                    className="h-8 w-auto"
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
                    <span className="text-[#63B846] text-[3.125rem] md:text-5xl lg:text-[5rem] leading-none tracking-tight mt-1">{data.title}</span>
                </h1>
            </div>


            <div className="px-[3%] mb-12 md:mb-20">
                <div className="grid grid-cols-2 md:flex md:flex-wrap items-center justify-center gap-6 md:gap-10">
                    {data.badges.map((badge) => (
                        <div
                            key={badge.id}
                            className="relative h-16 md:h-30 w-auto flex items-center justify-center"
                        >
                            <Image
                                src={badge.src}
                                alt={badge.alt}
                                className="h-full w-auto object-contain md:object-cover"
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