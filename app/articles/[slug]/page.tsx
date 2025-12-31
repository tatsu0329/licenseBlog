import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticleBySlug, getArticlesByCert } from "@/lib/data/articles";
import { getCert } from "@/lib/data/certs";
import { Metadata } from "next";

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
        elements.push(
          <p key={`p-${index}`} className="mb-4 leading-relaxed text-gray-700">
            {currentParagraph.join("\n")}
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
        elements.push(
          <p key={`p-${index}`} className="mb-4 leading-relaxed text-gray-700">
            {currentParagraph.join("\n")}
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
        elements.push(
          <p key={`p-${index}`} className="mb-4 leading-relaxed text-gray-700">
            {currentParagraph.join("\n")}
          </p>
        );
        currentParagraph = [];
      }
      elements.push(
        <h3 key={`h3-${index}`} className="text-xl font-semibold text-gray-900 mt-4 mb-2">
          {trimmed.substring(4)}
        </h3>
      );
    } else if (trimmed === "") {
      // 空行
      if (currentParagraph.length > 0) {
        elements.push(
          <p key={`p-${index}`} className="mb-4 leading-relaxed text-gray-700">
            {currentParagraph.join("\n")}
          </p>
        );
        currentParagraph = [];
      }
    } else if (trimmed.startsWith("|")) {
      // テーブル行
      if (currentParagraph.length > 0) {
        elements.push(
          <p key={`p-${index}`} className="mb-4 leading-relaxed text-gray-700">
            {currentParagraph.join("\n")}
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
              <div key={cellIndex} className="flex-1 p-2 border border-gray-300">
                {cell}
              </div>
            ))}
          </div>
        );
      }
    } else {
      currentParagraph.push(line);
    }
  });

  if (currentParagraph.length > 0) {
    elements.push(
      <p key="p-final" className="mb-4 leading-relaxed text-gray-700">
        {currentParagraph.join("\n")}
      </p>
    );
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
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="text-sm text-gray-600 mb-2">
            <Link href="/" className="hover:text-gray-900">
              ホーム
            </Link>
            <span className="mx-2">/</span>
            <Link href="/articles" className="hover:text-gray-900">
              記事一覧
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

