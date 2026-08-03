import React from 'react';

// Reusable Components
import GetSolar, { GetSolarProps } from '@/reuseables/getsolar';
import HeroSection, { HeroSectionData } from '@/reuseables/HeroSection';

// Battery Product Components
import BatteryBrandMatters, { BatteryBrandMattersData } from '@/components/battery/battery-product/BatteryBrandMatters';
import HowYouUseIt, { HowYouUseItData } from '@/components/battery/battery-product/HowYouUseIt';
import CompatibleProducts, { CompareFitData } from '@/components/battery/battery-product/CompatibleProducts';
import SpecsTableSection from '@/components/solar/brands/SpecsTableSection';
import type { ResolvedBrandsSpecsTable } from '@/lib/strapi/resolvers/brands';

// Shared Components
import BatteryMarquee, { BatteryMarqueeData } from '@/components/battery/battery-storage/BatteryMarquee';

// Placeholder Images
import heroBanner from '@/assets/evcharging/hero_banner.png';
import businessBg from '@/assets/home/zerointrest/businessBg.jpg';
import productReviewBg from '@/assets/home/zerointrest/productReviewBg.png';
import productReviewRating from '@/assets/home/zerointrest/productReviewRating.png';
import forYourHome from '@/assets/for_your_home.png';
import teslaLogo from '@/assets/home/patners/tesla_powerwall.png';
import WarrantyCoverage, { WarrantyCoverageData } from '@/components/battery/battery-product/WarrantyCoverage';
import ZeroInterest, { ZeroInterestData } from '@/components/battery/battery-product/ZeroInterest';
import WhatWeCheck, { WhatWeCheckData } from '@/components/battery/battery-product/WhatWeCheck';
import Homeowners, { HomeownersData } from '@/components/battery/battery-product/Homeowners';
import OurBatterybrands, { OurBatteryBrandsData } from '@/components/battery/battery-product/OurBatterybrands';
import RightSizing, { RightSizingData } from '@/components/battery/battery-product/RightSizing';
import alphaess from '@/assets/battery-brand/alpha_ess_logo.png'
import ankersolix from '@/assets/battery-brand/anker_solix_logo.png'
import byd from '@/assets/battery-brand/byd_logo.png'
import goodwe from '@/assets/battery-brand/goodwe_logo.png'
import istore from '@/assets/battery-brand/istore_logo.png'
import sigenergy from '@/assets/battery-brand/sigenergy_logo.png'


// ─── Data ───────────────────────────────────────────────────────────────

const productHeroData: HeroSectionData = {
    mediaSrc: heroBanner,
    mediaType: 'image',
    imageClass: 'object-cover',
    topSubtitle: 'Solar Batteries in Perth',
    mainTitle: 'Our Full Product Range',
    description: "We don't sell what we don't trust. Every brand on this page has been through our technical review, field-tested across our 45,000+ installations, and is on the Synergy or Horizon Power Supported Solutions List. Pricing is personalised — your quote includes your full rebate value and a sizing recommendation based on your home.",
    ctaText: 'Get My Free Personalized Quote',
    ctaLink: '#quote',
    subtitleColor: 'text-white',
    descriptionColor: 'text-white',
    showOverlay: true
};

const keyTermsData: ZeroInterestData = {
    topSubtitle: 'Zero Upfront',
    title: 'Zero Interest',
    description: 'The WA Government\'s Interest-Free Loan (Administered By Plenti) Lets Eligible Households Finance A Battery Without Any Out-Of-Pocket Cost.',
    keyTerms: {
        title: 'Key Terms:',
        items: [
            'Loan Amount: $2,001 To $10,000',
            'Term: 3 To 10 Years',
            'Interest Rate: 0%',
            'Early Repayment Fees: None',
            'Missed Payment Fees: Capped, Small'
        ]
    },
    eligibility: {
        title: 'Eligibility:',
        items: [
            'Combined Household Income Under $210,000',
            'Standard Credit Check Applies',
            'WA Property, Synergy Or Horizon Power Customer',
            'Battery Must Be From An Approved Scheme Vendor (We\'re One)'
        ]
    },
    summaryText: 'The Rebate Is Applied As An Upfront Discount; The Loan Covers The Balance. For Most Perth Households, This Means $0 Upfront And Modest Monthly Repayments — Replaced By The Savings The Battery Immediately Generates.',
    topImage: productReviewBg,
    bottomImage: businessBg,
    ctaText: 'See If I Qualify For The Interest-Free Loan',
    ctaLink: '#contact'
};

