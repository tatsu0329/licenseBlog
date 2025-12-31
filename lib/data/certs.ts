import { Cert } from "../types";

// 1級自動車整備士
const certAutoMechanic1: Cert = {
  id: "auto-mechanic-1",
  slug: "auto-mechanic-1",
  name: "1級自動車整備士",
  shortName: "1級自動車整備士",
  description:
    "1級自動車整備士は、自動車整備分野における最高位の国家資格であり、自動車の構造・性能・電子制御システムに関する高度な専門知識と判断力を有することを証明する資格です。\n\nエンジンやシャシといった従来の機械構造に加え、近年の自動車に不可欠な電子制御・安全支援システム・故障診断技術までを体系的に理解し、複雑な不具合の原因究明や、適切な整備方法の選択が求められます。\n\n1級自動車整備士は、現場での整備作業にとどまらず、整備方針の判断、後進の指導、工場全体の技術的中核を担う立場として位置づけられており、自動車整備工場やディーラーにおいて高い専門性が評価されます。\n\n本資格、学科（筆記・口述）および実技を通して、理論と実務の両面から能力が確認されます。その難易度は高く、確かな基礎力と計画的な学習が合格への鍵となります。",
  difficulty: 4,
  // 合格率・受験者数は年度により変動するため、トップレベルの固定値は持たない
  // 参考値が必要な場合は passRateHistory を参照すること
  annualExaminees: undefined,
  passRate: undefined,
  studyHours: {
    beginner: 800,
    experienced: 400,
  },
  examInfo: {
    // 受験資格：原則として2級取得後実務経験が必要だが、養成施設修了など条件により異なる
    eligibility:
      "下記のいずれか\n・自動車整備士2級取得後、実務経験3年以上\n・一級整備士養成課程の修了者",
    // 試験日は年度ごとに変動するため、固定日付は持たない
    // 試験は年2回（第1回・第2回）実施されるが、具体的な日程は年度ごとに公表される
    // 最新情報は公式サイトでご確認ください: https://www.jaspa.or.jp/mechanic/
    // 参考例：令和6年度第2回学科試験はR7.03.23（2025年3月23日）実施
    examDates: {
      spring: "実施なし", // 年度により変動するため固定値なし（例：令和6年度第1回は2024年6月頃実施）
      autumn: "令和7年3月23日実施(直近の実施回)", // 最新の実施日（参考例）
    },
    // 合格基準：年度ごとに公表される。学科・口述・実技それぞれに基準が設けられる
    // 1級は学科→口述→実技の段階的試験であり、各段階で合格基準が異なる
    // 出典: 一般社団法人日本自動車整備振興会連合会（JASPA）
    // 参考例（令和6年度第2回）：学科試験は50問中40問以上正解かつ各分野40%以上、口述試験は20点満点中16点以上、実技試験は40点満点中32点以上かつ各問題40%以上
    // 公式サイト: https://www.jaspa.or.jp/mechanic/
    passCriteria:
      "合格基準は年度ごとに公表され、学科試験・口述試験・実技試験それぞれに基準が設けられます。学科試験合格者のみが口述試験に進み、学科・口述両方に合格した者が実技試験を受験できます。\n・学科試験:総得点の基準（50問中40問以上）と各分野ごとの基準（各分野40%以上）\n・口述試験:総得点の基準（20点中16点以上）\n・実技試験:総得点の基準（40点中32点以上）と各分野ごとの基準（各分野40%以上）",
    // 合格率履歴：年度別の実績値（参考値として保持）
    // 出典: 一般社団法人日本自動車整備振興会連合会（JASPA）
    // 注：学科・口述・実技で合格率が異なるため、ここでは学科試験の結果を記載
    // 最終合格率（学科→口述→実技すべて通過）は各段階の合格率を乗算した値となる
    passRateHistory: [
      // 参考値として過去の実績を保持（学科・口述・実技の詳細は公式サイトで確認のこと）
      // 公式サイト: https://www.jaspa.or.jp/mechanic/result/
      {
        year: 2021,
        // 令和3年度第2回学科試験結果
        autumn: {
          passRate: 59,
          examinees: 2341,
          passers: 1381,
          examDate: "R4.03.20実施", // 令和4年3月20日実施（令和3年度第2回）
        },
      },
      {
        year: 2022,
        // 令和4年度第2回学科試験結果
        autumn: {
          passRate: 53.0,
          examinees: 2456,
          passers: 1302,
          examDate: "R5.03.26実施", // 令和5年3月26日実施（令和4年度第2回）
        },
      },
      {
        year: 2023,
        // 令和5年度第2回学科試験結果
        // 出典: https://www.jaspa.or.jp/mechanic/result/2023_2nd.html
        // 注: 1級は学科→口述→実技の段階的試験のため、これは学科試験のみの結果
        autumn: {
          passRate: 59.1, // 一級小型（筆記）学科試験合格率
          examinees: 2784, // 受験者数
          passers: 1645, // 合格者数
          examDate: "R6.03.24実施", // 令和6年3月24日実施（令和5年度第2回）
        },
      },
      {
        year: 2024,
        // 令和6年度第2回学科試験結果
        // 出典: https://www.jaspa.or.jp/mechanic/result/2024_2nd.html
        // 注: 1級は学科→口述→実技の段階的試験のため、これは学科試験のみの結果
        autumn: {
          passRate: 65.7, // 一級小型（筆記）学科試験合格率
          examinees: 2895, // 受験者数
          passers: 1902, // 合格者数
          examDate: "R7.03.23実施", // 令和7年3月23日実施（令和6年度第2回）
        },
      },
    ],
    // 試験構成：1級は学科→口述→実技の3段階で実施される
    // この情報は examInfo に追加フィールドとして持つ想定（型定義拡張が必要な場合は対応）
    // 現時点では passCriteria の説明文で言及している
  },
  relatedCertIds: ["auto-mechanic-2"],
  tags: ["自動車", "整備", "1級", "国家資格", "技術", "主任技術者"],
  features: ["trend", "articles"], // 出題傾向分析と記事機能を有効化
  publishedAt: new Date("2024-01-01"),
  updatedAt: new Date("2024-12-01"), // データ修正日
};

