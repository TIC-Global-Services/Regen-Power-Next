import { z } from "zod";
import { MediaSchema } from "./common";

// ─── Hero ───────────────────────────────────────────────────────────────

export const PromotionHeroPackageSchema = z.object({
  id: z.number(),
  capacity: z.string().nullable(),
  name: z.string().nullable().optional(),
  originalPrice: z.number().nullable(),
  finalPrice: z.number().nullable(),
  stateRebate: z.number().nullable(),
  federalRebate: z.number().nullable(),
  isFullyInstalled: z.boolean().nullable(),
  priceNote: z.string().nullable(),
  pricingNote: z.string().nullable().optional(),
  installationText: z.string().nullable().optional(),
  rebates: z
    .array(z.object({ id: z.number(), label: z.string().nullable(), amount: z.number().nullable() }))
    .nullable()
    .optional(),
  image: MediaSchema.nullable(),
});
export type PromotionHeroPackageData = z.infer<typeof PromotionHeroPackageSchema>;

export const PromotionHeroSidebarSchema = z.object({
  id: z.number(),
  title: z.string().nullable(),
  subtitle: z.string().nullable(),
  paragraphs: z.array(z.union([z.string(), z.object({ text: z.string() })])).nullable().optional(),
  ctaText: z.string().nullable(),
  ctaLink: z.string().nullable(),
});
export type PromotionHeroSidebarData = z.infer<typeof PromotionHeroSidebarSchema>;

export const PromotionHeroSchema = z.object({
  __component: z.literal("promotion.hero"),
  title: z.string().nullable(),
  subtitle: z.string().nullable(),
  backgroundImage: MediaSchema.nullable(),
  batteryImage: MediaSchema.nullable(),
  packages: z.array(PromotionHeroPackageSchema).nullable(),
  sidebar: PromotionHeroSidebarSchema.nullable(),
  highlightPrefix: z.string().nullable(),
  highlightValue: z.string().nullable(),
  highlightSuffix: z.string().nullable(),
  description: z.string().nullable(),
  ctaLabel: z.string().nullable(),
  ctaLink: z.string().nullable(),
});
export type PromotionHeroData = z.infer<typeof PromotionHeroSchema>;

// ─── Limited Spots ──────────────────────────────────────────────────────

export const PromotionNestedCardSchema = z.object({
  id: z.number(),
  type: z.enum(["logo", "image", "empty"]).nullable(),
  logo: MediaSchema.nullable(),
  image: MediaSchema.nullable(),
  logoPath: MediaSchema.nullable().optional(),
  imagePath: MediaSchema.nullable().optional(),
  showBadge: z.boolean().nullable(),
});
export type PromotionNestedCardData = z.infer<typeof PromotionNestedCardSchema>;

export const PromotionLimitedSpotCardSchema = z.object({
  id: z.number(),
  type: z.string().nullable(),
  value: z.string().nullable(),
  title: z.string().nullable(),
  bgImage: MediaSchema.nullable(),
  icon: MediaSchema.nullable(),
  logoPath: MediaSchema.nullable().optional(),
  imagePath: MediaSchema.nullable().optional(),
  showBadge: z.boolean().nullable(),
  nestedCard: PromotionNestedCardSchema.nullable(),
});
export type PromotionLimitedSpotCardData = z.infer<typeof PromotionLimitedSpotCardSchema>;

export const PromotionLimitedSpotsSchema = z.object({
  __component: z.literal("promotion.limited-spots"),
  title: z.string().nullable(),
  titleGreen: z.string().nullable(),
  cards: z.array(PromotionLimitedSpotCardSchema).nullable(),
  ctaText: z.string().nullable(),
  ctaLink: z.string().nullable(),
});
export type PromotionLimitedSpotsData = z.infer<typeof PromotionLimitedSpotsSchema>;

// ─── Trust Regen ────────────────────────────────────────────────────────

