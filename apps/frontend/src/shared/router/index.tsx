import { authRoutes } from '@/features/auth/router';
import { classRoutes } from '@/features/classes/router';
import { dashboardRoutes } from '@/features/dashboard/router';
import { departmentRoutes } from '@/features/departments/router';
import { enrollmentRoutes } from '@/features/enrollments/router';
import { facultyRoutes } from '@/features/faculty/router';
import { subjectRoutes } from '@/features/subjects/router';
import { PageLoader } from '@/shared/components/atoms/PageLoader';
import { Layout } from '@/shared/components/refine-ui/layout/layout';
import { Authenticated } from '@refinedev/core';
import { Suspense } from 'react';
import { Outlet, Route, Routes } from 'react-router';

export function AppRoutes() {
  return (
    <Routes>
      {authRoutes}
      <Route
        element={
          <Authenticated key="private-routes">
            <Layout>
              <Suspense fallback={<PageLoader />}>
                <Outlet />
              </Suspense>
            </Layout>
          </Authenticated>
        }>
        {dashboardRoutes}
        {subjectRoutes}
        {departmentRoutes}
        {classRoutes}
        {facultyRoutes}
        {enrollmentRoutes}
      </Route>
    </Routes>
  );
}
