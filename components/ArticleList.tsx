"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { Article } from "@/lib/types";

interface ArticleListProps {
  articles: Article[];
}

export default function ArticleList({ articles }: ArticleListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // 全タグを取得（重複除去）
  const allTags = useMemo(() => {
    const tagsSet = new Set<string>();
    articles.forEach((article) => {
      article.tags.forEach((tag) => tagsSet.add(tag));
    });
    return Array.from(tagsSet).sort();
  }, [articles]);

  // フィルター適用後の記事
  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      // 検索クエリでフィルター
      const matchesSearch =
        searchQuery === "" ||
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        );

      // タグでフィルター
      const matchesTag = selectedTag === null || article.tags.includes(selectedTag);

      return matchesSearch && matchesTag;
    });
  }, [articles, searchQuery, selectedTag]);

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5 md:p-6 lg:p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">関連記事</h2>
      </div>

      {/* 検索・フィルター */}
      <div className="mb-6 space-y-4">
        {/* 検索バー */}
        <div className="relative">
          <input
            type="text"
            placeholder="記事を検索..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2.5 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          />
          <svg
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          )}
        </div>

        {/* タグフィルター */}
        {allTags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedTag(null)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                selectedTag === null
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              全て
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  selectedTag === tag
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 結果件数 */}
      {(searchQuery || selectedTag) && (
        <div className="mb-4 text-sm text-gray-600">
          {filteredArticles.length}件の記事が見つかりました
        </div>
      )}

      {/* 記事一覧 */}
      {filteredArticles.length > 0 ? (
        <div className="mx-auto max-w-3xl">
          <div className="space-y-5 max-h-[800px] overflow-y-auto pr-2 custom-scrollbar">
            {filteredArticles.map((article) => (
              <Link
                key={article.id}
                href={`/articles/${article.slug}`}
                className="block p-5 border border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50/50 transition-all duration-200 group"
              >
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2.5 leading-7">
                  {article.title}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed mb-4">
                  {article.excerpt}
                </p>
                <div className="flex items-center gap-2 text-xs text-gray-500 pt-3 border-t border-gray-100">
                  <time dateTime={article.publishedAt.toISOString()}>
                    {article.publishedAt.toLocaleDateString("ja-JP", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                  {article.tags.length > 0 && (
                    <>
                      <span>•</span>
                      <span className="flex gap-1.5 flex-wrap">
                        {article.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 bg-gray-100 rounded text-gray-600"
                          >
                            {tag}
                          </span>
                        ))}
                      </span>
                    </>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500">
          <p className="mb-2">
            {searchQuery || selectedTag
              ? "条件に一致する記事が見つかりませんでした"
              : "関連記事はまだありません"}
          </p>
          {(searchQuery || selectedTag) && (
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedTag(null);
              }}
              className="text-blue-600 hover:text-blue-700 text-sm font-semibold mt-2 inline-block"
            >
              フィルターをクリア
            </button>
          )}
        </div>
      )}
    </div>
  );
}

