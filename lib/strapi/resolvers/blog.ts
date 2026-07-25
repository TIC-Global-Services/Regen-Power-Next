import { strapiImageData } from "../media";
import type { BlogHeroData, BlogCategoryFilterData } from "../schemas/blog";

export interface ResolvedBlogHero {
  subtitle: string;
  mainTitle: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  backgroundImage: string;
}
export function resolveBlogHero(
  data: BlogHeroData | undefined
): ResolvedBlogHero | null {
  if (!data) return null;
  const img = data.backgroundImage ? strapiImageData(data.backgroundImage) : null;
  return {
    subtitle: data.subtitle ?? "",
    mainTitle: data.mainTitle ?? "",
    description: data.description ?? "",
    ctaText: data.ctaText ?? "Get Your Free Quote",
    ctaLink: data.ctaLink ?? "#quote-form",
    backgroundImage: img?.src ?? "",
  };
}

export interface ResolvedBlogCard {
  title: string;
  description: string;
  image: string;
  imagePosition: "right" | "left";
  categoryKey: string;
}
export interface ResolvedBlogCategoryFilter {
  subtitle: string;
  title: string;
  categories: { label: string; value: string }[];
  defaultCategory: string;
  cards: ResolvedBlogCard[];
}
export function resolveBlogCategoryFilter(
  data: BlogCategoryFilterData | undefined
): ResolvedBlogCategoryFilter | null {
  if (!data) return null;
  return {
    subtitle: data.subtitle ?? "",
    title: data.title ?? "",
    defaultCategory: data.defaultCategory ?? "",
    categories: (data.categories ?? []).map((c) => ({
      label: c.label,
      value: c.value,
    })),
    cards: (data.cards ?? []).map((card) => ({
      title: card.title,
      description: card.description,
      image: card.image ? strapiImageData(card.image)?.src ?? "" : "",
      imagePosition: card.imagePosition ?? "right",
      categoryKey: card.categoryKey ?? "",
    })),
  };
}
