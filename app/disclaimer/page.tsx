import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "免責事項",
  description: "本サイトの免責事項について",
};

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="text-sm text-gray-600 mb-2">
            <Link href="/" className="hover:text-gray-900">
              ホーム
            </Link>
            <span className="mx-2">/</span>
            <span>免責事項</span>
          </nav>
          <h1 className="text-2xl font-bold text-gray-900">免責事項</h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              過去問に関する免責事項
            </h2>
            <div className="text-gray-700 space-y-3 leading-relaxed">
              <p>
                本サイトに掲載されている過去問は、試験実施団体が公開している情報を参考に作成した解説コンテンツです。
              </p>
              <p>
                問題文は要約・部分引用の形式で掲載しており、著作権法第32条に基づく引用として適切に表示しています。
              </p>
              <p>
                問題文の正確性については保証いたしません。正式な過去問については、各試験実施団体の公式サイトまたは公式過去問題集をご確認ください。
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              著作権について
            </h2>
            <div className="text-gray-700 space-y-3 leading-relaxed">
              <p>
                本サイトに掲載されている過去問解説は、学習目的での個人利用に限ります。無断転載・複製を禁じます。
              </p>
              <p>
                過去問の著作権は各試験実施団体に帰属します。過去問の利用にあたっては、各試験実施団体の利用規約をご確認ください。
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              情報の正確性について
            </h2>
            <div className="text-gray-700 space-y-3 leading-relaxed">
              <p>
                本サイトに掲載されている情報（試験日程、合格基準、合格率等）は、公開時点の情報を基に作成しています。最新の情報については、各試験実施団体の公式サイトでご確認ください。
              </p>
              <p>
                情報の誤りや更新の遅れにより生じた損害について、当サイトは一切の責任を負いません。
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              リンクについて
            </h2>
            <div className="text-gray-700 space-y-3 leading-relaxed">
              <p>
                本サイトから他のサイトへのリンクについては、当サイトが管理していない外部サイトへのリンクを含みます。
              </p>
              <p>
                リンク先のサイトの内容やサービスについて、当サイトは一切の責任を負いません。
              </p>
            </div>
          </section>

          <section className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <p className="text-sm text-gray-700">
              <strong>お問い合わせ:</strong> 免責事項に関するご質問は、
              <Link href="/contact" className="text-blue-600 hover:text-blue-800 underline">
                お問い合わせページ
              </Link>
              からご連絡ください。
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}

