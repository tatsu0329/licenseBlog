# 過去問集と解説集のデータ構造

## 概要

過去問データは「過去問集」と「解説集」に分離して管理します。

- **過去問集**: 問題文、選択肢、正解のみ（解説なし）
- **解説集**: 解説、詳細解説、解説画像（問題IDで過去問集と紐付く）

## ディレクトリ構造

```
lib/data/
├── questions/              # 過去問集（問題文・選択肢・正解のみ）
│   └── {資格ID}_r{和暦年}_{回次}.json
│
└── explanations/           # 解説集（解説のみ）
    └── {資格ID}_r{和暦年}_{回次}.json
```

## ファイル命名規則

### 過去問集
```
questions/{資格ID}_r{和暦年}_{回次}.json
```

### 解説集
```
explanations/{資格ID}_r{和暦年}_{回次}.json
```

### 例
- 過去問集: `questions/auto_mechanic_1_r6_2.json`
- 解説集: `explanations/auto_mechanic_1_r6_2.json`

## データ形式

### 過去問集の構造

```json
{
  "metadata": {
    "certId": "auto-mechanic-1",
    "year": 2024,
    "season": 2,
    "source": "1級自動車整備士 令和6年度第2回学科試験（国土交通省）",
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
      "questionSummary": "問題文の要約",
      "questionTheme": "問題のテーマ",
      "choices": [
        {
          "number": 1,
          "text": "選択肢1"
        },
        {
          "number": 2,
          "text": "選択肢2"
        },
        {
          "number": 3,
          "text": "選択肢3"
        },
        {
          "number": 4,
          "text": "選択肢4"
        }
      ],
      "correctAnswer": 3
    }
  ]
}
```

### 解説集の構造

```json
{
  "metadata": {
    "certId": "auto-mechanic-1",
    "year": 2024,
    "season": 2,
    "publishedAt": "2024-10-01T00:00:00.000Z",
    "updatedAt": "2024-10-01T00:00:00.000Z"
  },
  "explanations": [
    {
      "questionId": "auto-mechanic-1-2024-2-001",
      "questionNumber": "001",
      "explanation": "解説（メインコンテンツ）",
      "explanationDetail": "詳細解説（Markdown可）",
      "explanationImages": [
        "/image/explanation/question-001-diagram.png"
      ],
      "difficulty": 5,
      "tags": [
        "イグニッション・コイル",
        "電気装置",
        "故障診断"
      ],
      "relatedQuestionIds": []
    }
  ]
}
```

## 問題IDの生成規則

問題IDは以下の形式で生成します：

```
{資格ID}-{年度}-{回次}-{問題番号}
```

例: `auto-mechanic-1-2024-2-001`

- 過去問集と解説集は同じ問題IDで紐付けます
- 過去問集から問題IDを生成し、解説集の `questionId` で参照します

## データの読み込み方法

### TypeScriptでの実装例

```typescript
// 過去問集の読み込み
import questionsJson from "./questions/auto_mechanic_1_r6_2.json";
import explanationsJson from "./explanations/auto_mechanic_1_r6_2.json";

// 過去問と解説をマージ
function mergeQuestionsAndExplanations(
  questions: QuestionSet,
  explanations: ExplanationSet
): Question[] {
  const explanationMap = new Map(
    explanations.explanations.map((exp) => [exp.questionId, exp])
  );

  return questions.questions.map((q) => {
    const questionId = `${questions.metadata.certId}-${questions.metadata.year}-${questions.metadata.season}-${q.questionNumber}`;
    const explanation = explanationMap.get(questionId);

    return {
      id: questionId,
      certId: questions.metadata.certId,
      year: questions.metadata.year,
      season: questions.metadata.season,
      categoryId: q.categoryId,
      questionNumber: q.questionNumber,
      questionSummary: q.questionSummary,
      questionTheme: q.questionTheme,
      choices: q.choices,
      correctAnswer: q.correctAnswer,
      explanation: explanation?.explanation || "",
      explanationDetail: explanation?.explanationDetail,
      explanationImages: explanation?.explanationImages || [],
      difficulty: explanation?.difficulty,
      tags: explanation?.tags || [],
      relatedQuestionIds: explanation?.relatedQuestionIds || [],
      source: questions.metadata.source,
      sourceUrl: questions.metadata.sourceUrl,
      officialPastQuestionUrl: questions.metadata.officialPastQuestionUrl,
      permissionStatus: questions.metadata.permissionStatus,
      publishedAt: new Date(questions.metadata.publishedAt),
      updatedAt: new Date(questions.metadata.updatedAt),
    };
  });
}
```

## 現在の状況

- **現在あるJSON**: `lib/data/questions/auto_mechanic_1_r6_2.json` → これは解説集として扱う
- **移動先**: `lib/data/explanations/auto_mechanic_1_r6_2.json` に移動（またはコピー）
- **新規作成**: `lib/data/questions/auto_mechanic_1_r6_2.json` に過去問集（問題文・選択肢・正解のみ）を作成

## メリット

1. **著作権リスクの分離**: 過去問（問題文）と解説を分離することで、著作権リスクを管理しやすくなる
2. **更新の柔軟性**: 問題文と解説を独立して更新できる
3. **再利用性**: 同じ問題文に対して複数の解説を紐付けることが可能（将来的に）
4. **データ管理**: 問題文と解説を分けて管理することで、データの整合性を保ちやすい

