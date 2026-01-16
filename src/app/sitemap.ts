import type { MetadataRoute } from "next";
import { getArticleSlugs, getTags, getEntityAttributes } from "@/lib/strapi";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://re-kosen.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const now = new Date();

    // 固定ページ
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: SITE_URL,
            lastModified: now,
            changeFrequency: "daily",
            priority: 1.0,
        },
        {
            url: `${SITE_URL}/industry`,
            lastModified: now,
            changeFrequency: "daily",
            priority: 0.9,
        },
        {
            url: `${SITE_URL}/company`,
            lastModified: now,
            changeFrequency: "daily",
            priority: 0.9,
        },
        {
            url: `${SITE_URL}/career`,
            lastModified: now,
            changeFrequency: "daily",
            priority: 0.9,
        },
        {
            url: `${SITE_URL}/about`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.5,
        },
        {
            url: `${SITE_URL}/contact`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.5,
        },
        {
            url: `${SITE_URL}/privacy`,
            lastModified: now,
            changeFrequency: "yearly",
            priority: 0.3,
        },
    ];

    // 記事ページ
    const articleSlugs = await getArticleSlugs();
    const articlePages: MetadataRoute.Sitemap = articleSlugs.map((slug) => ({
        url: `${SITE_URL}/articles/${slug}`,
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: 0.8,
    }));

    // タグページ
    const tags = await getTags();
    const tagPages: MetadataRoute.Sitemap = tags.map((tag) => {
        const attrs = getEntityAttributes(tag);
        return {
            url: `${SITE_URL}/tag/${attrs?.slug ?? ""}`,
            lastModified: now,
            changeFrequency: "weekly" as const,
            priority: 0.6,
        };
    });

    return [...staticPages, ...articlePages, ...tagPages];
}
