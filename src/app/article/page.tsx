import type { Metadata } from "next";
import ArticleCard from "@/components/ui/ArticleCard";
import Pagination from "@/components/ui/Pagination";
import TagMultiFilter from "@/components/ui/TagMultiFilter";
import { getArticles, getEntityAttributes, getTags, mapArticleCard } from "@/lib/strapi";
import { articleMeta } from "./data";

export const metadata: Metadata = {
  title: articleMeta.title,
  description: articleMeta.description,
  alternates: {
    canonical: articleMeta.basePath,
  },
  openGraph: {
    title: articleMeta.title,
    description: articleMeta.description,
    type: "website",
    url: articleMeta.basePath,
  },
};

type ArticleIndexPageProps = {
  searchParams: Promise<{ page?: string; tag?: string }>;
};

const categoryLabels: Record<string, string> = {
  industry: "業界研究",
  company: "企業研究",
  job: "職種研究",
  career: "キャリア設計",
};

export default async function ArticleIndexPage({
  searchParams,
}: ArticleIndexPageProps) {
  const resolvedSearchParams = await Promise.resolve(searchParams);
  const page = Number(resolvedSearchParams.page ?? "1");
  const rawTagParam = (resolvedSearchParams.tag ?? "").trim();
  const rawSelectedTags = rawTagParam
    ? rawTagParam.split(",").map((slug) => slug.trim()).filter(Boolean)
    : [];
  const tags = await getTags();
  const tagOptions = tags
    .map((tag) => {
      const attrs = getEntityAttributes(tag);
      return {
        value: attrs?.slug ?? "",
        label: attrs?.name ?? "",
      };
    })
    .filter((option) => option.value && option.label);
  const validTagSlugs = new Set(tagOptions.map((option) => option.value));
  const selectedTags = rawSelectedTags.filter((slug) => validTagSlugs.has(slug));
  const response = await getArticles({
    tagSlugs: selectedTags.length ? selectedTags : undefined,
    page: Number.isNaN(page) ? 1 : page,
    pageSize: 15,
  });
  const articles = response?.data ?? [];
  const pagination = response?.meta.pagination;
  const basePath = selectedTags.length
    ? `${articleMeta.basePath}?tag=${encodeURIComponent(selectedTags.join(","))}`
    : articleMeta.basePath;

  return (
    <div className="mx-auto w-full max-w-[1440px] space-y-8 px-4 py-10">
      <header className="space-y-3">
        <h1 className="font-display text-3xl font-semibold text-brand sm:text-4xl">
          {articleMeta.title}
        </h1>
        <p className="text-sm text-muted sm:text-base">
          {articleMeta.description}
        </p>
        <TagMultiFilter
          label="タグで絞り込み"
          options={tagOptions}
          selected={selectedTags}
        />
      </header>

      {articles.length ? (
        <div className="grid gap-5 lg:grid-cols-3">
          {articles.map((article) => {
            const card = mapArticleCard(article);
            return (
              <ArticleCard
                key={card.slug}
                category={
                  card.category ? categoryLabels[card.category] ?? card.category : undefined
                }
                coverImage={card.coverImage}
                date={card.date}
                excerpt={card.excerpt}
                href={`/articles/${card.slug}`}
                tags={card.tags}
                title={card.title}
              />
            );
          })}
        </div>
      ) : (
        <div className="rounded-xl border border-border bg-white p-6 text-sm text-muted">
          記事は準備中です。
        </div>
      )}

      <Pagination
        basePath={basePath}
        currentPage={pagination?.page ?? 1}
        totalPages={pagination?.pageCount ?? 1}
      />
    </div>
  );
}
