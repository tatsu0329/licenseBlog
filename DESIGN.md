# 国家資格メディアサイト 設計ドキュメント

## 1. サイト全体のゴール/KPI と計測設計

### ゴール設定

1. **PV 最大化**: 月間 PV 50 万（6 ヶ月目目標）
2. **アプリ送客 CV**: アプリストア遷移率 3-5%、インストール CV 率 0.5-1%
3. **広告収益**: CPM 500 円、月間広告収益 25 万円（6 ヶ月目目標）
4. **サブスク転換**: アプリ内サブスク転換率 2-3%

### GA4 イベント設計

#### ページビューイベント（自動）

- `page_view`: 全ページ

#### カスタムイベント

```typescript
// 過去問閲覧
event: 'past_question_view'
params: {
  cert_slug: 'fp', // 資格スラッグ
  year: '2024',
  season: '1', // 1=第1回, 2=第2回
  category: 'financial-planning',
  question_id: 'fp-2024-1-001'
}

// アプリCTAクリック
event: 'app_cta_click'
params: {
  cert_slug: 'fp',
  cta_position: 'header' | 'sidebar' | 'after_question' | 'footer',
  app_platform: 'ios' | 'android'
}

// アプリストア遷移
event: 'app_store_redirect'
params: {
  cert_slug: 'fp',
  platform: 'ios' | 'android'
}

// 勉強法記事閲覧
event: 'study_method_view'
params: {
  cert_slug: 'fp',
  article_type: 'roadmap' | 'textbook' | 'plan'
}

// 検索実行
event: 'question_search'
params: {
  cert_slug: 'fp',
  search_type: 'year' | 'category' | 'keyword',
  query: string
}

// 広告表示
event: 'ad_impression'
params: {
  ad_position: 'header' | 'sidebar' | 'in_content' | 'footer',
  ad_type: 'display' | 'native'
}
```

#### GSC 連携

- 検索パフォーマンス指標（クリック数、インプレッション、CTR、順位）
- カバレッジ問題の監視
- モバイルユーザビリティ

### コンバージョンファネル

1. **発見**: 検索流入 / SNS 流入
2. **閲覧**: ページ滞在時間 > 60 秒
3. **エンゲージメント**: 複数ページ閲覧 / 検索実行
4. **アプリ誘導**: CTA クリック
5. **アプリ転換**: ストア遷移 → インストール（アプリ側で計測）

---

## 2. 情報設計（サイトマップ）

```
/
├── / (トップページ)
├── /certs (資格一覧)
│   └── /certs/[certSlug] (資格トップ / ハブページ)
│       ├── /certs/[certSlug]/overview (試験概要)
│       ├── /certs/[certSlug]/study (勉強法ハブ)
│       │   ├── /certs/[certSlug]/study/roadmap (ロードマップ)
│       │   ├── /certs/[certSlug]/study/textbooks (教材比較)
│       │   ├── /certs/[certSlug]/study/plan (学習計画)
│       │   └── /certs/[certSlug]/study/self-study-vs-course (独学vs講座)
│       ├── /certs/[certSlug]/kakomon (過去問ハブ)
│       │   ├── /certs/[certSlug]/kakomon (一覧: 年度/分野で絞り込み)
│       │   └── /certs/[certSlug]/kakomon/[year]/[season]/[category]/[qid] (問題詳細)
│       ├── /certs/[certSlug]/faq (よくある質問)
│       └── /certs/[certSlug]/app (アプリ紹介ページ)
├── /articles (コラム記事一覧)
│   └── /articles/[slug] (記事詳細)
├── /about (運営情報)
│   ├── /privacy-policy (プライバシーポリシー)
│   ├── /disclaimer (免責事項)
│   └── /contact (お問い合わせ)
└── /sitemap.xml
```

### 初期 MVP で実装するページ群（5-7 資格想定）

**必須ページ（全資格共通）**

- トップ: 1 ページ
- 資格一覧: 1 ページ
- 各資格トップ: 5-7 ページ
- 試験概要: 5-7 ページ（資格トップに統合可）
- 勉強法ハブ: 5-7 ページ
- 過去問ハブ: 5-7 ページ
- 過去問詳細: 各資格 × 年度 × 回次 × 分野 × 問題数（初期は 20-50 問/資格）
- FAQ: 5-7 ページ（各資格 5-10 問）

**推奨ページ（初期は最小限）**

- アプリ紹介: 5-7 ページ
- コラム記事: 5-10 ページ

**合計**: 約 100-150 ページ（MVP）

---

## 3. URL 設計

### URL 設計原則

1. **階層構造**: 資格 → カテゴリ → 年度 → 回次 → 分野 → 問題 ID
2. **スラッグ規約**: 小文字、ハイフン区切り、英語推奨（SEO 考慮）
3. **日本語パス**: ユーザー理解容易だが、URL エンコードが必要。MVP は英語推奨。
4. **canonical**: 各ページに正規 URL を設定（検索パラメータ除外）

### URL 例

```
# トップ・一覧
/ → トップページ
/certs → 資格一覧
/certs/fp → FP（ファイナンシャルプランナー）資格トップ

# 勉強法
/certs/fp/study → 勉強法ハブ
/certs/fp/study/roadmap → 学習ロードマップ
/certs/fp/study/textbooks → おすすめ教材

# 過去問
/certs/fp/kakomon → 過去問一覧（年度・分野で絞り込み可能）
/certs/fp/kakomon/2024/1 → 2024年第1回試験一覧
/certs/fp/kakomon/2024/1/financial-planning → 2024年第1回・ライフプランニング分野
/certs/fp/kakomon/2024/1/financial-planning/fp-2024-1-001 → 問題詳細

# アプリ・FAQ
/certs/fp/app → FPアプリ紹介
/certs/fp/faq → よくある質問

# 記事
/articles → 記事一覧
/articles/how-to-pass-fp-on-first-try → 記事詳細

# 運営情報
/privacy-policy → プライバシーポリシー
/disclaimer → 免責事項
/contact → お問い合わせ
```

