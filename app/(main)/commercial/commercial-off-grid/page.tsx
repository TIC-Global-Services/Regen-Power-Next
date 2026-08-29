import React from "react";
import { getCommercialOffGridPage } from "@/lib/strapi";
import { findSection } from "@/lib/strapi/section-utils";
import {
  resolveCommercialOffGridHero,
  resolveCommercialOffGridSolutionsPortfolio,
  resolveSharedEditorialSection,
  resolveSharedCtaBanner,
} from "@/lib/strapi/resolvers";
import { resolveSharedFormSection } from "@/lib/strapi/resolvers/shared";
import type {
  CommercialOffGridHeroData,
  SharedEditorialSectionData,
  CommercialOffGridSolutionsPortfolioData,
  SharedCtaBannerData,
  SharedFormSectionData,
} from "@/lib/strapi/schemas";

import HeroSection from "@/components/commercial/off-grid/HeroSection";
import EditorialSection from "@/components/commercial/off-grid/EditorialSectionSection";
import SolutionsPortfolioSection from "@/components/commercial/off-grid/SolutionsPortfolioSection";
import CtaBannerSection from "@/components/commercial/off-grid/CtaBannerSection";
import UnifiedFormSection from "@/reuseables/UnifiedFormSection";

export const revalidate = 60;

export default async function CommercialOffGridPage() {
  const { data } = await getCommercialOffGridPage();
  const sections = data.sections ?? [];

  const hero = findSection<CommercialOffGridHeroData>(sections, "commercial-off-grid.hero");
  const editorial = findSection<SharedEditorialSectionData>(sections, "shared.editorial-section");
  const portfolio = findSection<CommercialOffGridSolutionsPortfolioData>(sections, "commercial-off-grid.solutions-portfolio");
  const formSection = findSection<SharedFormSectionData>(sections, "shared.form-section");
  const ctaBanner = findSection<SharedCtaBannerData>(sections, "shared.cta-banner");

  const heroProps = resolveCommercialOffGridHero(hero);
  const editorialProps = resolveSharedEditorialSection(editorial);
  const portfolioProps = resolveCommercialOffGridSolutionsPortfolio(portfolio);
  const formProps = resolveSharedFormSection(formSection);
  const ctaBannerProps = resolveSharedCtaBanner(ctaBanner);

  return (
    <div className="bg-white min-h-screen text-black">
      {heroProps && <HeroSection resolved={heroProps} />}

      {editorialProps && <EditorialSection resolved={editorialProps} />}

      {portfolioProps && <SolutionsPortfolioSection resolved={portfolioProps} />}

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