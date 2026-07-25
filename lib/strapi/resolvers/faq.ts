import { strapiImageData } from "../media";
import type { FaqHeroData, FaqCategorizedFaqData } from "../schemas/faq";

export interface ResolvedFaqHero {
  mediaSrc: string;
  subtitle: string;
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
}
export function resolveFaqHero(
  data: FaqHeroData | undefined
): ResolvedFaqHero | null {
  if (!data) return null;
  const img = data.backgroundImage ? strapiImageData(data.backgroundImage) : null;
  if (!img) return null;
  return {
    mediaSrc: img.src,
    subtitle: data.subtitle ?? "",
    title: data.title ?? "",
    description: data.description ?? "",
    ctaText: data.ctaText ?? "Get Your Free Quote",
    ctaLink: data.ctaLink ?? "#quote-form",
  };
}

export interface ResolvedFaqCategoryItem {
  question: string;
  answer: string;
}
export interface ResolvedFaqCategory {
  categoryId: string;
  label: string;
  items: ResolvedFaqCategoryItem[];
}
export interface ResolvedFaqCategorizedFaq {
  categories: ResolvedFaqCategory[];
}
export function resolveFaqCategorizedFaq(
  data: FaqCategorizedFaqData | undefined
): ResolvedFaqCategorizedFaq | null {
  if (!data) return null;
  return {
    categories: (data.categories ?? []).map((cat) => ({
      categoryId: cat.categoryId,
      label: cat.label,
      items: (cat.items ?? []).map((item) => ({
        question: item.question,
        answer: item.answer,
      })),
    })),
  };
}
