import React from "react";
import { getBrandsWeCarryPage } from "@/lib/strapi";
import { findSection } from "@/lib/strapi/section-utils";
import {
  resolveBatteryBrandsHero,
  resolveBrandLongTermBet,
  resolveWhatItTakes,
  resolveSevenBrand,
  resolveBrandsComparisonTable,
  resolveQuickWay,
  resolveCecApproved,
  resolveWhyOurInstaller,
  resolveSharedFaq,
  resolveSharedCtaBanner,
} from "@/lib/strapi/resolvers";
import type {
  BatteryBrandsHeroData,
  BatteryBrandsLongTermBetData,
  BatteryBrandsWhatItTakesData,
  BatteryBrandsSevenBrandData,
  ComparisonTableData,
  BatteryBrandsQuickWayData,
  BatteryBrandsCecApprovedData,
  BatteryBrandsWhyOurInstallerData,
  SharedFaqData,
  SharedCtaBannerData,
} from "@/lib/strapi/schemas";

import HeroSection from "@/reuseables/HeroSection";
import FAQ from "@/reuseables/faq";
import GetSolar from "@/reuseables/getsolar";
import SpecsTableSection from "@/components/solar/brands/SpecsTableSection";

import BrandLongTermBet from "@/components/battery/brands-wecarry/BrandLongTermBet";
import WhatItTakes from "@/components/battery/brands-wecarry/WhatItTakes";
import SevenBrand from "@/components/battery/brands-wecarry/SevenBrand";
import QuickWay from "@/components/battery/brands-wecarry/QuickWay";
import CECApproved from "@/components/battery/brands-wecarry/CECApproved";
import WhyOurInstaller from "@/components/battery/brands-wecarry/WhyOurInstaller";

import heroBanner from "@/assets/evcharging/hero_banner.png";
import businessBg from "@/assets/home/zerointrest/businessBg.jpg";
import productReviewBg from "@/assets/home/zerointrest/productReviewBg.png";
import solarBatteryCharging from "@/assets/solar_battery_charging.png";

export const revalidate = 60;

const BrandsWeCarryPage = async () => {
  const { data } = await getBrandsWeCarryPage();
  const sections = data.sections ?? [];

  const hero = findSection<BatteryBrandsHeroData>(sections, "battery-brands.hero");
  const longTermBet = findSection<BatteryBrandsLongTermBetData>(
    sections,
    "battery-brands.brand-long-term-bet"
  );
  const whatItTakes = findSection<BatteryBrandsWhatItTakesData>(
    sections,
    "battery-brands.what-it-takes"
  );
  const sevenBrand = findSection<BatteryBrandsSevenBrandData>(
    sections,
    "battery-brands.seven-brand"
  );
  const comparison = findSection<ComparisonTableData>(
    sections,
    "battery-product.comparison-table"
  );
  const quickWay = findSection<BatteryBrandsQuickWayData>(
    sections,
    "battery-brands.quick-way"
  );
  const cecApproved = findSection<BatteryBrandsCecApprovedData>(
    sections,
    "battery-brands.cec-approved"
  );
  const whyOurInstaller = findSection<BatteryBrandsWhyOurInstallerData>(
    sections,
    "battery-brands.why-our-installer"
  );
  const faq = findSection<SharedFaqData>(sections, "shared.faq");
  const ctaBanner = findSection<SharedCtaBannerData>(sections, "shared.cta-banner");

  const heroProps = resolveBatteryBrandsHero(hero);
  const longTermBetProps = resolveBrandLongTermBet(longTermBet);
  const whatItTakesProps = resolveWhatItTakes(whatItTakes);
  const sevenBrandProps = resolveSevenBrand(sevenBrand);
  const comparisonProps = resolveBrandsComparisonTable(comparison);
  const quickWayProps = resolveQuickWay(quickWay);
  const cecApprovedProps = resolveCecApproved(cecApproved);
  const whyOurInstallerProps = resolveWhyOurInstaller(whyOurInstaller);
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

      {longTermBetProps && (
        <BrandLongTermBet
          data={{
            ...longTermBetProps,
            cards: longTermBetProps.cards.map((card, i) => ({
              ...card,
              image:
                card.image ||
                [businessBg, productReviewBg, solarBatteryCharging][i] ||
                businessBg,
            })),
          }}
        />
      )}

      {whatItTakesProps && (
        <WhatItTakes
          data={{
            ...whatItTakesProps,
            image: whatItTakesProps.image || solarBatteryCharging,
          }}
        />
      )}

      {sevenBrandProps && <SevenBrand data={sevenBrandProps} />}

      {comparisonProps && <SpecsTableSection resolved={comparisonProps} />}

      {quickWayProps && (
        <QuickWay
          data={{
            ...quickWayProps,
            image: quickWayProps.image || solarBatteryCharging,
          }}
        />
      )}

      {cecApprovedProps && <CECApproved data={cecApprovedProps} />}

      {whyOurInstallerProps && (
        <WhyOurInstaller
          data={{
            ...whyOurInstallerProps,
            image: whyOurInstallerProps.image || solarBatteryCharging,
          }}
        />
      )}

      {faqProps && (
        <FAQ
          topTitle={faqProps.title}
          title={faqProps.sectionTitle}
          listTitle={faqProps.listTitle}
          image={faqProps.image?.src || businessBg}
          items={faqProps.items}
        />
      )}

      {ctaBannerProps && (
        <GetSolar
          subtitle={ctaBannerProps.subtitle}
          mainTitle={ctaBannerProps.mainTitle}
          description={ctaBannerProps.description}
          buttonText={ctaBannerProps.buttonText}
          buttonHref={ctaBannerProps.buttonHref}
          bgImage={ctaBannerProps.bgImage || heroBanner}
        />
      )}
    </main>
  );
};

export default BrandsWeCarryPage;
