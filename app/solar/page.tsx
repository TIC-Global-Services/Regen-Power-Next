import React from "react";
import { getSolarPage } from "@/lib/strapi";
import { findSection } from "@/lib/strapi/section-utils";
import {
  resolveSolarHero,
  resolveSolarStatsAndIntro,
  resolveSolarProcessSteps,
  resolveSolarBrandsGrid,
  resolveSolarInverterSlider,
  resolveSolarSpecsTable,
  resolveSolarSizingGuide,
  resolveSolarPackages,
  resolveSolarTimeline,
  resolveSolarEngineeringItems,
} from "@/lib/strapi/resolvers/solar";
import type {
  SolarHeroData,
  SolarStatsAndIntroData,
  SolarProcessStepsData,
  SolarBrandsGridData,
  SolarInverterSliderData,
  SolarSpecsTableData,
  SolarSizingGuideData,
  SolarPackagesData,
  SolarTimelineData,
  SolarEngineeringItemsData,
} from "@/lib/strapi/schemas";

import HeroSection from "@/components/solar/Hero";
import SolarStatsAndIntro from "@/components/solar/SolarStatsAndIntro";
import SolarProcessFlow from "@/components/solar/SolarProcessFlow";
import SolarBrandsGrid from "@/components/solar/SolarBrandsGrid";
import InverterSlider from "@/components/solar/InverterSlider";
import SpecsAccordion from "@/components/solar/SpecsAccordion";
import SizingGuide from "@/components/solar/SizingGuide";
import SolarPackages from "@/components/solar/SolarPackages";
import TimelineSection from "@/components/solar/TimelineSection";
import EngineeringCustomizations from "@/components/solar/EngineeringCustomizations";

import FAQ from "@/reuseables/faq";
import GetSolar from "@/reuseables/getsolar";
import LeadCaptureForm from "@/components/solar/LeadCaptureForm";

export const revalidate = 60;

const SolarPage = async () => {
  const { data } = await getSolarPage();
  const sections = data.sections ?? [];

  const hero = findSection<SolarHeroData>(sections, "solar.hero");
  const stats = findSection<SolarStatsAndIntroData>(sections, "solar.stats-and-intro");
  const process = findSection<SolarProcessStepsData>(sections, "solar.process-steps");
  const brands = findSection<SolarBrandsGridData>(sections, "solar.brands-grid");
  const inverters = findSection<SolarInverterSliderData>(sections, "solar.inverter-slider");
  const specs = findSection<SolarSpecsTableData>(sections, "solar.specs-table");
  const sizing = findSection<SolarSizingGuideData>(sections, "solar.sizing-guide");
  const packages = findSection<SolarPackagesData>(sections, "solar.packages");
  const timeline = findSection<SolarTimelineData>(sections, "solar.timeline");
  const engineering = findSection<SolarEngineeringItemsData>(sections, "solar.engineering-items");

  const heroProps = resolveSolarHero(hero);
  const statsProps = resolveSolarStatsAndIntro(stats);
  const processProps = resolveSolarProcessSteps(process);
  const brandsProps = resolveSolarBrandsGrid(brands);
  const invertersProps = resolveSolarInverterSlider(inverters);
  const specsProps = resolveSolarSpecsTable(specs);
  const sizingProps = resolveSolarSizingGuide(sizing);
  const packagesProps = resolveSolarPackages(packages);
  const timelineProps = resolveSolarTimeline(timeline);
  const engineeringProps = resolveSolarEngineeringItems(engineering);

  return (
    <div className="bg-white min-h-screen text-black">
      {heroProps && <HeroSection heroProps={heroProps} />}
      {statsProps && <SolarStatsAndIntro resolved={statsProps} />}
      {processProps && <SolarProcessFlow resolved={processProps} />}
      {brandsProps && <SolarBrandsGrid resolved={brandsProps} />}
      {invertersProps && <InverterSlider resolved={invertersProps} />}
      {specsProps && <SpecsAccordion resolved={specsProps} />}
      {sizingProps && <SizingGuide resolved={sizingProps} />}
      {packagesProps && <SolarPackages resolved={packagesProps} />}
      {timelineProps && <TimelineSection resolved={timelineProps} />}
      {engineeringProps && <EngineeringCustomizations resolved={engineeringProps} />}

      <FAQ topTitle="Solar System" />

      <LeadCaptureForm />

      <GetSolar
        subtitle="Get A Solar System Designed"
        mainTitle="For Your Home"
        description="Tell us a few details about your home and power use, and one of our Perth-based CEC-accredited designers will build a system tailored to your roof, your household, and your budget. Free, no-obligation, and no high-pressure sales calls \u2014 just a proper engineering recommendation."
        buttonText="Get My Free Quote"
      />
    </div>
  );
};

export default SolarPage;
