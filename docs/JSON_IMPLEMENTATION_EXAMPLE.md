# JSONファイル方式の実装例

## 実装手順

### 1. JSONファイルの作成

```json
// lib/data/questions/auto_mechanic_1_r6_2.json
[
  {
    "id": "auto-mechanic-1-2024-2-001",
    "certId": "auto-mechanic-1",
    "year": 2024,
    "season": 2,
    "categoryId": "electrical-1",
    "questionNumber": "001",
    "questionText": "イグニション・コイルの駆動回路の点検に関する記述のうち、不適切なものは次のうちどれか。",
    "questionTheme": "イグニション・コイルの駆動回路の点検",
    "choices": [
      {
        "number": 1,
        "text": "選択肢1の内容"
      }
    ],
    "correctAnswer": 2,
    "explanation": "正解は2です。",
    "explanationDetail": "【前提条件の確認】\n\n図1の出力回路の信号電圧特性：\n...",
    "difficulty": 5,
    "tags": ["イグニション・コイル", "電気装置"],
    "relatedQuestionIds": [],
    "source": "自動車整備士1級 令和6年度第2回（2024年秋期）学科試験 小特装（国土交通省）",
    "sourceUrl": "https://www.mlit.go.jp/",
    "officialPastQuestionUrl": "https://www.mlit.go.jp/jidosha/jidosha.html",
    "permissionStatus": "pending",
    "publishedAt": "2024-10-01T00:00:00.000Z",
    "updatedAt": "2024-10-01T00:00:00.000Z"
  }
]
```

### 2. TypeScriptでの読み込み

```typescript
// lib/data/questions.ts
import { Question } from '../types';

// JSONファイルを動的インポート（ビルド時に解決）
import questionsR6_2Raw from './questions/auto_mechanic_1_r6_2.json';
import questionsR7_1Raw from './questions/auto_mechanic_1_r7_1.json';

// Date型の変換と型の適用
function parseQuestions(questionsRaw: any[]): Question[] {
  return questionsRaw.map((q) => ({
    ...q,
    publishedAt: new Date(q.publishedAt),
    updatedAt: new Date(q.updatedAt),
  }));
}

const allQuestions: Question[] = [
  ...parseQuestions(questionsR6_2Raw),
  ...parseQuestions(questionsR7_1Raw),
];

export function getQuestion(id: string): Question | undefined {
  return allQuestions.find((q) => q.id === id);
}

export function getAllQuestions(): Question[] {
  return allQuestions;
}
```

### 3. tsconfig.jsonの設定

```json
{
  "compilerOptions": {
    "resolveJsonModule": true,
    // ...
  }
}
```

### 4. ページコンポーネント（変更なし）

```typescript
// app/certs/[certSlug]/kakomon/[year]/[season]/[category]/[qid]/page.tsx
export default async function QuestionPage({ params }: { params: Promise<...> }) {
  const { qid } = await params;
  const question = getQuestion(qid); // サーバーサイドで読み込まれる
  
  // HTMLにコンテンツが含まれる
  return (
    <div>
      <h1>{question.questionText}</h1>
      <p>{question.explanation}</p>
      {/* ... */}
    </div>
  );
}
```

## SEO対策の確認

### ✅ HTMLにコンテンツが含まれる
- サーバーサイドでJSONを読み込むため、ビルド時にHTMLに含まれる
- 検索エンジンが完全にクロール可能

### ✅ 構造化データ（JSON-LD）
- 引き続き含まれる
- 変更なし

### ✅ sitemap.xml
- 動的生成される
- 変更なし

## 移行のメリット

1. **編集のしやすさ**: JSONファイルを直接編集可能
2. **ファイルの分離**: 資格・年度・回次ごとにファイルを分けられる
3. **将来的な拡張**: Headless CMSへの移行が容易

