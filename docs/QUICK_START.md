# クイックスタートガイド

このガイドでは、記事や問題集を素早く追加する方法を説明します。

## 記事を追加する（5分）

### 1. テンプレートをコピー

```bash
cp lib/data/articles/_template.json lib/data/articles/my_new_article.json
```

### 2. JSONファイルを編集

`lib/data/articles/my_new_article.json` を開き、以下の項目を編集：

- `id`: 一意なID（例: `my-new-article`）
- `slug`: URLスラッグ（例: `my-new-article`）
- `title`: 記事のタイトル
- `excerpt`: 記事の要約（150文字程度）
- `content`: 記事本文（Markdown形式）
- `relatedCertIds`: 関連資格のID（例: `["auto-mechanic-1"]`）
- `publishedAt`: 公開日時（UTC形式）

### 3. データファイルに追加

`lib/data/articles.ts` を開き、以下を追加：

```typescript
import myNewArticle from "./articles/my_new_article.json";

export function getAllArticles(): Article[] {
  const articles: ArticleJson[] = [
    // 既存の記事...
    myNewArticle as ArticleJson, // 追加
  ];
  return articles.map(parseArticleDates);
}
```

### 4. 確認

開発サーバーを起動して確認：

```bash
npm run dev
```

`http://localhost:3000/articles/my-new-article` にアクセス

---

## 問題集を追加する（10分）

### 1. テンプレートをコピー

**1級整備士の場合:**
```bash
cp lib/data/questions/_template_level1.json lib/data/questions/level-1-C-2024-2.json
```

**2級整備士の場合:**
```bash
cp lib/data/questions/_template_level2.json lib/data/questions/level-2-G-2024-2.json
```

**3級整備士の場合:**
```bash
cp lib/data/questions/_template_level3.json lib/data/questions/level-3-G-2024-2.json
```

### 2. JSONファイルを編集

JSONファイルを開き、以下を編集：

- `category.level`: 資格レベル（"国家1級", "国家2級", "国家3級"）
- `category.fuelType`: 燃料タイプ（"小型", "ガソリン", "ジーゼル"など）
- `category.year`: 年度と回次（"2024-2"）
- `questions`: 問題の配列

各問題には以下を記述：

- `id`: 問題番号（"No.1", "No.2"など）
- `question`: 問題文
- `choices`: 選択肢の配列（4つ）
- `answerIndex`: 正解のインデックス（1-4）
- `images`: 画像パス（オプション）

### 3. 画像を配置（必要な場合）

```bash
mkdir -p public/image/24031c
# 画像ファイルを配置
```

### 4. データファイルに追加

`lib/data/questions.ts` を開き、以下を追加：

```typescript
import questionsNewJson from "./questions/level-1-C-2024-2.json";

const questionSetNew = loadQuestionSetFromJson(
  questionsNewJson as QuestionSetJsonFile
);

export function getAllQuestions(): Question[] {
  return [
    // 既存の問題...
    ...questionSetNew, // 追加
  ];
}
```

### 5. 確認

開発サーバーを起動して確認：

```bash
npm run dev
```

資格ページの「過去問」タブから問題を確認

---

## よく使うコマンド

```bash
# 開発サーバー起動
npm run dev

# ビルド
npm run build

# 本番サーバー起動
npm start

# 型チェック
npm run type-check
```

---

## 次のステップ

- [詳細なコンテンツ追加ガイド](./ADD_CONTENT_GUIDE.md)を読む
- [データ構造の説明](../lib/data/DATA_STRUCTURE.md)を確認
- [ファイル命名規則](../lib/data/FILE_NAMING_CONVENTION.md)を確認


