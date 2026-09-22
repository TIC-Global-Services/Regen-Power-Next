import { strapiImageData } from "../media";
import type { StrapiImageData } from "../media";
import type {
  SharedCtaBannerData,
  SharedFaqData,
  SharedEditorialSectionData,
  DealsSplitSectionData,
  SharedFormSectionData,
  SharedCategorySectionData,
  SeoData,
} from "../schemas";

export interface ResolvedSharedCtaBanner {
  subtitle: string;
  mainTitle: string;
  description: string;
  buttonText: string;
  buttonHref?: string;
  bgImage: string | undefined;
}
export function resolveSharedCtaBanner(
  data: SharedCtaBannerData | undefined | null
): ResolvedSharedCtaBanner | null {
  if (!data) return null;
  const img = data.backgroundImage ? strapiImageData(data.backgroundImage) : null;
  return {
    subtitle: data.subtitle ?? "",
    mainTitle: data.mainTitle ?? "",
    description: data.description ?? "",
    buttonText: data.buttonText ?? "",
    ...(data.buttonHref ? { buttonHref: data.buttonHref } : {}),
    bgImage: img?.src,
  };
}

export interface ResolvedSharedFaqItem {
  question: string;
  answer: string;
}
export interface ResolvedSharedFaq {
  title: string;
  sectionTitle: string;
  listTitle: string;
  image: StrapiImageData | null;
  items: ResolvedSharedFaqItem[];
}
export function resolveSharedFaq(
  data: SharedFaqData | undefined | null
): ResolvedSharedFaq | null {
  if (!data) return null;
  return {
    title: data.title ?? "",
    sectionTitle: data.sectionTitle ?? "",
    listTitle: data.listTitle ?? "",
    image: data.image ? strapiImageData(data.image) : null,
    items: (data.items ?? []).map((item) => ({
      question: item.question,
      answer: item.answer,
    })),
  };
}

export interface ResolvedSharedEditorialSection {
  subtitle: string;
  title: string;
  align: "left" | "center" | "right";
  paragraphs: { text: string; isSecondary: boolean }[];
}
export function resolveSharedEditorialSection(
  data: SharedEditorialSectionData | undefined | null
): ResolvedSharedEditorialSection | null {
  if (!data) return null;
  return {
    subtitle: data.subtitle ?? "",
    title: data.title ?? "",
    align: data.align ?? "left",
    paragraphs: (data.paragraphs ?? []).map((p) => ({
      text: p.text,
      isSecondary: p.isSecondary,
    })),
  };
}

export interface ResolvedSharedSplitSection {
  subtitle: string;
  title: string;
  description: string;
  image: StrapiImageData | null;
  imagePosition: "left" | "right";
  badge: string;
}
export function resolveSharedSplitSection(
  data: DealsSplitSectionData | undefined | null
): ResolvedSharedSplitSection | null {
  if (!data) return null;
  return {
    subtitle: data.subtitle ?? "",
    title: data.title ?? "",
    description: data.description ?? "",
    image: data.image ? strapiImageData(data.image) : null,
    imagePosition: data.imagePosition ?? "left",
    badge: data.badge ?? "",
  };
}

export interface ResolvedSharedFormSection {
  subtitle: string;
  title: string;
  description: string;
  image: StrapiImageData | null;
  imageSrc: string | undefined;
  video: StrapiImageData | null;
  videoSrc: string | null;
}
export function resolveSharedFormSection(
  data: SharedFormSectionData | undefined | null
): ResolvedSharedFormSection | null {
  if (!data) return null;
  const imageData = data.image ? strapiImageData(data.image) : null;
  const videoData = data.video ? strapiImageData(data.video) : null;
  return {
    subtitle: data.subtitle ?? "",
    title: data.title ?? "",
    description: data.description ?? "",
    image: imageData,
    imageSrc: imageData?.src,
    video: videoData,
    videoSrc: videoData?.src ?? null,
  };
}

export interface ResolvedSharedCategoryItem {
  title: string;
  description: string;
  image: string | undefined;
}
export interface ResolvedSharedCategory {
  label: string;
  items: ResolvedSharedCategoryItem[];
}
export interface ResolvedSharedCategorySection {
  subtitle: string;
  title: string;
  categories: ResolvedSharedCategory[];
}
export function resolveSharedCategorySection(
  data: SharedCategorySectionData | undefined | null
): ResolvedSharedCategorySection | null {
  if (!data) return null;
  return {
    subtitle: data.subtitle ?? "",
    title: data.title ?? "",
    categories: (data.categories ?? []).map((cat) => ({
      label: cat.label,
      items: (cat.items ?? []).map((item) => ({
        title: item.title ?? "",
        description: item.description ?? "",
        image: item.image ? strapiImageData(item.image)?.src : undefined,
      })),
    })),
  };
}

/* ─── shared.seo (blog-article / press-article) ─── */

export interface ResolvedSeo {
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string;
  canonicalURL?: string;
  metaRobots?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogType?: string;
  ogUrl?: string;
  ogImage?: string;
  twitterCard?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterSite?: string;
  twitterCreator?: string;
  twitterImage?: string;
  structuredData?: Record<string, unknown>;
}

export function resolveSeo(
  data: SeoData | undefined | null
): ResolvedSeo | null {
  if (!data) return null;
  const ogImage = data.ogImage ? strapiImageData(data.ogImage)?.src : undefined;
  const twitterImage = data.twitterImage
    ? strapiImageData(data.twitterImage)?.src
    : undefined;
  const metaImage = data.metaImage ? strapiImageData(data.metaImage)?.src : undefined;
  return {
    ...(data.metaTitle ? { metaTitle: data.metaTitle } : {}),
    ...(data.metaDescription ? { metaDescription: data.metaDescription } : {}),
    ...(data.keywords ? { keywords: data.keywords } : {}),
    ...(data.canonicalURL ? { canonicalURL: data.canonicalURL } : {}),
    ...(data.metaRobots ? { metaRobots: data.metaRobots } : {}),
    ...(data.ogTitle ? { ogTitle: data.ogTitle } : {}),
    ...(data.ogDescription ? { ogDescription: data.ogDescription } : {}),
    ...(data.ogType ? { ogType: data.ogType } : {}),
    ...(data.ogUrl ? { ogUrl: data.ogUrl } : {}),
    ...(ogImage || metaImage ? { ogImage: ogImage ?? metaImage } : {}),
    ...(data.twitterCard ? { twitterCard: data.twitterCard } : {}),
    ...(data.twitterTitle ? { twitterTitle: data.twitterTitle } : {}),
    ...(data.twitterDescription
      ? { twitterDescription: data.twitterDescription }
      : {}),
    ...(data.twitterSite ? { twitterSite: data.twitterSite } : {}),
    ...(data.twitterCreator ? { twitterCreator: data.twitterCreator } : {}),
    ...(twitterImage || metaImage ? { twitterImage: twitterImage ?? metaImage } : {}),
    ...(data.structuredData ? { structuredData: data.structuredData } : {}),
  };
}
