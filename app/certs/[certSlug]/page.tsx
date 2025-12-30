import Link from "next/link";
import { getCert } from "@/lib/data/certs";
import { getQuestionsByCert } from "@/lib/data/questions";
import PassRateChart from "@/components/charts/PassRateChart";
import ExamStatsTable from "@/components/charts/ExamStatsTable";

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

  // 1級整備士の場合、より詳細なハブページにする
  const isAutoMechanic1 = certSlug === "auto-mechanic-1";

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
        {/* 試験概要（クイックビュー） */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            試験概要
          </h2>
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <dt className="text-sm font-medium text-gray-500">難易度</dt>
              <dd className="text-lg text-gray-900">
                {"★".repeat(cert.difficulty)}
                {"☆".repeat(5 - cert.difficulty)}
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
          <div className="mt-4">
            <Link
              href={`/certs/${cert.slug}/overview`}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              試験概要の詳細を見る →
            </Link>
          </div>
        </div>

        {/* 合格率推移グラフ */}
        {cert.examInfo?.passRateHistory && cert.examInfo.passRateHistory.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <PassRateChart
              data={cert.examInfo.passRateHistory}
              title="合格率の推移"
            />
          </div>
        )}

        {/* 受験者数・合格者数・合格率の統計表 */}
        {cert.examInfo?.passRateHistory && cert.examInfo.passRateHistory.length > 0 && (
          <div className="mb-6">
            <ExamStatsTable
              data={cert.examInfo.passRateHistory}
              title="試験統計データ（受験者数・合格者数・合格率）"
            />
          </div>
        )}

        {/* クイックアクセスセクション */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <Link
            href={`/certs/${cert.slug}/study`}
            className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow text-white"
          >
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
              📚 勉強方法・ロードマップ
            </h3>
            <p className="text-blue-100 text-sm">
              最短合格を目指す学習ロードマップと勉強法
            </p>
          </Link>

          <Link
            href={`/certs/${cert.slug}/kakomon`}
            className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow text-white"
          >
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
              📝 過去問・解説
            </h3>
            <p className="text-green-100 text-sm">
              過去問の詳細な解説を提供
              {questions.length > 0 && `（${questions.length}問）`}
            </p>
          </Link>

          {isAutoMechanic1 && (
            <Link
              href={`/certs/${cert.slug}/trend`}
              className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow text-white"
            >
              <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                📊 出題傾向・頻出分野
              </h3>
              <p className="text-purple-100 text-sm">
                過去10年のデータ分析と頻出分野ランキング
              </p>
            </Link>
          )}

          <Link
            href={`/certs/${cert.slug}/faq`}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              ❓ よくある質問
            </h3>
            <p className="text-gray-600 text-sm">
              試験や学習に関するよくある質問と回答
            </p>
          </Link>

          <Link
            href={`/certs/${cert.slug}/app`}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border-2 border-blue-200"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              📱 アプリ紹介
            </h3>
            <p className="text-gray-600 text-sm">
              過去問をスマホで学習できるアプリ
            </p>
          </Link>

          {isAutoMechanic1 && (
            <>
              <Link
                href={`/certs/${cert.slug}/web-vs-app`}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  💡 Web vs アプリ
                </h3>
                <p className="text-gray-600 text-sm">
                  Webとアプリの効果的な使い分け
                </p>
              </Link>

              <Link
                href={`/certs/${cert.slug}/common-mistakes`}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  ⚠️ よくある間違い
                </h3>
                <p className="text-gray-600 text-sm">
                  初学者が勘違いするポイント
                </p>
              </Link>

              <Link
                href={`/certs/${cert.slug}/system-changes`}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  📋 試験制度変更
                </h3>
                <p className="text-gray-600 text-sm">
                  出題形式・合格基準の変更履歴
                </p>
              </Link>
            </>
          )}

          {!isAutoMechanic1 && (
            <Link
              href={`/certs/${cert.slug}/overview`}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                📋 試験概要
              </h3>
              <p className="text-gray-600 text-sm">
                受験資格、難易度、勉強時間の詳細
              </p>
            </Link>
          )}
        </div>

        {/* 1級整備士専用セクション */}
        {isAutoMechanic1 && (
          <section className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              1級自動車整備士の学習を始める前に
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                <h3 className="font-semibold text-gray-900 mb-2">
                  まず確認すべきこと
                </h3>
                <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                  <li>受験資格があるか確認</li>
                  <li>2級取得後の実務経験年数</li>
                  <li>試験日程の確認</li>
                </ul>
              </div>
              <div className="bg-green-50 border-l-4 border-green-500 p-4">
                <h3 className="font-semibold text-gray-900 mb-2">
                  学習の流れ
                </h3>
                <ol className="list-decimal list-inside text-gray-700 text-sm space-y-1">
                  <li>試験概要を理解する</li>
                  <li>学習ロードマップを確認</li>
                  <li>過去問で実力を把握</li>
                  <li>分野別に学習を進める</li>
                </ol>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
