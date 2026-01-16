export type CategoryMeta = {
  eyebrow: string;
  title: string;
  description: string;
  basePath: string;
};

export type CategoryArticle = {
  slug: string;
  title: string;
  excerpt: string;
  tags: string[];
  date: string;
  coverImage: string;
};

export const industryMeta: CategoryMeta = {
  eyebrow: "Industry",
  title: "業界研究",
  description: "高専生が進路選択に必要な業界トレンドと職種の視点を整理します。",
  basePath: "/industry",
};

export const industryTagOptions = [
  { value: "all", label: "すべて" },
  { value: "energy", label: "エネルギー" },
  { value: "infra", label: "インフラ" },
  { value: "it", label: "IT" },
];

export const industryArticles: CategoryArticle[] = [
  {
    slug: "energy-dx",
    title: "エネルギー業界のDXで求められる高専スキル",
    excerpt: "制御・電気・情報のつながりから業界の動きを整理。",
    tags: ["エネルギー", "DX"],
    date: "2026-01-04",
    coverImage: "/images/cover-placeholder.svg",
  },
  {
    slug: "infra-career",
    title: "通信・インフラ業界の働き方を知る",
    excerpt: "現場×運用の視点で職種とキャリアの選択肢を確認。",
    tags: ["通信", "インフラ"],
    date: "2026-01-02",
    coverImage: "/images/cover-placeholder.svg",
  },
  {
    slug: "it-roles",
    title: "IT業界の職種マップと高専生の強み",
    excerpt: "開発・運用・企画の違いを整理して進路を考える。",
    tags: ["IT", "職種"],
    date: "2025-12-28",
    coverImage: "/images/cover-placeholder.svg",
  },
];
