import React from 'react';
import { getOffGridSolutionsPage } from '@/lib/strapi';
import { findSection, findSections } from '@/lib/strapi/section-utils';
import {
  resolveOffGridHero,
  resolveStatsCardGrid,
  resolveSolutionsPortfolio,
  resolveThreeSolutionsSection,
  resolveIconCardGrid,
  resolveHybridGenDetail,
  resolveWorldMap,
  resolveMicrogridSpecTable,
  resolveAcquaSmartSection,
  resolveOffGridStory,
  resolveOverlayCardGrid,
  resolveOffGridForm,
  resolveSharedEditorialSection,
  resolveSharedFaq,
} from '@/lib/strapi/resolvers';
import type {
  OffGridHeroData,
  SolutionsPortfolioData,
  ThreeSolutionsSectionData,
  IconCardGridData,
  HybridGenDetailData,
  WorldMapData,
  MicrogridSpecTableData,
  AcquaSmartSectionData,
  OffGridStoryData,
  OverlayCardGridData,
  OffGridFormData,
  CommercialSystemsStatsCardGridData,
  SharedEditorialSectionData,
  SharedFaqData,
} from '@/lib/strapi/schemas';
import OffGridHero from '@/components/off-grid/OffGridHero';
import StatsCardGrid from '@/reuseables/StatsCardGrid';
import SolutionsPortfolio, { type PortfolioCard } from '@/reuseables/SolutionsPortfolio';
import ThreeSolutionsSection from '@/components/off-grid/ThreeSolutionsSection';
import IconCardGrid from '@/reuseables/IconCardGrid';
import HybridGenDetailSection from '@/components/off-grid/HybridGenDetailSection';
import EditorialTextSection from '@/reuseables/EditorialTextSection';
import WorldMap from '@/reuseables/WorldMap';
import MicrogridSpecTable from '@/components/off-grid/MicrogridSpecTable';
import AcquaSmartSection from '@/components/off-grid/AcquaSmartSection';
import OffGridStory from '@/components/off-grid/OffGridStory';
import OverlayCardGrid from '@/reuseables/OverlayCardGrid';
import OffGridForm from '@/components/off-grid/OffGridForm';
import FAQ from '@/reuseables/faq';

export const revalidate = 60;

