import Link from "next/link";
import { getAllCerts } from "@/lib/data/certs";

export default function HomePage() {
  const certs = getAllCerts();

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

  // 合格率を取得する関数
  const getPassRate = (cert: (typeof certs)[0]): string | null => {
    if (cert.passRate !== undefined) {
      return `${cert.passRate}%`;
    }
    
    // passRateHistoryから最新の合格率を取得
    if (cert.examInfo?.passRateHistory && cert.examInfo.passRateHistory.length > 0) {
      const sortedHistory = [...cert.examInfo.passRateHistory].sort(
        (a, b) => b.year - a.year
      );
      
      for (const item of sortedHistory) {
        // 最新の合格率を優先
        if (item.autumn?.passRate !== undefined) {
          return `${item.autumn.passRate}%`;
        }
        if (item.spring?.passRate !== undefined) {
          return `${item.spring.passRate}%`;
        }
      }
    }
    
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-gray-900">資格一覧</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certs.map((cert) => {
            const passRate = getPassRate(cert);
            
            return (
              <Link
                key={cert.id}
                href={`/certs/${cert.slug}`}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow flex flex-col"
              >
                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  {cert.name}
                </h2>
                <p className="text-gray-600 text-sm mb-4 flex-1 leading-relaxed">
                  {getSummary(cert.description)}
                </p>
                <div className="flex items-center justify-between text-sm pt-4 border-t border-gray-200">
                  {passRate ? (
                    <span className="text-gray-700 font-medium">
                      合格率: <span className="text-blue-600">{passRate}</span>
                    </span>
                  ) : (
                    <span className="text-gray-500">合格率: 未公開</span>
                  )}
                  <span className="font-medium text-blue-600 hover:text-blue-800">
                    詳細を見る →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}




