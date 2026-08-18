import { z } from "zod";
import { MediaSchema } from "./common";

export const BlogHeroSchema = z.object({
  __component: z.literal("blog.hero"),
  subtitle: z.string().nullable(),
  mainTitle: z.string().nullable(),
  description: z.string().nullable(),
  ctaText: z.string().nullable(),
  ctaLink: z.string().nullable(),
  backgroundImage: MediaSchema.nullable(),
});
export type BlogHeroData = z.infer<typeof BlogHeroSchema>;

export const BlogCategorySchema = z.object({
  id: z.number(),
  label: z.string(),
  value: z.string(),
});

export const BlogCardSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  image: MediaSchema.nullable(),
  imagePosition: z.enum(["right", "left"]).nullable(),
  categoryKey: z.string().nullable(),
});

/**
 * blog-article collection entry — `GET /api/blog-articles`
 * (fetched with fields: title, description, slug, categories + populate image)
 */
export const BlogArticleSchema = z.object({
  id: z.number(),
  documentId: z.string(),
  title: z.string().nullable().default(""),
  slug: z.string().nullable().default(""),
  description: z.string().nullable().default(""),
  content: z.string().nullable().default(""),
  categories: z.array(z.string()).nullable().default([]),
  image: MediaSchema.nullable(),
  createdAt: z.string().nullable().optional(),
  updatedAt: z.string().nullable().optional(),
  publishedAt: z.string().nullable().optional(),
});
export type BlogArticleData = z.infer<typeof BlogArticleSchema>;

export const BlogCategoryFilterSchema = z.object({
  __component: z.literal("blog.category-filter"),
  subtitle: z.string().nullable(),
  title: z.string().nullable(),
  categories: z.array(BlogCategorySchema),
  defaultCategory: z.string().nullable(),
  cards: z.array(BlogCardSchema),
});
export type BlogCategoryFilterData = z.infer<typeof BlogCategoryFilterSchema>;

export const BlogCtaBannerSchema = z.object({
  __component: z.literal("shared.cta-banner"),
  subtitle: z.string().nullable(),
  mainTitle: z.string().nullable(),
  description: z.string().nullable(),
  buttonText: z.string().nullable(),
  buttonHref: z.string().nullable(),
  backgroundImage: MediaSchema.nullable(),
});
export type BlogCtaBannerData = z.infer<typeof BlogCtaBannerSchema>;
