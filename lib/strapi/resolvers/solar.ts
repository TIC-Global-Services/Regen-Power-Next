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
  SolarWhyRegenPowerData,
  SolarEngineeringItemsData,
} from "../schemas/solar";
import type { HeroProps } from "@/reuseables/Hero";

export interface ResolvedSolarHero
  extends Omit<HeroProps, "icon" | "videoFile" | "titleColor"> {
  mediaSrc: string;
  ctaLink?: string;
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
    ...(data.ctaLink ? { ctaLink: data.ctaLink } : {}),
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
  ctaHref?: string;
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
  ctaText?: string;
  ctaLink?: string;
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
    ...(data.ctaText ? { ctaText: data.ctaText } : {}),
    ...(data.ctaLink ? { ctaLink: data.ctaLink } : {}),
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

export interface ResolvedSolarTimelineStep {
  title: string;
  description: string;
}

// Used while Strapi has no `steps` for the timeline (or is unreachable).
const FALLBACK_TIMELINE_STEPS: ResolvedSolarTimelineStep[] = [
  {
    title: "Free Consultation",
    description:
      "A 15-minute call with a Regen energy advisor. We review your bill, household setup, and goals. No pressure, no sales script.",
  },
  {
    title: "Site Assessment",
    description:
      "A CEC-accredited designer visits your home (or uses satellite + phase confirmation) to check roof orientation, shade, switchboard, and meter. Takes about 45 minutes.",
  },
  {
    title: "Custom System Design",
    description:
      "We design a system specifically for your roof, household, and plans — including battery-readiness if relevant. You receive a detailed quote with panel layout, component specs, and total investment.",
  },
  {
    title: "Paperwork And Rebates",
    description:
      "We handle all Synergy / Western Power applications, DEBS feed-in registration, and federal STC rebate paperwork. The rebate is applied upfront as a discount — no forms for you to file.",
  },
  {
    title: "Installation Day",
    description:
      "Our in-house crew of CEC-accredited electricians installs your system in 6–8 hours for a typical residential job. You'll be back on power (off-grid) by the afternoon.",
  },
  {
    title: "Switch-On And Monitoring",
    description:
      "Once Western Power approves your meter reconfiguration (typically 2–10 business days), we help you activate the monitoring app and explain how to read your production, consumption, and savings.",
  },
];

export interface ResolvedSolarTimeline {
  badge: string;
  steps: ResolvedSolarTimelineStep[];
  subtitle: string;
  title: string;
  description: string;
  consultationTitle: string;
  consultationText: string;
  ctaText?: string;
  ctaLink?: string;
  image: StrapiImageData | null;
}
export function resolveSolarTimeline(
  data: SolarTimelineData | undefined
): ResolvedSolarTimeline | null {
  if (!data) return null;
  return {
    badge: data.badge || "Your Solar Journey",
    steps:
      data.steps && data.steps.length > 0
        ? data.steps.map((s) => ({ title: s.title, description: s.description }))
        : FALLBACK_TIMELINE_STEPS,
    subtitle: data.subtitle ?? "",
    title: data.title ?? "",
    description: data.description ?? "",
    consultationTitle: data.consultationTitle ?? "",
    consultationText: data.consultationText ?? "",
    ...(data.ctaText ? { ctaText: data.ctaText } : {}),
    ...(data.ctaLink ? { ctaLink: data.ctaLink } : {}),
    image: data.image ? strapiImageData(data.image) : null,
  };
}

export interface ResolvedSolarWhyRegenStat {
  value: string;
  label: string;
  logo: StrapiImageData | null;
}
export interface ResolvedSolarWhyRegenPower {
  badge: string;
  title: string;
  paragraphs: { text: string; isSecondary: boolean }[];
  stats: ResolvedSolarWhyRegenStat[];
  awardsTitle: string;
  awards: string[];
}
export function resolveSolarWhyRegenPower(
  data: SolarWhyRegenPowerData | undefined
): ResolvedSolarWhyRegenPower | null {
  if (!data) return null;
  return {
    badge: data.badge ?? "",
    title: data.title ?? "",
    paragraphs: (data.paragraphs ?? []).map((p) => ({
      text: p.text,
      isSecondary: p.isSecondary,
    })),
    stats: (data.stats ?? []).map((s) => ({
      value: s.value,
      label: s.label,
      logo: s.logo ? strapiImageData(s.logo) : null,
    })),
    awardsTitle: data.awardsTitle ?? "",
    awards: (data.awards ?? []).map((a) => a.text),
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
