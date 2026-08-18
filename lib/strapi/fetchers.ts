import { strapiFetch } from "./client";
import type { StrapiResponse, StrapiSingleTypePage } from "./types";
import type { BlogArticleData } from "./schemas/blog";
import type { PressArticleData } from "./schemas/press-media";
import type { PortfolioProjectData } from "./schemas/portfolio";
import { populate } from "./populate/index";
import * as solar from "./populate/solar";
import * as brands from "./populate/brands";
import * as deals from "./populate/deals";
import * as shared from "./populate/shared";
import * as rebates from "./populate/rebates";
import * as batteryRebates from "./populate/battery-rebates";
import * as batteryProduct from "./populate/battery-product";
import * as batteryStorage from "./populate/battery-storage";
import * as smartHomeBattery from "./populate/smart-home-battery";
import * as evCharging from "./populate/ev-charging";
import * as home from "./populate/home";
import * as batteryBrands from "./populate/battery-brands";
import * as faq from "./populate/faq";
import * as commercial from "./populate/commercial";
import * as research from "./populate/research";
import * as reviews from "./populate/reviews";
import * as contact from "./populate/contact";
import * as blog from "./populate/blog";
import * as portfolio from "./populate/portfolio";
import * as pressMedia from "./populate/press-media";
import * as offGrid from "./populate/off-grid";

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
  governmentRebates: "government-rebates-page",
  batteryProduct: "battery-product-page",
  batteryStorage: "battery-storage-page",
  smartHomeBattery: "smart-home-battery-page",
  brandsWeCarry: "battery-brands-page",
  evCharging: "ev-charging-page",
  home: "home-page",
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
      solar.specsRowCards,
      solar.sizingGuideTable,
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
    populate(blog.hero, shared.categorySection, shared.ctaBanner)
  );

/* ─── blog-article collection ─── */

const BLOG_ARTICLES_PAGE_SIZE = 100;

/** Build the querystring for a page of blog-articles — only the fields the blog grid needs. */
function blogArticlesQuery(page: number, pageSize: number): string {
  const params = new URLSearchParams();
  params.set("fields[0]", "title");
  params.set("fields[1]", "description");
  params.set("fields[2]", "slug");
  params.set("fields[3]", "categories");
  params.set("populate[image]", "true");
  params.set("sort[0]", "publishedAt:desc");
  params.set("pagination[page]", String(page));
  params.set("pagination[pageSize]", String(pageSize));
  return params.toString();
}

function blogArticlesPage(
  page: number,
  pageSize: number
): Promise<StrapiResponse<BlogArticleData[]>> {
  return strapiFetch<StrapiResponse<BlogArticleData[]>>(
    `/blog-articles?${blogArticlesQuery(page, pageSize)}`
  );
}

/** Fetch all published blog-articles (paginated server-side, revalidate 60). */
export const getBlogArticles = async (): Promise<
  StrapiResponse<BlogArticleData[]>
> => {
  const first = await blogArticlesPage(1, BLOG_ARTICLES_PAGE_SIZE);
  if (!Array.isArray(first.data)) {
    // strapiFetch returns { data: { sections: [] } } on error — treat as empty
    return { data: [], meta: first.meta };
  }
  const pagination = (first.meta?.pagination ?? {}) as {
    page?: number;
    pageSize?: number;
    pageCount?: number;
    total?: number;
  };
  const total = pagination.total ?? first.data.length;
  const pageCount = Math.max(
    1,
    pagination.pageCount ?? Math.ceil(total / BLOG_ARTICLES_PAGE_SIZE)
  );
  if (pageCount <= 1) return first;

  const rest = await Promise.all(
    Array.from({ length: pageCount - 1 }, (_, i) =>
      blogArticlesPage(i + 2, BLOG_ARTICLES_PAGE_SIZE)
    )
  );
  return {
    data: rest.reduce((acc, r) => acc.concat(r.data), first.data),
    meta: first.meta,
  };
};
export const getPressMediaPage = () =>
  getSingleType(
    PAGE_SLUGS.pressMedia,
    populate(pressMedia.hero, pressMedia.featuredArticle, pressMedia.latestNewsSection, pressMedia.newsSection, shared.categorySection, shared.ctaBanner)
  );

