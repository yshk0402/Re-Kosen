import { careerArticles, careerMeta } from "../career/data";
import { companyArticles, companyMeta } from "../company/data";
import { industryArticles, industryMeta } from "../industry/data";

type ArticleListItem = {
  slug: string;
  title: string;
  excerpt: string;
  tags: string[];
  date: string;
  coverImage?: string;
  category: string;
};

export const articleMeta = {
  eyebrow: "Articles",
  title: "記事一覧",
  description: "Re:Kosenで公開している記事をまとめて確認できます。",
  basePath: "/article",
};

const withCategory = (
  articles: Omit<ArticleListItem, "category">[],
  category: string,
) =>
  articles.map((article) => ({
    ...article,
    category,
  }));

export const allArticles = [
  ...withCategory(industryArticles, industryMeta.eyebrow),
  ...withCategory(companyArticles, companyMeta.eyebrow),
  ...withCategory(careerArticles, careerMeta.eyebrow),
].sort((a, b) => b.date.localeCompare(a.date));
