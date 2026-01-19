export type StrapiEntity<T> = {
  id: number;
  documentId?: string;
  attributes?: T;
} & Partial<T>;

export type StrapiCollectionResponse<T> = {
  data: T[];
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
};

export type StrapiSingleResponse<T> = {
  data: T | null;
};

export type StrapiImage = {
  url: string;
  alternativeText?: string | null;
  width?: number | null;
  height?: number | null;
};

export type StrapiMediaEntry = StrapiImage & {
  id?: number;
  documentId?: string;
  attributes?: StrapiImage;
};

export type StrapiMedia =
  | { data: StrapiMediaEntry | StrapiMediaEntry[] | null }
  | StrapiMediaEntry
  | StrapiMediaEntry[]
  | null;

export type StrapiTagAttributes = {
  name: string;
  slug: string;
  tagType?: string | null;
  priority?: number | null;
};

export type StrapiTag = StrapiEntity<StrapiTagAttributes>;

export type StrapiAuthorAttributes = {
  name: string;
  slug?: string;
  avatar?: StrapiMedia | StrapiImage | null;
};

export type StrapiAuthor = StrapiEntity<StrapiAuthorAttributes>;

export type HeadingBlock = {
  __component: "article.heading";
  level: 2 | 3 | 4 | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | string;
  text?: string;
  title?: string;
  anchor?: string | null;
};

export type RichTextBlock = {
  __component: "article.rich-text";
  body?: string | string[];
  content?: unknown;
};

export type SummaryCardBlock = {
  __component: "article.summary-card";
  title?: string | null;
  description?: string | null;
  bullets?: string[];
  image?: StrapiMedia | StrapiImage | null;
  link?: string | null;
};

export type CalloutBlock = {
  __component: "article.callout";
  type: "info" | "warn" | "tip" | "success" | "warning" | "danger" | string;
  title?: string | null;
  body?: string;
  content?: unknown;
};

export type ProsConsBlock = {
  __component: "article.pros-cons" | "article.pros-con";
  title?: string | null;
  pros?: Array<RichTextBlock | { content?: unknown } | string>;
  cons?: Array<RichTextBlock | { content?: unknown } | string>;
};

export type ComparisonTableBlock = {
  __component: "article.comparison-table";
  caption?: string | null;
  title?: string | null;
  columns?: string[];
  rows?: Array<{ cells: string[] } | string[]>;
  table_data?: unknown;
};

export type LinkCardItem = {
  title: string;
  description?: string | null;
  linkType?: "internal" | "external";
  url?: string | null;
  internalArticle?:
  | { data: StrapiEntity<StrapiArticleAttributes> | null }
  | StrapiEntity<StrapiArticleAttributes>
  | StrapiArticleAttributes
  | null;
  image?: StrapiMedia | StrapiImage | null;
};

export type LinkCardsBlock = {
  __component: "article.link-cards" | "article.link-card";
  items?: LinkCardItem[];
  cards?: LinkCardItem[];
};

export type CTABlock = {
  __component: "article.cta";
  title?: string | null;
  description?: string | null;
  buttonText?: string | null;
  buttonUrl?: string | null;
  link_text?: string | null;
  link_url?: string | null;
  variant?: "primary" | "outline" | null;
};

export type ImageBlock = {
  __component: "article.image";
  image: StrapiMedia | StrapiImage | null;
  alt?: string;
  alt_text?: string | null;
  caption?: string | null;
};

export type ArticleBlock =
  | HeadingBlock
  | RichTextBlock
  | SummaryCardBlock
  | CalloutBlock
  | ProsConsBlock
  | ComparisonTableBlock
  | LinkCardsBlock
  | CTABlock
  | ImageBlock;

export type ArticleCategory = "industry" | "company" | "career";

export type StrapiSeo = {
  metaTitle?: string | null;
  metaDescription?: string | null;
  ogImage?: StrapiMedia | null;
  canonical?: string | null;
  noindex?: boolean | null;
};

export type StrapiArticleAttributes = {
  title: string;
  slug: string;
  category: ArticleCategory | string;
  excerpt?: string | null;
  stats?: "draft" | "review" | "published" | "archived";
  updatedAt: string;
  publishedAt?: string | null;
  coverImage?: StrapiMedia | StrapiImage | null;
  author?: { data: StrapiAuthor | null } | StrapiAuthor | null;
  tags?: { data: StrapiTag[] } | StrapiTag[] | null;
  blocks?: ArticleBlock[] | null;
  manualRelatedArticles?:
  | { data: StrapiEntity<StrapiArticleAttributes>[] }
  | StrapiEntity<StrapiArticleAttributes>[]
  | null;
  featured?: boolean | null;
  seo?: StrapiSeo | null;
};

export type StrapiArticle = StrapiEntity<StrapiArticleAttributes>;

