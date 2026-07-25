import { z } from "zod";
import { MediaSchema } from "./common";

export const FaqHeroSchema = z.object({
  __component: z.literal("faq.hero"),
  subtitle: z.string().nullable(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  ctaText: z.string().nullable(),
  ctaLink: z.string().nullable(),
  backgroundImage: MediaSchema.nullable(),
});
export type FaqHeroData = z.infer<typeof FaqHeroSchema>;

export const FaqItemSchema = z.object({
  id: z.number(),
  question: z.string(),
  answer: z.string(),
});

export const FaqCategorySchema = z.object({
  id: z.number(),
  categoryId: z.string(),
  label: z.string(),
  items: z.array(FaqItemSchema),
});

export const FaqCategorizedFaqSchema = z.object({
  __component: z.literal("faq.categorized-faq"),
  categories: z.array(FaqCategorySchema),
});
export type FaqCategorizedFaqData = z.infer<typeof FaqCategorizedFaqSchema>;

export const FaqCtaBannerSchema = z.object({
  __component: z.literal("shared.cta-banner"),
  subtitle: z.string().nullable(),
  mainTitle: z.string().nullable(),
  description: z.string().nullable(),
  buttonText: z.string().nullable(),
  buttonHref: z.string().nullable(),
  backgroundImage: MediaSchema.nullable(),
});
export type FaqCtaBannerData = z.infer<typeof FaqCtaBannerSchema>;