const rightSizingData: RightSizingData = {
    topSubtitle: 'Right-Sizing',
    title: 'Your Battery',
    description: "The Sweet Spot For Most Perth Homes In 2026 Is A 10 KWh Battery — It Aligns With The WA Rebate Cap ($130/KWh × 10 = $1,300 Max) And The Federal Rebate Threshold. Above 10 KWh, You're Paying More Per Stored KWh Than You're Rebating Back.",
    ctaText: 'Get My Free Battery Quote',
    ctaHref: '#quote-form',
    steps: [
        {
            iconName: 'zap',
            title: 'Average Quarterly Bill',
            placeholder: 'Your Answer (e.g. $450)',
        },
        {
            iconName: 'sun',
            title: 'Daily Energy Use',
            placeholder: 'Your Answer (e.g. 25 kWh/day)',
        },
        {
            iconName: 'car',
            title: 'EV Plans In The Next 2 Years',
            placeholder: 'Your Answer (Yes / No / 2027)',
        },
        {
            iconName: 'home',
            title: 'How Important Is Blackout Backup?',
            placeholder: 'Your Answer (Critical / Nice To Have)',
        },
        {
            iconName: 'paneltop',
            title: 'Do You Already Have Solar?',
            placeholder: 'Your Answer (Yes / No)',
        },
    ],
};

const ourBatteryBrandsData: OurBatteryBrandsData = {
    brands: [
        {
            title: 'Tesla Powerwall 3',
            logo: teslaLogo,
            image: heroBanner,
            link: '#tesla',
            specifications: [
                { label: 'Positioning', value: 'The Category Benchmark' },
                { label: 'Usable', value: '13.5 kWh · Chemistry: LFP · Warranty: 10 Years · Backup: Whole-Home Up To 10kW' },
                { label: 'Features', value: 'Integrated Solar Inverter, Tesla App, Native EV Integration, Stackable' }
            ]
        },
        {
            title: 'BYD Battery-Box Premium HVS/HVM',
            image: businessBg,
            logo: byd,
            link: '#byd',
            specifications: [
                { label: 'Positioning', value: 'The Scalable Modular LFP' },
                { label: 'Usable', value: '5.1–22.1 kWh (HVS) · Chemistry: LFP · Warranty: 10yr Product + 10yr Performance · Backup: Via Backup Box' },
                { label: 'Features', value: 'Modular Stacking, Inverter-Agnostic, IP55 Outdoor-Rated, High Peak Output' }
            ]
        },
        {
            title: 'Alpha ESS SMILE5',
            image: productReviewBg,
            logo: alphaess,
            link: '#alpha',
            specifications: [
                { label: 'Positioning', value: 'Flexible Hybrid For Smaller Homes' },
                { label: 'Usable', value: '2.9–80 kWh (Modular) · Chemistry: LFP · Warranty: 10 Years · Backup: Yes' },
                { label: 'Features', value: '5kW Single-Phase Hybrid Inverter Built-In, Wide Capacity Range, Grid-Interactive' }
            ]
        },
        {
            title: 'iStore Battery',
            image: forYourHome,
            logo: istore,
            link: '#istore',
            specifications: [
                { label: 'Positioning', value: 'Slim, Modular, Australian-Supported' },
                { label: 'Usable', value: '5 kWh Per Module, Up To 30 kWh · Chemistry: LFP · Warranty: 10 Years · Backup: Optional Backup Box' },
                { label: 'Features', value: '100% Depth Of Discharge, 150mm Slim Depth, Wall Or Floor Mount, iStore Ecosystem' }
            ]
        },
        {
            title: 'Sigenergy SigenStor',
            image: heroBanner,
            logo: sigenergy,
            link: '#sigenergy',
            specifications: [
                { label: 'Positioning', value: 'The 5-In-1 Next-Gen System' },
                { label: 'Usable', value: '5–48 kWh Per Stack · Chemistry: LFP · Warranty: 10yr Battery + Inverter, 5yr Gateway · Backup: UPS-Grade, 0ms' },
                { label: 'Features', value: 'Integrated Hybrid Inverter, Optional 25kW DC EV Charger, V2H/V2G Ready, GPT-4 MySigen App' }
            ]
        },
        {
            title: 'Anker Solix',
            image: businessBg,
            logo: ankersolix,
            link: '#anker',
            specifications: [
                { label: 'Positioning', value: 'Consumer-Tech Pedigree, Australian Launch' },
                { label: 'Usable', value: 'Scalable Modular Design · Chemistry: LFP · Warranty: 10 Years · Backup: Yes' },
                { label: 'Features', value: 'Anker Brand Reliability, Portable-Tech Heritage, Strong App UX, VPP Ready' }
            ]
        },
        {
            title: 'Goodwe Lynx Home',
            image: productReviewBg,
            logo: goodwe,
            link: '#goodwe',
            specifications: [
                { label: 'Positioning', value: 'Inverter-Matched Value Performer' },
                { label: 'Usable', value: 'Modular Up To ~22 kWh · Chemistry: LFP · Warranty: 10 Years · Backup: Yes' },
                { label: 'Features', value: 'Tight Inverter Integration With Goodwe ES Series, On Synergy SSL, Cost-Effective' }
            ]
        }
    ]
};

