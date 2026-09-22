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
  body: z.string().nullable().optional(),
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
  description: z.string().nullable().optional(),
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

export const CaseStudyDetailEntrySchema = z.object({
  title: z.string(),
  details: z.string(),
});

export const CaseStudyTableSchema = z.object({
  id: z.string().optional(),
  title: z.string().optional(),
  headers: z.array(z.string()).optional(),
  rows: z.array(z.array(z.union([z.string(), z.number()]))),
});

export const CaseStudyDetailsDataSchema = z.object({
  slug: z.string().optional(),
  url: z.string().optional(),
  card_title: z.string().optional(),
  card_subtitle: z.string().optional(),
  location: z.string().optional(),
  location_details: z.string().optional(),
  reveal_text: z.string().optional(),
  pdf_url: z.string().nullable().optional(),
  casestudydetails: z.array(CaseStudyDetailEntrySchema).optional(),
  tables: z.array(CaseStudyTableSchema).optional(),
  images: z.array(z.union([z.string(), z.record(z.string(), z.any())])).optional(),
}).passthrough();
export type CaseStudyDetailsData = z.infer<typeof CaseStudyDetailsDataSchema>;

export const FeatureCardSchema = z.object({
  id: z.number().optional(),
  title: z.string().nullable().optional(),
  subtitle: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  image: MediaSchema.nullable().optional(),
  textPosition: z.enum(["top", "bottom"]).nullable().optional(),
  footerTitle: z.string().nullable().optional(),
  footerDescription: z.string().nullable().optional(),
  details: z.preprocess((val) => {
    if (typeof val === "string") {
      try {
        return JSON.parse(val);
      } catch {
        return val;
      }
    }
    return val;
  }, CaseStudyDetailsDataSchema.nullable().optional()),
});
export type FeatureCardData = z.infer<typeof FeatureCardSchema>;

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
  ctaText: z.string().nullable().optional(),
  ctaHref: z.string().nullable().optional(),
});

export const CommercialSystemsPackagesGridSchema = z.object({
  __component: z.literal("commercial-systems.packages-grid"),
  subtitle: z.string().nullable(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  packages: z.array(PackageSchema),
  notes: z.array(TextBlockSchema).nullable().optional(),
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

export const CommercialOffGridProcessStepSchema = z.object({
  id: z.number(),
  number: z.string(),
  title: z.string(),
  description: z.string(),
  image: MediaSchema.nullable(),
});

export const CommercialOffGridOurProcessSchema = z.object({
  __component: z.literal("commercial-off-grid.our-process"),
  subtitle: z.string().nullable(),
  title: z.string().nullable(),
  steps: z.array(CommercialOffGridProcessStepSchema),
});
export type CommercialOffGridOurProcessData = z.infer<typeof CommercialOffGridOurProcessSchema>;

export const CommercialOffGridWhyRegenCardSchema = z.object({
  id: z.number(),
  type: z.enum(["text", "dots"]),
  title: z.string().nullable(),
  description: z.string().nullable(),
});

export const CommercialOffGridWhyRegenSchema = z.object({
  __component: z.literal("commercial-off-grid.why-regen"),
  subtitle: z.string().nullable(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  cards: z.array(CommercialOffGridWhyRegenCardSchema),
});
export type CommercialOffGridWhyRegenData = z.infer<typeof CommercialOffGridWhyRegenSchema>;

export const CommercialOffGridImageSplitCtaSchema = z.object({
  __component: z.literal("commercial-off-grid.image-split-cta"),
  title: z.string().nullable(),
  subtitle: z.string().nullable(),
  description: z.string().nullable(),
  ctaText: z.string().nullable(),
  ctaHref: z.string().nullable(),
  image: MediaSchema.nullable(),
});
export type CommercialOffGridImageSplitCtaData = z.infer<typeof CommercialOffGridImageSplitCtaSchema>;

export const CompetitorRowSchema = z.object({
  id: z.number(),
  competitor: z.string(),
  positioning: z.string(),
  doWell: z.string(),
  misses: z.string(),
});

export const CommercialOffGridCompetitorAnalysisSchema = z.object({
  __component: z.literal("commercial-off-grid.competitor-analysis"),
  subtitle: z.string().nullable(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  rows: z.array(CompetitorRowSchema),
});
export type CommercialOffGridCompetitorAnalysisData = z.infer<typeof CommercialOffGridCompetitorAnalysisSchema>;
