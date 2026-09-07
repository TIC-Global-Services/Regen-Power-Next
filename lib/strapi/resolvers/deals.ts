import { strapiImageData } from "../media";
import type { StrapiImageData } from "../media";
import type {
  DealsHeroData,
  DealsPhilosophyData,
  DealsGridData,
  DealsWaysToPayData,
  DealsWhyMattersData,
} from "../schemas/deals";

export interface ResolvedDealsHero {
  mediaSrc: string;
  subtitle: string;
  title: string;
  description: string;
  ctaText: string;
  ctaLink?: string;
}
export function resolveDealsHero(
  data: DealsHeroData | undefined
): ResolvedDealsHero | null {
  if (!data) return null;
  const img = data.backgroundImage ? strapiImageData(data.backgroundImage) : null;
  return {
    mediaSrc: img?.src ?? "",
    subtitle: data.subtitle ?? "",
    title: data.title ?? "",
    description: data.description ?? "",
    ctaText: data.ctaText ?? "Get My Tailored Quote",
    ...(data.ctaLink ? { ctaLink: data.ctaLink } : {}),
  };
}

export interface ResolvedDealsPhilosophy {
  badge: string;
  subtitle: string;
  title: string;
  paragraphs: { text: string; isSecondary: boolean }[];
}
export function resolveDealsPhilosophy(
  data: DealsPhilosophyData | undefined
): ResolvedDealsPhilosophy | null {
  if (!data) return null;
  return {
    badge: data.badge ?? "",
    subtitle: data.subtitle ?? "",
    title: data.title ?? "",
    paragraphs: (data.paragraphs ?? []).map((p) => ({
      text: p.text,
      isSecondary: p.isSecondary,
    })),
  };
}

export interface ResolvedDealsGridPromotion {
  title: string;
  description: string;
  image: StrapiImageData | null;
}
export interface ResolvedDealsGrid {
  subtitle: string;
  title: string;
  description: string | null;
  ctaText: string;
  ctaLink?: string;
  promotions: ResolvedDealsGridPromotion[];
}
export function resolveDealsGrid(
  data: DealsGridData | undefined
): ResolvedDealsGrid | null {
  if (!data) return null;
  return {
    subtitle: data.subtitle ?? "",
    title: data.title ?? "",
    description: data.description,
    ctaText: data.ctaText ?? "Get This Bundle Quoted",
    ...(data.ctaLink ? { ctaLink: data.ctaLink } : {}),
    promotions: (data.promotions ?? []).map((p) => ({
      title: p.title,
      description: p.description,
      image: p.image ? strapiImageData(p.image) : null,
    })),
  };
}

export interface ResolvedDealsPaymentCard {
  title: string;
  description: string;
  footerTitle: string;
  footerDescription: string;
  image: StrapiImageData | null;
}
export interface ResolvedDealsWaysToPay {
  topSubtitle: string;
  title: string;
  bottomSubtitle: string;
  cards: ResolvedDealsPaymentCard[];
}
export function resolveDealsWaysToPay(
  data: DealsWaysToPayData | undefined
): ResolvedDealsWaysToPay | null {
  if (!data) return null;
  return {
    topSubtitle: data.topSubtitle ?? "",
    title: data.title ?? "",
    bottomSubtitle: data.bottomSubtitle ?? "",
    cards: (data.cards ?? []).map((card) => ({
      title: card.title,
      description: card.description,
      footerTitle: card.footerTitle ?? "",
      footerDescription: card.footerDescription ?? "",
      image: card.image ? strapiImageData(card.image) : null,
    })),
  };
}

export interface ResolvedDealsWhyMattersItem {
  title: string;
  description: string;
  image: StrapiImageData | null;
}
export interface ResolvedDealsWhyMatters {
  subtitle: string;
  heading: string;
  introText: string;
  items: ResolvedDealsWhyMattersItem[];
}
export function resolveDealsWhyMatters(
  data: DealsWhyMattersData | undefined
): ResolvedDealsWhyMatters | null {
  if (!data) return null;
  return {
    subtitle: data.subtitle ?? "",
    heading: data.heading ?? "",
    introText: data.introText ?? "",
    items: (data.items ?? []).map((item) => ({
      title: item.title,
      description: item.description,
      image: item.image ? strapiImageData(item.image) : null,
    })),
  };
}
