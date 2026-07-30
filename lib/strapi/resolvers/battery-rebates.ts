import { strapiImageData } from "../media";
import type { HeroProps } from "@/reuseables/Hero";
import type {
  BatteryRebatesHeroData,
  BatteryRebatesRebatesStackGridData,
  BatteryRebatesResidentialBatteryData,
  BatteryRebatesFederalRebateData,
  BatteryRebatesFinanceOptionData,
  BatteryRebatesWhatChangesData,
  BatteryRebatesAreYouEligibleData,
  BatteryRebatesWhatSigningUpData,
  BatteryRebatesRebateDetailSplitData,
} from "../schemas/battery-rebates";

// ─── Hero ──────────────────────────────────────────────────────────────
export type ResolvedBatteryRebatesHero = HeroProps;
export function resolveBatteryRebatesHero(
  data: BatteryRebatesHeroData | undefined
): ResolvedBatteryRebatesHero | null {
  if (!data) return null;
  const img = data.backgroundImage ? strapiImageData(data.backgroundImage) : null;
  return {
    mediaSrc: img?.src ?? "",
    mediaType: "image",
    topSubtitle: data.subtitle ?? "",
    mainTitle: data.title ?? "",
    description: data.description ?? "",
    ctaText: data.buttonText ?? "Get Your Free Quote",
    ctaLink: data.buttonLink ?? "#quote",
    subtitleColor: "text-white",
    descriptionColor: "text-white",
    showOverlay: data.showOverlay ?? true,
  };
}

// ─── Rebates Stack Grid ───────────────────────────────────────────────
export interface ResolvedStackCard {
  title: string;
  items: string[];
}
export interface ResolvedBatteryRebatesRebatesStackGrid {
  title: string;
  subtitle: string;
  cards: ResolvedStackCard[];
}
export function resolveBatteryRebatesRebatesStackGrid(
  data: BatteryRebatesRebatesStackGridData | undefined
): ResolvedBatteryRebatesRebatesStackGrid | null {
  if (!data) return null;
  return {
    title: data.title ?? "",
    subtitle: data.subtitle ?? "",
    cards: (data.cards ?? []).map((c) => ({
      title: c.title,
      items: (c.items ?? []).map((i) => i.text),
    })),
  };
}

// ─── Residential Battery ──────────────────────────────────────────────
export interface ResolvedBatteryRebatesResidentialBattery {
  subtitle: string;
  title: string;
  description: string;
  listItems: string[];
  timingText: string;
  taxText: string;
  image: string;
}
export function resolveBatteryRebatesResidentialBattery(
  data: BatteryRebatesResidentialBatteryData | undefined
): ResolvedBatteryRebatesResidentialBattery | null {
  if (!data) return null;
  return {
    subtitle: data.subtitle ?? "",
    title: data.title ?? "",
    description: data.description ?? "",
    listItems: (data.listItems ?? []).map((i) => i.text),
    timingText: data.timingText ?? "",
    taxText: data.taxText ?? "",
    image: strapiImageData(data.image)?.src ?? "",
  };
}

// ─── Federal Rebate ────────────────────────────────────────────────────
export interface ResolvedBatteryRebatesFederalRebate {
  sectionSubtitle: string;
  sectionTitle: string;
  sectionDescription: string;
  keySpecsTitle: string;
  keySpecsBulletPoints: string[];
  firstImage: string;
  eligibleCapacityTitle: string;
  eligibleCapacityText: string;
  importantNoteTitle: string;
  importantNoteText: string;
  secondImage: string;
  combinedSchemeText: string;
  eligibilityTitle: string;
  eligibilityBulletPoints: string[];
}
export function resolveBatteryRebatesFederalRebate(
  data: BatteryRebatesFederalRebateData | undefined
): ResolvedBatteryRebatesFederalRebate | null {
  if (!data) return null;
  return {
    sectionSubtitle: data.sectionSubtitle ?? "",
    sectionTitle: data.sectionTitle ?? "",
    sectionDescription: data.sectionDescription ?? "",
    keySpecsTitle: data.keySpecsTitle ?? "",
    keySpecsBulletPoints: (data.keySpecsBulletPoints ?? []).map((i) => i.text),
    firstImage: strapiImageData(data.firstImage)?.src ?? "",
    eligibleCapacityTitle: data.eligibleCapacityTitle ?? "",
    eligibleCapacityText: data.eligibleCapacityText ?? "",
    importantNoteTitle: data.importantNoteTitle ?? "",
    importantNoteText: data.importantNoteText ?? "",
    secondImage: strapiImageData(data.secondImage)?.src ?? "",
    combinedSchemeText: data.combinedSchemeText ?? "",
    eligibilityTitle: data.eligibilityTitle ?? "",
    eligibilityBulletPoints: (data.eligibilityBulletPoints ?? []).map((i) => i.text),
  };
}

