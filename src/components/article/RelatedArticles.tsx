import ArticleCard from "@/components/ui/ArticleCard";

type RelatedArticle = {
  slug: string;
  title: string;
  excerpt: string;
  tags: string[];
  date: string;
  coverImage?: string;
};

type RelatedArticlesProps = {
  items: RelatedArticle[];
};

export default function RelatedArticles({ items }: RelatedArticlesProps) {
  return (
    <section className="space-y-4">
      <div className="flex items-end justify-between">
        <h3 className="font-display text-xl font-semibold text-ink">
          関連記事
        </h3>
        <span className="text-xs text-muted">最大6件</span>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {items.slice(0, 6).map((article) => (
          <ArticleCard
            key={article.slug}
            coverImage={article.coverImage}
            date={article.date}
            excerpt={article.excerpt}
            href={`/articles/${article.slug}`}
            tags={article.tags}
            title={article.title}
            variant="compact"
          />
        ))}
      </div>
    </section>
  );
}
