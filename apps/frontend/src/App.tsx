import ClassCreatePage from '@/features/classes/pages/ClassCreatePage';
import ClassDetailsPage from '@/features/classes/pages/ClassDetailsPage';
import ClassesListPage from '@/features/classes/pages/ClassesListPage';
import DashboardPage from '@/features/dashboard/pages/DashboardPage';
import DepartmentCreatePage from '@/features/departments/pages/DepartmentCreatePage';
import DepartmentDetailsPage from '@/features/departments/pages/DepartmentDetailsPage';
import DepartmentsListPage from '@/features/departments/pages/DepartmentsListPage';
import SubjectCreatePage from '@/features/subjects/pages/SubjectCreatePage';
import SubjectDetailsPage from '@/features/subjects/pages/SubjectDetailsPage';
import SubjectsListPage from '@/features/subjects/pages/SubjectsListPage';
import { Layout } from '@/shared/components/refine-ui/layout/layout';
import { Toaster } from '@/shared/components/refine-ui/notification/toaster';
import { useNotificationProvider } from '@/shared/components/refine-ui/notification/use-notification-provider';
import { ThemeProvider } from '@/shared/components/refine-ui/theme/theme-provider';
import { queryClient } from '@/shared/lib/query-client';
import { dataProvider } from '@/shared/providers/data';
import { Authenticated, Refine } from '@refinedev/core';
import { DevtoolsPanel } from '@refinedev/devtools';
import { RefineKbar, RefineKbarProvider } from '@refinedev/kbar';
import routerProvider, { DocumentTitleHandler, UnsavedChangesNotifier } from '@refinedev/react-router';
import { QueryClientProvider } from '@tanstack/react-query';
import { BookOpen, Building2, GraduationCap, Home } from 'lucide-react';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <RefineKbarProvider>
          <ThemeProvider>
            <Refine
              dataProvider={dataProvider}
              notificationProvider={useNotificationProvider()}
              routerProvider={routerProvider}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
                projectId: 'WUucMT-L7xLu7-lVsXXt',
              }}
              resources={[
                {
                  name: 'dashboard',
                  list: '/',
                  meta: {
                    label: 'Home',
                    icon: <Home />,
                  },
                },
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
                {
                  name: 'departments',
                  list: '/departments',
                  show: '/departments/show/:id',
                  create: '/departments/create',
                  meta: {
                    label: 'Departments',
                    icon: <Building2 />,
                  },
                },
                {
                  name: 'classes',
                  list: '/classes',
                  create: '/classes/create',
                  show: '/classes/show/:id',
                  meta: {
                    label: 'Classes',
                    icon: <GraduationCap />,
                  },
                },
              ]}>
              <Routes>
                <Route
                  element={
                    <Authenticated key="private-routes">
                      <Layout>
                        <Outlet />
                      </Layout>
                    </Authenticated>
                  }>
                  <Route
                    path="/"
                    element={<DashboardPage />}
                  />

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
