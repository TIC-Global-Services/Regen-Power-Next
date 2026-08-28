import { z } from "zod";
import { MediaSchema } from "./common";

export const AboutHeroSchema = z.object({
  __component: z.literal("about.hero"),
  eyebrow: z.string().nullable(),
  title: z.string().nullable(),
  video: MediaSchema.nullable(),
});
export type AboutHeroData = z.infer<typeof AboutHeroSchema>;

export const AboutAwardCardSchema = z.object({
  id: z.number(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  badge: MediaSchema.nullable(),
  badgeSizeClass: z.string().nullable(),
});
export type AboutAwardCardData = z.infer<typeof AboutAwardCardSchema>;

export const AboutAwardsSchema = z.object({
  __component: z.literal("about.awards"),
  cards: z.array(AboutAwardCardSchema),
});
export type AboutAwardsData = z.infer<typeof AboutAwardsSchema>;
