import React from "react";
import { getBatteryStoragePage } from "@/lib/strapi";
import { findSection } from "@/lib/strapi/section-utils";
import {
  resolveBatteryStorageHero,
  resolveBatteryStorageMarquee,
  resolveDebsRebate,
  resolveBatteryJargon,
  resolveBatteryBillImpact,
  resolveBatteryRangeGrid,
  resolveBatteryCapacity,
  resolveGreatFit,
  resolveSolarBatteryMeaning,
  resolveInstallationTimeline,
  resolveOneLocalTeam,
  resolveCustomerStories,
  resolveSharedFaq,
  resolveSharedCtaBanner,
} from "@/lib/strapi/resolvers";
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
} from "@/lib/strapi/schemas";
import type {
  SharedFaqData,
  SharedCtaBannerData,
} from "@/lib/strapi/schemas/commercial";

import HeroSection from "@/reuseables/HeroSection";
import GetSolar from "@/reuseables/getsolar";
import BatteryMarquee from "@/components/battery/battery-storage/BatteryMarquee";
import DebsRebateBanner from "@/components/battery/battery-storage/DebsRebateBanner";
import BatteryJargon from "@/components/battery/battery-storage/BatteryJargon";
import BatteryBillImpact from "@/components/battery/battery-storage/BatteryBillImpact";
import BatteryRangeGrid from "@/components/battery/battery-storage/BatteryRangeGrid";
import BatteryCapacityBlocks from "@/components/battery/battery-storage/BatteryCapacityBlocks";
import SolarBatteryMeaning from "@/components/battery/battery-storage/SolarBatteryMeaning";
import InstallationTimeline from "@/components/battery/battery-storage/InstallationTimeline";
import OneLocalTeam from "@/components/battery/battery-storage/OneLocalTeam";
import CustomerStories from "@/components/battery/battery-storage/CustomerStories";
import BatteryFAQ from "@/components/battery/battery-storage/BatteryFAQ";
import GreatFit from "@/components/battery/smarthome-battery-system/GreatFit";

import heroBanner from "@/assets/evcharging/hero_banner.png";
import businessBg from "@/assets/home/zerointrest/businessBg.jpg";
import productReviewBg from "@/assets/home/zerointrest/productReviewBg.png";
import forYourHome from "@/assets/for_your_home.png";

export const revalidate = 60;

const BatteryStoragePage = async () => {
  const response = await getBatteryStoragePage();
  const data = response?.data;

  if (!data) {
    return <main className="w-full min-h-screen" />;
  }

  const sections = data.sections ?? [];

  const hero = findSection<BatteryStorageHeroData>(sections, "battery-storage.hero");
  const marquee = findSection<BatteryStorageMarqueeData>(sections, "battery-storage.marquee");
  const debs = findSection<BatteryStorageDebsRebateData>(sections, "battery-storage.debs-rebate");
  const jargon = findSection<BatteryStorageJargonData>(sections, "battery-storage.jargon");
  const billImpact = findSection<BatteryStorageBillImpactData>(sections, "battery-storage.bill-impact");
  const rangeGrid = findSection<BatteryStorageRangeGridData>(sections, "battery-storage.range-grid");
  const capacity = findSection<BatteryStorageCapacityBlocksData>(sections, "battery-storage.capacity-blocks");
  const greatFit = findSection<BatteryStorageGreatFitData>(sections, "battery-storage.great-fit");
  const solarMeaning = findSection<BatteryStorageSolarMeaningData>(sections, "battery-storage.solar-meaning");
  const timeline = findSection<BatteryStorageInstallationTimelineData>(sections, "battery-storage.installation-timeline");
  const team = findSection<BatteryStorageTeamData>(sections, "battery-storage.team");
  const stories = findSection<BatteryStorageCustomerStoriesData>(sections, "battery-storage.customer-stories");
  const faq = findSection<SharedFaqData>(sections, "shared.faq");
  const ctaBanner = findSection<SharedCtaBannerData>(sections, "shared.cta-banner");

  const heroProps = resolveBatteryStorageHero(hero);
  const marqueeProps = resolveBatteryStorageMarquee(marquee);
  const debsProps = resolveDebsRebate(debs);
  const jargonProps = resolveBatteryJargon(jargon);
  const billImpactProps = resolveBatteryBillImpact(billImpact);
  const rangeGridProps = resolveBatteryRangeGrid(rangeGrid);
  const capacityProps = resolveBatteryCapacity(capacity);
  const greatFitProps = resolveGreatFit(greatFit);
  const solarMeaningProps = resolveSolarBatteryMeaning(solarMeaning);
  const timelineProps = resolveInstallationTimeline(timeline);
  const teamProps = resolveOneLocalTeam(team);
  const storiesProps = resolveCustomerStories(stories);
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
            heightClass: "h-[600px]",
            showOverlay: heroProps.showOverlay,
          }}
        />
      )}

      {marqueeProps && <BatteryMarquee data={marqueeProps} />}

      {debsProps && (
        <DebsRebateBanner
          data={{
            ...debsProps,
            image: debsProps.image || forYourHome,
          }}
        />
      )}

      {jargonProps && (
        <BatteryJargon
          data={{
            ...jargonProps,
            cards: jargonProps.cards.map((card) => ({
              ...card,
              image: card.image || businessBg,
            })),
          }}
        />
      )}

      {billImpactProps && (
        <BatteryBillImpact
          data={{
            ...billImpactProps,
            cards: billImpactProps.cards.map((card) => ({
              ...card,
              image: card.image || businessBg,
            })),
          }}
        />
      )}

      {rangeGridProps && (
        <BatteryRangeGrid
          data={{
            ...rangeGridProps,
            batteries: rangeGridProps.batteries.map((b) => ({
              ...b,
              image: b.image || businessBg,
            })),
          }}
        />
      )}

      {capacityProps && <BatteryCapacityBlocks data={capacityProps} />}

      {greatFitProps && <GreatFit data={greatFitProps} />}

      {solarMeaningProps && <SolarBatteryMeaning data={solarMeaningProps} />}

      {timelineProps && (
        <InstallationTimeline
          data={{
            ...timelineProps,
            steps: timelineProps.steps.map((step) => ({
              ...step,
              image: step.image || businessBg,
            })),
          }}
        />
      )}

      {teamProps && (
        <OneLocalTeam
          data={{
            ...teamProps,
            cards: teamProps.cards.map((card) => ({
              ...card,
              image: card.image || businessBg,
            })),
          }}
        />
      )}

      {storiesProps && (
        <CustomerStories
          data={{
            ...storiesProps,
            stories: storiesProps.stories.map((s) => ({
              ...s,
              image: s.image || businessBg,
            })),
          }}
        />
      )}

      {faqProps && (
        <BatteryFAQ
          data={{
            topTitle: faqProps.title,
            title: faqProps.sectionTitle,
            listTitle: faqProps.listTitle,
            image: faqProps.image?.src || forYourHome,
            items: faqProps.items,
          }}
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

export default BatteryStoragePage;
