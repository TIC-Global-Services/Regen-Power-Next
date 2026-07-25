import { z } from "zod";
import { MediaSchema } from "./common";

export const ReviewsHeroSchema = z.object({
  __component: z.literal("reviews.hero"),
  subtitle: z.string().nullable(),
  mainTitle: z.string().nullable(),
  description: z.string().nullable(),
  ctaText: z.string().nullable(),
  ctaLink: z.string().nullable(),
  backgroundImage: MediaSchema.nullable(),
});
export type ReviewsHeroData = z.infer<typeof ReviewsHeroSchema>;

export const ReviewsIntroSectionSchema = z.object({
  __component: z.literal("reviews.intro-section"),
  subtitle: z.string().nullable(),
  title: z.string().nullable(),
  description: z.string().nullable(),
});
export type ReviewsIntroSectionData = z.infer<typeof ReviewsIntroSectionSchema>;

export const ReviewsTestimonialCardSchema = z.object({
  id: z.number(),
  type: z.enum(["testimonial", "image"]),
  location: z.string().nullable(),
  name: z.string().nullable(),
  quote: z.string().nullable(),
  image: MediaSchema.nullable(),
  imageAlt: z.string().nullable(),
});

export const ReviewsTestimonialsSectionSchema = z.object({
  __component: z.literal("reviews.testimonials-section"),
  subtitle: z.string().nullable(),
  title: z.string().nullable(),
  cards: z.array(ReviewsTestimonialCardSchema),
});
export type ReviewsTestimonialsSectionData = z.infer<typeof ReviewsTestimonialsSectionSchema>;

export const ReviewsCtaBannerSchema = z.object({
  __component: z.literal("shared.cta-banner"),
  subtitle: z.string().nullable(),
  mainTitle: z.string().nullable(),
  description: z.string().nullable(),
  buttonText: z.string().nullable(),
  buttonHref: z.string().nullable(),
  backgroundImage: MediaSchema.nullable(),
});
export type ReviewsCtaBannerData = z.infer<typeof ReviewsCtaBannerSchema>;
