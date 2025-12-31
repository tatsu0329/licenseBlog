# JSONファイル構造ガイド

## 概要

問題集ごとに共通利用できる情報（URL、出典、著作権情報など）は**メタデータ**として管理し、JSONファイルには**問題固有の解説文章など**のみを格納します。

## JSONファイル構造

### 基本構造

```json
{
  "metadata": {
    "certId": "auto-mechanic-1",
    "year": 2024,
    "season": 2,
    "source": "1級自動車整備士 令和6年度第2回学科試験 小特装（国土交通省）",
    "sourceUrl": "https://www.mlit.go.jp/",
    "officialPastQuestionUrl": "https://www.mlit.go.jp/jidosha/jidosha.html",
    "permissionStatus": "pending",
    "publishedAt": "2024-10-01T00:00:00.000Z",
    "updatedAt": "2024-10-01T00:00:00.000Z"
  },
  "questions": [
    {
      "questionNumber": "001",
      "categoryId": "electrical-1",
      "questionText": "問題文...",
      "questionTheme": "問題のテーマ",
      "choices": [...],
      "correctAnswer": 2,
      "explanation": "解説",
      "explanationDetail": "詳細解説（Markdown形式）",
      "difficulty": 5,
      "tags": ["タグ1", "タグ2"],
      "relatedQuestionIds": [],
      "explanationImages": []
    }
  ]
}
```

## メタデータ（metadata）

問題集全体で共通の情報を格納します。

| フィールド | 型 | 説明 | 必須 |
|-----------|-----|------|------|
| `certId` | string | 資格ID（例: `"auto-mechanic-1"`） | ✅ |
| `year` | number | 年度（西暦、例: `2024`） | ✅ |
| `season` | 1 \| 2 | 回次（1=第1回、2=第2回） | ✅ |
| `source` | string | 出典情報（試験実施団体など） | ✅ |
| `sourceUrl` | string | 出典URL | ❌ |
| `officialPastQuestionUrl` | string | 公式過去問ページのURL | ❌ |
| `permissionStatus` | string | 許諾状況（`"pending"`, `"granted"`, `"not_required"`, `"unknown"`） | ❌ |
| `publishedAt` | string | 公開日（ISO 8601形式） | ✅ |
| `updatedAt` | string | 更新日（ISO 8601形式） | ✅ |

## 質問データ（questions）

各問題固有の情報を格納します。

| フィールド | 型 | 説明 | 必須 |
|-----------|-----|------|------|
| `questionNumber` | string | 問題番号（例: `"001"`） | ✅ |
| `categoryId` | string | カテゴリID（例: `"electrical-1"`） | ✅ |
| `questionText` | string | 問題文 | ✅ |
| `questionTheme` | string | 問題のテーマ・分野 | ❌ |
| `choices` | Array | 選択肢の配列 | ✅ |
| `correctAnswer` | 1 \| 2 \| 3 \| 4 | 正解の選択肢番号 | ✅ |
| `explanation` | string | 解説（簡易版） | ✅ |
| `explanationDetail` | string | 詳細解説（Markdown形式） | ❌ |
| `difficulty` | 1 \| 2 \| 3 \| 4 \| 5 | 難易度（1=易、5=難） | ❌ |
| `tags` | string[] | タグの配列 | ✅ |
| `relatedQuestionIds` | string[] | 関連問題IDの配列 | ❌ |
| `explanationImages` | string[] | 解説画像URLの配列 | ❌ |

### 選択肢（choices）

```json
{
  "number": 1,
  "text": "選択肢のテキスト"
}
```

## IDの生成ルール

問題IDは、読み込み時に自動生成されます：

```
{metadata.certId}-{metadata.year}-{metadata.season}-{question.questionNumber}
```

例: `auto-mechanic-1-2024-2-001`

## メリット

1. **データの重複排除**: 共通情報（URL、出典など）を1箇所で管理
2. **保守性の向上**: 出典URLなどが変更された場合、メタデータのみ修正すればOK
3. **ファイルサイズの削減**: 各問題に共通情報を繰り返し記述する必要がない
4. **一貫性の確保**: 問題集全体で共通情報が統一される

## 実装例

### 読み込み処理

```typescript
// lib/data/questions.ts
import questionsR6_2Json from "./questions/auto_mechanic_1_r6_2.json";

function loadQuestionsFromJson(jsonData: QuestionJsonFile): Question[] {
  const { metadata, questions } = jsonData;
  
  return questions.map((q) => {
    // IDを生成
    const id = `${metadata.certId}-${metadata.year}-${metadata.season}-${q.questionNumber}`;
    
    return {
      id,
      // メタデータから取得
      certId: metadata.certId,
      year: metadata.year,
      season: metadata.season,
      source: metadata.source,
      sourceUrl: metadata.sourceUrl,
      // 質問固有の情報
      questionNumber: q.questionNumber,
      categoryId: q.categoryId,
      questionText: q.questionText,
      // ...
    };
  });
}
```

## 注意事項

- **Date型の変換**: JSONではISO文字列形式（`"2024-10-01T00:00:00.000Z"`）で保存し、読み込み時にDateオブジェクトに変換
- **IDの一意性**: 同じ問題集内で`questionNumber`が重複しないことを確認
- **必須フィールド**: メタデータの必須フィールドは必ず設定すること


