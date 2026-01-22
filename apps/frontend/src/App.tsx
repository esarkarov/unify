import { authRoutes } from '@/features/auth/router';
import { classResources } from '@/features/classes/resources';
import { classRoutes } from '@/features/classes/router';
import { dashboardResources } from '@/features/dashboard/resources';
import { dashboardRoutes } from '@/features/dashboard/router';
import { departmentResources } from '@/features/departments/resources';
import { departmentRoutes } from '@/features/departments/router';
import { enrollmentResources } from '@/features/enrollments/resources';
import { enrollmentRoutes } from '@/features/enrollments/router';
import { facultyResources } from '@/features/faculty/resources';
import { facultyRoutes } from '@/features/faculty/router';
import { subjectResources } from '@/features/subjects/resources';
import { subjectRoutes } from '@/features/subjects/router';
import { PageLoader } from '@/shared/components/atoms/PageLoader';
import { Layout } from '@/shared/components/refine-ui/layout/layout';
import { Toaster } from '@/shared/components/refine-ui/notification/toaster';
import { useNotificationProvider } from '@/shared/components/refine-ui/notification/use-notification-provider';
import { ThemeProvider } from '@/shared/components/refine-ui/theme/theme-provider';
import { queryClient } from '@/shared/lib/query-client';
import { authProvider } from '@/shared/providers/auth';
import { dataProvider } from '@/shared/providers/data';
import { Authenticated, Refine } from '@refinedev/core';
import { DevtoolsPanel } from '@refinedev/devtools';
import { RefineKbar, RefineKbarProvider } from '@refinedev/kbar';
import routerProvider, { DocumentTitleHandler, UnsavedChangesNotifier } from '@refinedev/react-router';
import { QueryClientProvider } from '@tanstack/react-query';
import { Suspense, useMemo } from 'react';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router';
import './App.css';

const useRefineResources = () =>
  useMemo(
    () => [
      ...dashboardResources,
      ...subjectResources,
      ...departmentResources,
      ...classResources,
      ...facultyResources,
      ...enrollmentResources,
    ],
    []
  );

const useRefineOptions = () =>
  useMemo(
    () => ({
      syncWithLocation: true,
      warnWhenUnsavedChanges: true,
      projectId: 'WUucMT-L7xLu7-lVsXXt',
    }),
    []
  );

function App() {
  const resources = useRefineResources();
  const options = useRefineOptions();

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <RefineKbarProvider>
          <ThemeProvider>
            <Refine
              dataProvider={dataProvider}
              authProvider={authProvider}
              notificationProvider={useNotificationProvider()}
              routerProvider={routerProvider}
              options={options}
              resources={resources}>
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

              <Toaster />
              <RefineKbar />
              <UnsavedChangesNotifier />
              <DocumentTitleHandler />
            </Refine>
            <DevtoolsPanel />
          </ThemeProvider>
        </RefineKbarProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
