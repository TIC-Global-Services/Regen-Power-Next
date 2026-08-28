import { z } from "zod";
import { MediaSchema } from "./common";

// ─── Shared primitives ──────────────────────────────────────────────────

/** ev-charging.spec — single `label` */
export const EvChargingSpecSchema = z.object({
  id: z.number(),
  label: z.string(),
});
export type EvChargingSpecData = z.infer<typeof EvChargingSpecSchema>;

/** ev-charging.paragraph — single `text` */
export const EvChargingParagraphSchema = z.object({
  id: z.number(),
  text: z.string(),
});
export type EvChargingParagraphData = z.infer<
  typeof EvChargingParagraphSchema
>;

/** ev-charging.bullet-point — single `text` */
export const EvChargingBulletPointSchema = z.object({
  id: z.number(),
  text: z.string(),
});
export type EvChargingBulletPointData = z.infer<
  typeof EvChargingBulletPointSchema
>;

// ─── Hero ──────────────────────────────────────────────────────────────

export const EvChargingHeroSchema = z.object({
  __component: z.literal("ev-charging.hero"),
  subtitle: z.string().nullable(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  backgroundImage: MediaSchema.nullable(),
  buttonText: z.string().nullable(),
  buttonLink: z.string().nullable(),
  showOverlay: z.boolean().nullable(),
});
export type EvChargingHeroData = z.infer<typeof EvChargingHeroSchema>;

// ─── Wall Connector ───────────────────────────────────────────────────

export const EvChargingWallConnectorSchema = z.object({
  __component: z.literal("ev-charging.wall-connector"),
  title: z.string().nullable(),
  subtitle: z.string().nullable(),
  description: z.string().nullable(),
  specs: z.array(EvChargingSpecSchema),
  image: MediaSchema.nullable(),
});
export type EvChargingWallConnectorData = z.infer<
  typeof EvChargingWallConnectorSchema
>;

// ─── Charger Products ─────────────────────────────────────────────────

export const EvChargingChargerProductSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  image: MediaSchema.nullable(),
});
export type EvChargingChargerProductData = z.infer<
  typeof EvChargingChargerProductSchema
>;

export const EvChargingChargerProductsSchema = z.object({
  __component: z.literal("ev-charging.charger-products"),
  subtitle: z.string().nullable(),
  title: z.string().nullable(),
  products: z.array(EvChargingChargerProductSchema),
});
export type EvChargingChargerProductsData = z.infer<
  typeof EvChargingChargerProductsSchema
>;

// ─── Installer Brands ────────────────────────────────────────────────

export const EvChargingInstallerBrandSchema = z.object({
  id: z.number(),
  name: z.string(),
  logo: MediaSchema.nullable(),
  cardTitle: z.string().nullable(),
  description: z.string().nullable(),
  specs: z.string().nullable(),
});
export type EvChargingInstallerBrandData = z.infer<
  typeof EvChargingInstallerBrandSchema
>;

export const EvChargingInstallerBrandsSchema = z.object({
  __component: z.literal("ev-charging.installer-brands"),
  subtitle: z.string().nullable(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  brands: z.array(EvChargingInstallerBrandSchema),
});
export type EvChargingInstallerBrandsData = z.infer<
  typeof EvChargingInstallerBrandsSchema
>;

// ─── Benefit Cards ───────────────────────────────────────────────────

export const EvChargingBenefitSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string().nullable(),
  image: MediaSchema.nullable(),
});
export type EvChargingBenefitData = z.infer<
  typeof EvChargingBenefitSchema
>;

export const EvChargingBenefitCardsSchema = z.object({
  __component: z.literal("ev-charging.benefit-cards"),
  title: z.string().nullable(),
  benefits: z.array(EvChargingBenefitSchema),
});
export type EvChargingBenefitCardsData = z.infer<
  typeof EvChargingBenefitCardsSchema
>;

// ─── Home Battery ───────────────────────────────────────────────────

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
export type EvChargingHomeBatteryData = z.infer<
  typeof EvChargingHomeBatterySchema
>;

// ─── Feature Cards (Under One Roof) ─────────────────────────────────

export const EvChargingFeatureCardSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string().nullable(),
  image: MediaSchema.nullable(),
});
export type EvChargingFeatureCardData = z.infer<
  typeof EvChargingFeatureCardSchema
>;

export const EvChargingFeatureCardsSchema = z.object({
  __component: z.literal("ev-charging.feature-cards"),
  subtitle: z.string().nullable(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  cards: z.array(EvChargingFeatureCardSchema),
});
export type EvChargingFeatureCardsData = z.infer<
  typeof EvChargingFeatureCardsSchema
>;

// ─── Installation Steps ──────────────────────────────────────────────

export const EvChargingInstallationStepSchema = z.object({
  id: z.number(),
  number: z.string(),
  title: z.string(),
  description: z.string(),
  image: MediaSchema.nullable(),
});
export type EvChargingInstallationStepData = z.infer<
  typeof EvChargingInstallationStepSchema
>;

export const EvChargingInstallationStepsSchema = z.object({
  __component: z.literal("ev-charging.installation-steps"),
  subtitle: z.string().nullable(),
  title: z.string().nullable(),
  steps: z.array(EvChargingInstallationStepSchema),
});
export type EvChargingInstallationStepsData = z.infer<
  typeof EvChargingInstallationStepsSchema
>;

// ─── Stats (Why Choose Us) — title/description/image/counterValue/counterSuffix ─

export const EvChargingWhyChooseCardSchema = z.object({
  id: z.number(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  image: MediaSchema.nullable(),
  counterValue: z.number().nullable(),
  counterSuffix: z.string().nullable(),
});
export type EvChargingWhyChooseCardData = z.infer<
  typeof EvChargingWhyChooseCardSchema
>;

export const EvChargingStatsSchema = z.object({
  __component: z.literal("ev-charging.stats"),
  headerSubtitle: z.string().nullable(),
  headerTitle: z.string().nullable(),
  cards: z.array(EvChargingWhyChooseCardSchema),
});
export type EvChargingStatsData = z.infer<typeof EvChargingStatsSchema>;
