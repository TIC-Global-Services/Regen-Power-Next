export const desktopHeroData = {
  title: "Double Rebates, Double Savings: WA & Federal Incentives Slash Battery Costs",
  subtitle: "Lock in Pricing Now!",
  packages: [
    {
      capacity: "8.3kWh Battery",
      originalPrice: 14404,
      finalPrice: 10990,
      stateRebate: 1209,
      federalRebate: 2205,
      isFullyInstalled: true,
      priceNote: "Price is after the battery rebate"
    },
    {
      capacity: "16.6kWh Battery",
      originalPrice: 18245,
      finalPrice: 12990,
      stateRebate: 1300,
      federalRebate: 3955,
      isFullyInstalled: true,
      priceNote: "Price is after the battery rebate"
    }
  ],
  sidebar: {
    title: "Battery Rebate Available!",
    subtitle: "WA & Federal Battery Rebates Now Live – Save Up to $5,255!",
    paragraphs: [
      "Upgrade your home with a 20kWh battery with State + Federal incentives worth up to $5,255 OFF when you're ready.",
      "Lock in today's pricing, secure your rebate spot, and be first in line for approval and installation."
    ],
    ctaText: "Secure My Rebate"
  }
};

export const desktopLimitedSpotData = {
  title: "Limited Spots Available Serve Yours Now!",
  cards: [
    {
      type: "nested" as const,
      value: "23",
      title: "Years Established 2003",
      nestedCard: {
        type: "logo" as const,
        logoPath: "/regen_logo.svg",
      }
    },
    {
      type: "image" as const,
      value: "YES",
      title: "We are Local WA Born\nand Bred Company",
      bgImage: "/assets/home/whychooseus/bussiness_operating.png"
    },
    {
      type: "black" as const,
      value: "45K+",
      title: "Solar Installations\nNationwide",
      showBadge: true
    },
    {
      type: "nested" as const,
      value: "3k+",
      title: "Number of battery\ninstallations in WA",
      nestedCard: {
        type: "empty" as const,
        showBadge: true
      }
    }
  ]
};

export const desktopTrustRegenData = {
  title: "Trust Regen Power",
  subtitle: "Why Homeowners",
  features: [
    {
      title: "Excellent Customer Satisfaction",
      description: "We have achieved near five stars overall rating for our courteous and efficient service.",
      icon: "ThumbsUp"
    },
    {
      title: "Best Value Solar Packages in Perth",
      description: "We sell a wide range of brands. We install Top Quality Solar Panels In Perth. Choose best solar system for your budget.",
      icon: "Package"
    },
    {
      title: "WA Born and Bred Company",
      description: "We are truly a WA company. Installing over 45,000 residential and commercial solar system installations.",
      icon: "Map"
    }
  ]
};

export const desktopFreeQuotationData = {
  title: "Get an Obligation Free Quotation",
  noticeText: "Due To The Current High Demand For Batteries, We Are Unable To Accept Bookings For Solar-Only Installations At This Time. Bookings Will Only Be Accepted For Solar + Battery or Battery-Only Installations.",
  videoThumbnail: "/solar_house_render.png",
  buttonText: "Get Your Free Quote"
};

