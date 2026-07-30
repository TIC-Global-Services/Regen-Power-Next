import { z } from "zod";
import { MediaSchema } from "./common";

export const BatteryStorageHeroSchema = z.object({
  __component: z.literal("battery-storage.hero"),
  backgroundImage: MediaSchema.nullable(),
  subtitle: z.string().nullable(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  buttonText: z.string().nullable(),
  buttonLink: z.string().nullable(),
  showOverlay: z.boolean().nullable(),
});
export type BatteryStorageHeroData = z.infer<typeof BatteryStorageHeroSchema>;

export const BatteryStorageMarqueeSchema = z.object({
  __component: z.literal("battery-storage.marquee"),
  items: z.array(z.string()),
});
export type BatteryStorageMarqueeData = z.infer<typeof BatteryStorageMarqueeSchema>;

export const BatteryStorageImageCardSchema = z.object({
  id: z.number(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  image: MediaSchema.nullable(),
});
export type BatteryStorageImageCardData = z.infer<typeof BatteryStorageImageCardSchema>;

export const BatteryStorageDebsRebateSchema = z.object({
  __component: z.literal("battery-storage.debs-rebate"),
  subtitle: z.string().nullable(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  image: MediaSchema.nullable(),
  ctaText: z.string().nullable(),
  ctaLink: z.string().nullable(),
});
export type BatteryStorageDebsRebateData = z.infer<typeof BatteryStorageDebsRebateSchema>;

export const BatteryStorageJargonSchema = z.object({
  __component: z.literal("battery-storage.jargon"),
  topSubtitle: z.string().nullable(),
  title: z.string().nullable(),
  bottomSubtitle: z.string().nullable(),
  cards: z.array(BatteryStorageImageCardSchema),
});
export type BatteryStorageJargonData = z.infer<typeof BatteryStorageJargonSchema>;

export const BatteryStorageBillImpactSchema = z.object({
  __component: z.literal("battery-storage.bill-impact"),
  topSubtitle: z.string().nullable(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  cards: z.array(BatteryStorageImageCardSchema),
});
export type BatteryStorageBillImpactData = z.infer<typeof BatteryStorageBillImpactSchema>;

export const BatteryStorageRangeCardSchema = z.object({
  id: z.number(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  image: MediaSchema.nullable(),
  ctaText: z.string().nullable(),
  ctaLink: z.string().nullable(),
});
export type BatteryStorageRangeCardData = z.infer<typeof BatteryStorageRangeCardSchema>;

export const BatteryStorageRangeGridSchema = z.object({
  __component: z.literal("battery-storage.range-grid"),
  topSubtitle: z.string().nullable(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  batteries: z.array(BatteryStorageRangeCardSchema),
});
export type BatteryStorageRangeGridData = z.infer<typeof BatteryStorageRangeGridSchema>;

export const BatteryStorageSimpleCardSchema = z.object({
  id: z.number(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  isPrimary: z.boolean().nullable(),
});
export type BatteryStorageSimpleCardData = z.infer<typeof BatteryStorageSimpleCardSchema>;

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
export type BatteryStorageCapacityBlocksData = z.infer<typeof BatteryStorageCapacityBlocksSchema>;

export const BatteryStorageGreatFitSchema = z.object({
  __component: z.literal("battery-storage.great-fit"),
  topSubtitle: z.string().nullable(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  goodFitTitle: z.string().nullable(),
  goodFitItems: z.array(z.string()),
  conversationTitle: z.string().nullable(),
  conversationItems: z.array(z.string()),
});
export type BatteryStorageGreatFitData = z.infer<typeof BatteryStorageGreatFitSchema>;

export const BatteryStorageSolarMeaningSchema = z.object({
  __component: z.literal("battery-storage.solar-meaning"),
  topSubtitle: z.string().nullable(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  cards: z.array(BatteryStorageSimpleCardSchema),
});
export type BatteryStorageSolarMeaningData = z.infer<typeof BatteryStorageSolarMeaningSchema>;

export const BatteryStorageTimelineStepSchema = z.object({
  id: z.number(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  image: MediaSchema.nullable(),
});
export type BatteryStorageTimelineStepData = z.infer<typeof BatteryStorageTimelineStepSchema>;

export const BatteryStorageInstallationTimelineSchema = z.object({
  __component: z.literal("battery-storage.installation-timeline"),
  topSubtitle: z.string().nullable(),
  title: z.string().nullable(),
  steps: z.array(BatteryStorageTimelineStepSchema),
});
export type BatteryStorageInstallationTimelineData = z.infer<typeof BatteryStorageInstallationTimelineSchema>;

export const BatteryStorageTeamSchema = z.object({
  __component: z.literal("battery-storage.team"),
  topSubtitle: z.string().nullable(),
  title: z.string().nullable(),
  cards: z.array(BatteryStorageImageCardSchema),
  ctaText: z.string().nullable(),
  ctaLink: z.string().nullable(),
});
export type BatteryStorageTeamData = z.infer<typeof BatteryStorageTeamSchema>;

export const BatteryStorageStoryCardSchema = z.object({
  id: z.number(),
  quote: z.string().nullable(),
  author: z.string().nullable(),
  location: z.string().nullable(),
  image: MediaSchema.nullable(),
});
export type BatteryStorageStoryCardData = z.infer<typeof BatteryStorageStoryCardSchema>;

export const BatteryStorageCustomerStoriesSchema = z.object({
  __component: z.literal("battery-storage.customer-stories"),
  topSubtitle: z.string().nullable(),
  title: z.string().nullable(),
  stories: z.array(BatteryStorageStoryCardSchema),
});
export type BatteryStorageCustomerStoriesData = z.infer<typeof BatteryStorageCustomerStoriesSchema>;
