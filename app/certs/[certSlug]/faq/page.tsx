import Link from "next/link";
import { Metadata } from "next";
import { getCert } from "@/lib/data/certs";
import { getFAQsByCert } from "@/lib/data/faqs";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ certSlug: string }>;
}): Promise<Metadata> {
  const { certSlug } = await params;
  const cert = getCert(certSlug);

  if (!cert) {
    return {
      title: "FAQが見つかりません",
    };
  }

  return {
    title: `${cert.shortName} よくある質問（FAQ）`,
    description: `${cert.shortName}に関するよくある質問と回答をご紹介します。`,
    alternates: {
      canonical: `/certs/${certSlug}/faq`,
    },
  };
}

export default async function FAQPage({
  params,
}: {
  params: Promise<{ certSlug: string }>;
}) {
  const { certSlug } = await params;
  const cert = getCert(certSlug);
  const faqs = cert ? getFAQsByCert(cert.id) : [];

  if (!cert) {
    return <div>資格が見つかりません</div>;
  }

  // 構造化データ（FAQPage）
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  // カテゴリ別にFAQを分類
  const faqsByCategory = faqs.reduce((acc, faq) => {
    const category = faq.category || "その他";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(faq);
    return acc;
  }, {} as Record<string, typeof faqs>);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <nav className="text-sm text-gray-600 mb-2">
              <Link href="/" className="hover:text-gray-900">
                ホーム
              </Link>
              <span className="mx-2">/</span>
              <Link href="/certs" className="hover:text-gray-900">
                資格一覧
              </Link>
              <span className="mx-2">/</span>
              <Link href={`/certs/${cert.slug}`} className="hover:text-gray-900">
                {cert.shortName}
              </Link>
              <span className="mx-2">/</span>
              <span>よくある質問</span>
            </nav>
            <h1 className="text-2xl font-bold text-gray-900">
              {cert.shortName} よくある質問（FAQ）
            </h1>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* 軽いCTA */}
          <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-700 mb-2">
              💡 {cert.shortName}の学習を始めるなら、まずは学習ロードマップを確認しましょう。
            </p>
            <Link
              href={`/certs/${cert.slug}/study`}
              className="text-blue-600 hover:text-blue-800 font-semibold text-sm"
            >
              勉強ロードマップを見る →
            </Link>
          </div>

          {faqs.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-6">
              <p className="text-gray-600">よくある質問がまだ登録されていません。</p>
            </div>
          ) : (
            <div className="space-y-8">
              {Object.entries(faqsByCategory).map(([category, categoryFaqs]) => (
                <section key={category} className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b pb-2">
                    {category}
                  </h2>
                  <div className="space-y-6">
                    {categoryFaqs.map((faq) => (
                      <div key={faq.id} className="border-b last:border-b-0 pb-4 last:pb-0">
                        <h3 className="font-semibold text-gray-900 mb-2 text-lg">
                          Q. {faq.question}
                        </h3>
                        <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                          <p className="font-medium text-gray-900 mb-1">A.</p>
                          <p>{faq.answer}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          )}

          {/* 関連リンク（収益性向上） */}
          <section className="bg-white rounded-lg shadow-md p-6 mt-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              関連コンテンツ
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link
                href={`/certs/${cert.slug}/study`}
                className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <h3 className="font-semibold text-gray-900 mb-1">
                  📚 勉強ロードマップ
                </h3>
                <p className="text-sm text-gray-600">
                  効率的な学習方法を確認
                </p>
              </Link>
              <Link
                href={`/certs/${cert.slug}/kakomon`}
                className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
              >
                <h3 className="font-semibold text-gray-900 mb-1">
                  📝 過去問解説
                </h3>
                <p className="text-sm text-gray-600">
                  過去問で実力を確認
                </p>
              </Link>
              <Link
                href={certSlug === "auto-mechanic-1" ? "/articles/auto-mechanic-1-app-introduction" : "/articles"}
                className="p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
              >
                <h3 className="font-semibold text-gray-900 mb-1">
                  📱 学習アプリ
                </h3>
                <p className="text-sm text-gray-600">
                  スキマ時間で効率的に学習
                </p>
              </Link>
              <Link
                href={`/certs/${cert.slug}`}
                className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <h3 className="font-semibold text-gray-900 mb-1">
                  🏠 トップページ
                </h3>
                <p className="text-sm text-gray-600">
                  {cert.shortName}の総合情報
                </p>
              </Link>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}

