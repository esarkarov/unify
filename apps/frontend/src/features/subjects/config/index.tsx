import { Subject, SubjectClass, SubjectUser } from '@/features/subjects/types';
import { StatusBadge } from '@/shared/components/atoms/StatusBadge';
import { UserAvatarCell } from '@/shared/components/molecules/UserAvatarCell';
import { ShowButton } from '@/shared/components/refine-ui/buttons/show';
import { Badge } from '@/shared/components/ui/badge';
import { ColumnDef } from '@tanstack/react-table';

export const classTableColumns = (): ColumnDef<SubjectClass>[] => [
  {
    id: 'name',
    accessorKey: 'name',
    size: 240,
    header: () => <span className="column-title">Class</span>,
    cell: ({ getValue }) => <span className="font-medium text-foreground">{getValue<string>()}</span>,
  },
  {
    id: 'teacher',
    accessorKey: 'teacher',
    size: 220,
    header: () => <span className="column-title">Teacher</span>,
    cell: ({ row }) => {
      const teacher = row.original.teacher;

      if (!teacher) {
        return <span className="text-sm text-muted-foreground">Unassigned</span>;
      }

      return (
        <UserAvatarCell
          name={teacher.name}
          email={teacher.email!}
          imageUrl={teacher.image}
        />
      );
    },
  },
  {
    id: 'status',
    accessorKey: 'status',
    size: 120,
    header: () => <span className="column-title">Status</span>,
    cell: ({ getValue }) => {
      const status = getValue<string>();
      return <StatusBadge status={status} />;
    },
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
export const userTableColumns = (): ColumnDef<SubjectUser>[] => [
  {
    id: 'user',
    accessorKey: 'name',
    size: 240,
    header: () => <span className="column-title">User</span>,
    cell: ({ row }) => (
      <UserAvatarCell
        name={row.original.name}
        email={row.original.email}
        imageUrl={row.original.image}
      />
    ),
  },
  {
    id: 'role',
    accessorKey: 'role',
    size: 140,
    header: () => <span className="column-title">Role</span>,
    cell: ({ getValue }) => (
      <Badge
        variant="secondary"
        className="capitalize">
        {getValue<string>()}
      </Badge>
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
export const subjectTableColumns = (): ColumnDef<Subject>[] => [
  {
    id: 'code',
    accessorKey: 'code',
    size: 100,
    header: () => <span className="column-title ml-2">Code</span>,
    cell: ({ getValue }) => <Badge>{getValue<string>()}</Badge>,
  },
  {
    id: 'name',
    accessorKey: 'name',
    size: 200,
    header: () => <span className="column-title">Name</span>,
    cell: ({ getValue }) => <span className="text-foreground font-medium">{getValue<string>()}</span>,
    filterFn: 'includesString',
  },
  {
    id: 'department',
    accessorKey: 'department.name',
    size: 150,
    header: () => <span className="column-title">Department</span>,
    cell: ({ getValue }) => <Badge variant="secondary">{getValue<string>()}</Badge>,
  },
  {
    id: 'description',
    accessorKey: 'description',
    size: 300,
    header: () => <span className="column-title">Description</span>,
    cell: ({ getValue }) => <span className="line-clamp-2 text-sm text-muted-foreground">{getValue<string>()}</span>,
  },
  {
    id: 'actions',
    size: 150,
    header: () => <span className="column-title">Actions</span>,
    cell: ({ row }) => (
      <ShowButton
        resource="subjects"
        recordItemId={row.original.id}
        variant="outline"
        size="sm">
        View
      </ShowButton>
    ),
  },
];
