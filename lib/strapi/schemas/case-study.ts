import { z } from "zod";
import { MediaSchema } from "./common";

export const CaseStudyDetailEntrySchema = z.object({
  id: z.number().optional(),
  title: z.string().default(""),
  details: z.string().default(""),
});
export type CaseStudyDetailEntryData = z.infer<typeof CaseStudyDetailEntrySchema>;

export const CaseStudyTableSchema = z.object({
  id: z.union([z.string(), z.number()]).optional(),
  tableId: z.string().optional(),
  title: z.string().optional(),
  headers: z.array(z.string()).optional(),
  rows: z.array(z.array(z.union([z.string(), z.number()]))).default([]),
});
export type CaseStudyTableData = z.infer<typeof CaseStudyTableSchema>;

/**
 * Case Study collection type schema (api::case-study.case-study).
 * Supports both Strapi camelCase conventions and snake_case properties with passthrough.
 */
export const CaseStudySchema = z
  .object({
    id: z.number().optional(),
    documentId: z.string().optional(),
    slug: z.string().default(""),

    // Titles & Subtitles
    cardTitle: z.string().nullable().optional(),
    cardSubTitle: z.string().nullable().optional(),
    card_title: z.string().nullable().optional(),
    card_subtitle: z.string().nullable().optional(),
    title: z.string().nullable().optional(),
    subtitle: z.string().nullable().optional(),

    url: z.string().nullable().optional(),
    location: z.string().nullable().optional(),
    locationDetails: z.string().nullable().optional(),
    location_details: z.string().nullable().optional(),
    revealText: z.string().nullable().optional(),
    reveal_text: z.string().nullable().optional(),
    pdf: z.union([z.string(), MediaSchema]).nullable().optional(),
    pdfUrl: z.union([z.string(), MediaSchema]).nullable().optional(),
    pdf_url: z.union([z.string(), MediaSchema]).nullable().optional(),

    caseStudyDetails: z.array(CaseStudyDetailEntrySchema).nullable().optional(),
    casestudydetails: z.array(CaseStudyDetailEntrySchema).nullable().optional(),
    tables: z.array(CaseStudyTableSchema).nullable().optional(),
    images: z
      .union([z.array(MediaSchema), z.array(z.string()), MediaSchema])
      .nullable()
      .optional(),
    image: MediaSchema.nullable().optional(),

    createdAt: z.string().nullable().optional(),
    updatedAt: z.string().nullable().optional(),
    publishedAt: z.string().nullable().optional(),
  })
  .passthrough();

export type CaseStudyData = z.infer<typeof CaseStudySchema>;
