import { Cert } from "../types";

// 自動車整備士1級
const certAutoMechanic1: Cert = {
  id: "auto-mechanic-1",
  slug: "auto-mechanic-1",
  name: "自動車整備士1級",
  shortName: "自動車整備士1級",
  description:
    "自動車整備士1級は、自動車の整備に関する高度な知識と技能を有することを証明する国家資格です。自動車整備工場の主任技術者として、複雑な故障診断や技術的な判断を行うことができます。",
  difficulty: 4,
  annualExaminees: 15000,
  passRate: 45,
  studyHours: {
    beginner: 800,
    experienced: 400,
  },
  examInfo: {
    eligibility: "自動車整備士2級取得後、実務経験3年以上（指定養成施設修了者は1年以上）",
    examDates: {
      spring: "2024-06-15",
      autumn: "2024-11-10",
    },
    passCriteria: "学科60点以上（満点100点）、実技60点以上（満点100点）",
    passRateHistory: [
      { year: 2021, spring: 42, autumn: 44 },
      { year: 2022, spring: 43, autumn: 46 },
      { year: 2023, spring: 43, autumn: 47 },
      { year: 2024, spring: 45 },
    ],
  },
  relatedCertIds: ["auto-mechanic-2"],
  tags: ["自動車", "整備", "1級", "国家資格", "技術", "主任技術者"],
  publishedAt: new Date("2024-01-01"),
  updatedAt: new Date("2024-01-01"),
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
      { year: 2023, spring: 53, autumn: 57 },
      { year: 2024, spring: 55 },
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
      { year: 2023, spring: 63, autumn: 67 },
      { year: 2024, spring: 65 },
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
      { year: 2023, spring: 71 },
      { year: 2024, spring: 72 },
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
      { year: 2023, spring: 48, autumn: 52 },
      { year: 2024, spring: 50 },
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
