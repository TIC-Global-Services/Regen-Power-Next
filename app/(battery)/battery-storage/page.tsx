import React from 'react';
import HeroSection, { HeroSectionData } from '@/reuseables/HeroSection';
import DebsRebateBanner, { DebsRebateData } from '@/components/battery/battery-storage/DebsRebateBanner';
import BatteryJargon, { BatteryJargonData } from '@/components/battery/battery-storage/BatteryJargon';
import BatteryBillImpact, { BatteryBillImpactData } from '@/components/battery/battery-storage/BatteryBillImpact';
import BatteryRangeGrid, { BatteryRangeGridData } from '@/components/battery/battery-storage/BatteryRangeGrid';
import BatteryCapacityBlocks, { BatteryCapacityData } from '@/components/battery/battery-storage/BatteryCapacityBlocks';
import SolarBatteryMeaning, { SolarBatteryMeaningData } from '@/components/battery/battery-storage/SolarBatteryMeaning';
import InstallationTimeline, { InstallationTimelineData } from '@/components/battery/battery-storage/InstallationTimeline';
import OneLocalTeam, { OneLocalTeamData } from '@/components/battery/battery-storage/OneLocalTeam';
import CustomerStories, { CustomerStoriesData } from '@/components/battery/battery-storage/CustomerStories';
import BatteryFAQ, { BatteryFAQData } from '@/components/battery/battery-storage/BatteryFAQ';

// Import placeholder images
import heroBanner from '@/assets/evcharging/hero_banner.png';
import businessBg from '@/assets/home/zerointrest/businessBg.jpg';
import productReviewBg from '@/assets/home/zerointrest/productReviewBg.png';
import teslapower from '@/assets/home/patners/tesla_powerwall.png'
import approvedseller from '@/assets/home/patners/approved.png'
import productreview from '@/assets/home/realstories/top_panel_installers.png'
import australia from '@/assets/home/austalia_map.png'
import forYourHome from '@/assets/for_your_home.png';
import BatteryMarquee, { BatteryMarqueeData } from '@/components/battery/battery-storage/BatteryMarquee';
import GetSolar, { GetSolarProps } from '@/reuseables/getsolar';
import GreatFit, { GreatFitData } from '@/components/battery/smarthome-battery-system/GreatFit';

// --- Static Dummy Data ---

const batteryMarqueeData: BatteryMarqueeData = {
    items: [
        { text: '45,000+ Solar' },
        { text: '3000+ Storage Installations' },
        { text: '23 Years In Perth' },
        { text: '4.9★ Rating (Google + ProductReview)' }
    ]
};

const debsRebateData: DebsRebateData = {
    subtitle: 'The Best Rebate Window WA Homeowners Have Ever Seen',
    title: 'And It Closes On 1 May 2026',
    description: 'If you\'ve watched your Synergy bill rise, 2026 is one of the best times to invest in a home battery. Eligible households can access up to $1,300 (Synergy) or $3,800 (Horizon Power) through the WA Residential Battery Scheme, plus around $3,720 from the federal Cheaper Home Batteries Program for a 10kWh system. Interest-free loans of up to $10,000 over 3–10 years are also available through Plenti. With DEBS export rates as low as 2.25c/kWh off-peak, storing your solar can be worth around 30c per kWh instead of exporting it. Install before 1 May 2026 to maximise rebates before federal incentives reduce and new SWIS connection rules take effect',
    image: forYourHome,
    ctaText: 'See If I\'m Eligible For The Full Rebate',
    ctaLink: '#contact'
};

const batteryJargonData: BatteryJargonData = {
    topSubtitle: 'How your battery works',
    title: '(Without jargon)',
    description: 'A home battery stores the solar your panels produce during the day so you can use it after sundown, when grid electricity is most expensive.',
    cards: [
        {
            title: 'Your panels generate solar all day',
            description: 'Perth averages 5.8 peak sun hours, one of the highest solar irradiance levels of any capital city. A 6.6kW system makes more than most homes use during daylight hours.',
            image: businessBg
        },
        {
            title: 'Surplus solar charges your battery, not the grid',
            description: 'Without a battery, that surplus flows to the grid for 2.25–10c per kWh. With a battery, it charges the unit directly, typically fully charging a 10 kWh battery by early afternoon.',
            image: productReviewBg
        },
        {
            title: 'Your home runs on stored solar after sunset',
            description: 'From dusk through the evening peak (3pm–9pm) when grid electricity is most expensive, your home draws from the battery instead of Synergy. Each kWh used this way saves you around 30 cents.',
            image: heroBanner
        },
        {
            title: 'Grid is backup, not default',
            description: "On the rare day where you run the battery flat, the grid tops you up automatically. You don't notice the handover.",
            image: forYourHome
        },
        {
            title: 'During a blackout, your battery keeps the lights on',
            description: 'With a backup-ready battery (Tesla Powerwall 3, Sigenergy, BYD with backup box), essential circuits keep running while the grid is down.',
            image: businessBg
        }
    ]
};

