import { lazy } from 'react';
import { Route } from 'react-router';

const ClassesListPage = lazy(() => import('@/features/classes/pages/ClassesListPage'));
const ClassCreatePage = lazy(() => import('@/features/classes/pages/ClassCreatePage'));
const ClassDetailsPage = lazy(() => import('@/features/classes/pages/ClassDetailsPage'));

export const classRoutes = (
  <Route path="classes">
    <Route
      index
      element={<ClassesListPage />}
    />
    <Route
      path="create"
      element={<ClassCreatePage />}
    />
    <Route
      path="show/:id"
      element={<ClassDetailsPage />}
    />
  </Route>
);
