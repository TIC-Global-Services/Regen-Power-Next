import React from 'react';
import EvHero from '@/components/EvCharging/hero';
import type { EvHeroData } from '@/components/EvCharging/hero';
import WallConnector from '@/components/EvCharging/wallConnector';
import type { WallConnectorData } from '@/components/EvCharging/wallConnector';
import OneCharger from '@/components/EvCharging/OneCharger';
import type { OneChargerData } from '@/components/EvCharging/OneCharger';
import TrustedInstaller from '@/components/EvCharging/trustedInstaller';
import type { TrustedInstallerData } from '@/components/EvCharging/trustedInstaller';
import WhyChargeAtHome from '@/components/EvCharging/WhyChargeAtHome';
import type { WhyChargeAtHomeData } from '@/components/EvCharging/WhyChargeAtHome';
import HomeBattery from '@/components/EvCharging/homebattery';
import type { HomeBatteryData } from '@/components/EvCharging/homebattery';
import UnderOneRoof from '@/components/EvCharging/UnderOneRoof';
import type { UnderOneRoofData } from '@/components/EvCharging/UnderOneRoof';
import EvAccordion from '@/components/EvCharging/EvAccordion';
import type { EvAccordionData } from '@/components/EvCharging/EvAccordion';
import EvWhyChooseUs from '@/components/EvCharging/EvWhyChooseUs';
import type { EvWhyChooseUsData } from '@/components/EvCharging/EvWhyChooseUs';
import FAQ from '@/reuseables/faq';
import GetSolar from '@/reuseables/getsolar';

// Image Imports
import evHeroBg from '@/assets/evcharging/hero_banner.png';
import wallConnectorHero from '@/assets/evcharging/wall_connector_hero.png';
import singlePhase from '@/assets/evcharging/single-phase-7w.png';
import threePhase from '@/assets/evcharging/three-phase-2.png';
import sigenergy from '@/assets/evcharging/sigenergy_trustedinstaller-1.png';
import fronius from '@/assets/evcharging/fronius_trustedinstaller-2.png';
import goodwe from '@/assets/evcharging/goodwe_trustedinstaller-3.png';
import alphaess from '@/assets/evcharging/alphaess_trustedinstaller-4.png';
import cheaperPerKm from '@/assets/evcharging/cheaper_per_km.png';
import alwaysFullCharge from '@/assets/evcharging/always_fullchargein_morning.png';
import youAreInControl from '@/assets/evcharging/you_arein_control.png';
import sigenSetup from '@/assets/evcharging/home_battery_img.png';
import evInstall4 from '@/assets/evcharging/ev-charging-installation-4.png';
import batteryBoost from '@/assets/evcharging/battery_bost.png';
import oneApp from '@/assets/evcharging/one_app.png';
import evImg1 from '@/assets/evcharging/ev-charging-installation-1.png';
import evImg2 from '@/assets/evcharging/ev-charging-installation-2.png';
import evImg3 from '@/assets/evcharging/ev-charging-installation-3.png';
import productReviewBg from '@/assets/home/whychooseus/product_review_bg.png';
import productreview from '@/assets/home/whychooseus/product_review.png';
import businessBg from '@/assets/home/whychooseus/bussiness_operating.png';

// ─── Data Objects ────────────────────────────────────────────────────────────

const evHeroData: EvHeroData = {
  mediaSrc: evHeroBg,
  mediaType: "image",
  isFullScreen: false,
  descriptionColor: 'text-white',
  imageClass: 'object-cover object-bottom',
  topSubtitle: "Smart EV Charging",
  mainTitle: "Installing The Future Of Home Charging",
  description: "Charge your electric vehicle at home with clean solar energy. Regen Power designs and installs premium EV charging systems integrated with your solar and battery setup — powering your drive with sunshine.",
  ctaText: "Get A Free EV Charging Quote",
  ctaLink: "/contact",
};

