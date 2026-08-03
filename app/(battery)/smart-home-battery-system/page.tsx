import React from 'react';

// Reusable Components
import HeroSection, { HeroSectionData } from '@/reuseables/HeroSection';
import GreatFit, { GreatFitData } from '@/components/battery/smarthome-battery-system/GreatFit';
import BatterySplitSection, { BatterySplitData } from '@/components/battery/smarthome-battery-system/BatterySplitSection';
import BatteryTimeline, { BatteryTimelineData } from '@/components/battery/smarthome-battery-system/BatteryTimeline';
import BatteryBrandsGrid, { BatteryBrandsGridData } from '@/components/battery/smarthome-battery-system/BatteryBrandsGrid';
import SmartInstallBento, { SmartInstallBentoData } from '@/components/battery/smarthome-battery-system/SmartInstallBento';
import GetSolar, { GetSolarProps } from '@/reuseables/getsolar';

// Placeholder Images
import heroBanner from '@/assets/evcharging/hero_banner.png';
import businessBg from '@/assets/home/zerointrest/businessBg.jpg';
import productReviewBg from '@/assets/home/zerointrest/productReviewBg.png';
import forYourHome from '@/assets/for_your_home.png';
import teslaLogo from '@/assets/home/patners/tesla_powerwall.png';
import BatteryMarquee, { BatteryMarqueeData } from '@/components/battery/battery-storage/BatteryMarquee';
import FourPillars, { FourPillarsData } from '@/components/battery/smarthome-battery-system/FourPillars';

// --- Data ---

const batteryMarqueeData: BatteryMarqueeData = {
  items: [
    { text: '45,000+ Solar' },
    { text: '3000+ Storage Installations' },
    { text: '23 Years In Perth' },
    { text: '4.9★ Rating (Google + ProductReview)' }
  ]
};

const greatFitData: GreatFitData = {
  topSubtitle: 'Not Every \'Smart\' Battery',
  title: 'Is Actually Smart',
  description: 'Marketing has diluted the term. A truly smart home battery does more than show you an app with a state-of-charge graph. Here\'s what the category actually means in 2026.',
  goodFitTitle: 'What It Has',
  goodFitItems: [
    'Grid-aware: can participate in Virtual Power Plants and respond to grid dispatch events automatically',
    'Learning: uses historical usage patterns to pre-charge, load-shift and reserve capacity for forecast outages',
    'Orchestrating: coordinates with EV chargers, hot water, pool pumps and other controllable loads — not just batteries in isolation',
    'Open: integrates with Home Assistant, Google Home, Apple Home, or exposes a documented API'
  ],
  conversationTitle: 'What It Doesn\'t',
  conversationItems: [
    'An app that just shows you your battery level',
    'Remote on/off for a single battery unit',
    '"Smart" as a marketing label without grid or ecosystem integration'
  ]
};

const fourPillarsData: FourPillarsData = {
  topSubtitle: 'The Four',
  title: 'Pillars',
  description: 'A smart home battery earns its name by doing four things exceptionally well. Each of these has a dedicated section \nbelow.',
  cards: [
    {
      title: 'VPP Integration',
      description: "Your battery joins Synergy's Virtual Power Plant. The grid pays you when it needs your stored energy.",
      image: businessBg
    },
    {
      title: 'Load Shifting',
      description: 'Stored solar runs your home during peak tariff hours (3–9pm), saving you ~30c per kWh vs grid electricity.',
      image: productReviewBg
    },
    {
      title: 'App & Automation Control',
      description: 'Stored solar runs your home during peak tariff hours (3–9pm), saving you ~30c per kWh vs grid electricity.',
      image: forYourHome
    },
    {
      title: 'Smart home ecosystem',
      description: 'Home Assistant, Google Home, Apple HomeKit, Tesla app, mySigen — your battery plays well with what you already use.',
      image: heroBanner
    }
  ]
};

