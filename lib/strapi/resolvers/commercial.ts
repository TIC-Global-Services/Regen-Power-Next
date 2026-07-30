import { strapiImageData } from "../media";
import type { StrapiImageData } from "../media";
import type {
  CommercialSystemsHeroData,
  CommercialSystemsStatsCardGridData,
  CommercialSystemsTiersSectionData,
  CommercialSystemsComponentsSectionData,
  CommercialSystemsIndustriesSectionData,
  CommercialSystemsFeatureCardGridData,
  CommercialSystemsWatchSystemSectionData,
  CommercialSystemsPackagesGridData,
  CommercialSystemsProcessFlowData,
  CommercialSystemsFiveThingsSectionData,
  CommercialSystemsCommercialFormData,
  CommercialOffGridHeroData,
  CommercialOffGridSolutionsPortfolioData,
} from "../schemas/commercial";

export interface ResolvedCommercialSystemsHero {
  mediaSrc: string;
  topSubtitle: string;
  mainTitle: string;
  description: string;
  ctaText: string;
  ctaLink: string;
}
export function resolveCommercialSystemsHero(
  data: CommercialSystemsHeroData | undefined
): ResolvedCommercialSystemsHero | null {
  if (!data) return null;
  const img = data.backgroundImage ? strapiImageData(data.backgroundImage) : null;
  return {
    mediaSrc: img?.src ?? "",
    topSubtitle: data.subtitle ?? "",
    mainTitle: data.mainTitle ?? "",
    description: data.description ?? "",
    ctaText: data.ctaText ?? "Book Energy Assessment",
    ctaLink: data.ctaLink ?? "#quote-form",
  };
}

export interface ResolvedCommercialSystemsStatsCardGrid {
  subtitle: string;
  title: string;
  description: string;
  cardBackground: StrapiImageData | null;
  stats: { value: string; label: string }[];
}
export function resolveCommercialSystemsStatsCardGrid(
  data: CommercialSystemsStatsCardGridData | undefined
): ResolvedCommercialSystemsStatsCardGrid | null {
  if (!data) return null;
  return {
    subtitle: data.subtitle ?? "",
    title: data.title ?? "",
    description: data.description ?? "",
    cardBackground: data.cardBackground ? strapiImageData(data.cardBackground) : null,
    stats: (data.stats ?? []).map((s) => ({ value: s.value, label: s.label })),
  };
}

export interface ResolvedTierDetail {
  label: string;
  value: string;
}
export interface ResolvedTier {
  title: string;
  subtitle: string;
  description: string;
  image: StrapiImageData | null;
  ctaText: string;
  ctaHref: string;
  details: ResolvedTierDetail[];
}
export interface ResolvedCommercialSystemsTiersSection {
  subtitle: string;
  title: string;
  description: string;
  tiers: ResolvedTier[];
}
export function resolveCommercialSystemsTiersSection(
  data: CommercialSystemsTiersSectionData | undefined
): ResolvedCommercialSystemsTiersSection | null {
  if (!data) return null;
  return {
    subtitle: data.subtitle ?? "",
    title: data.title ?? "",
    description: data.description ?? "",
    tiers: (data.tiers ?? []).map((t) => ({
      title: t.title,
      subtitle: t.subtitle,
      description: t.description,
      image: t.image ? strapiImageData(t.image) : null,
      ctaText: t.ctaText,
      ctaHref: t.ctaHref,
      details: (t.details ?? []).map((d) => ({
        label: d.label,
        value: d.value,
      })),
    })),
  };
}

export interface ResolvedComponentItem {
  letter: string;
  title: string;
}
export interface ResolvedCommercialSystemsComponentsSection {
  subtitle: string;
  title: string;
  description: string;
  backgroundImage: StrapiImageData | null;
  items: ResolvedComponentItem[];
}
export function resolveCommercialSystemsComponentsSection(
  data: CommercialSystemsComponentsSectionData | undefined
): ResolvedCommercialSystemsComponentsSection | null {
  if (!data) return null;
  return {
    subtitle: data.subtitle ?? "Six Components",
    title: data.title ?? "",
    description: data.description ?? "",
    backgroundImage: data.backgroundImage ? strapiImageData(data.backgroundImage) : null,
    items: (data.items ?? []).map((item) => ({
      letter: item.letter,
      title: item.title,
    })),
  };
}

