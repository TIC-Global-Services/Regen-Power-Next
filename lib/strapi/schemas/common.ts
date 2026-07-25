import { z } from "zod";

export const MediaFormatSchema = z.object({
  url: z.string(),
  width: z.number(),
  height: z.number(),
  mime: z.string(),
  ext: z.string(),
  size: z.number(),
});

export const MediaSchema = z.object({
  id: z.number(),
  documentId: z.string(),
  url: z.string(),
  width: z.number(),
  height: z.number(),
  alternativeText: z.string().nullable(),
  caption: z.string().nullable(),
  mime: z.string(),
  ext: z.string(),
  size: z.number(),
  formats: z.record(z.string(), MediaFormatSchema).optional(),
  name: z.string().optional(),
  hash: z.string().optional(),
  provider: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  publishedAt: z.string().nullable().optional(),
});

export const ParagraphSchema = z.object({
  id: z.number(),
  text: z.string(),
  isSecondary: z.boolean(),
});

export const FaqItemSchema = z.object({
  id: z.number(),
  question: z.string(),
  answer: z.string(),
});
