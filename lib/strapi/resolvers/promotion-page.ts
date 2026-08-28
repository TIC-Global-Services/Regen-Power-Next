import { findSection } from "../section-utils";
import type { StrapiSection } from "../types";
import {
  resolvePromotionHero,
  resolvePromotionLimitedSpots,
  resolvePromotionTrustRegen,
  resolvePromotionFreeQuotation,
  resolvePromotionBatteryRebates,
  resolvePromotionTrustedBrands,
  resolvePromotionHighEnergy,
  resolvePromotionBatteryPackage,
  resolvePromotionReadyToBegin,
  resolvePromotionSolarFinancing,
  resolvePromotionAboutRegen,
  resolvePromotionFindOutWhy,
  resolvePromotionAchievements,
  resolvePromotionIndustryRecognition,
  resolvePromotionFaqSection,
  resolvePromotionAwardsSection,
  deriveMobileAwards,
  deriveMobileContactInfo,
  deriveMobileBatteryPricing,
} from "./promotion";
import type {
  PromotionHeroData,
  PromotionLimitedSpotsData,
  PromotionTrustRegenData,
  PromotionFreeQuotationData,
  PromotionBatteryRebatesData,
  PromotionTrustedBrandsData,
  PromotionHighEnergyData,
  PromotionBatteryPackageData,
  PromotionReadyToBeginData,
  PromotionSolarFinancingData,
  PromotionAboutRegenData,
  PromotionFindOutWhyData,
  PromotionAchievementsData,
  PromotionIndustryRecognitionData,
  PromotionFaqSectionData,
  PromotionAwardsSectionData,
  PromotionBatteryPricingData,
  PromotionContactInfoData,
} from "../schemas/promotion";

export interface ResolvedPromotionPage {
  hero: ReturnType<typeof resolvePromotionHero>;
  limitedSpots: ReturnType<typeof resolvePromotionLimitedSpots>;
  trustRegen: ReturnType<typeof resolvePromotionTrustRegen>;
  freeQuotation: ReturnType<typeof resolvePromotionFreeQuotation>;
  batteryRebates: ReturnType<typeof resolvePromotionBatteryRebates>;
  trustedBrands: ReturnType<typeof resolvePromotionTrustedBrands>;
  highEnergy: ReturnType<typeof resolvePromotionHighEnergy>;
  batteryPackage: ReturnType<typeof resolvePromotionBatteryPackage>;
  readyToBegin: ReturnType<typeof resolvePromotionReadyToBegin>;
  solarFinancing: ReturnType<typeof resolvePromotionSolarFinancing>;
  aboutRegen: ReturnType<typeof resolvePromotionAboutRegen>;
  findOutWhy: ReturnType<typeof resolvePromotionFindOutWhy>;
  achievements: ReturnType<typeof resolvePromotionAchievements>;
  industryRecognition: ReturnType<typeof resolvePromotionIndustryRecognition>;
  faqSection: ReturnType<typeof resolvePromotionFaqSection>;
  // mobile derived / explicit
  awardsSection: ReturnType<typeof resolvePromotionAwardsSection>;
  batteryPricing: PromotionBatteryPricingData | null;
  contactInfo: PromotionContactInfoData | null;
  rawSections: StrapiSection[];
}

