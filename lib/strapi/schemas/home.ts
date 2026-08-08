import { z } from "zod";
import { MediaSchema } from "./common";

// ─── Shared primitives (home-specific) ──────────────────────────────────

/** home.award-logo — { src, alt } */
export const HomeAwardLogoSchema = z.object({
  id: z.number(),
  src: MediaSchema.nullable(),
  alt: z.string().nullable(),
});
export type HomeAwardLogoData = z.infer<typeof HomeAwardLogoSchema>;

const awardLogosField = z.array(HomeAwardLogoSchema).optional();
const _awardLogosField = awardLogosField; // keep field typed

// ─── Hero ──────────────────────────────────────────────────────────────

export const HomeHeroSchema = z.object({
  __component: z.literal("home.hero"),
  subtitle: z.string().nullable(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  buttonText: z.string().nullable(),
  buttonLink: z.string().nullable(),
  mediaType: z.enum(["image", "video"]).nullable(),
  showOverlay: z.boolean().nullable(),
  backgroundImage: MediaSchema.nullable(),
  videoFile: MediaSchema.nullable(),
  buttonTextColor: z.string().nullable(),
  subtitleColor: z.string().nullable(),
  descriptionColor: z.string().nullable(),
});
export type HomeHeroData = z.infer<typeof HomeHeroSchema>;

// ─── Awards ────────────────────────────────────────────────────────────

export const HomeAwardsSchema = z.object({
  __component: z.literal("home.awards"),
  title: z.string().nullable(),
  logos: z.array(HomeAwardLogoSchema),
});
export type HomeAwardsData = z.infer<typeof HomeAwardsSchema>;

// ─── Why Choose Us ─────────────────────────────────────────────────────

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

// ─── Expertise ─────────────────────────────────────────────────────────

export const HomeExpertiseItemSchema = z.object({
  id: z.number(),
  title: z.string(),
  image: MediaSchema.nullable(),
  icon: MediaSchema.nullable(),
  textColor: z.string().nullable(),
});
export type HomeExpertiseItemData = z.infer<typeof HomeExpertiseItemSchema>;

export const HomeExpertiseSchema = z.object({
  __component: z.literal("home.expertise"),
  subtitle: z.string().nullable(),
  accentTitle: z.string().nullable(),
  bgImage: MediaSchema.nullable(),
  items: z.array(HomeExpertiseItemSchema),
});
export type HomeExpertiseData = z.infer<typeof HomeExpertiseSchema>;

// ─── Solar & Storage (FeatureExplorer) ────────────────────────────────

export const HomeFeatureItemSchema = z.object({
  id: z.number(),
  number: z.string().nullable(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  mediaType: z.enum(["image", "video"]).nullable(),
  mediaSrc: MediaSchema.nullable(),
});
export type HomeFeatureItemData = z.infer<typeof HomeFeatureItemSchema>;

export const HomeSolarAndStorageSchema = z.object({
  __component: z.literal("home.solarandstorage"),
  titleNormal: z.string().nullable(),
  titleAccent: z.string().nullable(),
  features: z.array(HomeFeatureItemSchema),
});
export type HomeSolarAndStorageData = z.infer<typeof HomeSolarAndStorageSchema>;

// ─── Partners & Memberships ────────────────────────────────────────────

export const HomeLogoItemSchema = z.object({
  id: z.number(),
  name: z.string().nullable(),
  image: MediaSchema.nullable(),
});
export type HomeLogoItemData = z.infer<typeof HomeLogoItemSchema>;

export const HomePartnersAndMembershipSchema = z.object({
  __component: z.literal("home.patnersandmembership"),
  subtitle: z.string().nullable(),
  title: z.string().nullable(),
  partnersTitle: z.string().nullable(),
  partners: z.array(HomeLogoItemSchema),
  membershipsTitle: z.string().nullable(),
  memberships: z.array(HomeLogoItemSchema),
});
export type HomePartnersAndMembershipData = z.infer<
  typeof HomePartnersAndMembershipSchema
>;

// ─── Three Ways To Pay ─────────────────────────────────────────────────

export const HomeFinancingCardSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string().nullable(),
  image: MediaSchema.nullable(),
  ctaText: z.string().nullable(),
});
export type HomeFinancingCardData = z.infer<typeof HomeFinancingCardSchema>;

