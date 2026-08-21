import { strapiImageData } from "../media";
import type {
  PressMediaHeroData,
  PressMediaFeaturedArticleData,
  PressMediaLatestNewsSectionData,
  PressMediaNewsSectionData,
  PressArticleData,
} from "../schemas/press-media";
import {
  ALL_CATEGORIES_KEY,
  cleanDescription,
  normalizeCategoryKey,
  normalizeCategoryLabel,
} from "./blog";

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

/* ─── press-article collection → news grid (same row layout as blog) ─── */

export interface ResolvedPressCard {
  title: string;
  description: string;
  image: string;
  imagePosition: "right" | "left";
  /** first category — kept for back-compat */
  categoryKey: string;
  /** every normalized category on the article */
  categoryKeys: string[];
  /** link target for the article page */
  href: string;
}

export interface ResolvedPressCollection {
  categories: { label: string; value: string }[];
  defaultCategory: string;
  cards: ResolvedPressCard[];
}

/** "/press-media/<slug>" — or "#" when the article has no slug. */
function pressArticleHref(a: PressArticleData): string {
  return a.slug ? `/press-media/${a.slug}` : "#";
}

export function resolvePressArticles(
  articles: PressArticleData[] | undefined | null
): ResolvedPressCollection | null {
  if (!Array.isArray(articles) || articles.length === 0) return null;

  /* Derive category options from the data (most common first). */
  const counts = new Map<string, { label: string; count: number }>();
  for (const a of articles) {
    for (const raw of a.categories ?? []) {
      if (!raw?.trim()) continue;
      const key = normalizeCategoryKey(raw);
      const cur = counts.get(key) ?? { label: normalizeCategoryLabel(raw), count: 0 };
      cur.count += 1;
      counts.set(key, cur);
    }
  }

  const categories = [
    { label: "All", value: ALL_CATEGORIES_KEY },
    ...[...counts.entries()]
      .sort((a, b) => b[1].count - a[1].count || a[1].label.localeCompare(b[1].label))
      .map(([key, { label }]) => ({ label, value: key })),
  ];

  const cards: ResolvedPressCard[] = articles.map((a) => {
    const categoryKeys = Array.from(
      new Set((a.categories ?? []).map((raw) => normalizeCategoryKey(raw)).filter(Boolean))
    );
    return {
      title: a.title ?? "",
      description: cleanDescription(a.description ?? ""),
      image: a.image ? strapiImageData(a.image)?.src ?? "" : "",
      imagePosition: "right",
      categoryKey: categoryKeys[0] ?? "",
      categoryKeys,
      href: pressArticleHref(a),
    };
  });

  return {
    categories,
    defaultCategory: ALL_CATEGORIES_KEY,
    cards,
  };
}

/* ─── single press-article → article detail ─── */

export interface ResolvedPressArticleCategory {
  key: string;
  label: string;
}

export interface ResolvedPressArticle {
  title: string;
  slug: string;
  description: string;
  content: string;
  categories: ResolvedPressArticleCategory[];
  image: string;
  publishedAt: string;
}

export function resolvePressArticle(
  article: PressArticleData | null | undefined
): ResolvedPressArticle | null {
  if (!article) return null;
  const categories = (article.categories ?? [])
    .filter((raw) => raw?.trim())
    .map((raw) => ({
      key: normalizeCategoryKey(raw),
      label: normalizeCategoryLabel(raw),
    }));
  return {
    title: article.title ?? "",
    slug: article.slug ?? "",
    description: article.description ?? "",
    content: article.content ?? "",
    categories,
    image: article.image ? strapiImageData(article.image)?.src ?? "" : "",
    publishedAt: article.publishedAt ?? "",
  };
}

/* ─── latest-articles sidebar list ─── */

export interface ResolvedLatestPressItem {
  title: string;
  href: string;
  image: string;
  publishedAt: string;
}

/** Latest press-articles → minimal items for a "Latest News" sidebar. */
export function resolveLatestPressItems(
  articles: PressArticleData[] | undefined | null
): ResolvedLatestPressItem[] {
  if (!Array.isArray(articles)) return [];
  return articles.map((a) => ({
    title: a.title ?? "",
    href: pressArticleHref(a),
    image: a.image ? strapiImageData(a.image)?.src ?? "" : "",
    publishedAt: a.publishedAt ?? "",
  }));
}
