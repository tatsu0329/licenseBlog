import { Question } from "../types";

// 過去問集の読み込み（問題文・選択肢・正解のみ）
import questions2021_2Json from "./questions/level-1-C-2021-2.json";
import questions2022_2Json from "./questions/level-1-C-2022-2.json";
import questions2023_2Json from "./questions/level-1-C-2023-2.json";
import questions2024_2Json from "./questions/level-1-C-2024-2.json";

// 2級整備士の問題（ジーゼル）
import questionsLevel2D2022_1Json from "./questions/level-2-D-2022-1.json";
import questionsLevel2D2022_2Json from "./questions/level-2-D-2022-2.json";
import questionsLevel2D2023_1Json from "./questions/level-2-D-2023-1.json";
import questionsLevel2D2023_2Json from "./questions/level-2-D-2023-2.json";
import questionsLevel2D2024_1Json from "./questions/level-2-D-2024-1.json";
import questionsLevel2D2024_2Json from "./questions/level-2-D-2024-2.json";
import questionsLevel2D2025_1Json from "./questions/level-2-D-2025-1.json";

// 2級整備士の問題（ガソリン）
import questionsLevel2G2022_1Json from "./questions/level-2-G-2022-1.json";
import questionsLevel2G2022_2Json from "./questions/level-2-G-2022-2.json";
import questionsLevel2G2023_1Json from "./questions/level-2-G-2023-1.json";
import questionsLevel2G2023_2Json from "./questions/level-2-G-2023-2.json";
import questionsLevel2G2024_1Json from "./questions/level-2-G-2024-1.json";
import questionsLevel2G2024_2Json from "./questions/level-2-G-2024-2.json";
import questionsLevel2G2025_1Json from "./questions/level-2-G-2025-1.json";

// 3級整備士の問題（ガソリン）
import questionsLevel3G2022_1Json from "./questions/level-3-G-2022-1.json";
import questionsLevel3G2022_2Json from "./questions/level-3-G-2022-2.json";
import questionsLevel3G2023_1Json from "./questions/level-3-G-2023-1.json";
import questionsLevel3G2023_2Json from "./questions/level-3-G-2023-2.json";
import questionsLevel3G2024_1Json from "./questions/level-3-G-2024-1.json";
import questionsLevel3G2024_2Json from "./questions/level-3-G-2024-2.json";
import questionsLevel3G2025_1Json from "./questions/level-3-G-2025-1.json";

// 3級整備士の問題（ジーゼル）
import questionsLevel3D2022_1Json from "./questions/level-3-D-2022-1.json";
import questionsLevel3D2022_2Json from "./questions/level-3-D-2022-2.json";
import questionsLevel3D2023_1Json from "./questions/level-3-D-2023-1.json";
import questionsLevel3D2023_2Json from "./questions/level-3-D-2023-2.json";
import questionsLevel3D2024_1Json from "./questions/level-3-D-2024-1.json";
import questionsLevel3D2024_2Json from "./questions/level-3-D-2024-2.json";
import questionsLevel3D2025_1Json from "./questions/level-3-D-2025-1.json";

// 解説集の読み込み（解説のみ）
// 注意: 解説集は別途実装が必要。現在は過去問集のみを使用
// import explanationsR6_2Json from "./explanations/auto_mechanic_1_r6_2.json";

// Date型を変換するヘルパー関数
function parseQuestionDates(question: any): Question {
  return {
    ...question,
    publishedAt: new Date(question.publishedAt),
    updatedAt: new Date(question.updatedAt),
    permissionDate: question.permissionDate
      ? new Date(question.permissionDate)
      : undefined,
  } as Question;
}

// JSONファイルの構造定義（メタデータ + 質問配列）
interface QuestionJsonFile {
  metadata: {
    certId: string;
    year: number;
    season: 1 | 2;
    source: string;
    sourceUrl?: string;
    officialPastQuestionUrl?: string;
    permissionStatus?: "pending" | "granted" | "not_required" | "unknown";
    publishedAt: string;
    updatedAt: string;
  };
  questions: Array<{
    questionNumber: string;
    categoryId: string;
    questionText?: string; // 非推奨、questionSummaryを優先
    questionSummary?: string; // 新形式
    questionTheme?: string;
    choices: Array<{ number: 1 | 2 | 3 | 4; text: string }>;
    correctAnswer: 1 | 2 | 3 | 4;
    explanation: string;
    explanationDetail?: string;
    difficulty?: 1 | 2 | 3 | 4 | 5;
    tags: string[];
    relatedQuestionIds?: string[];
    explanationImages?: string[];
  }>;
}

// JSONファイルからメタデータと質問を読み込んで、完全なQuestion型に変換
function loadQuestionsFromJson(jsonData: QuestionJsonFile): Question[] {
  const { metadata, questions } = jsonData;

  return questions.map((q) => {
    // IDを生成: certId-year-season-questionNumber
    const id = `${metadata.certId}-${metadata.year}-${metadata.season}-${q.questionNumber}`;

    return parseQuestionDates({
      id,
      certId: metadata.certId,
      year: metadata.year,
      season: metadata.season,
      categoryId: q.categoryId,
      questionNumber: q.questionNumber,
      questionText: q.questionText || q.questionSummary, // questionSummaryを優先、なければquestionText
      questionSummary: q.questionSummary,
      questionTheme: q.questionTheme,
      choices: q.choices,
      correctAnswer: q.correctAnswer,
      explanation: q.explanation,
      explanationDetail: q.explanationDetail,
      explanationImages: q.explanationImages || [],
      difficulty: q.difficulty,
      tags: q.tags,
      relatedQuestionIds: q.relatedQuestionIds || [],
      // 共通メタデータを適用
      source: metadata.source,
      sourceUrl: metadata.sourceUrl,
      officialPastQuestionUrl: metadata.officialPastQuestionUrl,
      permissionStatus: metadata.permissionStatus,
      publishedAt: metadata.publishedAt,
      updatedAt: metadata.updatedAt,
    });
  });
}

// 過去問集の型定義（問題文・選択肢・正解のみ、解説なし）
interface QuestionSetJsonFile {
  category: {
    level: string;
    fuelType: string;
    year: string; // "2021-2" 形式
  };
  questions: Array<{
    id: string; // "No.1", "No.2" など
    question: string;
    choices: string[]; // ["(1).選択肢1", "(2).選択肢2", ...]
    answerIndex: number; // 0-based (0-3)
    images?: string[]; // 問題文の画像
  }>;
}

// 解説集の型定義（解説のみ）
interface ExplanationSetJsonFile {
  metadata: {
    certId: string;
    year: number;
    season: 1 | 2;
    publishedAt: string;
    updatedAt: string;
  };
  explanations: Array<{
    questionId: string;
    questionNumber: string;
    explanation: string;
    explanationDetail?: string;
    explanationImages?: string[]; // 解説の画像
    difficulty?: 1 | 2 | 3 | 4 | 5;
    tags?: string[];
    relatedQuestionIds?: string[];
  }>;
}

