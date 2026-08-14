import { z } from "zod";
import { MediaSchema } from "./common";

// ─── Shared primitives ──────────────────────────────────────────────────

/** shared.text-item — single `text` field */
export const SmartHomeTextItemSchema = z.object({
  id: z.number(),
  text: z.string(),
});
export type SmartHomeTextItemData = z.infer<typeof SmartHomeTextItemSchema>;

/** smart-home-battery.pillar-card */
export const SmartHomePillarCardSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  image: MediaSchema.nullable(),
});
export type SmartHomePillarCardData = z.infer<typeof SmartHomePillarCardSchema>;

/** smart-home-battery.split-block */
export const SmartHomeSplitBlockSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
});
export type SmartHomeSplitBlockData = z.infer<typeof SmartHomeSplitBlockSchema>;

/** smart-home-battery.split-slide */
export const SmartHomeSplitSlideSchema = z.object({
  id: z.number(),
  topSubtitle: z.string(),
  title: z.string(),
  mainDescription: z.string(),
  blocks: z.array(SmartHomeSplitBlockSchema),
  ctaText: z.string(),
  ctaLink: z.string(),
  image: MediaSchema.nullable(),
});
export type SmartHomeSplitSlideData = z.infer<typeof SmartHomeSplitSlideSchema>;

/** smart-home-battery.timeline-event */
export const SmartHomeTimelineEventSchema = z.object({
  id: z.number(),
  time: z.string(),
  title: z.string(),
  description: z.string(),
});
export type SmartHomeTimelineEventData = z.infer<
  typeof SmartHomeTimelineEventSchema
>;

/** smart-home-battery.brand-spec */
export const SmartHomeBrandSpecSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
});
export type SmartHomeBrandSpecData = z.infer<typeof SmartHomeBrandSpecSchema>;

/** smart-home-battery.brand-card */
export const SmartHomeBrandCardSchema = z.object({
  id: z.number(),
  title: z.string(),
  logo: MediaSchema.nullable(),
  specification: z.array(SmartHomeBrandSpecSchema),
  showbutton: z.boolean(),
  buttonText: z.string(),
  buttonLink: z.string(),
});
export type SmartHomeBrandCardData = z.infer<typeof SmartHomeBrandCardSchema>;

/** smart-home-battery.install-block */
export const SmartHomeInstallBlockSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
});
export type SmartHomeInstallBlockData = z.infer<
  typeof SmartHomeInstallBlockSchema
>;

// ─── Hero ───────────────────────────────────────────────────────────────

export const SmartHomeHeroSchema = z.object({
  __component: z.literal("smart-home-battery.hero"),
  subtitle: z.string().nullable(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  ctaText: z.string().nullable(),
  ctaLink: z.string().nullable(),
  showOverlay: z.boolean().nullable().optional(),
  backgroundImage: MediaSchema.nullable(),
});
export type SmartHomeHeroData = z.infer<typeof SmartHomeHeroSchema>;

// ─── Great Fit ──────────────────────────────────────────────────────────

export const SmartHomeGreatFitSchema = z.object({
  __component: z.literal("smart-home-battery.great-fit"),
  topSubtitle: z.string().nullable(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  goodFitTitle: z.string().nullable(),
  goodFitItems: z.array(SmartHomeTextItemSchema),
  conversationTitle: z.string().nullable(),
  conversationItems: z.array(SmartHomeTextItemSchema),
});
export type SmartHomeGreatFitData = z.infer<typeof SmartHomeGreatFitSchema>;

// ─── Four Pillars ───────────────────────────────────────────────────────

export const SmartHomeFourPillarsSchema = z.object({
  __component: z.literal("smart-home-battery.four-pillars"),
  topSubtitle: z.string().nullable(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  cards: z.array(SmartHomePillarCardSchema),
});
export type SmartHomeFourPillarsData = z.infer<
  typeof SmartHomeFourPillarsSchema
>;

// ─── Split Section ──────────────────────────────────────────────────────

export const SmartHomeSplitSectionSchema = z.object({
  __component: z.literal("smart-home-battery.split-section"),
  slides: z.array(SmartHomeSplitSlideSchema),
});
export type SmartHomeSplitSectionData = z.infer<
  typeof SmartHomeSplitSectionSchema
>;

// ─── Timeline ───────────────────────────────────────────────────────────

export const SmartHomeTimelineSchema = z.object({
  __component: z.literal("smart-home-battery.timeline"),
  topSubtitle: z.string().nullable(),
  title: z.string().nullable(),
  events: z.array(SmartHomeTimelineEventSchema),
});
export type SmartHomeTimelineData = z.infer<typeof SmartHomeTimelineSchema>;

// ─── Brands Grid ────────────────────────────────────────────────────────

export const SmartHomeBrandsGridSchema = z.object({
  __component: z.literal("smart-home-battery.brands-grid"),
  topSubtitle: z.string().nullable(),
  title: z.string().nullable(),
  subtitle: z.string().nullable(),
  brands: z.array(SmartHomeBrandCardSchema),
});
export type SmartHomeBrandsGridData = z.infer<typeof SmartHomeBrandsGridSchema>;

// ─── Install Bento ──────────────────────────────────────────────────────

export const SmartHomeInstallBentoSchema = z.object({
  __component: z.literal("smart-home-battery.install-bento"),
  title: z.string().nullable(),
  description: z.string().nullable(),
  blocks: z.array(SmartHomeInstallBlockSchema),
});
export type SmartHomeInstallBentoData = z.infer<
  typeof SmartHomeInstallBentoSchema
>;