const wallConnectorData: WallConnectorData = {
  title: "Tesla Wall Connector",
  subtitle: "Gen 3",
  description: "We're A Tesla Certified Partner. So When We Install Tesla, You're Buying It From The Source. The Tesla Wall Connector Gen 3 Is The Most Popular Home EV Charger In Australia — And For Good Reason. It Charges At Up To 22kW On Three-Phase Power, Comes With A 7.3-Metre Tethered Type 2 Cable That Fits Every Modern EV In Australia, And Pairs To The Tesla App For Live Monitoring And Over-The-Air Firmware Updates. Because It Uses A Standard Type 2 Connector, It'll Charge A Tesla Model 3, Model Y, BYD Atto 3, Hyundai Ioniq 5, Kia EV6, MG4, Polestar 2, BMW iX, Mercedes EQ — Basically Every EV Sold In Australia Today, And The Ones Arriving Next Year Too.",
  specs: [
    'Up To 22kW (Three-Phase)',
    '7.3m Tethered Type 2 Cable',
    'IP55 — Indoor Or Outdoor',
    '4-Year Warranty',
  ],
  image: wallConnectorHero,
  imageAlt: "Tesla Wall Connector Gen 3 installed on a home exterior with a Tesla charging",
};

const oneChargerData: OneChargerData = {
  subtitle: "Single-Phase Or Three-Phase?",
  title: "Here's What's Actually Different",
  products: [
    {
      name: 'Single-Phase 7 KW',
      image: singlePhase,
      description: 'Adds About 45 Km Of Range Per Hour — Enough To Fully Replenish The Average Daily Commute In Two To Three Hours, Every Night. Works In Nearly Every Perth Home And With Every EV Sold In Australia. The Right Choice For Daily Commuters And Single-EV Households.',
    },
    {
      name: 'Three-Phase 22 KW',
      image: threePhase,
      description: 'Adds About 130 Km Of Range Per Hour — Ideal for fast charging, large properties, or households with multiple EVs. Requires a three-phase electrical connection. Fully charges most modern electric vehicles in under two hours.',
    },
  ],
};

const trustedInstallerData: TrustedInstallerData = {
  subtitle: "More Than Tesla-Five Charger Brands",
  title: "One Trusted Installer",
  description: "Different Homes, Different EVs, Different Energy Setups. We Carry The Brands We Trust To Deliver — And We're Not Commission-Driven To Push One Over Another. Here's What Each Does Best.",
  brands: [
    {
      name: 'Sigenergy',
      logo: sigenergy,
      title: 'Sigenergy, For The Buyer Thinking 10 Years Ahead',
      description: 'SigenStor Is An All-In-One Solar, Battery, And EV Charging System With Bidirectional Charging And Advanced Energy Management. Designed For Future-Ready Homes.',
    },
    {
      name: 'Fronius',
      logo: fronius,
      title: 'Fronius Wattpilot Solar-Smart, Beautifully Built',
      description: 'Solar-integrated EV charging, built by Fronius.Up to 22 kW | Smart energy management',
    },
    {
      name: 'Goodwe',
      logo: goodwe,
      title: 'Goodwe HCA G2 The Smart-Value All-Rounder',
      description: 'Smart EV Charging Built For Goodwe Solar Systems.',
      specs: 'Up To 22 KW | 5-Year Warranty',
    },
    {
      name: 'AlphaESS',
      logo: alphaess,
      title: 'Alpha ESS, For Alpha Battery Owners',
      description: 'Designed For Alpha ESS Battery Homes, The SMILE-G3-EVCT11 Brings Solar, Battery, And EV Charging Together In One AlphaCloud Platform. Intelligent Charging Modes Optimise Solar Usage, Off-Peak Tariffs, And Charging Performance.',
    },
  ],
};