// 自動車整備士2級
const certAutoMechanic2: Cert = {
  id: "auto-mechanic-2",
  slug: "auto-mechanic-2",
  name: "自動車整備士2級",
  shortName: "自動車整備士2級",
  description:
    "自動車整備士2級は、自動車の整備に関する専門知識と技能を有することを証明する国家資格です。",
  difficulty: 3,
  annualExaminees: 25000,
  passRate: 55,
  studyHours: {
    beginner: 600,
    experienced: 300,
  },
  examInfo: {
    eligibility: "自動車整備士3級取得後、実務経験2年以上",
    examDates: {
      spring: "2024-06-15",
      autumn: "2024-11-10",
    },
    passCriteria: "学科60点以上、実技60点以上",
    passRateHistory: [
      {
        year: 2023,
        spring: {
          passRate: 53,
          examinees: 24500,
          passers: 12985,
        },
        autumn: {
          passRate: 57,
          examinees: 23800,
          passers: 13566,
        },
      },
      {
        year: 2024,
        spring: {
          passRate: 55,
          examinees: 25200,
          passers: 13860,
        },
      },
    ],
  },
  relatedCertIds: ["auto-mechanic-1", "auto-mechanic-3"],
  tags: ["自動車", "整備", "2級", "国家資格", "技術"],
  publishedAt: new Date("2024-01-01"),
  updatedAt: new Date("2024-01-01"),
};

