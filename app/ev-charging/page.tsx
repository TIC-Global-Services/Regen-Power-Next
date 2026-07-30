import React from 'react';
import { getEvChargingPage } from '@/lib/strapi';
import { findSection } from '@/lib/strapi/section-utils';
import {
  resolveEvChargingHero,
  resolveEvChargingWallConnector,
  resolveEvChargingChargerProducts,
  resolveEvChargingInstallerBrands,
  resolveEvChargingBenefitCards,
  resolveEvChargingHomeBattery,
  resolveEvChargingFeatureCards,
  resolveEvChargingInstallationSteps,
  resolveEvChargingStats,
  resolveSharedFaq,
  resolveSharedCtaBanner,
} from '@/lib/strapi/resolvers';
import type {
  EvChargingHeroData,
  EvChargingWallConnectorData,
  EvChargingChargerProductsData,
  EvChargingInstallerBrandsData,
  EvChargingBenefitCardsData,
  EvChargingHomeBatteryData,
  EvChargingFeatureCardsData,
  EvChargingInstallationStepsData,
  EvChargingStatsData,
  SharedFaqData,
  SharedCtaBannerData,
} from '@/lib/strapi/schemas';

import EvHero from '@/components/EvCharging/hero';
import WallConnector from '@/components/EvCharging/wallConnector';
import OneCharger from '@/components/EvCharging/OneCharger';
import TrustedInstaller from '@/components/EvCharging/trustedInstaller';
import WhyChargeAtHome from '@/components/EvCharging/WhyChargeAtHome';
import HomeBatteryV2H from '@/components/EvCharging/homebattery';
import UnderOneRoof from '@/components/EvCharging/UnderOneRoof';
import EvAccordion from '@/components/EvCharging/EvAccordion';
import EvWhyChooseUs from '@/components/EvCharging/EvWhyChooseUs';
import FAQ from '@/reuseables/faq';
import GetSolar from '@/reuseables/getsolar';

export const revalidate = 60;

export default async function EvChargingPage() {
  const { data: pageData } = await getEvChargingPage();
  const sections = pageData.sections ?? [];

  const hero = resolveEvChargingHero(findSection<EvChargingHeroData>(sections, "ev-charging.hero"));
  const wallConnector = resolveEvChargingWallConnector(findSection<EvChargingWallConnectorData>(sections, "ev-charging.wall-connector"));
  const chargerProducts = resolveEvChargingChargerProducts(findSection<EvChargingChargerProductsData>(sections, "ev-charging.charger-products"));
  const installerBrands = resolveEvChargingInstallerBrands(findSection<EvChargingInstallerBrandsData>(sections, "ev-charging.installer-brands"));
  const benefitCards = resolveEvChargingBenefitCards(findSection<EvChargingBenefitCardsData>(sections, "ev-charging.benefit-cards"));
  const homeBattery = resolveEvChargingHomeBattery(findSection<EvChargingHomeBatteryData>(sections, "ev-charging.home-battery"));
  const featureCards = resolveEvChargingFeatureCards(findSection<EvChargingFeatureCardsData>(sections, "ev-charging.feature-cards"));
  const installationSteps = resolveEvChargingInstallationSteps(findSection<EvChargingInstallationStepsData>(sections, "ev-charging.installation-steps"));
  const stats = resolveEvChargingStats(findSection<EvChargingStatsData>(sections, "ev-charging.stats"));
  const faq = resolveSharedFaq(findSection<SharedFaqData>(sections, "shared.faq"));
  const cta = resolveSharedCtaBanner(findSection<SharedCtaBannerData>(sections, "shared.cta-banner"));

  return (
    <div>
      {hero && <EvHero data={hero} />}
      {wallConnector && <WallConnector data={wallConnector} />}
      {chargerProducts && <OneCharger data={chargerProducts} />}
      {installerBrands && <TrustedInstaller data={installerBrands} />}
      {benefitCards && <WhyChargeAtHome data={benefitCards} />}
      {homeBattery && <HomeBatteryV2H data={homeBattery} />}
      {featureCards && <UnderOneRoof data={featureCards} />}
      {installationSteps && <EvAccordion data={installationSteps} />}
      {stats && <EvWhyChooseUs data={stats} />}
      {faq && <FAQ
        topTitle={faq.sectionTitle}
        title={faq.title}
        listTitle={faq.listTitle}
        items={faq.items.map((item) => ({ question: item.question, answer: item.answer }))}
      />}
      {cta && <GetSolar
        subtitle={cta.subtitle}
        mainTitle={cta.mainTitle}
        description={cta.description}
        buttonText={cta.buttonText}
      />}
    </div>
  );
}
