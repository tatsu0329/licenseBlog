import Link from "next/link";
import { getCert } from "@/lib/data/certs";
import { getQuestionsByCert } from "@/lib/data/questions";
import { getCategoriesByCert } from "@/lib/data/categories";
import { formatExamPeriod } from "@/lib/utils/date";
import BackButton from "@/components/BackButton";

export default async function KakomonPage({
  params,
  searchParams,
}: {
  params: Promise<{ certSlug: string }>;
  searchParams: Promise<{
    examPeriod?: string;
    category?: string;
    fuelType?: string;
  }>;
}) {
  const { certSlug } = await params;
  const { examPeriod, category, fuelType } = await searchParams;

  // examPeriodから年度と回次を抽出（形式: "2025-1" または "2025-2"）
  const [year, season] = examPeriod
    ? examPeriod.split("-").map(Number)
    : [null, null];
  const cert = getCert(certSlug);

  if (!cert) {
    return <div>資格が見つかりません</div>;
  }

  // 全問題を取得（フィルター適用前）
  const allQuestions = getQuestionsByCert(cert.id);
  const categories = getCategoriesByCert(cert.id);

  // 問題IDから燃料タイプを判定する関数（2級・3級整備士用）
  const getFuelTypeFromQuestionId = (questionId: string): string | null => {
    // auto-mechanic-2-G-2025-1-001 または auto-mechanic-3-G-2025-1-001 形式から燃料タイプコードを抽出
    // certIdがauto-mechanic-2またはauto-mechanic-3でない場合はnullを返す
    if (
      !questionId.startsWith("auto-mechanic-2-") &&
      !questionId.startsWith("auto-mechanic-3-")
    ) {
      return null;
    }

    // 2級整備士の場合
    if (questionId.startsWith("auto-mechanic-2-")) {
      const match = questionId.match(/^auto-mechanic-2-([GDMWC])-/);
      if (match && match[1]) {
        const code = match[1];
        return code === "G"
          ? "gasoline"
          : code === "D"
          ? "diesel"
          : code === "M"
          ? "motorcycle"
          : code === "C"
          ? "chassis"
          : null;
      }
    }

    // 3級整備士の場合
    if (questionId.startsWith("auto-mechanic-3-")) {
      const match = questionId.match(/^auto-mechanic-3-([GD])-/);
      if (match && match[1]) {
        const code = match[1];
        return code === "G" ? "gasoline" : code === "D" ? "diesel" : null;
      }
    }

    return null;
  };

  // 種類別データがあるかチェック（2級・3級整備士かどうか）
  // 資格IDがauto-mechanic-2またはauto-mechanic-3の場合は常にtrue（フィルタリング結果に依存しない）
  const hasFuelTypeData =
    cert.id === "auto-mechanic-2" || cert.id === "auto-mechanic-3";

  // 利用可能な燃料タイプのリストを取得（フィルタリング前の全問題から取得）
  // フィルタリング前のallQuestionsから取得することで、選択後もボタンが表示され続ける
  const availableFuelTypes = hasFuelTypeData
    ? Array.from(
        new Set(
          allQuestions
            .map((q) => getFuelTypeFromQuestionId(q.id))
            .filter((ft): ft is string => ft !== null)
        )
      )
    : [];

  // 年度と回次の組み合わせリストを取得（フィルター適用前の全問題から取得）
  const examPeriods = Array.from(
    new Set(allQuestions.map((q) => `${q.year}-${q.season}`))
  )
    .map((ep) => {
      const [y, s] = ep.split("-").map(Number);
      return { year: y, season: s as 1 | 2 };
    })
    .sort((a, b) => {
      // 年度の降順、同じ年度なら回次の降順
      if (a.year !== b.year) {
        return b.year - a.year;
      }
      return b.season - a.season;
    });

  // フィルター適用
  let questions = allQuestions;
  if (year && season) {
    questions = questions.filter((q) => q.year === year && q.season === season);
  }
  if (category) {
    const categoryData = categories.find((c) => c.slug === category);
    if (categoryData) {
      questions = questions.filter((q) => q.categoryId === categoryData.id);
    }
  }
  if (fuelType && hasFuelTypeData) {
    // 燃料タイプでフィルタリング（2級整備士の問題のみ）
    questions = questions.filter((q) => {
      const questionFuelType = getFuelTypeFromQuestionId(q.id);
      // 2級整備士以外の問題（燃料タイプがnull）は、燃料タイプフィルターが選択されている場合は除外しない
      // ただし、2級整備士の問題のみを対象にする場合は、燃料タイプが一致するもののみを表示
      if (questionFuelType === null) {
        // 2級整備士以外の問題は除外（種類フィルター選択時は2級整備士のみ表示）
        return false;
      }
      return questionFuelType === fuelType;
    });
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* フローティング戻るボタン */}
      <BackButton variant="gradient" floating position="bottom-left" />

      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
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
            <Link href={`/certs/${cert.slug}`} className="hover:text-gray-900">
              {cert.shortName}
            </Link>
            <span className="mx-2">/</span>
            <span>過去問</span>
          </nav>
          <h1 className="text-2xl font-bold text-gray-900">
            {cert.shortName} 過去問解説一覧
          </h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* アプリCTA（過去問ページのヘッダー下） */}
        <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-lg shadow-lg p-4 md:p-6 mb-6 text-white">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h2 className="text-lg md:text-xl font-bold mb-2">
                📱 過去問をアプリで効率的に学習
              </h2>
              <p className="text-green-100 text-sm">
                スキマ時間で繰り返し解ける。学習進捗・弱点も自動記録
              </p>
            </div>
            <Link
              href={
                certSlug === "auto-mechanic-1"
                  ? "/articles/auto-mechanic-1-app-introduction"
                  : "/articles"
              }
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
          <div
            className={`grid grid-cols-1 md:grid-cols-${
              hasFuelTypeData ? 3 : 2
            } gap-4`}
          >
            {/* 種類別（燃料タイプ） - 2級・3級整備士のみ表示 */}
            {hasFuelTypeData && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  種類
                </label>
                <div className="space-y-2">
                  <div>
                    <Link
                      href={`/certs/${cert.slug}/kakomon${
                        examPeriod ? `?examPeriod=${examPeriod}` : ""
                      }${
                        category
                          ? examPeriod
                            ? `&category=${category}`
                            : `?category=${category}`
                          : ""
                      }`}
                      className={`inline-block px-4 py-2 rounded font-medium ${
                        !fuelType
                          ? "bg-orange-500 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      すべて
                    </Link>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {availableFuelTypes.map((ft) => {
                      const fuelTypeNames: Record<string, string> = {
                        gasoline: "ガソリン",
                        diesel: "ジーゼル",
                        motorcycle: "2輪",
                        chassis: "シャシ",
                      };
                      const params = new URLSearchParams();
                      params.set("fuelType", ft);
                      if (examPeriod) params.set("examPeriod", examPeriod);
                      if (category) params.set("category", category);
                      return (
                        <Link
                          key={ft}
                          href={`/certs/${
                            cert.slug
                          }/kakomon?${params.toString()}`}
                          className={`px-3 py-1 rounded ${
                            fuelType === ft
                              ? "bg-orange-500 text-white"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          {fuelTypeNames[ft] || ft}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* 年度・回次（統合） */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                実施回
              </label>
              <div className="space-y-2">
                <div>
                  <Link
                    href={`/certs/${cert.slug}/kakomon${
                      category ? `?category=${category}` : ""
                    }${
                      fuelType
                        ? category
                          ? `&fuelType=${fuelType}`
                          : `?fuelType=${fuelType}`
                        : ""
                    }`}
                    className={`inline-block px-4 py-2 rounded font-medium ${
                      !examPeriod
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    すべて
                  </Link>
                </div>
                <div className="flex flex-wrap gap-2">
                  {examPeriods.map((ep) => {
                    const params = new URLSearchParams();
                    params.set("examPeriod", `${ep.year}-${ep.season}`);
                    if (category) params.set("category", category);
                    if (fuelType) params.set("fuelType", fuelType);
                    const isSelected = examPeriod === `${ep.year}-${ep.season}`;
                    return (
                      <Link
                        key={`${ep.year}-${ep.season}`}
                        href={`/certs/${
                          cert.slug
                        }/kakomon?${params.toString()}`}
                        className={`px-3 py-1 rounded ${
                          isSelected
                            ? "bg-blue-500 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {formatExamPeriod(ep.year, ep.season)}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* 分野別 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                分野
              </label>
              <div className="space-y-2">
                <div>
                  <Link
                    href={`/certs/${cert.slug}/kakomon${
                      examPeriod ? `?examPeriod=${examPeriod}` : ""
                    }${
                      fuelType
                        ? examPeriod
                          ? `&fuelType=${fuelType}`
                          : `?fuelType=${fuelType}`
                        : ""
                    }`}
                    className={`inline-block px-4 py-2 rounded font-medium ${
                      !category
                        ? "bg-green-500 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    すべて
                  </Link>
                </div>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => {
                    const params = new URLSearchParams();
                    params.set("category", cat.slug);
                    if (examPeriod) params.set("examPeriod", examPeriod);
                    if (fuelType) params.set("fuelType", fuelType);
                    return (
                      <Link
                        key={cat.id}
                        href={`/certs/${
                          cert.slug
                        }/kakomon?${params.toString()}`}
                        className={`px-3 py-1 rounded ${
                          category === cat.slug
                            ? "bg-green-500 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {cat.name}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 過去問一覧 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              過去問一覧（{questions.length}問）
            </h2>
            {(examPeriod || category || fuelType) && (
              <Link
                href={`/certs/${cert.slug}/kakomon`}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                フィルターを解除
              </Link>
            )}
          </div>
          {questions.length === 0 ? (
            <p className="text-gray-600">過去問がまだ登録されていません。</p>
          ) : (
            <ul className="space-y-4">
              {questions.map((question) => {
                // categoryIdからslugを取得
                const categoryData = categories.find(
                  (c) => c.id === question.categoryId
                );
                const categorySlug = categoryData?.slug || question.categoryId;

                return (
                  <li key={question.id}>
                    <Link
                      href={`/certs/${cert.slug}/kakomon/${question.year}/${question.season}/${categorySlug}/${question.id}`}
                      className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-sm text-gray-500">
                            {formatExamPeriod(question.year, question.season)}{" "}
                            問題{question.questionNumber}
                          </span>
                          <h3 className="text-gray-900 font-medium mt-1">
                            {(() => {
                              const displayText =
                                question.questionSummary ||
                                question.questionText ||
                                question.questionTheme ||
                                "問題";
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

        {/* アプリCTA（過去問一覧の最後） */}
        {questions.length > 0 && (
          <div className="bg-gradient-to-r from-blue-500 to-green-500 rounded-lg shadow-lg p-6 mt-6 text-white text-center">
            <h3 className="text-xl font-bold mb-2">
              📱 過去問をアプリで効率的に学習
            </h3>
            <p className="text-blue-100 mb-4 max-w-2xl mx-auto">
              スキマ時間で繰り返し解ける。学習進捗を自動で分析。
            </p>
            <Link
              href={
                certSlug === "auto-mechanic-1"
                  ? "/articles/auto-mechanic-1-app-introduction"
                  : "/articles"
              }
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
