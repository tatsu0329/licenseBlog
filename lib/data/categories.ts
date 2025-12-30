import { Category } from "../types";

export const categories: Category[] = [
  // 自動車整備士1級
  {
    id: "engine-1",
    certId: "auto-mechanic-1",
    slug: "engine",
    name: "エンジン",
    order: 1,
    description: "エンジンの構造、動作原理、故障診断に関する分野",
  },
  {
    id: "chassis-1",
    certId: "auto-mechanic-1",
    slug: "chassis",
    name: "シャシ",
    order: 2,
    description: "足回り、サスペンション、ブレーキ、ステアリングに関する分野",
  },
  {
    id: "electrical-1",
    certId: "auto-mechanic-1",
    slug: "electrical",
    name: "電気装置",
    order: 3,
    description: "バッテリー、充電装置、始動装置、照明装置に関する分野",
  },
  {
    id: "diagnosis-1",
    certId: "auto-mechanic-1",
    slug: "diagnosis",
    name: "故障診断",
    order: 4,
    description: "故障診断技術、測定器の使用方法、診断フローチャートに関する分野",
  },
  {
    id: "diesel-commonrail-1",
    certId: "auto-mechanic-1",
    slug: "diesel-commonrail",
    name: "コモンレール式ディーゼル",
    order: 5,
    description: "コモンレール式ディーゼルエンジンの構造、動作原理、故障診断に関する分野",
  },
  {
    id: "practical-1",
    certId: "auto-mechanic-1",
    slug: "practical",
    name: "実技試験",
    order: 6,
    description: "実技試験の対策（エンジン、シャシ、電気装置の実技）",
  },
  // 自動車整備士2級
  {
    id: "engine-2",
    certId: "auto-mechanic-2",
    slug: "engine",
    name: "エンジン",
    order: 1,
    description: "エンジンの整備に関する分野",
  },
  {
    id: "chassis-2",
    certId: "auto-mechanic-2",
    slug: "chassis",
    name: "シャシ",
    order: 2,
    description: "シャシの整備に関する分野",
  },
  // 自動車整備士3級
  {
    id: "engine-3",
    certId: "auto-mechanic-3",
    slug: "engine",
    name: "エンジン",
    order: 1,
    description: "エンジンの整備に関する分野",
  },
  {
    id: "chassis-3",
    certId: "auto-mechanic-3",
    slug: "chassis",
    name: "シャシ",
    order: 2,
    description: "シャシの整備に関する分野",
  },
  // 介護福祉士
  {
    id: "human-body",
    certId: "care-worker",
    slug: "human-body",
    name: "人間の尊厳と自立・人間関係とコミュニケーション",
    order: 1,
    description: "人間の尊厳と自立、人間関係とコミュニケーションに関する分野",
  },
  {
    id: "care-theory",
    certId: "care-worker",
    slug: "care-theory",
    name: "社会の理解",
    order: 2,
    description: "社会の理解に関する分野",
  },
  {
    id: "care-practice",
    certId: "care-worker",
    slug: "care-practice",
    name: "介護の基本",
    order: 3,
    description: "介護の基本に関する分野",
  },
  // USCPA
  {
    id: "far",
    certId: "uscpa",
    slug: "far",
    name: "FAR（財務会計）",
    order: 1,
    description: "Financial Accounting and Reporting",
  },
  {
    id: "aud",
    certId: "uscpa",
    slug: "aud",
    name: "AUD（監査及び証明業務）",
    order: 2,
    description: "Auditing and Attestation",
  },
  {
    id: "reg",
    certId: "uscpa",
    slug: "reg",
    name: "REG（ビジネス環境及び諸概念）",
    order: 3,
    description: "Regulation",
  },
  {
    id: "bec",
    certId: "uscpa",
    slug: "bec",
    name: "BEC（ビジネス環境及び諸概念）",
    order: 4,
    description: "Business Environment and Concepts",
  },
];

export function getCategory(id: string): Category | undefined {
  return categories.find((c) => c.id === id);
}

export function getCategoriesByCert(certId: string): Category[] {
  return categories.filter((c) => c.certId === certId);
}
