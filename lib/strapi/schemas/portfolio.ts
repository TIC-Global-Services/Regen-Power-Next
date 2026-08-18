import { z } from "zod";
import { MediaSchema } from "./common";

export const PortfolioHeroSchema = z.object({
  __component: z.literal("portfolio.hero"),
  subtitle: z.string().nullable(),
  mainTitle: z.string().nullable(),
  description: z.string().nullable(),
  ctaText: z.string().nullable(),
  ctaLink: z.string().nullable(),
  backgroundImage: MediaSchema.nullable(),
});
export type PortfolioHeroData = z.infer<typeof PortfolioHeroSchema>;

export const PortfolioFilterOptionSchema = z.object({
  id: z.number(),
  label: z.string(),
  value: z.string(),
});

export const PortfolioFilterGroupSchema = z.object({
  id: z.number(),
  name: z.string().nullable(),
  options: z.array(PortfolioFilterOptionSchema),
});

export const PortfolioCardSchema = z.object({
  id: z.number(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  image: MediaSchema.nullable(),
  categoryKey: z.string().nullable(),
});

export const PortfolioFiltersSchema = z.object({
  __component: z.literal("portfolio.filters"),
  filterGroups: z.array(PortfolioFilterGroupSchema),
  cards: z.array(PortfolioCardSchema),
});
export type PortfolioFiltersData = z.infer<typeof PortfolioFiltersSchema>;

/**
 * portfolio-project collection entry — `GET /api/portfolio-projects`
 * (fetched with fields: title, description, slug, filters, state, suburb, postcode + populate image)
 */
export const PortfolioProjectSchema = z.object({
  id: z.number(),
  documentId: z.string(),
  title: z.string().nullable().default(""),
  slug: z.string().nullable().default(""),
  description: z.string().nullable().default(""),
  filters: z.array(z.string()).nullable().default([]),
  suburb: z.string().nullable(),
  state: z.string().nullable(),
  postcode: z.string().nullable(),
  image: MediaSchema.nullable(),
  createdAt: z.string().nullable().optional(),
  updatedAt: z.string().nullable().optional(),
  publishedAt: z.string().nullable().optional(),
});
export type PortfolioProjectData = z.infer<typeof PortfolioProjectSchema>;
