import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { getCert } from "@/lib/data/certs";
import { getAppByCert } from "@/lib/data/apps";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ certSlug: string }>;
}): Promise<Metadata> {
  const { certSlug } = await params;
  const cert = getCert(certSlug);
  const app = cert ? getAppByCert(cert.id) : undefined;

  if (!cert || !app) {
    return {
      title: "アプリ紹介が見つかりません",
    };
  }

  return {
    title: `${cert.shortName}アプリ - 過去問を無料で解く`,
    description: `${cert.shortName}の過去問をスマートフォンで学習できるアプリ。詳しい解説、弱点分析、学習進捗管理などの機能を提供しています。`,
    alternates: {
      canonical: `/certs/${certSlug}/app`,
    },
    openGraph: {
      title: `${cert.shortName}アプリ`,
      description: app.description,
      images: app.iconUrl ? [app.iconUrl] : [],
    },
  };
}

export default async function AppPage({
  params,
}: {
  params: Promise<{ certSlug: string }>;
}) {
  const { certSlug } = await params;
  const cert = getCert(certSlug);
  const app = cert ? getAppByCert(cert.id) : undefined;

  if (!cert || !app) {
    return <div>アプリ情報が見つかりません</div>;
  }

  // 構造化データ（SoftwareApplication）
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: app.name,
    description: app.description,
    applicationCategory: "EducationalApplication",
    operatingSystem: "iOS, Android",
    offers: {
      "@type": "Offer",
      price: app.pricing.free ? "0" : String(app.pricing.subscriptionPrice || 0),
      priceCurrency: "JPY",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.5",
      ratingCount: "1234",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

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
              <span>アプリ紹介</span>
            </nav>
            <h1 className="text-2xl font-bold text-gray-900">
              {cert.shortName}アプリ - 過去問を無料で解く
            </h1>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* ページヘッダー - CTA（最強） */}
          <section className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg p-8 mb-8 text-white">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-shrink-0">
                <div className="w-32 h-32 bg-white rounded-2xl shadow-lg flex items-center justify-center">
                  <span className="text-4xl">📱</span>
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-3xl font-bold mb-2">{app.name}</h2>
                <p className="text-blue-100 mb-4">{app.description}</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                  {app.appStoreUrl && (
                    <a
                      href={app.appStoreUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block"
                    >
                      <img
                        src="/images/app-store-badge.svg"
                        alt="App Storeからダウンロード"
                        className="h-12 w-auto"
                      />
                    </a>
                  )}
                  {app.googlePlayUrl && (
                    <a
                      href={app.googlePlayUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block"
                    >
                      <img
                        src="/images/google-play-badge.svg"
                        alt="Google Playで手に入れよう"
                        className="h-12 w-auto"
                      />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* スクリーンショット */}
          {app.screenshots.length > 0 && (
            <section className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                アプリ画面
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {app.screenshots.map((screenshot, index) => (
                  <div
                    key={screenshot}
                    className="relative aspect-[9/16] bg-gray-100 rounded-lg overflow-hidden"
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-gray-400 text-sm">
                        スクリーンショット {index + 1}
                      </span>
                    </div>
                    {/* 実際の画像がある場合は以下を使用
                    <Image
                      src={screenshot}
                      alt={`${app.name}のスクリーンショット ${index + 1}`}
                      fill
                      className="object-contain"
                    />
                    */}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 主な機能 */}
          <section className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              主な機能
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {app.features.map((feature, index) => (
                <div key={feature.title} className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    {feature.iconUrl ? (
                      <Image
                        src={feature.iconUrl}
                        alt=""
                        width={24}
                        height={24}
                        className="opacity-0"
                      />
                    ) : (
                      <span className="text-2xl">✨</span>
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 無料で解ける範囲 */}
          <section className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              無料で解ける範囲
            </h2>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
              <h3 className="font-semibold text-green-900 mb-2">
                ✅ 無料プランで使える機能
              </h3>
              <ul className="list-disc list-inside text-green-800 text-sm space-y-1">
                {app.freeFeatures.map((feature, index) => (
                  <li key={`free-${index}-${feature.substring(0, 20)}`}>{feature}</li>
                ))}
              </ul>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">
                💎 プレミアムプランで使える機能
              </h3>
              <ul className="list-disc list-inside text-blue-800 text-sm space-y-1">
                {app.paidFeatures.map((feature, index) => (
                  <li key={`paid-${index}-${feature.substring(0, 20)}`}>{feature}</li>
                ))}
              </ul>
            </div>
          </section>

          {/* 料金プラン */}
          <section className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              料金プラン
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 無料プラン */}
              <div className="border-2 border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  無料プラン
                </h3>
                <div className="text-3xl font-bold text-gray-900 mb-4">
                  ¥0
                  <span className="text-sm font-normal text-gray-600">/月</span>
                </div>
                <ul className="space-y-2 mb-6">
                  {app.freeFeatures.slice(0, 3).map((feature, index) => (
                    <li key={`free-plan-${index}-${feature.substring(0, 20)}`} className="flex items-start text-sm text-gray-600">
                      <span className="text-green-500 mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  disabled
                  className="w-full px-4 py-2 bg-gray-200 text-gray-600 rounded-lg cursor-not-allowed"
                >
                  現在このプラン
                </button>
              </div>

              {/* プレミアムプラン */}
              <div className="border-2 border-blue-500 rounded-lg p-6 relative">
                <div className="absolute top-0 right-0 bg-blue-500 text-white px-3 py-1 rounded-bl-lg text-sm font-semibold">
                  おすすめ
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  プレミアムプラン
                </h3>
                <div className="text-3xl font-bold text-gray-900 mb-4">
                  ¥{app.pricing.subscriptionPrice?.toLocaleString()}
                  <span className="text-sm font-normal text-gray-600">/月</span>
                </div>
                <ul className="space-y-2 mb-6">
                  {app.paidFeatures.slice(0, 3).map((feature, index) => (
                    <li key={`paid-plan-${index}-${feature.substring(0, 20)}`} className="flex items-start text-sm text-gray-600">
                      <span className="text-blue-500 mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <a
                  href={app.appStoreUrl || app.googlePlayUrl || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-center font-semibold"
                >
                  プレミアムにアップグレード
                </a>
              </div>
            </div>

            {app.pricing.oneTimePrice && (
              <div className="mt-4 text-center text-sm text-gray-600">
                買い切りプラン: ¥{app.pricing.oneTimePrice.toLocaleString()}
                もご用意しています
              </div>
            )}
          </section>

          {/* CTA（再度） */}
          <section className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg p-8 mb-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-4">
              {cert.shortName}の過去問を今すぐ解こう
            </h2>
            <p className="text-blue-100 mb-6">
              無料で10問まで解けます。まずは試してみてください！
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {app.appStoreUrl && (
                <a
                  href={app.appStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <img
                    src="/images/app-store-badge.svg"
                    alt="App Storeからダウンロード"
                    className="h-12 w-auto"
                  />
                </a>
              )}
              {app.googlePlayUrl && (
                <a
                  href={app.googlePlayUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <img
                    src="/images/google-play-badge.svg"
                    alt="Google Playで手に入れよう"
                    className="h-12 w-auto"
                  />
                </a>
              )}
            </div>
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
                  {cert.shortName}の過去問解説を見る →
                </span>
              </Link>
              <Link
                href={`/certs/${cert.slug}/study`}
                className="block p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors"
              >
                <span className="text-blue-600 hover:text-blue-800">
                  {cert.shortName}の勉強法を見る →
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