const batteryBillImpactData: BatteryBillImpactData = {
    topSubtitle: 'what a battery actually',
    title: 'Does to your bill',
    bottomSubtitle: ' Across our 45,000+ installations, Perth households combining solar with battery storage typically see bill reductions of 70–90% — transforming electricity from a major expense into a near-negligible one.',
    cards: [
        {
            title: 'annual bill savings',
            description: 'A typical 10 kWh battery cycling daily saves a Perth household $1,000–$1,400 per year on electricity, based on current Synergy A1 tariff and DEBS feed-in rates.',
            image: businessBg
        },
        {
            title: 'Payback period',
            description: 'With the WA Residential Battery Scheme, federal Cheaper Home Batteries Program, and interest-free loan, a 10 kWh battery can pay for itself in 3–5 years for most Perth households.',
            image: productReviewBg
        },
        {
            title: 'Bill Reduction',
            description: 'Across our 45,000+ installations, Perth households combining solar with battery storage typically see bill reductions of 70–90% — transforming electricity from a major expense into a near-negligible one.',
            image: heroBanner
        }
    ]
};

const batteryRangeGridData: BatteryRangeGridData = {
    topSubtitle: 'Five Ways Into',
    title: 'Our Battery Range',

    batteries: [
        {
            title: 'Turn Your Home Into A Smart Energy Hub',
            description: 'App control, VPP integration, automated load shifting and EV-ready. The next generation of what a home battery can do.',
            image: businessBg,
            ctaText: 'Explore smart home batteries',
            ctaLink: '#contact'
        },
        {
            title: 'Our Full Battery Range',
            description: ' Tesla Powerwall 3, BYD, Alpha ESS, Sigenergy, iStore and more. Right-sized for your home, your usage and your solar system.',
            image: businessBg,
            ctaText: 'see all products',
            ctaLink: '#contact'
        },
        {
            title: 'Claim Up To $7,900 Off In 2026',
            description: 'Step-by-step guide to the WA Residential Battery Scheme, federal Cheaper Home Batteries Program, and the $10,000 interest-free loan.',
            image: productReviewBg,
            ctaText: 'rebate guide',
            ctaLink: '#contact'
        },
        {
            title: 'Only Proven, Perth-Tested Brands',
            description: 'Every brand we install is CEC-approved, on Synergy\'s Supported Solutions List, and field-tested in WA conditions.',
            image: forYourHome,
            ctaText: 'compare brands',
            ctaLink: '#contact'
        },
        {
            title: 'Your Questions, Answered Instantly',
            description: '40+ questions from Perth homeowners — sizing, VPP, blackouts, warranties, real-world performance.',
            image: heroBanner,
            ctaText: 'read the FAQ',
            ctaLink: '#contact'
        }
    ]
};

const batteryCapacityData: BatteryCapacityData = {
    topSubtitle: 'Three Rebates Stacked',
    title: 'On A 10kWh Battery',
    description: 'For most Perth homeowners, three incentives combine to take thousands off the price of a battery.',
    cards: [
        {
            title: 'WA Residential Battery Scheme',
            description: 'WA Residential Battery Scheme — Up To $1,300 (Synergy) Or $3,800 (Horizon)'
        },
        {
            title: 'Federal Cheaper Home Batteries Program',
            description: 'Approximately $3,720 On A 10 KWh Battery',
            isPrimary: true
        },
        {
            title: 'Interest-Free \nLoan',
            description: 'Up To $10,000 Over 3–10 Years (Via Plenti, Income Under $210k)'
        }
    ],
    footerText: 'Combined Value: Up To $5,000 (Synergy) Or $7,500 (Horizon) Off A 10 KWh Battery. Plus The Option To Finance The Rest At 0% Interest.',
    ctaText: 'Full Rebate Guide',
    ctaLink: '#rebate-guide'
};

