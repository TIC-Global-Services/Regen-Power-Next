import React from 'react';

// Reusable Components
import Hero from '@/reuseables/Hero';
import FAQ from '@/reuseables/faq';
import GetSolar from '@/reuseables/getsolar';

// Battery Product Components
import ProductGallery, { ProductGalleryData } from '@/components/battery/battery-product/ProductGallery';
import BatteryBrandMatters, { BatteryBrandMattersData } from '@/components/battery/battery-product/batteryBrandmatters';
import ProductOverview, { ProductOverviewData } from '@/components/battery/battery-product/ProductOverview';
import KeyFeaturesGrid, { KeyFeaturesGridData } from '@/components/battery/battery-product/KeyFeaturesGrid';
import ProductSpecs, { ProductSpecsData } from '@/components/battery/battery-product/ProductSpecs';
import ComparisonTable, { ComparisonTableData } from '@/components/battery/battery-product/ComparisonTable';
import WhyChooseSection, { WhyChooseData } from '@/components/battery/battery-product/WhyChooseSection';
import InstallProcess, { InstallProcessData } from '@/components/battery/battery-product/InstallProcess';
import CompatibleProducts, { CompareFitData } from '@/components/battery/battery-product/CompatibleProducts';

// Shared Components
import BatteryBrandsGrid, { BatteryBrandsGridData } from '@/components/battery/smarthome-battery-system/BatteryBrandsGrid';
import SmartInstallBento, { SmartInstallBentoData } from '@/components/battery/smarthome-battery-system/SmartInstallBento';

// Placeholder Images
import heroBanner from '@/assets/evcharging/hero_banner.png';
import businessBg from '@/assets/home/zerointrest/businessBg.jpg';
import productReviewBg from '@/assets/home/zerointrest/productReviewBg.png';
import forYourHome from '@/assets/for_your_home.png';
import teslaLogo from '@/assets/home/patners/tesla_powerwall.png';
import ZeroInterest from '@/components/battery/battery-product/zerointrest';
import KeyTerms, { KeyTermsData } from '@/components/battery/battery-product/keyTerms';
import WhatWeCheck from '@/components/battery/battery-product/whatwecheck';
import Homeowners from '@/components/battery/battery-product/homeowners';
import OurBatterybrands, { OurBatteryBrandsData } from '@/components/battery/battery-product/OurBatterybrands';
import alphaess from '@/assets/battery-brand/alpha_ess_logo.png'
import ankersolix from '@/assets/battery-brand/anker_solix_logo.png'
import byd from '@/assets/battery-brand/byd_logo.png'
import goodwe from '@/assets/battery-brand/goodwe_logo.png'
import istore from '@/assets/battery-brand/istore_logo.png'
import sigenergy from '@/assets/battery-brand/sigenergy_logo.png'

// ─── Data ───────────────────────────────────────────────────────────────

const productGalleryData: ProductGalleryData = {
    images: [businessBg, productReviewBg, forYourHome, heroBanner]
};

