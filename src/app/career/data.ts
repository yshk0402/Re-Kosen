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

export const careerMeta: CategoryMeta = {
  eyebrow: "Career",
  title: "キャリア設計",
  description: "高専生の進路設計に必要な視点と行動を整理します。",
  basePath: "/career",
};

export const careerTagOptions = [
  { value: "all", label: "すべて" },
  { value: "research", label: "研究職" },
  { value: "lab", label: "研究室" },
  { value: "choice", label: "進路選択" },
];

export const careerArticles: CategoryArticle[] = [
  {
    slug: "career-roadmap",
    title: "高専から研究職へ進むためのロードマップ",
    excerpt: "研究開発職に必要なスキルと準備の流れを解説。",
    tags: ["研究職", "進路"],
    date: "2026-01-06",
    coverImage: "/images/cover-placeholder.svg",
  },
  {
    slug: "lab-prep",
    title: "研究室配属前にやっておくと有利なこと",
    excerpt: "配属後に差がつく情報収集とスキル準備のチェック。",
    tags: ["研究室", "準備"],
    date: "2026-01-03",
    coverImage: "/images/cover-placeholder.svg",
  },
  {
    slug: "kosen-choices",
    title: "就職か編入かを判断するための視点",
    excerpt: "進路を決める前に整理したい判断材料をまとめる。",
    tags: ["進路選択", "就職", "編入"],
    date: "2025-12-30",
    coverImage: "/images/cover-placeholder.svg",
  },
];
