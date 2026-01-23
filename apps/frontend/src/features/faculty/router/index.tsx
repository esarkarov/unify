import { lazy } from 'react';
import { Route } from 'react-router';

const FacultyListPage = lazy(() => import('@/features/faculty/pages/FacultyListPage'));
const FacultyDetailsPage = lazy(() => import('@/features/faculty/pages/FacultyDetailsPage'));

export const facultyRoutes = (
  <Route path="faculty">
    <Route
      index
      element={<FacultyListPage />}
    />
    <Route
      path="show/:id"
      element={<FacultyDetailsPage />}
    />
  </Route>
);
