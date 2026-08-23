export const desktopHeroData = {
  backgroundImage: "/landing_page_hero.png",
  batteryImage: "/promotion_battery_fallback.png",
  title:
    "Double Rebates, Double Savings: WA & Federal Incentives Slash Battery Costs",
  subtitle: "Lock in Pricing Now!",
  packages: [
    {
      capacity: "8.3kWh Battery",
      originalPrice: 14404,
      finalPrice: 10990,
      stateRebate: 1209,
      federalRebate: 2205,
      isFullyInstalled: true,
      priceNote: "Price is after the battery rebate",
    },
    {
      capacity: "16.6kWh Battery",
      originalPrice: 18245,
      finalPrice: 12990,
      stateRebate: 1300,
      federalRebate: 3955,
      isFullyInstalled: true,
      priceNote: "Price is after the battery rebate",
    },
  ],
  sidebar: {
    title: "Battery \nRebate \nAvailable!",
    subtitle: "WA & Federal Battery \nRebates Now Live – Save Up to $5,255!",
    paragraphs: [
      "Upgrade your home with a 20kWh battery with State + Federal incentives worth up to $5,255 OFF when you're ready.",
      "Lock in today's pricing, secure your rebate spot, and be first in line for approval and installation.",
    ],
    ctaText: "Secure My Rebate",
  },
};

export const desktopLimitedSpotData = {
  title: "Limited Spots Available Serve Yours Now!",
  cards: [
    {
      type: "nested" as const,
      value: "23",
      title: "Years \nEstablished 2003",
      nestedCard: {
        type: "logo" as const,
        logoPath: "/white_regen_logo.svg",
      },
    },
    {
      type: "image" as const,
      value: "YES",
      title: "We are Local WA Born\nand Bred Company",
      bgImage: "/perthcity3.png",
    },
    {
      type: "black" as const,
      value: "45K+",
      title: "Solar Installations\nNationwide",
      bgImage: "/limited_home.png",
      showBadge: true,
    },
    {
      type: "nested" as const,
      value: "3k+",
      title: "Number of battery\ninstallations in WA",
      nestedCard: {
        type: "image" as const,
        imagePath: "/limited_battery.png",
        showBadge: true,
      },
    },
  ],
};

export const desktopTrustRegenData = {
  title: "Trust Regen Power",
  subtitle: "Why Homeowners",
  features: [
    {
      title: "Excellent \nCustomer Satisfaction",
      description:
        "We have achieved near five stars overall \nrating for our courteous and efficient\n service.",
      icon: "/promotion/excellent_logo.svg",
    },
    {
      title: "Best Value Solar \nPackages in Perth",
      description:
        "We sell a wide range of brands. We install \nTop Quality Solar Panels In Perth. Choose\n best solar system for your budget.",
      icon: "/promotion/best_value-logo.svg",
    },
    {
      title: "WA Born and Bred \nCompany",
      description:
        "We are truly a WA company. Installing\n over 45,000 residential and commercial \nsolar system installations.",
      icon: "/promotion/wa_born_logo.svg",
    },
  ],
};

export const desktopFreeQuotationData = {
  title: "Get an Obligation Free Quotation",
  noticeText:
    "Due To The Current High Demand For Batteries, We Are Unable To Accept Bookings \nFor Solar-Only Installations At This Time. Bookings Will Only Be Accepted For Solar + Battery or Battery-Only Installations.",
  videoThumbnail: "/solar_house_render.png",
  buttonText: "Get Your Free Quote",
};

