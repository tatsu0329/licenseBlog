# 国家資格メディアサイト

国家資格の過去問解説と勉強法を提供する SEO メディアサイトです。

## 技術スタック

- **フレームワーク**: Next.js 16 (App Router)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS
- **コンテンツ管理**: Markdown/MDX（予定）

## セットアップ

```bash
# 依存関係のインストール
npm install

# 開発サーバーを起動
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてください。

## プロジェクト構造

```
licenseBlog/
├── app/                    # Next.js App Router
│   ├── page.tsx           # トップページ
│   ├── layout.tsx         # ルートレイアウト
│   ├── certs/             # 資格関連ページ
│   │   ├── [certSlug]/
│   │   │   ├── page.tsx          # 資格トップ
│   │   │   ├── study/            # 勉強法ページ
│   │   │   ├── kakomon/          # 過去問一覧・詳細
│   │   │   ├── faq/              # FAQページ
│   │   │   └── app/              # アプリ紹介ページ
│   └── disclaimer/        # 免責事項
├── components/            # Reactコンポーネント
│   └── images/           # 画像関連コンポーネント
│       ├── QuestionImage.tsx  # 過去問解説用画像
│       └── Diagram.tsx        # 図表表示用
├── lib/
│   ├── types/             # TypeScript型定義
│   └── data/              # データ取得関数
│       ├── certs.ts       # 資格データ
│       ├── questions.ts   # 過去問データ
│       ├── categories.ts  # カテゴリデータ
│       ├── faqs.ts        # FAQデータ
│       └── apps.ts        # アプリデータ
├── public/
│   └── images/           # 静的画像ファイル
│       ├── apps/         # アプリ関連画像
│       └── icons/        # アイコン
└── content/              # コンテンツ（将来拡張）
```

## 重要な注意事項

### 過去問の著作権について

本サイトの過去問解説は、著作権法に基づく適切な引用として掲載しています。

- **問題文は要約・部分引用の形式**で掲載
- **出典の明記**（必須）
- **免責事項の記載**（必須）
- **公式過去問へのリンク**を設置

詳細は `/disclaimer` ページおよび `DESIGN.md` の「9.1 過去問の著作権・引用・免責」セクションを参照してください。

**MVP 開始前には、各試験実施団体への許諾申請を推奨します。**

## 画像の追加方法

### アプリ関連画像

1. アプリアイコンを `/public/images/apps/` に配置
   - 例: `auto-mechanic-1-icon.png`
2. スクリーンショットを `/public/images/apps/` に配置
   - 例: `auto-mechanic-1-screenshot1.png`

### 過去問解説の画像・図表

1. 画像ファイルを `/public/images/questions/[問題ID]/` に配置
   - 例: `/public/images/questions/auto-mechanic-1-2024-1-001/image1.png`
2. `lib/data/questions.ts` の該当問題データに `explanationImages` を追加
   ```typescript
   explanationImages: [
     "/images/questions/auto-mechanic-1-2024-1-001/image1.png",
     "/images/questions/auto-mechanic-1-2024-1-001/image2.png",
   ];
   ```

### 画像最適化

- Next.js の`Image`コンポーネントを使用（自動最適化）
- WebP/AVIF 形式への自動変換
- レスポンシブ画像の自動生成

## 環境変数

`.env.local` ファイルを作成し、以下の変数を設定してください：

```env
NEXT_PUBLIC_BASE_URL=https://your-domain.com
NEXT_PUBLIC_ADSENSE_PUBLISHER_ID=ca-pub-XXXXXXXXXXXXXXXX
```

### AdSenseの設定

1. Google AdSenseでアカウントを作成し、サイトを承認します
2. Publisher IDを取得します（`ca-pub-`で始まるID）
3. `.env.local`ファイルに`NEXT_PUBLIC_ADSENSE_PUBLISHER_ID`を設定します
4. AdSense広告を表示するには、`<AdSense adSlot="XXXXXXXXXX" />`コンポーネントを使用します

例：
```tsx
import AdSense from "@/components/AdSense";

// ページ内で使用
<AdSense adSlot="1234567890" adFormat="auto" fullWidthResponsive />
```

## ビルド

```bash
npm run build
npm start
```

## 現在実装済みの資格

- 1 級自動車整備士（コンテンツ充実）
- 2 級自動車整備士
- 自動車整備士 3 級
- 介護福祉士
- USCPA

## コンテンツの追加方法

記事や問題集を自分で追加する方法は、[コンテンツ追加ガイド](./docs/ADD_CONTENT_GUIDE.md)を参照してください。

- **記事の追加**: `lib/data/articles/` にJSONファイルを作成
- **問題集の追加**: `lib/data/questions/` にJSONファイルを作成
- **テンプレートファイル**: `lib/data/articles/_template.json` と `lib/data/questions/_template_*.json` を参照

## 設計ドキュメント

詳細な設計は `DESIGN.md` を参照してください。

## 実装済み機能

- ✅ 資格トップページ
- ✅ 勉強法ページ
- ✅ 過去問一覧・詳細ページ
- ✅ FAQ ページ
- ✅ アプリ紹介ページ
- ✅ 画像・図表の表示機能
- ✅ SEO 実装（sitemap, robots.txt, 構造化データ）
- ✅ Google AdSense 統合（ポリシー準拠）

## AdSenseポリシー準拠

本サイトは Google AdSense のポリシーに準拠するよう実装されています。

詳細は `docs/ADSENSE_POLICY_GUIDELINES.md` を参照してください。

主な対策:
- 広告ラベルの適切な表示
- クリックを促す文言の排除
- コンテンツと広告の明確な区別
- 適切な広告配置
