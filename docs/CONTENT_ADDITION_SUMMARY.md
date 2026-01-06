# コンテンツ追加のまとめ

このドキュメントは、記事や問題集を追加する際の要点をまとめたものです。

## 📝 記事の追加

### ファイルの場所
- **テンプレート**: `lib/data/articles/_template.json`
- **保存先**: `lib/data/articles/` ディレクトリ

### 手順
1. テンプレートをコピーして新しいJSONファイルを作成
2. 記事データを記述（ID、スラッグ、タイトル、本文など）
3. `lib/data/articles.ts` にインポートと追加を行う

### 必須フィールド
- `id`: 一意なID
- `slug`: URLスラッグ
- `title`: 記事タイトル
- `content`: 記事本文（Markdown形式）
- `publishedAt`: 公開日時

---

## 📚 問題集の追加

### ファイルの場所
- **テンプレート**: 
  - 1級: `lib/data/questions/_template_level1.json`
  - 2級: `lib/data/questions/_template_level2.json`
  - 3級: `lib/data/questions/_template_level3.json`
- **保存先**: `lib/data/questions/` ディレクトリ

### 手順
1. テンプレートをコピーして新しいJSONファイルを作成
2. 問題データを記述（カテゴリ、問題文、選択肢、正解など）
3. 画像がある場合は `public/image/` に配置
4. `lib/data/questions.ts` にインポートと追加を行う

### 必須フィールド
- `category.level`: 資格レベル
- `category.fuelType`: 燃料タイプ
- `category.year`: 年度と回次
- `questions`: 問題の配列
  - `id`: 問題番号
  - `question`: 問題文
  - `choices`: 選択肢（4つ）
  - `answerIndex`: 正解（1-4）

---

## 🖼️ 画像の追加

### 画像の配置場所
- **問題画像**: `public/image/{年度}{回次}{燃料タイプコード}/`
- **例**: `public/image/24031c/24031c-1.png`

### 命名規則
- `{年度}{回次}{燃料タイプコード}-{問題番号}.png`
- 例: `24031c-1.png`（2024年度第1回小型 問題1）

### 燃料タイプコード
- 1級小型: `C`
- 2級ガソリン: `G`
- 2級ジーゼル: `D`
- 2級2輪: `M`
- 2級シャシ: `C`
- 3級ガソリン: `G`
- 3級ジーゼル: `D`

---

## 📖 詳細ガイド

- **クイックスタート**: [QUICK_START.md](./QUICK_START.md) - 5分で始められる簡単ガイド
- **詳細ガイド**: [ADD_CONTENT_GUIDE.md](./ADD_CONTENT_GUIDE.md) - 完全な手順とトラブルシューティング
- **データ構造**: [../lib/data/DATA_STRUCTURE.md](../lib/data/DATA_STRUCTURE.md) - データ構造の詳細
- **命名規則**: [../lib/data/FILE_NAMING_CONVENTION.md](../lib/data/FILE_NAMING_CONVENTION.md) - ファイル命名規則

---

## ⚠️ 注意事項

1. **IDの一意性**: 記事IDや問題IDは必ず一意にしてください
2. **スラッグの重複**: 同じスラッグの記事は作成しないでください
3. **JSONの構文**: JSONファイルは必ず有効な形式にしてください
4. **画像パス**: 画像のパスは `/image/` から始まる絶対パスを使用してください
5. **公開日時**: `publishedAt` が未来の場合は予約投稿として扱われます

---

## 🔍 トラブルシューティング

### 記事が表示されない
- `publishedAt` が現在時刻以前か確認
- `lib/data/articles.ts` に正しく追加されているか確認

### 問題が表示されない
- `lib/data/questions.ts` に正しく追加されているか確認
- JSONファイルの形式が正しいか確認

### 画像が表示されない
- 画像のパスが正しいか確認
- 画像ファイルが `public/image/` に存在するか確認

---

## 💡 ヒント

- テンプレートファイルをコピーして使用すると、ミスが減ります
- JSONファイルはオンラインJSONバリデーターで検証できます
- 開発サーバーを再起動すると、変更が反映されます


