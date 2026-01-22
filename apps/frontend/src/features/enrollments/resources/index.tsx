import { ResourceProps } from '@refinedev/core';
import { ClipboardCheck } from 'lucide-react';

export const enrollmentResources: ResourceProps[] = [
  {
    name: 'enrollments',
    list: '/enrollments/create',
    create: '/enrollments/create',
    meta: {
      label: 'Enrollments',
      icon: <ClipboardCheck />,
    },
  },
];
