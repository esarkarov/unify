import { ResourceProps } from '@refinedev/core';
import { BookOpen } from 'lucide-react';

export const subjectResources: ResourceProps[] = [
  {
    name: 'subjects',
    list: '/subjects',
    create: '/subjects/create',
    show: '/subjects/show/:id',
    meta: {
      label: 'Subjects',
      icon: <BookOpen />,
    },
  },
];
