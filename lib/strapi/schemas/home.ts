import { z } from "zod";
import { MediaSchema } from "./common";

// ─── Sub-component schemas ───────────────────────────────────────────────────

export const HomeExpertiseCardSchema = z.object({
  id: z.number(),
  title: z.string(),
  image: MediaSchema.nullable(),
  icon: MediaSchema.nullable(),
  textColor: z.string().nullable(),
});
export type HomeExpertiseCardData = z.infer<typeof HomeExpertiseCardSchema>;

export const HomeFeatureItemSchema = z.object({
  id: z.number(),
  number: z.string(),
  title: z.string(),
  description: z.string(),
  image: MediaSchema.nullable().optional(),
});
export type HomeFeatureItemData = z.infer<typeof HomeFeatureItemSchema>;

export const HomeLogoItemSchema = z.object({
  id: z.number(),
  name: z.string(),
  image: MediaSchema.nullable(),
});
export type HomeLogoItemData = z.infer<typeof HomeLogoItemSchema>;

export const HomeFinancingCardSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  image: MediaSchema.nullable(),
  ctaText: z.string().nullable(),
});
export type HomeFinancingCardData = z.infer<typeof HomeFinancingCardSchema>;

export const HomeBrandLogoSchema = z.object({
  id: z.number(),
  name: z.string(),
  image: MediaSchema.nullable(),
});
export type HomeBrandLogoData = z.infer<typeof HomeBrandLogoSchema>;

export const HomeBrandCategorySchema = z.object({
  id: z.number(),
  label: z.string(),
  logos: z.array(HomeBrandLogoSchema),
});
export type HomeBrandCategoryData = z.infer<typeof HomeBrandCategorySchema>;

export const HomeBadgeItemSchema = z.object({
  id: z.number(),
  alt: z.string().nullable(),
  image: MediaSchema.nullable(),
});
export type HomeBadgeItemData = z.infer<typeof HomeBadgeItemSchema>;

// ─── Section schemas ─────────────────────────────────────────────────────────

export const HomeHeroSchema = z.object({
  __component: z.literal("home.hero"),
  backgroundImage: MediaSchema.nullable(),
  videoFile: MediaSchema.nullable(),
  mediaType: z.string().nullable(),
  subtitle: z.string().nullable(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  buttonText: z.string().nullable(),
  buttonLink: z.string().nullable(),
  buttonTextColor: z.string().nullable(),
  subtitleColor: z.string().nullable(),
  descriptionColor: z.string().nullable(),
  showOverlay: z.boolean().nullable(),
});
export type HomeHeroData = z.infer<typeof HomeHeroSchema>;

export const HomeAwardsSchema = z.object({
  __component: z.literal("home.awards"),
  title: z.string().nullable(),
  logos: z.array(z.object({
    id: z.number(),
    title: z.string().nullable(),
    image: z.array(MediaSchema).nullable(),
  })),
});
export type HomeAwardsData = z.infer<typeof HomeAwardsSchema>;

export const HomeWhyChooseUsSchema = z.object({
  __component: z.literal("home.whychooseus"),
  subtitle: z.string().nullable(),
  title: z.string().nullable(),
  awardWinnerCount: z.number().nullable(),
  awardWinnerTitle: z.string().nullable(),
  awardWinnerBg: MediaSchema.nullable(),
  awardWinnerLogo: MediaSchema.nullable(),
  batteryInstallationsCount: z.number().nullable(),
  batteryInstallationsLabel: z.string().nullable(),
  solarInstallationsCount: z.number().nullable(),
  solarInstallationsLabel: z.string().nullable(),
  yearsInBusinessCount: z.number().nullable(),
  yearsInBusinessDescription: z.string().nullable(),
  yearsInBusinessBg: MediaSchema.nullable(),
  ratingScore: z.number().nullable(),
  ratingPlatformLabel: z.string().nullable(),
  ratingBg: MediaSchema.nullable(),
});
export type HomeWhyChooseUsData = z.infer<typeof HomeWhyChooseUsSchema>;

export const HomeExpertiseSchema = z.object({
  __component: z.literal("home.expertise"),
  subtitle: z.string().nullable(),
  accentTitle: z.string().nullable(),
  bgImage: MediaSchema.nullable(),
  items: z.array(HomeExpertiseCardSchema),
});
export type HomeExpertiseData = z.infer<typeof HomeExpertiseSchema>;

export const HomeSolarAndStorageSchema = z.object({
  __component: z.literal("home.solarandstorage"),
  titleNormal: z.string().nullable(),
  titleAccent: z.string().nullable(),
  media: MediaSchema.nullable(),
  features: z.array(HomeFeatureItemSchema),
});
export type HomeSolarAndStorageData = z.infer<typeof HomeSolarAndStorageSchema>;

export const HomePartnersAndMembershipSchema = z.object({
  __component: z.literal("home.patnersandmembership"),
  subtitle: z.string().nullable(),
  title: z.string().nullable(),
  partnersTitle: z.string().nullable(),
  partners: z.array(HomeLogoItemSchema),
  membershipsTitle: z.string().nullable(),
  memberships: z.array(HomeLogoItemSchema),
});
export type HomePartnersAndMembershipData = z.infer<typeof HomePartnersAndMembershipSchema>;

export const HomeThreeWaysToPaySchema = z.object({
  __component: z.literal("home.threewaystopay"),
  subtitle: z.string().nullable(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  cards: z.array(HomeFinancingCardSchema),
});
export type HomeThreeWaysToPayData = z.infer<typeof HomeThreeWaysToPaySchema>;

export const HomeCraftsmanshipSchema = z.object({
  __component: z.literal("home.craftmanship"),
  subtitle: z.string().nullable(),
  title: z.string().nullable(),
  defaultTabId: z.string().nullable(),
  categories: z.array(HomeBrandCategorySchema),
});
export type HomeCraftsmanshipData = z.infer<typeof HomeCraftsmanshipSchema>;

export const HomeRealStoriesSchema = z.object({
  __component: z.literal("home.real-stories"),
  subtitle: z.string().nullable(),
  title: z.string().nullable(),
  googleLogo: MediaSchema.nullable(),
  badges: z.array(HomeBadgeItemSchema),
  reviews: z.array(z.object({
    id: z.number(),
    title: z.string().nullable(),
    review: z.string().nullable(),
    rating: z.number().nullable(),
    author: z.string().nullable(),
    location: z.string().nullable(),
  })),
});
export type HomeRealStoriesData = z.infer<typeof HomeRealStoriesSchema>;

export const HomeSmartSolarSchema = z.object({
  __component: z.literal("home.smartsolar"),
  topSubtitle: z.string().nullable(),
  title: z.string().nullable(),
  bottomSubtitle: z.string().nullable(),
  cards: z.array(z.object({
    id: z.number(),
    title: z.string(),
    description: z.string(),
    image: MediaSchema.nullable(),
    textPosition: z.string().nullable(),
    footerTitle: z.string().nullable(),
    footerDescription: z.string().nullable(),
  })),
});
export type HomeSmartSolarData = z.infer<typeof HomeSmartSolarSchema>;

export const HomeBatteryQuoteSchema = z.object({
  __component: z.literal("home.battery-quote"),
  subtitle: z.string().nullable(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  image: MediaSchema.nullable(),
});
export type HomeBatteryQuoteData = z.infer<typeof HomeBatteryQuoteSchema>;
