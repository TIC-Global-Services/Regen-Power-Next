import { strapiImageData, type StrapiImageData } from "../media";
import type { FeatureCardItem } from "@/reuseables/FeatureCardGrid";
import type {
  HomeHeroData,
  HomeAwardsData,
  HomeWhyChooseUsData,
  HomeExpertiseData,
  HomeSolarAndStorageData,
  HomePartnersAndMembershipData,
  HomeThreeWaysToPayData,
  HomeCraftsmanshipData,
  HomeRealStoriesData,
  HomeSmartSolarData,
  HomeBatteryQuoteData,
} from "../schemas/home";
import type { HeroProps } from "@/reuseables/Hero";

// ─── Hero ────────────────────────────────────────────────────────────────────

export type ResolvedHomeHero = HeroProps;
export function resolveHomeHero(
  data: HomeHeroData | undefined
): ResolvedHomeHero | null {
  if (!data) return null;
  const img = data.backgroundImage ? strapiImageData(data.backgroundImage) : null;
  return {
    mediaSrc: img?.src ?? "",
    mediaType: data.mediaType === "video" ? "video" : "image",
    topSubtitle: data.subtitle ?? "",
    mainTitle: data.title ?? "",
    description: data.description ?? "",
    ctaText: data.buttonText ?? "Get Started",
    ctaLink: data.buttonLink ?? "/contact",
    subtitleColor: data.subtitleColor ?? undefined,
    descriptionColor: data.descriptionColor ?? undefined,
    CtatextColor: data.buttonTextColor ?? undefined,
    showOverlay: data.showOverlay ?? true,
  };
}

// ─── Awards ──────────────────────────────────────────────────────────────────

export interface ResolvedHomeAwards {
  title: string;
  logos: { src: string; alt: string }[];
}
export function resolveHomeAwards(
  data: HomeAwardsData | undefined
): ResolvedHomeAwards | null {
  if (!data) return null;
  return {
    title: data.title ?? "",
    logos: (data.logos ?? []).map((logo) => {
      const img = logo.image?.[0] ? strapiImageData(logo.image[0]) : null;
      return {
        src: img?.src ?? "",
        alt: logo.title ?? "",
      };
    }),
  };
}

// ─── Why Choose Us ───────────────────────────────────────────────────────────

export interface ResolvedHomeWhyChooseUs {
  subtitle: string;
  title: string;
  awardWinnerCount: number;
  awardWinnerTitle: string;
  awardWinnerBg: string;
  awardWinnerLogo: string;
  batteryInstallationsCount: number;
  batteryInstallationsLabel: string;
  solarInstallationsCount: number;
  solarInstallationsLabel: string;
  yearsInBusinessCount: number;
  yearsInBusinessDescription: string;
  yearsInBusinessBg: string;
  ratingScore: number;
  ratingPlatformLabel: string;
  ratingBg: string;
}
export function resolveHomeWhyChooseUs(
  data: HomeWhyChooseUsData | undefined
): ResolvedHomeWhyChooseUs | null {
  if (!data) return null;
  const awardBg = data.awardWinnerBg ? strapiImageData(data.awardWinnerBg) : null;
  const awardLogo = data.awardWinnerLogo ? strapiImageData(data.awardWinnerLogo) : null;
  const yearsBg = data.yearsInBusinessBg ? strapiImageData(data.yearsInBusinessBg) : null;
  const ratingImg = data.ratingBg ? strapiImageData(data.ratingBg) : null;
  return {
    subtitle: data.subtitle ?? "",
    title: data.title ?? "",
    awardWinnerCount: data.awardWinnerCount ?? 0,
    awardWinnerTitle: data.awardWinnerTitle ?? "",
    awardWinnerBg: awardBg?.src ?? "",
    awardWinnerLogo: awardLogo?.src ?? "",
    batteryInstallationsCount: data.batteryInstallationsCount ?? 0,
    batteryInstallationsLabel: data.batteryInstallationsLabel ?? "",
    solarInstallationsCount: data.solarInstallationsCount ?? 0,
    solarInstallationsLabel: data.solarInstallationsLabel ?? "",
    yearsInBusinessCount: data.yearsInBusinessCount ?? 0,
    yearsInBusinessDescription: data.yearsInBusinessDescription ?? "",
    yearsInBusinessBg: yearsBg?.src ?? "",
    ratingScore: data.ratingScore ?? 5,
    ratingPlatformLabel: data.ratingPlatformLabel ?? "",
    ratingBg: ratingImg?.src ?? "",
  };
}

// ─── Expertise ───────────────────────────────────────────────────────────────

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
  data: HomeExpertiseData | undefined
): ResolvedHomeExpertise | null {
  if (!data) return null;
  const bg = data.bgImage ? strapiImageData(data.bgImage) : null;
  return {
    subtitle: data.subtitle ?? "",
    accentTitle: data.accentTitle ?? "",
    bgImage: bg?.src ?? "",
    items: (data.items ?? []).map((item) => ({
      title: item.title,
      image: strapiImageData(item.image)?.src ?? "",
      icon: strapiImageData(item.icon)?.src ?? "",
      textColor: item.textColor ?? "text-black",
    })),
  };
}

// ─── Solar And Storage (Feature Explorer) ────────────────────────────────────

