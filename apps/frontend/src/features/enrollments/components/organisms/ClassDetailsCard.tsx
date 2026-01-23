import { DetailItem } from '@/features/enrollments/components/atoms/DetailItem';
import { EnrollmentDetails } from '@/features/enrollments/types';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Separator } from '@/shared/components/ui/separator';

interface ClassDetailsCardProps {
  enrollment: EnrollmentDetails;
  onViewClasses: () => void;
  onGoToClass: () => void;
}

export const ClassDetailsCard = ({ enrollment, onViewClasses, onGoToClass }: ClassDetailsCardProps) => (
  <Card>
    <CardHeader>
      <CardTitle>Class Details</CardTitle>
    </CardHeader>
    <CardContent className="space-y-3">
      <DetailItem
        label="Class"
        value={enrollment.class?.name ?? 'Unknown'}
      />

      <Separator />

      <DetailItem
        label="Teacher"
        value={enrollment.teacher?.name ?? 'Unknown'}
        subtitle={enrollment.teacher?.email ?? 'No email'}
      />

      <Separator />

      <div className="flex flex-wrap gap-2 pt-2">
        <Button
          onClick={onViewClasses}
          aria-label="View all classes">
          View Classes
        </Button>
        {enrollment.class?.id && (
          <Button
            variant="outline"
            onClick={onGoToClass}
            aria-label={`Go to ${enrollment.class.name} class page`}>
            Go to Class
          </Button>
        )}
      </div>
    </CardContent>
  </Card>
);
