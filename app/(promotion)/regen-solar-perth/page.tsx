'use client';

import React from 'react';
import Hero from '@/components/Promotion/other/Hero';
import WhyChooseUs from '@/components/Promotion/other/WhyChooseUs';
import Awards from '@/components/Promotion/other/Awards';
import BatteryPricing from '@/components/Promotion/other/BatteryPricing';
import QuoteForm from '@/components/Promotion/other/QuoteForm';
import Brands from '@/components/Promotion/other/Brands';
import ContactInfo from '@/components/Promotion/other/ContactInfo';

export default function RegenSolarPerthPage() {

  // 1. Hero Section Data
  const heroData = {
    title: "20kWh Battery System",
    highlightText: "Up to $5,400 Back In Rebate",
    subtitle: "Lock In Today's Pricing Now!",
    ctaText: "Secure My Rebate",
    bgImage: "/assets/home/home_hero_bg.png"
  };

  // 2. Why Choose Us / Stats Grid Data
  const whyChooseUsData = {
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
        title: "We are Local WA Born and Bred company",
        bgImage: "/assets/home/whychooseus/bussiness_operating.png"
      },
      {
        id: 'installations',
        type: 'dark' as const,
        value: "45K+",
        title: "Solar Installations Nationwide",
        iconType: 'globe' as const
      },
      {
        id: 'batteries',
        type: 'battery' as const,
        value: "3k+",
        title: "Number of battery installations in WA",
        iconType: 'battery' as const
      }
    ]
  };

  // 3. Awards / Badges Data
  const awardsData = {
    awards: [
      {
        id: 'productreview',
        image: '/assets/home/realstories/top_panel_installers.png',
        title: '6 X ProductReview Award Winner 2021, 22, 23, 24, 25, 26',
        description: 'Awarded for consistent excellence and outstanding customer satisfaction in residential solar and battery installations.'
      },
      {
        id: 'bestrated',
        image: '/assets/home/realstories/best_rated_batch.png',
        title: 'The Best Rated Installer in WA 2026',
        description: 'Recognized as Perth and Western Australia\'s premier solar systems provider with 4.9+ star community ratings.'
      }
    ]
  };

  // 4. Battery Pricing & Showcase Data
  const batteryPricingData = {
    backgroundImage: "/solar_house_render.png",
    batteryImage: "/sig_energy.png",
    packages: [
      {
        id: '8.3kwh',
        capacity: "8.3kWh Battery",
        originalPrice: 14404,
        finalPrice: 10990,
        rebates: [
          { label: "State Rebate", amount: 1209 },
          { label: "Federal Rebate", amount: 2205 }
        ],
        schemeText: "Up to $10,000 Interest Free Finance available under modern scheme",
        priceNote: "Fully installed. Price is after the battery rebate."
      },
      {
        id: '16.6kwh',
        capacity: "16.6kWh Battery",
        originalPrice: 18245,
        finalPrice: 12990,
        rebates: [
          { label: "State Rebate", amount: 1300 },
          { label: "Federal Rebate", amount: 3955 }
        ],
        schemeText: "Interest-free loan of up to $10k for 10 years available from WA state scheme",
        priceNote: "Fully installed. Price is after the battery rebate."
      }
    ]
  };

  // 5. Contact Form Data
  const quoteFormData = {
    title: "Get",
    titleGreen: "A Quote",
    noticeText: "Due to the current high demand for batteries, we are unable to accept bookings for Solar-Only installations at this time. Bookings will only be accepted for Solar + Battery or Battery-Only installations.",
    buttonText: "Get Free Estimate"
  };

  // 6. Brands Logos and Products Data
  const brandsData = {
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

  // 7. Contact Details and Social Links Data
  const contactInfoData = {
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

  const handleScrollToQuote = () => {
    const element = document.getElementById('quote-form-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* 1. Hero */}
      <Hero 
        title={heroData.title}
        highlightText={heroData.highlightText}
        subtitle={heroData.subtitle}
        ctaText={heroData.ctaText}
        bgImage={heroData.bgImage}
        onCtaClick={handleScrollToQuote}
      />
      
      {/* 2. Why Choose Us */}
      <WhyChooseUs 
        title={whyChooseUsData.title}
        titleGreen={whyChooseUsData.titleGreen}
        cards={whyChooseUsData.cards}
      />
      
      {/* 3. Awards */}
      <Awards 
        awards={awardsData.awards}
      />
      
      {/* 4. Battery Pricing Comparison */}
      <BatteryPricing 
        backgroundImage={batteryPricingData.backgroundImage}
        batteryImage={batteryPricingData.batteryImage}
        packages={batteryPricingData.packages}
      />
      
      {/* 5. Get A Quote Form */}
      <div id="quote-form-section">
        <QuoteForm 
          title={quoteFormData.title}
          titleGreen={quoteFormData.titleGreen}
          noticeText={quoteFormData.noticeText}
          buttonText={quoteFormData.buttonText}
        />
      </div>
      
      {/* 6. Brands & Showcase */}
      <Brands 
        title={brandsData.title}
        titleGreen={brandsData.titleGreen}
        description={brandsData.description}
        brands={brandsData.brands}
        batteries={brandsData.batteries}
      />
      
      {/* 7. Contact Details */}
      <ContactInfo 
        title={contactInfoData.title}
        description={contactInfoData.description}
        items={contactInfoData.items}
        socials={contactInfoData.socials}
      />
    </div>
  );
}