export type StrapiArticleLike = StrapiArticle | StrapiArticleAttributes;

export type HomeBanner = {
  id?: number;
  title?: string | null;
  linkUrl?: string | null;
  desktopImage?: StrapiMedia | StrapiImage | null;
  mobileImage?: StrapiMedia | StrapiImage | null;
};

export type HomeLineCta = {
  title?: string | null;
  description?: string | null;
  buttonLabel?: string | null;
  lineUrl?: string | null;
};

export type StrapiHomeAttributes = {
  pickupMediums?: { data: StrapiArticle[] } | StrapiArticle[] | null;
  popularItems?: { data: StrapiArticle[] } | StrapiArticle[] | null;
  featuredItems?: { data: StrapiArticle[] } | StrapiArticle[] | null;
  banners?: HomeBanner[] | HomeBanner | null;
  lineCta?: HomeLineCta | null;
};

export type StrapiHome = StrapiEntity<StrapiHomeAttributes>;

const RAW_STRAPI_URL =
  process.env.STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_URL || "";
const STRAPI_URL = RAW_STRAPI_URL.replace(/\/api\/?$/, "");
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN || "";
const STRAPI_REVALIDATE_SECONDS = Number(
  process.env.STRAPI_REVALIDATE_SECONDS || "300",
);

export const isStrapiConfigured = () => Boolean(STRAPI_URL);

const ARTICLE_POPULATE_PARAMS: Record<string, string> = {
  "populate[coverImage]": "*",
  "populate[author]": "*",
  "populate[tags]": "*",
  "populate[seo]": "*",
  "populate[seo][populate]": "*",
  "populate[blocks]": "*",
  "populate[blocks][populate]": "*",
  "populate[manualRelatedArticles]": "*",
  "populate[manualRelatedArticles][populate]": "*",
};

const ARTICLE_POPULATE_FALLBACK: Record<string, string> = {
  populate: "*",
};

const HOME_POPULATE_PARAMS: Record<string, string> = {
  "populate[pickupMediums][populate][coverImage]": "*",
  "populate[popularItems][populate][coverImage]": "*",
  "populate[featuredItems][populate][coverImage]": "*",
  "populate[banners]": "*",
  "populate[banners][populate]": "*",
  "populate[lineCta]": "*",
};

export const getEntityAttributes = <T>(
  entity: StrapiEntity<T> | T | null | undefined,
): T | null => {
  if (!entity) {
    return null;
  }
  if (typeof entity === "object" && "attributes" in entity) {
    const attributes = (entity as StrapiEntity<T>).attributes;
    return attributes ?? (entity as unknown as T);
  }
  return entity as T;
};

const normalizeRelation = <T>(value: unknown): Array<StrapiEntity<T> | T> => {
  if (!value) {
    return [];
  }
  if (Array.isArray(value)) {
    return value as Array<StrapiEntity<T> | T>;
  }
  if (typeof value === "object" && "data" in (value as object)) {
    const data = (value as { data?: unknown }).data;
    if (!data) {
      return [];
    }
    return Array.isArray(data)
      ? (data as Array<StrapiEntity<T> | T>)
      : [data as StrapiEntity<T> | T];
  }
  return [value as StrapiEntity<T> | T];
};

export const getRelationAttributes = <T>(value: unknown): T[] =>
  normalizeRelation<T>(value)
    .map((item) => getEntityAttributes<T>(item))
    .filter((item): item is T => Boolean(item));

export const getSingleRelationAttributes = <T>(value: unknown): T | null =>
  getRelationAttributes<T>(value)[0] ?? null;

export const resolveMediaAttributes = (
  media?: StrapiMedia | StrapiImage | null,
): StrapiImage | null => {
  if (!media) {
    return null;
  }
  if (Array.isArray(media)) {
    return resolveMediaAttributes(media[0] ?? null);
  }
  if (typeof media === "object" && "data" in media) {
    const data = media.data;
    if (Array.isArray(data)) {
      return resolveMediaAttributes(data[0] ?? null);
    }
    if (data && typeof data === "object" && "attributes" in data) {
      return (data as StrapiMediaEntry).attributes ?? null;
    }
    return (data as StrapiMediaEntry) ?? null;
  }
  if (typeof media === "object" && "attributes" in media) {
    return (media as StrapiMediaEntry).attributes ?? null;
  }
  if (typeof media === "object" && "url" in media) {
    return media as StrapiImage;
  }
  return null;
};

export const resolveMediaUrl = (
  media?: StrapiMedia | StrapiImage | null,
): string | undefined => {
  const image = resolveMediaAttributes(media);
  const url = image?.url;
  if (!url) {
    return undefined;
  }
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }
  if (!STRAPI_URL) {
    return undefined;
  }
  return new URL(url, STRAPI_URL).toString();
};

