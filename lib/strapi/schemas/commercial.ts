import { z } from "zod";
import { MediaSchema, ParagraphSchema, TextBlockSchema, FaqItemSchema } from "./common";

export const CommercialSystemsHeroSchema = z.object({
  __component: z.literal("commercial-systems.hero"),
  subtitle: z.string().nullable(),
  mainTitle: z.string().nullable(),
  description: z.string().nullable(),
  ctaText: z.string().nullable(),
  ctaLink: z.string().nullable(),
  backgroundImage: MediaSchema.nullable(),
});
export type CommercialSystemsHeroData = z.infer<typeof CommercialSystemsHeroSchema>;

export const StatItemSchema = z.object({
  id: z.number(),
  value: z.string(),
  label: z.string(),
});

export const CommercialSystemsStatsCardGridSchema = z.object({
  __component: z.literal("commercial-systems.stats-card-grid"),
  subtitle: z.string().nullable(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  cardBackground: MediaSchema.nullable(),
  stats: z.array(StatItemSchema),
});
export type CommercialSystemsStatsCardGridData = z.infer<typeof CommercialSystemsStatsCardGridSchema>;

export const TierDetailSchema = z.object({
  id: z.number(),
  label: z.string(),
  value: z.string(),
});

export const TierSchema = z.object({
  id: z.number(),
  title: z.string(),
  subtitle: z.string(),
  description: z.string(),
  image: MediaSchema.nullable(),
  ctaText: z.string(),
  ctaHref: z.string(),
  details: z.array(TierDetailSchema),
});

export const CommercialSystemsTiersSectionSchema = z.object({
  __component: z.literal("commercial-systems.tiers-section"),
  subtitle: z.string().nullable(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  tiers: z.array(TierSchema),
});
export type CommercialSystemsTiersSectionData = z.infer<typeof CommercialSystemsTiersSectionSchema>;

export const ComponentItemSchema = z.object({
  id: z.number(),
  letter: z.string(),
  title: z.string(),
});

export const CommercialSystemsComponentsSectionSchema = z.object({
  __component: z.literal("commercial-systems.components-section"),
  subtitle: z.string().nullable(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  backgroundImage: MediaSchema.nullable(),
  items: z.array(ComponentItemSchema),
});
export type CommercialSystemsComponentsSectionData = z.infer<typeof CommercialSystemsComponentsSectionSchema>;

export const IndustrySchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  caseStudy: z.string(),
  icon: MediaSchema.nullable(),
});

export const CommercialSystemsIndustriesSectionSchema = z.object({
  __component: z.literal("commercial-systems.industries-section"),
  subtitle: z.string().nullable(),
  title: z.string().nullable(),
  industries: z.array(IndustrySchema),
});
export type CommercialSystemsIndustriesSectionData = z.infer<typeof CommercialSystemsIndustriesSectionSchema>;

export const FeatureCardSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  image: MediaSchema.nullable(),
  textPosition: z.enum(["top", "bottom"]).nullable(),
  footerTitle: z.string().nullable(),
  footerDescription: z.string().nullable(),
});

export const CommercialSystemsFeatureCardGridSchema = z.object({
  __component: z.literal("commercial-systems.feature-card-grid"),
  topSubtitle: z.string().nullable(),
  title: z.string().nullable(),
  bottomSubtitle: z.string().nullable(),
  cards: z.array(FeatureCardSchema),
});
export type CommercialSystemsFeatureCardGridData = z.infer<typeof CommercialSystemsFeatureCardGridSchema>;

export const CommercialSystemsWatchSystemSectionSchema = z.object({
  __component: z.literal("commercial-systems.watch-system-section"),
  subtitle: z.string().nullable(),
  title: z.string().nullable(),
  ctaText: z.string().nullable(),
  ctaHref: z.string().nullable(),
  image: MediaSchema.nullable(),
  paragraphs: z.array(TextBlockSchema),
});
export type CommercialSystemsWatchSystemSectionData = z.infer<typeof CommercialSystemsWatchSystemSectionSchema>;

export const PackageItemSchema = z.object({
  id: z.number(),
  label: z.string(),
  value: z.string(),
});

