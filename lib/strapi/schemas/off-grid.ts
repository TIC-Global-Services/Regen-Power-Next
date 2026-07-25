import { z } from "zod";
import { MediaSchema } from "./common";

export const OffGridHeroSchema = z.object({
  __component: z.literal("off-grid.hero"),
  subtitle: z.string().nullable(),
  mainTitle: z.string().nullable(),
  description: z.string().nullable(),
  ctaText: z.string().nullable(),
  ctaLink: z.string().nullable(),
  backgroundImage: MediaSchema.nullable(),
});
export type OffGridHeroData = z.infer<typeof OffGridHeroSchema>;

export const SolutionsPortfolioCardSchema = z.object({
  id: z.number(),
  type: z.enum(["text", "image"]),
  variant: z.enum(["light-gray", "light-green", "dark"]).nullable(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  specs: z.string().nullable(),
  image: MediaSchema.nullable(),
});

export const SolutionsPortfolioSchema = z.object({
  __component: z.literal("off-grid.solutions-portfolio"),
  subtitle: z.string().nullable(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  cards: z.array(SolutionsPortfolioCardSchema),
});
export type SolutionsPortfolioData = z.infer<typeof SolutionsPortfolioSchema>;

export const ThreeSolutionItemSchema = z.object({
  id: z.number(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  image: MediaSchema.nullable(),
  ctaText: z.string().nullable(),
  ctaHref: z.string().nullable(),
});

export const ThreeSolutionsSectionSchema = z.object({
  __component: z.literal("off-grid.three-solutions-section"),
  subtitle: z.string().nullable(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  solutions: z.array(ThreeSolutionItemSchema),
});
export type ThreeSolutionsSectionData = z.infer<typeof ThreeSolutionsSectionSchema>;

export const IconCardGridSchema = z.object({
  __component: z.literal("off-grid.icon-card-grid"),
  subtitle: z.string().nullable(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  layout: z.number().nullable(),
  showHeader: z.boolean().nullable(),
  cards: z.array(z.unknown()),
});
export type IconCardGridData = z.infer<typeof IconCardGridSchema>;

export const HybridGenDetailSchema = z.object({
  __component: z.literal("off-grid.hybrid-gen-detail"),
  logo: MediaSchema.nullable(),
  image: MediaSchema.nullable(),
  subtitle: z.string().nullable(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  patentText: z.string().nullable(),
});
export type HybridGenDetailData = z.infer<typeof HybridGenDetailSchema>;

export const MapMarkerSchema = z.object({
  id: z.number(),
  name: z.string().nullable(),
  top: z.string().nullable(),
  left: z.string().nullable(),
});

export const WorldMapSchema = z.object({
  __component: z.literal("off-grid.world-map"),
  title: z.string().nullable(),
  markers: z.array(MapMarkerSchema),
});
export type WorldMapData = z.infer<typeof WorldMapSchema>;

export const MicrogridTableHeaderSchema = z.object({
  col1: z.string(),
  col2: z.string(),
});

export const TableContentSchema = z.object({
  id: z.number(),
  value: z.string(),
  description: z.string(),
});

export const MicrogridSpecTableSchema = z.object({
  __component: z.literal("off-grid.microgrid-spec-table"),
  subtitle: z.string().nullable(),
  title: z.string().nullable(),
  headers: MicrogridTableHeaderSchema.nullable(),
  tableContent: z.array(TableContentSchema),
});
export type MicrogridSpecTableData = z.infer<typeof MicrogridSpecTableSchema>;

export const AcquaSmartCardSchema = z.object({
  id: z.number(),
  title: z.string().nullable(),
  description: z.string().nullable(),
});

export const AcquaSmartSectionSchema = z.object({
  __component: z.literal("off-grid.acqua-smart-section"),
  subtitle: z.string().nullable(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  image: MediaSchema.nullable(),
  cards: z.array(AcquaSmartCardSchema),
});
export type AcquaSmartSectionData = z.infer<typeof AcquaSmartSectionSchema>;

export const StoryCardSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string().nullable(),
  variant: z.enum(["default", "highlighted", "light"]).nullable(),
});

export const OffGridStorySchema = z.object({
  __component: z.literal("off-grid.off-grid-story"),
  subtitle: z.string().nullable(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  cards: z.array(StoryCardSchema),
  featuredImage: MediaSchema.nullable(),
  featuredImageAlt: z.string().nullable(),
  featuredTitle: z.string().nullable(),
  featuredDescription: z.string().nullable(),
  featuredHref: z.string().nullable(),
  showReadMore: z.boolean().nullable(),
});
export type OffGridStoryData = z.infer<typeof OffGridStorySchema>;

export const OverlayCardGridSchema = z.object({
  __component: z.literal("off-grid.overlay-card-grid"),
  subtitle: z.string().nullable(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  badge: z.string().nullable(),
  backgroundImage: MediaSchema.nullable(),
  cardLayout: z.enum(["grid", "list"]).nullable(),
  cardColumns: z.number().nullable(),
  overlayOpacity: z.number().nullable(),
  ctaText: z.string().nullable(),
  ctaHref: z.string().nullable(),
  cards: z.array(z.unknown()),
});
export type OverlayCardGridData = z.infer<typeof OverlayCardGridSchema>;

export const OffGridFormSchema = z.object({
  __component: z.literal("off-grid.off-grid-form"),
  subtitle: z.string().nullable(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  image: MediaSchema.nullable(),
});
export type OffGridFormData = z.infer<typeof OffGridFormSchema>;
