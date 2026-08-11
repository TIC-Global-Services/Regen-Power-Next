import { strapiImageData } from "../media";
import { resolveBrandsSpecsTable } from "./brands";
import type { ResolvedBrandsSpecsTable } from "./brands";
import type {
  BrandMattersData,
  BatteryMarqueeData,
  BatteryProductHeroData,
  CompatibleProductsData,
  ComparisonTableData,
  HomeownersData,
  HowYouUseItData,
  OurBrandsData,
  RightSizingData,
  WarrantyCoverageData,
  WhatWeCheckData,
  ZeroInterestData,
} from "../schemas/battery-product";

// ─── Hero → HeroSectionData ─────────────────────────────────────────────

export interface ResolvedBatteryProductHero {
  mediaSrc: string;
  topSubtitle: string;
  mainTitle: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  showOverlay: boolean;
}
export function resolveBatteryProductHero(
  data: BatteryProductHeroData | undefined
): ResolvedBatteryProductHero | null {
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

export interface ResolvedBatteryMarquee {
  items: { text: string }[];
}
export function resolveBatteryMarquee(
  data: BatteryMarqueeData | undefined
): ResolvedBatteryMarquee | null {
  if (!data) return null;
  return {
    items: (data.items ?? []).map((i) => ({ text: i.text })),
  };
}

// ─── Brand Matters → BatteryBrandMattersData ────────────────────────────

export interface ResolvedBrandMatterCard {
  title: string;
  description: string;
  image: string | null;
}
export interface ResolvedBrandMatters {
  topSubtitle: string;
  title: string;
  description?: string;
  cards: ResolvedBrandMatterCard[];
}
export function resolveBrandMatters(
  data: BrandMattersData | undefined
): ResolvedBrandMatters | null {
  if (!data) return null;
  return {
    topSubtitle: data.topSubtitle ?? "",
    title: data.title ?? "",
    description: data.description ?? undefined,
    cards: (data.cards ?? []).map((card) => ({
      title: card.title,
      description: card.description,
      image: card.image ? (strapiImageData(card.image)?.src ?? null) : null,
    })),
  };
}

// ─── How You Use It → HowYouUseItData ───────────────────────────────────

export interface ResolvedHowYouUseItCard {
  id?: string | number;
  title: string;
  description: string;
}
export interface ResolvedHowYouUseIt {
  topSubtitle?: string;
  title?: string;
  description?: string;
  cards: ResolvedHowYouUseItCard[];
}
export function resolveHowYouUseIt(
  data: HowYouUseItData | undefined
): ResolvedHowYouUseIt | null {
  if (!data) return null;
  return {
    topSubtitle: data.topSubtitle ?? undefined,
    title: data.title ?? undefined,
    description: data.description ?? undefined,
    cards: (data.cards ?? []).map((card) => ({
      id: card.id,
      title: card.title,
      description: card.description,
    })),
  };
}

// ─── Right Sizing → RightSizingData ─────────────────────────────────────

export interface ResolvedRightSizingStep {
  iconName: "zap" | "sun" | "car" | "home" | "paneltop";
  title: string;
  placeholder?: string;
}
export interface ResolvedRightSizing {
  topSubtitle: string;
  title: string;
  description: string;
  steps: ResolvedRightSizingStep[];
  ctaText?: string;
  ctaHref?: string;
}
export function resolveRightSizing(
  data: RightSizingData | undefined
): ResolvedRightSizing | null {
  if (!data) return null;
  return {
    topSubtitle: data.topSubtitle ?? "",
    title: data.title ?? "",
    description: data.description ?? "",
    steps: (data.steps ?? []).map((step) => ({
      iconName: step.iconName,
      title: step.title,
      placeholder: step.placeholder ?? undefined,
    })),
    ctaText: data.ctaText ?? undefined,
    ctaHref: data.ctaHref ?? undefined,
  };
}

// ─── Our Brands → OurBatteryBrandsData ──────────────────────────────────

export interface ResolvedBatteryBrandSpecification {
  label: string;
  value: string;
}
export interface ResolvedBatteryBrandItem {
  title: string;
  logo: string | null;
  image: string | null;
  specifications: ResolvedBatteryBrandSpecification[];
  link?: string;
}
export interface ResolvedOurBrands {
  topSubtitle?: string;
  title?: string;
  description?: string;
  brands: ResolvedBatteryBrandItem[];
}
export function resolveOurBrands(
  data: OurBrandsData | undefined
): ResolvedOurBrands | null {
  if (!data) return null;
  return {
    topSubtitle: data.topSubtitle ?? undefined,
    title: data.title ?? undefined,
    description: data.description ?? undefined,
    brands: (data.brands ?? []).map((brand) => ({
      title: brand.title,
      logo: brand.logo ? (strapiImageData(brand.logo)?.src ?? null) : null,
      image: brand.image ? (strapiImageData(brand.image)?.src ?? null) : null,
      specifications: (brand.specs ?? []).map((spec) => ({
        label: spec.label,
        value: spec.value,
      })),
      ...(brand.link ? { link: brand.link } : {}),
    })),
  };
}

// ─── Comparison Table → ResolvedBrandsSpecsTable ────────────────────────

export type ResolvedComparisonTable = ResolvedBrandsSpecsTable;
export function resolveComparisonTable(
  data: ComparisonTableData | undefined
): ResolvedComparisonTable | null {
  if (!data) return null;
  return resolveBrandsSpecsTable({
    __component: "brands.specs-table",
    subtitle: data.subtitle,
    title: data.title,
    description: data.description,
    labelColumnTitle: data.labelColumnTitle,
    columns: data.columns,
    rows: data.rows,
  } as never);
}

// ─── Compatible Products → CompareFitData ───────────────────────────────

export interface ResolvedCompatibleProducts {
  topSubtitle: string;
  title: string;
  description?: string;
  leftTitle: string;
  leftItems: string[];
  rightTitle: string;
  rightItems: string[];
}
export function resolveCompatibleProducts(
  data: CompatibleProductsData | undefined
): ResolvedCompatibleProducts | null {
  if (!data) return null;
  return {
    topSubtitle: data.topSubtitle ?? "",
    title: data.title ?? "",
    description: data.description ?? undefined,
    leftTitle: data.leftTitle ?? "",
    leftItems: (data.leftItems ?? []).map((i) => i.text ?? ""),
    rightTitle: data.rightTitle ?? "",
    rightItems: (data.rightItems ?? []).map((i) => i.text ?? ""),
  };
}

// ─── What We Check → WhatWeCheckData ────────────────────────────────────

export interface ResolvedWhatWeCheck {
  subtitle: string;
  title: string;
  description?: string;
  paragraphs: string[];
}
export function resolveWhatWeCheck(
  data: WhatWeCheckData | undefined
): ResolvedWhatWeCheck | null {
  if (!data) return null;
  return {
    subtitle: data.subtitle ?? "",
    title: data.title ?? "",
    description: data.description ?? undefined,
    paragraphs: (data.paragraphs ?? []).map((p) => p.text ?? ""),
  };
}

// ─── Warranty Coverage → PortfolioCard[] ────────────────────────────────

export interface ResolvedWarrantyTextCard {
  type: "text";
  variant: "light-gray" | "light-green" | "dark";
  title: string;
  description: string;
  specs?: string;
}
export interface ResolvedWarrantyImageCard {
  type: "image";
  variant: "light-gray" | "light-green" | "dark";
  image?: string | null;
  imageAlt?: string;
}
export type ResolvedWarrantyCard =
  | ResolvedWarrantyTextCard
  | ResolvedWarrantyImageCard;
export interface ResolvedWarrantyCoverage {
  subtitle?: string;
  title?: string;
  description?: string;
  cards?: ResolvedWarrantyCard[];
  layout?: 3 | 4 | 6;
  className?: string;
}
export function resolveWarrantyCoverage(
  data: WarrantyCoverageData | undefined
): ResolvedWarrantyCoverage | null {
  if (!data) return null;
  return {
    subtitle: data.subtitle ?? undefined,
    title: data.title ?? undefined,
    description: data.description ?? undefined,
    cards: (data.cards ?? []).map((card) => {
      const base = {
        type: card.type,
        variant: card.variant ?? "light-gray",
      };
      if (card.type === "image") {
        return {
          ...base,
          ...(card.image ? { image: strapiImageData(card.image)?.src ?? null } : {}),
          ...(card.imageAlt ? { imageAlt: card.imageAlt } : {}),
        } as ResolvedWarrantyImageCard;
      }
      return {
        ...base,
        title: card.title ?? "",
        description: card.description ?? "",
        ...(card.specs ? { specs: card.specs } : {}),
      } as ResolvedWarrantyTextCard;
    }),
    ...(data.layout ? { layout: Number(data.layout) as 3 | 4 | 6 } : {}),
    className: "bg-white",
  };
}

// ─── Zero Interest → ZeroInterestData ───────────────────────────────────

export interface ResolvedTermsBlock {
  title: string;
  items: string[];
}
export interface ResolvedZeroInterest {
  topSubtitle: string;
  title: string;
  description: string;
  keyTerms: ResolvedTermsBlock;
  eligibility: ResolvedTermsBlock;
  summaryText: string;
  topImage: string | null;
  bottomImage: string | null;
  ctaText: string;
  ctaLink: string;
}
export function resolveZeroInterest(
  data: ZeroInterestData | undefined
): ResolvedZeroInterest | null {
  if (!data) return null;
  return {
    topSubtitle: data.topSubtitle ?? "",
    title: data.title ?? "",
    description: data.description ?? "",
    keyTerms: {
      title: data.keyTerms?.title ?? "",
      items: (data.keyTerms?.items ?? []).map((i) => i.text ?? ""),
    },
    eligibility: {
      title: data.eligibility?.title ?? "",
      items: (data.eligibility?.items ?? []).map((i) => i.text ?? ""),
    },
    summaryText: data.summaryText ?? "",
    topImage: data.topImage ? (strapiImageData(data.topImage)?.src ?? null) : null,
    bottomImage: data.bottomImage ? (strapiImageData(data.bottomImage)?.src ?? null) : null,
    ctaText: data.ctaText ?? "",
    ctaLink: data.ctaLink ?? "#quote",
  };
}

// ─── Homeowners → HomeownersData ────────────────────────────────────────

export interface ResolvedHomeownerStory {
  title: string;
  description?: string;
  image: string | null;
  footerTitle?: string;
  footerDescription?: string;
}
export interface ResolvedHomeowners {
  topSubtitle: string;
  title: string;
  showReadMore: boolean;
  centerButton: boolean;
  centerButtonText: string;
  stories: ResolvedHomeownerStory[];
}
export function resolveHomeowners(
  data: HomeownersData | undefined
): ResolvedHomeowners | null {
  if (!data) return null;
  return {
    topSubtitle: data.topSubtitle ?? "",
    title: data.title ?? "",
    showReadMore: data.showReadMore ?? false,
    centerButton: data.centerButton ?? false,
    centerButtonText: data.centerButtonText ?? "",
    stories: (data.cards ?? []).map((card) => ({
      title: card.title,
      ...(card.description ? { description: card.description } : {}),
      image: card.image ? (strapiImageData(card.image)?.src ?? null) : null,
      ...(card.footerTitle ? { footerTitle: card.footerTitle } : {}),
      ...(card.footerDescription ? { footerDescription: card.footerDescription } : {}),
    })),
  };
}
