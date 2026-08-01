import HeroSection from "../components/home/Hero";
import type { HeroSectionData } from "../components/home/Hero";
import AwardAndRecognations from "@/components/home/awardandrecognations";
import type { AwardAndRecognationsData } from "@/components/home/awardandrecognations";
import WhyChooseUs from "@/components/home/whychooseus";
import type { WhyChooseUsData } from "@/components/home/whychooseus";
import Expertise from "@/components/home/expertise";
import type { ExpertiseData } from "@/components/home/expertise";
import Partners from "@/components/home/partners";
import type { PartnersData } from "@/components/home/partners";
import ZeroInterestFinancing from "@/components/home/zerointrestfinancing";
import type { ZeroInterestFinancingData } from "@/components/home/zerointrestfinancing";
import FeatureExplorer from "@/reuseables/FeatureExplorer";
import type { FeatureExplorerItem } from "@/reuseables/FeatureExplorer";
import FeatureCardGrid from "@/reuseables/FeatureCardGrid";
import type { FeatureCardGridProps, FeatureCardItem } from "@/reuseables/FeatureCardGrid";
import Craftsmanship from "@/components/home/craftmanship";
import type { CraftsmanshipData } from "@/components/home/craftmanship";
import RealStories from "@/components/home/realStories";
import type { RealStoriesData } from "@/components/home/realStories";
import BatteryQuote from "@/components/home/batteryQuote";
import type { BatteryQuoteData } from "@/components/home/batteryQuote";

// ─── Image Imports ───────────────────────────────────────────────────────────

// Hero
import heroBg from "@/assets/home/home_hero_bg.png";

// Awards & Recognitions
import atlogo from "@/assets/home/awardandrecognations/at_logo.png";
import belmont from "@/assets/home/awardandrecognations/belmont_logo.jpg";
import eupd from "@/assets/home/awardandrecognations/eupd_logo.png";
import fast100 from "@/assets/home/awardandrecognations/fast100_logo.png";
import financialtimes from "@/assets/home/awardandrecognations/financialtimes_logo.jpg";

// Why Choose Us
import productReviewBg from "@/assets/home/whychooseus/product_review_bg.png";
import productreview from "@/assets/home/whychooseus/product_review.png";
import businessBg from "@/assets/home/whychooseus/bussiness_operating.png";
import productReviewRatingBg from "@/assets/home/whychooseus/product_review_rating.png";

// Expertise
import expertiseBg from "@/assets/home/expertise/expertise_bg.png";
import residentialImg from "@/assets/home/expertise/residential_solar.png";
import batteryImg from "@/assets/home/expertise/battery_storage.png";
import commercialImg from "@/assets/home/expertise/commercial.png";
import evchargingImg from "@/assets/home/expertise/evcharging.png";
import homeIcon from "@/assets/home/expertise/home.svg";
import batteryIcon from "@/assets/home/expertise/battery.svg";
import factoryIcon from "@/assets/home/expertise/commercial.svg";
import plugIcon from "@/assets/home/expertise/ev.svg";

// Partners
import teslaEnergyLogo from "@/assets/home/patners/tesla_energy.jpg";
import iStoreLogo from "@/assets/home/patners/istore.png";
import smartEnergyLogo from "@/assets/home/patners/smart_energy.png";
import cleanEnergyLogo from "@/assets/home/patners/clean_energy.png";
import approvedLogo from "@/assets/home/patners/approved.png";

// Zero-Interest Financing
import zeroBusinessBg from "@/assets/home/zerointrest/businessBg.jpg";
import zeroProductReviewBg from "@/assets/home/zerointrest/productReviewBg.png";
import zeroProductReviewRating from "@/assets/home/zerointrest/productReviewRating.png";

// Craftsmanship (panel/inverter brand logos)
import aikoLogo from "@/assets/panels/aiko_logo.png";
import canadianSolarLogo from "@/assets/panels/canadiansolar_logo.png";
import jaSolarLogo from "@/assets/panels/jasolar_logo.png";
import jinkoSolarLogo from "@/assets/panels/jinkosolar_logo.png";
import longiLogo from "@/assets/panels/longi_logo.png";
import risenLogo from "@/assets/panels/risen_logo.png";
import trinaSolarLogo from "@/assets/panels/trinasolar_logo.png";