export interface ResolvedIndustry {
  title: string;
  description: string;
  caseStudy: string;
  icon: StrapiImageData | null;
}
export interface ResolvedCommercialSystemsIndustriesSection {
  subtitle: string;
  title: string;
  industries: ResolvedIndustry[];
}
export function resolveCommercialSystemsIndustriesSection(
  data: CommercialSystemsIndustriesSectionData | undefined
): ResolvedCommercialSystemsIndustriesSection | null {
  if (!data) return null;
  return {
    subtitle: data.subtitle ?? "",
    title: data.title ?? "",
    industries: (data.industries ?? []).map((ind) => ({
      title: ind.title,
      description: ind.description,
      caseStudy: ind.caseStudy,
      icon: ind.icon ? strapiImageData(ind.icon) : null,
    })),
  };
}

export interface ResolvedFeatureCard {
  title: string;
  description: string;
  image: StrapiImageData | null;
  textPosition: "top" | "bottom";
  footerTitle: string | undefined;
  footerDescription: string | undefined;
}
export interface ResolvedCommercialSystemsFeatureCardGrid {
  topSubtitle: string;
  title: string;
  bottomSubtitle: string;
  cards: ResolvedFeatureCard[];
}
export function resolveCommercialSystemsFeatureCardGrid(
  data: CommercialSystemsFeatureCardGridData | undefined
): ResolvedCommercialSystemsFeatureCardGrid | null {
  if (!data) return null;
  return {
    topSubtitle: data.topSubtitle ?? "",
    title: data.title ?? "",
    bottomSubtitle: data.bottomSubtitle ?? "",
    cards: (data.cards ?? []).map((c) => ({
      title: c.title,
      description: c.description,
      image: c.image ? strapiImageData(c.image) : null,
      textPosition: c.textPosition ?? "top",
      footerTitle: c.footerTitle ?? undefined,
      footerDescription: c.footerDescription ?? undefined,
    })),
  };
}

export interface ResolvedCommercialSystemsWatchSystemSection {
  subtitle: string;
  title: string;
  image: StrapiImageData | null;
  paragraphs: string[];
  ctaText: string;
  ctaHref: string;
}
export function resolveCommercialSystemsWatchSystemSection(
  data: CommercialSystemsWatchSystemSectionData | undefined
): ResolvedCommercialSystemsWatchSystemSection | null {
  if (!data) return null;
  return {
    subtitle: data.subtitle ?? "",
    title: data.title ?? "",
    image: data.image ? strapiImageData(data.image) : null,
    paragraphs: (data.paragraphs ?? []).map((p) => p.text),
    ctaText: data.ctaText ?? "",
    ctaHref: data.ctaHref ?? "#",
  };
}

export interface ResolvedCommercialPackageItem {
  label: string;
  value: string;
}
export interface ResolvedCommercialPackage {
  title: string;
  desc: string;
  bgClass: string;
  items: ResolvedCommercialPackageItem[];
}
export interface ResolvedCommercialSystemsPackagesGrid {
  subtitle: string;
  title: string;
  description: string;
  packages: ResolvedCommercialPackage[];
}
export function resolveCommercialSystemsPackagesGrid(
  data: CommercialSystemsPackagesGridData | undefined
): ResolvedCommercialSystemsPackagesGrid | null {
  if (!data) return null;
  return {
    subtitle: data.subtitle ?? "",
    title: data.title ?? "",
    description: data.description ?? "",
    packages: (data.packages ?? []).map((pkg) => ({
      title: pkg.title,
      desc: pkg.desc,
      bgClass: pkg.bgClass,
      items: (pkg.items ?? []).map((item) => ({
        label: item.label,
        value: item.value,
      })),
    })),
  };
}

