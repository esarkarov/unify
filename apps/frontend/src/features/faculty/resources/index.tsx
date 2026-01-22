import { ResourceProps } from '@refinedev/core';
import { Users } from 'lucide-react';

export const facultyResources: ResourceProps[] = [
  {
    name: 'users',
    list: '/faculty',
    show: '/faculty/show/:id',
    meta: {
      label: 'Faculty',
      icon: <Users />,
    },
  },
];
