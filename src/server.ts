import { serve } from '@hono/node-server';
import app from './api';
import env from '@/env';

const port = Number(env.API_PORT);

serve({
  fetch: app.fetch,
  port,
  }, (info) => {
  console.log(`Server running at http://localhost:${port}`);
});