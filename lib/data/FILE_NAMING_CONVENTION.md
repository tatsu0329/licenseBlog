# 問題データファイルの命名規則

## ファイル名形式

**現在の形式（JSON）**:
```
questions/{資格ID}_r{和暦年}_{回次}.json
```

**旧形式（TypeScript、非推奨）**:
```
questions_{資格ID}_r{和暦年}_{回次}.ts
```

### 命名規則の詳細

- **資格ID**: 資格を識別するID
  - `auto_mechanic_1`: 1級自動車整備士
  - `auto_mechanic_2`: 自動車整備士2級
  - `auto_mechanic_3`: 自動車整備士3級
  - `care_worker`: 介護福祉士
  - `uscpa`: USCPA
  - その他資格も同様

- **和暦年**: `r{年数}`形式
  - `r6`: 令和6年度
  - `r7`: 令和7年度
  - `r8`: 令和8年度
  - 例: `r6`, `r7`, `r8`

- **回次**: `1`（第1回）または `2`（第2回）
  - `1`: 第1回
  - `2`: 第2回

### 例

**注意**: 現在はJSON形式（`.json`）を使用しています。TypeScript形式（`.ts`）は非推奨です。

- `questions/auto_mechanic_1_r6_2.json`: 1級自動車整備士 令和6年度第2回
- `questions/auto_mechanic_1_r6_1.json`: 1級自動車整備士 令和6年度第1回
- `questions/auto_mechanic_1_r7_1.json`: 1級自動車整備士 令和7年度第1回
- `questions/care_worker_r6_1.json`: 介護福祉士 令和6年度第1回
- `questions/uscpa_r6_2.json`: USCPA 令和6年度第2回

### 和暦と西暦の対応表（参考）

| 和暦 | 西暦 | ファイル名 |
|------|------|-----------|
| 令和6年 | 2024年 | r6 |
| 令和7年 | 2025年 | r7 |
| 令和8年 | 2026年 | r8 |

## ファイル構造

各ファイルは以下の構造を推奨します：

```typescript
import { Question } from "../types";

/**
 * {資格名} {令和○年度第○回}（{西暦年}{期}）学科試験
 * {分野名}（{問題数}問）
 * 
 * ファイル名規則: questions_{資格ID}_r{和暦年}_{回次}.ts
 * - r6-1: 令和6年度第1回
 * - r6-2: 令和6年度第2回
 */

// 問題1
const question2024_XX_01: Question = {
  // ...
};

// 問題2
const question2024_XX_02: Question = {
  // ...
};

// ... 他の問題

// エクスポート
export const questions2024Autumn: Question[] = [
  question2024_XX_01,
  question2024_XX_02,
  // ...
];
```

## インポート方法

`lib/data/questions.ts` でインポート：

```typescript
// JSONファイルから読み込み
import questionsR6_2Json from "./questions/auto_mechanic_1_r6_2.json";

// loadQuestionsFromJson関数を使用して変換
const questionsR6_2 = loadQuestionsFromJson(questionsR6_2Json);

export function getAllQuestions(): Question[] {
  return [
    // ...
    ...questionsR6_2,
    // ...
  ];
}
```

詳細は `lib/data/questions.ts` を参照してください。

