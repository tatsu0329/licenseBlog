import Link from "next/link";
import { getPublishedArticles, getAllArticles } from "@/lib/data/articles";
import { getCert } from "@/lib/data/certs";

export const metadata = {
  title: "記事一覧 | ライセンスブログ",
  description: "資格試験に関する記事一覧",
};

export default async function ArticlesPage() {
  const articles = getPublishedArticles();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="text-sm text-gray-600 mb-2">
            <Link href="/" className="hover:text-gray-900">
              ホーム
            </Link>
            <span className="mx-2">/</span>
            <span>記事一覧</span>
          </nav>
          <h1 className="text-2xl font-bold text-gray-900">記事一覧</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {articles.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-600">記事はまだありません。</p>
          </div>
        ) : (
          <div className="space-y-6">
            {articles.map((article) => {
              const certs = article.relatedCertIds
                .map((certId) => {
                  const cert = getCert(certId);
                  return cert ? { id: certId, name: cert.name, slug: cert.slug } : null;
                })
                .filter((c): c is NonNullable<typeof c> => c !== null);

              return (
                <article
                  key={article.id}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6"
                >
                  <div className="flex flex-col md:flex-row md:items-start gap-4">
                    {article.featuredImageUrl && (
                      <div className="md:w-48 md:flex-shrink-0">
                        <img
                          src={article.featuredImageUrl}
                          alt={article.title}
                          className="w-full h-48 object-cover rounded-lg"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="flex flex-wrap gap-2 mb-2">
                        {certs.map((cert) => (
                          <Link
                            key={cert.id}
                            href={`/certs/${cert.slug}`}
                            className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium hover:bg-blue-200"
                          >
                            {cert.name}
                          </Link>
                        ))}
                        {article.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h2 className="text-xl font-semibold text-gray-900 mb-2">
                        <Link
                          href={`/articles/${article.slug}`}
                          className="hover:text-blue-600 transition-colors"
                        >
                          {article.title}
                        </Link>
                      </h2>
                      <p className="text-gray-600 mb-4">{article.excerpt}</p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center gap-4">
                          {article.author && (
                            <span>著者: {article.author}</span>
                          )}
                          <time dateTime={article.publishedAt.toISOString()}>
                            {article.publishedAt.toLocaleDateString("ja-JP", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </time>
                        </div>
                        <Link
                          href={`/articles/${article.slug}`}
                          className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                          続きを読む →
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}


