import { strapiImageData } from "../media";
import type { StrapiImageData } from "../media";
import type {
  ResearchDevelopmentHeroData,
  EnergySolutionsSectionData,
  CoreAchievementsSectionData,
} from "../schemas/research";

export interface ResolvedResearchDevelopmentHero {
  mediaSrc: string;
  subtitle: string;
  mainTitle: string;
  description: string;
  ctaText: string;
  ctaLink?: string;
}
export function resolveResearchDevelopmentHero(
  data: ResearchDevelopmentHeroData | undefined
): ResolvedResearchDevelopmentHero | null {
  if (!data) return null;
  const img = data.backgroundImage ? strapiImageData(data.backgroundImage) : null;
  return {
    mediaSrc: img?.src ?? "",
    subtitle: data.subtitle ?? "",
    mainTitle: data.mainTitle ?? "",
    description: data.description ?? "",
    ctaText: data.ctaText ?? "Get Your Free Quote",
    ...(data.ctaLink ? { ctaLink: data.ctaLink } : {}),
  };
}

export interface ResolvedEnergySolutionItem {
  title: string;
  description: string;
  image: StrapiImageData | null;
  href: string;
}
export interface ResolvedEnergySolutionsSection {
  subtitle: string | null;
  title: string | null;
  items: ResolvedEnergySolutionItem[];
}
export function resolveEnergySolutionsSection(
  data: EnergySolutionsSectionData | undefined
): ResolvedEnergySolutionsSection | null {
  if (!data) return null;
  return {
    subtitle: data.subtitle,
    title: data.title,
    items: (data.items ?? []).map((item) => ({
      title: item.title,
      description: item.description,
      image: item.image ? strapiImageData(item.image) : null,
      href: item.href,
    })),
  };
}

export interface ResolvedAchievementItem {
  title: string;
  description: string;
  image: StrapiImageData | null;
  href: string;
}
export interface ResolvedCoreAchievementsSection {
  subtitle: string | null;
  title: string | null;
  items: ResolvedAchievementItem[];
}
export function resolveCoreAchievementsSection(
  data: CoreAchievementsSectionData | undefined
): ResolvedCoreAchievementsSection | null {
  if (!data) return null;
  return {
    subtitle: data.subtitle,
    title: data.title,
    items: (data.items ?? []).map((item) => ({
      title: item.title,
      description: item.description,
      image: item.image ? strapiImageData(item.image) : null,
      href: item.href,
    })),
  };
}
