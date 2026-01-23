import { Department } from '@/features/departments/types';

interface DepartmentInfoProps {
  department?: Department | null;
}

export const DepartmentInfo = ({ department }: DepartmentInfoProps) => {
  return (
    <div className="department">
      <p className="text-sm font-medium text-muted-foreground">🏛️ Department</p>

      {department ? (
        <div className="mt-2 space-y-1">
          <p className="font-medium text-foreground">{department.name}</p>
          {department.description && <p className="text-sm text-muted-foreground">{department.description}</p>}
        </div>
      ) : (
        <p className="mt-2 text-sm text-muted-foreground">No department assigned</p>
      )}
    </div>
  );
};
