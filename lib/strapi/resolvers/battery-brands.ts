import { strapiImageData } from "../media";
import type { HeroProps } from "@/reuseables/Hero";
import type {
  BatteryBrandsHeroData,
  BatteryBrandsBrandLongTermBetData,
  BatteryBrandsWhatItTakesData,
  BatteryBrandsSevenBrandData,
  BatteryBrandsQuickWayData,
  BatteryBrandsCecApprovedData,
  BatteryBrandsWhyOurInstallerData,
} from "../schemas/battery-brands";

// ─── Hero ──────────────────────────────────────────────────────────────
export type ResolvedBatteryBrandsHero = HeroProps;
export function resolveBatteryBrandsHero(
  data: BatteryBrandsHeroData | undefined
): ResolvedBatteryBrandsHero | null {
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

// ─── Brand Long Term Bet ──────────────────────────────────────────────
export interface ResolvedBetCard {
  title: string;
  description: string;
  image: string;
}
export interface ResolvedBatteryBrandsBrandLongTermBet {
  subtitle: string;
  title: string;
  cards: ResolvedBetCard[];
}
export function resolveBatteryBrandsBrandLongTermBet(
  data: BatteryBrandsBrandLongTermBetData | undefined
): ResolvedBatteryBrandsBrandLongTermBet | null {
  if (!data) return null;
  return {
    subtitle: data.subtitle ?? "",
    title: data.title ?? "",
    cards: (data.cards ?? []).map((c) => ({
      title: c.title ?? "",
      description: c.description ?? "",
      image: strapiImageData(c.image)?.src ?? "",
    })),
  };
}

// ─── What It Takes ────────────────────────────────────────────────────
export interface ResolvedBatteryBrandsWhatItTakes {
  subtitle: string;
  title: string;
  description: string;
  items: { title: string }[];
  image: string;
}
export function resolveBatteryBrandsWhatItTakes(
  data: BatteryBrandsWhatItTakesData | undefined
): ResolvedBatteryBrandsWhatItTakes | null {
  if (!data) return null;
  return {
    subtitle: data.subtitle ?? "",
    title: data.title ?? "",
    description: data.description ?? "",
    items: (data.items ?? []).map((t) => ({ title: t })),
    image: strapiImageData(data.image)?.src ?? "",
  };
}

// ─── Seven Brand ───────────────────────────────────────────────────────
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
export interface ResolvedBatteryBrandsSevenBrand {
  title: string;
  brands: ResolvedBrandCard[];
}
export function resolveBatteryBrandsSevenBrand(
  data: BatteryBrandsSevenBrandData | undefined
): ResolvedBatteryBrandsSevenBrand | null {
  if (!data) return null;
  return {
    title: data.title ?? "",
    brands: (data.brands ?? []).map((b) => ({
      title: b.title ?? "",
      description: b.description ?? "",
      specification: (b.specification ?? []).map((s) => ({
        title: s.title ?? "",
        specdetails: (s.specdetails ?? []).map((d) => ({
          title: d.title ?? "",
          description: d.description ?? "",
        })),
      })),
    })),
  };
}

// ─── Quick Way ─────────────────────────────────────────────────────────
export interface ResolvedRecommendationItem {
  condition: string;
  recommendation: string;
}
export interface ResolvedBatteryBrandsQuickWay {
  title: string;
  subtitle: string;
  sectionHeader: string;
  recommendations: ResolvedRecommendationItem[];
  image: string;
}
export function resolveBatteryBrandsQuickWay(
  data: BatteryBrandsQuickWayData | undefined
): ResolvedBatteryBrandsQuickWay | null {
  if (!data) return null;
  return {
    title: data.title ?? "",
    subtitle: data.subtitle ?? "",
    sectionHeader: data.sectionHeader ?? "",
    recommendations: (data.recommendations ?? []).map((r) => ({
      condition: r.condition ?? "",
      recommendation: r.recommendation ?? "",
    })),
    image: strapiImageData(data.image)?.src ?? "",
  };
}

// ─── CEC Approved ──────────────────────────────────────────────────────
export interface ResolvedCecCard {
  title: string;
  description: string;
}
export interface ResolvedBatteryBrandsCecApproved {
  title: string;
  description: string;
  defaultFeaturedIndex: number;
  cards: ResolvedCecCard[];
}
export function resolveBatteryBrandsCecApproved(
  data: BatteryBrandsCecApprovedData | undefined
): ResolvedBatteryBrandsCecApproved | null {
  if (!data) return null;
  return {
    title: data.title ?? "",
    description: data.description ?? "",
    defaultFeaturedIndex: data.defaultFeaturedIndex ?? 2,
    cards: (data.cards ?? []).map((c) => ({
      title: c.title ?? "",
      description: c.description ?? "",
    })),
  };
}

// ─── Why Our Installer ─────────────────────────────────────────────────
export interface ResolvedCertItem {
  title: string;
}
export interface ResolvedBatteryBrandsWhyOurInstaller {
  title: string;
  subtitle: string;
  image: string;
  certifications: ResolvedCertItem[];
  whyMattersTitle: string;
  whyMattersDescription: string;
}
export function resolveBatteryBrandsWhyOurInstaller(
  data: BatteryBrandsWhyOurInstallerData | undefined
): ResolvedBatteryBrandsWhyOurInstaller | null {
  if (!data) return null;
  return {
    title: data.title ?? "",
    subtitle: data.subtitle ?? "",
    image: strapiImageData(data.image)?.src ?? "",
    certifications: (data.certifications ?? []).map((c) => ({
      title: c.title ?? "",
    })),
    whyMattersTitle: data.whyMattersTitle ?? "",
    whyMattersDescription: data.whyMattersDescription ?? "",
  };
}
