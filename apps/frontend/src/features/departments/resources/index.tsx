import { ResourceProps } from '@refinedev/core';
import { Building2 } from 'lucide-react';

export const departmentResources: ResourceProps[] = [
  {
    name: 'departments',
    list: '/departments',
    create: '/departments/create',
    show: '/departments/show/:id',
    meta: {
      label: 'Departments',
      icon: <Building2 />,
    },
  },
];
