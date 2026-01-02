import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticleBySlug, getArticlesByCert } from "@/lib/data/articles";
import { getCert } from "@/lib/data/certs";
import { Metadata } from "next";
import React from "react";
import BackButton from "@/components/BackButton";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return {
      title: "記事が見つかりません",
    };
  }

  return {
    title: `${article.title} | ライセンスブログ`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.publishedAt.toISOString(),
      modifiedTime: article.updatedAt.toISOString(),
      authors: article.author ? [article.author] : undefined,
      tags: article.tags,
    },
  };
}

// App StoreリンクまたはWebアプリリンクを大きく目立つボタンとして表示する関数
function processAppStoreLink(linkText: string, linkUrl: string, key: string): React.ReactNode {
  const isAppStoreLink = linkUrl.includes("apps.apple.com") || linkText.includes("App Store");
  const isWebAppLink = linkUrl.includes("seibishi-quiz-web.vercel.app") || linkText.includes("Webアプリ");
  const displayText = linkText && linkText.trim() ? linkText.trim() : (isAppStoreLink ? "App Storeでダウンロード" : "Webアプリで学習する");
  
  // App Storeリンクの場合は黒背景、Webアプリリンクの場合は青背景
  const bgColor = isAppStoreLink ? "bg-black hover:bg-gray-800" : "bg-blue-600 hover:bg-blue-700";
  const icon = isAppStoreLink ? (
    <svg
      className="w-8 h-8 flex-shrink-0"
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C1.79 15.25 2.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
    </svg>
  ) : (
    <svg
      className="w-8 h-8 flex-shrink-0"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
    </svg>
  );
  
  return (
    <a
      key={key}
      href={linkUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`block w-full max-w-md mx-auto px-10 py-5 ${bgColor} text-white rounded-xl transition-all duration-300 font-bold text-xl shadow-lg hover:shadow-xl hover:scale-105 min-h-[64px] flex items-center justify-center text-center`}
    >
      <span className="flex items-center justify-center gap-3">
        {icon}
        <span>{displayText}</span>
      </span>
    </a>
  );
}

