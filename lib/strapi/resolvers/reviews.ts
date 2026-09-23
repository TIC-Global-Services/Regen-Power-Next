import { strapiImageData } from "../media";
import type { StrapiImageData } from "../media";
import type {
  ReviewsHeroData,
  ReviewsIntroSectionData,
  ReviewsTestimonialsSectionData,
  ReviewsAwardsSectionData,
  ReviewsCtaBannerData,
  TestimonialEntryData,
} from "../schemas/reviews";

export interface ResolvedReviewsHero {
  subtitle: string;
  mainTitle: string;
  description: string;
  ctaText: string;
  ctaLink?: string;
  backgroundImage: string;
}
export function resolveReviewsHero(
  data: ReviewsHeroData | undefined
): ResolvedReviewsHero | null {
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

export interface ResolvedReviewsIntroSection {
  subtitle: string | undefined;
  title: string | undefined;
  description: string | undefined;
}
export function resolveReviewsIntroSection(
  data: ReviewsIntroSectionData | undefined
): ResolvedReviewsIntroSection | null {
  if (!data) return null;
  return {
    subtitle: data.subtitle ?? undefined,
    title: data.title ?? undefined,
    description: data.description ?? undefined,
  };
}

export type ResolvedTestimonialRow = {
  type: "testimonial";
  data: {
    location: string;
    name: string;
    quote: string;
    /** Raw source slug ("google" | "productreview") for logo attribution — null for first-party (website) */
    source: "google" | "productreview" | null;
    rating: number | null;
  };
};
export type ResolvedImageRow = {
  type: "image";
  image: string;
  alt: string;
};
export type ResolvedGridItem = ResolvedTestimonialRow | ResolvedImageRow;

export interface ResolvedReviewsTestimonialsSection {
  subtitle: string | undefined;
  title: string | undefined;
  /** Decorative image tiles — placed into even grid rows (2-col span) by the UI */
  imageCards: ResolvedImageRow[];
}
export function resolveReviewsTestimonialsSection(
  data: ReviewsTestimonialsSectionData | undefined
): ResolvedReviewsTestimonialsSection | null {
  if (!data) return null;
  const imageCards = (data.cards ?? []).reduce<ResolvedImageRow[]>(
    (cards, card) => {
      const image = card.image ? strapiImageData(card.image) : null;
      cards.push({
        type: "image",
        image: image?.src || "/fallback.png",
        alt: card.imageAlt || image?.alt || "Regen Power installation",
      });
      return cards;
    },
    []
  );
  return {
    subtitle: data.subtitle ?? undefined,
    title: data.title ?? undefined,
    imageCards,
  };
}

export interface ResolvedReviewsAward {
  image: string;
  description: string;
}
export interface ResolvedReviewsAwardsSection {
  awards: ResolvedReviewsAward[];
}
export function resolveReviewsAwardsSection(
  data: ReviewsAwardsSectionData | undefined
): ResolvedReviewsAwardsSection | null {
  if (!data) return null;
  return {
    awards: (data.awards ?? []).map((a) => ({
      image: a.image ? strapiImageData(a.image)?.src ?? "" : "",
      description: a.description ?? "",
    })),
  };
}

/* ─── testimonial collection → grid items ─── */

/**
 * Map published testimonial collection entries onto grid items.
 * Entries missing a name or quote are skipped.
 */
export function resolveTestimonials(
  entries: TestimonialEntryData[] | undefined | null
): ResolvedGridItem[] {
  if (!Array.isArray(entries)) return [];
  return entries.reduce<ResolvedGridItem[]>((items, entry) => {
    if (!entry.name || !entry.quote) return items;
    items.push({
      type: "testimonial",
      data: {
        location: entry.location ?? "",
        name: entry.name,
        quote: entry.quote,
        source:
          entry.source === "google" || entry.source === "productreview"
            ? entry.source
            : null,
        rating: entry.rating ?? null,
      },
    });
    return items;
  }, []);
}

export interface ResolvedReviewsCtaBanner {
  subtitle: string;
  title: string;
  description: string;
  buttonText: string;
  buttonHref?: string;
  bgImage: string | undefined;
}
export function resolveReviewsCtaBanner(
  data: ReviewsCtaBannerData | undefined | null
): ResolvedReviewsCtaBanner | null {
  if (!data) return null;
  const img = data.backgroundImage ? strapiImageData(data.backgroundImage) : null;
  return {
    subtitle: data.subtitle ?? "",
    title: data.mainTitle ?? "",
    description: data.description ?? "",
    buttonText: data.buttonText ?? "Get My Free Quote",
    ...(data.buttonHref ? { buttonHref: data.buttonHref } : {}),
    bgImage: img?.src,
  };
}
