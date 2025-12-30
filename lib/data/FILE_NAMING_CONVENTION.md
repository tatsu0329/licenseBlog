# 問題データファイルの命名規則

## ファイル名形式

```
questions_{資格ID}_r{和暦年}_{回次}.ts
```

### 命名規則の詳細

- **資格ID**: 資格を識別するID
  - `auto_mechanic_1`: 自動車整備士1級
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

- **回次**: `1`（第1回/春期）または `2`（第2回/秋期）
  - `1`: 第1回（春期）
  - `2`: 第2回（秋期）

### 例

- `questions_auto_mechanic_1_r6_2.ts`: 自動車整備士1級 令和6年度第2回（2024年秋期）
- `questions_auto_mechanic_1_r6_1.ts`: 自動車整備士1級 令和6年度第1回（2024年春期）
- `questions_auto_mechanic_1_r7_1.ts`: 自動車整備士1級 令和7年度第1回（2025年春期）
- `questions_care_worker_r6_1.ts`: 介護福祉士 令和6年度第1回
- `questions_uscpa_r6_2.ts`: USCPA 令和6年度第2回

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
 * - r6-1: 令和6年度第1回（2024年春期）
 * - r6-2: 令和6年度第2回（2024年秋期）
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
// 2024年秋期（令和6年度第2回）一級整備士の問題をインポート
import { questions2024Autumn } from "./questions_auto_mechanic_1_r6_2";

export function getAllQuestions(): Question[] {
  return [
    // ...
    ...questions2024Autumn,
    // ...
  ];
}
```

