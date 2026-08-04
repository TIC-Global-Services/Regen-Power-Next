import { strapiImageData } from "../media";
import type { StrapiImageData } from "../media";
import type {
  RebatesHeroData,
  RebatesRebateProgramsData,
  RebatesStcExplainerData,
  RebatesUtilityCardsData,
  RebatesLoanBenefitsData,
  RebatesEligibilityCheckerData,
} from "../schemas/rebates";

export interface ResolvedRebatesHero {
  mediaSrc: string;
  subtitle: string;
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
}
export function resolveRebatesHero(
  data: RebatesHeroData | undefined
): ResolvedRebatesHero | null {
  if (!data) return null;
  const img = data.backgroundImage ? strapiImageData(data.backgroundImage) : null;
  return {
    mediaSrc: img?.src ?? "",
    subtitle: data.subtitle ?? "",
    title: data.title ?? "",
    description: data.description ?? "",
    ctaText: data.ctaText ?? "Get Your Free Quote",
    ctaLink: data.ctaLink ?? "#quote-form",
  };
}

export interface ResolvedRebatesProgram {
  label: string;
  title: string;
  summary: string;
  badge: string | undefined;
  image: StrapiImageData | null;
}
export interface ResolvedRebatesRebatePrograms {
  subtitle: string;
  title: string;
  description: string;
  programs: ResolvedRebatesProgram[];
}
export function resolveRebatesRebatePrograms(
  data: RebatesRebateProgramsData | undefined
): ResolvedRebatesRebatePrograms | null {
  if (!data) return null;
  return {
    subtitle: data.subtitle ?? "",
    title: data.title ?? "",
    description: data.description ?? "",
    programs: (data.programs ?? []).map((p) => ({
      label: p.label,
      title: p.title,
      summary: p.summary,
      badge: p.badge ?? undefined,
      image: p.image ? strapiImageData(p.image) : null,
    })),
  };
}

export interface ResolvedRebatesStcExplainer {
  subtitle: string;
  title: string;
  paragraphs: { text: string; isSecondary: boolean }[];
}
export function resolveRebatesStcExplainer(
  data: RebatesStcExplainerData | undefined
): ResolvedRebatesStcExplainer | null {
  if (!data) return null;
  return {
    subtitle: data.subtitle ?? "",
    title: data.title ?? "",
    paragraphs: (data.paragraphs ?? []).map((p) => ({
      text: p.text,
      isSecondary: p.isSecondary,
    })),
  };
}

export interface ResolvedRebatesUtilityCard {
  name: string;
  logo: StrapiImageData | null;
  perKwh: string;
  cap: string;
  maximumRebate: string;
}
export interface ResolvedRebatesUtilityCards {
  badge: string;
  subtitle: string;
  title: string;
  description: string;
  cards: ResolvedRebatesUtilityCard[];
}
export function resolveRebatesUtilityCards(
  data: RebatesUtilityCardsData | undefined
): ResolvedRebatesUtilityCards | null {
  if (!data) return null;
  return {
    badge: data.badge ?? "",
    subtitle: data.subtitle ?? "",
    title: data.title ?? "",
    description: data.description ?? "",
    cards: (data.cards ?? []).map((card) => ({
      name: card.name,
      logo: card.logo ? strapiImageData(card.logo) : null,
      perKwh: card.perKwh ?? "",
      cap: card.cap ?? "",
      maximumRebate: card.maximumRebate ?? "",
    })),
  };
}

export interface ResolvedRebatesLoanBenefit {
  title: string;
  description: string;
}
export interface ResolvedRebatesLoanBenefits {
  badge: string | undefined;
  subtitle: string | null;
  title: string | null;
  description: string | null;
  bgImage: StrapiImageData | null;
  benefits: ResolvedRebatesLoanBenefit[];
}
export function resolveRebatesLoanBenefits(
  data: RebatesLoanBenefitsData | undefined
): ResolvedRebatesLoanBenefits | null {
  if (!data) return null;
  return {
    badge: data.badge ?? undefined,
    subtitle: data.subtitle,
    title: data.title,
    description: data.description,
    bgImage: data.backgroundImage ? strapiImageData(data.backgroundImage) : null,
    benefits: (data.benefits ?? []).map((b) => ({
      title: b.title,
      description: b.description,
    })),
  };
}

export interface ResolvedRebatesEligibilityQuestion {
  id: number;
  question: string;
  helperText: string;
  loanOnly: boolean;
}
export interface ResolvedRebatesEligibilityResult {
  key: "eligible-stack" | "eligible-rebates-only" | "not-eligible";
  title: string;
  description: string;
}
export interface ResolvedRebatesEligibilityChecker {
  badge: string;
  title: string;
  description: string;
  questions: ResolvedRebatesEligibilityQuestion[];
  results: ResolvedRebatesEligibilityResult[];
}
export function resolveRebatesEligibilityChecker(
  data: RebatesEligibilityCheckerData | undefined
): ResolvedRebatesEligibilityChecker | null {
  if (!data) return null;
  return {
    badge: data.badge ?? "",
    title: data.title ?? "",
    description: data.description ?? "",
    questions: (data.questions ?? []).map((q) => ({
      id: q.id,
      question: q.question,
      helperText: q.helperText,
      loanOnly: q.loanOnly,
    })),
    results: (data.results ?? []).map((r) => ({
      key: r.key,
      title: r.title,
      description: r.description,
    })),
  };
}
