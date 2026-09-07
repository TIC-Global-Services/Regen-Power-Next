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
  ctaLink?: string;
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
    ...(data.ctaLink ? { ctaLink: data.ctaLink } : {}),
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
 * machine-slug `filters` array. `link` points at the project detail page.
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
      slug: p.slug ?? "",
      link: p.slug ? `/portfolio/${p.slug}` : "",
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

/* ─── single project detail page ─── */

export interface ResolvedPortfolioProjectDetail {
  title: string;
  slug: string;
  description: string;
  image: string;
  categories: string[];
  /** "Suburb, STATE, Postcode" built from parts; falls back to CMS `location` */
  location: string;
  /** Spec rows (label/value) — only non-empty fields, display-ready */
  specs: { label: string; value: string }[];
  /** Content field rendered to safe HTML (escaped, **bold** + paragraphs) */
  contentHtml: string;
}

/** Minimal, XSS-safe markdown subset renderer: escape → **bold** → paragraphs. */
function renderProjectContent(raw: string | null | undefined): string {
  const text = (raw ?? "").trim();
  if (!text) return "";
  const escaped = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  return escaped
    .split(/\n{2,}/)
    .map(
      (para) =>
        `<p>${para
          .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
          .replace(/\n/g, "<br/>")}</p>`
    )
    .join("");
}

const firstNonEmpty = (...values: (string | null | undefined)[]): string =>
  values.map((v) => v?.trim() ?? "").find(Boolean) ?? "";

export function resolvePortfolioProjectDetail(
  project: PortfolioProjectData | null | undefined
): ResolvedPortfolioProjectDetail | null {
  if (!project) return null;

  const filters = (project.filters ?? []).map((f) => f.trim()).filter(Boolean);
  const categories = Array.from(
    new Set(filters.map((f) => FILTER_SLUG_TO_LABEL.get(f) ?? f))
  );

  /* Spec rows in display order — only fields the CMS actually filled in. */
  const specEntries: { label: string; value: string }[] = [
    { label: "Task", value: firstNonEmpty(project.task) },
    { label: "System Size", value: firstNonEmpty(project.systemSize) },
    { label: "Battery Size", value: firstNonEmpty(project.batterySize) },
    { label: "Brand", value: firstNonEmpty(project.brand) },
    { label: "Model", value: firstNonEmpty(project.model) },
    { label: "Panels", value: firstNonEmpty(project.panels) },
    { label: "Panel Model", value: firstNonEmpty(project.panelModel) },
    { label: "Inverter", value: firstNonEmpty(project.inverter) },
    { label: "Inverter Model", value: firstNonEmpty(project.inverterModel) },
    { label: "Industry", value: firstNonEmpty(project.industry) },
    { label: "Energy Yield", value: firstNonEmpty(String(project.energyYield ?? "")) },
    { label: "CO₂ Saving", value: firstNonEmpty(String(project.co2Saving ?? "")) },
    { label: "Installed", value: firstNonEmpty(project.date) },
  ].filter((s) => s.value !== "");

  return {
    title: project.title ?? "",
    slug: project.slug ?? "",
    description: project.description?.trim() ?? "",
    image: project.image ? strapiImageData(project.image)?.src ?? "" : "",
    categories,
    location:
      firstNonEmpty(project.location) ||
      [
        [project.suburb, project.state].filter(Boolean).join(", "),
        project.postcode,
      ]
        .filter(Boolean)
        .join(" "),
    specs: specEntries,
    contentHtml: renderProjectContent(project.content),
  };
}
