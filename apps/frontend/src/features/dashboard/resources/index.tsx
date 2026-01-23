import { ResourceProps } from '@refinedev/core';
import { Home } from 'lucide-react';

export const dashboardResources: ResourceProps[] = [
  {
    name: 'dashboard',
    list: '/',
    meta: {
      label: 'Home',
      icon: <Home />,
    },
  },
];
