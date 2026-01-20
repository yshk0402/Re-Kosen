import type { NextConfig } from "next";

const rawStrapiUrl =
  process.env.STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_URL;
const strapiUrl = rawStrapiUrl
  ? rawStrapiUrl.replace(/\/api\/?$/, "")
  : undefined;
const rawMediaUrl =
  process.env.MEDIA_URL || process.env.NEXT_PUBLIC_MEDIA_URL;
const mediaUrl = rawMediaUrl ? rawMediaUrl.replace(/\/$/, "") : undefined;
const strapiOrigin = strapiUrl ? new URL(strapiUrl) : null;
const mediaOrigin = mediaUrl ? new URL(mediaUrl) : null;
const strapiPattern = strapiOrigin
  ? [
      {
        protocol: strapiOrigin.protocol.replace(":", "") as "http" | "https",
        hostname: strapiOrigin.hostname,
        port: strapiOrigin.port || undefined,
      },
    ]
  : [];
const mediaPattern = mediaOrigin
  ? [
      {
        protocol: mediaOrigin.protocol.replace(":", "") as "http" | "https",
        hostname: mediaOrigin.hostname,
        port: mediaOrigin.port || undefined,
      },
    ]
  : [];
const remotePatterns = [...strapiPattern, ...mediaPattern];

const nextConfig: NextConfig = {
  images: remotePatterns.length ? { remotePatterns } : undefined,
};

export default nextConfig;