// 問題文から分野（categoryId）を判定する関数
function detectCategoryFromQuestion(
  questionText: string,
  choices: string[]
): string {
  const combinedText = (questionText + " " + choices.join(" ")).toLowerCase();

  // ⑧ 関係法令・安全・品質管理
  if (
    combinedText.includes("道路運送車両法") ||
    combinedText.includes("保安基準") ||
    combinedText.includes("点検義務") ||
    combinedText.includes("整備義務") ||
    combinedText.includes("定期点検") ||
    combinedText.includes("品質管理") ||
    combinedText.includes("作業安全") ||
    combinedText.includes("法的義務")
  ) {
    return "regulations-1";
  }

  // ⑦ 図面・配線図・資料の読解
  if (
    combinedText.includes("配線図") ||
    combinedText.includes("回路図") ||
    (combinedText.includes("図に示す") &&
      (combinedText.includes("読み") || combinedText.includes("点検"))) ||
    (combinedText.includes("図1") && combinedText.includes("図2"))
  ) {
    return "diagrams-1";
  }

  // ⑥ 工具・計測機器・診断機
  if (
    combinedText.includes("テスタ") ||
    combinedText.includes("オシロスコープ") ||
    combinedText.includes("診断器") ||
    combinedText.includes("診断機") ||
    combinedText.includes("測定器") ||
    combinedText.includes("スキャンツール") ||
    combinedText.includes("計測") ||
    combinedText.includes("測定方法") ||
    combinedText.includes("抵抗計")
  ) {
    return "tools-1";
  }

  // ⑤ 材料・油脂・燃料・環境対策
  if (
    combinedText.includes("材料") ||
    combinedText.includes("油脂") ||
    combinedText.includes("潤滑油") ||
    combinedText.includes("作動油") ||
    combinedText.includes("冷却液") ||
    combinedText.includes("燃料の性質") ||
    combinedText.includes("排出ガス") ||
    combinedText.includes("環境規制") ||
    combinedText.includes("金属材料") ||
    combinedText.includes("樹脂材料") ||
    combinedText.includes("cng")
  ) {
    return "materials-1";
  }

  // ④ 点検・整備・調整作業
  if (
    combinedText.includes("点検項目") ||
    combinedText.includes("分解") ||
    combinedText.includes("組付け") ||
    combinedText.includes("調整値") ||
    combinedText.includes("整備作業") ||
    combinedText.includes("作業順") ||
    combinedText.includes("作業手順") ||
    combinedText.includes("取り付け")
  ) {
    return "maintenance-1";
  }

  // ③ 故障診断・トラブルシューティング
  if (
    combinedText.includes("故障診断") ||
    combinedText.includes("不具合") ||
    combinedText.includes("故障") ||
    combinedText.includes("異常") ||
    combinedText.includes("原因") ||
    combinedText.includes("症状") ||
    combinedText.includes("切り分け") ||
    combinedText.includes("診断コード") ||
    combinedText.includes("obd") ||
    combinedText.includes("ダイアグノーシス") ||
    combinedText.includes("異常検知")
  ) {
    return "diagnosis-1";
  }

  // ② 電気・電子装置／電子制御（ECU系）
  if (
    combinedText.includes("ecu") ||
    combinedText.includes("電子制御") ||
    combinedText.includes("センサ") ||
    combinedText.includes("アクチュエータ") ||
    combinedText.includes("can通信") ||
    combinedText.includes("制御ロジック") ||
    combinedText.includes("制御信号") ||
    combinedText.includes("abs") ||
    combinedText.includes("esc") ||
    combinedText.includes("eps") ||
    combinedText.includes("電子式") ||
    combinedText.includes("制御回路") ||
    combinedText.includes("パルス") ||
    combinedText.includes("pwm")
  ) {
    return "electronics-1";
  }

  // ① 自動車構造・機能（基礎〜応用）（デフォルト）
  // エンジン、動力伝達装置、走行装置、制動装置、車体構造など
  return "structure-1";
}

// 2級整備士の問題文から分野を判定する関数
// 2級整備士の問題番号に基づいて分野を判定
function detectCategoryFromQuestionLevel2(questionNumber: string): string {
  // 問題番号を数値に変換（"001" → 1）
  const num = parseInt(questionNumber, 10);

  if (num >= 1 && num <= 15) {
    return "engine-2"; // エンジン（問題1～15）
  } else if (num >= 16 && num <= 30) {
    return "chassis-2"; // シャシ（問題16～30）
  } else if (num >= 31 && num <= 35) {
    return "tools-equipment-2"; // 整備機器等（問題31～35）
  } else if (num >= 36 && num <= 40) {
    return "regulations-2"; // 法規（問題36～40）
  }

  // デフォルト（範囲外の場合はエンジン）
  return "engine-2";
}

// 3級整備士の問題番号から分野を判定する関数
// 3級整備士は30問形式で、問題1～20がエンジン、問題21～27が整備機器等、問題28～30が法規
function detectCategoryFromQuestionLevel3(questionNumber: string): string {
  // 問題番号を数値に変換（"001" → 1）
  const num = parseInt(questionNumber, 10);

  if (num >= 1 && num <= 20) {
    return "engine-3"; // エンジン（問題1～20）
  } else if (num >= 21 && num <= 27) {
    return "tools-equipment-3"; // 整備機器等（問題21～27）
  } else if (num >= 28 && num <= 30) {
    return "regulations-3"; // 法規（問題28～30）
  }

  // デフォルト（範囲外の場合はエンジン）
  return "engine-3";
}

// 3級整備士用の過去問集からQuestion型に変換（解説なし）
function loadQuestionSetFromJsonLevel3(
  jsonData: QuestionSetJsonFile
): Question[] {
  const { category, questions } = jsonData;

  // "2022-1" 形式から年度と回次を抽出
  const [yearStr, seasonStr] = category.year.split("-");
  const year = parseInt(yearStr);
  const season = parseInt(seasonStr) as 1 | 2;

  // certIdを設定（3級整備士）
  const certId = "auto-mechanic-3";

  // 燃料タイプから識別子を取得（G=ガソリン, D=ジーゼル）
  const fuelTypeCode =
    category.fuelType === "ガソリン"
      ? "G"
      : category.fuelType === "ジーゼル"
      ? "D"
      : category.fuelType.substring(0, 1).toUpperCase();

  const now = new Date();

  return questions.map((q, index) => {
    // 問題番号を取得
    let questionNumber: string;
    if (q.id && q.id.trim() !== "") {
      // idが存在する場合: "No.1" → "001" に変換
      questionNumber = q.id.replace("No.", "").padStart(3, "0");
    } else if (q.question && q.question.match(/No\.\d+/)) {
      // idが空の場合、問題文から "No.1" などを抽出
      const match = q.question.match(/No\.(\d+)/);
      if (match) {
        questionNumber = parseInt(match[1]).toString().padStart(3, "0");
      } else {
        // 問題文からも抽出できない場合はインデックス+1を使用
        questionNumber = (index + 1).toString().padStart(3, "0");
      }
    } else {
      // どちらもない場合はインデックス+1を使用
      questionNumber = (index + 1).toString().padStart(3, "0");
    }

    // 問題IDを生成: certId-fuelTypeCode-year-season-questionNumber
    // 例: auto-mechanic-3-G-2025-1-001 (3級ガソリン 2025年度第1回 問題1)
    // 例: auto-mechanic-3-D-2025-1-001 (3級ジーゼル 2025年度第1回 問題1)
    const id = `${certId}-${fuelTypeCode}-${year}-${season}-${questionNumber}`;

    // choicesを {number, text} 形式に変換
    const choices = q.choices.map((choice, index) => {
      // "(1).選択肢1" 形式から "(1)." を削除してテキストのみ抽出
      const text = choice.replace(/^\(\d+\)\.\s*/, "").trim();
      return {
        number: (index + 1) as 1 | 2 | 3 | 4,
        text,
      };
    });

    // answerIndex (1-based) → correctAnswer (1-based)
    // JSONファイルでは answerIndex が既に1ベース（1-4）で記載されている
    const correctAnswer = q.answerIndex as 1 | 2 | 3 | 4;

    // 問題文から "Q01. " などのプレフィックスを削除（あれば）
    const questionText = q.question.replace(/^Q\d+\.\s*/, "").trim();

    // 問題番号に基づいて分野を判定（3級用）
    const categoryId = detectCategoryFromQuestionLevel3(questionNumber);

    // 燃料タイプから名称を取得
    const fuelTypeName =
      category.fuelType === "ガソリン"
        ? "ガソリン"
        : category.fuelType === "ジーゼル"
        ? "ジーゼル"
        : category.fuelType;

    return {
      id,
      certId,
      year,
      season,
      categoryId,
      questionNumber,
      questionText,
      questionSummary:
        questionText.length > 100
          ? questionText.substring(0, 100) + "..."
          : questionText,
      choices,
      correctAnswer,
      // 解説は解説集からマージされるまで空（過去問集では解説なし）
      explanation: "",
      explanationDetail: undefined,
      // 問題画像は暫定的に explanationImages に格納
      explanationImages: q.images || [],
      difficulty: undefined,
      tags: [],
      relatedQuestionIds: [],
      source: `3級自動車整備士 ${year}年度第${season}回学科試験 ${category.level} ${fuelTypeName}（国土交通省）`,
      sourceUrl: "https://www.mlit.go.jp/",
      officialPastQuestionUrl: "https://www.mlit.go.jp/jidosha/jidosha.html",
      permissionStatus: "pending" as const,
      publishedAt: now,
      updatedAt: now,
    };
  });
}

