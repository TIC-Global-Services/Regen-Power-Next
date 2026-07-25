import { strapiImageData } from "../media";
import type { StrapiImageData } from "../media";
import type {
  BrandsHeroData,
  BrandsPhilosophyData,
  BrandsTier1MeansData,
  BrandsGridData,
  BrandsHybridSpecialtyData,
  BrandsInvertersSliderData,
  BrandsCriteriaListData,
  BrandsSpecsTableData,
} from "../schemas/brands";

export interface ResolvedBrandsHero {
  mediaSrc: string;
  subtitle: string;
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
}
export function resolveBrandsHero(
  data: BrandsHeroData | undefined
): ResolvedBrandsHero | null {
  if (!data) return null;
  const img = data.backgroundImage ? strapiImageData(data.backgroundImage) : null;
  if (!img) return null;
  return {
    mediaSrc: img.src,
    subtitle: data.subtitle ?? "",
    title: data.title ?? "",
    description: data.description ?? "",
    ctaText: data.ctaText ?? "",
    ctaLink: data.ctaLink ?? "#quote-form",
  };
}

export interface ResolvedBrandsPhilosophy {
  badge: string | undefined;
  subtitle: string;
  title: string;
  paragraphs: { text: string; isSecondary: boolean }[];
}
export function resolveBrandsPhilosophy(
  data: BrandsPhilosophyData | undefined
): ResolvedBrandsPhilosophy | null {
  if (!data) return null;
  return {
    badge: data.badge ?? undefined,
    subtitle: data.subtitle ?? "",
    title: data.title ?? "",
    paragraphs: (data.paragraphs ?? []).map((p) => ({
      text: p.text,
      isSecondary: p.isSecondary,
    })),
  };
}

export interface ResolvedBrandsTier1Means {
  subtitle: string;
  title: string;
  description: string;
  image: StrapiImageData | null;
  imagePosition: "left" | "right";
}
export function resolveBrandsTier1Means(
  data: BrandsTier1MeansData | undefined
): ResolvedBrandsTier1Means | null {
  if (!data) return null;
  return {
    subtitle: data.subtitle ?? "",
    title: data.title ?? "",
    description: data.description ?? "",
    image: data.image ? strapiImageData(data.image) : null,
    imagePosition: data.imagePosition ?? "left",
  };
}

export interface ResolvedBrandsGrid {
  subtitle: string;
  title: string;
  badge: string | undefined;
  cards: {
    title: string;
    subtitle: string | undefined;
    middleTitle: string | undefined;
    description: string;
    isDark: boolean | undefined;
  }[];
}
export function resolveBrandsGrid(
  data: BrandsGridData | undefined
): ResolvedBrandsGrid | null {
  if (!data) return null;
  return {
    subtitle: data.subtitle ?? "",
    title: data.title ?? "",
    badge: data.badge ?? undefined,
    cards: (data.cards ?? []).map((c) => ({
      title: c.title,
      subtitle: c.subtitle ?? undefined,
      middleTitle: c.middleTitle ?? undefined,
      description: c.description ?? "",
      isDark: c.isDark ?? undefined,
    })),
  };
}

export interface ResolvedBrandsHybridSpecialty {
  subtitle: string;
  title: string;
  description: string;
  image: StrapiImageData | null;
}
export function resolveBrandsHybridSpecialty(
  data: BrandsHybridSpecialtyData | undefined
): ResolvedBrandsHybridSpecialty | null {
  if (!data) return null;
  return {
    subtitle: data.subtitle ?? "",
    title: data.title ?? "",
    description: data.description ?? "",
    image: data.image ? strapiImageData(data.image) : null,
  };
}

export interface ResolvedBrandsInverter {
  name: string;
  origin: string;
  positioning: string;
  range: string;
  warranty: string;
}
export interface ResolvedBrandsInvertersSlider {
  subtitle: string;
  title: string;
  inverters: ResolvedBrandsInverter[];
}
export function resolveBrandsInvertersSlider(
  data: BrandsInvertersSliderData | undefined
): ResolvedBrandsInvertersSlider | null {
  if (!data) return null;
  return {
    subtitle: data.subtitle ?? "",
    title: data.title ?? "",
    inverters: (data.inverters ?? []).map((inv) => ({
      name: inv.name,
      origin: inv.origin ?? "",
      positioning: inv.positioning ?? "",
      range: inv.range ?? "",
      warranty: inv.warranty ?? "",
    })),
  };
}

export interface ResolvedBrandsCriteriaItem {
  title: string;
  description: string;
}
export interface ResolvedBrandsCriteriaList {
  subtitle: string;
  title: string;
  introText: string;
  items: ResolvedBrandsCriteriaItem[];
}
export function resolveBrandsCriteriaList(
  data: BrandsCriteriaListData | undefined
): ResolvedBrandsCriteriaList | null {
  if (!data) return null;
  return {
    subtitle: data.subtitle ?? "",
    title: data.title ?? "",
    introText: data.introText ?? "",
    items: (data.items ?? []).map((item) => ({
      title: item.title,
      description: item.description,
    })),
  };
}

export interface ResolvedBrandsSpecColumn {
  brand: string;
  efficiency: string;
  tempCoeff: string;
  degradation: string;
  warranty: string;
}
export interface ResolvedBrandsSpecsTable {
  subtitle: string;
  title: string;
  description: string;
  columns: ResolvedBrandsSpecColumn[];
}
export function resolveBrandsSpecsTable(
  data: BrandsSpecsTableData | undefined
): ResolvedBrandsSpecsTable | null {
  if (!data) return null;
  return {
    subtitle: data.subtitle ?? "",
    title: data.title ?? "",
    description: data.description ?? "",
    columns: (data.columns ?? []).map((col) => ({
      brand: col.brand,
      efficiency: col.efficiency ?? "",
      tempCoeff: col.tempCoeff ?? "",
      degradation: col.degradation ?? "",
      warranty: col.warranty ?? "",
    })),
  };
}
