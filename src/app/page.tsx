import Image from "next/image";
import Link from "next/link";
import HomeArticleCard from "@/components/home/HomeArticleCard";
import SectionHeader from "@/components/home/SectionHeader";
import {
  getArticles,
  getEntityAttributes,
  getHome,
  getRelationAttributes,
  mapArticleCard,
  resolveMediaUrl,
  type ArticleCardData,
  type HomeBanner,
  type StrapiArticleAttributes,
} from "@/lib/strapi";

const fallbackCoverImage = "/images/cover-placeholder.svg";
const LINE_FALLBACK_URL = "https://example.com";

const categoryGroups = [
  { key: "industry", label: "業界研究", href: "/industry" },
  { key: "company", label: "企業研究", href: "/company" },
  { key: "career", label: "キャリア設計", href: "/career" },
];

const trustItems = [
  {
    title: "運営方針",
    description: "高専生が安心して読める編集方針を公開しています。",
    href: "/about",
  },
  {
    title: "プライバシー",
    description: "個人情報の取り扱い方針を明示しています。",
    href: "/privacy",
  },
  {
    title: "お問い合わせ",
    description: "掲載・取材などの相談はこちらから。",
    href: "/contact",
  },
];

type HomeCard = {
  slug: string;
  title: string;
  image: string;
};

type BannerItem = {
  id: string;
  title: string;
  href: string;
  desktopImage: string;
  mobileImage: string;
};

const normalizeBanners = (value?: HomeBanner[] | HomeBanner | null) => {
  if (!value) {
    return [];
  }
  return Array.isArray(value) ? value : [value];
};

const toHomeCard = (card: ArticleCardData): HomeCard => ({
  slug: card.slug,
  title: card.title,
  image: card.coverImage ?? fallbackCoverImage,
});

function EmptyState({ children }: { children: string }) {
  return (
    <div className="rounded-2xl border border-border bg-white p-4 text-sm text-muted">
      {children}
    </div>
  );
}

function PopularList({ items }: { items: HomeCard[] }) {
  return (
    <section className="space-y-4">
      <SectionHeader title="人気ランキング" subtitle="POPULAR" />
      {items.length ? (
        <div className="space-y-3">
          {items.map((item, index) => (
            <Link
              key={item.slug}
              className="group flex items-center gap-3 rounded-2xl border border-border bg-white p-3 transition hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-[0_12px_24px_rgba(15,23,42,0.08)]"
              href={`/articles/${item.slug}`}
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-soft text-xs font-semibold text-brand">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-lg bg-brand-soft">
                <Image
                  alt={item.title}
                  fill
                  sizes="80px"
                  src={item.image}
                  className="object-cover"
                />
              </div>
              <p className="text-xs font-semibold text-ink line-clamp-2 transition group-hover:text-brand-strong">
                {item.title}
              </p>
            </Link>
          ))}
        </div>
      ) : (
        <EmptyState>人気記事は準備中です。</EmptyState>
      )}
    </section>
  );
}

function BannerCard({
  banner,
  variant,
}: {
  banner: BannerItem;
  variant: "desktop" | "mobile";
}) {
  const image = variant === "mobile" ? banner.mobileImage : banner.desktopImage;
  const ratio = variant === "mobile" ? "aspect-[16/9]" : "aspect-[3/4]";

  return (
    <Link
      className="group block overflow-hidden rounded-2xl border border-border bg-white shadow-[0_10px_24px_rgba(15,23,42,0.08)] transition hover:-translate-y-0.5 hover:border-brand/40"
      href={banner.href}
      rel="noreferrer"
      target="_blank"
    >
      <div className={`relative ${ratio} overflow-hidden bg-brand-soft`}>
        <Image
          alt={banner.title}
          fill
          sizes={variant === "mobile" ? "100vw" : "320px"}
          src={image}
          className="object-cover transition duration-300 group-hover:scale-[1.03]"
        />
      </div>
    </Link>
  );
}

