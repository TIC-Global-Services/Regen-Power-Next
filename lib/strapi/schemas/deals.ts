import { z } from "zod";
import { MediaSchema, ParagraphSchema } from "./common";

export const DealsHeroSchema = z.object({
  __component: z.literal("deals.hero"),
  subtitle: z.string().nullable(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  ctaText: z.string().nullable(),
  ctaLink: z.string().nullable(),
  backgroundImage: MediaSchema.nullable(),
});
export type DealsHeroData = z.infer<typeof DealsHeroSchema>;

export const DealsPhilosophySchema = z.object({
  __component: z.literal("deals.philosophy"),
  badge: z.string().nullable(),
  subtitle: z.string().nullable(),
  title: z.string().nullable(),
  paragraphs: z.array(ParagraphSchema),
});
export type DealsPhilosophyData = z.infer<typeof DealsPhilosophySchema>;

export const DealsPromotionSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
});

export const DealsGridSchema = z.object({
  __component: z.literal("deals.deals-grid"),
  subtitle: z.string().nullable(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  promotions: z.array(DealsPromotionSchema),
  ctaText: z.string().nullable(),
});
export type DealsGridData = z.infer<typeof DealsGridSchema>;

export const DealsSplitSectionSchema = z.object({
  __component: z.literal("shared.split-section"),
  subtitle: z.string().nullable(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  image: MediaSchema.nullable(),
  imagePosition: z.enum(["left", "right"]).nullable(),
  badge: z.string().nullable(),
});
export type DealsSplitSectionData = z.infer<typeof DealsSplitSectionSchema>;

export const DealsPaymentCardSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  footerTitle: z.string().nullable(),
  footerDescription: z.string().nullable(),
  image: MediaSchema.nullable(),
});

export const DealsWaysToPaySchema = z.object({
  __component: z.literal("deals.ways-to-pay"),
  topSubtitle: z.string().nullable(),
  title: z.string().nullable(),
  bottomSubtitle: z.string().nullable(),
  cards: z.array(DealsPaymentCardSchema),
});
export type DealsWaysToPayData = z.infer<typeof DealsWaysToPaySchema>;

export const DealsFeatureItemSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  image: MediaSchema.nullable(),
});

export const DealsWhyMattersSchema = z.object({
  __component: z.literal("deals.why-matters"),
  subtitle: z.string().nullable(),
  heading: z.string().nullable(),
  introText: z.string().nullable(),
  items: z.array(DealsFeatureItemSchema),
});
export type DealsWhyMattersData = z.infer<typeof DealsWhyMattersSchema>;

export const DealsFaqSchema = z.object({
  __component: z.literal("shared.faq"),
  title: z.string().nullable(),
  sectionTitle: z.string().nullable(),
  listTitle: z.string().nullable(),
  image: MediaSchema.nullable(),
  items: z.array(z.object({ id: z.number(), question: z.string(), answer: z.string() })),
});
export type DealsFaqData = z.infer<typeof DealsFaqSchema>;

export const DealsCtaBannerSchema = z.object({
  __component: z.literal("shared.cta-banner"),
  subtitle: z.string().nullable(),
  mainTitle: z.string().nullable(),
  description: z.string().nullable(),
  buttonText: z.string().nullable(),
  buttonHref: z.string().nullable(),
  backgroundImage: MediaSchema.nullable(),
});
export type DealsCtaBannerData = z.infer<typeof DealsCtaBannerSchema>;
