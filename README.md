# 国家資格メディアサイト

国家資格の過去問解説と勉強法を提供するSEOメディアサイトです。

## 技術スタック

- **フレームワーク**: Next.js 14 (App Router)
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
│   └── disclaimer/        # 免責事項
├── lib/
│   ├── types/             # TypeScript型定義
│   └── data/              # データ取得関数
├── components/            # Reactコンポーネント
└── public/               # 静的ファイル
```

## 重要な注意事項

### 過去問の著作権について

本サイトの過去問解説は、著作権法に基づく適切な引用として掲載しています。

- **問題文は要約・部分引用の形式**で掲載
- **出典の明記**（必須）
- **免責事項の記載**（必須）
- **公式過去問へのリンク**を設置

詳細は `/disclaimer` ページおよび `DESIGN.md` の「9.1 過去問の著作権・引用・免責」セクションを参照してください。

**MVP開始前には、各試験実施団体への許諾申請を推奨します。**

## 環境変数

`.env.local` ファイルを作成し、以下の変数を設定してください：

```env
NEXT_PUBLIC_BASE_URL=https://your-domain.com
```

## ビルド

```bash
npm run build
npm start
```

## 設計ドキュメント

詳細な設計は `DESIGN.md` を参照してください。

