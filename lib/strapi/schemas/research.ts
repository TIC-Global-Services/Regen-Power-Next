import { z } from "zod";
import { MediaSchema } from "./common";

export const ResearchDevelopmentHeroSchema = z.object({
  __component: z.literal("research-and-development.hero"),
  subtitle: z.string().nullable(),
  mainTitle: z.string().nullable(),
  description: z.string().nullable(),
  ctaText: z.string().nullable(),
  ctaLink: z.string().nullable(),
  backgroundImage: MediaSchema.nullable(),
});
export type ResearchDevelopmentHeroData = z.infer<typeof ResearchDevelopmentHeroSchema>;

export const EnergySolutionItemSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  image: MediaSchema.nullable(),
  href: z.string(),
});

export const EnergySolutionsSectionSchema = z.object({
  __component: z.literal("research-and-development.energy-solutions-section"),
  subtitle: z.string().nullable(),
  title: z.string().nullable(),
  items: z.array(EnergySolutionItemSchema),
});
export type EnergySolutionsSectionData = z.infer<typeof EnergySolutionsSectionSchema>;

export const AchievementItemSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  image: MediaSchema.nullable(),
  href: z.string(),
});

export const CoreAchievementsSectionSchema = z.object({
  __component: z.literal("research-and-development.core-achievements-section"),
  subtitle: z.string().nullable(),
  title: z.string().nullable(),
  items: z.array(AchievementItemSchema),
});
export type CoreAchievementsSectionData = z.infer<typeof CoreAchievementsSectionSchema>;
