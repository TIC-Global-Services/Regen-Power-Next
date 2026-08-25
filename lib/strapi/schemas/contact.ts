import { z } from "zod";
import { MediaSchema } from "./common";

export const ContactHeroSchema = z.object({
  __component: z.literal("contact.hero"),
  subtitle: z.string().nullable(),
  mainTitle: z.string().nullable(),
  description: z.string().nullable(),
  ctaText: z.string().nullable(),
  ctaLink: z.string().nullable(),
  backgroundImage: MediaSchema.nullable(),
});
export type ContactHeroData = z.infer<typeof ContactHeroSchema>;

/** Matches the `contact.contact-form-section` component in Strapi. */
export const ContactFormSectionSchema = z.object({
  __component: z.literal("contact.contact-form-section"),
  title: z.string().nullable(),
  description: z.string().nullable(),
});
export type ContactFormSectionData = z.infer<typeof ContactFormSectionSchema>;
