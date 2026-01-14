import { Layout } from '@/components/refine-ui/layout/layout';
import { Toaster } from '@/components/refine-ui/notification/toaster';
import { useNotificationProvider } from '@/components/refine-ui/notification/use-notification-provider';
import { ThemeProvider } from '@/components/refine-ui/theme/theme-provider';
import DashboardPage from '@/pages/DashboardPage';
import SubjectCreatePage from '@/pages/SubjectCreatePage';
import SubjectsListPage from '@/pages/SubjectsListPage';
import SubjectDetailsPage from '@/pages/SubjectDetailsPage';
import { dataProvider } from '@/providers/data';
import { Authenticated, Refine } from '@refinedev/core';
import { DevtoolsPanel } from '@refinedev/devtools';
import { RefineKbar, RefineKbarProvider } from '@refinedev/kbar';
import routerProvider, { DocumentTitleHandler, UnsavedChangesNotifier } from '@refinedev/react-router';
import { BookOpen, Home } from 'lucide-react';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router';
import './App.css';

function App() {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}

export default App;
