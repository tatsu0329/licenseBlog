import { App } from "../types";

// 1級自動車整備士アプリ
export const appAutoMechanic1: App = {
  id: "app-auto-mechanic-1",
  slug: "auto-mechanic-1-app",
  certId: "auto-mechanic-1",
  name: "国家1級自動車整備士 問題集",
  description:
    "1級整備士試験対策に特化した過去問アプリ。画像付き問題は拡大表示に対応。ランダム出題・本番モード・成績管理で、スキマ時間を合格力に変える。",
  iconUrl: "/images/apps/auto-mechanic-1/icon.png",
  screenshots: [
    "/images/apps/auto-mechanic-1/screenshot1.jpg",
    "/images/apps/auto-mechanic-1/screenshot2.jpg",
    "/images/apps/auto-mechanic-1/screenshot3.jpg",
    "/images/apps/auto-mechanic-1/screenshot4.jpg",
    "/images/apps/auto-mechanic-1/screenshot5.jpg",
    "/images/apps/auto-mechanic-1/screenshot6.jpg",
    "/images/apps/auto-mechanic-1/screenshot7.jpg",
  ],
  features: [
    {
      title: "画像付き問題の拡大表示",
      description:
        "問題文に含まれる図・イラスト付き問題にも対応。画像はタップで拡大表示できるため、細かい文字や構造図、配線図なども正確に確認できます。",
      iconUrl: "/images/icons/book.svg",
    },
    {
      title: "学習モードと本番モード",
      description:
        "学習スタイルに合わせて、学習モード（その場で正誤確認）と本番モード（試験形式で実力チェック）を切り替え可能。実際の試験に近い感覚で対策を行えます。",
      iconUrl: "/images/icons/exam.svg",
    },
    {
      title: "復習マーク機能",
      description:
        "間違えた問題や重要だと思った問題にマークを付けて、後から効率的に復習できます。苦手分野の問題を重点的に学習できます。",
      iconUrl: "/images/icons/analysis.svg",
    },
    {
      title: "成績保存・履歴管理",
      description:
        "過去の結果を確認できる成績保存・履歴管理機能を搭載。学習状況を可視化することで、自分の進捗を把握し、モチベーションを維持できます。",
      iconUrl: "/images/icons/progress.svg",
    },
    {
      title: "スキマ時間での学習",
      description:
        "忙しい社会人や現役整備士の方でも、スキマ時間で効率的に学習できます。通勤・通学中などのちょっとした時間を有効活用できます。",
      iconUrl: "/images/icons/offline.svg",
    },
    {
      title: "1級自動車整備士（学科試験）対応",
      description:
        "国家資格である1級整備士試験に向けて、過去問演習・復習・成績管理を1つのアプリで完結できます。",
      iconUrl: "/images/icons/explanation.svg",
    },
  ],
  freeFeatures: [
    "過去問の閲覧",
    "学習モード・本番モード",
    "復習マーク機能",
    "成績保存・履歴管理",
    "画像付き問題の拡大表示",
  ],
  paidFeatures: [],
  pricing: {
    free: true,
  },
  appStoreUrl:
    "https://apps.apple.com/jp/app/%E5%9B%BD%E5%AE%B61%E7%B4%9A%E8%87%AA%E5%8B%95%E8%BB%8A%E6%95%B4%E5%82%99%E5%A3%AB-%E5%95%8F%E9%A1%8C%E9%9B%86/id6756804508",
  googlePlayUrl: undefined,
  deepLinkSchema: undefined,
  publishedAt: new Date("2024-12-24"),
  updatedAt: new Date("2025-12-29"),
};

// 2級自動車整備士アプリ
export const appAutoMechanic2: App = {
  id: "app-auto-mechanic-2",
  slug: "auto-mechanic-2-app",
  certId: "auto-mechanic-2",
  name: "国家2級自動車整備士 問題集",
  description:
    "ガソリン・ジーゼル対応の過去問練習アプリ。令和最新版の過去問を完全収録。学習モード・本番モード・途中保存機能で、スキマ時間を合格力に変える。",
  iconUrl: "/images/apps/auto-mechanic-2/icon.png",
  screenshots: [
    "/images/apps/auto-mechanic-2/screenshot1.jpg",
    "/images/apps/auto-mechanic-2/screenshot2.jpg",
    "/images/apps/auto-mechanic-2/screenshot3.jpg",
    "/images/apps/auto-mechanic-2/screenshot4.jpg",
  ],
  features: [
    {
      title: "ガソリン・ジーゼル両対応",
      description:
        "2級整備士のガソリン（Gコース）とジーゼル（Dコース）の両方の問題に対応。年度ごとに問題集を切り替えて学習できます。",
      iconUrl: "/images/icons/book.svg",
    },
    {
      title: "令和最新版の過去問を完全収録",
      description:
        "令和7年度・令和6年度・令和5年度・令和4年度の国家2級整備士試験（学科）の過去問題を搭載。分野別・年度別に学習できます。",
      iconUrl: "/images/icons/book.svg",
    },
    {
      title: "学習モードと本番モード",
      description:
        "学習モード（その場で正誤確認）と本番モード（試験形式で実力チェック）を切り替え可能。実際の試験に近い感覚で対策を行えます。",
      iconUrl: "/images/icons/exam.svg",
    },
    {
      title: "途中保存・再開機能",
      description:
        "進捗を保存し、アプリ再起動後も「続きから再開」できます。保存時のモードやシャッフル設定も記録されるため、学習環境をそのまま再現できます。",
      iconUrl: "/images/icons/progress.svg",
    },
    {
      title: "ランダム出題と復習マーク機能",
      description:
        "ランダム出題モードで真の理解力を試せます。復習マークを付けて、後から効率的に復習できます。",
      iconUrl: "/images/icons/analysis.svg",
    },
    {
      title: "履歴保存・結果分析",
      description:
        "解答結果を自動で保存し、過去の成績を一覧で表示。繰り返し間違える問題をチェックでき、弱点克服に貢献します。",
      iconUrl: "/images/icons/progress.svg",
    },
  ],
  freeFeatures: [
    "過去問の閲覧",
    "学習モード・本番モード",
    "復習マーク機能",
    "途中保存・再開機能",
    "ランダム出題",
    "履歴保存機能",
    "広告表示",
  ],
  paidFeatures: [
    "広告非表示オプション（サブスク対応）",
  ],
  pricing: {
    free: true,
    subscriptionPrice: undefined,
    oneTimePrice: undefined,
  },
  appStoreUrl:
    "https://apps.apple.com/jp/app/%E5%9B%BD%E5%AE%B62%E7%B4%9A%E8%87%AA%E5%8B%95%E8%BB%8A%E6%95%B4%E5%82%99%E5%A3%AB-%E5%95%8F%E9%A1%8C%E9%9B%86/id6747470337",
  googlePlayUrl: undefined,
  deepLinkSchema: undefined,
  publishedAt: new Date("2024-01-01"),
  updatedAt: new Date("2025-01-01"),
};

export function getAllApps(): App[] {
  return [appAutoMechanic1, appAutoMechanic2];
}

export function getAppByCert(certId: string): App | undefined {
  return getAllApps().find((a) => a.certId === certId);
}

export function getAppBySlug(slug: string): App | undefined {
  return getAllApps().find((a) => a.slug === slug);
}




