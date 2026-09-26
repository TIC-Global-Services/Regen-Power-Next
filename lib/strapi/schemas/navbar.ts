import { z } from "zod";
import { MediaSchema } from "./common";

export const NavbarSubItemSchema = z.object({
  id: z.number(),
  label: z.string(),
  href: z.string(),
  openInNewTab: z.boolean().nullable(),
});
export type NavbarSubItemData = z.infer<typeof NavbarSubItemSchema>;

export const NavbarItemSchema = z.object({
  id: z.number(),
  label: z.string(),
  href: z.string(),
  openInNewTab: z.boolean().nullable(),
  subItems: z.array(NavbarSubItemSchema).nullable(),
});
export type NavbarItemData = z.infer<typeof NavbarItemSchema>;

export const NavbarDataSchema = z.object({
  id: z.number(),
  documentId: z.string(),
  logo: MediaSchema.nullable(),
  logoLight: MediaSchema.nullable(),
  logoAlt: z.string().nullable(),
  logoHref: z.string().nullable(),
  items: z.array(NavbarItemSchema).nullable(),
  showCta: z.boolean().nullable(),
  ctaText: z.string().nullable(),
  ctaHref: z.string().nullable(),
});
export type NavbarData = z.infer<typeof NavbarDataSchema>;
