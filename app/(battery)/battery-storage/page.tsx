import React from 'react';
import { getBatteryStoragePage } from '@/lib/strapi';
import { findSection } from '@/lib/strapi/section-utils';
import {
  resolveBatteryStorageHero,
  resolveBatteryStorageMarquee,
  resolveBatteryStorageDebsRebate,
  resolveBatteryStorageJargon,
  resolveBatteryStorageBillImpact,
  resolveBatteryStorageRangeGrid,
  resolveBatteryStorageCapacityBlocks,
  resolveBatteryStorageGreatFit,
  resolveBatteryStorageSolarMeaning,
  resolveBatteryStorageInstallationTimeline,
  resolveBatteryStorageTeam,
  resolveBatteryStorageCustomerStories,
  resolveSharedFaq,
  resolveSharedCtaBanner,
} from '@/lib/strapi/resolvers';
import type {
  BatteryStorageHeroData,
  BatteryStorageMarqueeData,
  BatteryStorageDebsRebateData,
  BatteryStorageJargonData,
  BatteryStorageBillImpactData,
  BatteryStorageRangeGridData,
  BatteryStorageCapacityBlocksData,
  BatteryStorageGreatFitData,
  BatteryStorageSolarMeaningData,
  BatteryStorageInstallationTimelineData,
  BatteryStorageTeamData,
  BatteryStorageCustomerStoriesData,
  SharedFaqData,
  SharedCtaBannerData,
} from '@/lib/strapi/schemas';

import Hero from '@/components/battery/battery-storage/Hero';
import BatteryMaque from '@/components/battery/battery-storage/batteryMaque';
import DebsRebateBanner from '@/components/battery/battery-storage/DebsRebateBanner';
import BatteryJargon from '@/components/battery/battery-storage/BatteryJargon';
import BatteryBillImpact from '@/components/battery/battery-storage/BatteryBillImpact';
import BatteryRangeGrid from '@/components/battery/battery-storage/BatteryRangeGrid';
import BatteryCapacityBlocks from '@/components/battery/battery-storage/BatteryCapacityBlocks';
import GreatFit from '@/components/battery/smarthome-battery-system/greatfit';
import SolarBatteryMeaning from '@/components/battery/battery-storage/SolarBatteryMeaning';
import InstallationTimeline from '@/components/battery/battery-storage/InstallationTimeline';
import OneLocalTeam from '@/components/battery/battery-storage/OneLocalTeam';
import CustomerStories from '@/components/battery/battery-storage/CustomerStories';
import BatteryFAQ from '@/components/battery/battery-storage/BatteryFAQ';
import GetSolar from '@/reuseables/getsolar';

export const revalidate = 60;

export default async function BatteryStoragePage() {
  const { data: pageData } = await getBatteryStoragePage();
  const sections = pageData.sections ?? [];

  const hero = resolveBatteryStorageHero(findSection<BatteryStorageHeroData>(sections, "battery-storage.hero"));
  const marquee = resolveBatteryStorageMarquee(findSection<BatteryStorageMarqueeData>(sections, "battery-storage.marquee"));
  const debsRebate = resolveBatteryStorageDebsRebate(findSection<BatteryStorageDebsRebateData>(sections, "battery-storage.debs-rebate"));
  const jargon = resolveBatteryStorageJargon(findSection<BatteryStorageJargonData>(sections, "battery-storage.jargon"));
  const billImpact = resolveBatteryStorageBillImpact(findSection<BatteryStorageBillImpactData>(sections, "battery-storage.bill-impact"));
  const rangeGrid = resolveBatteryStorageRangeGrid(findSection<BatteryStorageRangeGridData>(sections, "battery-storage.range-grid"));
  const capacityBlocks = resolveBatteryStorageCapacityBlocks(findSection<BatteryStorageCapacityBlocksData>(sections, "battery-storage.capacity-blocks"));
  const greatFit = resolveBatteryStorageGreatFit(findSection<BatteryStorageGreatFitData>(sections, "battery-storage.great-fit"));
  const solarMeaning = resolveBatteryStorageSolarMeaning(findSection<BatteryStorageSolarMeaningData>(sections, "battery-storage.solar-meaning"));
  const timeline = resolveBatteryStorageInstallationTimeline(findSection<BatteryStorageInstallationTimelineData>(sections, "battery-storage.installation-timeline"));
  const team = resolveBatteryStorageTeam(findSection<BatteryStorageTeamData>(sections, "battery-storage.team"));
  const customerStories = resolveBatteryStorageCustomerStories(findSection<BatteryStorageCustomerStoriesData>(sections, "battery-storage.customer-stories"));
  const faq = resolveSharedFaq(findSection<SharedFaqData>(sections, "shared.faq"));
  const cta = resolveSharedCtaBanner(findSection<SharedCtaBannerData>(sections, "shared.cta-banner"));

  return (
    <main className="w-full min-h-screen">
      {hero && <Hero data={hero} />}
      {marquee && <BatteryMaque data={marquee} />}
      {debsRebate && <DebsRebateBanner data={debsRebate} />}
      {jargon && <BatteryJargon data={jargon} />}
      {billImpact && <BatteryBillImpact data={billImpact} />}
      {rangeGrid && <BatteryRangeGrid data={rangeGrid} />}
      {capacityBlocks && <BatteryCapacityBlocks data={capacityBlocks} />}
      {greatFit && <GreatFit data={greatFit} />}
      {solarMeaning && <SolarBatteryMeaning data={solarMeaning} />}
      {timeline && <InstallationTimeline data={timeline} />}
      {team && <OneLocalTeam data={team} />}
      {customerStories && <CustomerStories data={customerStories} />}
      {faq && <BatteryFAQ data={{ topTitle: faq.sectionTitle, title: faq.title, listTitle: faq.listTitle, image: faq.image?.src ?? "", items: faq.items }} />}
      {cta && <GetSolar subtitle={cta.subtitle} mainTitle={cta.mainTitle} description={cta.description} buttonText={cta.buttonText} />}
    </main>
  );
}
