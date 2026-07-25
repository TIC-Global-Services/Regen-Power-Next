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
  resolveSharedFaq,
  resolveSharedFormSection,
  resolveSharedCtaBanner,
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
  SharedFaqData,
  SharedFormSectionData,
  SharedCtaBannerData,
} from "@/lib/strapi/schemas";

import BrandsHeroSection from "@/components/solar/brands/BrandsHeroSection";
import PhilosophySection from "@/components/solar/brands/PhilosophySection";
import Tier1MeansSection from "@/components/solar/brands/Tier1MeansSection";
import BrandsGridSection from "@/components/solar/brands/BrandsGridSection";
import HybridSpecialtySection from "@/components/solar/brands/HybridSpecialtySection";
import InvertersSliderSection from "@/components/solar/brands/InvertersSliderSection";
import CriteriaListSection from "@/components/solar/brands/CriteriaListSection";
import SpecsTableSection from "@/components/solar/brands/SpecsTableSection";

import FAQ from "@/reuseables/faq";
import GetSolar from "@/reuseables/getsolar";
import LeadCaptureForm from "@/components/solar/LeadCaptureForm";

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
  const faq = findSection<SharedFaqData>(sections, "shared.faq");
  const form = findSection<SharedFormSectionData>(sections, "shared.form-section");
  const ctaBanner = findSection<SharedCtaBannerData>(sections, "shared.cta-banner");

  const heroProps = resolveBrandsHero(hero);
  const philosophyProps = resolveBrandsPhilosophy(philosophy);
  const tier1Props = resolveBrandsTier1Means(tier1);
  const brandsGridProps = resolveBrandsGrid(brandsGrid);
  const hybridProps = resolveBrandsHybridSpecialty(hybrid);
  const invertersProps = resolveBrandsInvertersSlider(inverters);
  const criteriaProps = resolveBrandsCriteriaList(criteria);
  const specsTableProps = resolveBrandsSpecsTable(specsTable);
  const faqProps = resolveSharedFaq(faq);
  const formProps = resolveSharedFormSection(form);
  const ctaBannerProps = resolveSharedCtaBanner(ctaBanner);

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

      {faqProps && (
        <FAQ
          topTitle={faqProps.title}
          title={faqProps.sectionTitle}
          listTitle={faqProps.listTitle}
          image={faqProps.image?.src ?? undefined}
          items={faqProps.items}
        />
      )}

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

export default SolarBrandsPage;
