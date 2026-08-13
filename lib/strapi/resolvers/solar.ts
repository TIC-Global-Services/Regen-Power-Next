import { strapiImage, strapiImageData } from "../media";
import type { StrapiImageData } from "../media";
import type {
  SolarHeroData,
  SolarStatsAndIntroData,
  SolarProcessStepsData,
  SolarBrandsGridData,
  SolarInverterSliderData,
  SolarSpecsRowCardsData,
  SolarSizingGuideTableData,
  SolarPackagesData,
  SolarTimelineData,
  SolarEngineeringItemsData,
} from "../schemas/solar";
import type { HeroProps } from "@/reuseables/Hero";

export interface ResolvedSolarHero
  extends Omit<HeroProps, "icon" | "videoFile" | "titleColor"> {
  mediaSrc: string;
}
export function resolveSolarHero(
  data: SolarHeroData | undefined
): ResolvedSolarHero | null {
  if (!data) return null;
  const img = data.backgroundImage ? strapiImageData(data.backgroundImage) : null;
  return {
    mediaSrc: img?.src ?? "",
    mediaType: "image",
    topSubtitle: data.subtitle ?? "",
    mainTitle: data.title ?? "",
    description: data.description ?? "",
    ctaText: data.ctaText ?? "Get Started",
    ctaLink: data.ctaLink ?? "#quote-form",
    subtitleColor: "text-white",
    descriptionColor: "text-white",
    showOverlay: true,
  };
}

export interface ResolvedSolarStatsAndIntro {
  tickerTexts: string[];
  paragraphs: { text: string; isSecondary: boolean }[];
  subtitle: string;
  title: string;
}
export function resolveSolarStatsAndIntro(
  data: SolarStatsAndIntroData | undefined
): ResolvedSolarStatsAndIntro | null {
  if (!data) return null;
  return {
    tickerTexts: (data.tickerItems ?? []).map((t) => t.text),
    paragraphs: (data.introParagraphs ?? []).map((p) => ({
      text: p.text,
      isSecondary: p.isSecondary,
    })),
    subtitle: data.introSubtitle ?? "",
    title: data.introTitle ?? "",
  };
}

export interface ResolvedSolarProcessStep {
  title: string;
  description: string;
  image: StrapiImageData | null;
}
export interface ResolvedSolarProcessSteps {
  subtitle: string;
  title: string;
  steps: ResolvedSolarProcessStep[];
}
export function resolveSolarProcessSteps(
  data: SolarProcessStepsData | undefined
): ResolvedSolarProcessSteps | null {
  if (!data) return null;
  return {
    subtitle: data.subtitle ?? "",
    title: data.title ?? "",
    steps: (data.steps ?? []).map((s) => ({
      title: s.title,
      description: s.description,
      image: s.image ? strapiImageData(s.image) : null,
    })),
  };
}

export interface ResolvedSolarBrand {
  name: string;
  logo: StrapiImageData | null;
}
export interface ResolvedSolarBrandsGrid {
  subtitle: string;
  title: string;
  description: string;
  ctaText: string;
  ctaHref: string;
  brands: ResolvedSolarBrand[];
}
export function resolveSolarBrandsGrid(
  data: SolarBrandsGridData | undefined
): ResolvedSolarBrandsGrid | null {
  if (!data) return null;
  return {
    subtitle: data.subtitle ?? "",
    title: data.title ?? "",
    description: data.description ?? "",
    ctaText: data.ctaText ?? "",
    ctaHref: data.ctaHref ?? "",
    brands: (data.brands ?? []).map((b) => ({
      name: b.name,
      logo: b.logo ? strapiImageData(b.logo) : null,
    })),
  };
}

export interface ResolvedSolarInverterCard {
  label: string;
  text: string;
}
export interface ResolvedSolarInverter {
  title: string;
  background: StrapiImageData | null;
  infoCards: ResolvedSolarInverterCard[];
}
export interface ResolvedSolarInverterSlider {
  subtitle: string;
  title: string;
  description: string;
  inverters: ResolvedSolarInverter[];
}
export function resolveSolarInverterSlider(
  data: SolarInverterSliderData | undefined
): ResolvedSolarInverterSlider | null {
  if (!data) return null;
  return {
    subtitle: data.subtitle ?? "",
    title: data.title ?? "",
    description: data.description ?? "",
    inverters: (data.inverters ?? []).map((inv) => ({
      title: inv.title,
      background: inv.backgroundImage ? strapiImageData(inv.backgroundImage) : null,
      infoCards: (inv.infoCards ?? []).map((c) => ({ label: c.label, text: c.text })),
    })),
  };
}

