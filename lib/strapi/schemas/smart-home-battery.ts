import { z } from "zod";
import { MediaSchema } from "./common";

// ─── Hero ──────────────────────────────────────────────────────────────
export const SmartHomeBatteryHeroSchema = z.object({
  __component: z.literal("smart-home-battery.hero"),
  backgroundImage: MediaSchema.nullable(),
  subtitle: z.string().nullable(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  buttonText: z.string().nullable(),
  buttonLink: z.string().nullable(),
  showOverlay: z.boolean().nullable(),
});
export type SmartHomeBatteryHeroData = z.infer<typeof SmartHomeBatteryHeroSchema>;

// ─── Marquee (reuses battery-storage.marquee) ─────────────────────────
export { BatteryStorageMarqueeSchema as SmartHomeBatteryMarqueeSchema } from "./battery-storage";
export type { BatteryStorageMarqueeData as SmartHomeBatteryMarqueeData } from "./battery-storage";

// ─── Great Fit ─────────────────────────────────────────────────────────
export const SmartHomeBatteryGreatFitSchema = z.object({
  __component: z.literal("smart-home-battery.great-fit"),
  topSubtitle: z.string().nullable(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  goodFitTitle: z.string().nullable(),
  goodFitItems: z.array(z.string()),
  conversationTitle: z.string().nullable(),
  conversationItems: z.array(z.string()),
});
export type SmartHomeBatteryGreatFitData = z.infer<typeof SmartHomeBatteryGreatFitSchema>;

// ─── Split Section ─────────────────────────────────────────────────────
export const SmartHomeBatterySplitBlockSchema = z.object({
  id: z.number(),
  title: z.string().nullable(),
  description: z.string().nullable(),
});
export type SmartHomeBatterySplitBlockData = z.infer<typeof SmartHomeBatterySplitBlockSchema>;

export const SmartHomeBatterySplitSlideSchema = z.object({
  id: z.number(),
  mainDescription: z.string().nullable(),
  blocks: z.array(SmartHomeBatterySplitBlockSchema),
  ctaText: z.string().nullable(),
  ctaLink: z.string().nullable(),
  image: MediaSchema.nullable(),
});
export type SmartHomeBatterySplitSlideData = z.infer<typeof SmartHomeBatterySplitSlideSchema>;

export const SmartHomeBatterySplitSectionSchema = z.object({
  __component: z.literal("smart-home-battery.split-section"),
  topSubtitle: z.string().nullable(),
  title: z.string().nullable(),
  slides: z.array(SmartHomeBatterySplitSlideSchema),
});
export type SmartHomeBatterySplitSectionData = z.infer<typeof SmartHomeBatterySplitSectionSchema>;

// ─── Timeline ──────────────────────────────────────────────────────────
export const SmartHomeBatteryTimelineEventSchema = z.object({
  id: z.number(),
  time: z.string().nullable(),
  title: z.string().nullable(),
  description: z.string().nullable(),
});
export type SmartHomeBatteryTimelineEventData = z.infer<typeof SmartHomeBatteryTimelineEventSchema>;

export const SmartHomeBatteryTimelineSchema = z.object({
  __component: z.literal("smart-home-battery.timeline"),
  topSubtitle: z.string().nullable(),
  title: z.string().nullable(),
  events: z.array(SmartHomeBatteryTimelineEventSchema),
});
export type SmartHomeBatteryTimelineData = z.infer<typeof SmartHomeBatteryTimelineSchema>;

// ─── Brands Grid ───────────────────────────────────────────────────────
export const SmartHomeBatteryBrandSpecSchema = z.object({
  id: z.number(),
  title: z.string().nullable(),
  description: z.string().nullable(),
});
export type SmartHomeBatteryBrandSpecData = z.infer<typeof SmartHomeBatteryBrandSpecSchema>;

export const SmartHomeBatteryBrandCardSchema = z.object({
  id: z.number(),
  title: z.string().nullable(),
  logo: MediaSchema.nullable(),
  specification: z.array(SmartHomeBatteryBrandSpecSchema),
  showbutton: z.boolean().nullable(),
  buttonText: z.string().nullable(),
  buttonLink: z.string().nullable(),
});
export type SmartHomeBatteryBrandCardData = z.infer<typeof SmartHomeBatteryBrandCardSchema>;

export const SmartHomeBatteryBrandsGridSchema = z.object({
  __component: z.literal("smart-home-battery.brands-grid"),
  topSubtitle: z.string().nullable(),
  title: z.string().nullable(),
  subtitle: z.string().nullable(),
  brands: z.array(SmartHomeBatteryBrandCardSchema),
});
export type SmartHomeBatteryBrandsGridData = z.infer<typeof SmartHomeBatteryBrandsGridSchema>;

// ─── Install Bento ─────────────────────────────────────────────────────
export const SmartHomeBatteryInstallBlockSchema = z.object({
  id: z.number(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  theme: z.enum(["white", "dark", "light"]).nullable(),
});
export type SmartHomeBatteryInstallBlockData = z.infer<typeof SmartHomeBatteryInstallBlockSchema>;

export const SmartHomeBatteryInstallBentoSchema = z.object({
  __component: z.literal("smart-home-battery.install-bento"),
  title: z.string().nullable(),
  description: z.string().nullable(),
  blocks: z.array(SmartHomeBatteryInstallBlockSchema),
});
export type SmartHomeBatteryInstallBentoData = z.infer<typeof SmartHomeBatteryInstallBentoSchema>;
