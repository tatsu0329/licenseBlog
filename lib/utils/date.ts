/**
 * 年度と回次を表示用の文字列に変換するユーティリティ
 */

/**
 * 西暦年を令和年に変換
 * @param year 西暦年（例: 2024, 2025）
 * @returns 令和年（例: 6, 7）
 */
export function toReiwaYear(year: number): number {
  // 令和元年 = 2019年
  return year - 2018;
}

/**
 * 西暦年を令和年の表示文字列に変換
 * @param year 西暦年（例: 2024, 2025）
 * @returns 令和年の表示文字列（例: "令和6", "令和7"）
 */
export function toReiwaYearString(year: number): string {
  const reiwaYear = toReiwaYear(year);
  return `令和${reiwaYear}`;
}

/**
 * 年度と回次を「令和○年度第○回」形式で表示
 * @param year 西暦年（例: 2024, 2025）
 * @param season 回次（1=第1回, 2=第2回）
 * @returns 表示文字列（例: "令和6年度第2回", "令和7年度第1回"）
 */
export function formatExamPeriod(year: number, season: 1 | 2): string {
  const reiwaYear = toReiwaYear(year);
  const period = season === 1 ? "第1回" : "第2回";
  return `令和${reiwaYear}年度${period}`;
}

/**
 * 年度と回次を「令和○年第○回」形式で表示（簡易版）
 * @param year 西暦年（例: 2024, 2025）
 * @param season 回次（1=第1回, 2=第2回）
 * @returns 表示文字列（例: "令和6年第2回", "令和7年第1回"）
 */
export function formatExamPeriodSimple(year: number, season: 1 | 2): string {
  const reiwaYear = toReiwaYear(year);
  const period = season === 1 ? "第1回" : "第2回";
  return `令和${reiwaYear}年${period}`;
}

/**
 * 年度と回次を「令和○年度第○回」形式で表示（詳細版）
 * @param year 西暦年（例: 2024, 2025）
 * @param season 回次（1=第1回, 2=第2回）
 * @returns 表示文字列（例: "令和6年度第2回", "令和7年度第1回"）
 */
export function formatExamPeriodDetailed(year: number, season: 1 | 2): string {
  const reiwaYear = toReiwaYear(year);
  const periodNum = season === 1 ? "第1回" : "第2回";
  return `令和${reiwaYear}年度${periodNum}`;
}

/**
 * 年度を「令和○年度」形式で表示（年度フィルター用）
 * @param year 西暦年（例: 2024, 2025）
 * @returns 表示文字列（例: "令和6年度", "令和7年度"）
 */
export function formatYearForFilter(year: number): string {
  const reiwaYear = toReiwaYear(year);
  return `令和${reiwaYear}年度`;
}

