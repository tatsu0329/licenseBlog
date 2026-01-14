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
          <BackButton href="/apps" label="アプリ一覧に戻る" />
          <nav className="text-sm text-gray-600 mb-2 mt-4">
            <Link href="/" className="hover:text-gray-900">
              ホーム
            </Link>
            <span className="mx-2">/</span>
            <Link href="/apps" className="hover:text-gray-900">
              アプリ一覧
            </Link>
            <span className="mx-2">/</span>
            <span>{app.name}</span>
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
                  />
                </div>
              )}
              <div className="flex-1 text-white">
                <h1 className="text-3xl font-bold mb-2">{app.name}</h1>
                {cert && (
                  <Link
                    href={`/certs/${cert.slug}`}
                    className="inline-block px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-colors mb-2"
                  >
                    {cert.name}
                  </Link>
                )}
                <p className="text-blue-50 text-lg mb-4">{app.description}</p>
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
                  <span>App Storeで無料ダウンロード</span>
                </a>
                {app.pricing.free && (
                  <p className="text-sm text-gray-500 mt-3">
                    ✓ 完全無料で使えます
                  </p>
                )}
              </div>
            )}

            {/* スクリーンショット */}
            {app.screenshots && app.screenshots.length > 0 && (
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  スクリーンショット
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  {app.screenshots.map((screenshot, index) => (
                    <div
                      key={index}
                      className="rounded-lg overflow-hidden bg-gray-100"
                    >
                      <Image
                        src={screenshot}
                        alt={`${app.name} スクリーンショット ${index + 1}`}
                        width={400}
                        height={800}
                        className="w-full h-auto"
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

            {/* なぜこのアプリなのか */}
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
                  主な機能
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {app.features.map((feature, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 効果的な使い方 */}
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

            {/* こんな方におすすめ */}
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
                価格情報
              </h2>
              <div className="bg-gray-50 rounded-lg p-6">
                {app.pricing.free && (
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      無料機能
                    </h3>
                    <ul className="list-disc list-inside space-y-1 text-gray-600">
                      {app.freeFeatures.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {(app.pricing.subscriptionPrice || app.pricing.oneTimePrice) && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      有料プラン
                    </h3>
                    <div className="space-y-2 mb-4">
                      {app.pricing.subscriptionPrice && (
                        <div className="flex items-center justify-between">
                          <span className="text-gray-700">月額プラン</span>
                          <span className="font-semibold text-gray-900">
                            ¥{app.pricing.subscriptionPrice.toLocaleString()}/月
                          </span>
                        </div>
                      )}
                      {app.pricing.oneTimePrice && (
                        <div className="flex items-center justify-between">
                          <span className="text-gray-700">買い切りプラン</span>
                          <span className="font-semibold text-gray-900">
                            ¥{app.pricing.oneTimePrice.toLocaleString()}
                          </span>
                        </div>
                      )}
                    </div>
                    <ul className="list-disc list-inside space-y-1 text-gray-600">
                      {app.paidFeatures.map((feature, index) => (
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
                    <span>無料でダウンロード</span>
                  </a>
                </div>
              )}
            </section>

            {/* よくある質問 */}
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

            {/* 最終CTAセクション */}
            {app.appStoreUrl && (
              <section className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-8 text-center text-white mb-8">
                <h2 className="text-2xl font-bold mb-2">
                  スキマ時間で合格を目指す
                </h2>
                <p className="text-blue-50 mb-6">
                  {app.name}で効率的に学習しましょう
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
                  <span>App Storeで無料ダウンロード</span>
                </a>
              </section>
            )}
          </div>
        </article>
      </main>
    </div>
  );
}
