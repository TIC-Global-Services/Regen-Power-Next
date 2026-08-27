import React from 'react';
import { getReviewsPage, getTestimonials } from '@/lib/strapi';
import { findSection } from '@/lib/strapi/section-utils';
import {
  resolveReviewsHero,
  resolveReviewsIntroSection,
  resolveReviewsTestimonialsSection,
  resolveReviewsCtaBanner,
  resolveTestimonials,
} from '@/lib/strapi/resolvers';
import type {
    ReviewsCtaBannerData,
    ReviewsHeroData,
    ReviewsIntroSectionData,
    ReviewsTestimonialsSectionData,
} from '@/lib/strapi/schemas';
import ReviewsHero from '@/components/reviews/ReviewsHero';
import ReviewsIntro from '@/components/reviews/ReviewsIntro';
import TestimonialGrid from '@/components/reviews/TestimonialGrid';
import CtaSection from '@/reuseables/CtaSection';
import QuoteSection from "@/reuseables/QuoteSection";

export const revalidate = 60;

export default async function ReviewsPage() {
    const [{ data }, { data: testimonialEntries }] = await Promise.all([
        getReviewsPage(),
        getTestimonials(),
    ]);
    const sections = data.sections ?? [];

    const hero = findSection<ReviewsHeroData>(sections, 'reviews.hero');
    const intro = findSection<ReviewsIntroSectionData>(sections, 'reviews.intro-section');
    const testimonials = findSection<ReviewsTestimonialsSectionData>(sections, 'reviews.testimonials-section');
    const ctaBanner = findSection<ReviewsCtaBannerData>(sections, 'shared.cta-banner');

    const heroProps = resolveReviewsHero(hero);
    const introProps = resolveReviewsIntroSection(intro);
    const testimonialsProps = resolveReviewsTestimonialsSection(testimonials);
    const ctaBannerProps = resolveReviewsCtaBanner(ctaBanner);

    /* Header + image tiles come from the section component; review quotes
       come from the testimonial collection. The grid places image tiles
       into even rows (2-col span) automatically. */
    const collectionReviews = resolveTestimonials(testimonialEntries).filter(
        (item): item is Extract<typeof item, { type: 'testimonial' }> => item.type === 'testimonial'
    );

    return (
        <div className="bg-white min-h-screen text-black">
            {heroProps && (
                <ReviewsHero
                    subtitle={heroProps.subtitle}
                    mainTitle={heroProps.mainTitle}
                    description={heroProps.description}
                    ctaText={heroProps.ctaText}
                    ctaLink={heroProps.ctaLink}
                    backgroundImage={heroProps.backgroundImage}
                />
            )}

            {introProps && (
                <ReviewsIntro
                    subtitle={introProps.subtitle}
                    title={introProps.title}
                    description={introProps.description}
                />
            )}

            {testimonialsProps && (
                <TestimonialGrid
                    subtitle={testimonialsProps.subtitle}
                    title={testimonialsProps.title}
                    reviews={collectionReviews}
                    images={testimonialsProps.imageCards}
                />
            )}

      <QuoteSection formType="contact" video="/form-icon-video.mp4" />

            {ctaBannerProps && (
                <CtaSection
                    subtitle={ctaBannerProps.subtitle}
                    title={ctaBannerProps.title}
                    description={ctaBannerProps.description}
                    buttonText={ctaBannerProps.buttonText}
                    buttonHref={ctaBannerProps.buttonHref}
                    bgImage={ctaBannerProps.bgImage}
                />
            )}
        </div>
    );
}