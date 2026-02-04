import type { Metadata } from "next";
import ArticleCard from "@/components/ui/ArticleCard";
import ArticleGridWithMore from "@/components/ui/ArticleGridWithMore";
import Pagination from "@/components/ui/Pagination";
import { getDefaultOgImageUrl } from "@/lib/seo";
import { getArticles, mapArticleCard } from "@/lib/strapi";
import { companyMeta } from "./data";

const defaultOgImage = getDefaultOgImageUrl();

export async function generateMetadata({
  searchParams,
}: CompanyPageProps): Promise<Metadata> {
  const resolvedSearchParams = await Promise.resolve(searchParams);
  const page = Number(resolvedSearchParams.page ?? "1");
  const shouldNoIndex = Number.isFinite(page) && page > 1;

  return {
    title: companyMeta.title,
    description: companyMeta.description,
    alternates: {
      canonical: companyMeta.basePath,
    },
    robots: shouldNoIndex
      ? {
          index: false,
          follow: true,
        }
      : undefined,
    openGraph: {
      title: companyMeta.title,
      description: companyMeta.description,
      type: "website",
      url: companyMeta.basePath,
      images: [{ url: defaultOgImage }],
    },
    twitter: {
      card: "summary_large_image",
      images: [defaultOgImage],
    },
  };
}

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
  const articles = response?.data ?? [];
  const pagination = response?.meta.pagination;

  return (
    <div className="mx-auto w-full max-w-[1440px] space-y-8 px-4 py-10">
      <header className="space-y-3">
        <h1 className="font-display text-3xl font-semibold text-brand sm:text-4xl">
          {companyMeta.title}
        </h1>
        <p className="text-sm text-muted sm:text-base">
          {companyMeta.description}
        </p>
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
        basePath={companyMeta.basePath}
        currentPage={pagination?.page ?? 1}
        totalPages={pagination?.pageCount ?? 1}
      />
    </div>
  );
}
