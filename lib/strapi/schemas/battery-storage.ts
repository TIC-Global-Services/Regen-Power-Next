import { z } from "zod";
import { MediaSchema } from "./common";

// ─── Shared primitives ──────────────────────────────────────────────────

/** shared.text-item — single `text` field */
export const BatteryStorageTextItemSchema = z.object({
  id: z.number(),
  text: z.string(),
});
export type BatteryStorageTextItemData = z.infer<
  typeof BatteryStorageTextItemSchema
>;

/** battery-storage.image-card */
export const BatteryStorageImageCardSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  image: MediaSchema.nullable(),
});
export type BatteryStorageImageCardData = z.infer<
  typeof BatteryStorageImageCardSchema
>;

/** battery-storage.simple-card */
export const BatteryStorageSimpleCardSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  isPrimary: z.boolean().nullable(),
});
export type BatteryStorageSimpleCardData = z.infer<
  typeof BatteryStorageSimpleCardSchema
>;

/** battery-storage.range-card */
export const BatteryStorageRangeCardSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string().nullable(),
  image: MediaSchema.nullable(),
  ctaText: z.string().nullable(),
  ctaLink: z.string().nullable(),
});
export type BatteryStorageRangeCardData = z.infer<
  typeof BatteryStorageRangeCardSchema
>;

/** battery-storage.timeline-step */
export const BatteryStorageTimelineStepSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  image: MediaSchema.nullable(),
});
export type BatteryStorageTimelineStepData = z.infer<
  typeof BatteryStorageTimelineStepSchema
>;

/** battery-storage.story-card */
export const BatteryStorageStoryCardSchema = z.object({
  id: z.number(),
  home: z.string(),
  specs: z.string(),
  description: z.string(),
  image: MediaSchema.nullable(),
});
export type BatteryStorageStoryCardData = z.infer<
  typeof BatteryStorageStoryCardSchema
>;

// ─── Hero ───────────────────────────────────────────────────────────────

