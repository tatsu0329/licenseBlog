# 問題集の画像格納場所

## 概要

Next.jsでは、`public/` ディレクトリ内のファイルはルートパス `/` から直接アクセスできます。

## 現在のJSON形式での画像パス

問題集のJSONファイル（`lib/data/questions/*.json`）では、以下のようなパスが指定されています:

```json
{
  "questions": [
    {
      "id": "No.1",
      "images": ["/image/21031c/21031c-1.png"]
    }
  ]
}
```

## 画像の格納場所

### 方式1: `/image/` パスの場合

JSONファイルで `/image/...` と指定されている場合:
- **格納場所**: `/public/image/` ディレクトリ
- **例**: `/public/image/21031c/21031c-1.png`
- **JSONでの指定**: `"/image/21031c/21031c-1.png"`

### 方式2: `/images/` パスの場合（推奨）

より整理された構造にする場合:
- **格納場所**: `/public/images/questions/` ディレクトリ
- **例**: `/public/images/questions/21031c/21031c-1.png`
- **JSONでの指定**: `"/images/questions/21031c/21031c-1.png"`

## ディレクトリ構造の例

```
public/
├── image/                    # JSONで /image/ と指定している場合
│   └── 21031c/              # 年度・回次ごとのフォルダ
│       ├── 21031c-1.png
│       ├── 21031c-6.png
│       └── ...
└── images/                   # 推奨（他の画像も管理）
    ├── questions/           # 問題集の画像
    │   └── 21031c/
    │       ├── 21031c-1.png
    │       └── ...
    ├── apps/               # アプリ関連画像
    └── icons/              # アイコン
```

## 実装例

### JSONファイルでの指定

```json
{
  "questions": [
    {
      "id": "No.1",
      "question": "問題文...",
      "choices": ["選択肢1", "選択肢2", "選択肢3", "選択肢4"],
      "answerIndex": 2,
      "images": [
        "/image/21031c/21031c-1.png",
        "/image/21031c/21031c-2.png"
      ]
    }
  ]
}
```

### 実際のファイル配置

```bash
# ディレクトリを作成
mkdir -p public/image/21031c

# 画像ファイルを配置
cp 21031c-1.png public/image/21031c/
cp 21031c-2.png public/image/21031c/
```

## 表示の仕組み

1. JSONファイルから画像パスを読み込む: `"/image/21031c/21031c-1.png"`
2. `lib/data/questions.ts` の `loadQuestionSetFromJson()` で処理
3. `question.explanationImages` に画像パスが設定される
4. 問題詳細ページ (`app/certs/[certSlug]/kakomon/[year]/[season]/[category]/[qid]/page.tsx`) で `QuestionImage` コンポーネントが表示
5. Next.jsの `Image` コンポーネントが `/image/21031c/21031c-1.png` を読み込む（実際のファイルは `public/image/21031c/21031c-1.png`）

## 注意事項

- **パスは `/` から始まる**: `/image/...` または `/images/...` のように指定
- **`public/` は含めない**: JSONファイルでは `/public/` は書かない
- **大文字小文字を区別**: ファイル名やディレクトリ名は大文字小文字を正確に指定
- **拡張子を正確に**: `.png`, `.jpg`, `.jpeg` などの拡張子を正確に指定


