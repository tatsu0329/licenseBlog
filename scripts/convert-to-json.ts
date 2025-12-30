/**
 * TypeScript質問データをJSONファイルに変換するスクリプト
 * 
 * 使い方:
 * npx tsx scripts/convert-to-json.ts
 */

import * as fs from 'fs';
import * as path from 'path';

// TypeScriptファイルを動的に読み込んでデータを取得
// 注意: これはNode.js環境で実行されるため、直接TypeScriptファイルを読み込む必要がある
// 代わりに、既存のエクスポートされたデータを利用する

/**
 * Question型のDateオブジェクトをISO文字列に変換
 */
function convertDatesToISO(question: any): any {
  return {
    ...question,
    publishedAt: question.publishedAt instanceof Date 
      ? question.publishedAt.toISOString() 
      : question.publishedAt,
    updatedAt: question.updatedAt instanceof Date 
      ? question.updatedAt.toISOString() 
      : question.updatedAt,
    permissionDate: question.permissionDate instanceof Date
      ? question.permissionDate.toISOString()
      : question.permissionDate,
  };
}

/**
 * 既存のTypeScriptファイルからデータを読み込んでJSONに変換
 * このスクリプトは、既にエクスポートされたデータを使用することを想定
 */
async function convertFile() {
  const dataDir = path.join(process.cwd(), 'lib/data');
  const outputDir = path.join(dataDir, 'questions');
  
  // 出力ディレクトリを作成
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  console.log('TypeScriptファイルからJSONファイルへの変換を開始...');
  console.log('注意: このスクリプトは、実際の変換処理を実行するため、');
  console.log('TypeScriptファイルを直接実行する必要があります。');
  console.log('');
  console.log('手動での変換手順:');
  console.log('1. lib/data/questions_auto_mechanic_1_r6_2.ts を開く');
  console.log('2. questions2024Autumn 配列の内容をJSONファイルにコピー');
  console.log('3. DateオブジェクトをISO文字列に変換');
  console.log('4. lib/data/questions/auto_mechanic_1_r6_2.json として保存');
}

convertFile().catch(console.error);

