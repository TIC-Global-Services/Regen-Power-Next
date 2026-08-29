import React from "react";
import { getSolarPage } from "@/lib/strapi";
import { findSection } from "@/lib/strapi/section-utils";
import {
  resolveSolarHero,
  resolveSolarStatsAndIntro,
  resolveSolarProcessSteps,
  resolveSolarBrandsGrid,
  resolveSolarInverterSlider,
  resolveSolarSpecsRowCards,
  resolveSolarSizingGuideTable,
  resolveSolarPackages,
  resolveSolarTimeline,
  resolveSolarEngineeringItems,
  resolveSharedFaq,
  resolveSharedFormSection,
  resolveSharedCtaBanner,
} from "@/lib/strapi/resolvers";
import type {
  SolarHeroData,
  SolarStatsAndIntroData,
  SolarProcessStepsData,
  SolarBrandsGridData,
  SolarInverterSliderData,
  SolarSpecsRowCardsData,
  SolarSizingGuideTableData,
  SolarPackagesData,
  SolarTimelineData,
  SolarEngineeringItemsData,
  SharedFaqData,
  SharedFormSectionData,
  SharedCtaBannerData,
} from "@/lib/strapi/schemas";

import HeroSection from "@/components/solar/solarSystem/Hero";
import SolarStatsAndIntro from "@/components/solar/solarSystem/SolarStatsAndIntro";
import SolarProcessFlow from "@/components/solar/solarSystem/SolarProcessFlow";
import SolarBrandsGrid from "@/components/solar/solarSystem/SolarBrandsGrid";
import InverterSlider from "@/components/solar/solarSystem/InverterSlider";
import SpecsRowCards from "@/components/solar/solarSystem/SpecsRowCards";
import SizingGuideTable from "@/components/solar/solarSystem/SizingGuideTable";
import SolarPackages from "@/components/solar/solarSystem/SolarPackages";
import TimelineSection from "@/components/solar/solarSystem/TimelineSection";
import EngineeringCustomizations from "@/components/solar/solarSystem/EngineeringCustomizations";

import FAQ from "@/reuseables/faq";
import GetSolar from "@/reuseables/getsolar";
import UnifiedFormSection from "@/reuseables/UnifiedFormSection";

export const revalidate = 60;

const SolarPage = async () => {
  const { data } = await getSolarPage();
  const sections = data.sections ?? [];

  const hero = findSection<SolarHeroData>(sections, "solar.hero");
  const stats = findSection<SolarStatsAndIntroData>(sections, "solar.stats-and-intro");
  const process = findSection<SolarProcessStepsData>(sections, "solar.process-steps");
  const brands = findSection<SolarBrandsGridData>(sections, "solar.brands-grid");
  const inverters = findSection<SolarInverterSliderData>(sections, "solar.inverter-slider");
  const specs = findSection<SolarSpecsRowCardsData>(sections, "solar.specs-row-cards");
  const sizing = findSection<SolarSizingGuideTableData>(sections, "solar.sizing-guide-table");
  const packages = findSection<SolarPackagesData>(sections, "solar.packages");
  const timeline = findSection<SolarTimelineData>(sections, "solar.timeline");
  const engineering = findSection<SolarEngineeringItemsData>(sections, "solar.engineering-items");
  const faq = findSection<SharedFaqData>(sections, "shared.faq");
  const form = findSection<SharedFormSectionData>(sections, "shared.form-section");
  const ctaBanner = findSection<SharedCtaBannerData>(sections, "shared.cta-banner");

  const heroProps = resolveSolarHero(hero);
  const statsProps = resolveSolarStatsAndIntro(stats);
  const processProps = resolveSolarProcessSteps(process);
  const brandsProps = resolveSolarBrandsGrid(brands);
  const invertersProps = resolveSolarInverterSlider(inverters);
  const specsProps = resolveSolarSpecsRowCards(specs);
  const sizingProps = resolveSolarSizingGuideTable(sizing);
  const packagesProps = resolveSolarPackages(packages);
  const timelineProps = resolveSolarTimeline(timeline);
  const engineeringProps = resolveSolarEngineeringItems(engineering);
  const faqProps = resolveSharedFaq(faq);
  const formProps = resolveSharedFormSection(form);
  const ctaBannerProps = resolveSharedCtaBanner(ctaBanner);

  return (
    <div className="bg-white min-h-screen text-black">
      {heroProps && <HeroSection heroProps={heroProps} />}
      {statsProps && <SolarStatsAndIntro resolved={statsProps} />}
      {processProps && <SolarProcessFlow resolved={processProps} />}
      {brandsProps && <SolarBrandsGrid resolved={brandsProps} />}
      {invertersProps && <InverterSlider resolved={invertersProps} />}
      {specsProps && <SpecsRowCards resolved={specsProps} />}
      {sizingProps && <SizingGuideTable resolved={sizingProps} />}
      {packagesProps && <SolarPackages resolved={packagesProps} />}
      {timelineProps && <TimelineSection resolved={timelineProps} />}
      {engineeringProps && <EngineeringCustomizations resolved={engineeringProps} />}

      {faqProps && (
        <FAQ
          topTitle={faqProps.title}
          title={faqProps.sectionTitle}
          listTitle={faqProps.listTitle}
          image={faqProps.image?.src ?? undefined}
          items={faqProps.items}
        />
      )}

      <UnifiedFormSection
        resolved={formProps}
        video={formProps?.videoSrc ?? "/form-icon-video.mp4"}
        image={formProps?.imageSrc}
        title={formProps?.title ?? undefined}
        description={formProps?.description ?? undefined}
      />

      {ctaBannerProps && (
        <GetSolar
          subtitle={ctaBannerProps.subtitle}
          mainTitle={ctaBannerProps.mainTitle}
          description={ctaBannerProps.description}
          buttonText={ctaBannerProps.buttonText}
          buttonHref={ctaBannerProps.buttonHref}
          bgImage={ctaBannerProps.bgImage || undefined}
        />
      )}
    </div>
  );
};

export default SolarPage;
