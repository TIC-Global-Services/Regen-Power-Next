import type { NextConfig } from "next";

const STRAPI_URL =
  process.env.STRAPI_URL || "https://strapi.regenpower.com";

const nextConfig: NextConfig = {
  // Redirects live in Strapi (`redirect` collection) and are applied by proxy.ts.
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
