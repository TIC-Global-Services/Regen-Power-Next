import React from 'react';
import { getBatteryRebatesPage } from '@/lib/strapi';
import { findSection } from '@/lib/strapi/section-utils';
import {
  resolveBatteryRebatesHero,
  resolveBatteryRebatesRebatesStackGrid,
  resolveBatteryRebatesResidentialBattery,
  resolveBatteryRebatesFederalRebate,
  resolveBatteryRebatesFinanceOption,
  resolveBatteryRebatesWhatChanges,
  resolveBatteryRebatesAreYouEligible,
  resolveBatteryRebatesWhatSigningUp,
  resolveBatteryRebatesRebateDetailSplit,
  resolveSharedFaq,
  resolveSharedCtaBanner,
} from '@/lib/strapi/resolvers';
import type {
  BatteryRebatesHeroData,
  BatteryRebatesRebatesStackGridData,
  BatteryRebatesResidentialBatteryData,
  BatteryRebatesFederalRebateData,
  BatteryRebatesFinanceOptionData,
  BatteryRebatesWhatChangesData,
  BatteryRebatesAreYouEligibleData,
  BatteryRebatesWhatSigningUpData,
  BatteryRebatesRebateDetailSplitData,
  SharedFaqData,
  SharedCtaBannerData,
} from '@/lib/strapi/schemas';

import HeroSection from '@/components/battery/government-rebates/Hero';
import RebatesStackGrid from '@/components/battery/government-rebates/RebatesStackGrid';
import ResidentialBattery from '@/components/battery/government-rebates/ResidentialBattery';
import FederalRebates from '@/components/battery/government-rebates/fedrealRebates';
import FinanceOption from '@/components/battery/government-rebates/financeOption';
import WhatChanges from '@/components/battery/government-rebates/whatchanges';
import Areyoueligible from '@/components/battery/government-rebates/areyoueligible';
import WhatSigningUp from '@/components/battery/government-rebates/whatsigningup';
import RebateDetailSplit from '@/components/battery/government-rebates/RebateDetailSplit';
import BatteryFAQ from '@/components/battery/battery-storage/BatteryFAQ';
import GetSolar from '@/reuseables/getsolar';

export const revalidate = 60;

export default async function GovernmentRebatesPage() {
  const { data: pageData } = await getBatteryRebatesPage();
  const sections = pageData.sections ?? [];

  const hero = resolveBatteryRebatesHero(findSection<BatteryRebatesHeroData>(sections, "battery-rebates.hero"));
  const rebatesStackGrid = resolveBatteryRebatesRebatesStackGrid(findSection<BatteryRebatesRebatesStackGridData>(sections, "battery-rebates.rebates-stack-grid"));
  const residentialBattery = resolveBatteryRebatesResidentialBattery(findSection<BatteryRebatesResidentialBatteryData>(sections, "battery-rebates.residential-battery"));
  const federalRebate = resolveBatteryRebatesFederalRebate(findSection<BatteryRebatesFederalRebateData>(sections, "battery-rebates.federal-rebate"));
  const financeOption = resolveBatteryRebatesFinanceOption(findSection<BatteryRebatesFinanceOptionData>(sections, "battery-rebates.finance-option"));
  const whatChanges = resolveBatteryRebatesWhatChanges(findSection<BatteryRebatesWhatChangesData>(sections, "battery-rebates.what-changes"));
  const areYouEligible = resolveBatteryRebatesAreYouEligible(findSection<BatteryRebatesAreYouEligibleData>(sections, "battery-rebates.are-you-eligible"));
  const whatSigningUp = resolveBatteryRebatesWhatSigningUp(findSection<BatteryRebatesWhatSigningUpData>(sections, "battery-rebates.what-signing-up"));
  const rebateDetailSplit = resolveBatteryRebatesRebateDetailSplit(findSection<BatteryRebatesRebateDetailSplitData>(sections, "battery-rebates.rebate-detail-split"));
  const faq = resolveSharedFaq(findSection<SharedFaqData>(sections, "shared.faq"));
  const cta = resolveSharedCtaBanner(findSection<SharedCtaBannerData>(sections, "shared.cta-banner"));

  return (
    <main className="w-full min-h-screen">
      {hero && <HeroSection data={hero} />}
      {rebatesStackGrid && <RebatesStackGrid data={rebatesStackGrid} />}
      {residentialBattery && <ResidentialBattery data={[residentialBattery]} />}
      {federalRebate && <FederalRebates data={[federalRebate]} />}
      {financeOption && <FinanceOption data={[financeOption]} />}
      {whatChanges && <WhatChanges data={whatChanges} />}
      {areYouEligible && <Areyoueligible data={areYouEligible} />}
      {whatSigningUp && <WhatSigningUp data={whatSigningUp} />}
      {rebateDetailSplit && <RebateDetailSplit data={rebateDetailSplit} />}
      {faq && <BatteryFAQ data={{ topTitle: faq.sectionTitle, title: faq.title, listTitle: faq.listTitle, image: faq.image?.src ?? "", items: faq.items }} />}
      {cta && <GetSolar subtitle={cta.subtitle} mainTitle={cta.mainTitle} description={cta.description} buttonText={cta.buttonText} bgImage={cta.bgImage ?? ""} />}
    </main>
  );
}
