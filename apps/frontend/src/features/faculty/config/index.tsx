import { ShowButton } from '@/shared/components/refine-ui/buttons/show';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/ui/avatar';
import { Badge } from '@/shared/components/ui/badge';
import { getInitials } from '@/shared/lib/utils';
import { User } from '@/shared/types';
import { ColumnDef } from '@tanstack/react-table';
import { FacultyDepartment, FacultySubject } from '../types';

export const facultyTableColumns = (): ColumnDef<User>[] => [
  {
    id: 'name',
    accessorKey: 'name',
    size: 220,
    header: () => <p className="column-title">Name</p>,
    cell: ({ row, getValue }) => {
      const name = getValue<string>();
      const image = row.original.image;
      return (
        <div className="flex items-center gap-3">
          <Avatar>
            {image && (
              <AvatarImage
                src={image}
                alt={name}
              />
            )}
            <AvatarFallback>{getInitials(name)}</AvatarFallback>
          </Avatar>
          <span className="text-foreground">{name}</span>
        </div>
      );
    },
  },
  {
    id: 'email',
    accessorKey: 'email',
    size: 240,
    header: () => <p className="column-title">Email</p>,
    cell: ({ getValue }) => <span className="text-foreground">{getValue<string>()}</span>,
  },
  {
    id: 'role',
    accessorKey: 'role',
    size: 120,
    header: () => <p className="column-title">Role</p>,
    cell: ({ getValue }) => <Badge>{getValue<string>()}</Badge>,
  },
  {
    id: 'details',
    size: 140,
    header: () => <p className="column-title">Details</p>,
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
export const departmentTableColumns = (): ColumnDef<FacultyDepartment>[] => [
  {
    id: 'code',
    accessorKey: 'code',
    size: 120,
    header: () => <p className="column-title ml-2">Code</p>,
    cell: ({ getValue }) => {
      const code = getValue<string>();
      return code ? <Badge>{code}</Badge> : <span className="text-muted-foreground ml-2">No code</span>;
    },
  },
  {
    id: 'name',
    accessorKey: 'name',
    size: 220,
    header: () => <p className="column-title">Department</p>,
    cell: ({ getValue }) => <span className="text-foreground">{getValue<string>()}</span>,
  },
  {
    id: 'description',
    accessorKey: 'description',
    size: 320,
    header: () => <p className="column-title">Description</p>,
    cell: ({ getValue }) => {
      const description = getValue<string>();

      return description ? (
        <span className="truncate line-clamp-2">{description}</span>
      ) : (
        <span className="text-muted-foreground">No description</span>
      );
    },
  },
  {
    id: 'details',
    size: 140,
    header: () => <p className="column-title">Details</p>,
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
export const subjectTableColumns = (): ColumnDef<FacultySubject>[] => [
  {
    id: 'code',
    accessorKey: 'code',
    size: 120,
    header: () => <p className="column-title ml-2">Code</p>,
    cell: ({ getValue }) => {
      const code = getValue<string>();
      return code ? <Badge>{code}</Badge> : <span className="text-muted-foreground ml-2">No code</span>;
    },
  },
  {
    id: 'name',
    accessorKey: 'name',
    size: 220,
    header: () => <p className="column-title">Subject</p>,
    cell: ({ getValue }) => <span className="text-foreground">{getValue<string>()}</span>,
  },
  {
    id: 'department',
    accessorKey: 'department',
    size: 200,
    header: () => <p className="column-title">Department</p>,
    cell: ({ row }) => {
      const department = row.original.department;
      if (!department) {
        return <span className="text-muted-foreground">No department</span>;
      }
      return (
        <span className="truncate">
          {department.name}
          {department.code ? ` (${department.code})` : ''}
        </span>
      );
    },
  },
  {
    id: 'details',
    size: 140,
    header: () => <p className="column-title">Details</p>,
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
