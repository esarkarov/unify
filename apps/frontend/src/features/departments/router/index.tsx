import { lazy } from 'react';
import { Route } from 'react-router';

const DepartmentsListPage = lazy(() => import('@/features/departments/pages/DepartmentsListPage'));
const DepartmentCreatePage = lazy(() => import('@/features/departments/pages/DepartmentCreatePage'));
const DepartmentDetailsPage = lazy(() => import('@/features/departments/pages/DepartmentDetailsPage'));

export const departmentRoutes = (
  <Route path="departments">
    <Route
      index
      element={<DepartmentsListPage />}
    />
    <Route
      path="create"
      element={<DepartmentCreatePage />}
    />
    <Route
      path="show/:id"
      element={<DepartmentDetailsPage />}
    />
  </Route>
);
