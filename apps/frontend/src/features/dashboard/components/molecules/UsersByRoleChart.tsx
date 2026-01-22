import { UserRoleData } from '@/features/dashboard/types';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

interface UsersByRoleChartProps {
  data: UserRoleData[];
  colors: string[];
}

export const UsersByRoleChart = ({ data, colors }: UsersByRoleChartProps) => {
  return (
    <>
      <div
        className="h-72"
        role="img"
        aria-label="Users by role pie chart">
        <ResponsiveContainer
          width="100%"
          height="100%">
          <PieChart>
            <Pie
              dataKey="total"
              nameKey="role"
              data={data}
              innerRadius={60}
              outerRadius={100}
              paddingAngle={3}>
              {data.map((entry, index) => (
                <Cell
                  key={`${entry.role}-${index}`}
                  fill={colors[index % colors.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div
        className="flex flex-wrap gap-2"
        role="list"
        aria-label="Role distribution legend">
        {data.map((entry, index) => (
          <span
            key={entry.role}
            className="inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-xs font-medium"
            role="listitem">
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: colors[index % colors.length] }}
              aria-hidden="true"
            />
            {entry.role} · {entry.total}
          </span>
        ))}
      </div>
    </>
  );
};
