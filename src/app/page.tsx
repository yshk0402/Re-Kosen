import Image from "next/image";
import Link from "next/link";
import { getArticles, mapArticleCard } from "@/lib/strapi";

const categoryLabels: Record<string, string> = {
  industry: "業界研究",
  company: "企業研究",
  career: "キャリア設計",
};

const resolveCategoryLabel = (category?: string) =>
  category ? categoryLabels[category] ?? category : undefined;

const resolveTagLabel = (tags: string[], category?: string) =>
  tags[0] ?? resolveCategoryLabel(category) ?? "Article";

const fallbackCoverImage = "/images/cover-placeholder.svg";

const trendTiles = [
  {
    label: "メディア",
    className: "col-span-2 row-span-1 rounded-full bg-[#2fa36c]",
  },
  {
    label: "イベント",
    className: "col-span-1 row-span-1 rounded-[0_28px_28px_0] bg-[#f59e0b]",
  },
  {
    label: "ものづくり",
    className: "col-span-2 row-span-1 rounded-[28px_0_28px_0] bg-[#2563eb]",
  },
  {
    label: "研究",
    className: "col-span-1 row-span-2 rounded-lg bg-[#3b82f6]",
  },
  {
    label: "進路",
    className: "col-span-1 row-span-1 rounded-full bg-[#ec4899]",
  },
  {
    label: "インターン",
    className: "col-span-1 row-span-1 rounded-[0_0_28px_0] bg-[#9ca3af]",
  },
  {
    label: "ロボット",
    className: "col-span-1 row-span-1 rounded-[36px] bg-[#6b7280]",
  },
  {
    label: "就活",
    className: "col-span-1 row-span-1 rounded-full bg-[#8b5cf6]",
  },
  {
    label: "キャリア",
    className: "col-span-2 row-span-1 rounded-[28px] bg-[#f97316]",
  },
];

const categories = [
  {
    label: "業界研究",
    description: "業界の構造とトレンドを掴む",
    color: "#ef4444",
  },
  {
    label: "企業研究",
    description: "企業の特徴と成長環境を比較する",
    color: "#10b981",
  },
  {
    label: "キャリア設計",
    description: "進路選択の軸と行動を整理する",
    color: "#3b82f6",
  },
  {
    label: "インタビュー",
    description: "高専生・企業のリアルな声を読む",
    color: "#a855f7",
  },
];

const newsItems = [
  {
    title: "高専生向けのオンライン説明会を開催",
    date: "2025.02.08",
  },
  {
    title: "企業研究のための資料テンプレートを公開",
    date: "2025.01.30",
  },
  {
    title: "編集部インタビューの募集を開始",
    date: "2025.01.18",
  },
];

