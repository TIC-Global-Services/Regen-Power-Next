import { strapiImageData } from "../media";
import type {
  SmartHomeBrandsGridData,
  SmartHomeFourPillarsData,
  SmartHomeGreatFitData,
  SmartHomeHeroData,
  SmartHomeInstallBentoData,
  SmartHomeSplitSectionData,
  SmartHomeTimelineData,
} from "../schemas/smart-home-battery";

// ─── Hero → HeroSectionData ─────────────────────────────────────────────

export interface ResolvedSmartHomeHero {
  mediaSrc: string;
  topSubtitle: string;
  mainTitle: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  showOverlay: boolean;
}
export function resolveSmartHomeHero(
  data: SmartHomeHeroData | undefined
): ResolvedSmartHomeHero | null {
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

// NOTE: the marquee section uses `battery-storage.marquee` — reuse
// resolveBatteryStorageMarquee from ./battery-storage.

// ─── Great Fit → GreatFitData ───────────────────────────────────────────

export interface ResolvedSmartHomeGreatFit {
  topSubtitle: string;
  title: string;
  description?: string;
  leftTitle: string;
  leftItems: string[];
  rightTitle: string;
  rightItems: string[];
}
export function resolveSmartHomeGreatFit(
  data: SmartHomeGreatFitData | undefined
): ResolvedSmartHomeGreatFit | null {
  if (!data) return null;
  return {
    topSubtitle: data.topSubtitle ?? "",
    title: data.title ?? "",
    description: data.description ?? undefined,
    leftTitle: data.goodFitTitle ?? "Good Fit",
    leftItems: (data.goodFitItems ?? []).map((i) => i.text),
    rightTitle: data.conversationTitle ?? "Worth A Conversation First",
    rightItems: (data.conversationItems ?? []).map((i) => i.text),
  };
}

// ─── Four Pillars → FourPillarsData ─────────────────────────────────────

export interface ResolvedFourPillarsCard {
  title: string;
  description: string;
  image: string | null;
}
export interface ResolvedFourPillars {
  topSubtitle: string;
  title: string;
  description?: string;
  cards: ResolvedFourPillarsCard[];
}
export function resolveFourPillars(
  data: SmartHomeFourPillarsData | undefined
): ResolvedFourPillars | null {
  if (!data) return null;
  return {
    topSubtitle: data.topSubtitle ?? "",
    title: data.title ?? "",
    description: data.description ?? undefined,
    cards: (data.cards ?? []).map((card) => ({
      title: card.title,
      description: card.description,
      image: card.image ? strapiImageData(card.image)?.src ?? null : null,
    })),
  };
}

// ─── Split Section → BatterySplitData ───────────────────────────────────

export interface ResolvedSplitBlock {
  title: string;
  description: string;
}
export interface ResolvedSplitSlide {
  topSubtitle: string;
  title: string;
  mainDescription: string;
  blocks: ResolvedSplitBlock[];
  ctaText: string;
  ctaLink: string;
  image: string | null;
}
export interface ResolvedBatterySplit {
  slides: ResolvedSplitSlide[];
}
export function resolveBatterySplit(
  data: SmartHomeSplitSectionData | undefined
): ResolvedBatterySplit | null {
  if (!data) return null;
  return {
    slides: (data.slides ?? []).map((slide) => ({
      topSubtitle: slide.topSubtitle,
      title: slide.title,
      mainDescription: slide.mainDescription,
      blocks: (slide.blocks ?? []).map((b) => ({
        title: b.title,
        description: b.description,
      })),
      ctaText: slide.ctaText,
      ctaLink: slide.ctaLink,
      image: slide.image ? strapiImageData(slide.image)?.src ?? null : null,
    })),
  };
}

// ─── Timeline → BatteryTimelineData ─────────────────────────────────────

export interface ResolvedTimelineEvent {
  time: string;
  title: string;
  description: string;
}
export interface ResolvedBatteryTimeline {
  topSubtitle: string;
  title: string;
  events: ResolvedTimelineEvent[];
}
export function resolveBatteryTimeline(
  data: SmartHomeTimelineData | undefined
): ResolvedBatteryTimeline | null {
  if (!data) return null;
  return {
    topSubtitle: data.topSubtitle ?? "",
    title: data.title ?? "",
    events: (data.events ?? []).map((e) => ({
      time: e.time,
      title: e.title,
      description: e.description,
    })),
  };
}

// ─── Brands Grid → BatteryBrandsGridData ────────────────────────────────

export interface ResolvedBrandSpecification {
  title: string;
  description: string;
}
export interface ResolvedBatteryBrandCard {
  title: string;
  logo?: string;
  specification: ResolvedBrandSpecification[];
  showbutton: boolean;
  buttonText: string;
  buttonLink: string;
}
export interface ResolvedBatteryBrandsGrid {
  topSubtitle: string;
  title: string;
  subtitle: string;
  brands: ResolvedBatteryBrandCard[];
}
export function resolveBatteryBrandsGrid(
  data: SmartHomeBrandsGridData | undefined
): ResolvedBatteryBrandsGrid | null {
  if (!data) return null;
  return {
    topSubtitle: data.topSubtitle ?? "",
    title: data.title ?? "",
    subtitle: data.subtitle ?? "",
    brands: (data.brands ?? []).map((brand) => ({
      title: brand.title,
      logo: brand.logo ? strapiImageData(brand.logo)?.src ?? undefined : undefined,
      specification: (brand.specification ?? []).map((spec) => ({
        title: spec.title,
        description: spec.description,
      })),
      showbutton: brand.showbutton,
      buttonText: brand.buttonText,
      buttonLink: brand.buttonLink,
    })),
  };
}

// ─── Install Bento → SmartInstallBentoData ──────────────────────────────

export interface ResolvedInstallBentoBlock {
  title: string;
  description: string;
}
export interface ResolvedSmartInstallBento {
  title: string;
  description: string;
  cards: ResolvedInstallBentoBlock[];
}
export function resolveSmartInstallBento(
  data: SmartHomeInstallBentoData | undefined
): ResolvedSmartInstallBento | null {
  if (!data) return null;
  return {
    title: data.title ?? "",
    description: data.description ?? "",
    cards: (data.blocks ?? []).map((b) => ({
      title: b.title,
      description: b.description,
    })),
  };
}