export interface ResolvedSolarSpec {
  title: string;
  value: string;
  description: string;
  image: StrapiImageData | null;
}
export interface ResolvedSolarSpecsRowCards {
  subtitle: string;
  title: string;
  description: string;
  specs: ResolvedSolarSpec[];
}
export function resolveSolarSpecsRowCards(
  data: SolarSpecsRowCardsData | undefined
): ResolvedSolarSpecsRowCards | null {
  if (!data) return null;
  return {
    subtitle: data.subtitle ?? "",
    title: data.title ?? "",
    description: data.description ?? "",
    specs: (data.specs ?? []).map((s) => ({
      title: s.title ?? "",
      value: s.value ?? "",
      description: s.description ?? "",
      image: s.image ? strapiImageData(s.image) : null,
    })),
  };
}

export interface ResolvedSolarSizingCard {
  title: string;
  description: string;
  image: StrapiImageData | null;
}
export interface ResolvedSolarSizingColumn {
  title: string;
}
export interface ResolvedSolarSizingValue {
  text: string;
}
export interface ResolvedSolarSizingRow {
  label: string;
  values: ResolvedSolarSizingValue[];
}
export interface ResolvedSolarSizingGuideTable {
  subtitle: string;
  title: string;
  description: string;
  labelColumnTitle: string;
  columns: ResolvedSolarSizingColumn[];
  rows: ResolvedSolarSizingRow[];
  sizingCards: ResolvedSolarSizingCard[];
}
export function resolveSolarSizingGuideTable(
  data: SolarSizingGuideTableData | undefined
): ResolvedSolarSizingGuideTable | null {
  if (!data) return null;
  return {
    subtitle: data.subtitle ?? "",
    title: data.title ?? "",
    description: data.description ?? "",
    labelColumnTitle: data.labelColumnTitle ?? "",
    columns: (data.columns ?? []).map((col) => ({
      title: col.title ?? "",
    })),
    rows: (data.rows ?? []).map((row) => ({
      label: row.label ?? "",
      values: (row.values ?? []).map((value) => ({
        text: value.text ?? "",
      })),
    })),
    sizingCards: (data.sizingCards ?? []).map((c) => ({
      title: c.title,
      description: c.description,
      image: c.image ? strapiImageData(c.image) : null,
    })),
  };
}

export interface ResolvedSolarPackageItem {
  label: string;
  value: string;
}
export interface ResolvedSolarPackage {
  title: string;
  description: string;
  bgClass: string;
  items: ResolvedSolarPackageItem[];
}
export interface ResolvedSolarPackages {
  subtitle: string;
  title: string;
  description: string;
  packages: ResolvedSolarPackage[];
}
export function resolveSolarPackages(
  data: SolarPackagesData | undefined
): ResolvedSolarPackages | null {
  if (!data) return null;
  const bgColors = ["bg-[#EEF6EB]", "bg-[#A0CF44]", "bg-[#EEF6EB]"];
  return {
    subtitle: data.subtitle ?? "",
    title: data.title ?? "",
    description: data.description ?? "",
    packages: (data.packages ?? []).map((p, idx) => ({
      title: p.title,
      description: p.description,
      bgClass: bgColors[idx] ?? "",
      items: (p.features ?? []).map((f) => ({ label: f.label, value: f.value })),
    })),
  };
}

export interface ResolvedSolarTimeline {
  subtitle: string;
  title: string;
  description: string;
  consultationTitle: string;
  consultationText: string;
  image: StrapiImageData | null;
}
export function resolveSolarTimeline(
  data: SolarTimelineData | undefined
): ResolvedSolarTimeline | null {
  if (!data) return null;
  return {
    subtitle: data.subtitle ?? "",
    title: data.title ?? "",
    description: data.description ?? "",
    consultationTitle: data.consultationTitle ?? "",
    consultationText: data.consultationText ?? "",
    image: data.image ? strapiImageData(data.image) : null,
  };
}

export interface ResolvedSolarEngineeringItem {
  title: string;
  description: string;
  isDark: boolean;
}
export interface ResolvedSolarEngineeringItems {
  subtitle: string;
  title: string;
  description: string;
  items: ResolvedSolarEngineeringItem[];
}
export function resolveSolarEngineeringItems(
  data: SolarEngineeringItemsData | undefined
): ResolvedSolarEngineeringItems | null {
  if (!data) return null;
  return {
    subtitle: data.subtitle ?? "",
    title: data.title ?? "",
    description: data.description ?? "",
    items: (data.items ?? []).map((i) => ({
      title: i.title,
      description: i.description,
      isDark: i.isDark,
    })),
  };
}
