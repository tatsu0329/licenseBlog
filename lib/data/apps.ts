import { App } from "../types";

// 1級自動車整備士アプリ
export const appAutoMechanic1: App = {
  id: "app-auto-mechanic-1",
  certId: "auto-mechanic-1",
  name: "1級自動車整備士 過去問アプリ",
  description:
    "1級自動車整備士の過去問をスマートフォンで手軽に学習できるアプリです。詳しい解説、弱点分析、学習進捗管理などの機能を提供しています。",
  iconUrl: "/images/apps/auto-mechanic-1-icon.png",
  screenshots: [
    "/images/apps/auto-mechanic-1-screenshot1.png",
    "/images/apps/auto-mechanic-1-screenshot2.png",
    "/images/apps/auto-mechanic-1-screenshot3.png",
  ],
  features: [
    {
      title: "豊富な過去問データベース",
      description:
        "直近10年分の過去問を収録。年度・分野・難易度で検索・絞り込みが可能です。",
      iconUrl: "/images/icons/book.svg",
    },
    {
      title: "詳しい解説",
      description:
        "各問題に詳細な解説を掲載。図解も豊富で、理解が深まります。",
      iconUrl: "/images/icons/explanation.svg",
    },
    {
      title: "弱点分析機能",
      description:
        "間違えた問題を自動で記録し、苦手分野を可視化。効率的に復習できます。",
      iconUrl: "/images/icons/analysis.svg",
    },
    {
      title: "学習進捗管理",
      description:
        "学習状況をグラフで可視化。毎日の学習時間や正答率を管理できます。",
      iconUrl: "/images/icons/progress.svg",
    },
    {
      title: "模試機能",
      description:
        "本番形式の模擬試験を実施。時間配分や実力を確認できます。",
      iconUrl: "/images/icons/exam.svg",
    },
    {
      title: "オフライン学習",
      description:
        "過去問をダウンロードして、オフラインでも学習できます。通勤・通学中も便利です。",
      iconUrl: "/images/icons/offline.svg",
    },
  ],
  freeFeatures: [
    "過去問10問/日まで無料で閲覧",
    "基礎解説の閲覧",
    "学習進捗の記録",
    "広告表示",
  ],
  paidFeatures: [
    "全過去問の無制限閲覧",
    "詳細解説・図解の閲覧",
    "弱点分析機能",
    "模試機能",
    "広告非表示",
    "ダウンロード機能（オフライン学習）",
  ],
  pricing: {
    free: true,
    subscriptionPrice: 980, // 月額980円
    oneTimePrice: 9800, // 買い切り9800円
  },
  appStoreUrl: "https://apps.apple.com/jp/app/auto-mechanic-1/id123456789",
  googlePlayUrl:
    "https://play.google.com/store/apps/details?id=com.example.automechanic1",
  deepLinkSchema: "automechanic1://",
  publishedAt: new Date("2024-01-01"),
  updatedAt: new Date("2024-01-01"),
};

export function getAllApps(): App[] {
  return [appAutoMechanic1];
}

export function getAppByCert(certId: string): App | undefined {
  return getAllApps().find((a) => a.certId === certId);
}


