import React from 'react';
import { getReviewsPage, strapiImage } from '@/lib/strapi';
import type {
    ReviewsCtaBannerData,
    ReviewsHeroData,
    ReviewsIntroSectionData,
    ReviewsTestimonialsSectionData,
} from '@/lib/strapi-schemas/reviews';
import ReviewsHero from '@/components/reviews/ReviewsHero';
import ReviewsIntro from '@/components/reviews/ReviewsIntro';
import TestimonialGrid, { type GridItem } from '@/components/reviews/TestimonialGrid';
import CtaSection from '@/reuseables/CtaSection';

export const revalidate = 60;

export default async function ReviewsPage() {
    const { data } = await getReviewsPage();
    const sections = data.sections ?? [];

    const hero = sections.find(
        (section) => section.__component === 'reviews.hero'
    ) as ReviewsHeroData | undefined;
    const intro = sections.find(
        (section) => section.__component === 'reviews.intro-section'
    ) as ReviewsIntroSectionData | undefined;
    const testimonials = sections.find(
        (section) => section.__component === 'reviews.testimonials-section'
    ) as ReviewsTestimonialsSectionData | undefined;
    const ctaBanner = sections.find(
        (section) => section.__component === 'shared.cta-banner'
    ) as ReviewsCtaBannerData | undefined;

    const testimonialItems = (testimonials?.cards ?? []).reduce<GridItem[]>((items, card) => {
        if (card.type === 'image') {
            const image = strapiImage(card.image);
            if (image) {
                items.push({
                    type: 'image',
                    image,
                    alt: card.imageAlt || 'Regen Power installation',
                });
            }
            return items;
        }

        if (!card.location || !card.name || !card.quote) return items;
        items.push({
            type: 'testimonial' as const,
            data: {
                location: card.location,
                name: card.name,
                quote: card.quote,
            },
        });
        return items;
    }, []);

    return (
        <div className="bg-white min-h-screen text-black">
            {hero && (
                <ReviewsHero
                    subtitle={hero.subtitle || ''}
                    mainTitle={hero.mainTitle || ''}
                    description={hero.description || ''}
                    ctaText={hero.ctaText || 'Get Your Free Quote'}
                    ctaLink={hero.ctaLink || '#quote-form'}
                    backgroundImage={strapiImage(hero.backgroundImage)}
                />
            )}

            {intro && (
                <ReviewsIntro
                    subtitle={intro.subtitle || undefined}
                    title={intro.title || undefined}
                    description={intro.description || undefined}
                />
            )}

            {testimonials && (
                <TestimonialGrid
                    subtitle={testimonials.subtitle || undefined}
                    title={testimonials.title || undefined}
                    items={testimonialItems}
                />
            )}

            {ctaBanner && (
                <CtaSection
                    subtitle={ctaBanner.subtitle || ''}
                    title={ctaBanner.mainTitle || ''}
                    description={ctaBanner.description || ''}
                    buttonText={ctaBanner.buttonText || 'Get My Free Quote'}
                    buttonHref={ctaBanner.buttonHref || '#quote-form'}
                    bgImage={strapiImage(ctaBanner.backgroundImage) || undefined}
                />
            )}
        </div>
    );
}