export default async function Home() {
  const response = await getArticles({ pageSize: 9 });
  const articles = response?.data ?? [];
  const cards = articles.map(mapArticleCard);

  const heroArticle = cards[0];
  const heroFeature = heroArticle
    ? {
        title: heroArticle.title,
        excerpt: heroArticle.excerpt,
        date: heroArticle.date,
        tag: resolveTagLabel(heroArticle.tags, heroArticle.category),
        image: heroArticle.coverImage ?? fallbackCoverImage,
      }
    : {
        title: "記事は準備中です。",
        excerpt: "最新記事が公開され次第、こちらに表示されます。",
        date: "",
        tag: "Pick Up",
        image: fallbackCoverImage,
      };

  const pickupCards = cards.slice(1, 4).map((card) => ({
    slug: card.slug,
    title: card.title,
    category: resolveCategoryLabel(card.category) ?? card.tags[0] ?? "Article",
    image: card.coverImage ?? fallbackCoverImage,
  }));

  const newArticles = cards.slice(4, 7).map((card) => ({
    slug: card.slug,
    title: card.title,
    tag: resolveTagLabel(card.tags, card.category),
    date: card.date,
    image: card.coverImage ?? fallbackCoverImage,
  }));
  return (
    <div className="pb-24">
      <section className="mx-auto w-full max-w-[1100px] px-4 pt-6">
        <article className="space-y-3">
          <div className="rounded-xl border border-border bg-white p-3">
            <div className="relative aspect-[16/9] overflow-hidden rounded-lg border border-border">
              <Image
                alt={heroFeature.title}
                fill
                sizes="(max-width: 1024px) 100vw, 65vw"
                src={heroFeature.image}
                className="object-cover"
              />
              <span className="absolute left-3 top-3 rounded-full border border-border bg-white px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">
                {heroFeature.tag}
              </span>
              <span className="absolute left-3 bottom-3 rounded-full bg-brand px-3 py-1 text-[11px] font-semibold text-white">
                12th
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-muted">
            <span>Pick up</span>
            {heroFeature.date ? <span>{heroFeature.date}</span> : null}
          </div>
          <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
            {heroFeature.title}
          </h2>
          <p className="text-sm leading-relaxed text-muted">
            {heroFeature.excerpt}
          </p>
        </article>

        <div className="relative mt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-script text-3xl leading-none text-ink">
                Pick Up
              </p>
              <p className="text-[11px] uppercase tracking-[0.3em] text-muted">
                おすすめ記事
              </p>
            </div>
            <button className="rounded-full border border-border bg-white px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">
              View All
            </button>
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {pickupCards.length ? (
              pickupCards.map((card) => (
                <article
                  key={card.slug || card.title}
                  className="rounded-xl border border-border bg-white p-4"
                >
                  <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-muted">
                    <span>{card.category}</span>
                    <span>→</span>
                  </div>
                  <h3 className="mt-3 text-sm font-semibold text-ink">
                    {card.title}
                  </h3>
                  <div className="mt-4 aspect-[16/9] overflow-hidden rounded-lg border border-border">
                    <Image
                      alt={card.title}
                      height={240}
                      width={320}
                      src={card.image}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </article>
              ))
            ) : (
              <div className="rounded-xl border border-border bg-white p-4 text-sm text-muted">
                おすすめ記事は準備中です。
              </div>
            )}
          </div>
          <svg
            aria-hidden="true"
            className="absolute -right-10 -top-10 hidden h-24 w-24 text-ink/70 lg:block"
            fill="none"
            viewBox="0 0 120 120"
          >
            <path
              d="M12 58c20-30 44-38 64-28 24 12 26 46 2 58-16 8-38 3-54-10"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="1.4"
            />
            <path
              d="M78 96l14 8-6-15"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="1.4"
            />
          </svg>
        </div>
      </section>

      <section className="mx-auto mt-14 w-full max-w-[1100px] px-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-script text-3xl leading-none text-ink">
              New Articles
            </p>
            <p className="text-[11px] uppercase tracking-[0.3em] text-muted">
              最新記事
            </p>
          </div>
          <Link
            className="rounded-full border border-border bg-white px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted"
            href="/article"
          >
            View All
          </Link>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {newArticles.length ? (
            newArticles.map((article) => (
              <article
                key={article.slug || article.title}
                className="rounded-xl border border-border bg-white p-4"
              >
                <div className="aspect-[16/9] overflow-hidden rounded-lg border border-border">
                  <Image
                    alt={article.title}
                    height={240}
                    width={320}
                    src={article.image}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="mt-3 flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-muted">
                  <span>{article.tag}</span>
                  {article.date ? <span>{article.date}</span> : null}
                </div>
                <h3 className="mt-2 text-sm font-semibold text-ink">
                  {article.title}
                </h3>
              </article>
            ))
          ) : (
            <div className="rounded-xl border border-border bg-white p-4 text-sm text-muted">
              最新記事は準備中です。
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto mt-16 w-full max-w-[1100px] px-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-script text-3xl leading-none text-ink">
              Trend Tags
            </p>
            <p className="text-[11px] uppercase tracking-[0.3em] text-muted">
              注目タグ
            </p>
          </div>
          <button className="rounded-full border border-border bg-white px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">
            View All
          </button>
        </div>
        <div className="mt-6 grid auto-rows-[88px] grid-cols-2 gap-3 text-sm font-semibold text-white sm:grid-cols-3 lg:grid-cols-6">
          {trendTiles.map((tile) => (
            <div
              key={tile.label}
              className={`flex items-center justify-center text-center text-xs font-semibold uppercase tracking-[0.2em] ${tile.className}`}
            >
              {tile.label}
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-16 w-full max-w-[1100px] px-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-script text-3xl leading-none text-ink">
              Article Category
            </p>
            <p className="text-[11px] uppercase tracking-[0.3em] text-muted">
              カテゴリ
            </p>
          </div>
          <button className="rounded-full border border-border bg-white px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">
            View All
          </button>
        </div>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {categories.map((item) => (
            <div
              key={item.label}
              className="flex items-start gap-3 border-b border-border pb-4"
            >
              <span
                className="mt-1 h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <div>
                <p className="text-sm font-semibold text-ink">{item.label}</p>
                <p className="text-xs text-muted">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="relative mt-20">
        <div className="relative left-1/2 right-1/2 w-screen -mx-[50vw] -rotate-[1deg] bg-white py-16">
          <div className="mx-auto w-full max-w-[1100px] rotate-[1deg] px-4">
            <div className="grid gap-8 lg:grid-cols-[0.8fr,1.2fr]">
              <div>
                <p className="font-script text-3xl leading-none text-ink">News</p>
                <p className="text-[11px] uppercase tracking-[0.3em] text-muted">
                  お知らせ
                </p>
              </div>
              <div className="space-y-4">
                {newsItems.map((item) => (
                  <div
                    key={item.title}
                    className="flex items-center justify-between border-b border-border pb-3 text-sm text-ink"
                  >
                    <span>{item.title}</span>
                    <span className="text-xs text-muted">{item.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-12 w-full max-w-[1100px] px-4 pb-10">
        <div className="relative">
          <svg
            aria-hidden="true"
            className="absolute -left-6 -top-6 hidden h-24 w-40 text-ink/70 md:block"
            fill="none"
            viewBox="0 0 160 90"
          >
            <path
              d="M6 58c28-24 58-32 86-22 31 10 44 40 16 50-20 7-46 2-64-10"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="1.4"
            />
            <path
              d="M120 74l18 6-10-14"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="1.4"
            />
          </svg>
          <div className="ml-auto max-w-md rounded-xl border border-border bg-white p-5 text-sm text-muted">
            <p className="text-[11px] uppercase tracking-[0.3em] text-muted">
              Message
            </p>
            <p className="mt-3 text-sm text-ink">
              高専生向けの進路相談・企業向け問い合わせは
              {"{{TODO: 未確定}}"}です。
            </p>
            <div className="mt-4">
              <Link
                className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted"
                href="/contact"
              >
                Contact
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
