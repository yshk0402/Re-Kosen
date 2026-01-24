import ArticleCard from "@/components/ui/ArticleCard";
import ArticleGridWithMore from "@/components/ui/ArticleGridWithMore";
import Pagination from "@/components/ui/Pagination";
import { getArticles, mapArticleCard } from "@/lib/strapi";

type SearchPageProps = {
  searchParams: Promise<{ q?: string; page?: string }>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const resolvedSearchParams = await Promise.resolve(searchParams);
  const query = (resolvedSearchParams.q ?? "").trim();
  const page = Number(resolvedSearchParams.page ?? "1");
  const response = query
    ? await getArticles({
        searchQuery: query,
        page: Number.isNaN(page) ? 1 : page,
        pageSize: 15,
      })
    : null;
  const articles = response?.data ?? [];
  const pagination = response?.meta.pagination;
  const basePath = `/search?q=${encodeURIComponent(query)}`;

  return (
    <div className="mx-auto w-full max-w-[1200px] space-y-8 px-4 py-10">
      <header className="space-y-3 rounded-xl border border-border bg-white p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand">
          Search
        </p>
        <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
          検索結果
        </h1>
        <p className="text-sm text-muted sm:text-base">
          キーワード: <span className="font-semibold text-ink">{query}</span>
        </p>
      </header>

      {!query ? (
        <div className="rounded-xl border border-border bg-white p-6 text-sm text-muted">
          キーワードを入力して検索してください。
        </div>
      ) : articles.length ? (
        <ArticleGridWithMore itemCount={articles.length}>
          {articles.map((article) => {
            const card = mapArticleCard(article);
            return (
              <ArticleCard
                key={card.slug}
                coverImage={card.coverImage}
                date={card.date}
                excerpt={card.excerpt}
                href={`/articles/${card.slug}`}
                tags={card.tags}
                title={card.title}
                variant="compact"
              />
            );
          })}
        </ArticleGridWithMore>
      ) : (
        <div className="rounded-xl border border-border bg-white p-6 text-sm text-muted">
          該当の記事は見つかりませんでした。
        </div>
      )}

      {query ? (
        <Pagination
          basePath={basePath}
          currentPage={pagination?.page ?? 1}
          totalPages={pagination?.pageCount ?? 1}
        />
      ) : null}
    </div>
  );
}