const whyChargeAtHomeData: WhyChargeAtHomeData = {
  title: "Why Charge At Home",
  benefits: [
    {
      title: 'Cheaper Per Km Than Petrol',
      description: 'Charging at home is dramatically cheaper than petrol — even more so when you re charging from your own solar. Daytime solar charging effectively brings your fuel cost to zero',
      image: cheaperPerKm,
    },
    {
      title: 'Always A Full Charge In The Morning',
      description: 'Plug in when you get home, wake up to a full battery. A 7kW home charger adds about 45 km of range per hour — enough to fully replenish the average daily commute (35–50 km) in two to three hours, every night.',
      image: alwaysFullCharge,
    },
    {
      title: 'You\'re In Control',
      description: 'Schedule charging for off-peak periods, prioritise solar surplus, set kilowatt limits, monitor every session from your phone. The right home charger is smarter than any public station — and never has a queue.',
      image: youAreInControl,
    },
  ],
};

const homeBatteryData: HomeBatteryData = {
  image: sigenSetup,
  imageAlt: "Sigenergy SigenStor Home Battery and EV Charger setup",
  subtitle: "Your EV Becomes",
  title: "A Home Battery",
  paragraphs: [
    "Vehicle-To-Home (V2H) Lets Your Car Push Energy Back Into Your Home — Or Even Back To The Grid. With A 75–100 KWh Battery On Wheels, Your EV Can Power The House For Days During An Outage, Or Shift Load Away From Peak Grid Pricing Automatically.",
    "Sigenergy's SigenStor With The EV DC Charging Module Is The Only System In Our Range That Supports True Bidirectional 25kW DC Charging Today. It's V2X-Ready, Which Means As Carmakers Roll Out V2H/V2G Firmware To Compatible Vehicles, Your System Already Speaks The Language.",
  ],
  bulletPoints: [
    '25 KW Bidirectional Power',
    'Up To 100+ KWh Of Vehicle Storage As Backup',
    'V2H + V2G Ready',
  ],
  ctaText: "Talk To Us About Sigenergy",
  ctaLink: "#contact",
};

const underOneRoofData: UnderOneRoofData = {
  subtitle: "Solar, Battery, EV Charger",
  title: <>Under One <br /> Roof</>,
  description: "Most Installers Will Sell You An EV Charger. We'll Connect It To The Solar We Put On Your Roof, The Battery In Your Garage, And The App You Already Use. One Install Team, One Warranty Conversation, One Ecosystem That Pays For Itself.",
  cards: [
    {
      title: "Solar Surplus Diversion",
      description: "Spare Solar Generation Flows Straight To Your EV Instead Of Being Exported At Low Feed-In Tariffs. Round-Trip Energy Efficiency Improves By 15–20%.",
      image: evInstall4,
      imageAlt: "Solar Panels",
    },
    {
      title: "Battery Boost",
      description: "When The Sun Goes Down, Your Battery Keeps Charging The Car. When The Grid Goes Down, Your Car Keeps Your Home Running.",
      image: batteryBoost,
      imageAlt: "Battery storage system",
    },
    {
      title: "One App",
      description: "Live Monitoring Of Generation, Storage, And EV Charging In A Single Dashboard, Tesla, Sigen, Solar.Web, Or SEMS Depending On The Brand You Choose.",
      image: oneApp,
      imageAlt: "Phone app dashboard mockup",
    },
  ],
};

const evAccordionData: EvAccordionData = {
  subtitle: "How EV charger installation works at",
  title: "Regen Power",
  steps: [
    {
      number: '01',
      title: 'Online Site Survey',
      description: "Tell Us About Your Home And EV. We'll Assess The Job And Provide A Quote, No Obligation.",
      image: evImg1,
    },
    {
      number: '02',
      title: 'Switchboard & Site Audit',
      description: 'We review your electrical switchboard capacity, cable pathing, and safety standards to prepare a final custom design.',
      image: evImg2,
    },
    {
      number: '03',
      title: 'Professional Installation',
      description: 'Our CEC-accredited electricians mount the unit, run dedicated cabling, configure safety switches, and complete the physical install.',
      image: evImg3,
    },
    {
      number: '04',
      title: 'App Integration & Testing',
      description: 'We configure your charger to connect with your home Wi-Fi and solar/battery app, followed by full system commissioning.',
      image: evInstall4,
    },
  ],
};