### 検索パラメータ（URL に含めない、canonical で除外）

- `?year=2024` → `/certs/fp/kakomon/2024`
- `?category=financial-planning` → `/certs/fp/kakomon/category/financial-planning`
- `?q=年金` → `/certs/fp/kakomon?q=年金` （検索ページはパラメータ許可）

### リダイレクト戦略

- 旧 URL → 新 URL（301 リダイレクト）
- 末尾スラッシュ統一: `/certs/fp/` → `/certs/fp` (Next.js の trailingSlash 設定)

---

## 4. 各ページテンプレの構成要素

### 4.1 トップページ (/)

**構成要素**

```
<Header>
  - ロゴ
  - ナビゲーション（資格一覧、記事、運営情報）
  - 検索バー（資格・問題検索）

<Hero>
  - H1: 「国家資格の過去問解説と勉強法」
  - サブタイトル: 「FP、簿記、宅建、行政書士など、多数の資格をサポート」
  - CTA: 「人気の資格を見る」→ /certs

<資格カード一覧>
  - 人気資格TOP 6（画像、資格名、受験者数、CTA）
  - 「すべて見る」→ /certs

<過去問ピックアップ>
  - 最新過去問 3-5問（年度、問題文抜粋、リンク）

<勉強法記事ピックアップ>
  - 人気記事 3-5本

<Footer>
  - サイトマップ
  - 運営情報リンク
  - アプリダウンロードバナー
```

**SEO 要素**

- H1: 1 つ
- meta description: 160 文字
- 構造化データ: `WebSite` + `Organization`
- canonical: `/`

---

### 4.2 資格トップ (/certs/[certSlug])

**構成要素**

```
<Header>
  - パンくずリスト: ホーム > 資格一覧 > [資格名]

<資格ヘッダー>
  - H1: 「[資格名]の過去問解説・勉強法・試験情報」
  - 資格アイコン/画像
  - 基本情報（難易度、受験者数、合格率、次回試験日）

<タブナビゲーション>
  - 試験概要（デフォルト）
  - 勉強法
  - 過去問
  - FAQ
  - アプリ紹介

<試験概要セクション>
  - H2: 「[資格名]とは」
  - 資格の説明、取得メリット
  - H2: 「試験情報」
  - 受験資格、試験日程、合格基準、合格率推移（グラフ）
  - H2: 「勉強時間の目安」
  - 初学者・経験者別

<CTA（強）>
  - アプリバナー: 「[資格名]アプリで過去問を解く」→ /certs/[certSlug]/app
  - 特徴（無料で解ける範囲、機能紹介）

<内部リンク>
  - 関連ページ: 勉強法、過去問、FAQ
  - 関連資格（類似資格へのリンク）

<Footer>
```

**SEO 要素**

- H1: 1 つ（資格名を含む）
- 構造化データ: `Course` or `EducationalOccupationalCredential`
- canonical: `/certs/[certSlug]`
- OGP 画像: 資格ロゴ + テキスト

---

### 4.3 過去問ハブ (/certs/[certSlug]/kakomon)

**構成要素**

```
<Header>
  - パンくず: ホーム > 資格一覧 > [資格名] > 過去問

<ページヘッダー>
  - H1: 「[資格名] 過去問解説一覧」
  - 説明: 「年度・分野・回次で絞り込み検索が可能」

<検索・フィルター>
  - 年度選択（ドロップダウン）
  - 回次選択（ラジオ: 第1回/第2回）
  - 分野選択（チェックボックス）
  - キーワード検索

<過去問リスト>
  - 表形式 or カード形式
  - 年度、回次、分野、問題番号、問題文（抜粋）、リンク
  - ページネーション

<CTA（中）>
  - サイドバー: アプリバナー
  - 「アプリで全問解く」→ /certs/[certSlug]/app

<関連リンク>
  - 勉強法へのリンク
  - 最新年度へのリンク
```

**SEO 要素**

- H1: 1 つ
- 構造化データ: `ItemList`（過去問リスト）
- canonical: `/certs/[certSlug]/kakomon`（検索パラメータ除外）

---

### 4.4 過去問詳細ページ（最重要）(/certs/[certSlug]/kakomon/[year]/[season]/[category]/[qid])

**構成要素（詳細設計）**

