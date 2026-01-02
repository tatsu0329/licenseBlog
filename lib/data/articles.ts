import { Article } from "../types";

// JSONファイルから読み込む型定義
export type ArticleJson = {
  id: string;
  slug: string;
  title: string;
  content: string; // Markdown形式
  excerpt: string;
  featuredImageUrl?: string | null;
  author?: string;
  tags: string[];
  relatedCertIds: string[];
  relatedQuestionIds?: string[];
  publishedAt: string; // ISO date string
  updatedAt: string; // ISO date string
};

// JSONファイルから記事データを読み込んでDate型に変換
function parseArticleDates(article: ArticleJson): Article {
  return {
    ...article,
    featuredImageUrl: article.featuredImageUrl || undefined,
    relatedQuestionIds: article.relatedQuestionIds || [],
    publishedAt: new Date(article.publishedAt),
    updatedAt: new Date(article.updatedAt),
  };
}

// 記事データ（JSONファイルから読み込む）
import autoMechanic1R6_2PassLineArticle from "./articles/auto_mechanic_1_r6_2_pass_line.json";
import autoMechanic1AppArticle from "./articles/auto_mechanic_1_app.json";
import autoMechanic1WebVsAppArticle from "./articles/auto_mechanic_1_web_vs_app.json";
import autoMechanic1CommonMistakesArticle from "./articles/auto_mechanic_1_common_mistakes.json";
import autoMechanic1SystemChangesArticle from "./articles/auto_mechanic_1_system_changes.json";
import autoMechanic2R7_1PassLineArticle from "./articles/auto_mechanic_2_r7_1_pass_line.json";
import autoMechanic2AppArticle from "./articles/auto_mechanic_2_app.json";
import autoMechanic2WebVsAppArticle from "./articles/auto_mechanic_2_web_vs_app.json";
import autoMechanic2SystemChangesArticle from "./articles/auto_mechanic_2_system_changes.json";
import autoMechanic2CommonMistakesArticle from "./articles/auto_mechanic_2_common_mistakes.json";
import autoMechanic3R7_1PassLineArticle from "./articles/auto_mechanic_3_r7_1_pass_line.json";
import autoMechanic3AppArticle from "./articles/auto_mechanic_3_app.json";
import autoMechanic3WebVsAppArticle from "./articles/auto_mechanic_3_web_vs_app.json";
import autoMechanic3SystemChangesArticle from "./articles/auto_mechanic_3_system_changes.json";
import autoMechanic3CommonMistakesArticle from "./articles/auto_mechanic_3_common_mistakes.json";

// 全記事を読み込み
export function getAllArticles(): Article[] {
  const articles: ArticleJson[] = [
    autoMechanic1R6_2PassLineArticle as ArticleJson,
    autoMechanic1AppArticle as ArticleJson,
    autoMechanic1WebVsAppArticle as ArticleJson,
    autoMechanic1CommonMistakesArticle as ArticleJson,
    autoMechanic1SystemChangesArticle as ArticleJson,
    autoMechanic2R7_1PassLineArticle as ArticleJson,
    autoMechanic2AppArticle as ArticleJson,
    autoMechanic2WebVsAppArticle as ArticleJson,
    autoMechanic2SystemChangesArticle as ArticleJson,
    autoMechanic2CommonMistakesArticle as ArticleJson,
    autoMechanic3R7_1PassLineArticle as ArticleJson,
    autoMechanic3AppArticle as ArticleJson,
    autoMechanic3WebVsAppArticle as ArticleJson,
    autoMechanic3SystemChangesArticle as ArticleJson,
    autoMechanic3CommonMistakesArticle as ArticleJson,
  ];

  return articles.map(parseArticleDates);
}

// 資格IDで記事を取得
export function getArticlesByCert(certId: string): Article[] {
  return getAllArticles().filter((article) =>
    article.relatedCertIds.includes(certId)
  );
}

// スラッグで記事を取得
export function getArticleBySlug(slug: string): Article | undefined {
  return getAllArticles().find((article) => article.slug === slug);
}

// タグで記事を取得
export function getArticlesByTag(tag: string): Article[] {
  return getAllArticles().filter((article) => article.tags.includes(tag));
}

// 公開済み記事のみ取得
export function getPublishedArticles(): Article[] {
  const now = new Date();
  return getAllArticles().filter((article) => article.publishedAt <= now);
}