const powerPerthData: BatterySplitData = {
  slides: [
    {
      topSubtitle: 'Your Battery',
      title: 'Paid To Help Power Perth',
      mainDescription: "The WA Residential Battery Scheme makes VPP participation mandatory for claiming the $1,300 Synergy rebate. That's not a limitation — it's a revenue stream.",
      blocks: [
        {
          title: 'How Synergy\'s Battery Rewards Works',
          description: "When grid demand spikes — typically 3pm to 9pm on Perth's hottest summer afternoons — Synergy can call on a network of participating home batteries to export stored energy into the grid. Each activation lasts a few hours. Synergy pays 70 cents per kWh exported — more than double what you pay for grid power."
        },
        {
          title: 'How Much Do You Earn?',
          description: "Typical high-use households earn $1,000–$1,200 per year through a combination of daily cycling and VPP activation events. Lower-use households earn $500–$700. This is on top of the upfront $1,300 rebate."
        },
        {
          title: 'What you keep control of',
          description: "Dispatch events are capped at around 30 per year, for a few hours each. Outside events, you have full control. If you use grid power during an activation window to cover your own home, Synergy credits you for that too — you're never financially worse off."
        },
        {
          title: 'What systems are VPP-ready',
          description: "Every battery we install is VPP-capable and on the Synergy or Horizon Power Supported Solutions List. Tesla Powerwall 3, BYD Battery-Box, Alpha ESS, Sigenergy SigenStor, iStore and Goodwe Lynx all qualify."
        }
      ],
      ctaText: 'Read the Full Battery Rebate Guide',
      ctaLink: '#assessment',
      image: businessBg
    },
    {
      topSubtitle: 'Move Your Energy',
      title: "Use To When It's Cheapest",
      mainDescription: "In 2026, Perth's Distributed Energy Buyback Scheme (DEBS) pays just 2.25c per kWh for solar exported off-peak, and 10c per kWh during the 3pm–9pm window. But grid electricity costs you around 30c per kWh on the A1 tariff. A smart battery exploits that gap automatically.",
      blocks: [
        {
          title: 'The tariff arbitrage',
          description: "Every kWh you store in your battery and consume in the evening saves ~30c. Every kWh you export to the grid earns ~2.25c. The gap — roughly 27c per kWh — is where battery economics comes from."
        },
        {
          title: 'Smart Home TOU plan compatibility',
          description: "If you're on Synergy's Smart Home Plan (time-of-use), a smart battery also charges from cheap overnight electricity (when solar isn't producing), rides out the morning peak and tops up again at midday. Some Perth homes earn more from shifting than from solar itself."
        },
        {
          title: 'Automated load scheduling',
          description: 'Your hot water, pool pump, EV charger and even dishwasher can be scheduled to run when your battery is full and the grid is cheap. The smart battery coordinates all of this in the background.'
        },
        {
          title: 'What happens on a cloudy winter day',
          description: "The battery reserves evening capacity, charges what it can from reduced solar, and only pulls from the grid as a last resort — at the cheapest window available."
        }

      ],
      ctaText: 'Read the Full Battery Rebate Guide',
      ctaLink: '#rebate-guide',
      image: productReviewBg
    },
    {
  topSubtitle: 'The Battery App',
  title: 'Done Properly',
  mainDescription:
    "Every battery comes with an app. Some are genuinely useful; some are just a dashboard. Here's what a good one looks like in 2026.",
  blocks: [
    {
      title: 'What you actually use day-to-day',
      description:
        '• Live energy flow (Solar → Battery → Home → Grid, updated every few seconds)\n• State of charge and time-until-full / time-until-empty estimates\n• Today vs this week vs this month vs this year dashboards\n• Outage alerts and backup-mode switching\n• VPP activation notifications with earnings summary\n• Rule-based automation ("Charge to 100% before 2pm on a hot day", "Reserve 30% for blackouts")'
    },
    {
      title: 'The best battery apps in 2026',
      description:
        "Tesla App — Industry benchmark for clean UX, multi-product integration (Powerwall, Solar, EV, Charger)\n\nMySigen App — Sigenergy's AI-assisted assistant powered by GPT-4, handles natural-language queries ('What's my battery doing today?')\n\nBYD BYOS — Functional, no-frills, reliable\n\niStore App — Local brand, integrates with iStore hot water and pool heater."
    },
    {
      title: 'Voice and automation',
      description:
        'Your hot water, pool pump, EV charger and even dishwasher can be scheduled to run when your battery is full and the grid is cheap. The smart battery coordinates all of this in the background.'
    }
  ],
  ctaText: 'Read the Full Battery Rebate Guide',
  ctaLink: '#rebate-guide',
  image: productReviewBg
},
{
  topSubtitle: 'Plays Well With Your',
  title: 'Existing Smart Home',
  mainDescription:
    "If you already run Home Assistant, Google Home, Apple HomeKit or Tesla's ecosystem, your battery should fit in — not force you to switch.",
  blocks: [
    {
      title: 'The tariff arbitrage',
      description:
        'Every kWh you store in your battery and consume in the evening saves ~30c. Every kWh you export to the grid earns ~2.25c. The gap — roughly 27c per kWh — is where battery economics comes from.'
    },
    {
      title: 'Smart Home TOU plan compatibility',
      description:
        "If you're on Synergy's Smart Home Plan (Time-Of-Use), a smart battery also charges from cheap overnight electricity (when solar isn't producing), rides out the morning peak and tops up again at midday. Some Perth homes earn more from shifting than from solar itself."
    },
    {
      title: 'Automated load scheduling',
      description:
        'Your hot water, pool pump, EV charger and even dishwasher can be scheduled to run when your battery is full and the grid is cheap. The smart battery coordinates all of this in the background.'
    },
    {
      title: 'What happens on a cloudy winter day',
      description:
        'The battery reserves evening capacity, charges what it can from reduced solar, and only pulls from the grid as a last resort — at the cheapest window available.'
    }
  ],
  ctaText: 'Read the Full Battery Rebate Guide',
  ctaLink: '#rebate-guide',
  image: productReviewBg
}
    

  ]
};

