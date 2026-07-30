import React from 'react';
import { getSmartHomeBatteryPage } from '@/lib/strapi';
import { findSection } from '@/lib/strapi/section-utils';
import {
  resolveSmartHomeBatteryHero,
  resolveSmartHomeBatteryMarquee,
  resolveSmartHomeBatteryGreatFit,
  resolveSmartHomeBatterySplitSection,
  resolveSmartHomeBatteryTimeline,
  resolveSmartHomeBatteryBrandsGrid,
  resolveSmartHomeBatteryInstallBento,
  resolveSharedCtaBanner,
} from '@/lib/strapi/resolvers';
import type {
  SmartHomeBatteryHeroData,
  SmartHomeBatteryGreatFitData,
  SmartHomeBatterySplitSectionData,
  SmartHomeBatteryTimelineData,
  SmartHomeBatteryBrandsGridData,
  SmartHomeBatteryInstallBentoData,
  SharedCtaBannerData,
} from '@/lib/strapi/schemas';

import Hero from '@/components/battery/smarthome-battery-system/Hero';
import BatteryMaque from '@/components/battery/battery-storage/batteryMaque';
import GreatFit from '@/components/battery/smarthome-battery-system/greatfit';
import BatterySplitSection from '@/components/battery/smarthome-battery-system/BatterySplitSection';
import BatteryTimeline from '@/components/battery/smarthome-battery-system/BatteryTimeline';
import BatteryBrandsGrid from '@/components/battery/smarthome-battery-system/BatteryBrandsGrid';
import SmartInstallBento from '@/components/battery/smarthome-battery-system/SmartInstallBento';
import GetSolar from '@/reuseables/getsolar';

export const revalidate = 60;

export default async function SmartBatterySystemPage() {
  const { data: pageData } = await getSmartHomeBatteryPage();
  const sections = pageData.sections ?? [];

  const hero = resolveSmartHomeBatteryHero(findSection<SmartHomeBatteryHeroData>(sections, "smart-home-battery.hero"));
  const marquee = resolveSmartHomeBatteryMarquee(findSection(sections, "battery-storage.marquee"));
  const greatFit = resolveSmartHomeBatteryGreatFit(findSection<SmartHomeBatteryGreatFitData>(sections, "smart-home-battery.great-fit"));
  const splitSection = resolveSmartHomeBatterySplitSection(findSection<SmartHomeBatterySplitSectionData>(sections, "smart-home-battery.split-section"));
  const timeline = resolveSmartHomeBatteryTimeline(findSection<SmartHomeBatteryTimelineData>(sections, "smart-home-battery.timeline"));
  const brandsGrid = resolveSmartHomeBatteryBrandsGrid(findSection<SmartHomeBatteryBrandsGridData>(sections, "smart-home-battery.brands-grid"));
  const installBento = resolveSmartHomeBatteryInstallBento(findSection<SmartHomeBatteryInstallBentoData>(sections, "smart-home-battery.install-bento"));
  const cta = resolveSharedCtaBanner(findSection<SharedCtaBannerData>(sections, "shared.cta-banner"));

  return (
    <main className="w-full min-h-screen">
      {hero && <Hero data={hero} />}
      {marquee && <BatteryMaque data={marquee} />}
      {greatFit && <GreatFit data={greatFit} />}
      {splitSection && <BatterySplitSection data={splitSection} />}
      {timeline && <BatteryTimeline data={timeline} />}
      {brandsGrid && <BatteryBrandsGrid data={brandsGrid} />}
      {installBento && <SmartInstallBento data={installBento} />}
      {cta && <GetSolar subtitle={cta.subtitle} mainTitle={cta.mainTitle} description={cta.description} buttonText={cta.buttonText} />}
    </main>
  );
}
