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

export const companyMeta: CategoryMeta = {
  eyebrow: "Company",
  title: "企業研究",
  description: "高専生に合う企業の特徴や選び方の視点を整理します。",
  basePath: "/company",
};

export const companyTagOptions = [
  { value: "all", label: "すべて" },
  { value: "manufacturing", label: "製造業" },
  { value: "startup", label: "スタートアップ" },
  { value: "internship", label: "インターン" },
];

export const companyArticles: CategoryArticle[] = [
  {
    slug: "manufacturing-culture",
    title: "製造業で高専生が活躍する理由",
    excerpt: "現場視点で求められる素養と評価ポイントを整理。",
    tags: ["製造業", "研究開発"],
    date: "2026-01-05",
    coverImage: "/images/cover-placeholder.svg",
  },
  {
    slug: "startup-vs-large",
    title: "スタートアップと大手の成長環境を比較",
    excerpt: "配属・裁量・育成制度の違いから選び方を考える。",
    tags: ["スタートアップ", "比較", "企業選び"],
    date: "2026-01-01",
    coverImage: "/images/cover-placeholder.svg",
  },
  {
    slug: "internship-check",
    title: "企業研究を深めるインターン準備",
    excerpt: "短期でも評価される準備項目と質問例をまとめる。",
    tags: ["インターン", "準備"],
    date: "2025-12-26",
    coverImage: "/images/cover-placeholder.svg",
  },
];