const evWhyChooseUsData: EvWhyChooseUsData = {
  headerSubtitle: "23 Years Powering Australian",
  headerTitle: "Homes And Counting",
  cards: [
    {
      variant: 'award',
      bgColor: '#EEF6EB',
      logoBg: productReviewBg,
      logo: productreview,
      mobileLogo: '/regen_logo_nav.png',
      count: 500,
      countSuffix: '+',
      title: 'EV Chargers',
      description: 'Installed Across Homes And Businesses.',
      mobileCount: 6,
      mobileCountSuffix: '×',
      mobileTitle: 'Product Review Award Winner',
    },
    {
      variant: 'installations',
      bgColor: '#A0CF44',
      combinedText: '45,000+ Solar Systems And 3,000+ Battery Systems Successfully Installed.',
      productImage: '/home_counting_middle_fallback.png',
      showPlusButton: true,
    },
    {
      variant: 'years',
      bgColor: '#F0F6EC',
      backgroundImage: businessBg,
      yearsText: '23 Years In Business, Operating From Our Canning Vale Office.',
    },
  ],
};

const evFaqItems = [
  {
    question: 'Q1. How Long Does It Take To Install An EV Charger?',
    answer: 'Most residential EV charger installations are completed in half a day. A single-phase 7kW charger typically takes 3–4 hours. Three-phase 22kW installations may take slightly longer depending on your switchboard configuration.',
  },
  {
    question: 'Q2. Can I Charge My EV With Solar Power?',
    answer: 'Absolutely. Our chargers are designed to prioritise solar energy first. When paired with a battery, you can store excess daytime solar and charge your car overnight — completely off-grid.',
  },
  {
    question: 'Q3. What Type Of Charger Do I Need?',
    answer: 'For most Australian homes, a single-phase 7kW Type 2 charger is ideal — it fully charges most EVs overnight. If you have three-phase power and need faster charging, a 22kW charger can do it in under 2 hours.',
  },
  {
    question: 'Q4. Do I Need To Upgrade My Switchboard?',
    answer: 'In some cases, yes. Older switchboards may need a safety upgrade to support a dedicated EV circuit. We assess this during our free site inspection and include any required upgrades in your quote upfront.',
  },
  {
    question: 'Q5. Is An EV Charger Worth It If I Don\'t Have Solar?',
    answer: 'Yes — even without solar, a dedicated home charger is significantly cheaper and more convenient than public charging. You can schedule charging for off-peak hours to reduce costs. Adding solar later multiplies the savings.',
  },
];

export default function EvChargingPage() {
  return (
    <div>
      {/* Section 1: Hero */}
      <EvHero data={evHeroData} />

      {/* Section 2: Text Reveal */}
      <WallConnector data={wallConnectorData} />

      {/* Section 3: One Charger */}
      <OneCharger data={oneChargerData} />

      {/* Section 3.5: Trusted Installer */}
      <TrustedInstaller data={trustedInstallerData} />

      {/* Section 4: Why Charge At Home */}
      <WhyChargeAtHome data={whyChargeAtHomeData} />

      {/* Section 5: What's Actually Different */}
      <HomeBattery data={homeBatteryData} />

      {/* Section 6: Under One Roof */}
      <UnderOneRoof data={underOneRoofData} />

      {/* Section 6.5: Home Battery */}
      <HomeBattery data={homeBatteryData} />

      {/* Section 7: Accordion Cards */}
      <EvAccordion data={evAccordionData} />

      {/* Section 8: Why Choose Us (adapted) */}
      <EvWhyChooseUs data={evWhyChooseUsData} />

      {/* Section 9: FAQ (reusable) */}
      <FAQ
        topTitle="EV Charging"
        title="FAQ"
        listTitle="Frequently Asked Questions"
        items={evFaqItems}
      />

      {/* Section 10: Get Solar / CTA (reusable) */}
      <GetSolar
        subtitle="Get An EV Charger Designed"
        mainTitle="For Your Home"
        description="Tell us about your car, your power setup, and your driving habits. We'll design a charging solution that fits your home, your budget, and your energy goals — free, no-obligation, and no high-pressure sales."
        buttonText="Get My Free EV Quote"
      />
    </div>
  );
}