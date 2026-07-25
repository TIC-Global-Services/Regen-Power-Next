import React from 'react';
import { TestimonialCard, TestimonialImageCard } from './TestimonialCard';
import mandurahImg from '@/assets/reviews/mandurah.png';
import rockinghamImg from '@/assets/reviews/rockingham.png';
import { StaticImageData } from 'next/image';

export interface Testimonial {
    location: string;
    name: string;
    quote: string;
}

export interface ImageRow {
    type: 'image';
    image: StaticImageData | string;
    alt: string;
}

export interface TestimonialRow {
    type: 'testimonial';
    data: Testimonial;
}

export type GridItem = TestimonialRow | ImageRow;

interface TestimonialGridProps {
    subtitle?: string;
    title?: string;
    items?: GridItem[];
}

const defaultGrid: GridItem[] = [
    { type: 'testimonial', data: { location: 'Perth, WA', name: 'Sarah M.', quote: 'The Entire Process Was Smooth From Consultation To Installation. The Team Explained Everything Clearly, Completed The Installation On Schedule, And Our Electricity Bills Dropped Noticeably Within The First Few Months.' } },
    { type: 'testimonial', data: { location: 'Mandurah, WA', name: 'James & Emily T.', quote: 'Professional Service, Quality Products, And Excellent Communication Throughout The Project. We Couldn’t Be Happier With The Outcome And Would Happily Recommend Regen Power To Family And Friends.' } },
    { type: 'testimonial', data: { location: 'Bunbury, WA', name: 'Michael R.', quote: 'The Battery System Has Exceeded Our Expectations. We Now Rely Much Less On The Grid During Peak Hours, And The Monitoring App Makes It Easy To Track Our Energy Usage. Excellent Products Backed By Exceptional Service.' } },

    { type: 'testimonial', data: { location: 'Mandurah, WA', name: 'Olivia K.', quote: 'Every Member Of The Team Was Friendly, Knowledgeable, And Responsive. They Guided Us Through Available Rebates, Answered All Our Questions, And Completed The Installation Exactly As Promised. It Was A Stress-Free Experience From Start To Finish.' } },
    { type: 'image', image: mandurahImg, alt: 'Aerial view of solar panels in Mandurah' },
    { type: 'testimonial', data: { location: 'Adelaide, SA', name: 'Daniel P.', quote: 'The Installation Crew Arrived On Schedule, Worked Efficiently, And Explained How The Entire System Operates Before Leaving. It’s Reassuring To Know We’ve Invested In A High-Quality Solution Supported By A Reliable Company.' } },

    { type: 'testimonial', data: { location: 'Perth, WA', name: 'Rebecca L.', quote: 'We Wanted A Solar Solution That Would Reduce Our Long-Term Energy Costs Without Compromising On Quality. Regen Power Delivered Exactly That. Their Attention To Detail And After-Sales Support Have Been Outstanding.' } },
    { type: 'testimonial', data: { location: 'Geraldton, WA', name: 'Andrew H.', quote: 'Our Commercial Solar Installation Was Completed With Minimal Disruption To Daily Operations. The Project Was Well Managed, Communication Was Excellent, And We’re Already Seeing Meaningful Savings On Our Monthly Energy Expenses.' } },
    { type: 'testimonial', data: { location: 'Rockingham, WA', name: 'Priya S.', quote: 'Choosing Regen Power Was One Of The Best Decisions We’ve Made For Our Home. The Team Was Professional, Transparent, And Genuinely Focused On Finding The Right Solution For Our Needs. The Entire Process Was Smooth, And The Results Have Been Fantastic.' } },

    { type: 'image', image: rockinghamImg, alt: 'Regen Power installer working on solar panels at Rockingham' },
    { type: 'testimonial', data: { location: 'Joondalup, WA', name: 'Nathan C.', quote: 'From The Initial Site Assessment To The Final System Handover, Everything Was Handled Professionally. The Team Explained Each Step Clearly, Completed The Work Ahead Of Schedule, And Ensured We Were Comfortable Using The Monitoring App Before They Left.' } },
    { type: 'testimonial', data: { location: 'Fremantle, WA', name: 'Chloe W.', quote: 'We Were Impressed By The Quality Of Both The Products And The Customer Service. Regen Power Helped Us Understand The Available Rebates And Recommended A System That Suited Our Budget And Energy Needs. We Couldn’t Be Happier With The Outcome.' } },

    { type: 'testimonial', data: { location: 'Albany, WA', name: 'David & Karen B.', quote: 'The Entire Experience Exceeded Our Expectations. Communication Was Excellent, The Installation Was Completed Without Any Hassle, And The After-Sales Support Has Been Just As Impressive. It’s Reassuring To Know We Chose A Company That Genuinely Stands Behind Its Work.' } },
];

const TestimonialGrid: React.FC<TestimonialGridProps> = ({
    subtitle = 'Real',
    title = 'Customer Stories',
    items = defaultGrid,
}) => {
    return (
        <section className="w-full px-[5%] pb-16 md:pb-24">
            {(subtitle || title) && (
                <div className="text-center mb-10 md:mb-14">
                    {subtitle && (
                        <p className="text-2xl md:text-3xl font-light tracking-tight text-black mb-1">
                            {subtitle}
                        </p>
                    )}
                    {title && (
                        <h2 className="text-5xl md:text-6xl lg:text-7xl font-normal tracking-tight text-[#63B846]">
                            {title}
                        </h2>
                    )}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 max-w-7xl mx-auto">
                {items.map((item, i) => {
                    if (item.type === 'image') {
                        return (
                            <TestimonialImageCard
                                key={i}
                                image={item.image}
                                imageAlt={item.alt}
                            />
                        );
                    }
                    return <TestimonialCard key={i} {...item.data} />;
                })}
            </div>
        </section>
    );
};

export default TestimonialGrid;
