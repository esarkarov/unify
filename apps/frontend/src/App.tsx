import DashboardPage from '@/features/dashboard/pages/DashboardPage';
import SubjectCreatePage from '@/features/subjects/pages/SubjectCreatePage';
import SubjectDetailsPage from '@/features/subjects/pages/SubjectDetailsPage';
import SubjectsListPage from '@/features/subjects/pages/SubjectsListPage';
import { Layout } from '@/shared/components/refine-ui/layout/layout';
import { Toaster } from '@/shared/components/refine-ui/notification/toaster';
import { useNotificationProvider } from '@/shared/components/refine-ui/notification/use-notification-provider';
import { ThemeProvider } from '@/shared/components/refine-ui/theme/theme-provider';
import { dataProvider } from '@/shared/providers/data';
import { Authenticated, Refine } from '@refinedev/core';
import { DevtoolsPanel } from '@refinedev/devtools';
import { RefineKbar, RefineKbarProvider } from '@refinedev/kbar';
import routerProvider, { DocumentTitleHandler, UnsavedChangesNotifier } from '@refinedev/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BookOpen, Home } from 'lucide-react';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router';
import './App.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30 * 1000,
      gcTime: 5 * 60 * 1000,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
      retry: 1,
      refetchOnMount: true,
    },
    mutations: {
      retry: 0,
    },
  },
});

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
                  edit: '/subjects/edit/:id',
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
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
