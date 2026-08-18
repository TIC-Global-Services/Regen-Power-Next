import type { NextConfig } from "next";

const STRAPI_URL =
  process.env.STRAPI_URL || "https://regen-cms.theinternetcompany.one/";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: new URL(STRAPI_URL).hostname,
      },
    ],
  },
};

export default nextConfig;
