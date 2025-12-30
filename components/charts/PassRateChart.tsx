interface PassRateDataPoint {
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

interface PassRateChartProps {
  data: PassRateDataPoint[];
  title?: string;
  height?: number;
}

/**
 * 合格率推移を表示するチャートコンポーネント
 */
export default function PassRateChart({
  data,
  title = "合格率の推移",
  height = 300,
}: PassRateChartProps) {
  // データをフラット化（年度・回次ごとに）
  const chartData: Array<{
    label: string;
    value: number;
    examinees?: number;
    passers?: number;
  }> = [];

  data.forEach((item) => {
    if (item.spring?.passRate !== undefined) {
      chartData.push({
        label: `${item.year}年春期`,
        value: item.spring.passRate,
        examinees: item.spring.examinees,
        passers: item.spring.passers,
      });
    }
    if (item.autumn?.passRate !== undefined) {
      chartData.push({
        label: `${item.year}年秋期`,
        value: item.autumn.passRate,
        examinees: item.autumn.examinees,
        passers: item.autumn.passers,
      });
    }
  });

  if (chartData.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        データがありません
      </div>
    );
  }

  const maxValue = Math.max(...chartData.map((d) => d.value), 100);
  const minValue = Math.min(...chartData.map((d) => d.value), 0);
  const range = maxValue - minValue || 1;
  const padding = 60;
  const chartWidth = Math.max(800, chartData.length * 80);
  const chartHeight = height - padding * 2;
  const barWidth = Math.max(40, (chartWidth - padding * 2) / chartData.length - 10);

  return (
    <div className="bg-white p-6 rounded-lg">
      {title && (
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      )}
      <div className="overflow-x-auto">
        <svg
          width={chartWidth}
          height={height}
          viewBox={`0 0 ${chartWidth} ${height}`}
          className="w-full max-w-full"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* グリッド線 */}
          {[0, 20, 40, 60, 80, 100].map((y) => {
            const yPos = padding + chartHeight - ((y - minValue) / range) * chartHeight;
            return (
              <g key={y}>
                <line
                  x1={padding}
                  y1={yPos}
                  x2={chartWidth - padding}
                  y2={yPos}
                  stroke="#e5e7eb"
                  strokeWidth={1}
                  strokeDasharray={y === 0 ? "0" : "4,4"}
                />
                <text
                  x={padding - 10}
                  y={yPos + 4}
                  textAnchor="end"
                  fontSize="12"
                  fill="#6b7280"
                >
                  {y}%
                </text>
              </g>
            );
          })}

          {/* データバー */}
          {chartData.map((point, index) => {
            const x = padding + index * (barWidth + 10);
            const barHeight = ((point.value - minValue) / range) * chartHeight;
            const y = padding + chartHeight - barHeight;
            const isSpring = point.label.includes("春期");
            const color = isSpring ? "#3b82f6" : "#10b981";

            return (
              <g key={point.label}>
                {/* バー */}
                <rect
                  x={x}
                  y={y}
                  width={barWidth}
                  height={barHeight}
                  fill={color}
                  opacity={0.8}
                  rx={4}
                />
                {/* 値のラベル */}
                <text
                  x={x + barWidth / 2}
                  y={y - 5}
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="bold"
                  fill={color}
                >
                  {point.value.toFixed(1)}%
                </text>
                {/* X軸ラベル */}
                <text
                  x={x + barWidth / 2}
                  y={height - padding + 20}
                  textAnchor="middle"
                  fontSize="10"
                  fill="#6b7280"
                  transform={`rotate(-45, ${x + barWidth / 2}, ${height - padding + 20})`}
                >
                  {point.label.replace("年春期", "春").replace("年秋期", "秋")}
                </text>
              </g>
            );
          })}

          {/* Y軸 */}
          <line
            x1={padding}
            y1={padding}
            x2={padding}
            y2={height - padding}
            stroke="#374151"
            strokeWidth={2}
          />
          {/* X軸 */}
          <line
            x1={padding}
            y1={height - padding}
            x2={chartWidth - padding}
            y2={height - padding}
            stroke="#374151"
            strokeWidth={2}
          />
        </svg>
      </div>

      {/* 凡例 */}
      <div className="flex justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-500 rounded"></div>
          <span className="text-sm text-gray-600">春期</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500 rounded"></div>
          <span className="text-sm text-gray-600">秋期</span>
        </div>
      </div>
    </div>
  );
}

