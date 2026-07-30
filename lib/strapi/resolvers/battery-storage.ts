import { strapiImageData } from "../media";
import type { HeroProps } from "@/reuseables/Hero";
import type {
  BatteryStorageHeroData,
  BatteryStorageMarqueeData,
  BatteryStorageDebsRebateData,
  BatteryStorageJargonData,
  BatteryStorageBillImpactData,
  BatteryStorageRangeGridData,
  BatteryStorageCapacityBlocksData,
  BatteryStorageGreatFitData,
  BatteryStorageSolarMeaningData,
  BatteryStorageInstallationTimelineData,
  BatteryStorageTeamData,
  BatteryStorageCustomerStoriesData,
} from "../schemas/battery-storage";

export type ResolvedBatteryStorageHero = HeroProps;
export function resolveBatteryStorageHero(
  data: BatteryStorageHeroData | undefined
): ResolvedBatteryStorageHero | null {
  if (!data) return null;
  const img = data.backgroundImage ? strapiImageData(data.backgroundImage) : null;
  return {
    mediaSrc: img?.src ?? "",
    mediaType: "image",
    topSubtitle: data.subtitle ?? "",
    mainTitle: data.title ?? "",
    description: data.description ?? "",
    ctaText: data.buttonText ?? "",
    ctaLink: data.buttonLink ?? "/contact",
    subtitleColor: "text-white",
    descriptionColor: "text-white",
    showOverlay: data.showOverlay ?? true,
  };
}

export interface ResolvedBatteryStorageMarquee {
  items: string[];
}
export function resolveBatteryStorageMarquee(
  data: BatteryStorageMarqueeData | undefined
): ResolvedBatteryStorageMarquee | null {
  if (!data) return null;
  return { items: data.items ?? [] };
}

export interface ResolvedDebsRebate {
  subtitle: string;
  title: string;
  description: string;
  image: string;
  ctaText: string;
  ctaLink: string;
}
export function resolveBatteryStorageDebsRebate(
  data: BatteryStorageDebsRebateData | undefined
): ResolvedDebsRebate | null {
  if (!data) return null;
  const img = data.image ? strapiImageData(data.image) : null;
  return {
    subtitle: data.subtitle ?? "",
    title: data.title ?? "",
    description: data.description ?? "",
    image: img?.src ?? "",
    ctaText: data.ctaText ?? "",
    ctaLink: data.ctaLink ?? "#contact",
  };
}

export interface ResolvedImageCard {
  title: string;
  description: string;
  image: string;
}
function mapImageCard(card: { title?: string | null; description?: string | null; image?: unknown }): ResolvedImageCard {
  return {
    title: card.title ?? "",
    description: card.description ?? "",
    image: strapiImageData(card.image as any)?.src ?? "",
  };
}

export interface ResolvedBatteryStorageJargon {
  topSubtitle: string;
  title: string;
  bottomSubtitle: string;
  cards: ResolvedImageCard[];
}
export function resolveBatteryStorageJargon(
  data: BatteryStorageJargonData | undefined
): ResolvedBatteryStorageJargon | null {
  if (!data) return null;
  return {
    topSubtitle: data.topSubtitle ?? "",
    title: data.title ?? "",
    bottomSubtitle: data.bottomSubtitle ?? "",
    cards: (data.cards ?? []).map(mapImageCard),
  };
}

export interface ResolvedBatteryStorageBillImpact {
  topSubtitle: string;
  title: string;
  description: string;
  cards: ResolvedImageCard[];
}
export function resolveBatteryStorageBillImpact(
  data: BatteryStorageBillImpactData | undefined
): ResolvedBatteryStorageBillImpact | null {
  if (!data) return null;
  return {
    topSubtitle: data.topSubtitle ?? "",
    title: data.title ?? "",
    description: data.description ?? "",
    cards: (data.cards ?? []).map(mapImageCard),
  };
}

export interface ResolvedRangeCard {
  title: string;
  description: string;
  image: string;
  ctaText: string;
  ctaLink: string;
}
export interface ResolvedBatteryStorageRangeGrid {
  topSubtitle: string;
  title: string;
  description: string;
  batteries: ResolvedRangeCard[];
}
export function resolveBatteryStorageRangeGrid(
  data: BatteryStorageRangeGridData | undefined
): ResolvedBatteryStorageRangeGrid | null {
  if (!data) return null;
  return {
    topSubtitle: data.topSubtitle ?? "",
    title: data.title ?? "",
    description: data.description ?? "",
    batteries: (data.batteries ?? []).map((b) => ({
      title: b.title ?? "",
      description: b.description ?? "",
      image: strapiImageData(b.image)?.src ?? "",
      ctaText: b.ctaText ?? "",
      ctaLink: b.ctaLink ?? "#contact",
    })),
  };
}

