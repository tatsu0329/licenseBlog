import Link from "next/link";
import { getAllCerts } from "@/lib/data/certs";

export default function CertsPage() {
  const certs = getAllCerts();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="text-sm text-gray-600 mb-2">
            <Link href="/" className="hover:text-gray-900">
              ホーム
            </Link>
            <span className="mx-2">/</span>
            <span>資格一覧</span>
          </nav>
          <h1 className="text-2xl font-bold text-gray-900">資格一覧</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certs.map((cert) => (
            <Link
              key={cert.id}
              href={`/certs/${cert.slug}`}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {cert.name}
              </h2>
              <p className="text-gray-600 text-sm mb-4">{cert.description}</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">合格率: {cert.passRate}%</span>
                <span className="font-medium text-blue-600">詳細 →</span>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}



