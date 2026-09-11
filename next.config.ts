import type { NextConfig } from "next";

const STRAPI_URL =
  process.env.STRAPI_URL || "https://regen-cms.theinternetcompany.one/";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/battery",
        destination: "/battery/battery-product",
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
    ],
  },
};

export default nextConfig;
