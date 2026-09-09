import rawCaseStudiesData from "@/case_studies.json";

export interface CaseStudyDetail {
  title: string;
  details: string;
}

export interface CaseStudyTable {
  id?: string;
  title?: string;
  headers?: string[];
  rows: (string | number)[][];
}

export interface CaseStudyNarrativeSection {
  title: string;
  paragraphs: string[];
}

export interface CaseStudyItem {
  id: string;
  slug: string;
  aliases: string[];
  url: string;
  card_title: string;
  card_subtitle: string;
  location: string;
  location_details: string;
  reveal_text: string;
  pdf_url?: string | null;
  casestudydetails: CaseStudyDetail[];
  tables: CaseStudyTable[];
  images: string[];

  // Compatibility & Helper fields
  title: string;
  subtitle?: string | null;
  kicker: string;
  metaDescription: string;
  heroDescription: string;
  pdfUrl?: string | null;
  highlightQuote: {
    lead: string;
    trail: string;
  };
  narratives: {
    findYourWay: CaseStudyNarrativeSection;
    systemArchitecture: CaseStudyNarrativeSection;
  };
  showcaseTitle: string;
  showcaseImage: string;
}

export interface RawCaseStudyItem {
  slug: string;
  url?: string;
  card_title?: string;
  card_subtitle?: string;
  location?: string;
  location_details?: string;
  reveal_text?: string;
  pdf_url?: string | null;
  casestudydetails?: { title: string; details: string }[];
  tables?: { id?: string; title?: string; headers?: string[]; rows: (string | number)[][] }[];
  images?: string[];
}

function splitQuote(quote: string): { lead: string; trail: string } {
  if (!quote) return { lead: "", trail: "" };
  const sentences = quote.match(/[^.!?]+[.!?]+/g) || [quote];
  if (sentences.length > 1) {
    const half = Math.ceil(sentences.length / 2);
    return {
      lead: sentences.slice(0, half).join(" ").trim(),
      trail: sentences.slice(half).join(" ").trim(),
    };
  }
  const words = quote.split(" ");
  const halfWords = Math.ceil(words.length / 2);
  return {
    lead: words.slice(0, halfWords).join(" ").trim(),
    trail: words.slice(halfWords).join(" ").trim(),
  };
}

export function normalizeCaseStudy(
  item: Partial<RawCaseStudyItem> & { slug?: string }
): CaseStudyItem {
  const quoteParts = splitQuote(item.reveal_text || "");
  const detailsList = item.casestudydetails || [];
  const detail0 = detailsList[0];
  const detail1 = detailsList[1];

  const findYourWayParas = detail0?.details
    ? detail0.details.split(/\n\n+/).map((p) => p.trim()).filter(Boolean)
    : [];
  const systemArchParas = detail1?.details
    ? detail1.details.split(/\n\n+/).map((p) => p.trim()).filter(Boolean)
    : [];

  const rawImages = (item.images || []).map((img) =>
    typeof img === "string" ? img : ((img as any)?.url || "")
  ).filter(Boolean);
  const firstImage = rawImages.length > 0 ? rawImages[0] : "/portfolio_hero.png";
  const slug = item.slug || "";
  const cardTitle = item.card_title || item.card_subtitle || "Commercial Solar Project";
  const cardSubtitle = item.card_subtitle || "";
  const location = item.location || "";
  const locationDetails = item.location_details || "";

  return {
    id: slug,
    slug: slug,
    aliases: slug ? [slug.replace("case-study-", "").replace("solar-case-study-", "")] : [],
    url: item.url || "",
    card_title: cardTitle,
    card_subtitle: cardSubtitle,
    location: location,
    location_details: locationDetails,
    reveal_text: item.reveal_text || "",
    pdf_url: item.pdf_url ?? null,
    casestudydetails: detailsList,
    tables: (item.tables || []).map((t, idx) => ({
      id: t.id || `table-${idx}`,
      title: t.title,
      headers: t.headers,
      rows: t.rows || [],
    })),
    images: rawImages,

    // Backward-compatible properties
    title: cardTitle,
    subtitle: cardSubtitle || null,
    kicker: cardSubtitle || location || "Commercial Case Study",
    metaDescription: locationDetails || item.reveal_text || "",
    heroDescription: detail0?.details?.split(/\n/)[0] || locationDetails,
    pdfUrl: item.pdf_url ?? null,
    highlightQuote: quoteParts,
    narratives: {
      findYourWay: {
        title: detail0?.title || "Project Background",
        paragraphs: findYourWayParas,
      },
      systemArchitecture: {
        title: detail1?.title || "System Details",
        paragraphs: systemArchParas,
      },
    },
    showcaseTitle: "Project Showcase",
    showcaseImage: firstImage,
  };
}

export const CASE_STUDIES_DATA: CaseStudyItem[] = (
  rawCaseStudiesData as RawCaseStudyItem[]
).map(normalizeCaseStudy);

export function getCaseStudyBySlug(
  slug: string,
  extraItems?: CaseStudyItem[]
): CaseStudyItem | undefined {
  const clean = slug.toLowerCase().trim();
  const all = extraItems && extraItems.length > 0
    ? [...extraItems, ...CASE_STUDIES_DATA]
    : CASE_STUDIES_DATA;

  return all.find(
    (c) => c.slug.toLowerCase() === clean || c.aliases.some((a) => a.toLowerCase() === clean)
  );
}

export function getCaseStudyFeatureCards() {
  return CASE_STUDIES_DATA.map((cs) => ({
    title: cs.card_title,
    subtitle: cs.card_subtitle,
    description: cs.location_details,
    image: cs.showcaseImage || cs.images[0] || "/portfolio_hero.png",
    textPosition: "top" as const,
    footerTitle: cs.location,
    footerDescription: cs.card_subtitle || undefined,
    href: `/commercial/case-studies/${cs.slug}`,
  }));
}