export const desktopBatteryRebatesData = {
  title: "Key Points You Should \nKnow",
  subtitle: "Battery Rebate",
  bgImage: "/battery_rebates_fallback.png",

  data: [
    // Left Panel — Battery Rebate & Key Points
    [
      {
        title: "State Rebate",
        description:
          "Up to $1,300 off the cost of your battery system (WA Government).",
      },
      {
        title: "Federal Rebate",
        description:
          "Up to $2,205–$3,955, depending on battery size (Cheaper Home Batteries Program).",
      },
      {
        title: "Interest-Free Loan",
        description:
          "Up to $10,000 repayable over 10 years – 0% interest (WA scheme only).",
      },
      {
        title: "Eligibility",
        description:
          "Must be an owner-occupier, Synergy customer, with household income under $210K/year.",
      },
      {
        title: "VPP Participation Required",
        description:
          "You must join an approved Virtual Power Plant to qualify for state rebate.",
      },
      {
        title: "Limited Slots",
        description:
          "Rebates are first-come, first-served – early application increases your chances.",
      },
    ],

    // Right Panel — Why Regen Power
    [
      {
        title: "WA-Based & Trusted",
        description:
          "Locally operated with 23+ years of experience.",
      },
      {
        title: "Full-Service Retailer",
        description:
          "We supply, install, and support – end-to-end battery solutions.",
      },
      {
        title: "Approved Products & Installers",
        description:
          "All our systems are rebate-eligible and VPP-compliant.",
      },
      {
        title: "Top Battery Brands",
        description:
          "Alpha ESS, Anker, SigEnergy, Tesla Powerwall, Goodwe, BYD, Sungrow, & more.",
      },
      {
        title: "Rebate & Loan Support",
        description:
          "We help you navigate and apply for both rebates and interest-free loans.",
      },
      {
        title: "Thousands of Installs",
        description:
          "Trusted by over 45,000+ households in WA.",
      },
      {
        title: "Warranties & After-Sales Care",
        description:
          "Up to 10-year warranties on batteries and hybrid inverters.",
      },
    ],
  ],
};

export const desktopBrandsData = {
  title: "We Trust & Install",
  subtitle: "The Brands",
  brands: [
    { name: "alphaess", logo: "/logo/alpha_ess_logo.png" },
    { name: "byd", logo: "/logo/byd_logo.png" },
    { name: "GOODWE", logo: "/logo/goodwe_logo.png" },
    { name: "ISTORE", logo: "/logo/istore_logo.png" },
    { name: "SIGENERGY", logo: "/logo/sigenergy.png" },
    { name: "TESLA", logo: "/logo/tesla_logo.png" },
  ],
  batteries: [
    {
      name: "iStore",
      image: "/istore_brand.png",
      logo: "/logo/istore_logo.png",
    },
    {
      name: "Tesla Powerwall",
      image: "/tesla.png",
      logo: "/logo/tesla_logo.png",
    },
    {
      name: "Sigenergy",
      image: "/sig_energy.png",
      logo: "/logo/sigenergy.png",
    },
    { name: "Goodwe", image: "/goodwe.png", logo: "/logo/goodwe_logo.png" },
    {
      name: "AlphaESS",
      image: "/alpha_ess.png",
      logo: "/logo/alpha_ess_logo.png",
    },
    { name: "BYD", image: "/byd.png", logo: "/logo/byd_logo.png" },
  ],
};

export const desktopHighEnergyData = {
  title: "High Energy Bills? Here's Why It's Time To Add A Battery With Us:",
  bullets: [
    "WA-based team – local experts you can trust",
    "Over 23 years of renewable energy experience",
    "Installed 45,000+ solar systems across Perth homes",
    "Battery-ready and retrofit options available",
    "Exclusive access to state and federal battery rebates",
    "Partnered with top battery brands – Tesla Powerwall, IStore, Goodwe, Sigenergy",
    "Expert guidance on interest-free loans up to $10K under WA scheme",
    "10-Year warranty on batteries and hybrid inverters",
    "Friendly, knowledgeable support from quote to installation and beyond",
    "Tailored energy solutions for maximum savings and energy independence",
  ],
  badges: [
    {
      name: "fas100 Certified",
      logoPath: "/acheivement/fas100_logo.png",
    },
    { name: "Tesla Certified", logoPath: "/acheivement/tesla_certificate.png" },
    {
      name: "best rated batch",
      logoPath: "/acheivement/best_rated.png",
    },
    {
      name: "financialtimes logo",
      logoPath: "/acheivement/financialtimes_logo.png",
    },
  ],
};

