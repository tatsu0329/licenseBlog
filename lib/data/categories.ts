import { Category } from "../types";

export const categories: Category[] = [
  // 1級自動車整備士
  {
    id: "structure-1",
    certId: "auto-mechanic-1",
    slug: "structure",
    name: "自動車構造・機能（基礎〜応用）",
    order: 1,
    description: "エンジン、動力伝達装置、走行装置、制動装置、車体構造・材料に関する分野",
  },
  {
    id: "electronics-1",
    certId: "auto-mechanic-1",
    slug: "electronics",
    name: "電気・電子装置／電子制御（ECU系）",
    order: 2,
    description: "電子制御の基礎、ECUの役割・制御ロジック、エンジン制御、シャシ制御、車両通信に関する分野",
  },
  {
    id: "diagnosis-1",
    certId: "auto-mechanic-1",
    slug: "diagnosis",
    name: "故障診断・トラブルシューティング",
    order: 3,
    description: "故障現象から原因を推定する考え方、複数系統が絡む不具合の切り分け、点検手順の妥当性判断に関する分野",
  },
  {
    id: "maintenance-1",
    certId: "auto-mechanic-1",
    slug: "maintenance",
    name: "点検・整備・調整作業",
    order: 4,
    description: "定期点検項目、分解・組付け時の注意点、調整値の考え方、整備作業の合理性・安全性に関する分野",
  },
  {
    id: "materials-1",
    certId: "auto-mechanic-1",
    slug: "materials",
    name: "材料・油脂・燃料・環境対策",
    order: 5,
    description: "金属材料・樹脂材料の特性、潤滑油・作動油・冷却液、燃料の性質、排出ガス・環境規制の基礎に関する分野",
  },
  {
    id: "tools-1",
    certId: "auto-mechanic-1",
    slug: "tools",
    name: "工具・計測機器・診断機",
    order: 6,
    description: "一般工具・専用工具、電気測定器、診断機の役割、正しい測定方法と注意点に関する分野",
  },
  {
    id: "diagrams-1",
    certId: "auto-mechanic-1",
    slug: "diagrams",
    name: "図面・配線図・資料の読解",
    order: 7,
    description: "配線図の読み取り、記号・回路構成の理解、整備資料の活用に関する分野",
  },
  {
    id: "regulations-1",
    certId: "auto-mechanic-1",
    slug: "regulations",
    name: "関係法令・安全・品質管理",
    order: 8,
    description: "道路運送車両法の基礎、整備に関する法的義務、作業安全・品質管理の考え方に関する分野",
  },
 
  // 2級自動車整備士
  {
    id: "engine-2",
    certId: "auto-mechanic-2",
    slug: "engine",
    name: "エンジン",
    order: 1,
    description: "エンジンの整備に関する分野（問題1～15）",
  },
  {
    id: "chassis-2",
    certId: "auto-mechanic-2",
    slug: "chassis",
    name: "シャシ",
    order: 2,
    description: "シャシの整備に関する分野（問題16～30）",
  },
  {
    id: "tools-equipment-2",
    certId: "auto-mechanic-2",
    slug: "tools-equipment",
    name: "整備機器等",
    order: 3,
    description: "整備機器等に関する分野（問題31～35）",
  },
  {
    id: "regulations-2",
    certId: "auto-mechanic-2",
    slug: "regulations",
    name: "法規",
    order: 4,
    description: "法規に関する分野（問題36～40）",
  },
  // 3級自動車整備士
  {
    id: "engine-3",
    certId: "auto-mechanic-3",
    slug: "engine",
    name: "エンジン",
    order: 1,
    description: "エンジンの整備に関する分野（問題1～20）",
  },
  {
    id: "tools-equipment-3",
    certId: "auto-mechanic-3",
    slug: "tools-equipment",
    name: "整備機器等",
    order: 2,
    description: "整備機器等に関する分野（問題21～27）",
  },
  {
    id: "regulations-3",
    certId: "auto-mechanic-3",
    slug: "regulations",
    name: "法規",
    order: 3,
    description: "法規に関する分野（問題28～30）",
  },
];

export function getCategory(id: string): Category | undefined {
  return categories.find((c) => c.id === id);
}

export function getCategoriesByCert(certId: string): Category[] {
  return categories.filter((c) => c.certId === certId);
}