const howYouUseItData: HowYouUseItData = {
    title: "Start with how you'll use it",
    description: 'The right battery for you depends less on brand prestige and more on how your household uses energy. Four questions we walk every customer through:',
    cards: [
        {
            title: 'How much energy do you use — and when?',
            description: 'Your last four Synergy bills tell us this. Most Perth households land in the 18–35 kWh/day range. Evening-heavy users (families, home workers, EV owners) need bigger batteries than working-couple households who are home only briefly.'
        },
        {
            title: 'what’s your eV plan?',
            description: 'If you own or plan to own an EV in 2026–2027, your battery sizing changes meaningfully. A 10 kWh battery that would otherwise be perfect is too small to cover evening use plus overnight EV charging. Sigenergy specifically is designed for the EV use case via its integrated DC charger.'
        },
        {
            title: 'How important is blackout backup?',
            description: 'All the batteries on this page can provide backup, but some (Tesla Powerwall 3, Sigenergy, BYD with backup box) do it seamlessly — zero transition time, full-home coverage. Others require you to pre-select essential circuits.'
        },
        {
            title: 'Do you already have solar, or are we doing both?',
            description: "If you have solar: we need to match the battery to your existing inverter (AC-coupled or DC-coupled). If we're installing both: we can pair a hybrid inverter with the battery for maximum efficiency."
        }
    ]
};

const brandMattersData: BatteryBrandMattersData = {
    topSubtitle: 'Why The Battery Brand Matters More Than',
    title: 'The Badge Of The Box',
    description: 'A Battery Is A 10–15 Year Investment, Three Things That Matter Well Beyond Installation Day',
    cards: [
        {
            title: 'Will The Brand Still Be Here?',
            description: '35+ WA Solar Companies Have Closed In The Last Three Years. When They Went, Their Warranties Went With Them. Every Brand We Install Is Backed By A Manufacturer With Global Scale And An Australian Distribution Presence — The Warranty Survives Installer Failure.',
            image: businessBg
        },
        {
            title: 'Is The Chemistry Safe?',
            description: 'We Exclusively Install Lithium Iron Phosphate (LFP) Batteries. LFP Runs Cooler Than Older NMC Chemistry, Tolerates Higher Temperatures (Critical In Perth), And Has A Lower Thermal Runaway Risk. Every Brand On This Page Uses LFP.',
            image: productReviewBg
        },
        {
            title: 'Can You Expand It Later?',
            description: 'Modular Batteries (BYD, Sigenergy, iStore, Anker) Let You Start Smaller And Add Capacity As Your Needs Grow — Useful If You\'re Buying An EV Soon. Monolithic Units (Tesla Powerwall 3) Stack Via Additional Full Units Rather Than Internal Modules.',
            image: forYourHome
        },
        {
            title: 'How Much Of It Can You Actually Use?',
            description: '"Nominal" Capacity And "Usable" Capacity Aren\'t The Same. Some Brands Reserve 10–15% For Battery Health, Others Offer 100% Depth Of Discharge. Every Spec We Publish Is Usable Capacity.',
            image: heroBanner
        }
    ]
};