export const desktopBatteryPackageData = {
  title: "Battery Packages",
  centerImage: {
    url: "/sig_energy.png",
    alt: "Battery storage system",
  },
  packages: [
    {
      name: "8.3kWh Battery",
      originalPrice: 14404,
      rebates: [
        { label: "State Rebate", amount: 1209 },
        { label: "Federal Rebate", amount: 2205 },
      ],
      finalPrice: 10990,
      installationText: "Fully Installed",
      pricingNote: "Price is after the battery rebate",
      image: "/sig_energy.png",
    },
    {
      name: "16.6kWh Battery",
      originalPrice: 18245,
      rebates: [
        { label: "State Rebate", amount: 1300 },
        { label: "Federal Rebate", amount: 3955 },
      ],
      finalPrice: 12990,
      installationText: "Fully Installed",
      pricingNote: "Price is after the battery rebate",
      image: "/sig_energy.png",
    },
  ],
};

export const desktopReadyToBeginData = {
  title: "Ready to Begin? Get A Free Quote.",
  noticeText:
    "Due To The Current High Demand For Batteries, We Are Unable To Accept Bookings \nFor Solar-Only Installations At This Time. Bookings Will Only Be Accepted For Solar + Battery or Battery-Only Installations.",
  contactDetails: {
    title: "Contact Us",
    description:
      "Give Us A Call Today And One Of Our Friendly And Knowledgeable Energy Consultants Will Be Able To Assist You With Your Enquiry.",
    data: [
      {
        title: "Address",
        value: "4/90 Catalano Circuit, Canning Vale, WA 6155",
      },
      { title: "E-Mail", value: "sales@regenpower.com" },
      { title: "Telephone", value: "08-9456-3491" },
    ],
    socials: [
      { name: "instagram", link: "https://www.instagram.com/regenpowerperth/" },
      { name: "linkedin", link: "https://www.linkedin.com/company/regen-power" },
      { name: "facebook", link: "https://www.facebook.com/regenpowerperth" },
      { name: "twitter", link: "https://twitter.com/RegenPower2003" },
    ],
  },
  buttonText: "Get Your Free Quote",
};

export const desktopSolarFinancingData = {
  title: "Solar Financing Solution",
  subtitle:
    "Up To $10K Loan For 10 Years With No Interest Through \nWA Rebate Scheme",
  leftBoxText:
    "Up to $10,000 interest-free loan available, repayable over 10 years to help cover the cost of a solar battery system.",
  leftBoxTitle: "Interest-Free Loan",
  leftBoxIcon: "CircleDollarSign",
  gridItems: [
    {
      title: "10 Years Repayment",
      description:
        "Up to $10,000 interest-free loan available, repayable over 10 years to help cover the cost of a solar battery system.",
      icon: "/solar-financing/solar-finance-1.svg",
    },
    {
      title: "10 Years Repayment",
      description:
        "Offered in addition to the WA battery rebate of up to $1,300 – making solar battery storage more affordable than ever.",
      icon: "/solar-financing/solar-finance-2.svg",
    },
    {
      title: "0% Interest Scheme",
      description:
        "Eligibility criteria: Must be an owner-occupier, a Synergy residential customer, and install an eligible battery system.",
      icon: "/solar-financing/solar-finance-3.svg",
    },
    {
      title: "Owner-Occupiers Eligible",
      description: "Applicants must participate in a Virtual Power Plant (VPP) program approved under the scheme.",
      icon: "/solar-financing/solar-finance-4.svg",
    },
    {
      title: "Lower Energy Bills",
      description:
        "Total household income must be under $210,000 per year and standard credit checks will apply.",
      icon: "/solar-financing/solar-finance-5.svg",
    },
    {
      title: "Premium Quality Hardware",
      description:
        "No early repayment penalties – enjoy flexibility while contributing to WA’s clean energy future.",
      icon: "/solar-financing/solar-finance-6.svg",
    },
  ],
};

