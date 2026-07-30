import { strapiImageData, type StrapiImageData } from "../media";
import type {
  OffGridHeroData,
  SolutionsPortfolioData,
  ThreeSolutionsSectionData,
  IconCardGridData,
  HybridGenDetailData,
  WorldMapData,
  MicrogridSpecTableData,
  AcquaSmartSectionData,
  OffGridStoryData,
  OverlayCardGridData,
  OffGridFormData,
} from "../schemas/off-grid";
import type { CommercialSystemsStatsCardGridData, SharedEditorialSectionData, SharedFaqData } from "../schemas/commercial";
import { resolveSharedFaq, resolveSharedEditorialSection } from "./shared";

export interface ResolvedOffGridHero {
  subtitle: string;
  mainTitle: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  backgroundImage: string;
}
export function resolveOffGridHero(
  data: OffGridHeroData | undefined
): ResolvedOffGridHero | null {
  if (!data) return null;
  const img = data.backgroundImage ? strapiImageData(data.backgroundImage) : null;
  return {
    subtitle: data.subtitle ?? "",
    mainTitle: data.mainTitle ?? "",
    description: data.description ?? "",
    ctaText: data.ctaText ?? "",
    ctaLink: data.ctaLink ?? "",
    backgroundImage: img?.src ?? "",
  };
}

export interface ResolvedStatsCardGrid {
  subtitle: string;
  title: string;
  description: string;
  cardBackground: string;
  stats: { value: string; label: string }[];
}
export function resolveStatsCardGrid(
  data: CommercialSystemsStatsCardGridData | undefined
): ResolvedStatsCardGrid | null {
  if (!data) return null;
  const img = data.cardBackground ? strapiImageData(data.cardBackground) : null;
  return {
    subtitle: data.subtitle ?? "",
    title: data.title ?? "",
    description: data.description ?? "",
    cardBackground: img?.src ?? "",
    stats: (data.stats ?? []).map((s) => ({ value: s.value, label: s.label })),
  };
}

export interface ResolvedPortfolioCard {
  type: "text" | "image";
  variant: string;
  title?: string;
  description?: string;
  specs?: string;
  image?: string;
}
export interface ResolvedSolutionsPortfolio {
  subtitle: string;
  title: string;
  description: string;
  cards: ResolvedPortfolioCard[];
}
export function resolveSolutionsPortfolio(
  data: SolutionsPortfolioData | undefined
): ResolvedSolutionsPortfolio | null {
  if (!data) return null;
  return {
    subtitle: data.subtitle ?? "",
    title: data.title ?? "",
    description: data.description ?? "",
    cards: (data.cards ?? []).map((c) => ({
      type: c.type,
      variant: c.variant ?? "light-gray",
      title: c.title ?? undefined,
      description: c.description ?? undefined,
      specs: c.specs ?? undefined,
      image: c.image ? strapiImageData(c.image)?.src ?? undefined : undefined,
    })),
  };
}

export interface ResolvedThreeSolutionItem {
  title: string;
  description: string;
  image: string;
  ctaText: string;
  ctaHref: string;
}
export interface ResolvedThreeSolutionsSection {
  subtitle: string;
  title: string;
  description: string;
  solutions: ResolvedThreeSolutionItem[];
}
export function resolveThreeSolutionsSection(
  data: ThreeSolutionsSectionData | undefined
): ResolvedThreeSolutionsSection | null {
  if (!data) return null;
  return {
    subtitle: data.subtitle ?? "",
    title: data.title ?? "",
    description: data.description ?? "",
    solutions: (data.solutions ?? []).map((s) => ({
      title: s.title ?? "",
      description: s.description ?? "",
      image: s.image ? strapiImageData(s.image)?.src ?? "" : "",
      ctaText: s.ctaText ?? "Learn More",
      ctaHref: s.ctaHref ?? "#",
    })),
  };
}

export interface ResolvedIconCard {
  title: string;
  description: string;
  specs?: string;
  icon?: string;
  variant?: string;
}

export interface ResolvedIconCardGrid {
  subtitle: string;
  title: string;
  description: string;
  cards: ResolvedIconCard[];
  layout: number;
  showHeader: boolean;
}

export function resolveIconCardGrid(
  data: IconCardGridData | undefined
): ResolvedIconCardGrid | null {
  if (!data) return null;
  return {
    subtitle: data.subtitle ?? "",
    title: data.title ?? "",
    description: data.description ?? "",
    layout: data.layout ?? 4,
    showHeader: data.showHeader ?? true,
    cards: (data.cards ?? []).map((card: any) => ({
      title: card.title ?? "",
      description: card.description ?? "",
      specs: card.specs ?? undefined,
      icon: card.icon ? strapiImageData(card.icon)?.src ?? undefined : undefined,
      variant: card.variant === "highlighted" || card.variant === "light" ? card.variant : undefined,
    })),
  };
}

