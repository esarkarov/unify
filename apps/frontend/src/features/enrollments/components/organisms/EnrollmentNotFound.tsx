import { ShowView } from '@/shared/components/refine-ui/views/show-view';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';

export const EnrollmentNotFound = ({ onNavigate }: { onNavigate: () => void }) => (
  <ShowView className="class-view">
    <Card>
      <CardHeader>
        <CardTitle>Enrollment Not Found</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">No enrollment details found. Please try enrolling again.</p>
        <Button
          className="mt-4"
          onClick={onNavigate}
          aria-label="Browse available classes">
          Browse Classes
        </Button>
      </CardContent>
    </Card>
  </ShowView>
);
