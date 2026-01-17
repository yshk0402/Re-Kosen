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
import TOC, { type TocItem } from "@/components/article/TOC";
import {
  type ArticleBlock,
  type ArticleCardData,
  type ArticleCategory,
  type ComparisonTableBlock,
  type HeadingBlock,
  type LinkCardsBlock,
  type StrapiAuthorAttributes,
  type StrapiArticleAttributes,
  type StrapiArticle,
  type ProsConsBlock,
  type RichTextBlock,
  formatDate,
  getEntityAttributes,
  getArticleBySlug,
  getArticleSlugs,
  getArticles,
  getRelationAttributes,
  getSingleRelationAttributes,
  mapArticleCard,
  resolveMediaAttributes,
  resolveMediaUrl,
  scoreRelatedArticles,
} from "@/lib/strapi";
import { strapiBlocksToHtml, strapiBlocksToPlainText } from "@/lib/strapiBlocks";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
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
  (block.rows ?? []).map((row) => (Array.isArray(row) ? row : row.cells));

const isRecord = (value: unknown): value is Record<string, unknown> =>
  Boolean(value) && typeof value === "object" && !Array.isArray(value);

const parseComparisonTableData = (
  value: unknown,
): { columns: string[]; rows: string[][] } | null => {
  if (!value) {
    return null;
  }

  if (Array.isArray(value)) {
    const rows = value.filter((row): row is unknown[] => Array.isArray(row));
    if (!rows.length) {
      return null;
    }
    const columns = rows[0]?.filter((cell): cell is string => typeof cell === "string") ?? [];
    const body = rows
      .slice(1)
      .map((row) => row.filter((cell): cell is string => typeof cell === "string"));
    return columns.length ? { columns, rows: body } : null;
  }

  if (!isRecord(value)) {
    return null;
  }

  const columnsRaw = value.columns ?? value.headers ?? value.header ?? null;
  const rowsRaw = value.rows ?? value.body ?? value.data ?? null;

  const columns = Array.isArray(columnsRaw)
    ? columnsRaw.filter((cell): cell is string => typeof cell === "string")
    : [];

  const rows = Array.isArray(rowsRaw)
    ? rowsRaw
        .map((row) => {
          if (Array.isArray(row)) {
            return row.filter((cell): cell is string => typeof cell === "string");
          }
          if (isRecord(row) && Array.isArray(row.cells)) {
            return row.cells.filter((cell): cell is string => typeof cell === "string");
          }
          return [];
        })
        .filter((row) => row.length > 0)
    : [];

  return columns.length ? { columns, rows } : null;
};

const resolveComparisonTableProps = (block: ComparisonTableBlock) => {
  const columns = block.columns ?? [];
  const rows = resolveComparisonRows(block);

  if (columns.length) {
    return {
      caption: block.caption ?? block.title ?? undefined,
      columns,
      rows,
    };
  }

  const parsed = parseComparisonTableData(block.table_data);
  if (!parsed) {
    return null;
  }
  return {
    caption: block.title ?? undefined,
    columns: parsed.columns,
    rows: parsed.rows,
  };
};