/* ─── press-article collection ─── */

const PRESS_ARTICLES_PAGE_SIZE = 100;

/** Build the querystring for a page of press-articles — only the fields the news grid needs. */
function pressArticlesQuery(page: number, pageSize: number): string {
  const params = new URLSearchParams();
  params.set("fields[0]", "title");
  params.set("fields[1]", "description");
  params.set("fields[2]", "slug");
  params.set("fields[3]", "categories");
  params.set("fields[4]", "featured");
  params.set("populate[image]", "true");
  params.set("sort[0]", "publishedAt:desc");
  params.set("pagination[page]", String(page));
  params.set("pagination[pageSize]", String(pageSize));
  return params.toString();
}

function pressArticlesPage(
  page: number,
  pageSize: number
): Promise<StrapiResponse<PressArticleData[]>> {
  return strapiFetch<StrapiResponse<PressArticleData[]>>(
    `/press-articles?${pressArticlesQuery(page, pageSize)}`
  );
}

/** Fetch all published press-articles (paginated server-side, revalidate 60). */
export const getPressArticles = async (): Promise<
  StrapiResponse<PressArticleData[]>
> => {
  const first = await pressArticlesPage(1, PRESS_ARTICLES_PAGE_SIZE);
  if (!Array.isArray(first.data)) {
    // strapiFetch returns { data: { sections: [] } } on error — treat as empty
    return { data: [], meta: first.meta };
  }
  const pagination = (first.meta?.pagination ?? {}) as {
    pageCount?: number;
    total?: number;
  };
  const total = pagination.total ?? first.data.length;
  const pageCount =
    pagination.pageCount ?? Math.max(1, Math.ceil(total / PRESS_ARTICLES_PAGE_SIZE));
  if (pageCount <= 1) return first;

  const rest = await Promise.all(
    Array.from({ length: pageCount - 1 }, (_, i) =>
      pressArticlesPage(i + 2, PRESS_ARTICLES_PAGE_SIZE)
    )
  );
  return {
    data: rest.reduce((acc, r) => acc.concat(r.data), first.data),
    meta: first.meta,
  };
};
export const getPortfolioPage = () =>
  getSingleType(
    PAGE_SLUGS.portfolio,
    populate(portfolio.hero, portfolio.filters, shared.categorySection, shared.ctaBanner)
  );

/* ─── portfolio-project collection ─── */

const PORTFOLIO_PROJECTS_PAGE_SIZE = 100;

/** Build the querystring for a page of portfolio-projects — only the fields the portfolio grid needs. */
function portfolioProjectsQuery(page: number, pageSize: number): string {
  const params = new URLSearchParams();
  params.set("fields[0]", "title");
  params.set("fields[1]", "description");
  params.set("fields[2]", "slug");
  params.set("fields[3]", "filters");
  params.set("fields[4]", "state");
  params.set("fields[5]", "suburb");
  params.set("fields[6]", "postcode");
  params.set("populate[image]", "true");
  params.set("sort[0]", "createdAt:desc");
  params.set("pagination[page]", String(page));
  params.set("pagination[pageSize]", String(pageSize));
  return params.toString();
}

function portfolioProjectsPage(
  page: number,
  pageSize: number
): Promise<StrapiResponse<PortfolioProjectData[]>> {
  return strapiFetch<StrapiResponse<PortfolioProjectData[]>>(
    `/portfolio-projects?${portfolioProjectsQuery(page, pageSize)}`
  );
}

/** Fetch all published portfolio-projects (paginated server-side, revalidate 60). */
export const getPortfolioProjects = async (): Promise<
  StrapiResponse<PortfolioProjectData[]>
