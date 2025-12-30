import Link from "next/link";
import { getCert } from "@/lib/data/certs";
import { getQuestionsByCert } from "@/lib/data/questions";
import { getCategoriesByCert } from "@/lib/data/categories";

export default async function KakomonPage({
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
    return <div>資格が見つかりません</div>;
  }

  let questions = getQuestionsByCert(cert.id);
  const categories = getCategoriesByCert(cert.id);

  // フィルター適用
  if (year) {
    questions = questions.filter((q) => q.year === parseInt(year));
  }
  if (category) {
    const categoryData = categories.find((c) => c.slug === category);
    if (categoryData) {
      questions = questions.filter((q) => q.categoryId === categoryData.id);
    }
  }
  if (season) {
    questions = questions.filter((q) => q.season === parseInt(season));
  }

  // 年度のリストを取得
  const years = Array.from(new Set(questions.map((q) => q.year))).sort((a, b) => b - a);

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
            <span>過去問</span>
          </nav>
          <h1 className="text-2xl font-bold text-gray-900">
            {cert.shortName} 過去問解説一覧
          </h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
                  href={`/certs/${cert.slug}/kakomon${category ? `?category=${category}` : season ? `?season=${season}` : ""}`}
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
                    href={`/certs/${cert.slug}/kakomon?year=${y}${category ? `&category=${category}` : ""}${season ? `&season=${season}` : ""}`}
                    className={`px-3 py-1 rounded ${
                      year === String(y)
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {y}年
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
                  href={`/certs/${cert.slug}/kakomon${year ? `?year=${year}` : season ? `?season=${season}` : ""}`}
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
                    href={`/certs/${cert.slug}/kakomon?category=${cat.slug}${year ? `&year=${year}` : ""}${season ? `&season=${season}` : ""}`}
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
                  href={`/certs/${cert.slug}/kakomon${year ? `?year=${year}` : category ? `?category=${category}` : ""}`}
                  className={`px-3 py-1 rounded ${
                    !season
                      ? "bg-purple-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  すべて
                </Link>
                <Link
                  href={`/certs/${cert.slug}/kakomon?season=1${year ? `&year=${year}` : ""}${category ? `&category=${category}` : ""}`}
                  className={`px-3 py-1 rounded ${
                    season === "1"
                      ? "bg-purple-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  春期
                </Link>
                <Link
                  href={`/certs/${cert.slug}/kakomon?season=2${year ? `&year=${year}` : ""}${category ? `&category=${category}` : ""}`}
                  className={`px-3 py-1 rounded ${
                    season === "2"
                      ? "bg-purple-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  秋期
                </Link>
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
            {(year || category || season) && (
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
                const seasonName = question.season === 1 ? "春期" : "秋期";
                return (
                  <li key={question.id}>
                    <Link
                      href={`/certs/${cert.slug}/kakomon/${question.year}/${question.season}/${question.categoryId}/${question.id}`}
                      className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-sm text-gray-500">
                            {question.year}年{seasonName} 問題{question.questionNumber}
                          </span>
                          <h3 className="text-gray-900 font-medium mt-1">
                            {question.questionText.substring(0, 100)}
                            {question.questionText.length > 100 && "..."}
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
      </main>
    </div>
  );
}

