import Link from "next/link";
import { getAllCerts } from "@/lib/data/certs";

export default function HomePage() {
  const certs = getAllCerts();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-gray-900">
            国家資格の過去問解説と勉強法
          </h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            人気の資格
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certs.map((cert) => (
              <Link
                key={cert.id}
                href={`/certs/${cert.slug}`}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {cert.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4">{cert.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    合格率: {cert.passRate}%
                  </span>
                  <span className="text-sm font-medium text-blue-600">
                    詳細を見る →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            すべての資格を見る
          </h2>
          <Link
            href="/certs"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            資格一覧ページへ
          </Link>
        </section>
      </main>

      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-600">
              © 2024 国家資格メディア. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link href="/privacy-policy" className="text-sm text-gray-600 hover:text-gray-900">
                プライバシーポリシー
              </Link>
              <Link href="/disclaimer" className="text-sm text-gray-600 hover:text-gray-900">
                免責事項
              </Link>
              <Link href="/contact" className="text-sm text-gray-600 hover:text-gray-900">
                お問い合わせ
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}