// ─── Finance Option ────────────────────────────────────────────────────
export interface ResolvedFinanceSection {
  title: string;
  listItems: string[];
  image: string;
}
export interface ResolvedBatteryRebatesFinanceOption {
  sectionTitle: string;
  sectionSubtitle: string;
  sections: ResolvedFinanceSection[];
}
export function resolveBatteryRebatesFinanceOption(
  data: BatteryRebatesFinanceOptionData | undefined
): ResolvedBatteryRebatesFinanceOption | null {
  if (!data) return null;
  return {
    sectionTitle: data.sectionTitle ?? "",
    sectionSubtitle: data.sectionSubtitle ?? "",
    sections: (data.sections ?? []).map((s) => ({
      title: s.title,
      listItems: (s.listItems ?? []).map((i) => i.text),
      image: strapiImageData(s.image)?.src ?? "",
    })),
  };
}

// ─── What Changes ──────────────────────────────────────────────────────
export interface ResolvedWhatChangesCard {
  title: string;
  description: string;
  bullets: string[];
}
export interface ResolvedBatteryRebatesWhatChanges {
  title: string;
  subtitle: string;
  card1: ResolvedWhatChangesCard;
  card2: ResolvedWhatChangesCard;
  card3: ResolvedWhatChangesCard;
  card4: ResolvedWhatChangesCard;
}
export function resolveWhatChangesCard(
  card: BatteryRebatesWhatChangesData["card1"]
): ResolvedWhatChangesCard {
  return {
    title: card?.title ?? "",
    description: card?.description ?? "",
    bullets: (card?.bullets ?? []).map((b) => b.text),
  };
}
export function resolveBatteryRebatesWhatChanges(
  data: BatteryRebatesWhatChangesData | undefined
): ResolvedBatteryRebatesWhatChanges | null {
  if (!data) return null;
  return {
    title: data.title ?? "",
    subtitle: data.subtitle ?? "",
    card1: resolveWhatChangesCard(data.card1),
    card2: resolveWhatChangesCard(data.card2),
    card3: resolveWhatChangesCard(data.card3),
    card4: resolveWhatChangesCard(data.card4),
  };
}

// ─── Are You Eligible ─────────────────────────────────────────────────
export interface ResolvedBatteryRebatesAreYouEligibleItem {
  title: string;
}
export interface ResolvedBatteryRebatesAreYouEligible {
  title: string;
  subtitle: string;
  bottomSubtitle: string;
  description: string;
  items: ResolvedBatteryRebatesAreYouEligibleItem[];
  image: string;
}
export function resolveBatteryRebatesAreYouEligible(
  data: BatteryRebatesAreYouEligibleData | undefined
): ResolvedBatteryRebatesAreYouEligible | null {
  if (!data) return null;
  return {
    title: data.title ?? "",
    subtitle: data.subtitle ?? "",
    bottomSubtitle: data.bottomSubtitle ?? "",
    description: data.description ?? "",
    items: (data.items ?? []).map((i) => ({ title: i.text })),
    image: strapiImageData(data.image)?.src ?? "",
  };
}

// ─── What Signing Up ──────────────────────────────────────────────────
export interface ResolvedVppCard {
  title: string;
  subtitle: string;
  text: string;
}
export interface ResolvedBatteryRebatesWhatSigningUp {
  title: string;
  subtitle: string;
  vppCardsLeft: ResolvedVppCard[];
  vppCardsRight: ResolvedVppCard[];
}
export function resolveBatteryRebatesWhatSigningUp(
  data: BatteryRebatesWhatSigningUpData | undefined
): ResolvedBatteryRebatesWhatSigningUp | null {
  if (!data) return null;
  return {
    title: data.title ?? "",
    subtitle: data.subtitle ?? "",
    vppCardsLeft: (data.vppCardsLeft ?? []).map((c) => ({
      title: c.title,
      subtitle: c.subtitle ?? "",
      text: c.text,
    })),
    vppCardsRight: (data.vppCardsRight ?? []).map((c) => ({
      title: c.title,
      subtitle: c.subtitle ?? "",
      text: c.text,
    })),
  };
}

// ─── Rebate Detail Split ──────────────────────────────────────────────
export interface ResolvedBatteryRebatesRebateDetailSplit {
  topSubtitle: string;
  title: string;
  description: string;
  image: string;
  topBoxTitle: string;
  topBoxItems: string[];
  bottomBoxTitle: string;
  bottomBoxItems: string[];
}
export function resolveBatteryRebatesRebateDetailSplit(
  data: BatteryRebatesRebateDetailSplitData | undefined
): ResolvedBatteryRebatesRebateDetailSplit | null {
  if (!data) return null;
  return {
    topSubtitle: data.topSubtitle ?? "",
    title: data.title ?? "",
    description: data.description ?? "",
    image: strapiImageData(data.image)?.src ?? "",
    topBoxTitle: data.topBoxTitle ?? "",
    topBoxItems: (data.topBoxItems ?? []).map((i) => i.text),
    bottomBoxTitle: data.bottomBoxTitle ?? "",
    bottomBoxItems: (data.bottomBoxItems ?? []).map((i) => i.text),
  };
}
