# アプリのアイコンとスクリーンショットの使用ガイド

## 使用可能な画像

アプリのデベロッパー自身であれば、以下の画像を使用できます：

1. **アプリアイコン** - あなたが作成したアプリのアイコン
2. **スクリーンショット** - アプリの実際の画面を撮影したスクリーンショット

## 推奨される方法

### 1. 元の画像ファイルを使用（推奨）

アプリ開発時に使用した元の画像ファイルを使用することを推奨します：

- **アプリアイコン**: App Store Connect にアップロードした元の画像ファイル（通常は 1024×1024px 以上）
- **スクリーンショット**: デバイスから直接取得した高解像度のスクリーンショット

**メリット:**

- 高解像度の画像を使用できる
- 画像の品質が良い
- 著作権の問題がない（自分が作成したコンテンツ）

### 2. App Store から取得する方法

App Store のスクリーンショットを直接使用することも技術的には可能ですが、以下の点に注意が必要です：

- **品質**: App Store で表示されている画像は圧縮されている可能性がある
- **解像度**: 表示用に最適化されているため、元の解像度より低い可能性がある
- **形式**: Web 表示用に最適化されている

## 画像の配置方法

### 1. 画像ファイルを配置

`public/images/apps/` ディレクトリに画像ファイルを配置します：

```bash
# ディレクトリが存在しない場合は作成
mkdir -p public/images/apps

# アイコンを配置（例: 1024×1024px）
# アプリアイコンのファイルをコピー
cp path/to/app-icon.png public/images/apps/auto-mechanic-1-icon.png

# スクリーンショットを配置（例: iPhone 14 Proのサイズ）
# スクリーンショットのファイルをコピー
cp path/to/screenshot1.png public/images/apps/auto-mechanic-1-screenshot1.png
cp path/to/screenshot2.png public/images/apps/auto-mechanic-1-screenshot2.png
cp path/to/screenshot3.png public/images/apps/auto-mechanic-1-screenshot3.png
```

### 2. データファイルでパスを指定

`lib/data/apps.ts` で画像パスを指定します（既に設定済み）：

```typescript
export const appAutoMechanic1: App = {
  // ...
  iconUrl: "/images/apps/auto-mechanic-1-icon.png",
  screenshots: [
    "/images/apps/auto-mechanic-1-screenshot1.png",
    "/images/apps/auto-mechanic-1-screenshot2.png",
    "/images/apps/auto-mechanic-1-screenshot3.png",
  ],
  // ...
};
```

## 画像の推奨サイズ

### アプリアイコン

- **推奨サイズ**: 1024×1024px（正方形）
- **形式**: PNG（透明背景）または JPEG
- **用途**: App Store にアップロードする際のサイズ

### スクリーンショット

- **iPhone**:
  - 6.7 インチ（iPhone 14 Pro Max）: 1290×2796px
  - 6.5 インチ（iPhone 11 Pro Max）: 1242×2688px
- **iPad**:
  - 12.9 インチ: 2048×2732px
  - 11 インチ: 1668×2388px

**注意**: スクリーンショットは複数のサイズを用意すると、さまざまなデバイスに対応できます。

## App Store Connect から取得する方法

もし元の画像ファイルがない場合、App Store Connect から取得する方法：

1. **App Store Connect にログイン**
2. **該当アプリを選択**
3. **「App Store」タブ → 「スクリーンショット」セクション**
4. アップロード済みの画像をダウンロード

**注意**: App Store Connect からダウンロードできる画像は、アップロードした元の画像ファイルです。

## 実際のファイルの確認

現在のコードでは、以下のパスが指定されています：

- アイコン: `/images/apps/auto-mechanic-1-icon.png`
- スクリーンショット 1: `/images/apps/auto-mechanic-1-screenshot1.png`
- スクリーンショット 2: `/images/apps/auto-mechanic-1-screenshot2.png`
- スクリーンショット 3: `/images/apps/auto-mechanic-1-screenshot3.png`

これらのファイルが `public/images/apps/` ディレクトリに存在するか確認してください。

## 画像が見つからない場合の対処

画像ファイルが存在しない場合、以下のいずれかの方法で対応できます：

1. **画像ファイルを追加**: アプリアイコンやスクリーンショットのファイルを `public/images/apps/` に配置
2. **プレースホルダーを使用**: 一時的にプレースホルダー画像を使用
3. **App Store Connect から取得**: App Store Connect からアップロード済みの画像をダウンロード

## 著作権について

- **あなた自身のアプリ**: 問題なく使用できます
- **他のアプリの画像**: 使用できません（著作権の問題）

## まとめ

✅ **推奨**: アプリ開発時に使用した元の画像ファイルを使用  
✅ **可能**: App Store Connect からアップロード済みの画像をダウンロードして使用  
⚠️ **注意**: App Store の Web ページから直接画像を取得するのは推奨しません（品質の問題）
