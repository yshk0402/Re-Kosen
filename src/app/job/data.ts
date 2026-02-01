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

export const jobMeta: CategoryMeta = {
  eyebrow: "職業研究",
  title: "職種研究",
  description: "高専生が進路選択に必要な職種の役割と働き方を整理します。",
  basePath: "/job",
};

export const jobTagOptions = [
  { value: "all", label: "すべて" },
  { value: "development", label: "開発" },
  { value: "research", label: "研究" },
  { value: "operation", label: "運用" },
];

export const jobArticles: CategoryArticle[] = [
  {
    slug: "job-developer",
    title: "開発職で活かせる高専スキルを整理する",
    excerpt: "設計・実装・運用の役割を把握して進路を考える。",
    tags: ["開発", "設計"],
    date: "2026-01-07",
    coverImage: "/images/cover-placeholder.svg",
  },
  {
    slug: "job-research",
    title: "研究職の業務フローと必要スキル",
    excerpt: "研究テーマの探し方と日々の仕事の進め方を解説。",
    tags: ["研究", "進路"],
    date: "2026-01-02",
    coverImage: "/images/cover-placeholder.svg",
  },
  {
    slug: "job-operation",
    title: "運用・保守で求められる視点と対応力",
    excerpt: "現場で評価されるポイントと業務の流れを整理。",
    tags: ["運用", "保守"],
    date: "2025-12-29",
    coverImage: "/images/cover-placeholder.svg",
  },
];
