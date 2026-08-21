import { strapiImageData } from "../media";
import type {
  BlogHeroData,
  BlogCategoryFilterData,
  BlogArticleData,
} from "../schemas/blog";

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
  /** first category — kept for back-compat */
  categoryKey: string;
  /** every normalized category on the article, so a card matches all its pills */
  categoryKeys?: string[];
  /** link target for the card */
  href?: string;
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

/* ─── blog-article collection → blog grid ─── */

const CATEGORY_LABELS: Record<string, string> = {
  news: "News",
  articles: "Articles",
  "solar rebate": "Solar Rebate",
  "solar panels": "Solar Panels",
  "solar system": "Solar System",
};

export const ALL_CATEGORIES_KEY = "all";

/** "News" / "solar panels" → "news" / "solar-panels" */
export function normalizeCategoryKey(raw: string): string {
  return raw
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** "solar panels" → "Solar Panels", with a known-label override map */
export function normalizeCategoryLabel(raw: string): string {
  const lower = raw.trim().toLowerCase().replace(/\s+/g, " ");
  if (CATEGORY_LABELS[lower]) return CATEGORY_LABELS[lower];
  return lower.replace(/\b\w/g, (c) => c.toUpperCase());
}

/** Strip HTML/WordPress markup, collapse whitespace, truncate for a card. */
export function cleanDescription(raw: string, max = 200): string {
  const text = raw
    .replace(/<[^>]*>/g, " ")
    .replace(/\[[^\]]*\]/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
  if (!text) return "";
  return text.length > max ? `${text.slice(0, max).trimEnd()}…` : text;
}

export interface ResolvedBlogCategoryOption {
  label: string;
  value: string;
}

export interface ResolvedBlogCollection {
  categories: ResolvedBlogCategoryOption[];
  defaultCategory: string;
  cards: ResolvedBlogCard[];
}

export function resolveBlogArticles(
  articles: BlogArticleData[] | undefined | null
): ResolvedBlogCollection | null {
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

  const categories: ResolvedBlogCategoryOption[] = [
    { label: "All", value: ALL_CATEGORIES_KEY },
    ...[...counts.entries()]
      .sort((a, b) => b[1].count - a[1].count || a[1].label.localeCompare(b[1].label))
      .map(([key, { label }]) => ({ label, value: key })),
  ];

  const cards: ResolvedBlogCard[] = articles.map((a) => {
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
      href: a.slug ? `/blog/${a.slug}` : "#",
    };
  });

  return {
    categories,
    defaultCategory: ALL_CATEGORIES_KEY,
    cards,
  };
}

/* ─── single blog-article → article detail ─── */

export interface ResolvedBlogArticleCategory {
  key: string;
  label: string;
}

export interface ResolvedBlogArticle {
  title: string;
  slug: string;
  description: string;
  content: string;
  categories: ResolvedBlogArticleCategory[];
  image: string;
  publishedAt: string;
}

export function resolveBlogArticle(
  article: BlogArticleData | null | undefined
): ResolvedBlogArticle | null {
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

export interface ResolvedLatestBlogItem {
  title: string;
  href: string;
  image: string;
  publishedAt: string;
}

/** Latest blog-articles → minimal items for a "Latest Blogs" sidebar. */
export function resolveLatestBlogItems(
  articles: BlogArticleData[] | undefined | null
): ResolvedLatestBlogItem[] {
  if (!Array.isArray(articles)) return [];
  return articles.map((a) => ({
    title: a.title ?? "",
    href: a.slug ? `/blog/${a.slug}` : "#",
    image: a.image ? strapiImageData(a.image)?.src ?? "" : "",
    publishedAt: a.publishedAt ?? "",
  }));
}
