import React from "react";
import type { Metadata } from "next";
import { getRebatesPage } from "@/lib/strapi";
import { findSection, findSections } from "@/lib/strapi/section-utils";
import {
  resolveRebatesHero,
  resolveRebatesRebatePrograms,
  resolveRebatesStcExplainer,
  resolveRebatesUtilityCards,
  resolveRebatesLoanBenefits,
  resolveRebatesEligibilityChecker,
  resolveSharedSplitSection,
  resolveSharedFaq,
  resolveSharedCtaBanner,
} from "@/lib/strapi/resolvers";
import type {
  RebatesHeroData,
  RebatesRebateProgramsData,
  RebatesStcExplainerData,
  RebatesSplitSectionData,
  RebatesUtilityCardsData,
  RebatesLoanBenefitsData,
  RebatesEligibilityCheckerData,
  RebatesFaqData,
  RebatesCtaBannerData,
} from "@/lib/strapi/schemas";

import RebatesHeroSection from "@/components/solar/government-rebates/RebatesHeroSection";
import RebateProgramsSection from "@/components/solar/government-rebates/RebateProgramsSection";
import StcExplainerSection from "@/components/solar/government-rebates/StcExplainerSection";
import NewHomebatterySplitSection from "@/components/solar/government-rebates/NewHomebatterySplitSection";
import UtilityCardsSection from "@/components/solar/government-rebates/UtilityCardsSection";
import LoanBenefitsSection from "@/components/solar/government-rebates/LoanBenefitsSection";
import EligibilityCheckerSection from "@/components/solar/government-rebates/EligibilityCheckerSection";
import FaqSection from "@/components/solar/deals/FaqSection";
import CtaBannerSection from "@/components/solar/deals/CtaBannerSection";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Government Rebates | Regen Power",
  description:
    "Understand the federal STC rebate, WA battery support, and no-interest battery loan options available to Perth households in 2026.",
};

export default async function GovernmentRebatesPage() {
  const { data } = await getRebatesPage();
  const sections = data.sections ?? [];

  const hero = findSection<RebatesHeroData>(sections, "rebates.hero");
  const rebatePrograms = findSection<RebatesRebateProgramsData>(sections, "rebates.rebate-programs");
  const stcExplainer = findSection<RebatesStcExplainerData>(sections, "rebates.stc-explainer");

  const splitSections = findSections<RebatesSplitSectionData>(sections, "shared.split-section");
  const federalBatteryRebate = splitSections[0];
  const paperworkSection = splitSections[1];

  const utilityCards = findSection<RebatesUtilityCardsData>(sections, "rebates.utility-cards");
  const loanBenefits = findSection<RebatesLoanBenefitsData>(sections, "rebates.loan-benefits");
  const eligibilityChecker = findSection<RebatesEligibilityCheckerData>(sections, "rebates.eligibility-checker");
  const faq = findSection<RebatesFaqData>(sections, "shared.faq");
  const ctaBanner = findSection<RebatesCtaBannerData>(sections, "shared.cta-banner");

  const heroProps = resolveRebatesHero(hero);
  const rebateProgramsProps = resolveRebatesRebatePrograms(rebatePrograms);
  const stcExplainerProps = resolveRebatesStcExplainer(stcExplainer);
  const federalBatteryRebateProps = resolveSharedSplitSection(federalBatteryRebate);
  const utilityCardsProps = resolveRebatesUtilityCards(utilityCards);
  const loanBenefitsProps = resolveRebatesLoanBenefits(loanBenefits);
  const eligibilityCheckerProps = resolveRebatesEligibilityChecker(eligibilityChecker);
  const paperworkSectionProps = resolveSharedSplitSection(paperworkSection);
  const faqProps = resolveSharedFaq(faq);
  const ctaBannerProps = resolveSharedCtaBanner(ctaBanner);

  return (
    <div className="min-h-screen bg-white text-black">

      {heroProps && <RebatesHeroSection resolved={heroProps} />}

      {rebateProgramsProps && <RebateProgramsSection resolved={rebateProgramsProps} />}

      {stcExplainerProps && <StcExplainerSection resolved={stcExplainerProps} />}

      {federalBatteryRebateProps && <NewHomebatterySplitSection resolved={federalBatteryRebateProps} />}

      {utilityCardsProps && <UtilityCardsSection resolved={utilityCardsProps} />}

      {loanBenefitsProps && <LoanBenefitsSection resolved={loanBenefitsProps} />}

      {eligibilityCheckerProps && <EligibilityCheckerSection resolved={eligibilityCheckerProps} />}

      {paperworkSectionProps && <NewHomebatterySplitSection resolved={paperworkSectionProps} />}

      {faqProps && <FaqSection resolved={faqProps} />}

      {ctaBannerProps && <CtaBannerSection resolved={ctaBannerProps} />}

    </div>
  );
}