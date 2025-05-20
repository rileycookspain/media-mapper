import { hc } from "hono/client";

import type { HonoAppType } from "@/api/index";

const client = hc<HonoAppType>("http://localhost:9999");

// Example usage
// client.books.$get

// Alternatively, look up how to generate a client from the OpenAPI spec