export const desktopBatteryRebatesData = {
  title: "Key Points You Should Know",
  subtitle: "Battery Rebate",
  bgImage: "/solar_house_render.png",
  data: [
    // Slide 1 – Rebates & Eligibility
    [
      { title: "State Rebate",        description: "Up To $1,300 Off The Cost Of Your Battery System (WA Government)." },
      { title: "Federal Rebate",      description: "Up To $2,205–$3,955, Depending On Battery Size (Cheaper Batteries Program)" },
      { title: "Interest Free Loan:", description: "Up To $10,000 Repayable Over 10 Years – 0% Interest (WA Scheme Only)." },
      { title: "Eligibility Stats",   description: "Eligible For Owner-Occupiers With Synergy And Income Below $210K/Year." },
      { title: "VPP Mandatory",       description: "Up To $1,300 Off The Cost Of Your Battery System (WA Government)." },
      { title: "Limited Slots",       description: "Rebates Are First-Come, First-Served – Early Application Increases Your Chances." },
    ],
    // Slide 2 – Solar Benefits
    [
      { title: "Solar STCs",        description: "Federal Small-Scale Technology Certificates Reduce Your Upfront Solar Cost By Up To $3,000." },
      { title: "Feed-In Tariff",    description: "Earn Credits On Excess Energy Exported Back To The Grid Via Synergy." },
      { title: "Payback Period",    description: "Most Systems Pay For Themselves In 3–5 Years With Combined Savings And Rebates." },
      { title: "Battery Warranty",  description: "Leading Brands Offer 10-Year Performance Warranties On Battery Systems." },
      { title: "Grid Independence", description: "A Battery Lets You Store Daytime Solar For Evening Use, Reducing Grid Reliance." },
      { title: "Installation Time", description: "Typical Solar + Battery Install Completed In 1–2 Days By CEC-Accredited Installers." },
    ],
  ]
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
    { name: "TESLA", logo: "/logo/tesla_logo.png" }
  ],
  batteries: [
    { name: "iStore", image: "/istore_brand.png", logo: "/logo/istore_logo.png" },
    { name: "Tesla Powerwall", image: "/tesla.png", logo: "/logo/tesla_logo.png" },
    { name: "Sigenergy", image: "/sig_energy.png", logo: "/logo/sigenergy.png" },
    { name: "Goodwe", image: "/goodwe.png", logo: "/logo/goodwe_logo.png" },
    { name: "AlphaESS", image: "/alpha_ess.png", logo: "/logo/alpha_ess_logo.png" },
    { name: "BYD", image: "/byd.png", logo: "/logo/byd_logo.png" }
  ]
};

export const desktopHighEnergyData = {
  title: "High Energy Bills? Here's Why It's Time To Add A Battery With Us:",
  bullets: [
    "WA-Based Team – Local Experts You Can Trust",
    "Over 23 Years Of Renewable Energy Experience",
    "Installed 45,000+ Solar Systems Across Perth Homes",
    "Battery-Ready And Retrofit Options Available",
    "Exclusive Access To State And Federal Battery Rebates",
    "Partnered With Top Battery Brands – Tesla Powerwall, iStore, Goodwe, Sigenergy",
    "Expert Guidance On Interest-Free Loans Up To $10K Under WA Scheme",
    "10-Year Warranty On Batteries And Hybrid Inverters",
    "Friendly, Knowledgeable Support From Quote To Installation And Beyond",
    "Tailored Energy Solutions For Maximum Savings And Energy Independence"
  ],
  badges: [
    { name: "Tesla Certified", logoPath: "/assets/home/patners/tesla_powerwall.png" },
    { name: "CEC Approved", logoPath: "/assets/home/patners/approved.png" },
    { name: "Clean Energy Council", logoPath: "/assets/home/patners/clean_energy.png" },
    { name: "Smart Energy Provider", logoPath: "/assets/home/patners/smart_energy.png" },
    { name: "ProductReview Award", logoPath: "/assets/home/realstories/best_rated_batch.png" }
  ]
};

export const desktopBatteryPackageData = {
  title: "Battery Packages",
  packages: [
    {
      capacity: "8.3kWh Battery",
      originalPrice: 14404,
      finalPrice: 10990,
      rebates: [
        { label: "State Rebate", amount: 1209 },
        { label: "Federal Rebate", amount: 2205 },
      ],
      image: "/sig_energy.png",
    },
    {
      capacity: "16.6kWh Battery",
      originalPrice: 18245,
      finalPrice: 12990,
      rebates: [
        { label: "State Rebate", amount: 1300 },
        { label: "Federal Rebate", amount: 3955 },
      ],
      image: "/sig_energy.png",
    },
  ],
};

