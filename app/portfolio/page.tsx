import React from 'react';
import { getPortfolioPage } from '@/lib/strapi';
import { findSection } from '@/lib/strapi/section-utils';
import {
  resolvePortfolioHero,
  resolvePortfolioFilters,
  resolveSharedCtaBanner,
  resolveSharedCategorySection,
} from '@/lib/strapi/resolvers';
import type {
  PortfolioHeroData,
  PortfolioFiltersData,
  BlogCtaBannerData,
  SharedCategorySectionData,
} from '@/lib/strapi/schemas';
import PortfolioHero from '@/components/portfolio/PortfolioHero';
import PortfolioInteractive from '@/components/portfolio/PortfolioInteractive';
import CtaSection from '@/reuseables/CtaSection';
import CategorySection from '@/reuseables/CategorySection';

export const revalidate = 60;

const PortfolioPage = async () => {
  const { data } = await getPortfolioPage();
  const sections = data.sections ?? [];

  const heroSection = findSection<PortfolioHeroData>(sections, 'portfolio.hero');
  const filtersSection = findSection<PortfolioFiltersData>(sections, 'portfolio.filters');
  const categorySection = findSection<SharedCategorySectionData>(sections, 'shared.category-section');
  const ctaSection = findSection<BlogCtaBannerData>(sections, 'shared.cta-banner');

  const heroProps = resolvePortfolioHero(heroSection);
  const filtersProps = resolvePortfolioFilters(filtersSection);
  const categorySectionProps = resolveSharedCategorySection(categorySection);
  const ctaProps = resolveSharedCtaBanner(ctaSection);

  const filterOptions = filtersProps?.filterGroups.flatMap((g) => g.options) ?? [];
  const cards = (filtersProps?.cards ?? []).map((c) => ({
    title: c.title,
    description: c.description,
    image: c.image,
    categoryKey: c.categoryKey,
  }));

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

      {filtersProps && (
        <PortfolioInteractive
          filters={filterOptions}
          cards={cards}
        />
      )}

      {categorySectionProps && <CategorySection resolved={categorySectionProps} />}

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