const keyTermsData: KeyTermsData = {
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

const productOverviewData: ProductOverviewData = {
    topSubtitle: 'Sigenergy SigenStor',
    title: 'The Smart Home Battery',
    description: 'The Sigenergy SigenStor is a five-in-one system that combines a hybrid inverter, battery, EV DC charger, energy management system, and gateway into a single, elegant unit. It is the most advanced residential energy storage system available in Australia in 2026.',
    highlights: [
        'Five-In-One design eliminates multiple boxes on your wall',
        'Stacks from 5 kWh to 48 kWh to match any home',
        '25 kW bidirectional DC EV charger enables V2H and V2G',
        'GPT-4 powered MySigen AI assistant for intelligent energy management',
        'Native Home Assistant, Google Home, and Apple Home integration'
    ],
    ctaText: 'Get A Free Quote',
    ctaLink: '#quote',
    image: businessBg
};

const keyFeaturesData: KeyFeaturesGridData = {
    topSubtitle: 'Built For',
    title: 'The Modern Home',
    description: 'Every feature is designed around how Perth homeowners actually use energy — not how engineers think they should.',
    features: [
        {
            title: 'AI-Powered Energy Management',
            description: 'MySigen uses GPT-4 to learn your patterns and optimise charging, discharging, and EV scheduling automatically.',
            image: businessBg
        },
        {
            title: 'DC-Coupled EV Charging',
            description: 'Charge your EV directly from solar with up to 25 kW — no AC conversion losses. Supports V2H and V2G.',
            image: productReviewBg
        },
        {
            title: 'Whole-Home Backup',
            description: 'Seamless switchover in under 10ms. Your home stays powered during blackouts without you even noticing.',
            image: forYourHome
        },
        {
            title: 'Modular & Scalable',
            description: 'Start with 5 kWh and stack up to 48 kWh. Add capacity as your needs grow — EV, pool, hot water.',
            image: heroBanner
        },
        {
            title: 'VPP Ready',
            description: 'Enrolled in Synergy\'s Battery Partners program out of the box. Earn credits while supporting the grid.',
            image: businessBg
        },
        {
            title: 'Beautiful Design',
            description: 'Compact, wall-mounted, and designed to look good. No industrial-looking boxes on your garage wall.',
            image: productReviewBg
        }
    ]
};

const productSpecsData: ProductSpecsData = {
    topSubtitle: 'Technical',
    title: 'Specifications',
    description: 'Full specifications for the Sigenergy SigenStor residential energy storage system.',
    image: productReviewBg,
    specs: [
        { label: 'Usable Capacity', value: '5 – 48 kWh (modular)' },
        { label: 'Max Continuous Output', value: '10 kW' },
        { label: 'Peak Output', value: '15 kW (10 seconds)' },
        { label: 'Round-Trip Efficiency', value: '97.5%' },
        { label: 'EV Charger Output', value: '25 kW DC (bidirectional)' },
        { label: 'Battery Chemistry', value: 'LFP (Lithium Iron Phosphate)' },
        { label: 'Switchover Time', value: '< 10ms' },
        { label: 'Operating Temperature', value: '-10°C to 50°C' },
        { label: 'IP Rating', value: 'IP65 (outdoor rated)' },
        { label: 'Warranty', value: '10 years battery & inverter' },
        { label: 'Dimensions', value: '680 × 1060 × 280 mm' },
        { label: 'Weight', value: '65 kg per module' }
    ]
};

const comparisonTableData: ComparisonTableData = {
    topSubtitle: 'Side-By-Side',
    title: 'Every Battery We Install',
    description: 'Spec Sheets Are Easier To Parse Side By Side. Use The Filters To Narrow The Field To What Matters To You.',

    columns: [
        { heading: "Brand \nModel" },
        { heading: 'Tesla\nPowerwall 3' },
        { heading: 'BYD HVS' },
        { heading: 'Alpha ESS\nSMILE5' },
        { heading: 'iStore' },
        { heading: 'Sigenergy\nSigenStor' },
        { heading: 'Anker Solix' },
        { heading: 'Goodwe\nLynx Home' }
    ],
    rows: [
        {
            label: 'Usable kWh',
            values: ['13.5', '5.1–12.8 per tower', '2.9–80', '5–30', '5–48 per stack', 'Modular', 'Up to 22']
        },
        {
            label: 'Chemistry',
            values: ['LFP', 'LFP', 'LFP', 'LFP', 'LFP', 'LFP', 'LFP']
        },
        {
            label: 'Warranty',
            values: ['10 yr', '10 yr + 10 yr perf', '10yr', '10yr', '10 yr (battery+inv), 5 yr gateway', '10yr', '10yr']
        },
        {
            label: 'Backup',
            values: ['Whole home, 10kW', 'Via backup box', 'yes', 'Optional box', 'UPS 0ms', 'yes', 'yes']
        },
        {
            label: 'Modular',
            values: ['Via extra units', 'Yes (modular)', 'yes', 'Yes (5 kWh mods)', 'Yes + EV-ready', 'yes', 'yes']
        }
    ]
};

const whyChooseData: WhyChooseData = {
    topSubtitle: 'Why Perth Homeowners',
    title: 'Choose Sigenergy',
    description: 'It\'s not just about specs. Here\'s what our customers tell us matters most after living with the system.',
    image: forYourHome,
    cards: [
        {
            title: 'One Box, Not Five',
            description: 'Inverter, battery, EV charger, EMS, and gateway in a single unit. Cleaner install, fewer failure points, lower labour cost.'
        },
        {
            title: 'The App Actually Works',
            description: 'MySigen gives you real-time data, AI recommendations, and natural-language control. It\'s the only battery app that doesn\'t feel like it was designed in 2015.'
        },
        {
            title: 'Future-Proof',
            description: 'Add battery modules, connect an EV, enroll in VPP — all without replacing hardware or re-wiring. The system grows with your needs.'
        }
    ],
    ctaText: 'Book A Free Assessment',
    ctaLink: '#assessment'
};

const installProcessData: InstallProcessData = {
    topSubtitle: 'From Quote To',
    title: 'Switched On',
    description: 'Our in-house team handles everything. No subcontractors, no surprises.',
    steps: [
        {
            step: '1',
            title: 'Free Home Assessment',
            description: 'We review your bills, roof, switchboard, and future plans. Remote or on-site — your choice.'
        },
        {
            step: '2',
            title: 'Custom System Design',
            description: 'Our engineers size the system to your usage, your roof, and your lifestyle. Not a cookie-cutter template.'
        },
        {
            step: '3',
            title: 'Western Power Approval',
            description: 'We handle the full application. You don\'t lift a finger.'
        },
        {
            step: '4',
            title: 'Installation Day',
            description: 'Our CEC-accredited electricians install, commission, and test. App setup and handover included.'
        }
    ],
    image: heroBanner,
    ctaText: 'Start Your Assessment',
    ctaLink: '#assessment'
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

const batteryBrandsData: BatteryBrandsGridData = {
    topSubtitle: 'Also Consider',
    title: 'Other Options',
    subtitle: 'Every system we install is approved for the WA rebate and VPP capable.',
    brands: [
        {
            title: 'Tesla Powerwall 3 (The Benchmark)',
            specification: [
                {
                    title: 'Best For:',
                    logo: teslaLogo,
                    description: 'Tesla EV owners, homes valuing industry-leading app UX'
                },
                {
                    title: 'Why:',
                    description: '13.5 kWh usable. Integrated solar inverter. Up to 10 kW continuous backup. Tesla app is still the category benchmark.'
                },
                {
                    title: 'Warranty:',
                    description: '10 years product'
                }
            ],
            showbutton: true,
            buttonText: 'Explore Powerwall',
            buttonLink: '#tesla'
        },
        {
            title: 'BYD Battery-Box (The Flexible Choice)',
            specification: [
                {
                    title: 'Best For:',
                    logo: teslaLogo,
                    description: 'Homes wanting modular scalability without ecosystem lock-in'
                },
                {
                    title: 'Why:',
                    description: '5.1 kWh modules stack to 22.1 kWh per tower. LFP chemistry. IP55 rated. Compatible with most major hybrid inverters.'
                },
                {
                    title: 'Warranty:',
                    description: '10 years product, 10 years performance'
                }
            ],
            showbutton: true,
            buttonText: 'Explore BYD',
            buttonLink: '#byd'
        },
        {
            title: 'Alpha ESS SMILE5 (The Value Pick)',
            specification: [
                {
                    title: 'Best For:',
                    logo: teslaLogo,
                    description: 'Budget-conscious homes wanting reliable backup and self-consumption'
                },
                {
                    title: 'Why:',
                    description: 'All-in-one hybrid inverter + battery. 5.7 kWh to 22.8 kWh. Competitive pricing with solid VPP support.'
                },
                {
                    title: 'Warranty:',
                    description: '10 years product'
                }
            ],
            showbutton: true,
            buttonText: 'Explore Alpha ESS',
            buttonLink: '#alpha'
        }
    ]
};

const installBentoData: SmartInstallBentoData = {
    title: 'Why Regen Power For Your Sigenergy Install',
    description: 'We don\'t just sell batteries. We design, install, commission, and support complete energy systems — and we\'ve been doing it for 23 years.',
    blocks: [
        {
            theme: 'white',
            title: 'Sigenergy Certified Installer',
            description: 'Factory-trained and authorised. Direct access to Sigenergy engineering support and firmware updates.'
        },
        {
            theme: 'white',
            title: 'In-House Electricians Only',
            description: 'We employ our own CEC-accredited installers. No subcontractors, no variability in quality.'
        },
        {
            theme: 'dark',
            title: '45,000+ Installations',
            description: 'From single-roof residential to industrial off-grid. Scale matters when warranty claims arise.'
        },
        {
            theme: 'white',
            title: 'Full VPP Onboarding',
            description: 'We handle Synergy enrollment, dispatch testing, and configuration. You start earning from day one.'
        },
        {
            theme: 'white',
            title: '90-Day Performance Review',
            description: 'We check in after 90 days to tune automation rules based on your actual usage data.'
        }
    ]
};


const faqItems = [
    {
        question: 'How long does the Sigenergy SigenStor last?',
        answer: 'The SigenStor uses LFP (Lithium Iron Phosphate) battery chemistry, which is rated for over 6,000 cycles. With typical daily cycling, this translates to 15–20 years of effective service life. The product comes with a 10-year warranty.'
    },
    {
        question: 'Can I add more battery capacity later?',
        answer: 'Yes. The SigenStor is modular — you can add 5 kWh battery modules at any time, up to a maximum of 48 kWh, without replacing any existing hardware.'
    },
    {
        question: 'Does the built-in EV charger work with all cars?',
        answer: 'The 25 kW DC charger uses the CCS2 connector standard, which is compatible with most modern EVs including Tesla (with adapter), BYD, Hyundai, Kia, and more. V2H and V2G features require a compatible vehicle.'
    },
    {
        question: 'Is it eligible for the WA battery rebate?',
        answer: 'Yes. The Sigenergy SigenStor is on Synergy\'s Supported Solutions List and qualifies for both the WA Residential Battery Scheme (up to $1,300) and the Federal Cheaper Home Batteries Program (approx. $3,720 on a 10 kWh system).'
    },
    {
        question: 'How does the AI energy management work?',
        answer: 'MySigen uses a GPT-4 based AI assistant that learns your household patterns — when you use power, when solar peaks, and when grid prices spike. It automatically optimises charging, discharging, and EV scheduling to minimise your bill.'
    }
];

// ─── Page ───────────────────────────────────────────────────────────────

const BatteryProductPage = () => {
    return (
        <main className="w-full min-h-screen">
            {/* 1. Hero */}
            <Hero
                mediaSrc={heroBanner}
                mediaType="image"
                imageClass="object-cover"
                topSubtitle="Sigenergy SigenStor"
                mainTitle="The Smartest Battery In Perth"
                description="Five systems in one box. Hybrid inverter, battery, EV charger, energy management, and gateway — designed for the modern Australian home."
                ctaText="Get Your Free Quote"
                ctaLink="#quote"
                subtitleColor="text-white"
                descriptionColor="text-white"
                showOverlay={true}
            />


            <BatteryBrandMatters data={brandMattersData} />
            <OurBatterybrands data={ourBatteryBrandsData} />
            <ZeroInterest />
            <KeyTerms data={keyTermsData} />
            <WhatWeCheck />
            <CompatibleProducts data={compatibleProductsData} />
            <Homeowners />
            <ComparisonTable data={comparisonTableData} />
            <GetSolar />
        </main>
    );
};

export default BatteryProductPage;