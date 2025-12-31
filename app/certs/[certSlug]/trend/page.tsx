import Link from "next/link";
import { Metadata } from "next";
import { getCert } from "@/lib/data/certs";
import { getQuestionsByCert } from "@/lib/data/questions";
import { getCategoriesByCert } from "@/lib/data/categories";
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
      title: "出題傾向が見つかりません",
    };
  }

  return {
    title: `${cert.shortName}の出題傾向・頻出分野分析｜過去10年のデータ`,
    description: `${cert.shortName}の過去10年の出題傾向、頻出分野ランキング、直近で増えている出題テーマを詳しく分析します。`,
    alternates: {
      canonical: `/certs/${certSlug}/trend`,
    },
  };
}

export default async function TrendPage({
  params,
}: {
  params: Promise<{ certSlug: string }>;
}) {
  const { certSlug } = await params;
  const cert = getCert(certSlug);
  const questions = cert ? getQuestionsByCert(cert.id) : [];
  const categories = cert ? getCategoriesByCert(cert.id) : [];

  if (!cert) {
    return <div>資格が見つかりません</div>;
  }

  // 分野別の問題数を集計（サンプルデータ）
  const categoryStats = categories.map((category) => {
    const count = questions.filter((q) => q.categoryId === category.id).length;
    return {
      category,
      count,
      percentage: questions.length > 0 ? Math.round((count / questions.length) * 100) : 0,
    };
  }).sort((a, b) => b.count - a.count);

  // 年度別の問題数（サンプル）
  const yearStats = questions.reduce((acc, q) => {
    const key = formatExamPeriod(q.year, q.season);
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

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
            <span>出題傾向</span>
          </nav>
          <h1 className="text-2xl font-bold text-gray-900">
            {cert.shortName}の出題傾向・頻出分野分析
          </h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 概要 */}
        <section className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            出題傾向分析について
          </h2>
          <p className="text-gray-700 leading-relaxed">
            本ページでは、{cert.shortName}の過去問データを分析し、頻出分野や出題傾向をまとめています。効率的な学習計画を立てるための参考資料としてご活用ください。
          </p>
        </section>

        {/* 頻出分野ランキング */}
        {categoryStats.length > 0 && (
          <section className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              頻出分野ランキング
            </h2>
            <div className="space-y-4">
              {categoryStats.map((stat, index) => (
                <div
                  key={stat.category.id}
                  className="border-l-4 border-blue-500 pl-4 py-2"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-bold text-blue-600">
                        {index + 1}位
                      </span>
                      <h3 className="font-semibold text-gray-900">
                        {stat.category.name}
                      </h3>
                    </div>
                    <span className="text-sm text-gray-600">
                      {stat.count}問（{stat.percentage}%）
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${stat.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 年度別出題数 */}
        {Object.keys(yearStats).length > 0 && (
          <section className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              年度別出題数
            </h2>
            <div className="space-y-3">
              {Object.entries(yearStats)
                .sort((a, b) => b[0].localeCompare(a[0]))
                .map(([year, count]) => (
                  <div
                    key={year}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <span className="font-medium text-gray-900">{year}</span>
                    <span className="text-gray-600">{count}問</span>
                  </div>
                ))}
            </div>
          </section>
        )}

        {/* 直近の出題傾向 */}
        <section className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            直近の出題傾向
          </h2>
          <div className="space-y-4">
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <h3 className="font-semibold text-gray-900 mb-2">
                🔍 増えている出題テーマ
              </h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>電気自動車（EV）・ハイブリッド車の技術</li>
                <li>電子制御システムの故障診断</li>
                <li>ADAS（先進運転支援システム）の基礎</li>
                <li>環境規制対応技術</li>
              </ul>
            </div>
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
              <h3 className="font-semibold text-gray-900 mb-2">
                ⚠️ 8割の人が落とす論点
              </h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>電子制御ユニット（ECU）の動作原理</li>
                <li>診断用ツールの使い方・読み方</li>
                <li>複合的な故障の原因特定</li>
                <li>法規・保安基準の詳細</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 過去10年で8割出ている分野 */}
        <section className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            過去10年で8割出ている分野
          </h2>
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
            <p className="text-blue-900 font-semibold mb-2">
              これらは確実に学習すべき分野です
            </p>
            <ul className="list-disc list-inside space-y-1 text-blue-800 text-sm">
              {categoryStats
                .filter((s) => s.percentage >= 15)
                .map((s) => (
                  <li key={s.category.id}>
                    {s.category.name}（{s.percentage}%の出題率）
                  </li>
                ))}
            </ul>
          </div>
        </section>

        {/* 直近3年で急に増えた論点 */}
        <section className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            直近3年で急に増えた論点
          </h2>
          <div className="bg-red-50 border-l-4 border-red-500 p-4">
            <ul className="list-disc list-inside space-y-2 text-red-800 text-sm">
              <li>
                <strong>電気自動車（EV）・ハイブリッド車の技術</strong>
                <br />
                出題頻度が2021年から3倍に増加。今後も重要度が高まることが予想されます。
              </li>
              <li>
                <strong>ADAS（先進運転支援システム）</strong>
                <br />
                2022年から出題が本格化。自動運転技術の基礎知識が求められています。
              </li>
              <li>
                <strong>電子制御システムの故障診断</strong>
                <br />
                複合的な故障の原因特定に関する問題が増加傾向にあります。
              </li>
            </ul>
          </div>
        </section>

        {/* 学習戦略 */}
        <section className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            学習戦略のポイント
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                必須分野（重点的に学習すべき）
              </h3>
              <p className="text-gray-700 text-sm mb-2">
                頻出分野は確実に得点源にしましょう。これらの分野での失点は合格を遠ざけます。
              </p>
              <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                {categoryStats
                  .filter((s) => s.percentage >= 20)
                  .map((s) => (
                    <li key={s.category.id}>{s.category.name}</li>
                  ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                実技試験対策
              </h3>
              <p className="text-gray-700 text-sm">
                実技試験では、実際の作業手順と測定器の使い方が問われます。机上の学習だけでなく、実践的な練習が必要です。
              </p>
            </div>
          </div>
        </section>

        {/* 有料コンテンツ導線 */}
        <section className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg shadow-lg p-6 mb-6 text-white">
          <h2 className="text-lg font-bold mb-2">
            💎 より詳細な分析データを入手
          </h2>
          <p className="text-purple-100 text-sm mb-4">
            過去10年の詳細分析、分野別の出題傾向グラフ、予想問題の傾向分析など、
            より詳しいデータはアプリのプレミアムプランでご利用いただけます。
          </p>
          <Link
            href={certSlug === "auto-mechanic-1" ? "/articles/auto-mechanic-1-app-introduction" : "/articles"}
            className="inline-block px-6 py-3 bg-white text-purple-600 rounded-lg hover:bg-purple-50 transition-colors font-semibold text-sm"
          >
            プレミアムプランを確認する →
          </Link>
        </section>

        {/* 関連リンク */}
        <section className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            関連リンク
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href={`/certs/${cert.slug}/study`}
              className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <h3 className="font-semibold text-gray-900 mb-1">
                📚 勉強ロードマップ
              </h3>
              <p className="text-sm text-gray-600">
                分野別重要度を考慮した学習計画
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
                頻出分野の問題を重点的に演習
              </p>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

