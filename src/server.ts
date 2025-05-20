import { serve } from "@hono/node-server";

import env from "@/env";

import app from "./api";

const port = Number(env.API_PORT);

serve(
  {
    fetch: app.fetch,
    port,
  },
  (info) => {
    console.log(`Server running at http://localhost:${port}`);
  }
);
