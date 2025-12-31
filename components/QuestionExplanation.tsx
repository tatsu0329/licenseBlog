import React from "react";

interface QuestionExplanationProps {
  explanationDetail?: string;
}

/**
 * 問題解説を読みやすく表示するコンポーネント
 * Markdownの見出し記号を減らし、視覚的に見やすく表示
 */
export default function QuestionExplanation({
  explanationDetail,
}: QuestionExplanationProps) {
  if (!explanationDetail) {
    return null;
  }

  // 見出し記号を減らした読みやすい形式に変換
  const formatExplanation = (text: string): string => {
    return text
      // ## → 【 に変換（大見出し）
      .replace(/^##\s+(.+)$/gm, "【$1】")
      // ### → ■ に変換（中見出し）
      .replace(/^###\s+(.+)$/gm, "■ $1")
      // #### → ● に変換（小見出し）
      .replace(/^####\s+(.+)$/gm, "● $1")
      // **太字** → 太字のまま（HTMLに変換せず、視覚的に強調）
      .replace(/\*\*(.+?)\*\*/g, "【$1】")
      // - リスト → ・ に変換（読みやすく）
      .replace(/^-\s+/gm, "・ ")
      // 番号付きリストはそのまま
      .replace(/^\d+\.\s+/gm, (match) => match);
  };

  const formattedText = formatExplanation(explanationDetail);

  return (
    <div className="mt-6 space-y-4">
      <div className="prose prose-sm max-w-none">
        <div className="text-gray-700 leading-relaxed whitespace-pre-line">
          {formattedText.split("\n").map((line, index) => {
            // 見出しの検出とスタイリング
            if (line.match(/^【.+】$/)) {
              return (
                <div
                  key={index}
                  className="text-lg font-bold text-gray-900 mt-6 mb-3 pb-2 border-b-2 border-blue-200"
                >
                  {line}
                </div>
              );
            }
            // 中見出し
            if (line.match(/^■\s+/)) {
              return (
                <div
                  key={index}
                  className="text-base font-semibold text-gray-900 mt-4 mb-2"
                >
                  {line}
                </div>
              );
            }
            // 小見出し
            if (line.match(/^●\s+/)) {
              return (
                <div
                  key={index}
                  className="text-sm font-semibold text-gray-800 mt-3 mb-1 ml-2"
                >
                  {line}
                </div>
              );
            }
            // 強調されたテキスト（【】で囲まれた部分）
            if (line.includes("【") && line.includes("】")) {
              const parts = line.split(/(【.+?】)/g);
              return (
                <div key={index} className="mb-2">
                  {parts.map((part, partIndex) => {
                    if (part.match(/^【.+】$/)) {
                      return (
                        <span
                          key={partIndex}
                          className="font-bold text-blue-700 bg-blue-50 px-1 rounded"
                        >
                          {part}
                        </span>
                      );
                    }
                    return <span key={partIndex}>{part}</span>;
                  })}
                </div>
              );
            }
            // 通常のテキスト
            return (
              <div key={index} className="mb-2 text-gray-700">
                {line}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}


