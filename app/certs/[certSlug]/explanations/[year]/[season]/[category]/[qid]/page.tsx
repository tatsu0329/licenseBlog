import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { getQuestionByIdFromExplanations, getExplanationByQuestionId } from "@/lib/data/explanations";
import { getCert } from "@/lib/data/certs";
import { getCategory } from "@/lib/data/categories";
import QuestionImage from "@/components/images/QuestionImage";
import QuestionExplanation from "@/components/QuestionExplanation";
import { formatExamPeriod, formatExamPeriodDetailed } from "@/lib/utils/date";
import { notFound } from "next/navigation";

// 動的メタデータ生成
export async function generateMetadata({
  params,
}: {
  params: Promise<{ certSlug: string; year: string; season: string; category: string; qid: string }>;
}): Promise<Metadata> {
  const { certSlug, year, season, category, qid } = await params;
  // 解説集から問題データと解説データを取得
  const question = getQuestionByIdFromExplanations(qid);
  const cert = getCert(certSlug);
  const explanation = getExplanationByQuestionId(qid);

  if (!question || !cert || !explanation) {
    return {
      title: "解説が見つかりません",
    };
  }

  const seasonNum = parseInt(season) as 1 | 2;
  const yearNum = parseInt(year);
  const examPeriod = formatExamPeriod(yearNum, seasonNum);

  const questionDisplayText = question.questionSummary || question.questionText || question.questionTheme || "問題";
  
  return {
    title: `${cert.shortName} ${examPeriod} 過去問解説 ${question.questionNumber}`,
    description: `${questionDisplayText.substring(0, 100)}... 正解と解説はこちら`,
    alternates: {
      canonical: `/certs/${certSlug}/explanations/${year}/${season}/${category}/${qid}`,
    },
  };
}

