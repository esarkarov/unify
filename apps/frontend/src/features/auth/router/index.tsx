import { PageLoader } from '@/shared/components/atoms/PageLoader';
import { Authenticated } from '@refinedev/core';
import { NavigateToResource } from '@refinedev/react-router';
import { lazy, Suspense } from 'react';
import { Outlet, Route } from 'react-router';

const LoginPage = lazy(() => import('@/features/auth/pages/LoginPage'));
const RegisterPage = lazy(() => import('@/features/auth/pages/RegisterPage'));

export const authRoutes = (
  <Route
    key="auth-routes"
    element={
      <Authenticated
        key="public-routes"
        fallback={<Outlet />}>
        <NavigateToResource fallbackTo="/" />
      </Authenticated>
    }>
    <Route
      path="/login"
      element={
        <Suspense fallback={<PageLoader />}>
          <LoginPage />
        </Suspense>
      }
    />
    <Route
      path="/register"
      element={
        <Suspense fallback={<PageLoader />}>
          <RegisterPage />
        </Suspense>
      }
    />
  </Route>
);