export interface ResolvedHybridGenDetail {
  logo: string;
  image: string;
  subtitle?: string;
  title?: string;
  description?: string;
  patentText?: string;
}
export function resolveHybridGenDetail(
  data: HybridGenDetailData | undefined
): ResolvedHybridGenDetail | null {
  if (!data) return null;
  return {
    logo: data.logo ? strapiImageData(data.logo)?.src ?? "" : "",
    image: data.image ? strapiImageData(data.image)?.src ?? "" : "",
    subtitle: data.subtitle ?? undefined,
    title: data.title ?? undefined,
    description: data.description ?? undefined,
    patentText: data.patentText ?? undefined,
  };
}

export interface ResolvedMapMarker {
  name: string;
  top: string;
  left: string;
}
export interface ResolvedWorldMap {
  title: string;
  markers: ResolvedMapMarker[];
}
export function resolveWorldMap(
  data: WorldMapData | undefined
): ResolvedWorldMap | null {
  if (!data) return null;
  return {
    title: data.title ?? "",
    markers: (data.markers ?? []).map((m) => ({
      name: m.name ?? "",
      top: m.top ?? "50%",
      left: m.left ?? "50%",
    })),
  };
}

export interface ResolvedMicrogridSpecTable {
  subtitle: string;
  title: string;
  headers: { col1: string; col2: string };
  tableContent: { value: string; description: string }[];
}
export function resolveMicrogridSpecTable(
  data: MicrogridSpecTableData | undefined
): ResolvedMicrogridSpecTable | null {
  if (!data) return null;
  return {
    subtitle: data.subtitle ?? "",
    title: data.title ?? "",
    headers: data.headers ?? { col1: "Field", col2: "Detail" },
    tableContent: (data.tableContent ?? []).map((t) => ({
      value: t.value,
      description: t.description,
    })),
  };
}

export interface ResolvedAcquaSmartCard {
  title: string;
  description: string;
}
export interface ResolvedAcquaSmartSection {
  subtitle: string;
  title: string;
  description: string;
  image: string;
  cards: ResolvedAcquaSmartCard[];
}
export function resolveAcquaSmartSection(
  data: AcquaSmartSectionData | undefined
): ResolvedAcquaSmartSection | null {
  if (!data) return null;
  const img = data.image ? strapiImageData(data.image) : null;
  return {
    subtitle: data.subtitle ?? "",
    title: data.title ?? "",
    description: data.description ?? "",
    image: img?.src ?? "",
    cards: (data.cards ?? []).map((c) => ({
      title: c.title ?? "",
      description: c.description ?? "",
    })),
  };
}

export interface ResolvedStoryCard {
  title: string;
  description: string;
  variant: "default" | "highlighted" | "light";
}
export interface ResolvedOffGridStory {
  subtitle: string;
  title: string;
  description: string;
  cards: ResolvedStoryCard[];
  featuredImage: string;
  featuredTitle: string;
  featuredDescription: string;
}
export function resolveOffGridStory(
  data: OffGridStoryData | undefined
): ResolvedOffGridStory | null {
  if (!data) return null;
  const img = data.featuredImage ? strapiImageData(data.featuredImage) : null;
  return {
    subtitle: data.subtitle ?? "",
    title: data.title ?? "",
    description: data.description ?? "",
    cards: (data.cards ?? []).map((c) => ({
      title: c.title,
      description: c.description ?? "",
      variant: c.variant ?? "default",
    })),
    featuredImage: img?.src ?? "",
    featuredTitle: data.featuredTitle ?? "",
    featuredDescription: data.featuredDescription ?? "",
  };
}

export interface ResolvedOverlayCard {
  title: string;
  description: string;
}

export interface ResolvedOverlayCardGrid {
  subtitle: string;
  title: string;
  description: string;
  backgroundImage: string;
  cardLayout: string;
  cardColumns: number;
  overlayOpacity: number;
  badge: string;
  ctaText: string;
  ctaHref: string;
  cards: ResolvedOverlayCard[];
}

export function resolveOverlayCardGrid(
  data: OverlayCardGridData | undefined
): ResolvedOverlayCardGrid | null {
  if (!data) return null;
  const img = data.backgroundImage ? strapiImageData(data.backgroundImage) : null;
  return {
    subtitle: data.subtitle ?? "",
    title: data.title ?? "",
    description: data.description ?? "",
    backgroundImage: img?.src ?? "",
    cardLayout: data.cardLayout === "list" ? "wrap" : (data.cardLayout ?? "grid"),
    cardColumns: data.cardColumns ?? 3,
    overlayOpacity: data.overlayOpacity ?? 60,
    badge: data.badge ?? "",
    ctaText: data.ctaText ?? "",
    ctaHref: data.ctaHref ?? "",
    cards: (data.cards ?? []).map((card: any) => ({
      title: card.title ?? "",
      description: card.description ?? "",
    })),
  };
}

export interface ResolvedOffGridForm {
  subtitle: string;
  title: string;
  description: string;
  image: string;
}
export function resolveOffGridForm(
  data: OffGridFormData | undefined
): ResolvedOffGridForm | null {
  if (!data) return null;
  const img = data.image ? strapiImageData(data.image) : null;
  return {
    subtitle: data.subtitle ?? "",
    title: data.title ?? "",
    description: data.description ?? "",
    image: img?.src ?? "",
  };
}
