import { lazy } from 'react';
import { Route } from 'react-router';

const DashboardPage = lazy(() => import('@/features/dashboard/pages/DashboardPage'));

export const dashboardRoutes = (
  <Route
    path="/"
    element={<DashboardPage />}
  />
);
