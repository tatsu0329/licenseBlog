import Link from "next/link";
import { Metadata } from "next";
import { getCert } from "@/lib/data/certs";
import PassRateChart from "@/components/charts/PassRateChart";
import ExamStatsTable from "@/components/charts/ExamStatsTable";
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
            <p className="leading-relaxed whitespace-pre-line">
              {cert.description}
            </p>
          </div>
        </section>

        {/* 受験資格 */}
        {cert.examInfo?.eligibility && (
          <section className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              受験資格
            </h2>
            <p className="text-xs text-gray-500 mb-4">
              詳細は公式サイトでご確認ください。
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
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
          
          {(() => {
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

            // 種類別データがあるかチェック（種類ごとに最新データを取得）
            const sortedHistory = cert.examInfo?.passRateHistory
              ? [...cert.examInfo.passRateHistory].sort((a, b) => b.year - a.year)
              : [];
            const latest = sortedHistory[0];
            const latestData = latest?.spring || latest?.autumn;
            
            // 種類ごとに最新データを取得（最新年度にデータがない種類がある場合の対応）
            const getLatestByType = (type: 'gasoline' | 'diesel' | 'motorcycle' | 'chassis') => {
              for (const item of sortedHistory) {
                const springData = item.spring?.byType?.[type];
                const autumnData = item.autumn?.byType?.[type];
                if (springData) return springData;
                if (autumnData) return autumnData;
              }
              return null;
            };
            
            const byType = {
              gasoline: latestData?.byType?.gasoline || getLatestByType('gasoline'),
              diesel: latestData?.byType?.diesel || getLatestByType('diesel'),
              motorcycle: latestData?.byType?.motorcycle || getLatestByType('motorcycle'),
              chassis: latestData?.byType?.chassis || getLatestByType('chassis'),
            };
            
            const hasByType = byType.gasoline || byType.diesel || byType.motorcycle || byType.chassis;

            // 種類別データがある場合、各種類ごとに年度ごとの平均合格率を計算
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

            // 資格の等級を判定（cert.idから抽出）
            const getLevel = (certId: string): string => {
              if (certId === 'auto-mechanic-1') return '1級';
              if (certId === 'auto-mechanic-2') return '2級';
              if (certId === 'auto-mechanic-3') return '3級';
              return ''; // その他の資格の場合は空文字
            };
            const level = getLevel(cert.id);

            return (
              <>
                {hasByType && byType ? (
                  /* 種類別データがある場合は種類別に年度ごとの平均を表示 */
                  <div className="space-y-6">
                    {/* ガソリン自動車整備士 */}
                    {getAveragePassRateByType('gasoline') !== undefined && (() => {
                      const avgRate = getAveragePassRateByType('gasoline')!;
                      const difficulty = getDifficultyFromPassRate(avgRate);
                      return (
                        <div className="border-l-4 border-blue-500 pl-4 py-3">
                          <h3 className="font-semibold text-gray-900 mb-3">
                            {level}ガソリン自動車整備士
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-2">難易度</h4>
                              <div className="text-3xl text-yellow-500 mb-2">
                                {"★".repeat(difficulty.level)}
                                {"☆".repeat(5 - difficulty.level)}
                              </div>
                              <p className="text-sm text-gray-600">
                                {difficulty.label}
                                {`（合格率平均${avgRate.toFixed(1)}%）`}
                              </p>
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-2">合格率（年度ごとの平均）</h4>
                              <div className="text-3xl font-bold text-gray-900 mb-2">
                                {avgRate.toFixed(1)}%
                              </div>
                              <p className="text-xs text-gray-500">
                                過去の全年度データの平均値
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })()}

                    {/* ジーゼル自動車整備士 */}
                    {getAveragePassRateByType('diesel') !== undefined && (() => {
                      const avgRate = getAveragePassRateByType('diesel')!;
                      const difficulty = getDifficultyFromPassRate(avgRate);
                      return (
                        <div className="border-l-4 border-green-500 pl-4 py-3">
                          <h3 className="font-semibold text-gray-900 mb-3">
                            {level}ジーゼル自動車整備士
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-2">難易度</h4>
                              <div className="text-3xl text-yellow-500 mb-2">
                                {"★".repeat(difficulty.level)}
                                {"☆".repeat(5 - difficulty.level)}
                              </div>
                              <p className="text-sm text-gray-600">
                                {difficulty.label}
                                {`（合格率平均${avgRate.toFixed(1)}%）`}
                              </p>
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-2">合格率（年度ごとの平均）</h4>
                              <div className="text-3xl font-bold text-gray-900 mb-2">
                                {avgRate.toFixed(1)}%
                              </div>
                              <p className="text-xs text-gray-500">
                                過去の全年度データの平均値
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })()}

                    {/* 二輪自動車整備士 */}
                    {getAveragePassRateByType('motorcycle') !== undefined && (() => {
                      const avgRate = getAveragePassRateByType('motorcycle')!;
                      const difficulty = getDifficultyFromPassRate(avgRate);
                      return (
                        <div className="border-l-4 border-purple-500 pl-4 py-3">
                          <h3 className="font-semibold text-gray-900 mb-3">
                            {level}二輪自動車整備士
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-2">難易度</h4>
                              <div className="text-3xl text-yellow-500 mb-2">
                                {"★".repeat(difficulty.level)}
                                {"☆".repeat(5 - difficulty.level)}
                              </div>
                              <p className="text-sm text-gray-600">
                                {difficulty.label}
                                {`（合格率平均${avgRate.toFixed(1)}%）`}
                              </p>
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-2">合格率（年度ごとの平均）</h4>
                              <div className="text-3xl font-bold text-gray-900 mb-2">
                                {avgRate.toFixed(1)}%
                              </div>
                              <p className="text-xs text-gray-500">
                                過去の全年度データの平均値
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })()}

                    {/* シャシ自動車整備士 */}
                    {getAveragePassRateByType('chassis') !== undefined && (() => {
                      const avgRate = getAveragePassRateByType('chassis')!;
                      const difficulty = getDifficultyFromPassRate(avgRate);
                      return (
                        <div className="border-l-4 border-orange-500 pl-4 py-3">
                          <h3 className="font-semibold text-gray-900 mb-3">
                            {level}シャシ自動車整備士
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-2">難易度</h4>
                              <div className="text-3xl text-yellow-500 mb-2">
                                {"★".repeat(difficulty.level)}
                                {"☆".repeat(5 - difficulty.level)}
                              </div>
                              <p className="text-sm text-gray-600">
                                {difficulty.label}
                                {`（合格率平均${avgRate.toFixed(1)}%）`}
                              </p>
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-2">合格率（年度ごとの平均）</h4>
                              <div className="text-3xl font-bold text-gray-900 mb-2">
                                {avgRate.toFixed(1)}%
                              </div>
                              <p className="text-xs text-gray-500">
                                過去の全年度データの平均値
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                ) : (
                  /* 種類別データがない場合は通常通り表示 */
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">難易度</h3>
                      <div className="text-3xl text-yellow-500 mb-2">
                        {"★".repeat(cert.difficulty)}
                        {"☆".repeat(5 - cert.difficulty)}
                      </div>
                      <p className="text-sm text-gray-600">
                        {cert.difficulty === 4
                          ? (() => {
                              // 最新の合格率を取得
                              if (
                                cert.examInfo?.passRateHistory &&
                                cert.examInfo.passRateHistory.length > 0
                              ) {
                                const sortedHistory = [
                                  ...cert.examInfo.passRateHistory,
                                ].sort((a, b) => b.year - a.year);
                                const latest = sortedHistory[0];
                                const latestData = latest.spring || latest.autumn;
                                if (latestData?.passRate !== undefined) {
                                  return `やや難しい（合格率${latestData.passRate}%）`;
                                }
                              }
                              // データがない場合は全期間の平均を計算
                              if (
                                cert.examInfo?.passRateHistory &&
                                cert.examInfo.passRateHistory.length > 0
                              ) {
                                const allRates: number[] = [];
                                cert.examInfo.passRateHistory.forEach((item) => {
                                  if (item.spring?.passRate !== undefined) {
                                    allRates.push(item.spring.passRate);
                                  }
                                  if (item.autumn?.passRate !== undefined) {
                                    allRates.push(item.autumn.passRate);
                                  }
                                });
                                if (allRates.length > 0) {
                                  const avgRate =
                                    allRates.reduce((sum, rate) => sum + rate, 0) /
                                    allRates.length;
                                  return `やや難しい（合格率平均${avgRate.toFixed(
                                    1
                                  )}%）`;
                                }
                              }
                              return "やや難しい（合格率参考値なし）";
                            })()
                          : cert.difficulty === 5
                          ? "非常に難しい"
                          : "普通"}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">合格率（年度ごとの平均）</h3>
                      <div className="text-3xl font-bold text-gray-900 mb-2">
                        {cert.passRate !== undefined
                          ? `${cert.passRate}%`
                          : cert.examInfo?.passRateHistory &&
                            cert.examInfo.passRateHistory.length > 0
                          ? (() => {
                              // 全期間の平均を計算
                              const allRates: number[] = [];
                              cert.examInfo.passRateHistory.forEach((item) => {
                                if (item.spring?.passRate !== undefined) {
                                  allRates.push(item.spring.passRate);
                                }
                                if (item.autumn?.passRate !== undefined) {
                                  allRates.push(item.autumn.passRate);
                                }
                              });
                              if (allRates.length > 0) {
                                const avgRate =
                                  allRates.reduce((sum, rate) => sum + rate, 0) /
                                  allRates.length;
                                return `${avgRate.toFixed(1)}%`;
                              }
                              return "参考値あり";
                            })()
                          : "年度により変動"}
                      </div>
                      <p className="text-xs text-gray-500">
                        過去の全年度データの平均値
                      </p>
                    </div>
                  </div>
                )}
              </>
            );
          })()}
        </section>

        {/* 合格率推移グラフ */}
        {cert.examInfo?.passRateHistory &&
          cert.examInfo.passRateHistory.length > 0 &&
          (() => {
            // 種類別データがあるかチェック（すべての年度から確認）
            const sortedHistory = [...cert.examInfo.passRateHistory].sort(
              (a, b) => b.year - a.year
            );
            const latest = sortedHistory[0];
            const latestData = latest.spring || latest.autumn;
            
            // 種類ごとにデータが存在するかチェック（すべての年度から）
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

            // 資格の等級を判定（cert.idから抽出）
            const getLevel = (certId: string): string => {
              if (certId === 'auto-mechanic-1') return '1級';
              if (certId === 'auto-mechanic-2') return '2級';
              if (certId === 'auto-mechanic-3') return '3級';
              return ''; // その他の資格の場合は空文字
            };
            const level = getLevel(cert.id);

            return (
              <section className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  合格率の推移（過去4年）
                </h2>
                
                {/* 種類別データがある場合は種類別に表示 */}
                {hasByType ? (
                  <div className="space-y-8">
                    {/* ガソリン自動車整備士 */}
                    {hasTypeData('gasoline') && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 border-l-4 border-blue-500 pl-3">
                          {level}ガソリン自動車整備士
                        </h3>
                        <PassRateChart
                          data={cert.examInfo.passRateHistory.map((item) => ({
                            year: item.year,
                            spring: item.spring?.byType?.gasoline
                              ? {
                                  passRate: item.spring.byType.gasoline.passRate,
                                  examinees: item.spring.byType.gasoline.examinees,
                                  passers: item.spring.byType.gasoline.passers,
                                }
                              : undefined,
                            autumn: item.autumn?.byType?.gasoline
                              ? {
                                  passRate: item.autumn.byType.gasoline.passRate,
                                  examinees: item.autumn.byType.gasoline.examinees,
                                  passers: item.autumn.byType.gasoline.passers,
                                }
                              : undefined,
                          }))}
                          title=""
                        />
                      </div>
                    )}

                    {/* ジーゼル自動車整備士 */}
                    {hasTypeData('diesel') && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 border-l-4 border-green-500 pl-3">
                          {level}ジーゼル自動車整備士
                        </h3>
                        <PassRateChart
                          data={cert.examInfo.passRateHistory.map((item) => ({
                            year: item.year,
                            spring: item.spring?.byType?.diesel
                              ? {
                                  passRate: item.spring.byType.diesel.passRate,
                                  examinees: item.spring.byType.diesel.examinees,
                                  passers: item.spring.byType.diesel.passers,
                                }
                              : undefined,
                            autumn: item.autumn?.byType?.diesel
                              ? {
                                  passRate: item.autumn.byType.diesel.passRate,
                                  examinees: item.autumn.byType.diesel.examinees,
                                  passers: item.autumn.byType.diesel.passers,
                                }
                              : undefined,
                          }))}
                          title=""
                        />
                      </div>
                    )}

                    {/* 二輪自動車整備士 */}
                    {hasTypeData('motorcycle') && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 border-l-4 border-purple-500 pl-3">
                          {level}二輪自動車整備士
                        </h3>
                        <PassRateChart
                          data={cert.examInfo.passRateHistory.map((item) => ({
                            year: item.year,
                            spring: item.spring?.byType?.motorcycle
                              ? {
                                  passRate: item.spring.byType.motorcycle.passRate,
                                  examinees: item.spring.byType.motorcycle.examinees,
                                  passers: item.spring.byType.motorcycle.passers,
                                }
                              : undefined,
                            autumn: item.autumn?.byType?.motorcycle
                              ? {
                                  passRate: item.autumn.byType.motorcycle.passRate,
                                  examinees: item.autumn.byType.motorcycle.examinees,
                                  passers: item.autumn.byType.motorcycle.passers,
                                }
                              : undefined,
                          }))}
                          title=""
                        />
                      </div>
                    )}

                    {/* シャシ自動車整備士 */}
                    {hasTypeData('chassis') && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 border-l-4 border-orange-500 pl-3">
                          {level}シャシ自動車整備士
                        </h3>
                        <PassRateChart
                          data={cert.examInfo.passRateHistory.map((item) => ({
                            year: item.year,
                            spring: item.spring?.byType?.chassis
                              ? {
                                  passRate: item.spring.byType.chassis.passRate,
                                  examinees: item.spring.byType.chassis.examinees,
                                  passers: item.spring.byType.chassis.passers,
                                }
                              : undefined,
                            autumn: item.autumn?.byType?.chassis
                              ? {
                                  passRate: item.autumn.byType.chassis.passRate,
                                  examinees: item.autumn.byType.chassis.examinees,
                                  passers: item.autumn.byType.chassis.passers,
                                }
                              : undefined,
                          }))}
                          title=""
                        />
                      </div>
                    )}
                  </div>
                ) : (
                  /* 種類別データがない場合は通常通り表示 */
                  <PassRateChart
                    data={cert.examInfo.passRateHistory}
                    title=""
                  />
                )}

                <div className="mt-4 text-sm text-gray-600">
                  <p>
                    ※
                    より詳細な統計データが必要な場合は、試験実施団体の公式サイトをご確認ください。
                  </p>
                </div>
              </section>
            );
          })()}


        {/* 最新データのサマリー（簡潔版） */}
        {cert.examInfo?.passRateHistory &&
          cert.examInfo.passRateHistory.length > 0 &&
          (() => {
            const sortedHistory = [...cert.examInfo.passRateHistory].sort(
              (a, b) => b.year - a.year
            );
            const latest = sortedHistory[0];
            const latestData = latest.spring || latest.autumn;

            if (!latestData) return null;

            // 種類ごとに最新データを取得（最新年度にデータがない種類がある場合の対応）
            const getLatestByType = (type: 'gasoline' | 'diesel' | 'motorcycle' | 'chassis') => {
              for (const item of sortedHistory) {
                const springData = item.spring?.byType?.[type];
                const autumnData = item.autumn?.byType?.[type];
                if (springData) return springData;
                if (autumnData) return autumnData;
              }
              return null;
            };
            
            const byType = {
              gasoline: latestData.byType?.gasoline || getLatestByType('gasoline'),
              diesel: latestData.byType?.diesel || getLatestByType('diesel'),
              motorcycle: latestData.byType?.motorcycle || getLatestByType('motorcycle'),
              chassis: latestData.byType?.chassis || getLatestByType('chassis'),
            };
            
            const hasByType = byType.gasoline || byType.diesel || byType.motorcycle || byType.chassis;

            // 資格の等級を判定（cert.idから抽出）
            const getLevel = (certId: string): string => {
              if (certId === 'auto-mechanic-1') return '1級';
              if (certId === 'auto-mechanic-2') return '2級';
              if (certId === 'auto-mechanic-3') return '3級';
              return ''; // その他の資格の場合は空文字
            };
            const level = getLevel(cert.id);

            return (
              <section className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  最新の試験データ（{latest.spring
                    ? formatExamPeriod(latest.year, 1)
                    : latest.autumn
                    ? formatExamPeriod(latest.year, 2)
                    : `${latest.year}年度`}）
                </h2>

                {/* 種類別データがある場合は種類別に表示 */}
                {hasByType && byType ? (
                  <div className="space-y-6">
                    {/* ガソリン自動車整備士 */}
                    {byType.gasoline && (
                      <div className="border-l-4 border-blue-500 pl-4 py-3">
                        <h3 className="font-semibold text-gray-900 mb-3">
                          {level}ガソリン自動車整備士
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="text-center p-4 bg-gray-50 rounded-lg">
                            <p className="text-2xl font-bold text-gray-900">
                              {byType.gasoline.passRate?.toFixed(1) || "-"}%
                            </p>
                            <p className="text-xs text-gray-500 mt-1">合格率</p>
                          </div>
                          <div className="text-center p-4 bg-gray-50 rounded-lg">
                            <p className="text-2xl font-bold text-gray-900">
                              {byType.gasoline.examinees?.toLocaleString() || "-"}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">受験者数</p>
                          </div>
                          <div className="text-center p-4 bg-gray-50 rounded-lg">
                            <p className="text-2xl font-bold text-gray-900">
                              {byType.gasoline.passers?.toLocaleString() || "-"}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">合格者数</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* ジーゼル自動車整備士 */}
                    {byType.diesel && (
                      <div className="border-l-4 border-green-500 pl-4 py-3">
                        <h3 className="font-semibold text-gray-900 mb-3">
                          {level}ジーゼル自動車整備士
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="text-center p-4 bg-gray-50 rounded-lg">
                            <p className="text-2xl font-bold text-gray-900">
                              {byType.diesel.passRate?.toFixed(1) || "-"}%
                            </p>
                            <p className="text-xs text-gray-500 mt-1">合格率</p>
                          </div>
                          <div className="text-center p-4 bg-gray-50 rounded-lg">
                            <p className="text-2xl font-bold text-gray-900">
                              {byType.diesel.examinees?.toLocaleString() || "-"}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">受験者数</p>
                          </div>
                          <div className="text-center p-4 bg-gray-50 rounded-lg">
                            <p className="text-2xl font-bold text-gray-900">
                              {byType.diesel.passers?.toLocaleString() || "-"}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">合格者数</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* 二輪自動車整備士 */}
                    {byType.motorcycle && (
                      <div className="border-l-4 border-purple-500 pl-4 py-3">
                        <h3 className="font-semibold text-gray-900 mb-3">
                          {level}二輪自動車整備士
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="text-center p-4 bg-gray-50 rounded-lg">
                            <p className="text-2xl font-bold text-gray-900">
                              {byType.motorcycle.passRate?.toFixed(1) || "-"}%
                            </p>
                            <p className="text-xs text-gray-500 mt-1">合格率</p>
                          </div>
                          <div className="text-center p-4 bg-gray-50 rounded-lg">
                            <p className="text-2xl font-bold text-gray-900">
                              {byType.motorcycle.examinees?.toLocaleString() || "-"}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">受験者数</p>
                          </div>
                          <div className="text-center p-4 bg-gray-50 rounded-lg">
                            <p className="text-2xl font-bold text-gray-900">
                              {byType.motorcycle.passers?.toLocaleString() || "-"}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">合格者数</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* シャシ自動車整備士 */}
                    {byType.chassis && (
                      <div className="border-l-4 border-orange-500 pl-4 py-3">
                        <h3 className="font-semibold text-gray-900 mb-3">
                          {level}シャシ自動車整備士
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="text-center p-4 bg-gray-50 rounded-lg">
                            <p className="text-2xl font-bold text-gray-900">
                              {byType.chassis.passRate?.toFixed(1) || "-"}%
                            </p>
                            <p className="text-xs text-gray-500 mt-1">合格率</p>
                          </div>
                          <div className="text-center p-4 bg-gray-50 rounded-lg">
                            <p className="text-2xl font-bold text-gray-900">
                              {byType.chassis.examinees?.toLocaleString() || "-"}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">受験者数</p>
                          </div>
                          <div className="text-center p-4 bg-gray-50 rounded-lg">
                            <p className="text-2xl font-bold text-gray-900">
                              {byType.chassis.passers?.toLocaleString() || "-"}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">合格者数</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  /* 種類別データがない場合は通常通り表示 */
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <p className="text-2xl font-bold text-gray-900">
                          {latestData.passRate !== undefined
                            ? `${latestData.passRate}%`
                            : "-"}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">合格率</p>
                      </div>
                    </div>
                    <div>
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <p className="text-2xl font-bold text-gray-900">
                          {latestData.examinees?.toLocaleString() || "-"}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">受験者数</p>
                      </div>
                    </div>
                    <div>
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <p className="text-2xl font-bold text-gray-900">
                          {latestData.passers?.toLocaleString() || "-"}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">合格者数</p>
                      </div>
                    </div>
                  </div>
                )}
              </section>
            );
          })()}

        {/* 勉強時間の目安 */}
        {cert.studyHours && (
          <section className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              勉強時間の目安
            </h2>
            {cert.studyHours.byType && (() => {
              // 種類別データがある場合は種類別に表示
              const studyHoursByType = cert.studyHours.byType;
              
              // 資格の等級を判定（cert.idから抽出）
              const getLevel = (certId: string): string => {
                if (certId === 'auto-mechanic-1') return '1級';
                if (certId === 'auto-mechanic-2') return '2級';
                if (certId === 'auto-mechanic-3') return '3級';
                return ''; // その他の資格の場合は空文字
              };
              const level = getLevel(cert.id);
              
              const typeNames = {
                gasoline: 'ガソリン',
                diesel: 'ジーゼル',
                motorcycle: '2輪',
                chassis: 'シャシ',
              };
              
              const types = [
                { key: 'gasoline' as const, name: typeNames.gasoline, color: 'blue' },
                { key: 'diesel' as const, name: typeNames.diesel, color: 'green' },
                { key: 'motorcycle' as const, name: typeNames.motorcycle, color: 'purple' },
                { key: 'chassis' as const, name: typeNames.chassis, color: 'orange' },
              ].filter(type => studyHoursByType[type.key]);

              return (
                <div className="space-y-6">
                  {types.map((type) => {
                    const hours = studyHoursByType[type.key]!;
                    const borderColorClass = {
                      blue: 'border-blue-500',
                      green: 'border-green-500',
                      purple: 'border-purple-500',
                      orange: 'border-orange-500',
                    }[type.color];

                    return (
                      <div key={type.key} className={`border-l-4 ${borderColorClass} pl-4 py-3`}>
                        <h3 className="font-semibold text-gray-900 mb-4">
                          {level}{type.name}自動車整備士
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="font-semibold text-gray-900 mb-2">
                              初学者の場合
                            </h4>
                            <p className="text-2xl font-bold text-gray-900 mb-2">
                              {hours.beginner}時間
                            </p>
                            <p className="text-sm text-gray-600">
                              1日2時間の学習で約
                              {Math.ceil(hours.beginner / (2 * 30))}ヶ月
                            </p>
                          </div>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="font-semibold text-gray-900 mb-2">
                              経験者の場合
                            </h4>
                            <p className="text-2xl font-bold text-gray-900 mb-2">
                              {hours.experienced}時間
                            </p>
                            <p className="text-sm text-gray-600">
                              1日2時間の学習で約
                              {Math.ceil(hours.experienced / (2 * 30))}ヶ月
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })() || (
              // 種類別データがない場合は通常の表示
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
            )}
          </section>
        )}

        {/* 試験日程・合格基準 */}
        {cert.examInfo && (
          <section className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              試験日程・合格基準
            </h2>
            <p className="text-xs text-gray-500 mb-4">
              詳細は各年度の試験実施要領および公式サイトでご確認ください。
            </p>
            <dl className="space-y-4">
              <div>
                <dt className="font-semibold text-gray-900 mb-1">試験日程</dt>
                <dd className="text-gray-700 whitespace-pre-line">
                  {cert.examInfo.examDates.spring ||
                  cert.examInfo.examDates.autumn ? (
                    <>
                      {cert.examInfo.examDates.spring && (
                        <p>第1回: {cert.examInfo.examDates.spring}</p>
                      )}
                      {cert.examInfo.examDates.autumn && (
                        <p>第2回: {cert.examInfo.examDates.autumn}</p>
                      )}
                    </>
                  ) : (
                    <p className="text-gray-600">
                      試験日は年度ごとに変動します。最新の試験日程は国土交通省の公式サイトでご確認ください。
                    </p>
                  )}
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-gray-900 mb-1">合格基準</dt>
                <dd className="text-gray-700 whitespace-pre-line">
                  {cert.examInfo.passCriteria}
                </dd>
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
            {cert.shortName}
            の学習を効率的に進めるため、診断ツールで最適な学習計画を作成しましょう。
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
