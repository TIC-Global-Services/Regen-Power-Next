import { z } from "zod";
import { MediaSchema } from "./common";

// ─── Hero ──────────────────────────────────────────────────────────────
export const BatteryBrandsHeroSchema = z.object({
  __component: z.literal("battery-brands.hero"),
  backgroundImage: MediaSchema.nullable(),
  subtitle: z.string().nullable(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  buttonText: z.string().nullable(),
  buttonLink: z.string().nullable(),
  showOverlay: z.boolean().nullable(),
});
export type BatteryBrandsHeroData = z.infer<typeof BatteryBrandsHeroSchema>;

// ─── Brand Long Term Bet ──────────────────────────────────────────────
export const BatteryBrandsBetCardSchema = z.object({
  id: z.number(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  image: MediaSchema.nullable(),
});
export type BatteryBrandsBetCardData = z.infer<typeof BatteryBrandsBetCardSchema>;

export const BatteryBrandsBrandLongTermBetSchema = z.object({
  __component: z.literal("battery-brands.brand-long-term-bet"),
  subtitle: z.string().nullable(),
  title: z.string().nullable(),
  cards: z.array(BatteryBrandsBetCardSchema),
});
export type BatteryBrandsBrandLongTermBetData = z.infer<typeof BatteryBrandsBrandLongTermBetSchema>;

// ─── What It Takes ────────────────────────────────────────────────────
export const BatteryBrandsWhatItTakesSchema = z.object({
  __component: z.literal("battery-brands.what-it-takes"),
  subtitle: z.string().nullable(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  items: z.array(z.string()),
  image: MediaSchema.nullable(),
});
export type BatteryBrandsWhatItTakesData = z.infer<typeof BatteryBrandsWhatItTakesSchema>;

// ─── Seven Brand ───────────────────────────────────────────────────────
export const BatteryBrandsSpecDetailSchema = z.object({
  id: z.number(),
  title: z.string().nullable(),
  description: z.string().nullable(),
});
export type BatteryBrandsSpecDetailData = z.infer<typeof BatteryBrandsSpecDetailSchema>;

export const BatteryBrandsSpecBlockSchema = z.object({
  id: z.number(),
  title: z.string().nullable(),
  specdetails: z.array(BatteryBrandsSpecDetailSchema),
});
export type BatteryBrandsSpecBlockData = z.infer<typeof BatteryBrandsSpecBlockSchema>;

export const BatteryBrandsBrandCardSchema = z.object({
  id: z.number(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  specification: z.array(BatteryBrandsSpecBlockSchema),
});
export type BatteryBrandsBrandCardData = z.infer<typeof BatteryBrandsBrandCardSchema>;

export const BatteryBrandsSevenBrandSchema = z.object({
  __component: z.literal("battery-brands.seven-brand"),
  title: z.string().nullable(),
  brands: z.array(BatteryBrandsBrandCardSchema),
});
export type BatteryBrandsSevenBrandData = z.infer<typeof BatteryBrandsSevenBrandSchema>;

// ─── Quick Way ─────────────────────────────────────────────────────────
export const BatteryBrandsRecommendationItemSchema = z.object({
  id: z.number(),
  condition: z.string().nullable(),
  recommendation: z.string().nullable(),
});
export type BatteryBrandsRecommendationItemData = z.infer<typeof BatteryBrandsRecommendationItemSchema>;

export const BatteryBrandsQuickWaySchema = z.object({
  __component: z.literal("battery-brands.quick-way"),
  title: z.string().nullable(),
  subtitle: z.string().nullable(),
  sectionHeader: z.string().nullable(),
  recommendations: z.array(BatteryBrandsRecommendationItemSchema),
  image: MediaSchema.nullable(),
});
export type BatteryBrandsQuickWayData = z.infer<typeof BatteryBrandsQuickWaySchema>;

// ─── CEC Approved ──────────────────────────────────────────────────────
export const BatteryBrandsCecCardSchema = z.object({
  id: z.number(),
  title: z.string().nullable(),
  description: z.string().nullable(),
});
export type BatteryBrandsCecCardData = z.infer<typeof BatteryBrandsCecCardSchema>;

export const BatteryBrandsCecApprovedSchema = z.object({
  __component: z.literal("battery-brands.cec-approved"),
  title: z.string().nullable(),
  description: z.string().nullable(),
  defaultFeaturedIndex: z.number().nullable(),
  cards: z.array(BatteryBrandsCecCardSchema),
});
export type BatteryBrandsCecApprovedData = z.infer<typeof BatteryBrandsCecApprovedSchema>;

// ─── Why Our Installer ─────────────────────────────────────────────────
export const BatteryBrandsCertItemSchema = z.object({
  id: z.number(),
  title: z.string().nullable(),
});
export type BatteryBrandsCertItemData = z.infer<typeof BatteryBrandsCertItemSchema>;

export const BatteryBrandsWhyOurInstallerSchema = z.object({
  __component: z.literal("battery-brands.why-our-installer"),
  title: z.string().nullable(),
  subtitle: z.string().nullable(),
  image: MediaSchema.nullable(),
  certifications: z.array(BatteryBrandsCertItemSchema),
  whyMattersTitle: z.string().nullable(),
  whyMattersDescription: z.string().nullable(),
});
export type BatteryBrandsWhyOurInstallerData = z.infer<typeof BatteryBrandsWhyOurInstallerSchema>;
