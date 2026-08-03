import React from 'react';

// Reusable Components
import FAQ, { FAQItem } from '@/reuseables/faq';
import HeroSection, { HeroSectionData } from '@/reuseables/HeroSection';
import SpecsTableSection from '@/components/solar/brands/SpecsTableSection';
import type { ResolvedBrandsSpecsTable } from '@/lib/strapi/resolvers/brands';

// Custom Components
import BrandLongTermBet, { BrandLongTermBetData } from '@/components/battery/brands-wecarry/BrandLongTermBet';
import CECApproved from '@/components/battery/brands-wecarry/CECApproved';
import { HowYouUseItData } from '@/components/battery/battery-product/HowYouUseIt';
import WhyOurInstaller, { WhyOurInstallerData } from '@/components/battery/brands-wecarry/WhyOurInstaller';
import QuickWay, { QuickWayData } from '@/components/battery/brands-wecarry/QuickWay';
import WhatItTakes, { WhatItTakesData } from '@/components/battery/brands-wecarry/WhatItTakes';
import SevenBrand, { SevenBrandData } from '@/components/battery/brands-wecarry/SevenBrand';
import PickYourBrand from '@/components/battery/brands-wecarry/PickYourBrand'

// Assets
import heroBanner from '@/assets/evcharging/hero_banner.png';
import businessBg from '@/assets/home/zerointrest/businessBg.jpg';
import productReviewBg from '@/assets/home/zerointrest/productReviewBg.png';
import solarBatteryCharging from '@/assets/solar_battery_charging.png';

const heroData: HeroSectionData = {
  mediaSrc: heroBanner,
  mediaType: "image",
  imageClass: "object-cover",
  topSubtitle: "Solar Battery",
  mainTitle: "Brands We Carry In Perth",
  description:
    "The brands we trust, from premium to accessible. Tesla Powerwall 3, BYD Battery-Box, Alpha ESS, iStore, Sigenergy SigenStor, Anker Solix, Goodwe Lynx Home. Every one has been through our technical review and field-tested across our 45,000+ installations.",
  ctaText: "Get Your Free Quote",
  ctaLink: "#quote",
  subtitleColor: "text-white",
  descriptionColor: "text-white",
  showOverlay: true,
};

const brandLongTermBetData: BrandLongTermBetData = {
  subtitle: 'A Battery Lives With You For 10–15 Years.',
  title: 'Brand Is A Long-Term Bet.',
  cards: [
    {
      title: 'Cheap Brands Disappear',
      description: '35+ Solar Companies In WA Have Closed In The Last 3 Years Alone. When The Installer Went, So Did Their Warranties. We Only Install Brands With Genuine Global Scale And Australian Distribution Partners.',
      image: businessBg,
    },
    {
      title: 'The Chemistry You Want Is LFP',
      description: 'Lithium Iron Phosphate Runs Cooler, Tolerates Perth\'s Heat Better Than Older NMC Chemistry, And Has A Fundamentally Lower Thermal Runaway Risk. Every Brand We Install Uses LFP Exclusively.',
      image: productReviewBg,
    },
    {
      title: 'Ecosystem Lock-In Is Real',
      description: 'For Better Or Worse, Some Brands Work With Everything (BYD). Others Build An Ecosystem Around Themselves (Tesla, Sigenergy) With Benefits If You Buy In Fully, Less Benefit If You Mix. Know What You\'re Choosing.',
      image: solarBatteryCharging,
    },
  ],
};

const pageFaqs: FAQItem[] = [
  {
    question: 'How long do home solar batteries last?',
    answer: 'Most modern home batteries are designed to last between 10 and 15 years. They typically come with a 10-year manufacturer warranty guaranteeing about 70-80% of their initial capacity after a decade of daily usage.'
  },
  {
    question: 'What is Depth of Discharge (DoD)?',
    answer: 'Depth of Discharge refers to the percentage of the battery\'s capacity that can be safely used without damaging the cells. High-quality LFP batteries like Tesla and iStore support 100% DoD, meaning you can use their full capacity.'
  },
  {
    question: 'Which battery brand is best for going off-grid?',
    answer: 'For off-grid applications, modular batteries with high-peak output capabilities like BYD Premium, or heavy-duty systems like Sigenergy SigenStor, are highly recommended because they allow you to customize capacity and handle large surge currents.'
  },
  {
    question: 'Are there government rebates available for battery installation in Perth?',
    answer: 'Yes. Western Australian residents can stack federal incentives (Cheaper Home Batteries Program) with state-level rebates (WA Residential Battery Scheme) for a combined saving of up to $7,500 on a 10 kWh battery.'
  },
  {
    question: 'How do I choose the right battery capacity for my home?',
    answer: 'The right size depends on your household energy consumption overnight and your solar generation. A standard 4-person household in Perth usually finds a capacity of 10 kWh to 13.5 kWh provides the best balance of cost and utility.'
  }
];

