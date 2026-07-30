import { strapiImageData } from "../media";
import type { HeroProps } from "@/reuseables/Hero";
import type {
  SmartHomeBatteryHeroData,
  SmartHomeBatteryGreatFitData,
  SmartHomeBatterySplitSectionData,
  SmartHomeBatteryTimelineData,
  SmartHomeBatteryBrandsGridData,
  SmartHomeBatteryInstallBentoData,
} from "../schemas/smart-home-battery";

// ─── Hero ──────────────────────────────────────────────────────────────
export type ResolvedSmartHomeBatteryHero = HeroProps;
export function resolveSmartHomeBatteryHero(
  data: SmartHomeBatteryHeroData | undefined
): ResolvedSmartHomeBatteryHero | null {
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

// ─── Marquee (reuses battery-storage.resolver) ────────────────────────
export {
  resolveBatteryStorageMarquee as resolveSmartHomeBatteryMarquee,
  type ResolvedBatteryStorageMarquee as ResolvedSmartHomeBatteryMarquee,
} from "./battery-storage";

// ─── Great Fit ─────────────────────────────────────────────────────────
export interface ResolvedSmartHomeBatteryGreatFit {
  topSubtitle: string;
  title: string;
  description?: string;
  goodFitTitle: string;
  goodFitItems: string[];
  conversationTitle: string;
  conversationItems: string[];
}
export function resolveSmartHomeBatteryGreatFit(
  data: SmartHomeBatteryGreatFitData | undefined
): ResolvedSmartHomeBatteryGreatFit | null {
  if (!data) return null;
  return {
    topSubtitle: data.topSubtitle ?? "",
    title: data.title ?? "",
    description: data.description ?? undefined,
    goodFitTitle: data.goodFitTitle ?? "",
    goodFitItems: data.goodFitItems ?? [],
    conversationTitle: data.conversationTitle ?? "",
    conversationItems: data.conversationItems ?? [],
  };
}

// ─── Split Section ─────────────────────────────────────────────────────
export interface ResolvedSplitBlock {
  title: string;
  description: string;
}
export interface ResolvedSplitSlide {
  mainDescription: string;
  blocks: ResolvedSplitBlock[];
  ctaText: string;
  ctaLink: string;
  image: string;
}
export interface ResolvedSmartHomeBatterySplitSection {
  topSubtitle: string;
  title: string;
  slides: ResolvedSplitSlide[];
}
export function resolveSmartHomeBatterySplitSection(
  data: SmartHomeBatterySplitSectionData | undefined
): ResolvedSmartHomeBatterySplitSection | null {
  if (!data) return null;
  return {
    topSubtitle: data.topSubtitle ?? "",
    title: data.title ?? "",
    slides: (data.slides ?? []).map((s) => ({
      mainDescription: s.mainDescription ?? "",
      blocks: (s.blocks ?? []).map((b) => ({
        title: b.title ?? "",
        description: b.description ?? "",
      })),
      ctaText: s.ctaText ?? "",
      ctaLink: s.ctaLink ?? "#contact",
      image: strapiImageData(s.image)?.src ?? "",
    })),
  };
}

// ─── Timeline ──────────────────────────────────────────────────────────
export interface ResolvedTimelineEvent {
  time: string;
  title: string;
  description: string;
}
export interface ResolvedSmartHomeBatteryTimeline {
  topSubtitle: string;
  title: string;
  events: ResolvedTimelineEvent[];
}
export function resolveSmartHomeBatteryTimeline(
  data: SmartHomeBatteryTimelineData | undefined
): ResolvedSmartHomeBatteryTimeline | null {
  if (!data) return null;
  return {
    topSubtitle: data.topSubtitle ?? "",
    title: data.title ?? "",
    events: (data.events ?? []).map((e) => ({
      time: e.time ?? "",
      title: e.title ?? "",
      description: e.description ?? "",
    })),
  };
}

// ─── Brands Grid ───────────────────────────────────────────────────────
export interface ResolvedBrandSpec {
  title: string;
  description: string;
}
export interface ResolvedBrandCard {
  title: string;
  specification: ResolvedBrandSpec[];
  showbutton: boolean;
  buttonText: string;
  buttonLink: string;
}
export interface ResolvedSmartHomeBatteryBrandsGrid {
  topSubtitle: string;
  title: string;
  subtitle: string;
  brands: ResolvedBrandCard[];
}
export function resolveSmartHomeBatteryBrandsGrid(
  data: SmartHomeBatteryBrandsGridData | undefined
): ResolvedSmartHomeBatteryBrandsGrid | null {
  if (!data) return null;
  return {
    topSubtitle: data.topSubtitle ?? "",
    title: data.title ?? "",
    subtitle: data.subtitle ?? "",
    brands: (data.brands ?? []).map((b) => ({
      title: b.title ?? "",
      specification: (b.specification ?? []).map((s) => ({
        title: s.title ?? "",
        description: s.description ?? "",
      })),
      showbutton: b.showbutton ?? true,
      buttonText: b.buttonText ?? "",
      buttonLink: b.buttonLink ?? "#contact",
    })),
  };
}

// ─── Install Bento ─────────────────────────────────────────────────────
export interface ResolvedInstallBlock {
  title: string;
  description: string;
  theme: "white" | "dark" | "light";
}
export interface ResolvedSmartHomeBatteryInstallBento {
  title: string;
  description: string;
  blocks: ResolvedInstallBlock[];
}
export function resolveSmartHomeBatteryInstallBento(
  data: SmartHomeBatteryInstallBentoData | undefined
): ResolvedSmartHomeBatteryInstallBento | null {
  if (!data) return null;
  return {
    title: data.title ?? "",
    description: data.description ?? "",
    blocks: (data.blocks ?? []).map((b) => ({
      title: b.title ?? "",
      description: b.description ?? "",
      theme: b.theme ?? "light",
    })),
  };
}
