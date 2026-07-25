import { strapiImageData } from "../media";
import type { PortfolioHeroData, PortfolioFiltersData } from "../schemas/portfolio";

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
