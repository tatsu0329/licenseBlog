import Link from "next/link";
import { Metadata } from "next";
import { getCert } from "@/lib/data/certs";
import PassRateChart from "@/components/charts/PassRateChart";
import ExamStatsTable from "@/components/charts/ExamStatsTable";
import { formatExamPeriod } from "@/lib/utils/date";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ certSlug: string }>;
}): Promise<Metadata> {
  const { certSlug } = await params;
  const cert = getCert(certSlug);

  if (!cert) {
    return {
      title: "試験概要が見つかりません",
    };
  }

  return {
    title: `${cert.shortName}とは｜受験資格・難易度・合格率・勉強時間`,
    description: `${cert.shortName}の試験概要、受験資格、難易度、合格率推移、勉強時間の目安などを詳しく解説します。`,
    alternates: {
      canonical: `/certs/${certSlug}/overview`,
    },
  };
}

export default async function OverviewPage({
  params,
}: {
  params: Promise<{ certSlug: string }>;
}) {
  const { certSlug } = await params;
  const cert = getCert(certSlug);

  if (!cert) {
    return <div>資格が見つかりません</div>;
  }

  return (
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
            <span>試験概要</span>
          </nav>
          <h1 className="text-2xl font-bold text-gray-900">
            {cert.shortName}とは｜受験資格・難易度・合格率
          </h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 資格の概要 */}
        <section className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            {cert.shortName}とは
          </h2>
          <div className="prose max-w-none text-gray-700">
            <p className="leading-relaxed mb-4">{cert.description}</p>
            <p className="leading-relaxed">
              {cert.shortName}は、自動車整備工場の主任技術者として、複雑な故障診断や技術的な判断を行うことができる資格です。整備工場の技術的な責任者としての役割を担い、より高度な整備技術が求められます。
            </p>
          </div>
        </section>

        {/* 受験資格 */}
        {cert.examInfo?.eligibility && (
          <section className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              受験資格
            </h2>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
              <p className="text-gray-700 leading-relaxed">
                {cert.examInfo.eligibility}
              </p>
            </div>
          </section>
        )}

        {/* 難易度・合格率 */}
        <section className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            難易度・合格率
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">難易度</h3>
              <div className="text-3xl text-yellow-500 mb-2">
                {"★".repeat(cert.difficulty)}
                {"☆".repeat(5 - cert.difficulty)}
              </div>
              <p className="text-sm text-gray-600">
                {cert.difficulty === 4
                  ? "やや難しい（合格率45%前後）"
                  : cert.difficulty === 5
                  ? "非常に難しい"
                  : "普通"}
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">合格率</h3>
              <div className="text-3xl font-bold text-gray-900 mb-2">
                {cert.passRate}%
              </div>
              <p className="text-sm text-gray-600">
                最新データ（{cert.examInfo?.passRateHistory[0]?.year}年）
              </p>
            </div>
          </div>
        </section>

        {/* 合格率推移グラフ */}
        {cert.examInfo?.passRateHistory && cert.examInfo.passRateHistory.length > 0 && (
          <section className="bg-white rounded-lg shadow-md p-6 mb-6">
            <PassRateChart
              data={cert.examInfo.passRateHistory}
              title="合格率の推移（過去4年）"
            />
            <div className="mt-4 text-sm text-gray-600">
              <p>
                ※ より詳細な統計データが必要な場合は、試験実施団体の公式サイトをご確認ください。
              </p>
            </div>
          </section>
        )}

        {/* 最新データのサマリー（簡潔版） */}
        {cert.examInfo?.passRateHistory && cert.examInfo.passRateHistory.length > 0 && (() => {
          const sortedHistory = [...cert.examInfo.passRateHistory].sort((a, b) => b.year - a.year);
          const latest = sortedHistory[0];
          const latestData = latest.spring || latest.autumn;
          
          if (!latestData) return null;
          
          return (
            <section className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                最新の試験データ
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">
                          {latest.spring ? formatExamPeriod(latest.year, 1) : latest.autumn ? formatExamPeriod(latest.year, 2) : ""}
                        </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {latestData.passRate !== undefined ? `${latestData.passRate}%` : "-"}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      合格率
                    </p>
                  </div>
                </div>
                <div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold text-gray-900">
                      {latestData.examinees?.toLocaleString() || "-"}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      受験者数
                    </p>
                  </div>
                </div>
                <div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold text-gray-900">
                      {latestData.passers?.toLocaleString() || "-"}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      合格者数
                    </p>
                  </div>
                </div>
              </div>
            </section>
          );
        })()}

        {/* 勉強時間の目安 */}
        {cert.studyHours && (
          <section className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              勉強時間の目安
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">
                  初学者の場合
                </h3>
                <p className="text-2xl font-bold text-gray-900 mb-2">
                  {cert.studyHours.beginner}時間
                </p>
                <p className="text-sm text-gray-600">
                  1日2時間の学習で約
                  {Math.ceil(cert.studyHours.beginner / (2 * 30))}ヶ月
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">
                  経験者の場合
                </h3>
                <p className="text-2xl font-bold text-gray-900 mb-2">
                  {cert.studyHours.experienced}時間
                </p>
                <p className="text-sm text-gray-600">
                  1日2時間の学習で約
                  {Math.ceil(cert.studyHours.experienced / (2 * 30))}ヶ月
                </p>
              </div>
            </div>
          </section>
        )}

        {/* 試験日程・合格基準 */}
        {cert.examInfo && (
          <section className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              試験日程・合格基準
            </h2>
            <dl className="space-y-4">
              <div>
                <dt className="font-semibold text-gray-900 mb-1">試験日程</dt>
                <dd className="text-gray-700">
                  {cert.examInfo.examDates.spring && (
                    <p>第1回（春期）: {cert.examInfo.examDates.spring}</p>
                  )}
                  {cert.examInfo.examDates.autumn && (
                    <p>第2回（秋期）: {cert.examInfo.examDates.autumn}</p>
                  )}
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-gray-900 mb-1">合格基準</dt>
                <dd className="text-gray-700">{cert.examInfo.passCriteria}</dd>
              </div>
            </dl>
          </section>
        )}

        {/* 軽いアプリCTA */}
        <section className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4 md:p-6 mb-6">
          <h3 className="font-semibold text-gray-900 mb-2">
            💡 学習計画を立てる
          </h3>
          <p className="text-sm text-gray-700 mb-3">
            {cert.shortName}の学習を効率的に進めるため、診断ツールで最適な学習計画を作成しましょう。
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href={`/certs/${cert.slug}/diagnosis`}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-sm text-center"
            >
              学習診断ツールを使う →
            </Link>
            <Link
              href={`/certs/${cert.slug}/study`}
              className="px-4 py-2 bg-white text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-semibold text-sm text-center"
            >
              ロードマップを見る →
            </Link>
          </div>
        </section>

        {/* 関連リンク */}
        <section className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            次のステップ
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href={`/certs/${cert.slug}/study`}
              className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <h3 className="font-semibold text-gray-900 mb-1">
                📚 勉強法・ロードマップ
              </h3>
              <p className="text-sm text-gray-600">
                最短合格のための学習ロードマップを確認
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
                過去問の詳細な解説で実力アップ
              </p>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

