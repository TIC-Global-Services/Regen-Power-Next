import React from 'react';

interface ReviewsIntroProps {
    subtitle?: string;
    title?: string;
    description?: string;
}

const ReviewsIntro: React.FC<ReviewsIntroProps> = ({
    subtitle = 'Trusted By Thousands Across',
    title = 'Australia',
    description = "Over The Years, We've Helped Thousands Of Australian Homes And Businesses Transition To Renewable Energy With Confidence. Our Commitment To Quality Workmanship, Premium Products, Transparent Advice, And Ongoing Customer Support Has Earned Consistently Positive Feedback From Customers Nationwide.",
}) => {
    return (
        <section className="w-full px-[3%] py-12 md:py-20">
            <div className="flex gap-8 md:gap-50">
                <div>
                    <p className="text-2xl md:text-[1.375rem] w-full font-light tracking-tighter text-black">
                        {subtitle}
                    </p>
                    <h2 className="text-5xl md:text-6xl lg:text-[5rem] font-normal tracking-tight text-[#63B846]">
                        {title}
                    </h2>
                </div>
                <div className="self-end">
                    <p className="text-base md:text-lg lg:text-[1.875rem] leading-snug tracking-tight text-black/85 ">
                        {description}
                    </p>
                </div>
            </div>
        </section>
    );
};

export default ReviewsIntro;
