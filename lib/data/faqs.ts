import { FAQ } from "../types";

// 1級自動車整備士のFAQ
export const faqsAutoMechanic1: FAQ[] = [
  {
    id: "faq-1-001",
    certId: "auto-mechanic-1",
    question: "1級自動車整備士の受験資格は？",
    answer:
      "1級自動車整備士の受験資格は、自動車整備士2級を取得後、実務経験3年以上が必要です。ただし、指定養成施設を修了した場合は、実務経験が1年以上で受験可能です。詳細は、国土交通省の公式サイトでご確認ください。",
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
      "1級自動車整備士の合格率は、約60%程度です。学科試験と実技試験の両方に合格する必要があるため、どちらか一方だけを重視するのではなく、バランスよく学習することが重要です。",
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
      "1級自動車整備士を取得すると、自動車整備工場の主任技術者になることができます。また、より高度な整備技術を有する証明となり、キャリアアップや給与アップにつながる場合もあります。さらに、最近では電気自動車やハイブリッド車の技術も重要となっており、1級の知識が役立ちます。",
    category: "資格のメリット",
    tags: ["メリット", "キャリア"],
    relatedQuestionIds: [],
    order: 6,
    publishedAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "faq-1-007",
    certId: "auto-mechanic-1",
    question: "独学で1級に合格できる？",
    answer:
      "2級を取得済みで実務経験がある場合は、独学での合格も可能です。ただし、実技試験の対策が独学では難しいため、実務経験がない場合は講座の受講を検討することをおすすめします。学科試験は過去問中心の学習で十分対応可能です。",
    category: "勉強法",
    tags: ["独学", "勉強法"],
    relatedQuestionIds: [],
    order: 7,
    publishedAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "faq-1-008",
    certId: "auto-mechanic-1",
    question: "仕事をしながら合格できる？",
    answer:
      "仕事をしながらでも合格は可能です。1日1-2時間の学習時間を確保すれば、6ヶ月〜1年程度で合格レベルに達することができます。通勤時間や休憩時間を活用してスマホアプリで学習するなど、スキマ時間の有効活用がポイントです。",
    category: "勉強法",
    tags: ["社会人", "勉強時間"],
    relatedQuestionIds: [],
    order: 8,
    publishedAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "faq-1-009",
    certId: "auto-mechanic-1",
    question: "落ちたら次どうすればいい？",
    answer:
      "不合格だった場合は、次回試験までに弱点を克服することが重要です。学科試験で不合格だった場合は、間違えた分野を重点的に復習しましょう。実技試験で不合格だった場合は、実務経験を積みながら、作業手順を徹底的に練習することが必要です。過去問を繰り返し解いて、次回に備えましょう。",
    category: "試験対策",
    tags: ["不合格", "再受験"],
    relatedQuestionIds: [],
    order: 9,
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
