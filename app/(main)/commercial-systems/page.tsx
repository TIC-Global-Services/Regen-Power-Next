import React from "react";
import { getCommercialSystemsPage } from "@/lib/strapi";
import { findSection } from "@/lib/strapi/section-utils";
import {
  resolveCommercialSystemsHero,
  resolveCommercialSystemsStatsCardGrid,
  resolveCommercialSystemsTiersSection,
  resolveCommercialSystemsComponentsSection,
  resolveCommercialSystemsIndustriesSection,
  resolveCommercialSystemsFeatureCardGrid,
  resolveCommercialSystemsWatchSystemSection,
  resolveCommercialSystemsPackagesGrid,
  resolveCommercialSystemsProcessFlow,
  resolveCommercialSystemsFiveThingsSection,
  resolveCommercialSystemsCommercialForm,
  resolveSharedFaq,
  resolveSharedCtaBanner,
} from "@/lib/strapi/resolvers";
import type {
  CommercialSystemsHeroData,
  CommercialSystemsStatsCardGridData,
  CommercialSystemsTiersSectionData,
  CommercialSystemsComponentsSectionData,
  CommercialSystemsIndustriesSectionData,
  CommercialSystemsFeatureCardGridData,
  CommercialSystemsWatchSystemSectionData,
  CommercialSystemsPackagesGridData,
  CommercialSystemsProcessFlowData,
  CommercialSystemsFiveThingsSectionData,
  SharedFaqData,
  CommercialSystemsCommercialFormData,
  SharedCtaBannerData,
} from "@/lib/strapi/schemas";

import HeroSection from "@/components/commercial/systems/HeroSection";
import StatsCardGridSection from "@/components/commercial/systems/StatsCardGridSection";
import TiersSection from "@/components/commercial/systems/TiersSection";
import ComponentsSection from "@/components/commercial/systems/ComponentsSection";
import IndustriesSection from "@/components/commercial/systems/IndustriesSection";
import FeatureCardGridSection from "@/components/commercial/systems/FeatureCardGridSection";
import WatchSystemSection from "@/components/commercial/systems/WatchSystemSection";
import PackagesGridSection from "@/components/commercial/systems/PackagesGridSection";
import ProcessFlowSection from "@/components/commercial/systems/ProcessFlowSection";
import FiveThingsSection from "@/components/commercial/systems/FiveThingsSection";
import FaqSection from "@/components/commercial/systems/FaqSection";
import CommercialFormSection from "@/components/commercial/systems/CommercialFormSection";
import CtaBannerSection from "@/components/commercial/systems/CtaBannerSection";

export const revalidate = 60;

export default async function CommercialSystemsPage() {
  const { data } = await getCommercialSystemsPage();
  const sections = data.sections ?? [];

  const hero = findSection<CommercialSystemsHeroData>(sections, "commercial-systems.hero");
  const stats = findSection<CommercialSystemsStatsCardGridData>(sections, "commercial-systems.stats-card-grid");
  const tiers = findSection<CommercialSystemsTiersSectionData>(sections, "commercial-systems.tiers-section");
  const components = findSection<CommercialSystemsComponentsSectionData>(sections, "commercial-systems.components-section");
  const industries = findSection<CommercialSystemsIndustriesSectionData>(sections, "commercial-systems.industries-section");
  const featureCards = findSection<CommercialSystemsFeatureCardGridData>(sections, "commercial-systems.feature-card-grid");
  const watchSystem = findSection<CommercialSystemsWatchSystemSectionData>(sections, "commercial-systems.watch-system-section");
  const packages = findSection<CommercialSystemsPackagesGridData>(sections, "commercial-systems.packages-grid");
  const processFlow = findSection<CommercialSystemsProcessFlowData>(sections, "commercial-systems.process-flow");
  const fiveThings = findSection<CommercialSystemsFiveThingsSectionData>(sections, "commercial-systems.five-things-section");
  const faq = findSection<SharedFaqData>(sections, "shared.faq");
  const commercialForm = findSection<CommercialSystemsCommercialFormData>(sections, "commercial-systems.commercial-form");
  const ctaBanner = findSection<SharedCtaBannerData>(sections, "shared.cta-banner");

  const heroProps = resolveCommercialSystemsHero(hero);
  const statsProps = resolveCommercialSystemsStatsCardGrid(stats);
  const tiersProps = resolveCommercialSystemsTiersSection(tiers);
  const componentsProps = resolveCommercialSystemsComponentsSection(components);
  const industriesProps = resolveCommercialSystemsIndustriesSection(industries);
  const featureCardsProps = resolveCommercialSystemsFeatureCardGrid(featureCards);
  const watchSystemProps = resolveCommercialSystemsWatchSystemSection(watchSystem);
  const packagesProps = resolveCommercialSystemsPackagesGrid(packages);
  const processFlowProps = resolveCommercialSystemsProcessFlow(processFlow);
  const fiveThingsProps = resolveCommercialSystemsFiveThingsSection(fiveThings);
  const faqProps = resolveSharedFaq(faq);
  const commercialFormProps = resolveCommercialSystemsCommercialForm(commercialForm);
  const ctaBannerProps = resolveSharedCtaBanner(ctaBanner);
  

  return (
    <div className="bg-white min-h-screen text-black overflow-x-hidden">
      {heroProps && <HeroSection resolved={heroProps} />}

      {statsProps && <StatsCardGridSection resolved={statsProps} />}

      {tiersProps && <TiersSection resolved={tiersProps} />}

      {componentsProps && <ComponentsSection resolved={componentsProps} />}

      {industriesProps && <IndustriesSection resolved={industriesProps} />}

      {featureCardsProps && <FeatureCardGridSection resolved={featureCardsProps} />}

      {watchSystemProps && <WatchSystemSection resolved={watchSystemProps} />}

      {packagesProps && <PackagesGridSection resolved={packagesProps} />}

      {processFlowProps && <ProcessFlowSection resolved={processFlowProps} />}

      {fiveThingsProps && <FiveThingsSection resolved={fiveThingsProps} />}

      {faqProps && <FaqSection resolved={faqProps} />}

      {commercialFormProps && (
        <div id="quote-form">
          <CommercialFormSection resolved={commercialFormProps} />
        </div>
      )}

      {ctaBannerProps && <CtaBannerSection resolved={ctaBannerProps} />}
    </div>
  );
}