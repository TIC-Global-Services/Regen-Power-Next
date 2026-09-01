import { strapiImageData } from "../media";
import type {
  HomeHeroData,
  HomeAwardsData,
  HomeWhyChooseUsData,
  HomeStatCardData,
  HomeExpertiseData,
  HomeSolarAndStorageData,
  HomePartnersAndMembershipData,
  HomeThreeWaysToPayData,
  HomeCraftmanshipData,
  HomeRealStoriesData,
  HomeSmartSolarData,
  HomeBatteryQuoteData,
} from "../schemas/home";
import type { TestimonialEntryData } from "../schemas/reviews";
import type { BlogArticleData } from "../schemas/blog";

// ─── Helpers ────────────────────────────────────────────────────────────

const src = (media: { url?: string } | null | undefined): string =>
  media ? strapiImageData(media as never)?.src ?? "" : "";

const alt = (media: { url?: string; alternativeText?: string | null } | null | undefined): string =>
  media && "alternativeText" in media && media.alternativeText
    ? (media.alternativeText as string)
    : "";

// ─── Hero ───────────────────────────────────────────────────────────────

export interface ResolvedHomeHero {
  mediaSrc: string;
  mediaType?: "image" | "video";
  topSubtitle: string;
  mainTitle: string;
  description: string;
  ctaText: string;
  ctaLink?: string;
  isFullScreen?: boolean;
  subtitleColor?: string;
  descriptionColor?: string;
  imageClass?: string;
  CtatextColor?: string;
  showOverlay?: boolean;
  titleColor?: string;
  heightClass?: string;
}
export function resolveHomeHero(
  data: HomeHeroData | undefined | null
): ResolvedHomeHero | null {
  if (!data) return null;
  return {
    mediaSrc: src(data.backgroundImage),
    mediaType: (data.mediaType as "image" | "video") ?? "image",
    topSubtitle: data.subtitle ?? "",
    mainTitle: data.title ?? "",
    description: data.description ?? "",
    ctaText: data.buttonText ?? "",
    ctaLink: data.buttonLink ?? "",
    showOverlay: data.showOverlay ?? true,
    subtitleColor: data.subtitleColor ?? undefined,
    descriptionColor: data.descriptionColor ?? undefined,
    CtatextColor: data.buttonTextColor ?? undefined,
  };
}

// ─── Awards ─────────────────────────────────────────────────────────────

export interface ResolvedHomeAwardLogo {
  src: string;
  alt: string;
}
export interface ResolvedHomeAwards {
  title: string;
  logos: ResolvedHomeAwardLogo[];
}
export function resolveHomeAwards(
  data: HomeAwardsData | undefined | null
): ResolvedHomeAwards | null {
  if (!data) return null;
  return {
    title: data.title ?? "",
    logos: (data.logos ?? []).map((l) => ({
      src: src(l.src),
      alt: l.alt ?? "",
    })),
  };
}

// ─── Why Choose Us ──────────────────────────────────────────────────────

export interface ResolvedHomeStatRow {
  id: string;
  count: number;
  prefix: string;
  suffix: string;
  label: string;
}

export interface ResolvedHomeStatCard {
  id: string;
  count?: number;
  prefix: string;
  suffix: string;
  title: string;
  description: string;
  icon: string;
  image: string;
  logo: string;
  stats: ResolvedHomeStatRow[];
}

export interface ResolvedHomeWhyChooseUs {
  subtitle: string;
  title: string;
  cards: ResolvedHomeStatCard[];
}

const resolveStatCard = (
  id: string,
  c: HomeStatCardData
): ResolvedHomeStatCard => {
  const text = (v?: string | null) => v ?? "";
  return {
    id,
    ...(c.count != null ? { count: c.count } : {}),
    prefix: text(c.prefix),
    suffix: text(c.suffix),
    title: text(c.title),
    description: text(c.description),
    icon: src(c.icon),
    image: src(c.image),
    logo: src(c.logo),
    stats: (c.stats ?? []).map((s) => ({
      id: `row-${s.id}`,
      count: s.count ?? 0,
      prefix: text(s.prefix),
      suffix: text(s.suffix),
      label: text(s.label),
    })),
  };
};

export function resolveHomeWhyChooseUs(
  data: HomeWhyChooseUsData | undefined | null
): ResolvedHomeWhyChooseUs | null {
  if (!data) return null;
  return {
    subtitle: data.subtitle ?? "",
    title: data.title ?? "",
    cards: (data.cards ?? []).map((c) => resolveStatCard(`card-${c.id}`, c)),
  };
}

// ─── Expertise ──────────────────────────────────────────────────────────

