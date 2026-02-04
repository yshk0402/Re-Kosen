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
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "kosen-job.com" }],
        destination: "https://www.kosen-job.com/:path*",
        permanent: true,
      },
      {
        source: "/articles/caree-five",
        destination: "/articles/career-five",
        permanent: true,
      },
      {
        source: "/articles/creer-eight",
        destination: "/articles/career-eight",
        permanent: true,
      },
      {
        source: "/articles/plant-enginieerging",
        destination: "/articles/plant-engineering",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
