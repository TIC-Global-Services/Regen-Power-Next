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

export const SharedFormSectionSchema = z.object({
  __component: z.literal("shared.form-section"),
  subtitle: z.string().nullable(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  image: MediaSchema.nullable(),
});
export type SharedFormSectionData = z.infer<typeof SharedFormSectionSchema>;

export const SharedCategoryItemSchema = z.object({
  id: z.number(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  image: MediaSchema.nullable(),
});
export type SharedCategoryItemData = z.infer<typeof SharedCategoryItemSchema>;

export const SharedCategorySchema = z.object({
  id: z.number(),
  label: z.string(),
  items: z.array(SharedCategoryItemSchema),
});
export type SharedCategoryData = z.infer<typeof SharedCategorySchema>;

export const SharedCategorySectionSchema = z.object({
  __component: z.literal("shared.category-section"),
  subtitle: z.string().nullable(),
  title: z.string().nullable(),
  categories: z.array(SharedCategorySchema),
});
export type SharedCategorySectionData = z.infer<typeof SharedCategorySectionSchema>;