export interface ResolvedHomeExpertiseItem {
  title: string;
  image: string;
  icon: string;
  textColor: string;
}
export interface ResolvedHomeExpertise {
  subtitle: string;
  accentTitle: string;
  bgImage: string;
  items: ResolvedHomeExpertiseItem[];
}
export function resolveHomeExpertise(
  data: HomeExpertiseData | undefined | null
): ResolvedHomeExpertise | null {
  if (!data) return null;
  return {
    subtitle: data.subtitle ?? "",
    accentTitle: data.accentTitle ?? "",
    bgImage: src(data.bgImage),
    items: (data.items ?? []).map((item) => ({
      title: item.title,
      image: src(item.image),
      icon: src(item.icon),
      textColor: item.textColor ?? "text-black",
    })),
  };
}

// ─── Solar & Storage (FeatureExplorer) ─────────────────────────────────

export interface ResolvedHomeFeatureItem {
  id: string | number;
  number: string;
  title: string;
  description: string;
  mediaType: "image" | "video";
  mediaSrc?: string;
}
export interface ResolvedHomeSolarAndStorage {
  titleNormal?: string;
  titleAccent?: string;
  data: ResolvedHomeFeatureItem[];
}
export function resolveHomeSolarAndStorage(
  data: HomeSolarAndStorageData | undefined | null
): ResolvedHomeSolarAndStorage | null {
  if (!data) return null;
  return {
    titleNormal: data.titleNormal ?? undefined,
    titleAccent: data.titleAccent ?? undefined,
    data: (data.features ?? []).map((f) => ({
      id: f.id,
      number: f.number ?? "",
      title: f.title ?? "",
      description: f.description ?? "",
      mediaType: (f.mediaType as "image" | "video") ?? "image",
      ...(f.mediaSrc ? { mediaSrc: src(f.mediaSrc) } : {}),
    })),
  };
}

// ─── Partners & Memberships ────────────────────────────────────────────

export interface ResolvedHomeLogoItem {
  name: string;
  image: string;
}
export interface ResolvedHomePartnersAndMembership {
  subtitle: string;
  title: string;
  partnersTitle: string;
  partners: ResolvedHomeLogoItem[];
  membershipsTitle: string;
  memberships: ResolvedHomeLogoItem[];
}
export function resolveHomePartnersAndMembership(
  data: HomePartnersAndMembershipData | undefined | null
): ResolvedHomePartnersAndMembership | null {
  if (!data) return null;
  const map = (item: { name: string | null; image: { url?: string } | null }) => ({
    name: item.name ?? "",
    image: src(item.image),
  });
  return {
    subtitle: data.subtitle ?? "",
    title: data.title ?? "",
    partnersTitle: data.partnersTitle ?? "",
    partners: (data.partners ?? []).map(map),
    membershipsTitle: data.membershipsTitle ?? "",
    memberships: (data.memberships ?? []).map(map),
  };
}

// ─── Three Ways To Pay ──────────────────────────────────────────────────

export interface ResolvedHomeFinancingCard {
  title: string;
  description: string;
  image: string;
  ctaText?: string;
  ctaLink?: string;
}
export interface ResolvedHomeThreeWaysToPay {
  subtitle: string;
  title: string;
  cards: ResolvedHomeFinancingCard[];
}
export function resolveHomeThreeWaysToPay(
  data: HomeThreeWaysToPayData | undefined | null
): ResolvedHomeThreeWaysToPay | null {
  if (!data) return null;
  return {
    subtitle: data.subtitle ?? "",
    title: data.title ?? "",
    cards: (data.cards ?? []).map((c) => ({
      title: c.title,
      description: c.description ?? "",
      image: src(c.image),
      ...(c.ctaText ? { ctaText: c.ctaText } : {}),
      ...(c.ctaLink ? { ctaLink: c.ctaLink } : {}),
    })),
  };
}

// ─── Craftsmanship ──────────────────────────────────────────────────────

export interface ResolvedHomeBrandLogo {
  id: string;
  name: string;
  src: string;
}
export interface ResolvedHomeBrandCategory {
  id: string;
  label: string;
  logos: ResolvedHomeBrandLogo[];
}
export interface ResolvedHomeCraftmanship {
  subtitle: string;
  title: string;
  categories: ResolvedHomeBrandCategory[];
}
export function resolveHomeCraftmanship(
  data: HomeCraftmanshipData | undefined | null
): ResolvedHomeCraftmanship | null {
  if (!data) return null;
  return {
    subtitle: data.subtitle ?? "",
    title: data.title ?? "",
    categories: (data.categories ?? []).map((cat) => ({
      id: String(cat.id),
      label: cat.label ?? "",
      logos: (cat.logos ?? []).map((logo) => ({
        id: String(logo.id),
        name: logo.name ?? "",
        src: src(logo.src),
      })),
    })),
  };
}

// ─── Real Stories ───────────────────────────────────────────────────────

