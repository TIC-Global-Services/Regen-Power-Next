import React from "react";
import { getCommercialOffGridPage } from "@/lib/strapi";
import { findSection, findSections } from "@/lib/strapi/section-utils";
import {
  resolveCommercialOffGridHero,
  resolveCommercialOffGridSolutionsPortfolio,
  resolveCommercialOffGridOurProcess,
  resolveCommercialSystemsStatsCardGrid,
  resolveCommercialSystemsPackagesGrid,
  resolveSharedEditorialSection,
  resolveSharedCtaBanner,
} from "@/lib/strapi/resolvers";
import { resolveSharedFormSection } from "@/lib/strapi/resolvers/shared";
import type {
  CommercialOffGridHeroData,
  SharedEditorialSectionData,
  CommercialOffGridSolutionsPortfolioData,
  CommercialOffGridOurProcessData,
  CommercialSystemsStatsCardGridData,
  CommercialSystemsPackagesGridData,
  SharedCtaBannerData,
  SharedFormSectionData,
} from "@/lib/strapi/schemas";

import HeroSection from "@/components/commercial/off-grid/HeroSection";
import EditorialSection from "@/components/commercial/off-grid/EditorialSectionSection";
import SolutionsPortfolioSection from "@/components/commercial/off-grid/SolutionsPortfolioSection";
import OurProcessSection from "@/components/commercial/off-grid/OurProcessSection";
import StatsCardGridSection from "@/components/commercial/systems/StatsCardGridSection";
import PackagesGridSection from "@/components/commercial/systems/PackagesGridSection";
import CtaBannerSection from "@/components/commercial/off-grid/CtaBannerSection";
import UnifiedFormSection from "@/reuseables/UnifiedFormSection";

export const revalidate = 60;

export default async function CommercialOffGridPage() {
  const { data } = await getCommercialOffGridPage();
  const sections = data.sections ?? [];

  const hero = findSection<CommercialOffGridHeroData>(sections, "commercial-off-grid.hero");
  const statsCardGrid = findSection<CommercialSystemsStatsCardGridData>(sections, "commercial-systems.stats-card-grid");
  const packagesGrids = findSections<CommercialSystemsPackagesGridData>(sections, "commercial-systems.packages-grid");
  const editorial = findSection<SharedEditorialSectionData>(sections, "shared.editorial-section");
  const portfolios = findSections<CommercialOffGridSolutionsPortfolioData>(sections, "commercial-off-grid.solutions-portfolio");
  const ourProcess = findSection<CommercialOffGridOurProcessData>(sections, "commercial-off-grid.our-process");
  const formSection = findSection<SharedFormSectionData>(sections, "shared.form-section");
  const ctaBanner = findSection<SharedCtaBannerData>(sections, "shared.cta-banner");

  const heroProps = resolveCommercialOffGridHero(hero);
  const statsCardGridProps = resolveCommercialSystemsStatsCardGrid(statsCardGrid);
  const packagesGridPropsList = packagesGrids
    .map((p) => resolveCommercialSystemsPackagesGrid(p))
    .filter((p): p is NonNullable<typeof p> => p !== null);
  const editorialProps = resolveSharedEditorialSection(editorial);
  const portfolioPropsList = portfolios
    .map((p) => resolveCommercialOffGridSolutionsPortfolio(p))
    .filter((p): p is NonNullable<typeof p> => p !== null);
  const ourProcessProps = resolveCommercialOffGridOurProcess(ourProcess);
  const formProps = resolveSharedFormSection(formSection);
  const ctaBannerProps = resolveSharedCtaBanner(ctaBanner);

  return (
    <div className="bg-white min-h-screen text-black">
      {heroProps && <HeroSection resolved={heroProps} />}


      {editorialProps && <EditorialSection resolved={editorialProps} />}
      {statsCardGridProps && <StatsCardGridSection resolved={statsCardGridProps} />}

      {packagesGridPropsList[0] && <PackagesGridSection resolved={packagesGridPropsList[0]} />}

      {portfolioPropsList.map((p, idx) => (
        <SolutionsPortfolioSection key={idx} resolved={p} />
      ))}

      {packagesGridPropsList.slice(1).map((p, idx) => (
        <PackagesGridSection key={idx} resolved={p} />
      ))}

      {ourProcessProps && <OurProcessSection resolved={ourProcessProps} />}

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