// 2級整備士用の過去問集からQuestion型に変換（解説なし）
function loadQuestionSetFromJsonLevel2(
  jsonData: QuestionSetJsonFile
): Question[] {
  const { category, questions } = jsonData;

  // "2022-1" 形式から年度と回次を抽出
  const [yearStr, seasonStr] = category.year.split("-");
  const year = parseInt(yearStr);
  const season = parseInt(seasonStr) as 1 | 2;

  // certIdを設定（2級整備士）
  const certId = "auto-mechanic-2";

  // 燃料タイプから識別子を取得（G=ガソリン, D=ジーゼル, M=2輪, C=シャシ）
  const fuelTypeCode =
    category.fuelType === "ガソリン"
      ? "G"
      : category.fuelType === "ジーゼル"
      ? "D"
      : category.fuelType === "2輪"
      ? "M"
      : category.fuelType === "シャシ"
      ? "C"
      : category.fuelType.substring(0, 1).toUpperCase();

  const now = new Date();

  return questions.map((q, index) => {
    // 問題番号を取得
    let questionNumber: string;
    if (q.id && q.id.trim() !== "") {
      // idが存在する場合: "No.1" → "001" に変換
      questionNumber = q.id.replace("No.", "").padStart(3, "0");
    } else if (q.question && q.question.match(/No\.\d+/)) {
      // idが空の場合、問題文から "No.1" などを抽出
      const match = q.question.match(/No\.(\d+)/);
      if (match) {
        questionNumber = parseInt(match[1]).toString().padStart(3, "0");
      } else {
        // 問題文からも抽出できない場合はインデックス+1を使用
        questionNumber = (index + 1).toString().padStart(3, "0");
      }
    } else {
      // どちらもない場合はインデックス+1を使用
      questionNumber = (index + 1).toString().padStart(3, "0");
    }

    // 問題IDを生成: certId-fuelTypeCode-year-season-questionNumber
    // 例: auto-mechanic-2-G-2025-1-001 (2級ガソリン 2025年度第1回 問題1)
    // 例: auto-mechanic-2-D-2025-1-001 (2級ジーゼル 2025年度第1回 問題1)
    const id = `${certId}-${fuelTypeCode}-${year}-${season}-${questionNumber}`;

    // choicesを {number, text} 形式に変換
    const choices = q.choices.map((choice, index) => {
      // "(1).選択肢1" 形式から "(1)." を削除してテキストのみ抽出
      const text = choice.replace(/^\(\d+\)\.\s*/, "").trim();
      return {
        number: (index + 1) as 1 | 2 | 3 | 4,
        text,
      };
    });

    // answerIndex (1-based) → correctAnswer (1-based)
    // JSONファイルでは answerIndex が既に1ベース（1-4）で記載されている
    const correctAnswer = q.answerIndex as 1 | 2 | 3 | 4;

    // 問題文から "Q01. " などのプレフィックスを削除（あれば）
    const questionText = q.question.replace(/^Q\d+\.\s*/, "").trim();

    // 問題番号に基づいて分野を判定（2級用）
    const categoryId = detectCategoryFromQuestionLevel2(questionNumber);

    // 燃料タイプから名称を取得
    const fuelTypeName =
      category.fuelType === "ガソリン"
        ? "ガソリン"
        : category.fuelType === "ジーゼル"
        ? "ジーゼル"
        : category.fuelType === "2輪"
        ? "2輪"
        : category.fuelType === "シャシ"
        ? "シャシ"
        : category.fuelType;

    return {
      id,
      certId,
      year,
      season,
      categoryId,
      questionNumber,
      questionText,
      questionSummary:
        questionText.length > 100
          ? questionText.substring(0, 100) + "..."
          : questionText,
      choices,
      correctAnswer,
      // 解説は解説集からマージされるまで空（過去問集では解説なし）
      explanation: "",
      explanationDetail: undefined,
      // 問題画像は暫定的に explanationImages に格納
      explanationImages: q.images || [],
      difficulty: undefined,
      tags: [],
      relatedQuestionIds: [],
      source: `2級自動車整備士 ${year}年度第${season}回学科試験 ${category.level} ${fuelTypeName}（国土交通省）`,
      sourceUrl: "https://www.mlit.go.jp/",
      officialPastQuestionUrl: "https://www.mlit.go.jp/jidosha/jidosha.html",
      permissionStatus: "pending" as const,
      publishedAt: now,
      updatedAt: now,
    };
  });
}

// 過去問集からQuestion型に変換（解説なし）
function loadQuestionSetFromJson(jsonData: QuestionSetJsonFile): Question[] {
  const { category, questions } = jsonData;

  // "2021-2" 形式から年度と回次を抽出
  const [yearStr, seasonStr] = category.year.split("-");
  const year = parseInt(yearStr);
  const season = parseInt(seasonStr) as 1 | 2;

  // certIdを設定（level-1-C は 1級自動車整備士小型）
  const certId = "auto-mechanic-1";

  const now = new Date();

  return questions.map((q) => {
    // "No.1" → "001" に変換
    const questionNumber = q.id.replace("No.", "").padStart(3, "0");

    // 問題IDを生成: certId-year-season-questionNumber
    const id = `${certId}-${year}-${season}-${questionNumber}`;

    // choicesを {number, text} 形式に変換
    const choices = q.choices.map((choice, index) => {
      // "(1).選択肢1" 形式から "(1)." を削除してテキストのみ抽出
      const text = choice.replace(/^\(\d+\)\.\s*/, "").trim();
      return {
        number: (index + 1) as 1 | 2 | 3 | 4,
        text,
      };
    });

    // answerIndex (1-based) → correctAnswer (1-based)
    // JSONファイルでは answerIndex が既に1ベース（1-4）で記載されている
    const correctAnswer = q.answerIndex as 1 | 2 | 3 | 4;

    // 問題文から "Q01. " などのプレフィックスを削除（あれば）
    const questionText = q.question.replace(/^Q\d+\.\s*/, "").trim();

    // 問題文と選択肢から分野を自動判定
    const categoryId = detectCategoryFromQuestion(questionText, q.choices);

    return {
      id,
      certId,
      year,
      season,
      categoryId,
      questionNumber,
      questionText,
      questionSummary:
        questionText.length > 100
          ? questionText.substring(0, 100) + "..."
          : questionText,
      choices,
      correctAnswer,
      // 解説は解説集からマージされるまで空（過去問集では解説なし）
      explanation: "",
      explanationDetail: undefined,
      // 問題画像は暫定的に explanationImages に格納
      // 注意: 過去問集では問題画像として表示、解説集とマージ後は解説画像と区別して扱う
      explanationImages: q.images || [],
      difficulty: undefined,
      tags: [],
      relatedQuestionIds: [],
      source: `1級自動車整備士 ${year}年度第${season}回学科試験 ${category.level} ${category.fuelType}（国土交通省）`,
      sourceUrl: "https://www.mlit.go.jp/",
      officialPastQuestionUrl: "https://www.mlit.go.jp/jidosha/jidosha.html",
      permissionStatus: "pending" as const,
      publishedAt: now,
      updatedAt: now,
    };
  });
}

// 過去問集と解説集をマージする関数
// 注意: 現在は未使用。解説集が正しい形式で提供された際に使用
function mergeQuestionsAndExplanations(
  questions: Question[],
  explanationSet: ExplanationSetJsonFile
): Question[] {
  // 安全に解説データを取得（存在チェック）
  if (!explanationSet || !explanationSet.explanations) {
    return questions;
  }

  const explanationMap = new Map(
    explanationSet.explanations.map((exp) => [exp.questionId, exp])
  );

  return questions.map((q) => {
    const explanation = explanationMap.get(q.id);

    return {
      ...q,
      // 解説をマージ
      explanation: explanation?.explanation || "",
      explanationDetail: explanation?.explanationDetail,
      // 問題画像と解説画像を統合（問題画像は既に explanationImages に入っている）
      explanationImages: [
        ...(q.explanationImages || []), // 問題画像
        ...(explanation?.explanationImages || []), // 解説画像
      ],
      difficulty: explanation?.difficulty,
      tags: explanation?.tags || [],
      relatedQuestionIds: explanation?.relatedQuestionIds || [],
    };
  });
}

// 過去問集を読み込み（問題文・選択肢・正解のみ、解説は含まない）
const questionSet2021_2 = loadQuestionSetFromJson(
  questions2021_2Json as QuestionSetJsonFile
);
const questionSet2022_2 = loadQuestionSetFromJson(
  questions2022_2Json as QuestionSetJsonFile
);
const questionSet2023_2 = loadQuestionSetFromJson(
  questions2023_2Json as QuestionSetJsonFile
);
const questionSet2024_2 = loadQuestionSetFromJson(
  questions2024_2Json as QuestionSetJsonFile
);

