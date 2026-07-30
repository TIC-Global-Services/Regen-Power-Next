import { z } from "zod";
import { MediaSchema, FaqItemSchema } from "./common";

export const EvChargingHeroSchema = z.object({
  __component: z.literal("ev-charging.hero"),
  backgroundImage: MediaSchema.nullable(),
  subtitle: z.string().nullable(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  buttonText: z.string().nullable(),
  buttonLink: z.string().nullable(),
  showOverlay: z.boolean().nullable(),
});
export type EvChargingHeroData = z.infer<typeof EvChargingHeroSchema>;

export const EvChargingSpecSchema = z.object({
  id: z.number(),
  label: z.string(),
});
export type EvChargingSpecData = z.infer<typeof EvChargingSpecSchema>;

export const EvChargingWallConnectorSchema = z.object({
  __component: z.literal("ev-charging.wall-connector"),
  title: z.string().nullable(),
  subtitle: z.string().nullable(),
  description: z.string().nullable(),
  specs: z.array(EvChargingSpecSchema),
  image: MediaSchema.nullable(),
});
export type EvChargingWallConnectorData = z.infer<typeof EvChargingWallConnectorSchema>;

export const EvChargingChargerProductSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  image: MediaSchema.nullable(),
});
export type EvChargingChargerProductData = z.infer<typeof EvChargingChargerProductSchema>;

export const EvChargingBrandLogoSchema = z.object({
  id: z.number(),
  name: z.string(),
  image: MediaSchema.nullable(),
});
export type EvChargingBrandLogoData = z.infer<typeof EvChargingBrandLogoSchema>;

export const EvChargingChargerProductsSchema = z.object({
  __component: z.literal("ev-charging.charger-products"),
  subtitle: z.string().nullable(),
  title: z.string().nullable(),
  products: z.array(EvChargingChargerProductSchema),
  brands: z.array(EvChargingBrandLogoSchema),
});
export type EvChargingChargerProductsData = z.infer<typeof EvChargingChargerProductsSchema>;

export const EvChargingInstallerBrandSchema = z.object({
  id: z.number(),
  name: z.string(),
  logo: MediaSchema.nullable(),
  cardTitle: z.string().nullable(),
  description: z.string().nullable(),
  specs: z.string().nullable(),
});
export type EvChargingInstallerBrandData = z.infer<typeof EvChargingInstallerBrandSchema>;

export const EvChargingInstallerBrandsSchema = z.object({
  __component: z.literal("ev-charging.installer-brands"),
  subtitle: z.string().nullable(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  brands: z.array(EvChargingInstallerBrandSchema),
});
export type EvChargingInstallerBrandsData = z.infer<typeof EvChargingInstallerBrandsSchema>;

export const EvChargingBenefitCardSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  image: MediaSchema.nullable(),
});
export type EvChargingBenefitCardData = z.infer<typeof EvChargingBenefitCardSchema>;

export const EvChargingBenefitCardsSchema = z.object({
  __component: z.literal("ev-charging.benefit-cards"),
  title: z.string().nullable(),
  benefits: z.array(EvChargingBenefitCardSchema),
});
export type EvChargingBenefitCardsData = z.infer<typeof EvChargingBenefitCardsSchema>;

export const EvChargingParagraphSchema = z.object({
  id: z.number(),
  text: z.string(),
});
export type EvChargingParagraphData = z.infer<typeof EvChargingParagraphSchema>;

export const EvChargingBulletPointSchema = z.object({
  id: z.number(),
  text: z.string(),
});
export type EvChargingBulletPointData = z.infer<typeof EvChargingBulletPointSchema>;

export const EvChargingHomeBatterySchema = z.object({
  __component: z.literal("ev-charging.home-battery"),
  subtitle: z.string().nullable(),
  title: z.string().nullable(),
  paragraphs: z.array(EvChargingParagraphSchema),
  bulletPoints: z.array(EvChargingBulletPointSchema),
  ctaText: z.string().nullable(),
  ctaLink: z.string().nullable(),
  image: MediaSchema.nullable(),
});
export type EvChargingHomeBatteryData = z.infer<typeof EvChargingHomeBatterySchema>;

export const EvChargingFeatureCardSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  image: MediaSchema.nullable(),
});
export type EvChargingFeatureCardData = z.infer<typeof EvChargingFeatureCardSchema>;

export const EvChargingFeatureCardsSchema = z.object({
  __component: z.literal("ev-charging.feature-cards"),
  subtitle: z.string().nullable(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  cards: z.array(EvChargingFeatureCardSchema),
});
export type EvChargingFeatureCardsData = z.infer<typeof EvChargingFeatureCardsSchema>;

export const EvChargingInstallationStepSchema = z.object({
  id: z.number(),
  number: z.string(),
  title: z.string(),
  description: z.string(),
  image: MediaSchema.nullable(),
});
export type EvChargingInstallationStepData = z.infer<typeof EvChargingInstallationStepSchema>;

export const EvChargingInstallationStepsSchema = z.object({
  __component: z.literal("ev-charging.installation-steps"),
  subtitle: z.string().nullable(),
  title: z.string().nullable(),
  steps: z.array(EvChargingInstallationStepSchema),
});
export type EvChargingInstallationStepsData = z.infer<typeof EvChargingInstallationStepsSchema>;

export const EvChargingStatsSchema = z.object({
  __component: z.literal("ev-charging.stats"),
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
});
export type EvChargingStatsData = z.infer<typeof EvChargingStatsSchema>;

export const EvChargingFaqSchema = z.object({
  __component: z.literal("shared.faq"),
  title: z.string().nullable(),
  sectionTitle: z.string().nullable(),
  listTitle: z.string().nullable(),
  image: MediaSchema.nullable(),
  items: z.array(FaqItemSchema),
});
export type EvChargingFaqData = z.infer<typeof EvChargingFaqSchema>;

export const EvChargingCtaBannerSchema = z.object({
  __component: z.literal("shared.cta-banner"),
  subtitle: z.string().nullable(),
  mainTitle: z.string().nullable(),
  description: z.string().nullable(),
  buttonText: z.string().nullable(),
  buttonHref: z.string().nullable(),
  backgroundImage: MediaSchema.nullable(),
});
export type EvChargingCtaBannerData = z.infer<typeof EvChargingCtaBannerSchema>;
