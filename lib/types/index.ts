// 資格
export type Cert = {
  id: string;
  slug: string; // URL用（例: 'fp'）
  name: string; // 表示名（例: 'FP（ファイナンシャルプランナー）'）
  shortName: string; // 略称（例: 'FP'）
  description: string; // 資格説明
  iconUrl?: string; // アイコン画像URL
  logoUrl?: string; // ロゴ画像URL
  difficulty: 1 | 2 | 3 | 4 | 5; // 難易度（1=易、5=難）
  annualExaminees?: number; // 年間受験者数
  passRate?: number; // 合格率（%）
  studyHours?: {
    beginner: number; // 初学者の勉強時間（時間）
    experienced: number; // 経験者の勉強時間（時間）
    // 種類別のデータ（2級整備士など、複数の種類がある場合に使用）
    byType?: {
      gasoline?: {
        beginner: number;
        experienced: number;
      };
      diesel?: {
        beginner: number;
        experienced: number;
      };
      motorcycle?: {
        beginner: number;
        experienced: number;
      };
      chassis?: {
        beginner: number;
        experienced: number;
      };
    };
  };
  examInfo?: ExamInfo;
  relatedCertIds: string[]; // 関連資格ID
  tags: string[]; // タグ（SEO用）
  features?: string[]; // 機能フラグ（例: ["trend", "articles"]）
  publishedAt: Date;
  updatedAt: Date;
};

// 試験情報
export type ExamInfo = {
  eligibility: string; // 受験資格
  examDates: {
    spring?: string; // 第1回試験日（YYYY-MM-DD）
    autumn?: string; // 第2回試験日
  };
  passCriteria: string; // 合格基準（例: '60点以上'）
  passRateHistory: {
    year: number;
    spring?: {
      passRate?: number; // 合格率（%）
      examinees?: number; // 受験者数
      passers?: number; // 合格者数
      examDate?: string; // 実施日（例: "R7.03.23実施" または "2025-03-23"）
      // 種類別のデータ（2級整備士など、複数の種類がある場合に使用）
      byType?: {
        gasoline?: {
          // 2級ガソリン自動車整備士
          passRate?: number;
          examinees?: number;
          passers?: number;
          applicants?: number; // 申請者数
          examRate?: number; // 受験率（%）
        };
        diesel?: {
          // 2級ジーゼル自動車整備士
          passRate?: number;
          examinees?: number;
          passers?: number;
          applicants?: number; // 申請者数
          examRate?: number; // 受験率（%）
        };
        motorcycle?: {
          // 2級二輪自動車整備士
          passRate?: number;
          examinees?: number;
          passers?: number;
          applicants?: number; // 申請者数
          examRate?: number; // 受験率（%）
        };
        chassis?: {
          // 2級シャシ自動車整備士
          passRate?: number;
          examinees?: number;
          passers?: number;
          applicants?: number; // 申請者数
          examRate?: number; // 受験率（%）
        };
      };
    };
    autumn?: {
      passRate?: number; // 合格率（%）
      examinees?: number; // 受験者数
      passers?: number; // 合格者数
      examDate?: string; // 実施日（例: "R7.03.23実施" または "2025-03-23"）
      // 種類別のデータ（2級整備士など、複数の種類がある場合に使用）
      byType?: {
        gasoline?: {
          // 2級ガソリン自動車整備士
          passRate?: number;
          examinees?: number;
          passers?: number;
          applicants?: number; // 申請者数
          examRate?: number; // 受験率（%）
        };
        diesel?: {
          // 2級ジーゼル自動車整備士
          passRate?: number;
          examinees?: number;
          passers?: number;
          applicants?: number; // 申請者数
          examRate?: number; // 受験率（%）
        };
        motorcycle?: {
          // 2級二輪自動車整備士
          passRate?: number;
          examinees?: number;
          passers?: number;
          applicants?: number; // 申請者数
          examRate?: number; // 受験率（%）
        };
        chassis?: {
          // 2級シャシ自動車整備士
          passRate?: number;
          examinees?: number;
          passers?: number;
          applicants?: number; // 申請者数
          examRate?: number; // 受験率（%）
        };
      };
    };
  }[];
};

// 分野（カテゴリ）
export type Category = {
  id: string;
  certId: string;
  slug: string; // URL用（例: 'financial-planning'）
  name: string; // 表示名（例: 'ライフプランニングと資金計画'）
  order: number; // 表示順序
  description?: string;
};