// 2級整備士の問題を読み込み（ジーゼル）
const questionSetLevel2D2022_1 = loadQuestionSetFromJsonLevel2(
  questionsLevel2D2022_1Json as QuestionSetJsonFile
);
const questionSetLevel2D2022_2 = loadQuestionSetFromJsonLevel2(
  questionsLevel2D2022_2Json as QuestionSetJsonFile
);
const questionSetLevel2D2023_1 = loadQuestionSetFromJsonLevel2(
  questionsLevel2D2023_1Json as QuestionSetJsonFile
);
const questionSetLevel2D2023_2 = loadQuestionSetFromJsonLevel2(
  questionsLevel2D2023_2Json as QuestionSetJsonFile
);
const questionSetLevel2D2024_1 = loadQuestionSetFromJsonLevel2(
  questionsLevel2D2024_1Json as QuestionSetJsonFile
);
const questionSetLevel2D2024_2 = loadQuestionSetFromJsonLevel2(
  questionsLevel2D2024_2Json as QuestionSetJsonFile
);
const questionSetLevel2D2025_1 = loadQuestionSetFromJsonLevel2(
  questionsLevel2D2025_1Json as QuestionSetJsonFile
);

// 2級整備士の問題を読み込み（ガソリン）
const questionSetLevel2G2022_1 = loadQuestionSetFromJsonLevel2(
  questionsLevel2G2022_1Json as QuestionSetJsonFile
);
const questionSetLevel2G2022_2 = loadQuestionSetFromJsonLevel2(
  questionsLevel2G2022_2Json as QuestionSetJsonFile
);
const questionSetLevel2G2023_1 = loadQuestionSetFromJsonLevel2(
  questionsLevel2G2023_1Json as QuestionSetJsonFile
);
const questionSetLevel2G2023_2 = loadQuestionSetFromJsonLevel2(
  questionsLevel2G2023_2Json as QuestionSetJsonFile
);
const questionSetLevel2G2024_1 = loadQuestionSetFromJsonLevel2(
  questionsLevel2G2024_1Json as QuestionSetJsonFile
);
const questionSetLevel2G2024_2 = loadQuestionSetFromJsonLevel2(
  questionsLevel2G2024_2Json as QuestionSetJsonFile
);
const questionSetLevel2G2025_1 = loadQuestionSetFromJsonLevel2(
  questionsLevel2G2025_1Json as QuestionSetJsonFile
);

// 過去問集のみを返す（解説は含まない）
// 解説は解説集ページで別途表示されるため、ここではマージしない
const questions2021_2: Question[] = questionSet2021_2;
const questions2022_2: Question[] = questionSet2022_2;
const questions2023_2: Question[] = questionSet2023_2;
const questions2024_2: Question[] = questionSet2024_2;

// 2級整備士の問題（ジーゼル）
const questionsLevel2D2022_1: Question[] = questionSetLevel2D2022_1;
const questionsLevel2D2022_2: Question[] = questionSetLevel2D2022_2;
const questionsLevel2D2023_1: Question[] = questionSetLevel2D2023_1;
const questionsLevel2D2023_2: Question[] = questionSetLevel2D2023_2;
const questionsLevel2D2024_1: Question[] = questionSetLevel2D2024_1;
const questionsLevel2D2024_2: Question[] = questionSetLevel2D2024_2;
const questionsLevel2D2025_1: Question[] = questionSetLevel2D2025_1;

// 2級整備士の問題（ガソリン）
const questionsLevel2G2022_1: Question[] = questionSetLevel2G2022_1;
const questionsLevel2G2022_2: Question[] = questionSetLevel2G2022_2;
const questionsLevel2G2023_1: Question[] = questionSetLevel2G2023_1;
const questionsLevel2G2023_2: Question[] = questionSetLevel2G2023_2;
const questionsLevel2G2024_1: Question[] = questionSetLevel2G2024_1;
const questionsLevel2G2024_2: Question[] = questionSetLevel2G2024_2;
const questionsLevel2G2025_1: Question[] = questionSetLevel2G2025_1;

// 3級整備士の問題を読み込み（ガソリン）
const questionSetLevel3G2022_1 = loadQuestionSetFromJsonLevel3(
  questionsLevel3G2022_1Json as QuestionSetJsonFile
);
const questionSetLevel3G2022_2 = loadQuestionSetFromJsonLevel3(
  questionsLevel3G2022_2Json as QuestionSetJsonFile
);
const questionSetLevel3G2023_1 = loadQuestionSetFromJsonLevel3(
  questionsLevel3G2023_1Json as QuestionSetJsonFile
);
const questionSetLevel3G2023_2 = loadQuestionSetFromJsonLevel3(
  questionsLevel3G2023_2Json as QuestionSetJsonFile
);
const questionSetLevel3G2024_1 = loadQuestionSetFromJsonLevel3(
  questionsLevel3G2024_1Json as QuestionSetJsonFile
);
const questionSetLevel3G2024_2 = loadQuestionSetFromJsonLevel3(
  questionsLevel3G2024_2Json as QuestionSetJsonFile
);
const questionSetLevel3G2025_1 = loadQuestionSetFromJsonLevel3(
  questionsLevel3G2025_1Json as QuestionSetJsonFile
);

// 3級整備士の問題を読み込み（ジーゼル）
const questionSetLevel3D2022_1 = loadQuestionSetFromJsonLevel3(
  questionsLevel3D2022_1Json as QuestionSetJsonFile
);
const questionSetLevel3D2022_2 = loadQuestionSetFromJsonLevel3(
  questionsLevel3D2022_2Json as QuestionSetJsonFile
);
const questionSetLevel3D2023_1 = loadQuestionSetFromJsonLevel3(
  questionsLevel3D2023_1Json as QuestionSetJsonFile
);
const questionSetLevel3D2023_2 = loadQuestionSetFromJsonLevel3(
  questionsLevel3D2023_2Json as QuestionSetJsonFile
);
const questionSetLevel3D2024_1 = loadQuestionSetFromJsonLevel3(
  questionsLevel3D2024_1Json as QuestionSetJsonFile
);
const questionSetLevel3D2024_2 = loadQuestionSetFromJsonLevel3(
  questionsLevel3D2024_2Json as QuestionSetJsonFile
);
const questionSetLevel3D2025_1 = loadQuestionSetFromJsonLevel3(
  questionsLevel3D2025_1Json as QuestionSetJsonFile
);

// 3級整備士の問題（ガソリン）
const questionsLevel3G2022_1: Question[] = questionSetLevel3G2022_1;
const questionsLevel3G2022_2: Question[] = questionSetLevel3G2022_2;
const questionsLevel3G2023_1: Question[] = questionSetLevel3G2023_1;
const questionsLevel3G2023_2: Question[] = questionSetLevel3G2023_2;
const questionsLevel3G2024_1: Question[] = questionSetLevel3G2024_1;
const questionsLevel3G2024_2: Question[] = questionSetLevel3G2024_2;
const questionsLevel3G2025_1: Question[] = questionSetLevel3G2025_1;

// 3級整備士の問題（ジーゼル）
const questionsLevel3D2022_1: Question[] = questionSetLevel3D2022_1;
const questionsLevel3D2022_2: Question[] = questionSetLevel3D2022_2;
const questionsLevel3D2023_1: Question[] = questionSetLevel3D2023_1;
const questionsLevel3D2023_2: Question[] = questionSetLevel3D2023_2;
const questionsLevel3D2024_1: Question[] = questionSetLevel3D2024_1;
const questionsLevel3D2024_2: Question[] = questionSetLevel3D2024_2;
const questionsLevel3D2025_1: Question[] = questionSetLevel3D2025_1;

// 1級自動車整備士 - エンジン分野
const questionAutoMechanic1Engine1: Question = {
  id: "auto-mechanic-1-2024-1-001",
  certId: "auto-mechanic-1",
  year: 2024,
  season: 1,
  categoryId: "engine-1",
  questionNumber: "001",
  questionText:
    "直噴ガソリンエンジンの燃料噴射システムについて、噴射圧力とエミッション性能の関係に関する問題です。",
  questionTheme: "直噴ガソリンエンジンの燃料噴射システム",
  choices: [
    {
      number: 1,
      text: "噴射圧力を低くすると、微粒子状物質（PM）の排出量が減少する",
    },
    {
      number: 2,
      text: "高圧噴射により、燃料の微粒化が促進され、燃焼効率が向上する",
    },
    {
      number: 3,
      text: "噴射圧力は、排気ガス中のNOx（窒素酸化物）濃度に影響しない",
    },
    {
      number: 4,
      text: "噴射タイミングは、PMとNOxの排出量に同時に影響を与えることはない",
    },
  ],
  correctAnswer: 2,
  explanation:
    "正解は2です。直噴ガソリンエンジンでは、高圧噴射により燃料がより細かく微粒化され、燃焼室内での混合が均一になります。これにより、燃焼効率が向上し、エミッション性能も改善します。逆に、噴射圧力が低いと、燃料の微粒化が不十分となり、PMの排出量が増加します。",
  explanationDetail: `
## 詳細解説

### 直噴ガソリンエンジンの特徴

直噴ガソリンエンジン（GDI: Gasoline Direct Injection）は、燃料を直接シリンダー内に噴射するエンジンです。

### 噴射圧力とエミッション性能の関係

1. **高圧噴射のメリット**
   - 燃料の微粒化が促進される
   - 燃焼室内での混合が均一になる
   - 燃焼効率が向上する
   - PM（微粒子状物質）の排出量が減少する

2. **噴射タイミングの重要性**
   - 噴射タイミングは、PMとNOxの排出量に同時に影響を与える
   - 適切な噴射タイミングにより、両者のバランスを取ることが重要

3. **一般的な噴射圧力**
   - 従来型：約5～10MPa
   - 高圧直噴型：約15～20MPa（近年ではさらに高圧化が進んでいる）

### 関連知識

- 排気ガス規制（ポスト新長期規制）への対応
- NOxとPMのトレードオフ関係
- 三元触媒との組み合わせ
  `,
  difficulty: 4,
  tags: ["エンジン", "直噴", "燃料噴射", "エミッション", "1級"],
  relatedQuestionIds: [],
  source: "1級自動車整備士 2024年6月試験 学科 エンジン（国土交通省）",
  sourceUrl: "https://www.mlit.go.jp/",
  officialPastQuestionUrl: "https://www.mlit.go.jp/jidosha/jidosha.html",
  permissionStatus: "pending",
  publishedAt: new Date("2024-01-01"),
  updatedAt: new Date("2024-01-01"),
};