export const desktopAboutRegenData = {
  title: "Regen Power",
  subtitle: "About",
  paragraphs:
    "Born and bred in Perth, WA, in 2003 when the market was still learning about rooftop solar PV systems, Regen Power is the pioneer in residential and commercial solar power system and solar panel solutions. We have installed over 45,000 residential rooftop solar systems Australia-wide and led the charge into other countries to start projects with both economic and educational implication in sustainability living.",
  image: "/assets/home/whychooseus/bussiness_operating.png",
};

export const desktopFindOutWhyData = {
  title: "Find Out Why",
  subtitle: "Our Customers Love Us",
  description:
    "Regen Power Is Rated 4.9 Stars By The ProductReview.Com.Au Community, Australia's Leading Consumer Review Platform.",
  awards: [
    {
      image: "/top_rated_logo.png",
      description:
        "6-Time ProductReview Award Winner (2021, 2022, 2023, 2024, 2025 & 2026)",
    },
    {
      image: "/awards/product_review.svg",
      description:
        "⭐ 5.0 Stars • 2,684 Reviews",
    },

  ],
  reviews: [
    {
      author: "Emma · Rockingham",
      review:
        "\u201CFrom Quote To Activation, The Experience Felt Effortless. The App Monitoring And Battery Backup Have Been Amazing For Our Family.\u201D",
      rating: 5,
    },
    {
      author: "Liam · Fremantle",
      review:
        "\u201CThe customer service was exceptional from start to finish. The battery install was fast and very clean.\u201D",
      rating: 5,
    },
    {
      author: "Olivia · Joondalup",
      review:
        "\u201CVery happy with the overall system output and savings. Our electricity bill has practically disappeared since the install.\u201D",
      rating: 5,
    },
  ],
};

export const desktopAchievementsData = {
  title: "We Are Humbled By",
  subtitle: "Our Achievements",
  description:
    "Surely Awards Are Not Everything, But It Is Testimony To What We Have Achieved And Assures You Will Be Working With Trusted Solar Company.",
  awards: [
    {
      name: "ATC Finalist 2014 & 2019",
      image: "/acheivement/australian_logo.png",
    },
    {
      name: "Rising Stars Winner 2019",
      image: "/acheivement/rising_stars_logo.png",
    },
    {
      name: "FT High-Growth Company 2020-2023",
      image: "/acheivement/financialtimes_logo.png",
    },
    {
      name: "Financial Review Fast 100 2020",
      image: "/acheivement/fas100_logo.png",
    },
    {
      name: "SEA Ambassador Award",
      image: "/acheivement/sea_logo.png",
    },
    {
      name: "Belmont Small Business Award Winner",
      image: "/acheivement/awards_winner.png",
    },
  ],
  recognitions: [
    {
      title: "SunWiz Industry Recognition",
      awards: [
        {
          name: "best-rated",
          image: "/best-rated-1.png",
        },
        {
          name: "best-rated#2",
          image: "/best-rated-2.png",
        },
      ],
    },
    {
      title: "Awarded by SolarQuotes",
      awards: [
        {
          name: "top-rated-installer",
          image: "/top-rated-installer.jpg",
        },
      ],
    },
    {
      title: "Top Rated on Google",
      awards: [
        {
          name: "google-rating",
          image: "/acheivement/google_rating.png",
        },
      ],
    },
  ],
};

