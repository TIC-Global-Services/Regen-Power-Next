import React from 'react';
import { getPortfolioPage, getPortfolioProjects } from '@/lib/strapi';
import { findSection } from '@/lib/strapi/section-utils';
import {
  resolvePortfolioHero,
  resolvePortfolioProjects,
  resolveSharedCtaBanner,
  resolveSharedCategorySection,
} from '@/lib/strapi/resolvers';
import { resolveSharedFormSection } from '@/lib/strapi/resolvers/shared';
import type {
  PortfolioHeroData,
  BlogCtaBannerData,
  SharedCategorySectionData,
  SharedFormSectionData,
} from '@/lib/strapi/schemas';
import {
  PORTFOLIO_INDUSTRY_FILTERS,
  PORTFOLIO_SIZE_FILTERS,
  PORTFOLIO_LOCATION_FILTERS,
} from '@/utils/portfolio.model';
import { PORTFOLIO_DATA } from '@/utils/portfolio-data-';
import PortfolioHero from '@/components/portfolio/PortfolioHero';
import PortfolioInteractive from '@/components/portfolio/PortfolioInteractive';
import CtaSection from '@/reuseables/CtaSection';
import UnifiedFormSection from "@/reuseables/UnifiedFormSection";
import CategorySection from '@/reuseables/CategorySection';

export const revalidate = 60;

/* ─── Filter option mappers ─── */

const industryOptions = PORTFOLIO_INDUSTRY_FILTERS.map((f) => ({
  label: f.label,
  value: f.slug,
}));

const sizeOptions = PORTFOLIO_SIZE_FILTERS.map((f) => ({
  label: f.label,
  value: f.slug,
}));

const locationOptions = PORTFOLIO_LOCATION_FILTERS.map((f) => ({
  label: f.label,
  value: f.slug,
}));

/* ─── Page ─── */

const PortfolioPage = async () => {
  const [{ data }, { data: projects }] = await Promise.all([
    getPortfolioPage(),
    getPortfolioProjects(),
  ]);
  const sections = data.sections ?? [];

  /* Resolve Strapi sections */
  const heroSection = findSection<PortfolioHeroData>(sections, 'portfolio.hero');
  const categorySection = findSection<SharedCategorySectionData>(sections, 'shared.category-section');
  const formSection = findSection<SharedFormSectionData>(sections, 'shared.form-section');
  const ctaSection = findSection<BlogCtaBannerData>(sections, 'shared.cta-banner');

  const heroProps = resolvePortfolioHero(heroSection);
  const categorySectionProps = resolveSharedCategorySection(categorySection);
  const formProps = resolveSharedFormSection(formSection);
  const ctaProps = resolveSharedCtaBanner(ctaSection);

  /* Portfolio items — live from the portfolio-project collection, static data as fallback. */
  const portfolioItems = resolvePortfolioProjects(projects) ?? PORTFOLIO_DATA;

  return (
    <div className="bg-white min-h-screen text-black">
      {heroProps && (
        <PortfolioHero
          subtitle={heroProps.subtitle}
          mainTitle={heroProps.mainTitle}
          description={heroProps.description}
          ctaText={heroProps.ctaText}
          ctaLink={heroProps.ctaLink}
          backgroundImage={heroProps.backgroundImage}
        />
      )}

      <PortfolioInteractive
        items={portfolioItems}
        industries={industryOptions}
        systemSizes={sizeOptions}
        locations={locationOptions}
      />

      {categorySectionProps && <CategorySection resolved={categorySectionProps} />}

      <UnifiedFormSection
        resolved={formProps}
        video={formProps?.videoSrc ?? "/form-icon-video.mp4"}
        image={formProps?.imageSrc}
        title={formProps?.title ?? undefined}
        description={formProps?.description ?? undefined}
      />

      {ctaProps && (
        <CtaSection
          subtitle={ctaProps.subtitle}
          title={ctaProps.mainTitle}
          description={ctaProps.description}
          buttonText={ctaProps.buttonText}
          buttonHref={ctaProps.buttonHref}
          bgImage={ctaProps.bgImage || undefined}
        />
      )}
    </div>
  );
};

export default PortfolioPage;
