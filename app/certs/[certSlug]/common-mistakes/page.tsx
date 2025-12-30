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
      title: "よくある間違いが見つかりません",
    };
  }

  return {
    title: `${cert.shortName}でよくある間違い・落とし穴｜初学者が必ず勘違いするポイント`,
    description: `${cert.shortName}の試験でよくある間違い、初学者が勘違いしやすいポイント、本番で時間を失う原因を解説します。`,
    alternates: {
      canonical: `/certs/${certSlug}/common-mistakes`,
    },
  };
}

export default async function CommonMistakesPage({
  params,
}: {
  params: Promise<{ certSlug: string }>;
}) {
  const { certSlug } = await params;
  const cert = getCert(certSlug);

  if (!cert) {
    return <div>資格が見つかりません</div>;
  }

  const mistakes = [
    {
      category: "初学者が必ず勘違いするポイント",
      items: [
        {
          title: "2級と同じ感覚で学習する",
          description:
            "1級は2級とは難易度が大きく異なります。2級で通用していた学習方法では不十分です。",
          solution:
            "1級専用のテキストと過去問を使用し、より深い知識が必要であることを理解しましょう。",
          impact: "高",
        },
        {
          title: "実技試験を軽視する",
          description:
            "学科試験だけに集中してしまい、実技試験の対策を後回しにする受験者が多くいます。",
          solution:
            "学科と実技は同時に学習を進め、実技試験の作業手順を体で覚えることが重要です。",
          impact: "高",
        },
        {
          title: "最新技術を学ばない",
          description:
            "従来の技術だけを学び、EVやハイブリッド車などの最新技術を軽視してしまいます。",
          solution:
            "最新の技術動向を常に把握し、特にEV・HV関連の知識は必須です。",
          impact: "中",
        },
      ],
    },
    {
      category: "本番で時間を失う原因",
      items: [
        {
          title: "一問に時間をかけすぎる",
          description:
            "難しそうな問題に時間をかけすぎて、解けるはずの問題に時間が足りなくなります。",
          solution:
            "時間配分を事前に決めておき、難しい問題は後回しにして、確実に解ける問題から取り組みましょう。",
          impact: "高",
        },
        {
          title: "選択肢を全て読まずに判断する",
          description:
            "最初の選択肢が正解に見えて、他の選択肢を確認せずに答えてしまうことがあります。",
          solution:
            "全ての選択肢を読んでから、最も適切なものを選ぶ習慣をつけましょう。",
          impact: "中",
        },
        {
          title: "図表・写真の問題で焦る",
          description:
            "図表や写真を使った問題で、見慣れない形式に焦ってしまい、冷静に判断できなくなります。",
          solution:
            "図表・写真の問題に慣れるため、過去問で十分に練習しておきましょう。",
          impact: "中",
        },
      ],
    },
    {
      category: "実技試験でよくある失敗",
      items: [
        {
          title: "作業手順を覚えていない",
          description:
            "作業手順を理論的に理解していても、実際の手順を体で覚えていないため失敗します。",
          solution:
            "実際に作業を行い、手順を体で覚えることが重要です。実務経験がない場合は、講座の受講を検討しましょう。",
          impact: "高",
        },
        {
          title: "安全確認を怠る",
          description:
            "作業に集中しすぎて、安全確認を忘れてしまうことがあります。",
          solution:
            "安全確認は作業の一部として、必ずチェックリストに従って確認しましょう。",
          impact: "高",
        },
        {
          title: "測定器の読み取りミス",
          description:
            "測定器の目盛りの読み方を間違えたり、単位を間違えてしまうことがあります。",
          solution:
            "測定器の使い方に慣れ、読み取り方の練習を繰り返しましょう。",
          impact: "中",
        },
      ],
    },
    {
      category: "学習方法の間違い",
      items: [
        {
          title: "過去問を1回しか解かない",
          description:
            "過去問を1回解いただけで理解したつもりになり、繰り返し学習しない。",
          solution:
            "過去問は最低3回は繰り返し解き、間違えた問題は重点的に復習しましょう。",
          impact: "高",
        },
        {
          title: "暗記だけで対応しようとする",
          description:
            "理解せずに暗記だけで問題を解こうとし、応用問題に対応できなくなる。",
          solution:
            "なぜその答えになるのか、原理や仕組みを理解することが重要です。",
          impact: "中",
        },
        {
          title: "苦手分野を避ける",
          description:
            "苦手な分野を後回しにして、得意分野ばかり学習してしまう。",
          solution:
            "苦手分野こそ重点的に学習し、弱点を克服することが合格への近道です。",
          impact: "中",
        },
      ],
    },
  ];

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
            <span>よくある間違い</span>
          </nav>
          <h1 className="text-2xl font-bold text-gray-900">
            {cert.shortName}でよくある間違い・落とし穴
          </h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* イントロ */}
        <section className="bg-gradient-to-br from-red-500 to-orange-500 rounded-lg shadow-lg p-6 mb-6 text-white">
          <h2 className="text-xl font-semibold mb-4">
            ⚠️ これらの間違いを避けて、効率的に合格しましょう
          </h2>
          <p className="leading-relaxed">
            {cert.shortName}の試験では、多くの受験者が同じような間違いを繰り返しています。
            あらかじめこれらの落とし穴を知っておくことで、無駄な失敗を避け、効率的に学習を進めることができます。
          </p>
        </section>

        {/* カテゴリ別の間違い */}
        {mistakes.map((category, categoryIndex) => (
          <section
            key={categoryIndex}
            className="bg-white rounded-lg shadow-md p-6 mb-6"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              {category.category}
            </h2>
            <div className="space-y-6">
              {category.items.map((item, itemIndex) => (
                <div
                  key={itemIndex}
                  className="border-l-4 border-red-500 pl-4 py-2"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-900 text-lg">
                      {itemIndex + 1}. {item.title}
                    </h3>
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        item.impact === "高"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {item.impact === "高" ? "重要" : "要注意"}
                    </span>
                  </div>
                  <div className="bg-red-50 border border-red-200 rounded p-3 mb-2">
                    <p className="text-sm text-gray-700 font-medium mb-1">
                      ❌ なぜ間違えるのか
                    </p>
                    <p className="text-sm text-gray-700">{item.description}</p>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded p-3">
                    <p className="text-sm text-gray-700 font-medium mb-1">
                      ✅ 正しい対策
                    </p>
                    <p className="text-sm text-gray-700">{item.solution}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}

        {/* まとめ */}
        <section className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            💡 まとめ
          </h2>
          <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
            <li>
              間違いを事前に知ることで、同じ失敗を繰り返すリスクを減らせます。
            </li>
            <li>
              特に「初学者が勘違いするポイント」と「本番で時間を失う原因」は要注意です。
            </li>
            <li>
              過去問を繰り返し解き、実技試験の練習を十分に行うことで、これらの間違いを避けられます。
            </li>
          </ul>
        </section>

        {/* 関連リンク */}
        <section className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            関連リンク
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href={`/certs/${cert.slug}/study`}
              className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <h3 className="font-semibold text-gray-900 mb-1">
                📚 勉強ロードマップ
              </h3>
              <p className="text-sm text-gray-600">
                正しい学習方法を確認
              </p>
            </Link>
            <Link
              href={`/certs/${cert.slug}/kakomon`}
              className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
            >
              <h3 className="font-semibold text-gray-900 mb-1">
                📝 過去問解説
              </h3>
              <p className="text-sm text-gray-600">
                過去問で実力を確認
              </p>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

