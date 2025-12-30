import React from "react";

interface ExamStatsData {
  year: number;
  spring?: {
    passRate?: number;
    examinees?: number;
    passers?: number;
  };
  autumn?: {
    passRate?: number;
    examinees?: number;
    passers?: number;
  };
}

interface ExamStatsTableProps {
  data: ExamStatsData[];
  title?: string;
}

/**
 * 受験者数・合格者数・合格率の推移表
 */
export default function ExamStatsTable({
  data,
  title = "試験統計データ",
}: ExamStatsTableProps) {
  // データを年度順にソート
  const sortedData = [...data].sort((a, b) => b.year - a.year);

  return (
    <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
      {title && (
        <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-3">{title}</h3>
      )}
      <div className="overflow-x-auto -mx-4 md:mx-0">
        <div className="inline-block min-w-full align-middle">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-2 py-2 md:px-3 md:py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  年度・回次
                </th>
                <th className="px-2 py-2 md:px-3 md:py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  受験者
                </th>
                <th className="px-2 py-2 md:px-3 md:py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  合格者
                </th>
                <th className="px-2 py-2 md:px-3 md:py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  合格率
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedData.map((item) => (
                <React.Fragment key={item.year}>
                  {item.spring && (
                    <tr className="hover:bg-gray-50">
                      <td className="px-2 py-2 md:px-3 md:py-2 whitespace-nowrap text-xs md:text-sm font-medium text-gray-900">
                        {item.year}年 春期
                      </td>
                      <td className="px-2 py-2 md:px-3 md:py-2 whitespace-nowrap text-xs md:text-sm text-right text-gray-600">
                        {item.spring.examinees
                          ? item.spring.examinees.toLocaleString()
                          : "-"}
                      </td>
                      <td className="px-2 py-2 md:px-3 md:py-2 whitespace-nowrap text-xs md:text-sm text-right text-gray-600">
                        {item.spring.passers
                          ? item.spring.passers.toLocaleString()
                          : "-"}
                      </td>
                      <td className="px-2 py-2 md:px-3 md:py-2 whitespace-nowrap text-xs md:text-sm text-right font-semibold text-gray-900">
                        {item.spring.passRate !== undefined
                          ? `${item.spring.passRate}%`
                          : "-"}
                      </td>
                    </tr>
                  )}
                  {item.autumn && (
                    <tr key={`${item.year}-autumn`} className="hover:bg-gray-50">
                      <td className="px-2 py-2 md:px-3 md:py-2 whitespace-nowrap text-xs md:text-sm font-medium text-gray-900">
                        {item.year}年 秋期
                      </td>
                      <td className="px-2 py-2 md:px-3 md:py-2 whitespace-nowrap text-xs md:text-sm text-right text-gray-600">
                        {item.autumn.examinees
                          ? item.autumn.examinees.toLocaleString()
                          : "-"}
                      </td>
                      <td className="px-2 py-2 md:px-3 md:py-2 whitespace-nowrap text-xs md:text-sm text-right text-gray-600">
                        {item.autumn.passers
                          ? item.autumn.passers.toLocaleString()
                          : "-"}
                      </td>
                      <td className="px-2 py-2 md:px-3 md:py-2 whitespace-nowrap text-xs md:text-sm text-right font-semibold text-gray-900">
                        {item.autumn.passRate !== undefined
                          ? `${item.autumn.passRate}%`
                          : "-"}
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

