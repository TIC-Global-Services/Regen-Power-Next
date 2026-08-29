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
  resolveSharedEditorialSection,
  resolveSharedFaq,
  resolveSharedFormSection,
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
  CommercialSystemsStatsCardGridData,
  SharedEditorialSectionData,
  SharedFaqData,
  SharedFormSectionData,
} from '@/lib/strapi/schemas';
import OffGridHero from '@/components/off-grid/OffGridHero';
import SolutionCardGrid from '@/reuseables/solutiongrid'
import StatsCardGrid from '@/reuseables/StatsCardGrid';
import SolutionsPortfolio, { type PortfolioCard } from '@/reuseables/SolutionsPortfolio';
import ThreeSolutionsSection from '@/components/off-grid/ThreeSolutionsSection';
import IconCardGrid from '@/reuseables/IconCardGrid';
import HybridGenDetailSection from '@/components/off-grid/HybridGenDetailSection';
import EditorialTextSection from '@/reuseables/EditorialTextSection';
import WorldMap, { type MapMarker } from '@/reuseables/WorldMap';

/**
 * Real-world coordinates per CMS marker name — mapped the same way as the
 * contact page's LocationMap: WorldMap projects lat/lng through the map
 * image's calibrated bounds, so pins land geographically exact instead of
 * relying on hand-tuned top/left percentages.
 */
const MARKER_COORDS: Record<
    string,
    { lat: number; lng: number; labelPosition?: MapMarker['labelPosition'] }
> = {
    india: { lat: 20.5937, lng: 78.9629 },
    maldives: { lat: 3.2028, lng: 73.2207, labelPosition: 'left' }, // right label collides with Sri Lanka
    'sri lanka': { lat: 5, lng: 80.7718 }, 
    vietnam: { lat: 14.0583, lng: 108.2772 },
    singapore: { lat: 1.3521, lng: 103.8198, labelPosition: 'bottom' }, // tight SE-Asia cluster
    indonesia: { lat: -0.7893, lng: 113.9213 },
    australia: { lat: -25.2744, lng: 133.7751 },
};

/** Attach coordinates to any CMS marker whose name matches the table above. */
const withCoordinates = (markers: MapMarker[]): MapMarker[] =>
    markers.map((m) => {
        const coords = MARKER_COORDS[m.name?.trim().toLowerCase() ?? ''];
        return coords ? { ...m, ...coords } : m;
    });
import MicrogridSpecTable from '@/components/off-grid/MicrogridSpecTable';
import AcquaSmartSection from '@/components/off-grid/AcquaSmartSection';
import OffGridStory from '@/components/off-grid/OffGridStory';
import OverlayCardGrid from '@/reuseables/OverlayCardGrid';
import UnifiedFormSection from '@/reuseables/UnifiedFormSection';
import FAQ from '@/reuseables/faq';
import getValidMediaSrc from '@/utils/getValidsrc';

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
  const formProps = resolveSharedFormSection(findSection<SharedFormSectionData>(sections, 'shared.form-section'));

  const validBackgroundImage = await getValidMediaSrc(
    hero?.backgroundImage ?? '',
    '/off-grid-solution_banner.png'
  )
  const statscardBackgroundImage = await getValidMediaSrc(
    stats?.cardBackground ?? '',
    '/product_review_bg.png'
  )

  return (
    <div className="bg-white min-h-screen text-black">
      <OffGridHero
        subtitle={hero?.subtitle}
        mainTitle={hero?.mainTitle}
        description={hero?.description}
        ctaText={hero?.ctaText}
        ctaLink={hero?.ctaLink}
        backgroundImage={validBackgroundImage}
      />

      {stats && (
        <StatsCardGrid
          subtitle={stats.subtitle}
          title={stats.title}
          description={stats.description}
          cardBackground={statscardBackgroundImage}
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
          mobileScroll
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
        <SolutionCardGrid
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
          mobileLarge
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
          markers={withCoordinates(worldMap.markers)}
          titleColor="black"
          focusMarkers
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
        <FAQ
          topTitle={faq.title}
          title={faq.sectionTitle}
          listTitle={faq.listTitle}
          image={faq.image?.src ?? undefined}
          items={faq.items}
          defaultOpenIndex={1}
        />
      )}

      <UnifiedFormSection
        resolved={formProps}
        title={formProps?.title}
        description={formProps?.description}
        video={formProps?.videoSrc}
        image={formProps?.imageSrc}
      />
    </div>
  );
};

export default OffGridSolutionsPage;
