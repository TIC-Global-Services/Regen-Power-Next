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

// ─── Fallback Data (used when Strapi has no promotion-page content) ───────
import {
  desktopHeroData as fbHero,
  desktopLimitedSpotData as fbLimitedSpot,
  desktopTrustRegenData as fbTrustRegen,
  desktopFreeQuotationData as fbFreeQuotation,
  desktopBatteryRebatesData as fbBatteryRebates,
  desktopBrandsData as fbBrands,
  desktopHighEnergyData as fbHighEnergy,
  desktopBatteryPackageData as fbBatteryPackage,
  desktopReadyToBeginData as fbReadyToBegin,
  desktopSolarFinancingData as fbSolarFinancing,
  desktopAboutRegenData as fbAboutRegen,
  desktopFindOutWhyData as fbFindOutWhy,
  desktopAchievementsData as fbAchievements,
  desktopFaqData as fbFaq,
  mobileHeroData as fbMobileHero,
  mobileWhyChooseUsData as fbMobileWhyChooseUs,
  mobileAwardsData as fbMobileAwards,
  mobileBatteryPricingData as fbMobileBatteryPricing,
  mobileQuoteFormData as fbMobileQuoteForm,
  mobileBrandsData as fbMobileBrands,
  mobileContactInfoData as fbMobileContactInfo,
} from '@/app/(promotion)/promotionPageData';

import type { ResolvedPromotionPage } from '@/lib/strapi/resolvers/promotion-page';
import {
  deriveMobileAwards,
  deriveMobileContactInfo,
  deriveMobileBatteryPricing,
} from '@/lib/strapi/resolvers/promotion';

export interface CombinedPromoPageProps {
  promotion?: ResolvedPromotionPage | null;
}