// Real Stories
import googleRating from "@/assets/home/realstories/google_rating.png";
import bestRatedBatch from "@/assets/home/realstories/best_rated_batch.png";
import topPanelInstallers from "@/assets/home/realstories/top_panel_installers.png";
import topRated from "@/assets/home/realstories/top_rated.jpg";
import googleLogo from "@/assets/home/realstories/google_logo.svg";

// Battery Quote
import batteryQuoteImg from "@/assets/home/batteryquote/battery_quote_temp.png";
import Newsandinsights from "@/components/home/newsandinsights";

// ─── Data Objects ────────────────────────────────────────────────────────────

const heroData: HeroSectionData = {
  mediaSrc: heroBg,
  mediaType: "image",
  topSubtitle: "Step Into the",
  mainTitle: "Future of Energy",
  description:
    "WA's #1 rated solar installer with 45,000+ installations since 2003.\nCEC-approved. ProductReview Award Winner 2021–2026.",
  ctaText: "Get Started",
  ctaLink: "/contact",
  CtatextColor: "text-black",
};

const awardsData: AwardAndRecognationsData = {
  title: "Awards & Recognition",
  logos: [
    { src: atlogo, alt: "Australian Technologies" },
    { src: fast100, alt: "Fast 100 2020" },
    { src: eupd, alt: "EUPD Research" },
    { src: financialtimes, alt: "Financial Times" },
    { src: belmont, alt: "Belmont Awards" },
  ],
};

const whyChooseUsData: WhyChooseUsData = {
  subtitle: "Why Choose",
  title: "Regen Power",
  awardWinnerCount: 6,
  awardWinnerTitle: "Product Review Award\nWinner",
  awardWinnerBg: productReviewBg,
  awardWinnerLogo: productreview,
  batteryInstallationsCount: 3000,
  batteryInstallationsLabel: "Battery Installations",
  solarInstallationsCount: 45000,
  solarInstallationsLabel: "Solar Installations",
  yearsInBusinessCount: 23,
  yearsInBusinessDescription: "In Business, Operating From \n Canning Vale Office",
  yearsInBusinessBg: businessBg,
  ratingScore: 5,
  ratingPlatformLabel: "Ratings On\nProductReview",
  ratingBg: productReviewRatingBg,
};

const expertiseData: ExpertiseData = {
  subtitle: "Our Energy",
  accentTitle: "Expertise",
  bgImage: expertiseBg,
  items: [
    {
      title: "Residential Solar\n& Storage",
      image: residentialImg,
      icon: homeIcon,
      textColor: "text-black",
    },
    {
      title: "Battery Storage\n& Smart Home",
      image: batteryImg,
      icon: batteryIcon,
      textColor: "text-black",
    },
    {
      title: "Commercial\n& Off-Grid",
      image: commercialImg,
      icon: factoryIcon,
      textColor: "text-black",
    },
    {
      title: "Electric Vehicle\nCharging",
      image: evchargingImg,
      icon: plugIcon,
      textColor: "text-black",
    },
  ],
};

const featureExplorerFeatures: FeatureExplorerItem[] = [
  {
    id: 1,
    number: "01",
    title: "Capture \nEnergy From The Sun",
    description:
      "High-Efficiency Solar Panels Installed On Your Roof Absorb Sunlight Throughout The Day And Convert It Into Direct Current (DC) Electricity, Creating Clean And Renewable Energy For Your Home.",
  },
  {
    id: 2,
    number: "02",
    title: "Store Excess Power for Night",
    description:
      "Premium battery storage systems capture surplus solar generation during the day, giving you reliable power after sunset and complete blackout protection.",
  },
  {
    id: 3,
    number: "03",
    title: "Smart Home Integration",
    description:
      "Monitor and manage your household energy consumption in real-time, directing power to smart appliances and living areas for maximum efficiency.",
  },
  // {
  //   id: 4,
  //   number: "04",
  //   title: "Fast EV Charging",
  //   description:
  //     "Charge your electric vehicle directly from your solar panels or stored battery power, driving on pure sunshine with zero emissions.",
  // },
  // {
  //   id: 5,
  //   number: "05",
  //   title: "Intelligent Power Grid Connection",
  //   description:
  //     "Feed excess energy back to the Perth grid to earn feed-in tariffs, or draw from the grid seamlessly when solar and battery storage are depleted.",
  // },
];

