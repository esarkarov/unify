import { KpiCard } from '@/features/dashboard/components/atoms/KpiCard';
import { KPI_CONFIG } from '@/features/dashboard/constants';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';

interface OverviewSectionProps {
  kpiValues: Record<string, number>;
}

export const OverviewSection = ({ kpiValues }: OverviewSectionProps) => (
  <Card className="hover:shadow-md transition-shadow">
    <CardHeader>
      <CardTitle>Overview</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {KPI_CONFIG.map((kpi) => (
          <KpiCard
            key={kpi.key}
            label={kpi.label}
            value={kpiValues[kpi.key]}
            icon={kpi.icon}
            accentColor={kpi.accent}
          />
        ))}
      </div>
    </CardContent>
  </Card>
);
