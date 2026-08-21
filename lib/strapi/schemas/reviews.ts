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

/**
 * Image tile for the testimonials grid (`reviews.card` component).
 * Review QUOTES live in the testimonial collection — the section only
 * curates heading + decorative images, which the frontend places into
 * even grid rows (2-col span).
 */
export const ReviewsImageCardSchema = z.object({
  id: z.number(),
  image: MediaSchema.nullable(),
  imageAlt: z.string().nullable(),
});
export type ReviewsImageCardData = z.infer<typeof ReviewsImageCardSchema>;

export const ReviewsTestimonialsSectionSchema = z.object({
  __component: z.literal("reviews.testimonials-section"),
  subtitle: z.string().nullable(),
  title: z.string().nullable(),
  cards: z.array(ReviewsImageCardSchema),
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

/**
 * testimonial collection entry — `GET /api/testimonials`
 * The source of truth for review quotes on the reviews page grid.
 */
export const TestimonialEntrySchema = z.object({
  id: z.number(),
  documentId: z.string().optional(),
  name: z.string().nullable().default(""),
  location: z.string().nullable().default(""),
  quote: z.string().nullable().default(""),
  rating: z.number().int().min(1).max(5).nullable().optional(),
  source: z.enum(["website", "google", "productreview"]).nullable().optional(),
  reviewDate: z.string().nullable().optional(),
});
export type TestimonialEntryData = z.infer<typeof TestimonialEntrySchema>;
