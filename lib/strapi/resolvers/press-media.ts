import { strapiImageData } from "../media";
import type {
  PressMediaHeroData,
  PressMediaFeaturedArticleData,
  PressMediaLatestNewsSectionData,
  PressMediaNewsSectionData,
} from "../schemas/press-media";

export interface ResolvedPressMediaHero {
  subtitle: string;
  mainTitle: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  backgroundImage: string;
}
export function resolvePressMediaHero(
  data: PressMediaHeroData | undefined
): ResolvedPressMediaHero | null {
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

export interface ResolvedPressMediaFeaturedArticle {
  image: string;
  title: string;
  description: string;
  href: string;
}
export function resolvePressMediaFeaturedArticle(
  data: PressMediaFeaturedArticleData | undefined
): ResolvedPressMediaFeaturedArticle | null {
  if (!data) return null;
  const img = data.image ? strapiImageData(data.image) : null;
  return {
    image: img?.src ?? "",
    title: data.title ?? "",
    description: data.description ?? "",
    href: data.href ?? "",
  };
}

export interface ResolvedPressMediaNewsItem {
  title: string;
  description: string;
  image: string;
  href: string;
}
export interface ResolvedPressMediaLatestNewsSection {
  subtitle: string;
  title: string;
  items: ResolvedPressMediaNewsItem[];
}
export function resolvePressMediaLatestNewsSection(
  data: PressMediaLatestNewsSectionData | undefined
): ResolvedPressMediaLatestNewsSection | null {
  if (!data) return null;
  return {
    subtitle: data.subtitle ?? "Latest",
    title: data.title ?? "News",
    items: (data.items ?? []).map((item) => {
      const img = item.image ? strapiImageData(item.image) : null;
      return {
        title: item.title ?? "",
        description: item.description ?? "",
        image: img?.src ?? "",
        href: item.href ?? "",
      };
    }),
  };
}

export interface ResolvedPressMediaCard {
  title: string;
  description: string;
  image: string;
  categoryKey?: string;
}
export interface ResolvedPressMediaNewsSection {
  subtitle: string;
  title: string;
  categories: { label: string; value: string }[];
  defaultCategory: string;
  cards: ResolvedPressMediaCard[];
}
export function resolvePressMediaNewsSection(
  data: PressMediaNewsSectionData | undefined
): ResolvedPressMediaNewsSection | null {
  if (!data) return null;
  return {
    subtitle: data.subtitle ?? "Browse",
    title: data.title ?? "All News",
    defaultCategory: data.defaultCategory ?? "",
    categories: (data.categories ?? []).map((c) => ({
      label: c.label,
      value: c.value,
    })),
    cards: (data.cards ?? []).map((card) => ({
      title: card.title,
      description: card.description ?? "",
      image: card.image ? strapiImageData(card.image)?.src ?? "" : "",
      ...(card.categoryKey ? { categoryKey: card.categoryKey } : {}),
    })),
  };
}
