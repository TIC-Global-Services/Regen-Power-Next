import React from 'react';
import { getResearchDevelopmentPage } from '@/lib/strapi';
import { findSection } from '@/lib/strapi/section-utils';
import {
  resolveResearchDevelopmentHero,
  resolveEnergySolutionsSection,
  resolveCoreAchievementsSection,
  resolveSharedEditorialSection,
  resolveSharedCtaBanner,
} from '@/lib/strapi/resolvers';
import type {
  ResearchDevelopmentHeroData,
  EnergySolutionsSectionData,
  CoreAchievementsSectionData,
  SharedEditorialSectionData,
  SharedCtaBannerData,
} from '@/lib/strapi/schemas';

import RDHero from '@/components/research-and-development/RDHero';
import DrivenByInnovation from '@/components/research-and-development/DrivenByInnovation';
import EnergySolutions from '@/components/research-and-development/EnergySolutions';
import CoreAchievements from '@/components/research-and-development/CoreAchievements';
import CtaSection from '@/reuseables/CtaSection';
import QuoteSection from "@/reuseables/QuoteSection";

export const revalidate = 60;

export default async function ResearchAndDevelopmentPage() {
  const { data } = await getResearchDevelopmentPage();
  const sections = data.sections ?? [];

  const hero = findSection<ResearchDevelopmentHeroData>(sections, 'research-and-development.hero');
  const editorial = findSection<SharedEditorialSectionData>(sections, 'shared.editorial-section');
  const energySolutions = findSection<EnergySolutionsSectionData>(sections, 'research-and-development.energy-solutions-section');
  const coreAchievements = findSection<CoreAchievementsSectionData>(sections, 'research-and-development.core-achievements-section');
  const ctaBanner = findSection<SharedCtaBannerData>(sections, 'shared.cta-banner');

  const heroProps = resolveResearchDevelopmentHero(hero);
  const editorialProps = resolveSharedEditorialSection(editorial);
  const energySolutionsProps = resolveEnergySolutionsSection(energySolutions);
  const coreAchievementsProps = resolveCoreAchievementsSection(coreAchievements);
  const ctaBannerProps = resolveSharedCtaBanner(ctaBanner);

  return (
    <div className="bg-white min-h-screen text-black">
      {heroProps && <RDHero resolved={heroProps} />}

      {editorialProps && <DrivenByInnovation resolved={editorialProps} />}

      {energySolutionsProps && <EnergySolutions resolved={energySolutionsProps} />}

      {coreAchievementsProps && <CoreAchievements resolved={coreAchievementsProps} />}

      <QuoteSection formType="contact" video="/form-icon-video.mp4" />

      {ctaBannerProps && (
        <CtaSection
          subtitle={ctaBannerProps.subtitle}
          title={ctaBannerProps.mainTitle}
          description={ctaBannerProps.description}
          buttonText={ctaBannerProps.buttonText}
          buttonHref={ctaBannerProps.buttonHref}
          bgImage={ctaBannerProps.bgImage}
        />
      )}
    </div>
  );
}