```
<Header>
  - パンくず: ホーム > 資格一覧 > [資格名] > 過去問 > [年度] > [回次] > [分野] > [問題ID]

<問題ヘッダー>
  - 問題情報バッジ: [年度] [回次] [分野] [問題番号]
  - H1: 「[資格名] [年度][回次] [分野] [問題番号] 過去問解説」

<目次（TOC）>
  - 問題文
  - 選択肢
  - 正解・解説
  - 関連問題
  - 関連勉強法

<問題セクション>
  - H2: 「問題文」
  - 【出典】[試験名] [年度][回次] [分野]（必須・目立つ位置に配置）
  - 問題文本文（要約・部分引用、blockquote形式で表示）
  - 公式過去問へのリンク: 「正式な問題文は公式サイトでご確認ください」
  - H2: 「選択肢」
  - 選択肢1, 2, 3, 4（番号付きリスト、要約可）

<正解・解説セクション>
  - H2: 「正解」
  - 正解を強調表示（例: 「正解: 3」）
  - H2: 「解説」
  - 詳細解説（図表含む）
  - 重要なポイント（ハイライト）
  - 関連キーワードの説明

<CTA（強）>
  - 問題下: 「この問題をアプリで解く」→ アプリ内問題へのディープリンク or ストア
  - サイドバー: アプリバナー（固定）

<関連コンテンツ>
  - H2: 「関連問題」
  - 同じ分野の他の年度問題 3-5問
  - 同じテーマの問題 3-5問
  - H2: 「関連勉強法」
  - この分野の勉強法記事へのリンク
  - H2: 「よくある質問」
  - 関連FAQ 2-3件

<ナビゲーション>
  - 前の問題 / 次の問題
  - 年度一覧に戻る

<出典・免責セクション>
  - H2: 「出典・免責事項」
  - 出典情報の詳細表示
  - 免責事項: 「本サイトの過去問は解説目的で要約・部分引用しています...」
  - 公式過去問へのリンク（強調）
  - 利用規約へのリンク

<広告配置>
  - ヘッダー下: ディスプレイ広告（728×90）
  - 問題文と解説の間: ネイティブ広告 or ディスプレイ広告
  - サイドバー: ディスプレイ広告（300×250）
  - フッター上: ディスプレイ広告

<Footer>
```

**CTA 配置の複数案**

**案 A: 強め（送客重視）**

- 問題ヘッダー直下: アプリバナー（大型）
- 問題文下: インライン CTA「アプリで全問解く」
- 解説下: インライン CTA「アプリで関連問題を解く」
- サイドバー: 固定アプリバナー

**案 B: 中程度（UX と送客のバランス）**

- 問題文と解説の間: アプリバナー（中型）
- サイドバー: 固定アプリバナー
- 関連コンテンツ下: インライン CTA

**案 C: 弱め（UX 重視）**

- サイドバーのみ: 固定アプリバナー
- フッター: アプリバナー

**推奨**: MVP は案 B、A/B テストで最適化

**SEO 要素**

- H1: 1 つ（問題情報を含む）
- 構造化データ: `Question` + `Answer`
- canonical: `/certs/[certSlug]/kakomon/[year]/[season]/[category]/[qid]`
- meta description: 問題文抜粋 + 「正解と解説はこちら」
- OGP 画像: 問題文 + 資格名

---

### 4.5 勉強法ハブ (/certs/[certSlug]/study)

**構成要素**

```
<Header>
  - パンくず: ホーム > 資格一覧 > [資格名] > 勉強法

<ページヘッダー>
  - H1: 「[資格名]の勉強法・学習ロードマップ」

<目次>
  - 学習ロードマップ
  - おすすめ教材
  - 学習計画
  - 独学 vs 講座

<各セクション>
  - H2: 「学習ロードマップ」
  - ステップバイステップの学習手順（図表推奨）
  - H2: 「おすすめ教材」
  - テキスト、問題集、アプリの比較表
  - H2: 「学習計画（3ヶ月/6ヶ月）」
  - 週単位の学習スケジュール
  - H2: 「独学 vs 講座比較」
  - 比較表、それぞれのメリット・デメリット

<CTA（強）>
  - サイドバー: アプリバナー
  - セクション間: 「アプリで過去問を解く」

<内部リンク>
  - 過去問へのリンク
  - 関連記事へのリンク

<Footer>
```

**SEO 要素**

- H1: 1 つ
- 構造化データ: `HowTo`（学習ロードマップ）
- canonical: `/certs/[certSlug]/study`

---

### 4.6 アプリ紹介ページ (/certs/[certSlug]/app)

**構成要素**

```
<Header>
  - パンくず: ホーム > 資格一覧 > [資格名] > アプリ紹介

<ページヘッダー>
  - H1: 「[資格名]アプリ - 過去問を無料で解く」
  - アプリスクリーンショット
  - App Store / Google Play ダウンロードボタン

<アプリ機能紹介>
  - H2: 「主な機能」
  - 過去問解説、弱点分析、学習進捗、模試機能など
  - H2: 「無料で解ける範囲」
  - 無料/有料の境界を明示
  - H2: 「料金プラン」
  - 無料プラン、サブスクプラン

<CTA（最強）>
  - ヘッダー: ダウンロードボタン（大型）
  - 機能紹介下: ダウンロードボタン
  - フッター: ダウンロードバナー

<関連リンク>
  - 過去問へのリンク（アプリでも解ける）
  - 勉強法へのリンク

<Footer>
```

**SEO 要素**

- H1: 1 つ
- 構造化データ: `SoftwareApplication`
- canonical: `/certs/[certSlug]/app`

---

## 5. 内部リンク戦略

### 5.1 トピッククラスタ設計

```
【コアページ（ハブ）】
資格トップ (/certs/[certSlug])
  ↓
【サブクラスタ】
├─ 勉強法ハブ → ロードマップ、教材、学習計画
├─ 過去問ハブ → 年度別、分野別、問題詳細
├─ FAQ → 関連質問への内部リンク
└─ アプリ紹介 → CTA

【関連資格クラスタ】
類似資格への相互リンク
（例: FP ↔ 簿記 ↔ 宅建）
```

### 5.2 自動リンク生成ロジック

**問題詳細ページでの自動リンク**

```typescript
// 関連問題の抽出
- 同じ分野・異なる年度: 3-5問
- 同じキーワード（タグ）: 3-5問
- 同じ難易度: 2-3問

// 関連勉強法の抽出
- 同じ分野の勉強法記事: 1-2本
- 関連タグの勉強法: 1-2本

// 関連FAQの抽出
- 同じタグのFAQ: 2-3件
```