export default async function ExplanationPage({
  params,
}: {
  params: Promise<{ certSlug: string; year: string; season: string; category: string; qid: string }>;
}) {
  const { certSlug, year, season, category: categorySlug, qid } = await params;
  // 解説集から問題データと解説データの両方を取得
  const question = getQuestionByIdFromExplanations(qid);
  const cert = getCert(certSlug);
  const category = question ? getCategory(question.categoryId) : null;
  const explanation = getExplanationByQuestionId(qid);

  // 問題データと解説データの両方が必要
  if (!question || !cert || !explanation) {
    notFound();
  }

  const seasonNum = parseInt(season) as 1 | 2;
  const yearNum = parseInt(year);
  const examPeriod = formatExamPeriod(yearNum, seasonNum);
  const examPeriodDetailed = formatExamPeriodDetailed(yearNum, seasonNum);

  // 構造化データ（JSON-LD）
  const questionDisplayText = question.questionSummary || question.questionText || question.questionTheme || "問題";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Question",
    name: questionDisplayText,
    text: questionDisplayText,
    acceptedAnswer: {
      "@type": "Answer",
      text: explanation.explanation,
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
              <Link href={`/certs/${cert.slug}/kakomon`} className="hover:text-gray-900">
                過去問
              </Link>
              <span className="mx-2">/</span>
              <span>解説</span>
            </nav>
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded">
                {examPeriod}
              </span>
              <span className="px-3 py-1 bg-gray-100 text-gray-800 text-sm font-medium rounded">
                {category?.name || categorySlug}
              </span>
              <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded">
                問題{question.questionNumber}
              </span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              {cert.shortName} {examPeriodDetailed} {category?.name || categorySlug}{" "}
              問題{question.questionNumber} 過去問解説
            </h1>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* 問題セクション */}
          <section className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">問題</h2>
            <div className="prose max-w-none">
              {question.officialPastQuestionUrl && (
                <p className="text-xs text-gray-500 mb-4">
                  本サイトに掲載されている問題文は要約・部分引用の形式です。
                  <a
                    href={question.officialPastQuestionUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline ml-1"
                  >
                    → 正式な過去問は公式サイトでご確認ください
                  </a>
                </p>
              )}

              {/* アプリCTA（強 - 問題文の直下） */}
              <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-lg shadow-lg p-4 mb-4 text-white">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold mb-1">
                      📱 この問題をアプリで解く
                    </p>
                    <p className="text-sm text-green-100">
                      スキマ時間で繰り返し演習できます
                    </p>
                  </div>
                  <Link
                    href={certSlug === "auto-mechanic-1" ? "/articles/auto-mechanic-1-app-introduction" : "/articles"}
                    className="px-5 py-2 bg-white text-green-600 rounded-lg hover:bg-green-50 transition-colors font-semibold whitespace-nowrap"
                  >
                    アプリを見る →
                  </Link>
                </div>
              </div>

              {/* 問題文（引用形式） */}
              <blockquote className="border-l-4 border-gray-300 pl-4 py-2 mb-4 italic text-gray-700">
                {question.questionSummary || question.questionText || question.questionTheme || "問題"}
              </blockquote>

              {/* 問題文の画像（過去問集から取得） */}
              {question.explanationImages && question.explanationImages.length > 0 && (
                <div className="mt-4 mb-4 space-y-4">
                  {question.explanationImages.map((imageUrl, index) => (
                    <QuestionImage
                      key={imageUrl}
                      src={imageUrl}
                      alt={`問題図 ${index + 1}`}
                      caption={`図${index + 1}: 問題図`}
                    />
                  ))}
                </div>
              )}

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
            </div>
          </section>

          {/* 正解・解説セクション */}
          <section className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">正解</h2>
            <div className="bg-green-100 border-l-4 border-green-500 p-4 mb-6">
              <p className="text-xl font-bold text-green-800">
                正解: {question.correctAnswer}
              </p>
            </div>

            {/* 解説セクション */}
            <h2 className="text-xl font-semibold text-gray-900 mb-4">解説</h2>
            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {explanation.explanation}
              </p>
              
              {/* 解説画像 */}
              {explanation.explanationImages && explanation.explanationImages.length > 0 && (
                <div className="mt-6 space-y-4">
                  {explanation.explanationImages.map((imageUrl, index) => (
                    <QuestionImage
                      key={imageUrl}
                      src={imageUrl}
                      alt={`解説図 ${index + 1}`}
                      caption={`図${index + 1}: 解説図`}
                    />
                  ))}
                </div>
              )}

              {/* 解説詳細（Markdown形式） */}
              {explanation.explanationDetail && explanation.explanationDetail.trim().length > 0 && (
                <QuestionExplanation explanationDetail={explanation.explanationDetail} />
              )}
            </div>

            {/* アプリCTA（中 - 解説の下） */}
            <div className="mt-6 bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <p className="font-semibold text-gray-900 mb-1">
                    📱 関連問題をアプリでまとめて演習
                  </p>
                  <p className="text-sm text-gray-600">
                    同じ分野の問題をまとめて解いて知識を定着させましょう
                  </p>
                </div>
                <Link
                  href={certSlug === "auto-mechanic-1" ? "/articles/auto-mechanic-1-app-introduction" : "/articles"}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold whitespace-nowrap text-sm"
                >
                  アプリで演習 →
                </Link>
              </div>
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
                <p className="mb-2">{question.source}</p>
                {question.sourceUrl && (
                  <p>
                    <a
                      href={question.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      公式サイト
                    </a>
                  </p>
                )}
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">免責事項</h3>
                <p className="mb-2">
                  本サイトに掲載されている過去問は、試験実施団体が公開している情報を参考に作成した解説コンテンツです。問題文は要約・部分引用の形式で掲載しています。問題文の正確性については保証いたしません。正式な過去問については、各試験実施団体の公式サイトまたは公式過去問題集をご確認ください。
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">著作権について</h3>
                <p className="mb-2">
                  本サイトの過去問解説は、学習目的での個人利用に限ります。無断転載・複製を禁じます。
                </p>
                <p className="text-xs text-gray-600">
                  詳細は{" "}
                  <Link
                    href="/disclaimer"
                    className="text-blue-600 hover:text-blue-800 underline"
                  >
                    免責事項ページ
                  </Link>
                  をご覧ください。
                </p>
              </div>
            </div>
          </section>

          {/* 関連リンク */}
          <section className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              関連リンク
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link
                href={`/certs/${cert.slug}/kakomon/${question.year}/${question.season}/${question.categoryId}/${question.id}`}
                className="p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors"
              >
                <span className="text-sm text-gray-600">
                  ← {cert.shortName}の過去問（問題と正解のみ）
                </span>
              </Link>
              <Link
                href={`/certs/${cert.slug}/kakomon`}
                className="block p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors"
              >
                <span className="text-sm text-gray-600">
                  ← {cert.shortName}の過去問一覧
                </span>
              </Link>
              <Link
                href={`/certs/${cert.slug}`}
                className="block p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors"
              >
                <span className="text-sm text-gray-600">
                  ← {cert.shortName}のトップページ
                </span>
              </Link>
              {question.officialPastQuestionUrl && (
                <a
                  href={question.officialPastQuestionUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors"
                >
                  <span className="text-sm text-gray-600">
                    → 公式過去問集
                  </span>
                </a>
              )}
            </div>
          </section>

          {/* 補足情報 */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded text-sm text-gray-700">
            <p>
              <strong>注意:</strong> 本ページは解説集です。問題文・選択肢・正解については過去問集ページをご確認ください。
              <br />
              正確な問題文や詳細な解説については、公式過去問集のご利用をお勧めします。
            </p>
          </div>
        </main>
      </div>
    </>
  );
}

