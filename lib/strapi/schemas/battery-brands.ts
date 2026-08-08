import { z } from "zod";
import { MediaSchema } from "./common";
import { SharedTextItemSchema } from "./battery-product";
import type { ComparisonTableData } from "./battery-product";

// ─── Hero ────────────────────────────────────────────────────────────────

export const BatteryBrandsHeroSchema = z.object({
  __component: z.literal("battery-brands.hero"),
  subtitle: z.string().nullable(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  ctaText: z.string().nullable(),
  ctaLink: z.string().nullable(),
  showOverlay: z.boolean().nullable(),
  backgroundImage: MediaSchema.nullable(),
});
export type BatteryBrandsHeroData = z.infer<typeof BatteryBrandsHeroSchema>;

// ─── Brand Long Term Bet ─────────────────────────────────────────────────

export const BrandBetCardSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  image: MediaSchema.nullable(),
});

export const BatteryBrandsLongTermBetSchema = z.object({
  __component: z.literal("battery-brands.brand-long-term-bet"),
  subtitle: z.string().nullable(),
  title: z.string().nullable(),
  cards: z.array(BrandBetCardSchema),
});
export type BatteryBrandsLongTermBetData = z.infer<
  typeof BatteryBrandsLongTermBetSchema
>;

// ─── What It Takes ───────────────────────────────────────────────────────

export const BatteryBrandsWhatItTakesSchema = z.object({
  __component: z.literal("battery-brands.what-it-takes"),
  subtitle: z.string().nullable(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  items: z.array(SharedTextItemSchema),
  image: MediaSchema.nullable(),
  imageAlt: z.string().nullable(),
});
export type BatteryBrandsWhatItTakesData = z.infer<
  typeof BatteryBrandsWhatItTakesSchema
>;

// ─── Seven Brand ─────────────────────────────────────────────────────────

export const BrandSpecDetailSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
});

export const BrandSpecBlockSchema = z.object({
  id: z.number(),
  title: z.string(),
  specdetails: z.array(BrandSpecDetailSchema),
});

export const BrandCardSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  specification: z.array(BrandSpecBlockSchema),
});

export const BatteryBrandsSevenBrandSchema = z.object({
  __component: z.literal("battery-brands.seven-brand"),
  title: z.string().nullable(),
  brands: z.array(BrandCardSchema),
});
export type BatteryBrandsSevenBrandData = z.infer<
  typeof BatteryBrandsSevenBrandSchema
>;

// ─── Comparison Table (battery-product.comparison-table) ─────────────────

export type { ComparisonTableData as BatteryBrandsComparisonTableData };

// ─── Quick Way ───────────────────────────────────────────────────────────

export const RecommendationItemSchema = z.object({
  id: z.number(),
  condition: z.string(),
  recommendation: z.string(),
});

export const BatteryBrandsQuickWaySchema = z.object({
  __component: z.literal("battery-brands.quick-way"),
  title: z.string().nullable(),
  subtitle: z.string().nullable(),
  sectionHeader: z.string().nullable(),
  recommendations: z.array(RecommendationItemSchema),
  image: MediaSchema.nullable(),
  imageAlt: z.string().nullable(),
});
export type BatteryBrandsQuickWayData = z.infer<
  typeof BatteryBrandsQuickWaySchema
>;

// ─── CEC Approved ────────────────────────────────────────────────────────

export const CecCardSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
});

export const BatteryBrandsCecApprovedSchema = z.object({
  __component: z.literal("battery-brands.cec-approved"),
  title: z.string().nullable(),
  description: z.string().nullable(),
  defaultFeaturedIndex: z.number().nullable(),
  cards: z.array(CecCardSchema),
});
export type BatteryBrandsCecApprovedData = z.infer<
  typeof BatteryBrandsCecApprovedSchema
>;

// ─── Why Our Installer ───────────────────────────────────────────────────

export const CertItemSchema = z.object({
  id: z.number(),
  title: z.string(),
});

export const BatteryBrandsWhyOurInstallerSchema = z.object({
  __component: z.literal("battery-brands.why-our-installer"),
  title: z.string().nullable(),
  subtitle: z.string().nullable(),
  image: MediaSchema.nullable(),
  imageAlt: z.string().nullable(),
  certifications: z.array(CertItemSchema),
  whyMattersTitle: z.string().nullable(),
  whyMattersDescription: z.string().nullable(),
});
export type BatteryBrandsWhyOurInstallerData = z.infer<
  typeof BatteryBrandsWhyOurInstallerSchema
>;
