import { getInitials } from '@/shared/lib/utils';
import { User } from '@/shared/types';

interface InstructorInfoProps {
  teacher?: User | null;
}

export const InstructorInfo = ({ teacher }: InstructorInfoProps) => {
  const teacherName = teacher?.name ?? 'Unknown';
  const teacherEmail = teacher?.email;
  const teacherImage = teacher?.image;

  const initials = getInitials(teacherName);
  const placeholderUrl = `https://placehold.co/80x80/e5e5e5/666?text=${encodeURIComponent(initials || 'NA')}`;

  return (
    <div className="instructor">
      <p className="text-sm font-medium text-muted-foreground">👨‍🏫 Instructor</p>

      <div className="mt-2 flex items-center gap-3">
        <img
          src={teacherImage ?? placeholderUrl}
          alt={`${teacherName}'s avatar`}
          className="h-12 w-12 rounded-full object-cover"
          loading="lazy"
        />

        <div className="min-w-0 flex-1">
          <p
            className="truncate font-medium text-foreground"
            title={teacherName}>
            {teacherName}
          </p>
          {teacherEmail && (
            <p
              className="truncate text-sm text-muted-foreground"
              title={teacherEmail}>
              {teacherEmail}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