const cecApprovedData: HowYouUseItData = {
  title: 'What "CEC Approved" And "Supported Solutions List" Actually Mean',
  description: 'Two Different Lists — Both Matter For Different Reasons. Short Version:',
  defaultFeaturedIndex: 2,
  cards: [
    {
      title: 'What This Means For You',
      description: 'When We Quote A Battery, It Will Be On Both Lists. If You\'re Researching A Brand Not On Our Page, Check Both Lists Before Committing. Scheme Eligibility Hinges On It.',
    },
    {
      title: 'CEC Approved Battery List',
      description: 'Maintained By The Clean Energy Council. A Battery Must Be CEC-Approved To Be Installed By A CEC-Accredited Installer, Which Is A Prerequisite For The Federal Cheaper Home Batteries Program Rebate. All 7 Brands On This Page Are CEC-Approved.',
    },
    {
      title: 'Synergy / Horizon Power Supported Solutions List',
      description: 'Maintained By The WA Electricity Retailers. A Battery Must Appear On The SSL (For Your Retailer) To Qualify For The WA Residential Battery Scheme Rebate. All 7 Brands On This Page Are On The Relevant SSL — But Specific Models Vary, So We Confirm The Exact Product Eligibility At Quote Stage.',
    },
    {
      title: 'Why The Two Lists Aren\'t Identical',
      description: 'CEC Approval Is A Safety And Performance Standard. SSL Inclusion Adds WA-Specific Requirements Around VPP Compatibility, Data Protocol And Network Integration. A Battery Can Be CEC-Approved But Not On A WA SSL — Common For Newer Brands Still Working Through State Qualification.',
    },
  ],
};

const whyOurInstallerDetails: WhyOurInstallerData = {
  title: 'Why Our Installer \nCertifications Matter',
  subtitle: 'Installing These Brands Well Isn\'t Plug-And-Play. Several Of Them Require Installer Certifications Beyond General CEC Accreditation. Here\'s What We Hold:',
  image: solarBatteryCharging,
  imageAlt: 'Solar panels installed on a roof facing the sun',
  certifications: [
    {
      title: 'Tesla Certified Installer — Direct Tesla Training And Authorisation For Powerwall Installations',
    },
    {
      title: 'Sigenergy Pro Partner — Authorised Sigenergy Installer And Field Support',
    },
    {
      title: 'BYD Authorised — Recognised BYD Battery Installer',
    },
    {
      title: 'IStore Authorised Installer — Warranty-Backed IStore Installations',
    },
    {
      title: 'CEC Approved Retailer — Clean Energy Council\'s Highest Retailer Accreditation',
    },
    {
      title: 'SAA-Accredited (Solar Accreditation Australia) — Required For WA Residential Battery Scheme',
    },
  ],
  whyMattersTitle: 'Why This Matters:',
  whyMattersDescription: 'When A Brand Audits An Installer\'s Work, Uncertified Installs Can Void The Manufacturer Warranty. Every Install We Do Is Performed By An Installer Holding The Relevant Brand Certifications — Protecting Your Warranty On Day One And Every Day After.',
};

