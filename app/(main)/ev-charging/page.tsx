import React from "react";
import { getEvChargingPage } from "@/lib/strapi";
import { findSection } from "@/lib/strapi/section-utils";
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
} from "@/lib/strapi/resolvers";
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
} from "@/lib/strapi/schemas";
import EvHero from "@/components/EvCharging/hero";
import type { EvHeroData } from "@/components/EvCharging/hero";
import WallConnector from "@/components/EvCharging/wallConnector";
import type { WallConnectorData } from "@/components/EvCharging/wallConnector";
import OneCharger from "@/components/EvCharging/OneCharger";
import type { OneChargerData } from "@/components/EvCharging/OneCharger";
import TrustedInstaller from "@/components/EvCharging/trustedInstaller";
import type { TrustedInstallerData } from "@/components/EvCharging/trustedInstaller";
import WhyChargeAtHome from "@/components/EvCharging/WhyChargeAtHome";
import type { WhyChargeAtHomeData } from "@/components/EvCharging/WhyChargeAtHome";
import HomeBattery from "@/components/EvCharging/homebattery";
import type { HomeBatteryData } from "@/components/EvCharging/homebattery";
import UnderOneRoof from "@/components/EvCharging/UnderOneRoof";
import type { UnderOneRoofData } from "@/components/EvCharging/UnderOneRoof";
import EvAccordion from "@/components/EvCharging/EvAccordion";
import type { EvAccordionData } from "@/components/EvCharging/EvAccordion";
import EvWhyChooseUs from "@/components/EvCharging/EvWhyChooseUs";
import FAQ from "@/reuseables/faq";
import GetSolar from "@/reuseables/getsolar";

// Fallback images (used until real media is uploaded in Strapi)
import evHeroBg from "@/assets/evcharging/hero_banner.png";
import wallConnectorHero from "@/assets/evcharging/wall_connector_hero.png";
import singlePhase from "@/assets/evcharging/single-phase-7w.png";
import threePhase from "@/assets/evcharging/three-phase-2.png";
import sigenergy from "@/assets/evcharging/sigenergy_trustedinstaller-1.png";
import fronius from "@/assets/evcharging/fronius_trustedinstaller-2.png";
import goodwe from "@/assets/evcharging/goodwe_trustedinstaller-3.png";
import alphaess from "@/assets/evcharging/alphaess_trustedinstaller-4.png";
import cheaperPerKm from "@/assets/evcharging/cheaper_per_km.png";
import alwaysFullCharge from "@/assets/evcharging/always_fullchargein_morning.png";
import youAreInControl from "@/assets/evcharging/you_arein_control.png";
import sigenSetup from "@/assets/evcharging/home_battery_img.png";
import evInstall4 from "@/assets/evcharging/ev-charging-installation-4.png";
import batteryBoost from "@/assets/evcharging/battery_bost.png";
import oneApp from "@/assets/evcharging/one_app.png";
import evImg1 from "@/assets/evcharging/ev-charging-installation-1.png";
import evImg2 from "@/assets/evcharging/ev-charging-installation-2.png";
import evImg3 from "@/assets/evcharging/ev-charging-installation-3.png";

export const revalidate = 60;

