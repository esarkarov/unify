import { UsersByRole } from '@/features/dashboard/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

interface UsersByRoleChartProps {
  data: UsersByRole[];
  colors: string[];
}

export const UsersByRoleChart = ({ data, colors }: UsersByRoleChartProps) => {
  return (
    <Card className="lg:col-span-2 hover:shadow-md transition-shadow">
      <CardHeader>
        <CardTitle>Users by Role</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="h-72">
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
        <div className="flex flex-wrap gap-2">
          {data.map(({ role, total }, index) => (
            <span
              key={role}
              className="inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-xs font-medium">
              <span
                className="h-2 w-2 rounded-full"
                style={{
                  backgroundColor: colors[index % colors.length],
                }}
              />
              {role} · {total}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
