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

export const OfficeLocationSchema = z.object({
  id: z.number(),
  name: z.string(),
  lat: z.number(),
  lng: z.number(),
  address: z.string().nullable().optional(),
  phone: z.string().nullable().optional(),
  email: z.string().nullable().optional(),
  mapsUrl: z.string().nullable().optional(),
  labelPosition: z.enum(["top", "right", "bottom", "left"]).nullable().optional(),
});

/** Matches the `contact.locations-map` component in Strapi. */
export const ContactLocationsMapSchema = z.object({
  __component: z.literal("contact.locations-map"),
  subtitle: z.string().nullable(),
  title: z.string().nullable(),
  locations: z.array(OfficeLocationSchema),
});
export type ContactLocationsMapData = z.infer<typeof ContactLocationsMapSchema>;
