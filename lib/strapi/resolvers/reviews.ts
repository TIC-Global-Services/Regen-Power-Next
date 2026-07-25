import { strapiImageData } from "../media";
import type { StrapiImageData } from "../media";
import type {
  ReviewsHeroData,
  ReviewsIntroSectionData,
  ReviewsTestimonialsSectionData,
  ReviewsCtaBannerData,
} from "../schemas/reviews";

export interface ResolvedReviewsHero {
  subtitle: string;
  mainTitle: string;
  description: string;
  ctaText: string;
  ctaLink: string;
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
    ctaLink: data.ctaLink ?? "#quote-form",
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
  data: { location: string; name: string; quote: string };
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
  items: ResolvedGridItem[];
}
export function resolveReviewsTestimonialsSection(
  data: ReviewsTestimonialsSectionData | undefined
): ResolvedReviewsTestimonialsSection | null {
  if (!data) return null;
  const items = (data.cards ?? []).reduce<ResolvedGridItem[]>(
    (items, card) => {
      if (card.type === "image") {
        const image = card.image ? strapiImageData(card.image) : null;
        if (image?.src) {
          items.push({
            type: "image",
            image: image.src,
            alt: card.imageAlt || image.alt || "Regen Power installation",
          });
        }
        return items;
      }

      if (!card.location || !card.name || !card.quote) return items;
      items.push({
        type: "testimonial",
        data: {
          location: card.location,
          name: card.name,
          quote: card.quote,
        },
      });
      return items;
    },
    []
  );
  return {
    subtitle: data.subtitle ?? undefined,
    title: data.title ?? undefined,
    items,
  };
}

export interface ResolvedReviewsCtaBanner {
  subtitle: string;
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
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
    buttonHref: data.buttonHref ?? "#quote-form",
    bgImage: img?.src,
  };
}
