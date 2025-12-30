import Link from "next/link";
import { getCert } from "@/lib/data/certs";
import { getQuestionsByCert } from "@/lib/data/questions";

export default async function KakomonPage({
  params,
}: {
  params: Promise<{ certSlug: string }>;
}) {
  const { certSlug } = await params;
  const cert = getCert(certSlug);

  if (!cert) {
    return <div>資格が見つかりません</div>;
  }

  const questions = getQuestionsByCert(cert.id);

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
        <p className="text-gray-600 mb-6">
          年度・分野・回次で絞り込み検索が可能です。
        </p>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            過去問一覧（{questions.length}問）
          </h2>
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

