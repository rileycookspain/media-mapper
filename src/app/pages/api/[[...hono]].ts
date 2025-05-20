// Import the Hono app
import { handle } from "hono/vercel";

import app from "@/api";

export default handle(app);
