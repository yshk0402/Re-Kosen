const DEFAULT_SITE_URL = "https://re-kosen.vercel.app";

export const getSiteUrl = () =>
  process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL;

export const toAbsoluteUrl = (pathOrUrl: string) => {
  if (!pathOrUrl) {
    return "";
  }
  if (/^https?:\/\//i.test(pathOrUrl)) {
    return pathOrUrl;
  }
  const base = getSiteUrl().replace(/\/$/, "");
  const path = pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`;
  return `${base}${path}`;
};

export const getDefaultOgImageUrl = () => toAbsoluteUrl("/icon.png");

export const getOrganizationJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "高専ジョブ",
  url: "https://www.kosen-job.com/",
  logo: "https://www.kosen-job.com/icon.png",
});
