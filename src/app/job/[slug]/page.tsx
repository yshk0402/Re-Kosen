import { notFound } from "next/navigation";
import ArticleCard from "@/components/ui/ArticleCard";
import ArticleGridWithMore from "@/components/ui/ArticleGridWithMore";
import Pagination from "@/components/ui/Pagination";
import TagFilter from "@/components/ui/TagFilter";
import {
  buildTagOptions,
  getArticles,
  getEntityAttributes,
  getTagBySlug,
  getTags,
  mapArticleCard,
} from "@/lib/strapi";
import { jobMeta } from "../data";

type JobTagPageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
};

export default async function JobTagPage({
  params,
  searchParams,
}: JobTagPageProps) {
  const resolvedParams = await Promise.resolve(params);
  const resolvedSearchParams = await Promise.resolve(searchParams);
  const tag = await getTagBySlug(resolvedParams.slug);
  const tagAttributes = getEntityAttributes(tag);

  if (!tagAttributes || tagAttributes.slug === "all") {
    notFound();
  }

  const page = Number(resolvedSearchParams.page ?? "1");
  const response = await getArticles({
    category: "job",
    tagSlug: resolvedParams.slug,
    page: Number.isNaN(page) ? 1 : page,
    pageSize: 15,
  });
  const tags = await getTags();
  const tagOptions = buildTagOptions(tags, "すべて");
  const articles = response?.data ?? [];
  const pagination = response?.meta.pagination;

  return (
    <div className="mx-auto w-full max-w-[960px] space-y-8 px-4 py-10">
      <header className="space-y-3">
        <h1 className="font-display text-3xl font-semibold text-brand sm:text-4xl">
          {jobMeta.title} / {tagAttributes.name}
        </h1>
        <p className="text-sm text-muted sm:text-base">
          「{tagAttributes.name}」に関連する記事をまとめています。
        </p>
        <TagFilter
          label="タグで絞り込み"
          options={tagOptions}
          defaultValue={tagAttributes.slug}
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
          該当の記事は準備中です。
        </div>
      )}

      <Pagination
        basePath={`${jobMeta.basePath}/${tagAttributes.slug}`}
        currentPage={pagination?.page ?? 1}
        totalPages={pagination?.pageCount ?? 1}
      />
    </div>
  );
}