// 過去問（著作権リスクを考慮した設計）
export type Question = {
  id: string; // 問題ID（例: 'fp-2024-1-001'）
  certId: string;
  year: number; // 年度（例: 2024）
  season: 1 | 2; // 1=第1回, 2=第2回
  categoryId: string;
  questionNumber: string; // 問題番号（例: '001'）
  questionText?: string; // 問題文の要約・部分引用（全文掲載は避ける）- 非推奨、questionSummaryを優先
  questionSummary?: string; // 問題の概要・サマリー（新形式）
  questionTheme?: string; // 問題のテーマ・分野（問題文がない場合に使用）
  choices: {
    number: 1 | 2 | 3 | 4;
    text: string; // 選択肢（要約可）
  }[];
  correctAnswer: 1 | 2 | 3 | 4;
  explanation: string; // 解説（メインコンテンツ）
  explanationDetail?: string; // 詳細解説（Markdown可）
  explanationImages?: string[]; // 解説に使用する画像URL
  difficulty?: 1 | 2 | 3 | 4 | 5; // 問題の難易度
  tags: string[]; // タグ（キーワード）
  relatedQuestionIds: string[]; // 関連問題ID（手動 or 自動）
  // 著作権関連フィールド（必須）
  source: string; // 出典情報（必須: "FP3級 2024年5月試験（日本FP協会）"）
  sourceUrl?: string; // 公式過去問ページのURL
  officialPastQuestionUrl?: string; // 公式過去問集へのリンク
  copyrightNotice?: string; // 著作権表示（必要に応じて）
  // 許諾状況（将来的な監査対応）
  permissionStatus?: "pending" | "granted" | "not_required" | "unknown"; // 許諾状況
  permissionDate?: Date; // 許諾取得日
  publishedAt: Date;
  updatedAt: Date;
};

// 勉強法記事
export type StudyArticle = {
  id: string;
  certId: string;
  slug: string; // URL用
  title: string;
  type: "roadmap" | "textbook" | "plan" | "comparison" | "general";
  content: string; // Markdown or MDX
  excerpt: string; // 抜粋（meta description用）
  featuredImageUrl?: string;
  tags: string[];
  relatedQuestionIds: string[]; // 関連問題へのリンク
  publishedAt: Date;
  updatedAt: Date;
};

// FAQ
export type FAQ = {
  id: string;
  certId: string;
  question: string;
  answer: string; // Markdown可
  category?: string; // カテゴリ（例: '受験資格', '試験対策'）
  tags: string[];
  relatedQuestionIds: string[]; // 関連問題へのリンク
  order: number; // 表示順序
  publishedAt: Date;
  updatedAt: Date;
};

// アプリ情報
export type App = {
  id: string;
  slug: string; // URL用（例: 'auto-mechanic-1-app'）
  certId: string;
  name: string; // アプリ名
  nameEn?: string; // アプリ名（英語）
  description: string;
  descriptionEn?: string; // 説明（英語）
  iconUrl: string;
  screenshots: string[]; // スクリーンショットURL
  features: {
    title: string;
    titleEn?: string; // タイトル（英語）
    description: string;
    descriptionEn?: string; // 説明（英語）
    iconUrl?: string;
  }[];
  freeFeatures: string[]; // 無料で使える機能
  freeFeaturesEn?: string[]; // 無料で使える機能（英語）
  paidFeatures: string[]; // 有料機能
  paidFeaturesEn?: string[]; // 有料機能（英語）
  pricing: {
    free: boolean;
    subscriptionPrice?: number; // 月額価格（円）
    oneTimePrice?: number; // 買い切り価格（円）
  };
  appStoreUrl?: string; // iOS App Store URL
  googlePlayUrl?: string; // Google Play URL
  deepLinkSchema?: string; // ディープリンクスキーム
  publishedAt: Date;
  updatedAt: Date;
};

// コラム記事
export type Article = {
  id: string;
  slug: string;
  title: string;
  content: string; // Markdown or MDX
  excerpt: string;
  featuredImageUrl?: string;
  author?: string;
  tags: string[];
  relatedCertIds: string[]; // 関連資格
  relatedQuestionIds: string[]; // 関連問題
  publishedAt: Date;
  updatedAt: Date;
};