export const PromotionTrustFeatureSchema = z.object({
  id: z.number(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  icon: MediaSchema.nullable(),
});
export type PromotionTrustFeatureData = z.infer<typeof PromotionTrustFeatureSchema>;

export const PromotionTrustRegenSchema = z.object({
  __component: z.literal("promotion.trust-regen"),
  title: z.string().nullable(),
  subtitle: z.string().nullable(),
  features: z.array(PromotionTrustFeatureSchema).nullable(),
});
export type PromotionTrustRegenData = z.infer<typeof PromotionTrustRegenSchema>;

// ─── Free Quotation ─────────────────────────────────────────────────────

export const PromotionFreeQuotationSchema = z.object({
  __component: z.literal("promotion.free-quotation"),
  title: z.string().nullable(),
  noticeText: z.string().nullable(),
  noticeHighlight: z.string().nullable(),
  videoThumbnail: MediaSchema.nullable(),
  videoUrl: z.string().nullable(),
  buttonText: z.string().nullable(),
  buttonLink: z.string().nullable(),
});
export type PromotionFreeQuotationData = z.infer<typeof PromotionFreeQuotationSchema>;

// ─── Battery Rebates ────────────────────────────────────────────────────

export const PromotionRebateRowSchema = z.object({
  id: z.number(),
  title: z.string().nullable(),
  description: z.string().nullable(),
});
export type PromotionRebateRowData = z.infer<typeof PromotionRebateRowSchema>;

export const PromotionRebatePanelSchema = z.object({
  id: z.number(),
  rows: z.array(PromotionRebateRowSchema).nullable(),
});
export type PromotionRebatePanelData = z.infer<typeof PromotionRebatePanelSchema>;

export const PromotionBatteryRebatesSchema = z.object({
  __component: z.literal("promotion.battery-rebates"),
  title: z.string().nullable(),
  subtitle: z.string().nullable(),
  bgImage: MediaSchema.nullable(),
  panels: z.array(PromotionRebatePanelSchema).nullable(),
});
export type PromotionBatteryRebatesData = z.infer<typeof PromotionBatteryRebatesSchema>;

// ─── Trusted Brands ─────────────────────────────────────────────────────

export const PromotionBrandLogoSchema = z.object({
  id: z.number(),
  name: z.string().nullable(),
  logo: MediaSchema.nullable(),
});
export type PromotionBrandLogoData = z.infer<typeof PromotionBrandLogoSchema>;

export const PromotionBatteryCardSchema = z.object({
  id: z.number(),
  name: z.string().nullable(),
  image: MediaSchema.nullable(),
  logo: MediaSchema.nullable(),
});
export type PromotionBatteryCardData = z.infer<typeof PromotionBatteryCardSchema>;

export const PromotionTrustedBrandsSchema = z.object({
  __component: z.literal("promotion.trusted-brands"),
  title: z.string().nullable(),
  subtitle: z.string().nullable(),
  description: z.string().nullable(),
  titleGreen: z.string().nullable(),
  brands: z.array(PromotionBrandLogoSchema).nullable(),
  batteries: z.array(PromotionBatteryCardSchema).nullable(),
});
export type PromotionTrustedBrandsData = z.infer<typeof PromotionTrustedBrandsSchema>;

// ─── High Energy ────────────────────────────────────────────────────────

export const PromotionBadgeLogoSchema = z.object({
  id: z.number(),
  name: z.string().nullable(),
  logo: MediaSchema.nullable(),
  logoPath: MediaSchema.nullable().optional(),
});
export type PromotionBadgeLogoData = z.infer<typeof PromotionBadgeLogoSchema>;

export const PromotionHighEnergySchema = z.object({
  __component: z.literal("promotion.high-energy"),
  title: z.string().nullable(),
  bullets: z.array(z.union([z.string(), z.object({ text: z.string() })])).nullable().optional(),
  badges: z.array(PromotionBadgeLogoSchema).nullable(),
});
export type PromotionHighEnergyData = z.infer<typeof PromotionHighEnergySchema>;

// ─── Battery Package ────────────────────────────────────────────────────

export const PromotionRebateItemSchema = z.object({
  id: z.number(),
  label: z.string().nullable(),
  amount: z.number().nullable(),
});
export type PromotionRebateItemData = z.infer<typeof PromotionRebateItemSchema>;

export const PromotionBatteryPackageItemSchema = z.object({
  id: z.number(),
  name: z.string().nullable(),
  capacity: z.string().nullable(),
  originalPrice: z.number().nullable(),
  finalPrice: z.number().nullable(),
  stateRebate: z.number().nullable(),
  federalRebate: z.number().nullable(),
  rebates: z.array(PromotionRebateItemSchema).nullable().optional(),
  installationText: z.string().nullable(),
  isFullyInstalled: z.boolean().nullable(),
  pricingNote: z.string().nullable(),
  priceNote: z.string().nullable().optional(),
  image: MediaSchema.nullable(),
});
export type PromotionBatteryPackageItemData = z.infer<typeof PromotionBatteryPackageItemSchema>;

export const PromotionBatteryPackageSchema = z.object({
  __component: z.literal("promotion.battery-package"),
  title: z.string().nullable(),
  centerImage: MediaSchema.nullable(),
  centerImageAlt: z.string().nullable(),
  packages: z.array(PromotionBatteryPackageItemSchema).nullable(),
});
export type PromotionBatteryPackageData = z.infer<typeof PromotionBatteryPackageSchema>;

// ─── Ready To Begin ─────────────────────────────────────────────────────

export const PromotionContactDataSchema = z.object({
  id: z.number(),
  title: z.string().nullable(),
  value: z.string().nullable(),
});
export type PromotionContactDataData = z.infer<typeof PromotionContactDataSchema>;

export const PromotionSocialItemSchema = z.object({
  id: z.number(),
  name: z.string().nullable(),
  link: z.string().nullable(),
  url: z.string().nullable().optional(),
});
export type PromotionSocialItemData = z.infer<typeof PromotionSocialItemSchema>;

export const PromotionContactDetailsSchema = z.object({
  id: z.number(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  data: z.array(PromotionContactDataSchema).nullable(),
  socials: z.array(PromotionSocialItemSchema).nullable(),
});
export type PromotionContactDetailsData = z.infer<typeof PromotionContactDetailsSchema>;

export const PromotionReadyToBeginSchema = z.object({
  __component: z.literal("promotion.ready-to-begin"),
  title: z.string().nullable(),
  subtitle: z.string().nullable().optional(),
  noticeText: z.string().nullable(),
  noticeHighlight: z.string().nullable(),
  contactDetails: PromotionContactDetailsSchema.nullable(),
  buttonText: z.string().nullable(),
  buttonLink: z.string().nullable(),
});
export type PromotionReadyToBeginData = z.infer<typeof PromotionReadyToBeginSchema>;

// ─── Solar Financing ────────────────────────────────────────────────────

export const PromotionFinancingGridItemSchema = z.object({
  id: z.number(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  icon: MediaSchema.nullable(),
});
export type PromotionFinancingGridItemData = z.infer<typeof PromotionFinancingGridItemSchema>;

export const PromotionSolarFinancingSchema = z.object({
  __component: z.literal("promotion.solar-financing"),
  title: z.string().nullable(),
  subtitle: z.string().nullable(),
  leftBoxTitle: z.string().nullable(),
  leftBoxText: z.string().nullable(),
  leftBoxIcon: z.string().nullable(),
  bgImage: MediaSchema.nullable(),
  gridItems: z.array(PromotionFinancingGridItemSchema).nullable(),
});
export type PromotionSolarFinancingData = z.infer<typeof PromotionSolarFinancingSchema>;

// ─── About Regen ────────────────────────────────────────────────────────

export const PromotionAboutRegenSchema = z.object({
  __component: z.literal("promotion.about-regen"),
  title: z.string().nullable(),
  subtitle: z.string().nullable(),
  paragraphs: z.string().nullable(),
  image: MediaSchema.nullable(),
  videoUrl: z.string().nullable(),
});
export type PromotionAboutRegenData = z.infer<typeof PromotionAboutRegenSchema>;

// ─── Find Out Why ───────────────────────────────────────────────────────

export const PromotionAwardItemSchema = z.object({
  id: z.number(),
  name: z.string().nullable().optional(),
  title: z.string().nullable().optional(),
  image: MediaSchema.nullable(),
  description: z.string().nullable(),
});
export type PromotionAwardItemData = z.infer<typeof PromotionAwardItemSchema>;

export const PromotionFindOutWhyReviewSchema = z.object({
  id: z.number(),
  author: z.string().nullable(),
  review: z.string().nullable(),
  rating: z.number().nullable(),
});
export type PromotionFindOutWhyReviewData = z.infer<typeof PromotionFindOutWhyReviewSchema>;

export const PromotionFindOutWhySchema = z.object({
  __component: z.literal("promotion.find-out-why"),
  title: z.string().nullable(),
  subtitle: z.string().nullable(),
  description: z.string().nullable(),
  awards: z.array(PromotionAwardItemSchema).nullable(),
  reviews: z.array(PromotionFindOutWhyReviewSchema).nullable(),
});
export type PromotionFindOutWhyData = z.infer<typeof PromotionFindOutWhySchema>;

// ─── Achievements ───────────────────────────────────────────────────────

export const PromotionRecognitionSectionSchema = z.object({
  id: z.number(),
  title: z.string().nullable(),
  awards: z.array(PromotionAwardItemSchema).nullable(),
});
export type PromotionRecognitionSectionData = z.infer<typeof PromotionRecognitionSectionSchema>;

export const PromotionAchievementsSchema = z.object({
  __component: z.literal("promotion.achievements"),
  title: z.string().nullable(),
  subtitle: z.string().nullable(),
  description: z.string().nullable(),
  awards: z.array(PromotionAwardItemSchema).nullable(),
  recognitions: z.array(PromotionRecognitionSectionSchema).nullable(),
});
export type PromotionAchievementsData = z.infer<typeof PromotionAchievementsSchema>;

export const PromotionIndustryRecognitionSchema = z.object({
  __component: z.literal("promotion.industry-recognition"),
  recognitions: z.array(PromotionRecognitionSectionSchema).nullable(),
  variant: z.enum(["single", "grid"]).nullable(),
});
export type PromotionIndustryRecognitionData = z.infer<typeof PromotionIndustryRecognitionSchema>;

// ─── FAQ ────────────────────────────────────────────────────────────────

export const PromotionFaqHighlightSchema = z.object({
  id: z.number(),
  question: z.string().nullable(),
  answer: z.string().nullable(),
  bulletPoints: z.array(z.union([z.string(), z.object({ text: z.string() })])).nullable().optional(),
});
export type PromotionFaqHighlightData = z.infer<typeof PromotionFaqHighlightSchema>;

export const PromotionFaqItemSchema = z.object({
  id: z.number(),
  question: z.string(),
  answer: z.string(),
  bulletPoints: z.array(z.union([z.string(), z.object({ text: z.string() })])).nullable().optional(),
});
export type PromotionFaqItemData = z.infer<typeof PromotionFaqItemSchema>;

export const PromotionFaqHighlightCardSchema = z.object({
  id: z.number(),
  title: z.string().nullable(),
  bgImage: MediaSchema.nullable(),
  items: z.array(PromotionFaqHighlightSchema).nullable(),
  ctaText: z.string().nullable(),
  ctaLink: z.string().nullable(),
});
export type PromotionFaqHighlightCardData = z.infer<typeof PromotionFaqHighlightCardSchema>;

export const PromotionFaqSectionSchema = z.object({
  __component: z.literal("promotion.faq-section"),
  title: z.string().nullable(),
  subtitle: z.string().nullable(),
  description: z.string().nullable(),
  highlightCard: PromotionFaqHighlightCardSchema.nullable(),
  faqItems: z.array(PromotionFaqItemSchema).nullable(),
});
export type PromotionFaqSectionData = z.infer<typeof PromotionFaqSectionSchema>;

// ─── Mobile-only fallbacks (if editor creates them explicitly) ──────────

export const PromotionAwardsSectionSchema = z.object({
  __component: z.literal("promotion.awards-section"),
  awards: z.array(PromotionAwardItemSchema).nullable(),
});
export type PromotionAwardsSectionData = z.infer<typeof PromotionAwardsSectionSchema>;

export const PromotionBatteryPricingSchema = z.object({
  __component: z.literal("promotion.battery-pricing"),
  title: z.string().nullable(),
  backgroundImage: MediaSchema.nullable(),
  centerImage: MediaSchema.nullable(),
  items: z.array(z.object({ id: z.number(), title: z.string().nullable(), sections: z.unknown().nullable() })).nullable(),
});
export type PromotionBatteryPricingData = z.infer<typeof PromotionBatteryPricingSchema>;

export const PromotionContactInfoSchema = z.object({
  __component: z.literal("promotion.contact-info"),
  title: z.string().nullable(),
  description: z.string().nullable(),
  items: z.unknown().nullable(),
  socials: z.unknown().nullable(),
});
export type PromotionContactInfoData = z.infer<typeof PromotionContactInfoSchema>;
