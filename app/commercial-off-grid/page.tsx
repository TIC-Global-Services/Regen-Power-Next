import React from "react";
import { getCommercialOffGridPage } from "@/lib/strapi";
import { findSection } from "@/lib/strapi/section-utils";
import {
  resolveCommercialOffGridHero,
  resolveCommercialOffGridSolutionsPortfolio,
  resolveSharedEditorialSection,
  resolveSharedCtaBanner,
} from "@/lib/strapi/resolvers";
import type {
  CommercialOffGridHeroData,
  SharedEditorialSectionData,
  CommercialOffGridSolutionsPortfolioData,
  SharedCtaBannerData,
} from "@/lib/strapi/schemas";

import HeroSection from "@/components/commercial/off-grid/HeroSection";
import EditorialSection from "@/components/commercial/off-grid/EditorialSectionSection";
import SolutionsPortfolioSection from "@/components/commercial/off-grid/SolutionsPortfolioSection";
import CtaBannerSection from "@/components/commercial/off-grid/CtaBannerSection";

export const revalidate = 60;

export default async function CommercialOffGridPage() {
  const { data } = await getCommercialOffGridPage();
  const sections = data.sections ?? [];

  const hero = findSection<CommercialOffGridHeroData>(sections, "commercial-off-grid.hero");
  const editorial = findSection<SharedEditorialSectionData>(sections, "shared.editorial-section");
  const portfolio = findSection<CommercialOffGridSolutionsPortfolioData>(sections, "commercial-off-grid.solutions-portfolio");
  const ctaBanner = findSection<SharedCtaBannerData>(sections, "shared.cta-banner");

  const heroProps = resolveCommercialOffGridHero(hero);
  const editorialProps = resolveSharedEditorialSection(editorial);
  const portfolioProps = resolveCommercialOffGridSolutionsPortfolio(portfolio);
  const ctaBannerProps = resolveSharedCtaBanner(ctaBanner);
  console.log("heroPropsheroProps",heroProps);

  return (
    <div className="bg-white min-h-screen text-black">
      {heroProps && <HeroSection resolved={heroProps} />}

      {editorialProps && <EditorialSection resolved={editorialProps} />}

      {portfolioProps && <SolutionsPortfolioSection resolved={portfolioProps} />}

      {ctaBannerProps && <CtaBannerSection resolved={ctaBannerProps} />}
    </div>
  );
}