// 1級自動車整備士 - シャシ分野
const questionAutoMechanic1Chassis1: Question = {
  id: "auto-mechanic-1-2024-1-002",
  certId: "auto-mechanic-1",
  year: 2024,
  season: 1,
  categoryId: "chassis-1",
  questionNumber: "002",
  questionText:
    "ABS（アンチロック・ブレーキ・システム）の動作原理と制御方式に関する問題です。",
  questionTheme: "ABSの動作原理と制御方式",
  choices: [
    {
      number: 1,
      text: "ABSは、車輪のロックを防止するため、常にブレーキ圧を一定に保つ",
    },
    {
      number: 2,
      text: "ABSは、各車輪の滑り率を検出し、最適な滑り率を維持するようにブレーキ圧を増減制御する",
    },
    {
      number: 3,
      text: "ABSは、ブレーキペダルを踏む力を検出して動作する",
    },
    {
      number: 4,
      text: "ABSは、車速のみを検出して動作するため、路面状態の違いに対応できない",
    },
  ],
  correctAnswer: 2,
  explanation:
    "正解は2です。ABSは、各車輪に取り付けられた輪速センサーにより車輪の回転速度を検出し、滑り率を計算します。最適な滑り率（通常10～20%）を維持するように、ブレーキ圧を増減制御することで、ロックを防止しながら制動力を最大化します。",
  explanationDetail: `
## 詳細解説

### ABS（アンチロック・ブレーキ・システム）の基本構成

1. **輪速センサー**: 各車輪の回転速度を検出
2. **ECU（電子制御ユニット）**: 輪速センサーの信号を処理し、滑り率を計算
3. **ABS作動器**: ECUからの指令に基づき、ブレーキ圧を制御

### 滑り率と制動性能

滑り率 = (車速 - 輪速) / 車速 × 100(%)

- 滑り率0%：車輪が完全に回転（ブレーキが効いていない状態）
- 滑り率100%：車輪が完全にロック（ブレーキを強くかけすぎた状態）
- 最適な滑り率：10～20%（最大制動力を得られる範囲）

### ABSの制御方式

1. **4チャンネル式**: 4輪を個別に制御（高級車に多い）
2. **3チャンネル式**: 前輪は個別、後輪は一体制御
3. **2チャンネル式**: 左右を対角線で制御

### ポイント

- ABSは、ハンドル操作による回避動作が可能になる
- 制動距離を短縮する効果もあるが、最大のメリットはハンドル操作性の維持
  `,
  difficulty: 4,
  tags: ["シャシ", "ABS", "ブレーキ", "安全装置", "1級"],
  relatedQuestionIds: [],
  source: "1級自動車整備士 2024年6月試験 学科 シャシ（国土交通省）",
  sourceUrl: "https://www.mlit.go.jp/",
  officialPastQuestionUrl: "https://www.mlit.go.jp/jidosha/jidosha.html",
  permissionStatus: "pending",
  publishedAt: new Date("2024-01-01"),
  updatedAt: new Date("2024-01-01"),
};

// 1級自動車整備士 - 電気装置分野
const questionAutoMechanic1Electrical1: Question = {
  id: "auto-mechanic-1-2024-1-003",
  certId: "auto-mechanic-1",
  year: 2024,
  season: 1,
  categoryId: "electrical-1",
  questionNumber: "003",
  questionText:
    "ハイブリッド車の駆動システムについて、モータとエンジンの動力配分制御に関する問題です。",
  questionTheme: "ハイブリッド車の駆動システム",
  choices: [
    {
      number: 1,
      text: "シリーズハイブリッド方式では、エンジンが直接車輪を駆動する",
    },
    {
      number: 2,
      text: "パラレルハイブリッド方式では、モータとエンジンが同時に車輪を駆動することができる",
    },
    {
      number: 3,
      text: "モータのみで走行することは、いかなるハイブリッド方式でも不可能である",
    },
    {
      number: 4,
      text: "バッテリーの充電は、回生ブレーキのみで行われる",
    },
  ],
  correctAnswer: 2,
  explanation:
    "正解は2です。パラレルハイブリッド方式では、エンジンとモータが同じ駆動系に接続されており、両者を同時に使用して車輪を駆動することができます。これにより、加速時にはエンジンとモータの両方の力を利用して、強力な加速力を得ることができます。",
  explanationDetail: `
## 詳細解説

### ハイブリッド車の主要な方式

1. **シリーズハイブリッド方式**
   - エンジンは発電機を回すためだけに使用
   - エンジンは直接車輪を駆動しない
   - モータのみが車輪を駆動
   - 例：日産e-POWER

2. **パラレルハイブリッド方式**
   - エンジンとモータが同じ駆動系に接続
   - 両者を同時に使用可能
   - エンジン単独、モータ単独、両者同時の走行が可能
   - 例：ホンダ IMA（旧型）

3. **スプリット方式（トヨタ方式）**
   - パラレルとシリーズの両方の特徴を持つ
   - 動力分割機構（プラネタリーギア）により、柔軟な動力配分が可能
   - 例：トヨタ プリウス

### バッテリー充電方法

1. **回生ブレーキ**: 減速時にモータを発電機として動作させ、運動エネルギーを電気エネルギーに変換
2. **エンジン充電**: エンジンで発電機を回して充電
3. **外部充電**: プラグインハイブリッド車の場合、外部電源からも充電可能

### ポイント

- ハイブリッド車の効率的な走行には、最適な動力配分制御が重要
- モータのみでの走行（EV走行）は、多くのハイブリッド方式で可能
  `,
  difficulty: 5,
  tags: ["電気装置", "ハイブリッド", "モータ", "EV", "1級"],
  relatedQuestionIds: [],
  source: "1級自動車整備士 2024年6月試験 学科 電気装置（国土交通省）",
  sourceUrl: "https://www.mlit.go.jp/",
  officialPastQuestionUrl: "https://www.mlit.go.jp/jidosha/jidosha.html",
  permissionStatus: "pending",
  publishedAt: new Date("2024-01-01"),
  updatedAt: new Date("2024-01-01"),
};

