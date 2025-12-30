import Link from "next/link";
import { Metadata } from "next";
import { getQuestion } from "@/lib/data/questions";
import { getCert } from "@/lib/data/certs";
import { getCategory } from "@/lib/data/categories";

// 動的メタデータ生成
export async function generateMetadata({
  params,
}: {
  params: Promise<{ certSlug: string; year: string; season: string; category: string; qid: string }>;
}): Promise<Metadata> {
  const { certSlug, year, season, category, qid } = await params;
  const question = getQuestion(qid);
  const cert = getCert(certSlug);

  if (!question || !cert) {
    return {
      title: "問題が見つかりません",
    };
  }

  return {
    title: `${cert.shortName} ${year}年${season === "1" ? "春期" : "秋期"} 過去問解説 ${question.questionNumber}`,
    description: `${question.questionText.substring(0, 100)}... 正解と解説はこちら`,
    alternates: {
      canonical: `/certs/${certSlug}/kakomon/${year}/${season}/${category}/${qid}`,
    },
  };
}

export default async function QuestionPage({
  params,
}: {
  params: Promise<{ certSlug: string; year: string; season: string; category: string; qid: string }>;
}) {
  const { certSlug, year, season, category: categorySlug, qid } = await params;
  const question = getQuestion(qid);
  const cert = getCert(certSlug);
  const category = question ? getCategory(question.categoryId) : null;

  if (!question || !cert) {
    return <div>問題が見つかりません</div>;
  }

  const seasonName = season === "1" ? "春期" : "秋期";

  // 構造化データ（JSON-LD）
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Question",
    name: question.questionText,
    text: question.questionText,
    acceptedAnswer: {
      "@type": "Answer",
      text: question.explanation,
    },
    dateCreated: question.publishedAt.toISOString(),
    author: {
      "@type": "Organization",
      name: "国家資格メディア",
    },
  };

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
              <Link
                href={`/certs/${cert.slug}/kakomon`}
                className="hover:text-gray-900"
              >
                過去問
              </Link>
              <span className="mx-2">/</span>
              <span>{year}年{seasonName}</span>
              <span className="mx-2">/</span>
              <span>{category?.name || categorySlug}</span>
              <span className="mx-2">/</span>
              <span>問題{question.questionNumber}</span>
            </nav>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* 問題ヘッダー */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded">
                {year}年 {seasonName}
              </span>
              <span className="px-3 py-1 bg-gray-100 text-gray-800 text-sm font-medium rounded">
                {category?.name || categorySlug}
              </span>
              <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded">
                問題{question.questionNumber}
              </span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              {cert.shortName} {year}年{seasonName} {category?.name || categorySlug}{" "}
              問題{question.questionNumber} 過去問解説
            </h1>
          </div>

          {/* 問題セクション */}
          <section className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">問題文</h2>

            {/* 出典表示（目立つ位置） */}
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
              <p className="text-sm font-medium text-gray-900 mb-2">
                【出典】
              </p>
              <p className="text-sm text-gray-700">{question.source}</p>
              {question.officialPastQuestionUrl && (
                <p className="text-sm text-gray-600 mt-2">
                  <a
                    href={question.officialPastQuestionUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline"
                  >
                    → 正式な過去問は公式サイトでご確認ください
                  </a>
                </p>
              )}
            </div>

            {/* 問題文（引用形式） */}
            <blockquote className="border-l-4 border-gray-300 pl-4 py-2 mb-4 italic text-gray-700">
              {question.questionText || question.questionTheme}
            </blockquote>

            {/* 選択肢 */}
            <h3 className="text-lg font-semibold text-gray-900 mb-3 mt-6">
              選択肢
            </h3>
            <ul className="space-y-2">
              {question.choices.map((choice) => (
                <li
                  key={choice.number}
                  className="flex items-start gap-3 p-3 bg-gray-50 rounded"
                >
                  <span className="font-semibold text-gray-900 min-w-[2rem]">
                    {choice.number}.
                  </span>
                  <span className="text-gray-700">{choice.text}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* 正解・解説セクション */}
          <section className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">正解</h2>
            <div className="bg-green-100 border-l-4 border-green-500 p-4 mb-6">
              <p className="text-xl font-bold text-green-800">
                正解: {question.correctAnswer}
              </p>
            </div>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">解説</h2>
            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {question.explanation}
              </p>
              {question.explanationDetail && (
                <div className="mt-4 prose prose-sm max-w-none">
                  <div className="text-gray-700 whitespace-pre-line">
                    {question.explanationDetail}
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* 出典・免責セクション（重要） */}
          <section className="bg-white rounded-lg shadow-md p-6 mb-6 border-2 border-yellow-300">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              出典・免責事項
            </h2>

            <div className="space-y-4 text-sm text-gray-700">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">出典情報</h3>
                <p>{question.source}</p>
                {question.sourceUrl && (
                  <p className="mt-2">
                    <a
                      href={question.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      公式サイトへ
                    </a>
                  </p>
                )}
              </div>

              <div className="border-t pt-4">
                <h3 className="font-semibold text-gray-900 mb-2">免責事項</h3>
                <p className="leading-relaxed">
                  本サイトに掲載されている過去問は、試験実施団体が公開している情報を参考に作成した解説コンテンツです。問題文は要約・部分引用の形式で掲載しています。問題文の正確性については保証いたしません。正式な過去問については、各試験実施団体の公式サイトまたは公式過去問題集をご確認ください。
                </p>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-semibold text-gray-900 mb-2">利用規約</h3>
                <p className="leading-relaxed">
                  本サイトの過去問解説は、学習目的での個人利用に限ります。無断転載・複製を禁じます。
                </p>
                <p className="mt-2">
                  <Link
                    href="/disclaimer"
                    className="text-blue-600 hover:text-blue-800 underline"
                  >
                    詳細な免責事項はこちら
                  </Link>
                </p>
              </div>

              {question.officialPastQuestionUrl && (
                <div className="bg-blue-50 border border-blue-200 rounded p-4 mt-4">
                  <p className="font-semibold text-blue-900 mb-2">
                    正式な過去問について
                  </p>
                  <p className="text-blue-800 text-sm mb-3">
                    正確な問題文や詳細な解説については、公式過去問集のご利用をお勧めします。
                  </p>
                  <a
                    href={question.officialPastQuestionUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                  >
                    公式過去問集を見る →
                  </a>
                </div>
              )}
            </div>
          </section>

          {/* 関連コンテンツ */}
          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              関連コンテンツ
            </h2>
            <div className="space-y-3">
              <Link
                href={`/certs/${cert.slug}/kakomon`}
                className="block p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors"
              >
                <span className="text-blue-600 hover:text-blue-800">
                  ← {cert.shortName}の過去問一覧に戻る
                </span>
              </Link>
              <Link
                href={`/certs/${cert.slug}/study`}
                className="block p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors"
              >
                <span className="text-blue-600 hover:text-blue-800">
                  {cert.shortName}の勉強法を見る →
                </span>
              </Link>
            </div>
          </section>
        </main>

        <footer className="bg-white border-t mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <p className="text-sm text-gray-600 text-center">
              © 2024 国家資格メディア. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}

