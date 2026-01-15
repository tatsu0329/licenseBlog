import Link from "next/link";
import { notFound } from "next/navigation";
import { getAppBySlug, getAllApps } from "@/lib/data/apps";
import { getCert } from "@/lib/data/certs";
import { Metadata } from "next";
import Image from "next/image";
import BackButton from "@/components/BackButton";

export async function generateStaticParams() {
  const apps = getAllApps();
  return apps.map((app) => ({
    appSlug: app.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ appSlug: string }>;
}): Promise<Metadata> {
  const { appSlug } = await params;
  const app = getAppBySlug(appSlug);

  if (!app) {
    return {
      title: "アプリが見つかりません",
    };
  }

  const cert = getCert(app.certId);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://example.com";

  return {
    title: `${app.name} | ライセンスブログ`,
    description: app.description,
    alternates: {
      canonical: `/apps/${appSlug}`,
    },
    openGraph: {
      title: app.name,
      description: app.description,
      type: "website",
      url: `${baseUrl}/apps/${appSlug}`,
      images: app.iconUrl ? [{ url: app.iconUrl }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: app.name,
      description: app.description,
    },
  };
}

export default async function AppDetailPage({
  params,
}: {
  params: Promise<{ appSlug: string }>;
}) {
  const { appSlug } = await params;
  const app = getAppBySlug(appSlug);

  if (!app) {
    notFound();
  }

  const cert = getCert(app.certId);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <BackButton href="/apps" label={app.slug === "uscpa-app" ? "Back to App List" : "アプリ一覧に戻る"} />
          <nav className="text-sm text-gray-600 mb-2 mt-4">
            <Link href="/" className="hover:text-gray-900">
              {app.slug === "uscpa-app" ? "Home" : "ホーム"}
            </Link>
            <span className="mx-2">/</span>
            <Link href="/apps" className="hover:text-gray-900">
              {app.slug === "uscpa-app" ? "App List" : "アプリ一覧"}
            </Link>
            <span className="mx-2">/</span>
            <span>{app.slug === "uscpa-app" && app.nameEn ? app.nameEn : app.name}</span>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <article className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* ヘッダーセクション */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-8">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              {app.iconUrl && (
                <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0 rounded-2xl overflow-hidden bg-white shadow-lg">
                  <Image
                    src={app.iconUrl}
                    alt={app.name}
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                    priority
                    unoptimized={process.env.NODE_ENV === "development"}
                  />
                </div>
              )}
              <div className="flex-1 text-white">
                <h1 className="text-3xl font-bold mb-2">{app.slug === "uscpa-app" && app.nameEn ? app.nameEn : app.name}</h1>
                {cert && (
                  <Link
                    href={`/certs/${cert.slug}`}
                    className="inline-block px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-colors mb-2"
                  >
                    {cert.name}
                  </Link>
                )}
                <p className="text-blue-50 text-lg mb-4">{app.slug === "uscpa-app" && app.descriptionEn ? app.descriptionEn : app.description}</p>
                {/* ヘッダー内のダウンロードボタン */}
                {app.appStoreUrl && (
                  <a
                    href={app.appStoreUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-6 py-4 bg-black hover:bg-gray-900 text-white rounded-xl transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105"
                  >
                    <svg
                      className="w-8 h-8"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C1.79 15.25 2.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                    </svg>
                    <span>無料でダウンロード</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className="p-6 md:p-8">
            {/* 大きなダウンロードボタンCTA */}
            {app.appStoreUrl && (
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-6 mb-8 text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  今すぐ無料でダウンロード
                </h2>
                <p className="text-gray-600 mb-6">
                  スキマ時間で効率的に学習できる{app.name}
                </p>
                <a
                  href={app.appStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-black hover:bg-gray-900 text-white rounded-xl transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 w-full max-w-md mx-auto"
                >
                  <svg
                    className="w-8 h-8"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C1.79 15.25 2.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                  </svg>
                  <span>{app.slug === "uscpa-app" ? "Download for Free on App Store" : "App Storeで無料ダウンロード"}</span>
                </a>
                {app.pricing.free && (
                  <p className="text-sm text-gray-500 mt-3">
                    {app.slug === "uscpa-app" ? "✓ Completely free to use" : "✓ 完全無料で使えます"}
                  </p>
                )}
              </div>
            )}

            {/* スクリーンショット */}
            {app.screenshots && app.screenshots.length > 0 && (
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {app.slug === "uscpa-app" ? "Screenshots" : "スクリーンショット"}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  {app.screenshots.map((screenshot, index) => (
                    <div
                      key={`screenshot-${index}-${screenshot}`}
                      className="rounded-lg overflow-hidden bg-gray-100"
                    >
                      <Image
                        key={`image-${index}-${screenshot}`}
                        src={screenshot}
                        alt={`${app.slug === "uscpa-app" && app.nameEn ? app.nameEn : app.name} ${app.slug === "uscpa-app" ? "Screenshot" : "スクリーンショット"} ${index + 1}`}
                        width={400}
                        height={800}
                        className="w-full h-auto"
                        priority={index < 3}
                        unoptimized={process.env.NODE_ENV === "development"}
                      />
                    </div>
                  ))}
                </div>
                {/* スクリーンショット後のダウンロードボタン */}
                {app.appStoreUrl && (
                  <div className="text-center">
                    <a
                      href={app.appStoreUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 px-8 py-4 bg-black hover:bg-gray-900 text-white rounded-xl transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105"
                    >
                      <svg
                        className="w-8 h-8"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C1.79 15.25 2.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                      </svg>
                      <span>今すぐダウンロード</span>
                    </a>
                  </div>
                )}
              </section>
            )}

            {/* なぜこのアプリなのか - 1級 */}
            {app.slug === "auto-mechanic-1-app" && (
              <section className="mb-8 bg-blue-50 rounded-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  なぜこのアプリなのか
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      📱 1級試験に特化した設計
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      1級自動車整備士の学科試験は、配線図や構造図などの図表問題が多く出題されます。紙の問題集では細かい文字や線が読みにくい場合がありますが、本アプリでは画像をタップで拡大表示できるため、図表も正確に確認できます。特に配線図の問題では、この機能が大きな差となります。
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      ⏰ スキマ時間を合格力に変える
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      忙しい社会人や現役整備士の方でも、通勤・通学中や休憩時間などのスキマ時間を有効活用できます。1級試験は学科→口述→実技の段階的試験のため、まずは学科試験対策が重要です。毎日少しずつでも学習を続けることで、知識が定着し、合格に近づけます。
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      🎯 本番形式で実力チェック
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      1級学科試験は50問を制限時間内に解く必要があります。本番モードでは、実際の試験に近い形式で問題を解くことができるため、時間配分の練習や実力の確認ができます。難しい問題は後回しにして、確実に解ける問題から取り組む練習も可能です。
                    </p>
                  </div>
                </div>
              </section>
            )}

            {/* 主な機能 */}
            {app.features && app.features.length > 0 && (
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {app.slug === "uscpa-app" ? "Key Features" : "主な機能"}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {app.features.map((feature, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {app.slug === "uscpa-app" && feature.titleEn ? feature.titleEn : feature.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {app.slug === "uscpa-app" && feature.descriptionEn ? feature.descriptionEn : feature.description}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* なぜこのアプリなのか - 2級 */}
            {app.slug === "auto-mechanic-2-app" && (
              <section className="mb-8 bg-blue-50 rounded-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  なぜこのアプリなのか
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      📱 ガソリン・ジーゼル両対応
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      2級整備士のガソリン（Gコース）とジーゼル（Dコース）の両方の問題に対応。1つのアプリで、年度ごとに問題集を切り替えて学習できます。ガソリン・ジーゼル両方の資格を目指している方にも最適です。
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      📚 令和最新版の過去問を完全収録
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      令和7年度・令和6年度・令和5年度・令和4年度の国家2級整備士試験（学科）の過去問題を搭載。分野別・年度別に学習できるので、出題傾向の変化を比較しながら学べます。「どの分野がよく出るか」を意識して復習することで、短期間で合格レベルへ。
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      💾 途中保存・再開機能でスキマ時間を活用
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      途中まで解いた問題を保存し、アプリ再起動後も「続きから再開」できます。保存時のモードやシャッフル設定も記録されるため、学習環境をそのまま再現。忙しい整備士学校の学生や社会人の方でも、スキマ時間で学習を継続できます。
                    </p>
                  </div>
                </div>
              </section>
            )}

            {/* 効果的な使い方 - 1級 */}
            {app.slug === "auto-mechanic-1-app" && (
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  効果的な使い方
                </h2>
                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                          1
                        </span>
                        まずは学習モードで基礎を固める
                      </h3>
                      <p className="text-gray-700 leading-relaxed ml-10">
                        初めて問題を解く際は、学習モードを使用して、その場で正誤確認をしながら理解を深めます。間違えた問題には復習マークを付けて、後から効率的に復習できるようにしましょう。
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                          2
                        </span>
                        本番モードで実力を確認
                      </h3>
                      <p className="text-gray-700 leading-relaxed ml-10">
                        ある程度問題を解いたら、本番モードで時間を計って問題を解きます。実際の試験に近い感覚で問題を解くことで、時間配分の練習や実力の確認ができます。各分野40%以上の基準があるため、苦手分野を重点的に学習することも重要です。
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                          3
                        </span>
                        復習マークで苦手分野を克服
                      </h3>
                      <p className="text-gray-700 leading-relaxed ml-10">
                        復習マークを付けた問題を繰り返し解くことで、苦手分野を克服できます。成績保存・履歴管理機能を活用して、自分の学習進捗を確認しながら、モチベーションを維持しましょう。
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                          4
                        </span>
                        スキマ時間で繰り返し学習
                      </h3>
                      <p className="text-gray-700 leading-relaxed ml-10">
                        過去問は最低3回は繰り返し解くことが推奨されています。通勤・通学中や休憩時間などのスキマ時間を活用して、同じ問題を繰り返し解くことで、知識が定着します。
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* 効果的な使い方 - 2級 */}
            {app.slug === "auto-mechanic-2-app" && (
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  効果的な使い方
                </h2>
                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                          1
                        </span>
                        まずは学習モードで基礎を固める
                      </h3>
                      <p className="text-gray-700 leading-relaxed ml-10">
                        初めて問題を解く際は、学習モードを使用して、その場で正誤確認をしながら理解を深めます。間違えた問題には復習マークを付けて、後から効率的に復習できるようにしましょう。
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                          2
                        </span>
                        本番モードで実力を確認
                      </h3>
                      <p className="text-gray-700 leading-relaxed ml-10">
                        ある程度問題を解いたら、本番モードで時間を計って問題を解きます。実際の試験に近い感覚で問題を解くことで、時間配分の練習や実力の確認ができます。
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                          3
                        </span>
                        途中保存機能でスキマ時間を活用
                      </h3>
                      <p className="text-gray-700 leading-relaxed ml-10">
                        途中保存機能を使うことで、忙しい時でも途中まで解いた問題を保存し、後から続きから再開できます。通勤・通学中などのスキマ時間を有効活用して、学習を継続できます。
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                          4
                        </span>
                        履歴を振り返って弱点を克服
                      </h3>
                      <p className="text-gray-700 leading-relaxed ml-10">
                        解答結果は自動で保存され、過去の成績を一覧で確認できます。繰り返し間違える問題をチェックして、弱点を重点的に学習しましょう。
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* こんな方におすすめ - 1級 */}
            {app.slug === "auto-mechanic-1-app" && (
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  こんな方におすすめ
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white border-2 border-blue-200 rounded-lg p-5">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      👔 忙しい社会人の方
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      仕事をしながら1級整備士の資格取得を目指している方。スキマ時間を有効活用して、効率的に学習できます。
                    </p>
                  </div>
                  <div className="bg-white border-2 border-blue-200 rounded-lg p-5">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      🔧 現役整備士の方
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      現場で働きながら、1級整備士へのステップアップを目指している方。実務経験を活かしながら、学科試験対策を行えます。
                    </p>
                  </div>
                  <div className="bg-white border-2 border-blue-200 rounded-lg p-5">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      📚 独学で合格を目指す方
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      自分で学習計画を立てて、過去問を中心に学習したい方。アプリで過去問演習・復習・成績管理を1つで完結できます。
                    </p>
                  </div>
                  <div className="bg-white border-2 border-blue-200 rounded-lg p-5">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      🎯 図表問題が苦手な方
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      配線図や構造図などの図表問題が苦手な方。画像の拡大表示機能により、細かい文字や線も正確に確認できます。
                    </p>
                  </div>
                </div>
              </section>
            )}

            {/* 価格情報 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {app.slug === "uscpa-app" ? "Pricing Information" : "価格情報"}
              </h2>
              <div className="bg-gray-50 rounded-lg p-6">
                {app.pricing.free && (
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {app.slug === "uscpa-app" ? "Free Features" : "無料機能"}
                    </h3>
                    <ul className="list-disc list-inside space-y-1 text-gray-600">
                      {(app.slug === "uscpa-app" && app.freeFeaturesEn ? app.freeFeaturesEn : app.freeFeatures).map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {(app.pricing.subscriptionPrice || app.pricing.oneTimePrice) && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {app.slug === "uscpa-app" ? "Paid Plans" : "有料プラン"}
                    </h3>
                    <div className="space-y-2 mb-4">
                      {app.pricing.subscriptionPrice && (
                        <div className="flex items-center justify-between">
                          <span className="text-gray-700">{app.slug === "uscpa-app" ? "Monthly Plan" : "月額プラン"}</span>
                          <span className="font-semibold text-gray-900">
                            ¥{app.pricing.subscriptionPrice.toLocaleString()}/月
                          </span>
                        </div>
                      )}
                      {app.pricing.oneTimePrice && (
                        <div className="flex items-center justify-between">
                          <span className="text-gray-700">{app.slug === "uscpa-app" ? "One-time Purchase" : "買い切りプラン"}</span>
                          <span className="font-semibold text-gray-900">
                            ¥{app.pricing.oneTimePrice.toLocaleString()}
                          </span>
                        </div>
                      )}
                    </div>
                    <ul className="list-disc list-inside space-y-1 text-gray-600">
                      {(app.slug === "uscpa-app" && app.paidFeaturesEn ? app.paidFeaturesEn : app.paidFeatures).map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              {/* 価格情報後のダウンロードボタン */}
              {app.appStoreUrl && (
                <div className="mt-6 text-center">
                  <a
                    href={app.appStoreUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-black hover:bg-gray-900 text-white rounded-xl transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105"
                  >
                    <svg
                      className="w-8 h-8"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C1.79 15.25 2.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                    </svg>
                    <span>{app.slug === "uscpa-app" ? "Download for Free" : "無料でダウンロード"}</span>
                  </a>
                </div>
              )}
            </section>

            {/* こんな方におすすめ - 2級 */}
            {app.slug === "auto-mechanic-2-app" && (
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  こんな方におすすめ
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white border-2 border-blue-200 rounded-lg p-5">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      🎓 自動車整備士養成校の学生
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      整備士学校で学びながら、2級整備士試験の合格を目指している方。スキマ時間を有効活用して、効率的に学習できます。
                    </p>
                  </div>
                  <div className="bg-white border-2 border-blue-200 rounded-lg p-5">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      🆕 2級整備士試験を初めて受ける方
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      初めて2級整備士試験を受ける方。令和最新版の過去問を収録しているので、最新の出題傾向を把握できます。
                    </p>
                  </div>
                  <div className="bg-white border-2 border-blue-200 rounded-lg p-5">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      📱 過去問をスマホで効率的に解きたい方
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      紙の過去問では続かない方。スマホ1台で、いつでもどこでも本番対策を行えます。
                    </p>
                  </div>
                  <div className="bg-white border-2 border-blue-200 rounded-lg p-5">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      ⚡ ガソリン・ジーゼル両方の資格を目指している方
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      ガソリンとジーゼルの両方の資格を取得したい方。1つのアプリで、両方の問題集を切り替えて学習できます。
                    </p>
                  </div>
                </div>
              </section>
            )}

            {/* よくある質問 - 1級 */}
            {app.slug === "auto-mechanic-1-app" && (
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  よくある質問
                </h2>
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-5">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Q. 無料でどのくらい使えますか？
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      A. 本アプリは完全無料でご利用いただけます。すべての機能を制限なくお使いいただけます。
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-5">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Q. どのデバイスに対応していますか？
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      A. iPhone、iPad、Mac、Apple Visionに対応しています。iOS 16.0以降、iPadOS 16.0以降、macOS 13.0以降が必要です。
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-5">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Q. オフラインでも使えますか？
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      A. 過去問をダウンロードすることで、オフラインでも学習できます。通勤・通学中など、インターネット接続がない環境でもご利用いただけます。
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-5">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Q. 他の過去問アプリと何が違いますか？
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      A. 1級自動車整備士試験に特化した設計で、画像付き問題の拡大表示、本番モードでの時間配分練習、復習マーク機能など、1級試験対策に最適な機能を提供しています。
                    </p>
                  </div>
                </div>
              </section>
            )}

            {/* よくある質問 - 2級 */}
            {app.slug === "auto-mechanic-2-app" && (
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  よくある質問
                </h2>
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-5">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Q. 無料でどのくらい使えますか？
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      A. 本アプリは基本機能が無料でご利用いただけます。過去問の閲覧、学習モード・本番モード、復習マーク機能、途中保存・再開機能、ランダム出題、履歴保存機能などが無料で使えます。広告非表示オプションは有料プランで提供されています。
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-5">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Q. ガソリンとジーゼルの両方に対応していますか？
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      A. はい、ガソリン（Gコース）とジーゼル（Dコース）の両方の問題に対応しています。年度ごとに問題集を切り替えて学習できます。
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-5">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Q. 途中保存機能はどのように使いますか？
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      A. 途中まで解いた問題を保存し、アプリ再起動後も「続きから再開」できます。保存時のモードやシャッフル設定も記録されるため、学習環境をそのまま再現できます。
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-5">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Q. 他の過去問アプリと何が違いますか？
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      A. 2級自動車整備士試験に特化した設計で、ガソリン・ジーゼル両対応、途中保存・再開機能、履歴保存・結果分析機能など、2級試験対策に最適な機能を提供しています。
                    </p>
                  </div>
                </div>
              </section>
            )}

            {/* なぜこのアプリなのか - 3級 */}
            {app.slug === "auto-mechanic-3-app" && (
              <section className="mb-8 bg-blue-50 rounded-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  なぜこのアプリなのか
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      📱 ガソリン・ジーゼル両対応
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      3級整備士のガソリン（Gコース）とジーゼル（Dコース）の両方の問題に対応。1つのアプリで、年度ごとに問題集を切り替えて学習できます。ガソリン・ジーゼル両方の資格を目指している方にも最適です。
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      📚 令和最新版の過去問を収録
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      令和4年度〜令和7年度の国家3級整備士試験（学科）の過去問題を収録。各回30問を1セットで出題し、実際の試験形式に準拠しています。最新の出題傾向を把握できます。
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      🎯 ログインスタンプ機能で継続学習をサポート
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      毎日のアプリ起動でスタンプが記録され、ログイン連続記録（ストリーク）として可視化。継続的な学習習慣を作りたい受験生にぴったりです。進捗保存・再開機能と組み合わせて、スキマ時間を有効活用できます。
                    </p>
                  </div>
                </div>
              </section>
            )}

            {/* 効果的な使い方 - 3級 */}
            {app.slug === "auto-mechanic-3-app" && (
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  効果的な使い方
                </h2>
                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                          1
                        </span>
                        通常モードで基礎を固める
                      </h3>
                      <p className="text-gray-700 leading-relaxed ml-10">
                        初めて問題を解く際は、通常モード（学習モード）を使用して、選択肢をタップするとすぐに正誤が表示される形式で理解を深めます。間違えた問題には復習マークを付けて、後から効率的に復習できるようにしましょう。
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                          2
                        </span>
                        本番モードで実力を確認
                      </h3>
                      <p className="text-gray-700 leading-relaxed ml-10">
                        ある程度問題を解いたら、本番モード（模擬試験）で時間を計って問題を解きます。正誤は表示されず、すべての回答後に採点される緊張感ある形式で、実際の試験に近い感覚を体験できます。
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                          3
                        </span>
                        進捗保存機能でスキマ時間を活用
                      </h3>
                      <p className="text-gray-700 leading-relaxed ml-10">
                        進捗保存機能を使うことで、忙しい時でも途中まで解いた問題を保存し、後から続きから再開できます。保存内容には回答履歴・スコア・モード・出題順なども含まれ、完全再現が可能です。
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                          4
                        </span>
                        ログインスタンプで継続学習
                      </h3>
                      <p className="text-gray-700 leading-relaxed ml-10">
                        毎日のアプリ起動でスタンプが記録され、ログイン連続記録（ストリーク）として可視化されます。継続的な学習習慣を作り、履歴保存機能と組み合わせて弱点を克服しましょう。
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* こんな方におすすめ - 3級 */}
            {app.slug === "auto-mechanic-3-app" && (
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  こんな方におすすめ
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white border-2 border-blue-200 rounded-lg p-5">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      🎯 3級整備士試験を受験予定の方
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      国家3級整備士試験を受験予定の方。令和4年度〜令和7年度の過去問を収録しているので、最新の出題傾向を把握できます。
                    </p>
                  </div>
                  <div className="bg-white border-2 border-blue-200 rounded-lg p-5">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      🔧 ガソリン整備士・ジーゼル整備士として現場に出たい方
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      ガソリン整備士・ジーゼル整備士として現場に出たい方。ガソリン・ジーゼル両方の問題に対応しているので、両方の資格を目指す方にも最適です。
                    </p>
                  </div>
                  <div className="bg-white border-2 border-blue-200 rounded-lg p-5">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      📚 過去問を何度も繰り返し学びたい受験生
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      過去問を何度も繰り返し学びたい受験生。ランダム出題機能により、毎回出題順がシャッフルされるため、真の理解力を試せます。
                    </p>
                  </div>
                  <div className="bg-white border-2 border-blue-200 rounded-lg p-5">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      ⏰ スキマ時間で効率よく勉強したい方
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      通勤・通学中などのスキマ時間で効率よく勉強したい方。進捗保存・再開機能により、いつでも学習を継続できます。
                    </p>
                  </div>
                </div>
              </section>
            )}

            {/* よくある質問 - 3級 */}
            {app.slug === "auto-mechanic-3-app" && (
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  よくある質問
                </h2>
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-5">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Q. 無料でどのくらい使えますか？
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      A. 本アプリは基本機能が無料でご利用いただけます。過去問の閲覧、通常モード・本番モード、ランダム出題、復習マーク機能、進捗保存・再開機能、ログインスタンプ機能、履歴保存機能などが無料で使えます。広告非表示オプションは有料プランで提供されています。
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-5">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Q. ガソリンとジーゼルの両方に対応していますか？
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      A. はい、ガソリン（Gコース）とジーゼル（Dコース）の両方の問題に対応しています。年度ごとに問題集を切り替えて学習できます。
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-5">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Q. 進捗保存機能はどのように使いますか？
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      A. 回答の進行状況は保存しておくことができ、アプリ再起動後も再開可能です。保存内容には回答履歴・スコア・モード・出題順なども含まれ、完全再現が可能です。
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-5">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Q. ログインスタンプ機能とは何ですか？
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      A. 毎日のアプリ起動でスタンプが記録され、ログイン連続記録（ストリーク）として可視化されます。継続的な学習習慣を作りたい受験生にぴったりです。
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-5">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Q. 他の過去問アプリと何が違いますか？
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      A. 3級自動車整備士試験に特化した設計で、ガソリン・ジーゼル両対応、進捗保存・再開機能、ログインスタンプ機能、履歴保存・結果分析機能など、3級試験対策に最適な機能を提供しています。
                    </p>
                  </div>
                </div>
              </section>
            )}

            {/* なぜこのアプリなのか - 介護福祉士 */}
            {app.slug === "care-worker-app" && (
              <section className="mb-8 bg-blue-50 rounded-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  なぜこのアプリなのか
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      📱 年度別・科目別の過去問収録
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      令和4年度〜令和6年度の介護福祉士国家試験の過去問を収録。年度別問題セットと科目別問題セットで、出題傾向の変化を比較しながら学べます。各問題に解説つきで、理解を深めながら学習できます。
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      🎯 本番形式で実力を確認
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      本番モードでは、制限時間なしの連続解答で、本番と同じ「緊張感」でスコアを確認できます。実際の介護福祉士試験と同じ5択形式で、実戦力が自然に身につきます。
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      📚 スタンプカレンダー機能で継続学習
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      毎日学習を続けるとスタンプが貯まる「継続サポート」機能。モチベーション維持にも最適です。自動で学習履歴を保存し、いつ解いたか、何点だったか、何回挑戦したかが自動記録されます。
                    </p>
                  </div>
                </div>
              </section>
            )}

            {/* 効果的な使い方 - 介護福祉士 */}
            {app.slug === "care-worker-app" && (
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  効果的な使い方
                </h2>
                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                          1
                        </span>
                        年度を選ぶ
                      </h3>
                      <p className="text-gray-700 leading-relaxed ml-10">
                        まずは年度を選んで、過去問を解きます。令和4年度〜令和6年度の過去問が収録されているので、最新の出題傾向を把握できます。
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                          2
                        </span>
                        モードを選ぶ（本番 / 通常）
                      </h3>
                      <p className="text-gray-700 leading-relaxed ml-10">
                        通常モードで基礎を固めてから、本番モードで実力を確認します。本番モードでは、制限時間なしの連続解答で、本番と同じ「緊張感」を体験できます。
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                          3
                        </span>
                        シャッフル出題で理解を深める
                      </h3>
                      <p className="text-gray-700 leading-relaxed ml-10">
                        シャッフル出題機能により、並び順を変えて何度も解けるため、暗記ではなく理解が深まります。科目別学習で苦手な科目を重点的に学習できます。
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                          4
                        </span>
                        スタンプカレンダーで継続学習
                      </h3>
                      <p className="text-gray-700 leading-relaxed ml-10">
                        毎日学習を続けるとスタンプが貯まる機能で、継続的な学習習慣を作ります。学習履歴を振り返って、自分の成長を可視化しましょう。
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* こんな方におすすめ - 介護福祉士 */}
            {app.slug === "care-worker-app" && (
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  こんな方におすすめ
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white border-2 border-blue-200 rounded-lg p-5">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      🆕 はじめて介護福祉士試験を受ける人
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      初めて介護福祉士試験を受ける方。年度別・科目別の過去問を収録しているので、最新の出題傾向を把握できます。
                    </p>
                  </div>
                  <div className="bg-white border-2 border-blue-200 rounded-lg p-5">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      📚 過去問をもっと効率的に解きたい人
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      過去問をもっと効率的に解きたい方。シャッフル出題機能により、並び順を変えて何度も解けるため、暗記ではなく理解が深まります。
                    </p>
                  </div>
                  <div className="bg-white border-2 border-blue-200 rounded-lg p-5">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      ⏰ スキマ時間にスマホで学習したい人
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      通勤・通学中などのスキマ時間にスマホで学習したい方。いつでもどこでも過去問に挑戦できます。
                    </p>
                  </div>
                  <div className="bg-white border-2 border-blue-200 rounded-lg p-5">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      🎯 本番形式で模擬試験のように練習したい人
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      本番形式で模擬試験のように練習したい方。本番モードでは、制限時間なしの連続解答で、本番と同じ「緊張感」を体験できます。
                    </p>
                  </div>
                </div>
              </section>
            )}

            {/* よくある質問 - 介護福祉士 */}
            {app.slug === "care-worker-app" && (
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  よくある質問
                </h2>
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-5">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Q. 無料でどのくらい使えますか？
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      A. 本アプリは完全無料でご利用いただけます。過去問の閲覧、本番モード・通常モード、5択問題対応、年度別・科目別問題セット、シャッフル出題、スタンプカレンダー機能、学習履歴保存など、すべての機能を制限なくお使いいただけます。
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-5">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Q. どの年度の過去問が収録されていますか？
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      A. 令和4年度〜令和6年度の介護福祉士国家試験の過去問を収録しています。年度別問題セットと科目別問題セットで学習できます。
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-5">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Q. スタンプカレンダー機能とは何ですか？
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      A. 毎日学習を続けるとスタンプが貯まる「継続サポート」機能です。モチベーション維持にも最適で、継続的な学習習慣を作りたい受験生にぴったりです。
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-5">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Q. 科目別学習はできますか？
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      A. はい、科目別に問題を学習できる機能を搭載しています。苦手な科目を重点的に学習できます。
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-5">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Q. 他の過去問アプリと何が違いますか？
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      A. 介護福祉士国家試験に特化した設計で、年度別・科目別問題セット、本番モード・通常モード、5択問題対応、スタンプカレンダー機能、シャッフル出題、学習履歴保存など、介護福祉士試験対策に最適な機能を提供しています。
                    </p>
                  </div>
                </div>
              </section>
            )}

            {/* 関連資格 */}
            {cert && (
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  関連資格・学習リソース
                </h2>
                <div className="space-y-4">
                  <Link
                    href={`/certs/${cert.slug}`}
                    className="block p-5 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors border-2 border-blue-200"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {cert.name}の詳細情報
                    </h3>
                    <p className="text-gray-600 text-sm">
                      試験概要、合格率、勉強法、過去問解説など、{cert.name}に関する詳細情報を確認できます。
                    </p>
                    <span className="text-blue-600 font-medium text-sm mt-2 inline-block">
                      詳細を見る →
                    </span>
                  </Link>
                  <Link
                    href={`/certs/${cert.slug}/study`}
                    className="block p-5 bg-green-50 hover:bg-green-100 rounded-lg transition-colors border-2 border-green-200"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {cert.name}の勉強法・学習ロードマップ
                    </h3>
                    <p className="text-gray-600 text-sm">
                      効率的な学習方法や、学習ロードマップを確認できます。アプリと組み合わせて、より効果的な学習を実現しましょう。
                    </p>
                    <span className="text-green-600 font-medium text-sm mt-2 inline-block">
                      勉強法を見る →
                    </span>
                  </Link>
                  <Link
                    href={`/certs/${cert.slug}/kakomon`}
                    className="block p-5 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors border-2 border-purple-200"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {cert.name}の過去問解説
                    </h3>
                    <p className="text-gray-600 text-sm">
                      過去問の詳細な解説をWeb上で確認できます。アプリとWebを組み合わせて、より深い理解を目指しましょう。
                    </p>
                    <span className="text-purple-600 font-medium text-sm mt-2 inline-block">
                      過去問を見る →
                    </span>
                  </Link>
                </div>
              </section>
            )}

            {/* なぜこのアプリなのか - USCPA */}
            {app.slug === "uscpa-app" && (
              <section className="mb-8 bg-blue-50 rounded-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Why Choose This App for USCPA Prep?
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      📚 Full Coverage of CPA Evolution Exam Structure
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      Since 2024, the USCPA exam has shifted to a Core + Discipline model. All candidates must complete three Core sections—Auditing & Attestation (AUD), Financial Accounting & Reporting (FAR), and Regulation (REG)—plus one Discipline of their choice: Business Analysis & Reporting (BAR), Information Systems & Controls (ISC), or Tax Compliance & Planning (TCP). This app covers all combinations seamlessly.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      🎯 Rich Question Bank with Explanations & Media
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      Our database includes thousands of multiple-choice and task-based simulation questions with full explanations, images, and optional CSV-based content import. Questions adapt based on your performance and track weak areas.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      ⏰ Simulated Exam Mode & Study Mode
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      Study Mode delivers immediate feedback and rationales so you can learn on the spot. Exam Mode simulates the actual USCPA timing, difficulty progression, and interface to sharpen your test-taking stamina.
                    </p>
                  </div>
                </div>
              </section>
            )}

            {/* 効果的な使い方 - USCPA */}
            {app.slug === "uscpa-app" && (
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  How to Get the Most from the App
                </h2>
                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                          1
                        </span>
                        Pick your discipline based on interest or career path (BAR/ISC/TCP)
                      </h3>
                      <p className="text-gray-700 leading-relaxed ml-10">
                        Choose a discipline that aligns with your career goals. BAR pairs with FAR, ISC pairs with AUD, and TCP pairs with REG.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                          2
                        </span>
                        Begin with core sections
                      </h3>
                      <p className="text-gray-700 leading-relaxed ml-10">
                        Many candidates start with their strongest accounting or regulatory topic. Focus on mastering the three Core sections—AUD, FAR, and REG—first.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                          3
                        </span>
                        Use Study Mode for conceptual learning, then switch to Exam Mode
                      </h3>
                      <p className="text-gray-700 leading-relaxed ml-10">
                        Start with Study Mode to understand concepts and receive immediate feedback. Then switch to Exam Mode to test under pressure and build test-taking stamina.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                          4
                        </span>
                        Review weak points and pace yourself
                      </h3>
                      <p className="text-gray-700 leading-relaxed ml-10">
                        Flagged questions are automatically revisited. Complete 25-question "Part" segments at a time, and study daily for consistent progress.
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* よくある質問 - USCPA */}
            {app.slug === "uscpa-app" && (
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-5">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Q. Is this app free?
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      A. Yes, this app is completely free to use. All features, including over 1,500 questions, Study Mode, Exam Mode, progress tracking, and review features, are available at no cost.
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-5">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Q. Which exam sections are covered?
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      A. This app covers all USCPA exam sections: Core sections (AUD, FAR, REG) and all Discipline sections (BAR, ISC, TCP). You can prepare for any combination.
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-5">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Q. Can I import my own questions?
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      A. Yes, the app supports CSV-based content import. You can import your own questions and study materials.
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-5">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Q. What is the difference between Study Mode and Exam Mode?
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      A. Study Mode provides immediate feedback and explanations after each question, perfect for learning. Exam Mode simulates the actual USCPA exam experience with timing, difficulty progression, and interface matching the real test.
                    </p>
                  </div>
                </div>
              </section>
            )}

            {/* なぜこのアプリなのか - 公認会計士企業法 */}
            {app.slug === "cpa-corporate-law-app" && (
              <section className="mb-8 bg-blue-50 rounded-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  なぜこのアプリなのか
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      📱 企業法に特化した設計
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      公認会計士試験の「企業法」に特化した過去問学習アプリです。会社法、金融商品取引法、商法など、出題頻度の高いテーマを厳選し、短答式対策に最適な1問1答形式で収録しています。
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      📚 過去問ベースだから安心
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      公認会計士試験の過去問をベースにした問題を収録しているため、実際の試験形式に沿った問題で、本番に近い感覚で学習できます。年度別に問題を整理しているため、出題傾向の変化を把握しながら学習できます。
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      ⏰ スキマ時間で素早く復習
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      クイズ形式だから、暗記に偏りすぎず、論文式にもつながる法的思考力が自然と身につきます。通勤・通学中などのスキマ時間を有効活用して、学習時間を最大化し、「あと1点」が取れる実力を身につけます。
                    </p>
                  </div>
                </div>
              </section>
            )}

            {/* 効果的な使い方 - 公認会計士企業法 */}
            {app.slug === "cpa-corporate-law-app" && (
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  効果的な使い方
                </h2>
                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                          1
                        </span>
                        まずは学習モードで基礎を固める
                      </h3>
                      <p className="text-gray-700 leading-relaxed ml-10">
                        初めて問題を解く際は、学習モードを使用して、正解・不正解を即判定しながら理解を深めます。間違えた問題には復習マークを付けて、後から効率的に復習できるようにしましょう。
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                          2
                        </span>
                        本番モードで実力を確認
                      </h3>
                      <p className="text-gray-700 leading-relaxed ml-10">
                        ある程度問題を解いたら、本番モードで実際の試験に近い形式で問題を解きます。時間配分の練習や実力の確認ができます。
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                          3
                        </span>
                        結果画面で問題文を確認
                      </h3>
                      <p className="text-gray-700 leading-relaxed ml-10">
                        結果画面では、各問題の正誤、選んだ選択肢、正解を一覧で確認できます。問題文も確認できるため、復習がしやすくなっています。間違えた問題を重点的に学習しましょう。
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                          4
                        </span>
                        スキマ時間で繰り返し学習
                      </h3>
                      <p className="text-gray-700 leading-relaxed ml-10">
                        過去問は最低3回は繰り返し解くことが推奨されています。通勤・通学中や休憩時間などのスキマ時間を活用して、同じ問題を繰り返し解くことで、知識が定着し、法的思考力が身につきます。
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* こんな方におすすめ - 公認会計士企業法 */}
            {app.slug === "cpa-corporate-law-app" && (
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  こんな方におすすめ
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white border-2 border-blue-200 rounded-lg p-5">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      📚 公認会計士試験の短答式対策をしたい方
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      公認会計士試験の短答式試験で企業法の対策をしたい方。1問1答形式で、短答式対策に最適な学習ができます。
                    </p>
                  </div>
                  <div className="bg-white border-2 border-blue-200 rounded-lg p-5">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      ⏰ スキマ時間で素早く復習したい方
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      通勤・通学中などのスキマ時間で素早く復習したい方。クイズ形式だから、いつでもどこでも学習できます。
                    </p>
                  </div>
                  <div className="bg-white border-2 border-blue-200 rounded-lg p-5">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      🎯 法的思考力を身につけたい方
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      暗記に偏りすぎず、論文式にもつながる法的思考力を身につけたい方。過去問ベースの問題で、自然と法的思考力が身につきます。
                    </p>
                  </div>
                  <div className="bg-white border-2 border-blue-200 rounded-lg p-5">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      📖 年度別に学習したい方
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      年度別に問題を整理して、出題傾向の変化を把握しながら学習したい方。学習時間を最大化し、「あと1点」が取れる実力を身につけます。
                    </p>
                  </div>
                </div>
              </section>
            )}

            {/* よくある質問 - 公認会計士企業法 */}
            {app.slug === "cpa-corporate-law-app" && (
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  よくある質問
                </h2>
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-5">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Q. 無料でどのくらい使えますか？
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      A. 本アプリは基本機能が無料でご利用いただけます。過去問の閲覧、本番モード・学習モード、復習マーク機能、結果画面で問題文確認、年度別学習などが無料で使えます。広告非表示オプションは¥120の買い切りプランで提供されています。
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-5">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Q. どのような問題が収録されていますか？
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      A. 公認会計士試験の過去問をベースにした問題を収録しています。会社法、金融商品取引法、商法など、出題頻度の高いテーマを厳選しています。
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-5">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Q. 本番モードと学習モードの違いは何ですか？
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      A. 学習モードでは、正解・不正解を即判定し、その場で理解を深められます。本番モードでは、実際の試験に近い形式で問題を解くことができ、時間配分の練習や実力の確認ができます。
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-5">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Q. 他の過去問アプリと何が違いますか？
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      A. 公認会計士試験の「企業法」に特化した設計で、短答式対策に最適な1問1答形式、年度別学習、復習マーク機能、結果画面で問題文確認など、企業法試験対策に最適な機能を提供しています。
                    </p>
                  </div>
                </div>
              </section>
            )}

            {/* なぜこのアプリなのか - 習慣カレンダー */}
            {app.slug === "habit-calendar-app" && (
              <section className="mb-8 bg-blue-50 rounded-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  なぜこのアプリなのか
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      📱 習慣を「見える化」する設計
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      週間カレンダー形式の習慣グリッドで、7日間の習慣達成状況を一目で確認できます。続けるモチベーションが自然にアップし、三日坊主を卒業できます。
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      ⏰ 通知でリマインド
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      決めた時間に通知でお知らせするため、やることを忘れません。忙しい毎日でも、習慣を継続できます。
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      🎯 柔軟な繰り返し設定
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      「月・水・金だけ」など、習慣ごとに柔軟な繰り返しが可能です。複数の習慣を同時に管理でき、健康、勉強、家事、自己研鑽など、すべての習慣をまとめて記録できます。
                    </p>
                  </div>
                </div>
              </section>
            )}

            {/* 効果的な使い方 - 習慣カレンダー */}
            {app.slug === "habit-calendar-app" && (
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  効果的な使い方
                </h2>
                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                          1
                        </span>
                        まずは習慣を追加
                      </h3>
                      <p className="text-gray-700 leading-relaxed ml-10">
                        やりたい習慣を追加します。健康、勉強、家事、自己研鑽など、複数の習慣を同時に管理できます。
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                          2
                        </span>
                        曜日別の実施設定
                      </h3>
                      <p className="text-gray-700 leading-relaxed ml-10">
                        「月・水・金だけ」など、習慣ごとに柔軟な繰り返しを設定します。無理のない範囲で設定することが、継続のコツです。
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                          3
                        </span>
                        通知リマインダーを設定
                      </h3>
                      <p className="text-gray-700 leading-relaxed ml-10">
                        決めた時間に通知でお知らせするため、やることを忘れません。通知を有効にして、習慣を継続しましょう。
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                          4
                        </span>
                        毎日チェックして記録
                      </h3>
                      <p className="text-gray-700 leading-relaxed ml-10">
                        習慣を実行したら、チェック形式でパッと記録します。週間カレンダー形式の習慣グリッドで、7日間の達成状況を一目で確認でき、続けるモチベーションが自然にアップします。
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* こんな方におすすめ - 習慣カレンダー */}
            {app.slug === "habit-calendar-app" && (
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  こんな方におすすめ
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white border-2 border-blue-200 rounded-lg p-5">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      📅 三日坊主を卒業したい方
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      習慣を「見える化」することで、続けるモチベーションが自然にアップします。週間カレンダー形式の習慣グリッドで、達成状況を一目で確認できます。
                    </p>
                  </div>
                  <div className="bg-white border-2 border-blue-200 rounded-lg p-5">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      🎯 習慣を可視化して継続の手応えを得たい方
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      7日間の習慣達成状況を可視化することで、継続の手応えを実感できます。少しずつ理想の生活に近づけます。
                    </p>
                  </div>
                  <div className="bg-white border-2 border-blue-200 rounded-lg p-5">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      💪 健康や勉強の習慣を身につけたい方
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      健康、勉強、家事、自己研鑽など、複数の習慣を同時に管理できます。通知でリマインドするため、やることを忘れません。
                    </p>
                  </div>
                  <div className="bg-white border-2 border-blue-200 rounded-lg p-5">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      📱 シンプルな習慣アプリを探している方
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      シンプルで直感的なUIで、どなたでもすぐに使えます。複雑な機能はなく、習慣を記録することに集中できます。
                    </p>
                  </div>
                </div>
              </section>
            )}

            {/* よくある質問 - 習慣カレンダー */}
            {app.slug === "habit-calendar-app" && (
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  よくある質問
                </h2>
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-5">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Q. 無料でどのくらい使えますか？
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      A. 本アプリは完全無料でご利用いただけます。すべての機能を制限なくお使いいただけます。
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-5">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Q. どのデバイスに対応していますか？
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      A. iPhone、iPad、Mac、Apple Visionに対応しています。iOS 18.4以降、iPadOS 18.4以降、macOS 15.4以降が必要です。
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-5">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Q. 通知はどのように設定しますか？
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      A. 習慣を追加する際に、通知時間を設定できます。決めた時間に通知でお知らせするため、やることを忘れません。
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-5">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Q. 他の習慣管理アプリと何が違いますか？
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      A. 週間カレンダー形式の習慣グリッドで、7日間の習慣達成状況を一目で確認できます。シンプルで直感的なUIで、どなたでもすぐに使えます。通知でリマインドするため、やることを忘れません。
                    </p>
                  </div>
                </div>
              </section>
            )}

            {/* なぜこのアプリなのか - わたしのごはん */}
            {app.slug === "my-gohan-app" && (
              <section className="mb-8 bg-blue-50 rounded-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  なぜこのアプリなのか
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      📸 写真とメモで簡単記録
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      食事写真を登録し、店名やメニュー、料金、感想も記録できます。シンプルな操作で、手軽に外食ログを残せます。誰かに見せるほどじゃないけど、わたしにとってはちょっとした思い出。そんな「ごはん」を、写真とひとことメモでふんわりと残しておけます。
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      🔒 完全オフライン・プライバシー重視
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      すべてローカル保存で安心。完全オフラインで動作し、誰にも見せなくてOKです。SNSに投稿はしないけど、記録したい。そんな方にぴったりです。
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      📅 カレンダーとリストで振り返り
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      カレンダーでいつ何を食べたか見返せます。リスト表示で過去の食事を一括確認でき、「今月はラーメンが多かった」などの軽い自己分析もできます。旅行中のごはんメモ、出張中の食事管理、自炊記録にも便利です。
                    </p>
                  </div>
                </div>
              </section>
            )}

            {/* 効果的な使い方 - わたしのごはん */}
            {app.slug === "my-gohan-app" && (
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  効果的な使い方
                </h2>
                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                          1
                        </span>
                        食事の写真を撮る
                      </h3>
                      <p className="text-gray-700 leading-relaxed ml-10">
                        外食したら、まずは食事の写真を撮ります。写真フォルダが「ごはん」で埋まりがちな方も、アプリ内で整理できます。
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                          2
                        </span>
                        店名・メニュー・感想を記録
                      </h3>
                      <p className="text-gray-700 leading-relaxed ml-10">
                        店名やメニュー、料金、感想を記録します。「味」「コスパ」「静けさ」などの独自評価も可能です。自分だけの評価基準で、お気に入りのお店を記録できます。
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                          3
                        </span>
                        カレンダーで振り返る
                      </h3>
                      <p className="text-gray-700 leading-relaxed ml-10">
                        カレンダーでいつ何を食べたか見返せます。リスト表示で過去の食事を一括確認でき、振り返りが簡単です。
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                          4
                        </span>
                        軽い自己分析で食生活を把握
                      </h3>
                      <p className="text-gray-700 leading-relaxed ml-10">
                        「今月はラーメンが多かった」などの軽い自己分析ができます。自分の食生活の傾向を把握し、バランスの良い食事を心がけられます。
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* こんな方におすすめ - わたしのごはん */}
            {app.slug === "my-gohan-app" && (
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  こんな方におすすめ
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white border-2 border-blue-200 rounded-lg p-5">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      🍜 お店やメニューを、あとで振り返りたい方
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      旅行中のごはんメモ、出張中の食事管理、自炊記録にも便利です。カレンダーでいつ何を食べたか見返せます。
                    </p>
                  </div>
                  <div className="bg-white border-2 border-blue-200 rounded-lg p-5">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      📱 SNSに投稿はしないけど、記録したい方
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      完全オフラインで動作し、誰にも見せなくてOKです。プライバシーを守りながら、自分のごはん記録を残せます。
                    </p>
                  </div>
                  <div className="bg-white border-2 border-blue-200 rounded-lg p-5">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      📷 写真フォルダが「ごはん」で埋まりがちな方
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      アプリ内で整理できるため、写真フォルダが「ごはん」で埋まりがちな方にもおすすめです。写真とメモを一緒に管理できます。
                    </p>
                  </div>
                  <div className="bg-white border-2 border-blue-200 rounded-lg p-5">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      🍽️ 「外食ログ」を習慣にしたい方
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      「外食ログ」を習慣にしたい方におすすめです。シンプルな操作で、手軽に外食ログを残せます。
                    </p>
                  </div>
                </div>
              </section>
            )}

            {/* よくある質問 - わたしのごはん */}
            {app.slug === "my-gohan-app" && (
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  よくある質問
                </h2>
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-5">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Q. 無料でどのくらい使えますか？
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      A. 本アプリは完全無料でご利用いただけます。すべての機能を制限なくお使いいただけます。
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-5">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Q. データはどこに保存されますか？
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      A. すべてローカル保存で、デバイス内に保存されます。クラウドには保存されないため、プライバシーを守りながら、自分のごはん記録を残せます。
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-5">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Q. オフラインでも使えますか？
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      A. はい、完全オフラインで動作します。インターネット接続がなくても、すべての機能をご利用いただけます。
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-5">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Q. 他のグルメ記録アプリと何が違いますか？
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      A. 完全オフラインで動作し、すべてローカル保存のため、プライバシーを守りながら記録できます。SNSに投稿はしないけど、記録したい方にぴったりです。シンプルな操作で、手軽に外食ログを残せます。
                    </p>
                  </div>
                </div>
              </section>
            )}

            {/* なぜこのアプリなのか - ひわりん */}
            {app.slug === "hiwarin-app" && (
              <section className="mb-8 bg-blue-50 rounded-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  なぜこのアプリなのか
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      💰 1日あたりの価格で見直す
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      「この買い物、1日あたりXX円だったなら、全然アリじゃない？」そんな"自己肯定感バフ"がもらえる日割り計算アプリです。価格と使う期間を入れるだけで、1日あたりの金額をすぐに計算できます。
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      📊 ポジティブな見方をサポート
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      大きな出費もポジティブに捉えられるお金の見方をサポートします。自己投資や買い物に対する罪悪感をやわらげる"見せ方"を提供し、買い物の「納得感」と「理由」をくれます。
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      📱 SNSシェア機能
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      SNSにシェアしやすいポップな画像を生成できます。「この買い物、実はお得だった！」を視覚的に表現し、SNSで「いい買い物した！」を共有できます。
                    </p>
                  </div>
                </div>
              </section>
            )}

            {/* 効果的な使い方 - ひわりん */}
            {app.slug === "hiwarin-app" && (
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  効果的な使い方
                </h2>
                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                          1
                        </span>
                        価格と期間を入力
                      </h3>
                      <p className="text-gray-700 leading-relaxed ml-10">
                        買い物の価格と使う期間を入力します。たとえば、MacBook（¥140,000）を5年間使う場合や、コート（¥30,000）を3シーズン使う場合など、様々な買い物に対応できます。
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                          2
                        </span>
                        1日あたりの金額を確認
                      </h3>
                      <p className="text-gray-700 leading-relaxed ml-10">
                        アプリが自動で1日あたりの金額を計算します。「この買い物、1日あたりXX円だったなら、全然アリじゃない？」とポジティブに捉えられます。
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                          3
                        </span>
                        履歴を保存
                      </h3>
                      <p className="text-gray-700 leading-relaxed ml-10">
                        計算した履歴を保存できるため、過去の買い物も振り返れます。買い物の「納得感」と「理由」を記録できます。
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                          4
                        </span>
                        SNSでシェア
                      </h3>
                      <p className="text-gray-700 leading-relaxed ml-10">
                        SNSにシェアしやすいポップな画像を生成できます。「この買い物、実はお得だった！」を視覚的に表現し、SNSで「いい買い物した！」を共有できます。
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* こんな方におすすめ - ひわりん */}
            {app.slug === "hiwarin-app" && (
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  こんな方におすすめ
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white border-2 border-blue-200 rounded-lg p-5">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      💸 高い買い物で悩んでしまう方
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      大きな出費もポジティブに捉えられるお金の見方をサポートします。1日あたりの価格で見直すことで、買い物の「納得感」と「理由」を得られます。
                    </p>
                  </div>
                  <div className="bg-white border-2 border-blue-200 rounded-lg p-5">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      💪 自己投資をもっとポジティブに捉えたい方
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      自己投資や買い物に対する罪悪感をやわらげる"見せ方"を提供します。1日あたりの価格で見直すことで、自己投資をポジティブに捉えられます。
                    </p>
                  </div>
                  <div className="bg-white border-2 border-blue-200 rounded-lg p-5">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      📱 SNSで「いい買い物した！」を共有したい方
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      SNSにシェアしやすいポップな画像を生成できます。「この買い物、実はお得だった！」を視覚的に表現し、SNSで「いい買い物した！」を共有できます。
                    </p>
                  </div>
                  <div className="bg-white border-2 border-blue-200 rounded-lg p-5">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      🛍️ 買い物の判断をサポートしたい方
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      価格と使う期間を入れるだけで、1日あたりの金額をすぐに計算できます。買い物の判断をサポートし、あなたの買い物に「納得感」と「理由」をくれます。
                    </p>
                  </div>
                </div>
              </section>
            )}

            {/* よくある質問 - ひわりん */}
            {app.slug === "hiwarin-app" && (
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  よくある質問
                </h2>
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-5">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Q. 無料でどのくらい使えますか？
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      A. 本アプリは完全無料でご利用いただけます。すべての機能を制限なくお使いいただけます。
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-5">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Q. どのような買い物に対応していますか？
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      A. 価格と使う期間を入力できる買い物であれば、すべて対応しています。MacBookなどの高額な買い物から、コートなどの衣類まで、様々な買い物に対応できます。
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-5">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Q. 履歴はどこに保存されますか？
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      A. 計算した履歴はデバイス内にローカル保存されます。クラウドには保存されないため、プライバシーを守りながら、過去の買い物も振り返れます。
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-5">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Q. 他の買い物アプリと何が違いますか？
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      A. 1日あたりの価格で見直すことに特化した日割り計算アプリです。大きな出費もポジティブに捉えられるお金の見方をサポートし、SNSにシェアしやすいポップな画像を生成できます。自己投資や買い物に対する罪悪感をやわらげる"見せ方"を提供します。
                    </p>
                  </div>
                </div>
              </section>
            )}

            {/* 最終CTAセクション */}
            {app.appStoreUrl && (
              <section className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-8 text-center text-white mb-8">
                <h2 className="text-2xl font-bold mb-2">
                  {app.slug === "uscpa-app" ? "Prepare and conquer the USCPA Exam" : "スキマ時間で合格を目指す"}
                </h2>
                <p className="text-blue-50 mb-6">
                  {app.slug === "uscpa-app" 
                    ? "Start your USCPA preparation journey with confidence"
                    : `${app.name}で効率的に学習しましょう`}
                </p>
                <a
                  href={app.appStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-white hover:bg-gray-100 text-blue-600 rounded-xl transition-all duration-300 font-bold text-xl shadow-lg hover:shadow-xl hover:scale-105"
                >
                  <svg
                    className="w-8 h-8"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C1.79 15.25 2.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                  </svg>
                  <span>{app.slug === "uscpa-app" ? "Download for Free on App Store" : "App Storeで無料ダウンロード"}</span>
                </a>
              </section>
            )}
          </div>
        </article>
      </main>
    </div>
  );
}
