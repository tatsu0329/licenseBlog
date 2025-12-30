import { FAQ } from "../types";

// 自動車整備士1級のFAQ
export const faqsAutoMechanic1: FAQ[] = [
  {
    id: "faq-1-001",
    certId: "auto-mechanic-1",
    question: "自動車整備士1級の受験資格は？",
    answer:
      "自動車整備士1級の受験資格は、自動車整備士2級を取得後、実務経験3年以上が必要です。ただし、指定養成施設を修了した場合は、実務経験が1年以上で受験可能です。詳細は、国土交通省の公式サイトでご確認ください。",
    category: "受験資格",
    tags: ["受験資格", "実務経験"],
    relatedQuestionIds: [],
    order: 1,
    publishedAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "faq-1-002",
    certId: "auto-mechanic-1",
    question: "学科試験と実技試験の違いは？",
    answer:
      "学科試験は、エンジン、シャシ、電気装置、故障診断などの理論的な知識を問う試験です。実技試験は、実際の整備作業や測定器の使用、故障診断などの実践的な技能を問う試験です。両方とも60点以上で合格となります。",
    category: "試験内容",
    tags: ["学科試験", "実技試験", "合格基準"],
    relatedQuestionIds: [],
    order: 2,
    publishedAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "faq-1-003",
    certId: "auto-mechanic-1",
    question: "勉強時間の目安は？",
    answer:
      "初学者の場合、800時間程度の学習時間が必要とされています。実務経験がある場合は、400時間程度で十分な場合もあります。1日2時間の学習を続けると、約1年で800時間に達します。",
    category: "勉強法",
    tags: ["勉強時間", "学習計画"],
    relatedQuestionIds: [],
    order: 3,
    publishedAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "faq-1-004",
    certId: "auto-mechanic-1",
    question: "合格率はどれくらい？",
    answer:
      "自動車整備士1級の合格率は、約45%程度です。学科試験と実技試験の両方に合格する必要があるため、どちらか一方だけを重視するのではなく、バランスよく学習することが重要です。",
    category: "試験情報",
    tags: ["合格率", "難易度"],
    relatedQuestionIds: [],
    order: 4,
    publishedAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "faq-1-005",
    certId: "auto-mechanic-1",
    question: "実技試験では何が出題される？",
    answer:
      "実技試験では、エンジン、シャシ、電気装置の各分野から実技問題が出題されます。具体的には、測定器の使用、部品の点検・整備、故障診断などが問われます。実務経験を活かしながら、試験特有の形式に慣れる練習が必要です。",
    category: "実技試験",
    tags: ["実技試験", "出題内容"],
    relatedQuestionIds: [],
    order: 5,
    publishedAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "faq-1-006",
    certId: "auto-mechanic-1",
    question: "1級を取得するとどんなメリットがある？",
    answer:
      "自動車整備士1級を取得すると、自動車整備工場の主任技術者になることができます。また、より高度な整備技術を有する証明となり、キャリアアップや給与アップにつながる場合もあります。さらに、最近では電気自動車やハイブリッド車の技術も重要となっており、1級の知識が役立ちます。",
    category: "資格のメリット",
    tags: ["メリット", "キャリア"],
    relatedQuestionIds: [],
    order: 6,
    publishedAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
];

export function getAllFAQs(): FAQ[] {
  return [...faqsAutoMechanic1];
}

export function getFAQ(id: string): FAQ | undefined {
  return getAllFAQs().find((f) => f.id === id);
}

export function getFAQsByCert(certId: string): FAQ[] {
  return getAllFAQs()
    .filter((f) => f.certId === certId)
    .sort((a, b) => a.order - b.order);
}

