import { strapiFetch } from "./client";
import type { StrapiResponse, StrapiSingleTypePage } from "./types";
import { populate } from "./populate/index";
import * as solar from "./populate/solar";
import * as brands from "./populate/brands";
import * as deals from "./populate/deals";
import * as shared from "./populate/shared";
import * as rebates from "./populate/rebates";
import * as faq from "./populate/faq";
import * as commercial from "./populate/commercial";
import * as research from "./populate/research";
import * as reviews from "./populate/reviews";
import * as contact from "./populate/contact";
import * as blog from "./populate/blog";
import * as portfolio from "./populate/portfolio";
import * as pressMedia from "./populate/press-media";
import * as offGrid from "./populate/off-grid";
import * as home from "./populate/home";
import * as evCharging from "./populate/ev-charging";
import * as batteryProduct from "./populate/battery-product";
import * as batteryStorage from "./populate/battery-storage";
import * as smartHomeBattery from "./populate/smart-home-battery";

const PAGE_SLUGS = {
  solar: "solar-page",
  offGridSolutions: "off-grid-solutions-page",
  commercialSystems: "commercial-systems-page",
  commercialOffGrid: "commercial-off-grid-page",
  brands: "brands-page",
  deals: "deals-page",
  rebates: "rebates-page",
  blog: "blog-page",
  pressMedia: "press-media-page",
  researchDevelopment: "research-development-page",
  portfolio: "portfolio-page",
  reviews: "reviews-page",
  contact: "contact-page",
  faq: "faq-page",
  home: "home-page",
  evCharging: "ev-charging-page",
  batteryProduct: "battery-product-page",
  batteryStorage: "battery-storage-page",
  smartHomeBattery: "smart-home-battery-page",
} as const;

async function getSingleType(
  slug: string,
  populateQuery?: string
): Promise<StrapiResponse<StrapiSingleTypePage>> {
  const query = populateQuery ? `?${populateQuery}` : "";
  return strapiFetch<StrapiResponse<StrapiSingleTypePage>>(
    `/${slug}${query}`
  );
}

// Per-page populate compositions — each component owns its fragment
export const getSolarPage = () =>
  getSingleType(
    PAGE_SLUGS.solar,
    populate(
      solar.hero,
      solar.statsAndIntro,
      solar.processSteps,
      solar.brandsGrid,
      solar.inverterSlider,
      solar.specsTable,
      solar.sizingGuide,
      solar.packages,
      solar.timeline,
      solar.engineeringItems,
      shared.faq,
      shared.formSection,
      shared.ctaBanner
    )
  );

export const getBrandsPage = () =>
  getSingleType(
    PAGE_SLUGS.brands,
    populate(
      brands.hero,
      brands.philosophy,
      brands.tier1Means,
      brands.brandsGrid,
      brands.hybridSpecialty,
      brands.invertersSlider,
      brands.criteriaList,
      brands.specsTable,
      shared.faq,
      shared.formSection,
      shared.ctaBanner
    )
  );

export const getDealsPage = () =>
  getSingleType(
    PAGE_SLUGS.deals,
    populate(
      deals.hero,
      deals.philosophy,
      deals.dealsGrid,
      shared.splitSection,
      solar.packages,
      deals.waysToPay,
      deals.whyMatters,
      shared.faq,
      shared.formSection,
      shared.ctaBanner
    )
  );

export const getRebatesPage = () =>
  getSingleType(
    PAGE_SLUGS.rebates,
    populate(
      rebates.hero,
      rebates.rebatePrograms,
      rebates.stcExplainer,
      shared.splitSection,
      rebates.utilityCards,
      rebates.loanBenefits,
      rebates.eligibilityChecker,
      shared.faq,
      shared.ctaBanner
    )
  );

export const getFaqPage = () =>
  getSingleType(
    PAGE_SLUGS.faq,
    populate(faq.hero, faq.categorizedFaq, shared.ctaBanner)
  );

export const getCommercialSystemsPage = () =>
  getSingleType(
    PAGE_SLUGS.commercialSystems,
    populate(
      commercial.systemsHero,
      commercial.systemsStatsCardGrid,
      commercial.systemsTiersSection,
      commercial.systemsComponentsSection,
      commercial.systemsIndustriesSection,
      commercial.systemsFeatureCardGrid,
      commercial.systemsWatchSystemSection,
      commercial.systemsPackagesGrid,
      commercial.systemsProcessFlow,
      commercial.systemsFiveThingsSection,
      shared.faq,
      commercial.systemsCommercialForm,
      shared.ctaBanner
    )
  );

