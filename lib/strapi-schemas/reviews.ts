import type { StrapiMedia } from "@/lib/strapi";

export interface ReviewsHeroData {
  __component: "reviews.hero";
  subtitle: string | null;
  mainTitle: string | null;
  description: string | null;
  ctaText: string | null;
  ctaLink: string | null;
  backgroundImage: StrapiMedia | null;
}

export interface ReviewsIntroSectionData {
  __component: "reviews.intro-section";
  subtitle: string | null;
  title: string | null;
  description: string | null;
}

export interface ReviewsTestimonialCard {
  id: number;
  type: "testimonial" | "image";
  location: string | null;
  name: string | null;
  quote: string | null;
  image: StrapiMedia | null;
  imageAlt: string | null;
}

export interface ReviewsTestimonialsSectionData {
  __component: "reviews.testimonials-section";
  subtitle: string | null;
  title: string | null;
  cards: ReviewsTestimonialCard[];
}

export interface ReviewsCtaBannerData {
  __component: "shared.cta-banner";
  subtitle: string | null;
  mainTitle: string | null;
  description: string | null;
  buttonText: string | null;
  buttonHref: string | null;
  backgroundImage: StrapiMedia | null;
}
