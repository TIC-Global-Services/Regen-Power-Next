import { strapiImageData } from "../media";
import { resolveComparisonTable } from "./battery-product";
import type { ResolvedComparisonTable } from "./battery-product";
import type {
  BatteryBrandsHeroData,
  BatteryBrandsLongTermBetData,
  BatteryBrandsWhatItTakesData,
  BatteryBrandsSevenBrandData,
  BatteryBrandsQuickWayData,
  BatteryBrandsCecApprovedData,
  BatteryBrandsWhyOurInstallerData,
} from "../schemas/battery-brands";
import type { ComparisonTableData } from "../schemas/battery-product";

// ─── Hero → HeroSectionData ─────────────────────────────────────────────

export interface ResolvedBatteryBrandsHero {
  mediaSrc: string;
  topSubtitle: string;
  mainTitle: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  showOverlay: boolean;
}
export function resolveBatteryBrandsHero(
  data: BatteryBrandsHeroData | undefined
): ResolvedBatteryBrandsHero | null {
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

// ─── Brand Long Term Bet → BrandLongTermBetData ─────────────────────────

export interface ResolvedBrandBetCard {
  title: string;
  description: string;
  image: string | null;
}
export interface ResolvedBrandLongTermBet {
  subtitle: string;
  title: string;
  cards: ResolvedBrandBetCard[];
}
export function resolveBrandLongTermBet(
  data: BatteryBrandsLongTermBetData | undefined
): ResolvedBrandLongTermBet | null {
  if (!data) return null;
  return {
    subtitle: data.subtitle ?? "",
    title: data.title ?? "",
    cards: (data.cards ?? []).map((card) => ({
      title: card.title,
      description: card.description,
      image: card.image ? (strapiImageData(card.image)?.src ?? null) : null,
    })),
  };
}

// ─── What It Takes → WhatItTakesData ────────────────────────────────────

export interface ResolvedWhatItTakesItem {
  title: string;
}
export interface ResolvedWhatItTakes {
  title: string;
  subtitle?: string;
  description?: string;
  items: ResolvedWhatItTakesItem[];
  image: string | null;
  imageAlt?: string;
}
export function resolveWhatItTakes(
  data: BatteryBrandsWhatItTakesData | undefined
): ResolvedWhatItTakes | null {
  if (!data) return null;
  const img = data.image ? strapiImageData(data.image) : null;
  return {
    title: data.title ?? "",
    ...(data.subtitle ? { subtitle: data.subtitle } : {}),
    ...(data.description ? { description: data.description } : {}),
    // shared.text-item stores text → WhatItTakes renders item.title
    items: (data.items ?? []).map((i) => ({ title: i.text ?? "" })),
    image: img?.src ?? "",
    ...(data.imageAlt ? { imageAlt: data.imageAlt } : {}),
  };
}

// ─── Seven Brand → SevenBrandData ───────────────────────────────────────

export interface ResolvedSpecDetail {
  title: string;
  description: string;
}
export interface ResolvedSpecBlock {
  title: string;
  specdetails: ResolvedSpecDetail[];
}
export interface ResolvedBrandCard {
  title: string;
  description: string;
  specification: ResolvedSpecBlock[];
}
export interface ResolvedSevenBrand {
  title: string;
  brands: ResolvedBrandCard[];
}
export function resolveSevenBrand(
  data: BatteryBrandsSevenBrandData | undefined
): ResolvedSevenBrand | null {
  if (!data) return null;
  return {
    title: data.title ?? "",
    brands: (data.brands ?? []).map((brand) => ({
      title: brand.title,
      description: brand.description,
      specification: (brand.specification ?? []).map((block) => ({
        title: block.title,
        specdetails: (block.specdetails ?? []).map((d) => ({
          title: d.title,
          description: d.description,
        })),
      })),
    })),
  };
}

// ─── Comparison Table → ResolvedBrandsSpecsTable ────────────────────────

export type ResolvedBrandsComparisonTable = ResolvedComparisonTable;
export function resolveBrandsComparisonTable(
  data: ComparisonTableData | undefined
): ResolvedBrandsComparisonTable | null {
  return resolveComparisonTable(data);
}

// ─── Quick Way → QuickWayData ───────────────────────────────────────────

export interface ResolvedRecommendationItem {
  condition: string;
  recommendation: string;
}
export interface ResolvedQuickWay {
  title: string;
  subtitle: string;
  sectionHeader: string;
  recommendations: ResolvedRecommendationItem[];
  image: string | null;
  imageAlt?: string;
}
export function resolveQuickWay(
  data: BatteryBrandsQuickWayData | undefined
): ResolvedQuickWay | null {
  if (!data) return null;
  const img = data.image ? strapiImageData(data.image) : null;
  return {
    title: data.title ?? "",
    subtitle: data.subtitle ?? "",
    sectionHeader: data.sectionHeader ?? "",
    recommendations: (data.recommendations ?? []).map((r) => ({
      condition: r.condition,
      recommendation: r.recommendation,
    })),
    image: img?.src ?? "",
    ...(data.imageAlt ? { imageAlt: data.imageAlt } : {}),
  };
}

// ─── CEC Approved → HowYouUseItData ─────────────────────────────────────

export interface ResolvedCecCard {
  title: string;
  description: string;
}
export interface ResolvedCecApproved {
  title: string;
  description: string;
  cards: ResolvedCecCard[];
}
export function resolveCecApproved(
  data: BatteryBrandsCecApprovedData | undefined
): ResolvedCecApproved | null {
  if (!data) return null;
  return {
    title: data.title ?? "",
    description: data.description ?? "",
    cards: (data.cards ?? []).map((card) => ({
      title: card.title,
      description: card.description,
    })),
  };
}

// ─── Why Our Installer → WhyOurInstallerData ────────────────────────────

export interface ResolvedCertItem {
  title: string;
}
export interface ResolvedWhyOurInstaller {
  title: string;
  subtitle: string;
  image: string | null;
  imageAlt?: string;
  certifications: ResolvedCertItem[];
  whyMattersTitle: string;
  whyMattersDescription: string;
}
export function resolveWhyOurInstaller(
  data: BatteryBrandsWhyOurInstallerData | undefined
): ResolvedWhyOurInstaller | null {
  if (!data) return null;
  const img = data.image ? strapiImageData(data.image) : null;
  return {
    title: data.title ?? "",
    subtitle: data.subtitle ?? "",
    image: img?.src ?? "",
    ...(data.imageAlt ? { imageAlt: data.imageAlt } : {}),
    certifications: (data.certifications ?? []).map((c) => ({ title: c.title })),
    whyMattersTitle: data.whyMattersTitle ?? "",
    whyMattersDescription: data.whyMattersDescription ?? "",
  };
}
