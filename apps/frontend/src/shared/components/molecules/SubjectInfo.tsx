import { Subject } from '@/features/subjects/types';
import { Badge } from '@/shared/components/ui/badge';

interface SubjectInfoProps {
  subject?: Subject | null;
}

export const SubjectInfo = ({ subject }: SubjectInfoProps) => {
  return (
    <div className="subject space-y-3">
      <p className="text-sm font-medium text-muted-foreground">📚 Subject</p>

      {subject ? (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            {subject.code && (
              <Badge variant="outline">
                Code: <span className="ml-1">{subject.code}</span>
              </Badge>
            )}
          </div>

          <p className="font-medium text-foreground">{subject.name}</p>

          {subject.description && <p className="text-sm text-muted-foreground">{subject.description}</p>}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">No subject assigned</p>
      )}
    </div>
  );
};
