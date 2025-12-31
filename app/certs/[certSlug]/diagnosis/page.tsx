"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import BackButton from "@/components/BackButton";

export default function DiagnosisPage() {
  const params = useParams();
  const certSlug = params?.certSlug as string || "";
  const [activeTab, setActiveTab] = useState<"study-time" | "pass-possibility" | "weak-area">(
    "study-time"
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* フローティング戻るボタン */}
      <BackButton variant="gradient" floating position="bottom-left" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 flex items-center">
          <BackButton variant="minimal" />
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            学習診断ツール
          </h1>
          <p className="text-gray-600 mb-6">
            あなたの学習状況を診断して、最適な学習計画を提案します。
          </p>

          {/* タブ */}
          <div className="border-b border-gray-200 mb-6">
            <nav className="flex space-x-8">
              <button
                onClick={() => setActiveTab("study-time")}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "study-time"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                勉強時間診断
              </button>
              <button
                onClick={() => setActiveTab("pass-possibility")}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "pass-possibility"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                合格可能性チェック
              </button>
              <button
                onClick={() => setActiveTab("weak-area")}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "weak-area"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                苦手分野診断
              </button>
            </nav>
          </div>

          {/* 診断コンテンツ */}
          <div>
            {activeTab === "study-time" && <StudyTimeDiagnosis />}
            {activeTab === "pass-possibility" && <PassPossibilityCheck />}
            {activeTab === "weak-area" && <WeakAreaDiagnosis certSlug={certSlug} />}
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
          <p className="text-gray-700 mb-4">
            💎 より詳細な診断結果と学習計画を保存するには、プレミアムプランに登録してください
          </p>
          <Link
            href={certSlug === "auto-mechanic-1" ? "/articles/auto-mechanic-1-app-introduction" : "/articles"}
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            アプリで詳細診断を受ける →
          </Link>
        </div>
      </div>
    </div>
  );
}

// 勉強時間診断
function StudyTimeDiagnosis() {
  const [experience, setExperience] = useState<"beginner" | "experienced">(
    "beginner"
  );
  const [dailyHours, setDailyHours] = useState(1);
  const [result, setResult] = useState<number | null>(null);

  const calculateStudyTime = () => {
    const baseHours = experience === "beginner" ? 800 : 400;
    const dailyStudyHours = dailyHours;
    const months = Math.ceil(baseHours / (dailyStudyHours * 30));
    setResult(months);
  };

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        勉強時間診断
      </h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            経験レベル
          </label>
          <select
            value={experience}
            onChange={(e) =>
              setExperience(e.target.value as "beginner" | "experienced")
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="beginner">初学者（2級取得後）</option>
            <option value="experienced">経験者（実務経験3年以上）</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            1日あたりの学習時間
          </label>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min="0.5"
              max="6"
              step="0.5"
              value={dailyHours}
              onChange={(e) => setDailyHours(parseFloat(e.target.value))}
              className="flex-1"
            />
            <span className="text-lg font-semibold text-gray-900 min-w-[4rem]">
              {dailyHours}時間
            </span>
          </div>
        </div>

        <button
          onClick={calculateStudyTime}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
        >
          診断する
        </button>

        {result !== null && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="font-semibold text-green-900 mb-2">
              診断結果
            </h3>
            <p className="text-green-800">
              推定必要学習期間: <strong>{result}ヶ月</strong>
            </p>
            <p className="text-sm text-green-700 mt-2">
              1日{dailyHours}時間の学習を続けると、約{result}ヶ月で合格レベルに到達できる見込みです。
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// 合格可能性チェック
function PassPossibilityCheck() {
  const [pastQuestionScore, setPastQuestionScore] = useState(50);
  const [studyProgress, setStudyProgress] = useState(50);
  const [result, setResult] = useState<string | null>(null);

  const checkPossibility = () => {
    const total = (pastQuestionScore * 0.6 + studyProgress * 0.4) / 10;
    if (total >= 7) {
      setResult("高い");
    } else if (total >= 5) {
      setResult("中程度");
    } else {
      setResult("低い");
    }
  };

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        合格可能性チェック
      </h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            過去問の正答率（%）
          </label>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min="0"
              max="100"
              value={pastQuestionScore}
              onChange={(e) => setPastQuestionScore(parseInt(e.target.value))}
              className="flex-1"
            />
            <span className="text-lg font-semibold text-gray-900 min-w-[4rem]">
              {pastQuestionScore}%
            </span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            学習進捗率（%）
          </label>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min="0"
              max="100"
              value={studyProgress}
              onChange={(e) => setStudyProgress(parseInt(e.target.value))}
              className="flex-1"
            />
            <span className="text-lg font-semibold text-gray-900 min-w-[4rem]">
              {studyProgress}%
            </span>
          </div>
        </div>

        <button
          onClick={checkPossibility}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
        >
          チェックする
        </button>

        {result && (
          <div
            className={`border rounded-lg p-4 ${
              result === "高い"
                ? "bg-green-50 border-green-200"
                : result === "中程度"
                ? "bg-yellow-50 border-yellow-200"
                : "bg-red-50 border-red-200"
            }`}
          >
            <h3
              className={`font-semibold mb-2 ${
                result === "高い"
                  ? "text-green-900"
                  : result === "中程度"
                  ? "text-yellow-900"
                  : "text-red-900"
              }`}
            >
              合格可能性: {result}
            </h3>
            <p
              className={`text-sm ${
                result === "高い"
                  ? "text-green-800"
                  : result === "中程度"
                  ? "text-yellow-800"
                  : "text-red-800"
              }`}
            >
              {result === "高い"
                ? "現在の学習状況から、合格の可能性が高いです。この調子で学習を続けましょう。"
                : result === "中程度"
                ? "まだ改善の余地があります。弱点分野を重点的に学習しましょう。"
                : "基礎からしっかりと学習を進める必要があります。学習計画を見直しましょう。"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// 苦手分野診断
function WeakAreaDiagnosis({ certSlug }: { certSlug: string }) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        苦手分野診断
      </h2>
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
        <p className="text-blue-800 text-sm">
          苦手分野診断は、アプリで過去問を解くことで自動的に分析されます。
        </p>
      </div>
      <div className="space-y-3">
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold text-gray-900 mb-2">診断方法</h3>
          <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700">
            <li>アプリで過去問を解く</li>
            <li>間違えた問題を自動記録</li>
            <li>分野別の正答率を分析</li>
            <li>苦手分野を可視化</li>
          </ol>
        </div>
        <Link
          href={certSlug === "auto-mechanic-1" ? "/articles/auto-mechanic-1-app-introduction" : "/articles"}
          className="block w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-center"
        >
          アプリで苦手分野を診断する →
        </Link>
      </div>
    </div>
  );
}

