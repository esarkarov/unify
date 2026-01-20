import { SIZE_CLASSES } from '@/features/subjects/constants';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/ui/avatar';
import { getInitials } from '@/shared/lib/utils';

export interface UserAvatarCellProps {
  name: string;
  email?: string;
  imageUrl?: string | null;
  size?: 'sm' | 'md' | 'lg';
}

export const UserAvatarCell = ({ name, email, imageUrl, size = 'sm' }: UserAvatarCellProps) => {
  const initials = getInitials(name);

  return (
    <div className="flex items-center gap-2">
      <Avatar className={SIZE_CLASSES[size]}>
        {imageUrl && (
          <AvatarImage
            src={imageUrl}
            alt={`${name}'s avatar`}
            loading="lazy"
          />
        )}
        <AvatarFallback
          className="text-xs"
          aria-label={`${name}'s initials`}>
          {initials}
        </AvatarFallback>
      </Avatar>

      <div className="flex min-w-0 flex-col">
        <span
          className="truncate font-medium"
          title={name}>
          {name}
        </span>
        {email && (
          <span
            className="truncate text-xs text-muted-foreground"
            title={email}>
            {email}
          </span>
        )}
      </div>
    </div>
  );
};
