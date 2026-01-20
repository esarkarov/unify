import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { ReactNode } from 'react';

interface InfoCardProps {
  title: string;
  badge?: ReactNode;
  children: ReactNode;
  className?: string;
}

export const InfoCard = ({ title, badge, children, className = '' }: InfoCardProps) => {
  return (
    <Card className={`transition-shadow hover:shadow-md ${className}`}>
      <CardHeader className="flex w-full flex-row items-center justify-between space-y-0">
        <CardTitle>{title}</CardTitle>
        {badge && <div className="shrink-0">{badge}</div>}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};