> => {
  const first = await portfolioProjectsPage(1, PORTFOLIO_PROJECTS_PAGE_SIZE);
  if (!Array.isArray(first.data)) {
    // strapiFetch returns { data: { sections: [] } } on error — treat as empty
    return { data: [], meta: first.meta };
  }
  const pagination = (first.meta?.pagination ?? {}) as {
    pageCount?: number;
    total?: number;
  };
  const total = pagination.total ?? first.data.length;
  const pageCount =
    pagination.pageCount ?? Math.max(1, Math.ceil(total / PORTFOLIO_PROJECTS_PAGE_SIZE));
  if (pageCount <= 1) return first;

  const rest = await Promise.all(
    Array.from({ length: pageCount - 1 }, (_, i) =>
      portfolioProjectsPage(i + 2, PORTFOLIO_PROJECTS_PAGE_SIZE)
    )
  );
  return {
    data: rest.reduce((acc, r) => acc.concat(r.data), first.data),
    meta: first.meta,
  };
};
export const getContactPage = () =>
  getSingleType(
    PAGE_SLUGS.contact,
    populate(contact.hero)
  );

export const getGovernmentRebatesPage = () =>
  getSingleType(
    PAGE_SLUGS.governmentRebates,
    populate(
      batteryRebates.hero,
      batteryRebates.rebatesStackGrid,
      batteryRebates.residentialBattery,
      batteryRebates.federalRebate,
      batteryRebates.financeOption,
      batteryRebates.whatChanges,
      batteryRebates.areYouEligible,
      batteryRebates.rebateDetailSplit,
      batteryRebates.whatSigningUp,
      shared.faq,
      shared.ctaBanner
    )
  );

export const getBatteryProductPage = () =>
  getSingleType(
    PAGE_SLUGS.batteryProduct,
    populate(
      batteryProduct.hero,
      batteryProduct.marquee,
      batteryProduct.brandMatters,
      batteryProduct.howYouUseIt,
      batteryProduct.rightSizing,
      batteryProduct.ourBrands,
      batteryProduct.comparisonTable,
      batteryProduct.compatibleProducts,
      batteryProduct.whatWeCheck,
      batteryProduct.warrantyCoverage,
      batteryProduct.zeroInterest,
      batteryProduct.homeowners,
      shared.ctaBanner
    )
  );

export const getBatteryStoragePage = () =>
  getSingleType(
    PAGE_SLUGS.batteryStorage,
    populate(
      batteryStorage.hero,
      batteryStorage.marquee,
      batteryStorage.debsRebate,
      batteryStorage.jargon,
      batteryStorage.billImpact,
      batteryStorage.rangeGrid,
      batteryStorage.capacityBlocks,
      batteryStorage.greatFit,
      batteryStorage.solarMeaning,
      batteryStorage.installationTimeline,
      batteryStorage.team,
      batteryStorage.customerStories,
      batteryStorage.faq,
      batteryStorage.ctaBanner
    )
  );

export const getSmartHomeBatteryPage = () =>
  getSingleType(
    PAGE_SLUGS.smartHomeBattery,
    populate(
      smartHomeBattery.hero,
      smartHomeBattery.marquee,
      smartHomeBattery.greatFit,
      smartHomeBattery.fourPillars,
      smartHomeBattery.splitSection,
      smartHomeBattery.timeline,
      smartHomeBattery.brandsGrid,
      smartHomeBattery.installBento,
      smartHomeBattery.ctaBanner
    )
  );

export const getBrandsWeCarryPage = () =>
  getSingleType(
    PAGE_SLUGS.brandsWeCarry,
    populate(
      batteryBrands.hero,
      batteryBrands.brandLongTermBet,
      batteryBrands.whatItTakes,
      batteryBrands.sevenBrand,
      batteryBrands.comparisonTable,
      batteryBrands.quickWay,
      batteryBrands.cecApproved,
      batteryBrands.whyOurInstaller,
      batteryBrands.faq,
      batteryBrands.ctaBanner
    )
  );

export const getHomePage = () =>
  getSingleType(
    PAGE_SLUGS.home,
    populate(
      home.hero,
      home.awards,
      home.whychooseus,
      home.expertise,
      home.solarandstorage,
      home.patnersandmembership,
      home.threewaystopay,
      home.craftmanship,
      home.realStories,
      home.smartsolar,
      home.batteryQuote
    )
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
      evCharging.faq,
      evCharging.ctaBanner
    )
  );
