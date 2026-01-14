import Link from "next/link";
import { Metadata } from "next";
import { getAllCerts } from "@/lib/data/certs";
import { getAllApps } from "@/lib/data/apps";
import { getCert } from "@/lib/data/certs";
import Image from "next/image";

export const metadata: Metadata = {
  title: "国家資格の過去問解説と勉強法 | ライセンスブログ",
  description: "国家資格（自動車整備士、FP、簿記、宅建など）の過去問解説、勉強法、合格ロードマップを提供。過去問ベースの逆算学習で効率的に合格を目指せます。",
  openGraph: {
    title: "国家資格の過去問解説と勉強法 | ライセンスブログ",
    description: "国家資格（自動車整備士、FP、簿記、宅建など）の過去問解説、勉強法、合格ロードマップを提供。",
    type: "website",
  },
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  const certs = getAllCerts();
  const apps = getAllApps();

  // 紹介文を要約する関数（最初の段落または100文字程度）
  const getSummary = (description: string): string => {
    // 改行文字を削除し、最初の文または100文字程度を取得
    const cleanText = description.replace(/\n/g, " ").trim();
    if (cleanText.length <= 100) {
      return cleanText;
    }
    // 100文字で切るが、途中で切らないように文の区切りで切る
    const truncated = cleanText.substring(0, 100);
    const lastPeriod = truncated.lastIndexOf("。");
    const lastSpace = truncated.lastIndexOf("、");
    const cutPoint = Math.max(lastPeriod, lastSpace);
    if (cutPoint > 50) {
      return truncated.substring(0, cutPoint + 1) + "...";
    }
    return truncated + "...";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">
            国家資格の過去問解説と勉強法
          </h1>
          <p className="text-gray-600 mt-2">
            資格試験の過去問解説、勉強法、合格ロードマップを提供しています
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 資格一覧セクション */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">資格一覧</h2>
            <Link
              href="/certs"
              className="text-blue-600 hover:text-blue-800 font-medium text-sm"
            >
              すべて見る →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certs.map((cert) => {
              return (
                <Link
                  key={cert.id}
                  href={`/certs/${cert.slug}`}
                  className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow flex flex-col"
                >
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {cert.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 flex-1 leading-relaxed">
                    {getSummary(cert.description)}
                  </p>
                  <div className="flex items-center justify-end text-sm pt-4 border-t border-gray-200">
                    <span className="font-medium text-blue-600 hover:text-blue-800">
                      詳細を見る →
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* アプリ一覧セクション */}
        {apps.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">アプリ一覧</h2>
              <Link
                href="/apps"
                className="text-blue-600 hover:text-blue-800 font-medium text-sm"
              >
                すべて見る →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {apps.map((app) => {
                const cert = getCert(app.certId);

                return (
                  <Link
                    key={app.id}
                    href={`/apps/${app.slug}`}
                    className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow flex flex-col"
                  >
                    <div className="p-6 flex flex-col h-full">
                      {/* アプリアイコンとアプリ名 */}
                      <div className="flex items-center gap-4 mb-4">
                        {app.iconUrl && (
                          <div className="w-16 h-16 flex-shrink-0 rounded-xl overflow-hidden bg-gray-100">
                            <Image
                              src={app.iconUrl}
                              alt={app.name}
                              width={64}
                              height={64}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            {app.name}
                          </h3>
                          {cert && (
                            <p className="text-sm text-gray-600">{cert.name}</p>
                          )}
                        </div>
                      </div>

                      {/* 説明 */}
                      <p className="text-gray-600 text-sm mb-4 flex-1 leading-relaxed">
                        {app.description}
                      </p>

                      {/* 価格情報 */}
                      <div className="pt-4 border-t border-gray-200">
                        {app.pricing.free && (
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-700">
                              基本機能: 無料
                            </span>
                            {app.pricing.subscriptionPrice && (
                              <span className="text-sm text-gray-500">
                                ¥{app.pricing.subscriptionPrice.toLocaleString()}/月
                              </span>
                            )}
                          </div>
                        )}
                      </div>

                      {/* 詳細を見るリンク */}
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <span className="text-sm font-medium text-blue-600 hover:text-blue-800">
                          詳細を見る →
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}