const comparisonTableResolved: ResolvedBrandsSpecsTable = {
    subtitle: 'Side-By-Side',
    title: 'Every Battery We Install',
    description: 'Spec Sheets Are Easier To Parse Side By Side. Use The Filters To Narrow The Field To What Matters To You.',
    labelColumnTitle: 'Brand & Model',

    columns: [
        { title: 'Tesla\nPowerwall 3' },
        { title: 'BYD HVS' },
        { title: 'Alpha ESS\nSMILE5' },
        { title: 'iStore' },
        { title: 'Sigenergy\nSigenStor' },
        { title: 'Anker Solix' },
        { title: 'Goodwe\nLynx Home' }
    ],
    rows: [
        {
            label: 'Usable kWh',
            values: [
                { text: '13.5' },
                { text: '5.1–12.8 per tower' },
                { text: '2.9–80' },
                { text: '5–30' },
                { text: '5–48 per stack' },
                { text: 'Modular' },
                { text: 'Up to 22' }
            ]
        },
        {
            label: 'Chemistry',
            values: [
                { text: 'LFP' },
                { text: 'LFP' },
                { text: 'LFP' },
                { text: 'LFP' },
                { text: 'LFP' },
                { text: 'LFP' },
                { text: 'LFP' }
            ]
        },
        {
            label: 'Warranty',
            values: [
                { text: '10 yr' },
                { text: '10 yr + 10 yr perf' },
                { text: '10yr' },
                { text: '10yr' },
                { text: '10 yr (battery+inv), 5 yr gateway' },
                { text: '10yr' },
                { text: '10yr' }
            ]
        },
        {
            label: 'Backup',
            values: [
                { text: 'Whole home, 10kW' },
                { text: 'Via backup box' },
                { text: 'yes' },
                { text: 'Optional box' },
                { text: 'UPS 0ms' },
                { text: 'yes' },
                { text: 'yes' }
            ]
        },
        {
            label: 'Modular',
            values: [
                { text: 'Via extra units' },
                { text: 'Yes (modular)' },
                { text: 'yes' },
                { text: 'Yes (5 kWh mods)' },
                { text: 'Yes + EV-ready' },
                { text: 'yes' },
                { text: 'yes' }
            ]
        }
    ]
};

const compatibleProductsData: CompareFitData = {
    topSubtitle: 'Adding A Battery To Existing Solar Vs Going Solar',
    title: '+ Battery Together',
    leftTitle: 'Adding To Existing Solar (Retrofit)',
    leftItems: [
        "AC coupling — the battery has its own inverter and connects to your switchboard (works with any existing inverter)",
        "DC coupling — if your existing inverter is a 'hybrid' inverter, the battery connects directly (more efficient)",
        "Some existing inverters aren't battery-ready and need replacement or supplementing"
    ],
    rightTitle: 'Solar + Battery Together (New Install)',
    rightItems: [
        "Single hybrid inverter handling both (Sigenergy, Goodwe, Alpha ESS)",
        "Integrated design (Tesla Powerwall 3 has its own inverter)",
        "Optimised cabling and switchboard work (done once)",
        "Single rebate application and single approval"
    ]
};

const homeownersData: HomeownersData = {
    topSubtitle: 'Perth Homeowners.',
    title: 'Real Bills. Real Savings',
    stories: [
        {
            title: 'How Solar Batteries\nAre Changing Modern Homes',
            description: '',
            footerTitle: 'May 7, 2026',
            footerDescription: 'Discover How Battery Storage Helps Homeowners Reduce Grid Dependence, Lower Electricity Bills, And Access Reliable Power Day And Night.',
            image: businessBg
        },
        {
            title: '5 Ways EV Charging\nWorks Better With Solar',
            description: '',
            image: productReviewBg
        },
        {
            title: 'Why More Australians Are\nSwitching To Renewable\nEnergy',
            description: '',
            image: productReviewRating
        }
    ]
};

const batteryMarqueeData: BatteryMarqueeData = {
    items: [
        { text: '45,000+ Solar' },
        { text: '3000+ Storage Installations' },
        { text: '23 Years In Perth' },
        { text: '4.9★ Rating (Google + ProductReview)' }
    ]
};

