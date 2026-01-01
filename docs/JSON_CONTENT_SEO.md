# JSON ファイル方式でのコンテンツ管理と SEO 対策

## 結論

**JSON ファイル方式でも、適切に実装すれば SEO 対策上問題ありません。**

ただし、以下の条件を満たす必要があります：

1. **サーバーサイドで JSON を読み込む**（SSG/SSR）
2. **ビルド時に静的生成される**（SSG 推奨）
3. **HTML にコンテンツが含まれる**
4. **構造化データ（JSON-LD）が含まれる**

---

## 現在の実装方式（TypeScript）

### 実装方法

```typescript
// lib/data/questions.ts
export const questions: Question[] = [
  {
    id: "auto-mechanic-1-2024-2-001",
    // ... データ
  },
];

export function getQuestion(id: string): Question | undefined {
  return questions.find((q) => q.id === id);
}
```

### SEO 対策の状況

- ✅ **SSG（Static Site Generation）**: ビルド時に静的生成
- ✅ **サーバーサイドレンダリング**: コンテンツが HTML に含まれる
- ✅ **構造化データ**: JSON-LD が含まれる
- ✅ **検索エンジンクロール**: 完全にクロール可能

---

## JSON ファイル方式への移行案

### パターン 1: ビルド時に JSON を読み込む（推奨）

#### ファイル構造

```
lib/data/
├── questions/
│   ├── auto_mechanic_1_r6_2.json
│   ├── auto_mechanic_1_r7_1.json
│   └── ...
└── questions.ts  # JSONを読み込む関数
```

#### 実装例

```typescript
// lib/data/questions.ts
import fs from "fs";
import path from "path";
import { Question } from "../types";

// ビルド時にJSONを読み込む（サーバーサイドのみ）
const questionsDir = path.join(process.cwd(), "lib/data/questions");

function loadQuestionsFromJson(): Question[] {
  const questionFiles = fs.readdirSync(questionsDir);
  const allQuestions: Question[] = [];

  for (const file of questionFiles) {
    if (file.endsWith(".json")) {
      const filePath = path.join(questionsDir, file);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const questions: Question[] = JSON.parse(fileContent);
      allQuestions.push(...questions);
    }
  }

  return allQuestions;
}

// ビルド時に1回だけ実行される
const allQuestions = loadQuestionsFromJson();

export function getQuestion(id: string): Question | undefined {
  return allQuestions.find((q) => q.id === id);
}

export function getAllQuestions(): Question[] {
  return allQuestions;
}
```

#### JSON ファイルの例

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
    "questionText": "イグニション・コイルの駆動回路の点検に関する記述...",
    "choices": [
      {
        "number": 1,
        "text": "選択肢1の内容"
      }
    ],
    "correctAnswer": 2,
    "explanation": "正解は2です。",
    "explanationDetail": "【前提条件の確認】\n\n図1の出力回路の信号電圧特性：\n・信号は5Vと0Vを交互に繰り返す矩形波\n...",
    "difficulty": 5,
    "tags": ["イグニション・コイル", "電気装置"],
    "relatedQuestionIds": [],
    "source": "1級自動車整備士 令和6年度第2回...",
    "sourceUrl": "https://www.mlit.go.jp/",
    "officialPastQuestionUrl": "https://www.mlit.go.jp/jidosha/jidosha.html",
    "permissionStatus": "pending",
    "publishedAt": "2024-10-01T00:00:00.000Z",
    "updatedAt": "2024-10-01T00:00:00.000Z"
  }
]
```

#### SEO 対策

- ✅ **SSG**: ビルド時に JSON を読み込み、静的 HTML を生成
- ✅ **サーバーサイド**: コンテンツが HTML に含まれる
- ✅ **検索エンジン**: 完全にクロール可能
- ✅ **構造化データ**: 引き続き JSON-LD が含まれる

---

### パターン 2: 動的インポート（Next.js 推奨）

#### 実装例

```typescript
// lib/data/questions.ts
import { Question } from "../types";

// 動的インポート（ビルド時に解決される）
const questionModules = {
  auto_mechanic_1_r6_2: () => import("./questions/auto_mechanic_1_r6_2.json"),
  auto_mechanic_1_r7_1: () => import("./questions/auto_mechanic_1_r7_1.json"),
};

export async function getAllQuestions(): Promise<Question[]> {
  const allQuestions: Question[] = [];

  for (const [key, loader] of Object.entries(questionModules)) {
    const module = await loader();
    allQuestions.push(...module.default);
  }

  return allQuestions;
}