// 自動車整備士3級
const certAutoMechanic3: Cert = {
  id: "auto-mechanic-3",
  slug: "auto-mechanic-3",
  name: "自動車整備士3級",
  shortName: "自動車整備士3級",
  description:
    "自動車整備士3級は、自動車の整備に関する基礎知識と技能を有することを証明する国家資格です。",
  difficulty: 2,
  annualExaminees: 35000,
  passRate: 65,
  studyHours: {
    beginner: 400,
    experienced: 200,
  },
  examInfo: {
    eligibility: "実務経験6ヶ月以上、または指定養成施設修了",
    examDates: {
      spring: "2024-06-15",
      autumn: "2024-11-10",
    },
    passCriteria: "学科60点以上、実技60点以上",
    passRateHistory: [
      {
        year: 2023,
        spring: {
          passRate: 63,
          examinees: 34800,
          passers: 21924,
        },
        autumn: {
          passRate: 67,
          examinees: 34200,
          passers: 22914,
        },
      },
      {
        year: 2024,
        spring: {
          passRate: 65,
          examinees: 35200,
          passers: 22880,
        },
      },
    ],
  },
  relatedCertIds: ["auto-mechanic-2"],
  tags: ["自動車", "整備", "3級", "国家資格", "技術"],
  publishedAt: new Date("2024-01-01"),
  updatedAt: new Date("2024-01-01"),
};

// 介護福祉士
const certCareWorker: Cert = {
  id: "care-worker",
  slug: "care-worker",
  name: "介護福祉士",
  shortName: "介護福祉士",
  description:
    "介護福祉士は、介護の専門家として高齢者や障害者の日常生活をサポートする国家資格です。",
  difficulty: 3,
  annualExaminees: 95000,
  passRate: 72,
  studyHours: {
    beginner: 600,
    experienced: 300,
  },
  examInfo: {
    eligibility: "実務経験3年以上、または福祉系高校卒業等",
    examDates: {
      spring: "2024-01-28",
    },
    passCriteria: "125点満点中、75点以上（総得点）かつ各領域得点の基準点以上",
    passRateHistory: [
      {
        year: 2023,
        spring: {
          passRate: 71,
          examinees: 93500,
          passers: 66385,
        },
      },
      {
        year: 2024,
        spring: {
          passRate: 72,
          examinees: 95000,
          passers: 68400,
        },
      },
    ],
  },
  relatedCertIds: [],
  tags: ["介護", "福祉", "国家資格", "社会福祉"],
  publishedAt: new Date("2024-01-01"),
  updatedAt: new Date("2024-01-01"),
};

// USCPA
const certUSCPA: Cert = {
  id: "uscpa",
  slug: "uscpa",
  name: "USCPA（米国公認会計士）",
  shortName: "USCPA",
  description:
    "USCPAは、米国の公認会計士資格で、国際的に通用する会計・監査の専門資格です。",
  difficulty: 5,
  annualExaminees: 5000,
  passRate: 50,
  studyHours: {
    beginner: 1200,
    experienced: 800,
  },
  examInfo: {
    eligibility: "大学卒業（150単位以上）、またはそれに相当する学歴",
    examDates: {
      spring: "年間通じて受験可能",
      autumn: "年間通じて受験可能",
    },
    passCriteria: "各科目75点以上（4科目すべて合格）",
    passRateHistory: [
      {
        year: 2023,
        spring: {
          passRate: 48,
          examinees: 4800,
          passers: 2304,
        },
        autumn: {
          passRate: 52,
          examinees: 4950,
          passers: 2574,
        },
      },
      {
        year: 2024,
        spring: {
          passRate: 50,
          examinees: 5000,
          passers: 2500,
        },
      },
    ],
  },
  relatedCertIds: [],
  tags: ["会計", "監査", "国際資格", "USCPA", "米国"],
  publishedAt: new Date("2024-01-01"),
  updatedAt: new Date("2024-01-01"),
};

export function getAllCerts(): Cert[] {
  return [
    certAutoMechanic1,
    certAutoMechanic2,
    certAutoMechanic3,
    certCareWorker,
    certUSCPA,
  ];
}

export function getCert(slug: string): Cert | undefined {
  return getAllCerts().find((c) => c.slug === slug);
}
