'use client';

import React from 'react';

// ─── Desktop Components ──────────────────────────────────────
import DesktopHero from '@/components/Promotion/desktop/hero';
import LimitedSpot from '@/components/Promotion/desktop/limitedspot';
import TrustRegen from '@/components/Promotion/desktop/trustregen';
import FreeQuotation from '@/components/Promotion/desktop/freequatation';
import BatteryRebates from '@/components/Promotion/desktop/batteryrebates';
import DesktopBrands from '@/components/Promotion/desktop/brands';
import HighEnergy from '@/components/Promotion/desktop/highenergy';
import BatteryPackage from '@/components/Promotion/desktop/batterypackage';
import ReadyToBegin from '@/components/Promotion/desktop/readytobegin';
import SolarFinancing from '@/components/Promotion/desktop/solarfinancing';
import AboutRegen from '@/components/Promotion/desktop/aboutregen';
import FindOutWhy from '@/components/Promotion/desktop/findoutwhy';
import Acheivements from '@/components/Promotion/desktop/acheivements';
import IndustryRecognition from '@/components/Promotion/desktop/industryrecognition';
import FAQ from '@/components/Promotion/desktop/faq';

// ─── Mobile / Tablet Components ──────────────────────────────
import MobileHero from '@/components/Promotion/other/Hero';
import WhyChooseUs from '@/components/Promotion/other/WhyChooseUs';
import Awards from '@/components/Promotion/other/Awards';
import BatteryPricing from '@/components/Promotion/other/BatteryPricing';
import QuoteForm from '@/components/Promotion/other/QuoteForm';
import MobileBrands from '@/components/Promotion/other/Brands';
import ContactInfo from '@/components/Promotion/other/ContactInfo';

// ─── Shared Data ─────────────────────────────────────────────
import {
  // Desktop data
  desktopHeroData,
  desktopLimitedSpotData,
  desktopTrustRegenData,
  desktopFreeQuotationData,
  desktopBatteryRebatesData,
  desktopBrandsData,
  desktopHighEnergyData,
  desktopBatteryPackageData,
  desktopReadyToBeginData,
  desktopSolarFinancingData,
  desktopAboutRegenData,
  desktopFindOutWhyData,
  desktopAchievementsData,
  desktopFaqData,
  // Mobile data
  mobileHeroData,
  mobileWhyChooseUsData,
  mobileAwardsData,
  mobileBatteryPricingData,
  mobileQuoteFormData,
  mobileBrandsData,
  mobileContactInfoData,
} from '@/app/(promotion)/promotionPageData';

// Desktop recognitions (SunWiz first, then Google & SolarQuotes) — rendered as
// two separate ordered sections before the Achievements band.
const desktopRecognitions = desktopAchievementsData.recognitions ?? [];
const sunwizRecognitions = desktopRecognitions.slice(0, 1);
const googleSolarquotesRecognitions = desktopRecognitions.slice(1);

const CombinedPromoPage = () => {
  const mobilehandleScrollToWhy = () => {
    const element = document.getElementById('why-regen-power-mobile');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };


  return (
    <div className="flex flex-col min-h-[100dvh] bg-white overflow-x-hidden w-full">
      {/* ═══ Desktop View (lg and above) ═══ */}
      <div className="hidden lg:block">
        <DesktopHero data={desktopHeroData} />
        <LimitedSpot data={desktopLimitedSpotData} />
        <TrustRegen data={desktopTrustRegenData} />
        <div id='quote-form-section'>
          <FreeQuotation data={desktopFreeQuotationData} />
        </div>
        <BatteryRebates data={desktopBatteryRebatesData} />
        <DesktopBrands data={desktopBrandsData} />
        <HighEnergy data={desktopHighEnergyData} />
        <BatteryPackage data={desktopBatteryPackageData} />
        <ReadyToBegin data={desktopReadyToBeginData} />
        <SolarFinancing data={desktopSolarFinancingData} />
        <AboutRegen data={desktopAboutRegenData} />
        {/* Product Reviews */}
        <FindOutWhy data={desktopFindOutWhyData} />
        {/* Sunwiz Recognition */}
        <IndustryRecognition recognitions={sunwizRecognitions} variant="single" />
        {/* Google & SolarQuotes Logo */}
        <IndustryRecognition recognitions={googleSolarquotesRecognitions} variant="grid" />
        {/* Achievements */}
        <Acheivements data={desktopAchievementsData} />
        <FAQ data={desktopFaqData} />
      </div>

      {/* ═══ Mobile / Tablet View (below lg) ═══ */}
      <div className="lg:hidden w-full overflow-x-hidden">
        {/* 1. Hero */}
        <MobileHero
          title={mobileHeroData.title}
          subtitle={mobileHeroData.subtitle}
          highlight={mobileHeroData.highlight}
          description={mobileHeroData.description}
          cta={mobileHeroData.cta}
          backgroundImage={mobileHeroData.backgroundImage}
          onCtaClick={mobilehandleScrollToWhy}
        />

        {/* 2. Why Choose Us */}
        <WhyChooseUs
          title={mobileWhyChooseUsData.title}
          titleGreen={mobileWhyChooseUsData.titleGreen}
          cards={mobileWhyChooseUsData.cards}
        />

        {/* 3. Awards */}
        <Awards awards={mobileAwardsData} />

        {/* 4. Battery Pricing Comparison */}
        <BatteryPricing
          backgroundImage={mobileBatteryPricingData.backgroundImage}
          centerImage={mobileBatteryPricingData.centerImage}
          items={mobileBatteryPricingData.items}
        />

        {/* 5. Get A Quote Form */}
        <div id="quote-form-section-mobile">
          <QuoteForm
            title={mobileQuoteFormData.title}
            noticeText={mobileQuoteFormData.noticeText}
            buttonText={mobileQuoteFormData.buttonText}

          />
        </div>

        {/* 6. Brands & Showcase */}
        <MobileBrands
          title={mobileBrandsData.title}
          titleGreen={mobileBrandsData.titleGreen}
          description={mobileBrandsData.description}
          brands={mobileBrandsData.brands}
          batteries={mobileBrandsData.batteries}
        />

        {/* 7. Contact Details */}
        <ContactInfo
          title={mobileContactInfoData.title}
          description={mobileContactInfoData.description}
          items={mobileContactInfoData.items}
          socials={mobileContactInfoData.socials}
        />
      </div>
    </div>
  );
};

export default CombinedPromoPage;
