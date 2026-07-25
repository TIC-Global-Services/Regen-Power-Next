import React from "react";
import { getBrandsPage } from "@/lib/strapi";
import { findSection } from "@/lib/strapi/section-utils";
import {
  resolveBrandsHero,
  resolveBrandsPhilosophy,
  resolveBrandsTier1Means,
  resolveBrandsGrid,
  resolveBrandsHybridSpecialty,
  resolveBrandsInvertersSlider,
  resolveBrandsCriteriaList,
  resolveBrandsSpecsTable,
} from "@/lib/strapi/resolvers";
import type {
  BrandsHeroData,
  BrandsPhilosophyData,
  BrandsTier1MeansData,
  BrandsGridData,
  BrandsHybridSpecialtyData,
  BrandsInvertersSliderData,
  BrandsCriteriaListData,
  BrandsSpecsTableData,
} from "@/lib/strapi/schemas";

import BrandsHeroSection from "@/components/solar/brands/BrandsHeroSection";
import PhilosophySection from "@/components/solar/brands/PhilosophySection";
import Tier1MeansSection from "@/components/solar/brands/Tier1MeansSection";
import BrandsGridSection from "@/components/solar/brands/BrandsGridSection";
import HybridSpecialtySection from "@/components/solar/brands/HybridSpecialtySection";
import InvertersSliderSection from "@/components/solar/brands/InvertersSliderSection";
import CriteriaListSection from "@/components/solar/brands/CriteriaListSection";
import SpecsTableSection from "@/components/solar/brands/SpecsTableSection";

import FAQ from "@/components/solar/brands/FAQ";
import LeadCaptureForm from "@/components/solar/LeadCaptureForm";
import GetSolar from "@/reuseables/getsolar";
import getSolarBg from "@/assets/solar/footer.png";

export const revalidate = 60;

const SolarBrandsPage = async () => {
  const { data } = await getBrandsPage();
  const sections = data.sections ?? [];

  const hero = findSection<BrandsHeroData>(sections, "brands.hero");
  const philosophy = findSection<BrandsPhilosophyData>(sections, "brands.philosophy");
  const tier1 = findSection<BrandsTier1MeansData>(sections, "brands.tier1-means");
  const brandsGrid = findSection<BrandsGridData>(sections, "brands.brands-grid");
  const hybrid = findSection<BrandsHybridSpecialtyData>(sections, "brands.hybrid-specialty");
  const inverters = findSection<BrandsInvertersSliderData>(sections, "brands.inverters-slider");
  const criteria = findSection<BrandsCriteriaListData>(sections, "brands.criteria-list");
  const specsTable = findSection<BrandsSpecsTableData>(sections, "brands.specs-table");

  const heroProps = resolveBrandsHero(hero);
  const philosophyProps = resolveBrandsPhilosophy(philosophy);
  const tier1Props = resolveBrandsTier1Means(tier1);
  const brandsGridProps = resolveBrandsGrid(brandsGrid);
  const hybridProps = resolveBrandsHybridSpecialty(hybrid);
  const invertersProps = resolveBrandsInvertersSlider(inverters);
  const criteriaProps = resolveBrandsCriteriaList(criteria);
  const specsTableProps = resolveBrandsSpecsTable(specsTable);

  return (
    <div className="bg-white min-h-screen text-black">
      {heroProps && <BrandsHeroSection resolved={heroProps} />}
      {philosophyProps && <PhilosophySection resolved={philosophyProps} />}
      {tier1Props && <Tier1MeansSection resolved={tier1Props} />}
      {brandsGridProps && <BrandsGridSection resolved={brandsGridProps} />}

      {specsTableProps && <SpecsTableSection resolved={specsTableProps} />}

      {hybridProps && <HybridSpecialtySection resolved={hybridProps} />}
      {invertersProps && <InvertersSliderSection resolved={invertersProps} />}
      {criteriaProps && <CriteriaListSection resolved={criteriaProps} />}

      <FAQ />

      <div id="quote-form">
        <LeadCaptureForm />
      </div>

      <GetSolar
        subtitle="Get A Solar System Designed"
        mainTitle="For Your Home"
        description="Tell us a few details about your home and power use, and one of our Perth-based CEC-accredited designers will build a system tailored to your roof, your household, and your budget. Free, no-obligation, and no high-pressure sales calls \u2014 just a proper engineering recommendation."
        buttonText="Get My Free Quote"
        bgImage={getSolarBg}
      />
    </div>
  );
};

export default SolarBrandsPage;