const timelineData: BatteryTimelineData = {
  topSubtitle: 'A Tuesday in Summer',
  title: 'What Your Battery Does Automatically',
  events: [
    {
      time: "6:00 AM",
      title: "Battery At 15%, Receiving Morning Peak",
      description: "You wake up. The battery has held back 15% of charge to ride out the 7am–9am peak tariff window. Grid draw for the kettle: zero. House runs on battery."
    },
    {
      time: "9:00 AM",
      title: "Sun Is Up, Solar Starts Filling",
      description:
        "Solar generation hits 4kW. Your house is drawing 1kW. The battery starts charging at 3kW and your hot water system — scheduled by the battery's rule engine — switches on to soak up surplus."
    },
    {
      time: "12:00 PM",
      title: "Battery Full, Surplus Exports",
      description:
        'Battery at 100%. Pool pump kicks on (rule: "Run Pump When Battery Is Full And Solar > 2kW"). EV is plugged in and charges directly from solar at 7kW. Any remaining surplus exports to the grid at 10c/kWh DEBS rate.'
    },
    {
      time: "3:00 PM",
      title: "Evening Peak Starts",
      description:
        "Solar generation drops as the sun tracks west. Grid electricity price jumps to 30c/kWh. Battery begins discharging to cover house load. Synergy's VPP flags a potential activation event for 5pm — battery app notifies you."
    },
    {
      time: "5:00 PM",
      title: "VPP Activation Event",
      description:
        "Synergy calls on the VPP. Your battery exports 4kWh to the grid over the next 2 hours at 70c per kWh. That's $2.80 of credit for 2 hours of participation. House continues running off the battery; Synergy covers the house usage."
    },
    {
      time: "8:00 PM",
      title: "Home Running On Stored Solar",
      description:
        "Dishwasher, lights, TV, cooking — all running off the battery. Grid contribution for the evening: zero. Battery at 35%."
    },
    {
      time: "11:00 PM",
      title: "Overnight Low Tariff Window (If On TOU Plan)",
      description:
        "Battery opportunistically tops up from the grid at 18c/kWh to reserve capacity for tomorrow's 7am peak. Only needed if tomorrow's solar forecast is poor."
    }
  ]
};

const batteryBrandsData: BatteryBrandsGridData = {
  topSubtitle: 'The Best Smart Home Batteries For',
  title: 'Perth In 2026',
  subtitle: 'Three batteries stand above the rest for smart home use cases. Each suits a different household profile.',
  brands: [
    {
      title: 'Sigenergy SigenStor (Our Smart Home Pick)',
      specification: [
        {
          title: 'Best For:',
          logo: teslaLogo, // Placeholder
          description: 'Tech-Forward Homes, EV Owners, Home Assistant Users'
        },
        {
          title: 'Why:',
          description: 'Five-In-One Design (Hybrid Inverter + Battery + EV DC Charger + EMS + Gateway). Stacks From 5 KWh To 48 KWh. 25kW Bidirectional DC EV Charger Enables V2H/V2G. GPT-4 Powered MySigen Assistant. Native Home Assistant Integration.'
        },
        {
          title: 'Warranty:',
          description: '10 Years On Battery And Inverter, 5 Years On Gateway'
        }
      ],
      showbutton: true,
      buttonText: 'Explore Smart Home Batteries',
      buttonLink: '#sigenergy'
    },
    {
      title: 'Tesla Powerwall 3 (The Benchmark)',
      specification: [
        {
          title: 'Best For:',
          logo: teslaLogo, // Placeholder
          description: 'Tesla EV Owners, Homes Valuing Industry-Leading App UX'
        },
        {
          title: 'Why:',
          description: '13.5 KWh Usable. Integrated Solar Inverter (No Separate Hybrid Inverter Needed). Up To 10kW Continuous Backup. Tesla App Is Still The Category Benchmark. Native Integration With Tesla Wall Connector And Vehicles.'
        },
        {
          title: 'Warranty:',
          description: '10 Years Product'
        }
      ],
      showbutton: true,
      buttonText: 'Explore Smart Home Batteries',
      buttonLink: '#tesla'
    },
    {
      title: 'Sigenergy SigenStor (Our Smart Home Pick)', // Literal text from image BYD section
      specification: [
        {
          title: 'Best For:',
          logo: teslaLogo, // Placeholder
          description: 'Homes Wanting Modular Scalability Without Ecosystem Lock-In'
        },
        {
          title: 'Why:',
          description: '5.1 KWh Modules Stack To 22.1 KWh Per Tower; Up To 3 Towers In Parallel. LFP Chemistry. IP55 Rated For Outdoor Install. Compatible With Most Major Hybrid Inverters (Sungrow, Fronius, SolaX) — Gives You Inverter Flexibility.'
        },
        {
          title: 'Warranty:',
          description: '10 Years Product, 10 Years Performance'
        }
      ],
      showbutton: true,
      buttonText: 'Explore Smart Home Batteries',
      buttonLink: '#byd'
    }
  ]
};

