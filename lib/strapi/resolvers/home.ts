import { strapiImageData } from "../media";
import type {
  HomeHeroData,
  HomeAwardsData,
  HomeWhyChooseUsData,
  HomeExpertiseData,
  HomeSolarAndStorageData,
  HomePartnersAndMembershipData,
  HomeThreeWaysToPayData,
  HomeCraftmanshipData,
  HomeRealStoriesData,
  HomeSmartSolarData,
  HomeBatteryQuoteData,
} from "../schemas/home";

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
  ctaLink: string;
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
  data: HomeWhyChooseUsData | undefined | null
): ResolvedHomeWhyChooseUs | null {
  if (!data) return null;
  return {
    subtitle: data.subtitle ?? "",
    title: data.title ?? "",
    awardWinnerCount: data.awardWinnerCount ?? 0,
    awardWinnerTitle: data.awardWinnerTitle ?? "",
    awardWinnerBg: src(data.awardWinnerBg),
    awardWinnerLogo: src(data.awardWinnerLogo),
    batteryInstallationsCount: data.batteryInstallationsCount ?? 0,
    batteryInstallationsLabel: data.batteryInstallationsLabel ?? "",
    solarInstallationsCount: data.solarInstallationsCount ?? 0,
    solarInstallationsLabel: data.solarInstallationsLabel ?? "",
    yearsInBusinessCount: data.yearsInBusinessCount ?? 0,
    yearsInBusinessDescription: data.yearsInBusinessDescription ?? "",
    yearsInBusinessBg: src(data.yearsInBusinessBg),
    ratingScore: data.ratingScore ?? 0,
    ratingPlatformLabel: data.ratingPlatformLabel ?? "",
    ratingBg: src(data.ratingBg),
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
  defaultTabId?: string;
}
export function resolveHomeCraftmanship(
  data: HomeCraftmanshipData | undefined | null
): ResolvedHomeCraftmanship | null {
  if (!data) return null;
  return {
    subtitle: data.subtitle ?? "",
    title: data.title ?? "",
    defaultTabId: data.defaultTabId ?? undefined,
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

// ─── Smart Solar (FeatureCardGrid) ──────────────────────────────────────

export interface ResolvedHomeSmartSolarCard {
  title: string;
  description: string;
  image: string | null;
  textPosition?: "top" | "bottom";
  footerTitle?: string;
  footerDescription?: string;
}
export interface ResolvedHomeSmartSolar {
  topSubtitle: string;
  title: string;
  bottomSubtitle: string;
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