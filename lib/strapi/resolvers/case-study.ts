import { strapiImage } from "../media";
import type { CaseStudyData } from "../schemas/case-study";
import {
  normalizeCaseStudy,
  type CaseStudyItem,
  type RawCaseStudyItem,
} from "@/utils/case-studies-data";
import type { FeatureCardItem } from "@/reuseables/FeatureCardGrid";

/**
 * Resolve a single CaseStudyData item from Strapi into a normalized CaseStudyItem.
 * Robustly maps both camelCase and snake_case properties, media objects, and relations.
 */
export function resolveCaseStudyDetail(
  data: CaseStudyData | null | undefined
): CaseStudyItem | null {
  if (!data || !data.slug) return null;

  // Extract images array, handling Strapi media objects or string URLs
  const rawImages: string[] = [];
  if (Array.isArray(data.images)) {
    data.images.forEach((img) => {
      if (typeof img === "string") {
        if (img) rawImages.push(img);
      } else if (img && typeof img === "object") {
        const url = strapiImage(img as any);
        if (url) rawImages.push(url);
      }
    });
  } else if (data.images && typeof data.images === "object") {
    const url = strapiImage(data.images as any);
    if (url) rawImages.push(url);
  }

  // Also include single image field if present
  if (data.image) {
    const singleUrl = strapiImage(data.image as any);
    if (singleUrl && !rawImages.includes(singleUrl)) {
      rawImages.unshift(singleUrl);
    }
  }

  // Extract PDF URL
  let pdfUrl: string | null = null;
  const rawPdf = data.pdf || data.pdfUrl || data.pdf_url;
  if (typeof rawPdf === "string") {
    pdfUrl = rawPdf;
  } else if (rawPdf && typeof rawPdf === "object") {
    pdfUrl = strapiImage(rawPdf as any) || null;
  }

  // Extract card title and card subtitle
  const rawTitle =
    data.cardTitle ||
    data.card_title ||
    data.title ||
    "Commercial Solar Project";
  const cardTitle = typeof rawTitle === "string" ? rawTitle : "Commercial Solar Project";

  const rawSubtitle =
    data.cardSubTitle ||
    data.cardSubtitle ||
    data.card_subtitle ||
    data.subtitle ||
    "";
  const cardSubtitle = typeof rawSubtitle === "string" ? rawSubtitle : "";

  const rawLocation = data.location;
  const location = typeof rawLocation === "string" ? rawLocation : undefined;

  const rawLocationDetails = data.locationDetails || data.location_details;
  const locationDetails =
    typeof rawLocationDetails === "string" ? rawLocationDetails : undefined;

  const rawReveal = data.revealText || data.reveal_text;
  const revealText = typeof rawReveal === "string" ? rawReveal : undefined;

  const rawDetails = data.caseStudyDetails || data.casestudydetails || [];

  const rawItem: Partial<RawCaseStudyItem> & { slug: string } = {
    slug: data.slug,
    url: typeof data.url === "string" ? data.url : undefined,
    card_title: cardTitle,
    card_subtitle: cardSubtitle,
    location,
    location_details: locationDetails,
    reveal_text: revealText,
    pdf_url: pdfUrl,
    casestudydetails: rawDetails.map((d) => ({
      title: typeof d.title === "string" ? d.title : "",
      details: typeof d.details === "string" ? d.details : "",
    })),
    tables: (data.tables ?? []).map((t) => ({
      id: typeof t.id === "string" ? t.id : (t.tableId || (t.id != null ? String(t.id) : undefined)),
      title: t.title,
      headers: t.headers,
      rows: t.rows ?? [],
    })),
    images: rawImages,
  };

  return normalizeCaseStudy(rawItem);
}

/**
 * Resolve an array of CaseStudyData from Strapi into CaseStudyItem[].
 */
export function resolveCaseStudies(
  data: CaseStudyData[] | null | undefined
): CaseStudyItem[] {
  if (!Array.isArray(data) || data.length === 0) return [];
  return data
    .map(resolveCaseStudyDetail)
    .filter((item): item is CaseStudyItem => item !== null);
}

/**
 * Convert CaseStudyItem[] into FeatureCardItem[] for FeatureCardGridSection.
 * Prioritizes card_title / card_subtitle and routes to /commercial/case-studies/${slug}.
 */
export function caseStudiesToFeatureCards(
  items: CaseStudyItem[]
): FeatureCardItem[] {
  return items.map((cs) => ({
    title: cs.card_title || cs.title,
    subtitle: cs.card_subtitle || cs.subtitle || undefined,
    description: cs.location_details || cs.location || cs.reveal_text || "",
    image: cs.showcaseImage || cs.images?.[0] || "/portfolio_hero.png",
    textPosition: "top" as const,
    footerTitle: "Read More",
    footerDescription: cs.card_subtitle || undefined,
    href: `/commercial/case-studies/${cs.slug}`,
  }));
}