**コンテキストベースリンク**

- 問題解説内の専門用語 → 用語解説ページ or FAQ
- 教材名 → 教材比較ページ
- 関連資格名 → 資格トップページ

### 5.3 内部リンク配置方針

1. **コンテンツ内リンク**: 自然な文脈で配置（過度なリンクは避ける）
2. **サイドバーリンク**: 関連コンテンツ、人気コンテンツ
3. **フッターリンク**: サイトマップ、関連資格
4. **パンくずリスト**: 全ページに配置

### 5.4 リンクアンカーテキスト最適化

- **避ける**: 「こちら」「リンク」「詳細はこちら」
- **推奨**: 具体的なキーワード（例: 「FP3 級 2024 年過去問解説」）

---

## 6. データモデル

### 6.1 TypeScript 型定義

```typescript
// 資格
type Cert = {
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
  };
  examInfo?: ExamInfo;
  relatedCertIds: string[]; // 関連資格ID
  tags: string[]; // タグ（SEO用）
  publishedAt: Date;
  updatedAt: Date;
};

// 試験情報
type ExamInfo = {
  eligibility: string; // 受験資格
  examDates: {
    spring?: string; // 第1回試験日（YYYY-MM-DD）
    autumn?: string; // 第2回試験日
  };
  passCriteria: string; // 合格基準（例: '60点以上'）
  passRateHistory: {
    year: number;
    spring?: number;
    autumn?: number;
  }[];
};

// 分野（カテゴリ）
type Category = {
  id: string;
  certId: string;
  slug: string; // URL用（例: 'financial-planning'）
  name: string; // 表示名（例: 'ライフプランニングと資金計画'）
  order: number; // 表示順序
  description?: string;
};

// 過去問
type Question = {
  id: string; // 問題ID（例: 'fp-2024-1-001'）
  certId: string;
  year: number; // 年度（例: 2024）
  season: 1 | 2; // 1=第1回, 2=第2回
  categoryId: string;
  questionNumber: string; // 問題番号（例: '001'）
  questionText: string; // 問題文の要約・部分引用（全文掲載は避ける）
  questionTheme?: string; // 問題のテーマ・分野（問題文がない場合に使用）
  choices: {
    number: 1 | 2 | 3 | 4;
    text: string; // 選択肢（要約可）
  }[];
  correctAnswer: 1 | 2 | 3 | 4;
  explanation: string; // 解説（メインコンテンツ）
  explanationDetail?: string; // 詳細解説（Markdown可）
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
type StudyArticle = {
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
type FAQ = {
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
type App = {
  id: string;
  certId: string;
  name: string; // アプリ名
  description: string;
  iconUrl: string;
  screenshots: string[]; // スクリーンショットURL
  features: {
    title: string;
    description: string;
    iconUrl?: string;
  }[];
  freeFeatures: string[]; // 無料で使える機能
  paidFeatures: string[]; // 有料機能
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
type Article = {
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
```

### 6.2 スラッグ規約

```typescript
// 資格スラッグ
'fp' | 'bookkeeping' | 'takken' | 'gyosei' | 'shiho' | ...

// 分野スラッグ
'financial-planning' | 'tax-planning' | 'estate-planning' | ...

// 問題IDフォーマット
`${certSlug}-${year}-${season}-${questionNumber}`
// 例: 'fp-2024-1-001'

// 記事スラッグ
'how-to-pass-fp-on-first-try' | 'fp-textbook-comparison' | ...
```

### 6.3 重複回避策

1. **スラッグの一意性**: DB 制約で強制
2. **canonical URL**: 各ページに設定
3. **301 リダイレクト**: 旧 URL → 新 URL
4. **検索パラメータ除外**: canonical で明示

### 6.4 多言語対応（将来拡張）

```typescript
type LocalizedContent = {
  locale: "ja" | "en" | "zh"; // 将来拡張
  content: string;
};

// 例: Questionの多言語対応
type Question = {
  // ... 既存フィールド
  questionText: LocalizedContent[];
  explanation: LocalizedContent[];
};
```

---

## 7. 実装方針

### 7.1 Next.js App Router ディレクトリ構成

