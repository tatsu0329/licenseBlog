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

// 2級自動車整備士のFAQ
export const faqsAutoMechanic2: FAQ[] = [
  {
    id: "faq-2-001",
    certId: "auto-mechanic-2",
    question: "2級自動車整備士の受験資格は？",
    answer:
      "2級自動車整備士の受験資格は、以下のいずれかが必要です。\n・自動車整備士3級を取得後、実務経験1〜2年以上（学歴要件による）\n・二級整備士養成課程の修了者\n\n学歴により実務経験年数が異なるため、詳細は国土交通省の公式サイトでご確認ください。",
    category: "受験資格",
    tags: ["受験資格", "実務経験", "3級"],
    relatedQuestionIds: [],
    order: 1,
    publishedAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "faq-2-002",
    certId: "auto-mechanic-2",
    question: "2級整備士には4つの種類があると聞きましたが、違いは何ですか？",
    answer:
      "2級整備士は、専門分野によって4種類に分かれています。\n\n【ガソリン自動車整備士】\n最も受験者数が多く、乗用車や軽自動車などガソリンエンジン搭載の四輪自動車を専門に整備します。一般的な自動車整備工場やディーラーで最も需要が高い資格です。\n\n【ジーゼル自動車整備士】\nトラックやバスなどの商用車を専門に整備します。ディーゼルエンジン特有の技術が必要で、商用車整備工場で特に需要が高いです。\n\n【二輪自動車整備士】\nオートバイ（自動二輪車）を専門に整備します。4種類の中で最も合格率が高いのが特徴です。\n\n【シャシ自動車整備士】\nエンジンを除く、シャシ（車体構造・走行装置）を専門に整備します。サスペンション、ブレーキ、タイヤなどの走行装置の整備技術が求められます。",
    category: "試験内容",
    tags: ["種類", "ガソリン", "ジーゼル", "2輪", "シャシ"],
    relatedQuestionIds: [],
    order: 2,
    publishedAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "faq-2-003",
    certId: "auto-mechanic-2",
    question: "学科試験の内容と問題数は？",
    answer:
      "2級整備士の学科試験は、以下の4つの分野から出題されます。\n\n・エンジン：問題1～15（15問）\n・シャシ：問題16～30（15問）\n・整備機器等：問題31～35（5問）\n・法規：問題36～40（5問）\n\nなお、シャシ以外の種類は40問、シャシは30問です。\n合格基準は、総得点の基準（シャシ以外：40問中28問以上、シャシ：30問中21問以上）と、各分野ごとの基準（各分野40%以上）が設けられています。",
    category: "試験内容",
    tags: ["学科試験", "問題数", "合格基準"],
    relatedQuestionIds: [],
    order: 3,
    publishedAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "faq-2-004",
    certId: "auto-mechanic-2",
    question: "どの種類が合格しやすいですか？",
    answer:
      "合格率は種類によって異なります。\n\n・2輪：平均合格率が最も高く、約80%程度\n・ジーゼル：約74%程度\n・ガソリン：約74%程度\n・シャシ：約90%程度（受験者数が少ない）\n\nただし、合格率だけで判断するのではなく、自分の就職先や将来のキャリアプランに合わせて選択することが重要です。一般的な自動車整備工場で働く場合は、ガソリンが最も需要が高いです。",
    category: "試験情報",
    tags: ["合格率", "難易度", "種類別"],
    relatedQuestionIds: [],
    order: 4,
    publishedAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "faq-2-005",
    certId: "auto-mechanic-2",
    question: "勉強時間の目安は？",
    answer:
      "種類によって異なりますが、おおよその目安は以下の通りです。\n\n・初学者の場合：\n  - ガソリン・ジーゼル・シャシ：500時間程度\n  - 2輪：450時間程度\n\n・実務経験がある場合：\n  - ガソリン・シャシ：300時間程度\n  - ジーゼル：320時間程度\n  - 2輪：280時間程度\n\n1日2時間の学習を続けると、初学者で約8-10ヶ月、経験者で約5-6ヶ月程度で合格レベルに達することができます。",
    category: "勉強法",
    tags: ["勉強時間", "学習計画", "種類別"],
    relatedQuestionIds: [],
    order: 5,
    publishedAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "faq-2-006",
    certId: "auto-mechanic-2",
    question: "実技試験では何が出題されますか？",
    answer:
      "実技試験では、30点満点で以下のような内容が出題されます。\n\n・測定器の使用（メガー、オシロスコープなど）\n・部品の点検・整備作業\n・故障診断の手順\n・作業の安全性や効率性\n\n合格基準は、総得点の基準（30点中18点以上）と、各分野ごとの基準（各分野40%以上）が設けられています。\n実務経験がある場合は、その経験を活かしながら、試験特有の形式に慣れる練習が必要です。",
    category: "実技試験",
    tags: ["実技試験", "出題内容", "合格基準"],
    relatedQuestionIds: [],
    order: 6,
    publishedAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "faq-2-007",
    certId: "auto-mechanic-2",
    question: "複数の種類を同時に受験できますか？",
    answer:
      "理論的には可能ですが、試験日程が同じ日のため、実際には1回の試験で1種類のみ受験することになります。複数の種類を取得したい場合は、別の回次で受験する必要があります。\n\nただし、各種類の学科試験は独立しているため、ガソリンに合格した後に、次回試験でジーゼルを受験することは可能です。実技試験も種類ごとに実施されます。",
    category: "試験内容",
    tags: ["複数種類", "同時受験", "受験回数"],
    relatedQuestionIds: [],
    order: 7,
    publishedAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "faq-2-008",
    certId: "auto-mechanic-2",
    question: "3級から2級へのステップアップは難しいですか？",
    answer:
      "3級から2級へのステップアップは、実務経験を積みながら学習することで十分に可能です。\n\n2級では、3級で学んだ基礎知識をより深く理解し、実践的な整備技術が求められます。特に、エンジンやシャシの構造・機能について、より詳細な知識が必要となります。\n\n過去問を中心に学習し、実務経験で得た知識と結びつけることで、効率的に合格レベルに達することができます。1級整備士を目指すための重要なステップでもあります。",
    category: "勉強法",
    tags: ["3級", "ステップアップ", "学習方法"],
    relatedQuestionIds: [],
    order: 8,
    publishedAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "faq-2-009",
    certId: "auto-mechanic-2",
    question: "2級を取得するとどんなメリットがありますか？",
    answer:
      "2級自動車整備士を取得すると、以下のようなメリットがあります。\n\n・より高度な整備作業が可能になる\n・自動車整備工場での責任ある業務を担当できる\n・給与アップやキャリアアップにつながる場合が多い\n・1級整備士の受験資格が得られる（実務経験3年以上後）\n・専門分野に特化した技術を証明できる（ガソリン・ジーゼル・2輪・シャシ）\n\n一般的な自動車整備工場やディーラーでは、2級整備士が中堅技術者として重要な役割を担っています。",
    category: "資格のメリット",
    tags: ["メリット", "キャリア", "給与"],
    relatedQuestionIds: [],
    order: 9,
    publishedAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "faq-2-010",
    certId: "auto-mechanic-2",
    question: "独学で2級に合格できますか？",
    answer:
      "3級を取得済みで実務経験がある場合は、独学での合格も十分に可能です。\n\n学科試験は過去問中心の学習で十分対応可能です。特に、エンジンとシャシの分野（各15問）を重点的に学習することが合格への鍵となります。\n\n実技試験については、実務経験を活かしながら、試験特有の形式に慣れる練習が必要です。実務経験がない場合は、講座の受講を検討することをおすすめします。",
    category: "勉強法",
    tags: ["独学", "勉強法", "実技試験"],
    relatedQuestionIds: [],
    order: 10,
    publishedAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "faq-2-011",
    certId: "auto-mechanic-2",
    question: "仕事をしながら合格できますか？",
    answer:
      "仕事をしながらでも合格は十分に可能です。実務経験がある場合は、その経験を活かすことで学習時間を短縮できます。\n\n1日1-2時間の学習時間を確保すれば、初学者で8-10ヶ月程度、経験者で5-6ヶ月程度で合格レベルに達することができます。\n\n通勤時間や休憩時間を活用してスマホアプリで学習するなど、スキマ時間の有効活用がポイントです。実務で学んだ知識と、過去問での学習を組み合わせることで、効率的に学習を進められます。",
    category: "勉強法",
    tags: ["社会人", "勉強時間", "スキマ時間"],
    relatedQuestionIds: [],
    order: 11,
    publishedAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "faq-2-012",
    certId: "auto-mechanic-2",
    question: "学科試験で不合格だった場合、実技試験は受けられますか？",
    answer:
      "いいえ、学科試験に合格しなければ実技試験を受けることはできません。\n\n2級整備士の試験は、学科試験と実技試験の両方に合格する必要があります。学科試験に合格した者のみが、実技試験を受験できます。\n\n学科試験で不合格だった場合は、次回試験までに間違えた分野を重点的に復習しましょう。特に、エンジンとシャシの分野（各15問）で40%以上の正答率を確保できるようにすることが重要です。",
    category: "試験対策",
    tags: ["不合格", "学科試験", "実技試験"],
    relatedQuestionIds: [],
    order: 12,
    publishedAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "faq-2-013",
    certId: "auto-mechanic-2",
    question: "試験は年に何回実施されますか？",
    answer:
      "2級整備士の試験は、年に2回実施されます。\n\n・第1回：通常10月頃実施\n・第2回：通常3月頃実施\n\n具体的な試験日程は年度によって異なるため、最新情報は一般社団法人日本自動車整備振興会連合会（JASPA）の公式サイトでご確認ください。\n学科試験と実技試験は別日程で実施される場合があるため、詳細なスケジュールを確認して学習計画を立てることが重要です。",
    category: "試験情報",
    tags: ["試験日程", "実施回数", "スケジュール"],
    relatedQuestionIds: [],
    order: 13,
    publishedAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "faq-2-014",
    certId: "auto-mechanic-2",
    question: "どの種類を選べば就職に有利ですか？",
    answer:
      "就職先や将来のキャリアプランによって異なります。\n\n【一般的な自動車整備工場やディーラーで働きたい場合】\n→ ガソリン自動車整備士が最も需要が高く、就職に有利です。\n\n【商用車の整備工場や輸送業界で働きたい場合】\n→ ジーゼル自動車整備士が有利です。\n\n【オートバイ専門店や二輪車ディーラーで働きたい場合】\n→ 二輪自動車整備士が有利です。\n\n【走行装置の専門的な整備をしたい場合】\n→ シャシ自動車整備士が有利です。\n\n多くの整備工場では、ガソリンとジーゼルの両方を取得しているとより有利です。",
    category: "資格のメリット",
    tags: ["就職", "キャリア", "種類別"],
    relatedQuestionIds: [],
    order: 14,
    publishedAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
];

export function getAllFAQs(): FAQ[] {
  return [...faqsAutoMechanic1, ...faqsAutoMechanic2];
}

export function getFAQ(id: string): FAQ | undefined {
  return getAllFAQs().find((f) => f.id === id);
}

export function getFAQsByCert(certId: string): FAQ[] {
  return getAllFAQs()
    .filter((f) => f.certId === certId)
    .sort((a, b) => a.order - b.order);
}
