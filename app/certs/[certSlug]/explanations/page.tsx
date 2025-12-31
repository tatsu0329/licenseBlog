import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCert } from "@/lib/data/certs";
import { getExplanationsByCert } from "@/lib/data/explanations";
import { getQuestionByIdFromExplanations } from "@/lib/data/explanations";
import { getCategoriesByCert } from "@/lib/data/categories";
import { formatExamPeriod, formatYearForFilter } from "@/lib/utils/date";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ certSlug: string }>;
}): Promise<Metadata> {
  const { certSlug } = await params;
  const cert = getCert(certSlug);

  if (!cert) {
    return {
      title: "解説集が見つかりません",
    };
  }

  return {
    title: `${cert.shortName} 過去問解説集 | ${cert.name}`,
    description: `${cert.shortName}の過去問解説集です。各問題の詳細な解説を確認できます。`,
  };
}

export default async function ExplanationsPage({
  params,
  searchParams,
}: {
  params: Promise<{ certSlug: string }>;
  searchParams: Promise<{ year?: string; category?: string; season?: string }>;
}) {
  const { certSlug } = await params;
  const { year, category, season } = await searchParams;
  const cert = getCert(certSlug);

  if (!cert) {
    notFound();
  }

  // 解説を取得
  let explanations = getExplanationsByCert(cert.id);
  const categories = getCategoriesByCert(cert.id);

  // フィルター適用
  if (year) {
    explanations = explanations.filter((exp) => {
      const parts = exp.questionId.split("-");
      if (parts.length < 5) return false;
      const expYear = parts[parts.length - 3];
      return expYear === year;
    });
  }
  if (category) {
    const categoryData = categories.find((c) => c.slug === category);
    if (categoryData) {
      explanations = explanations.filter((exp) => {
        const question = getQuestionByIdFromExplanations(exp.questionId);
        return question?.categoryId === categoryData.id;
      });
    }
  }
  if (season) {
    explanations = explanations.filter((exp) => {
      const parts = exp.questionId.split("-");
      if (parts.length < 5) return false;
      const expSeason = parts[parts.length - 2];
      return expSeason === season;
    });
  }

  // 年度のリストを取得
  const years = Array.from(
    new Set(
      getExplanationsByCert(cert.id).map((exp) => {
        const parts = exp.questionId.split("-");
        if (parts.length < 5) return null;
        return parseInt(parts[parts.length - 3]);
      })
    )
  )
    .filter((y) => y !== null)
    .sort((a, b) => (b || 0) - (a || 0)) as number[];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
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
            <span>解説集</span>
          </nav>
          <h1 className="text-2xl font-bold text-gray-900">
            {cert.shortName} 過去問解説集
          </h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* アプリCTA（解説集ページのヘッダー下） */}
        <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-lg shadow-lg p-4 md:p-6 mb-6 text-white">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h2 className="text-lg md:text-xl font-bold mb-2">
                📱 解説をアプリで効率的に学習
              </h2>
              <p className="text-green-100 text-sm">
                スキマ時間で繰り返し解ける。学習進捗・弱点も自動記録
              </p>
            </div>
            <Link
              href={certSlug === "auto-mechanic-1" ? "/articles/auto-mechanic-1-app-introduction" : "/articles"}
              className="px-6 py-3 bg-white text-green-600 rounded-lg hover:bg-green-50 transition-colors font-semibold whitespace-nowrap"
            >
              アプリを見る →
            </Link>
          </div>
        </div>

        {/* フィルター */}
        <section className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            絞り込み検索
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* 年度別 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                年度
              </label>
              <div className="flex flex-wrap gap-2">
                <Link
                  href={`/certs/${cert.slug}/explanations${category ? `?category=${category}` : season ? `?season=${season}` : ""}`}
                  className={`px-3 py-1 rounded ${
                    !year
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  すべて
                </Link>
                {years.map((y) => (
                  <Link
                    key={y}
                    href={`/certs/${cert.slug}/explanations?year=${y}${category ? `&category=${category}` : ""}${season ? `&season=${season}` : ""}`}
                    className={`px-3 py-1 rounded ${
                      year === String(y)
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                    title={`${y}年（${formatYearForFilter(y)}）`}
                  >
                    {formatYearForFilter(y)}
                  </Link>
                ))}
              </div>
            </div>

            {/* 分野別 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                分野
              </label>
              <div className="flex flex-wrap gap-2">
                <Link
                  href={`/certs/${cert.slug}/explanations${year ? `?year=${year}` : season ? `?season=${season}` : ""}`}
                  className={`px-3 py-1 rounded ${
                    !category
                      ? "bg-green-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  すべて
                </Link>
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/certs/${cert.slug}/explanations?category=${cat.slug}${year ? `&year=${year}` : ""}${season ? `&season=${season}` : ""}`}
                    className={`px-3 py-1 rounded ${
                      category === cat.slug
                        ? "bg-green-500 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* 回次 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                回次
              </label>
              <div className="flex flex-wrap gap-2">
                <Link
                  href={`/certs/${cert.slug}/explanations${year ? `?year=${year}` : category ? `?category=${category}` : ""}`}
                  className={`px-3 py-1 rounded ${
                    !season
                      ? "bg-purple-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  すべて
                </Link>
                <Link
                  href={`/certs/${cert.slug}/explanations?season=1${year ? `&year=${year}` : ""}${category ? `&category=${category}` : ""}`}
                  className={`px-3 py-1 rounded ${
                    season === "1"
                      ? "bg-purple-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                  title="第1回"
                >
                  第1回
                </Link>
                <Link
                  href={`/certs/${cert.slug}/explanations?season=2${year ? `&year=${year}` : ""}${category ? `&category=${category}` : ""}`}
                  className={`px-3 py-1 rounded ${
                    season === "2"
                      ? "bg-purple-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                  title="第2回"
                >
                  第2回
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 解説一覧 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              解説一覧（{explanations.length}問）
            </h2>
            {(year || category || season) && (
              <Link
                href={`/certs/${cert.slug}/explanations`}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                フィルターを解除
              </Link>
            )}
          </div>
          {explanations.length === 0 ? (
            <p className="text-gray-600">解説がまだ登録されていません。</p>
          ) : (
            <ul className="space-y-4">
              {explanations
                .sort((a, b) => {
                  // questionIdから年度・回次・問題番号を抽出してソート
                  const partsA = a.questionId.split("-");
                  const partsB = b.questionId.split("-");
                  if (partsA.length < 5 || partsB.length < 5) return 0;

                  const yearA = parseInt(partsA[partsA.length - 3]);
                  const yearB = parseInt(partsB[partsB.length - 3]);
                  if (yearA !== yearB) return yearB - yearA;

                  const seasonA = parseInt(partsA[partsA.length - 2]);
                  const seasonB = parseInt(partsB[partsB.length - 2]);
                  if (seasonA !== seasonB) return seasonB - seasonA;

                  return parseInt(a.questionNumber) - parseInt(b.questionNumber);
                })
                .map((exp) => {
                  const question = getQuestionByIdFromExplanations(exp.questionId);
                  if (!question) return null;

                  const parts = exp.questionId.split("-");
                  if (parts.length < 5) return null;
                  const year = parts[parts.length - 3];
                  const season = parts[parts.length - 2];

                  return (
                    <li key={exp.questionId}>
                      <Link
                        href={`/certs/${cert.slug}/explanations/${year}/${season}/${question.categoryId}/${exp.questionId}`}
                        className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-sm text-gray-500">
                              {formatExamPeriod(question.year, question.season)} 問題{question.questionNumber}
                            </span>
                            <h3 className="text-gray-900 font-medium mt-1">
                              {(() => {
                                const displayText = question.questionSummary || question.questionText || question.questionTheme || "問題";
                                return (
                                  <>
                                    {displayText.substring(0, 100)}
                                    {displayText.length > 100 && "..."}
                                  </>
                                );
                              })()}
                            </h3>
                          </div>
                          <span className="text-blue-600">詳細を見る →</span>
                        </div>
                      </Link>
                    </li>
                  );
                })}
            </ul>
          )}
        </div>

        {/* アプリCTA（解説一覧の最後） */}
        {explanations.length > 0 && (
          <div className="bg-gradient-to-r from-blue-500 to-green-500 rounded-lg shadow-lg p-6 mt-6 text-white text-center">
            <h3 className="text-xl font-bold mb-2">
              📱 解説をアプリで効率的に学習
            </h3>
            <p className="text-blue-100 mb-4 max-w-2xl mx-auto">
              スキマ時間で繰り返し解ける。学習進捗や弱点を自動で分析。
              無料で10問まで試せます。
            </p>
            <Link
              href={certSlug === "auto-mechanic-1" ? "/articles/auto-mechanic-1-app-introduction" : "/articles"}
              className="inline-block px-8 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-bold text-lg"
            >
              アプリ詳細を見る →
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