const installBentoData: SmartInstallBentoData = {
  title: 'The Smart System Install — Done Properly',
  description:
    'A smart home battery install is more than bolting a battery to a wall. The difference between a basic install and a properly commissioned smart system shows up every day afterwards.',
  blocks: [
    {
      theme: 'light',
      title: 'VPP Enrolment Verified End-To-End',
      description:
        "We enrol your system in Synergy's Battery Rewards (or Horizon Power's Community Wave), confirm the dispatch profile with the retailer, and test a simulated activation before handover."
    },
    {
      theme: 'light',
      title: 'Automation Rules Configured To Your Usage',
      description:
        'Based on your historical Synergy bill data, we set rules for reserve capacity, EV charging windows, hot water scheduling and backup priority.'
    },
    {
      theme: 'light',
      title: 'App Set Up And Walked Through In Person',
      description:
        'We log in to your device, set up notifications, configure dashboards and walk you through daily, weekly and monthly views. You leave knowing exactly what to tap.'
    },
    {
      theme: 'dark',
      title: 'Home Automation Integration (If Requested)',
      description:
        "Home Assistant, Google Home, Apple Home — we'll configure the integration at handover, not leave it for you to figure out."
    },
    {
      theme: 'light',
      title: '90-Day Tune-Up',
      description:
        'We review your first 90 days of operation, tune automation rules based on actual behaviour, and confirm VPP performance. Your system gets smarter over time.'
    }
  ]
};

const smartHomeHeroData: HeroSectionData = {
  mediaSrc: heroBanner,
  mediaType: 'image',
  imageClass: 'object-cover',
  topSubtitle: 'Smart Home Battery System',
  mainTitle: 'In Perth',
  description:
    "A smart home battery learns your household's patterns, participates in Synergy's Virtual Power Plant to earn you credits, and orchestrates when to charge your EV, run your pool pump or draw from the grid. We install the systems that make this actually work — not just on paper.",
  ctaText: 'See If A Smart System Suits My Home',
  ctaLink: '#quote',
  subtitleColor: 'text-white',
  descriptionColor: 'text-white',
  showOverlay: true,
};

const smartSystemCtaData: GetSolarProps = {
  subtitle: 'Build A Smart Home',
  mainTitle: 'Starting With A Battery',
  description:
    "Tell us about your home — what ecosystem you're using, whether you have an EV, what your Synergy bills look like. We'll design a smart system that actually works for you, not a generic package.",
  buttonText: 'Request A Smart System Consultation',
  buttonHref: '#consultation',
  bgImage: heroBanner,
};

const SmartBatterySystemPage = () => {
  return (
    <main className="w-full min-h-screen">
      {/* 1. Hero */}
      <HeroSection data={smartHomeHeroData} />
      <BatteryMarquee data={batteryMarqueeData} />
      {/* 2. Great Fit / Not Every Smart Battery */}
      <GreatFit data={greatFitData} />

      {/* 3. The Four Pillars (Grid) */}
      <FourPillars data={fourPillarsData} />

      {/* 4. Power Perth Split Section */}
      <BatterySplitSection data={powerPerthData} />

      {/* 5. A Tuesday in Summer Timeline */}
      <BatteryTimeline data={timelineData} />

      {/* 6. Battery Brands Grid */}
      <BatteryBrandsGrid data={batteryBrandsData} />

      {/* 7. Smart Install Bento */}
      <SmartInstallBento data={installBentoData} />

      {/* 8. Get Solar CTA */}
      <GetSolar {...smartSystemCtaData} />
    </main>
  );
};

export default SmartBatterySystemPage;