export interface ResolvedProcessStep {
  stepNumber: number;
  title: string;
  description: string;
  image: StrapiImageData | null;
}
export interface ResolvedCommercialSystemsProcessFlow {
  subtitle: string;
  title: string;
  description: string;
  steps: ResolvedProcessStep[];
}
export function resolveCommercialSystemsProcessFlow(
  data: CommercialSystemsProcessFlowData | undefined
): ResolvedCommercialSystemsProcessFlow | null {
  if (!data) return null;
  return {
    subtitle: data.subtitle ?? "",
    title: data.title ?? "",
    description: data.description ?? "",
    steps: (data.steps ?? []).map((s) => ({
      stepNumber: s.stepNumber,
      title: s.title,
      description: s.description,
      image: s.image ? strapiImageData(s.image) : null,
    })),
  };
}

export interface ResolvedFiveThingItem {
  number: number;
  title: string;
  description: string;
  highlight: boolean;
}
export interface ResolvedCommercialSystemsFiveThingsSection {
  subtitle: string;
  title: string;
  description: string;
  items: ResolvedFiveThingItem[];
}
export function resolveCommercialSystemsFiveThingsSection(
  data: CommercialSystemsFiveThingsSectionData | undefined
): ResolvedCommercialSystemsFiveThingsSection | null {
  if (!data) return null;
  return {
    subtitle: data.subtitle ?? "",
    title: data.title ?? "",
    description: data.description ?? "",
    items: (data.items ?? []).map((item) => ({
      number: item.number,
      title: item.title,
      description: item.description,
      highlight: item.highlight ?? false,
    })),
  };
}

export interface ResolvedCommercialSystemsCommercialForm {
  subtitle: string;
  title: string;
  description: string;
  image: StrapiImageData | null;
}
export function resolveCommercialSystemsCommercialForm(
  data: CommercialSystemsCommercialFormData | undefined
): ResolvedCommercialSystemsCommercialForm | null {
  if (!data) return null;
  return {
    subtitle: data.subtitle ?? "",
    title: data.title ?? "",
    description: data.description ?? "",
    image: data.image ? strapiImageData(data.image) : null,
  };
}

export interface ResolvedCommercialOffGridHero {
  mediaSrc: string;
  topSubtitle: string;
  mainTitle: string;
  description: string;
  ctaText: string;
  ctaLink: string;
}
export function resolveCommercialOffGridHero(
  data: CommercialOffGridHeroData | undefined
): ResolvedCommercialOffGridHero | null {
  if (!data) return null;
  const img = data.backgroundImage ? strapiImageData(data.backgroundImage) : null;
  return {
    mediaSrc: img?.src ?? "",
    topSubtitle: data.subtitle ?? "",
    mainTitle: data.mainTitle ?? "",
    description: data.description ?? "",
    ctaText: data.ctaText ?? "Request Consultation",
    ctaLink: data.ctaLink ?? "#quote-form",
  };
}

export type ResolvedPortfolioCard =
  | { type: "text"; variant: "light-gray" | "light-green" | "dark"; title: string; description: string; specs?: string }
  | { type: "image"; variant: "light-gray" | "light-green" | "dark"; image?: string };

export interface ResolvedCommercialOffGridSolutionsPortfolio {
  subtitle: string;
  title: string;
  description: string;
  layout: 3 | 4 | 6;
  cards: ResolvedPortfolioCard[];
}
export function resolveCommercialOffGridSolutionsPortfolio(
  data: CommercialOffGridSolutionsPortfolioData | undefined
): ResolvedCommercialOffGridSolutionsPortfolio | null {
  if (!data) return null;
  return {
    subtitle: data.subtitle ?? "",
    title: data.title ?? "",
    description: data.description ?? "",
    layout: (data.layout as 3 | 4 | 6) ?? 6,
    cards: (data.cards ?? []).map((c) => {
      if (c.type === "image") {
        const img = c.image ? strapiImageData(c.image) : null;
        return {
          type: "image" as const,
          variant: c.variant as "light-gray" | "light-green" | "dark",
          image: img?.src,
        };
      }
      return {
        type: "text" as const,
        variant: c.variant as "light-gray" | "light-green" | "dark",
        title: c.title,
        description: c.description,
        specs: c.specs ?? undefined,
      };
    }),
  };
}