export async function getQuestion(id: string): Promise<Question | undefined> {
  const questions = await getAllQuestions();
  return questions.find((q) => q.id === id);
}
```

#### 注意点

- TypeScript では`.json`の直接インポートが可能
- ビルド時に静的生成される
- サーバーサイドでのみ実行される

---

## SEO 対策の比較

| 項目                            | TypeScript 方式 | JSON 方式（SSG） | JSON 方式（クライアント）   |
| ------------------------------- | --------------- | ---------------- | --------------------------- |
| **HTML にコンテンツが含まれる** | ✅ はい         | ✅ はい          | ❌ いいえ                   |
| **検索エンジンがクロール可能**  | ✅ はい         | ✅ はい          | ❌ いいえ                   |
| **初回表示速度**                | ✅ 速い         | ✅ 速い          | ❌ 遅い                     |
| **構造化データ**                | ✅ 含まれる     | ✅ 含まれる      | ⚠️ 含まれるがコンテンツなし |
| **SEO 評価**                    | ✅ 高い         | ✅ 高い          | ❌ 低い                     |

---

## 推奨実装パターン

### ✅ 推奨：JSON ファイル + SSG

```typescript
// lib/data/questions.ts
import { Question } from "../types";
import questionsR6_2 from "./questions/auto_mechanic_1_r6_2.json";
import questionsR7_1 from "./questions/auto_mechanic_1_r7_1.json";

// ビルド時に結合（サーバーサイドのみ）
const allQuestions: Question[] = [...questionsR6_2, ...questionsR7_1];

export function getQuestion(id: string): Question | undefined {
  return allQuestions.find((q) => q.id === id);
}

export function getAllQuestions(): Question[] {
  return allQuestions;
}
```

#### メリット

- ✅ コンテンツとロジックの分離
- ✅ JSON ファイルで編集しやすい
- ✅ SEO 対策上問題なし（SSG で静的生成）
- ✅ 型安全性も維持可能（JSON Schema の検証）

---

## 注意が必要な実装パターン

### ❌ 非推奨：クライアントサイドで JSON を読み込む

```typescript
// ❌ これはSEO対策上問題あり
"use client";

import { useEffect, useState } from "react";

export default function QuestionPage() {
  const [question, setQuestion] = useState<Question | null>(null);

  useEffect(() => {
    // クライアントサイドで読み込む
    fetch("/api/questions/001")
      .then((res) => res.json())
      .then((data) => setQuestion(data));
  }, []);

  // 初回レンダリング時はコンテンツが空
  return <div>{question?.explanation}</div>;
}
```

#### 問題点

- ❌ HTML にコンテンツが含まれない（初回レンダリング時は空）
- ❌ 検索エンジンがコンテンツをクロールできない
- ❌ SEO 評価が低くなる

---

## JSON ファイル方式のメリット

### 1. コンテンツ管理のしやすさ

- 非技術者でも編集しやすい（エディタで直接編集可能）
- バージョン管理しやすい（Git diff で変更内容が明確）
- 一括編集・置換が容易

### 2. データの分離

- コンテンツとロジックの分離
- ファイル単位で管理しやすい
- データの追加・削除が容易

### 3. 将来的な拡張性

- Headless CMS への移行が容易
- API からの読み込みにも対応可能
- 外部ツールでの編集が可能

---

## JSON ファイル方式のデメリット

### 1. 型安全性

- JSON ファイルは型チェックが効かない
- TypeScript の型定義と整合性を保つ必要がある
- JSON Schema で検証することを推奨

### 2. ビルド時間

- 大量の JSON ファイルがある場合、ビルド時間が増加する可能性
- ただし、実用的には問題にならない程度

---

## 実装時の推奨事項

### 1. JSON Schema で検証

```typescript
// lib/schemas/question.schema.ts
import Ajv from "ajv";
import questionSchema from "./question.schema.json";

const ajv = new Ajv();
const validate = ajv.compile(questionSchema);

export function validateQuestion(data: unknown): Question {
  if (!validate(data)) {
    throw new Error(
      `Invalid question data: ${JSON.stringify(validate.errors)}`
    );
  }
  return data as Question;
}
```

### 2. 型定義を維持

```typescript
// lib/data/questions.ts
import { Question } from "../types";
import questionsR6_2Raw from "./questions/auto_mechanic_1_r6_2.json";
import { validateQuestion } from "../schemas/question.schema";

// ビルド時に検証
const questionsR6_2: Question[] = questionsR6_2Raw.map(validateQuestion);
```

### 3. Date 型の変換

JSON では Date 型が文字列になるため、読み込み時に変換が必要：

```typescript
function parseQuestionDates(question: any): Question {
  return {
    ...question,
    publishedAt: new Date(question.publishedAt),
    updatedAt: new Date(question.updatedAt),
  };
}
```

---

## まとめ

### ✅ JSON ファイル方式でも SEO 対策上問題ない条件

1. **サーバーサイドで読み込む**（SSG/SSR）
2. **ビルド時に静的生成される**（SSG 推奨）
3. **HTML にコンテンツが含まれる**
4. **構造化データ（JSON-LD）が含まれる**
5. **sitemap.xml が動的生成される**

### 現在の実装との比較

| 観点             | TypeScript 方式 | JSON 方式（SSG）              |
| ---------------- | --------------- | ----------------------------- |
| **SEO**          | ✅ 問題なし     | ✅ 問題なし                   |
| **管理しやすさ** | ⚠️ 中程度       | ✅ 高い                       |
| **型安全性**     | ✅ 高い         | ⚠️ 検証必要                   |
| **ビルド時間**   | ✅ 速い         | ✅ 速い（実用的には問題なし） |

**結論**: JSON ファイル方式でも、サーバーサイドで読み込む限り、SEO 対策上問題ありません。