// 1級自動車整備士 - 故障診断分野
const questionAutoMechanic1Diagnosis1: Question = {
  id: "auto-mechanic-1-2024-1-004",
  certId: "auto-mechanic-1",
  year: 2024,
  season: 1,
  categoryId: "diagnosis-1",
  questionNumber: "004",
  questionText:
    "エンジン不調の故障診断において、OBD（On-Board Diagnostics）システムの活用方法に関する問題です。",
  questionTheme: "OBDシステムの活用と故障診断",
  choices: [
    {
      number: 1,
      text: "OBD-IIでは、故障コード（DTC）は読み取ることができるが、フリーズフレームデータは取得できない",
    },
    {
      number: 2,
      text: "OBD-IIでは、故障コードの確認だけでなく、ライブデータの読み取りにより、運転中のセンサー値などをリアルタイムで確認できる",
    },
    {
      number: 3,
      text: "OBDシステムは、エンジン系統の故障のみを検出し、シャシやボディ系統の故障は検出しない",
    },
    {
      number: 4,
      text: "故障コードを消去すれば、その故障は完全に解消される",
    },
  ],
  correctAnswer: 2,
  explanation:
    "正解は2です。OBD-IIシステムでは、故障コードの読み取りに加えて、ライブデータの読み取りが可能です。エンジン回転数、冷却水温、スロットル開度、空燃比センサーの出力値など、リアルタイムでセンサー値を確認することで、故障の原因をより詳細に診断できます。",
  explanationDetail: `
## 詳細解説

### OBD（On-Board Diagnostics）システムとは

車両に搭載された故障診断システムで、エンジンや排気ガス処理装置などの状態を監視します。

### OBD-IIの主要機能

1. **故障コード（DTC: Diagnostic Trouble Code）の検出**
   - Pコード：パワートレイン関連
   - Bコード：ボディ関連
   - Cコード：シャシ関連
   - Uコード：通信関連

2. **フリーズフレームデータ**
   - 故障が発生した瞬間の各種センサー値を記録
   - 故障原因の特定に有効

3. **ライブデータの読み取り**
   - リアルタイムでのセンサー値の確認
   - エンジン回転数、冷却水温、スロットル開度など
   - 故障の再現性確認に使用

### 診断手順の例

1. **故障コードの読み取り**: 故障が記録されていないか確認
2. **フリーズフレームデータの確認**: 故障発生時の状況を把握
3. **ライブデータの確認**: 現在の状態を確認
4. **修理後の確認**: 故障コードを消去し、再発がないか確認

### ポイント

- OBDシステムは、エンジン系統だけでなく、シャシやボディ系統の故障も検出可能
- 故障コードを消去しても、根本原因を解決しない限り、再び故障コードが記録される
  `,
  difficulty: 4,
  tags: ["故障診断", "OBD", "診断", "電子制御", "1級"],
  relatedQuestionIds: [],
  source: "1級自動車整備士 2024年6月試験 学科 故障診断（国土交通省）",
  sourceUrl: "https://www.mlit.go.jp/",
  officialPastQuestionUrl: "https://www.mlit.go.jp/jidosha/jidosha.html",
  permissionStatus: "pending",
  publishedAt: new Date("2024-01-01"),
  updatedAt: new Date("2024-01-01"),
};

// 3級自動車整備士のサンプル問題（既存）
const questionAutoMechanic3: Question = {
  id: "auto-mechanic-3-2024-1-001",
  certId: "auto-mechanic-3",
  year: 2024,
  season: 1,
  categoryId: "engine-3",
  questionNumber: "001",
  questionText:
    "エンジンの基本構造と動作原理について、シリンダー内での燃焼過程に関する問題です。",
  questionTheme: "エンジンの基本構造",
  choices: [
    {
      number: 1,
      text: "選択肢1（要約）",
    },
    {
      number: 2,
      text: "選択肢2（要約）",
    },
    {
      number: 3,
      text: "選択肢3（要約）",
    },
    {
      number: 4,
      text: "選択肢4（要約）",
    },
  ],
  correctAnswer: 2,
  explanation:
    "この問題は、エンジンの基本構造に関する問題です。正解は2です。4サイクルエンジンでは、吸気、圧縮、燃焼（膨張）、排気の4つの工程が繰り返されます。",
  explanationDetail: `
## 詳細解説

### 4サイクルエンジンの動作原理

4サイクルエンジンは、以下の4つの工程を繰り返します。

1. **吸気行程**: ピストンが下降し、燃料と空気の混合気をシリンダー内に吸入
2. **圧縮行程**: ピストンが上昇し、混合気を圧縮
3. **燃焼行程**: 点火プラグで点火し、燃焼・膨張させてピストンを押し下げる
4. **排気行程**: ピストンが上昇し、燃焼ガスを排出

### ポイント

- 各行程の役割を理解する
- ピストンの上下運動とクランク機構の関係
- タイミングベルトの重要性

### 関連問題

- 2サイクルエンジンの動作原理
- エンジンの冷却システム
- 潤滑システム
  `,
  difficulty: 2,
  tags: ["エンジン", "基本構造", "4サイクル"],
  relatedQuestionIds: [],
  source: "3級自動車整備士 2024年6月試験 学科（国土交通省）",
  sourceUrl: "https://www.mlit.go.jp/",
  officialPastQuestionUrl: "https://www.mlit.go.jp/jidosha/jidosha.html",
  permissionStatus: "pending",
  publishedAt: new Date("2024-01-01"),
  updatedAt: new Date("2024-01-01"),
};


// ========== 2025年3月23日実施 1級自動車整備士 ==========

// 小特装分野（12）- No. 47: 定期点検基準
const question2025_12_47: Question = {
  id: "auto-mechanic-1-2025-1-047",
  certId: "auto-mechanic-1",
  year: 2025,
  season: 1,
  categoryId: "diagnosis-1",
  questionNumber: "047",
  questionText:
    "「道路運送車両法」及び「自動車点検基準」に照らし、自家用乗用自動車等の定期点検基準に基づき「点検時期が1年ごと」のものとして、適切なものは次のうちどれか。",
  questionTheme: "定期点検基準の点検時期",
  choices: [
    {
      number: 1,
      text: "制動装置の「ホース及びパイプ」の「漏れ、損傷及び取付状態」",
    },
    {
      number: 2,
      text: "かじ取り装置の「ハンドル」の「操作具合」",
    },
    {
      number: 3,
      text: "原動機の「燃料装置」の「燃料漏れ」",
    },
    {
      number: 4,
      text: "緩衝装置の「取付部及び連結部」の「緩み、がた及び損傷」",
    },
  ],
  correctAnswer: 1,
  explanation:
    "正解は1です。制動装置の「ホース及びパイプ」の「漏れ、損傷及び取付状態」は、定期点検基準において点検時期が「1年ごと」と定められています。他の選択肢は、すべて点検時期が「6ヶ月ごと」または「日常点検」です。",
  explanationDetail: `
## 詳細解説

### 自動車点検基準の定期点検項目と点検時期

自動車点検基準では、点検項目ごとに点検時期が定められています。

#### 点検時期の区分

1. **日常点検**: 走行前および走行後に点検する項目
2. **定期点検（6ヶ月ごと）**: 車検前後など、6ヶ月ごとに点検する項目
3. **定期点検（1年ごと）**: 年1回点検する項目
4. **定期点検（2年ごと）**: 2年に1回点検する項目

#### 各選択肢の点検時期

**選択肢1（○）**: 制動装置の「ホース及びパイプ」の「漏れ、損傷及び取付状態」
- **点検時期：1年ごと**
- ブレーキホースやパイプは重要な安全部品ですが、劣化が比較的緩やかなため、1年ごとの点検で十分です。

**選択肢2（×）**: かじ取り装置の「ハンドル」の「操作具合」
- **点検時期：6ヶ月ごと**
- ハンドルの操作性は重要な安全要素であり、より頻繁な点検が必要です。

**選択肢3（×）**: 原動機の「燃料装置」の「燃料漏れ」
- **点検時期：6ヶ月ごと**
- 燃料漏れは火災の原因となる重大な問題のため、頻繁な点検が必要です。

**選択肢4（×）**: 緩衝装置の「取付部及び連結部」の「緩み、がた及び損傷」
- **点検時期：6ヶ月ごと**
- サスペンションの緩みやがたは、操縦安定性に直接影響するため、頻繁な点検が必要です。

### 1年ごとの点検項目の例

- 制動装置のホース及びパイプ（漏れ、損傷、取付状態）
- タイヤの空気圧および損傷（備え付けのタイヤ）
- タイヤの溝の深さ（備え付けのタイヤ）
- ホイールの損傷、変形およびボルト・ナットの緩み
- その他（一部の項目）

### 試験でのポイント

- **6ヶ月ごと vs 1年ごと**: 頻出問題です。安全性に直接影響する項目は通常6ヶ月ごと、劣化が緩やかな項目は1年ごとです。
- **2年ごとの項目**: 車検時に点検する項目として2年ごとのものもあります。

### 関連知識

- 道路運送車両法第47条（点検義務）
- 自動車点検基準（国土交通省告示）
- 定期点検整備記録簿の保存義務
`,
  difficulty: 3,
  tags: ["点検基準", "道路運送車両法", "定期点検", "1級"],
  relatedQuestionIds: [],
  source: "1級自動車整備士 2025年3月23日実施 学科試験 小特装（国土交通省）",
  sourceUrl: "https://www.mlit.go.jp/",
  officialPastQuestionUrl: "https://www.mlit.go.jp/jidosha/jidosha.html",
  permissionStatus: "pending",
  publishedAt: new Date("2025-03-24"),
  updatedAt: new Date("2025-03-24"),
};

