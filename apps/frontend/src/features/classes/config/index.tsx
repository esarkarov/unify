import { ClassListItem, ClassUser } from '@/features/classes/types';
import { StatusBadge } from '@/shared/components/atoms/StatusBadge';
import { UserAvatarCell } from '@/shared/components/molecules/UserAvatarCell';
import { ShowButton } from '@/shared/components/refine-ui/buttons/show';
import { Badge } from '@/shared/components/ui/badge';
import { ColumnDef } from '@tanstack/react-table';

export const classTableColumns = (): ColumnDef<ClassListItem>[] => [
  {
    id: 'banner',
    accessorKey: 'bannerUrl',
    size: 120,
    header: () => <span className="column-title ml-2">Banner</span>,
    cell: ({ getValue }) => {
      const bannerUrl = getValue<string>();
      return bannerUrl ? (
        <img
          src={bannerUrl}
          alt="Class banner"
          className="ml-2 h-10 w-10 rounded-md object-cover"
          loading="lazy"
        />
      ) : (
        <span className="ml-2 text-sm text-muted-foreground">No image</span>
      );
    },
  },
  {
    id: 'name',
    accessorKey: 'name',
    size: 220,
    header: () => <span className="column-title">Class Name</span>,
    cell: ({ getValue }) => <span className="font-medium text-foreground">{getValue<string>()}</span>,
  },
  {
    id: 'status',
    accessorKey: 'status',
    size: 140,
    header: () => <span className="column-title">Status</span>,
    cell: ({ getValue }) => {
      const status = getValue<'active' | 'inactive'>();
      return <StatusBadge status={status} />;
    },
  },
  {
    id: 'subject',
    accessorKey: 'subject.name',
    size: 200,
    header: () => <span className="column-title">Subject</span>,
    cell: ({ getValue }) => {
      const subjectName = getValue<string>();
      return subjectName ? (
        <Badge variant="secondary">{subjectName}</Badge>
      ) : (
        <span className="text-sm text-muted-foreground">Not set</span>
      );
    },
  },
  {
    id: 'teacher',
    accessorKey: 'teacher.name',
    size: 200,
    header: () => <span className="column-title">Teacher</span>,
    cell: ({ getValue }) => {
      const teacherName = getValue<string>();
      return teacherName ? (
        <span className="text-foreground">{teacherName}</span>
      ) : (
        <span className="text-sm text-muted-foreground">Not assigned</span>
      );
    },
  },
  {
    id: 'capacity',
    accessorKey: 'capacity',
    size: 120,
    header: () => <span className="column-title">Capacity</span>,
    cell: ({ getValue }) => <span className="text-foreground">{getValue<number>()}</span>,
  },
  {
    id: 'actions',
    size: 140,
    header: () => <span className="column-title">Actions</span>,
    cell: ({ row }) => (
      <ShowButton
        resource="classes"
        recordItemId={row.original.id}
        variant="outline"
        size="sm">
        View
      </ShowButton>
    ),
  },
];
export const studentTableColumns = (): ColumnDef<ClassUser>[] => [
  {
    id: 'student',
    accessorKey: 'name',
    size: 240,
    header: () => <span className="column-title">Student</span>,
    cell: ({ row }) => (
      <UserAvatarCell
        name={row.original.name}
        email={row.original.email}
        imageUrl={row.original.image}
      />
    ),
  },
  {
    id: 'actions',
    size: 140,
    header: () => <span className="column-title">Actions</span>,
    cell: ({ row }) => (
      <ShowButton
        resource="users"
        recordItemId={row.original.id}
        variant="outline"
        size="sm">
        View
      </ShowButton>
    ),
  },
];
