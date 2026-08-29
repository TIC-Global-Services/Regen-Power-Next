import { z } from "zod";
import { MediaSchema } from "./common";

// ─── Shared primitives ──────────────────────────────────────────────────

/** shared.text-item — single `text` field */
export const SharedTextItemSchema = z.object({
  id: z.number(),
  text: z.string().nullable(),
});
export type SharedTextItemData = z.infer<typeof SharedTextItemSchema>;

/** battery-product.spec-item — label + value */
export const SpecItemSchema = z.object({
  id: z.number(),
  label: z.string(),
  value: z.string(),
});
export type SpecItemData = z.infer<typeof SpecItemSchema>;

// ─── Hero ───────────────────────────────────────────────────────────────

export const BatteryProductHeroSchema = z.object({
  __component: z.literal("battery-product.hero"),
  subtitle: z.string().nullable(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  ctaText: z.string().nullable(),
  ctaLink: z.string().nullable(),
  showOverlay: z.boolean().nullable(),
  backgroundImage: MediaSchema.nullable(),
});
export type BatteryProductHeroData = z.infer<typeof BatteryProductHeroSchema>;

// ─── Marquee (battery-storage.marquee) ──────────────────────────────────

export const BatteryMarqueeSchema = z.object({
  __component: z.literal("battery-storage.marquee"),
  items: z.array(z.object({ id: z.number(), text: z.string() })),
});
export type BatteryMarqueeData = z.infer<typeof BatteryMarqueeSchema>;

// ─── Brand Matters ──────────────────────────────────────────────────────

export const BrandMatterCardSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  image: MediaSchema.nullable(),
});

export const BrandMattersSchema = z.object({
  __component: z.literal("battery-product.brand-matters"),
  topSubtitle: z.string().nullable(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  cards: z.array(BrandMatterCardSchema),
});
export type BrandMattersData = z.infer<typeof BrandMattersSchema>;

// ─── How You Use It ─────────────────────────────────────────────────────

export const HowYouUseItCardSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
});

