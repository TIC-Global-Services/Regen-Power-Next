import type { NextConfig } from "next";

const STRAPI_URL =
  process.env.STRAPI_URL || "https://strapi.regenpower.com";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/battery",
        destination: "/battery/battery-product",
        permanent: true,
      },
      {
        source: "/battery-storage",
        destination: "/battery/battery-storage",
        permanent: true,
      },
      // Legacy regenpower.com URLs — preserve SEO/backlinks on relaunch.
      {
        source: "/about-solar",
        destination: "/solar/solar-system",
        permanent: true,
      },
      {
        source: "/about-solar/how-solar-power-works",
        destination: "/solar/solar-system",
        permanent: true,
      },
      {
        source: "/about-solar/government-rebates",
        destination: "/solar/government-rebates",
        permanent: true,
      },
      {
        source: "/about-solar/why-regen-power",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/about-solar/faq",
        destination: "/solar/faq",
        permanent: true,
      },
      {
        source: "/residential-solar-perth",
        destination: "/solar/solar-system",
        permanent: true,
      },
      {
        source: "/solar-deals",
        destination: "/solar/deals",
        permanent: true,
      },
      {
        source: "/solar-panels",
        destination: "/solar/brands",
        permanent: true,
      },
      {
        source: "/solar-inverters",
        destination: "/solar/brands",
        permanent: true,
      },
      {
        source: "/other-products",
        destination: "/solar/brands",
        permanent: true,
      },
      {
        source: "/solar-battery-storage",
        destination: "/battery/battery-storage",
        permanent: true,
      },
      {
        source: "/how-solar-batteries-work",
        destination: "/battery/battery-storage",
        permanent: true,
      },
      {
        source: "/tesla-powerwall-certified-installer",
        destination: "/battery/brands-we-carry",
        permanent: true,
      },
      {
        source: "/wa-solar-battery-rebate",
        destination: "/battery/government-rebates",
        permanent: true,
      },
      {
        source: "/istore-battery",
        destination: "/battery/brands-we-carry",
        permanent: true,
      },
      {
        source: "/ev-chargers",
        destination: "/ev-charging",
        permanent: true,
      },
      {
        source: "/commercial-solar-systems",
        destination: "/commercial/commercial-off-grid",
        permanent: true,
      },
      {
        source: "/commercial-solar-systems/live-monitoring",
        destination: "/commercial/commercial-off-grid",
        permanent: true,
      },
      {
        source: "/portfolio",
        destination: "/commercial/portfolio",
        permanent: true,
      },
      {
        source: "/off-grid/case-studies",
        destination: "/commercial/case-studies",
        permanent: true,
      },
      {
        source: "/rnd",
        destination: "/commercial/research-and-development",
        permanent: true,
      },
      {
        source: "/off-grid",
        destination: "/commercial/off-grid-solutions",
        permanent: true,
      },
      {
        source: "/off-grid/hybridgen",
        destination: "/commercial/off-grid-solutions",
        permanent: true,
      },
      {
        source: "/off-grid/solar-pool-pump",
        destination: "/commercial/off-grid-solutions",
        permanent: true,
      },
      {
        source: "/off-grid/acquasmart",
        destination: "/commercial/off-grid-solutions",
        permanent: true,
      },
      {
        source: "/off-grid/hybrid-systems",
        destination: "/commercial/off-grid-solutions",
        permanent: true,
      },
      {
        source: "/about-us",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/category/press-release",
        destination: "/press-media",
        permanent: true,
      },
    ];
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: new URL(STRAPI_URL).hostname,
      },
      {
        protocol: "https",
        hostname: "regenpower.com",
      },
      {
        protocol:"http",
        hostname:"187.53.140.216"
      },
      {
        protocol:"https",
        hostname: "regenpower-assets.cloud"
      }
    ],
  },
};

export default nextConfig;
