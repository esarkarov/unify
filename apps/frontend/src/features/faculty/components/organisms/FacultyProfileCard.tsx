import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/ui/avatar';
import { Badge } from '@/shared/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { getInitials } from '@/shared/lib/utils';
import { User } from '@/shared/types';

interface FacultyProfileCardProps {
  user: User;
}

export const FacultyProfileCard = ({ user }: FacultyProfileCardProps) => (
  <Card className="hover:shadow-md transition-shadow">
    <CardHeader className="flex flex-row items-center justify-between">
      <CardTitle>Profile</CardTitle>
      <Badge variant="default">{user.role}</Badge>
    </CardHeader>
    <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-4">
        <Avatar className="size-12">
          {user.image && (
            <AvatarImage
              src={user.image}
              alt={`${user.name}'s profile picture`}
            />
          )}
          <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-lg font-semibold">{user.name}</p>
          <p className="text-sm text-muted-foreground">{user.email}</p>
        </div>
      </div>
    </CardContent>
  </Card>
);
