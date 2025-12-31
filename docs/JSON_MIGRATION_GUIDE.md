# JSONファイル方式への移行ガイド

## 移行状況

### ✅ 完了
- [x] JSONファイルの読み込み機能の実装
- [x] Date型の変換処理の追加
- [x] `auto_mechanic_1_r6_2.json` のサンプル作成（1問）

### 🔄 進行中
- [ ] `auto_mechanic_1_r6_2.json` への残り12問の追加
- [ ] 他のTypeScriptファイルのJSONへの変換

### ⏳ 未着手
- [ ] 既存TypeScriptファイルの削除

## 移行手順

### 1. TypeScriptファイルからJSONファイルへの変換

各問題を以下の形式でJSONファイルに追加します：

```json
{
  "id": "auto-mechanic-1-2024-2-001",
  "certId": "auto-mechanic-1",
  "year": 2024,
  "season": 2,
  "categoryId": "electrical-1",
  "questionNumber": "001",
  "questionText": "問題文...",
  "questionTheme": "問題のテーマ",
  "choices": [
    {
      "number": 1,
      "text": "選択肢1"
    }
  ],
  "correctAnswer": 2,
  "explanation": "解説",
  "explanationDetail": "詳細解説（Markdown形式）",
  "difficulty": 5,
  "tags": ["タグ1", "タグ2"],
  "relatedQuestionIds": [],
  "source": "出典",
  "sourceUrl": "https://example.com",
  "officialPastQuestionUrl": "https://example.com",
  "permissionStatus": "pending",
  "publishedAt": "2024-10-01T00:00:00.000Z",
  "updatedAt": "2024-10-01T00:00:00.000Z",
  "explanationImages": []
}
```

### 2. Date型の変換

- TypeScriptの `new Date("2024-10-01")` は、JSONでは `"2024-10-01T00:00:00.000Z"` 形式のISO文字列に変換
- 読み込み時に `parseQuestionDates` 関数で自動的にDateオブジェクトに変換される

### 3. 読み込み関数の更新

`lib/data/questions.ts` でJSONファイルを読み込みます：

```typescript
import questionsR6_2Json from "./questions/auto_mechanic_1_r6_2.json";

// Date型を変換
const questionsR6_2: Question[] = (questionsR6_2Json as any[]).map(parseQuestionDates);

// getAllQuestions関数で使用
export function getAllQuestions(): Question[] {
  return [
    ...questionsR6_2,
    // 他のデータ...
  ];
}
```

## ファイル構造

```
lib/data/
├── questions.ts                    # 読み込み関数（JSON + TypeScript両対応）
├── questions_auto_mechanic_1_r6_2.ts  # 旧ファイル（段階的に削除）
└── questions/
    ├── auto_mechanic_1_r6_2.json      # 新JSONファイル
    └── ...
```

## メリット

1. **編集のしやすさ**: JSONファイルを直接編集可能
2. **コンテンツとロジックの分離**: データとコードの分離
3. **SEO対策**: SSGで静的生成されるため、SEO対策上問題なし
4. **将来的な拡張**: Headless CMSへの移行が容易

## 注意事項

- JSONファイルの形式が正しいことを確認
- Date型はISO文字列形式で保存
- 読み込み時にDateオブジェクトに変換される
- ビルド時に静的生成されるため、SEO対策上問題なし



