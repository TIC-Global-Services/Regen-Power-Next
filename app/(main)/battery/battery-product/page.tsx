import React from "react";
import { getBatteryProductPage, getLatestPortfolioProjects } from "@/lib/strapi";
import { findSection } from "@/lib/strapi/section-utils";
import { strapiImageData } from "@/lib/strapi/media";
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
import { resolveSharedFormSection } from "@/lib/strapi/resolvers/shared";
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
  SharedFormSectionData,
} from "@/lib/strapi/schemas";

import HeroSection from "@/reuseables/HeroSection";
import GetSolar from "@/reuseables/getsolar";
import UnifiedFormSection from "@/reuseables/UnifiedFormSection";

import BatteryBrandMatters from "@/components/battery/battery-product/BatteryBrandMatters";
import BentoCardsGrid from "@/reuseables/BentoCardsGrid";
import GreatFit from "@/components/battery/smarthome-battery-system/GreatFit";
import { Minus } from "lucide-react";
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

export const revalidate = 60;

const BatteryProductPage = async () => {
  const [{ data }, latestProjects] = await Promise.all([
    getBatteryProductPage(),
    getLatestPortfolioProjects(6),
  ]);
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
  const formSection = findSection<SharedFormSectionData>(sections, "shared.form-section");
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
  let homeownersProps = resolveHomeowners(homeowners);
  // Cards come from the portfolio-project collection (latest 6, newest first).
  // Header/button copy stays from the Strapi homeowners section when present.
  if (latestProjects.length > 0) {
    const stories = latestProjects.map((p: (typeof latestProjects)[number]) => {
      const loc = [p.suburb, p.state].filter(Boolean).join(", ");
      const sizeLabel = [p.systemSize, p.batterySize].filter(Boolean).join(" · ");
      return {
        title: p.title?.trim() || "Untitled project",
        description: p.description?.trim() || "",
        image: p.image ? strapiImageData(p.image)?.src ?? null : null,
        footerTitle: loc || undefined,
        footerDescription: sizeLabel || (p.postcode ? String(p.postcode) : undefined),
        href: (p as { slug?: string | null }).slug ? `/commercial/portfolio/${(p as { slug: string }).slug}` : undefined,
      };
    });
    if (homeownersProps) {
      homeownersProps = { ...homeownersProps, stories, centerButtonLink: "/reviews" };
    } else {
      homeownersProps = {
        topSubtitle: "Our portfolio",
        title: "Latest installs",
        showReadMore: true,
        centerButton: true,
        centerButtonText: "View all projects",
        stories,
        centerButtonLink: "/reviews",
      };
    }
  }
  const ctaBannerProps = resolveSharedCtaBanner(ctaBanner);
  const formProps = resolveSharedFormSection(formSection);

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
            heightClass:"h-[600px]"
          }}
        />
      )}

      {marqueeProps && <BatteryMarquee data={marqueeProps} />}

      {brandMattersProps && <BatteryBrandMatters data={brandMattersProps} />}

      {howYouUseItProps && <BentoCardsGrid data={howYouUseItProps} headerColSpan={2} />}

      {rightSizingProps && <RightSizing data={rightSizingProps} />}

      {ourBrandsProps && <OurBatterybrands data={ourBrandsProps} />}

      {comparisonProps && <SpecsTableSection resolved={comparisonProps} />}

      {compatibleProps && (
        <GreatFit
          data={compatibleProps}
          leftIcon={Minus}
          rightIcon={Minus}
        />
      )}

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

      {zeroInterestProps && <ZeroInterest data={zeroInterestProps} />}

      {homeownersProps && <Homeowners data={homeownersProps} />}

      <UnifiedFormSection
        resolved={formProps}
        video={formProps?.videoSrc ?? "/form-icon-video.mp4"}
        image={formProps?.imageSrc}
        title={formProps?.title ?? undefined}
        description={formProps?.description ?? undefined}
      />

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