```
licenseBlog/
├── app/
│   ├── layout.tsx (ルートレイアウト)
│   ├── page.tsx (トップページ)
│   ├── certs/
│   │   ├── page.tsx (資格一覧)
│   │   └── [certSlug]/
│   │       ├── page.tsx (資格トップ)
│   │       ├── layout.tsx (資格レイアウト)
│   │       ├── overview/
│   │       │   └── page.tsx (試験概要)
│   │       ├── study/
│   │       │   ├── page.tsx (勉強法ハブ)
│   │       │   ├── roadmap/
│   │       │   │   └── page.tsx
│   │       │   ├── textbooks/
│   │       │   │   └── page.tsx
│   │       │   └── plan/
│   │       │       └── page.tsx
│   │       ├── kakomon/
│   │       │   ├── page.tsx (過去問一覧)
│   │       │   └── [year]/
│   │       │       └── [season]/
│   │       │           └── [category]/
│   │       │               └── [qid]/
│   │       │                   └── page.tsx (問題詳細)
│   │       ├── faq/
│   │       │   └── page.tsx
│   │       └── app/
│   │           └── page.tsx (アプリ紹介)
│   ├── articles/
│   │   ├── page.tsx (記事一覧)
│   │   └── [slug]/
│   │       └── page.tsx (記事詳細)
│   ├── privacy-policy/
│   │   └── page.tsx
│   ├── disclaimer/
│   │   └── page.tsx
│   ├── contact/
│   │   └── page.tsx
│   ├── sitemap.ts (動的サイトマップ生成)
│   ├── robots.ts (robots.txt生成)
│   └── opengraph-image.tsx (OGP画像生成)
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Breadcrumbs.tsx
│   │   └── Sidebar.tsx
│   ├── cert/
│   │   ├── CertCard.tsx
│   │   ├── CertHeader.tsx
│   │   └── ExamInfo.tsx
│   ├── question/
│   │   ├── QuestionHeader.tsx
│   │   ├── QuestionText.tsx
│   │   ├── Choices.tsx
│   │   ├── Explanation.tsx
│   │   └── RelatedQuestions.tsx
│   ├── study/
│   │   ├── Roadmap.tsx
│   │   └── TextbookComparison.tsx
│   ├── app/
│   │   └── AppBanner.tsx
│   ├── ads/
│   │   ├── AdSense.tsx
│   │   └── NativeAd.tsx
│   └── ui/
│       ├── Button.tsx
│       ├── Card.tsx
│       └── TOC.tsx
├── lib/
│   ├── data/
│   │   ├── certs.ts (資格データ)
│   │   ├── questions.ts (問題データ)
│   │   ├── articles.ts (記事データ)
│   │   └── faqs.ts (FAQデータ)
│   ├── utils/
│   │   ├── slug.ts (スラッグ生成・検証)
│   │   ├── search.ts (検索ロジック)
│   │   └── links.ts (内部リンク生成)
│   └── types/
│       └── index.ts (型定義)
├── content/
│   ├── certs/ (Markdown/MDXファイル or CMS設定)
│   ├── questions/
│   ├── articles/
│   └── faqs/
├── public/
│   ├── images/
│   │   ├── certs/ (資格アイコン・ロゴ)
│   │   ├── questions/ (問題図表)
│   │   └── ads/ (広告プレースホルダー)
│   └── icons/
├── scripts/
│   ├── generate-sitemap.ts
│   └── validate-data.ts
├── next.config.js
├── tsconfig.json
├── package.json
└── README.md
```

### 7.2 コンテンツ管理方式の比較

#### 案 A: Markdown/MDX 運用

**メリット**

- 運用コストが低い（Git 管理）
- バージョン管理が容易
- 開発者フレンドリー
- 無料

**デメリット**

- 非技術者が編集しにくい
- 一括更新が面倒
- 画像管理が煩雑

**実装例**

```typescript
// content/questions/fp-2024-1-001.mdx
---
id: 'fp-2024-1-001'
certId: 'fp'
year: 2024
season: 1
categoryId: 'financial-planning'
questionNumber: '001'
questionText: 'ライフプランニングにおいて...'
choices:
  - { number: 1, text: '選択肢1' }
  - { number: 2, text: '選択肢2' }
correctAnswer: 3
tags: ['ライフプラン', '資金計画']
---

# 解説

この問題は...
```

#### 案 B: Headless CMS 運用（Contentful/MicroCMS/Strapi）

**メリット**

- 非技術者が編集可能
- リッチエディタ
- 画像管理が容易
- API 経由で取得

**デメリット**

- 月額費用（MicroCMS: 無料プランあり）
- API 制限の考慮が必要
- デプロイ時にビルド時間が増える可能性

**実装例**

```typescript
// lib/cms/client.ts
import { createClient } from "microcms-js-sdk";

export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN!,
  apiKey: process.env.MICROCMS_API_KEY!,
});
```

#### 推奨（MVP）

**Markdown/MDX 運用を推奨**

- 理由:
  1. 運用コストが低い（初期は開発者がコンテンツ作成）
  2. ビルド時間が短い（SSG 前提）
  3. 無料で開始可能
  4. 将来 CMS 移行も容易（データ構造は同じ）

**将来の CMS 移行**

- コンテンツが増えたら（500 ページ超）、headless CMS を検討
- 移行時は、Markdown → CMS API へのマイグレーションスクリプトを作成

### 7.3 検索実装方針

#### 問題検索

```typescript
// lib/utils/search.ts
export function searchQuestions(
  questions: Question[],
  filters: {
    certId?: string;
    year?: number;
    season?: 1 | 2;
    categoryId?: string;
    keyword?: string;
  }
): Question[] {
  return questions.filter((q) => {
    if (filters.certId && q.certId !== filters.certId) return false;
    if (filters.year && q.year !== filters.year) return false;
    if (filters.season && q.season !== filters.season) return false;
    if (filters.categoryId && q.categoryId !== filters.categoryId) return false;
    if (filters.keyword) {
      const keyword = filters.keyword.toLowerCase();
      const searchText = `${q.questionText} ${q.explanation}`.toLowerCase();
      if (!searchText.includes(keyword)) return false;
    }
    return true;
  });
}
```

#### 検索 UI 実装

- **クライアントサイド検索**: 初期は全データを読み込んでフィルタ（データ量が少ない場合）
- **サーバーサイド検索**: データ量が多い場合は、API 経由で検索（将来的に Algolia 等の検索サービスも検討）

### 7.4 速度最適化

#### キャッシュ戦略

```typescript
// next.config.js
module.exports = {
  // ISR設定
  revalidate: 3600, // 1時間ごとに再生成

  // 画像最適化
  images: {
    domains: ["example.com"],
    formats: ["image/avif", "image/webp"],
  },
};
```

#### ページ別生成方式

- **トップ・資格一覧**: ISR（1 時間ごと）
- **資格トップ・勉強法**: SSG（ビルド時生成）
- **過去問詳細**: SSG（全問題をビルド時生成）
- **検索結果ページ**: SSR or ISR（動的）

