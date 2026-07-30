import { strapiImageData } from "../media";
import type { HeroProps } from "@/reuseables/Hero";
import type {
  BatteryProductHeroData,
  BatteryProductBrandMattersData,
  BatteryProductOurBrandsData,
  BatteryProductZeroInterestData,
  BatteryProductKeyTermsData,
  BatteryProductWhatWeCheckData,
  BatteryProductCompatibleProductsData,
  BatteryProductHomeownersData,
  BatteryProductComparisonTableData,
} from "../schemas/battery-product";

export type ResolvedBatteryProductHero = HeroProps;
export function resolveBatteryProductHero(
  data: BatteryProductHeroData | undefined
): ResolvedBatteryProductHero | null {
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

export interface ResolvedBrandMatterCard {
  title: string;
  description: string;
  image: string;
}
export interface ResolvedBatteryProductBrandMatters {
  topSubtitle: string;
  title: string;
  description: string;
  cards: ResolvedBrandMatterCard[];
}
export function resolveBatteryProductBrandMatters(
  data: BatteryProductBrandMattersData | undefined
): ResolvedBatteryProductBrandMatters | null {
  if (!data) return null;
  return {
    topSubtitle: data.topSubtitle ?? "",
    title: data.title ?? "",
    description: data.description ?? "",
    cards: (data.cards ?? []).map((c) => ({
      title: c.title,
      description: c.description,
      image: strapiImageData(c.image)?.src ?? "",
    })),
  };
}

export interface ResolvedSpecItem {
  label: string;
  value: string;
}
export interface ResolvedBrandItem {
  title: string;
  logo: string;
  image: string;
  specifications: ResolvedSpecItem[];
  link: string;
}
export interface ResolvedBatteryProductOurBrands {
  topSubtitle: string;
  title: string;
  description: string;
  brands: ResolvedBrandItem[];
}
export function resolveBatteryProductOurBrands(
  data: BatteryProductOurBrandsData | undefined
): ResolvedBatteryProductOurBrands | null {
  if (!data) return null;
  return {
    topSubtitle: data.topSubtitle ?? "",
    title: data.title ?? "",
    description: data.description ?? "",
    brands: (data.brands ?? []).map((b) => ({
      title: b.title,
      logo: strapiImageData(b.logo)?.src ?? "",
      image: strapiImageData(b.image)?.src ?? "",
      specifications: (b.specs ?? []).map((s) => ({ label: s.label, value: s.value })),
      link: b.link ?? "",
    })),
  };
}

export interface ResolvedTermsBlock {
  title: string;
  items: string[];
}
// ─── Zero Interest (Solutions Portfolio) ──────────────────────────────────────

export interface ResolvedSolutionsCard {
  type: "text" | "image";
  variant: "light-gray" | "light-green" | "dark";
  title: string;
  description: string;
}
export interface ResolvedBatteryProductZeroInterest {
  subtitle: string;
  title: string;
  description: string;
  cards: ResolvedSolutionsCard[];
  layout: number;
}
export function resolveBatteryProductZeroInterest(
  data: BatteryProductZeroInterestData | undefined
): ResolvedBatteryProductZeroInterest | null {
  if (!data) return null;
  return {
    subtitle: data.subtitle ?? "",
    title: data.title ?? "",
    description: data.description ?? "",
    cards: (data.cards ?? []).map((c) => ({
      type: (c.type as "text" | "image") ?? "text",
      variant: (c.variant as "light-gray" | "light-green" | "dark") ?? "light-gray",
      title: c.title ?? "",
      description: c.description ?? "",
    })),
    layout: Number(data.layout) || 6,
  };
}

// ─── What We Check ────────────────────────────────────────────────────────────

export interface ResolvedBatteryProductWhatWeCheck {
  subtitle: string;
  title: string;
  paragraphs: string[];
}
export function resolveBatteryProductWhatWeCheck(
  data: BatteryProductWhatWeCheckData | undefined
): ResolvedBatteryProductWhatWeCheck | null {
  if (!data) return null;
  return {
    subtitle: data.subtitle ?? "",
    title: data.title ?? "",
    paragraphs: data.paragraphs ?? [],
  };
}

// ─── Homeowners ───────────────────────────────────────────────────────────────

export interface ResolvedFeatureCard {
  title: string;
  description: string;
  image: string;
  textPosition: "top" | "bottom";
  footerTitle: string;
  footerDescription: string;
}
export interface ResolvedBatteryProductHomeowners {
  topSubtitle: string;
  title: string;
  cards: ResolvedFeatureCard[];
  showReadMore: boolean;
  centerButton: boolean;
  centerButtonText: string;
}
export function resolveBatteryProductHomeowners(
  data: BatteryProductHomeownersData | undefined
): ResolvedBatteryProductHomeowners | null {
  if (!data) return null;
  return {
    topSubtitle: data.topSubtitle ?? "",
    title: data.title ?? "",
    cards: (data.cards ?? []).map((c) => ({
      title: c.title,
      description: c.description ?? "",
      image: strapiImageData(c.image)?.src ?? "",
      textPosition: (c.textPosition as "top" | "bottom") ?? "top",
      footerTitle: c.footerTitle ?? "",
      footerDescription: c.footerDescription ?? "",
    })),
    showReadMore: data.showReadMore ?? true,
    centerButton: data.centerButton ?? false,
    centerButtonText: data.centerButtonText ?? "",
  };
}

export interface ResolvedBatteryProductKeyTerms {
  topSubtitle: string;
  title: string;
  description: string;
  keyTerms?: ResolvedTermsBlock;
  eligibility?: ResolvedTermsBlock;
  summaryText: string;
  ctaText: string;
  ctaLink: string;
}
export function resolveBatteryProductKeyTerms(
  data: BatteryProductKeyTermsData | undefined
): ResolvedBatteryProductKeyTerms | null {
  if (!data) return null;
  return {
    topSubtitle: data.topSubtitle ?? "",
    title: data.title ?? "",
    description: data.description ?? "",
    keyTerms: data.keyTermsBlock
      ? { title: data.keyTermsBlock.title ?? "", items: data.keyTermsBlock.items ?? [] }
      : undefined,
    eligibility: data.eligibilityBlock
      ? { title: data.eligibilityBlock.title ?? "", items: data.eligibilityBlock.items ?? [] }
      : undefined,
    summaryText: data.summaryText ?? "",
    ctaText: data.ctaText ?? "",
    ctaLink: data.ctaLink ?? "#contact",
  };
}

export interface ResolvedBatteryProductCompatibleProducts {
  topSubtitle: string;
  title: string;
  description: string;
  leftTitle: string;
  leftItems: string[];
  rightTitle: string;
  rightItems: string[];
}
export function resolveBatteryProductCompatibleProducts(
  data: BatteryProductCompatibleProductsData | undefined
): ResolvedBatteryProductCompatibleProducts | null {
  if (!data) return null;
  return {
    topSubtitle: data.topSubtitle ?? "",
    title: data.title ?? "",
    description: data.description ?? "",
    leftTitle: data.leftTitle ?? "",
    leftItems: data.leftItems ?? [],
    rightTitle: data.rightTitle ?? "",
    rightItems: data.rightItems ?? [],
  };
}

export interface ResolvedComparisonColumn {
  heading: string;
}
export interface ResolvedComparisonRow {
  label: string;
  values: string[];
}
export interface ResolvedBatteryProductComparisonTable {
  topSubtitle: string;
  title: string;
  description: string;
  columns: ResolvedComparisonColumn[];
  rows: ResolvedComparisonRow[];
}
export function resolveBatteryProductComparisonTable(
  data: BatteryProductComparisonTableData | undefined
): ResolvedBatteryProductComparisonTable | null {
  if (!data) return null;
  return {
    topSubtitle: data.topSubtitle ?? "",
    title: data.title ?? "",
    description: data.description ?? "",
    columns: (data.columns ?? []).map((c) => ({ heading: c.heading })),
    rows: (data.rows ?? []).map((r) => ({
      label: r.label,
      values: r.values ?? [],
    })),
  };
}
