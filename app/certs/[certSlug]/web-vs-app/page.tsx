import Link from "next/link";
import { Metadata } from "next";
import { getCert } from "@/lib/data/certs";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ certSlug: string }>;
}): Promise<Metadata> {
  const { certSlug } = await params;
  const cert = getCert(certSlug);

  if (!cert) {
    return {
      title: "ページが見つかりません",
    };
  }

  return {
    title: `${cert.shortName}の学習｜Webとアプリの効果的な使い分け`,
    description: `${cert.shortName}の学習において、Webサイトとアプリをどのように使い分けるべきか、それぞれの役割と効果的な活用方法を解説します。`,
    alternates: {
      canonical: `/certs/${certSlug}/web-vs-app`,
    },
  };
}

export default async function WebVsAppPage({
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
            <span>Web vs アプリ</span>
          </nav>
          <h1 className="text-2xl font-bold text-gray-900">
            Webとアプリの効果的な使い分け
          </h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 概要 */}
        <section className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-lg p-6 mb-6 text-white">
          <h2 className="text-xl font-semibold mb-4">
            結論：それぞれに最適な役割があります
          </h2>
          <p className="leading-relaxed mb-4">
            {cert.shortName}の学習において、Webサイトとアプリにはそれぞれ異なる役割があります。
            どちらか一方だけでなく、両方を効果的に使い分けることで、学習効率が格段にアップします。
          </p>
          <div className="bg-white/20 rounded-lg p-4">
            <p className="font-semibold mb-2">最適な学習の流れ</p>
            <ol className="list-decimal list-inside space-y-1 text-sm">
              <li>Webで調べる・理解する</li>
              <li>アプリで解く・定着させる</li>
              <li>Webで復習・確認する</li>
            </ol>
          </div>
        </section>

        {/* Webサイトの役割 */}
        <section className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            🌐 Webサイトの役割：調べる・理解する
          </h2>
          <div className="space-y-4">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
              <h3 className="font-semibold text-gray-900 mb-2">
                Webサイトが得意なこと
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>
                  <strong>詳しい解説を読む：</strong>
                  過去問の詳細な解説、図解、関連知識をじっくり読む
                </li>
                <li>
                  <strong>全体像を把握する：</strong>
                  試験概要、出題傾向、勉強法のロードマップを確認
                </li>
                <li>
                  <strong>調べ学習：</strong>
                  わからない用語や技術を検索して理解を深める
                </li>
                <li>
                  <strong>学習計画を立てる：</strong>
                  勉強ロードマップ、学習計画ジェネレーターを活用
                </li>
                <li>
                  <strong>出題傾向の分析：</strong>
                  頻出分野、難易度分析などのデータを見る
                </li>
              </ul>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">
                  ✅ こんな時にWebを使う
                </h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                  <li>過去問を初めて見た時</li>
                  <li>解説をじっくり読みたい時</li>
                  <li>学習計画を立てる時</li>
                  <li>出題傾向を調べる時</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">
                  ❌ Webが不向きなこと
                </h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                  <li>通勤・通学中の学習</li>
                  <li>短時間の繰り返し演習</li>
                  <li>進捗の記録・管理</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* アプリの役割 */}
        <section className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            📱 アプリの役割：解く・定着させる
          </h2>
          <div className="space-y-4">
            <div className="bg-green-50 border-l-4 border-green-500 p-4">
              <h3 className="font-semibold text-gray-900 mb-2">
                アプリが得意なこと
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>
                  <strong>スキマ時間で問題演習：</strong>
                  通勤・通学中、待ち時間など短時間で問題を解く
                </li>
                <li>
                  <strong>繰り返し学習：</strong>
                  同じ問題を何度でも解いて知識を定着させる
                </li>
                <li>
                  <strong>進捗管理：</strong>
                  学習時間、正答率、弱点分野を自動記録
                </li>
                <li>
                  <strong>弱点の自動分析：</strong>
                  間違えた問題を自動で記録し、苦手分野を可視化
                </li>
                <li>
                  <strong>オフライン学習：</strong>
                  電波がない場所でも学習可能
                </li>
                <li>
                  <strong>模試機能：</strong>
                  本番形式の模試で実力を確認
                </li>
              </ul>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">
                  ✅ こんな時にアプリを使う
                </h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                  <li>通勤・通学中のスキマ時間</li>
                  <li>繰り返し問題を解く時</li>
                  <li>学習進捗を管理したい時</li>
                  <li>弱点を分析したい時</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">
                  ❌ アプリが不向きなこと
                </h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                  <li>詳しい解説を読む時</li>
                  <li>全体像を把握する時</li>
                  <li>図解やデータを見る時</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 使い分けの具体例 */}
        <section className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            効果的な使い分けの具体例
          </h2>
          <div className="space-y-6">
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold text-gray-900 mb-2">
                シナリオ1：新しい分野を学習する時
              </h3>
              <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700">
                <li>
                  <strong>Web：</strong>勉強ロードマップで全体像を確認
                </li>
                <li>
                  <strong>Web：</strong>過去問の解説をじっくり読む
                </li>
                <li>
                  <strong>アプリ：</strong>同じ分野の問題を繰り返し解く
                </li>
                <li>
                  <strong>アプリ：</strong>弱点分析で理解度を確認
                </li>
              </ol>
            </div>

            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="font-semibold text-gray-900 mb-2">
                シナリオ2：直前対策・総復習
              </h3>
              <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700">
                <li>
                  <strong>Web：</strong>出題傾向分析で頻出分野を確認
                </li>
                <li>
                  <strong>アプリ：</strong>頻出分野の問題を重点的に演習
                </li>
                <li>
                  <strong>アプリ：</strong>模試で実力を確認
                </li>
                <li>
                  <strong>Web：</strong>間違えた問題の解説を確認
                </li>
              </ol>
            </div>

            <div className="border-l-4 border-purple-500 pl-4">
              <h3 className="font-semibold text-gray-900 mb-2">
                シナリオ3：社会人の日常学習
              </h3>
              <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700">
                <li>
                  <strong>Web：</strong>週末に学習計画を立てる
                </li>
                <li>
                  <strong>アプリ：</strong>平日の通勤時間に問題演習
                </li>
                <li>
                  <strong>アプリ：</strong>進捗を自動記録・管理
                </li>
                <li>
                  <strong>Web：</strong>週末に弱点分野の解説を読む
                </li>
              </ol>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-r from-blue-500 to-green-500 rounded-lg shadow-lg p-6 mb-6 text-white text-center">
          <h2 className="text-xl font-bold mb-3">
            効率的な学習を始めましょう
          </h2>
          <p className="text-blue-100 mb-4">
            Webで理解を深め、アプリで知識を定着させる。
            両方を活用して、{cert.shortName}の合格を目指しましょう。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/certs/${cert.slug}/study`}
              className="px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-semibold"
            >
              📚 勉強ロードマップを見る
            </Link>
            <Link
              href={`/certs/${cert.slug}/app`}
              className="px-6 py-3 bg-white text-green-600 rounded-lg hover:bg-green-50 transition-colors font-semibold"
            >
              📱 アプリ詳細を見る
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}


