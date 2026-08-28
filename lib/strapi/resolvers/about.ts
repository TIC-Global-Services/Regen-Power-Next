import { strapiImageData } from "../media";
import type { AboutHeroData, AboutAwardsData } from "../schemas/about";

const src = (media: { url?: string } | null | undefined): string =>
  media ? strapiImageData(media as never)?.src ?? "" : "";

export interface ResolvedAboutHero {
  eyebrow: string;
  title: string;
  videoSrc: string;
}
export function resolveAboutHero(data: AboutHeroData | undefined | null): ResolvedAboutHero | null {
  if (!data) return null;
  return {
    eyebrow: data.eyebrow ?? "",
    title: data.title ?? "",
    videoSrc: src(data.video),
  };
}

export interface ResolvedAboutAwardCard {
  id: string;
  title: string;
  description: string;
  badgeSrc: string | null;
  badgeSizeClass?: string;
}
export interface ResolvedAboutAwards {
  cards: ResolvedAboutAwardCard[];
}
export function resolveAboutAwards(data: AboutAwardsData | undefined | null): ResolvedAboutAwards | null {
  if (!data) return null;
  return {
    cards: (data.cards ?? []).map((c) => ({
      id: String(c.id),
      title: c.title ?? "",
      description: c.description ?? "",
      badgeSrc: c.badge ? src(c.badge) : null,
      ...(c.badgeSizeClass ? { badgeSizeClass: c.badgeSizeClass } : {}),
    })),
  };
}
