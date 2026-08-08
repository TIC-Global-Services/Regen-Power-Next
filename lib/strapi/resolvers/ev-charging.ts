import { strapiImageData } from "../media";
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
} from "../schemas/ev-charging";

// ─── Helper: media → src string ─────────────────────────────────────────

const src = (media: { url?: string } | null | undefined): string =>
  media ? strapiImageData(media as never)?.src ?? "" : "";

// ─── Hero ───────────────────────────────────────────────────────────────

export interface ResolvedEvChargingHero {
  mediaSrc: string;
  mediaType: "image" | "video";
  topSubtitle: string;
  mainTitle: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  isFullScreen?: boolean;
  descriptionColor?: string;
  imageClass?: string;
  showOverlay?: boolean;
}
export function resolveEvChargingHero(
  data: EvChargingHeroData | undefined | null
): ResolvedEvChargingHero | null {
  if (!data) return null;
  return {
    mediaSrc: src(data.backgroundImage),
    mediaType: "image",
    topSubtitle: data.subtitle ?? "",
    mainTitle: data.title ?? "",
    description: data.description ?? "",
    ctaText: data.buttonText ?? "",
    ctaLink: data.buttonLink ?? "",
    descriptionColor: "text-white",
    imageClass: "object-cover object-bottom",
    showOverlay: data.showOverlay ?? true,
  };
}

// ─── Wall Connector ────────────────────────────────────────────────────

export interface ResolvedEvChargingWallConnector {
  title: string;
  subtitle: string;
  description: string;
  specs: string[];
  image: string;
  imageAlt: string;
}
export function resolveEvChargingWallConnector(
  data: EvChargingWallConnectorData | undefined | null
): ResolvedEvChargingWallConnector | null {
  if (!data) return null;
  const img = data.image ? strapiImageData(data.image) : null;
  return {
    title: data.title ?? "",
    subtitle: data.subtitle ?? "",
    description: data.description ?? "",
    specs: (data.specs ?? []).map((s) => s.label),
    image: img?.src ?? "",
    imageAlt: img?.alt ?? "",
  };
}

// ─── Charger Products ──────────────────────────────────────────────────

export interface ResolvedEvChargingChargerProduct {
  name: string;
  image: string;
  description: string;
}
export interface ResolvedEvChargingChargerProducts {
  subtitle: string;
  title: string;
  products: ResolvedEvChargingChargerProduct[];
}
export function resolveEvChargingChargerProducts(
  data: EvChargingChargerProductsData | undefined | null
): ResolvedEvChargingChargerProducts | null {
  if (!data) return null;
  return {
    subtitle: data.subtitle ?? "",
    title: data.title ?? "",
    products: (data.products ?? []).map((p) => ({
      name: p.name,
      image: src(p.image),
      description: p.description,
    })),
  };
}

// ─── Installer Brands ──────────────────────────────────────────────────

export interface ResolvedEvChargingInstallerBrand {
  name: string;
  logo: string;
  title: string;
  description: string;
  specs?: string;
}
export interface ResolvedEvChargingInstallerBrands {
  subtitle: string;
  title: string;
  description: string;
  brands: ResolvedEvChargingInstallerBrand[];
}
export function resolveEvChargingInstallerBrands(
  data: EvChargingInstallerBrandsData | undefined | null
): ResolvedEvChargingInstallerBrands | null {
  if (!data) return null;
  return {
    subtitle: data.subtitle ?? "",
    title: data.title ?? "",
    description: data.description ?? "",
    brands: (data.brands ?? []).map((b) => ({
      name: b.name,
      logo: src(b.logo),
      title: b.cardTitle ?? "",
      description: b.description ?? "",
      ...(b.specs ? { specs: b.specs } : {}),
    })),
  };
}

// ─── Benefit Cards (Why Charge At Home) ───────────────────────────────

export interface ResolvedEvChargingBenefit {
  title: string;
  description: string;
  image: string;
}
export interface ResolvedEvChargingBenefitCards {
  title: string;
  benefits: ResolvedEvChargingBenefit[];
}
export function resolveEvChargingBenefitCards(
  data: EvChargingBenefitCardsData | undefined | null
): ResolvedEvChargingBenefitCards | null {
  if (!data) return null;
  return {
    title: data.title ?? "",
    benefits: (data.benefits ?? []).map((b) => ({
      title: b.title,
      description: b.description ?? "",
      image: src(b.image),
    })),
  };
}

// ─── Home Battery ──────────────────────────────────────────────────────

