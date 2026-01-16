import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CTA from "@/components/article/CTA";
import ArticleImage from "@/components/article/ArticleImage";
import Callout from "@/components/article/Callout";
import ComparisonTable from "@/components/article/ComparisonTable";
import LinkCards from "@/components/article/LinkCards";
import ProsCons from "@/components/article/ProsCons";
import RelatedArticles from "@/components/article/RelatedArticles";
import RichText from "@/components/article/RichText";
import SummaryCard from "@/components/article/SummaryCard";
import TOC from "@/components/article/TOC";
import {
  type ArticleBlock,
  type ArticleCardData,
  type ArticleCategory,
  type ComparisonTableBlock,
  type HeadingBlock,
  type LinkCardsBlock,
  type StrapiArticle,
  formatDate,
  getArticleBySlug,
  getArticleSlugs,
  getArticles,
  mapArticleCard,
  resolveMediaUrl,
  scoreRelatedArticles,
} from "@/lib/strapi";

type ArticlePageProps = {
  params: { slug: string };
};

const headingStyles: Record<2 | 3 | 4, string> = {
  2: "border-b border-border/80 pb-3 font-display text-2xl font-semibold text-ink sm:text-3xl",
  3: "font-display text-xl font-semibold text-ink",
  4: "text-lg font-semibold text-ink",
};

const categoryLabels: Record<ArticleCategory, string> = {
  industry: "業界研究",
  company: "企業研究",
  career: "キャリア設計",
};

const isHeadingBlock = (block: ArticleBlock): block is HeadingBlock =>
  block.__component === "article.heading";

const createAnchorId = (text: string, fallback: string) => {
  const slug = text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

  return slug || fallback;
};

const resolveComparisonRows = (block: ComparisonTableBlock) =>
  block.rows.map((row) => (Array.isArray(row) ? row : row.cells));

