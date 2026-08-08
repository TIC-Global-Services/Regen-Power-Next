import React from "react";
import { getBatteryProductPage } from "@/lib/strapi";
import { findSection } from "@/lib/strapi/section-utils";
import {
  resolveBatteryProductHero,
  resolveBatteryMarquee,
  resolveBrandMatters,
  resolveHowYouUseIt,
  resolveRightSizing,
  resolveOurBrands,
  resolveComparisonTable,
  resolveCompatibleProducts,
  resolveWhatWeCheck,
  resolveWarrantyCoverage,
  resolveZeroInterest,
  resolveHomeowners,
  resolveSharedCtaBanner,
} from "@/lib/strapi/resolvers";
import type {
  BatteryProductHeroData,
  BatteryMarqueeData,
  BrandMattersData,
  HowYouUseItData,
  RightSizingData,
  OurBrandsData,
  ComparisonTableData,
  CompatibleProductsData,
  WhatWeCheckData,
  WarrantyCoverageData,
  ZeroInterestData,
  HomeownersData,
  SharedCtaBannerData,
} from "@/lib/strapi/schemas";

import HeroSection from "@/reuseables/HeroSection";
import GetSolar from "@/reuseables/getsolar";

import BatteryBrandMatters from "@/components/battery/battery-product/BatteryBrandMatters";
import HowYouUseIt from "@/components/battery/battery-product/HowYouUseIt";
import CompatibleProducts from "@/components/battery/battery-product/CompatibleProducts";
import SpecsTableSection from "@/components/solar/brands/SpecsTableSection";
import BatteryMarquee from "@/components/battery/battery-storage/BatteryMarquee";
import WarrantyCoverage from "@/components/battery/battery-product/WarrantyCoverage";
import ZeroInterest from "@/components/battery/battery-product/ZeroInterest";
import WhatWeCheck from "@/components/battery/battery-product/WhatWeCheck";
import Homeowners from "@/components/battery/battery-product/Homeowners";
import OurBatterybrands from "@/components/battery/battery-product/OurBatterybrands";
import RightSizing from "@/components/battery/battery-product/RightSizing";

import heroBanner from "@/assets/evcharging/hero_banner.png";
import businessBg from "@/assets/home/zerointrest/businessBg.jpg";
import productReviewBg from "@/assets/home/zerointrest/productReviewBg.png";
import productReviewRating from "@/assets/home/zerointrest/productReviewRating.png";
import forYourHome from "@/assets/for_your_home.png";

export const revalidate = 60;

const BatteryProductPage = async () => {
  const { data } = await getBatteryProductPage();
  const sections = data.sections ?? [];

  const hero = findSection<BatteryProductHeroData>(sections, "battery-product.hero");
  const marquee = findSection<BatteryMarqueeData>(sections, "battery-storage.marquee");
  const brandMatters = findSection<BrandMattersData>(sections, "battery-product.brand-matters");
  const howYouUseIt = findSection<HowYouUseItData>(sections, "battery-product.how-you-use-it");
  const rightSizing = findSection<RightSizingData>(sections, "battery-product.right-sizing");
  const ourBrands = findSection<OurBrandsData>(sections, "battery-product.our-brands");
  const comparisonTable = findSection<ComparisonTableData>(sections, "battery-product.comparison-table");
  const compatible = findSection<CompatibleProductsData>(sections, "battery-product.compatible-products");
  const whatWeCheck = findSection<WhatWeCheckData>(sections, "battery-product.what-we-check");
  const warranty = findSection<WarrantyCoverageData>(sections, "battery-product.warranty-coverage");
  const zeroInterest = findSection<ZeroInterestData>(sections, "battery-product.zero-interest");
  const homeowners = findSection<HomeownersData>(sections, "battery-product.homeowners");
  const ctaBanner = findSection<SharedCtaBannerData>(sections, "shared.cta-banner");

  const heroProps = resolveBatteryProductHero(hero);
  const marqueeProps = resolveBatteryMarquee(marquee);
  const brandMattersProps = resolveBrandMatters(brandMatters);
  const howYouUseItProps = resolveHowYouUseIt(howYouUseIt);
  const rightSizingProps = resolveRightSizing(rightSizing);
  const ourBrandsProps = resolveOurBrands(ourBrands);
  const comparisonProps = resolveComparisonTable(comparisonTable);
  const compatibleProps = resolveCompatibleProducts(compatible);
  const whatWeCheckProps = resolveWhatWeCheck(whatWeCheck);
  const warrantyProps = resolveWarrantyCoverage(warranty);
  const zeroInterestProps = resolveZeroInterest(zeroInterest);
  const homeownersProps = resolveHomeowners(homeowners);
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

      {marqueeProps && <BatteryMarquee data={marqueeProps} />}

      {brandMattersProps && (
        <BatteryBrandMatters
          data={{
            ...brandMattersProps,
            cards: brandMattersProps.cards.map((card) => ({
              ...card,
              image: card.image || businessBg,
            })),
          }}
        />
      )}

      {howYouUseItProps && <HowYouUseIt data={howYouUseItProps} />}

      {rightSizingProps && <RightSizing data={rightSizingProps} />}

      {ourBrandsProps && (
        <OurBatterybrands
          data={{
            ...ourBrandsProps,
            brands: ourBrandsProps.brands.map((brand) => ({
              ...brand,
              logo: brand.logo || undefined,
              image: brand.image || heroBanner,
            })),
          }}
        />
      )}

      {comparisonProps && <SpecsTableSection resolved={comparisonProps} />}

      {compatibleProps && <CompatibleProducts data={compatibleProps} />}

      {whatWeCheckProps && <WhatWeCheck data={whatWeCheckProps} />}

      {warrantyProps && (
        <WarrantyCoverage
          data={{
            ...warrantyProps,
            cards: (warrantyProps.cards ?? []).map((card) =>
              card.type === "image"
                ? { ...card, image: card.image || businessBg }
                : card
            ),
          }}
        />
      )}

      {zeroInterestProps && (
        <ZeroInterest
          data={{
            ...zeroInterestProps,
            topImage: zeroInterestProps.topImage || productReviewBg,
            bottomImage: zeroInterestProps.bottomImage || businessBg,
          }}
        />
      )}

      {homeownersProps && (
        <Homeowners
          data={{
            ...homeownersProps,
            stories: homeownersProps.stories.map((story) => ({
              ...story,
              image: story.image || businessBg,
            })),
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

export default BatteryProductPage;