#### コード分割

```typescript
// 動的インポートでコンポーネントを分割
import dynamic from "next/dynamic";

const AdSense = dynamic(() => import("@/components/ads/AdSense"), {
  ssr: false, // 広告はクライアントサイドのみ
});
```

### 7.5 SEO 実装

#### 構造化データ（JSON-LD）

```typescript
// app/certs/[certSlug]/kakomon/[year]/[season]/[category]/[qid]/page.tsx
export default function QuestionPage({ params }: { params: { ... } }) {
  const question = getQuestion(params.qid);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Question',
    name: question.questionText,
    acceptedAnswer: {
      '@type': 'Answer',
      text: question.explanation,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* ... */}
    </>
  );
}
```

#### sitemap.xml 生成

```typescript
// app/sitemap.ts
import { MetadataRoute } from "next";
import { getAllCerts, getAllQuestions, getAllArticles } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://example.com";

  const certs = getAllCerts();
  const questions = getAllQuestions();
  const articles = getAllArticles();

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    ...certs.map((cert) => ({
      url: `${baseUrl}/certs/${cert.slug}`,
      lastModified: cert.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    ...questions.map((q) => ({
      url: `${baseUrl}/certs/${q.certId}/kakomon/${q.year}/${q.season}/${q.categoryId}/${q.id}`,
      lastModified: q.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    // ...
  ];
}
```

#### robots.txt

```typescript
// app/robots.ts
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/admin/"],
    },
    sitemap: "https://example.com/sitemap.xml",
  };
}
```

#### OGP 画像生成

```typescript
// app/opengraph-image.tsx
import { ImageResponse } from "next/og";

export async function generateImageMetadata({
  params,
}: {
  params: { certSlug: string };
}) {
  return [
    {
      contentType: "image/png",
      size: { width: 1200, height: 630 },
      id: "og-image",
    },
  ];
}

export default async function Image({
  params,
}: {
  params: { certSlug: string };
}) {
  const cert = getCert(params.certSlug);

  return new ImageResponse(
    (
      <div
        style={
          {
            /* OGP画像デザイン */
          }
        }
      >
        <h1>{cert.name}</h1>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
```

---

## 8. MVP ロードマップ

### Phase 1: 基盤構築（2 週間）

**Week 1: プロジェクトセットアップ**

- [ ] Next.js 14 (App Router) セットアップ
- [ ] TypeScript 設定
- [ ] ディレクトリ構造作成
- [ ] 基本レイアウト（Header/Footer）実装
- [ ] データモデル定義
- [ ] 型定義作成

**Week 2: コアページ実装**

- [ ] トップページ
- [ ] 資格一覧ページ
- [ ] 資格トップページ（1 資格でプロトタイプ）
- [ ] 過去問ハブページ
- [ ] 過去問詳細ページ（1 問でプロトタイプ）
- [ ] パンくずリスト実装

### Phase 2: コンテンツ拡充（1 ヶ月）

**Week 3-4: 初期コンテンツ作成（1 資格分）**

- [ ] FP3 級を選定（理由: 受験者数が多い、過去問が多い）
- [ ] FP3 級の試験概要データ作成
- [ ] FP3 級の過去問 20-30 問（最新年度）作成
- [ ] FP3 級の勉強法記事 3-5 本作成
- [ ] FP3 級の FAQ 5-10 件作成
- [ ] FP3 級のアプリ紹介ページ作成

**Week 5-6: 追加資格の追加（2-3 資格）**

- [ ] 簿記 3 級、宅建を追加（同様のコンテンツ作成）
- [ ] 検索・フィルター機能実装
- [ ] 内部リンク自動生成機能実装

### Phase 3: SEO・最適化（3 ヶ月目）

**Week 7-8: SEO 実装**

- [ ] 構造化データ実装（全ページ）
- [ ] sitemap.xml 自動生成
- [ ] robots.txt 設定
- [ ] OGP 画像生成
- [ ] canonical URL 設定

**Week 9-10: 広告・計測実装**

- [ ] Google AdSense 統合
- [ ] GA4 イベント実装
- [ ] アプリ CTA 実装
- [ ] 広告配置最適化

**Week 11-12: 追加資格・最適化**

- [ ] 残り 2-3 資格を追加（合計 5-7 資格）
- [ ] パフォーマンス最適化（画像最適化、コード分割）
- [ ] モバイル対応確認
- [ ] A/B テスト準備（CTA 配置）

### 最初の 5-7 資格の選定基準

1. **受験者数が多い**: 検索需要が高い

   - FP3 級（年間 20 万人以上）
   - 簿記 3 級（年間 30 万人以上）
   - 宅建（年間 20 万人以上）
   - 行政書士（年間 5 万人以上）
   - 社会保険労務士（年間 4 万人以上）

2. **過去問が豊富**: コンテンツ作成が容易

   - 公式過去問が公開されている
   - 年度ごとに問題が整理されている

3. **自社アプリがある**: 送客 CV が見込める

   - 既存アプリがある資格を優先

4. **SEO 競合が適度**: 完全に埋まっていない
   - 競合が多いが、差別化可能

### 勝ちページ（優先して作成すべきページ）

1. **過去問詳細ページ**（最重要）

   - 検索流入の大部分は「[資格名] [年度] 過去問」形式
   - 1 問ずつ丁寧に解説することで、検索上位を狙う
   - 初期は各資格 × 最新 2-3 年度 × 全問題を優先

2. **勉強法ハブページ**

   - 「[資格名] 勉強法」の検索需要が高い
   - 過去問ページからの内部リンクで流入
   - アプリ CTA の設置に最適

