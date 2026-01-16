import type { NextConfig } from "next";

const rawStrapiUrl =
  process.env.STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_URL;
const strapiUrl = rawStrapiUrl
  ? rawStrapiUrl.replace(/\/api\/?$/, "")
  : undefined;
const strapiOrigin = strapiUrl ? new URL(strapiUrl) : null;
const strapiPattern = strapiOrigin
  ? [
      {
        protocol: strapiOrigin.protocol.replace(":", "") as "http" | "https",
        hostname: strapiOrigin.hostname,
        port: strapiOrigin.port || undefined,
      },
    ]
  : [];

const nextConfig: NextConfig = {
  images: strapiPattern.length ? { remotePatterns: strapiPattern } : undefined,
};

export default nextConfig;
