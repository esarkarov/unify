import { AppProviders } from '@/shared/providers/app.provider';
import { RefineProvider } from '@/shared/providers/refine.provider';
import { AppRoutes } from '@/shared/router';
import './App.css';

function App() {
  return (
    <AppProviders>
      <RefineProvider>
        <AppRoutes />
      </RefineProvider>
    </AppProviders>
  );
}

export default App;
