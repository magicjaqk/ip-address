// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { ipRouter } from "./ip";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("ip.", ipRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