// 小特装分野（12）- No. 48: 灯火装置の基準
const question2025_12_48: Question = {
  id: "auto-mechanic-1-2025-1-048",
  certId: "auto-mechanic-1",
  year: 2025,
  season: 1,
  categoryId: "electrical-1",
  questionNumber: "048",
  questionText:
    "「道路運送車両の保安基準」及び「道路運送車両の保安基準の細目を定める告示」に照らし、四輪小型乗用自動車（最高速度 100 km/h、車幅 1.69 m、乗車定員 5 人）の灯火装置の基準に関する記述として、適切なものは次のうちどれか。",
  questionTheme: "灯火装置の保安基準",
  choices: [
    {
      number: 1,
      text: "走行用前照灯の灯光の色は、白色であり、かつ、その最高光度の合計は 460,000 cd を超えないこと。",
    },
    {
      number: 2,
      text: "車幅灯の灯光の色は、白色であること。ただし、方向指示器、非常点滅表示灯又は側方灯と構造上一体となっているもの又は兼用のものにあっては、橙色であってもよい。",
    },
    {
      number: 3,
      text: "昼間走行灯の灯光の色は、白色であり、かつ、その照明部の大きさは、20 cm² 以上 250 cm² 以下であること。",
    },
    {
      number: 4,
      text: "制動灯の灯光の色は、赤色であり、かつ、その照明部の上縁の高さが地上 1.5 m 以下、下縁の高さが地上 0.25 m 以上となるように取り付けられていること。",
    },
  ],
  correctAnswer: 2,
  explanation:
    "正解は2です。車幅灯の灯光の色は、原則として白色ですが、方向指示器、非常点滅表示灯又は側方灯と構造上一体となっているもの又は兼用のものにあっては、橙色であってもよいとされています。",
  explanationDetail: `
## 詳細解説

### 灯火装置の保安基準（道路運送車両の保安基準）

#### 各選択肢の検証

**選択肢1（×）**: 走行用前照灯の灯光の色は、白色であり、かつ、その最高光度の合計は 460,000 cd を超えないこと。
- **誤り**: 走行用前照灯の最高光度の合計は、**40,000 cd** を超えないことと定められています。
- 460,000 cd は誤りです（おそらく、大型自動車の値などと混同している可能性があります）。

**選択肢2（○）**: 車幅灯の灯光の色は、白色であること。ただし、方向指示器、非常点滅表示灯又は側方灯と構造上一体となっているもの又は兼用のものにあっては、橙色であってもよい。
- **正解**: 車幅灯は原則として白色ですが、方向指示器などと一体化している場合は、橙色も認められています。
- これは、LED技術の発達により、1つのランプユニットで複数の機能を兼用する場合の特例です。

**選択肢3（×）**: 昼間走行灯の灯光の色は、白色であり、かつ、その照明部の大きさは、20 cm² 以上 250 cm² 以下であること。
- **誤り**: 昼間走行灯の照明部の大きさは、**25 cm² 以上 200 cm² 以下**と定められています。
- 20 cm² や 250 cm² という数値は誤りです。

**選択肢4（×）**: 制動灯の灯光の色は、赤色であり、かつ、その照明部の上縁の高さが地上 1.5 m 以下、下縁の高さが地上 0.25 m 以上となるように取り付けられていること。
- **誤り**: 制動灯の取り付け高さに関する規定は、上縁の高さが地上 **2.1 m 以下**、下縁の高さが地上 **0.35 m 以上**と定められています。
- 1.5 m や 0.25 m という数値は誤りです。

### 主要な灯火装置の基準（小型乗用自動車）

| 灯火装置 | 灯光の色 | 光度・その他の基準 |
|---------|---------|------------------|
| 走行用前照灯 | 白色 | 最高光度の合計 40,000 cd 以下 |
| 車幅灯 | 白色（ただし、一体化の場合は橙色可） | - |
| 尾灯 | 赤色 | - |
| 制動灯 | 赤色 | 上縁：地上 2.1 m 以下、下縁：地上 0.35 m 以上 |
| 方向指示器（前部） | 橙色または白色 | - |
| 方向指示器（側部・後部） | 橙色 | - |
| 昼間走行灯 | 白色 | 照明部：25 cm² 以上 200 cm² 以下 |

### 試験でのポイント

- **数値の正確な記憶**: 光度、高さ、面積などの数値は正確に覚える必要があります。
- **例外規定**: 車幅灯のように「原則は白色、ただし一体化の場合は橙色可」という例外規定は頻出です。
- **大型車と小型車の違い**: 光度の基準などは車種によって異なる場合があるため注意が必要です。

### 関連知識

- 道路運送車両の保安基準（第32条～第52条の3）
- 道路運送車両の保安基準の細目を定める告示
- LED技術と灯火装置の一体化
`,
  difficulty: 4,
  tags: ["灯火装置", "保安基準", "電気装置", "1級"],
  relatedQuestionIds: [],
  source: "1級自動車整備士 2025年3月23日実施 学科試験 小特装（国土交通省）",
  sourceUrl: "https://www.mlit.go.jp/",
  officialPastQuestionUrl: "https://www.mlit.go.jp/jidosha/jidosha.html",
  permissionStatus: "pending",
  publishedAt: new Date("2025-03-24"),
  updatedAt: new Date("2025-03-24"),
};

// 小特装分野（12）- No. 49: 道路運送車両法第1条
const question2025_12_49: Question = {
  id: "auto-mechanic-1-2025-1-049",
  certId: "auto-mechanic-1",
  year: 2025,
  season: 1,
  categoryId: "diagnosis-1",
  questionNumber: "049",
  questionText:
    "「道路運送車両法」の目的を定めた「道路運送車両法第1条」について、（イ）から（ハ）に当てはまるものとして、下の組み合わせのうち、適切なものはどれか。",
  questionTheme: "道路運送車両法第1条の目的",
  choices: [
    {
      number: 1,
      text: "（イ）保障　（ロ）技術　（ハ）整備",
    },
    {
      number: 2,
      text: "（イ）保障　（ロ）知識　（ハ）検査",
    },
    {
      number: 3,
      text: "（イ）確保　（ロ）技術　（ハ）整備",
    },
    {
      number: 4,
      text: "（イ）確保　（ロ）知識　（ハ）検査",
    },
  ],
  correctAnswer: 3,
  explanation:
    "正解は3です。道路運送車両法第1条では、「安全性の確保及び公害の防止その他の環境の保全並びに整備についての技術の向上を図り」と定められています。よって、（イ）確保、（ロ）技術、（ハ）整備が正しい組み合わせです。",
  explanationDetail: `
## 詳細解説

### 道路運送車両法第1条（目的）

**道路運送車両法第1条**は、法律の目的を定める条文です。全文は以下の通りです：

> この法律は、道路運送車両に関し、所有権についての公証等を行い、並びに安全性の**確保**及び公害の防止その他の環境の保全並びに**整備**についての**技術**の向上を図り、併せて自動車の**整備**事業の健全な発達に資することにより、公共の福祉を増進することを目的とする。

#### 正しい組み合わせ

- **（イ）**: **確保**（安全性の確保）
- **（ロ）**: **技術**（技術の向上）
- **（ハ）**: **整備**（整備についての技術の向上、および自動車の整備事業）

#### 選択肢の検証

**選択肢1（×）**: 保障・技術・整備
- 「保障」は誤り。正しくは「確保」です。

**選択肢2（×）**: 保障・知識・検査
- 「保障」「知識」「検査」すべて誤りです。

**選択肢3（○）**: 確保・技術・整備
- **正解**。すべて正しい組み合わせです。

**選択肢4（×）**: 確保・知識・検査
- 「確保」は正しいですが、「知識」「検査」は誤りです。

### 道路運送車両法の目的の要点

1. **所有権についての公証等**: 自動車の登録制度による所有権の明確化
2. **安全性の確保**: 自動車の安全性を確保すること
3. **公害の防止その他の環境の保全**: 排気ガスなどによる環境への影響を防止
4. **整備についての技術の向上**: 自動車整備技術の向上
5. **自動車の整備事業の健全な発達**: 整備業界の発展
6. **公共の福祉の増進**: 最終的な目的

### 試験でのポイント

- **「確保」と「保障」の違い**: 「安全性の確保」が正しい表現です。「保障」は保証する意味で使われますが、この文脈では「確保」が適切です。
- **「技術」と「知識」**: 「技術の向上」が正しい表現です。
- **「整備」と「検査」**: 「整備についての技術の向上」および「自動車の整備事業」が正しい表現です。

### 関連条文

- **第2条**: 定義（自動車、原動機付自転車、軽自動車など）
- **第47条**: 点検義務
- **第48条**: 整備義務
- **第49条**: 整備記録の保存

### 関連知識

- 道路運送車両法の体系
- 自動車検査証の交付
- 自動車整備士制度
`,
  difficulty: 2,
  tags: ["道路運送車両法", "法規", "1級"],
  relatedQuestionIds: [],
  source: "1級自動車整備士 2025年3月23日実施 学科試験 小特装（国土交通省）",
  sourceUrl: "https://www.mlit.go.jp/",
  officialPastQuestionUrl: "https://www.mlit.go.jp/jidosha/jidosha.html",
  permissionStatus: "pending",
  publishedAt: new Date("2025-03-24"),
  updatedAt: new Date("2025-03-24"),
};

