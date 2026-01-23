import { Toaster } from '@/shared/components/refine-ui/notification/toaster';
import { useNotificationProvider } from '@/shared/components/refine-ui/notification/use-notification-provider';
import { refineOptions } from '@/shared/config/refine.config';
import { refineResources } from '@/shared/config/refine.resources';
import { authProvider } from '@/shared/providers/auth.provider';
import { dataProvider } from '@/shared/providers/data.provider';
import { Refine } from '@refinedev/core';
import { DevtoolsPanel } from '@refinedev/devtools';
import { RefineKbar } from '@refinedev/kbar';
import routerProvider, { DocumentTitleHandler, UnsavedChangesNotifier } from '@refinedev/react-router';
import { ReactNode } from 'react';

interface RefineProviderProps {
  children: ReactNode;
}

export function RefineProvider({ children }: RefineProviderProps) {
  return (
    <Refine
      dataProvider={dataProvider}
      authProvider={authProvider}
      notificationProvider={useNotificationProvider()}
      routerProvider={routerProvider}
      options={refineOptions}
      resources={refineResources}>
      {children}
      <Toaster />
      <RefineKbar />
      <UnsavedChangesNotifier />
      <DocumentTitleHandler />
      <DevtoolsPanel />
    </Refine>
  );
}
