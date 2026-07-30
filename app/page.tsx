import React from "react";
import HeroSection from "../components/home/Hero";
import AwardAndRecognations from "@/components/home/awardandrecognations";
import WhyChooseUs from "@/components/home/whychooseus";
import Expertise from "@/components/home/expertise";
import Partners from "@/components/home/partners";
import ZeroInterestFinancing from "@/components/home/zerointrestfinancing";
import FeatureExplorer from "@/reuseables/FeatureExplorer";
import FeatureCardGrid from "@/reuseables/FeatureCardGrid";
import Craftsmanship from "@/components/home/craftmanship";
import RealStories from "@/components/home/realStories";
import BatteryQuote from "@/components/home/batteryQuote";
import { getHomePage } from '@/lib/strapi';
import { findSections, findSection } from '@/lib/strapi/section-utils';
import {
  resolveHomeHero,
  resolveHomeAwards,
  resolveHomeWhyChooseUs,
  resolveHomeExpertise,
  resolveHomeSolarAndStorage,
  resolveHomePartnersAndMembership,
  resolveHomeThreeWaysToPay,
  resolveHomeCraftsmanship,
  resolveHomeRealStories,
  resolveHomeSmartSolar,
  resolveHomeBatteryQuote,
} from '@/lib/strapi/resolvers';
import type {
  HomeHeroData,
  HomeAwardsData,
  HomeWhyChooseUsData,
  HomeExpertiseData,
  HomeSolarAndStorageData,
  HomePartnersAndMembershipData,
  HomeThreeWaysToPayData,
  HomeCraftsmanshipData,
  HomeRealStoriesData,
  HomeSmartSolarData,
  HomeBatteryQuoteData,
} from '@/lib/strapi/schemas';

export const revalidate = 60;

export default async function Home() {
  const { data: pageData } = await getHomePage();
  const sections = pageData.data ?? pageData.sections ?? [];

  const hero = resolveHomeHero(findSection<HomeHeroData>(sections, "home.hero"));
  const awards = resolveHomeAwards(findSection<HomeAwardsData>(sections, "home.awards"));
  const whyChooseUs = resolveHomeWhyChooseUs(findSection<HomeWhyChooseUsData>(sections, "home.whychooseus"));
  const expertise = resolveHomeExpertise(findSection<HomeExpertiseData>(sections, "home.expertise"));
  const solarAndStorage = resolveHomeSolarAndStorage(findSection<HomeSolarAndStorageData>(sections, "home.solarandstorage"));
  const partners = resolveHomePartnersAndMembership(findSection<HomePartnersAndMembershipData>(sections, "home.patnersandmembership"));
  const threeWaysToPay = resolveHomeThreeWaysToPay(findSection<HomeThreeWaysToPayData>(sections, "home.threewaystopay"));
  const craftsmanship = resolveHomeCraftsmanship(findSection<HomeCraftsmanshipData>(sections, "home.craftmanship"));
  const realStories = resolveHomeRealStories(findSection<HomeRealStoriesData>(sections, "home.real-stories"));
  const smartSolar = resolveHomeSmartSolar(findSection<HomeSmartSolarData>(sections, "home.smartsolar"));
  const batteryQuote = resolveHomeBatteryQuote(findSection<HomeBatteryQuoteData>(sections, "home.battery-quote"));

  return (
    <div>
      {hero && <HeroSection data={hero} />}
      {awards && <AwardAndRecognations data={awards} />}
      {whyChooseUs && <WhyChooseUs data={whyChooseUs} />}
      {expertise && <Expertise data={expertise} />}
      {solarAndStorage && (
        <FeatureExplorer
          titleNormal={solarAndStorage.titleNormal}
          titleAccent={solarAndStorage.titleAccent}
          mediaSrc={solarAndStorage.mediaSrc}
          features={solarAndStorage.features}
        />
      )}
      {partners && <Partners data={partners} />}
      {threeWaysToPay && <ZeroInterestFinancing data={threeWaysToPay} />}
      {craftsmanship && <Craftsmanship data={craftsmanship} />}
      {realStories && <RealStories data={realStories} />}
      {smartSolar && (
        <FeatureCardGrid
          topSubtitle={smartSolar.topSubtitle}
          title={smartSolar.title}
          cards={smartSolar.cards}
        />
      )}
      {batteryQuote && <BatteryQuote data={batteryQuote} />}
    </div>
  );
}
