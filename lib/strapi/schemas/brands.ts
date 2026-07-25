import { z } from "zod";
import { MediaSchema, ParagraphSchema } from "./common";

export const BrandsHeroSchema = z.object({
  __component: z.literal("brands.hero"),
  subtitle: z.string().nullable(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  ctaText: z.string().nullable(),
  ctaLink: z.string().nullable(),
  backgroundImage: MediaSchema.nullable(),
});
export type BrandsHeroData = z.infer<typeof BrandsHeroSchema>;

export const BrandsPhilosophySchema = z.object({
  __component: z.literal("brands.philosophy"),
  badge: z.string().nullable(),
  subtitle: z.string().nullable(),
  title: z.string().nullable(),
  paragraphs: z.array(ParagraphSchema),
});
export type BrandsPhilosophyData = z.infer<typeof BrandsPhilosophySchema>;

export const BrandsTier1MeansSchema = z.object({
  __component: z.literal("brands.tier1-means"),
  subtitle: z.string().nullable(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  imagePosition: z.enum(["left", "right"]).nullable(),
  image: MediaSchema.nullable(),
});
export type BrandsTier1MeansData = z.infer<typeof BrandsTier1MeansSchema>;

export const BrandsGridCardSchema = z.object({
  id: z.number(),
  title: z.string(),
  subtitle: z.string().nullable(),
  middleTitle: z.string().nullable(),
  description: z.string().nullable(),
  isDark: z.boolean(),
});

export const BrandsGridSchema = z.object({
  __component: z.literal("brands.brands-grid"),
  subtitle: z.string().nullable(),
  title: z.string().nullable(),
  badge: z.string().nullable(),
  cards: z.array(BrandsGridCardSchema),
});
export type BrandsGridData = z.infer<typeof BrandsGridSchema>;

export const BrandsHybridSpecialtySchema = z.object({
  __component: z.literal("brands.hybrid-specialty"),
  subtitle: z.string().nullable(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  image: MediaSchema.nullable(),
});
export type BrandsHybridSpecialtyData = z.infer<typeof BrandsHybridSpecialtySchema>;

export const BrandsInverterSchema = z.object({
  id: z.number(),
  name: z.string(),
  origin: z.string().nullable(),
  positioning: z.string().nullable(),
  range: z.string().nullable(),
  warranty: z.string().nullable(),
});

export const BrandsInvertersSliderSchema = z.object({
  __component: z.literal("brands.inverters-slider"),
  subtitle: z.string().nullable(),
  title: z.string().nullable(),
  inverters: z.array(BrandsInverterSchema),
});
export type BrandsInvertersSliderData = z.infer<typeof BrandsInvertersSliderSchema>;

export const BrandsCriteriaItemSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
});

export const BrandsCriteriaListSchema = z.object({
  __component: z.literal("brands.criteria-list"),
  subtitle: z.string().nullable(),
  title: z.string().nullable(),
  introText: z.string().nullable(),
  items: z.array(BrandsCriteriaItemSchema),
});
export type BrandsCriteriaListData = z.infer<typeof BrandsCriteriaListSchema>;

export const BrandsSpecColumnSchema = z.object({
  id: z.number(),
  brand: z.string(),
  efficiency: z.string().nullable(),
  tempCoeff: z.string().nullable(),
  degradation: z.string().nullable(),
  warranty: z.string().nullable(),
});

export const BrandsSpecsTableSchema = z.object({
  __component: z.literal("brands.specs-table"),
  subtitle: z.string().nullable(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  columns: z.array(BrandsSpecColumnSchema),
});
export type BrandsSpecsTableData = z.infer<typeof BrandsSpecsTableSchema>;
