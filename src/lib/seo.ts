const DEFAULT_SITE_URL = "https://www.kosen-job.com";

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

export const getOrganizationJsonLd = () => {
  const siteUrl = getSiteUrl().replace(/\/$/, "");
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "高専ジョブ",
    url: siteUrl,
    logo: toAbsoluteUrl("/icon.png"),
  };
};
