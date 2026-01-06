# コンテンツ追加ガイド

このガイドでは、記事や問題集を自分で追加する方法を説明します。

## 目次

1. [記事の追加方法](#記事の追加方法)
2. [問題集の追加方法](#問題集の追加方法)
3. [よくある質問](#よくある質問)

---

## 記事の追加方法

### ステップ1: JSONファイルの作成

`lib/data/articles/` ディレクトリに新しいJSONファイルを作成します。

**ファイル名の規則:**
- 小文字とアンダースコア（`_`）を使用
- 例: `auto_mechanic_1_r6_2_pass_line.json`

**テンプレートファイル:**
`lib/data/articles/_template.json` をコピーして使用してください。

### ステップ2: 記事データの記述

JSONファイルに以下の形式でデータを記述します：

```json
{
  "id": "記事の一意なID（例: auto-mechanic-1-r6-2-pass-line）",
  "slug": "URLスラッグ（英数字とハイフンのみ、例: auto-mechanic-1-r6-2-pass-line）",
  "title": "記事のタイトル",
  "excerpt": "記事の要約（SEO用、150文字程度推奨）",
  "featuredImageUrl": null,
  "author": "著者名（オプション）",
  "tags": ["タグ1", "タグ2", "タグ3"],
  "relatedCertIds": ["auto-mechanic-1"],
  "relatedQuestionIds": [],
  "publishedAt": "2024-10-01T00:00:00.000Z",
  "updatedAt": "2024-10-01T00:00:00.000Z",
  "content": "# 記事の本文（Markdown形式）\n\n本文をMarkdown形式で記述します。"
}
```

**重要フィールドの説明:**

- `id`: 記事を識別する一意なID（重複不可）
- `slug`: URLに使用される文字列（例: `/articles/auto-mechanic-1-r6-2-pass-line`）
- `title`: 記事のタイトル（検索エンジンに表示される）
- `excerpt`: 記事の要約（検索結果や一覧ページに表示される）
- `content`: 記事本文（Markdown形式で記述）
- `relatedCertIds`: 関連する資格のID配列（例: `["auto-mechanic-1"]`）
- `publishedAt`: 公開日時（UTC形式、未来の日時を指定すると予約投稿）
- `updatedAt`: 更新日時（UTC形式）

### ステップ3: 記事データの読み込み

`lib/data/articles.ts` を開き、以下の手順で追加します：

1. **インポート文を追加:**
```typescript
import newArticle from "./articles/new_article.json";
```

2. **`getAllArticles` 関数に追加:**
```typescript
export function getAllArticles(): Article[] {
  const articles: ArticleJson[] = [
    // 既存の記事...
    autoMechanic1R6_2PassLineArticle as ArticleJson,
    newArticle as ArticleJson, // 追加
  ];

  return articles.map(parseArticleDates);
}
```

### ステップ4: 確認

1. 開発サーバーを起動: `npm run dev`
2. 記事一覧ページにアクセス: `http://localhost:3000/articles`
3. 記事詳細ページにアクセス: `http://localhost:3000/articles/[slug]`

### Markdown記法のサポート

記事本文では、以下のMarkdown記法が使用できます：

- **見出し**: `#`, `##`, `###`
- **段落**: 空行で区切る
- **リスト**: `-` で始める
- **テーブル**: `|` で区切る
- **リンク**: `[テキスト](URL)` 形式
- **強調**: `**太字**`, `*斜体*`

---

## 問題集の追加方法

### ステップ1: JSONファイルの作成

`lib/data/questions/` ディレクトリに新しいJSONファイルを作成します。

**ファイル名の規則:**
- 資格ID、年度、回次を含める
- 例: `level-1-C-2024-2.json`（1級小型 2024年度第2回）

**テンプレートファイル:**
- 1級整備士: `lib/data/questions/_template_level1.json`
- 2級整備士: `lib/data/questions/_template_level2.json`
- 3級整備士: `lib/data/questions/_template_level3.json`

### ステップ2: 問題データの記述

#### 1級整備士の場合

```json
{
  "category": {
    "level": "国家1級",
    "fuelType": "小型",
    "year": "2024-2"
  },
  "questions": [
    {
      "id": "No.1",
      "question": "問題文（全文または要約）",
      "choices": [
        "(1). 選択肢1",
        "(2). 選択肢2",
        "(3). 選択肢3",
        "(4). 選択肢4"
      ],
      "answerIndex": 3,
      "images": ["/image/24031c/24031c-1.png"]
    }
  ]
}
```

#### 2級・3級整備士の場合

```json
{
  "category": {
    "level": "国家2級",
    "fuelType": "ガソリン",
    "year": "2024-2"
  },
  "questions": [
    {
      "id": "No.1",
      "question": "問題文（全文または要約）",
      "choices": [
        "(1). 選択肢1",
        "(2). 選択肢2",
        "(3). 選択肢3",
        "(4). 選択肢4"
      ],
      "answerIndex": 3,
      "images": ["/image/24032g/24032g-1.png"]
    }
  ]
}
```

**重要フィールドの説明:**

- `category.level`: 資格レベル（"国家1級", "国家2級", "国家3級"）
- `category.fuelType`: 燃料タイプ（"小型", "ガソリン", "ジーゼル", "2輪", "シャシ"）
- `category.year`: 年度と回次（"2024-2" = 2024年度第2回）
- `questions[].id`: 問題番号（"No.1", "No.2" など）
- `questions[].question`: 問題文
- `questions[].choices`: 選択肢の配列（4つ）
- `questions[].answerIndex`: 正解のインデックス（1-4、1ベース）
- `questions[].images`: 問題画像のパス配列（オプション）

### ステップ3: 問題データの読み込み

`lib/data/questions.ts` を開き、以下の手順で追加します：

1. **インポート文を追加:**
```typescript
import questionsNewJson from "./questions/level-1-C-2024-2.json";
```

2. **問題セットを読み込み:**
```typescript
const questionSetNew = loadQuestionSetFromJson(
  questionsNewJson as QuestionSetJsonFile
);
```

3. **`getAllQuestions` 関数に追加:**
```typescript
export function getAllQuestions(): Question[] {
  return [
    // 既存の問題...
    ...questions2024_2,
    ...questionSetNew, // 追加
  ];
}
```

### ステップ4: 画像の配置

問題に画像がある場合、`public/image/` ディレクトリに配置します。

**ディレクトリ構造:**
```
public/image/
  └── 24031c/          # 2024年度第1回小型
      ├── 24031c-1.png
      ├── 24031c-2.png
      └── ...
```

**命名規則:**
- `{年度}{回次}{燃料タイプコード}-{問題番号}.png`
- 例: `24031c-1.png`（2024年度第1回小型 問題1）

**燃料タイプコード:**
- 1級小型: `C`
- 2級ガソリン: `G`
- 2級ジーゼル: `D`
- 2級2輪: `M`
- 2級シャシ: `C`
- 3級ガソリン: `G`
- 3級ジーゼル: `D`

### ステップ5: 確認

1. 開発サーバーを起動: `npm run dev`
2. 資格ページにアクセス: `http://localhost:3000/certs/[certSlug]`
3. 問題集ページにアクセス: `http://localhost:3000/certs/[certSlug]/kakomon`

---

## よくある質問

### Q1: 記事のスラッグを変更したい

`slug` フィールドを変更してください。既に公開されている記事のスラッグを変更すると、URLが変わるため注意が必要です。

### Q2: 問題の画像を追加したい

1. 画像を `public/image/` ディレクトリに配置
2. JSONファイルの `images` 配列にパスを追加（例: `["/image/24031c/24031c-1.png"]`）

### Q3: 記事を非公開にしたい

`publishedAt` を未来の日時に設定するか、`lib/data/articles.ts` の `getAllArticles` 関数から該当記事を削除してください。

### Q4: 問題の正解を修正したい

JSONファイルの `answerIndex` を修正してください。1-4の数値で指定します（1ベース）。

### Q5: 記事のMarkdownが正しく表示されない

- Markdownの記法が正しいか確認
- 改行は空行で区切る
- テーブルは `|` で区切る

### Q6: 問題が表示されない

- `lib/data/questions.ts` にインポートと追加が正しく行われているか確認
- JSONファイルの形式が正しいか確認（JSONバリデーターを使用）
- 開発サーバーを再起動

### Q7: 画像が表示されない

- 画像のパスが正しいか確認（`/image/` から始まる）
- 画像ファイルが `public/image/` ディレクトリに存在するか確認
- ファイル名の大文字小文字が一致しているか確認

---

## トラブルシューティング

### エラー: "Cannot find module"

- ファイルパスが正しいか確認
- ファイル名の大文字小文字が一致しているか確認
- 開発サーバーを再起動

### エラー: "Invalid JSON"

- JSONファイルの構文エラーを確認
- オンラインJSONバリデーターを使用して検証

### 記事が表示されない

- `publishedAt` が現在時刻以前か確認
- `lib/data/articles.ts` に正しく追加されているか確認

### 問題が表示されない

- `lib/data/questions.ts` に正しく追加されているか確認
- JSONファイルの形式が正しいか確認

---

## 参考資料

- [記事追加ガイド（詳細版）](./ARTICLE_GUIDE.md)
- [データ構造の説明](../lib/data/DATA_STRUCTURE.md)
- [ファイル命名規則](../lib/data/FILE_NAMING_CONVENTION.md)


