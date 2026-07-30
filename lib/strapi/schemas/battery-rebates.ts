import { z } from "zod";
import { MediaSchema } from "./common";

// ─── List Item ─────────────────────────────────────────────────────────
export const BatteryRebatesListItemSchema = z.object({
  id: z.number(),
  text: z.string(),
});

// ─── Hero ──────────────────────────────────────────────────────────────
export const BatteryRebatesHeroSchema = z.object({
  __component: z.literal("battery-rebates.hero"),
  backgroundImage: MediaSchema.nullable(),
  subtitle: z.string().nullable(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  buttonText: z.string().nullable(),
  buttonLink: z.string().nullable(),
  showOverlay: z.boolean().nullable(),
});
export type BatteryRebatesHeroData = z.infer<typeof BatteryRebatesHeroSchema>;

// ─── Rebates Stack Grid ───────────────────────────────────────────────
export const BatteryRebatesStackCardSchema = z.object({
  id: z.number(),
  title: z.string(),
  items: z.array(BatteryRebatesListItemSchema),
});

export const BatteryRebatesRebatesStackGridSchema = z.object({
  __component: z.literal("battery-rebates.rebates-stack-grid"),
  title: z.string().nullable(),
  subtitle: z.string().nullable(),
  cards: z.array(BatteryRebatesStackCardSchema),
});
export type BatteryRebatesRebatesStackGridData = z.infer<typeof BatteryRebatesRebatesStackGridSchema>;

// ─── Residential Battery ──────────────────────────────────────────────
export const BatteryRebatesResidentialBatterySchema = z.object({
  __component: z.literal("battery-rebates.residential-battery"),
  subtitle: z.string().nullable(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  listItems: z.array(BatteryRebatesListItemSchema),
  timingText: z.string().nullable(),
  taxText: z.string().nullable(),
  image: MediaSchema.nullable(),
});
export type BatteryRebatesResidentialBatteryData = z.infer<typeof BatteryRebatesResidentialBatterySchema>;

// ─── Federal Rebate ────────────────────────────────────────────────────
export const BatteryRebatesFederalRebateSchema = z.object({
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
export type BatteryRebatesFederalRebateData = z.infer<typeof BatteryRebatesFederalRebateSchema>;

// ─── Finance Option ────────────────────────────────────────────────────
export const BatteryRebatesFinanceSectionSchema = z.object({
  id: z.number(),
  title: z.string(),
  listItems: z.array(BatteryRebatesListItemSchema),
  image: MediaSchema.nullable(),
});

export const BatteryRebatesFinanceOptionSchema = z.object({
  __component: z.literal("battery-rebates.finance-option"),
  sectionTitle: z.string().nullable(),
  sectionSubtitle: z.string().nullable(),
  sections: z.array(BatteryRebatesFinanceSectionSchema),
});
export type BatteryRebatesFinanceOptionData = z.infer<typeof BatteryRebatesFinanceOptionSchema>;

// ─── What Changes ──────────────────────────────────────────────────────
export const BatteryRebatesWhatChangesCardSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  bullets: z.array(BatteryRebatesListItemSchema),
});

export const BatteryRebatesWhatChangesSchema = z.object({
  __component: z.literal("battery-rebates.what-changes"),
  title: z.string().nullable(),
  subtitle: z.string().nullable(),
  card1: BatteryRebatesWhatChangesCardSchema.nullable(),
  card2: BatteryRebatesWhatChangesCardSchema.nullable(),
  card3: BatteryRebatesWhatChangesCardSchema.nullable(),
  card4: BatteryRebatesWhatChangesCardSchema.nullable(),
});
export type BatteryRebatesWhatChangesData = z.infer<typeof BatteryRebatesWhatChangesSchema>;

// ─── Are You Eligible ─────────────────────────────────────────────────
export const BatteryRebatesAreYouEligibleSchema = z.object({
  __component: z.literal("battery-rebates.are-you-eligible"),
  title: z.string().nullable(),
  subtitle: z.string().nullable(),
  bottomSubtitle: z.string().nullable(),
  description: z.string().nullable(),
  items: z.array(BatteryRebatesListItemSchema),
  image: MediaSchema.nullable(),
});
export type BatteryRebatesAreYouEligibleData = z.infer<typeof BatteryRebatesAreYouEligibleSchema>;

// ─── What Signing Up ──────────────────────────────────────────────────
export const BatteryRebatesVppCardSchema = z.object({
  id: z.number(),
  title: z.string(),
  subtitle: z.string().nullable(),
  text: z.string(),
});

export const BatteryRebatesWhatSigningUpSchema = z.object({
  __component: z.literal("battery-rebates.what-signing-up"),
  title: z.string().nullable(),
  subtitle: z.string().nullable(),
  vppCardsLeft: z.array(BatteryRebatesVppCardSchema),
  vppCardsRight: z.array(BatteryRebatesVppCardSchema),
});
export type BatteryRebatesWhatSigningUpData = z.infer<typeof BatteryRebatesWhatSigningUpSchema>;

// ─── Rebate Detail Split ──────────────────────────────────────────────
export const BatteryRebatesRebateDetailSplitSchema = z.object({
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
export type BatteryRebatesRebateDetailSplitData = z.infer<typeof BatteryRebatesRebateDetailSplitSchema>;
