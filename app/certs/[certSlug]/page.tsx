import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCert } from "@/lib/data/certs";
import { getQuestionsByCert } from "@/lib/data/questions";
import { getArticlesByCert } from "@/lib/data/articles";
import BackButton from "@/components/BackButton";
import ArticleList from "@/components/ArticleList";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ certSlug: string }>;
}): Promise<Metadata> {
  const { certSlug } = await params;
  const cert = getCert(certSlug);

  if (!cert) {
    return {
      title: "資格が見つかりません",
      description: "指定された資格が見つかりませんでした。",
    };
  }

  return {
    title: `${cert.name}｜勉強方法・過去問解説・出題傾向`,
    description: `${cert.shortName}の試験概要、最短合格ロードマップ、過去問解説、頻出分野分析、学習ツールをまとめて紹介。`,
    alternates: {
      canonical: `/certs/${certSlug}`,
    },
    openGraph: {
      title: `${cert.name}｜勉強方法・過去問解説・出題傾向`,
      description: `${cert.shortName}の試験概要、最短合格ロードマップ、過去問解説、頻出分野分析、学習ツールをまとめて紹介。`,
    },
  };
}

export default async function CertPage({
  params,
}: {
  params: Promise<{ certSlug: string }>;
}) {
  const { certSlug } = await params;
  const cert = getCert(certSlug);

  if (!cert) {
    notFound();
  }

  const questions = getQuestionsByCert(cert.id);
  const articles = getArticlesByCert(cert.id);

  // 機能フラグで表示を制御（後方互換性を保つため、featuresがない場合は空配列を扱う）
  const features = cert.features ?? [];
  const hasTrend = features.includes("trend");
  const hasArticles = features.includes("articles");

  // アプリ記事へのリンク（featuresで制御可能にする場合は、features.includes("app-article")などに変更）
  const appArticleSlug =
    certSlug === "auto-mechanic-1"
      ? "/articles/auto-mechanic-1-app-introduction"
      : "/articles";

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50">
      {/* フローティング戻るボタン */}
      <BackButton variant="gradient" floating position="bottom-left" />

      {/* ヘッダー */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center text-sm text-gray-600 mb-3">
            <BackButton variant="minimal" className="mr-4" />
            <Link href="/" className="hover:text-blue-600 transition-colors">
              ホーム
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <Link
              href="/certs"
              className="hover:text-blue-600 transition-colors"
            >
              資格一覧
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-900 font-medium">{cert.name}</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
            {cert.name}
          </h1>
          <div className="mt-2">
            <p className="text-gray-600 text-lg leading-relaxed">
              {cert.description.split("\n\n")[0].substring(0, 120)}
              {cert.description.split("\n\n")[0].length > 120 ? "..." : ""}
            </p>
            <Link
              href={`/certs/${cert.slug}/overview`}
              className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium mt-2 transition-colors"
            >
              詳細を見る
              <span>→</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* ヒーローCTA */}
        <div className="relative bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 rounded-2xl shadow-2xl p-8 md:p-10 mb-10 text-white overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/10 bg-[length:20px_20px] opacity-20"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1 space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">📱</span>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                  {cert.shortName}の過去問をスマホで解く
                </h2>
              </div>
              <p className="text-blue-50 text-base md:text-lg leading-relaxed">
                通勤・通学中のスキマ時間で効率的に学習。無料で10問まで試せます
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                  無料体験可能
                </span>
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                  詳細解説付き
                </span>
              </div>
            </div>
            <Link
              href={appArticleSlug}
              className="group relative px-8 py-4 bg-white text-blue-600 rounded-xl hover:bg-blue-50 transition-all duration-300 font-bold text-lg whitespace-nowrap shadow-lg hover:shadow-xl hover:scale-105"
            >
              <span className="flex items-center gap-2">
                アプリを見る
                <span className="group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </span>
            </Link>
          </div>
        </div>

        {/* 試験概要（クイックビュー） */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8 mb-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">試験概要</h2>
            <Link
              href={`/certs/${cert.slug}/overview`}
              className="text-blue-600 hover:text-blue-700 text-sm font-semibold transition-colors flex items-center gap-1"
            >
              詳細を見る
              <span>→</span>
            </Link>
          </div>
          {(() => {
            // 種類別データがあるかチェック
            const sortedHistory = cert.examInfo?.passRateHistory
              ? [...cert.examInfo.passRateHistory].sort((a, b) => b.year - a.year)
              : [];
            const latest = sortedHistory[0];
            const latestData = latest?.spring || latest?.autumn;
            
            // 種類ごとにデータが存在するかチェック
            const hasTypeData = (type: 'gasoline' | 'diesel' | 'motorcycle' | 'chassis') => {
              if (!cert.examInfo?.passRateHistory) return false;
              for (const item of cert.examInfo.passRateHistory) {
                if (item.spring?.byType?.[type] || item.autumn?.byType?.[type]) {
                  return true;
                }
              }
              return false;
            };
            
            const hasByType = hasTypeData('gasoline') || hasTypeData('diesel') || hasTypeData('motorcycle') || hasTypeData('chassis');
            
            // 種類別の平均合格率を計算
            const getAveragePassRateByType = (type: 'gasoline' | 'diesel' | 'motorcycle' | 'chassis'): number | undefined => {
              if (!cert.examInfo?.passRateHistory) return undefined;
              const rates: number[] = [];
              for (const item of cert.examInfo.passRateHistory) {
                const springRate = item.spring?.byType?.[type]?.passRate;
                const autumnRate = item.autumn?.byType?.[type]?.passRate;
                if (springRate !== undefined) rates.push(springRate);
                if (autumnRate !== undefined) rates.push(autumnRate);
              }
              if (rates.length > 0) {
                return rates.reduce((sum, rate) => sum + rate, 0) / rates.length;
              }
              return undefined;
            };
            
            // 種類ごとに最新受験者数を取得
            const getLatestExamineesByType = (type: 'gasoline' | 'diesel' | 'motorcycle' | 'chassis'): number | undefined => {
              for (const item of sortedHistory) {
                const springData = item.spring?.byType?.[type];
                const autumnData = item.autumn?.byType?.[type];
                if (springData?.examinees !== undefined) return springData.examinees;
                if (autumnData?.examinees !== undefined) return autumnData.examinees;
              }
              return undefined;
            };
            
            // 合格率から難易度を判定する関数
            const getDifficultyFromPassRate = (passRate?: number): {
              level: 1 | 2 | 3 | 4 | 5;
              label: string;
            } => {
              if (passRate === undefined) {
                return { level: cert.difficulty, label: "普通" };
              }
              if (passRate >= 80) {
                return { level: 1, label: "易しい" };
              } else if (passRate >= 60) {
                return { level: 2, label: "普通" };
              } else if (passRate >= 40) {
                return { level: 3, label: "やや難しい" };
              } else if (passRate >= 20) {
                return { level: 4, label: "難しい" };
              } else {
                return { level: 5, label: "非常に難しい" };
              }
            };

            if (hasByType && cert.studyHours?.byType) {
              // 種類別データがある場合
              const types = [
                { key: 'gasoline' as const, name: 'ガソリン', color: 'blue' },
                { key: 'diesel' as const, name: 'ジーゼル', color: 'green' },
                { key: 'motorcycle' as const, name: '2輪', color: 'purple' },
                { key: 'chassis' as const, name: 'シャシ', color: 'orange' },
              ].filter(type => hasTypeData(type.key) && cert.studyHours?.byType?.[type.key]);
              
              return (
                <div className="space-y-6">
                  {types.map((type) => {
                    const avgRate = getAveragePassRateByType(type.key);
                    const difficulty = getDifficultyFromPassRate(avgRate);
                    const examinees = getLatestExamineesByType(type.key);
                    const studyHours = cert.studyHours?.byType?.[type.key];
                    
                    return (
                      <div key={type.key} className="border-l-4 border-gray-300 pl-4 py-2">
                        <h3 className="text-sm font-semibold text-gray-900 mb-3">
                          2級{type.name}自動車整備士
                        </h3>
                        <dl className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                          <div className="space-y-1">
                            <dt className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                              難易度
                            </dt>
                            <dd className="flex items-center gap-1 text-xl font-bold text-amber-500">
                              {"★".repeat(difficulty.level)}
                              {"☆".repeat(5 - difficulty.level)}
                            </dd>
                            {avgRate !== undefined && (
                              <dd className="text-xs text-gray-600">
                                {difficulty.label}（平均{avgRate.toFixed(1)}%）
                              </dd>
                            )}
                          </div>
                          <div className="space-y-1">
                            <dt className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                              合格率
                            </dt>
                            <dd className="text-2xl font-bold text-gray-900">
                              {avgRate !== undefined ? `${avgRate.toFixed(1)}%` : "未公開"}
                            </dd>
                            <dd className="text-xs text-gray-600">過去年度平均</dd>
                          </div>
                          <div className="space-y-1">
                            <dt className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                              年間受験者数
                            </dt>
                            <dd className="text-xl font-bold text-gray-900">
                              {examinees !== undefined ? (
                                <>
                                  {examinees.toLocaleString()}
                                  <span className="text-sm text-gray-600 font-normal ml-1">人</span>
                                </>
                              ) : (
                                "未公開"
                              )}
                            </dd>
                          </div>
                          <div className="space-y-1">
                            <dt className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                              勉強時間
                            </dt>
                            <dd className="text-xl font-bold text-gray-900">
                              {studyHours ? (
                                <>
                                  初学者: {studyHours.beginner}
                                  <span className="text-sm text-gray-600 font-normal ml-1">時間</span>
                                </>
                              ) : (
                                <span className="text-sm text-gray-600 font-normal">未設定</span>
                              )}
                            </dd>
                          </div>
                        </dl>
                      </div>
                    );
                  })}
                </div>
              );
            } else {
              // 種類別データがない場合は通常の表示
              return (
                <dl className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="space-y-2">
                    <dt className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                      難易度
                    </dt>
                    <dd className="flex items-center gap-1 text-2xl font-bold text-amber-500">
                      {"★".repeat(cert.difficulty)}
                      {"☆".repeat(5 - cert.difficulty)}
                    </dd>
                  </div>
                  <div className="space-y-2">
                    <dt className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                      合格率
                    </dt>
                    <dd className="text-3xl font-bold text-gray-900">
                      {cert.passRate !== undefined
                        ? `${cert.passRate}%`
                        : cert.examInfo?.passRateHistory &&
                          cert.examInfo.passRateHistory.length > 0
                        ? (() => {
                            const sortedHistory = [
                              ...cert.examInfo.passRateHistory,
                            ].sort((a, b) => b.year - a.year);
                            const latest = sortedHistory[0];
                            const latestData = latest.spring || latest.autumn;
                            return latestData?.passRate !== undefined
                              ? `${latestData.passRate}%`
                              : "未公開";
                          })()
                        : "未公開"}
                    </dd>
                  </div>
                  <div className="space-y-2">
                    <dt className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                      年間受験者数
                    </dt>
                    <dd className="text-2xl font-bold text-gray-900">
                      {cert.annualExaminees !== undefined ? (
                        <>
                          {cert.annualExaminees.toLocaleString()}
                          <span className="text-lg text-gray-600 font-normal">
                            人
                          </span>
                        </>
                      ) : cert.examInfo?.passRateHistory &&
                        cert.examInfo.passRateHistory.length > 0 ? (
                        (() => {
                          const sortedHistory = [
                            ...cert.examInfo.passRateHistory,
                          ].sort((a, b) => b.year - a.year);
                          const latest = sortedHistory[0];
                          const latestData = latest.spring || latest.autumn;
                          return latestData?.examinees !== undefined ? (
                            <>
                              {latestData.examinees.toLocaleString()}
                              <span className="text-lg text-gray-600 font-normal">
                                人
                              </span>
                            </>
                          ) : (
                            "未公開"
                          );
                        })()
                      ) : (
                        "未公開"
                      )}
                    </dd>
                  </div>
                  <div className="space-y-2">
                    <dt className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                      勉強時間
                    </dt>
                    <dd className="text-2xl font-bold text-gray-900">
                      {cert.studyHours?.beginner !== undefined ? (
                        <>
                          初学者: {cert.studyHours.beginner}
                          <span className="text-lg text-gray-600 font-normal">
                            時間
                          </span>
                        </>
                      ) : (
                        <span className="text-lg text-gray-600 font-normal">
                          目安: 200〜400時間
                        </span>
                      )}
                    </dd>
                  </div>
                </dl>
              );
            }
          })()}
        </div>

        {/* メインコンテンツ：3カラムレイアウト */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-10">
          {/* 左カラム：コンテンツ（縦配置） */}
          <div className="lg:col-span-4 space-y-6">
            {/* 過去問及び解答集 */}
            <Link
              href={`/certs/${cert.slug}/kakomon`}
              className="group relative bg-gradient-to-br from-emerald-500 via-green-500 to-teal-600 rounded-2xl shadow-xl p-6 md:p-7 hover:shadow-2xl transition-all duration-300 text-white overflow-hidden transform hover:-translate-y-1 block flex flex-col justify-between min-h-[200px]"
            >
              <div className="absolute top-0 right-0 bg-emerald-700/80 backdrop-blur-sm text-white px-4 py-2 rounded-bl-2xl text-xs font-bold uppercase tracking-wide">
                最重要
              </div>
              <div className="relative z-10 flex-1 flex flex-col">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-4xl">📝</span>
                  <h3 className="text-2xl font-bold tracking-tight">
                    過去問及び解説集
                  </h3>
                </div>
                <p className="text-emerald-50 text-base mb-4 leading-relaxed flex-1">
                  問題と正解を確認して実力を把握
                  {questions.length > 0 && (
                    <span className="block mt-1 text-lg font-semibold">
                      {questions.length}問掲載
                    </span>
                  )}
                </p>
                <div className="flex items-center gap-2 text-emerald-50 text-sm font-medium mt-auto group-hover:translate-x-1 transition-transform">
                  <span>アプリで問題演習も可能</span>
                  <span className="text-lg">→</span>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/0 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>

            {/* 勉強ロードマップ（高需要×高収益） */}
            <Link
              href={`/certs/${cert.slug}/study`}
              className="group relative bg-gradient-to-br from-amber-500 via-orange-500 to-red-600 rounded-2xl shadow-xl p-6 md:p-7 hover:shadow-2xl transition-all duration-300 text-white overflow-hidden transform hover:-translate-y-1 block flex flex-col justify-between min-h-[200px]"
            >
              <div className="absolute top-0 right-0 bg-amber-700/80 backdrop-blur-sm text-white px-4 py-2 rounded-bl-2xl text-xs font-bold uppercase tracking-wide">
                人気
              </div>
              <div className="relative z-10 flex-1 flex flex-col">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-4xl">📖</span>
                  <h3 className="text-2xl font-bold tracking-tight">
                    勉強方法・ロードマップ
                  </h3>
                </div>
                <p className="text-amber-50 text-base mb-4 leading-relaxed flex-1">
                  学習を始める前に確認すべきことから、最短合格を目指す学習ロードマップまで
                </p>
                <div className="flex items-center gap-2 text-amber-50 text-sm font-medium mt-auto group-hover:translate-x-1 transition-transform">
                  <span>診断ツールで学習計画作成</span>
                  <span className="text-lg">→</span>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/0 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>

            {/* 出題傾向（機能フラグで制御） */}
            {hasTrend && (
              <Link
                href={`/certs/${cert.slug}/trend`}
                className="group bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-lg p-5 md:p-6 hover:shadow-xl transition-all duration-300 text-white transform hover:-translate-y-1 block"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">📊</span>
                  <h3 className="text-xl font-bold tracking-tight">
                    出題傾向・頻出分野
                  </h3>
                </div>
                <p className="text-purple-50 text-sm leading-relaxed">
                  過去10年のデータ分析と頻出分野ランキング
                </p>
              </Link>
            )}

            {/* FAQ */}
            <Link
              href={`/certs/${cert.slug}/faq`}
              className="group bg-white rounded-2xl shadow-md border border-gray-100 p-5 md:p-6 hover:shadow-xl hover:border-gray-200 transition-all duration-300 transform hover:-translate-y-1 block"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl">❓</span>
                <h3 className="text-xl font-bold text-gray-900">
                  よくある質問
                </h3>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                試験や学習に関するよくある質問と回答
              </p>
            </Link>
          </div>

          {/* 右カラム：記事一覧 */}
          <div id="related-articles" className="lg:col-span-8 scroll-mt-24">
            <ArticleList articles={articles} />
          </div>
        </div>

        {/* アプリCTA（最後のCTA - 強） */}
        <section className="relative bg-gradient-to-br from-indigo-600 via-blue-600 to-purple-600 rounded-3xl shadow-2xl p-10 md:p-12 mb-6 text-white text-center overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/10 bg-[length:30px_30px] opacity-20"></div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
              {cert.shortName}の合格をアプリでサポート
            </h2>
            <p className="text-blue-50 mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
              過去問演習、学習進捗管理、弱点分析など、{cert.shortName}
              の学習に必要な機能を全てアプリで。
              <span className="block mt-2 font-semibold">
                無料で10問まで試せます。
              </span>
            </p>
            {articles.length > 0 && (
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="#related-articles"
                  className="group px-8 py-4 bg-white text-indigo-600 rounded-xl hover:bg-blue-50 transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105"
                >
                  <span className="flex items-center justify-center gap-2">
                    関連記事を見る
                    <span className="group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </span>
                </a>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
