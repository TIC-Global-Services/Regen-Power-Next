import { strapiImageData } from "../media";
import type {
  BatteryStorageBillImpactData,
  BatteryStorageCapacityBlocksData,
  BatteryStorageCustomerStoriesData,
  BatteryStorageDebsRebateData,
  BatteryStorageGreatFitData,
  BatteryStorageHeroData,
  BatteryStorageInstallationTimelineData,
  BatteryStorageJargonData,
  BatteryStorageMarqueeData,
  BatteryStorageRangeGridData,
  BatteryStorageSolarMeaningData,
  BatteryStorageTeamData,
} from "../schemas/battery-storage";

// ─── Hero → HeroSectionData ─────────────────────────────────────────────

export interface ResolvedBatteryStorageHero {
  mediaSrc: string;
  topSubtitle: string;
  mainTitle: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  showOverlay: boolean;
}
export function resolveBatteryStorageHero(
  data: BatteryStorageHeroData | undefined
): ResolvedBatteryStorageHero | null {
  if (!data) return null;
  const img = data.backgroundImage ? strapiImageData(data.backgroundImage) : null;
  return {
    mediaSrc: img?.src ?? "",
    topSubtitle: data.subtitle ?? "",
    mainTitle: data.title ?? "",
    description: data.description ?? "",
    ctaText: data.ctaText ?? "Get Your Free Quote",
    ctaLink: data.ctaLink ?? "#quote",
    showOverlay: data.showOverlay ?? true,
  };
}

// ─── Marquee → BatteryMarqueeData ───────────────────────────────────────

export interface ResolvedBatteryStorageMarquee {
  items: { text: string }[];
}
export function resolveBatteryStorageMarquee(
  data: BatteryStorageMarqueeData | undefined
): ResolvedBatteryStorageMarquee | null {
  if (!data) return null;
  return {
    items: (data.items ?? []).map((i) => ({ text: i.text })),
  };
}

// ─── Debs Rebate Banner → DebsRebateData ────────────────────────────────

export interface ResolvedDebsRebate {
  subtitle: string;
  title: string;
  description: string;
  image: string | null;
  ctaText: string;
  ctaLink: string;
}
export function resolveDebsRebate(
  data: BatteryStorageDebsRebateData | undefined
): ResolvedDebsRebate | null {
  if (!data) return null;
  const img = data.image ? strapiImageData(data.image) : null;
  return {
    subtitle: data.subtitle ?? "",
    title: data.title ?? "",
    description: data.description ?? "",
    image: img?.src ?? null,
    ctaText: data.ctaText ?? "Get Your Free Quote",
    ctaLink: data.ctaLink ?? "/contact",
  };
}

// ─── Jargon (How your battery works) → BatteryJargonData ────────────────

export interface ResolvedJargonCard {
  title: string;
  description: string;
  image: string | null;
}
export interface ResolvedBatteryJargon {
  topSubtitle: string;
  title: string;
  description: string;
  cards: ResolvedJargonCard[];
}
export function resolveBatteryJargon(
  data: BatteryStorageJargonData | undefined
): ResolvedBatteryJargon | null {
  if (!data) return null;
  return {
    topSubtitle: data.topSubtitle ?? "",
    title: data.title ?? "",
    description: data.description ?? "",
    cards: (data.cards ?? []).map((card) => ({
      title: card.title,
      description: card.description,
      image: card.image ? strapiImageData(card.image)?.src ?? null : null,
    })),
  };
}

// ─── Bill Impact (What it does to your bill) → BatteryBillImpactData ─────

export interface ResolvedBillImpactCard {
  title: string;
  description: string;
  image: string | null;
}
export interface ResolvedBatteryBillImpact {
  topSubtitle: string;
  title: string;
  bottomSubtitle?: string;
  cards: ResolvedBillImpactCard[];
}
export function resolveBatteryBillImpact(
  data: BatteryStorageBillImpactData | undefined
): ResolvedBatteryBillImpact | null {
  if (!data) return null;
  return {
    topSubtitle: data.topSubtitle ?? "",
    title: data.title ?? "",
    bottomSubtitle: data.bottomSubtitle ?? undefined,
    cards: (data.cards ?? []).map((card) => ({
      title: card.title,
      description: card.description,
      image: card.image ? strapiImageData(card.image)?.src ?? null : null,
    })),
  };
}

// ─── Range Grid → BatteryRangeGridData ──────────────────────────────────

export interface ResolvedRangeCard {
  title: string;
  description?: string;
  image?: string | null;
  ctaText?: string;
  ctaLink?: string;
}
export interface ResolvedBatteryRangeGrid {
  topSubtitle: string;
  title: string;
  description?: string;
  batteries: ResolvedRangeCard[];
}
export function resolveBatteryRangeGrid(
  data: BatteryStorageRangeGridData | undefined
): ResolvedBatteryRangeGrid | null {
  if (!data) return null;
  return {
    topSubtitle: data.topSubtitle ?? "",
    title: data.title ?? "",
    description: data.description ?? undefined,
    batteries: (data.batteries ?? []).map((b) => ({
      title: b.title,
      description: b.description ?? undefined,
      image: b.image ? strapiImageData(b.image)?.src ?? null : undefined,
      ctaText: b.ctaText ?? undefined,
      ctaLink: b.ctaLink ?? undefined,
    })),
  };
}

