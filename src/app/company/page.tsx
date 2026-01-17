import ArticleCard from "@/components/ui/ArticleCard";
import Pagination from "@/components/ui/Pagination";
import TagFilter from "@/components/ui/TagFilter";
import { buildTagOptions, getArticles, getTags, mapArticleCard } from "@/lib/strapi";
import { companyMeta } from "./data";

type CompanyPageProps = {
  searchParams: Promise<{ page?: string }>;
};

export default async function CompanyPage({ searchParams }: CompanyPageProps) {
  const resolvedSearchParams = await Promise.resolve(searchParams);
  const page = Number(resolvedSearchParams.page ?? "1");
  const response = await getArticles({
    category: "company",
    page: Number.isNaN(page) ? 1 : page,
    pageSize: 15,
  });
  const tags = await getTags();
  const tagOptions = buildTagOptions(tags, "すべて");
  const articles = response?.data ?? [];
  const pagination = response?.meta.pagination;

  return (
    <div className="mx-auto w-full max-w-[1100px] space-y-8 px-4 py-10">
      <header className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand">
          {companyMeta.eyebrow}
        </p>
        <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
          {companyMeta.title}
        </h1>
        <p className="text-sm text-muted sm:text-base">
          {companyMeta.description}
        </p>
        <TagFilter
          label="タグで絞り込み"
          options={tagOptions}
          basePath={companyMeta.basePath}
        />
      </header>

      {articles.length ? (
        <div className="grid gap-5 lg:grid-cols-3 [&>*:nth-child(n+6)]:hidden lg:[&>*:nth-child(n+6)]:grid lg:[&>*:nth-child(n+16)]:hidden">
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
        </div>
      ) : (
        <div className="rounded-xl border border-border bg-white p-6 text-sm text-muted">
          記事は準備中です。
        </div>
      )}

      <Pagination
        basePath={companyMeta.basePath}
        currentPage={pagination?.page ?? 1}
        totalPages={pagination?.pageCount ?? 1}
      />
    </div>
  );
}
