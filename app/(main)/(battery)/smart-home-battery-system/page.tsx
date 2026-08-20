import React from "react";
import { getSmartHomeBatteryPage } from "@/lib/strapi";
import { findSection } from "@/lib/strapi/section-utils";
import {
  resolveSmartHomeHero,
  resolveBatteryStorageMarquee,
  resolveSmartHomeGreatFit,
  resolveFourPillars,
  resolveBatterySplit,
  resolveBatteryTimeline,
  resolveBatteryBrandsGrid,
  resolveSmartInstallBento,
  resolveSharedCtaBanner,
} from "@/lib/strapi/resolvers";
import type {
  SmartHomeHeroData,
  SmartHomeGreatFitData,
  SmartHomeFourPillarsData,
  SmartHomeSplitSectionData,
  SmartHomeTimelineData,
  SmartHomeBrandsGridData,
  SmartHomeInstallBentoData,
} from "@/lib/strapi/schemas";
import type {
  BatteryStorageMarqueeData,
} from "@/lib/strapi/schemas";
import type { SharedCtaBannerData } from "@/lib/strapi/schemas/commercial";

import HeroSection from "@/reuseables/HeroSection";
import GetSolar from "@/reuseables/getsolar";
import BatteryMarquee from "@/components/battery/battery-storage/BatteryMarquee";
import GreatFit from "@/components/battery/smarthome-battery-system/GreatFit";
import FourPillars from "@/components/battery/smarthome-battery-system/FourPillars";
import BatterySplitSection from "@/components/battery/smarthome-battery-system/BatterySplitSection";
import BatteryTimeline from "@/components/battery/smarthome-battery-system/BatteryTimeline";
import BatteryBrandsGrid from "@/components/battery/smarthome-battery-system/BatteryBrandsGrid";
import BentoCardsGrid from "@/reuseables/BentoCardsGrid";

import heroBanner from "@/assets/evcharging/hero_banner.png";
import businessBg from "@/assets/home/zerointrest/businessBg.jpg";
import productReviewBg from "@/assets/home/zerointrest/productReviewBg.png";
import forYourHome from "@/assets/for_your_home.png";

export const revalidate = 60;

const SmartBatterySystemPage = async () => {
  const { data } = await getSmartHomeBatteryPage();
  const sections = data.sections ?? [];

  const hero = findSection<SmartHomeHeroData>(sections, "smart-home-battery.hero");
  const marquee = findSection<BatteryStorageMarqueeData>(sections, "battery-storage.marquee");
  const greatFit = findSection<SmartHomeGreatFitData>(sections, "smart-home-battery.great-fit");
  const pillars = findSection<SmartHomeFourPillarsData>(sections, "smart-home-battery.four-pillars");
  const split = findSection<SmartHomeSplitSectionData>(sections, "smart-home-battery.split-section");
  const timeline = findSection<SmartHomeTimelineData>(sections, "smart-home-battery.timeline");
  const brands = findSection<SmartHomeBrandsGridData>(sections, "smart-home-battery.brands-grid");
  const bento = findSection<SmartHomeInstallBentoData>(sections, "smart-home-battery.install-bento");
  const ctaBanner = findSection<SharedCtaBannerData>(sections, "shared.cta-banner");

  const heroProps = resolveSmartHomeHero(hero);
  const marqueeProps = resolveBatteryStorageMarquee(marquee);
  const greatFitProps = resolveSmartHomeGreatFit(greatFit);
  const pillarsProps = resolveFourPillars(pillars);
  const splitProps = resolveBatterySplit(split);
  const timelineProps = resolveBatteryTimeline(timeline);
  const brandsProps = resolveBatteryBrandsGrid(brands);
  const bentoProps = resolveSmartInstallBento(bento);
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
            heightClass:"h-[600px]",
            showOverlay: heroProps.showOverlay,
          }}
        />
      )}

      {marqueeProps && <BatteryMarquee data={marqueeProps} />}

      {greatFitProps && <GreatFit data={greatFitProps} />}

      {pillarsProps && (
        <FourPillars
          data={{
            ...pillarsProps,
            cards: pillarsProps.cards.map((card) => ({
              ...card,
              image: card.image || businessBg,
            })),
          }}
        />
      )}

      {splitProps && (
        <BatterySplitSection
          data={{
            ...splitProps,
            slides: splitProps.slides.map((slide) => ({
              ...slide,
              image: slide.image || productReviewBg,
            })),
          }}
        />
      )}

      {timelineProps && <BatteryTimeline data={timelineProps} />}

      {brandsProps && <BatteryBrandsGrid data={brandsProps} />}

      {bentoProps && <BentoCardsGrid data={bentoProps} />}

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

export default SmartBatterySystemPage;
