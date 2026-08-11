import { strapiImageData } from "../media";
import type {
  AreYouEligibleData,
  BatteryRebatesHeroData,
  FederalRebateData as FederalRebateSectionData,
  FinanceOptionData as FinanceOptionSectionData,
  RebateDetailSplitData as RebateDetailSplitSectionData,
  RebatesStackGridData,
  ResidentialBatteryData as ResidentialBatterySectionData,
  WhatChangesCardData,
  WhatChangesData,
  WhatSigningUpData,
} from "../schemas/battery-rebates";

// ─── Hero → HeroSectionData ─────────────────────────────────────────────

export interface ResolvedBatteryRebatesHero {
  mediaSrc: string;
  topSubtitle: string;
  mainTitle: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  showOverlay: boolean;
}
export function resolveBatteryRebatesHero(
  data: BatteryRebatesHeroData | undefined
): ResolvedBatteryRebatesHero | null {
  if (!data) return null;
  const img = data.backgroundImage ? strapiImageData(data.backgroundImage) : null;
  return {
    mediaSrc: img?.src ?? "",
    topSubtitle: data.subtitle ?? "",
    mainTitle: data.title ?? "",
    description: data.description ?? "",
    ctaText: data.ctaText ?? "Get Your Free Quote",
    ctaLink: data.ctaLink ?? "#quote",
    showOverlay: data.showOverlay ?? true,
  };
}

// ─── Rebates Stack Grid → RebatesStackGridData ──────────────────────────

export interface ResolvedRebatesStackCard {
  title: string;
  items: string[];
}
export interface ResolvedRebatesStackGrid {
  title: string;
  subtitle?: string;
  cards: ResolvedRebatesStackCard[];
}
export function resolveRebatesStackGrid(
  data: RebatesStackGridData | undefined
): ResolvedRebatesStackGrid | null {
  if (!data) return null;
  return {
    title: data.title ?? "",
    subtitle: data.subtitle ?? undefined,
    cards: (data.cards ?? []).map((card) => ({
      title: card.title,
      items: (card.items ?? []).map((i) => i.text),
    })),
  };
}

// ─── Residential Battery → SchemeDataItem[] ─────────────────────────────

export interface ResolvedResidentialBatteryItem {
  subtitle: string;
  title: string;
  description: string;
  listItems: string[];
  timingText: string;
  taxText: string;
  image: string | null;
}
export function resolveResidentialBattery(
  data: ResidentialBatterySectionData | undefined
): ResolvedResidentialBatteryItem[] {
  if (!data) return [];
  const img = data.image ? strapiImageData(data.image) : null;
  return [
    {
      subtitle: data.subtitle ?? "",
      title: data.title ?? "",
      description: data.description ?? "",
      listItems: (data.listItems ?? []).map((i) => i.text),
      timingText: data.timingText ?? "",
      taxText: data.taxText ?? "",
      image: img?.src ?? null,
    },
  ];
}

// ─── Federal Rebate → FederalRebateData[] ───────────────────────────────

export interface ResolvedFederalRebateItem {
  sectionSubtitle: string;
  sectionTitle: string;
  sectionDescription: string;
  keySpecsTitle: string;
  keySpecsBulletPoints: string[];
  firstImage: string | null;
  eligibleCapacityTitle: string;
  eligibleCapacityText: string;
  importantNoteTitle: string;
  importantNoteText: string;
  secondImage: string | null;
  combinedSchemeText: string;
  eligibilityTitle: string;
  eligibilityBulletPoints: string[];
}
export function resolveFederalRebate(
  data: FederalRebateSectionData | undefined
): ResolvedFederalRebateItem[] {
  if (!data) return [];
  const firstImg = data.firstImage ? strapiImageData(data.firstImage) : null;
  const secondImg = data.secondImage ? strapiImageData(data.secondImage) : null;
  return [
    {
      sectionSubtitle: data.sectionSubtitle ?? "",
      sectionTitle: data.sectionTitle ?? "",
      sectionDescription: data.sectionDescription ?? "",
      keySpecsTitle: data.keySpecsTitle ?? "",
      keySpecsBulletPoints: (data.keySpecsBulletPoints ?? []).map((i) => i.text),
      firstImage: firstImg?.src ?? null,
      eligibleCapacityTitle: data.eligibleCapacityTitle ?? "",
      eligibleCapacityText: data.eligibleCapacityText ?? "",
      importantNoteTitle: data.importantNoteTitle ?? "",
      importantNoteText: data.importantNoteText ?? "",
      secondImage: secondImg?.src ?? null,
      combinedSchemeText: data.combinedSchemeText ?? "",
      eligibilityTitle: data.eligibilityTitle ?? "",
      eligibilityBulletPoints: (data.eligibilityBulletPoints ?? []).map((i) => i.text),
    },
  ];
}

// ─── Finance Option → FinanceOptionData[] ───────────────────────────────

