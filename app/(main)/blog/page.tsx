import React from 'react';
import { getBlogPage, getBlogArticles } from '@/lib/strapi';
import { findSection } from '@/lib/strapi/section-utils';
import {
  resolveBlogHero,
  resolveBlogArticles,
  resolveSharedCtaBanner,
  resolveSharedCategorySection,
} from '@/lib/strapi/resolvers';
import type {
  BlogHeroData,
  BlogCtaBannerData,
  SharedCategorySectionData,
} from '@/lib/strapi/schemas';
import BlogHero from '@/components/blog/BlogHero';
import BlogGrid from '@/components/blog/BlogGrid';
import QuoteSection from "@/reuseables/QuoteSection";
import GetSolar from '@/reuseables/getsolar';
import CategorySection from '@/reuseables/CategorySection';

export const revalidate = 60;

const BlogPage = async () => {
  const [{ data }, { data: articles }] = await Promise.all([
    getBlogPage(),
    getBlogArticles(),
  ]);
  const sections = data.sections ?? [];

  const hero = findSection<BlogHeroData>(sections, 'blog.hero');
  const categorySection = findSection<SharedCategorySectionData>(sections, 'shared.category-section');
  const ctaBanner = findSection<BlogCtaBannerData>(sections, 'shared.cta-banner');

  const heroProps = resolveBlogHero(hero);
  const gridProps = resolveBlogArticles(articles);
  const categorySectionProps = resolveSharedCategorySection(categorySection);
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

      {categorySectionProps && <CategorySection resolved={categorySectionProps} />}

      <QuoteSection formType="contact" video="/form-icon-video.mp4" />

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