export const desktopReadyToBeginData = {
  title: "Ready to Begin? Get A Free Quote.",
  noticeText: "Due To The Current High Demand For Batteries, We Are Unable To Accept Bookings For Solar-Only Installations At This Time. Bookings Will Only Be Accepted For Solar + Battery or Battery-Only Installations.",
  contactDetails: {
    title: "Contact Us",
    description: "Give Us A Call Today And One Of Our Friendly And Knowledgeable Energy Consultants Will Be Able To Assist You With Your Enquiry.",
    data: [
      { title: "Address", value: "4/90 Catalano Circuit, Canning Vale, WA 6155" },
      { title: "E-Mail", value: "sales@regenpower.com" },
      { title: "Telephone", value: "08-9456-3491" }
    ],
    socials: [
      { name: "instagram", link: "https://instagram.com/regenpower" },
      { name: "linkedin", link: "https://linkedin.com/company/regenpower" },
      { name: "facebook", link: "https://facebook.com/regenpower" },
      { name: "twitter", link: "https://twitter.com/regenpower" }
    ]
  },
  buttonText: "Get Your Free Quote"
};

export const desktopSolarFinancingData = {
  title: "Solar Financing Solution",
  subtitle: "Up To $10K Loan For 10 Years With No Interest Through WA Rebate Scheme",
  leftBoxText: "Up to $10,000 interest-free loan available, repayable over 10 years to help cover the cost of a solar battery system.",
  leftBoxTitle: "Interest-Free Loan",
  leftBoxIcon: "CircleDollarSign",
  gridItems: [
    {
      title: "10 Years Repayment",
      description: "Repayable over a 10-year term to make investments in green energy highly manageable.",
      icon: "CalendarRange"
    },
    {
      title: "0% Interest Scheme",
      description: "Under the official WA scheme, benefit from a strict zero percent interest rate.",
      icon: "Percent"
    },
    {
      title: "Owner-Occupiers Eligible",
      description: "Eligible for WA owner-occupiers who are Synergy customers.",
      icon: "Users"
    },
    {
      title: "Lower Energy Bills",
      description: "Offset high peak charges by scheduling battery discharges during expensive periods.",
      icon: "TrendingDown"
    },
    {
      title: "Premium Quality Hardware",
      description: "Get high-tier battery units and hybrid inverters with maximum durability.",
      icon: "Sparkles"
    },
  ]
};

export const desktopAboutRegenData = {
  title: "Regen Power",
  subtitle: "About",
  paragraphs: "Born and bred in Perth, WA, in 2003 when the market was still learning about rooftop solar PV systems, Regen Power is the pioneer in residential and commercial solar power system and solar panel solutions. We have installed over 45,000 residential rooftop solar systems Australia-wide and led the charge into other countries to start projects with both economic and educational implication in sustainability living.",
  image: "/assets/home/whychooseus/bussiness_operating.png"
};

export const desktopFindOutWhyData = {
  title: "Find Out Why",
  subtitle: "Our Customers Love Us",
  description: "Regen Power Is Rated 4.9 Stars By The ProductReview.Com.Au Community, Australia's Leading Consumer Review Platform.",
  awards: [
    {
      image: "/assets/home/realstories/top_panel_installers.png",
      description: "6-Time ProductReview Award Winner (2021, 2022, 2023, 2024, 2025 & 2026)"
    },
    {
      image: "/assets/home/whychooseus/product_review.png",
      description: "5.0 Stars • 2,684 Reviews"
    }
  ],
  reviews: [
    {
      author: "Emma · Rockingham",
      review: "\u201CFrom Quote To Activation, The Experience Felt Effortless. The App Monitoring And Battery Backup Have Been Amazing For Our Family.\u201D",
      rating: 5
    },
    {
      author: "Liam · Fremantle",
      review: "\u201CThe customer service was exceptional from start to finish. The battery install was fast and very clean.\u201D",
      rating: 5
    },
    {
      author: "Olivia · Joondalup",
      review: "\u201CVery happy with the overall system output and savings. Our electricity bill has practically disappeared since the install.\u201D",
      rating: 5
    }
  ]
};