const EvChargingPage = async () => {
  const { data } = await getEvChargingPage();
  const sections = data.sections ?? [];

  const hero = findSection<EvChargingHeroData>(sections, "ev-charging.hero");
  const wallConnector = findSection<EvChargingWallConnectorData>(
    sections,
    "ev-charging.wall-connector"
  );
  const chargerProducts = findSection<EvChargingChargerProductsData>(
    sections,
    "ev-charging.charger-products"
  );
  const installerBrands = findSection<EvChargingInstallerBrandsData>(
    sections,
    "ev-charging.installer-brands"
  );
  const benefitCards = findSection<EvChargingBenefitCardsData>(
    sections,
    "ev-charging.benefit-cards"
  );
  const homeBattery = findSection<EvChargingHomeBatteryData>(
    sections,
    "ev-charging.home-battery"
  );
  const featureCards = findSection<EvChargingFeatureCardsData>(
    sections,
    "ev-charging.feature-cards"
  );
  const installationSteps = findSection<EvChargingInstallationStepsData>(
    sections,
    "ev-charging.installation-steps"
  );
  const stats = findSection<EvChargingStatsData>(sections, "ev-charging.stats");
  const faq = findSection<SharedFaqData>(sections, "shared.faq");
  const ctaBanner = findSection<SharedCtaBannerData>(
    sections,
    "shared.cta-banner"
  );

  const heroProps = resolveEvChargingHero(hero);
  const wallConnectorProps = resolveEvChargingWallConnector(wallConnector);
  const chargerProductsProps = resolveEvChargingChargerProducts(chargerProducts);
  const installerBrandsProps = resolveEvChargingInstallerBrands(installerBrands);
  const benefitCardsProps = resolveEvChargingBenefitCards(benefitCards);
  const homeBatteryProps = resolveEvChargingHomeBattery(homeBattery);
  const featureCardsProps = resolveEvChargingFeatureCards(featureCards);
  const installationStepsProps = resolveEvChargingInstallationSteps(installationSteps);
  const statsProps = resolveEvChargingStats(stats);
  const faqProps = resolveSharedFaq(faq);
  const ctaProps = resolveSharedCtaBanner(ctaBanner);

  return (
    <div>
      {/* Section 1: Hero */}
      {heroProps && (
        <EvHero
          data={{
            ...heroProps,
            mediaSrc: heroProps.mediaSrc || evHeroBg,
          }}
        />
      )}

      {/* Section 2: Wall Connector */}
      {wallConnectorProps && (
        <WallConnector
          data={{
            ...wallConnectorProps,
            image: wallConnectorProps.image || wallConnectorHero,
          }}
        />
      )}

      {/* Section 3: Charger Products */}
      {chargerProductsProps && (
        <OneCharger
          data={{
            ...chargerProductsProps,
            products: chargerProductsProps.products.map((p) => ({
              ...p,
              image:
                p.image || (p.name.includes("Three") ? threePhase : singlePhase),
            })),
          }}
        />
      )}

      {/* Section 4: Installer Brands */}
      {installerBrandsProps && (
        <TrustedInstaller
          data={{
            ...installerBrandsProps,
            brands: installerBrandsProps.brands.map((b, idx) => ({
              ...b,
              logo: b.logo || [sigenergy, fronius, goodwe, alphaess][idx % 4],
            })),
          }}
        />
      )}

      {/* Section 5: Why Charge At Home */}
      {benefitCardsProps && (
        <WhyChargeAtHome
          data={{
            ...benefitCardsProps,
            benefits: benefitCardsProps.benefits.map((b, idx) => ({
              ...b,
              image: b.image || [cheaperPerKm, alwaysFullCharge, youAreInControl][idx % 3],
            })),
          }}
        />
      )}

      {/* Section 6: Home Battery (V2H) */}
      {homeBatteryProps && (
        <HomeBattery
          data={{
            ...homeBatteryProps,
            image: homeBatteryProps.image || sigenSetup,
          }}
        />
      )}

      {/* Section 7: Under One Roof */}
      {featureCardsProps && (
        <UnderOneRoof
          data={{
            ...featureCardsProps,
            title: featureCardsProps.title,
            cards: featureCardsProps.cards.map((c, idx) => ({
              ...c,
              image: c.image || [evInstall4, batteryBoost, oneApp][idx % 3],
            })),
          }}
        />
      )}

      {/* Section 8: Installation Steps */}
      {installationStepsProps && (
        <EvAccordion
          data={{
            ...installationStepsProps,
            steps: installationStepsProps.steps.map((s, idx) => ({
              ...s,
              image: s.image || [evImg1, evImg2, evImg3, evInstall4][idx % 4],
            })),
          }}
        />
      )}

      {/* Section 9: Stats / Why Choose Us */}
      {statsProps && <EvWhyChooseUs data={statsProps} />}

      {/* Section 10: FAQ */}
      {faqProps && (
        <FAQ
          topTitle={faqProps.title}
          title={faqProps.sectionTitle}
          listTitle={faqProps.listTitle}
          image={faqProps.image?.src}
          items={faqProps.items}
        />
      )}

      {/* Section 11: CTA Banner */}
      {ctaProps && (
        <GetSolar
          subtitle={ctaProps.subtitle}
          mainTitle={ctaProps.mainTitle}
          description={ctaProps.description}
          buttonText={ctaProps.buttonText}
          buttonHref={ctaProps.buttonHref}
          bgImage={ctaProps.bgImage || undefined}
        />
      )}
    </div>
  );
};

export default EvChargingPage;