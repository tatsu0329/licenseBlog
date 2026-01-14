import Link from "next/link";
import { getAllApps } from "@/lib/data/apps";
import { getCert } from "@/lib/data/certs";
import Image from "next/image";

export const metadata = {
  title: "アプリ一覧 | ライセンスブログ",
  description: "資格試験対策アプリの一覧",
};

export default async function AppsPage() {
  const apps = getAllApps();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="text-sm text-gray-600 mb-2">
            <Link href="/" className="hover:text-gray-900">
              ホーム
            </Link>
            <span className="mx-2">/</span>
            <span>アプリ一覧</span>
          </nav>
          <h1 className="text-2xl font-bold text-gray-900">アプリ一覧</h1>
          <p className="text-gray-600 mt-2">
            資格試験対策に役立つアプリを紹介しています
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {apps.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-600">アプリはまだありません。</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {apps.map((app) => {
              const cert = getCert(app.certId);

              return (
                <div
                  key={app.id}
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
                        <Link
                          href={`/apps/${app.slug}`}
                          className="block"
                        >
                          <h2 className="text-lg font-semibold text-gray-900 mb-1 hover:text-blue-600 transition-colors">
                            {app.name}
                          </h2>
                        </Link>
                        {cert && (
                          <Link
                            href={`/certs/${cert.slug}`}
                            className="text-sm text-blue-600 hover:text-blue-800"
                          >
                            {cert.name}
                          </Link>
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
                              プレミアム: ¥{app.pricing.subscriptionPrice.toLocaleString()}/月
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* 詳細を見るリンク */}
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <Link
                        href={`/apps/${app.slug}`}
                        className="text-sm font-medium text-blue-600 hover:text-blue-800 inline-block"
                      >
                        詳細を見る →
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
