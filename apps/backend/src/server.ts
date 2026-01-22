import { createApp, setupGracefulShutdown, startServer } from '@/shared/app';

const app = createApp();
const server = startServer(app);
setupGracefulShutdown(server);

export default app;
