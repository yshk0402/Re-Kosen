import ArticleCard from "@/components/ui/ArticleCard";
import ArticleGridWithMore from "@/components/ui/ArticleGridWithMore";
import Pagination from "@/components/ui/Pagination";
import TagFilter from "@/components/ui/TagFilter";
import { buildTagOptions, getArticles, getTags, mapArticleCard } from "@/lib/strapi";
import { jobMeta } from "./data";

type JobPageProps = {
  searchParams: Promise<{ page?: string }>;
};

export default async function JobPage({ searchParams }: JobPageProps) {
  const resolvedSearchParams = await Promise.resolve(searchParams);
  const page = Number(resolvedSearchParams.page ?? "1");
  const response = await getArticles({
    category: "job",
    page: Number.isNaN(page) ? 1 : page,
    pageSize: 15,
  });
  const tags = await getTags();
  const tagOptions = buildTagOptions(tags, "すべて");
  const articles = response?.data ?? [];
  const pagination = response?.meta.pagination;

  return (
    <div className="mx-auto w-full max-w-[1440px] space-y-8 px-4 py-10">
      <header className="space-y-3">
        <h1 className="font-display text-3xl font-semibold text-brand sm:text-4xl">
          {jobMeta.title}
        </h1>
        <p className="text-sm text-muted sm:text-base">
          {jobMeta.description}
        </p>
        <TagFilter
          label="タグで絞り込み"
          options={tagOptions}
          basePath={jobMeta.basePath}
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
                variant="compact"
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
        basePath={jobMeta.basePath}
        currentPage={pagination?.page ?? 1}
        totalPages={pagination?.pageCount ?? 1}
      />
    </div>
  );
}
