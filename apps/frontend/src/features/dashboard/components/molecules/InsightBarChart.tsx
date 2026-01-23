import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

interface InsightBarChartProps<T> {
  title: string;
  data: T[];
  dataKey: string;
  xAxisKey: string;
  barColor: string;
}

export const InsightBarChart = <T,>({ title, data, dataKey, xAxisKey, barColor }: InsightBarChartProps<T>) => {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-muted-foreground">{title}</h3>
      <div
        className="h-80"
        role="img"
        aria-label={title}>
        <ResponsiveContainer
          width="100%"
          height="100%">
          <BarChart data={data}>
            <XAxis
              dataKey={xAxisKey}
              tick={{ fontSize: 12 }}
            />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar
              dataKey={dataKey}
              fill={barColor}
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
