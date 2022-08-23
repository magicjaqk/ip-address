import { createRouter } from "./context";
import { z } from "zod";

export const ipRouter = createRouter().query("get", {
  resolve({ ctx }) {
    const forwarded = ctx.req?.headers["x-forwarded-for"];

    const ip =
      typeof forwarded === "string"
        ? forwarded.split(/, /)[0]
        : ctx.req?.socket.remoteAddress;

    return {
      ip,
    };
  },
});
