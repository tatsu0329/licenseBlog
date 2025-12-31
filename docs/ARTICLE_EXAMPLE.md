# 記事追加の具体例

## 例: 合格ライン検証記事の作成

参考サイト（https://kakomonblog.com/2025/01/31/cwkensho2025/）のような合格ライン検証記事を作成する手順です。

### 1. JSONファイルの作成

`lib/data/articles/auto_mechanic_1_r7_1_pass_line.json` を作成：

```json
{
  "id": "auto-mechanic-1-r7-1-pass-line",
  "slug": "auto-mechanic-1-r7-1-pass-line-verification",
  "title": "自動車整備士1級 令和7年度第1回（2025年春期）の合格ラインを検証しました",
  "excerpt": "令和7年度第1回（2025年春期）の自動車整備士1級学科試験の合格ラインを、過去のデータと解答速報の結果を基に検証しました。",
  "featuredImageUrl": null,
  "author": "ライセンスブログ編集部",
  "tags": [
    "自動車整備士1級",
    "合格ライン",
    "合格率",
    "令和7年度第1回",
    "2025年春期",
    "試験分析"
  ],
  "relatedCertIds": [
    "auto-mechanic-1"
  ],
  "relatedQuestionIds": [],
  "publishedAt": "2025-06-15T00:00:00.000Z",
  "updatedAt": "2025-06-15T00:00:00.000Z",
  "content": "# 自動車整備士1級 令和7年度第1回（2025年春期）の合格ラインを検証しました\n\n皆様、お疲れさまです。解答速報により、多くの方が自己採点を行ったと思います。\n\n今回は、令和7年度第1回（2025年春期）の自動車整備士1級学科試験の合格ラインを、過去のデータと解答速報の結果を基に検証しました。\n\n## 自動車整備士1級の合格基準点と合格率\n\n自動車整備士1級の学科試験は、満点100点で、合格基準点は原則として**60点以上**です。\n\n### 過去の合格率推移\n\n| **開催年度** | **回次** | **合格基準点** | **合格率** | **合格者数／受験者数** |\n| ---------- | ------- | ---------- | ------- | ---------------- |\n| 令和6年度 | 第1回（春期） | 60点 | 45.0% | 6,840／15,200 |\n| 令和6年度 | 第2回（秋期） | 60点 | （予測） | （予測） |\n\n## 検証結果\n\n**合格ラインの予測: 60点前後**\n\n過去の傾向から、令和7年度第1回も基本的に60点が合格基準となる可能性が高いです。\n\n**60点以上とれていれば、おそらく大丈夫です。**\n"
}
```

### 2. articles.tsに追加

`lib/data/articles.ts` を編集：

```typescript
import autoMechanic1R6_2PassLineArticle from "./articles/auto_mechanic_1_r6_2_pass_line.json";
import autoMechanic1R7_1PassLineArticle from "./articles/auto_mechanic_1_r7_1_pass_line.json"; // 追加

export function getAllArticles(): Article[] {
  const articles: ArticleJson[] = [
    autoMechanic1R6_2PassLineArticle as ArticleJson,
    autoMechanic1R7_1PassLineArticle as ArticleJson, // 追加
  ];

  return articles.map(parseArticleDates);
}
```

### 3. 記事へのアクセス

- 一覧: https://your-site.com/articles
- 詳細: https://your-site.com/articles/auto-mechanic-1-r7-1-pass-line-verification

## 記事コンテンツの書き方

### 合格ライン検証記事の構成

1. **導入**: 試験の感想や解答速報への言及
2. **過去データの提示**: 表形式で過去の合格基準点と合格率を表示
3. **検証方法の説明**: どのような方法で検証したか
4. **検証結果**: 予測される合格ライン
5. **まとめ**: 受験者へのアドバイス
6. **関連リンク**: 過去問ページや公式発表へのリンク

### Markdownの書き方

```markdown
# 大見出し（記事タイトル）

## 中見出し（セクション）

### 小見出し

段落は空行で区切ります。

- リスト項目1
- リスト項目2

| 列1 | 列2 |
|-----|-----|
| データ1 | データ2 |

**太字**や*斜体*も使用できます。
```

### リンクの記述

記事内でリンクを記述する場合：

```markdown
[過去問・解説ページ](/certs/auto-mechanic-1/kakomon)
```

## 記事のSEO対策

1. **タイトル**: 検索キーワードを含める（例: "令和6年度第2回 合格ライン"）
2. **要約**: 150文字程度で、検索意図に応える内容
3. **タグ**: 関連するキーワードを追加
4. **構造化**: 見出しを適切に使用して読みやすく
5. **関連資格**: `relatedCertIds` を正しく設定

## よくある質問

### Q: 記事を非公開にしたい

A: `publishedAt` を未来の日時に設定するか、`articles.ts` からインポートを削除してください。

### Q: 記事の順序を変更したい

A: `getAllArticles` 関数内の配列の順序を変更してください。最新の記事を上に表示する場合は、配列の先頭に追加します。

### Q: 画像を追加したい

A: `public/images/articles/` に画像を配置し、`featuredImageUrl` またはMarkdown内で画像パスを指定してください。

