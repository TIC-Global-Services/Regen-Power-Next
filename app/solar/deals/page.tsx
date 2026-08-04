import React from "react";
import { getDealsPage } from "@/lib/strapi";
import { findSection } from "@/lib/strapi/section-utils";
import {
  resolveSolarPackages,
  resolveDealsHero,
  resolveDealsPhilosophy,
  resolveDealsGrid,
  resolveDealsWaysToPay,
  resolveDealsWhyMatters,
  resolveSharedSplitSection,
  resolveSharedFaq,
  resolveSharedFormSection,
  resolveSharedCtaBanner,
} from "@/lib/strapi/resolvers";
import type {
  DealsHeroData,
  DealsPhilosophyData,
  DealsGridData,
  DealsSplitSectionData,
  DealsWaysToPayData,
  DealsWhyMattersData,
  DealsFaqData,
  DealsCtaBannerData,
  SolarPackagesData,
  SharedFormSectionData,
} from "@/lib/strapi/schemas";

import DealsHeroSection from "@/components/solar/deals/DealsHeroSection";
import DealsPhilosophySection from "@/components/solar/deals/DealsPhilosophySection";
import DealsGridSection from "@/components/solar/deals/DealsGridSection";
import SplitSectionSection from "@/components/solar/deals/SplitSectionSection";
import SolarPackages from "@/components/solar/SolarPackages";
import WaysToPaySection from "@/components/solar/deals/WaysToPaySection";
import WhyMattersSection from "@/components/solar/deals/WhyMattersSection";
import FaqSection from "@/components/solar/deals/FaqSection";
import CtaBannerSection from "@/components/solar/deals/CtaBannerSection";
import LeadCaptureForm from "@/components/solar/LeadCaptureForm";

export const revalidate = 60;

export default async function SolarDealsPage() {
  const { data } = await getDealsPage();
  const sections = data.sections ?? [];

  const hero = findSection<DealsHeroData>(sections, "deals.hero");
  const philosophy = findSection<DealsPhilosophyData>(sections, "deals.philosophy");
  const dealsGrid = findSection<DealsGridData>(sections, "deals.deals-grid");
  const splitSection = findSection<DealsSplitSectionData>(sections, "shared.split-section");
  const packages = findSection<SolarPackagesData>(sections, "solar.packages");
  const waysToPay = findSection<DealsWaysToPayData>(sections, "deals.ways-to-pay");
  const whyMatters = findSection<DealsWhyMattersData>(sections, "deals.why-matters");
  const faq = findSection<DealsFaqData>(sections, "shared.faq");
  const form = findSection<SharedFormSectionData>(sections, "shared.form-section");
  const ctaBanner = findSection<DealsCtaBannerData>(sections, "shared.cta-banner");

  const heroProps = resolveDealsHero(hero);
  const philosophyProps = resolveDealsPhilosophy(philosophy);
  const dealsGridProps = resolveDealsGrid(dealsGrid);
  const splitSectionProps = resolveSharedSplitSection(splitSection);
  const packagesProps = resolveSolarPackages(packages);
  const waysToPayProps = resolveDealsWaysToPay(waysToPay);
  const whyMattersProps = resolveDealsWhyMatters(whyMatters);
  const faqProps = resolveSharedFaq(faq);
  const formProps = resolveSharedFormSection(form);
  const ctaBannerProps = resolveSharedCtaBanner(ctaBanner);

  return (
    <div className="bg-white min-h-screen text-black overflow-x-hidden">

      {heroProps && <DealsHeroSection resolved={heroProps} />}

      {philosophyProps && <DealsPhilosophySection resolved={philosophyProps} />}

      {dealsGridProps && <DealsGridSection resolved={dealsGridProps} />}

      {splitSectionProps && <SplitSectionSection resolved={splitSectionProps} />}

      {packagesProps && <SolarPackages resolved={packagesProps} />}

      {waysToPayProps && <WaysToPaySection resolved={waysToPayProps} />}

      {whyMattersProps && <WhyMattersSection resolved={whyMattersProps} />}

      {faqProps && <FaqSection resolved={faqProps} />}

      {formProps && (
        <div id="quote-form">
          <LeadCaptureForm
            subtitle={formProps.subtitle}
            title={formProps.title}
            description={formProps.description}
            image={formProps.image}
          />
        </div>
      )}

      {ctaBannerProps && <CtaBannerSection resolved={ctaBannerProps} />}

    </div>
  );
}