// リンク（[text](url)）を処理するヘルパー関数
function processLinks(text: string, keyPrefix: string): React.ReactNode {
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match;
  let matchIndex = 0;

  while ((match = linkRegex.exec(text)) !== null) {
    // リンクの前のテキスト
    if (match.index > lastIndex) {
      const beforeText = text.substring(lastIndex, match.index);
      parts.push(processBold(beforeText, `${keyPrefix}-before-${matchIndex}`));
    }
    
    const linkText = match[1];
    const linkUrl = match[2];
    const isAppStoreLink = linkText.includes("App Store") || linkUrl.includes("apps.apple.com");
    const isWebAppLink = linkText.includes("Webアプリ") || linkUrl.includes("seibishi-quiz-web.vercel.app");
    
    // App StoreリンクまたはWebアプリリンクの場合は大きく目立つボタンスタイルに（パラグラフ内の場合）
    if (isAppStoreLink || isWebAppLink) {
      // App Storeリンクの場合は黒背景、Webアプリリンクの場合は青背景
      const bgColor = isAppStoreLink ? "bg-black hover:bg-gray-800" : "bg-blue-600 hover:bg-blue-700";
      const icon = isAppStoreLink ? (
        <svg
          className="w-8 h-8 flex-shrink-0"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C1.79 15.25 2.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
        </svg>
      ) : (
        <svg
          className="w-8 h-8 flex-shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      );
      parts.push(
        <a
          key={`${keyPrefix}-link-${matchIndex}`}
          href={linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-block mt-4 mb-4 px-10 py-5 ${bgColor} text-white rounded-xl transition-all duration-300 font-bold text-xl shadow-lg hover:shadow-xl hover:scale-105 min-h-[64px] flex items-center justify-center`}
        >
          <span className="flex items-center gap-3">
            {icon}
            <span>{linkText && linkText.trim() ? linkText.trim() : (isAppStoreLink ? "App Storeでダウンロード" : "Webアプリで学習する")}</span>
          </span>
        </a>
      );
    } else {
      // 通常のリンク
      parts.push(
        <a
          key={`${keyPrefix}-link-${matchIndex}`}
          href={linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 underline font-medium"
        >
          {processBold(linkText, `${keyPrefix}-link-text-${matchIndex}`)}
        </a>
      );
    }
    lastIndex = match.index + match[0].length;
    matchIndex++;
  }

  // 残りのテキスト
  if (lastIndex < text.length) {
    const remainingText = text.substring(lastIndex);
    parts.push(processBold(remainingText, `${keyPrefix}-after`));
  }

  // リンクが含まれていない場合は太字処理のみ
  if (matchIndex === 0) {
    return processBold(text, keyPrefix);
  }

  return <>{parts}</>;
}

// 太字（**text**）を処理するヘルパー関数
function processBold(text: string, keyPrefix: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  const boldRegex = /\*\*(.+?)\*\*/g;
  let match;
  let matchIndex = 0;

  while ((match = boldRegex.exec(text)) !== null) {
    // 太字の前のテキスト
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }
    // 太字のテキスト
    parts.push(
      <strong key={`${keyPrefix}-bold-${matchIndex}`} className="font-semibold text-gray-900">
        {match[1]}
      </strong>
    );
    lastIndex = match.index + match[0].length;
    matchIndex++;
  }

  // 残りのテキスト
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  // 太字が含まれていない場合は文字列をそのまま返す
  if (parts.length === 0) {
    return text;
  }

  // 太字が1つも見つからなかった場合（最初からlastIndexが0でpartsが空）
  if (matchIndex === 0) {
    return text;
  }

  return <>{parts}</>;
}

// シンプルなMarkdownレンダリング（改行と見出しを処理）
function renderMarkdown(content: string): React.ReactNode {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let currentParagraph: string[] = [];

  lines.forEach((line, index) => {
    const trimmed = line.trim();

    // 見出し（#で始まる行）
    if (trimmed.startsWith("# ")) {
      if (currentParagraph.length > 0) {
        const paragraphText = currentParagraph.join("\n");
        elements.push(
          <p key={`p-${index}`} className="mb-4 leading-relaxed text-gray-700">
            {processLinks(paragraphText, `p-${index}`)}
          </p>
        );
        currentParagraph = [];
      }
      elements.push(
        <h1 key={`h1-${index}`} className="text-3xl font-bold text-gray-900 mt-8 mb-4">
          {trimmed.substring(2)}
        </h1>
      );
    } else if (trimmed.startsWith("## ")) {
      if (currentParagraph.length > 0) {
        const paragraphText = currentParagraph.join("\n");
        elements.push(
          <p key={`p-${index}`} className="mb-4 leading-relaxed text-gray-700">
            {processLinks(paragraphText, `p-${index}`)}
          </p>
        );
        currentParagraph = [];
      }
      elements.push(
        <h2 key={`h2-${index}`} className="text-2xl font-semibold text-gray-900 mt-6 mb-3">
          {trimmed.substring(3)}
        </h2>
      );
    } else if (trimmed.startsWith("### ")) {
      if (currentParagraph.length > 0) {
        const paragraphText = currentParagraph.join("\n");
        elements.push(
          <p key={`p-${index}`} className="mb-4 leading-relaxed text-gray-700">
            {processLinks(paragraphText, `p-${index}`)}
          </p>
        );
        currentParagraph = [];
      }
      elements.push(
        <h3 key={`h3-${index}`} className="text-xl font-semibold text-gray-900 mt-4 mb-2">
          {trimmed.substring(4)}
        </h3>
      );
    } else if (trimmed.startsWith("#### ")) {
      if (currentParagraph.length > 0) {
        const paragraphText = currentParagraph.join("\n");
        elements.push(
          <p key={`p-${index}`} className="mb-4 leading-relaxed text-gray-700">
            {processLinks(paragraphText, `p-${index}`)}
          </p>
        );
        currentParagraph = [];
      }
      elements.push(
        <h4 key={`h4-${index}`} className="text-lg font-semibold text-gray-900 mt-3 mb-2">
          {trimmed.substring(5)}
        </h4>
      );
    } else if (trimmed === "") {
      // 空行
      if (currentParagraph.length > 0) {
        const paragraphText = currentParagraph.join("\n");
        // App StoreリンクまたはWebアプリリンクが単独で含まれている場合は独立したブロックとして表示
        const appStoreLinkRegex = /\[([^\]]*App Store[^\]]*)\]\(([^)]+apps\.apple\.com[^)]+)\)/;
        const webAppLinkRegex = /\[([^\]]*Webアプリ[^\]]*)\]\(([^)]+seibishi-quiz-web\.vercel\.app[^)]+)\)/;
        const appStoreMatch = paragraphText.match(appStoreLinkRegex);
        const webAppMatch = paragraphText.match(webAppLinkRegex);
        const match = appStoreMatch || webAppMatch;
        if (match) {
          // リンクの前のテキストがある場合は通常のパラグラフとして処理
          const beforeLink = paragraphText.substring(0, paragraphText.indexOf(match[0]));
          if (beforeLink.trim()) {
            elements.push(
              <p key={`p-${index}`} className="mb-4 leading-relaxed text-gray-700">
                {processLinks(beforeLink, `p-${index}`)}
              </p>
            );
          }
        // App StoreリンクまたはWebアプリリンクを独立したブロックとして表示
        elements.push(
          <div key={`appstore-${index}`} className="my-6 flex justify-center">
            {processAppStoreLink(match[1], match[2], `appstore-${index}`)}
          </div>
        );
          // リンクの後のテキストがある場合は通常のパラグラフとして処理
          const afterLink = paragraphText.substring(paragraphText.indexOf(match[0]) + match[0].length);
          if (afterLink.trim()) {
            elements.push(
              <p key={`p-${index}-after`} className="mb-4 leading-relaxed text-gray-700">
                {processLinks(afterLink, `p-${index}-after`)}
              </p>
            );
          }
        } else {
          elements.push(
            <p key={`p-${index}`} className="mb-4 leading-relaxed text-gray-700">
              {processLinks(paragraphText, `p-${index}`)}
            </p>
          );
        }
        currentParagraph = [];
      }
    } else if (trimmed.startsWith("|")) {
      // テーブル行
      if (currentParagraph.length > 0) {
        const paragraphText = currentParagraph.join("\n");
        elements.push(
          <p key={`p-${index}`} className="mb-4 leading-relaxed text-gray-700">
            {processLinks(paragraphText, `p-${index}`)}
          </p>
        );
        currentParagraph = [];
      }
      // テーブルの簡単な処理（完全な実装ではない）
      const cells = trimmed
        .split("|")
        .map((cell) => cell.trim())
        .filter((cell) => cell.length > 0);
      if (cells.length > 0 && !cells[0].match(/^[-: ]+$/)) {
        // ヘッダー行またはデータ行
        elements.push(
          <div key={`table-row-${index}`} className="flex gap-2 mb-1">
            {cells.map((cell, cellIndex) => (
              <div key={`table-row-${index}-cell-${cellIndex}`} className="flex-1 p-2 border border-gray-300">
                {processBold(cell, `table-row-${index}-cell-${cellIndex}`)}
              </div>
            ))}
          </div>
        );
      }
    } else {
      // App StoreリンクまたはWebアプリリンクが単独行にある場合は独立したブロックとして処理
      const appStoreLinkRegex = /^\[([^\]]*)\]\(([^)]+apps\.apple\.com[^)]+)\)$/;
      const webAppLinkRegex = /^\[([^\]]*)\]\(([^)]+seibishi-quiz-web\.vercel\.app[^)]+)\)$/;
      const appStoreMatch = trimmed.match(appStoreLinkRegex);
      const webAppMatch = trimmed.match(webAppLinkRegex);
      // より柔軟な検出
      const anyAppStoreLinkRegex = /\[([^\]]*)\]\(([^)]*apps\.apple\.com[^)]*)\)/;
      const anyWebAppLinkRegex = /\[([^\]]*)\]\(([^)]*seibishi-quiz-web\.vercel\.app[^)]*)\)/;
      const anyAppStoreMatch = trimmed.match(anyAppStoreLinkRegex);
      const anyWebAppMatch = trimmed.match(anyWebAppLinkRegex);
      if (appStoreMatch || anyAppStoreMatch || webAppMatch || anyWebAppMatch) {
        // 直前のパラグラフがある場合は処理
        if (currentParagraph.length > 0) {
          const paragraphText = currentParagraph.join("\n");
          elements.push(
            <p key={`p-${index}`} className="mb-4 leading-relaxed text-gray-700">
              {processLinks(paragraphText, `p-${index}`)}
            </p>
          );
          currentParagraph = [];
        }
        // App StoreリンクまたはWebアプリリンクを独立したブロックとして表示
        const match = appStoreMatch || anyAppStoreMatch || webAppMatch || anyWebAppMatch;
        if (match) {
          elements.push(
            <div key={`appstore-${index}`} className="my-6 flex justify-center">
              {processAppStoreLink(match[1] || "", match[2] || "", `appstore-${index}`)}
            </div>
          );
        }
      } else {
        currentParagraph.push(line);
      }
    }
  });

  if (currentParagraph.length > 0) {
    const paragraphText = currentParagraph.join("\n");
    // App StoreリンクまたはWebアプリリンクが単独で含まれている場合は独立したブロックとして表示
    const appStoreLinkRegex = /\[([^\]]*App Store[^\]]*)\]\(([^)]+apps\.apple\.com[^)]+)\)/;
    const webAppLinkRegex = /\[([^\]]*Webアプリ[^\]]*)\]\(([^)]+seibishi-quiz-web\.vercel\.app[^)]+)\)/;
    const appStoreMatch = paragraphText.match(appStoreLinkRegex);
    const webAppMatch = paragraphText.match(webAppLinkRegex);
    const match = appStoreMatch || webAppMatch;
    if (match) {
      // リンクの前のテキストがある場合は通常のパラグラフとして処理
      const beforeLink = paragraphText.substring(0, paragraphText.indexOf(match[0]));
      if (beforeLink.trim()) {
        elements.push(
          <p key="p-final-before" className="mb-4 leading-relaxed text-gray-700">
            {processLinks(beforeLink, "p-final-before")}
          </p>
        );
      }
      // App StoreリンクまたはWebアプリリンクを独立したブロックとして表示
      elements.push(
        <div key="appstore-final" className="my-6 flex justify-center">
          {processAppStoreLink(match[1], match[2], "appstore-final")}
        </div>
      );
      // リンクの後のテキストがある場合は通常のパラグラフとして処理
      const afterLink = paragraphText.substring(paragraphText.indexOf(match[0]) + match[0].length);
      if (afterLink.trim()) {
        elements.push(
          <p key="p-final-after" className="mb-4 leading-relaxed text-gray-700">
            {processLinks(afterLink, "p-final-after")}
          </p>
        );
      }
    } else {
      elements.push(
        <p key="p-final" className="mb-4 leading-relaxed text-gray-700">
          {processLinks(paragraphText, "p-final")}
        </p>
      );
    }
  }

  return <div>{elements}</div>;
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const relatedCerts = article.relatedCertIds
    .map((certId) => getCert(certId))
    .filter((cert): cert is NonNullable<typeof cert> => cert !== undefined);

  const relatedArticles = relatedCerts
    .flatMap((cert) => getArticlesByCert(cert.id))
    .filter((a) => a.id !== article.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* フローティング戻るボタン */}
      <BackButton variant="gradient" floating position="bottom-left" />
      
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="text-sm text-gray-600 mb-2 flex items-center">
            <BackButton variant="minimal" className="mr-4" />
            <span className="mx-2">|</span>
            <Link href="/" className="hover:text-gray-900">
              ホーム
            </Link>
            <span className="mx-2">/</span>
            <Link href="/certs" className="hover:text-gray-900">
              資格一覧
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{article.title}</span>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <article className="bg-white rounded-lg shadow-md p-6 md:p-8">
          {/* 記事ヘッダー */}
          <header className="mb-6">
            <div className="flex flex-wrap gap-2 mb-4">
              {relatedCerts.map((cert) => (
                <Link
                  key={cert.id}
                  href={`/certs/${cert.slug}`}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium hover:bg-blue-200"
                >
                  {cert.name}
                </Link>
              ))}
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {article.title}
            </h1>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              {article.author && (
                <span className="font-medium">著者: {article.author}</span>
              )}
              <time dateTime={article.publishedAt.toISOString()}>
                {article.publishedAt.toLocaleDateString("ja-JP", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              {article.updatedAt.getTime() !== article.publishedAt.getTime() && (
                <time dateTime={article.updatedAt.toISOString()}>
                  （更新:{" "}
                  {article.updatedAt.toLocaleDateString("ja-JP", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                  ）
                </time>
              )}
            </div>
          </header>

          {/* アイキャッチ画像 */}
          {article.featuredImageUrl && (
            <div className="mb-6">
              <img
                src={article.featuredImageUrl}
                alt={article.title}
                className="w-full h-auto rounded-lg"
              />
            </div>
          )}

          {/* 記事本文 */}
          <div className="prose max-w-none">
            {renderMarkdown(article.content)}
          </div>
        </article>

        {/* 関連記事 */}
        {relatedArticles.length > 0 && (
          <section className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              関連記事
            </h2>
            <div className="space-y-4">
              {relatedArticles.map((relatedArticle) => (
                <Link
                  key={relatedArticle.id}
                  href={`/articles/${relatedArticle.slug}`}
                  className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {relatedArticle.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{relatedArticle.excerpt}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* CTA: 関連資格ページへのリンク */}
        {relatedCerts.length > 0 && (
          <section className="mt-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg shadow-lg p-6 text-white">
            <h2 className="text-xl font-semibold mb-3">
              {relatedCerts[0].name}の学習を始める
            </h2>
            <p className="text-blue-100 mb-4">
              過去問解説や勉強方法など、{relatedCerts[0].name}の学習に役立つ情報をまとめています。
            </p>
            <Link
              href={`/certs/${relatedCerts[0].slug}`}
              className="inline-block px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-semibold"
            >
              {relatedCerts[0].name}の詳細を見る →
            </Link>
          </section>
        )}
      </main>
    </div>
  );
}

