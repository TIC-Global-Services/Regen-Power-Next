import { z } from "zod";
import { MediaSchema, ParagraphSchema } from "./common";

export const RebatesHeroSchema = z.object({
  __component: z.literal("rebates.hero"),
  subtitle: z.string().nullable(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  ctaText: z.string().nullable(),
  ctaLink: z.string().nullable(),
  backgroundImage: MediaSchema.nullable(),
});
export type RebatesHeroData = z.infer<typeof RebatesHeroSchema>;

export const RebatesProgramSchema = z.object({
  id: z.number(),
  label: z.string(),
  title: z.string(),
  summary: z.string(),
  badge: z.string().nullable(),
  image: MediaSchema.nullable(),
});

export const RebatesRebateProgramsSchema = z.object({
  __component: z.literal("rebates.rebate-programs"),
  subtitle: z.string().nullable(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  programs: z.array(RebatesProgramSchema),
});
export type RebatesRebateProgramsData = z.infer<typeof RebatesRebateProgramsSchema>;

export const RebatesStcExplainerSchema = z.object({
  __component: z.literal("rebates.stc-explainer"),
  subtitle: z.string().nullable(),
  title: z.string().nullable(),
  paragraphs: z.array(ParagraphSchema),
});
export type RebatesStcExplainerData = z.infer<typeof RebatesStcExplainerSchema>;

export const RebatesUtilityCardSchema = z.object({
  id: z.number(),
  name: z.string(),
  logo: MediaSchema.nullable(),
  perKwh: z.string().nullable(),
  cap: z.string().nullable(),
  maximumRebate: z.string().nullable(),
});

export const RebatesUtilityCardsSchema = z.object({
  __component: z.literal("rebates.utility-cards"),
  badge: z.string().nullable(),
  subtitle: z.string().nullable(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  cards: z.array(RebatesUtilityCardSchema),
});
export type RebatesUtilityCardsData = z.infer<typeof RebatesUtilityCardsSchema>;

export const RebatesLoanBenefitSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
});

export const RebatesLoanBenefitsSchema = z.object({
  __component: z.literal("rebates.loan-benefits"),
  badge: z.string().nullable(),
  subtitle: z.string().nullable(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  backgroundImage: MediaSchema.nullable(),
  benefits: z.array(RebatesLoanBenefitSchema),
});
export type RebatesLoanBenefitsData = z.infer<typeof RebatesLoanBenefitsSchema>;

export const RebatesEligibilityQuestionSchema = z.object({
  id: z.number(),
  question: z.string(),
  helperText: z.string(),
  loanOnly: z.boolean(),
});

export const RebatesEligibilityResultSchema = z.object({
  id: z.number(),
  key: z.enum(["eligible-stack", "eligible-rebates-only", "not-eligible"]),
  title: z.string(),
  description: z.string(),
});

export const RebatesEligibilityCheckerSchema = z.object({
  __component: z.literal("rebates.eligibility-checker"),
  badge: z.string().nullable(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  questions: z.array(RebatesEligibilityQuestionSchema),
  results: z.array(RebatesEligibilityResultSchema),
});
export type RebatesEligibilityCheckerData = z.infer<typeof RebatesEligibilityCheckerSchema>;

export const RebatesSplitSectionSchema = z.object({
  __component: z.literal("shared.split-section"),
  subtitle: z.string().nullable(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  image: MediaSchema.nullable(),
  imagePosition: z.enum(["left", "right"]).nullable(),
  badge: z.string().nullable(),
});
export type RebatesSplitSectionData = z.infer<typeof RebatesSplitSectionSchema>;

export const RebatesFaqSchema = z.object({
  __component: z.literal("shared.faq"),
  title: z.string().nullable(),
  sectionTitle: z.string().nullable(),
  listTitle: z.string().nullable(),
  image: MediaSchema.nullable(),
  items: z.array(z.object({ id: z.number(), question: z.string(), answer: z.string() })),
});
export type RebatesFaqData = z.infer<typeof RebatesFaqSchema>;

export const RebatesCtaBannerSchema = z.object({
  __component: z.literal("shared.cta-banner"),
  subtitle: z.string().nullable(),
  mainTitle: z.string().nullable(),
  description: z.string().nullable(),
  buttonText: z.string().nullable(),
  buttonHref: z.string().nullable(),
  backgroundImage: MediaSchema.nullable(),
});
export type RebatesCtaBannerData = z.infer<typeof RebatesCtaBannerSchema>;
