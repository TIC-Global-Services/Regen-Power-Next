import React from 'react';
import { getBlogPage } from '@/lib/strapi';
import { findSection } from '@/lib/strapi/section-utils';
import {
  resolveBlogHero,
  resolveBlogCategoryFilter,
  resolveSharedCtaBanner,
} from '@/lib/strapi/resolvers';
import type {
  BlogHeroData,
  BlogCategoryFilterData,
  BlogCtaBannerData,
} from '@/lib/strapi/schemas';
import BlogHero from '@/components/blog/BlogHero';
import BlogGrid from '@/components/blog/BlogGrid';
import GetSolar from '@/reuseables/getsolar';

export const revalidate = 60;

const BlogPage = async () => {
  const { data } = await getBlogPage();
  const sections = data.sections ?? [];

  const hero = findSection<BlogHeroData>(sections, 'blog.hero');
  const categoryFilter = findSection<BlogCategoryFilterData>(sections, 'blog.category-filter');
  const ctaBanner = findSection<BlogCtaBannerData>(sections, 'shared.cta-banner');

  const heroProps = resolveBlogHero(hero);
  const gridProps = resolveBlogCategoryFilter(categoryFilter);
  const ctaBannerProps = resolveSharedCtaBanner(ctaBanner);

  return (
    <div className="bg-white min-h-screen text-black">
      {heroProps && (
        <BlogHero
          subtitle={heroProps.subtitle}
          mainTitle={heroProps.mainTitle}
          description={heroProps.description}
          ctaText={heroProps.ctaText}
          ctaLink={heroProps.ctaLink}
          backgroundImage={heroProps.backgroundImage}
        />
      )}

      {gridProps && (
        <BlogGrid
          categories={gridProps.categories}
          defaultCategory={gridProps.defaultCategory}
          cards={gridProps.cards}
        />
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

export default BlogPage;