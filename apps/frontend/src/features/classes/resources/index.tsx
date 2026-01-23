import { ResourceProps } from '@refinedev/core';
import { GraduationCap } from 'lucide-react';

export const classResources: ResourceProps[] = [
  {
    name: 'classes',
    list: '/classes',
    create: '/classes/create',
    show: '/classes/show/:id',
    meta: {
      label: 'Classes',
      icon: <GraduationCap />,
    },
  },
];
