import Link from "next/link";
import { Metadata } from "next";
import { getCert } from "@/lib/data/certs";
import { getCategoriesByCert } from "@/lib/data/categories";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ certSlug: string }>;
}): Promise<Metadata> {
  const { certSlug } = await params;
  const cert = getCert(certSlug);

  if (!cert) {
    return {
      title: "勉強法が見つかりません",
    };
  }

  return {
    title: `${cert.shortName}の勉強法・学習ロードマップ`,
    description: `${cert.shortName}の効率的な学習方法、おすすめ教材、学習計画をご紹介します。`,
    alternates: {
      canonical: `/certs/${certSlug}/study`,
    },
  };
}

export default async function StudyPage({
  params,
}: {
  params: Promise<{ certSlug: string }>;
}) {
  const { certSlug } = await params;
  const cert = getCert(certSlug);
  const categories = cert ? getCategoriesByCert(cert.id) : [];

  if (!cert) {
    return <div>資格が見つかりません</div>;
  }

  // 構造化データ（HowTo）
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `${cert.shortName}の勉強法`,
    description: `${cert.shortName}の効率的な学習方法とロードマップ`,
    step: [
      {
        "@type": "HowToStep",
        name: "基礎知識の習得",
        text: "テキストや参考書を使用して基礎知識を習得します。",
      },
      {
        "@type": "HowToStep",
        name: "過去問演習",
        text: "過去問を解いて問題形式に慣れ、知識の定着を図ります。",
      },
      {
        "@type": "HowToStep",
        name: "実技試験対策",
        text: "実技試験がある場合は、実践的な練習を行います。",
      },
    ],
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
              <span>勉強法</span>
            </nav>
            <h1 className="text-2xl font-bold text-gray-900">
              {cert.shortName}の勉強法・学習ロードマップ
            </h1>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* 学習ロードマップ */}
          <section className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              学習ロードマップ
            </h2>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-semibold text-gray-900 mb-2">
                  ステップ1: 基礎知識の習得（2-3ヶ月）
                </h3>
                <p className="text-gray-700 text-sm mb-2">
                  テキストや参考書を使用して、{cert.shortName}の基礎知識を体系的に学習します。
                </p>
                <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                  <li>公式テキストを1冊通読する</li>
                  <li>各分野の重要ポイントをノートにまとめる</li>
                  <li>専門用語の意味を理解する</li>
                </ul>
              </div>

              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="font-semibold text-gray-900 mb-2">
                  ステップ2: 過去問演習（2-3ヶ月）
                </h3>
                <p className="text-gray-700 text-sm mb-2">
                  過去問を解いて問題形式に慣れ、知識の定着を図ります。
                </p>
                <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                  <li>直近5年分の過去問を解く</li>
                  <li>間違えた問題を復習する</li>
                  <li>頻出問題を重点的に学習する</li>
                </ul>
              </div>

              {cert.examInfo?.passCriteria.includes("実技") && (
                <div className="border-l-4 border-orange-500 pl-4">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    ステップ3: 実技試験対策（1-2ヶ月）
                  </h3>
                  <p className="text-gray-700 text-sm mb-2">
                    実技試験がある場合は、実践的な練習を行います。
                  </p>
                  <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                    <li>実技試験の出題範囲を確認する</li>
                    <li>実際の作業手順を練習する</li>
                    <li>時間内に作業が完了できるようにする</li>
                  </ul>
                </div>
              )}

              <div className="border-l-4 border-purple-500 pl-4">
                <h3 className="font-semibold text-gray-900 mb-2">
                  ステップ4: 総復習・模試（1ヶ月）
                </h3>
                <p className="text-gray-700 text-sm mb-2">
                  試験直前は、総復習と模試で最終調整を行います。
                </p>
                <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                  <li>苦手分野を重点的に復習する</li>
                  <li>模試で時間配分を練習する</li>
                  <li>体調管理と生活リズムの調整</li>
                </ul>
              </div>
            </div>
          </section>

          {/* おすすめ教材 */}
          <section className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              おすすめ教材
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">公式テキスト・参考書</h3>
                <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                  <li>国土交通省発行の公式テキスト</li>
                  <li>各出版社の参考書（基礎から応用まで）</li>
                  <li>図解が多いものを選ぶと理解しやすい</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">過去問題集</h3>
                <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                  <li>直近5年分の過去問が掲載された問題集</li>
                  <li>解説が詳しいものを選ぶ</li>
                  <li>分野別に整理された問題集も有効</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">学習アプリ・オンライン講座</h3>
                <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                  <li>スマートフォンアプリでスキマ時間を活用</li>
                  <li>オンライン講座で動画学習</li>
                  <li>学習進捗を管理できるツールの活用</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 学習計画 */}
          <section className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              学習計画（{cert.studyHours?.beginner}時間想定）
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  {cert.studyHours?.beginner && cert.studyHours.beginner >= 600
                    ? "6ヶ月計画"
                    : "3ヶ月計画"}
                </h3>
                <div className="text-sm text-gray-700 space-y-2">
                  <p>
                    <strong>1週間あたりの学習時間:</strong>{" "}
                    {cert.studyHours?.beginner &&
                      Math.ceil(cert.studyHours.beginner / (cert.studyHours.beginner >= 600 ? 24 : 12))}
                    時間
                  </p>
                  <p>
                    <strong>1日あたりの学習時間:</strong> 1-2時間
                  </p>
                  <p className="text-gray-600">
                    ※初学者を想定した計画です。実務経験がある場合は、より短い期間で学習できます。
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">学習スケジュール例</h3>
                <div className="bg-gray-50 p-4 rounded text-sm">
                  <p className="font-semibold mb-2">月-金（平日）</p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>朝：30分（テキスト読書）</li>
                    <li>夜：1時間（過去問演習）</li>
                  </ul>
                  <p className="font-semibold mt-4 mb-2">土日</p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>午前：2時間（まとめて学習）</li>
                    <li>午後：2時間（実技練習または復習）</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* 分野別学習ポイント */}
          {categories.length > 0 && (
            <section className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                分野別学習ポイント
              </h2>
              <div className="space-y-4">
                {categories
                  .sort((a, b) => a.order - b.order)
                  .map((category) => (
                    <div key={category.id} className="border-b pb-3 last:border-b-0">
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {category.name}
                      </h3>
                      <p className="text-gray-700 text-sm">{category.description}</p>
                      <Link
                        href={`/certs/${cert.slug}/kakomon?category=${category.slug}`}
                        className="text-blue-600 hover:text-blue-800 text-sm mt-2 inline-block"
                      >
                        {category.name}の過去問を見る →
                      </Link>
                    </div>
                  ))}
              </div>
            </section>
          )}

          {/* 関連リンク */}
          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">関連リンク</h2>
            <div className="space-y-3">
              <Link
                href={`/certs/${cert.slug}/kakomon`}
                className="block p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors"
              >
                <span className="text-blue-600 hover:text-blue-800">
                  ← {cert.shortName}の過去問解説一覧
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