// ─── Capacity Blocks → BatteryCapacityData ──────────────────────────────

export interface ResolvedCapacityCard {
  title: string;
  description: string;
  isPrimary?: boolean;
}
export interface ResolvedBatteryCapacity {
  topSubtitle: string;
  title: string;
  description: string;
  cards: ResolvedCapacityCard[];
  footerText: string;
  ctaText: string;
  ctaLink: string;
}
export function resolveBatteryCapacity(
  data: BatteryStorageCapacityBlocksData | undefined
): ResolvedBatteryCapacity | null {
  if (!data) return null;
  return {
    topSubtitle: data.topSubtitle ?? "",
    title: data.title ?? "",
    description: data.description ?? "",
    cards: (data.cards ?? []).map((card) => ({
      title: card.title,
      description: card.description,
      isPrimary: card.isPrimary ?? false,
    })),
    footerText: data.footerText ?? "",
    ctaText: data.ctaText ?? "",
    ctaLink: data.ctaLink ?? "",
  };
}

// ─── Great Fit → GreatFitData ───────────────────────────────────────────

export interface ResolvedGreatFit {
  topSubtitle: string;
  title: string;
  description?: string;
  goodFitTitle: string;
  goodFitItems: string[];
  conversationTitle: string;
  conversationItems: string[];
}
export function resolveGreatFit(
  data: BatteryStorageGreatFitData | undefined
): ResolvedGreatFit | null {
  if (!data) return null;
  return {
    topSubtitle: data.topSubtitle ?? "",
    title: data.title ?? "",
    description: data.description ?? undefined,
    goodFitTitle: data.goodFitTitle ?? "Good Fit",
    goodFitItems: (data.goodFitItems ?? []).map((i) => i.text),
    conversationTitle: data.conversationTitle ?? "Worth A Conversation First",
    conversationItems: (data.conversationItems ?? []).map((i) => i.text),
  };
}

// ─── Solar Meaning (VPP) → SolarBatteryMeaningData ──────────────────────

export interface ResolvedMeaningCard {
  title: string;
  description: string;
  isPrimary?: boolean;
}
export interface ResolvedSolarBatteryMeaning {
  topSubtitle: string;
  title: string;
  description: string;
  cards: ResolvedMeaningCard[];
}
export function resolveSolarBatteryMeaning(
  data: BatteryStorageSolarMeaningData | undefined
): ResolvedSolarBatteryMeaning | null {
  if (!data) return null;
  return {
    topSubtitle: data.topSubtitle ?? "",
    title: data.title ?? "",
    description: data.description ?? "",
    cards: (data.cards ?? []).map((card) => ({
      title: card.title,
      description: card.description,
      isPrimary: card.isPrimary ?? false,
    })),
  };
}

// ─── Installation Timeline → InstallationTimelineData ───────────────────

export interface ResolvedTimelineStep {
  title: string;
  description: string;
  image: string | null;
}
export interface ResolvedInstallationTimeline {
  topSubtitle: string;
  title: string;
  steps: ResolvedTimelineStep[];
}
export function resolveInstallationTimeline(
  data: BatteryStorageInstallationTimelineData | undefined
): ResolvedInstallationTimeline | null {
  if (!data) return null;
  return {
    topSubtitle: data.topSubtitle ?? "",
    title: data.title ?? "",
    steps: (data.steps ?? []).map((s) => ({
      title: s.title,
      description: s.description,
      image: s.image ? strapiImageData(s.image)?.src ?? null : null,
    })),
  };
}

// ─── One Local Team → OneLocalTeamData ──────────────────────────────────

export interface ResolvedTrustCard {
  title: string;
  description: string;
  image: string | null;
}
export interface ResolvedOneLocalTeam {
  topSubtitle: string;
  title: string;
  cards: ResolvedTrustCard[];
  ctaText: string;
  ctaLink: string;
}
export function resolveOneLocalTeam(
  data: BatteryStorageTeamData | undefined
): ResolvedOneLocalTeam | null {
  if (!data) return null;
  return {
    topSubtitle: data.topSubtitle ?? "",
    title: data.title ?? "",
    cards: (data.cards ?? []).map((card) => ({
      title: card.title,
      description: card.description,
      image: card.image ? strapiImageData(card.image)?.src ?? null : null,
    })),
    ctaText: data.ctaText ?? "See Our Customer Reviews",
    ctaLink: data.ctaLink ?? "/reviews",
  };
}

// ─── Customer Stories → CustomerStoriesData ─────────────────────────────

export interface ResolvedStoryCard {
  home: string;
  specs: string;
  description: string;
  image: string | null;
}
export interface ResolvedCustomerStories {
  topSubtitle: string;
  title: string;
  stories: ResolvedStoryCard[];
}
export function resolveCustomerStories(
  data: BatteryStorageCustomerStoriesData | undefined
): ResolvedCustomerStories | null {
  if (!data) return null;
  return {
    topSubtitle: data.topSubtitle ?? "",
    title: data.title ?? "",
    stories: (data.stories ?? []).map((s) => ({
      home: s.home,
      specs: s.specs,
      description: s.description,
      image: s.image ? strapiImageData(s.image)?.src ?? null : null,
    })),
  };
}

// NOTE: shared.faq resolver lives in ./shared.ts (resolveSharedFaq) — reuse that.
