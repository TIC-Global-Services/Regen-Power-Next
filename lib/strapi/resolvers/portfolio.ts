import { strapiImageData } from "../media";
import type { PortfolioHeroData, PortfolioFiltersData, PortfolioProjectData } from "../schemas/portfolio";
import {
  PORTFOLIO_CATEGORY_FILTERS,
  type PortfolioItem,
} from "@/utils/portfolio.model";

export interface ResolvedPortfolioHero {
  subtitle: string;
  mainTitle: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  backgroundImage: string;
}
export function resolvePortfolioHero(
  data: PortfolioHeroData | undefined
): ResolvedPortfolioHero | null {
  if (!data) return null;
  const img = data.backgroundImage ? strapiImageData(data.backgroundImage) : null;
  return {
    subtitle: data.subtitle ?? "",
    mainTitle: data.mainTitle ?? "",
    description: data.description ?? "",
    ctaText: data.ctaText ?? "Get Your Free Quote",
    ctaLink: data.ctaLink ?? "#quote-form",
    backgroundImage: img?.src ?? "",
  };
}

export interface ResolvedPortfolioCard {
  title: string;
  description: string;
  image: string;
  categoryKey: string;
}

export interface ResolvedPortfolioFilterOption {
  label: string;
  value: string;
}

export interface ResolvedPortfolioFilters {
  filterGroups: {
    name: string;
    options: ResolvedPortfolioFilterOption[];
  }[];
  cards: ResolvedPortfolioCard[];
}

export function resolvePortfolioFilters(
  data: PortfolioFiltersData | undefined
): ResolvedPortfolioFilters | null {
  if (!data) return null;
  return {
    filterGroups: (data.filterGroups ?? []).map((g) => ({
      name: g.name ?? "",
      options: (g.options ?? []).map((o) => ({
        label: o.label,
        value: o.value,
      })),
    })),
    cards: (data.cards ?? []).map((card) => ({
      title: card.title ?? "",
      description: card.description ?? "",
      image: card.image ? strapiImageData(card.image)?.src ?? "" : "",
      categoryKey: card.categoryKey ?? "",
    })),
  };
}

/* ─── portfolio-project collection → PortfolioItem[] ─── */

const FILTER_SLUG_TO_LABEL = new Map(
  PORTFOLIO_CATEGORY_FILTERS.map((f) => [f.slug, f.label])
);

/**
 * Map collection entries onto the existing PortfolioItem shape used by
 * PortfolioInteractive. `categories` (display labels) are derived from the
 * machine-slug `filters` array.
 */
export function resolvePortfolioProjects(
  projects: PortfolioProjectData[] | undefined | null
): PortfolioItem[] | null {
  if (!Array.isArray(projects) || projects.length === 0) return null;

  return projects.map((p) => {
    const filters = (p.filters ?? []).map((f) => f.trim()).filter(Boolean);
    const categories = Array.from(
      new Set(filters.map((f) => FILTER_SLUG_TO_LABEL.get(f) ?? f))
    );
    return {
      id: p.id,
      title: p.title ?? "",
      link: "",
      image: p.image ? strapiImageData(p.image)?.src ?? "" : "",
      categories,
      filters,
      suburb: p.suburb,
      state: p.state,
      postcode: p.postcode,
      description: p.description?.trim() || undefined,
    };
  });
}
