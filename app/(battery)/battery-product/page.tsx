import React from 'react';
import { getBatteryProductPage } from '@/lib/strapi';
import { findSection } from '@/lib/strapi/section-utils';
import {
  resolveBatteryProductHero,
  resolveBatteryProductBrandMatters,
  resolveBatteryProductOurBrands,
  resolveBatteryProductZeroInterest,
  resolveBatteryProductKeyTerms,
  resolveBatteryProductWhatWeCheck,
  resolveBatteryProductCompatibleProducts,
  resolveBatteryProductHomeowners,
  resolveBatteryProductComparisonTable,
  resolveSharedCtaBanner,
} from '@/lib/strapi/resolvers';
import type {
  BatteryProductHeroData,
  BatteryProductBrandMattersData,
  BatteryProductOurBrandsData,
  BatteryProductZeroInterestData,
  BatteryProductKeyTermsData,
  BatteryProductWhatWeCheckData,
  BatteryProductCompatibleProductsData,
  BatteryProductHomeownersData,
  BatteryProductComparisonTableData,
  SharedCtaBannerData,
} from '@/lib/strapi/schemas';

import Hero from '@/reuseables/Hero';
import BatteryBrandMatters from '@/components/battery/battery-product/batteryBrandmatters';
import OurBatterybrands from '@/components/battery/battery-product/OurBatterybrands';
import ZeroInterest from '@/components/battery/battery-product/zerointrest';
import KeyTermsComponent from '@/components/battery/battery-product/keyTerms';
import WhatWeCheckComponent from '@/components/battery/battery-product/whatwecheck';
import CompatibleProducts from '@/components/battery/battery-product/CompatibleProducts';
import HomeownersComponent from '@/components/battery/battery-product/homeowners';
import ComparisonTable from '@/components/battery/battery-product/ComparisonTable';
import GetSolar from '@/reuseables/getsolar';

export const revalidate = 60;

export default async function BatteryProductPage() {
  const { data: pageData } = await getBatteryProductPage();
  const sections = pageData.sections ?? [];

  const hero = resolveBatteryProductHero(findSection<BatteryProductHeroData>(sections, "battery-product.hero"));
  const brandMatters = resolveBatteryProductBrandMatters(findSection<BatteryProductBrandMattersData>(sections, "battery-product.brand-matters"));
  const ourBrands = resolveBatteryProductOurBrands(findSection<BatteryProductOurBrandsData>(sections, "battery-product.our-brands"));
  const zeroInterest = resolveBatteryProductZeroInterest(findSection<BatteryProductZeroInterestData>(sections, "battery-product.zero-interest"));
  const keyTerms = resolveBatteryProductKeyTerms(findSection<BatteryProductKeyTermsData>(sections, "battery-product.key-terms"));
  const whatWeCheck = resolveBatteryProductWhatWeCheck(findSection<BatteryProductWhatWeCheckData>(sections, "battery-product.what-we-check"));
  const compatibleProducts = resolveBatteryProductCompatibleProducts(findSection<BatteryProductCompatibleProductsData>(sections, "battery-product.compatible-products"));
  const homeowners = resolveBatteryProductHomeowners(findSection<BatteryProductHomeownersData>(sections, "battery-product.homeowners"));
  const comparisonTable = resolveBatteryProductComparisonTable(findSection<BatteryProductComparisonTableData>(sections, "battery-product.comparison-table"));
  const cta = resolveSharedCtaBanner(findSection<SharedCtaBannerData>(sections, "shared.cta-banner"));

  return (
    <main className="w-full min-h-screen">
      {hero && <Hero {...hero} />}
      {brandMatters && <BatteryBrandMatters data={brandMatters} />}
      {ourBrands && <OurBatterybrands data={ourBrands} />}
      {zeroInterest && <ZeroInterest data={zeroInterest} />}
      {keyTerms && <KeyTermsComponent data={keyTerms} />}
      {whatWeCheck && <WhatWeCheckComponent data={whatWeCheck} />}
      {compatibleProducts && <CompatibleProducts data={compatibleProducts} />}
      {homeowners && <HomeownersComponent data={homeowners} />}
      {comparisonTable && <ComparisonTable data={comparisonTable} />}
      {cta && <GetSolar subtitle={cta.subtitle} mainTitle={cta.mainTitle} description={cta.description} buttonText={cta.buttonText} />}
    </main>
  );
}