export interface ResolvedFinanceSection {
  title: string;
  listItems: string[];
  image: string | null;
}
export interface ResolvedFinanceOption {
  sectionTitle: string;
  sectionSubtitle: string;
  sections: ResolvedFinanceSection[];
}
export function resolveFinanceOption(
  data: FinanceOptionSectionData | undefined
): ResolvedFinanceOption[] {
  if (!data) return [];
  return [
    {
      sectionTitle: data.sectionTitle ?? "",
      sectionSubtitle: data.sectionSubtitle ?? "",
      sections: (data.sections ?? []).map((s) => ({
        title: s.title,
        listItems: (s.listItems ?? []).map((i) => i.text),
        image: s.image ? (strapiImageData(s.image)?.src ?? null) : null,
      })),
    },
  ];
}

// ─── What Changes → WhatChangesData ─────────────────────────────────────

export interface ResolvedWhatChangesCard {
  title: string;
  description: string;
  bullets?: string[];
}
export interface ResolvedWhatChanges {
  title: string;
  subtitle: string;
  card1: ResolvedWhatChangesCard;
  card2: ResolvedWhatChangesCard;
  card3: ResolvedWhatChangesCard;
  card4: ResolvedWhatChangesCard;
}
function resolveWhatChangesCard(
  card: WhatChangesCardData
): ResolvedWhatChangesCard {
  return {
    title: card.title,
    description: card.description,
    ...(card.bullets && card.bullets.length > 0
      ? { bullets: card.bullets.map((b) => b.text) }
      : {}),
  };
}
export function resolveWhatChanges(
  data: WhatChangesData | undefined
): ResolvedWhatChanges | null {
  if (!data) return null;
  return {
    title: data.title ?? "",
    subtitle: data.subtitle ?? "",
    card1: data.card1 ? resolveWhatChangesCard(data.card1) : { title: "", description: "" },
    card2: data.card2 ? resolveWhatChangesCard(data.card2) : { title: "", description: "" },
    card3: data.card3 ? resolveWhatChangesCard(data.card3) : { title: "", description: "" },
    card4: data.card4 ? resolveWhatChangesCard(data.card4) : { title: "", description: "" },
  };
}

// ─── Are You Eligible → areyoueligibleData ──────────────────────────────

export interface ResolvedAreYouEligible {
  title: string;
  subtitle?: string;
  bottomSubtitle?: string;
  description?: string;
  items: { title: string }[];
  additionalListTitle?: string;
  additionalItems?: { title: string }[];
  image: string | null;
  imageAlt?: string;
}
export function resolveAreYouEligible(
  data: AreYouEligibleData | undefined
): ResolvedAreYouEligible | null {
  if (!data) return null;
  const img = data.image ? strapiImageData(data.image) : null;
  return {
    title: data.title ?? "",
    subtitle: data.subtitle ?? undefined,
    bottomSubtitle: data.bottomSubtitle ?? undefined,
    description: data.description ?? undefined,
    items: (data.items ?? []).map((i) => ({ title: i.text })),
    additionalListTitle: data.additionalListTitle ?? undefined,
    additionalItems: (data.additionalItems ?? []).map((i) => ({ title: i.text })),
    image: img?.src ?? null,
    imageAlt: data.imageAlt ?? undefined,
  };
}

// ─── Rebate Detail Split → RebateDetailSplitData ────────────────────────

export interface ResolvedRebateDetailSplit {
  topSubtitle?: string;
  title?: string;
  description?: string;
  image: string | null;
  topBoxTitle?: string;
  topBoxItems?: string[];
  bottomBoxTitle?: string;
  bottomBoxItems?: string[];
}
export function resolveRebateDetailSplit(
  data: RebateDetailSplitSectionData | undefined
): ResolvedRebateDetailSplit | null {
  if (!data) return null;
  const img = data.image ? strapiImageData(data.image) : null;
  return {
    topSubtitle: data.topSubtitle ?? undefined,
    title: data.title ?? undefined,
    description: data.description ?? undefined,
    image: img?.src ?? null,
    topBoxTitle: data.topBoxTitle ?? undefined,
    topBoxItems: (data.topBoxItems ?? []).map((i) => i.text),
    bottomBoxTitle: data.bottomBoxTitle ?? undefined,
    bottomBoxItems: (data.bottomBoxItems ?? []).map((i) => i.text),
  };
}

// ─── What Signing Up → WhatSigningUpData ────────────────────────────────

export interface ResolvedVppCard {
  title: string;
  subtitle?: string;
  text: string;
}
export interface ResolvedWhatSigningUp {
  title?: string;
  subtitle?: string;
  vppCardsLeft?: ResolvedVppCard[];
  vppCardsRight?: ResolvedVppCard[];
}
export function resolveWhatSigningUp(
  data: WhatSigningUpData | undefined
): ResolvedWhatSigningUp | null {
  if (!data) return null;
  const mapCard = (c: {
    title: string;
    subtitle: string | null;
    text: string;
  }): ResolvedVppCard => ({
    title: c.title,
    ...(c.subtitle ? { subtitle: c.subtitle } : {}),
    text: c.text,
  });
  return {
    title: data.title ?? undefined,
    subtitle: data.subtitle ?? undefined,
    vppCardsLeft: (data.vppCardsLeft ?? []).map(mapCard),
    vppCardsRight: (data.vppCardsRight ?? []).map(mapCard),
  };
}
