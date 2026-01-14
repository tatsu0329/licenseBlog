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

// 3級自動車整備士アプリ
export const appAutoMechanic3: App = {
  id: "app-auto-mechanic-3",
  slug: "auto-mechanic-3-app",
  certId: "auto-mechanic-3",
  name: "国家3級自動車整備士 過去問集",
  description:
    "ガソリン・ジーゼル対応の3級試験対策アプリ。令和4年度〜令和7年度の過去問を収録。通常モード・本番モード・進捗保存・ログインスタンプで、スキマ時間を合格力に変える。",
  iconUrl: "/images/apps/auto-mechanic-3/icon.png",
  screenshots: [
    "/images/apps/auto-mechanic-3/screenshot1.jpg",
    "/images/apps/auto-mechanic-3/screenshot2.jpg",
    "/images/apps/auto-mechanic-3/screenshot3.jpg",
    "/images/apps/auto-mechanic-3/screenshot4.jpg",
  ],
  features: [
    {
      title: "ガソリン・ジーゼル両対応",
      description:
        "3級整備士のガソリン（Gコース）とジーゼル（Dコース）の両方の問題に対応。令和4年度〜令和7年度の過去問を収録し、各回30問を1セットで出題します。",
      iconUrl: "/images/icons/book.svg",
    },
    {
      title: "通常モードと本番モード",
      description:
        "通常モード（学習）：選択肢をタップするとすぐに正誤が表示され、理解を深めやすい。本番モード（模擬試験）：正誤は表示されず、すべての回答後に採点される緊張感ある形式。",
      iconUrl: "/images/icons/exam.svg",
    },
    {
      title: "ランダム出題と復習マーク機能",
      description:
        "問題の出題順を毎回シャッフルし、定着度を高められます。苦手な問題を「復習マーク」して、後から集中して解き直し可能です。",
      iconUrl: "/images/icons/analysis.svg",
    },
    {
      title: "進捗の保存・再開機能",
      description:
        "回答の進行状況は保存しておくことができ、アプリ再起動後も再開可能。保存内容には回答履歴・スコア・モード・出題順なども含まれ、完全再現が可能です。",
      iconUrl: "/images/icons/progress.svg",
    },
    {
      title: "ログインスタンプ機能",
      description:
        "毎日のアプリ起動でスタンプが記録され、ログイン連続記録（ストリーク）として可視化。継続的な学習習慣を作りたい受験生にぴったりです。",
      iconUrl: "/images/icons/progress.svg",
    },
    {
      title: "履歴保存・結果分析",
      description:
        "各問題集ごとに回答結果を自動で保存し、過去の成績を一覧で表示。繰り返し間違える問題をチェックでき、弱点克服に貢献します。",
      iconUrl: "/images/icons/analysis.svg",
    },
  ],
  freeFeatures: [
    "過去問の閲覧",
    "通常モード・本番モード",
    "ランダム出題",
    "復習マーク機能",
    "進捗保存・再開機能",
    "ログインスタンプ機能",
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
    "https://apps.apple.com/jp/app/%E5%9B%BD%E5%AE%B63%E7%B4%9A%E8%87%AA%E5%8B%95%E8%BB%8A%E6%95%B4%E5%82%99%E5%A3%AB-%E9%81%8E%E5%8E%BB%E5%95%8F%E9%9B%86/id6751434955",
  googlePlayUrl: undefined,
  deepLinkSchema: undefined,
  publishedAt: new Date("2024-01-01"),
  updatedAt: new Date("2025-01-01"),
};

// 介護福祉士アプリ
export const appCareWorker: App = {
  id: "app-care-worker",
  slug: "care-worker-app",
  certId: "care-worker",
  name: "介護福祉士 合格ドリル",
  description:
    "年度別の過去問で本番形式に対応。令和4年度〜令和6年度の過去問を収録。本番モード・通常モード・スタンプカレンダー機能で、スキマ時間を合格力に変える。",
  iconUrl: "/images/apps/care-worker/icon.png",
  screenshots: [
    "/images/apps/care-worker/screenshot1.jpg",
    "/images/apps/care-worker/screenshot2.jpg",
    "/images/apps/care-worker/screenshot3.jpg",
    "/images/apps/care-worker/screenshot4.jpg",
    "/images/apps/care-worker/screenshot5.jpg",
    "/images/apps/care-worker/screenshot6.jpg",
    "/images/apps/care-worker/screenshot7.jpg",
  ],
  features: [
    {
      title: "年度別・科目別問題セット",
      description:
        "令和4年度〜令和6年度の介護福祉士国家試験の過去問を収録。年度別問題セットと科目別問題セットで、出題傾向の変化を比較しながら学べます。",
      iconUrl: "/images/icons/book.svg",
    },
    {
      title: "本番モードと通常モード",
      description:
        "本番モード：制限時間なしの連続解答で、本番と同じ「緊張感」でスコアを確認できる。通常モード：1問ずつ丁寧に学習できる学習用モード。理解しながら覚えたい人におすすめ。",
      iconUrl: "/images/icons/exam.svg",
    },
    {
      title: "5択問題に完全対応",
      description:
        "実際の介護福祉士試験の形式である5つの選択肢を採用。実戦力が自然に身につきます。",
      iconUrl: "/images/icons/exam.svg",
    },
    {
      title: "スタンプカレンダー機能",
      description:
        "毎日学習を続けるとスタンプが貯まる「継続サポート」機能。モチベーション維持にも最適です。",
      iconUrl: "/images/icons/progress.svg",
    },
    {
      title: "シャッフル出題と学習履歴保存",
      description:
        "並び順を変えて何度も解けるため、暗記ではなく理解が深まります。自動で学習履歴を保存し、いつ解いたか、何点だったか、何回挑戦したかが自動記録されます。",
      iconUrl: "/images/icons/analysis.svg",
    },
    {
      title: "科目別学習",
      description:
        "科目別に問題を学習できる機能を搭載。苦手な科目を重点的に学習できます。",
      iconUrl: "/images/icons/book.svg",
    },
  ],
  freeFeatures: [
    "過去問の閲覧",
    "本番モード・通常モード",
    "5択問題対応",
    "年度別・科目別問題セット",
    "シャッフル出題",
    "スタンプカレンダー機能",
    "学習履歴保存",
  ],
  paidFeatures: [],
  pricing: {
    free: true,
  },
  appStoreUrl:
    "https://apps.apple.com/jp/app/%E4%BB%8B%E8%AD%B7%E7%A6%8F%E7%A5%89%E5%A3%AB-%E5%90%88%E6%A0%BC%E3%83%89%E3%83%AA%E3%83%AB/id6755430835",
  googlePlayUrl: undefined,
  deepLinkSchema: undefined,
  publishedAt: new Date("2025-11-18"),
  updatedAt: new Date("2025-12-03"),
};

// USCPAアプリ
export const appUSCPA: App = {
  id: "app-uscpa",
  slug: "uscpa-app",
  certId: "uscpa",
  name: "USCPA Prep - FAR/AUD/REG/BAR",
  nameEn: "USCPA Prep - FAR/AUD/REG/BAR",
  description:
    "USCPA試験対策アプリ。1,500問以上の問題を収録。Core + Disciplineモデルに対応し、FAR、AUD、REG、BAR、ISC、TCPすべてのセクションをカバー。Study ModeとExam Modeで効率的に学習できます。",
  descriptionEn:
    "Prepare, simulate, and conquer the USCPA Exam with confidence. This comprehensive study app features over 1,500 meticulously crafted questions covering all core and discipline sections—FAR, AUD, REG, BAR, ISC, TCP—with rich explanations, images, and quiz modes.",
  iconUrl: "/images/apps/USCPA/icon.png",
  screenshots: [
    "/images/apps/USCPA/screenshot1.jpg",
    "/images/apps/USCPA/screenshot2.jpg",
    "/images/apps/USCPA/screenshot3.jpg",
    "/images/apps/USCPA/screenshot4.jpg",
    "/images/apps/USCPA/screenshot5.jpg",
  ],
  features: [
    {
      title: "CPA Evolution試験構造に対応",
      titleEn: "Full Coverage of CPA Evolution Exam Structure",
      description:
        "2024年以降のUSCPA試験はCore + Disciplineモデルに移行。すべての受験者は3つのCoreセクション（AUD、FAR、REG）と1つのDiscipline（BAR、ISC、TCP）を完了する必要があります。本アプリはすべての組み合わせに対応しています。",
      descriptionEn:
        "Since 2024, the USCPA exam has shifted to a Core + Discipline model. All candidates must complete three Core sections—AUD, FAR, and REG—plus one Discipline of their choice: BAR, ISC, or TCP. This app covers all combinations seamlessly.",
      iconUrl: "/images/icons/book.svg",
    },
    {
      title: "豊富な問題集と解説",
      titleEn: "Rich Question Bank with Explanations & Media",
      description:
        "1,500問以上の多肢選択問題とタスクベースシミュレーション問題を収録。完全な解説、画像、CSVベースのコンテンツインポートに対応。パフォーマンスに基づいて問題が適応し、弱点を追跡します。",
      descriptionEn:
        "Our database includes thousands of multiple-choice and task-based simulation questions with full explanations, images, and optional CSV-based content import. Questions adapt based on your performance and track weak areas.",
      iconUrl: "/images/icons/exam.svg",
    },
    {
      title: "Study ModeとExam Mode",
      titleEn: "Simulated Exam Mode & Study Mode",
      description:
        "Study Mode：即座にフィードバックと解説を提供し、その場で学習できます。Exam Mode：実際のUSCPAのタイミング、難易度の進行、インターフェースをシミュレートし、試験対応力を強化します。",
      descriptionEn:
        "Study Mode delivers immediate feedback and rationales so you can learn on the spot. Exam Mode simulates the actual USCPA timing, difficulty progression, and interface to sharpen your test-taking stamina.",
      iconUrl: "/images/icons/exam.svg",
    },
    {
      title: "インテリジェントな復習と進捗追跡",
      titleEn: "Intelligent Review & Progress Tracking",
      description:
        "問題にマークを付けて後で復習し、過去の間違いを再確認し、直感的なダッシュボードで進捗を監視できます。毎日のリマインダーで継続的な学習習慣を確保します。",
      descriptionEn:
        "Mark questions for later review, revisit past errors, and monitor your progress with intuitive dashboards. Daily reminders ensure consistent study habits.",
      iconUrl: "/images/icons/analysis.svg",
    },
    {
      title: "管理可能な「パート」に分割",
      titleEn: "Split into Manageable Parts",
      description:
        "CSVに50問以上の問題が含まれていても、アプリは管理可能なPart 1、Part 2...セグメント（例：各25問）に分割するため、圧倒されることなく集中して学習できます。",
      descriptionEn:
        "Even if the CSV contains 50+ questions, the app breaks it down into manageable Part 1, Part 2, … segments (e.g., 25 questions each) so you can study in focused segments without overwhelm.",
      iconUrl: "/images/icons/progress.svg",
    },
    {
      title: "英語ユーザー向けのUI設計",
      titleEn: "User Interface Designed for English Audiences",
      description:
        "クリーンでモダンなビジュアルを使用し、グラデーション、カードスタイルのレイアウト、アニメーション、テーマを採用。読みやすさとエンゲージメントのために調整されています。",
      descriptionEn:
        "Clean, modern visuals using gradients, card-style layouts, animations, and theming tailored for readability and engagement.",
      iconUrl: "/images/icons/book.svg",
    },
  ],
  freeFeatures: [
    "1,500問以上の問題",
    "Study Mode・Exam Mode",
    "全セクション対応（FAR、AUD、REG、BAR、ISC、TCP）",
    "進捗追跡・復習機能",
    "CSVベースのコンテンツインポート",
    "問題のマーク機能",
  ],
  freeFeaturesEn: [
    "Over 1,500 questions",
    "Study Mode & Exam Mode",
    "All sections coverage (FAR, AUD, REG, BAR, ISC, TCP)",
    "Progress tracking & review features",
    "CSV-based content import",
    "Question bookmarking",
  ],
  paidFeatures: [],
  paidFeaturesEn: [],
  pricing: {
    free: true,
  },
  appStoreUrl:
    "https://apps.apple.com/jp/app/uscpa-prep-far-aud-reg-bar/id6752899495",
  googlePlayUrl: undefined,
  deepLinkSchema: undefined,
  publishedAt: new Date("2024-10-01"),
  updatedAt: new Date("2025-10-12"),
};

// 公認会計士企業法アプリ
export const appCPACorporateLaw: App = {
  id: "app-cpa-corporate-law",
  slug: "cpa-corporate-law-app",
  certId: "cpa",
  name: "公認会計士企業法｜スキマで1問",
  description:
    "公認会計士試験の「企業法」に特化した過去問学習アプリ。会社法、金融商品取引法、商法など、出題頻度の高いテーマを厳選。短答式対策に最適な1問1答形式で、スキマ時間で素早く復習できます。",
  iconUrl: "/images/apps/cpa-corporate-law/icon.png",
  screenshots: [
    "/images/apps/cpa-corporate-law/screenshot1.png",
    "/images/apps/cpa-corporate-law/screenshot2.png",
    "/images/apps/cpa-corporate-law/screenshot3.png",
  ],
  features: [
    {
      title: "過去問ベースだから安心",
      description:
        "公認会計士試験の過去問をベースにした問題を収録。実際の試験形式に沿った問題で、本番に近い感覚で学習できます。",
      iconUrl: "/images/icons/book.svg",
    },
    {
      title: "年度別で学習効率アップ",
      description:
        "年度別に問題を整理しているため、出題傾向の変化を把握しながら学習できます。学習時間を最大化し、「あと1点」が取れる実力を身につけます。",
      iconUrl: "/images/icons/book.svg",
    },
    {
      title: "本番モードと学習モード",
      description:
        "本番モードでは、実際の試験に近い形式で問題を解くことができます。学習モードでは、正解・不正解を即判定し、その場で理解を深められます。",
      iconUrl: "/images/icons/exam.svg",
    },
    {
      title: "復習マーク機能",
      description:
        "間違えた問題や重要だと思った問題にマークを付けて、後から効率的に復習できます。苦手な問題を重点的に学習できます。",
      iconUrl: "/images/icons/analysis.svg",
    },
    {
      title: "結果画面で問題文を確認",
      description:
        "結果画面では、各問題の正誤、選んだ選択肢、正解を一覧で確認できます。問題文も確認できるため、復習がしやすくなっています。",
      iconUrl: "/images/icons/progress.svg",
    },
    {
      title: "スキマ時間で素早く復習",
      description:
        "クイズ形式だから、暗記に偏りすぎず、論文式にもつながる法的思考力が自然と身につきます。通勤・通学中などのスキマ時間を有効活用できます。",
      iconUrl: "/images/icons/offline.svg",
    },
  ],
  freeFeatures: [
    "過去問の閲覧",
    "本番モード・学習モード",
    "復習マーク機能",
    "結果画面で問題文確認",
    "年度別学習",
    "広告表示",
  ],
  paidFeatures: [
    "広告非表示オプション（¥120）",
  ],
  pricing: {
    free: true,
    oneTimePrice: 120,
  },
  appStoreUrl:
    "https://apps.apple.com/jp/app/%E5%85%AC%E8%AA%8D%E4%BC%9A%E8%A8%88%E5%A3%AB%E4%BC%81%E6%A5%AD%E6%B3%95-%E3%82%B9%E3%82%AD%E3%83%9E%E3%81%A71%E5%95%8F/id6743015624",
  googlePlayUrl: undefined,
  deepLinkSchema: undefined,
  publishedAt: new Date("2025-03-09"),
  updatedAt: new Date("2025-11-29"),
};

export function getAllApps(): App[] {
  return [appAutoMechanic1, appAutoMechanic2, appAutoMechanic3, appCareWorker, appUSCPA, appCPACorporateLaw];
}

export function getAppByCert(certId: string): App | undefined {
  return getAllApps().find((a) => a.certId === certId);
}

export function getAppBySlug(slug: string): App | undefined {
  return getAllApps().find((a) => a.slug === slug);
}




