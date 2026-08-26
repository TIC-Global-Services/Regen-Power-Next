import { getHomePage, getTestimonials, getLatestBlogArticles } from "@/lib/strapi";
import { findSection } from "@/lib/strapi/section-utils";
import {
  resolveHomeHero,
  resolveHomeAwards,
  resolveHomeWhyChooseUs,
  resolveHomeExpertise,
  resolveHomeSolarAndStorage,
  resolveHomePartnersAndMembership,
  resolveHomeThreeWaysToPay,
  resolveHomeCraftmanship,
  resolveHomeRealStories,
  resolveHomeReviewsFromCollection,
  resolveSmartSolarCardsFromArticles,
  resolveHomeSmartSolar,
  resolveHomeBatteryQuote,
} from "@/lib/strapi/resolvers";
import type {
  HomeHeroData,
  HomeAwardsData,
  HomeWhyChooseUsData,
  HomeExpertiseData,
  HomeSolarAndStorageData,
  HomePartnersAndMembershipData,
  HomeThreeWaysToPayData,
  HomeCraftmanshipData,
  HomeRealStoriesData,
  HomeSmartSolarData,
  HomeBatteryQuoteData,
} from "@/lib/strapi/schemas";
import Home3dHero from "@/components/home/home3d/Home3dHero";
import AwardAndRecognations from "@/components/home/awardandrecognations";
import WhyChooseUs from "@/components/home/whychooseus";
import Expertise from "@/components/home/expertise";
import Partners from "@/components/home/partners";
import ZeroInterestFinancing from "@/components/home/zerointerestfinancing";
import Craftsmanship from "@/components/home/craftmanship";
import RealStories from "@/components/home/realStories";
import QuoteSection from "@/reuseables/QuoteSection";
import FeatureExplorer from "@/reuseables/FeatureExplorer";
import FeatureCardGrid from "@/reuseables/FeatureCardGrid";

// ─── Fallback images (used until real media is uploaded in Strapi) ──────
import atlogo from "@/assets/home/awardandrecognations/at_logo.png";
import belmont from "@/assets/home/awardandrecognations/belmont_logo.jpg";
import eupd from "@/assets/home/awardandrecognations/eupd_logo.png";
import fast100 from "@/assets/home/awardandrecognations/fast100_logo.png";
import financialtimes from "@/assets/home/awardandrecognations/financialtimes_logo.jpg";
import productReviewBg from "@/assets/home/whychooseus/product_review_bg.png";
import productreview from "@/assets/home/whychooseus/product_review.png";
import businessBg from "@/assets/home/whychooseus/bussiness_operating.png";
import productReviewRatingBg from "@/assets/home/whychooseus/product_review_rating.png";
import expertiseBg from "@/assets/home/expertise/expertise_bg.png";
import residentialImg from "@/assets/home/expertise/residential_solar.png";
import batteryImg from "@/assets/home/expertise/battery_storage.png";
import commercialImg from "@/assets/home/expertise/commercial.png";
import evchargingImg from "@/assets/home/expertise/evcharging.png";
import homeIcon from "@/assets/home/expertise/home.svg";
import batteryIcon from "@/assets/home/expertise/battery.svg";
import factoryIcon from "@/assets/home/expertise/commercial.svg";
import plugIcon from "@/assets/home/expertise/ev.svg";
import teslaEnergyLogo from "@/assets/home/patners/tesla_energy.jpg";
import iStoreLogo from "@/assets/home/patners/istore.png";
import smartEnergyLogo from "@/assets/home/patners/smart_energy.png";
import cleanEnergyLogo from "@/assets/home/patners/clean_energy.png";
import approvedLogo from "@/assets/home/patners/approved.png";
import zeroBusinessBg from "@/assets/home/zerointrest/businessBg.jpg";
import zeroProductReviewBg from "@/assets/home/zerointrest/productReviewBg.png";
import zeroProductReviewRating from "@/assets/home/zerointrest/productReviewRating.png";
import aikoLogo from "@/assets/panels/aiko_logo.png";
import canadianSolarLogo from "@/assets/panels/canadiansolar_logo.png";
import jaSolarLogo from "@/assets/panels/jasolar_logo.png";
import jinkoSolarLogo from "@/assets/panels/jinkosolar_logo.png";
import longiLogo from "@/assets/panels/longi_logo.png";
import risenLogo from "@/assets/panels/risen_logo.png";
import trinaSolarLogo from "@/assets/panels/trinasolar_logo.png";
import googleRating from "@/assets/home/realstories/google_rating.png";
import bestRatedBatch from "@/assets/home/realstories/best_rated_batch.png";
import topPanelInstallers from "@/assets/home/realstories/top_panel_installers.png";
import topRated from "@/assets/home/realstories/top_rated.jpg";
import googleLogo from "@/assets/home/realstories/google_logo.svg";
import productReviewLogo from "@/assets/home/realstories/productReview.svg";
import batteryQuoteImg from "@/assets/home/batteryquote/battery_quote_temp.png";

