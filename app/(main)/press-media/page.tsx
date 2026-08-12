import React from 'react';
import { getPressMediaPage } from '@/lib/strapi';
import { findSection } from '@/lib/strapi/section-utils';
import {
  resolvePressMediaHero,
  resolvePressMediaFeaturedArticle,
  resolvePressMediaLatestNewsSection,
  resolvePressMediaNewsSection,
  resolveSharedCtaBanner,
  resolveSharedCategorySection,
} from '@/lib/strapi/resolvers';
import type {
  PressMediaHeroData,
  PressMediaFeaturedArticleData,
  PressMediaLatestNewsSectionData,
  PressMediaNewsSectionData,
  BlogCtaBannerData,
  SharedCategorySectionData,
} from '@/lib/strapi/schemas';
import PressHero from '@/components/press-and-media/PressHero';
import FeaturedArticle from '@/components/press-and-media/FeaturedArticle';
import LatestNews from '@/components/press-and-media/LatestNews';
import NewsGrid from '@/components/press-and-media/NewsGrid';
import GetSolar from '@/reuseables/getsolar';
import CategorySection from '@/reuseables/CategorySection';

export const revalidate = 60;

const PressMediaPage = async () => {
  const { data } = await getPressMediaPage();
  const sections = data.sections ?? [];

  const heroSection = findSection<PressMediaHeroData>(sections, 'press-and-media.hero');
  const featuredSection = findSection<PressMediaFeaturedArticleData>(sections, 'press-and-media.featured-article');
  const latestNewsSection = findSection<PressMediaLatestNewsSectionData>(sections, 'press-and-media.latest-news-section');
  const newsSection = findSection<PressMediaNewsSectionData>(sections, 'press-and-media.news-section');
  const categorySection = findSection<SharedCategorySectionData>(sections, 'shared.category-section');
  const ctaSection = findSection<BlogCtaBannerData>(sections, 'shared.cta-banner');

  const heroProps = resolvePressMediaHero(heroSection);
  const featuredProps = resolvePressMediaFeaturedArticle(featuredSection);
  const latestNewsProps = resolvePressMediaLatestNewsSection(latestNewsSection);
  const newsProps = resolvePressMediaNewsSection(newsSection);
  const categorySectionProps = resolveSharedCategorySection(categorySection);
  const ctaProps = resolveSharedCtaBanner(ctaSection);

  return (
    <div className="bg-white min-h-screen text-black">
      {heroProps && (
        <PressHero
          subtitle={heroProps.subtitle}
          mainTitle={heroProps.mainTitle}
          description={heroProps.description}
          ctaText={heroProps.ctaText}
          ctaLink={heroProps.ctaLink}
          backgroundImage={heroProps.backgroundImage || '/press_media_hero.png'}
        />
      )}

      {featuredProps && (
        <FeaturedArticle
          image={featuredProps.image || '/FeaturedArticle_fallback.png'}
          title={featuredProps.title}
          description={featuredProps.description}
          href={featuredProps.href}
          showReadMore={true}
        />
      )}

      {latestNewsProps && (
        <LatestNews
          subtitle={latestNewsProps.subtitle}
          title={latestNewsProps.title}
          items={latestNewsProps.items}
        />
      )}

      {newsProps && (
        <NewsGrid
          subtitle={newsProps.subtitle}
          title={newsProps.title}
          categories={newsProps.categories}
          defaultCategory={newsProps.defaultCategory}
          cards={newsProps.cards}
        />
      )}

      {categorySectionProps && <CategorySection resolved={categorySectionProps} />}

      {ctaProps && (
        <GetSolar
          subtitle={ctaProps.subtitle}
          mainTitle={ctaProps.mainTitle}
          description={ctaProps.description}
          buttonText={ctaProps.buttonText}
          buttonHref={ctaProps.buttonHref}
          bgImage={ctaProps.bgImage || undefined}
        />
      )}
    </div>
  );
};

export default PressMediaPage;