const buildQuery = (params?: Record<string, string | number | undefined>) => {
  const search = new URLSearchParams();

  if (!params) {
    return "";
  }

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === "") {
      return;
    }
    search.set(key, String(value));
  });

  const queryString = search.toString();
  return queryString ? `?${queryString}` : "";
};

type StrapiFetchOptions = {
  preview?: boolean;
};

const getFetchOptions = (options?: StrapiFetchOptions) => {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (STRAPI_TOKEN) {
    headers.Authorization = `Bearer ${STRAPI_TOKEN}`;
  }

  if (options?.preview) {
    return {
      headers,
      cache: "no-store" as const,
    };
  }

  return {
    headers,
    next: {
      revalidate: Number.isFinite(STRAPI_REVALIDATE_SECONDS)
        ? STRAPI_REVALIDATE_SECONDS
        : 300,
    },
  };
};

export const strapiFetch = async <T>(
  path: string,
  params?: Record<string, string | number | undefined>,
  options?: StrapiFetchOptions,
): Promise<T | null> => {
  if (!STRAPI_URL) {
    return null;
  }

  const url = `${STRAPI_URL.replace(/\/$/, "")}${path}${buildQuery(params)}`;
  let response: Response;
  try {
    response = await fetch(url, getFetchOptions(options));
  } catch {
    return null;
  }

  if (!response.ok) {
    return null;
  }

  return (await response.json()) as T;
};

export type ArticleCardData = {
  slug: string;
  title: string;
  excerpt: string;
  tags: string[];
  date: string;
  coverImage?: string;
  category?: string;
};

export const formatDate = (date: string) => {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) {
    return date;
  }
  return parsed.toISOString().slice(0, 10);
};

export const mapArticleCard = (article: StrapiArticleLike): ArticleCardData => {
  const attributes = getEntityAttributes(article);
  const tags = getRelationAttributes<StrapiTagAttributes>(attributes?.tags).map(
    (tag) => tag.name,
  );
  return {
    slug: attributes?.slug ?? "",
    title: attributes?.title ?? "",
    excerpt: attributes?.excerpt ?? "",
    tags,
    date: formatDate(attributes?.updatedAt ?? ""),
    coverImage: resolveMediaUrl(attributes?.coverImage ?? undefined),
    category: attributes?.category,
  };
};

export const getArticleSlugs = async () => {
  const response = await strapiFetch<StrapiCollectionResponse<StrapiArticle>>(
    "/api/articles",
    {
      "fields[0]": "slug",
      "filters[stats][$eq]": "published",
      "pagination[pageSize]": 200,
    },
  );

  if (!response) {
    return [];
  }

  return response.data
    .map((item) => getEntityAttributes<StrapiArticleAttributes>(item)?.slug)
    .filter((slug): slug is string => Boolean(slug));
};

export const getArticleBySlug = async (
  slug: string,
  options?: { preview?: boolean },
) => {
  const preview = Boolean(options?.preview);
  const params: Record<string, string> = {
    "filters[slug][$eq]": slug,
    ...ARTICLE_POPULATE_PARAMS,
  };
  if (!preview) {
    params["filters[stats][$eq]"] = "published";
  }

  const response = await strapiFetch<StrapiCollectionResponse<StrapiArticle>>(
    "/api/articles",
    params,
    preview ? { preview: true } : undefined,
  );

  if (response) {
    return response?.data?.[0] ?? null;
  }

  const fallbackParams: Record<string, string> = {
    "filters[slug][$eq]": slug,
    ...ARTICLE_POPULATE_FALLBACK,
  };
  if (!preview) {
    fallbackParams["filters[stats][$eq]"] = "published";
  }

  const fallback = await strapiFetch<StrapiCollectionResponse<StrapiArticle>>(
    "/api/articles",
    fallbackParams,
    preview ? { preview: true } : undefined,
  );

  return fallback?.data?.[0] ?? null;
};

export type ArticleQuery = {
  category?: ArticleCategory;
  tagSlug?: string;
  searchQuery?: string;
  page?: number;
  pageSize?: number;
};

