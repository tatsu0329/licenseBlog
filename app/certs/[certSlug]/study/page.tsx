import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCert } from "@/lib/data/certs";
import { getCategoriesByCert } from "@/lib/data/categories";
import BackButton from "@/components/BackButton";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ certSlug: string }>;
}): Promise<Metadata> {
  const { certSlug } = await params;
  const cert = getCert(certSlug);

  if (!cert) {
    return {
      title: "勉強法が見つかりません",
    };
  }

  return {
    title: `${cert.shortName}｜最短合格ロードマップ・勉強法`,
    description: `${cert.shortName}の最短合格を目指すための学習ロードマップ、分野別重要度、過去問ベース逆算学習法を詳しく解説します。`,
    alternates: {
      canonical: `/certs/${certSlug}/study`,
    },
  };
}

export default async function StudyPage({
  params,
}: {
  params: Promise<{ certSlug: string }>;
}) {
  const { certSlug } = await params;
  const cert = getCert(certSlug);
  const categories = cert ? getCategoriesByCert(cert.id) : [];

  if (!cert) {
    notFound();
  }

  // 特徴フラグの取得
  const features = cert.features ?? [];

  // 構造化データ（HowTo）
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `${cert.shortName}の勉強法`,
    description: `${cert.shortName}の効率的な学習方法とロードマップ`,
    step: [
      {
        "@type": "HowToStep",
        name: "基礎知識の習得",
        text: "テキストや参考書を使用して基礎知識を習得します。",
      },
      {
        "@type": "HowToStep",
        name: "過去問演習",
        text: "過去問を解いて問題形式に慣れ、知識の定着を図ります。",
      },
      {
        "@type": "HowToStep",
        name: "実技試験対策",
        text: "実技試験がある場合は、実践的な練習を行います。",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-gray-50">
        {/* フローティング戻るボタン */}
        <BackButton variant="gradient" floating position="bottom-left" />

        <header className="bg-white shadow-sm">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
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
              <Link
                href={`/certs/${cert.slug}`}
                className="hover:text-gray-900"
              >
                {cert.shortName}
              </Link>
              <span className="mx-2">/</span>
              <span>勉強法</span>
            </nav>
            <h1 className="text-2xl font-bold text-gray-900">
              {cert.shortName}｜最短合格ロードマップ
            </h1>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* 学習を始める前に */}
          <section className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {cert.shortName}の学習を始める前に
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 border-l-4 border-blue-500 rounded-xl p-6 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-4 text-lg flex items-center gap-2">
                  <span className="text-blue-600">✓</span>
                  まず確認すべきこと
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>受験資格があるか確認</span>
                  </li>
                  {cert.id === "auto-mechanic-2" && (
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500 mt-1">•</span>
                      <span>3級取得後の実務経験年数（1〜2年）</span>
                    </li>
                  )}
                  {cert.id === "auto-mechanic-1" && (
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500 mt-1">•</span>
                      <span>2級取得後の実務経験年数（3年）</span>
                    </li>
                  )}
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>試験日程の確認</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>合格基準の理解</span>
                  </li>
                  {cert.id === "auto-mechanic-2" && (
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500 mt-1">•</span>
                      <span>受験する種類の選択（ガソリン・ジーゼル・2輪・シャシ）</span>
                    </li>
                  )}
                </ul>
              </div>
              <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 border-l-4 border-emerald-500 rounded-xl p-6 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-4 text-lg flex items-center gap-2">
                  <span className="text-emerald-600">→</span>
                  学習の流れ
                </h3>
                <ol className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="font-semibold text-emerald-600">1.</span>
                    <span>試験概要を理解する</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-semibold text-emerald-600">2.</span>
                    <span>学習ロードマップを確認</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-semibold text-emerald-600">3.</span>
                    <span>過去問で実力を把握</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-semibold text-emerald-600">4.</span>
                    <span>分野別に学習を進める</span>
                  </li>
                </ol>
              </div>
            </div>
          </section>

          {/* 全体像 */}
          <section className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 mb-6 text-white">
            <h2 className="text-xl font-semibold mb-4">
              全体像：何から何まであるか
            </h2>
            <p className="mb-4 leading-relaxed">
              {cert.id === "auto-mechanic-2" ? (
                <>
                  {cert.shortName}の試験は、学科試験と実技試験から構成されます。
                  学科試験では、{categories.length}つの分野（エンジン・シャシ・整備機器等・法規）から出題され、
                  問題1～15がエンジン、問題16～30がシャシ、問題31～35が整備機器等、問題36～40が法規となっています。
                  シャシ以外の種類は40問、シャシは30問です。
                  実技試験では、実際の作業手順や測定器の使用方法が問われます。
                </>
              ) : cert.id === "auto-mechanic-1" ? (
                <>
                  {cert.shortName}の試験は、学科試験（筆記・口述）と実技試験から構成されます。
                  学科試験では、{categories.length}つの分野から出題され、
                  自動車の構造・機能から電子制御、故障診断、整備作業まで幅広い知識が問われます。
                  実技試験では、実際の作業手順や測定器の使用方法が問われます。
                </>
              ) : (
                <>
                  {cert.shortName}の試験は、学科試験と実技試験から構成されます。
                  学科試験では、自動車整備に関する幅広い知識が問われ、
                  実技試験では実際の作業手順や測定器の使用方法が問われます。
                </>
              )}
            </p>
            <div className="bg-white/20 rounded-lg p-4">
              <p className="font-semibold mb-2">合格までの大まかな流れ</p>
              <ol className="list-decimal list-inside space-y-1 text-sm">
                <li>基礎知識の習得（{cert.id === "auto-mechanic-2" ? "1-2ヶ月" : "2-3ヶ月"}）</li>
                <li>過去問演習による知識の定着（{cert.id === "auto-mechanic-2" ? "1-2ヶ月" : "2-3ヶ月"}）</li>
                <li>実技試験対策（1-2ヶ月）</li>
                <li>総復習・模試（1ヶ月）</li>
              </ol>
            </div>
          </section>

          {/* 分野別重要度 */}
          {categories.length > 0 && (
            <section className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                分野別重要度（★〜★★★）
              </h2>
              <div className="space-y-4">
                {categories
                  .sort((a, b) => a.order - b.order)
                  .map((category) => {
                    // 重要度判定
                    let importance = 1;
                    if (category.certId === "auto-mechanic-1") {
                      // 1級自動車整備士の場合
                      if (
                        category.slug === "structure" ||
                        category.slug === "electronics"
                      ) {
                        importance = 3; // 最重要
                      } else if (
                        category.slug === "diagnosis" ||
                        category.slug === "maintenance"
                      ) {
                        importance = 2; // 重要
                      } else {
                        importance = 1; // 普通
                      }
                    } else if (category.certId === "auto-mechanic-2") {
                      // 2級自動車整備士の場合
                      if (category.slug === "engine") {
                        importance = 3; // 最重要（問題1-15、15問）
                      } else if (category.slug === "chassis") {
                        importance = 3; // 最重要（問題16-30、15問）
                      } else if (category.slug === "tools-equipment") {
                        importance = 2; // 重要（問題31-35、5問）
                      } else if (category.slug === "regulations") {
                        importance = 2; // 重要（問題36-40、5問）
                      } else {
                        importance = 1; // 普通
                      }
                    } else {
                      // その他の資格の場合（従来の判定）
                      if (
                        category.slug === "engine" ||
                        category.slug === "electrical"
                      ) {
                        importance = 3;
                      } else if (category.slug === "chassis") {
                        importance = 2;
                      } else {
                        importance = 1;
                      }
                    }
                    return (
                      <div
                        key={category.id}
                        className="border-l-4 border-blue-500 pl-4 py-2"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-gray-900">
                            {category.name}
                          </h3>
                          <span className="text-yellow-500">
                            {"★".repeat(importance)}
                            {"☆".repeat(3 - importance)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">
                          {category.description}
                        </p>
                        {importance === 3 && (
                          <p className="text-sm text-red-600 font-semibold mt-1">
                            ⚠️ 最重要分野：確実に得点源にする
                          </p>
                        )}
                      </div>
                    );
                  })}
              </div>
            </section>
          )}

          {/* 過去問ベース逆算学習法 */}
          <section className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              過去問ベース逆算学習法
            </h2>
            <div className="space-y-4">
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                <h3 className="font-semibold text-gray-900 mb-2">
                  なぜ過去問から始めるのか？
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  過去問を最初に解くことで、試験の出題形式や頻出ポイントを把握できます。
                  その後、間違えた問題の分野を重点的に学習することで、効率的に知識を定着させることができます。
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">学習の流れ</h3>
                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                  <li>直近3年分の過去問を1回分解く（現状把握）</li>
                  <li>間違えた問題の分野を特定</li>
                  <li>該当分野の基礎知識をテキストで学習</li>
                  <li>再度過去問を解く（知識の定着確認）</li>
                  <li>このサイクルを3-5回繰り返す</li>
                </ol>
              </div>
            </div>
          </section>

          {/* 捨てていい分野 / 必須分野 */}
          <section className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              学習優先度の判断基準
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-semibold text-green-900 mb-3">
                  ✅ 必須分野（優先度：最高）
                </h3>
                <ul className="list-disc list-inside text-green-800 text-sm space-y-1">
                  {categories
                    .filter((cat) => {
                      if (cat.certId === "auto-mechanic-1") {
                        return (
                          cat.slug === "structure" || cat.slug === "electronics"
                        );
                      } else if (cat.certId === "auto-mechanic-2") {
                        return (
                          cat.slug === "engine" || cat.slug === "chassis"
                        );
                      }
                      return cat.slug === "engine" || cat.slug === "electrical";
                    })
                    .map((cat) => (
                      <li key={cat.id}>{cat.name}（{cat.description.match(/問題(\d+)～(\d+)/) ? `${cat.description.match(/問題(\d+)～(\d+)/)?.[1]}-${cat.description.match(/問題(\d+)～(\d+)/)?.[2]}` : ""}問）</li>
                    ))}
                  {categories.length === 0 && (
                    <>
                      <li>エンジンの基本構造・動作原理</li>
                      <li>電気装置の基礎（バッテリー、充電系）</li>
                      <li>故障診断の基本手順</li>
                      <li>測定器の使い方</li>
                    </>
                  )}
                </ul>
                <p className="text-green-700 text-xs mt-3">
                  ※ これらの分野は確実に得点源にすべき
                </p>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h3 className="font-semibold text-yellow-900 mb-3">
                  ⚠️ 時間があれば（優先度：中）
                </h3>
                <ul className="list-disc list-inside text-yellow-800 text-sm space-y-1">
                  {categories
                    .filter((cat) => {
                      if (cat.certId === "auto-mechanic-1") {
                        return cat.slug === "regulations";
                      } else if (cat.certId === "auto-mechanic-2") {
                        return cat.slug === "regulations" || cat.slug === "tools-equipment";
                      }
                      return false;
                    })
                    .map((cat) => (
                      <li key={cat.id}>{cat.name}の細かな内容</li>
                    ))}
                  {categories.length > 0 && cert.id === "auto-mechanic-1" && (
                    <>
                      <li>最新技術（EV、ハイブリッド）の詳細</li>
                      <li>特殊な故障事例</li>
                    </>
                  )}
                  {categories.length > 0 && cert.id === "auto-mechanic-2" && (
                    <>
                      <li>最新技術（EV、ハイブリッド）の詳細</li>
                      <li>特殊な整備事例</li>
                    </>
                  )}
                  {categories.length === 0 && (
                    <>
                      <li>最新技術（EV、ハイブリッド）の詳細</li>
                      <li>特殊な故障事例</li>
                      <li>法規の細かな条文</li>
                    </>
                  )}
                </ul>
                <p className="text-yellow-700 text-xs mt-3">
                  ※ まずは必須分野を完璧にしてから
                </p>
              </div>
            </div>
          </section>

          {/* 学習ロードマップ */}
          <section className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              詳細ロードマップ
            </h2>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-semibold text-gray-900 mb-2">
                  ステップ1: 基礎知識の習得（2-3ヶ月）
                </h3>
                <p className="text-gray-700 text-sm mb-2">
                  テキストや参考書を使用して、{cert.shortName}
                  の基礎知識を体系的に学習します。
                </p>
                <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                  <li>公式テキストを1冊通読する</li>
                  <li>各分野の重要ポイントをノートにまとめる</li>
                  <li>専門用語の意味を理解する</li>
                  {cert.id === "auto-mechanic-2" && (
                    <li>受験する種類（ガソリン・ジーゼル・2輪・シャシ）に合わせて重点的に学習する</li>
                  )}
                </ul>
              </div>

              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="font-semibold text-gray-900 mb-2">
                  ステップ2: 過去問演習（2-3ヶ月）
                </h3>
                <p className="text-gray-700 text-sm mb-2">
                  過去問を解いて問題形式に慣れ、知識の定着を図ります。
                </p>
                <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                  <li>直近5年分の過去問を解く</li>
                  <li>間違えた問題を復習する</li>
                  <li>頻出問題を重点的に学習する</li>
                  {cert.id === "auto-mechanic-2" && (
                    <>
                      <li>問題番号別の出題傾向を把握する（エンジン1-15、シャシ16-30、整備機器等31-35、法規36-40）</li>
                      <li>各分野で40%以上の正答率を確保できるようにする</li>
                    </>
                  )}
                </ul>
              </div>

              {cert.examInfo?.passCriteria.includes("実技") && (
                <div className="border-l-4 border-orange-500 pl-4">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    ステップ3: 実技試験対策（1-2ヶ月）
                  </h3>
                  <p className="text-gray-700 text-sm mb-2">
                    実技試験がある場合は、実践的な練習を行います。
                  </p>
                  <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                    <li>実技試験の出題範囲を確認する</li>
                    <li>実際の作業手順を練習する</li>
                    <li>時間内に作業が完了できるようにする</li>
                  </ul>
                </div>
              )}

              <div className="border-l-4 border-purple-500 pl-4">
                <h3 className="font-semibold text-gray-900 mb-2">
                  ステップ4: 総復習・模試（1ヶ月）
                </h3>
                <p className="text-gray-700 text-sm mb-2">
                  試験直前は、総復習と模試で最終調整を行います。
                </p>
                <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                  <li>苦手分野を重点的に復習する</li>
                  <li>模試で時間配分を練習する</li>
                  <li>体調管理と生活リズムの調整</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 社会人向け / 学生向け */}
          <section className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              学習スタイル別プラン
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border-2 border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">
                  👔 社会人向け（1日30〜60分）
                </h3>
                <ul className="list-disc list-inside text-gray-700 text-sm space-y-1 mb-3">
                  <li>朝：30分（テキスト読書）</li>
                  <li>通勤中：スマホアプリで問題演習</li>
                  <li>夜：30分（過去問演習）</li>
                </ul>
                <p className="text-xs text-gray-600">
                  週末にまとめて学習時間を確保（1日2-3時間）
                </p>
              </div>
              <div className="border-2 border-green-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">
                  🎓 学生向け（1日2-3時間）
                </h3>
                <ul className="list-disc list-inside text-gray-700 text-sm space-y-1 mb-3">
                  <li>午前：2時間（基礎学習）</li>
                  <li>午後：1時間（過去問演習）</li>
                  <li>実技練習：週2-3回</li>
                </ul>
                <p className="text-xs text-gray-600">
                  集中的な学習で短期間での合格が可能
                </p>
              </div>
            </div>
          </section>

          {/* 直前1ヶ月対策 */}
          <section className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              直前1ヶ月対策
            </h2>
            <div className="space-y-4">
              <div className="bg-red-50 border-l-4 border-red-500 p-4">
                <h3 className="font-semibold text-gray-900 mb-2">
                  ⚡ やるべきこと（優先順位順）
                </h3>
                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                  <li>過去問を毎日1回分解く（時間を計る）</li>
                  <li>間違えた問題をノートにまとめる</li>
                  <li>弱点分野を重点的に復習</li>
                  <li>実技試験の作業手順を体で覚える</li>
                  <li>試験当日のシミュレーション</li>
                </ol>
              </div>
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
                <h3 className="font-semibold text-gray-900 mb-2">
                  🚫 やらないこと
                </h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>新しい参考書に手を出す</li>
                  <li>細かい知識の詰め込み</li>
                  <li>徹夜での学習（体調管理優先）</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 独学 vs 講座 */}
          <section className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              独学 vs 講座：どちらを選ぶべきか
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      項目
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                      独学
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                      講座
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">
                      費用
                    </td>
                    <td className="px-4 py-3 text-sm text-center text-gray-600">
                      安い（1-3万円）
                    </td>
                    <td className="px-4 py-3 text-sm text-center text-gray-600">
                      高い（10-30万円）
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">
                      学習ペース
                    </td>
                    <td className="px-4 py-3 text-sm text-center text-gray-600">
                      自由に調整可能
                    </td>
                    <td className="px-4 py-3 text-sm text-center text-gray-600">
                      講座のスケジュールに従う
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">
                      実技対策
                    </td>
                    <td className="px-4 py-3 text-sm text-center text-gray-600">
                      実務経験が必要
                    </td>
                    <td className="px-4 py-3 text-sm text-center text-gray-600">
                      実技練習が可能
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">
                      結論
                    </td>
                    <td className="px-4 py-3 text-sm text-center font-semibold text-green-600">
                      実務経験があるなら独学OK
                    </td>
                    <td className="px-4 py-3 text-sm text-center font-semibold text-blue-600">
                      実技が不安なら講座推奨
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* おすすめ教材 */}
          <section className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              おすすめ教材
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  公式テキスト・参考書
                </h3>
                <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                  <li>国土交通省発行の公式テキスト</li>
                  <li>各出版社の参考書（基礎から応用まで）</li>
                  <li>図解が多いものを選ぶと理解しやすい</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">過去問題集</h3>
                <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                  <li>直近5年分の過去問が掲載された問題集</li>
                  <li>解説が詳しいものを選ぶ</li>
                  <li>分野別に整理された問題集も有効</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  学習アプリ・オンライン講座
                </h3>
                <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                  <li>スマートフォンアプリでスキマ時間を活用</li>
                  <li>オンライン講座で動画学習</li>
                  <li>学習進捗を管理できるツールの活用</li>
                </ul>
              </div>
            </div>
          </section>

          {/* CTA：診断ツール・アプリDL */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg p-6 text-white">
              <h2 className="text-lg font-bold mb-2">🔍 学習診断ツール</h2>
              <p className="text-blue-100 text-sm mb-4">
                勉強時間・合格可能性・苦手分野を診断
              </p>
              <Link
                href={`/certs/${cert.slug}/diagnosis`}
                className="inline-block px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-semibold text-sm"
              >
                診断を受ける →
              </Link>
            </div>

            <div className="bg-gradient-to-r from-green-500 to-teal-600 rounded-lg shadow-lg p-6 text-white">
              <h2 className="text-lg font-bold mb-2">
                📱 アプリで効率的に学習
              </h2>
              <p className="text-green-100 text-sm mb-4">
                過去問をスキマ時間で解けるアプリ
              </p>
              <Link
                href={
                  features.includes("articles") &&
                  certSlug === "auto-mechanic-1"
                    ? "/articles/auto-mechanic-1-app-introduction"
                    : "/articles"
                }
                className="inline-block px-4 py-2 bg-white text-green-600 rounded-lg hover:bg-green-50 transition-colors font-semibold text-sm"
              >
                アプリ詳細を見る →
              </Link>
            </div>
          </section>

          {/* PDF導線 */}
          <section className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              📄 PDF「最短合格ロードマップ」を無料ダウンロード
            </h2>
            <p className="text-gray-700 text-sm mb-4">
              このページの内容をPDFで保存して、いつでも確認できるようにしましょう。
            </p>
            <button
              disabled
              className="px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors font-semibold cursor-not-allowed opacity-50"
            >
              PDFをダウンロード（準備中）
            </button>
            <p className="text-xs text-gray-600 mt-2">
              ※
              PDFダウンロード機能は準備中です。アプリでは詳細な学習計画を保存・管理できます。
            </p>
          </section>

          {/* 関連リンク */}
          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              関連リンク
            </h2>
            <div className="space-y-3">
              <Link
                href={`/certs/${cert.slug}/kakomon`}
                className="block p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors"
              >
                <span className="text-blue-600 hover:text-blue-800">
                  ← {cert.shortName}の過去問一覧
                </span>
              </Link>
              <Link
                href={`/certs/${cert.slug}`}
                className="block p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors"
              >
                <span className="text-blue-600 hover:text-blue-800">
                  ← {cert.shortName}のトップページに戻る
                </span>
              </Link>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