const resolveLinkItems = (block: LinkCardsBlock) =>
  (block.items ?? block.cards ?? [])
    .map((item) => {
      const internalArticle = getSingleRelationAttributes<StrapiArticleAttributes>(
        item.internalArticle,
      );
      const internalSlug = internalArticle?.slug;
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

const normalizeProsConsItems = (
  items: ProsConsBlock["pros"] | ProsConsBlock["cons"],
) =>
  (items ?? [])
    .map((item) => {
      if (typeof item === "string") {
        return item;
      }
      if (item && typeof item === "object") {
        const richText = item as RichTextBlock;
        const body = richText.body ?? richText.content;
        if (Array.isArray(body) && body.every((value) => typeof value === "string")) {
          return body.join(" ");
        }
        if (typeof body === "string") {
          return body;
        }
        return strapiBlocksToPlainText(body);
      }
      return "";
    })
    .map((item) => item.trim())
    .filter((item) => item.length > 0);

const resolveRichTextContent = (block: RichTextBlock): string | string[] => {
  const body = block.body ?? block.content;
  if (Array.isArray(body) && body.every((value) => typeof value === "string")) {
    return body;
  }
  if (typeof body === "string") {
    return body;
  }
  return strapiBlocksToHtml(body);
};

const buildRelatedArticles = async (
  article: StrapiArticle,
): Promise<ArticleCardData[]> => {
  const articleAttributes = getEntityAttributes(article);
  const manual = getRelationAttributes<StrapiArticleAttributes>(
    articleAttributes?.manualRelatedArticles,
  );
  const manualCards = manual.map(mapArticleCard);
  const manualSlugs = new Set(manualCards.map((item) => item.slug));
  const currentSlug = articleAttributes?.slug ?? "";

  const response = await getArticles({ page: 1, pageSize: 50 });
  const candidates = (response?.data ?? []).filter(
    (item) => {
      const slug = getEntityAttributes(item)?.slug ?? "";
      return slug !== currentSlug && !manualSlugs.has(slug);
    },
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
  const resolvedParams = await Promise.resolve(params);
  const article = await getArticleBySlug(resolvedParams.slug);

  if (!article) {
    return {
      title: "記事が見つかりません",
    };
  }

  const attributes = getEntityAttributes(article);
  if (!attributes) {
    return {
      title: "記事が見つかりません",
    };
  }
  const seo = attributes.seo;
  const title = seo?.metaTitle ?? attributes.title;
  const description = seo?.metaDescription ?? attributes.excerpt ?? undefined;
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
  const resolvedParams = await Promise.resolve(params);
  const article = await getArticleBySlug(resolvedParams.slug);

  if (!article) {
    notFound();
  }

  const attributes = getEntityAttributes(article);
  if (!attributes) {
    notFound();
  }
  const blocks = attributes.blocks ?? [];
  const summaryBlock = blocks.find(
    (block) => block.__component === "article.summary-card",
  );
  const contentBlocks = blocks.filter(
    (block) => block.__component !== "article.summary-card",
  );

  const headingBlocks = contentBlocks.filter(isHeadingBlock);
  const resolveHeadingText = (block: HeadingBlock, index: number) =>
    block.text ?? block.title ?? `Section ${index + 1}`;
  const resolveHeadingLevel = (
    level: HeadingBlock["level"],
  ): 2 | 3 | 4 | null => {
    if (level === 2 || level === 3 || level === 4) {
      return level;
    }
    if (typeof level === "string") {
      const normalized = Number(level.replace(/[^\d]/g, ""));
      if (normalized === 2 || normalized === 3 || normalized === 4) {
        return normalized;
      }
    }
    return null;
  };
  const headingAnchors = headingBlocks.map((block, index) =>
    block.anchor ??
    createAnchorId(resolveHeadingText(block, index), `section-${index + 1}`),
  );
  const tocItems: TocItem[] = headingBlocks.flatMap((block, index) => {
    const level = resolveHeadingLevel(block.level);
    if (level !== 2 && level !== 3) {
      return [];
    }
    return [
      {
        id: headingAnchors[index],
        text: resolveHeadingText(block, index),
        level,
      },
    ];
  });

  const coverImageUrl = resolveMediaUrl(attributes.coverImage ?? undefined);
  const coverImageAttributes = resolveMediaAttributes(
    attributes.coverImage ?? null,
  );
  const coverAlt = coverImageAttributes?.alternativeText ?? attributes.title;

  const relatedArticles = await buildRelatedArticles(article);
  const author = getSingleRelationAttributes<StrapiAuthorAttributes>(
    attributes.author,
  );
  const authorName = author?.name;
  const categoryLabel =
    attributes.category in categoryLabels
      ? categoryLabels[attributes.category as ArticleCategory]
      : attributes.category;

  const headingOrderByContentIndex = new Map<number, number>();
  contentBlocks.forEach((block, index) => {
    if (block.__component === "article.heading") {
      headingOrderByContentIndex.set(index, headingOrderByContentIndex.size);
    }
  });

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
          bullets={summaryBlock.bullets ?? []}
          description={summaryBlock.description ?? null}
          title={summaryBlock.title ?? undefined}
        />
      ) : null}

      {tocItems.length ? <TOC items={tocItems} /> : null}

      <section className="space-y-6">
        {contentBlocks.map((block, index) => {
          if (block.__component === "article.heading") {
            const level = resolveHeadingLevel(block.level) ?? 2;
            const headingIndex = headingOrderByContentIndex.get(index) ?? 0;
            const anchor = headingAnchors[headingIndex] ?? `section-${headingIndex + 1}`;
            const HeadingTag =
              level === 2 ? "h2" : level === 3 ? "h3" : "h4";
            const headingText = resolveHeadingText(block, headingIndex);

            return (
              <HeadingTag
                key={`${block.__component}-${anchor}`}
                id={anchor}
                className={`${headingStyles[level]} scroll-mt-24`}
              >
                {headingText}
              </HeadingTag>
            );
          }

          if (block.__component === "article.rich-text") {
            return (
              <RichText
                key={`${block.__component}-${index}`}
                content={resolveRichTextContent(block)}
              />
            );
          }

          if (block.__component === "article.comparison-table") {
            const props = resolveComparisonTableProps(block);
            if (!props) {
              return null;
            }
            return (
              <div key={`${block.__component}-${index}`} className="pt-2">
                <ComparisonTable
                  caption={props.caption}
                  columns={props.columns}
                  rows={props.rows}
                />
              </div>
            );
          }

          if (block.__component === "article.callout") {
            const variant =
              block.type === "info" ||
              block.type === "warn" ||
              block.type === "tip"
                ? block.type
                : block.type === "warning"
                  ? "warn"
                  : block.type === "success"
                    ? "tip"
                    : block.type === "danger"
                      ? "warn"
                : "info";
            return (
              <Callout
                key={`${block.__component}-${index}`}
                body={strapiBlocksToHtml(block.body ?? block.content ?? "")}
                title={block.title ?? undefined}
                variant={variant}
              />
            );
          }

          if (
            block.__component === "article.pros-cons" ||
            block.__component === "article.pros-con"
          ) {
            return (
              <ProsCons
                key={`${block.__component}-${index}`}
                cons={normalizeProsConsItems(block.cons)}
                pros={normalizeProsConsItems(block.pros)}
              />
            );
          }

          if (
            block.__component === "article.link-cards" ||
            block.__component === "article.link-card"
          ) {
            const items = resolveLinkItems(block);

            if (!items.length) {
              return null;
            }

            return (
              <LinkCards key={`${block.__component}-${index}`} items={items} />
            );
          }

          if (block.__component === "article.cta") {
            const title = block.title?.trim() ?? "";
            const description = block.description?.trim() ?? "";
            const buttonText =
              block.buttonText?.trim() ?? block.link_text?.trim() ?? "";
            const buttonUrl =
              block.buttonUrl?.trim() ?? block.link_url?.trim() ?? "";
            if (!title || !description || !buttonText || !buttonUrl) {
              return null;
            }
            return (
              <CTA
                key={`${block.__component}-${index}`}
                buttonText={buttonText}
                buttonUrl={buttonUrl}
                description={description}
                title={title}
                variant={block.variant ?? undefined}
              />
            );
          }

          if (block.__component === "article.image") {
            const imageAttributes = resolveMediaAttributes(block.image ?? null);
            const src = resolveMediaUrl(block.image);
            const alt =
              block.alt ??
              block.alt_text ??
              imageAttributes?.alternativeText ??
              attributes.title;

            return (
              <ArticleImage
                key={`${block.__component}-${index}`}
                alt={alt}
                caption={block.caption ?? undefined}
                height={imageAttributes?.height ?? undefined}
                src={src}
                width={imageAttributes?.width ?? undefined}
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