export const desktopFaqData = {
  title: "Battery Rebate & Solar Installation",
  subtitle: "Frequently Asked Questions ",
  description:
    "Here Are Your Answers To Some Of The Most Frequently Asked Questions About Battery Rebates And Solar Installations.",
  highlightCard: {
    title: "Contact us now to reserve your place!",
    items: [
      {
        question: "What is the battery rebate scheme?",
        answer:
          "The battery rebate scheme offers financial incentives from both state and federal governments to reduce the upfront cost of installing battery storage systems in homes and businesses, enhancing energy independence and reducing electricity bills.",
      },
      {
        question: "How much rebate can I receive?",
        answer: "somthing typed by the client",
        bulletPoints: [
          "State Rebate: Up to $1,300 for a battery system of at least 10 kWh.",
          "Federal Rebate: $2,205 for a 10 kWh system, and $3,955 for a 20 kWh system.",
        ],
      },
    ],
  },
  faqItems: [
    {
      question: "Q1. Why don't you show prices on your deals page?",
      answer:
        "Because solar and battery installation prices depend greatly on your specific home layouts, roof angles, grid connection specifications, and energy needs. We prefer to customize every quote for transparency rather than show generic numbers.",
    },
    {
      question: "Q2. Do your deals include the federal and WA rebates?",
      answer:
        "Yes. Every quote we produce applies all eligible rebates as upfront discounts on your system price. Federal STCs (solar), federal Cheaper Home Batteries (battery), and the WA Residential Battery Scheme are all deducted from your quoted total before you pay.",
    },
    {
      question: "Q3. Can I use a Plenti no-interest loan on my install?",
      answer:
        "Yes, we partner with Plenti to offer green energy loans that allow you to pay off your solar battery system with 0% interest terms up to 10 years, subject to qualification.",
    },
    {
      question: "Q4. Will prices go up after 1 May 2026?",
      answer:
        "Rebate schemes have set allocations and deadlines. If government funds run dry or components increase in pricing, prices may rise. Securing your quote now locks in today's rates.",
    },
    {
      question: "Q5. Do you price-match other quotes?",
      answer:
        "We offer a best-price guarantee for comparable high-quality components and accredited local installation service. Show us an identical written quote, and we will happily match it.",
    },
    {
      question: "Q6. What happens after I request a quote?",
      answer:
        "Our local Perth-based energy consultants will review your electricity consumption profile and property. We will call you within 24 hours to discuss options and prepare a tailored, itemized proposal.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════
// MOBILE / TABLET DATA (used by components/Promotion/other/*)
// ═══════════════════════════════════════════════════════════════

export const mobileHeroData = {
  title: "20kWh",
  subtitle: "Battery System",
  highlight: {
    prefix: "Upto",
    value: "$5400",
  },
  description: "Back In Rebate",
  cta: {
    label: "See What's Included & Get A Quote",
    href: "#why-regen-power-mobile",
  },
  backgroundImage: "/landing_page_hero.png",
};

export const mobileWhyChooseUsData = {
  title: "Why",
  titleGreen: "Regen Power",
  ctatext:"Explore our packages & Get a Quote",
  ctaLink:"",
  cards: [
    {
      id: "years",
      type: "nested" as const,
      value: "23",
      title: "Years \nEstablished 2003",
      logoPath: "/white_regen_logo.svg",
    },
    {
      id: "local",
      type: "image" as const,
      value: "YES",
      title: "We are Local WA Born and Bred Company",
      bgImage: "/perthcity.png",
    },
    {
      id: "installations",
      type: "dark" as const,
      value: "45K",
      title: "Solar Installations \nNationwide",
      icon: "/globe_fallback.png",
    },
    {
      id: "batteries",
      type: "nested-reverse" as const,
      value: "3k+",
      title: "Number of battery\ninstallations in WA",
      icon: "/battery-promotion.png",
    },
  ],
};

export const mobileAwardsData = [
  {
    id: "productreview",
    image: "/awards/award-winner.png",
    title: "6 X ProductReview Award Winner 2021, 22, 23, 24, 25, 26",
  },
  {
    id: "bestrated",
    image: "/awards/best-rated.png",
    title: "The Best Rated Installer \nin WA 2026",
  },
];

export const mobileBatteryPricingData = {
  backgroundImage: "/battery_rebates_fallback.png",
  centerImage: "/sig_energy.png",
  items: [
    {
      title: "8.3kWh Battery",
      sections: [
        { type: "price" as const, value: "$14404" },
        {
          type: "list" as const,
          items: [
            { label: "State Rebate", value: 1209 },
            { label: "Federal Rebate", value: 2205 },
          ],
        },
        {
          type: "info" as const,
          value:
            "Up to $10K loan \n0% interest for 10 years \navailable under rebate scheme",
        },
        { type: "highlight" as const, title: "Final Pricing", value: "$10990" },
        {
          type: "text" as const,
          value: "Fully Installed",
          items: [
            {
              label: "Price is after the battery rebate",
              emphasis: "bold" as const,
            },
          ],
        },
      ],
    },
    {
      title: "16.6kWh Battery",
      sections: [
        { type: "price" as const, value: "$18245" },
        {
          type: "list" as const,
          items: [
            { label: "State Rebate", value: 1300 },
            { label: "Federal Rebate", value: 3955 },
          ],
        },
        {
          type: "info" as const,
          value:
           "Up to $10K loan \n0% interest for 10 years \navailable under rebate scheme"
        },
        { type: "highlight" as const, title: "Final Pricing", value: "$12990" },
        {
          type: "text" as const,
          value: "Fully Installed",
          items: [{ label: "Price is after the battery rebate" }],
        },
      ],
    },
  ],
};

export const mobileQuoteFormData = {
  title: "Get A Quote",
  noticeText:
    "Due to the current high demand for batteries, we are unable to accept bookings for Solar-Only installations at this time.",
    noticehighlight:" Bookings will only be accepted for Solar + Battery or Battery-Only installations.",
  buttonText: "Get Free Estimate",
};

export const mobileBrandsData = {
  title: "The Brands",
  titleGreen: "We Trust & Install",
  description:
    "We carry a wide range of brands from entry-level to premium, ensuring you can customize the solar panel system to your budget.",
  brands: [
    { name: "AlphaESS", logo: "/logo/alpha_ess_logo.png" },
    { name: "BYD", logo: "/logo/byd_logo.png" },
    { name: "GoodWe", logo: "/logo/goodwe_logo.png" },
    { name: "iStore", logo: "/logo/istore_logo.png" },
    { name: "Sigenergy", logo: "/logo/sigenergy.png" },
    { name: "Tesla", logo: "/logo/tesla_logo.png" },
  ],
  batteries: [
    {
      name: "iStore",
      image: "/istore_brand.png",
      logo: "/logo/istore_logo.png",
    },
    {
      name: "Tesla Powerwall",
      image: "/tesla.png",
      logo: "/logo/tesla_logo.png",
    },
    {
      name: "Sigenergy",
      image: "/sig_energy.png",
      logo: "/logo/sigenergy.png",
    },
    { name: "GoodWe", image: "/goodwe.png", logo: "/logo/goodwe_logo.png" },
    {
      name: "AlphaESS",
      image: "/alpha_ess.png",
      logo: "/logo/alpha_ess_logo.png",
    },
    { name: "BYD", image: "/byd.png", logo: "/logo/byd_logo.png" },
  ],
};

export const mobileContactInfoData = {
  title: "Contact Us",
  description:
    "Give us a call today and one of our friendly and knowledgeable energy consultants will be able to assist you with your enquiry.",
  items: [
    {
      type: "address" as const,
      label: "Address",
      value: "4/90 Catalano Circuit, Canning \nVale, WA 6155",
    },
    {
      type: "email" as const,
      label: "E-Mail",
      value: "sales@regenpower.com",
    },
    {
      type: "phone" as const,
      label: "Telephone",
      value: "08-9456-3491",
    },
  ],
  socials: [
    { name: "Instagram", url: "https://instagram.com/regenpower" },
    { name: "LinkedIn", url: "https://linkedin.com/company/regenpower" },
    { name: "Facebook", url: "https://facebook.com/regenpower" },
    { name: "Twitter", url: "https://twitter.com/regenpower" },
  ],
};
