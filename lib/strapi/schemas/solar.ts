import { z } from "zod";
import { MediaSchema, ParagraphSchema } from "./common";

export const SolarHeroSchema = z.object({
  __component: z.literal("solar.hero"),
  subtitle: z.string().nullable(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  ctaText: z.string().nullable(),
  ctaLink: z.string().nullable(),
  backgroundImage: MediaSchema.nullable(),
});
export type SolarHeroData = z.infer<typeof SolarHeroSchema>;

export const SolarTickerItemSchema = z.object({
  id: z.number(),
  text: z.string(),
});

export const SolarStatsAndIntroSchema = z.object({
  __component: z.literal("solar.stats-and-intro"),
  introSubtitle: z.string().nullable(),
  introTitle: z.string().nullable(),
  tickerItems: z.array(SolarTickerItemSchema),
  introParagraphs: z.array(ParagraphSchema),
});
export type SolarStatsAndIntroData = z.infer<typeof SolarStatsAndIntroSchema>;

export const SolarProcessStepSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  image: MediaSchema.nullable().optional(),
});

export const SolarProcessStepsSchema = z.object({
  __component: z.literal("solar.process-steps"),
  subtitle: z.string().nullable(),
  title: z.string().nullable(),
  steps: z.array(SolarProcessStepSchema),
});
export type SolarProcessStepsData = z.infer<typeof SolarProcessStepsSchema>;

export const SolarBrandRefSchema = z.object({
  id: z.number(),
  name: z.string(),
  logo: MediaSchema.nullable().optional(),
});

export const SolarBrandsGridSchema = z.object({
  __component: z.literal("solar.brands-grid"),
  subtitle: z.string().nullable(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  ctaText: z.string().nullable(),
  ctaHref: z.string().nullable(),
  brands: z.array(SolarBrandRefSchema),
});
export type SolarBrandsGridData = z.infer<typeof SolarBrandsGridSchema>;

export const SolarInverterCardSchema = z.object({
  label: z.string(),
  text: z.string(),
});

export const SolarInverterRefSchema = z.object({
  id: z.number(),
  title: z.string(),
  backgroundImage: MediaSchema.nullable().optional(),
  infoCards: z.array(SolarInverterCardSchema).optional(),
});

export const SolarInverterSliderSchema = z.object({
  __component: z.literal("solar.inverter-slider"),
  subtitle: z.string().nullable(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  inverters: z.array(SolarInverterRefSchema),
});
export type SolarInverterSliderData = z.infer<typeof SolarInverterSliderSchema>;

export const SolarSpecItemSchema = z.object({
  id: z.number(),
  title: z.string().nullable(),
  value: z.string().nullable(),
  description: z.string().nullable(),
  image: MediaSchema.nullable().optional(),
});

export const SolarSpecsRowCardsSchema = z.object({
  __component: z.literal("solar.specs-row-cards"),
  subtitle: z.string().nullable(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  specs: z.array(SolarSpecItemSchema),
});
export type SolarSpecsRowCardsData = z.infer<typeof SolarSpecsRowCardsSchema>;

export const SolarSizingValueSchema = z.object({
  id: z.number(),
  text: z.string(),
});

export const SolarSizingColumnSchema = z.object({
  id: z.number(),
  title: z.string(),
});

export const SolarSizingRowSchema = z.object({
  id: z.number(),
  label: z.string(),
  values: z.array(SolarSizingValueSchema),
});

export const SolarSizingCardSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  image: MediaSchema.nullable().optional(),
});

export const SolarSizingGuideTableSchema = z.object({
  __component: z.literal("solar.sizing-guide-table"),
  subtitle: z.string().nullable(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  labelColumnTitle: z.string().nullable(),
  columns: z.array(SolarSizingColumnSchema),
  rows: z.array(SolarSizingRowSchema),
  sizingCards: z.array(SolarSizingCardSchema),
});
export type SolarSizingGuideTableData = z.infer<typeof SolarSizingGuideTableSchema>;

export const SolarPackageItemSchema = z.object({
  label: z.string(),
  value: z.string(),
});

export const SolarPackageSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  features: z.array(SolarPackageItemSchema).optional(),
});

export const SolarPackagesSchema = z.object({
  __component: z.literal("solar.packages"),
  subtitle: z.string().nullable(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  packages: z.array(SolarPackageSchema),
});
export type SolarPackagesData = z.infer<typeof SolarPackagesSchema>;

export const SolarTimelineSchema = z.object({
  __component: z.literal("solar.timeline"),
  subtitle: z.string().nullable(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  consultationTitle: z.string().nullable(),
  consultationText: z.string().nullable(),
  image: MediaSchema.nullable(),
});
export type SolarTimelineData = z.infer<typeof SolarTimelineSchema>;

export const SolarEngineeringItemSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  isDark: z.boolean(),
});

export const SolarEngineeringItemsSchema = z.object({
  __component: z.literal("solar.engineering-items"),
  subtitle: z.string().nullable(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  items: z.array(SolarEngineeringItemSchema),
});
export type SolarEngineeringItemsData = z.infer<typeof SolarEngineeringItemsSchema>;
