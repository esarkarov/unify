import { classResources } from '@/features/classes/resources';
import { dashboardResources } from '@/features/dashboard/resources';
import { departmentResources } from '@/features/departments/resources';
import { enrollmentResources } from '@/features/enrollments/resources';
import { facultyResources } from '@/features/faculty/resources';
import { subjectResources } from '@/features/subjects/resources';
import { ResourceProps } from '@refinedev/core';

export const refineResources: ResourceProps[] = [
  ...dashboardResources,
  ...subjectResources,
  ...departmentResources,
  ...classResources,
  ...facultyResources,
  ...enrollmentResources,
];
