import React from "react";
import { getGovernmentRebatesPage } from "@/lib/strapi";
import { findSection } from "@/lib/strapi/section-utils";
import {
  resolveBatteryRebatesHero,
  resolveRebatesStackGrid,
  resolveResidentialBattery,
  resolveFederalRebate,
  resolveFinanceOption,
  resolveWhatChanges,
  resolveAreYouEligible,
  resolveRebateDetailSplit,
  resolveWhatSigningUp,
  resolveSharedFaq,
  resolveSharedCtaBanner,
} from "@/lib/strapi/resolvers";
import type {
  BatteryRebatesHeroData,
  RebatesStackGridData,
  ResidentialBatteryData,
  FederalRebateData,
  FinanceOptionData,
  WhatChangesData,
  AreYouEligibleData,
  RebateDetailSplitData,
  WhatSigningUpData,
  SharedFaqData,
  SharedCtaBannerData,
} from "@/lib/strapi/schemas";

import HeroSection from "@/reuseables/HeroSection";
import FAQ from "@/reuseables/faq";
import GetSolar from "@/reuseables/getsolar";

import RebatesStackGrid from "@/components/battery/government-rebates/RebatesStackGrid";
import RebateDetailSplit from "@/components/battery/government-rebates/RebateDetailSplit";
import ResidentialBattery from "@/components/battery/government-rebates/ResidentialBattery";
import FederalRebates from "@/components/battery/government-rebates/FederalRebates";
import FinanceOption from "@/components/battery/government-rebates/FinanceOption";
import WhatChanges from "@/components/battery/government-rebates/WhatChanges";
import WhatSigningUp from "@/components/battery/government-rebates/WhatSigningUp";
import AreYouEligible from "@/components/battery/government-rebates/AreYouEligible";

import heroBanner from "@/assets/evcharging/hero_banner.png";
import businessBg from "@/assets/home/zerointrest/businessBg.jpg";
import forYourHome from "@/assets/for_your_home.png";
import solarBatteryCharging from "@/assets/solar_battery_charging.png";

export const revalidate = 60;

const GovernmentRebatesPage = async () => {
  const { data } = await getGovernmentRebatesPage();
  const sections = data.sections ?? [];

  const hero = findSection<BatteryRebatesHeroData>(sections, "battery-rebates.hero");
  const rebatesStack = findSection<RebatesStackGridData>(sections, "battery-rebates.rebates-stack-grid");
  const residential = findSection<ResidentialBatteryData>(sections, "battery-rebates.residential-battery");
  const federal = findSection<FederalRebateData>(sections, "battery-rebates.federal-rebate");
  const finance = findSection<FinanceOptionData>(sections, "battery-rebates.finance-option");
  const whatChanges = findSection<WhatChangesData>(sections, "battery-rebates.what-changes");
  const areYouEligible = findSection<AreYouEligibleData>(sections, "battery-rebates.are-you-eligible");
  const rebateDetail = findSection<RebateDetailSplitData>(sections, "battery-rebates.rebate-detail-split");
  const whatSigningUp = findSection<WhatSigningUpData>(sections, "battery-rebates.what-signing-up");
  const faq = findSection<SharedFaqData>(sections, "shared.faq");
  const ctaBanner = findSection<SharedCtaBannerData>(sections, "shared.cta-banner");

  const heroProps = resolveBatteryRebatesHero(hero);
  const stackProps = resolveRebatesStackGrid(rebatesStack);
  const residentialProps = resolveResidentialBattery(residential);
  const federalProps = resolveFederalRebate(federal);
  const financeProps = resolveFinanceOption(finance);
  const whatChangesProps = resolveWhatChanges(whatChanges);
  const eligibleProps = resolveAreYouEligible(areYouEligible);
  const detailProps = resolveRebateDetailSplit(rebateDetail);
  const signingUpProps = resolveWhatSigningUp(whatSigningUp);
  const faqProps = resolveSharedFaq(faq);
  const ctaBannerProps = resolveSharedCtaBanner(ctaBanner);

  return (
    <main className="w-full min-h-screen">
      {heroProps && (
        <HeroSection
          data={{
            mediaSrc: heroProps.mediaSrc || heroBanner,
            mediaType: "image",
            imageClass: "object-cover",
            topSubtitle: heroProps.topSubtitle,
            mainTitle: heroProps.mainTitle,
            description: heroProps.description,
            ctaText: heroProps.ctaText,
            ctaLink: heroProps.ctaLink,
            subtitleColor: "text-white",
            descriptionColor: "text-white",
            showOverlay: heroProps.showOverlay,
          }}
        />
      )}

      {stackProps && <RebatesStackGrid data={stackProps} />}

      {residentialProps.length > 0 && (
        <ResidentialBattery
          data={residentialProps.map((item) => ({
            ...item,
            image: item.image || forYourHome,
          }))}
        />
      )}

      {federalProps.length > 0 && (
        <FederalRebates
          data={federalProps.map((item) => ({
            ...item,
            firstImage: item.firstImage || forYourHome,
            secondImage: item.secondImage || forYourHome,
          }))}
        />
      )}

      {financeProps.length > 0 && (
        <FinanceOption
          data={financeProps.map((option) => ({
            ...option,
            sections: option.sections.map((section) => ({
              ...section,
              image: section.image || forYourHome,
            })),
          }))}
        />
      )}

      {whatChangesProps && <WhatChanges data={whatChangesProps} />}

      {eligibleProps && (
        <AreYouEligible
          data={{
            ...eligibleProps,
            image: eligibleProps.image || solarBatteryCharging,
          }}
        />
      )}

      {detailProps && (
        <RebateDetailSplit
          data={{
            ...detailProps,
            image: detailProps.image || heroBanner,
          }}
        />
      )}

      {signingUpProps && <WhatSigningUp data={signingUpProps} />}

      {faqProps && (
        <FAQ
          topTitle={faqProps.title}
          title={faqProps.sectionTitle}
          listTitle={faqProps.listTitle}
          image={faqProps.image?.src ?? businessBg}
          items={faqProps.items}
          hideImageMobile
        />
      )}

      {ctaBannerProps && (
        <GetSolar
          subtitle={ctaBannerProps.subtitle}
          mainTitle={ctaBannerProps.mainTitle}
          description={ctaBannerProps.description}
          buttonText={ctaBannerProps.buttonText}
          buttonHref={ctaBannerProps.buttonHref}
          bgImage={ctaBannerProps.bgImage || forYourHome}
        />
      )}
    </main>
  );
};

export default GovernmentRebatesPage;
