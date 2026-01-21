import { EnrollmentDetails } from '@/features/enrollments/types';
import { Badge } from '@/shared/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { CheckCircle2 } from 'lucide-react';

interface EnrollmentSuccessCardProps {
  enrollment: EnrollmentDetails;
}

export const EnrollmentSuccessCard = ({ enrollment }: EnrollmentSuccessCardProps) => (
  <Card>
    <CardHeader>
      <div className="flex items-center gap-2">
        <CheckCircle2
          className="h-6 w-6 text-green-600"
          aria-hidden="true"
        />
        <CardTitle>Enrollment Confirmed</CardTitle>
      </div>
    </CardHeader>
    <CardContent className="space-y-4">
      <p className="text-sm text-muted-foreground">You have been enrolled successfully in the class.</p>

      {(enrollment.department || enrollment.subject || enrollment.class) && (
        <div
          className="flex flex-wrap gap-2"
          role="list"
          aria-label="Course information">
          {enrollment.department && (
            <Badge
              variant="secondary"
              role="listitem">
              {enrollment.department.name}
            </Badge>
          )}
          {enrollment.subject && (
            <Badge
              variant="outline"
              role="listitem">
              {enrollment.subject.name}
            </Badge>
          )}
          {enrollment.class && (
            <Badge
              variant="outline"
              role="listitem">
              {enrollment.class.name}
            </Badge>
          )}
        </div>
      )}
    </CardContent>
  </Card>
);