const quickWayData: QuickWayData = {
  title: 'A Quick Way To Narrow The Field',
  subtitle: 'Use This As A Starting Point — Not A Final Answer. Our Team Refines The Recommendation With Your Site-Specific Details At The Quote Stage.',
  sectionHeader: 'If You... → We\'d Likely Recommend...',
  image: solarBatteryCharging,
  imageAlt: 'Solar panels on a roof at sunset',
  recommendations: [
    {
      condition: 'You Own Or Plan To Buy A Tesla EV',
      recommendation: 'Tesla Powerwall 3 (Native Ecosystem)',
    },
    {
      condition: 'You Own Or Plan To Buy A Non-Tesla EV',
      recommendation: 'Sigenergy SigenStor (DC EV Charger, V2H Ready)',
    },
    {
      condition: 'You Want Whole-Home Backup With Zero Transition Time',
      recommendation: 'Tesla Powerwall 3 Or Sigenergy',
    },
    {
      condition: 'You Want To Start Small And Scale',
      recommendation: 'BYD, Alpha ESS, iStore, Or Anker',
    },
    {
      condition: 'You Already Run Home Assistant',
      recommendation: 'Sigenergy (Native) Or Alpha ESS (Native)',
    },
    {
      condition: 'You Have A Goodwe Inverter Already',
      recommendation: 'Goodwe Lynx Home',
    },
    {
      condition: 'You Have A Sungrow Inverter Already',
      recommendation: 'BYD Battery-Box',
    },
    {
      condition: 'Installation Space Is Tight',
      recommendation: 'iStore (Slim) | BYD (Min Profile)',
    },
    {
      condition: 'You Want Brand Familiarity And Consumer UX',
      recommendation: 'Anker Solix',
    },
    {
      condition: 'You Want Maximum Inverter Flexibility',
      recommendation: 'BYD (Inverter-Agnostic)',
    },
  ],
};

const whatItTakesData: WhatItTakesData = {
  title: 'We don\'t install every battery on the market. The brands below cleared a specific bar:',
  subtitle: 'What it takes to be on this page',
  description: 'Brands we have specifically chosen not to install (for reference): older NMC chemistry products, single-source imports without Australian distribution, brands without genuine VPP compatibility, batteries under 5 kWh (too small to clear WA rebate minimum).',
  image: solarBatteryCharging,
  imageAlt: 'Solar panels on a roof at sunset',
  items: [
    {
      title: 'CEC Approved Battery List — included and current',
    },
    {
      title: 'Synergy or Horizon Power Supported Solutions List — qualified for WA Residential Battery Scheme',

    },
    {
      title: 'LFP chemistry — safer, longer-lasting, better in WA heat',
    },
    {
      title: 'Australian distribution presence — warranty support that survives the retailer',
    },
    {
      title: 'Verifiable field performance — either through our own install base or through independent industry review',
    },
  ],
};

const atAGlanceResolved: ResolvedBrandsSpecsTable = {
  subtitle: 'Side-By-Side',
  title: 'At A Glance',
  description: '',
  labelColumnTitle: 'Brand & Series',
  columns: [
    { title: 'Jinko Tiger Neo' },
    { title: 'LONGi Hi-MO X10' },
    { title: 'Canadian Solar TOPHiku6' },
    { title: 'JA Solar DeepBlue 4.0 Pro' },
    { title: 'Risen Titan' },
  ],
  rows: [
    {
      label: 'Efficiency',
      values: [{ text: '22.3%' }, { text: '22.8%' }, { text: '22.5%' }, { text: '22.4%' }, { text: '22.0%' }],
    },
    {
      label: 'Temp Coeff',
      values: [{ text: '-0.29%/°C' }, { text: '-0.26%/°C' }, { text: '-0.28%/°C' }, { text: '-0.30%/°C' }, { text: '-0.30%/°C' }],
    },
    {
      label: 'Degradation',
      values: [{ text: '0.40%/yr' }, { text: '0.35%/yr' }, { text: '0.40%/yr' }, { text: '0.40%/yr' }, { text: '0.40%/yr' }],
    },
    {
      label: 'Warranty',
      values: [
        { text: '25 yr product · 30 yr performance' },
        { text: '25 yr product · 30 yr performance' },
        { text: '25 yr product · 30 yr performance' },
        { text: '25 yr product · 30 yr performance' },
        { text: '25 yr product · 30 yr performance' },
      ],
    },
  ],
};

