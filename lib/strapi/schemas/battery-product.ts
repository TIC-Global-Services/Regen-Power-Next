import { z } from "zod";
import { MediaSchema } from "./common";

export const BatteryProductHeroSchema = z.object({
  __component: z.literal("battery-product.hero"),
  backgroundImage: MediaSchema.nullable(),
  subtitle: z.string().nullable(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  buttonText: z.string().nullable(),
  buttonLink: z.string().nullable(),
  showOverlay: z.boolean().nullable(),
});
export type BatteryProductHeroData = z.infer<typeof BatteryProductHeroSchema>;

export const BatteryProductMatterCardSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  image: MediaSchema.nullable(),
});
export type BatteryProductMatterCardData = z.infer<typeof BatteryProductMatterCardSchema>;

export const BatteryProductBrandMattersSchema = z.object({
  __component: z.literal("battery-product.brand-matters"),
  topSubtitle: z.string().nullable(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  cards: z.array(BatteryProductMatterCardSchema),
});
export type BatteryProductBrandMattersData = z.infer<typeof BatteryProductBrandMattersSchema>;

export const BatteryProductSpecItemSchema = z.object({
  id: z.number(),
  label: z.string(),
  value: z.string(),
});
export type BatteryProductSpecItemData = z.infer<typeof BatteryProductSpecItemSchema>;

export const BatteryProductBrandItemSchema = z.object({
  id: z.number(),
  title: z.string(),
  logo: MediaSchema.nullable(),
  image: MediaSchema.nullable(),
  link: z.string().nullable(),
  specs: z.array(BatteryProductSpecItemSchema),
});
export type BatteryProductBrandItemData = z.infer<typeof BatteryProductBrandItemSchema>;

export const BatteryProductOurBrandsSchema = z.object({
  __component: z.literal("battery-product.our-brands"),
  topSubtitle: z.string().nullable(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  brands: z.array(BatteryProductBrandItemSchema),
});
export type BatteryProductOurBrandsData = z.infer<typeof BatteryProductOurBrandsSchema>;

export const BatteryProductTermsBlockSchema = z.object({
  id: z.number(),
  title: z.string().nullable(),
  items: z.array(z.string()),
});
export type BatteryProductTermsBlockData = z.infer<typeof BatteryProductTermsBlockSchema>;

export const BatteryProductKeyTermsSchema = z.object({
  __component: z.literal("battery-product.key-terms"),
  topSubtitle: z.string().nullable(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  keyTermsBlock: BatteryProductTermsBlockSchema.nullable(),
  eligibilityBlock: BatteryProductTermsBlockSchema.nullable(),
  summaryText: z.string().nullable(),
  ctaText: z.string().nullable(),
  ctaLink: z.string().nullable(),
});
export type BatteryProductKeyTermsData = z.infer<typeof BatteryProductKeyTermsSchema>;

export const BatteryProductCompatibleProductsSchema = z.object({
  __component: z.literal("battery-product.compatible-products"),
  topSubtitle: z.string().nullable(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  leftTitle: z.string().nullable(),
  leftItems: z.array(z.string()),
  rightTitle: z.string().nullable(),
  rightItems: z.array(z.string()),
});
export type BatteryProductCompatibleProductsData = z.infer<typeof BatteryProductCompatibleProductsSchema>;

export const BatteryProductComparisonColumnSchema = z.object({
  id: z.number(),
  heading: z.string(),
});
export type BatteryProductComparisonColumnData = z.infer<typeof BatteryProductComparisonColumnSchema>;

export const BatteryProductComparisonRowSchema = z.object({
  id: z.number(),
  label: z.string(),
  values: z.array(z.string()),
});
export type BatteryProductComparisonRowData = z.infer<typeof BatteryProductComparisonRowSchema>;

export const BatteryProductSolutionsCardSchema = z.object({
  id: z.number(),
  type: z.string(),
  variant: z.string(),
  title: z.string().nullable(),
  description: z.string().nullable(),
});
export type BatteryProductSolutionsCardData = z.infer<typeof BatteryProductSolutionsCardSchema>;

export const BatteryProductZeroInterestSchema = z.object({
  __component: z.literal("battery-product.zero-interest"),
  subtitle: z.string().nullable(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  cards: z.array(BatteryProductSolutionsCardSchema),
  layout: z.string().nullable(),
});
export type BatteryProductZeroInterestData = z.infer<typeof BatteryProductZeroInterestSchema>;

export const BatteryProductWhatWeCheckSchema = z.object({
  __component: z.literal("battery-product.what-we-check"),
  subtitle: z.string().nullable(),
  title: z.string().nullable(),
  paragraphs: z.array(z.string()),
});
export type BatteryProductWhatWeCheckData = z.infer<typeof BatteryProductWhatWeCheckSchema>;

export const BatteryProductFeatureCardSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  image: MediaSchema.nullable(),
  textPosition: z.string().nullable(),
  footerTitle: z.string().nullable(),
  footerDescription: z.string().nullable(),
});
export type BatteryProductFeatureCardData = z.infer<typeof BatteryProductFeatureCardSchema>;

export const BatteryProductHomeownersSchema = z.object({
  __component: z.literal("battery-product.homeowners"),
  topSubtitle: z.string().nullable(),
  title: z.string().nullable(),
  cards: z.array(BatteryProductFeatureCardSchema),
  showReadMore: z.boolean().nullable(),
  centerButton: z.boolean().nullable(),
  centerButtonText: z.string().nullable(),
});
export type BatteryProductHomeownersData = z.infer<typeof BatteryProductHomeownersSchema>;

export const BatteryProductComparisonTableSchema = z.object({
  __component: z.literal("battery-product.comparison-table"),
  topSubtitle: z.string().nullable(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  columns: z.array(BatteryProductComparisonColumnSchema),
  rows: z.array(BatteryProductComparisonRowSchema),
});
export type BatteryProductComparisonTableData = z.infer<typeof BatteryProductComparisonTableSchema>;
