# 記事追加ガイド

参考サイト（https://kakomonblog.com/2025/01/31/cwkensho2025/）のような合格ライン検証記事や試験分析記事を追加する方法を説明します。

## 記事の種類

以下のような記事を追加できます：

- **合格ライン検証記事**: 各試験回の合格基準点の予測と分析
- **試験分析記事**: 問題の傾向や難易度の分析
- **学習方法記事**: 勉強法や学習ロードマップ
- **その他のコラム記事**: 資格に関する情報提供

## 記事の追加方法

### 1. JSONファイルの作成

`lib/data/articles/` ディレクトリに新しいJSONファイルを作成します。

ファイル名の例：
- `auto_mechanic_1_r6_2_pass_line.json`（合格ライン検証記事）
- `auto_mechanic_1_r7_1_analysis.json`（試験分析記事）

### 2. 記事データの記述

以下の形式でJSONファイルを作成します：

```json
{
  "id": "記事の一意なID",
  "slug": "URLスラッグ（英数字とハイフンのみ）",
  "title": "記事のタイトル",
  "excerpt": "記事の要約（SEO用、150文字程度推奨）",
  "featuredImageUrl": null,
  "author": "著者名（オプション）",
  "tags": [
    "タグ1",
    "タグ2",
    "タグ3"
  ],
  "relatedCertIds": [
    "auto-mechanic-1"
  ],
  "relatedQuestionIds": [],
  "publishedAt": "2024-10-01T00:00:00.000Z",
  "updatedAt": "2024-10-01T00:00:00.000Z",
  "content": "# 記事の本文（Markdown形式）\n\n本文をMarkdown形式で記述します。\n\n## 見出し\n\n段落。\n\n### 小見出し\n\n- リスト項目1\n- リスト項目2\n\n| 列1 | 列2 |\n|-----|-----|\n| データ1 | データ2 |"
}
```

### 3. 記事データの読み込み

`lib/data/articles.ts` に、作成したJSONファイルをインポートして `getAllArticles` 関数に追加します：

```typescript
import newArticle from "./articles/new_article.json";

export function getAllArticles(): Article[] {
  const articles: ArticleJson[] = [
    autoMechanic1R6_2PassLineArticle as ArticleJson,
    newArticle as ArticleJson,  // 追加
  ];

  return articles.map(parseArticleDates);
}
```

## Markdown記法のサポート

記事本文では、以下のMarkdown記法が使用できます：

- **見出し**: `#`, `##`, `###`
- **段落**: 空行で区切る
- **リスト**: `-` で始める
- **テーブル**: `|` で区切る（簡易対応）
- **リンク**: `[テキスト](URL)` 形式は将来的に追加予定

## 記事の公開状態

- `publishedAt` が現在時刻以前の場合、記事一覧に表示されます
- `publishedAt` が未来の場合、記事は非公開になります（予約投稿）

## 記事のアクセス

- **一覧ページ**: `/articles`
- **詳細ページ**: `/articles/[slug]`
- **資格ページからのリンク**: 資格ページの「関連記事」セクションに表示

## 合格ライン検証記事のテンプレート

```json
{
  "id": "cert-id-year-season-pass-line",
  "slug": "cert-name-year-season-pass-line-verification",
  "title": "[資格名] [年度回次]の合格ラインを検証しました",
  "excerpt": "[年度回次]の[資格名]試験の合格ラインを、過去のデータと解答速報の結果を基に検証しました。",
  "tags": [
    "[資格名]",
    "合格ライン",
    "合格率",
    "[年度回次]"
  ],
  "relatedCertIds": [
    "cert-id"
  ],
  "content": "# [資格名] [年度回次]の合格ラインを検証しました\n\n## 過去の合格基準点と合格率\n\n| 開催年度 | 回次 | 合格基準点 | 合格率 | 合格者数／受験者数 |\n|---------|------|----------|-------|-----------------|\n| ... | ... | ... | ... | ... |\n\n## 検証結果\n\n..."
}
```

## 注意事項

1. **スラッグの重複**: 同じスラッグの記事は作成しないでください
2. **IDの一意性**: 記事IDは必ず一意にしてください
3. **関連資格**: `relatedCertIds` には、関連する資格のIDを追加してください
4. **公開日時**: `publishedAt` はUTC時刻で指定してください
5. **Markdownの表**: 完全なMarkdownパーサーではないため、複雑な表はシンプルに記述してください

## 記事の更新

記事を更新する場合は：

1. JSONファイルの `content` を修正
2. `updatedAt` を更新（現在時刻に）
3. ビルドまたは再デプロイ

記事の履歴管理が必要な場合は、Gitのコミット履歴を活用してください。

