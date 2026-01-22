import { ThemeProvider } from '@/shared/components/refine-ui/theme/theme-provider';
import { queryClient } from '@/shared/lib/query-client';
import { RefineKbarProvider } from '@refinedev/kbar';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { BrowserRouter } from 'react-router';

interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <RefineKbarProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </RefineKbarProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}