const sevenBrandDetails: SevenBrandData = {
  title: 'Seven Brand Cards',
  brands: [
    {
      title: 'Tesla Powerwall 3',
      description: 'The Category Benchmark. Seamless, Premium, Integrated.',
      specification: [
        {
          title: 'Key Specs:',
          specdetails: [
            { title: 'Usable Capacity', description: '13.5 kWh' },
            { title: 'Continuous Power', description: 'Up To 11.04 kW' },
            { title: 'Chemistry', description: 'Lithium Iron Phosphate (LFP)' },
            { title: 'Warranty', description: '10 Years' },
            { title: 'Temperature Range', description: '-20°C to 50°C' },
            { title: 'Integrated Solar Inverter', description: 'Yes (Up To 20 kW DC Solar Input)' },
            { title: 'Dimensions', description: 'Approximately 1100 × 610 × 190 mm' },
          ],
        },
        {
          title: '',
          specdetails: [
            { title: 'Smart Home:', description: 'Native Tesla App. Home Assistant Via Community Plugins. Limited Google/Apple Home Support.' },
            { title: 'Certifications:', description: 'CEC Approved Battery · Tesla Certified Installer (We Hold This)' },
          ],
        },
        {
          title: 'Why We Carry It:',
          specdetails: [
            { title: '', description: "Tesla Powerwall Is The Single Most Installed Home Battery In Australia And Its App Remains The Category Benchmark For User Experience. Powerwall 3's Integrated Solar Inverter Reduces Installation Complexity And Cost — You Don't Need A Separate Hybrid Inverter. For Tesla EV Owners, Native Integration Across Powerwall, Wall Connector And Vehicle Is Uniquely Seamless." },
          ],
        },
        {
          title: 'Feature Bullets:',
          specdetails: [
            { title: '', description: 'Integrated Solar Inverter — One Unit, One Install' },
            { title: '', description: 'Tesla App — Industry-Leading Monitoring And Control' },
            { title: '', description: '10 kW Continuous Backup — Runs Most Of A Home, Not Just "Essential Circuits"' },
            { title: '', description: 'Stackable Via Additional Full Units As Needs Grow' },
            { title: '', description: 'Over-The-Air Firmware Updates For 10-Year Warranty' },
            { title: '', description: 'Indoor Or Outdoor Installation (IP Rated)' },
          ],
        },
        {
          title: '',
          specdetails: [
            { title: 'Best For:', description: 'Households Valuing Premium App UX, Tesla EV Owners, Homes Prioritising Whole-Home Backup With Zero Transition Time.' },
            { title: 'VPP Compatibility:', description: 'On Synergy Supported Solutions List. Battery Rewards Eligible.' },
          ],
        },
      ],
    },
    {
      title: 'BYD Battery-Box Premium HVS/HVM',
      description: 'The Scalable Modular LFP. Inverter-Agnostic. Field-Proven.',
      specification: [
        {
          title: 'Key Specs:',
          specdetails: [
            { title: 'Usable Capacity', description: '5.1–12.8 kWh Per Tower (HVS) / Larger Range On HVM' },
            { title: 'Max Scale', description: 'Up To 38.4 kWh Via 3 Parallel HVS Towers' },
            { title: 'Chemistry', description: 'LFP (Lithium Iron Phosphate)' },
            { title: 'Warranty', description: '10 Years Product + 10 Years Performance' },
            { title: 'Protection Rating', description: 'IP55 (Indoor Or Outdoor)' },
            { title: 'Inverter Compatibility', description: '1-Phase, 3-Phase High-Voltage Battery' },
          ],
        },
        {
          title: '',
          specdetails: [
            { title: 'VPP Compatibility:', description: 'On Synergy Supported Solutions List. Battery Rewards Eligible. Smart Home: Home Assistant Via Community Integrations. BYD BYOS App. API Via Inverter.' },
            { title: 'Certifications:', description: 'CEC Approved Battery · BYD Authorised Installer' },
          ],
        },
        {
          title: 'Why We Carry It:',
          specdetails: [
            { title: '', description: "BYD Is The World's Largest Producer Of Rechargeable Batteries. The Battery-Box's Modular Plug Design Requires No Internal Wiring And Scales In 2.56 kWh Increments, Making It The Most Flexible System On The Market For Households That Want To Start Smaller And Grow. Compatible With Major Hybrid Inverters Including Sungrow, Fronius And SolaX — You're Not Locked Into One Inverter Ecosystem." },
          ],
        },
        {
          title: 'Feature Bullets:',
          specdetails: [
            { title: '', description: 'Modular Towers — Add Capacity Without Replacing The System' },
            { title: '', description: 'Inverter-Agnostic — Choose From Sungrow, Fronius, SolaX' },
            { title: '', description: 'IP55 Outdoor-Rated — No Enclosure Required' },
            { title: '', description: 'High Peak Output Per kWh — Runs Pumps, ACs And Motor Loads Well' },
            { title: '', description: 'Performance Warranty With Minimum Capacity Retention' },
          ],
        },
        {
          title: '',
          specdetails: [
            { title: 'Best For:', description: 'Households Wanting Modular Scalability Without Ecosystem Lock-In; Homes Planning To Expand Capacity As EV Ownership Or Usage Grows.' },
          ],
        },
      ],
    },
    {
      title: 'Alpha ESS SMILE5',
      description: 'The Flexible Hybrid For Smaller Homes And Modular Growth.',
      specification: [
        {
          title: 'Key Specs:',
          specdetails: [
            { title: 'Usable Capacity', description: '2.9–80 kWh (Modular)' },
            { title: 'Inverter', description: '5 kW Single-Phase Hybrid Built-In' },
            { title: 'Chemistry', description: 'LFP' },
            { title: 'Warranty', description: '10 Years' },
            { title: 'Backup', description: 'Yes' },
          ],
        },
        {
          title: '',
          specdetails: [
            { title: 'Smart Home:', description: 'Home Assistant Native Integration. AlphaCloud App. Vendor API Available.' },
            { title: 'Certifications:', description: 'CEC Approved Battery' },
          ],
        },
        {
          title: 'Why We Carry It:',
          specdetails: [
            { title: '', description: "Alpha ESS Offers One Of The Widest Capacity Ranges Of Any Brand — From A Small 2.9 kWh Starter Through To Commercial-Scale 80 kWh. The SMILE5's Built-In 5 kW Hybrid Inverter Simplifies Installations For Homes Without Existing Battery-Ready Inverters. Strong Value-Tier Option For Budget-Conscious Households Who Want Quality LFP Chemistry Without Premium-Brand Pricing." },
          ],
        },
        {
          title: 'Feature Bullets:',
          specdetails: [
            { title: '', description: 'Built-In 5 kW Hybrid Inverter — No Separate Inverter Needed' },
            { title: '', description: 'Capacity Range From 2.9 kWh To 80 kWh' },
            { title: '', description: 'Strong Value-Tier Option For Budget-Minded Buyers' },
            { title: '', description: 'Grid-Interactive With VPP Compatibility' },
            { title: '', description: '10-Year Warranty' },
          ],
        },
        {
          title: '',
          specdetails: [
            { title: 'Best For:', description: 'Smaller Perth Homes, Apartments With Limited Installation Space, Households Wanting Flexibility To Start Small And Expand.' },
            { title: 'VPP Compatibility:', description: 'On Synergy Supported Solutions List.' },
          ],
        },
      ],
    },
    {
      title: 'iStore Battery',
      description: 'Slim, Modular, Australian-Supported.',
      specification: [
        {
          title: 'Key Specs:',
          specdetails: [
            { title: 'Module Capacity', description: '5 kWh Per Module' },
            { title: 'Max Capacity', description: 'Up To 30 kWh (3 Modules × 2 Parallel Sets)' },
            { title: 'Module Weight', description: '50 Kg' },
            { title: 'Depth Of Discharge', description: '100%' },
            { title: 'Dimensions', description: '670 Mm Width × 150 Mm Depth (Slim Profile)' },
            { title: 'Warranty', description: '10 Years' },
          ],
        },
        {
          title: '',
          specdetails: [
            { title: 'Smart Home:', description: 'iStore App. Google Home Via iStore Hub.' },
            { title: 'Certifications:', description: 'CEC Approved Battery · iStore Authorised Installer' },
          ],
        },
        {
          title: 'Why We Carry It:',
          specdetails: [
            { title: '', description: "iStore Is An Australian Brand With Local Support Infrastructure — Warranty Response Times Are Typically Faster Than International Brands. The 150mm Slim Depth Makes It One Of The Lowest-Profile Wall-Mount Batteries On The Market, Useful In Tight Installations. 100% Depth Of Discharge Means Every kWh You Buy Is Usable." },
          ],
        },
        {
          title: 'Feature Bullets:',
          specdetails: [
            { title: '', description: '100% Depth Of Discharge — No Reserved Capacity' },
            { title: '', description: '150mm Slim Depth — Wall-Mount In Tight Spaces' },
            { title: '', description: 'Modular 5 kWh Units — Start Small, Scale Up' },
            { title: '', description: 'Optional Backup Box For Emergency Power' },
            { title: '', description: 'Fire Extinguishers And Energy Optimisers Built-In' },
            { title: '', description: 'Works With iStore Air-To-Energy And Pool Heater For Full Ecosystem' },
          ],
        },
        {
          title: '',
          specdetails: [
            { title: 'Best For:', description: 'Homes With Constrained Installation Space; Buyers Who Value Local Support Over Global Brand Prestige; iStore Ecosystem Users (Hot Water, Pool Heating).' },
            { title: 'VPP Compatibility:', description: 'On Synergy Supported Solutions List.' },
          ],
        },
      ],
    },
    {
      title: 'Anker Solix',
      description: 'Consumer-Tech Pedigree. Australian Launch. Strong App UX.',
      specification: [
        {
          title: 'Key Specs:',
          specdetails: [
            { title: 'Usable Capacity', description: 'Modular (Scalable)' },
            { title: 'Chemistry', description: 'LFP' },
            { title: 'Warranty', description: '10 Years' },
            { title: 'Backup', description: 'Yes' },
          ],
        },
        {
          title: '',
          specdetails: [
            { title: 'Smart Home:', description: 'Anker Cloud App. Home Assistant Via Community Plugins.' },
            { title: 'Certifications:', description: 'CEC Approved Battery' },
          ],
        },
        {
          title: 'Why We Carry It:',
          specdetails: [
            { title: '', description: "Anker Brings Consumer-Electronics Reliability (The Brand Most Australians Know From Phone Chargers And Portable Power) Into The Residential Battery Category. The App UX Is A Notable Strength — Cleaner And More Approachable Than Many Industry-Default Interfaces. LFP Chemistry And Modular Scalability Match Our Selection Criteria." },
          ],
        },
        {
          title: 'Feature Bullets:',
          specdetails: [
            { title: '', description: 'Modular, Scalable Design' },
            { title: '', description: 'LFP Chemistry — Safer, Longer-Lasting' },
            { title: '', description: 'Polished App UX — Intuitive For Non-Technical Users' },
            { title: '', description: 'VPP Compatibility' },
            { title: '', description: '10-Year Warranty Backed By A Global Consumer Brand' },
          ],
        },
        {
          title: '',
          specdetails: [
            { title: 'Best For:', description: 'Households Who Value Consumer-Brand Familiarity, First-Time Battery Buyers, Buyers Who Prioritise App Usability.' },
            { title: 'VPP Compatibility:', description: 'On Synergy Supported Solutions List (Verify Specific Model At Quote Stage)' },
          ],
        },
      ],
    },
    {
      title: 'Sigenergy SigenStor',
      description: 'The Ultimate 5-in-1 Smart Battery. High-Power DC Charging & V2H Ready.',
      specification: [
        {
          title: 'Key Specs:',
          specdetails: [
            { title: 'Usable Capacity', description: '5.0 - 48.0 kWh (Modular)' },
            { title: 'Continuous Power', description: 'Up to 25 kW (Bidirectional DC)' },
            { title: 'Chemistry', description: 'LFP (Lithium Iron Phosphate)' },
            { title: 'Warranty', description: '10 Years Battery & Inverter, 5 Years Gateway' },
            { title: 'Protection Rating', description: 'IP66 (Highest Industry Rating)' },
            { title: 'Dimensions', description: 'Stackable modules, space-saving footprint' },
          ],
        },
        {
          title: '',
          specdetails: [
            { title: 'Smart Home:', description: 'Native Home Assistant Integration. GPT-4 Powered MySigen Assistant. Advanced Energy Management.' },
            { title: 'Certifications:', description: 'CEC Approved Battery · Sigenergy Pro Partner (We Hold This)' },
          ],
        },
        {
          title: 'Why We Carry It:',
          specdetails: [
            { title: '', description: "SigenStor is the industry's first 5-in-1 energy storage system, combining the hybrid inverter, battery storage, DC EV charger, EMS, and gateway into one sleek stack. It allows DC charging of EVs directly from solar at up to 25 kW and is fully hardware-ready for Vehicle-to-Home (V2H) and Vehicle-to-Grid (V2G) power backup." },
          ],
        },
        {
          title: 'Feature Bullets:',
          specdetails: [
            { title: '', description: '5-in-1 Integrated Design — Sleek, Space-Saving Stack' },
            { title: '', description: 'DC Fast EV Charging — Up to 25 kW Bidirectional Power' },
            { title: '', description: 'V2H/V2G Bidirectional Ready — Use Your EV to Power Your Home' },
            { title: '', description: 'GPT-4 Powered MySigen AI Assistant for Smart Optimization' },
            { title: '', description: 'Modular Capacity (5 to 48 kWh per stack)' },
            { title: '', description: 'IP66 Rating for Demanding Outdoor Environments' },
          ],
        },
        {
          title: '',
          specdetails: [
            { title: 'Best For:', description: 'Tech-Forward Homes, EV Owners wanting DC Fast Charging, and Home Assistant Enthusiasts.' },
            { title: 'VPP Compatibility:', description: 'On Synergy Supported Solutions List. Battery Rewards Eligible.' },
          ],
        },
      ],
    },
    {
      title: 'Sungrow SBH Series',
      description: 'High-Voltage, High-Power Backup for Sungrow Inverters.',
      specification: [
        {
          title: 'Key Specs:',
          specdetails: [
            { title: 'Usable Capacity', description: '10 - 40 kWh (Modular)' },
            { title: 'Continuous Power', description: 'Up to 20 kW High-Voltage Output' },
            { title: 'Chemistry', description: 'LFP (Lithium Iron Phosphate)' },
            { title: 'Warranty', description: '10 Years' },
            { title: 'Dimensions', description: 'Modular snap-fit stack' },
          ],
        },
        {
          title: '',
          specdetails: [
            { title: 'Smart Home:', description: 'iSolarCloud App. Integrated Smart Meter Monitoring.' },
            { title: 'Certifications:', description: 'CEC Approved Battery · Sungrow Authorised Installer' },
          ],
        },
        {
          title: 'Why We Carry It:',
          specdetails: [
            { title: '', description: "The Sungrow SBH series is designed to pair natively with Sungrow's market-leading high-voltage hybrid inverters. Featuring a robust modular design with tool-free snap fit connectors, it is capable of providing up to 20 kW of continuous backup power, making it one of the most powerful and reliable native storage upgrades available." },
          ],
        },
        {
          title: 'Feature Bullets:',
          specdetails: [
            { title: '', description: 'Tool-Free Plug-and-Play Snap-Fit Modular Connection' },
            { title: '', description: 'High Output Power — Up to 20 kW Continuous Backup' },
            { title: '', description: 'Natively Integrates with Sungrow High-Voltage Hybrid Inverters' },
            { title: '', description: 'High Reliability LFP Technology' },
            { title: '', description: '100% Usable Capacity (100% DoD)' },
            { title: '', description: 'Direct Remote Monitoring via iSolarCloud App' },
          ],
        },
        {
          title: '',
          specdetails: [
            { title: 'Best For:', description: 'Homes with existing Sungrow inverters looking for seamless integration and high backup power capacity.' },
            { title: 'VPP Compatibility:', description: 'On Synergy Supported Solutions List. Battery Rewards Eligible.' },
          ],
        },
      ],
    },
  ],
};
const pickyourbrand=  {
    subTitle:"Pick your brand, get a quote,",
    title:"claim your rebate",
    description:"Tell us which brand you're leaning towards (or we'll help you choose) and we'll put together a personalised quote with your rebate already applied.",
    buttontext:"get my free quote",
    buttonRef:"#"
  }


const BrandsWeCarryPage = () => {
  return (
    <main className="w-full min-h-screen">
      <HeroSection data={heroData} />
      <BrandLongTermBet data={brandLongTermBetData} />
      <WhatItTakes data={whatItTakesData} />
      <SevenBrand data={sevenBrandDetails} />
      <SpecsTableSection resolved={atAGlanceResolved} />
      <QuickWay data={quickWayData} />
      <CECApproved data={cecApprovedData} />
      <WhyOurInstaller data={whyOurInstallerDetails} />
      <FAQ
        topTitle="FAQ"
        title="Entries"
        listTitle="Frequently Asked Questions"
        items={pageFaqs}
        image={businessBg}
      />
      <PickYourBrand data={pickyourbrand}/>
    </main>
  );
};

export default BrandsWeCarryPage;