export interface ResolvedHomeBadgeItem {
  id: string;
  src: string;
  alt: string;
}
export interface ResolvedHomeReview {
  id: string;
  systemTitle: string;
  quote: string;
  author: string;
  location: string;
  rating: number;
  source: "google";
}
export interface ResolvedHomeRealStories {
  subtitle: string;
  title: string;
  badges: ResolvedHomeBadgeItem[];
  reviews: ResolvedHomeReview[];
  googleLogo: string;
}
export function resolveHomeRealStories(
  data: HomeRealStoriesData | undefined | null
): ResolvedHomeRealStories | null {
  if (!data) return null;
  return {
    subtitle: data.subtitle ?? "",
    title: data.title ?? "",
    googleLogo: src(data.googleLogo),
    badges: (data.badges ?? []).map((b) => ({
      id: `badge-${b.id}`,
      src: src(b.src),
      alt: b.alt ?? "",
    })),
    reviews: (data.reviews ?? []).map((r) => ({
      id: `review-${r.id}`,
      systemTitle: r.systemTitle ?? "",
      quote: r.quote ?? "",
      author: r.author ?? "",
      location: r.location ?? "",
      rating: r.rating ?? 0,
      source: "google",
    })),
  };
}

/**
 * Map the shared `testimonial` collection (same source as the reviews page
 * grid) onto the home Real Stories marquee cards. Entries missing a name or
 * quote are skipped, mirroring resolveTestimonials on the reviews side.
 */
export interface ResolvedHomeCollectionReview {
  id: string;
  systemTitle: string;
  quote: string;
  author: string;
  location: string;
  rating: number;
  source: "google" | "productreview" | "website";
}
export function resolveHomeReviewsFromCollection(
  entries: TestimonialEntryData[] | undefined | null
): ResolvedHomeCollectionReview[] {
  if (!Array.isArray(entries)) return [];
  return entries.reduce<ResolvedHomeCollectionReview[]>((items, entry) => {
    if (!entry.name || !entry.quote) return items;
    items.push({
      id: `testimonial-${entry.id}`,
      systemTitle: "", // collection has no headline field — card hides it
      quote: entry.quote,
      author: entry.name,
      location: entry.location ?? "",
      rating: entry.rating ?? 0,
      source: entry.source ?? "google",
    });
    return items;
  }, []);
}

// ─── Smart Solar (FeatureCardGrid) ──────────────────────────────────────

export interface ResolvedHomeSmartSolarCard {
  title: string;
  description: string;
  image: string | null;
  textPosition?: "top" | "bottom";
  footerTitle?: string;
  footerDescription?: string;
  href?: string;
}
export interface ResolvedHomeSmartSolar {
  topSubtitle: string;
  title: string;
  bottomSubtitle: string;
  centerButtonText?: string;
  centerButtonLink?: string;
  cards: ResolvedHomeSmartSolarCard[];
}
export function resolveHomeSmartSolar(
  data: HomeSmartSolarData | undefined | null
): ResolvedHomeSmartSolar | null {
  if (!data) return null;
  return {
    topSubtitle: data.topSubtitle ?? "",
    title: data.title ?? "",
    bottomSubtitle: data.bottomSubtitle ?? "",
    ...(data.centerButtonText ? { centerButtonText: data.centerButtonText } : {}),
    ...(data.centerButtonLink ? { centerButtonLink: data.centerButtonLink } : {}),
    cards: (data.cards ?? []).map((c) => ({
      title: c.title,
      description: c.description ?? "",
      image: c.image ? src(c.image) : null,
      ...(c.textPosition ? { textPosition: c.textPosition as "top" | "bottom" } : {}),
      ...(c.footerTitle ? { footerTitle: c.footerTitle } : {}),
      ...(c.footerDescription ? { footerDescription: c.footerDescription } : {}),
    })),
  };
}

// ─── Smart Solar cards ← latest blog-articles ───────────────────────────

/**
 * Map the most recent `blog-article` entries onto the Smart Solar
 * FeatureCardGrid card shape. Text position alternates top/bottom to keep
 * the section's staggered look. Articles are already sorted newest-first
 * by the fetcher (publishedAt:desc).
 */
export function resolveSmartSolarCardsFromArticles(
  articles: BlogArticleData[] | undefined | null,
  limit = 3
): ResolvedHomeSmartSolarCard[] {
  if (!Array.isArray(articles)) return [];
  return articles.slice(0, limit).map((a, i) => ({
    title: a.title ?? "",
    description: a.description ?? "",
    image: a.image ? src(a.image) : null,
    ...(i % 2 === 0 ? { textPosition: "top" as const } : { textPosition: "bottom" as const }),
    ...(a.slug ? { href: `/blog/${a.slug}` } : {}),
  }));
}

// ─── Battery Quote ──────────────────────────────────────────────────────

export interface ResolvedHomeBatteryQuote {
  subtitle: string;
  title: string;
  description: string;
  image: string;
}
export function resolveHomeBatteryQuote(
  data: HomeBatteryQuoteData | undefined | null
): ResolvedHomeBatteryQuote | null {
  if (!data) return null;
  return {
    subtitle: data.subtitle ?? "",
    title: data.title ?? "",
    description: data.description ?? "",
    image: src(data.image),
  };
}