export const HowYouUseItSchema = z.object({
  __component: z.literal("battery-product.how-you-use-it"),
  topSubtitle: z.string().nullable(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  cards: z.array(HowYouUseItCardSchema),
});
export type HowYouUseItData = z.infer<typeof HowYouUseItSchema>;

// ─── Right Sizing ───────────────────────────────────────────────────────

export const RightSizingOptionSchema = z.object({
  id: z.number(),
  label: z.string(),
  value: z.string(),
});
export type RightSizingOptionData = z.infer<typeof RightSizingOptionSchema>;

export const RightSizingStepSchema = z.object({
  id: z.number(),
  icon: MediaSchema.nullable(),
  title: z.string(),
  placeholder: z.string().nullable(),
  options: z.array(RightSizingOptionSchema).optional(),
});

export const RightSizingSchema = z.object({
  __component: z.literal("battery-product.right-sizing"),
  topSubtitle: z.string().nullable(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  ctaText: z.string().nullable(),
  ctaHref: z.string().nullable(),
  steps: z.array(RightSizingStepSchema),
});
export type RightSizingData = z.infer<typeof RightSizingSchema>;

// ─── Our Brands ─────────────────────────────────────────────────────────

export const BatteryBrandItemSchema = z.object({
  id: z.number(),
  title: z.string(),
  logo: MediaSchema.nullable(),
  image: MediaSchema.nullable(),
  link: z.string().nullable(),
  specs: z.array(SpecItemSchema),
});

export const OurBrandsSchema = z.object({
  __component: z.literal("battery-product.our-brands"),
  brands: z.array(BatteryBrandItemSchema),
});
export type OurBrandsData = z.infer<typeof OurBrandsSchema>;

// ─── Comparison Table (battery-product.comparison-table) ────────────────

export const ComparisonColumnSchema = z.object({
  id: z.number(),
  title: z.string().nullable(),
});

export const ComparisonValueSchema = z.object({
  id: z.number(),
  text: z.string().nullable(),
});

export const ComparisonRowSchema = z.object({
  id: z.number(),
  label: z.string().nullable(),
  values: z.array(ComparisonValueSchema),
});

export const ComparisonTableSchema = z.object({
  __component: z.literal("battery-product.comparison-table"),
  subtitle: z.string().nullable(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  labelColumnTitle: z.string().nullable(),
  columns: z.array(ComparisonColumnSchema),
  rows: z.array(ComparisonRowSchema),
});
export type ComparisonTableData = z.infer<typeof ComparisonTableSchema>;

// ─── Compatible Products ────────────────────────────────────────────────

export const CompatibleProductsSchema = z.object({
  __component: z.literal("battery-product.compatible-products"),
  topSubtitle: z.string().nullable(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  leftTitle: z.string().nullable(),
  leftItems: z.array(SharedTextItemSchema),
  rightTitle: z.string().nullable(),
  rightItems: z.array(SharedTextItemSchema),
});
export type CompatibleProductsData = z.infer<typeof CompatibleProductsSchema>;

// ─── What We Check ──────────────────────────────────────────────────────

export const WhatWeCheckSchema = z.object({
  __component: z.literal("battery-product.what-we-check"),
  subtitle: z.string().nullable(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  paragraphs: z.array(SharedTextItemSchema),
});
export type WhatWeCheckData = z.infer<typeof WhatWeCheckSchema>;

// ─── Warranty Coverage (solutions-card) ─────────────────────────────────

export const SolutionsCardSchema = z.object({
  id: z.number(),
  type: z.enum(["text", "image"]),
  variant: z.enum(["light-gray", "light-green", "dark"]).nullable(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  specs: z.string().nullable(),
  image: MediaSchema.nullable(),
  imageAlt: z.string().nullable(),
});
export type SolutionsCardData = z.infer<typeof SolutionsCardSchema>;

export const WarrantyCoverageSchema = z.object({
  __component: z.literal("battery-product.warranty-coverage"),
  subtitle: z.string().nullable(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  cards: z.array(SolutionsCardSchema),
  layout: z.enum(["3", "4", "6"]).nullable(),
});
export type WarrantyCoverageData = z.infer<typeof WarrantyCoverageSchema>;

// ─── Zero Interest (terms-block) ────────────────────────────────────────

export const TermsBlockSchema = z.object({
  id: z.number(),
  title: z.string(),
  items: z.array(SharedTextItemSchema),
});
export type TermsBlockData = z.infer<typeof TermsBlockSchema>;

export const ZeroInterestSchema = z.object({
  __component: z.literal("battery-product.zero-interest"),
  topSubtitle: z.string().nullable(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  keyTerms: TermsBlockSchema.nullable(),
  eligibility: TermsBlockSchema.nullable(),
  summaryText: z.string().nullable(),
  topImage: MediaSchema.nullable(),
  bottomImage: MediaSchema.nullable(),
  ctaText: z.string().nullable(),
  ctaLink: z.string().nullable(),
});
export type ZeroInterestData = z.infer<typeof ZeroInterestSchema>;

// ─── Homeowners (feature-card) ──────────────────────────────────────────

export const FeatureCardSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string().nullable(),
  image: MediaSchema.nullable(),
  textPosition: z.enum(["top", "bottom"]).nullable(),
  footerTitle: z.string().nullable(),
  footerDescription: z.string().nullable(),
});

export const HomeownersSchema = z.object({
  __component: z.literal("battery-product.homeowners"),
  topSubtitle: z.string().nullable(),
  title: z.string().nullable(),
  showReadMore: z.boolean().nullable(),
  centerButton: z.boolean().nullable(),
  centerButtonText: z.string().nullable(),
  cards: z.array(FeatureCardSchema),
});
export type HomeownersData = z.infer<typeof HomeownersSchema>;