export const desktopAchievementsData = {
  title: "We Are Humbled By",
  subtitle: "Our Achievements",
  description: "Surely Awards Are Not Everything, But It Is Testimony To What We Have Achieved And Assures You Will Be Working With Trusted Solar Company.",
  badges: [
    { name: "ATC Finalist 2014 & 2019", image: "/acheivement/australian_logo.png" },
    { name: "Rising Stars Winner 2019", image: "/acheivement/rising_stars_logo.png" },
    { name: "FT High-Growth Company 2020-2023", image: "/acheivement/financialtimes_logo.png" },
    { name: "Financial Review Fast 100 2020", image: "/acheivement/fas100_logo.png" },
    { name: "SEA Ambassador Award", image: "/acheivement/sea_logo.png" },
    { name: "Belmont Small Business Award Winner", image: "/acheivement/awards_winner.png" },
    { name: "Belmont Small Business Award Winner", image: "/acheivement/google_rating.png" }
  ]
};

export const desktopFaqData = {
  title: "Battery Rebate & Solar Installation",
  subtitle: "Frequently Asked Questions ",
  description: "Here Are Your Answers To Some Of The Most Frequently Asked Questions About Battery Rebates And Solar Installations.",
  highlightCard: {
    title: "Key Rebates Summary",
    items: [
      {
        question: "What is the battery rebate scheme?",
        answer: "The battery rebate scheme offers financial incentives from both state and federal governments to reduce the upfront cost of installing battery storage systems in homes and businesses, enhancing energy independence and reducing electricity bills."
      },
      {
        question: "How much rebate can I receive?",
        answer: "somthing typed by the client",
        bulletPoints: [
          "State Rebate: Up to $1,300 for a battery system of at least 10 kWh.",
          "Federal Rebate: $2,205 for a 10 kWh system, and $3,955 for a 20 kWh system."
        ]
      }
    ],
  },
  faqItems: [
    {
      question: "Q1. Why don't you show prices on your deals page?",
      answer: "Because solar and battery installation prices depend greatly on your specific home layouts, roof angles, grid connection specifications, and energy needs. We prefer to customize every quote for transparency rather than show generic numbers."
    },
    {
      question: "Q2. Do your deals include the federal and WA rebates?",
      answer: "Yes. Every quote we produce applies all eligible rebates as upfront discounts on your system price. Federal STCs (solar), federal Cheaper Home Batteries (battery), and the WA Residential Battery Scheme are all deducted from your quoted total before you pay."
    },
    {
      question: "Q3. Can I use a Plenti no-interest loan on my install?",
      answer: "Yes, we partner with Plenti to offer green energy loans that allow you to pay off your solar battery system with 0% interest terms up to 10 years, subject to qualification."
    },
    {
      question: "Q4. Will prices go up after 1 May 2026?",
      answer: "Rebate schemes have set allocations and deadlines. If government funds run dry or components increase in pricing, prices may rise. Securing your quote now locks in today's rates."
    },
    {
      question: "Q5. Do you price-match other quotes?",
      answer: "We offer a best-price guarantee for comparable high-quality components and accredited local installation service. Show us an identical written quote, and we will happily match it."
    },
    {
      question: "Q6. What happens after I request a quote?",
      answer: "Our local Perth-based energy consultants will review your electricity consumption profile and property. We will call you within 24 hours to discuss options and prepare a tailored, itemized proposal."
    }
  ]
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
    href: "/quote",
  },
  backgroundImage: "/fallback.png",
};

export const mobileWhyChooseUsData = {
  title: "Why",
  titleGreen: "Regen Power",
  cards: [
    {
      id: 'years',
      type: 'nested' as const,
      value: "23",
      title: "Years Established 2003",
      logoPath: "/regen_logo.svg"
    },
    {
      id: 'local',
      type: 'image' as const,
      value: "YES",
      title: "We are Local WA Born and Bred Company",
      bgImage: "/fallback.png"
    },
    {
      id: 'installations',
      type: 'dark' as const,
      value: "45K",
      title: "Solar Installations Nationwide",
      iconType: 'globe' as const
    },
    {
      id: 'batteries',
      type: 'nested-reverse' as const,
      value: "3k+",
      title: "Number of battery\ninstallations in WA",
      iconType: 'battery' as const
    }
  ]
};

