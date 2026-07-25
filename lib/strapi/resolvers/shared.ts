import { strapiImageData } from "../media";
import type { StrapiImageData } from "../media";
import type {
  SharedCtaBannerData,
  SharedFaqData,
  SharedEditorialSectionData,
  DealsSplitSectionData,
  SharedFormSectionData,
  SharedCategorySectionData,
} from "../schemas";

export interface ResolvedSharedCtaBanner {
  subtitle: string;
  mainTitle: string;
  description: string;
  buttonText: string;
  buttonHref: string;
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
    buttonText: data.buttonText ?? "Get Started",
    buttonHref: data.buttonHref ?? "#quote-form",
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
  image: string | undefined;
}
export function resolveSharedFormSection(
  data: SharedFormSectionData | undefined | null
): ResolvedSharedFormSection | null {
  if (!data) return null;
  const img = data.image ? strapiImageData(data.image) : null;
  return {
    subtitle: data.subtitle ?? "",
    title: data.title ?? "",
    description: data.description ?? "",
    image: img?.src,
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