export interface ResolvedCapacityCard {
  title: string;
  description: string;
  isPrimary: boolean;
}
export interface ResolvedBatteryStorageCapacityBlocks {
  topSubtitle: string;
  title: string;
  description: string;
  cards: ResolvedCapacityCard[];
  footerText: string;
  ctaText: string;
  ctaLink: string;
}
export function resolveBatteryStorageCapacityBlocks(
  data: BatteryStorageCapacityBlocksData | undefined
): ResolvedBatteryStorageCapacityBlocks | null {
  if (!data) return null;
  return {
    topSubtitle: data.topSubtitle ?? "",
    title: data.title ?? "",
    description: data.description ?? "",
    cards: (data.cards ?? []).map((c) => ({
      title: c.title ?? "",
      description: c.description ?? "",
      isPrimary: c.isPrimary ?? false,
    })),
    footerText: data.footerText ?? "",
    ctaText: data.ctaText ?? "",
    ctaLink: data.ctaLink ?? "#contact",
  };
}

export interface ResolvedBatteryStorageGreatFit {
  topSubtitle: string;
  title: string;
  description: string;
  goodFitTitle: string;
  goodFitItems: string[];
  conversationTitle: string;
  conversationItems: string[];
}
export function resolveBatteryStorageGreatFit(
  data: BatteryStorageGreatFitData | undefined
): ResolvedBatteryStorageGreatFit | null {
  if (!data) return null;
  return {
    topSubtitle: data.topSubtitle ?? "",
    title: data.title ?? "",
    description: data.description ?? "",
    goodFitTitle: data.goodFitTitle ?? "",
    goodFitItems: data.goodFitItems ?? [],
    conversationTitle: data.conversationTitle ?? "",
    conversationItems: data.conversationItems ?? [],
  };
}

export interface ResolvedMeaningCard {
  title: string;
  description: string;
  isPrimary: boolean;
}
export interface ResolvedBatteryStorageSolarMeaning {
  topSubtitle: string;
  title: string;
  description: string;
  cards: ResolvedMeaningCard[];
}
export function resolveBatteryStorageSolarMeaning(
  data: BatteryStorageSolarMeaningData | undefined
): ResolvedBatteryStorageSolarMeaning | null {
  if (!data) return null;
  return {
    topSubtitle: data.topSubtitle ?? "",
    title: data.title ?? "",
    description: data.description ?? "",
    cards: (data.cards ?? []).map((c) => ({
      title: c.title ?? "",
      description: c.description ?? "",
      isPrimary: c.isPrimary ?? false,
    })),
  };
}

export interface ResolvedTimelineStep {
  title: string;
  description: string;
  image: string;
}
export interface ResolvedBatteryStorageInstallationTimeline {
  topSubtitle: string;
  title: string;
  steps: ResolvedTimelineStep[];
}
export function resolveBatteryStorageInstallationTimeline(
  data: BatteryStorageInstallationTimelineData | undefined
): ResolvedBatteryStorageInstallationTimeline | null {
  if (!data) return null;
  return {
    topSubtitle: data.topSubtitle ?? "",
    title: data.title ?? "",
    steps: (data.steps ?? []).map((s) => ({
      title: s.title ?? "",
      description: s.description ?? "",
      image: strapiImageData(s.image)?.src ?? "",
    })),
  };
}

export interface ResolvedTrustCard {
  image: string;
  title: string;
  description: string;
}
export interface ResolvedBatteryStorageTeam {
  topSubtitle: string;
  title: string;
  cards: ResolvedTrustCard[];
  ctaText: string;
  ctaLink: string;
}
export function resolveBatteryStorageTeam(
  data: BatteryStorageTeamData | undefined
): ResolvedBatteryStorageTeam | null {
  if (!data) return null;
  return {
    topSubtitle: data.topSubtitle ?? "",
    title: data.title ?? "",
    cards: (data.cards ?? []).map((c) => ({
      image: strapiImageData(c.image)?.src ?? "",
      title: c.title ?? "",
      description: c.description ?? "",
    })),
    ctaText: data.ctaText ?? "",
    ctaLink: data.ctaLink ?? "#contact",
  };
}

export interface ResolvedStoryCard {
  quote: string;
  author: string;
  location: string;
  image: string;
}
export interface ResolvedBatteryStorageCustomerStories {
  topSubtitle: string;
  title: string;
  stories: ResolvedStoryCard[];
}
export function resolveBatteryStorageCustomerStories(
  data: BatteryStorageCustomerStoriesData | undefined
): ResolvedBatteryStorageCustomerStories | null {
  if (!data) return null;
  return {
    topSubtitle: data.topSubtitle ?? "",
    title: data.title ?? "",
    stories: (data.stories ?? []).map((s) => ({
      quote: s.quote ?? "",
      author: s.author ?? "",
      location: s.location ?? "",
      image: strapiImageData(s.image)?.src ?? "",
    })),
  };
}
