import React from 'react';
import { getBatteryBrandsPage } from '@/lib/strapi';
import { findSection } from '@/lib/strapi/section-utils';
import {
  resolveBatteryBrandsHero,
  resolveBatteryBrandsBrandLongTermBet,
  resolveBatteryBrandsWhatItTakes,
  resolveBatteryBrandsSevenBrand,
  resolveBatteryBrandsQuickWay,
  resolveBatteryBrandsCecApproved,
  resolveBatteryBrandsWhyOurInstaller,
  resolveSharedFaq,
  resolveSharedCtaBanner,
} from '@/lib/strapi/resolvers';
import type {
  BatteryBrandsHeroData,
  BatteryBrandsBrandLongTermBetData,
  BatteryBrandsWhatItTakesData,
  BatteryBrandsSevenBrandData,
  BatteryBrandsQuickWayData,
  BatteryBrandsCecApprovedData,
  BatteryBrandsWhyOurInstallerData,
  SharedFaqData,
  SharedCtaBannerData,
  BatteryProductComparisonTableData,
} from '@/lib/strapi/schemas';
import { resolveBatteryProductComparisonTable } from '@/lib/strapi/resolvers';

import HeroSection from '@/components/battery/brands-wecarry/Hero';
import BrandLongTermBet from '@/components/battery/brands-wecarry/BrandLongTermBet';
import WhatItTakes from '@/components/battery/brands-wecarry/whatittakes';
import SevenBrand from '@/components/battery/brands-wecarry/sevenbrand';
import AtAGlance from '@/components/battery/brands-wecarry/aglance';
import QuickWay from '@/components/battery/brands-wecarry/quikway';
import CECApproved from '@/components/battery/brands-wecarry/cecapproved';
import WhyOurInstaller from '@/components/battery/brands-wecarry/whyOurinstaller';
import BatteryFAQ from '@/components/battery/battery-storage/BatteryFAQ';
import Pickyourbrand from '@/components/battery/brands-wecarry/pickYourBrand';

export const revalidate = 60;

export default async function BrandsWeCarryPage() {
  const { data: pageData } = await getBatteryBrandsPage();
  const sections = pageData.sections ?? [];

  const hero = resolveBatteryBrandsHero(findSection<BatteryBrandsHeroData>(sections, "battery-brands.hero"));
  const brandLongTermBet = resolveBatteryBrandsBrandLongTermBet(findSection<BatteryBrandsBrandLongTermBetData>(sections, "battery-brands.brand-long-term-bet"));
  const whatItTakes = resolveBatteryBrandsWhatItTakes(findSection<BatteryBrandsWhatItTakesData>(sections, "battery-brands.what-it-takes"));
  const sevenBrand = resolveBatteryBrandsSevenBrand(findSection<BatteryBrandsSevenBrandData>(sections, "battery-brands.seven-brand"));
  const comparisonTable = resolveBatteryProductComparisonTable(findSection<BatteryProductComparisonTableData>(sections, "battery-product.comparison-table"));
  const quickWay = resolveBatteryBrandsQuickWay(findSection<BatteryBrandsQuickWayData>(sections, "battery-brands.quick-way"));
  const cecApproved = resolveBatteryBrandsCecApproved(findSection<BatteryBrandsCecApprovedData>(sections, "battery-brands.cec-approved"));
  const whyOurInstaller = resolveBatteryBrandsWhyOurInstaller(findSection<BatteryBrandsWhyOurInstallerData>(sections, "battery-brands.why-our-installer"));
  const faq = resolveSharedFaq(findSection<SharedFaqData>(sections, "shared.faq"));
  const cta = resolveSharedCtaBanner(findSection<SharedCtaBannerData>(sections, "shared.cta-banner"));

  return (
    <main className="w-full min-h-screen">
      {hero && <HeroSection data={hero} />}
      {brandLongTermBet && <BrandLongTermBet data={brandLongTermBet} />}
      {whatItTakes && <WhatItTakes data={whatItTakes} />}
      {sevenBrand && <SevenBrand data={sevenBrand} />}
      {comparisonTable && <AtAGlance data={comparisonTable} />}
      {quickWay && <QuickWay data={quickWay} />}
      {cecApproved && <CECApproved data={cecApproved} />}
      {whyOurInstaller && <WhyOurInstaller data={whyOurInstaller} />}
      {faq && <BatteryFAQ data={{ topTitle: faq.sectionTitle, title: faq.title, listTitle: faq.listTitle, image: faq.image?.src ?? "", items: faq.items }} />}
      {cta && <Pickyourbrand data={{ subTitle: cta.subtitle, title: cta.mainTitle, description: cta.description, buttontext: cta.buttonText, buttonRef: cta.buttonHref ?? "/contact" }} />}
    </main>
  );
}