const OffGridSolutionsPage = async () => {
  const { data } = await getOffGridSolutionsPage();
  const sections = data.sections ?? [];

  const hero = resolveOffGridHero(findSection<OffGridHeroData>(sections, 'off-grid.hero'));
  const stats = resolveStatsCardGrid(findSection<CommercialSystemsStatsCardGridData>(sections, 'commercial-systems.stats-card-grid'));
  const portfolio = resolveSolutionsPortfolio(findSection<SolutionsPortfolioData>(sections, 'off-grid.solutions-portfolio'));
  const solutions = resolveThreeSolutionsSection(findSection<ThreeSolutionsSectionData>(sections, 'off-grid.three-solutions-section'));

  const iconGrids = findSections<IconCardGridData>(sections, 'off-grid.icon-card-grid');
  const iconGrid1 = resolveIconCardGrid(iconGrids[0]);
  const iconGrid2 = resolveIconCardGrid(iconGrids[1]);

  const hybridGen = resolveHybridGenDetail(findSection<HybridGenDetailData>(sections, 'off-grid.hybrid-gen-detail'));

  const editorials = findSections<SharedEditorialSectionData>(sections, 'shared.editorial-section');
  const editorial1 = resolveSharedEditorialSection(editorials[0]);
  const editorial2 = resolveSharedEditorialSection(editorials[1]);

  const specTable = resolveMicrogridSpecTable(findSection<MicrogridSpecTableData>(sections, 'off-grid.microgrid-spec-table'));
  const worldMap = resolveWorldMap(findSection<WorldMapData>(sections, 'off-grid.world-map'));
  const acquaSmart = resolveAcquaSmartSection(findSection<AcquaSmartSectionData>(sections, 'off-grid.acqua-smart-section'));
  const story = resolveOffGridStory(findSection<OffGridStoryData>(sections, 'off-grid.off-grid-story'));
  const overlayGrid = resolveOverlayCardGrid(findSection<OverlayCardGridData>(sections, 'off-grid.overlay-card-grid'));
  const faq = resolveSharedFaq(findSection<SharedFaqData>(sections, 'shared.faq'));
  const form = resolveOffGridForm(findSection<OffGridFormData>(sections, 'off-grid.off-grid-form'));

  return (
    <div className="bg-white min-h-screen text-black">
      <OffGridHero
        subtitle={hero?.subtitle}
        mainTitle={hero?.mainTitle}
        description={hero?.description}
        ctaText={hero?.ctaText}
        ctaLink={hero?.ctaLink}
        backgroundImage={hero?.backgroundImage}
      />

      {stats && (
        <StatsCardGrid
          subtitle={stats.subtitle}
          title={stats.title}
          description={stats.description}
          cardBackground={stats.cardBackground}
          stats={stats.stats}
        />
      )}

      {portfolio && (
        <SolutionsPortfolio
          subtitle={portfolio.subtitle}
          title={portfolio.title}
          description={portfolio.description}
          cards={portfolio.cards as PortfolioCard[]}
          layout={6}
        />
      )}

      {solutions && (
        <ThreeSolutionsSection
          subtitle={solutions.subtitle}
          title={solutions.title}
          description={solutions.description}
          solutions={solutions.solutions}
        />
      )}

      {iconGrid1 && (
        <IconCardGrid
          subtitle={iconGrid1.subtitle}
          title={iconGrid1.title}
          description={iconGrid1.description}
          cards={iconGrid1.cards as any}
          layout={iconGrid1.layout as any}
        />
      )}

      {hybridGen && (
        <HybridGenDetailSection
          logo={hybridGen.logo}
          image={hybridGen.image}
          subtitle={hybridGen.subtitle}
          title={hybridGen.title}
          description={hybridGen.description}
          patentText={hybridGen.patentText}
        />
      )}

      {editorial1 && (
        <EditorialTextSection
          subtitle={editorial1.subtitle}
          title={editorial1.title}
          paragraphs={editorial1.paragraphs}
          align="left"
          revealEffect
        />
      )}

      {iconGrid2 && (
        <IconCardGrid
          cards={iconGrid2.cards as any}
          layout={iconGrid2.layout as any}
          showHeader={iconGrid2.showHeader}
        />
      )}

      {editorial2 && (
        <EditorialTextSection
          subtitle={editorial2.subtitle}
          title={editorial2.title}
          paragraphs={editorial2.paragraphs}
          align="left"
          revealEffect
        />
      )}

      {specTable && (
        <MicrogridSpecTable
          headers={specTable.headers}
          tableContent={specTable.tableContent}
        />
      )}

      {worldMap && (
        <WorldMap
          title={worldMap.title}
          markers={worldMap.markers}
          titleColor="black"
        />
      )}

      {acquaSmart && (
        <AcquaSmartSection
          subtitle={acquaSmart.subtitle}
          title={acquaSmart.title}
          description={acquaSmart.description}
          image={acquaSmart.image}
          cards={acquaSmart.cards}
        />
      )}

      {story && (
        <OffGridStory
          subtitle={story.subtitle}
          title={story.title}
          description={story.description}
          cards={story.cards}
          featuredImage={story.featuredImage}
          featuredTitle={story.featuredTitle}
          featuredDescription={story.featuredDescription}
        />
      )}

      {overlayGrid && (
        <OverlayCardGrid
          subtitle={overlayGrid.subtitle}
          title={overlayGrid.title}
          description={overlayGrid.description}
          backgroundImage={overlayGrid.backgroundImage}
          cards={overlayGrid.cards}
          cardLayout={overlayGrid.cardLayout as any}
          cardColumns={overlayGrid.cardColumns as any}
          overlayOpacity={overlayGrid.overlayOpacity}
        />
      )}

      {faq && (
        <div id="quote-form">
          <FAQ
            topTitle={faq.title}
            title={faq.sectionTitle}
            listTitle={faq.listTitle}
            image={faq.image?.src ?? undefined}
            items={faq.items}
            defaultOpenIndex={1}
          />
        </div>
      )}

      {form && (
        <OffGridForm
          subtitle={form.subtitle}
          title={form.title}
          description={form.description}
          image={form.image}
        />
      )}
    </div>
  );
};

export default OffGridSolutionsPage;
