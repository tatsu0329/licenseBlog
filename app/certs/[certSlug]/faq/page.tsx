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

          {/* 関連リンク */}
          <section className="bg-white rounded-lg shadow-md p-6 mt-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">関連リンク</h2>
            <div className="space-y-3">
              <Link
                href={`/certs/${cert.slug}/study`}
                className="block p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors"
              >
                <span className="text-blue-600 hover:text-blue-800">
                  {cert.shortName}の勉強法を見る →
                </span>
              </Link>
              <Link
                href={`/certs/${cert.slug}/kakomon`}
                className="block p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors"
              >
                <span className="text-blue-600 hover:text-blue-800">
                  {cert.shortName}の過去問解説を見る →
                </span>
              </Link>
              <Link
                href={`/certs/${cert.slug}`}
                className="block p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors"
              >
                <span className="text-blue-600 hover:text-blue-800">
                  ← {cert.shortName}のトップページに戻る
                </span>
              </Link>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}

