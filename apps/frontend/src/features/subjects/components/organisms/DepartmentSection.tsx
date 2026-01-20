import { Department } from '@/features/departments/types';
import { InfoCard } from '@/shared/components/organisms/InfoCard';
import { useLink } from '@refinedev/core';

interface DepartmentSectionProps {
  department?: Department | null;
}

export const DepartmentSection = ({ department }: DepartmentSectionProps) => {
  const Link = useLink();

  return (
    <InfoCard title="Department">
      {department ? (
        <div className="space-y-2">
          <Link
            to={`/departments/show/${department.id}`}
            className="text-lg font-semibold text-foreground transition-colors hover:text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            aria-label={`View ${department.name} department details`}>
            {department.name}
          </Link>
          <p className="text-sm text-muted-foreground">
            {department.description || 'No department description provided.'}
          </p>
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">Department not assigned.</p>
      )}
    </InfoCard>
  );
};