export default async function Home() {
  const [home, fallbackResponse, industryResponse, companyResponse, careerResponse] =
    await Promise.all([
      getHome(),
      getArticles({ pageSize: 24 }),
      getArticles({ category: "industry", pageSize: 3 }),
      getArticles({ category: "company", pageSize: 3 }),
      getArticles({ category: "career", pageSize: 3 }),
    ]);

  const fallbackCards = (fallbackResponse?.data ?? []).map(mapArticleCard);
  const homeAttributes = getEntityAttributes(home);
  const usedSlugs = new Set<string>();

  const takeUnique = (source: ArticleCardData[], count: number) => {
    const selected: ArticleCardData[] = [];
    for (const card of source) {
      if (!card.slug || usedSlugs.has(card.slug)) {
        continue;
      }
      usedSlugs.add(card.slug);
      selected.push(card);
      if (selected.length >= count) {
        break;
      }
    }
    return selected;
  };

  const pickFromHome = (value: unknown) =>
    getRelationAttributes<StrapiArticleAttributes>(value).map(mapArticleCard);

  const pickWithFallback = (source: ArticleCardData[], count: number) => {
    const selected = takeUnique(source, count);
    if (selected.length < count) {
      selected.push(...takeUnique(fallbackCards, count - selected.length));
    }
    return selected;
  };

  const pickupMediums = pickWithFallback(
    pickFromHome(homeAttributes?.pickupMediums),
    2,
  ).map(toHomeCard);
  const pickupSmalls = pickWithFallback(
    pickFromHome(homeAttributes?.pickupSmalls),
    3,
  ).map(toHomeCard);
  const popularItems = pickWithFallback(
    pickFromHome(homeAttributes?.popularItems),
    5,
  ).map(toHomeCard);
  const featuredItems = pickWithFallback(
    pickFromHome(homeAttributes?.featuredItems),
    6,
  ).map(toHomeCard);
  const latestItems = takeUnique(fallbackCards, 6).map(toHomeCard);

  const bannerItems = normalizeBanners(homeAttributes?.banners).map(
    (banner, index) => ({
      id: String(banner.id ?? index + 1),
      title: banner.title ?? `Banner ${index + 1}`,
      href: banner.linkUrl ?? LINE_FALLBACK_URL,
      desktopImage:
        resolveMediaUrl(banner.desktopImage) ?? fallbackCoverImage,
      mobileImage:
        resolveMediaUrl(banner.mobileImage) ??
        resolveMediaUrl(banner.desktopImage) ??
        fallbackCoverImage,
    }),
  );

  const fallbackBanners: BannerItem[] = [
    {
      id: "banner-placeholder-1",
      title: "バナープレースホルダー",
      href: LINE_FALLBACK_URL,
      desktopImage: fallbackCoverImage,
      mobileImage: fallbackCoverImage,
    },
    {
      id: "banner-placeholder-2",
      title: "バナープレースホルダー",
      href: LINE_FALLBACK_URL,
      desktopImage: fallbackCoverImage,
      mobileImage: fallbackCoverImage,
    },
  ];

  const bannerPool = bannerItems.length ? bannerItems : fallbackBanners;
  const desktopBanners = [...bannerPool];
  if (desktopBanners.length < 2) {
    desktopBanners.push(...fallbackBanners.slice(desktopBanners.length, 2));
  }
  const mobileBanner = bannerPool[0] ?? fallbackBanners[0];

  const lineCta = {
    title: homeAttributes?.lineCta?.title ?? "迷ったら無料で相談する",
    description:
      homeAttributes?.lineCta?.description ??
      "高専生の進路や就活の相談をLINEで受け付けています。",
    buttonLabel: homeAttributes?.lineCta?.buttonLabel ?? "無料で相談する",
    lineUrl: homeAttributes?.lineCta?.lineUrl ?? LINE_FALLBACK_URL,
  };

  const categoryShelves = [
    {
      ...categoryGroups[0],
      items: (industryResponse?.data ?? []).map(mapArticleCard).map(toHomeCard),
    },
    {
      ...categoryGroups[1],
      items: (companyResponse?.data ?? []).map(mapArticleCard).map(toHomeCard),
    },
    {
      ...categoryGroups[2],
      items: (careerResponse?.data ?? []).map(mapArticleCard).map(toHomeCard),
    },
  ];

  return (
    <div className="pb-20">
      <div className="mx-auto w-full max-w-[1200px] px-4 py-10">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <div className="space-y-12">
            <header className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand">
                Re:Kosen
              </p>
              <h1 className="text-2xl font-semibold text-ink sm:text-4xl">
                高専生の進路選択を支えるキャリアメディア
              </h1>
              <p className="text-sm text-muted sm:text-base">
                業界研究、企業研究、キャリア設計まで。高専生の選択肢を広げる
                情報を届けます。
              </p>
              <div className="flex flex-wrap gap-2">
                {categoryGroups.map((category) => (
                  <Link
                    key={category.key}
                    className="rounded-full border border-border bg-white px-4 py-1.5 text-xs font-semibold text-muted transition hover:border-brand/40 hover:text-brand"
                    href={category.href}
                  >
                    {category.label}
                  </Link>
                ))}
              </div>
            </header>

            <section className="space-y-5">
              <SectionHeader title="ピックアップ" subtitle="PICK UP" />
              {pickupMediums.length || pickupSmalls.length ? (
                <div className="grid gap-6 lg:grid-cols-3">
                  <div className="grid gap-6 lg:col-span-2 lg:grid-cols-2">
                    {pickupMediums.map((item) => (
                      <HomeArticleCard
                        key={item.slug}
                        href={`/articles/${item.slug}`}
                        image={item.image}
                        title={item.title}
                      />
                    ))}
                  </div>
                  <div className="flex gap-4 overflow-x-auto pb-2 pt-1 snap-x snap-mandatory lg:flex-col lg:overflow-visible lg:pb-0">
                    {pickupSmalls.map((item) => (
                      <HomeArticleCard
                        key={item.slug}
                        href={`/articles/${item.slug}`}
                        image={item.image}
                        title={item.title}
                        variant="small"
                        className="w-[72%] shrink-0 snap-start sm:w-[48%] lg:w-auto"
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <EmptyState>ピックアップ記事は準備中です。</EmptyState>
              )}
            </section>

            <div className="space-y-10 lg:hidden">
              <PopularList items={popularItems} />
              {mobileBanner ? (
                <section className="space-y-4">
                  <SectionHeader title="おすすめバナー" subtitle="BANNER" />
                  <BannerCard banner={mobileBanner} variant="mobile" />
                </section>
              ) : null}
            </div>

            <section className="space-y-5">
              <SectionHeader
                title="おすすめ"
                subtitle="FEATURED"
                href="/article"
              />
              {featuredItems.length ? (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {featuredItems.map((item) => (
                    <HomeArticleCard
                      key={item.slug}
                      href={`/articles/${item.slug}`}
                      image={item.image}
                      title={item.title}
                    />
                  ))}
                </div>
              ) : (
                <EmptyState>おすすめ記事は準備中です。</EmptyState>
              )}
            </section>

            <section className="space-y-5">
              <SectionHeader
                title="新着"
                subtitle="LATEST"
                href="/article"
              />
              {latestItems.length ? (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {latestItems.map((item) => (
                    <HomeArticleCard
                      key={item.slug}
                      href={`/articles/${item.slug}`}
                      image={item.image}
                      title={item.title}
                    />
                  ))}
                </div>
              ) : (
                <EmptyState>新着記事は準備中です。</EmptyState>
              )}
            </section>

            <section className="space-y-5">
              <SectionHeader title="カテゴリ別" subtitle="CATEGORY" />
              <div className="grid gap-6 lg:grid-cols-3">
                {categoryShelves.map((category) => (
                  <div key={category.key} className="space-y-4">
                    <div className="flex items-center justify-between">
                      <p className="text-base font-semibold text-ink">
                        {category.label}
                      </p>
                      <Link
                        className="text-xs font-semibold text-brand transition hover:text-brand-strong"
                        href={category.href}
                      >
                        もっと見る
                      </Link>
                    </div>
                    <div className="grid gap-4">
                      {category.items.length ? (
                        category.items.map((item) => (
                          <HomeArticleCard
                            key={item.slug}
                            href={`/articles/${item.slug}`}
                            image={item.image}
                            title={item.title}
                            variant="small"
                          />
                        ))
                      ) : (
                        <EmptyState>
                          {category.label}の記事は準備中です。
                        </EmptyState>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-brand/20 bg-brand-soft px-6 py-7 sm:px-8">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand">
                    LINE
                  </p>
                  <h2 className="text-xl font-semibold text-ink">
                    {lineCta.title}
                  </h2>
                  <p className="text-sm text-muted sm:text-base">
                    {lineCta.description}
                  </p>
                </div>
                <Link
                  className="inline-flex w-fit items-center justify-center rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-strong"
                  href={lineCta.lineUrl}
                  rel="noreferrer"
                  target="_blank"
                >
                  {lineCta.buttonLabel}
                </Link>
              </div>
            </section>

            <section className="space-y-5">
              <SectionHeader title="安心して読める理由" subtitle="TRUST" />
              <div className="grid gap-4 sm:grid-cols-3">
                {trustItems.map((item) => (
                  <Link
                    key={item.title}
                    className="group rounded-2xl border border-border bg-white p-5 transition hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-[0_12px_24px_rgba(15,23,42,0.08)]"
                    href={item.href}
                  >
                    <p className="text-base font-semibold text-ink">
                      {item.title}
                    </p>
                    <p className="mt-2 text-sm text-muted">
                      {item.description}
                    </p>
                    <span className="mt-4 inline-flex text-xs font-semibold text-brand">
                      詳しく見る →
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          </div>

          <aside className="hidden space-y-10 lg:block">
            <PopularList items={popularItems} />
            <section className="space-y-4">
              <SectionHeader title="バナー" subtitle="BANNER" />
              <div className="space-y-4">
                {desktopBanners.map((banner) => (
                  <BannerCard
                    key={banner.id}
                    banner={banner}
                    variant="desktop"
                  />
                ))}
              </div>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}
