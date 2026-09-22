import { strapiImageData } from "../media";
import type {
  BlogHeroData,
  BlogCategoryFilterData,
  BlogArticleData,
} from "../schemas/blog";
import { resolveSeo, type ResolvedSeo } from "./shared";

export interface ResolvedBlogHero {
  subtitle: string;
  mainTitle: string;
  description: string;
  ctaText: string;
  ctaLink?: string;
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
    ...(data.ctaLink ? { ctaLink: data.ctaLink } : {}),
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
  /** ISO date the article was published — powers the year filter */
  publishedAt?: string;
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

/** "title=\"a\" link=\"b\"" → { title: "a", link: "b" } — used to parse WordPress shortcode attributes. */
function parseShortcodeAttrs(raw: string): Record<string, string> {
  const attrs: Record<string, string> = {};
  const re = /(\w+)\s*=\s*"([^"]*)"/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(raw))) {
    attrs[m[1]] = m[2];
  }
  return attrs;
}

/**
 * Old WordPress content still carries un-rendered shortcodes (`[caption]`,
 * `[button]`, `[gallery]`, `[ico]`, `[youtube]`, `[call_to_action]`,
 * `[video]`) — WordPress used to expand these server-side, but the migrated
 * `content` field kept the raw markup. Converts the ones with a sensible
 * HTML equivalent, and strips the rest (WP `[gallery]` references old
 * numeric attachment IDs we have no mapping for, so it can't be rebuilt).
 */
export function cleanArticleContent(raw: string): string {
  let html = raw;

  // [caption ...]<img .../> Caption text[/caption] → <figure><img/><figcaption>
  html = html.replace(
    /\[caption[^\]]*\]\s*(<img[^>]*\/?>)\s*([\s\S]*?)\[\/caption\]/g,
    (_match, img: string, caption: string) =>
      `<figure class="wp-caption">${img}${
        caption.trim() ? `<figcaption>${caption.trim()}</figcaption>` : ""
      }</figure>`
  );

  // [button title="..." link="..." ...] → real link styled as a button
  html = html.replace(/\[button([^\]]*)\]/g, (_match, attrRaw: string) => {
    const { title, link } = parseShortcodeAttrs(attrRaw);
    if (!link) return "";
    return `<p><a href="${link}" target="_blank" rel="noopener noreferrer" class="wp-shortcode-button">${
      title || link
    }</a></p>`;
  });

  // [youtube video="ID" width=".." height=".."] → responsive embed
  html = html.replace(/\[youtube([^\]]*)\]/g, (_match, attrRaw: string) => {
    const { video } = parseShortcodeAttrs(attrRaw);
    if (!video) return "";
    return `<div class="wp-video-embed"><iframe src="https://www.youtube.com/embed/${video}" title="YouTube video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe></div>`;
  });

  // [video mp4="url" ...][/video] → real <video> element
  html = html.replace(
    /\[video([^\]]*)\]\[\/video\]/g,
    (_match, attrRaw: string) => {
      const { mp4 } = parseShortcodeAttrs(attrRaw);
      if (!mp4) return "";
      return `<video controls class="wp-video" src="${mp4}"></video>`;
    }
  );

  // [call_to_action image="..." title="..." btn_title="..." btn_link="..."] → CTA block
  html = html.replace(
    /\[call_to_action([^\]]*)\]/g,
    (_match, attrRaw: string) => {
      const { image, title, btn_title, btn_link } = parseShortcodeAttrs(attrRaw);
      if (!btn_link) return "";
      return `<div class="wp-cta">${
        image ? `<img src="${image}" alt="" />` : ""
      }${title ? `<p class="wp-cta-title">${title}</p>` : ""}<a href="${btn_link}" target="_blank" rel="noopener noreferrer" class="wp-shortcode-button">${
        btn_title || "Learn more"
      }</a></div>`;
    }
  );

  // [gallery ...] and [ico ...] — no HTML equivalent we can rebuild from the
  // data we have (gallery references old WP attachment IDs; ico is a
  // decorative font-icon), so drop them rather than leave raw brackets.
  html = html.replace(/\[gallery[^\]]*\]/g, "");
  html = html.replace(/\[ico[^\]]*\]/g, "");

  // Safety net: any other un-rendered shortcode from this set that slipped
  // through the specific patterns above (e.g. slightly different attrs).
  html = html.replace(
    /\[\/?(?:caption|button|gallery|ico|youtube|call_to_action|video)(?:[^\]]*)\]/g,
    ""
  );

  return html;
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
      href: a.slug ? `/${a.slug}` : "#",
      publishedAt: a.publishedAt ?? undefined,
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
  updatedAt: string;
  seo: ResolvedSeo | null;
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
    description: cleanDescription(article.description ?? "", Number.MAX_SAFE_INTEGER),
    content: cleanArticleContent(article.content ?? ""),
    categories,
    image: article.image ? strapiImageData(article.image)?.src ?? "" : "",
    publishedAt: article.publishedAt ?? "",
    updatedAt: article.updatedAt ?? article.publishedAt ?? "",
    seo: resolveSeo(article.seo),
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
    href: a.slug ? `/${a.slug}` : "#",
    image: a.image ? strapiImageData(a.image)?.src ?? "" : "",
    publishedAt: a.publishedAt ?? "",
  }));
}
