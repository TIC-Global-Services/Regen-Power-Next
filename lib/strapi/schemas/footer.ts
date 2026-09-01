import { z } from "zod";
import { MediaSchema } from "./common";

export const FooterQuickLinkSchema = z.object({
  id: z.number(),
  label: z.string(),
  href: z.string(),
});
export type FooterQuickLinkData = z.infer<typeof FooterQuickLinkSchema>;

export const FooterOfficeSchema = z.object({
  id: z.number(),
  address: z.string(),
  phone: z.string().nullable(),
  directLine: z.string().nullable(),
  email: z.string().nullable(),
  hours: z.string().nullable(),
});
export type FooterOfficeData = z.infer<typeof FooterOfficeSchema>;

export const FooterStateOfficeSchema = z.object({
  id: z.number(),
  state: z.string(),
  address: z.string(),
  phone: z.string().nullable(),
  email: z.string().nullable(),
});
export type FooterStateOfficeData = z.infer<typeof FooterStateOfficeSchema>;

export const FooterSocialLinkSchema = z.object({
  id: z.number(),
  label: z.string(),
  href: z.string(),
  icon: MediaSchema.nullable(),
});
export type FooterSocialLinkData = z.infer<typeof FooterSocialLinkSchema>;

export const FooterDataSchema = z.object({
  id: z.number(),
  documentId: z.string(),
  logo: MediaSchema.nullable(),
  backgroundImage: MediaSchema.nullable(),
  helpText: z.string().nullable(),
  helpPhoneLabel: z.string().nullable(),
  helpPhoneHref: z.string().nullable(),
  quickLinksTitle: z.string().nullable(),
  quickLinks: z.array(FooterQuickLinkSchema).nullable(),
  headOfficeTitle: z.string().nullable(),
  headOffice: FooterOfficeSchema.nullable(),
  stateOfficesTitle: z.string().nullable(),
  stateOffices: z.array(FooterStateOfficeSchema).nullable(),
  socialLinks: z.array(FooterSocialLinkSchema).nullable(),
  copyrightText: z.string().nullable(),
  creditLabel: z.string().nullable(),
  creditName: z.string().nullable(),
  creditHref: z.string().nullable(),
});
export type FooterData = z.infer<typeof FooterDataSchema>;
