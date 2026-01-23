import { lazy } from 'react';
import { Route } from 'react-router';

const EnrollmentCreatePage = lazy(() => import('@/features/enrollments/pages/EnrollmentCreatePage'));
const EnrollmentsJoinPage = lazy(() => import('@/features/enrollments/pages/EnrollmentsJoinPage'));
const EnrollmentConfirmationPage = lazy(() => import('@/features/enrollments/pages/EnrollmentConfirmationPage'));

export const enrollmentRoutes = (
  <Route path="enrollments">
    <Route
      path="create"
      element={<EnrollmentCreatePage />}
    />
    <Route
      path="join"
      element={<EnrollmentsJoinPage />}
    />
    <Route
      path="confirm"
      element={<EnrollmentConfirmationPage />}
    />
  </Route>
);