export const PackageSchema = z.object({
  id: z.number(),
  title: z.string(),
  desc: z.string(),
  bgClass: z.string(),
  items: z.array(PackageItemSchema),
});

export const CommercialSystemsPackagesGridSchema = z.object({
  __component: z.literal("commercial-systems.packages-grid"),
  subtitle: z.string().nullable(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  packages: z.array(PackageSchema),
});
export type CommercialSystemsPackagesGridData = z.infer<typeof CommercialSystemsPackagesGridSchema>;

export const StepItemSchema = z.object({
  id: z.number(),
  stepNumber: z.number(),
  title: z.string(),
  description: z.string(),
  image: MediaSchema.nullable(),
});

export const CommercialSystemsProcessFlowSchema = z.object({
  __component: z.literal("commercial-systems.process-flow"),
  subtitle: z.string().nullable(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  steps: z.array(StepItemSchema),
});
export type CommercialSystemsProcessFlowData = z.infer<typeof CommercialSystemsProcessFlowSchema>;

export const FiveThingItemSchema = z.object({
  id: z.number(),
  number: z.number(),
  title: z.string(),
  description: z.string(),
  highlight: z.boolean().nullable(),
});

export const CommercialSystemsFiveThingsSectionSchema = z.object({
  __component: z.literal("commercial-systems.five-things-section"),
  subtitle: z.string().nullable(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  items: z.array(FiveThingItemSchema),
});
export type CommercialSystemsFiveThingsSectionData = z.infer<typeof CommercialSystemsFiveThingsSectionSchema>;

export const SharedFaqSchema = z.object({
  __component: z.literal("shared.faq"),
  title: z.string().nullable(),
  sectionTitle: z.string().nullable(),
  listTitle: z.string().nullable(),
  image: MediaSchema.nullable(),
  items: z.array(FaqItemSchema),
});
export type SharedFaqData = z.infer<typeof SharedFaqSchema>;

export const CommercialSystemsCommercialFormSchema = z.object({
  __component: z.literal("commercial-systems.commercial-form"),
  subtitle: z.string().nullable(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  image: MediaSchema.nullable(),
});
export type CommercialSystemsCommercialFormData = z.infer<typeof CommercialSystemsCommercialFormSchema>;

export const SharedCtaBannerSchema = z.object({
  __component: z.literal("shared.cta-banner"),
  subtitle: z.string().nullable(),
  mainTitle: z.string().nullable(),
  description: z.string().nullable(),
  buttonText: z.string().nullable(),
  buttonHref: z.string().nullable(),
  backgroundImage: MediaSchema.nullable(),
});
export type SharedCtaBannerData = z.infer<typeof SharedCtaBannerSchema>;

export const CommercialOffGridHeroSchema = z.object({
  __component: z.literal("commercial-off-grid.hero"),
  subtitle: z.string().nullable(),
  mainTitle: z.string().nullable(),
  description: z.string().nullable(),
  ctaText: z.string().nullable(),
  ctaLink: z.string().nullable(),
  backgroundImage: MediaSchema.nullable(),
});
export type CommercialOffGridHeroData = z.infer<typeof CommercialOffGridHeroSchema>;

export const SharedEditorialSectionSchema = z.object({
  __component: z.literal("shared.editorial-section"),
  subtitle: z.string().nullable(),
  title: z.string().nullable(),
  align: z.enum(["left", "center", "right"]).nullable(),
  paragraphs: z.array(ParagraphSchema),
});
export type SharedEditorialSectionData = z.infer<typeof SharedEditorialSectionSchema>;

export const PortfolioCardSchema = z.object({
  id: z.number(),
  type: z.enum(["text", "image"]),
  variant: z.enum(["light-gray", "light-green", "dark"]),
  title: z.string(),
  description: z.string(),
  specs: z.string().nullable(),
  image: MediaSchema.nullable(),
});

export const CommercialOffGridSolutionsPortfolioSchema = z.object({
  __component: z.literal("commercial-off-grid.solutions-portfolio"),
  subtitle: z.string().nullable(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  layout: z.number().nullable(),
  cards: z.array(PortfolioCardSchema),
});
export type CommercialOffGridSolutionsPortfolioData = z.infer<typeof CommercialOffGridSolutionsPortfolioSchema>;
