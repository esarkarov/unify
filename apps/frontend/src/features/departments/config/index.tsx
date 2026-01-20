import { DepartmentClass, DepartmentListItem, DepartmentSubject, DepartmentUser } from '@/features/departments/types';
import { StatusBadge } from '@/shared/components/atoms/StatusBadge';
import { UserAvatarCell } from '@/shared/components/molecules/UserAvatarCell';
import { ShowButton } from '@/shared/components/refine-ui/buttons/show';
import { Badge } from '@/shared/components/ui/badge';
import { ColumnDef } from '@tanstack/react-table';

export const subjectTableColumns = (): ColumnDef<DepartmentSubject>[] => [
  {
    id: 'code',
    accessorKey: 'code',
    size: 120,
    header: () => <span className="column-title ml-2">Code</span>,
    cell: ({ getValue }) => {
      const code = getValue<string>();
      return code ? <Badge>{code}</Badge> : <span className="ml-2 text-muted-foreground">No code</span>;
    },
  },
  {
    id: 'name',
    accessorKey: 'name',
    size: 220,
    header: () => <span className="column-title">Subject</span>,
    cell: ({ getValue }) => <span className="font-medium text-foreground">{getValue<string>()}</span>,
  },
  {
    id: 'description',
    accessorKey: 'description',
    size: 320,
    header: () => <span className="column-title">Description</span>,
    cell: ({ getValue }) => {
      const description = getValue<string>();
      return description ? (
        <span className="line-clamp-2 text-sm text-muted-foreground">{description}</span>
      ) : (
        <span className="text-sm text-muted-foreground">No description</span>
      );
    },
  },
  {
    id: 'actions',
    size: 140,
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
export const classTableColumns = (): ColumnDef<DepartmentClass>[] => [
  {
    id: 'name',
    accessorKey: 'name',
    size: 240,
    header: () => <span className="column-title">Class</span>,
    cell: ({ getValue }) => <span className="font-medium text-foreground">{getValue<string>()}</span>,
  },
  {
    id: 'subject',
    accessorKey: 'subject',
    size: 200,
    header: () => <span className="column-title">Subject</span>,
    cell: ({ row }) => {
      const subject = row.original.subject;
      if (!subject) {
        return <span className="text-sm text-muted-foreground">No subject</span>;
      }
      return (
        <span
          className="truncate text-sm"
          title={subject.name}>
          {subject.name}
          {subject.code && <span className="text-muted-foreground"> ({subject.code})</span>}
        </span>
      );
    },
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
export const userTableColumns = (): ColumnDef<DepartmentUser>[] => [
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
export const departmentTableColumns = (): ColumnDef<DepartmentListItem>[] => [
  {
    id: 'code',
    accessorKey: 'code',
    size: 100,
    header: () => <span className="column-title ml-2">Code</span>,
    cell: ({ getValue }) => {
      const code = getValue<string>();
      return code ? <Badge>{code}</Badge> : <span className="ml-2 text-muted-foreground">No code</span>;
    },
  },
  {
    id: 'name',
    accessorKey: 'name',
    size: 200,
    header: () => <span className="column-title">Name</span>,
    cell: ({ getValue }) => <span className="font-medium text-foreground">{getValue<string>()}</span>,
    filterFn: 'includesString',
  },
  {
    id: 'totalSubjects',
    accessorKey: 'totalSubjects',
    size: 160,
    header: () => <span className="column-title">Subjects</span>,
    cell: ({ getValue }) => {
      const total = getValue<number>();
      return (
        <Badge
          variant="secondary"
          aria-label={`${total ?? 0} subjects`}>
          {total ?? 0}
        </Badge>
      );
    },
  },
  {
    id: 'description',
    accessorKey: 'description',
    size: 300,
    header: () => <span className="column-title">Description</span>,
    cell: ({ getValue }) => {
      const description = getValue<string>();
      return description ? (
        <span className="line-clamp-2 text-sm text-muted-foreground">{description}</span>
      ) : (
        <span className="text-sm text-muted-foreground">No description</span>
      );
    },
  },
  {
    id: 'actions',
    size: 150,
    header: () => <span className="column-title">Actions</span>,
    cell: ({ row }) => (
      <ShowButton
        resource="departments"
        recordItemId={row.original.id}
        variant="outline"
        size="sm">
        View
      </ShowButton>
    ),
  },
];