export const getCommercialOffGridPage = () =>
  getSingleType(
    PAGE_SLUGS.commercialOffGrid,
    populate(
      commercial.offGridHero,
      shared.editorialSection,
      commercial.offGridSolutionsPortfolio,
      shared.ctaBanner
    )
  );

export const getResearchDevelopmentPage = () =>
  getSingleType(
    PAGE_SLUGS.researchDevelopment,
    populate(
      research.hero,
      shared.editorialSection,
      research.energySolutionsSection,
      research.coreAchievementsSection,
      shared.ctaBanner
    )
  );

export const getReviewsPage = () =>
  getSingleType(
    PAGE_SLUGS.reviews,
    populate(
      reviews.hero,
      reviews.introSection,
      reviews.testimonialsSection,
      shared.ctaBanner
    )
  );

// Not yet migrated — minimal populate for future use
export const getOffGridSolutionsPage = () =>
  getSingleType(
    PAGE_SLUGS.offGridSolutions,
    populate(
      offGrid.hero,
      offGrid.statsCardGrid,
      offGrid.solutionsPortfolio,
      offGrid.threeSolutionsSection,
      offGrid.iconCardGrid,
      offGrid.hybridGenDetail,
      shared.editorialSection,
      offGrid.worldMap,
      offGrid.microgridSpecTable,
      offGrid.acquaSmartSection,
      offGrid.offGridStory,
      offGrid.overlayCardGrid,
      shared.faq,
      offGrid.offGridForm
    )
  );
export const getBlogPage = () =>
  getSingleType(
    PAGE_SLUGS.blog,
    populate(blog.hero, blog.categoryFilter, shared.categorySection, shared.ctaBanner)
  );
export const getPressMediaPage = () =>
  getSingleType(
    PAGE_SLUGS.pressMedia,
    populate(pressMedia.hero, pressMedia.featuredArticle, pressMedia.latestNewsSection, pressMedia.newsSection, shared.categorySection, shared.ctaBanner)
  );
export const getPortfolioPage = () =>
  getSingleType(
    PAGE_SLUGS.portfolio,
    populate(portfolio.hero, portfolio.filters, shared.categorySection, shared.ctaBanner)
  );
export const getContactPage = () =>
  getSingleType(
    PAGE_SLUGS.contact,
    populate(contact.hero)
  );

export const getEvChargingPage = () =>
  getSingleType(
    PAGE_SLUGS.evCharging,
    populate(
      evCharging.hero,
      evCharging.wallConnector,
      evCharging.chargerProducts,
      evCharging.installerBrands,
      evCharging.benefitCards,
      evCharging.homeBattery,
      evCharging.featureCards,
      evCharging.installationSteps,
      evCharging.stats,
      shared.faq,
      shared.ctaBanner
    )
  );

export const getBatteryProductPage = () =>
  getSingleType(
    PAGE_SLUGS.batteryProduct,
    populate(
      batteryProduct.hero,
      batteryProduct.brandMatters,
      batteryProduct.ourBrands,
      batteryProduct.zeroInterest,
      batteryProduct.keyTerms,
      batteryProduct.whatWeCheck,
      batteryProduct.homeowners,
      shared.ctaBanner,
    )
  );

export const getBatteryStoragePage = () =>
  getSingleType(
    PAGE_SLUGS.batteryStorage,
    populate(
      batteryStorage.hero,
      batteryStorage.debsRebate,
      batteryStorage.jargon,
      batteryStorage.billImpact,
      batteryStorage.rangeGrid,
      batteryStorage.installationTimeline,
      batteryStorage.team,
      batteryStorage.customerStories,
      shared.faq,
      shared.ctaBanner
    )
  );

export const getSmartHomeBatteryPage = () =>
  getSingleType(
    PAGE_SLUGS.smartHomeBattery,
    populate(
      smartHomeBattery.hero,
      smartHomeBattery.splitSection,
      smartHomeBattery.brandsGrid,
      shared.faq,
      shared.ctaBanner
    )
  );

export const getHomePage = () =>
  getSingleType(
    PAGE_SLUGS.home,
    populate(
      home.hero,
      home.awards,
      home.whyChooseUs,
      home.expertise,
      home.solarAndStorage,
      home.partnersAndMembership,
      home.threeWaysToPay,
      home.craftmanship,
      home.realStories,
      home.smartSolar,
      home.batteryQuote
    )
  );