const CombinedPromoPage = ({ promotion }: CombinedPromoPageProps) => {
  // ─── Resolve desktop props (Strapi if present, fallback otherwise) ───────
  const hero = promotion?.hero
    ? {
        backgroundImage: promotion.hero.backgroundImage ?? fbHero.backgroundImage,
        batteryImage: promotion.hero.batteryImage ?? fbHero.batteryImage,
        title: promotion.hero.title || fbHero.title,
        subtitle: promotion.hero.subtitle || fbHero.subtitle,
        packages: promotion.hero.packages.length ? promotion.hero.packages : fbHero.packages,
        sidebar: {
          title: promotion.hero.sidebar.title || fbHero.sidebar.title,
          subtitle: promotion.hero.sidebar.subtitle || fbHero.sidebar.subtitle,
          paragraphs: promotion.hero.sidebar.paragraphs.length
            ? promotion.hero.sidebar.paragraphs
            : fbHero.sidebar.paragraphs,
          ctaText: promotion.hero.sidebar.ctaText || fbHero.sidebar.ctaText,
          ctaLink: promotion.hero.sidebar.ctaLink || undefined,
        },
      }
    : fbHero;

  const limitedSpot = promotion?.limitedSpots
    ? {
        title: promotion.limitedSpots.title || fbLimitedSpot.title,
        cards: promotion.limitedSpots.cards.length
          ? promotion.limitedSpots.cards.map((c) => ({
              type: c.type as typeof fbLimitedSpot.cards[number]["type"],
              value: c.value,
              title: c.title,
              bgImage: c.bgImage ?? undefined,
              showBadge: c.showBadge,
              nestedCard: c.nestedCard
                ? {
                    type: c.nestedCard.type as NonNullable<typeof fbLimitedSpot.cards[number]["nestedCard"]>["type"],
                    logoPath: c.nestedCard.logoPath ?? undefined,
                    imagePath: c.nestedCard.imagePath ?? undefined,
                    showBadge: c.nestedCard.showBadge,
                  }
                : undefined,
            }))
          : fbLimitedSpot.cards,
      }
    : fbLimitedSpot;

  const trustRegen = promotion?.trustRegen
    ? {
        title: promotion.trustRegen.title || fbTrustRegen.title,
        subtitle: promotion.trustRegen.subtitle || fbTrustRegen.subtitle,
        features: promotion.trustRegen.features.length
          ? promotion.trustRegen.features.map((f) => ({
              title: f.title,
              description: f.description,
              icon: f.icon ?? '',
            }))
          : fbTrustRegen.features,
      }
    : fbTrustRegen;

  const freeQuotation = promotion?.freeQuotation
    ? {
        title: promotion.freeQuotation.title || fbFreeQuotation.title,
        noticeText: promotion.freeQuotation.noticeText || fbFreeQuotation.noticeText,
        videoThumbnail: promotion.freeQuotation.videoThumbnail ?? fbFreeQuotation.videoThumbnail,
        videoUrl: promotion.freeQuotation.videoUrl ?? undefined,
        buttonText: promotion.freeQuotation.buttonText || fbFreeQuotation.buttonText,
      }
    : fbFreeQuotation;

  const batteryRebates = promotion?.batteryRebates
    ? {
        title: promotion.batteryRebates.title || fbBatteryRebates.title,
        subtitle: promotion.batteryRebates.subtitle || fbBatteryRebates.subtitle,
        bgImage: promotion.batteryRebates.bgImage ?? fbBatteryRebates.bgImage,
        data: promotion.batteryRebates.data.length ? promotion.batteryRebates.data : fbBatteryRebates.data,
      }
    : fbBatteryRebates;

  const brands = promotion?.trustedBrands
    ? {
        title: promotion.trustedBrands.title || fbBrands.title,
        subtitle: promotion.trustedBrands.subtitle || fbBrands.subtitle,
        brands: promotion.trustedBrands.brands.length
          ? promotion.trustedBrands.brands.map((b) => ({ name: b.name, logo: b.logo ?? '' }))
          : fbBrands.brands,
        batteries: promotion.trustedBrands.batteries.length
          ? promotion.trustedBrands.batteries.map((b) => ({
              name: b.name,
              image: b.image ?? '',
              logo: b.logo ?? '',
            }))
          : fbBrands.batteries,
      }
    : fbBrands;

  const highEnergy = promotion?.highEnergy
    ? {
        title: promotion.highEnergy.title || fbHighEnergy.title,
        bullets: promotion.highEnergy.bullets.length ? promotion.highEnergy.bullets : fbHighEnergy.bullets,
        badges: promotion.highEnergy.badges.length
          ? promotion.highEnergy.badges.map((b) => ({ name: b.name, logoPath: b.logoPath ?? '' }))
          : fbHighEnergy.badges,
      }
    : fbHighEnergy;

  const batteryPackage = promotion?.batteryPackage
    ? {
        title: promotion.batteryPackage.title || fbBatteryPackage.title,
        centerImage: promotion.batteryPackage.centerImage?.url
          ? { url: promotion.batteryPackage.centerImage.url, alt: promotion.batteryPackage.centerImage.alt }
          : fbBatteryPackage.centerImage,
        packages: promotion.batteryPackage.packages.length
          ? promotion.batteryPackage.packages.map((p) => ({
              name: p.name,
              originalPrice: p.originalPrice,
              finalPrice: p.finalPrice,
              rebates: p.rebates,
              installationText: p.installationText,
              pricingNote: p.pricingNote,
              image: p.image ?? '',
            }))
          : fbBatteryPackage.packages,
      }
    : fbBatteryPackage;

  const readyToBegin = promotion?.readyToBegin
    ? {
        title: promotion.readyToBegin.title || fbReadyToBegin.title,
        noticeText: promotion.readyToBegin.noticeText || fbReadyToBegin.noticeText,
        contactDetails: promotion.readyToBegin.contactDetails
          ? {
              title: promotion.readyToBegin.contactDetails.title || fbReadyToBegin.contactDetails.title,
              description:
                promotion.readyToBegin.contactDetails.description || fbReadyToBegin.contactDetails.description,
              data: promotion.readyToBegin.contactDetails.data.length
                ? promotion.readyToBegin.contactDetails.data
                : fbReadyToBegin.contactDetails.data,
              socials: promotion.readyToBegin.contactDetails.socials.length
                ? promotion.readyToBegin.contactDetails.socials.map((s) => ({
                    name: s.name,
                    link: s.link || (s as { url?: string }).url || '',
                  }))
                : fbReadyToBegin.contactDetails.socials,
            }
          : fbReadyToBegin.contactDetails,
        buttonText: promotion.readyToBegin.buttonText || fbReadyToBegin.buttonText,
      }
    : fbReadyToBegin;

  const solarFinancing = promotion?.solarFinancing
    ? {
        title: promotion.solarFinancing.title || fbSolarFinancing.title,
        subtitle: promotion.solarFinancing.subtitle || fbSolarFinancing.subtitle,
        leftBoxText: promotion.solarFinancing.leftBoxText || fbSolarFinancing.leftBoxText,
        leftBoxTitle: promotion.solarFinancing.leftBoxTitle || undefined,
        leftBoxIcon: promotion.solarFinancing.leftBoxIcon || undefined,
        bgImage: promotion.solarFinancing.bgImage ?? undefined,
        gridItems: promotion.solarFinancing.gridItems.length
          ? promotion.solarFinancing.gridItems.map((g) => ({
              title: g.title,
              description: g.description,
              icon: g.icon ?? '',
            }))
          : fbSolarFinancing.gridItems,
      }
    : fbSolarFinancing;

  const aboutRegen = promotion?.aboutRegen
    ? {
        title: promotion.aboutRegen.title || fbAboutRegen.title,
        subtitle: promotion.aboutRegen.subtitle || fbAboutRegen.subtitle,
        paragraphs: promotion.aboutRegen.paragraphs || fbAboutRegen.paragraphs,
        image: promotion.aboutRegen.image ?? fbAboutRegen.image,
        videoUrl: promotion.aboutRegen.videoUrl ?? undefined,
      }
    : fbAboutRegen;

  const findOutWhy = promotion?.findOutWhy
    ? {
        title: promotion.findOutWhy.title || fbFindOutWhy.title,
        subtitle: promotion.findOutWhy.subtitle || fbFindOutWhy.subtitle,
        description: promotion.findOutWhy.description || fbFindOutWhy.description,
        awards: promotion.findOutWhy.awards.length
          ? promotion.findOutWhy.awards.map((a) => ({
              image: a.image ?? '',
              description: a.description,
            }))
          : fbFindOutWhy.awards,
        reviews: promotion.findOutWhy.reviews.length ? promotion.findOutWhy.reviews : fbFindOutWhy.reviews,
      }
    : fbFindOutWhy;

  const achievements = promotion?.achievements
    ? {
        title: promotion.achievements.title || fbAchievements.title,
        subtitle: promotion.achievements.subtitle || fbAchievements.subtitle,
        description: promotion.achievements.description || fbAchievements.description,
        awards: promotion.achievements.awards.length
          ? promotion.achievements.awards.map((a) => ({ name: a.name, image: a.image ?? '' }))
          : fbAchievements.awards,
        recognitions: promotion.achievements.recognitions.length
          ? promotion.achievements.recognitions.map((r) => ({
              title: r.title,
              awards: r.awards.map((a) => ({ name: a.name, image: a.image ?? '' })),
            }))
          : fbAchievements.recognitions,
      }
    : fbAchievements;

  const faq = promotion?.faqSection
    ? {
        title: promotion.faqSection.title || fbFaq.title,
        subtitle: promotion.faqSection.subtitle || fbFaq.subtitle,
        description: promotion.faqSection.description || fbFaq.description,
        highlightCard: promotion.faqSection.highlightCard
          ? {
              title: promotion.faqSection.highlightCard.title || fbFaq.highlightCard.title,
              bgImage: promotion.faqSection.highlightCard.bgImage ?? fbFaq.highlightCard.bgImage,
              items: promotion.faqSection.highlightCard.items.length
                ? promotion.faqSection.highlightCard.items.map((it) => ({
                    question: it.question,
                    answer: it.answer,
                    bulletPoints: it.bulletPoints ?? undefined,
                  }))
                : fbFaq.highlightCard.items,
            }
          : fbFaq.highlightCard,
        faqItems: promotion.faqSection.faqItems.length
          ? promotion.faqSection.faqItems.map((f) => ({
              question: f.question,
              answer: f.answer,
            }))
          : fbFaq.faqItems,
      }
    : fbFaq;

  // Desktop recognitions (SunWiz first, then Google & SolarQuotes) — rendered as
  // two separate ordered sections before the Achievements band.
  const recognitions = achievements.recognitions ?? [];
  const sunwizRecognitions = recognitions.slice(0, 1);
  const googleSolarquotesRecognitions = recognitions.slice(1);

  // ─── Mobile derived / explicit overrides ────────────────────────────────
  const mobileHero = promotion?.hero
    ? {
        title: promotion.hero.mobileTitle || promotion.hero.title || fbMobileHero.title,
        subtitle: promotion.hero.mobileSubtitle || promotion.hero.subtitle || fbMobileHero.subtitle,
        highlight: promotion.hero.highlight ?? fbMobileHero.highlight,
        description: promotion.hero.description || fbMobileHero.description,
        cta: promotion.hero.cta ?? fbMobileHero.cta,
        backgroundImage: promotion.hero.backgroundImage ?? fbMobileHero.backgroundImage,
      }
    : fbMobileHero;

  const mobileWhyChooseUs = promotion?.limitedSpots
    ? {
        title: promotion.limitedSpots.title || fbMobileWhyChooseUs.title,
        titleGreen: promotion.limitedSpots.titleGreen || fbMobileWhyChooseUs.titleGreen,
        cards: promotion.limitedSpots.cards.length
          ? promotion.limitedSpots.cards.map((c) => ({
              id: String(c.value + c.title).slice(0, 20) || "card",
              type: c.type as typeof fbMobileWhyChooseUs.cards[number]["type"],
              value: c.value,
              title: c.title,
              bgImage: c.bgImage ?? undefined,
              icon: c.icon ?? undefined,
              logoPath: c.logoPath ?? c.nestedCard?.logoPath ?? undefined,
            }))
          : fbMobileWhyChooseUs.cards,
        ctatext: promotion.limitedSpots.ctaText || (fbMobileWhyChooseUs as { ctatext?: string }).ctatext,
        ctaLink: promotion.limitedSpots.ctaLink || undefined,
      }
    : fbMobileWhyChooseUs;

  const mobileAwards = (() => {
    const derived = deriveMobileAwards(promotion?.findOutWhy ?? null, promotion?.achievements ?? null, promotion?.awardsSection ?? null);
    if (derived) return derived;
    return fbMobileAwards;
  })();

  const mobileBatteryPricing = (() => {
    const derived = deriveMobileBatteryPricing(
      promotion?.batteryPackage ?? null,
      promotion?.batteryPricing ?? null,
      promotion?.batteryRebates?.bgImage ?? undefined
    );
    if (derived) return derived as typeof fbMobileBatteryPricing;
    return fbMobileBatteryPricing;
  })();

  const mobileQuoteForm = promotion?.freeQuotation
    ? {
        title: promotion.freeQuotation.title || fbMobileQuoteForm.title,
        noticeText: promotion.freeQuotation.noticeText || fbMobileQuoteForm.noticeText,
        noticehighlight: (promotion.freeQuotation as { noticeHighlight?: string }).noticeHighlight ?? fbMobileQuoteForm.noticehighlight,
        buttonText: promotion.freeQuotation.buttonText || fbMobileQuoteForm.buttonText,
      }
    : fbMobileQuoteForm;

  const mobileBrands = promotion?.trustedBrands
    ? {
        title: promotion.trustedBrands.subtitle || promotion.trustedBrands.titleGreen || fbMobileBrands.title,
        titleGreen: promotion.trustedBrands.title || fbMobileBrands.titleGreen,
        description: promotion.trustedBrands.description || fbMobileBrands.description,
        brands: promotion.trustedBrands.brands.length
          ? promotion.trustedBrands.brands.map((b) => ({ name: b.name, logo: b.logo ?? '' }))
          : fbMobileBrands.brands,
        batteries: promotion.trustedBrands.batteries.length
          ? promotion.trustedBrands.batteries.map((b) => ({
              name: b.name,
              image: b.image ?? '',
              logo: b.logo ?? '',
            }))
          : fbMobileBrands.batteries,
      }
    : fbMobileBrands;

  const mobileContactInfo = (() => {
    const derived = deriveMobileContactInfo(promotion?.readyToBegin ?? null, promotion?.contactInfo ?? null);
    if (derived) return derived as typeof fbMobileContactInfo;
    return fbMobileContactInfo;
  })();

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
        <DesktopHero data={hero} />
        <LimitedSpot data={limitedSpot} />
        <TrustRegen data={trustRegen} />
        <div id="quote-form-section">
          <FreeQuotation data={freeQuotation} />
        </div>
        <BatteryRebates data={batteryRebates} />
        <DesktopBrands data={brands} />
        <HighEnergy data={highEnergy} />
        <BatteryPackage data={batteryPackage} />
        <ReadyToBegin data={readyToBegin} />
        <SolarFinancing data={solarFinancing} />
        <AboutRegen data={aboutRegen} />
        {/* Product Reviews */}
        <FindOutWhy data={findOutWhy} />
        {/* Sunwiz Recognition */}
        <IndustryRecognition recognitions={sunwizRecognitions} variant="single" />
        {/* Google & SolarQuotes Logo */}
        <IndustryRecognition recognitions={googleSolarquotesRecognitions} variant="grid" />
        {/* Achievements */}
        <Acheivements data={achievements} />
        <FAQ data={faq} />
      </div>

      {/* ═══ Mobile / Tablet View (below lg) ═══ */}
      <div className="lg:hidden w-full overflow-x-hidden">
        {/* 1. Hero */}
        <MobileHero
          title={mobileHero.title}
          subtitle={mobileHero.subtitle}
          highlight={mobileHero.highlight}
          description={mobileHero.description}
          cta={mobileHero.cta}
          backgroundImage={mobileHero.backgroundImage}
          onCtaClick={mobilehandleScrollToWhy}
        />

        {/* 2. Why Choose Us */}
        <WhyChooseUs
          title={mobileWhyChooseUs.title}
          titleGreen={mobileWhyChooseUs.titleGreen}
          cards={mobileWhyChooseUs.cards}
        />

        {/* 3. Awards */}
        <Awards awards={mobileAwards} />

        {/* 4. Battery Pricing Comparison */}
        <BatteryPricing
          backgroundImage={mobileBatteryPricing.backgroundImage}
          centerImage={mobileBatteryPricing.centerImage}
          items={mobileBatteryPricing.items}
        />

        {/* 5. Get A Quote Form */}
        <div id="quote-form-section-mobile">
          <QuoteForm
            title={mobileQuoteForm.title}
            noticeText={mobileQuoteForm.noticeText}
            buttonText={mobileQuoteForm.buttonText}
          />
        </div>

        {/* 6. Brands & Showcase */}
        <MobileBrands
          title={mobileBrands.title}
          titleGreen={mobileBrands.titleGreen}
          description={mobileBrands.description}
          brands={mobileBrands.brands}
          batteries={mobileBrands.batteries}
        />

        {/* 7. Contact Details */}
        <ContactInfo
          title={mobileContactInfo.title}
          description={mobileContactInfo.description}
          items={mobileContactInfo.items}
          socials={mobileContactInfo.socials}
        />
      </div>
    </div>
  );
};

export default CombinedPromoPage;
