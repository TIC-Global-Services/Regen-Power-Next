import React from "react";
import { getCommercialOffGridPage } from "@/lib/strapi";
import { findSection, findSections } from "@/lib/strapi/section-utils";
import {
  resolveCommercialOffGridHero,
  resolveCommercialOffGridSolutionsPortfolio,
  resolveCommercialOffGridWhyRegen,
  resolveCommercialSystemsPackagesGrid,
  resolveCommercialOffGridCompetitorAnalysis,
  resolveSharedCtaBanner,
} from "@/lib/strapi/resolvers";
import { resolveSharedFormSection } from "@/lib/strapi/resolvers/shared";
import type {
  CommercialOffGridHeroData,
  CommercialOffGridSolutionsPortfolioData,
  CommercialOffGridWhyRegenData,
  CommercialSystemsPackagesGridData,
  CommercialOffGridCompetitorAnalysisData,
  SharedCtaBannerData,
  SharedFormSectionData,
} from "@/lib/strapi/schemas";

import HeroSection from "@/components/commercial/off-grid/HeroSection";
import SolutionsPortfolioSection from "@/components/commercial/off-grid/SolutionsPortfolioSection";
import WhereMarket from "@/components/commercial/off-grid/WhereMarket";
import PackagesGridSection from "@/components/commercial/systems/PackagesGridSection";
import CompetitorAnalysisTable from "@/components/commercial/off-grid/CompetitorAnalysisTable";
import CtaBannerSection from "@/components/commercial/off-grid/CtaBannerSection";
import UnifiedFormSection from "@/reuseables/UnifiedFormSection";

export const revalidate = 60;

export default async function CommercialOffGridPage() {
  const { data } = await getCommercialOffGridPage();
  const sections = data.sections ?? [];

  const hero = findSection<CommercialOffGridHeroData>(sections, "commercial-off-grid.hero");
  const packagesGrids = findSections<CommercialSystemsPackagesGridData>(sections, "commercial-systems.packages-grid");
  const portfolios = findSections<CommercialOffGridSolutionsPortfolioData>(sections, "commercial-off-grid.solutions-portfolio");
  const whyRegen = findSection<CommercialOffGridWhyRegenData>(sections, "commercial-off-grid.why-regen");
  const competitorAnalysis = findSection<CommercialOffGridCompetitorAnalysisData>(sections, "commercial-off-grid.competitor-analysis");
  const formSection = findSection<SharedFormSectionData>(sections, "shared.form-section");
  const ctaBanner = findSection<SharedCtaBannerData>(sections, "shared.cta-banner");

  const heroProps = resolveCommercialOffGridHero(hero);
  const packagesGridPropsList = packagesGrids
    .map((p) => resolveCommercialSystemsPackagesGrid(p))
    .filter((p): p is NonNullable<typeof p> => p !== null);
  const portfolioPropsList = portfolios
    .map((p) => resolveCommercialOffGridSolutionsPortfolio(p))
    .filter((p): p is NonNullable<typeof p> => p !== null);
  const whyRegenProps = resolveCommercialOffGridWhyRegen(whyRegen);
  const competitorAnalysisProps = resolveCommercialOffGridCompetitorAnalysis(competitorAnalysis);
  const formProps = resolveSharedFormSection(formSection);
  const ctaBannerProps = resolveSharedCtaBanner(ctaBanner);

  return (
    <div className="bg-white min-h-screen text-black">
      {heroProps && <HeroSection resolved={heroProps} />}

      {whyRegenProps && <WhereMarket resolved={whyRegenProps} />}

      {packagesGridPropsList[0] && <PackagesGridSection resolved={packagesGridPropsList[0]} />}

      {competitorAnalysisProps && (
        <CompetitorAnalysisTable
          subtitle={competitorAnalysisProps.subtitle}
          title={competitorAnalysisProps.title}
          description={competitorAnalysisProps.description}
          rows={competitorAnalysisProps.rows}
        />
      )}

      {portfolioPropsList.map((p, idx) => (
        <SolutionsPortfolioSection key={idx} resolved={p} />
      ))}






      <UnifiedFormSection
        resolved={formProps}
        video={formProps?.videoSrc ?? "/form-icon-video.mp4"}
        image={formProps?.imageSrc}
        title={formProps?.title ?? undefined}
        description={formProps?.description ?? undefined}
      />

      {ctaBannerProps && (
        <div id="quote-form">
          <CtaBannerSection resolved={ctaBannerProps} />
        </div>
      )}
    </div>
  );
}