const resolveLinkItems = (block: LinkCardsBlock) =>
  block.items
    .map((item) => {
      const internalSlug = item.internalArticle?.data?.attributes.slug;
      const href =
        item.linkType === "internal" && internalSlug
          ? `/articles/${internalSlug}`
          : item.url ?? "";

      if (!href) {
        return null;
      }

      const isExternal =
        item.linkType === "external" || /^https?:\/\//i.test(href);

      return {
        title: item.title,
        description: item.description ?? undefined,
        href,
        isExternal,
      };
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);

const buildRelatedArticles = async (
  article: StrapiArticle,
): Promise<ArticleCardData[]> => {
  const manual = article.attributes.manualRelatedArticles?.data ?? [];
  const manualCards = manual.map(mapArticleCard);
  const manualSlugs = new Set(manualCards.map((item) => item.slug));

  const response = await getArticles({ page: 1, pageSize: 50 });
  const candidates = (response?.data ?? []).filter(
    (item) =>
      item.attributes.slug !== article.attributes.slug &&
      !manualSlugs.has(item.attributes.slug),
  );

  const scored = scoreRelatedArticles(article, candidates).map(mapArticleCard);
  const merged = [...manualCards, ...scored].slice(0, 6);

  return merged;
};

export async function generateStaticParams() {
  const slugs = await getArticleSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const article = await getArticleBySlug(params.slug);

  if (!article) {
    return {
      title: "記事が見つかりません",
    };
  }

  const { attributes } = article;
  const seo = attributes.seo;
  const title = seo?.metaTitle ?? attributes.title;
  const description = seo?.metaDescription ?? attributes.excerpt;
  const ogImage = resolveMediaUrl(seo?.ogImage ?? attributes.coverImage);

  return {
    title,
    description,
    alternates: seo?.canonical ? { canonical: seo.canonical } : undefined,
    robots: seo?.noindex ? { index: false, follow: false } : undefined,
    openGraph: {
      title,
      description,
      type: "article",
      images: ogImage ? [{ url: ogImage }] : undefined,
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const article = await getArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }

  const { attributes } = article;
  const blocks = attributes.blocks ?? [];
  const summaryBlock = blocks.find(
    (block) => block.__component === "article.summary-card",
  );
  const contentBlocks = blocks.filter(
    (block) => block.__component !== "article.summary-card",
  );

  const headingBlocks = contentBlocks.filter(isHeadingBlock);
  const headingAnchors = headingBlocks.map((block, index) =>
    block.anchor ?? createAnchorId(block.text, `section-${index + 1}`),
  );
  const tocItems = headingBlocks
    .map((block, index) => ({
      id: headingAnchors[index],
      text: block.text,
      level: block.level,
    }))
    .filter((item) => item.level === 2 || item.level === 3);

  const coverImageUrl = resolveMediaUrl(attributes.coverImage ?? undefined);
  const coverAlt =
    attributes.coverImage?.data?.attributes.alternativeText ??
    attributes.title;

  const relatedArticles = await buildRelatedArticles(article);
  const authorName = attributes.author?.data?.attributes.name;
  const categoryLabel = categoryLabels[attributes.category] ??
    attributes.category;

  let headingIndex = 0;

  return (
    <article className="mx-auto w-full max-w-[900px] space-y-8 px-4 py-10">
      <header className="space-y-4">
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand">
            {categoryLabel}
          </p>
          <h1 className="font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
            {attributes.title}
          </h1>
          <p className="text-sm text-muted sm:text-base">
            {attributes.excerpt}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-xs text-muted">
          <span>更新日 {formatDate(attributes.updatedAt)}</span>
          {authorName ? <span>著者 {authorName}</span> : null}
        </div>
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-border bg-gradient-to-br from-brand/15 via-white to-brand-soft/60">
          {coverImageUrl ? (
            <Image
              alt={coverAlt}
              fill
              sizes="(max-width: 900px) 100vw, 900px"
              src={coverImageUrl}
              className="object-cover"
            />
          ) : null}
        </div>
      </header>

      {summaryBlock && summaryBlock.__component === "article.summary-card" ? (
        <SummaryCard
          bullets={summaryBlock.bullets}
          title={summaryBlock.title ?? undefined}
        />
      ) : null}

      {tocItems.length ? <TOC items={tocItems} /> : null}

      <section className="space-y-6">
        {contentBlocks.map((block, index) => {
          if (block.__component === "article.heading") {
            const anchor =
              headingAnchors[headingIndex] ??
              `section-${headingIndex + 1}`;
            const HeadingTag =
              block.level === 2 ? "h2" : block.level === 3 ? "h3" : "h4";

            headingIndex += 1;

            return (
              <HeadingTag
                key={`${block.__component}-${anchor}`}
                id={anchor}
                className={`${headingStyles[block.level]} scroll-mt-24`}
              >
                {block.text}
              </HeadingTag>
            );
          }

          if (block.__component === "article.rich-text") {
            return (
              <RichText
                key={`${block.__component}-${index}`}
                content={block.body}
              />
            );
          }

          if (block.__component === "article.comparison-table") {
            return (
              <div key={`${block.__component}-${index}`} className="pt-2">
                <ComparisonTable
                  caption={block.caption ?? undefined}
                  columns={block.columns}
                  rows={resolveComparisonRows(block)}
                />
              </div>
            );
          }

          if (block.__component === "article.callout") {
            return (
              <Callout
                key={`${block.__component}-${index}`}
                body={block.body}
                title={block.title ?? undefined}
                variant={block.type}
              />
            );
          }

          if (block.__component === "article.pros-cons") {
            return (
              <ProsCons
                key={`${block.__component}-${index}`}
                cons={block.cons}
                pros={block.pros}
              />
            );
          }

          if (block.__component === "article.link-cards") {
            const items = resolveLinkItems(block);

            if (!items.length) {
              return null;
            }

            return (
              <LinkCards key={`${block.__component}-${index}`} items={items} />
            );
          }

          if (block.__component === "article.cta") {
            return (
              <CTA
                key={`${block.__component}-${index}`}
                buttonText={block.buttonText}
                buttonUrl={block.buttonUrl}
                description={block.description}
                title={block.title}
                variant={block.variant ?? undefined}
              />
            );
          }

          if (block.__component === "article.image") {
            const image = block.image?.data?.attributes;
            const src = resolveMediaUrl(block.image);

            return (
              <ArticleImage
                key={`${block.__component}-${index}`}
                alt={block.alt || attributes.title}
                caption={block.caption ?? undefined}
                height={image?.height ?? undefined}
                src={src}
                width={image?.width ?? undefined}
              />
            );
          }

          return null;
        })}
      </section>

      {relatedArticles.length ? <RelatedArticles items={relatedArticles} /> : null}
    </article>
  );
}
