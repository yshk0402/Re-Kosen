import type { MetadataRoute } from "next";
import { getArticleSitemapEntries } from "@/lib/strapi";

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
            url: `${SITE_URL}/article`,
            lastModified: now,
            changeFrequency: "daily",
            priority: 0.9,
        },
        {
            url: `${SITE_URL}/job`,
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
        {
            url: `${SITE_URL}/1`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.7,
        },
    ];

    // 記事ページ
    const articleEntries = await getArticleSitemapEntries();
    const articlePages: MetadataRoute.Sitemap = articleEntries.map((entry) => ({
        url: `${SITE_URL}/articles/${entry.slug}`,
        lastModified: new Date(entry.updatedAt),
        changeFrequency: "weekly" as const,
        priority: 0.8,
    }));

    return [...staticPages, ...articlePages];
}
