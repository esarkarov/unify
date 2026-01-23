import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';

interface RecentStatsCardsProps {
  classesCount: number;
  teachersCount: number;
}

export const RecentStatsCards = ({ classesCount, teachersCount }: RecentStatsCardsProps) => (
  <div className="grid gap-4">
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <CardTitle>New Classes (last 5)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-semibold">{classesCount}</div>
        <p className="text-sm text-muted-foreground">Most recent classes added</p>
      </CardContent>
    </Card>
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <CardTitle>New Teachers (last 5)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-semibold">{teachersCount}</div>
        <p className="text-sm text-muted-foreground">Most recent teachers added</p>
      </CardContent>
    </Card>
  </div>
);
