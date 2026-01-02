import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCert } from "@/lib/data/certs";
import { getQuestionsByCert } from "@/lib/data/questions";
import { getCategoriesByCert } from "@/lib/data/categories";
import { formatExamPeriod } from "@/lib/utils/date";
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
    notFound();
  }

  // 特徴フラグの取得
  const features = cert.features ?? [];

  // 分野別の問題数を集計（サンプルデータ）
  const categoryStats = categories.map((category) => {
    const categoryQuestions = questions.filter((q) => q.categoryId === category.id);
    const count = categoryQuestions.length;
    
    // 年度別の問題数を集計
    const yearCounts = categoryQuestions.reduce((acc, q) => {
      const key = `${q.year}-${q.season}`;
      if (!acc[key]) {
        acc[key] = { count: 0, year: q.year, season: q.season };
      }
      acc[key].count += 1;
      return acc;
    }, {} as Record<string, { count: number; year: number; season: 1 | 2 }>);
    
    // 年度順にソートされたデータ配列を作成
    const yearData = Object.values(yearCounts)
      .sort((a, b) => {
        if (a.year !== b.year) {
          return a.year - b.year;
        }
        return a.season - b.season;
      })
      .map((item) => ({
        label: formatExamPeriod(item.year, item.season),
        value: item.count,
        year: item.year,
        season: item.season,
      }));
    
    // 直近3年の出題数を計算
    const currentYear = new Date().getFullYear();
    const recent3Years = categoryQuestions.filter(
      (q) => q.year >= currentYear - 2
    );
    const olderYears = categoryQuestions.filter(
      (q) => q.year < currentYear - 2
    );
    
    // 直近3年の年度別回数をカウント
    const recentYearPeriods = new Set<string>();
    recent3Years.forEach((q) => {
      recentYearPeriods.add(`${q.year}-${q.season}`);
    });
    const olderYearPeriods = new Set<string>();
    olderYears.forEach((q) => {
      olderYearPeriods.add(`${q.year}-${q.season}`);
    });
    
    const recentAverage = recentYearPeriods.size > 0 ? recent3Years.length / recentYearPeriods.size : 0;
    const olderAverage = olderYearPeriods.size > 0 ? olderYears.length / olderYearPeriods.size : 0;
    const growthRate = olderAverage > 0 ? (recentAverage / olderAverage - 1) * 100 : (recentAverage > 0 ? 100 : 0);
    
    return {
      category,
      count,
      percentage: questions.length > 0 ? Math.round((count / questions.length) * 100) : 0,
      yearData, // 年度別のデータを追加
      growthRate, // 直近3年の増加率
    };
  }).sort((a, b) => b.count - a.count);
  
  // 直近3年で急に増えた分野を特定（増加率が高い順）
  const growingCategories = [...categoryStats]
    .filter((s) => s.growthRate > 30) // 30%以上の増加
    .sort((a, b) => b.growthRate - a.growthRate);
  
  // 過去10年で8割以上出ている分野（出題率80%以上、または問題数が全体の15%以上）
  const frequentlyAskedCategories = categoryStats.filter(
    (s) => s.percentage >= 15 || (s.count / questions.length) >= 0.15
  );
  
  // 必須分野（出題率20%以上）
  const essentialCategories = categoryStats.filter((s) => s.percentage >= 20);

  return (
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
            <div className="space-y-6">
              {categoryStats.map((stat, index) => {
                // 各分野ごとに異なる色を割り当て
                const colors = [
                  "#3b82f6", // blue
                  "#10b981", // green
                  "#f59e0b", // amber
                  "#ef4444", // red
                  "#8b5cf6", // purple
                  "#ec4899", // pink
                  "#06b6d4", // cyan
                  "#f97316", // orange
                ];
                const color = colors[index % colors.length];
                
                // 線グラフ用のデータ
                const yearData = stat.yearData || [];
                if (yearData.length === 0) {
                  return (
                    <div
                      key={stat.category.id}
                      className="border-l-4 pl-4 py-2"
                      style={{ borderColor: color }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl font-bold" style={{ color }}>
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
                          className="h-2 rounded-full"
                          style={{ width: `${stat.percentage}%`, backgroundColor: color }}
                        ></div>
                      </div>
                    </div>
                  );
                }
                
                const maxValue = Math.max(...yearData.map((d) => d.value), 1);
                const minValue = 0;
                const range = maxValue - minValue || 1;
                const padding = 50;
                const chartWidth = Math.max(600, yearData.length * 60);
                const chartHeight = 150;
                
                return (
                  <div
                    key={stat.category.id}
                    className="border-l-4 pl-4 py-3"
                    style={{ borderColor: color }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl font-bold" style={{ color }}>
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
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                      <div
                        className="h-2 rounded-full"
                        style={{ width: `${stat.percentage}%`, backgroundColor: color }}
                      ></div>
                    </div>
                    
                    {/* 年度別出題数の線グラフ */}
                    <div className="overflow-x-auto">
                      <svg
                        width={chartWidth}
                        height={chartHeight}
                        viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                        className="w-full max-w-full"
                        preserveAspectRatio="xMidYMid meet"
                      >
                        {/* グリッド線 */}
                        {Array.from({ length: Math.ceil(maxValue) + 1 }, (_, i) => i).map((y) => {
                          if (y > maxValue) return null;
                          const yPos = padding + chartHeight - padding * 2 - ((y - minValue) / range) * (chartHeight - padding * 2);
                          return (
                            <g key={y}>
                              <line
                                x1={padding}
                                y1={yPos}
                                x2={chartWidth - padding}
                                y2={yPos}
                                stroke="#e5e7eb"
                                strokeWidth={1}
                                strokeDasharray={y === 0 ? "0" : "4,4"}
                              />
                              <text
                                x={padding - 5}
                                y={yPos + 4}
                                textAnchor="end"
                                fontSize="10"
                                fill="#6b7280"
                              >
                                {y}
                              </text>
                            </g>
                          );
                        })}
                        
                        {/* 線グラフ */}
                        {yearData.length > 1 && (
                          <polyline
                            points={yearData
                              .map((point, i) => {
                                const x = padding + (i * (chartWidth - padding * 2)) / (yearData.length - 1);
                                const y = padding + (chartHeight - padding * 2) - ((point.value - minValue) / range) * (chartHeight - padding * 2);
                                return `${x},${y}`;
                              })
                              .join(" ")}
                            fill="none"
                            stroke={color}
                            strokeWidth={3}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        )}
                        
                        {/* データポイント */}
                        {yearData.map((point, i) => {
                          const x = padding + (i * (chartWidth - padding * 2)) / (yearData.length - 1 || 1);
                          const y = padding + (chartHeight - padding * 2) - ((point.value - minValue) / range) * (chartHeight - padding * 2);
                          return (
                            <g key={`${point.year}-${point.season}`}>
                              <circle
                                cx={x}
                                cy={y}
                                r={5}
                                fill={color}
                                stroke="white"
                                strokeWidth={2}
                              />
                              <text
                                x={x}
                                y={y - 10}
                                textAnchor="middle"
                                fontSize="11"
                                fontWeight="bold"
                                fill={color}
                              >
                                {point.value}
                              </text>
                              {/* X軸ラベル */}
                              <text
                                x={x}
                                y={chartHeight - padding + 15}
                                textAnchor="middle"
                                fontSize="9"
                                fill="#6b7280"
                                transform={`rotate(-45, ${x}, ${chartHeight - padding + 15})`}
                              >
                                {point.label.replace("年度", "度").replace("第1回", "1回").replace("第2回", "2回")}
                              </text>
                            </g>
                          );
                        })}
                        
                        {/* Y軸 */}
                        <line
                          x1={padding}
                          y1={padding}
                          x2={padding}
                          y2={chartHeight - padding}
                          stroke="#374151"
                          strokeWidth={2}
                        />
                        {/* X軸 */}
                        <line
                          x1={padding}
                          y1={chartHeight - padding}
                          x2={chartWidth - padding}
                          y2={chartHeight - padding}
                          stroke="#374151"
                          strokeWidth={2}
                        />
                        
                        {/* Y軸ラベル */}
                        <text
                          x={padding / 2}
                          y={chartHeight / 2}
                          textAnchor="middle"
                          fontSize="11"
                          fill="#6b7280"
                          transform={`rotate(-90, ${padding / 2}, ${chartHeight / 2})`}
                        >
                          出題数
                        </text>
                      </svg>
                    </div>
                  </div>
                );
              })}
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
              {cert.id === "auto-mechanic-1" ? (
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>電気・電子装置／電子制御（ECU系）</li>
                  <li>故障診断・トラブルシューティング</li>
                  <li>図面・配線図・資料の読解</li>
                  {growingCategories.length > 0 && (
                    growingCategories.slice(0, 3).map((cat) => (
                      <li key={cat.category.id}>
                        {cat.category.name}（直近3年で{cat.growthRate > 0 ? `${Math.round(cat.growthRate)}%増加` : "増加傾向"}）
                      </li>
                    ))
                  )}
                </ul>
              ) : cert.id === "auto-mechanic-2" ? (
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>エンジン（各種エンジンシステム）</li>
                  <li>シャシ（走行・制動・操舵装置）</li>
                  <li>整備機器等（計測機器・診断機）</li>
                  {growingCategories.length > 0 && (
                    growingCategories.slice(0, 3).map((cat) => (
                      <li key={cat.category.id}>
                        {cat.category.name}（直近3年で{cat.growthRate > 0 ? `${Math.round(cat.growthRate)}%増加` : "増加傾向"}）
                      </li>
                    ))
                  )}
                </ul>
              ) : cert.id === "auto-mechanic-3" ? (
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>エンジン（基本構造・動作原理）</li>
                  <li>整備機器等（工具・測定器・材料）</li>
                  <li>法規（道路運送車両法・保安基準）</li>
                  {growingCategories.length > 0 && (
                    growingCategories.slice(0, 3).map((cat) => (
                      <li key={cat.category.id}>
                        {cat.category.name}（直近3年で{cat.growthRate > 0 ? `${Math.round(cat.growthRate)}%増加` : "増加傾向"}）
                      </li>
                    ))
                  )}
                </ul>
              ) : (
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  {growingCategories.length > 0 ? (
                    growingCategories.slice(0, 4).map((cat) => (
                      <li key={cat.category.id}>
                        {cat.category.name}（直近3年で{cat.growthRate > 0 ? `${Math.round(cat.growthRate)}%増加` : "増加傾向"}）
                      </li>
                    ))
                  ) : (
                    <li>データを分析中です</li>
                  )}
                </ul>
              )}
            </div>
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
              <h3 className="font-semibold text-gray-900 mb-2">
                ⚠️ 難しい論点
              </h3>
              {cert.id === "auto-mechanic-1" ? (
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>電子制御ユニット（ECU）の動作原理と制御ロジック</li>
                  <li>診断用ツール（オシロスコープ、デジタルテスタ）の使い方・読み方</li>
                  <li>複合的な故障の原因特定とトラブルシューティング</li>
                  <li>CAN通信システムの理解と点検方法</li>
                </ul>
              ) : cert.id === "auto-mechanic-2" ? (
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>エンジン制御システムと電子制御装置</li>
                  <li>シャシ各部の構造と点検・調整方法</li>
                  <li>整備機器・計測機器の正しい使い方</li>
                  <li>法規・保安基準の詳細理解</li>
                </ul>
              ) : cert.id === "auto-mechanic-3" ? (
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>エンジンの基本構造と動作原理（4サイクル・2サイクル、燃焼行程など）</li>
                  <li>整備機器・測定器の正しい使い方（ダイヤルゲージ、プラスチゲージなど）</li>
                  <li>材料・油脂・燃料の基礎知識</li>
                  <li>法規・保安基準の基本的な理解</li>
                </ul>
              ) : (
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>専門知識が必要な分野</li>
                  <li>実技を伴う項目</li>
                  <li>法令・規制に関する詳細</li>
                </ul>
              )}
            </div>
          </div>
        </section>

        {/* 過去10年で8割出ている分野 */}
        <section className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            頻繁に出題される分野
          </h2>
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
            <p className="text-blue-900 font-semibold mb-2">
              これらは確実に学習すべき分野です
            </p>
            {frequentlyAskedCategories.length > 0 ? (
              <ul className="list-disc list-inside space-y-1 text-blue-800 text-sm">
                {frequentlyAskedCategories.map((s) => (
                  <li key={s.category.id}>
                    {s.category.name}（{s.percentage}%の出題率）
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-blue-800 text-sm">
                データを分析中です。頻出分野ランキングを参照してください。
              </p>
            )}
          </div>
        </section>

        {/* 直近3年で急に増えた論点 */}
        <section className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            直近3年で急に増えた論点
          </h2>
          <div className="bg-red-50 border-l-4 border-red-500 p-4">
            {growingCategories.length > 0 ? (
              <ul className="list-disc list-inside space-y-2 text-red-800 text-sm">
                {growingCategories.slice(0, 3).map((cat) => (
                  <li key={cat.category.id}>
                    <strong>{cat.category.name}</strong>
                    <br />
                    直近3年の出題数が以前と比較して{Math.round(cat.growthRate)}%増加しています。今後も重要度が高まることが予想されます。
                  </li>
                ))}
              </ul>
            ) : cert.id === "auto-mechanic-1" ? (
              <ul className="list-disc list-inside space-y-2 text-red-800 text-sm">
                <li>
                  <strong>電気・電子装置／電子制御（ECU系）</strong>
                  <br />
                  電子制御システムの高度化に伴い、ECUの動作原理や制御ロジックに関する出題が増加傾向にあります。
                </li>
                <li>
                  <strong>故障診断・トラブルシューティング</strong>
                  <br />
                  複合的な故障の原因特定や診断手順に関する問題が増加傾向にあります。
                </li>
                <li>
                  <strong>図面・配線図・資料の読解</strong>
                  <br />
                  実務で必要となる技術資料の読解能力を問う問題が重視されています。
                </li>
              </ul>
            ) : cert.id === "auto-mechanic-2" ? (
              <ul className="list-disc list-inside space-y-2 text-red-800 text-sm">
                <li>
                  <strong>エンジン</strong>
                  <br />
                  各種エンジンシステムの理解と整備に関する出題が安定して多くなっています。
                </li>
                <li>
                  <strong>シャシ</strong>
                  <br />
                  走行装置、制動装置、操舵装置の構造と点検・調整に関する問題が重要視されています。
                </li>
                <li>
                  <strong>整備機器等</strong>
                  <br />
                  計測機器や診断機の正しい使い方に関する出題が増加傾向にあります。
                </li>
              </ul>
            ) : cert.id === "auto-mechanic-3" ? (
              <ul className="list-disc list-inside space-y-2 text-red-800 text-sm">
                <li>
                  <strong>エンジン</strong>
                  <br />
                  エンジンの基本構造（4サイクル・2サイクルエンジン、燃焼行程、冷却・潤滑システムなど）に関する出題が最も多く、全問題の約67%（20問）を占めています。基礎的な知識を確実に身につけることが重要です。
                </li>
                <li>
                  <strong>整備機器等</strong>
                  <br />
                  工具・測定器の正しい使い方や材料・油脂・燃料の基礎知識に関する出題が増加傾向にあります。実務で必要な基礎知識が問われます。
                </li>
                <li>
                  <strong>法規</strong>
                  <br />
                  道路運送車両法や保安基準の基本的な内容に関する出題が安定しています。3問しかないため、確実に得点源にする必要があります。
                </li>
              </ul>
            ) : (
              <p className="text-red-800 text-sm">
                データを分析中です。
              </p>
            )}
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
              {essentialCategories.length > 0 ? (
                <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                  {essentialCategories.map((s) => (
                    <li key={s.category.id}>{s.category.name}（{s.percentage}%）</li>
                  ))}
                </ul>
              ) : (
                <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                  {categoryStats.slice(0, 3).map((s) => (
                    <li key={s.category.id}>{s.category.name}（{s.percentage}%）</li>
                  ))}
                </ul>
              )}
            </div>
            {cert.examInfo?.passCriteria?.includes("実技") && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  実技試験対策
                </h3>
                <p className="text-gray-700 text-sm">
                  実技試験では、実際の作業手順と測定器の使い方が問われます。机上の学習だけでなく、実践的な練習が必要です。
                </p>
              </div>
            )}
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
            href={
              features.includes("articles") && certSlug === "auto-mechanic-1"
                ? "/articles/auto-mechanic-1-app-introduction"
                : "/articles"
            }
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
                📝 過去問一覧
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

