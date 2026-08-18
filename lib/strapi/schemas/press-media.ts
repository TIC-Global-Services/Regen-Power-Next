import { z } from "zod";
import { MediaSchema } from "./common";

export const PressMediaHeroSchema = z.object({
  __component: z.literal("press-and-media.hero"),
  subtitle: z.string().nullable(),
  mainTitle: z.string().nullable(),
  description: z.string().nullable(),
  ctaText: z.string().nullable(),
  ctaLink: z.string().nullable(),
  backgroundImage: MediaSchema.nullable(),
});
export type PressMediaHeroData = z.infer<typeof PressMediaHeroSchema>;

export const PressMediaFeaturedArticleSchema = z.object({
  __component: z.literal("press-and-media.featured-article"),
  image: MediaSchema.nullable(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  href: z.string().nullable(),
});
export type PressMediaFeaturedArticleData = z.infer<typeof PressMediaFeaturedArticleSchema>;

export const PressMediaNewsItemSchema = z.object({
  id: z.number(),
  image: MediaSchema.nullable(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  href: z.string().nullable(),
});

export const PressMediaLatestNewsSectionSchema = z.object({
  __component: z.literal("press-and-media.latest-news-section"),
  subtitle: z.string().nullable(),
  title: z.string().nullable(),
  items: z.array(PressMediaNewsItemSchema),
});
export type PressMediaLatestNewsSectionData = z.infer<typeof PressMediaLatestNewsSectionSchema>;

export const PressMediaCategoryOptionSchema = z.object({
  id: z.number(),
  label: z.string(),
  value: z.string(),
});

export const PressMediaCardSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string().nullable(),
  image: MediaSchema.nullable(),
  categoryKey: z.string().nullable(),
});

export const PressMediaNewsSectionSchema = z.object({
  __component: z.literal("press-and-media.news-section"),
  subtitle: z.string().nullable(),
  title: z.string().nullable(),
  categories: z.array(PressMediaCategoryOptionSchema),
  defaultCategory: z.string().nullable(),
  cards: z.array(PressMediaCardSchema),
});
export type PressMediaNewsSectionData = z.infer<typeof PressMediaNewsSectionSchema>;

/**
 * press-article collection entry — `GET /api/press-articles`
 * (fetched with fields: title, description, slug, categories + populate image)
 */
export const PressArticleSchema = z.object({
  id: z.number(),
  documentId: z.string(),
  title: z.string().nullable().default(""),
  slug: z.string().nullable().default(""),
  description: z.string().nullable().default(""),
  content: z.string().nullable().default(""),
  categories: z.array(z.string()).nullable().default([]),
  featured: z.boolean().nullable().default(false),
  image: MediaSchema.nullable(),
  createdAt: z.string().nullable().optional(),
  updatedAt: z.string().nullable().optional(),
  publishedAt: z.string().nullable().optional(),
});
export type PressArticleData = z.infer<typeof PressArticleSchema>;
