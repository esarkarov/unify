import { lazy } from 'react';
import { Route } from 'react-router';

const SubjectsListPage = lazy(() => import('@/features/subjects/pages/SubjectsListPage'));
const SubjectCreatePage = lazy(() => import('@/features/subjects/pages/SubjectCreatePage'));
const SubjectDetailsPage = lazy(() => import('@/features/subjects/pages/SubjectDetailsPage'));

export const subjectRoutes = (
  <Route path="subjects">
    <Route
      index
      element={<SubjectsListPage />}
    />
    <Route
      path="create"
      element={<SubjectCreatePage />}
    />
    <Route
      path="show/:id"
      element={<SubjectDetailsPage />}
    />
  </Route>
);