export const mobileAwardsData = [
  {
    id: 'productreview',
    image: '/awards/award-winner.png',
    title: '6 X ProductReview Award Winner 2021, 22, 23, 24, 25, 26',
  },
  {
    id: 'bestrated',
    image: '/awards/best-rated.png',
    title: 'The Best Rated Installer in WA 2026',
  }
];

export const mobileBatteryPricingData = {
  backgroundImage: "/solar_house_render.png",
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
          value: "Up to $10K loan 0% interest for 10 years available under rebate scheme",
        },
        { type: "highlight" as const, title: "Final Pricing", value: "$10990" },
        {
          type: "text" as const,
          value: "Fully Installed",
          items: [
            { label: "Price is after the battery rebate", emphasis: "bold" as const },
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
          value: "Up to $10K loan 0% interest for 10 years\navailable under rebate scheme",
        },
        { type: "highlight" as const, title: "Final Pricing", value: "$12990" },
        {
          type: "text" as const,
          value: "Fully Installed",
          items: [
            { label: "Price is after the battery rebate" },
          ],
        },
      ],
    },
  ],
};

export const mobileQuoteFormData = {
  title: "Get",
  titleGreen: "A Quote",
  noticeText: "Due to the current high demand for batteries, we are unable to accept bookings for Solar-Only installations at this time. Bookings will only be accepted for Solar + Battery or Battery-Only installations.",
  buttonText: "Get Free Estimate"
};

export const mobileBrandsData = {
  title: "The Brands",
  titleGreen: "We Trust & Install",
  description: "We carry a wide range of brands from entry-level to premium, ensuring you can customize the solar panel system to your budget.",
  brands: [
    { name: "AlphaESS", logo: "/logo/alpha_ess_logo.png" },
    { name: "BYD", logo: "/logo/byd_logo.png" },
    { name: "GoodWe", logo: "/logo/goodwe_logo.png" },
    { name: "iStore", logo: "/logo/istore_logo.png" },
    { name: "Sigenergy", logo: "/logo/sigenergy.png" },
    { name: "Tesla", logo: "/logo/tesla_logo.png" }
  ],
  batteries: [
    { name: "iStore", image: "/istore_brand.png", logo: "/logo/istore_logo.png" },
    { name: "Tesla Powerwall", image: "/tesla.png", logo: "/logo/tesla_logo.png" },
    { name: "Sigenergy", image: "/sig_energy.png", logo: "/logo/sigenergy.png" },
    { name: "GoodWe", image: "/goodwe.png", logo: "/logo/goodwe_logo.png" },
    { name: "AlphaESS", image: "/alpha_ess.png", logo: "/logo/alpha_ess_logo.png" },
    { name: "BYD", image: "/byd.png", logo: "/logo/byd_logo.png" }
  ]
};

export const mobileContactInfoData = {
  title: "Contact Us",
  description: "Give us a call today and one of our friendly and knowledgeable energy consultants will be able to assist you with your enquiry.",
  items: [
    {
      type: 'address' as const,
      label: "Address",
      value: "4/90 Catalano Circuit, Canning Vale, WA 6155"
    },
    {
      type: 'email' as const,
      label: "E-Mail",
      value: "sales@regenpower.com"
    },
    {
      type: 'phone' as const,
      label: "Telephone",
      value: "08-9456-3491"
    }
  ],
  socials: [
    { name: "Instagram", url: "https://instagram.com/regenpower" },
    { name: "LinkedIn", url: "https://linkedin.com/company/regenpower" },
    { name: "Facebook", url: "https://facebook.com/regenpower" },
    { name: "Twitter", url: "https://twitter.com/regenpower" }
  ]
};
