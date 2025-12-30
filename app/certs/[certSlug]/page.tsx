import Link from "next/link";
import { getCert } from "@/lib/data/certs";
import { getQuestionsByCert } from "@/lib/data/questions";

export default async function CertPage({
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
            <span>{cert.name}</span>
          </nav>
          <h1 className="text-2xl font-bold text-gray-900">{cert.name}</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            試験概要
          </h2>
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <dt className="text-sm font-medium text-gray-500">難易度</dt>
              <dd className="text-lg text-gray-900">
                {"★".repeat(cert.difficulty)}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">合格率</dt>
              <dd className="text-lg text-gray-900">{cert.passRate}%</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">
                年間受験者数
              </dt>
              <dd className="text-lg text-gray-900">
                {cert.annualExaminees?.toLocaleString()}人
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">勉強時間</dt>
              <dd className="text-lg text-gray-900">
                初学者: {cert.studyHours?.beginner}時間
              </dd>
            </div>
          </dl>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <Link
            href={`/certs/${cert.slug}/study`}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              勉強法
            </h3>
            <p className="text-gray-600 text-sm">
              学習ロードマップ、おすすめ教材、学習計画などをご紹介します。
            </p>
          </Link>

          <Link
            href={`/certs/${cert.slug}/kakomon`}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              過去問解説
            </h3>
            <p className="text-gray-600 text-sm">
              過去問の詳細な解説を提供しています。
              {questions.length > 0 && `（${questions.length}問）`}
            </p>
          </Link>

          <Link
            href={`/certs/${cert.slug}/faq`}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              よくある質問
            </h3>
            <p className="text-gray-600 text-sm">
              試験や学習に関するよくある質問と回答をご紹介します。
            </p>
          </Link>

          <Link
            href={`/certs/${cert.slug}/app`}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border-2 border-blue-200"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              アプリ紹介
            </h3>
            <p className="text-gray-600 text-sm">
              過去問をスマホで学習できるアプリを紹介しています。
            </p>
          </Link>
        </div>
      </main>
    </div>
  );
}