const partnersData: PartnersData = {
  subtitle: "Trusted Relationships",
  title: "Partners & Memberships",
  partnersTitle: "Partners",
  partners: [
    { name: "Tesla Energy Certified Installer", image: teslaEnergyLogo },
    { name: "iStore Premium Partner", image: iStoreLogo },
  ],
  membershipsTitle: "Memberships",
  memberships: [
    { name: "Smart Energy Council", image: smartEnergyLogo },
    { name: "Clean Energy Council Member", image: cleanEnergyLogo },
    { name: "Approved Seller", image: approvedLogo },
  ],
};

const zeroInterestData: ZeroInterestFinancingData = {
  subtitle: "Smart Solar Savings &",
  title: (
    <span className="text-[#63B846] font-medium tracking-tighter">
      Zero-Interest Financing
    </span>
  ),
  cards: [
    {
      title: "Federal STC Rebate",
      description:
        "Receive Thousands Off Your Solar System Through The Federal Government's Small-Scale Technology Certificate (STC) Scheme. Applied As An Upfront Discount At Point Of Sale.",
      image: zeroBusinessBg,
    },
    {
      title: "WA Battery Rebate",
      description:
        "Up To $1,300 Rebate For Eligible WA Households Installing A Battery System Under The Distributed Energy Buyback Scheme (DEBS) Battery Program.",
      image: zeroProductReviewBg,
    },
    {
      title: "Interest-Free Loan Up To $10,000",
      description:
        "Through The WA Battery Rebate, Eligible Synergy Customers Can Access An Interest-Free Loan Of Up To $10,000 Repayable Over 10 Years. No Early Repayment Penalties. Household Income Under $210,000. Must Participate In An Approved VPP Program.",
      image: zeroProductReviewRating,
      ctaText: "Check Your Eligibility",
    },
  ],
};

const craftsmanshipData: CraftsmanshipData = {
  subtitle: "Industry-Leading Brands &",
  title: "Craftsmanship",
  defaultTabId: "panels",
  categories: [
    {
      id: "inverters",
      label: "Inverters",
      logos: [
        { id: "aiko-inv", name: "AIKO", src: aikoLogo },
        { id: "canadian-inv", name: "Canadian Solar", src: canadianSolarLogo },
        { id: "ja-inv", name: "JA Solar", src: jaSolarLogo },
        { id: "jinko-inv", name: "Jinko Solar", src: jinkoSolarLogo },
        { id: "longi-inv", name: "LONGi", src: longiLogo },
      ],
    },
    {
      id: "panels",
      label: "Panels",
      logos: [
        { id: "aiko-pnl", name: "AIKO", src: aikoLogo },
        { id: "canadian-pnl", name: "Canadian Solar", src: canadianSolarLogo },
        { id: "ja-pnl", name: "JA Solar", src: jaSolarLogo },
        { id: "jinko-pnl", name: "Jinko Solar", src: jinkoSolarLogo },
        { id: "canadian2-pnl", name: "Canadian Solar", src: canadianSolarLogo },
        { id: "longi-pnl", name: "LONGi", src: longiLogo },
        { id: "trina-pnl", name: "Trina Solar", src: trinaSolarLogo },
        { id: "risen-pnl", name: "Risen", src: risenLogo },
      ],
    },
    {
      id: "battery-storage",
      label: "Battery Storage",
      logos: [
        { id: "canadian-bat", name: "Canadian Solar", src: canadianSolarLogo },
        { id: "ja-bat", name: "JA Solar", src: jaSolarLogo },
        { id: "longi-bat", name: "LONGi", src: longiLogo },
        { id: "trina-bat", name: "Trina Solar", src: trinaSolarLogo },
      ],
    },
    {
      id: "ev-charger",
      label: "EV Charger",
      logos: [
        { id: "jinko-ev", name: "Jinko Solar", src: jinkoSolarLogo },
        { id: "risen-ev", name: "Risen", src: risenLogo },
        { id: "longi-ev", name: "LONGi", src: longiLogo },
      ],
    },
  ],
};