export const BatteryStorageHeroSchema = z.object({
  __component: z.literal("battery-storage.hero"),
  subtitle: z.string().nullable(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  ctaText: z.string().nullable(),
  ctaLink: z.string().nullable(),
  showOverlay: z.boolean().nullable(),
  backgroundImage: MediaSchema.nullable(),
});
export type BatteryStorageHeroData = z.infer<typeof BatteryStorageHeroSchema>;

// ─── Marquee ────────────────────────────────────────────────────────────

export const BatteryStorageMarqueeSchema = z.object({
  __component: z.literal("battery-storage.marquee"),
  items: z.array(BatteryStorageTextItemSchema),
});
export type BatteryStorageMarqueeData = z.infer<
  typeof BatteryStorageMarqueeSchema
>;

// ─── Debs Rebate Banner ─────────────────────────────────────────────────

export const BatteryStorageDebsRebateSchema = z.object({
  __component: z.literal("battery-storage.debs-rebate"),
  subtitle: z.string().nullable(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  image: MediaSchema.nullable(),
  ctaText: z.string().nullable(),
  ctaLink: z.string().nullable(),
});
export type BatteryStorageDebsRebateData = z.infer<
  typeof BatteryStorageDebsRebateSchema
>;

// ─── Jargon (How your battery works) ────────────────────────────────────

export const BatteryStorageJargonSchema = z.object({
  __component: z.literal("battery-storage.jargon"),
  topSubtitle: z.string().nullable(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  cards: z.array(BatteryStorageImageCardSchema),
});
export type BatteryStorageJargonData = z.infer<
  typeof BatteryStorageJargonSchema
>;

// ─── Bill Impact (What it does to your bill) ────────────────────────────

export const BatteryStorageBillImpactSchema = z.object({
  __component: z.literal("battery-storage.bill-impact"),
  topSubtitle: z.string().nullable(),
  title: z.string().nullable(),
  bottomSubtitle: z.string().nullable(),
  cards: z.array(BatteryStorageImageCardSchema),
  ctaDescription: z.string().nullable(),
  ctaText: z.string().nullable(),
  ctaLink: z.string().nullable(),
});
export type BatteryStorageBillImpactData = z.infer<
  typeof BatteryStorageBillImpactSchema
>;

// ─── Range Grid ─────────────────────────────────────────────────────────

export const BatteryStorageRangeGridSchema = z.object({
  __component: z.literal("battery-storage.range-grid"),
  topSubtitle: z.string().nullable(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  batteries: z.array(BatteryStorageRangeCardSchema),
});
export type BatteryStorageRangeGridData = z.infer<
  typeof BatteryStorageRangeGridSchema
>;

// ─── Capacity Blocks ────────────────────────────────────────────────────

export const BatteryStorageCapacityBlocksSchema = z.object({
  __component: z.literal("battery-storage.capacity-blocks"),
  topSubtitle: z.string().nullable(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  cards: z.array(BatteryStorageSimpleCardSchema),
  footerText: z.string().nullable(),
  ctaText: z.string().nullable(),
  ctaLink: z.string().nullable(),
});
export type BatteryStorageCapacityBlocksData = z.infer<
  typeof BatteryStorageCapacityBlocksSchema
>;

// ─── Great Fit ──────────────────────────────────────────────────────────

export const BatteryStorageGreatFitSchema = z.object({
  __component: z.literal("battery-storage.great-fit"),
  topSubtitle: z.string().nullable(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  goodFitTitle: z.string().nullable(),
  goodFitItems: z.array(BatteryStorageTextItemSchema),
  conversationTitle: z.string().nullable(),
  conversationItems: z.array(BatteryStorageTextItemSchema),
});
export type BatteryStorageGreatFitData = z.infer<
  typeof BatteryStorageGreatFitSchema
>;

// ─── Solar Meaning (VPP) ────────────────────────────────────────────────

export const BatteryStorageSolarMeaningSchema = z.object({
  __component: z.literal("battery-storage.solar-meaning"),
  topSubtitle: z.string().nullable(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  cards: z.array(BatteryStorageSimpleCardSchema),
});
export type BatteryStorageSolarMeaningData = z.infer<
  typeof BatteryStorageSolarMeaningSchema
>;

// ─── Installation Timeline ──────────────────────────────────────────────

export const BatteryStorageInstallationTimelineSchema = z.object({
  __component: z.literal("battery-storage.installation-timeline"),
  topSubtitle: z.string().nullable(),
  title: z.string().nullable(),
  steps: z.array(BatteryStorageTimelineStepSchema),
});
export type BatteryStorageInstallationTimelineData = z.infer<
  typeof BatteryStorageInstallationTimelineSchema
>;

// ─── One Local Team ─────────────────────────────────────────────────────

export const BatteryStorageTeamSchema = z.object({
  __component: z.literal("battery-storage.team"),
  topSubtitle: z.string().nullable(),
  title: z.string().nullable(),
  cards: z.array(BatteryStorageImageCardSchema),
  ctaText: z.string().nullable(),
  ctaLink: z.string().nullable(),
});
export type BatteryStorageTeamData = z.infer<typeof BatteryStorageTeamSchema>;

// ─── Customer Stories ───────────────────────────────────────────────────

export const BatteryStorageCustomerStoriesSchema = z.object({
  __component: z.literal("battery-storage.customer-stories"),
  topSubtitle: z.string().nullable(),
  title: z.string().nullable(),
  stories: z.array(BatteryStorageStoryCardSchema),
  centerButton: z.boolean().nullable(),
  centerButtonText: z.string().nullable(),
});
export type BatteryStorageCustomerStoriesData = z.infer<
  typeof BatteryStorageCustomerStoriesSchema
>;

// NOTE: shared.faq and shared.cta-banner schemas live in ./commercial.ts
// (SharedFaqSchema / SharedCtaBannerSchema) — reuse those.