export const HomeThreeWaysToPaySchema = z.object({
  __component: z.literal("home.threewaystopay"),
  subtitle: z.string().nullable(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  cards: z.array(HomeFinancingCardSchema),
});
export type HomeThreeWaysToPayData = z.infer<typeof HomeThreeWaysToPaySchema>;

// ─── Craftsmanship ─────────────────────────────────────────────────────

export const HomeBrandLogoSchema = z.object({
  id: z.number(),
  name: z.string().nullable(),
  src: MediaSchema.nullable(),
});
export type HomeBrandLogoData = z.infer<typeof HomeBrandLogoSchema>;

export const HomeBrandCategorySchema = z.object({
  id: z.number(),
  label: z.string().nullable(),
  logos: z.array(HomeBrandLogoSchema),
});
export type HomeBrandCategoryData = z.infer<typeof HomeBrandCategorySchema>;

export const HomeCraftmanshipSchema = z.object({
  __component: z.literal("home.craftmanship"),
  subtitle: z.string().nullable(),
  title: z.string().nullable(),
  defaultTabId: z.string().nullable(),
  categories: z.array(HomeBrandCategorySchema),
});
export type HomeCraftmanshipData = z.infer<typeof HomeCraftmanshipSchema>;

// ─── Real Stories ──────────────────────────────────────────────────────

export const HomeBadgeItemSchema = z.object({
  id: z.number(),
  alt: z.string().nullable(),
  src: MediaSchema.nullable(),
});
export type HomeBadgeItemData = z.infer<typeof HomeBadgeItemSchema>;

export const HomeReviewSchema = z.object({
  id: z.number(),
  systemTitle: z.string().nullable(),
  quote: z.string().nullable(),
  rating: z.number().nullable(),
  author: z.string().nullable(),
  location: z.string().nullable(),
});
export type HomeReviewData = z.infer<typeof HomeReviewSchema>;

export const HomeRealStoriesSchema = z.object({
  __component: z.literal("home.real-stories"),
  subtitle: z.string().nullable(),
  title: z.string().nullable(),
  googleLogo: MediaSchema.nullable(),
  badges: z.array(HomeBadgeItemSchema),
  reviews: z.array(HomeReviewSchema),
});
export type HomeRealStoriesData = z.infer<typeof HomeRealStoriesSchema>;

// ─── Smart Solar (FeatureCardGrid) ─────────────────────────────────────

export const HomeSmartSolarCardSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string().nullable(),
  image: MediaSchema.nullable(),
  textPosition: z.enum(["top", "bottom"]).nullable(),
  footerTitle: z.string().nullable(),
  footerDescription: z.string().nullable(),
});
export type HomeSmartSolarCardData = z.infer<typeof HomeSmartSolarCardSchema>;

export const HomeSmartSolarSchema = z.object({
  __component: z.literal("home.smartsolar"),
  topSubtitle: z.string().nullable(),
  title: z.string().nullable(),
  bottomSubtitle: z.string().nullable(),
  cards: z.array(HomeSmartSolarCardSchema),
});
export type HomeSmartSolarData = z.infer<typeof HomeSmartSolarSchema>;

// ─── Battery Quote ─────────────────────────────────────────────────────

export const HomeBatteryQuoteSchema = z.object({
  __component: z.literal("home.battery-quote"),
  subtitle: z.string().nullable(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  image: MediaSchema.nullable(),
});
export type HomeBatteryQuoteData = z.infer<typeof HomeBatteryQuoteSchema>;