export const revalidate = 60;

const Home = async () => {
  // Testimonials for the Real Stories marquee come from the shared
  // `testimonial` collection (same source as the reviews page grid), and the
  // Smart Solar cards show the latest `blog-article` entries.
  const [{ data }, { data: testimonialEntries }, latestArticles] = await Promise.all([
    getHomePage(),
    getTestimonials(),
    getLatestBlogArticles(3),
  ]);
  const sections = data.sections ?? [];

  const hero = findSection<HomeHeroData>(sections, "home.hero");
  const awards = findSection<HomeAwardsData>(sections, "home.awards");
  const whychooseus = findSection<HomeWhyChooseUsData>(sections, "home.whychooseus");
  const expertise = findSection<HomeExpertiseData>(sections, "home.expertise");
  const solarAndStorage = findSection<HomeSolarAndStorageData>(
    sections,
    "home.solarandstorage"
  );
  const partners = findSection<HomePartnersAndMembershipData>(
    sections,
    "home.patnersandmembership"
  );
  const threeWays = findSection<HomeThreeWaysToPayData>(
    sections,
    "home.threewaystopay"
  );
  const craftsmanship = findSection<HomeCraftmanshipData>(
    sections,
    "home.craftmanship"
  );
  const realStories = findSection<HomeRealStoriesData>(sections, "home.real-stories");
  const smartSolar = findSection<HomeSmartSolarData>(sections, "home.smartsolar");
  const batteryQuote = findSection<HomeBatteryQuoteData>(
    sections,
    "home.battery-quote"
  );

  const heroProps = resolveHomeHero(hero);
  const awardsProps = resolveHomeAwards(awards);
  const whyChooseUsProps = resolveHomeWhyChooseUs(whychooseus);
  const expertiseProps = resolveHomeExpertise(expertise);
  const solarProps = resolveHomeSolarAndStorage(solarAndStorage);
  const partnersProps = resolveHomePartnersAndMembership(partners);
  const threeWaysProps = resolveHomeThreeWaysToPay(threeWays);
  const craftProps = resolveHomeCraftmanship(craftsmanship);
  const realStoriesProps = resolveHomeRealStories(realStories);
  const collectionReviews = resolveHomeReviewsFromCollection(testimonialEntries);
  const smartSolarProps = resolveHomeSmartSolar(smartSolar);
  // Smart Solar cards: latest blog entries, falling back to the CMS cards.
  const latestSmartSolarCards = resolveSmartSolarCardsFromArticles(latestArticles);
  const smartSolarCards =
    latestSmartSolarCards.length > 0 ? latestSmartSolarCards : (smartSolarProps?.cards ?? []);
  const batteryQuoteProps = resolveHomeBatteryQuote(batteryQuote);

  const awardFallbacks = [atlogo, fast100, eupd, financialtimes, belmont];
  const whyCardImageFallbacks = [productReviewBg, null, businessBg, productReviewRatingBg] as const;
  const whyCardLogoFallbacks = [productreview, null, null, null] as const;
  const whyCardIconFallbacks = [null, null, null, "/star.svg"] as const;
  const expertiseFallbacks = [
    residentialImg,
    batteryImg,
    commercialImg,
    evchargingImg,
  ];
  const iconFallbacks = [homeIcon, batteryIcon, factoryIcon, plugIcon];
  const partnerFallbacks = [teslaEnergyLogo, iStoreLogo];
  const membershipFallbacks = [smartEnergyLogo, cleanEnergyLogo, approvedLogo];
  const zeroCardFallbacks = [zeroBusinessBg, zeroProductReviewBg, zeroProductReviewRating];
  const realBadgeFallbacks = [googleRating, bestRatedBatch, topPanelInstallers, topRated];
  console.log("heroProps",heroProps)

  return (
    <div>
      <Home3dHero
        topSubtitle={heroProps?.topSubtitle}
        mainTitle={heroProps?.mainTitle}
        description={heroProps?.description}
        ctaText={heroProps?.ctaText}
        ctaLink={heroProps?.ctaLink}
        ctaTextColor={heroProps?.CtatextColor}
      />

      {awardsProps && (
        <AwardAndRecognations
          data={{
            ...awardsProps,
            logos: awardsProps.logos.map((l, i) => ({
              ...l,
              src: l.src || awardFallbacks[i % awardFallbacks.length],
            })),
          }}
        />
      )}

      {whyChooseUsProps && (
        <WhyChooseUs
          subtitle={whyChooseUsProps.subtitle}
          title={whyChooseUsProps.title}
          cards={whyChooseUsProps.cards.map((card, i) => ({
            ...card,
            image: card.image || whyCardImageFallbacks[i % whyCardImageFallbacks.length],
            logo: card.logo || whyCardLogoFallbacks[i % whyCardLogoFallbacks.length],
            icon: card.icon || whyCardIconFallbacks[i % whyCardIconFallbacks.length],
          }))}
        />
      )}

      {expertiseProps && (
        <Expertise
          data={{
            ...expertiseProps,
            bgImage: expertiseProps.bgImage || expertiseBg,
            items: expertiseProps.items.map((item, i) => ({
              ...item,
              image: item.image || expertiseFallbacks[i % expertiseFallbacks.length],
              icon: item.icon || iconFallbacks[i % iconFallbacks.length],
            })),
          }}
        />
      )}

      {solarProps && <FeatureExplorer {...solarProps} />}

      {partnersProps && (
        <Partners
          data={{
            ...partnersProps,
            partners: partnersProps.partners.map((p, i) => ({
              ...p,
              image: p.image || partnerFallbacks[i % partnerFallbacks.length],
            })),
            memberships: partnersProps.memberships.map((m, i) => ({
              ...m,
              image: m.image || membershipFallbacks[i % membershipFallbacks.length],
            })),
          }}
        />
      )}

      {threeWaysProps && (
        <ZeroInterestFinancing
          data={{
            ...threeWaysProps,
            cards: threeWaysProps.cards.map((c, i) => ({
              ...c,
              image: c.image || zeroCardFallbacks[i % zeroCardFallbacks.length],
            })),
          }}
        />
      )}

      {craftProps && (
        <Craftsmanship
          data={{
            ...craftProps,
            categories: craftProps.categories.map((cat) => ({
              ...cat,
              logos: cat.logos.map((logo) => ({
                ...logo,
                src: logo.src || brandLogoFallback(logo.name),
              })),
            })),
          }}
        />
      )}

      {realStoriesProps && (
        <RealStories
          data={{
            ...realStoriesProps,
            googleLogo: realStoriesProps.googleLogo || googleLogo,
            productReviewLogo,
            badges: realStoriesProps.badges.map((b, i) => ({
              ...b,
              src: b.src || realBadgeFallbacks[i % realBadgeFallbacks.length],
            })),
            // Prefer the shared testimonial collection; fall back to the
            // section's inline reviews if the collection is empty.
            // Source badges alternate google / productreview by card position.
            reviews: (
              collectionReviews.length > 0
                ? collectionReviews
                : realStoriesProps.reviews
            ).map((r, i) => ({
              ...r,
              source: i % 2 === 0 ? ("google" as const) : ("productreview" as const),
            })),
          }}
        />
      )}

      {smartSolarProps && (
        <FeatureCardGrid
          topSubtitle={smartSolarProps.topSubtitle}
          title={smartSolarProps.title}
          bottomSubtitle={smartSolarProps.bottomSubtitle}
          cards={smartSolarCards}
          textBg
          centerButton={!!smartSolarProps.centerButtonText}
          centerButtonText={smartSolarProps.centerButtonText}
          centerButtonLink={smartSolarProps.centerButtonLink}
        />
      )}

      {batteryQuoteProps && (
        <QuoteSection
          variant="classic"
          subtitle={batteryQuoteProps.subtitle}
          title={batteryQuoteProps.title}
          description={batteryQuoteProps.description}
          image={batteryQuoteProps.image || batteryQuoteImg}
        />
      )}
    </div>
  );
};

export default Home;

// helper: map a brand name to a fallback logo asset
function brandLogoFallback(name: string) {
  const map: Record<string, typeof aikoLogo> = {
    AIKO: aikoLogo,
    "Canadian Solar": canadianSolarLogo,
    "JA Solar": jaSolarLogo,
    "Jinko Solar": jinkoSolarLogo,
    LONGi: longiLogo,
    Risen: risenLogo,
    "Trina Solar": trinaSolarLogo,
  };
  return map[name] || aikoLogo;
}