// 小特装分野（12）- No. 50: イモビライザ
const question2025_12_50: Question = {
  id: "auto-mechanic-1-2025-1-050",
  certId: "auto-mechanic-1",
  year: 2025,
  season: 1,
  categoryId: "electrical-1",
  questionNumber: "050",
  questionText:
    "「道路運送車両の保安基準」及び「道路運送車両の保安基準の細目を定める告示」に照らし、施錠装置等の基準のうち、四輪小型乗用自動車（最高速度 100 km/h、車幅 1.69 m、乗車定員 5 人）に備えるイモビライザの構造、施錠性能等に関する記述として、不適切なものは次のうちどれか。",
  questionTheme: "イモビライザの保安基準",
  choices: [
    {
      number: 1,
      text: "その作動により、原動機その他解錠に必要な装置の機能を確実に停止させることができる構造であること。",
    },
    {
      number: 2,
      text: "堅ろうであり、かつ、容易にその機能が損なわれ、又は作動を解除されることがない構造であること。",
    },
    {
      number: 3,
      text: "走行中の振動、衝撃等により作動するおそれがないものであること。",
    },
    {
      number: 4,
      text: "イモビライザの設定又は設定解除を灯光により通知する場合は、方向指示器が点灯又は点滅することによって通知するものであってよいが、その点灯又は点滅時間は 3 秒を超えないものであること。",
    },
  ],
  correctAnswer: 4,
  explanation:
    "正解は4です。イモビライザの設定又は設定解除を灯光により通知する場合、方向指示器の点灯又は点滅時間は**2秒を超えないもの**と定められています。3秒は誤りです。",
  explanationDetail: `
## 詳細解説

### イモビライザ（immobilizer）とは

イモビライザは、エンジンの始動を制御する盗難防止装置です。正規のキーが挿入され、認証が完了するまで、エンジンその他解錠に必要な装置の機能を停止させます。

### イモビライザの保安基準

#### 各選択肢の検証

**選択肢1（○）**: その作動により、原動機その他解錠に必要な装置の機能を確実に停止させることができる構造であること。
- **適切**: イモビライザの基本機能です。認証が完了するまで、エンジンや始動装置の機能を停止させることができなければなりません。

**選択肢2（○）**: 堅ろうであり、かつ、容易にその機能が損なわれ、又は作動を解除されることがない構造であること。
- **適切**: イモビライザは盗難防止装置であるため、頑丈で、簡単に無効化できない構造である必要があります。

**選択肢3（○）**: 走行中の振動、衝撃等により作動するおそれがないものであること。
- **適切**: 正常に走行中に、振動や衝撃によって誤作動してエンジンが停止するようなことがあってはなりません。認証完了後は、走行中に再び作動しない設計が必要です。

**選択肢4（×）**: イモビライザの設定又は設定解除を灯光により通知する場合は、方向指示器が点灯又は点滅することによって通知するものであってよいが、その点灯又は点滅時間は 3 秒を超えないものであること。
- **不適切**: 点灯又は点滅時間は**2秒を超えないもの**と定められています。3秒は誤りです。

### イモビライザの構造・性能要件

1. **機能要件**
   - 原動機その他解錠に必要な装置の機能を確実に停止できること
   - 認証が完了するまで機能が停止された状態を維持できること

2. **堅牢性要件**
   - 堅ろうであること
   - 容易に機能が損なわれないこと
   - 容易に作動が解除されないこと

3. **安全性要件**
   - 走行中の振動、衝撃等により誤作動しないこと
   - 正常な走行を妨げないこと

4. **通知機能（ある場合）**
   - 灯光により通知する場合は、方向指示器の点灯又は点滅により通知できる
   - 点灯又は点滅時間は**2秒を超えない**こと
   - これは、他の交通に誤解を与えないためです

### イモビライザの動作原理

1. **認証プロセス**
   - キーに埋め込まれたIDチップから識別コードを読み取る
   - ECUが識別コードを照合する
   - 一致すれば認証完了、不一致ならエンジンを停止

2. **通信方式**
   - LF（Low Frequency）帯域での通信（キーと車両間）
   - RF（Radio Frequency）帯域での通信（スマートキー）

### 試験でのポイント

- **数値の正確な記憶**: 点灯又は点滅時間は「2秒を超えない」と覚える
- **誤作動の防止**: 走行中に誤作動しないことが重要
- **堅牢性**: 盗難防止装置であることから、容易に無効化できない構造が必要

### 関連知識

- 施錠装置の保安基準（第68条）
- 道路運送車両の保安基準の細目を定める告示
- スマートキーシステム
- リモートエンジンスターター（イモビライザとの関係）
`,
  difficulty: 4,
  tags: ["イモビライザ", "保安基準", "電気装置", "盗難防止", "1級"],
  relatedQuestionIds: [],
  source: "1級自動車整備士 2025年3月23日実施 学科試験 小特装（国土交通省）",
  sourceUrl: "https://www.mlit.go.jp/",
  officialPastQuestionUrl: "https://www.mlit.go.jp/jidosha/jidosha.html",
  permissionStatus: "pending",
  publishedAt: new Date("2025-03-24"),
  updatedAt: new Date("2025-03-24"),
};

// 令和6年度第2回一級整備士の問題
// JSONファイルから読み込み

export function getAllQuestions(): Question[] {
  return [
    // JSONファイルからの読み込み（過去問集のみ）
    // 1級整備士
    // 2021年度第2回 - 過去問集JSONファイルから読み込み
    ...questions2021_2,
    // 2022年度第2回
    ...questions2022_2,
    // 2023年度第2回
    ...questions2023_2,
    // 2024年度第2回
    ...questions2024_2,

    // 2級整備士（ジーゼル）
    // 2022年度第1回
    ...questionsLevel2D2022_1,
    // 2022年度第2回
    ...questionsLevel2D2022_2,
    // 2023年度第1回
    ...questionsLevel2D2023_1,
    // 2023年度第2回
    ...questionsLevel2D2023_2,
    // 2024年度第1回
    ...questionsLevel2D2024_1,
    // 2024年度第2回
    ...questionsLevel2D2024_2,
    // 2025年度第1回
    ...questionsLevel2D2025_1,

    // 2級整備士（ガソリン）
    // 2022年度第1回
    ...questionsLevel2G2022_1,
    // 2022年度第2回
    ...questionsLevel2G2022_2,
    // 2023年度第1回
    ...questionsLevel2G2023_1,
    // 2023年度第2回
    ...questionsLevel2G2023_2,
    // 2024年度第1回
    ...questionsLevel2G2024_1,
    // 2024年度第2回
    ...questionsLevel2G2024_2,
    // 2025年度第1回
    ...questionsLevel2G2025_1,

    // 3級整備士（ガソリン）
    // 2022年度第1回
    ...questionsLevel3G2022_1,
    // 2022年度第2回
    ...questionsLevel3G2022_2,
    // 2023年度第1回
    ...questionsLevel3G2023_1,
    // 2023年度第2回
    ...questionsLevel3G2023_2,
    // 2024年度第1回
    ...questionsLevel3G2024_1,
    // 2024年度第2回
    ...questionsLevel3G2024_2,
    // 2025年度第1回
    ...questionsLevel3G2025_1,

    // 3級整備士（ジーゼル）
    // 2022年度第1回
    ...questionsLevel3D2022_1,
    // 2022年度第2回
    ...questionsLevel3D2022_2,
    // 2023年度第1回
    ...questionsLevel3D2023_1,
    // 2023年度第2回
    ...questionsLevel3D2023_2,
    // 2024年度第1回
    ...questionsLevel3D2024_1,
    // 2024年度第2回
    ...questionsLevel3D2024_2,
    // 2025年度第1回
    ...questionsLevel3D2025_1,
  ];
}

export function getQuestion(id: string): Question | undefined {
  return getAllQuestions().find((q) => q.id === id);
}

export function getQuestionsByCert(certId: string): Question[] {
  return getAllQuestions().filter((q) => q.certId === certId);
}
