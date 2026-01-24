import ArticleCard from "@/components/ui/ArticleCard";
import ArticleGridWithMore from "@/components/ui/ArticleGridWithMore";
import Pagination from "@/components/ui/Pagination";
import TagFilter from "@/components/ui/TagFilter";
import { buildTagOptions, getArticles, getTags, mapArticleCard } from "@/lib/strapi";
import { careerMeta } from "./data";

type CareerPageProps = {
  searchParams: Promise<{ page?: string }>;
};

export default async function CareerPage({ searchParams }: CareerPageProps) {
  const resolvedSearchParams = await Promise.resolve(searchParams);
  const page = Number(resolvedSearchParams.page ?? "1");
  const response = await getArticles({
    category: "career",
    page: Number.isNaN(page) ? 1 : page,
    pageSize: 15,
  });
  const tags = await getTags();
  const tagOptions = buildTagOptions(tags, "すべて");
  const articles = response?.data ?? [];
  const pagination = response?.meta.pagination;

  return (
    <div className="mx-auto w-full max-w-[1200px] space-y-8 px-4 py-10">
      <header className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand">
          {careerMeta.eyebrow}
        </p>
        <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
          {careerMeta.title}
        </h1>
        <p className="text-sm text-muted sm:text-base">
          {careerMeta.description}
        </p>
        <TagFilter
          label="タグで絞り込み"
          options={tagOptions}
          basePath={careerMeta.basePath}
        />
      </header>

      {articles.length ? (
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
              />
            );
          })}
        </ArticleGridWithMore>
      ) : (
        <div className="rounded-xl border border-border bg-white p-6 text-sm text-muted">
          記事は準備中です。
        </div>
      )}

      <Pagination
        basePath={careerMeta.basePath}
        currentPage={pagination?.page ?? 1}
        totalPages={pagination?.pageCount ?? 1}
      />
    </div>
  );
}