const realStoriesData: RealStoriesData = {
  subtitle: "Real Stories.",
  title: <span className="text-[#63B846]">Real Results.</span>,
  googleLogo: googleLogo,
  badges: [
    {
      id: "google-rating",
      src: googleRating,
      alt: "Google Rating 4.9 stars based on 1,385+ reviews",
    },
    {
      id: "best-rated",
      src: bestRatedBatch,
      alt: "Best Rated Solar Installer — #1 Most Popular Western Australia 2026",
    },
    {
      id: "top-installers",
      src: topPanelInstallers,
      alt: "Top Rated Solar Panel Installers",
    },
    {
      id: "top-rated",
      src: topRated,
      alt: "Top Rated Installers — Western Australia",
    },
  ],
  reviews: [
    {
      id: "review-1",
      systemTitle: "10kW Solar + Battery System",
      quote:
        "The Entire Process Was Smooth From Consultation To Installation. Our Power Bills Dropped Almost Immediately, And The Team Kept Us Informed Every Step Of The Way.",
      author: "Sarah",
      location: "Perth",
      rating: 5,
      source: "google",
    },
    {
      id: "review-2",
      systemTitle: "10kW Solar + Battery System",
      quote:
        "The Entire Process Was Smooth From Consultation To Installation. Our Power Bills Dropped Almost Immediately, And The Team Kept Us Informed Every Step Of The Way.",
      author: "Sarah",
      location: "Perth",
      rating: 5,
      source: "google",
    },
    {
      id: "review-3",
      systemTitle: "10kW Solar + Battery System",
      quote:
        "The Entire Process Was Smooth From Consultation To Installation. Our Power Bills Dropped Almost Immediately, And The Team Kept Us Informed Every Step Of The Way.",
      author: "Sarah",
      location: "Perth",
      rating: 5,
      source: "google",
    },
    {
      id: "review-4",
      systemTitle: "6.6kW Solar Panel System",
      quote:
        "Outstanding service from start to finish. The team was professional, punctual and the quality of the installation exceeded our expectations. Highly recommend!",
      author: "James",
      location: "Joondalup",
      rating: 5,
      source: "google",
    },
    {
      id: "review-5",
      systemTitle: "13.2kW Commercial Solar",
      quote:
        "Best decision we made for our business. Energy costs cut in half and the ROI was faster than projected. Regen Power made it effortless.",
      author: "Michelle",
      location: "Fremantle",
      rating: 5,
      source: "google",
    },
  ],
};

const featureCardGridCards: FeatureCardGridProps[] = [
  {
    topSubtitle: "Explore Our",
    title: "Latest news & insights",
    bottomSubtitle: "",
    cards: [
      {
        title: "STC Upfront Discount",
        description:
          "Federal STC And WA Rebate Values Are Deducted Directly From Your Quoted Price. You Pay The Post-Rebate Balance.",
        image: zeroBusinessBg,
        textPosition: "top",
        footerTitle: "Best For",
        footerDescription: "Any installation — applied by default.",
      },
      {
        title: "Plenti\nNo-Interest Loan",
        description:
          "WA-Funded No-Interest Loan From $2,001 To $10,000. Flexible 3–10 Year Terms, No Early Repayment Fees.",
        image: zeroProductReviewBg,
        textPosition: "top",
        footerTitle: "Best For",
        footerDescription: "Any installation — applied by default.",
      },
      {
        title: "Third-Party Finance",
        description:
          "We Can Refer You To Accredited Green-Loan Providers For Larger Systems Or Commercial Installations.",
        image: zeroProductReviewRating,
        textPosition: "top",
        footerTitle: "Best For",
        footerDescription: "Any installation — applied by default.",
      },
    ]
  }


];

const batteryQuoteData: BatteryQuoteData = {
  subtitle: "Get Your Free Solar &",
  title: "Battery Quote",
  description:
    "Our technical sales team will design a system tailored to your home, usage, and budget. Most quotes delivered within 24 hours.",
  image: batteryQuoteImg,
};

// ─── Page Component ──────────────────────────────────────────────────────────

export default function Home() {
  return (
    <div className="overflow-hidden">
      <HeroSection data={heroData} />
      <AwardAndRecognations data={awardsData} />
      <WhyChooseUs data={whyChooseUsData} />
      <Expertise data={expertiseData} />
      <FeatureExplorer
        titleNormal="The Science Of"
        titleAccent="Solar & Storage"
        mediaSrc="/solar_house_render.png"
        features={featureExplorerFeatures}
      />
      <Partners data={partnersData} />
      <ZeroInterestFinancing data={zeroInterestData} />
      {/* <FeatureSplitSection /> */}

      {/* <GetSolar/>
      <FAQ/> */}
      <Craftsmanship data={craftsmanshipData} />
      <RealStories data={realStoriesData} />
      <FeatureCardGrid topSubtitle={featureCardGridCards[0].topSubtitle} title={featureCardGridCards[0].title} cards={featureCardGridCards[0].cards} />
      <BatteryQuote data={batteryQuoteData} />
    </div>
  );
}
