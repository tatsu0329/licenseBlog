# JSONファイル検証チェックリスト

## 検証項目

### 1. JSON構文の検証
- [x] JSON構文が正しいか（括弧の対応、カンマなど）
- [x] JSONファイルが正しく読み込めるか

### 2. メタデータの検証
- [x] `metadata.certId` が存在するか
- [x] `metadata.year` が正しい範囲か
- [x] `metadata.season` が 1 または 2 か
- [x] `metadata.source` が記載されているか
- [x] `metadata.publishedAt` と `metadata.updatedAt` がISO形式か

### 3. 各問題の検証

#### 必須フィールド
- [x] `questionNumber` が存在するか
- [x] `categoryId` が存在し、`categories.ts` で定義されているか
- [x] `questionSummary` または `questionText` が存在するか
- [x] `choices` が存在し、配列か
- [x] `correctAnswer` が存在し、1-4の範囲内か
- [x] `explanation` が存在するか
- [x] `tags` が存在し、配列か

#### データの整合性
- [x] `choices` の数が4つか
- [x] `choices` の `number` が 1, 2, 3, 4 の順か
- [x] `correctAnswer` が `choices` の `number` に対応しているか
- [x] `difficulty` が 1-5 の範囲内か（オプション）

#### カテゴリIDの検証
- [ ] `categoryId` が `categories.ts` に定義されているか
  - `electrical-1`: ✅ 存在
  - `diesel-commonrail-1`: ⚠️ 要確認（新規追加が必要な場合あり）

### 4. 論理的な整合性
- [x] 問題番号が連番か（001, 002, ...）
- [x] 解説が正解番号と一致しているか
- [x] 解説内容が選択肢と整合しているか

## 検証コマンド

```bash
# JSON構文の検証
node -e "const data = require('./lib/data/questions/auto_mechanic_1_r6_2.json'); console.log('Valid JSON'); console.log('Questions:', data.questions.length);"

# ビルドテスト
npm run build
```

## 修正が必要な項目

### 問題002
- **カテゴリID**: `diesel-commonrail-1` を `categories.ts` に追加する必要があります

## 推奨事項

1. **カテゴリIDの事前定義**: 新しいカテゴリを使用する場合は、事前に `categories.ts` に追加
2. **バリデーションスクリプト**: JSONファイルの検証を自動化するスクリプトを作成
3. **型安全性**: TypeScriptの型定義と一致しているか確認



