const STRAPI_URL =
  process.env.STRAPI_URL || "https://regen-strapi-production.up.railway.app";

export function getStrapiURL(): string {
  return STRAPI_URL.replace(/\/$/, "");
}

export interface StrapiMediaFormat {
  url: string;
  width: number;
  height: number;
  mime: string;
  ext: string;
  size: number;
}

export interface StrapiMedia {
  id: number;
  documentId: string;
  url: string;
  width: number;
  height: number;
  alternativeText: string | null;
  caption: string | null;
  mime: string;
  ext: string;
  size: number;
  formats?: Record<string, StrapiMediaFormat>;
  name?: string;
  hash?: string;
  provider?: string;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string | null;
}

export interface StrapiSection {
  id: number;
  __component: string;
  [key: string]: unknown;
}

export interface StrapiSingleTypePage {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  sections: StrapiSection[];
}

export interface StrapiResponse<T> {
  data: T;
  meta: Record<string, unknown>;
}

export interface StrapiError {
  status: number;
  name: string;
  message: string;
  details?: Record<string, unknown>;
}

export class StrapiFetchError extends Error {
  status: number;
  details?: StrapiError;
  constructor(message: string, status: number, details?: StrapiError) {
    super(message);
    this.name = "StrapiFetchError";
    this.status = status;
    this.details = details;
  }
}

export async function strapiFetch<T>(
  path: string,
  init?: RequestInit & { next?: { revalidate?: number; tags?: string[] } }
): Promise<T> {
  const url = `${getStrapiURL()}/api${path}`;
  const res = await fetch(url, {
    ...init,
    headers: {
      Accept: "application/json",
      ...(init?.headers || {}),
    },
    next: { revalidate: 60, ...(init?.next || {}) },
  });

  if (!res.ok) {
    let details: StrapiError | undefined;
    try {
      const body = await res.json();
      details = body?.error;
    } catch {
      /* ignore */
    }
    throw new StrapiFetchError(
      `Strapi ${res.status} ${res.statusText} for ${path}`,
      res.status,
      details
    );
  }

  return res.json() as Promise<T>;
}

export function strapiImage(
  media: StrapiMedia | null | undefined | { url?: string | null }
): string {
  const url = media?.url;
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return `${getStrapiURL()}${url.startsWith("/") ? "" : "/"}${url}`;
}

async function getSingleType(
  slug: string,
  populateQuery?: string
): Promise<StrapiResponse<StrapiSingleTypePage>> {
  const query = populateQuery ? `?${populateQuery}` : "";
  return strapiFetch<StrapiResponse<StrapiSingleTypePage>>(
    `/${slug}${query}`
  );
}