export const getArticles = async ({
  category,
  tagSlug,
  searchQuery,
  page = 1,
  pageSize = 15,
}: ArticleQuery) => {
  const params: Record<string, string | number | undefined> = {
    "filters[stats][$eq]": "published",
    ...ARTICLE_POPULATE_PARAMS,
    "pagination[page]": page,
    "pagination[pageSize]": pageSize,
    "sort[0]": "updatedAt:desc",
  };

  if (category) {
    params["filters[category][$eq]"] = category;
  }

  if (tagSlug) {
    params["filters[tags][slug][$eq]"] = tagSlug;
  }

  if (searchQuery) {
    params["filters[$or][0][title][$containsi]"] = searchQuery;
    params["filters[$or][1][excerpt][$containsi]"] = searchQuery;
    // TODO: add blocks search once Strapi supports indexing dynamic zone text
  }

  const response = await strapiFetch<StrapiCollectionResponse<StrapiArticle>>(
    "/api/articles",
    params,
  );

  if (response) {
    return response;
  }

  const fallbackParams: Record<string, string | number | undefined> = {
    "filters[stats][$eq]": "published",
    ...ARTICLE_POPULATE_FALLBACK,
    "pagination[page]": page,
    "pagination[pageSize]": pageSize,
    "sort[0]": "updatedAt:desc",
  };

  if (category) {
    fallbackParams["filters[category][$eq]"] = category;
  }

  if (tagSlug) {
    fallbackParams["filters[tags][slug][$eq]"] = tagSlug;
  }

  if (searchQuery) {
    fallbackParams["filters[$or][0][title][$containsi]"] = searchQuery;
    fallbackParams["filters[$or][1][excerpt][$containsi]"] = searchQuery;
  }

  return strapiFetch<StrapiCollectionResponse<StrapiArticle>>(
    "/api/articles",
    fallbackParams,
  );
};

export const getArticlesBySlugs = async (
  slugs: string[],
  options?: { includeUnpublished?: boolean },
) => {
  const uniqueSlugs = Array.from(
    new Set(slugs.map((slug) => slug.trim()).filter(Boolean)),
  );
  if (!uniqueSlugs.length) {
    return [];
  }

  const params: Record<string, string | number | undefined> = {
    ...ARTICLE_POPULATE_PARAMS,
    "pagination[pageSize]": uniqueSlugs.length,
  };

  if (!options?.includeUnpublished) {
    params["filters[stats][$eq]"] = "published";
  }

  uniqueSlugs.forEach((slug, index) => {
    params[`filters[$or][${index}][slug][$eq]`] = slug;
  });

  const response = await strapiFetch<StrapiCollectionResponse<StrapiArticle>>(
    "/api/articles",
    params,
  );

  return response?.data ?? [];
};

export const getHome = async () => {
  const response = await strapiFetch<StrapiSingleResponse<StrapiHome>>(
    "/api/home",
    HOME_POPULATE_PARAMS,
  );

  if (response) {
    return response.data ?? null;
  }

  const fallback = await strapiFetch<StrapiSingleResponse<StrapiHome>>(
    "/api/home",
    { populate: "*" },
  );

  return fallback?.data ?? null;
};

export const getTags = async () => {
  const response = await strapiFetch<StrapiCollectionResponse<StrapiTag>>(
    "/api/tags",
    {
      "pagination[pageSize]": 200,
      "sort[0]": "priority:asc",
    },
  );

  return response?.data ?? [];
};

export type TagOption = {
  value: string;
  label: string;
};

export const buildTagOptions = (
  tags: StrapiTag[],
  allLabel: string,
): TagOption[] => [
    { value: "all", label: allLabel },
    ...tags.map((tag) => ({
      value: getEntityAttributes(tag)?.slug ?? "",
      label: getEntityAttributes(tag)?.name ?? "",
    })),
  ];

export const getTagBySlug = async (slug: string) => {
  const response = await strapiFetch<StrapiCollectionResponse<StrapiTag>>(
    "/api/tags",
    {
      "filters[slug][$eq]": slug,
      "pagination[pageSize]": 1,
    },
  );

  return response?.data?.[0] ?? null;
};

export const scoreRelatedArticles = (
  current: StrapiArticleLike,
  candidates: StrapiArticleLike[],
) => {
  const currentAttributes = getEntityAttributes(current);
  const currentTags = new Set(
    getRelationAttributes<StrapiTagAttributes>(currentAttributes?.tags).map(
      (tag) => tag.slug,
    ),
  );

  const now = Date.now();
  const thirtyDaysMs = 1000 * 60 * 60 * 24 * 30;

  return candidates
    .map((article) => {
      const attributes = getEntityAttributes(article);
      let score = 0;
      if (attributes?.category === currentAttributes?.category) {
        score += 3;
      }

      const matchingTags = getRelationAttributes<StrapiTagAttributes>(
        attributes?.tags,
      ).filter((tag) => currentTags.has(tag.slug));
      score += Math.min(matchingTags.length, 3) * 2;

      if (attributes?.featured) {
        score += 1;
      }

      const updatedAt = new Date(attributes?.updatedAt ?? 0).getTime();
      if (Number.isFinite(updatedAt) && now - updatedAt <= thirtyDaysMs) {
        score += 1;
      }

      return {
        article,
        score,
        updatedAt,
      };
    })
    .sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      return b.updatedAt - a.updatedAt;
    })
    .map((item) => item.article);
};
