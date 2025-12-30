import Link from "next/link";
import { Metadata } from "next";
import { getCert } from "@/lib/data/certs";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ certSlug: string }>;
}): Promise<Metadata> {
  const { certSlug } = await params;
  const cert = getCert(certSlug);

  if (!cert) {
    return {
      title: "試験制度変更が見つかりません",
    };
  }

  return {
    title: `${cert.shortName}の試験制度変更まとめ｜出題形式・合格基準の変更履歴`,
    description: `${cert.shortName}の過去の試験制度変更、出題形式の変更、合格基準の変更履歴をまとめています。`,
    alternates: {
      canonical: `/certs/${certSlug}/system-changes`,
    },
  };
}

export default async function SystemChangesPage({
  params,
}: {
  params: Promise<{ certSlug: string }>;
}) {
  const { certSlug } = await params;
  const cert = getCert(certSlug);

  if (!cert) {
    return <div>資格が見つかりません</div>;
  }

  // サンプルデータ（実際のデータに置き換える）
  const systemChanges = [
    {
      year: 2024,
      month: 4,
      title: "実技試験の評価方法の見直し",
      description:
        "実技試験の採点基準がより詳細化され、作業手順の正確性だけでなく、効率性も評価対象となりました。",
      impact: "高",
      details: [
        "作業時間の制限が厳格化",
        "安全確認の項目が追加",
        "測定器の使用精度の評価が強化",
      ],
    },
    {
      year: 2023,
      month: 10,
      title: "電気自動車・ハイブリッド車の出題範囲拡大",
      description:
        "環境規制の強化に伴い、電気自動車（EV）とハイブリッド車の技術に関する出題が大幅に増加しました。",
      impact: "高",
      details: [
        "EV・HVの基礎知識が必須領域に",
        "充電システムの知識が必要に",
        "バッテリー管理システムの出題が増加",
      ],
    },
    {
      year: 2022,
      month: 4,
      title: "合格基準の変更",
      description:
        "学科試験の合格基準が60点から変更なし（60点以上）ですが、実技試験の配点比率が見直されました。",
      impact: "中",
      details: [
        "学科試験：60点以上（変更なし）",
        "実技試験：配点比率が調整",
        "総合評価の計算方法が変更",
      ],
    },
    {
      year: 2021,
      month: 4,
      title: "出題形式の変更",
      description:
        "学科試験の出題形式が一部変更され、実務経験を反映した問題が増加しました。",
      impact: "中",
      details: [
        "実務経験を反映した問題が30%に",
        "図表・写真を使用した問題が増加",
        "複合的な問題の出題が増加",
      ],
    },
  ];

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
            <span>試験制度変更</span>
          </nav>
          <h1 className="text-2xl font-bold text-gray-900">
            {cert.shortName}の試験制度変更まとめ
          </h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 説明 */}
        <section className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            試験制度変更について
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            {cert.shortName}の試験制度は、技術の進歩や社会のニーズに合わせて定期的に見直しが行われています。
            過去の変更履歴を把握することで、現在の試験傾向を理解し、適切な対策を立てることができます。
          </p>
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
            <p className="text-sm text-gray-700">
              <strong>重要：</strong>最新の試験情報は、必ず公式サイトでご確認ください。
            </p>
          </div>
        </section>

        {/* 変更履歴 */}
        <section className="space-y-6">
          {systemChanges.map((change, index) => (
            <div
              key={`${change.year}-${change.month}`}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl font-bold text-gray-900">
                      {change.year}年{change.month}月
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        change.impact === "高"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {change.impact === "高" ? "重要" : "要注意"}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {change.title}
                  </h3>
                </div>
              </div>
              <p className="text-gray-700 mb-4 leading-relaxed">
                {change.description}
              </p>
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">
                  主な変更内容
                </h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                  {change.details.map((detail, i) => (
                    <li key={i}>{detail}</li>
                  ))}
                </ul>
              </div>
              {index < systemChanges.length - 1 && (
                <div className="mt-6 border-t border-gray-200 pt-6">
                  <div className="text-center">
                    <div className="inline-block w-1 h-8 bg-gray-300"></div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </section>

        {/* 注意事項 */}
        <section className="bg-yellow-50 border-l-4 border-yellow-400 rounded-lg p-6 mt-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            ⚠️ 注意事項
          </h2>
          <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
            <li>
              試験制度の変更は、試験実施団体の公式発表を基準としています。
            </li>
            <li>
              変更が予定されている場合は、必ず公式サイトで最新情報を確認してください。
            </li>
            <li>
              過去の変更内容は参考情報として提供していますが、現在の試験制度とは異なる場合があります。
            </li>
          </ul>
        </section>

        {/* 関連リンク */}
        <section className="bg-white rounded-lg shadow-md p-6 mt-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            関連リンク
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href={`/certs/${cert.slug}/overview`}
              className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <h3 className="font-semibold text-gray-900 mb-1">
                📋 試験概要
              </h3>
              <p className="text-sm text-gray-600">
                現在の試験制度の詳細を確認
              </p>
            </Link>
            <Link
              href={`/certs/${cert.slug}/trend`}
              className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
            >
              <h3 className="font-semibold text-gray-900 mb-1">
                📊 出題傾向分析
              </h3>
              <p className="text-sm text-gray-600">
                過去の出題傾向を分析
              </p>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

