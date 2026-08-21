import React from 'react';
import { getPressMediaPage, getPressArticles } from '@/lib/strapi';
import { strapiImageData } from '@/lib/strapi/media';
import { findSection } from '@/lib/strapi/section-utils';
import {
  resolvePressMediaHero,
  resolvePressMediaLatestNewsSection,
  resolvePressArticles,
  resolveSharedCtaBanner,
  resolveSharedCategorySection,
} from '@/lib/strapi/resolvers';
import type {
  PressMediaHeroData,
  PressMediaLatestNewsSectionData,
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

/** How many articles the "Latest News" strip shows (desktop grid is 3 columns). */
const LATEST_NEWS_COUNT = 3;

const PressMediaPage = async () => {
  const [{ data }, { data: articles }] = await Promise.all([
    getPressMediaPage(),
    getPressArticles(),
  ]);
  const sections = data.sections ?? [];

  const heroSection = findSection<PressMediaHeroData>(sections, 'press-and-media.hero');
  const latestNewsSection = findSection<PressMediaLatestNewsSectionData>(sections, 'press-and-media.latest-news-section');
  const categorySection = findSection<SharedCategorySectionData>(sections, 'shared.category-section');
  const ctaSection = findSection<BlogCtaBannerData>(sections, 'shared.cta-banner');

  const heroProps = resolvePressMediaHero(heroSection);
  const categorySectionProps = resolveSharedCategorySection(categorySection);
  const ctaProps = resolveSharedCtaBanner(ctaSection);

  /* Latest-news heading labels stay CMS-editable; the articles themselves are dynamic. */
  const latestNewsLabels = resolvePressMediaLatestNewsSection(latestNewsSection);

  /*
   * Dynamic split of the press-article collection (already sorted publishedAt:desc):
   *   [0]            → Featured Article
   *   [1..4)         → Latest News strip
   *   [4..]          → News grid (filterable + paginated)
   */
  const published = Array.isArray(articles) ? articles : [];
  const [featured, ...rest] = published;
  const latestItemsRaw = rest.slice(0, LATEST_NEWS_COUNT);
  const gridArticles = rest.slice(LATEST_NEWS_COUNT);

  const featuredProps = featured
    ? {
        image: (featured.image && strapiImageData(featured.image)?.src) || '/FeaturedArticle_fallback.png',
        title: featured.title ?? '',
        description: featured.description ?? '',
        href: featured.slug ? `/press-media/${featured.slug}` : '#',
      }
    : null;

  const latestNewsItems = latestItemsRaw.map((a) => ({
    title: a.title ?? '',
    description: a.description ?? '',
    image: (a.image && strapiImageData(a.image)?.src) || '/fallback.png',
    href: a.slug ? `/press-media/${a.slug}` : '#',
  }));

  const newsProps = resolvePressArticles(gridArticles);

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

      {latestNewsItems.length > 0 && (
        <LatestNews
          subtitle={latestNewsLabels?.subtitle || 'Latest'}
          title={latestNewsLabels?.title || 'News'}
          items={latestNewsItems}
        />
      )}

      {newsProps && (
        <NewsGrid cards={newsProps.cards} />
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
