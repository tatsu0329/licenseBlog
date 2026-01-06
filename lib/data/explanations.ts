import { Question } from "../types";

// 解説集のJSONファイルからの読み込み
import explanationsR6_2Json from "./explanations/auto_mechanic_1_r6_2.json";

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

// 現在の解説集JSONファイル（問題データと解説が一緒になっている形式）の型定義
interface LegacyExplanationJsonFile {
  metadata: {
    certId: string;
    year: number;
    season: 1 | 2;
    source: string;
    sourceUrl?: string;
    officialPastQuestionUrl?: string;
    permissionStatus?: string;
    publishedAt: string;
    updatedAt: string;
  };
  questions: Array<{
    questionNumber: string;
    categoryId: string;
    questionSummary?: string;
    questionTheme?: string;
    choices?: Array<{ number: number; text: string }>;
    correctAnswer?: number;
    explanation: string;
    explanationDetail?: string;
    difficulty?: number;
    tags?: string[];
    relatedQuestionIds?: string[];
    explanationImages?: string[];
  }>;
}

// 現在の形式（問題と解説が一緒）から解説のみを抽出して変換
// 注意: この関数は解説データと問題データ（問題文・選択肢・正解）の両方を返す
function loadExplanationsFromLegacyJson(jsonData: LegacyExplanationJsonFile): {
  explanations: Array<{
    questionId: string;
    questionNumber: string;
    explanation: string;
    explanationDetail?: string;
    explanationImages?: string[];
    difficulty?: 1 | 2 | 3 | 4 | 5;
    tags?: string[];
    relatedQuestionIds?: string[];
  }>;
  questions: import("../types").Question[]; // 問題データも一緒に返す
} {
  const { metadata, questions } = jsonData;

  const explanations = questions
    .filter((q) => q.explanation && q.explanation.trim().length > 0)
    .map((q) => {
      // 問題IDを生成: certId-year-season-questionNumber
      const questionId = `${metadata.certId}-${metadata.year}-${metadata.season}-${q.questionNumber}`;

      return {
        questionId,
        questionNumber: q.questionNumber,
        explanation: q.explanation,
        explanationDetail: q.explanationDetail,
        explanationImages: q.explanationImages || [],
        difficulty: q.difficulty as 1 | 2 | 3 | 4 | 5 | undefined,
        tags: q.tags || [],
        relatedQuestionIds: q.relatedQuestionIds || [],
      };
    });

  // 問題データも生成（解説データと一緒に使用するため）
  const questionData: import("../types").Question[] = questions.map((q) => {
    const questionId = `${metadata.certId}-${metadata.year}-${metadata.season}-${q.questionNumber}`;
    const now = new Date(metadata.publishedAt);

    return {
      id: questionId,
      certId: metadata.certId,
      year: metadata.year,
      season: metadata.season,
      categoryId: q.categoryId,
      questionNumber: q.questionNumber,
      questionText: q.questionSummary || q.questionTheme || "",
      questionSummary: q.questionSummary,
      questionTheme: q.questionTheme,
      choices: (q.choices || []).map((choice) => ({
        number: choice.number as 1 | 2 | 3 | 4,
        text: choice.text,
      })),
      correctAnswer: (q.correctAnswer as 1 | 2 | 3 | 4) || 1,
      explanation: "", // 解説は解説データから取得
      explanationDetail: undefined,
      explanationImages: q.explanationImages || [],
      difficulty: q.difficulty as 1 | 2 | 3 | 4 | 5 | undefined,
      tags: q.tags || [],
      relatedQuestionIds: q.relatedQuestionIds || [],
      source: metadata.source,
      sourceUrl: metadata.sourceUrl,
      officialPastQuestionUrl: metadata.officialPastQuestionUrl,
      permissionStatus: (metadata.permissionStatus as "pending" | "granted" | "not_required" | "unknown") || "pending",
      publishedAt: now,
      updatedAt: new Date(metadata.updatedAt),
    };
  });

  return { explanations, questions: questionData };
}

// 解説集を読み込み（解説データと問題データの両方を取得）
const explanationsDataR6_2 = loadExplanationsFromLegacyJson(
  explanationsR6_2Json as unknown as LegacyExplanationJsonFile
);
const explanationsR6_2 = explanationsDataR6_2.explanations;
const questionsR6_2 = explanationsDataR6_2.questions;

// 解説集から問題IDで問題データを取得（解説集のJSONには問題データも含まれている）
export function getQuestionByIdFromExplanations(questionId: string): import("../types").Question | undefined {
  return questionsR6_2.find((q) => q.id === questionId);
}

// 全ての解説を取得する関数
export function getAllExplanations(): Array<{
  questionId: string;
  questionNumber: string;
  explanation: string;
  explanationDetail?: string;
  explanationImages?: string[];
  difficulty?: 1 | 2 | 3 | 4 | 5;
  tags?: string[];
  relatedQuestionIds?: string[];
}> {
  return [...explanationsR6_2];
}

// 問題IDで解説を取得
export function getExplanationByQuestionId(questionId: string): {
  questionId: string;
  questionNumber: string;
  explanation: string;
  explanationDetail?: string;
  explanationImages?: string[];
  difficulty?: 1 | 2 | 3 | 4 | 5;
  tags?: string[];
  relatedQuestionIds?: string[];
} | undefined {
  return getAllExplanations().find((exp) => exp.questionId === questionId);
}

// 資格IDで解説を取得
export function getExplanationsByCert(certId: string): Array<{
  questionId: string;
  questionNumber: string;
  explanation: string;
  explanationDetail?: string;
  explanationImages?: string[];
  difficulty?: 1 | 2 | 3 | 4 | 5;
  tags?: string[];
  relatedQuestionIds?: string[];
}> {
  return getAllExplanations().filter((exp) => {
    // questionIdの形式: certId-year-season-questionNumber
    return exp.questionId.startsWith(`${certId}-`);
  });
}