const SECTIONS_POPULATE =
  "populate[sections][on][solar.hero][populate]=backgroundImage" +
  "&populate[sections][on][solar.stats-and-intro][populate][tickerItems]=true" +
  "&populate[sections][on][solar.stats-and-intro][populate][introParagraphs]=true" +
  "&populate[sections][on][solar.process-steps][populate][steps][populate]=image" +
  "&populate[sections][on][solar.brands-grid][populate][brands][populate]=logo" +
  "&populate[sections][on][solar.inverter-slider][populate][inverters][populate]=backgroundImage" +
  "&populate[sections][on][solar.specs-table][populate][specs][populate]=image" +
  "&populate[sections][on][solar.sizing-guide][populate][tableRows]=true" +
  "&populate[sections][on][solar.sizing-guide][populate][sizingCards][populate]=image" +
  "&populate[sections][on][solar.packages][populate][packages][populate]=features" +
  "&populate[sections][on][solar.timeline][populate]=image" +
  "&populate[sections][on][solar.engineering-items][populate][items]=true" +
  "&populate[sections][on][brands.hero][populate]=backgroundImage" +
  "&populate[sections][on][brands.philosophy][populate][paragraphs]=true" +
  "&populate[sections][on][brands.tier1-means][populate]=image" +
  "&populate[sections][on][brands.brands-grid][populate][cards]=true" +
  "&populate[sections][on][brands.hybrid-specialty][populate]=image" +
  "&populate[sections][on][brands.inverters-slider][populate][inverters]=true" +
  "&populate[sections][on][brands.criteria-list][populate][items]=true" +
  "&populate[sections][on][brands.specs-table][populate][columns]=true" +
  "&populate[sections][on][deals.hero][populate]=backgroundImage" +
  "&populate[sections][on][deals.philosophy][populate][paragraphs]=true" +
  "&populate[sections][on][deals.deals-grid][populate][promotions]=true" +
  "&populate[sections][on][shared.split-section][populate]=image" +
  "&populate[sections][on][deals.ways-to-pay][populate][cards][populate]=image" +
  "&populate[sections][on][deals.why-matters][populate][items][populate]=image" +
  "&populate[sections][on][shared.faq][populate][image]=true" +
  "&populate[sections][on][shared.faq][populate][items]=true" +
  "&populate[sections][on][shared.cta-banner][populate]=backgroundImage" +
  "&populate[sections][on][rebates.hero][populate]=backgroundImage" +
  "&populate[sections][on][rebates.rebate-programs][populate][programs][populate]=image" +
  "&populate[sections][on][rebates.stc-explainer][populate][paragraphs]=true" +
  "&populate[sections][on][rebates.utility-cards][populate][cards][populate]=logo" +
  "&populate[sections][on][rebates.loan-benefits][populate][benefits]=true" +
  "&populate[sections][on][rebates.loan-benefits][populate][backgroundImage]=true" +
  "&populate[sections][on][rebates.eligibility-checker][populate][questions]=true" +
  "&populate[sections][on][rebates.eligibility-checker][populate][results]=true" +
  "&populate[sections][on][faq.hero][populate]=backgroundImage" +
  "&populate[sections][on][faq.categorized-faq][populate][categories][populate][items]=true" +
  "&populate[sections][on][commercial-systems.hero][populate]=backgroundImage" +
  "&populate[sections][on][commercial-systems.stats-card-grid][populate][stats]=true" +
  "&populate[sections][on][commercial-systems.stats-card-grid][populate][cardBackground]=true" +
  "&populate[sections][on][commercial-systems.tiers-section][populate][tiers][populate][image]=true" +
  "&populate[sections][on][commercial-systems.tiers-section][populate][tiers][populate][details]=true" +
  "&populate[sections][on][commercial-systems.components-section][populate][backgroundImage]=true" +
  "&populate[sections][on][commercial-systems.components-section][populate][items]=true" +
  "&populate[sections][on][commercial-systems.industries-section][populate][industries][populate]=icon" +
  "&populate[sections][on][commercial-systems.feature-card-grid][populate][cards][populate]=image" +
  "&populate[sections][on][commercial-systems.watch-system-section][populate][image]=true" +
  "&populate[sections][on][commercial-systems.watch-system-section][populate][paragraphs]=true" +
  "&populate[sections][on][commercial-systems.packages-grid][populate][packages][populate][items]=true" +
  "&populate[sections][on][commercial-systems.process-flow][populate][steps][populate]=image" +
  "&populate[sections][on][commercial-systems.five-things-section][populate][items]=true" +
  "&populate[sections][on][commercial-systems.commercial-form][populate]=image" +
  "&populate[sections][on][commercial-off-grid.hero][populate]=backgroundImage" +
  "&populate[sections][on][commercial-off-grid.solutions-portfolio][populate][cards][populate]=image" +
  "&populate[sections][on][shared.editorial-section][populate][paragraphs]=true" +
  "&populate[sections][on][research-and-development.hero][populate]=backgroundImage" +
  "&populate[sections][on][research-and-development.energy-solutions-section][populate][items][populate]=image" +
  "&populate[sections][on][research-and-development.core-achievements-section][populate][items][populate]=image" +
  "&populate[sections][on][reviews.hero][populate]=backgroundImage" +
  "&populate[sections][on][reviews.intro-section]=true" +
  "&populate[sections][on][reviews.testimonials-section][populate][cards][populate]=image" ;


export const getSolarPage = () => getSingleType("solar-page", SECTIONS_POPULATE);
export const getOffGridSolutionsPage = () =>
  getSingleType("off-grid-solutions-page", SECTIONS_POPULATE);
export const getCommercialSystemsPage = () =>
  getSingleType("commercial-systems-page", SECTIONS_POPULATE);
export const getCommercialOffGridPage = () =>
  getSingleType("commercial-off-grid-page", SECTIONS_POPULATE);
export const getBrandsPage = () => getSingleType("brands-page", SECTIONS_POPULATE);
export const getDealsPage = () => getSingleType("deals-page", SECTIONS_POPULATE);
export const getRebatesPage = () => getSingleType("rebates-page", SECTIONS_POPULATE);
export const getBlogPage = () => getSingleType("blog-page", SECTIONS_POPULATE);
export const getPressMediaPage = () =>
  getSingleType("press-media-page", SECTIONS_POPULATE);
export const getResearchDevelopmentPage = () =>
  getSingleType("research-development-page", SECTIONS_POPULATE);
export const getPortfolioPage = () =>
  getSingleType("portfolio-page", SECTIONS_POPULATE);
export const getReviewsPage = () => getSingleType("reviews-page", SECTIONS_POPULATE);
export const getContactPage = () => getSingleType("contact-page", SECTIONS_POPULATE);
export const getFaqPage = () => getSingleType("faq-page", SECTIONS_POPULATE);

export type {
  StrapiResponse as StrapiResponseType,
  StrapiSingleTypePage as StrapiSingleTypePageType,
  StrapiSection as StrapiSectionType,
  StrapiMedia as StrapiMediaType,
};
