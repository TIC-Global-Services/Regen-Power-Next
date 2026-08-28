export { getStrapiURL, strapiFetch, StrapiFetchError } from "./client";
export type { StrapiError } from "./client";

export { strapiImage } from "./media";
export type { StrapiMedia, StrapiMediaFormat } from "./media";

export type {
  StrapiSection,
  StrapiSingleTypePage,
  StrapiResponse,
} from "./types";

export {
  getSolarPage,
  getOffGridSolutionsPage,
  getCommercialSystemsPage,
  getCommercialOffGridPage,
  getBrandsPage,
  getDealsPage,
  getRebatesPage,
  getBlogPage,
  getBlogArticles,
  getBlogArticle,
  getLatestBlogArticles,
  getPressMediaPage,
  getPressArticles,
  getTestimonials,
  getPressArticle,
  getResearchDevelopmentPage,
  getPortfolioPage,
  getPortfolioProjects,
  getPortfolioProject,
  getLatestPortfolioProjects,
  getReviewsPage,
  getContactPage,
  getFaqPage,
  getGovernmentRebatesPage,
  getBatteryProductPage,
  getBatteryStoragePage,
  getSmartHomeBatteryPage,
  getBrandsWeCarryPage,
  getEvChargingPage,
  getHomePage,
  getPromotionPage,
  getAboutPage,
} from "./fetchers";

export { populate } from "./populate/index";
export { solar, brands, deals, shared, rebates, batteryRebates, batteryProduct, batteryStorage, smartHomeBattery, batteryBrands, evCharging, home, faq, commercial, research, reviews, promotion, about } from "./populate/fragments";

// Backward-compat type aliases (used by existing schemas)
export type {
  StrapiResponse as StrapiResponseType,
  StrapiSingleTypePage as StrapiSingleTypePageType,
  StrapiSection as StrapiSectionType,
} from "./types";
export type { StrapiMedia as StrapiMediaType } from "./media";