3. **試験概要ページ**
   - 「[資格名] 難易度」「[資格名] 合格率」の検索需要
   - 資格トップページに統合可

---

## 9. リスクと対策

### 9.1 過去問の著作権・引用・免責

**法的リスク（重要）**

- **試験問題は著作物として保護される**: 国家資格の過去問は、作成者の創作性が認められる場合、著作物として保護されます
- **無断掲載は著作権侵害の可能性**: 問題文をそのまま全文掲載すると、著作権侵害となる恐れがあります
- **実施団体への許諾が必要**: 文部科学省のガイドラインによれば、過去問を公開する際は著作権者の許諾が必要です

**推奨される対策（優先順位順）**

1. **試験実施団体への許諾申請（最優先・推奨）**

   - 各試験の実施機関（例: 日本 FP 協会、商工会議所）に事前に問い合わせ
   - 利用許諾の取得方法を確認
   - 許諾条件（使用料、出典表記方法等）を遵守
   - **MVP 開始前に主要資格（FP3 級、簿記 3 級等）の実施団体へ確認を推奨**

2. **引用範囲の制限と解説中心の構成**

   - **全文掲載は避ける**: 問題文の全文をそのまま掲載しない
   - **要約・部分引用**: 問題の要点のみを要約し、引用形式で表示
   - **解説を主軸に**: 問題文よりも解説・解答の説明に重点を置く
   - **引用の要件を満たす**: 著作権法第 32 条の引用要件を遵守
     - 公表された著作物であること
     - 引用する必然性があること
     - 主従関係が明確であること（解説が主、問題文が従）
     - 出所の明示がされていること

3. **出典・免責の明記（必須）**

   ```
   【出典】
   [試験名] [年度][回次]試験（[実施団体名]）

   【免責事項】
   本サイトに掲載されている過去問は、試験実施団体が公開している情報を参考に
   作成した解説コンテンツです。問題文は要約・部分引用の形式で掲載しています。
   問題文の正確性については保証いたしません。正式な過去問については、
   各試験実施団体の公式サイトまたは公式過去問題集をご確認ください。

   【利用規約】
   本サイトの過去問解説は、学習目的での個人利用に限ります。
   無断転載・複製を禁じます。
   ```

4. **公式過去問へのリンク設置（推奨）**

   - 各問題ページに公式過去問サイトへのリンクを設置
   - 「正式な過去問はこちら」として公式サイトを誘導
   - ユーザーに公式資料の確認を促す

5. **代替案: 解説のみの構成**

   - 問題文を掲載せず、問題番号・テーマ・分野のみ記載
   - 「この問題では ○○ について問われています」という形式
   - 解説と正解を中心に構成
   - 公式過去問集への誘導を強化

**実装時の注意点**

- **データモデル**: `questionText` フィールドは要約版を格納（全文は避ける）
- **UI 表示**: 問題文部分は `<blockquote>` タグで引用形式を明示
- **メタデータ**: 各問題に `source`（出典情報）フィールドを必須化
- **免責ページ**: `/disclaimer` ページに詳細な免責事項を記載
- **ログ記録**: 問題文掲載の許諾状況を管理（将来的な監査対応）

**各資格別の確認事項（MVP 前に確認推奨）**

| 資格名    | 実施団体                   | 確認事項                         |
| --------- | -------------------------- | -------------------------------- |
| FP3 級    | 日本 FP 協会               | 過去問公開の方針、利用許諾の有無 |
| 簿記 3 級 | 商工会議所                 | 過去問の利用規約、許諾申請方法   |
| 宅建      | 宅地建物取引業協会         | 過去問の引用可否                 |
| 行政書士  | 行政書士試験センター       | 過去問の利用許諾                 |
| 社労士    | 全国社会保険労務士会連合会 | 過去問の公開方針                 |

**リスク軽減のための推奨アプローチ（MVP）**

1. **Phase 1（最低リスク）**: 解説のみの構成で開始

   - 問題文は掲載せず、問題番号・テーマ・解説のみ
   - 公式過去問へのリンクを設置

2. **Phase 2（許諾取得後）**: 要約・部分引用の追加

   - 実施団体から許諾が得られた資格のみ
   - 問題文の要点を要約して引用形式で掲載

3. **Phase 3（条件が整えば）**: 全文掲載（非推奨）
   - 正式な許諾契約を結んだ場合のみ
   - 使用料が発生する場合もあり

### 9.2 重複コンテンツ対策

**リスク**

- 同じ問題が複数の URL でアクセス可能
- 検索エンジンが正規ページを認識できない

**対策**