export interface ResolvedEvChargingHomeBattery {
  image: string;
  imageAlt: string;
  subtitle: string;
  title: string;
  paragraphs: string[];
  bulletPoints: string[];
  ctaText?: string;
  ctaLink?: string;
}
export function resolveEvChargingHomeBattery(
  data: EvChargingHomeBatteryData | undefined | null
): ResolvedEvChargingHomeBattery | null {
  if (!data) return null;
  const img = data.image ? strapiImageData(data.image) : null;
  return {
    image: img?.src ?? "",
    imageAlt: img?.alt ?? "",
    subtitle: data.subtitle ?? "",
    title: data.title ?? "",
    paragraphs: (data.paragraphs ?? []).map((p) => p.text),
    bulletPoints: (data.bulletPoints ?? []).map((b) => b.text),
    ...(data.ctaText ? { ctaText: data.ctaText } : {}),
    ...(data.ctaLink ? { ctaLink: data.ctaLink } : {}),
  };
}

// ─── Feature Cards (Under One Roof) ───────────────────────────────────

export interface ResolvedEvChargingFeatureCard {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}
export interface ResolvedEvChargingFeatureCards {
  subtitle: string;
  title: string;
  description: string;
  cards: ResolvedEvChargingFeatureCard[];
}
export function resolveEvChargingFeatureCards(
  data: EvChargingFeatureCardsData | undefined | null
): ResolvedEvChargingFeatureCards | null {
  if (!data) return null;
  const img = (m: { url?: string } | null) => {
    const d = m ? strapiImageData(m as never) : null;
    return d;
  };
  return {
    subtitle: data.subtitle ?? "",
    title: data.title ?? "",
    description: data.description ?? "",
    cards: (data.cards ?? []).map((c) => {
      const im = img(c.image);
      return {
        title: c.title,
        description: c.description ?? "",
        image: im?.src ?? "",
        imageAlt: im?.alt ?? "",
      };
    }),
  };
}

// ─── Installation Steps (EvAccordion) ─────────────────────────────────

export interface ResolvedEvChargingInstallationStep {
  number: string;
  title: string;
  description: string;
  image: string;
}
export interface ResolvedEvChargingInstallationSteps {
  subtitle: string;
  title: string;
  steps: ResolvedEvChargingInstallationStep[];
}
export function resolveEvChargingInstallationSteps(
  data: EvChargingInstallationStepsData | undefined | null
): ResolvedEvChargingInstallationSteps | null {
  if (!data) return null;
  return {
    subtitle: data.subtitle ?? "",
    title: data.title ?? "",
    steps: (data.steps ?? []).map((s) => ({
      number: s.number,
      title: s.title,
      description: s.description,
      image: src(s.image),
    })),
  };
}

// ─── Stats (Why Choose Us) — card model ───────────────────────────────

export interface ResolvedEvChargingWhyChooseCard {
  variant: "award" | "installations" | "years";
  bgColor: string;
  logoBg?: string;
  logo?: string;
  mobileLogo?: string;
  count?: number;
  countSuffix?: string;
  mobileCount?: number;
  mobileCountSuffix?: string;
  title?: string;
  description?: string;
  mobileTitle?: string;
  combinedText?: string;
  productImage?: string;
  showPlusButton?: boolean;
  backgroundImage?: string;
  yearsText?: string;
}
export interface ResolvedEvChargingStats {
  headerSubtitle: string;
  headerTitle: string;
  cards: ResolvedEvChargingWhyChooseCard[];
}
export function resolveEvChargingStats(
  data: EvChargingStatsData | undefined | null
): ResolvedEvChargingStats | null {
  if (!data) return null;
  return {
    headerSubtitle: data.headerSubtitle ?? "",
    headerTitle: data.headerTitle ?? "",
    cards: (data.cards ?? []).map((c) => {
      const card: ResolvedEvChargingWhyChooseCard = {
        variant: (c.variant ?? "award") as "award",
        bgColor: c.bgColor ?? "",
      };
      if (c.logoBg) card.logoBg = src(c.logoBg);
      if (c.logo) card.logo = src(c.logo);
      if (c.mobileLogo) card.mobileLogo = c.mobileLogo;
      if (c.count != null) card.count = c.count;
      if (c.countSuffix) card.countSuffix = c.countSuffix;
      if (c.mobileCount != null) card.mobileCount = c.mobileCount;
      if (c.mobileCountSuffix) card.mobileCountSuffix = c.mobileCountSuffix;
      if (c.title) card.title = c.title;
      if (c.description) card.description = c.description;
      if (c.mobileTitle) card.mobileTitle = c.mobileTitle;
      if (c.combinedText) card.combinedText = c.combinedText;
      if (c.productImage) card.productImage = src(c.productImage);
      if (c.showPlusButton != null) card.showPlusButton = c.showPlusButton;
      if (c.backgroundImage) card.backgroundImage = src(c.backgroundImage);
      if (c.yearsText) card.yearsText = c.yearsText;
      return card;
    }),
  };
}