export function resolvePromotionPage(sections: StrapiSection[] | null | undefined): ResolvedPromotionPage | null {
  if (!sections || !Array.isArray(sections) || sections.length === 0) return null;

  const hero = findSection<PromotionHeroData>(sections as unknown as { __component: string }[], "promotion.hero");
  const limitedSpots = findSection<PromotionLimitedSpotsData>(sections as unknown as { __component: string }[], "promotion.limited-spots");
  const trustRegen = findSection<PromotionTrustRegenData>(sections as unknown as { __component: string }[], "promotion.trust-regen");
  const freeQuotation = findSection<PromotionFreeQuotationData>(sections as unknown as { __component: string }[], "promotion.free-quotation");
  const batteryRebates = findSection<PromotionBatteryRebatesData>(sections as unknown as { __component: string }[], "promotion.battery-rebates");
  const trustedBrands = findSection<PromotionTrustedBrandsData>(sections as unknown as { __component: string }[], "promotion.trusted-brands");
  const highEnergy = findSection<PromotionHighEnergyData>(sections as unknown as { __component: string }[], "promotion.high-energy");
  const batteryPackage = findSection<PromotionBatteryPackageData>(sections as unknown as { __component: string }[], "promotion.battery-package");
  const readyToBegin = findSection<PromotionReadyToBeginData>(sections as unknown as { __component: string }[], "promotion.ready-to-begin");
  const solarFinancing = findSection<PromotionSolarFinancingData>(sections as unknown as { __component: string }[], "promotion.solar-financing");
  const aboutRegen = findSection<PromotionAboutRegenData>(sections as unknown as { __component: string }[], "promotion.about-regen");
  const findOutWhy = findSection<PromotionFindOutWhyData>(sections as unknown as { __component: string }[], "promotion.find-out-why");
  const achievements = findSection<PromotionAchievementsData>(sections as unknown as { __component: string }[], "promotion.achievements");
  const industryRecognition = findSection<PromotionIndustryRecognitionData>(
    sections as unknown as { __component: string }[],
    "promotion.industry-recognition"
  );
  const faqSection = findSection<PromotionFaqSectionData>(sections as unknown as { __component: string }[], "promotion.faq-section");
  const awardsSectionRaw = findSection<PromotionAwardsSectionData>(sections as unknown as { __component: string }[], "promotion.awards-section");
  const batteryPricingRaw = findSection<PromotionBatteryPricingData>(sections as unknown as { __component: string }[], "promotion.battery-pricing");
  const contactInfoRaw = findSection<PromotionContactInfoData>(sections as unknown as { __component: string }[], "promotion.contact-info");

  const hasAny =
    hero ||
    limitedSpots ||
    trustRegen ||
    freeQuotation ||
    batteryRebates ||
    trustedBrands ||
    highEnergy ||
    batteryPackage ||
    readyToBegin ||
    solarFinancing ||
    aboutRegen ||
    findOutWhy ||
    achievements ||
    industryRecognition ||
    faqSection;

  if (!hasAny) return null;

  return {
    hero: resolvePromotionHero(hero),
    limitedSpots: resolvePromotionLimitedSpots(limitedSpots),
    trustRegen: resolvePromotionTrustRegen(trustRegen),
    freeQuotation: resolvePromotionFreeQuotation(freeQuotation),
    batteryRebates: resolvePromotionBatteryRebates(batteryRebates),
    trustedBrands: resolvePromotionTrustedBrands(trustedBrands),
    highEnergy: resolvePromotionHighEnergy(highEnergy),
    batteryPackage: resolvePromotionBatteryPackage(batteryPackage),
    readyToBegin: resolvePromotionReadyToBegin(readyToBegin),
    solarFinancing: resolvePromotionSolarFinancing(solarFinancing),
    aboutRegen: resolvePromotionAboutRegen(aboutRegen),
    findOutWhy: resolvePromotionFindOutWhy(findOutWhy),
    achievements: resolvePromotionAchievements(achievements),
    industryRecognition: resolvePromotionIndustryRecognition(industryRecognition),
    faqSection: resolvePromotionFaqSection(faqSection),
    awardsSection: resolvePromotionAwardsSection(awardsSectionRaw),
    batteryPricing: batteryPricingRaw ?? null,
    contactInfo: contactInfoRaw ?? null,
    rawSections: sections,
  };
}

// Mobile helpers re-exported for page layer if it needs explicit overrides
export { deriveMobileAwards, deriveMobileContactInfo, deriveMobileBatteryPricing };