const greatFitData: GreatFitData = {
    topSubtitle: 'A Battery',
    title: 'Is A Great Fit If',
    goodFitTitle: 'Good Fit',
    goodFitItems: [
        'You already have solar, or you\'re adding solar and a battery together',
        'Your Synergy bill regularly exceeds $400/quarter',
        'You use a meaningful amount of power after 3pm (families, home-based workers, EV owners)',
        'You own your home (the rebate requires owner-occupier or landlord consent)',
        'You\'re on Synergy (SWIS) or Horizon Power'
    ],
    conversationTitle: 'Worth A Conversation First',
    conversationItems: [
        'You\'re away during the day AND evenings — you may not cycle the battery hard enough',
        'Your roof is heavily shaded or poorly oriented — solar sizing matters for battery value',
        'You\'re planning an EV purchase in 12 months — battery sizing should account for it',
        'You\'re a renter or strata property — rebates and technical approvals need upfront planning'
    ]
};

const solarBatteryMeaningData: SolarBatteryMeaningData = {
    topSubtitle: 'what a virtual power plant',
    title: 'Actually Means For You',
    description: "To claim the WA battery rebate, your system must join a Virtual Power Plant (VPP). Here's what that means in plain English.",
    cards: [
        {
            title: 'Peace of Mind',
            description: 'A network of home batteries thousands of them that Synergy or Horizon Power can call on during peak grid stress. Instead of firing up a gas peaker, the grid pulls a bit of stored energy from each participating battery.',
            isPrimary: true
        },
        {
            title: 'How often does it happen?',
            description: 'Keep essential appliances running during grid outages.'
        },
        {
            title: 'What do you get for it?',
            description: 'Maximize your use of clean, renewable energy.'
        },
        {
            title: 'Do you lose control?',
            description: 'Increase the resale value and appeal of your property.'
        }
    ]
};

const installationTimelineData: InstallationTimelineData = {
    topSubtitle: 'From Quote To Switched On',
    title: 'In About 4–6 Weeks',
    steps: [
        {
            title: 'Free Home Assessment',
            description: 'Our team visits your property or runs a remote assessment. We review your energy bills, roof orientation, main switchboard capacity, and any existing solar.',
            image: businessBg
        },
        {
            title: 'Custom System Design',
            description: 'Our engineers design a tailored system based on your usage patterns, roof layout, and future plans like EV charging.',
            image: productReviewBg
        },
        {
            title: 'Western Power Approval',
            description: 'We handle the full application to Western Power and Synergy. You don\'t need to lift a finger.',
            image: forYourHome
        },
        {
            title: 'Installation Day',
            description: 'Our in-house CEC-accredited electricians install your system in 1–2 days. No subcontractors.',
            image: heroBanner
        }
    ]
};

const oneLocalTeamData: OneLocalTeamData = {
    topSubtitle: '23 Years. 45,000+ Installations.',
    title: 'One Local Team.',
    cards: [
        {
            image: teslapower, // Note: these will be replaced with real images later
            title: 'Tesla Certified Installer',
            description: 'One of the few Perth installers with direct Tesla Powerwall certification. We\'re trained and authorised by Tesla, not just retailing the product.'
        },
        {
            image: approvedseller,
            title: 'NETCC Approved Retailer',
            description: 'NETCC is the highest accreditation. Our compliance, installation standards and consumer protections are independently verified.'
        },
        {
            image: productreview,
            title: 'ProductReview Award, 6 Years Running',
            description: 'Winner 2021, 2022, 2023, 2024, 2025, 2026. Verified customer reviews, not marketing stats.'
        },
        {
            image: "/regen_logo_nav.png",
            title: '45,000+ Solar | 3000+ Storage Installations Nationwide',
            description: 'From a single roof in Canning Vale to industrial-scale off-grid systems. Scale matters when warranty time comes around.'
        },
        {
            image: australia,
            title: 'Local, Since 2003',
            description: 'Perth-based head office in Canning Vale. Same team that sells is the team that installs and services — 23 years later.'
        }
    ],
    ctaText: 'See Our Customer Reviews',
    ctaLink: '#reviews'
};