const warrantyCoverageData: WarrantyCoverageData = {
    subtitle: 'What Your Warrant',
    title: 'Actually Covers',
    description: 'Every battery brand has a warranty document. Three things worth understanding before you sign:',
    layout: 6,
    className: 'bg-white',
    cards: [
        {
            type: 'text',
            variant: 'light-gray',
            title: 'Product Warranty Vs\nPerformance\nWarranty',
            description: 'Product Warranty Covers Manufacturing Defects (Usually 10 Years). Performance Warranty Guarantees A Minimum Energy Throughput Or Capacity Retention — Typically "60-70% Of Original Capacity After 10 Years" Or "X MWh Minimum Throughput". Both Are Standard Across The Brands We Install.'
        },
        {
            type: 'image',
            variant: 'light-green'
        },
        {
            type: 'text',
            variant: 'light-gray',
            title: 'Workmanship\nWarranty',
            description: 'Separate From The Manufacturer Warranty. We Provide A 5-Year Workmanship Warranty On Every Install. If The Install Caused An Issue, We Fix It. If The Product Failed, We Coordinate With The Manufacturer.'
        },
        {
            type: 'text',
            variant: 'light-gray',
            title: 'What Voids A Battery\nWarranty',
            description: 'Common Causes: DIY Electrical Work, Unauthorised Modifications, Installation Outside Temperature Specs, Not Enrolling In Required Firmware Updates. Our Installs Avoid All Of These — That\'s The Point Of A CEC-Accredited Installer.'
        },
        {
            type: 'text',
            variant: 'dark',
            title: 'Aftercare Across 23\nYears Of Installs',
            description: 'Many Of Our 45,000+ Installations Are Still Running 10, 15, Even 20 Years After Day One. We Stock Parts, Service Anywhere In WA, And Our Install Team Is The Same Team That Services It Later.'
        },
        {
            type: 'image',
            variant: 'light-green'
        }
    ]
};

const whatWeCheckData: WhatWeCheckData = {
    subtitle: 'What We Check',
    title: 'Before We Quote You',
    description: 'We\'ve Walked Away From Quotes That Looked Attractive On Paper Because Something At The Property Made The Install Unwise. Here\'s What We Check:',
    paragraphs: [
        'Main Switchboard Capacity — Older Homes May Need A Switchboard Upgrade Before Battery Install',
        'Solar Inverter Compatibility (Existing Or New) — Which Batteries Work With What You Have',
        'Installation Location — Ventilation, Ambient Temperature, Protection From Direct Sun',
        'Network Connection Type — Synergy (SWIS) Or Horizon Power; Export Limits; ESM Requirements Post-1 May 2026',
        'Internet Reliability — Battery VPP, App And Monitoring All Require Stable Internet',
        'Roof And Solar Situation — For New Solar Installs Alongside Battery'
    ]
};

const batteryQuoteCtaData: GetSolarProps = {
    subtitle: 'Get Your Personalized',
    mainTitle: 'Battery Quote',
    description: "Our quote process takes just 15 minutes, and you'll receive 2–3 battery options tailored to your home, with all eligible rebates applied upfront, an interest-free loan option (if eligible), a clear installation timeline, and transparent, no-obligation pricing.",
    bgImage: heroBanner,
    buttonText: 'Get My Free Battery Quote',
    buttonHref: '#quote-form'
};


// ─── Page ───────────────────────────────────────────────────────────────

const BatteryProductPage = () => {
    return (
        <main className="w-full min-h-screen">
            {/* 1. Hero */}
            <HeroSection data={productHeroData} />
            <BatteryMarquee data={batteryMarqueeData} />
            <BatteryBrandMatters data={brandMattersData} />
            <HowYouUseIt data={howYouUseItData} />
            <RightSizing data={rightSizingData} />
            <OurBatterybrands data={ourBatteryBrandsData} />
            <SpecsTableSection resolved={comparisonTableResolved} />
            <CompatibleProducts data={compatibleProductsData} />
            <WhatWeCheck data={whatWeCheckData} />
            <WarrantyCoverage data={warrantyCoverageData} />
            <ZeroInterest data={keyTermsData} />
            <Homeowners data={homeownersData} />
            <GetSolar {...batteryQuoteCtaData} />
        </main>
    );
};

export default BatteryProductPage;