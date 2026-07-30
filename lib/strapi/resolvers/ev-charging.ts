import { strapiImageData, type StrapiImageData } from "../media";
import type { HeroProps } from "@/reuseables/Hero";
import type {
  EvChargingHeroData,
  EvChargingWallConnectorData,
  EvChargingChargerProductsData,
  EvChargingInstallerBrandsData,
  EvChargingBenefitCardsData,
  EvChargingHomeBatteryData,
  EvChargingFeatureCardsData,
  EvChargingInstallationStepsData,
  EvChargingStatsData,
  EvChargingFaqData,
  EvChargingCtaBannerData,
} from "../schemas/ev-charging";

// ─── Hero ────────────────────────────────────────────────────────────────────

export type ResolvedEvChargingHero = HeroProps;
export function resolveEvChargingHero(
  data: EvChargingHeroData | undefined
): ResolvedEvChargingHero | null {
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
    descriptionColor: "text-white",
    subtitleColor: "text-white",
    showOverlay: data.showOverlay ?? true,
  };
}

// ─── Wall Connector ──────────────────────────────────────────────────────────

export interface ResolvedEvChargingWallConnector {
  title: string;
  subtitle: string;
  description: string;
  specs: string[];
  image: string;
}
export function resolveEvChargingWallConnector(
  data: EvChargingWallConnectorData | undefined
): ResolvedEvChargingWallConnector | null {
  if (!data) return null;
  const img = data.image ? strapiImageData(data.image) : null;
  return {
    title: data.title ?? "",
    subtitle: data.subtitle ?? "",
    description: data.description ?? "",
    specs: (data.specs ?? []).map((s) => s.label),
    image: img?.src ?? "",
  };
}

// ─── Charger Products ────────────────────────────────────────────────────────

export interface ResolvedChargerProduct {
  name: string;
  description: string;
  image: string;
}
export interface ResolvedBrandLogo {
  name: string;
  logo: string;
}
export interface ResolvedEvChargingChargerProducts {
  subtitle: string;
  title: string;
  products: ResolvedChargerProduct[];
  brands: ResolvedBrandLogo[];
}
export function resolveEvChargingChargerProducts(
  data: EvChargingChargerProductsData | undefined
): ResolvedEvChargingChargerProducts | null {
  if (!data) return null;
  return {
    subtitle: data.subtitle ?? "",
    title: data.title ?? "",
    products: (data.products ?? []).map((p) => ({
      name: p.name,
      description: p.description,
      image: strapiImageData(p.image)?.src ?? "",
    })),
    brands: (data.brands ?? []).map((b) => ({
      name: b.name,
      logo: strapiImageData(b.image)?.src ?? "",
    })),
  };
}

// ─── Installer Brands ────────────────────────────────────────────────────────

export interface ResolvedInstallerBrand {
  name: string;
  logo: string;
  cardTitle: string;
  description: string;
  specs: string;
}
export interface ResolvedEvChargingInstallerBrands {
  subtitle: string;
  title: string;
  description: string;
  brands: ResolvedInstallerBrand[];
}
export function resolveEvChargingInstallerBrands(
  data: EvChargingInstallerBrandsData | undefined
): ResolvedEvChargingInstallerBrands | null {
  if (!data) return null;
  return {
    subtitle: data.subtitle ?? "",
    title: data.title ?? "",
    description: data.description ?? "",
    brands: (data.brands ?? []).map((b) => ({
      name: b.name,
      logo: strapiImageData(b.logo)?.src ?? "",
      cardTitle: b.cardTitle ?? "",
      description: b.description ?? "",
      specs: b.specs ?? "",
    })),
  };
}

// ─── Benefit Cards ───────────────────────────────────────────────────────────

export interface ResolvedBenefitCard {
  title: string;
  description: string;
  image: string;
}
export interface ResolvedEvChargingBenefitCards {
  title: string;
  benefits: ResolvedBenefitCard[];
}
export function resolveEvChargingBenefitCards(
  data: EvChargingBenefitCardsData | undefined
): ResolvedEvChargingBenefitCards | null {
  if (!data) return null;
  return {
    title: data.title ?? "",
    benefits: (data.benefits ?? []).map((b) => ({
      title: b.title,
      description: b.description,
      image: strapiImageData(b.image)?.src ?? "",
    })),
  };
}

// ─── Home Battery ────────────────────────────────────────────────────────────

export interface ResolvedEvChargingHomeBattery {
  subtitle: string;
  title: string;
  paragraphs: string[];
  bulletPoints: string[];
  ctaText: string;
  ctaLink: string;
  image: string;
}
export function resolveEvChargingHomeBattery(
  data: EvChargingHomeBatteryData | undefined
): ResolvedEvChargingHomeBattery | null {
  if (!data) return null;
  const img = data.image ? strapiImageData(data.image) : null;
  return {
    subtitle: data.subtitle ?? "",
    title: data.title ?? "",
    paragraphs: (data.paragraphs ?? []).map((p) => p.text),
    bulletPoints: (data.bulletPoints ?? []).map((bp) => bp.text),
    ctaText: data.ctaText ?? "",
    ctaLink: data.ctaLink ?? "#contact",
    image: img?.src ?? "",
  };
}

// ─── Feature Cards ───────────────────────────────────────────────────────────

export interface ResolvedFeatureCard {
  title: string;
  description: string;
  image: string;
}
export interface ResolvedEvChargingFeatureCards {
  subtitle: string;
  title: string;
  description: string;
  cards: ResolvedFeatureCard[];
}
export function resolveEvChargingFeatureCards(
  data: EvChargingFeatureCardsData | undefined
): ResolvedEvChargingFeatureCards | null {
  if (!data) return null;
  return {
    subtitle: data.subtitle ?? "",
    title: data.title ?? "",
    description: data.description ?? "",
    cards: (data.cards ?? []).map((c) => ({
      title: c.title,
      description: c.description,
      image: strapiImageData(c.image)?.src ?? "",
    })),
  };
}

// ─── Installation Steps ──────────────────────────────────────────────────────

export interface ResolvedInstallationStep {
  number: string;
  title: string;
  description: string;
  image: string;
}
export interface ResolvedEvChargingInstallationSteps {
  subtitle: string;
  title: string;
  steps: ResolvedInstallationStep[];
}
export function resolveEvChargingInstallationSteps(
  data: EvChargingInstallationStepsData | undefined
): ResolvedEvChargingInstallationSteps | null {
  if (!data) return null;
  return {
    subtitle: data.subtitle ?? "",
    title: data.title ?? "",
    steps: (data.steps ?? []).map((s) => ({
      number: s.number,
      title: s.title,
      description: s.description,
      image: strapiImageData(s.image)?.src ?? "",
    })),
  };
}

// ─── Stats ───────────────────────────────────────────────────────────────────

export interface ResolvedEvChargingStats {
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
}
export function resolveEvChargingStats(
  data: EvChargingStatsData | undefined
): ResolvedEvChargingStats | null {
  if (!data) return null;
  const awardBg = data.awardWinnerBg ? strapiImageData(data.awardWinnerBg) : null;
  const awardLogo = data.awardWinnerLogo ? strapiImageData(data.awardWinnerLogo) : null;
  const yearsBg = data.yearsInBusinessBg ? strapiImageData(data.yearsInBusinessBg) : null;
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
  };
}