const customerStoriesData: CustomerStoriesData = {
    topSubtitle: 'Perth Homes',
    title: 'That Made The Switch',
    stories: [
        {
            home: 'Family home, Canning Vale',
            specs: '10 kW solar + Tesla Powerwall 3 (13.5 kWh)',
            description: 'Quarterly bill down from $680 to $90. Battery cycles once per day on average. Enrolled in Synergy VPP, earning ~$280/year in activation credits.',
            image: businessBg
        },
        {
            home: 'Retiree Couple, Mandurah',
            specs: '6.6 kW solar + BYD B-Box HV (10 kWh)',
            description: 'Quarterly bill down from $520 to $60. Battery cycles once per day on average. Enrolled in Synergy VPP, earning ~$250/year in activation credits.',
            image: productReviewBg
        },
        {
            home: 'EV Household, Kalamunda',
            specs: '5 kW solar + Alpha ESS SMILE5 (10 kWh)',
            description: 'Quarterly bill down from $450 to $50. Battery cycles once per day on average. Enrolled in Synergy VPP, earning ~$200/year in activation credits.',
            image: forYourHome
        }
    ]
};

const batteryFAQData: BatteryFAQData = {
    topTitle: 'Straight Answers To The Questions Perth Homeowners',
    title: 'Ask Us Most',
    listTitle: 'Frequently Asked Questions',
    image: forYourHome,
    items: [
        { question: 'How long do solar batteries last?', answer: 'Most quality solar batteries come with a 10-year warranty and are expected to last 10-15 years depending on usage cycles.' },
        { question: 'Can I add a battery to my existing solar system?', answer: 'Yes, in most cases we can retrofit a battery. We call this AC coupling, and it works with almost any existing solar inverter.' },
        { question: 'Do I still need to be connected to the grid?', answer: 'While you can go completely off-grid, it\'s usually more cost-effective to remain grid-connected for backup during long periods of bad weather.' }
    ]
};

const finalCTAData: GetSolarProps = {
    subtitle: 'Claim Your Rebate Before',
    mainTitle: '1 May 2026',
    description: 'The federal Cheaper Home Batteries Program is tiered down from 1 May. Installing before that date locks in the full rebate value and avoids the new SWIS connection rules. We handle the paperwork — you just start saving.',
    bgImage: heroBanner,
    buttonText: 'Get My Free Battery Quote',
    buttonHref: '#quote-form'
};

const heroData: HeroSectionData = {
    mediaSrc: heroBanner,
    mediaType: 'image',
    imageClass: 'object-cover',
    topSubtitle: 'Solar Batteries Engineered For The',
    mainTitle: 'Perth Climate',
    description: "WA's #1 Rated Solar Battery Installer With 45,000+ Installations Since 2003. CEC-Approved. ProductReview Award Winner 2021–2026.",
    ctaText: 'Get Your Free Battery Quote',
    ctaLink: '#quote-form',
    subtitleColor: 'text-white',
    descriptionColor: 'text-white',
    showOverlay: true
};

const BatteryStoragePage = () => {
    return (
        <main className="w-full min-h-screen">
            {/* 1. Hero Section */}
            <HeroSection data={heroData} />
            <BatteryMarquee data={batteryMarqueeData} />

            {/* 2. Debs Rebate Alert/Banner */}
            <DebsRebateBanner data={debsRebateData} />

            {/* 3. Battery Storage (Without Jargon) */}
            <BatteryJargon data={batteryJargonData} />

            {/* 4. What Battery Storage Can Do To Your Bill */}
            <BatteryBillImpact data={batteryBillImpactData} />

            {/* 5. Meet The Best Fits Our Battery Range */}
            <BatteryRangeGrid data={batteryRangeGridData} />

            {/* 6. What You Can Run On A 10kWh Battery */}
            <BatteryCapacityBlocks data={batteryCapacityData} />

            <GreatFit data={greatFitData} />

            {/* 8. What Solar + Battery Actually Means For You */}
            <SolarBatteryMeaning data={solarBatteryMeaningData} />

            {/* 9. From Quote To Systems On In About 4-6 Weeks */}
            <InstallationTimeline data={installationTimelineData} />

            {/* 10. One Local Team */}
            <OneLocalTeam data={oneLocalTeamData} />

            {/* 11. Customers That Made The Switch */}
            <CustomerStories data={customerStoriesData} />

            {/* 12. Ask Us Most (FAQ) */}
            <BatteryFAQ data={batteryFAQData} />

            {/* 13. Final CTA */}
            <GetSolar {...finalCTAData} />
        </main>
    );
};

export default BatteryStoragePage;