1. **canonical URL の設定**

   ```typescript
   // 全ページにcanonicalを設定
   export const metadata = {
     alternates: {
       canonical: `https://example.com${pathname}`,
     },
   };
   ```

2. **301 リダイレクト**

   - 旧 URL → 新 URL への自動リダイレクト
   - Next.js の middleware で実装

3. **検索パラメータの正規化**
   - 検索結果ページの canonical は検索パラメータを除外

### 9.3 薄いページ対策

**リスク**

- 内容が薄いページが検索で評価されない
- ユーザーの滞在時間が短い

**対策**

1. **最低限の文字数**

   - 過去問詳細: 解説は最低 500 文字
   - 勉強法ページ: 最低 1000 文字
   - FAQ: 最低 200 文字

2. **関連コンテンツの充実**

   - 関連問題へのリンク
   - 関連勉強法へのリンク
   - サイドバーに人気コンテンツ

3. **ユーザーエンゲージメント**
   - 目次の設置（TOC）
   - 前/次の問題へのナビゲーション
   - コメント機能（将来的に検討）

### 9.4 広告過多による UX 低下

**リスク**

- 広告が多すぎてコンテンツが読みにくい
- モバイルでページが重い
- ユーザー離脱

**対策**

1. **広告配置の最適化**

   - コンテンツ上部: 1 つまで
   - コンテンツ中: 2-3 つまで（長文の場合）
   - サイドバー: 1-2 つまで
   - フッター: 1 つまで

2. **広告の遅延読み込み**

   - コンテンツ読み込み後に広告を読み込む
   - Intersection Observer API を使用

3. **A/B テスト**

   - 広告配置パターンをテスト
   - ユーザー行動（滞在時間、離脱率）を計測

4. **モバイル最適化**
   - モバイルでは広告を減らす
   - ネイティブ広告を優先

---

## 10. すぐ実装に着手できる ToDo リスト

### プロジェクトセットアップ

- [ ] Next.js 14 (App Router) プロジェクト作成
- [ ] TypeScript 設定
- [ ] ESLint/Prettier 設定
- [ ] Git リポジトリ初期化
- [ ] 環境変数設定（.env.local）

### ディレクトリ構造

- [ ] `app/` ディレクトリ構造作成
- [ ] `components/` ディレクトリ作成
- [ ] `lib/` ディレクトリ作成
- [ ] `content/` ディレクトリ作成（Markdown 用）
- [ ] `public/images/` ディレクトリ作成

### 型定義・データモデル

- [ ] `lib/types/index.ts` 作成（全型定義）
- [ ] サンプルデータ作成（1 資格、5 問、1 記事）
- [ ] データ取得関数のスケルトン作成

### 基本レイアウト

- [ ] `app/layout.tsx` 作成（ルートレイアウト）
- [ ] `components/layout/Header.tsx` 作成
- [ ] `components/layout/Footer.tsx` 作成
- [ ] `components/layout/Breadcrumbs.tsx` 作成

### コアページ（プロトタイプ）

- [ ] `app/page.tsx` 作成（トップページ）
- [ ] `app/certs/page.tsx` 作成（資格一覧）
- [ ] `app/certs/[certSlug]/page.tsx` 作成（資格トップ）
- [ ] `app/certs/[certSlug]/kakomon/page.tsx` 作成（過去問一覧）
- [ ] `app/certs/[certSlug]/kakomon/[year]/[season]/[category]/[qid]/page.tsx` 作成（問題詳細）

### コンポーネント

- [ ] `components/cert/CertCard.tsx` 作成
- [ ] `components/question/QuestionText.tsx` 作成
- [ ] `components/question/Explanation.tsx` 作成
- [ ] `components/app/AppBanner.tsx` 作成
- [ ] `components/ui/TOC.tsx` 作成（目次）

### SEO 実装

- [ ] `app/sitemap.ts` 作成
- [ ] `app/robots.ts` 作成
- [ ] 各ページに metadata 設定（title, description）
- [ ] 構造化データ（JSON-LD）実装（問題詳細ページ）
- [ ] canonical URL 設定

### スタイリング

- [ ] Tailwind CSS 導入（推奨）
- [ ] 基本スタイル定義
- [ ] レスポンシブデザイン対応

### コンテンツ作成（FP3 級を例に）

- [ ] FP3 級の基本情報データ作成
- [ ] FP3 級の過去問 10 問作成（Markdown）
- [ ] FP3 級の勉強法記事 1 本作成
- [ ] FP3 級の FAQ 5 件作成

### 機能実装

- [ ] 検索・フィルター機能（年度、分野）
- [ ] 内部リンク自動生成（関連問題）
- [ ] パンくずリスト実装（全ページ）
- [ ] 前/次の問題へのナビゲーション

### 計測・広告（後回し可）

- [ ] GA4 設定（測定 ID 設定）
- [ ] GA4 イベント実装（page_view, app_cta_click）
- [ ] Google AdSense 設定（広告ユニット作成）
- [ ] 広告コンポーネント作成

### パフォーマンス最適化

- [ ] 画像最適化設定（next/image）
- [ ] ISR/SSG 設定（next.config.js）
- [ ] コード分割（動的インポート）

### テスト・デプロイ

- [ ] ローカル動作確認
- [ ] ビルド確認（npm run build）
- [ ] Vercel 等へのデプロイ設定
- [ ] 本番環境での動作確認

---

## 推奨スタック（MVP）

### コアスタック

- **フレームワーク**: Next.js 14 (App Router)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS
- **コンテンツ管理**: Markdown/MDX (gray-matter + next-mdx-remote)
- **デプロイ**: Vercel

### パッケージ例

```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "gray-matter": "^4.0.3",
    "remark": "^15.0.0",
    "remark-html": "^16.0.0",
    "rehype-highlight": "^7.0.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^18.0.0",
    "typescript": "^5.0.0",
    "tailwindcss": "^3.0.0",
    "eslint": "^8.0.0",
    "prettier": "^3.0.0"
  }
}
```

### 外部サービス

- **分析**: Google Analytics 4
- **広告**: Google AdSense
- **検索コンソール**: Google Search Console
- **ホスティング**: Vercel（無料プランから開始可能）

---

## 次のステップ

1. **プロジェクト初期化**: `npx create-next-app@latest licenseBlog --typescript --tailwind --app`
2. **ディレクトリ構造作成**: 上記の構成に従って作成
3. **型定義実装**: `lib/types/index.ts` を作成
4. **サンプルデータ作成**: FP3 級のデータを 5 問分作成
5. **プロトタイプページ実装**: 過去問詳細ページから着手

以上で設計ドキュメントは完了です。実装に着手する準備が整いました。