export interface ResolvedHomeFeatureItem {
  id: number;
  number: string;
  title: string;
  description: string;
}
export interface ResolvedHomeSolarAndStorage {
  titleNormal: string;
  titleAccent: string;
  mediaSrc: string;
  features: ResolvedHomeFeatureItem[];
}
export function resolveHomeSolarAndStorage(
  data: HomeSolarAndStorageData | undefined
): ResolvedHomeSolarAndStorage | null {
  if (!data) return null;
  const img = data.media ? strapiImageData(data.media) : null;
  return {
    titleNormal: data.titleNormal ?? "",
    titleAccent: data.titleAccent ?? "",
    mediaSrc: img?.src ?? "/solar_house_render.png",
    features: (data.features ?? []).map((f) => ({
      id: f.id,
      number: f.number,
      title: f.title,
      description: f.description,
    })),
  };
}

// ─── Partners & Memberships ──────────────────────────────────────────────────

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
  data: HomePartnersAndMembershipData | undefined
): ResolvedHomePartnersAndMembership | null {
  if (!data) return null;
  return {
    subtitle: data.subtitle ?? "",
    title: data.title ?? "",
    partnersTitle: data.partnersTitle ?? "Partners",
    partners: (data.partners ?? []).map((p) => ({
      name: p.name,
      image: strapiImageData(p.image)?.src ?? "",
    })),
    membershipsTitle: data.membershipsTitle ?? "Memberships",
    memberships: (data.memberships ?? []).map((m) => ({
      name: m.name,
      image: strapiImageData(m.image)?.src ?? "",
    })),
  };
}

// ─── Three Ways To Pay ───────────────────────────────────────────────────────

export interface ResolvedHomeFinancingCard {
  title: string;
  description: string;
  image: string;
  ctaText?: string;
}
export interface ResolvedHomeThreeWaysToPay {
  subtitle: string;
  title: string;
  cards: ResolvedHomeFinancingCard[];
}
export function resolveHomeThreeWaysToPay(
  data: HomeThreeWaysToPayData | undefined
): ResolvedHomeThreeWaysToPay | null {
  if (!data) return null;
  return {
    subtitle: data.subtitle ?? "",
    title: data.title ?? "",
    cards: (data.cards ?? []).map((c) => ({
      title: c.title,
      description: c.description,
      image: strapiImageData(c.image)?.src ?? "",
      ctaText: c.ctaText ?? undefined,
    })),
  };
}

// ─── Craftsmanship ───────────────────────────────────────────────────────────

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
export interface ResolvedHomeCraftsmanship {
  subtitle: string;
  title: string;
  defaultTabId?: string;
  categories: ResolvedHomeBrandCategory[];
}
export function resolveHomeCraftsmanship(
  data: HomeCraftsmanshipData | undefined
): ResolvedHomeCraftsmanship | null {
  if (!data) return null;
  return {
    subtitle: data.subtitle ?? "",
    title: data.title ?? "",
    defaultTabId: data.defaultTabId ?? undefined,
    categories: (data.categories ?? []).map((cat) => ({
      id: `cat-${cat.id}`,
      label: cat.label,
      logos: (cat.logos ?? []).map((logo) => ({
        id: `logo-${logo.id}`,
        name: logo.name,
        src: strapiImageData(logo.image)?.src ?? "",
      })),
    })),
  };
}

// ─── Real Stories ────────────────────────────────────────────────────────────

export interface ResolvedHomeBadgeItem {
  id: string;
  src: string;
  alt: string;
}
export interface ResolvedHomeReviewItem {
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
  googleLogo: string;
  badges: ResolvedHomeBadgeItem[];
  reviews: ResolvedHomeReviewItem[];
}
export function resolveHomeRealStories(
  data: HomeRealStoriesData | undefined
): ResolvedHomeRealStories | null {
  if (!data) return null;
  const googleImg = data.googleLogo ? strapiImageData(data.googleLogo) : null;
  return {
    subtitle: data.subtitle ?? "",
    title: data.title ?? "",
    googleLogo: googleImg?.src ?? "",
    badges: (data.badges ?? []).map((b) => ({
      id: `badge-${b.id}`,
      src: strapiImageData(b.image)?.src ?? "",
      alt: b.alt ?? "",
    })),
    reviews: (data.reviews ?? []).map((r) => ({
      id: `review-${r.id}`,
      systemTitle: r.title ?? "",
      quote: r.review ?? "",
      author: r.author ?? "",
      location: r.location ?? "",
      rating: r.rating ?? 5,
      source: "google",
    })),
  };
}

// ─── Smart Solar (Latest News & Insights) ────────────────────────────────────

export interface ResolvedHomeSmartSolar {
  topSubtitle: string;
  title: string;
  cards: FeatureCardItem[];
}
export function resolveHomeSmartSolar(
  data: HomeSmartSolarData | undefined
): ResolvedHomeSmartSolar | null {
  if (!data) return null;
  return {
    topSubtitle: data.topSubtitle ?? "",
    title: data.title ?? "",
    cards: (data.cards ?? []).map((c) => ({
      title: c.title,
      description: c.description,
      image: strapiImageData(c.image)?.src ?? "",
      textPosition: (c.textPosition as "top" | "bottom") ?? "top",
      footerTitle: c.footerTitle ?? "",
      footerDescription: c.footerDescription ?? "",
    })),
  };
}

// ─── Battery Quote CTA ──────────────────────────────────────────────────────

export interface ResolvedHomeBatteryQuote {
  subtitle: string;
  title: string;
  description: string;
  image: string;
}
export function resolveHomeBatteryQuote(
  data: HomeBatteryQuoteData | undefined
): ResolvedHomeBatteryQuote | null {
  if (!data) return null;
  const img = data.image ? strapiImageData(data.image) : null;
  return {
    subtitle: data.subtitle ?? "",
    title: data.title ?? "",
    description: data.description ?? "",
    image: img?.src ?? "",
  };
}
