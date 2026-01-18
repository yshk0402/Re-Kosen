import ArticleCard from "@/components/ui/ArticleCard";
import Pagination from "@/components/ui/Pagination";
import { getArticles, mapArticleCard } from "@/lib/strapi";
import { articleMeta } from "./data";

type ArticleIndexPageProps = {
  searchParams: Promise<{ page?: string }>;
};

const categoryLabels: Record<string, string> = {
  industry: "業界研究",
  company: "企業研究",
  career: "キャリア設計",
};

export default async function ArticleIndexPage({
  searchParams,
}: ArticleIndexPageProps) {
  const resolvedSearchParams = await Promise.resolve(searchParams);
  const page = Number(resolvedSearchParams.page ?? "1");
  const response = await getArticles({
    page: Number.isNaN(page) ? 1 : page,
    pageSize: 15,
  });
  const articles = response?.data ?? [];
  const pagination = response?.meta.pagination;

  return (
    <div className="mx-auto w-full max-w-[1200px] space-y-8 px-4 py-10">
      <header className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand">
          {articleMeta.eyebrow}
        </p>
        <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
          {articleMeta.title}
        </h1>
        <p className="text-sm text-muted sm:text-base">
          {articleMeta.description}
        </p>
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
        basePath={articleMeta.basePath}
        currentPage={pagination?.page ?? 1}
        totalPages={pagination?.pageCount ?? 1}
      />
    </div>
  );
}
