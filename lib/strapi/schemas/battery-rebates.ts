import { z } from "zod";
import { MediaSchema } from "./common";

// ─── Shared primitives ──────────────────────────────────────────────────

/** battery-rebates.list-item — single `text` field */
export const BatteryRebatesListItemSchema = z.object({
  id: z.number(),
  text: z.string(),
});
export type BatteryRebatesListItemData = z.infer<
  typeof BatteryRebatesListItemSchema
>;

// ─── Hero ───────────────────────────────────────────────────────────────

export const BatteryRebatesHeroSchema = z.object({
  __component: z.literal("battery-rebates.hero"),
  subtitle: z.string().nullable(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  ctaText: z.string().nullable(),
  ctaLink: z.string().nullable(),
  showOverlay: z.boolean().nullable(),
  backgroundImage: MediaSchema.nullable(),
});
export type BatteryRebatesHeroData = z.infer<
  typeof BatteryRebatesHeroSchema
>;

// ─── Rebates Stack Grid ─────────────────────────────────────────────────

export const RebatesStackCardSchema = z.object({
  id: z.number(),
  title: z.string(),
  items: z.array(BatteryRebatesListItemSchema),
});

export const RebatesStackGridSchema = z.object({
  __component: z.literal("battery-rebates.rebates-stack-grid"),
  title: z.string().nullable(),
  subtitle: z.string().nullable(),
  cards: z.array(RebatesStackCardSchema),
});
export type RebatesStackGridData = z.infer<typeof RebatesStackGridSchema>;

// ─── Residential Battery ────────────────────────────────────────────────

export const ResidentialBatterySchema = z.object({
  __component: z.literal("battery-rebates.residential-battery"),
  subtitle: z.string().nullable(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  listItems: z.array(BatteryRebatesListItemSchema),
  timingText: z.string().nullable(),
  taxText: z.string().nullable(),
  image: MediaSchema.nullable(),
});
export type ResidentialBatteryData = z.infer<typeof ResidentialBatterySchema>;

// ─── Federal Rebate ─────────────────────────────────────────────────────

export const FederalRebateSchema = z.object({
  __component: z.literal("battery-rebates.federal-rebate"),
  sectionSubtitle: z.string().nullable(),
  sectionTitle: z.string().nullable(),
  sectionDescription: z.string().nullable(),
  keySpecsTitle: z.string().nullable(),
  keySpecsBulletPoints: z.array(BatteryRebatesListItemSchema),
  firstImage: MediaSchema.nullable(),
  eligibleCapacityTitle: z.string().nullable(),
  eligibleCapacityText: z.string().nullable(),
  importantNoteTitle: z.string().nullable(),
  importantNoteText: z.string().nullable(),
  secondImage: MediaSchema.nullable(),
  combinedSchemeText: z.string().nullable(),
  eligibilityTitle: z.string().nullable(),
  eligibilityBulletPoints: z.array(BatteryRebatesListItemSchema),
});
export type FederalRebateData = z.infer<typeof FederalRebateSchema>;

// ─── Finance Option ─────────────────────────────────────────────────────

export const FinanceSectionSchema = z.object({
  id: z.number(),
  title: z.string(),
  listItems: z.array(BatteryRebatesListItemSchema),
  image: MediaSchema.nullable(),
});

export const FinanceOptionSchema = z.object({
  __component: z.literal("battery-rebates.finance-option"),
  sectionTitle: z.string().nullable(),
  sectionSubtitle: z.string().nullable(),
  sections: z.array(FinanceSectionSchema),
});
export type FinanceOptionData = z.infer<typeof FinanceOptionSchema>;

// ─── What Changes ───────────────────────────────────────────────────────

export const WhatChangesCardSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  bullets: z.array(BatteryRebatesListItemSchema),
});
export type WhatChangesCardData = z.infer<typeof WhatChangesCardSchema>;

export const WhatChangesSchema = z.object({
  __component: z.literal("battery-rebates.what-changes"),
  title: z.string().nullable(),
  subtitle: z.string().nullable(),
  card1: WhatChangesCardSchema.nullable(),
  card2: WhatChangesCardSchema.nullable(),
  card3: WhatChangesCardSchema.nullable(),
  card4: WhatChangesCardSchema.nullable(),
});
export type WhatChangesData = z.infer<typeof WhatChangesSchema>;

// ─── Are You Eligible ───────────────────────────────────────────────────

export const AreYouEligibleSchema = z.object({
  __component: z.literal("battery-rebates.are-you-eligible"),
  title: z.string().nullable(),
  subtitle: z.string().nullable(),
  bottomSubtitle: z.string().nullable(),
  description: z.string().nullable(),
  items: z.array(BatteryRebatesListItemSchema),
  additionalListTitle: z.string().nullable(),
  additionalItems: z.array(BatteryRebatesListItemSchema),
  image: MediaSchema.nullable(),
  imageAlt: z.string().nullable(),
});
export type AreYouEligibleData = z.infer<typeof AreYouEligibleSchema>;

// ─── Rebate Detail Split ────────────────────────────────────────────────

export const RebateDetailSplitSchema = z.object({
  __component: z.literal("battery-rebates.rebate-detail-split"),
  topSubtitle: z.string().nullable(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  image: MediaSchema.nullable(),
  topBoxTitle: z.string().nullable(),
  topBoxItems: z.array(BatteryRebatesListItemSchema),
  bottomBoxTitle: z.string().nullable(),
  bottomBoxItems: z.array(BatteryRebatesListItemSchema),
});
export type RebateDetailSplitData = z.infer<typeof RebateDetailSplitSchema>;

// ─── What Signing Up ────────────────────────────────────────────────────

export const VppCardSchema = z.object({
  id: z.number(),
  title: z.string(),
  subtitle: z.string().nullable(),
  text: z.string(),
});

export const WhatSigningUpSchema = z.object({
  __component: z.literal("battery-rebates.what-signing-up"),
  title: z.string().nullable(),
  subtitle: z.string().nullable(),
  vppCardsLeft: z.array(VppCardSchema),
  vppCardsRight: z.array(VppCardSchema),
});
export type WhatSigningUpData = z.infer<typeof WhatSigningUpSchema>;
